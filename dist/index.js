// server/_core/index.ts
import "dotenv/config";
import express2 from "express";
import { createServer } from "http";
import net from "net";
import { createExpressMiddleware } from "@trpc/server/adapters/express";

// shared/const.ts
var COOKIE_NAME = "app_session_id";
var ONE_YEAR_MS = 1e3 * 60 * 60 * 24 * 365;
var AXIOS_TIMEOUT_MS = 3e4;
var UNAUTHED_ERR_MSG = "Please login (10001)";
var NOT_ADMIN_ERR_MSG = "You do not have required permission (10002)";

// server/db.ts
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";

// drizzle/schema.ts
import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, decimal } from "drizzle-orm/mysql-core";
var users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull()
});
var insulinFormulations = mysqlTable("insulin_formulations", {
  id: int("id").autoincrement().primaryKey(),
  category: varchar("category", { length: 50 }).notNull(),
  // 超超速効型, 超速効型, 速効型, 中間型, 持効型, 混合型, 週1回基礎
  genericName: varchar("generic_name", { length: 100 }).notNull(),
  // 一般名
  brandName: varchar("brand_name", { length: 100 }).notNull(),
  // 商品名
  onsetTime: varchar("onset_time", { length: 50 }),
  // 作用発現時間
  peakTime: varchar("peak_time", { length: 50 }),
  // ピーク時間
  duration: varchar("duration", { length: 50 }),
  // 持続時間
  wardUse: text("ward_use"),
  // 病棟での使い分け
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
});
var oralAntidiabeticDrugs = mysqlTable("oral_antidiabetic_drugs", {
  id: int("id").autoincrement().primaryKey(),
  class: varchar("class", { length: 50 }).notNull(),
  // ビグアナイド, SGLT2阻害薬, DPP-4阻害薬, GLP-1受容体作動薬, SU薬, グリニド, α-GI, チアゾリジン
  genericName: varchar("generic_name", { length: 100 }).notNull(),
  // 一般名
  brandName: varchar("brand_name", { length: 100 }).notNull(),
  // 販売名
  contraindications: text("contraindications"),
  // 禁忌
  perioperativeSuspensionDays: int("perioperative_suspension_days"),
  // 周術期休薬日数
  resumptionGuidance: text("resumption_guidance"),
  // 再開目安
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
});
var glucoseContainingFluids = mysqlTable("glucose_containing_fluids", {
  id: int("id").autoincrement().primaryKey(),
  category: varchar("category", { length: 50 }).notNull(),
  // ブドウ糖単独, 糖含有電解質液
  brandName: varchar("brand_name", { length: 100 }).notNull(),
  // 商品名
  volume: int("volume").notNull(),
  // 容量（mL）
  glucoseConcentration: decimal("glucose_concentration", { precision: 5, scale: 2 }).notNull(),
  // 糖濃度（％）
  totalGlucosePerBottle: decimal("total_glucose_per_bottle", { precision: 8, scale: 2 }).notNull(),
  // 1本あたり総糖量(g)
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
});
var ivhFormulations = mysqlTable("ivh_formulations", {
  id: int("id").autoincrement().primaryKey(),
  brandName: varchar("brand_name", { length: 100 }).notNull(),
  // 商品名
  totalGlucose: decimal("total_glucose", { precision: 8, scale: 2 }).notNull(),
  // 総糖量(g)
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
});
var diabetesClassifications = mysqlTable("diabetes_classifications", {
  id: int("id").autoincrement().primaryKey(),
  type: varchar("type", { length: 50 }).notNull(),
  // 1型, 2型, その他
  subtype: varchar("subtype", { length: 100 }).notNull(),
  // 劇症, 急性発症, 緩徐進行など
  description: text("description"),
  // 説明
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
});
var complications = mysqlTable("complications", {
  id: int("id").autoincrement().primaryKey(),
  category: varchar("category", { length: 50 }).notNull(),
  // 細血管障害, 大血管障害
  name: varchar("name", { length: 100 }).notNull(),
  // 網膜症, 腎症, 神経障害など
  subtype: varchar("subtype", { length: 100 }),
  // 単純/前増殖/増殖など
  diagnosticCriteria: text("diagnostic_criteria"),
  // 診断基準
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
});
var nephropathyStages = mysqlTable("nephropathy_stages", {
  id: int("id").autoincrement().primaryKey(),
  stage: int("stage").notNull(),
  // 1～5
  eGFRMin: decimal("egfr_min", { precision: 5, scale: 1 }),
  // eGFR最小値
  eGFRMax: decimal("egfr_max", { precision: 5, scale: 1 }),
  // eGFR最大値
  proteinRecommendationMin: decimal("protein_recommendation_min", { precision: 3, scale: 1 }).notNull(),
  // 推奨蛋白摂取量最小(g/kg)
  proteinRecommendationMax: decimal("protein_recommendation_max", { precision: 3, scale: 1 }).notNull(),
  // 推奨蛋白摂取量最大(g/kg)
  description: text("description"),
  // 説明
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
});
var drugInteractions = mysqlTable("drug_interactions", {
  id: int("id").autoincrement().primaryKey(),
  drugId1: int("drug_id_1").notNull(),
  // 薬剤1のID（oral_antidiabetic_drugs.id）
  drugId2: int("drug_id_2").notNull(),
  // 薬剤2のID
  interactionType: varchar("interaction_type", { length: 50 }).notNull(),
  // 相互作用の種類
  severity: varchar("severity", { length: 20 }).notNull(),
  // 重症度（軽度、中等度、重度）
  description: text("description"),
  // 相互作用の説明
  management: text("management"),
  // 対応方法
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
});
var adverseEffects = mysqlTable("adverse_effects", {
  id: int("id").autoincrement().primaryKey(),
  drugId: int("drug_id").notNull(),
  // 薬剤ID（oral_antidiabetic_drugs.id）
  effectName: varchar("effect_name", { length: 100 }).notNull(),
  // 副作用名
  incidence: varchar("incidence", { length: 50 }),
  // 発生頻度
  severity: varchar("severity", { length: 20 }).notNull(),
  // 重症度
  description: text("description"),
  // 説明
  management: text("management"),
  // 対応方法
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
});
var dosageAdjustmentGuides = mysqlTable("dosage_adjustment_guides", {
  id: int("id").autoincrement().primaryKey(),
  drugId: int("drug_id").notNull(),
  // 薬剤ID
  conditionType: varchar("condition_type", { length: 50 }).notNull(),
  // 調整条件（腎機能、肝機能、高齢者など）
  condition: varchar("condition", { length: 100 }).notNull(),
  // 具体的な条件
  adjustedDosage: text("adjusted_dosage"),
  // 調整後の用量
  notes: text("notes"),
  // 注記
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
});

