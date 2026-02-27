import { describe, expect, it } from "vitest";

// ============================================
// 必要エネルギー計算テスト
// ============================================

describe("Daily Calorie Calculator", () => {
  function calculateDailyCalories(heightCm: number, activityLevel: "rest" | "normal" | "high") {
    const heightM = heightCm / 100;
    const standardWeight = heightM * heightM * 22;

    const caloriePerKg = {
      rest: 25,
      normal: 30,
      high: 35,
    }[activityLevel];

    const dailyCalories = standardWeight * caloriePerKg;
    const caloriesPerMeal = dailyCalories / 3;

    return {
      standardWeight: Math.round(standardWeight * 10) / 10,
      dailyCalories: Math.round(dailyCalories),
      caloriesPerMeal: Math.round(caloriesPerMeal),
    };
  }

  it("calculates standard weight correctly", () => {
    const result = calculateDailyCalories(170, "normal");
    // 170cm -> 1.7m -> 1.7^2 * 22 = 63.58kg
    expect(result.standardWeight).toBe(63.6);
  });

  it("calculates daily calories for rest activity", () => {
    const result = calculateDailyCalories(170, "rest");
    // 63.58 * 25 = 1589.5 -> 1589
    expect(result.dailyCalories).toBe(1589);
  });

  it("calculates daily calories for normal activity", () => {
    const result = calculateDailyCalories(170, "normal");
    // 63.58 * 30 = 1907.4 -> 1907
    expect(result.dailyCalories).toBe(1907);
  });

  it("calculates daily calories for high activity", () => {
    const result = calculateDailyCalories(170, "high");
    // 63.58 * 35 = 2225.3 -> 2225
    expect(result.dailyCalories).toBe(2225);
  });

  it("calculates calories per meal correctly", () => {
    const result = calculateDailyCalories(170, "normal");
    // 1907 / 3 = 635.67 -> 636
    expect(result.caloriesPerMeal).toBe(636);
  });
});

// ============================================
// 腎症ステージ判定テスト
// ============================================

describe("Nephropathy Stage Determination", () => {
  function getNephropathyStage(egfr: number) {
    let stage = 1;
    let proteinMin = 0.8;
    let proteinMax = 1.0;

    if (egfr < 90) stage = 2;
    if (egfr < 60) {
      stage = 3;
      proteinMin = 0.8;
      proteinMax = 0.8;
    }
    if (egfr < 30) {
      stage = 4;
      proteinMin = 0.6;
      proteinMax = 0.8;
    }
    if (egfr < 15) {
      stage = 5;
      proteinMin = 0.6;
      proteinMax = 0.6;
    }

    return { stage, proteinMin, proteinMax };
  }

  it("determines stage 1 for eGFR >= 90", () => {
    const result = getNephropathyStage(100);
    expect(result.stage).toBe(1);
    expect(result.proteinMin).toBe(0.8);
    expect(result.proteinMax).toBe(1.0);
  });

  it("determines stage 2 for 60 <= eGFR < 90", () => {
    const result = getNephropathyStage(75);
    expect(result.stage).toBe(2);
  });

  it("determines stage 3 for 30 <= eGFR < 60", () => {
    const result = getNephropathyStage(45);
    expect(result.stage).toBe(3);
    expect(result.proteinMin).toBe(0.8);
    expect(result.proteinMax).toBe(0.8);
  });

  it("determines stage 4 for 15 <= eGFR < 30", () => {
    const result = getNephropathyStage(20);
    expect(result.stage).toBe(4);
    expect(result.proteinMin).toBe(0.6);
    expect(result.proteinMax).toBe(0.8);
  });

  it("determines stage 5 for eGFR < 15", () => {
    const result = getNephropathyStage(10);
    expect(result.stage).toBe(5);
    expect(result.proteinMin).toBe(0.6);
    expect(result.proteinMax).toBe(0.6);
  });
});

// ============================================
// インスリン混注計算テスト
// ============================================

