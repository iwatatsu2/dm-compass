import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import {
  getAllInsulinFormulations,
  getAllOralAntidiabeticDrugs,
  getAllGlucoseContainingFluids,
  getAllIVHFormulations,
  getAllDiabetesClassifications,
  getAllComplications,
  getAllNephropathyStages,
  getNephropathyStageByEGFR,
} from "./db";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // ============================================
  // CALC モジュール
  // ============================================
  calc: router({
    // 必要エネルギー計算
    calculateDailyCalories: publicProcedure
      .input(
        z.object({
          heightCm: z.number().min(100).max(250), // 身長(cm)
          activityLevel: z.enum(["rest", "normal", "high"]), // 安静/普通/高
        })
      )
      .query(({ input }) => {
        const heightM = input.heightCm / 100;
        const standardWeight = heightM * heightM * 22; // 標準体重 = 身長(m)^2 × 22

        const caloriePerKg = {
          rest: 25,
          normal: 30,
          high: 35,
        }[input.activityLevel];

        const dailyCalories = standardWeight * caloriePerKg;
        const caloriesPerMeal = dailyCalories / 3;

        return {
          standardWeight: Math.round(standardWeight * 10) / 10,
          dailyCalories: Math.round(dailyCalories),
          caloriesPerMeal: Math.round(caloriesPerMeal),
        };
      }),

    // 糖尿病性腎症ステージ + 蛋白制限
    calculateNephropathyStage: publicProcedure
      .input(
        z.object({
          eGFR: z.number().min(0).max(200),
          albuminuria: z.number().optional(), // 尿アルブミン値（任意）
          weight: z.number().min(20).max(300), // 体重(kg)
        })
      )
      .query(async ({ input }) => {
        const stage = await getNephropathyStageByEGFR(input.eGFR);

        if (!stage) {
          return {
            stage: null,
            proteinRecommendationMin: null,
            proteinRecommendationMax: null,
            dailyProteinMin: null,
            dailyProteinMax: null,
          };
        }

        const proteinMin = parseFloat(stage.proteinRecommendationMin.toString());
        const proteinMax = parseFloat(stage.proteinRecommendationMax.toString());

        return {
          stage: stage.stage,
          proteinRecommendationMin: proteinMin,
          proteinRecommendationMax: proteinMax,
          dailyProteinMin: Math.round(input.weight * proteinMin * 10) / 10,
          dailyProteinMax: Math.round(input.weight * proteinMax * 10) / 10,
        };
      }),

    // 末梢糖含有輸液インスリン混注計算
    calculatePeripheralGlucoseInsulin: publicProcedure
      .input(
        z.object({
          fluidId: z.number(), // 輸液ID
        })
      )
      .query(async ({ input }) => {
        const fluids = await getAllGlucoseContainingFluids();
        const fluid = fluids.find(f => f.id === input.fluidId);

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
          note: "末梢輸液の場合、5g/単位または10g/単位の比率を選択してください",
        };
      }),

    // IVH混注計算
    calculateIVHInsulin: publicProcedure
      .input(
        z.object({
          ivhId: z.number(), // IVH製剤ID
        })
      )
      .query(async ({ input }) => {
        const ivhs = await getAllIVHFormulations();
        const ivh = ivhs.find(i => i.id === input.ivhId);

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
          note: "IVHは持続投与のため低血糖回避目的で10～15g/単位を採用",
        };
      }),

    // スライディングスケール作成
    createSlidingScale: publicProcedure
      .input(
        z.object({
          weight: z.number().min(20).max(300), // 体重(kg)
          severity: z.enum(["mild", "moderate", "severe"]), // 軽症・中等度・高度
        })
      )
      .query(({ input }) => {
        // 基本インスリン単位を体重に応じて決定
        const baseUnits = {
          mild: 0.3,
          moderate: 0.5,
          severe: 0.7,
        }[input.severity];

        const insulinPerUnit = input.weight * baseUnits;

        // 血糖値別補正インスリン表を生成
        const scale = [
          { bloodGlucose: "～100", insulin: 0 },
          { bloodGlucose: "101～150", insulin: Math.round(insulinPerUnit * 0.5) },
          { bloodGlucose: "151～200", insulin: Math.round(insulinPerUnit * 1) },
          { bloodGlucose: "201～250", insulin: Math.round(insulinPerUnit * 1.5) },
          { bloodGlucose: "251～300", insulin: Math.round(insulinPerUnit * 2) },
          { bloodGlucose: "301～", insulin: Math.round(insulinPerUnit * 2.5) },
        ];

        return {
          severity: input.severity,
          weight: input.weight,
          baseUnits: insulinPerUnit,
          scale,
        };
      }),

    // 全ての糖含有輸液を取得
    getAllGlucoseFluids: publicProcedure.query(async () => {
      return await getAllGlucoseContainingFluids();
    }),

    // 全てのIVH製剤を取得
    getAllIVHFormulations: publicProcedure.query(async () => {
      return await getAllIVHFormulations();
    }),
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
    }),
  }),
});

export type AppRouter = typeof appRouter;