// server/_core/env.ts
var ENV = {
  appId: process.env.VITE_APP_ID ?? "",
  cookieSecret: process.env.JWT_SECRET ?? "",
  databaseUrl: process.env.DATABASE_URL ?? "",
  oAuthServerUrl: process.env.OAUTH_SERVER_URL ?? "",
  ownerOpenId: process.env.OWNER_OPEN_ID ?? "",
  isProduction: process.env.NODE_ENV === "production",
  forgeApiUrl: process.env.BUILT_IN_FORGE_API_URL ?? "",
  forgeApiKey: process.env.BUILT_IN_FORGE_API_KEY ?? ""
};

// server/db.ts
var _db = null;
async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}
async function upsertUser(user) {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }
  try {
    const values = {
      openId: user.openId
    };
    const updateSet = {};
    const textFields = ["name", "email", "loginMethod"];
    const assignNullable = (field) => {
      const value = user[field];
      if (value === void 0) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };
    textFields.forEach(assignNullable);
    if (user.lastSignedIn !== void 0) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== void 0) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = "admin";
      updateSet.role = "admin";
    }
    if (!values.lastSignedIn) {
      values.lastSignedIn = /* @__PURE__ */ new Date();
    }
    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = /* @__PURE__ */ new Date();
    }
    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}