describe("Insulin Mixing Calculation", () => {
  function calculatePeripheralGlucoseInsulin(totalGlucose: number) {
    const insulinUnits5g = Math.round(totalGlucose / 5);
    const insulinUnits10g = Math.round(totalGlucose / 10);
    return { insulinUnits5g, insulinUnits10g };
  }

  it("calculates insulin units for 5g/unit", () => {
    const result = calculatePeripheralGlucoseInsulin(50);
    expect(result.insulinUnits5g).toBe(10);
  });

  it("calculates insulin units for 10g/unit", () => {
    const result = calculatePeripheralGlucoseInsulin(50);
    expect(result.insulinUnits10g).toBe(5);
  });

  it("rounds correctly for 5g/unit", () => {
    const result = calculatePeripheralGlucoseInsulin(27);
    expect(result.insulinUnits5g).toBe(5); // 27/5 = 5.4 -> 5
  });

  it("rounds correctly for 10g/unit", () => {
    const result = calculatePeripheralGlucoseInsulin(27);
    expect(result.insulinUnits10g).toBe(3); // 27/10 = 2.7 -> 3
  });
});

// ============================================
// IVH混注計算テスト
// ============================================

describe("IVH Insulin Calculation", () => {
  function calculateIVHInsulin(totalGlucose: number) {
    const insulinUnits10g = Math.round(totalGlucose / 10);
    const insulinUnits15g = Math.round(totalGlucose / 15);
    return { insulinUnits10g, insulinUnits15g };
  }

  it("calculates insulin units for 10g/unit", () => {
    const result = calculateIVHInsulin(100);
    expect(result.insulinUnits10g).toBe(10);
  });

  it("calculates insulin units for 15g/unit", () => {
    const result = calculateIVHInsulin(100);
    expect(result.insulinUnits15g).toBe(7); // 100/15 = 6.67 -> 7
  });

  it("handles decimal values correctly", () => {
    const result = calculateIVHInsulin(75);
    expect(result.insulinUnits10g).toBe(8); // 75/10 = 7.5 -> 8
    expect(result.insulinUnits15g).toBe(5); // 75/15 = 5
  });
});

// ============================================
// スライディングスケール作成テスト
// ============================================

describe("Sliding Scale Calculator", () => {
  function createSlidingScale(weight: number, severity: "mild" | "moderate" | "severe") {
    const baseUnits = {
      mild: 0.3,
      moderate: 0.5,
      severe: 0.7,
    }[severity];

    const insulinPerUnit = weight * baseUnits;

    const scale = [
      { bloodGlucose: "～100", insulin: 0 },
      { bloodGlucose: "101～150", insulin: Math.round(insulinPerUnit * 0.5) },
      { bloodGlucose: "151～200", insulin: Math.round(insulinPerUnit * 1) },
      { bloodGlucose: "201～250", insulin: Math.round(insulinPerUnit * 1.5) },
      { bloodGlucose: "251～300", insulin: Math.round(insulinPerUnit * 2) },
      { bloodGlucose: "301～", insulin: Math.round(insulinPerUnit * 2.5) },
    ];

    return { scale, baseUnits: insulinPerUnit };
  }

  it("creates scale for mild severity", () => {
    const result = createSlidingScale(70, "mild");
    expect(result.baseUnits).toBe(21); // 70 * 0.3
    expect(result.scale[1].insulin).toBe(11); // 21 * 0.5 = 10.5 -> 11
  });

  it("creates scale for moderate severity", () => {
    const result = createSlidingScale(70, "moderate");
    expect(result.baseUnits).toBe(35); // 70 * 0.5
    expect(result.scale[2].insulin).toBe(35); // 35 * 1
  });

  it("creates scale for severe severity", () => {
    const result = createSlidingScale(70, "severe");
    expect(result.baseUnits).toBe(49); // 70 * 0.7
    expect(result.scale[5].insulin).toBe(123); // 49 * 2.5 = 122.5 -> 123
  });

  it("has correct number of scale entries", () => {
    const result = createSlidingScale(70, "moderate");
    expect(result.scale).toHaveLength(6);
  });

  it("scale starts with 0 insulin for low blood glucose", () => {
    const result = createSlidingScale(70, "moderate");
    expect(result.scale[0].insulin).toBe(0);
  });
});
