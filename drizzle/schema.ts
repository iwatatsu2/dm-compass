import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, decimal } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
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
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// ============================================
// インスリン製剤テーブル
// ============================================

export const insulinFormulations = mysqlTable("insulin_formulations", {
  id: int("id").autoincrement().primaryKey(),
  category: varchar("category", { length: 50 }).notNull(), // 超超速効型, 超速効型, 速効型, 中間型, 持効型, 混合型, 週1回基礎
  genericName: varchar("generic_name", { length: 100 }).notNull(), // 一般名
  brandName: varchar("brand_name", { length: 100 }).notNull(), // 商品名
  onsetTime: varchar("onset_time", { length: 50 }), // 作用発現時間
  peakTime: varchar("peak_time", { length: 50 }), // ピーク時間
  duration: varchar("duration", { length: 50 }), // 持続時間
  wardUse: text("ward_use"), // 病棟での使い分け
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type InsulinFormulation = typeof insulinFormulations.$inferSelect;
export type InsertInsulinFormulation = typeof insulinFormulations.$inferInsert;

// ============================================
// 経口血糖降下薬テーブル
// ============================================

export const oralAntidiabeticDrugs = mysqlTable("oral_antidiabetic_drugs", {
  id: int("id").autoincrement().primaryKey(),
  class: varchar("class", { length: 50 }).notNull(), // ビグアナイド, SGLT2阻害薬, DPP-4阻害薬, GLP-1受容体作動薬, SU薬, グリニド, α-GI, チアゾリジン
  genericName: varchar("generic_name", { length: 100 }).notNull(), // 一般名
  brandName: varchar("brand_name", { length: 100 }).notNull(), // 販売名
  contraindications: text("contraindications"), // 禁忌
  perioperativeSuspensionDays: int("perioperative_suspension_days"), // 周術期休薬日数
  resumptionGuidance: text("resumption_guidance"), // 再開目安
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type OralAntidiabeticDrug = typeof oralAntidiabeticDrugs.$inferSelect;
export type InsertOralAntidiabeticDrug = typeof oralAntidiabeticDrugs.$inferInsert;

// ============================================
// 糖含有輸液テーブル
// ============================================

export const glucoseContainingFluids = mysqlTable("glucose_containing_fluids", {
  id: int("id").autoincrement().primaryKey(),
  category: varchar("category", { length: 50 }).notNull(), // ブドウ糖単独, 糖含有電解質液
  brandName: varchar("brand_name", { length: 100 }).notNull(), // 商品名
  volume: int("volume").notNull(), // 容量（mL）
  glucoseConcentration: decimal("glucose_concentration", { precision: 5, scale: 2 }).notNull(), // 糖濃度（％）
  totalGlucosePerBottle: decimal("total_glucose_per_bottle", { precision: 8, scale: 2 }).notNull(), // 1本あたり総糖量(g)
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type GlucoseContainingFluid = typeof glucoseContainingFluids.$inferSelect;
export type InsertGlucoseContainingFluid = typeof glucoseContainingFluids.$inferInsert;

// ============================================
// IVH製剤テーブル
// ============================================

export const ivhFormulations = mysqlTable("ivh_formulations", {
  id: int("id").autoincrement().primaryKey(),
  brandName: varchar("brand_name", { length: 100 }).notNull(), // 商品名
  totalGlucose: decimal("total_glucose", { precision: 8, scale: 2 }).notNull(), // 総糖量(g)
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type IVHFormulation = typeof ivhFormulations.$inferSelect;
export type InsertIVHFormulation = typeof ivhFormulations.$inferInsert;

// ============================================
// 糖尿病分類テーブル
// ============================================

export const diabetesClassifications = mysqlTable("diabetes_classifications", {
  id: int("id").autoincrement().primaryKey(),
  type: varchar("type", { length: 50 }).notNull(), // 1型, 2型, その他
  subtype: varchar("subtype", { length: 100 }).notNull(), // 劇症, 急性発症, 緩徐進行など
  description: text("description"), // 説明
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type DiabetesClassification = typeof diabetesClassifications.$inferSelect;
export type InsertDiabetesClassification = typeof diabetesClassifications.$inferInsert;

// ============================================
// 合併症テーブル
// ============================================

export const complications = mysqlTable("complications", {
  id: int("id").autoincrement().primaryKey(),
  category: varchar("category", { length: 50 }).notNull(), // 細血管障害, 大血管障害
  name: varchar("name", { length: 100 }).notNull(), // 網膜症, 腎症, 神経障害など
  subtype: varchar("subtype", { length: 100 }), // 単純/前増殖/増殖など
  diagnosticCriteria: text("diagnostic_criteria"), // 診断基準
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Complication = typeof complications.$inferSelect;
export type InsertComplication = typeof complications.$inferInsert;

// ============================================
// 腎症ステージテーブル
// ============================================

export const nephropathyStages = mysqlTable("nephropathy_stages", {
  id: int("id").autoincrement().primaryKey(),
  stage: int("stage").notNull(), // 1～5
  eGFRMin: decimal("egfr_min", { precision: 5, scale: 1 }), // eGFR最小値
  eGFRMax: decimal("egfr_max", { precision: 5, scale: 1 }), // eGFR最大値
  proteinRecommendationMin: decimal("protein_recommendation_min", { precision: 3, scale: 1 }).notNull(), // 推奨蛋白摂取量最小(g/kg)
  proteinRecommendationMax: decimal("protein_recommendation_max", { precision: 3, scale: 1 }).notNull(), // 推奨蛋白摂取量最大(g/kg)
  description: text("description"), // 説明
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type NephropathyStage = typeof nephropathyStages.$inferSelect;
export type InsertNephropathyStage = typeof nephropathyStages.$inferInsert;