async function getUserByOpenId(openId) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return void 0;
  }
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : void 0;
}
async function getAllInsulinFormulations() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(insulinFormulations);
}
async function getAllOralAntidiabeticDrugs() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(oralAntidiabeticDrugs);
}
async function getAllGlucoseContainingFluids() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(glucoseContainingFluids);
}
async function getAllIVHFormulations() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(ivhFormulations);
}
async function getAllDiabetesClassifications() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(diabetesClassifications);
}
async function getAllComplications() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(complications);
}
async function getAllNephropathyStages() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(nephropathyStages).orderBy(nephropathyStages.stage);
}
async function getNephropathyStageByEGFR(egfr) {
  const db = await getDb();
  if (!db) return null;
  const stages = await db.select().from(nephropathyStages).orderBy(nephropathyStages.stage);
  for (const stage of stages) {
    const min = stage.eGFRMin ? parseFloat(stage.eGFRMin.toString()) : 0;
    const max = stage.eGFRMax ? parseFloat(stage.eGFRMax.toString()) : Infinity;
    if (egfr >= min && egfr <= max) {
      return stage;
    }
  }
  return null;
}

// server/_core/cookies.ts
function isSecureRequest(req) {
  if (req.protocol === "https") return true;
  const forwardedProto = req.headers["x-forwarded-proto"];
  if (!forwardedProto) return false;
  const protoList = Array.isArray(forwardedProto) ? forwardedProto : forwardedProto.split(",");
  return protoList.some((proto) => proto.trim().toLowerCase() === "https");
}
function getSessionCookieOptions(req) {
  return {
    httpOnly: true,
    path: "/",
    sameSite: "none",
    secure: isSecureRequest(req)
  };
}

// shared/_core/errors.ts
var HttpError = class extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.name = "HttpError";
  }
};
var ForbiddenError = (msg) => new HttpError(403, msg);

// server/_core/sdk.ts
import axios from "axios";
import { parse as parseCookieHeader } from "cookie";
import { SignJWT, jwtVerify } from "jose";
var isNonEmptyString = (value) => typeof value === "string" && value.length > 0;
var EXCHANGE_TOKEN_PATH = `/webdev.v1.WebDevAuthPublicService/ExchangeToken`;
var GET_USER_INFO_PATH = `/webdev.v1.WebDevAuthPublicService/GetUserInfo`;
var GET_USER_INFO_WITH_JWT_PATH = `/webdev.v1.WebDevAuthPublicService/GetUserInfoWithJwt`;
var OAuthService = class {
  constructor(client) {
    this.client = client;
    console.log("[OAuth] Initialized with baseURL:", ENV.oAuthServerUrl);
    if (!ENV.oAuthServerUrl) {
      console.error(
        "[OAuth] ERROR: OAUTH_SERVER_URL is not configured! Set OAUTH_SERVER_URL environment variable."
      );
    }
  }
  decodeState(state) {
    const redirectUri = atob(state);
    return redirectUri;
  }
  async getTokenByCode(code, state) {
    const payload = {
      clientId: ENV.appId,
      grantType: "authorization_code",
      code,
      redirectUri: this.decodeState(state)
    };
    const { data } = await this.client.post(
      EXCHANGE_TOKEN_PATH,
      payload
    );
    return data;
  }
  async getUserInfoByToken(token) {
    const { data } = await this.client.post(
      GET_USER_INFO_PATH,
      {
        accessToken: token.accessToken
      }
    );
    return data;
  }
};
var createOAuthHttpClient = () => axios.create({
  baseURL: ENV.oAuthServerUrl,
  timeout: AXIOS_TIMEOUT_MS
});
var SDKServer = class {
  client;
  oauthService;
  constructor(client = createOAuthHttpClient()) {
    this.client = client;
    this.oauthService = new OAuthService(this.client);
  }
  deriveLoginMethod(platforms, fallback) {
    if (fallback && fallback.length > 0) return fallback;
    if (!Array.isArray(platforms) || platforms.length === 0) return null;
    const set = new Set(
      platforms.filter((p) => typeof p === "string")
    );
    if (set.has("REGISTERED_PLATFORM_EMAIL")) return "email";
    if (set.has("REGISTERED_PLATFORM_GOOGLE")) return "google";
    if (set.has("REGISTERED_PLATFORM_APPLE")) return "apple";
    if (set.has("REGISTERED_PLATFORM_MICROSOFT") || set.has("REGISTERED_PLATFORM_AZURE"))
      return "microsoft";
    if (set.has("REGISTERED_PLATFORM_GITHUB")) return "github";
    const first = Array.from(set)[0];
    return first ? first.toLowerCase() : null;
  }
  /**
   * Exchange OAuth authorization code for access token
   * @example
   * const tokenResponse = await sdk.exchangeCodeForToken(code, state);
   */
  async exchangeCodeForToken(code, state) {
    return this.oauthService.getTokenByCode(code, state);
  }
  /**
   * Get user information using access token
   * @example
   * const userInfo = await sdk.getUserInfo(tokenResponse.accessToken);
   */
  async getUserInfo(accessToken) {
    const data = await this.oauthService.getUserInfoByToken({
      accessToken
    });
    const loginMethod = this.deriveLoginMethod(
      data?.platforms,
      data?.platform ?? data.platform ?? null
    );
    return {
      ...data,
      platform: loginMethod,
      loginMethod
    };
  }
  parseCookies(cookieHeader) {
    if (!cookieHeader) {
      return /* @__PURE__ */ new Map();
    }
    const parsed = parseCookieHeader(cookieHeader);
    return new Map(Object.entries(parsed));
  }
  getSessionSecret() {
    const secret = ENV.cookieSecret;
    return new TextEncoder().encode(secret);
  }
  /**
   * Create a session token for a Manus user openId
   * @example
   * const sessionToken = await sdk.createSessionToken(userInfo.openId);
   */
  async createSessionToken(openId, options = {}) {
    return this.signSession(
      {
        openId,
        appId: ENV.appId,
        name: options.name || ""
      },
      options
    );
  }
  async signSession(payload, options = {}) {
    const issuedAt = Date.now();
    const expiresInMs = options.expiresInMs ?? ONE_YEAR_MS;
    const expirationSeconds = Math.floor((issuedAt + expiresInMs) / 1e3);
    const secretKey = this.getSessionSecret();
    return new SignJWT({
      openId: payload.openId,
      appId: payload.appId,
      name: payload.name
    }).setProtectedHeader({ alg: "HS256", typ: "JWT" }).setExpirationTime(expirationSeconds).sign(secretKey);
  }
  async verifySession(cookieValue) {
    if (!cookieValue) {
      console.warn("[Auth] Missing session cookie");
      return null;
    }
    try {
      const secretKey = this.getSessionSecret();
      const { payload } = await jwtVerify(cookieValue, secretKey, {
        algorithms: ["HS256"]
      });
      const { openId, appId, name } = payload;
      if (!isNonEmptyString(openId) || !isNonEmptyString(appId) || !isNonEmptyString(name)) {
        console.warn("[Auth] Session payload missing required fields");
        return null;
      }
      return {
        openId,
        appId,
        name
      };
    } catch (error) {
      console.warn("[Auth] Session verification failed", String(error));
      return null;
    }
  }
  async getUserInfoWithJwt(jwtToken) {
    const payload = {
      jwtToken,
      projectId: ENV.appId
    };
    const { data } = await this.client.post(
      GET_USER_INFO_WITH_JWT_PATH,
      payload
    );
    const loginMethod = this.deriveLoginMethod(
      data?.platforms,
      data?.platform ?? data.platform ?? null
    );
    return {
      ...data,
      platform: loginMethod,
      loginMethod
    };
  }
  async authenticateRequest(req) {
    const cookies = this.parseCookies(req.headers.cookie);
    const sessionCookie = cookies.get(COOKIE_NAME);
    const session = await this.verifySession(sessionCookie);
    if (!session) {
      throw ForbiddenError("Invalid session cookie");
    }
    const sessionUserId = session.openId;
    const signedInAt = /* @__PURE__ */ new Date();
    let user = await getUserByOpenId(sessionUserId);
    if (!user) {
      try {
        const userInfo = await this.getUserInfoWithJwt(sessionCookie ?? "");
        await upsertUser({
          openId: userInfo.openId,
          name: userInfo.name || null,
          email: userInfo.email ?? null,
          loginMethod: userInfo.loginMethod ?? userInfo.platform ?? null,
          lastSignedIn: signedInAt
        });
        user = await getUserByOpenId(userInfo.openId);
      } catch (error) {
        console.error("[Auth] Failed to sync user from OAuth:", error);
        throw ForbiddenError("Failed to sync user info");
      }
    }
    if (!user) {
      throw ForbiddenError("User not found");
    }
    await upsertUser({
      openId: user.openId,
      lastSignedIn: signedInAt
    });
    return user;
  }
};
var sdk = new SDKServer();

// server/_core/oauth.ts
function getQueryParam(req, key) {
  const value = req.query[key];
  return typeof value === "string" ? value : void 0;
}
function registerOAuthRoutes(app) {
  app.get("/api/oauth/callback", async (req, res) => {
    const code = getQueryParam(req, "code");
    const state = getQueryParam(req, "state");
    if (!code || !state) {
      res.status(400).json({ error: "code and state are required" });
      return;
    }
    try {
      const tokenResponse = await sdk.exchangeCodeForToken(code, state);
      const userInfo = await sdk.getUserInfo(tokenResponse.accessToken);
      if (!userInfo.openId) {
        res.status(400).json({ error: "openId missing from user info" });
        return;
      }
      await upsertUser({
        openId: userInfo.openId,
        name: userInfo.name || null,
        email: userInfo.email ?? null,
        loginMethod: userInfo.loginMethod ?? userInfo.platform ?? null,
        lastSignedIn: /* @__PURE__ */ new Date()
      });
      const sessionToken = await sdk.createSessionToken(userInfo.openId, {
        name: userInfo.name || "",
        expiresInMs: ONE_YEAR_MS
      });
      const cookieOptions = getSessionCookieOptions(req);
      res.cookie(COOKIE_NAME, sessionToken, { ...cookieOptions, maxAge: ONE_YEAR_MS });
      res.redirect(302, "/");
    } catch (error) {
      console.error("[OAuth] Callback failed", error);
      res.status(500).json({ error: "OAuth callback failed" });
    }
  });
}

// server/_core/systemRouter.ts
import { z } from "zod";

// server/_core/notification.ts
import { TRPCError } from "@trpc/server";
var TITLE_MAX_LENGTH = 1200;
var CONTENT_MAX_LENGTH = 2e4;
var trimValue = (value) => value.trim();
var isNonEmptyString2 = (value) => typeof value === "string" && value.trim().length > 0;
var buildEndpointUrl = (baseUrl) => {
  const normalizedBase = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
  return new URL(
    "webdevtoken.v1.WebDevService/SendNotification",
    normalizedBase
  ).toString();
};
var validatePayload = (input) => {
  if (!isNonEmptyString2(input.title)) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Notification title is required."
    });
  }
  if (!isNonEmptyString2(input.content)) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Notification content is required."
    });
  }
  const title = trimValue(input.title);
  const content = trimValue(input.content);
  if (title.length > TITLE_MAX_LENGTH) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: `Notification title must be at most ${TITLE_MAX_LENGTH} characters.`
    });
  }
  if (content.length > CONTENT_MAX_LENGTH) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: `Notification content must be at most ${CONTENT_MAX_LENGTH} characters.`
    });
  }
  return { title, content };
};
async function notifyOwner(payload) {
  const { title, content } = validatePayload(payload);
  if (!ENV.forgeApiUrl) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Notification service URL is not configured."
    });
  }
  if (!ENV.forgeApiKey) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Notification service API key is not configured."
    });
  }
  const endpoint = buildEndpointUrl(ENV.forgeApiUrl);
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        accept: "application/json",
        authorization: `Bearer ${ENV.forgeApiKey}`,
        "content-type": "application/json",
        "connect-protocol-version": "1"
      },
      body: JSON.stringify({ title, content })
    });
    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.warn(
        `[Notification] Failed to notify owner (${response.status} ${response.statusText})${detail ? `: ${detail}` : ""}`
      );
      return false;
    }
    return true;
  } catch (error) {
    console.warn("[Notification] Error calling notification service:", error);
    return false;
  }
}

// server/_core/trpc.ts
import { initTRPC, TRPCError as TRPCError2 } from "@trpc/server";
import superjson from "superjson";
var t = initTRPC.context().create({
  transformer: superjson
});
var router = t.router;
var publicProcedure = t.procedure;
var requireUser = t.middleware(async (opts) => {
  const { ctx, next } = opts;
  if (!ctx.user) {
    throw new TRPCError2({ code: "UNAUTHORIZED", message: UNAUTHED_ERR_MSG });
  }
  return next({
    ctx: {
      ...ctx,
      user: ctx.user
    }
  });
});
var protectedProcedure = t.procedure.use(requireUser);
var adminProcedure = t.procedure.use(
  t.middleware(async (opts) => {
    const { ctx, next } = opts;
    if (!ctx.user || ctx.user.role !== "admin") {
      throw new TRPCError2({ code: "FORBIDDEN", message: NOT_ADMIN_ERR_MSG });
    }
    return next({
      ctx: {
        ...ctx,
        user: ctx.user
      }
    });
  })
);

// server/_core/systemRouter.ts
var systemRouter = router({
  health: publicProcedure.input(
    z.object({
      timestamp: z.number().min(0, "timestamp cannot be negative")
    })
  ).query(() => ({
    ok: true
  })),
  notifyOwner: adminProcedure.input(
    z.object({
      title: z.string().min(1, "title is required"),
      content: z.string().min(1, "content is required")
    })
  ).mutation(async ({ input }) => {
    const delivered = await notifyOwner(input);
    return {
      success: delivered
    };
  })
});

// server/routers.ts
import { z as z2 } from "zod";
var appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true
      };
    })
  }),
  // ============================================
  // CALC モジュール
  // ============================================
  calc: router({
    // 必要エネルギー計算
    calculateDailyCalories: publicProcedure.input(
      z2.object({
        heightCm: z2.number().min(100).max(250),
        // 身長(cm)
        activityLevel: z2.enum(["rest", "normal", "high"])
        // 安静/普通/高
      })
    ).query(({ input }) => {
      const heightM = input.heightCm / 100;
      const standardWeight = heightM * heightM * 22;
      const caloriePerKg = {
        rest: 25,
        normal: 30,
        high: 35
      }[input.activityLevel];
      const dailyCalories = standardWeight * caloriePerKg;
      const caloriesPerMeal = dailyCalories / 3;
      return {
        standardWeight: Math.round(standardWeight * 10) / 10,
        dailyCalories: Math.round(dailyCalories),
        caloriesPerMeal: Math.round(caloriesPerMeal)
      };
    }),
    // 糖尿病性腎症ステージ + 蛋白制限
    calculateNephropathyStage: publicProcedure.input(
      z2.object({
        eGFR: z2.number().min(0).max(200),
        albuminuria: z2.number().optional(),
        // 尿アルブミン値（任意）
        weight: z2.number().min(20).max(300)
        // 体重(kg)
      })
    ).query(async ({ input }) => {
      const stage = await getNephropathyStageByEGFR(input.eGFR);
      if (!stage) {
        return {
          stage: null,
          proteinRecommendationMin: null,
          proteinRecommendationMax: null,
          dailyProteinMin: null,
          dailyProteinMax: null
        };
      }
      const proteinMin = parseFloat(stage.proteinRecommendationMin.toString());
      const proteinMax = parseFloat(stage.proteinRecommendationMax.toString());
      return {
        stage: stage.stage,
        proteinRecommendationMin: proteinMin,
        proteinRecommendationMax: proteinMax,
        dailyProteinMin: Math.round(input.weight * proteinMin * 10) / 10,
        dailyProteinMax: Math.round(input.weight * proteinMax * 10) / 10
      };
    }),
    // 末梢糖含有輸液インスリン混注計算
    calculatePeripheralGlucoseInsulin: publicProcedure.input(
      z2.object({
        fluidId: z2.number()
        // 輸液ID
      })
    ).query(async ({ input }) => {
      const fluids = await getAllGlucoseContainingFluids();
      const fluid = fluids.find((f) => f.id === input.fluidId);
      if (!fluid) {
        return null;
      }
      const totalGlucose = parseFloat(fluid.totalGlucosePerBottle.toString());
      const insulinUnits5g = Math.round(totalGlucose / 5);
      const insulinUnits10g = Math.round(totalGlucose / 10);
      return {
        fluidName: fluid.brandName,
        totalGlucose,
        insulinUnits5g,
        insulinUnits10g,
        note: "\u672B\u68A2\u8F38\u6DB2\u306E\u5834\u5408\u30015g/\u5358\u4F4D\u307E\u305F\u306F10g/\u5358\u4F4D\u306E\u6BD4\u7387\u3092\u9078\u629E\u3057\u3066\u304F\u3060\u3055\u3044"
      };
    }),
    // IVH混注計算
    calculateIVHInsulin: publicProcedure.input(
      z2.object({
        ivhId: z2.number()
        // IVH製剤ID
      })
    ).query(async ({ input }) => {
      const ivhs = await getAllIVHFormulations();
      const ivh = ivhs.find((i) => i.id === input.ivhId);
      if (!ivh) {
        return null;
      }
      const totalGlucose = parseFloat(ivh.totalGlucose.toString());
      const insulinUnits10g = Math.round(totalGlucose / 10);
      const insulinUnits15g = Math.round(totalGlucose / 15);
      return {
        ivhName: ivh.brandName,
        totalGlucose,
        insulinUnits10g,
        insulinUnits15g,
        note: "IVH\u306F\u6301\u7D9A\u6295\u4E0E\u306E\u305F\u3081\u4F4E\u8840\u7CD6\u56DE\u907F\u76EE\u7684\u306710\uFF5E15g/\u5358\u4F4D\u3092\u63A1\u7528"
      };
    }),
    // スライディングスケール作成
    createSlidingScale: publicProcedure.input(
      z2.object({
        weight: z2.number().min(20).max(300),
        // 体重(kg)
        severity: z2.enum(["mild", "moderate", "severe"])
        // 軽症・中等度・高度
      })
    ).query(({ input }) => {
      const baseUnits = {
        mild: 0.3,
        moderate: 0.5,
        severe: 0.7
      }[input.severity];
      const insulinPerUnit = input.weight * baseUnits;
      const scale = [
        { bloodGlucose: "\uFF5E100", insulin: 0 },
        { bloodGlucose: "101\uFF5E150", insulin: Math.round(insulinPerUnit * 0.5) },
        { bloodGlucose: "151\uFF5E200", insulin: Math.round(insulinPerUnit * 1) },
        { bloodGlucose: "201\uFF5E250", insulin: Math.round(insulinPerUnit * 1.5) },
        { bloodGlucose: "251\uFF5E300", insulin: Math.round(insulinPerUnit * 2) },
        { bloodGlucose: "301\uFF5E", insulin: Math.round(insulinPerUnit * 2.5) }
      ];
      return {
        severity: input.severity,
        weight: input.weight,
        baseUnits: insulinPerUnit,
        scale
      };
    }),
    // 全ての糖含有輸液を取得
    getAllGlucoseFluids: publicProcedure.query(async () => {
      return await getAllGlucoseContainingFluids();
    }),
    // 全てのIVH製剤を取得
    getAllIVHFormulations: publicProcedure.query(async () => {
      return await getAllIVHFormulations();
    })
  }),
  // ============================================
  // GUIDE モジュール
  // ============================================
  guide: router({
    // インスリン製剤一覧
    getInsulinFormulations: publicProcedure.query(async () => {
      return await getAllInsulinFormulations();
    }),
    // 経口血糖降下薬一覧
    getOralAntidiabeticDrugs: publicProcedure.query(async () => {
      return await getAllOralAntidiabeticDrugs();
    }),
    // 糖尿病分類
    getDiabetesClassifications: publicProcedure.query(async () => {
      return await getAllDiabetesClassifications();
    }),
    // 合併症
    getComplications: publicProcedure.query(async () => {
      return await getAllComplications();
    }),
    // 腎症ステージ
    getNephropathyStages: publicProcedure.query(async () => {
      return await getAllNephropathyStages();
    })
  })
});

// server/_core/context.ts
async function createContext(opts) {
  let user = null;
  try {
    user = await sdk.authenticateRequest(opts.req);
  } catch (error) {
    user = null;
  }
  return {
    req: opts.req,
    res: opts.res,
    user
  };
}

// server/_core/vite.ts
import express from "express";
import fs2 from "fs";
import { nanoid } from "nanoid";
import path2 from "path";
import { createServer as createViteServer } from "vite";

// vite.config.ts
import { jsxLocPlugin } from "@builder.io/vite-plugin-jsx-loc";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "node:path";
import { defineConfig } from "vite";
import { vitePluginManusRuntime } from "vite-plugin-manus-runtime";
var PROJECT_ROOT = import.meta.dirname;
var LOG_DIR = path.join(PROJECT_ROOT, ".manus-logs");
var MAX_LOG_SIZE_BYTES = 1 * 1024 * 1024;
var TRIM_TARGET_BYTES = Math.floor(MAX_LOG_SIZE_BYTES * 0.6);
function ensureLogDir() {
  if (!fs.existsSync(LOG_DIR)) {
    fs.mkdirSync(LOG_DIR, { recursive: true });
  }
}
function trimLogFile(logPath, maxSize) {
  try {
    if (!fs.existsSync(logPath) || fs.statSync(logPath).size <= maxSize) {
      return;
    }
    const lines = fs.readFileSync(logPath, "utf-8").split("\n");
    const keptLines = [];
    let keptBytes = 0;
    const targetSize = TRIM_TARGET_BYTES;
    for (let i = lines.length - 1; i >= 0; i--) {
      const lineBytes = Buffer.byteLength(`${lines[i]}
`, "utf-8");
      if (keptBytes + lineBytes > targetSize) break;
      keptLines.unshift(lines[i]);
      keptBytes += lineBytes;
    }
    fs.writeFileSync(logPath, keptLines.join("\n"), "utf-8");
  } catch {
  }
}
function writeToLogFile(source, entries) {
  if (entries.length === 0) return;
  ensureLogDir();
  const logPath = path.join(LOG_DIR, `${source}.log`);
  const lines = entries.map((entry) => {
    const ts = (/* @__PURE__ */ new Date()).toISOString();
    return `[${ts}] ${JSON.stringify(entry)}`;
  });
  fs.appendFileSync(logPath, `${lines.join("\n")}
`, "utf-8");
  trimLogFile(logPath, MAX_LOG_SIZE_BYTES);
}
function vitePluginManusDebugCollector() {
  return {
    name: "manus-debug-collector",
    transformIndexHtml(html) {
      if (process.env.NODE_ENV === "production") {
        return html;
      }
      return {
        html,
        tags: [
          {
            tag: "script",
            attrs: {
              src: "/__manus__/debug-collector.js",
              defer: true
            },
            injectTo: "head"
          }
        ]
      };
    },
    configureServer(server) {
      server.middlewares.use("/__manus__/logs", (req, res, next) => {
        if (req.method !== "POST") {
          return next();
        }
        const handlePayload = (payload) => {
          if (payload.consoleLogs?.length > 0) {
            writeToLogFile("browserConsole", payload.consoleLogs);
          }
          if (payload.networkRequests?.length > 0) {
            writeToLogFile("networkRequests", payload.networkRequests);
          }
          if (payload.sessionEvents?.length > 0) {
            writeToLogFile("sessionReplay", payload.sessionEvents);
          }
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ success: true }));
        };
        const reqBody = req.body;
        if (reqBody && typeof reqBody === "object") {
          try {
            handlePayload(reqBody);
          } catch (e) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ success: false, error: String(e) }));
          }
          return;
        }
        let body = "";
        req.on("data", (chunk) => {
          body += chunk.toString();
        });
        req.on("end", () => {
          try {
            const payload = JSON.parse(body);
            handlePayload(payload);
          } catch (e) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ success: false, error: String(e) }));
          }
        });
      });
    }
  };
}
var plugins = [react(), tailwindcss(), jsxLocPlugin(), vitePluginManusRuntime(), vitePluginManusDebugCollector()];
var vite_config_default = defineConfig({
  plugins,
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  envDir: path.resolve(import.meta.dirname),
  root: path.resolve(import.meta.dirname, "client"),
  publicDir: path.resolve(import.meta.dirname, "client", "public"),
  base: process.env.GITHUB_PAGES === "true" ? "/dm-compass/" : "/",
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    host: true,
    allowedHosts: [
      ".manuspre.computer",
      ".manus.computer",
      ".manus-asia.computer",
      ".manuscomputer.ai",
      ".manusvm.computer",
      "localhost",
      "127.0.0.1"
    ],
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/_core/vite.ts
async function setupVite(app, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    server: serverOptions,
    appType: "custom"
  });
  app.use(vite.middlewares);
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "../..",
        "client",
        "index.html"
      );
      let template = await fs2.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app) {
  const distPath = process.env.NODE_ENV === "development" ? path2.resolve(import.meta.dirname, "../..", "dist", "public") : path2.resolve(import.meta.dirname, "public");
  if (!fs2.existsSync(distPath)) {
    console.error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app.use(express.static(distPath));
  app.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/_core/index.ts
function isPortAvailable(port) {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}
async function findAvailablePort(startPort = 3e3) {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}
async function startServer() {
  const app = express2();
  const server = createServer(app);
  app.use(express2.json({ limit: "50mb" }));
  app.use(express2.urlencoded({ limit: "50mb", extended: true }));
  registerOAuthRoutes(app);
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext
    })
  );
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);
  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }
  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}
startServer().catch(console.error);
