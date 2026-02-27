import { describe, expect, it } from "vitest";

// ============================================
// インスリン製剤フィルタリングテスト
// ============================================

describe("Insulin Formulation Filtering", () => {
  const mockInsulinData = [
    { id: 1, category: "超超速効型", brandName: "フィアスプ", genericName: "アスパルト酸速効型" },
    { id: 2, category: "超超速効型", brandName: "ルムジェブ", genericName: "リスプロ速効型" },
    { id: 3, category: "超速効型", brandName: "ノボラピッド", genericName: "アスパルト" },
    { id: 4, category: "持効型", brandName: "ランタス", genericName: "グラルギン" },
    { id: 5, category: "週1回基礎", brandName: "アウィクリ", genericName: "デグルデク週1回" },
  ];

  function filterByCategory(data: typeof mockInsulinData, category: string) {
    if (!category) return data;
    return data.filter((item) => item.category === category);
  }

  function filterBySearch(data: typeof mockInsulinData, query: string) {
    if (!query) return data;
    return data.filter(
      (item) =>
        item.brandName.toLowerCase().includes(query.toLowerCase()) ||
        item.genericName.toLowerCase().includes(query.toLowerCase())
    );
  }

  it("filters by category correctly", () => {
    const result = filterByCategory(mockInsulinData, "超超速効型");
    expect(result).toHaveLength(2);
    expect(result[0].brandName).toBe("フィアスプ");
  });

  it("returns all items when category is empty", () => {
    const result = filterByCategory(mockInsulinData, "");
    expect(result).toHaveLength(5);
  });

  it("filters by search query (brand name)", () => {
    const result = filterBySearch(mockInsulinData, "ランタス");
    expect(result).toHaveLength(1);
    expect(result[0].brandName).toBe("ランタス");
  });

  it("filters by search query (generic name)", () => {
    const result = filterBySearch(mockInsulinData, "アスパルト");
    expect(result).toHaveLength(2);
  });

  it("filters by search query (case insensitive)", () => {
    const result = filterBySearch(mockInsulinData, "ランタス");
    expect(result).toHaveLength(1);
  });

  it("returns empty array for non-matching search", () => {
    const result = filterBySearch(mockInsulinData, "存在しない薬");
    expect(result).toHaveLength(0);
  });

  it("combines category and search filters", () => {
    const byCategory = filterByCategory(mockInsulinData, "超超速効型");
    const combined = filterBySearch(byCategory, "フィアスプ");
    expect(combined).toHaveLength(1);
    expect(combined[0].brandName).toBe("フィアスプ");
  });
});

// ============================================
// 経口薬フィルタリングテスト
// ============================================

describe("Oral Antidiabetic Drug Filtering", () => {
  const mockOralData = [
    { id: 1, class: "ビグアナイド", brandName: "グリコラン", genericName: "メトホルミン" },
    { id: 2, class: "SGLT2阻害薬", brandName: "フォシーガ", genericName: "ダパグリフロジン" },
    { id: 3, class: "DPP-4阻害薬", brandName: "ジャヌビア", genericName: "シタグリプチン" },
    { id: 4, class: "GLP-1受容体作動薬", brandName: "ビクトーザ", genericName: "リラグルチド" },
    { id: 5, class: "SU薬", brandName: "ダオニール", genericName: "グリベンクラミド" },
  ];

  function filterByClass(data: typeof mockOralData, drugClass: string) {
    if (!drugClass) return data;
    return data.filter((item) => item.class === drugClass);
  }

  function filterBySearch(data: typeof mockOralData, query: string) {
    if (!query) return data;
    return data.filter(
      (item) =>
        item.brandName.toLowerCase().includes(query.toLowerCase()) ||
        item.genericName.toLowerCase().includes(query.toLowerCase())
    );
  }

  it("filters by drug class correctly", () => {
    const result = filterByClass(mockOralData, "ビグアナイド");
    expect(result).toHaveLength(1);
    expect(result[0].brandName).toBe("グリコラン");
  });

  it("returns all items when class is empty", () => {
    const result = filterByClass(mockOralData, "");
    expect(result).toHaveLength(5);
  });

  it("filters by search query (brand name)", () => {
    const result = filterBySearch(mockOralData, "ジャヌビア");
    expect(result).toHaveLength(1);
    expect(result[0].class).toBe("DPP-4阻害薬");
  });

  it("filters by search query (generic name)", () => {
    const result = filterBySearch(mockOralData, "リラグルチド");
    expect(result).toHaveLength(1);
    expect(result[0].class).toBe("GLP-1受容体作動薬");
  });

  it("combines class and search filters", () => {
    const byClass = filterByClass(mockOralData, "SGLT2阻害薬");
    const combined = filterBySearch(byClass, "ダパグリフロジン");
    expect(combined).toHaveLength(1);
    expect(combined[0].brandName).toBe("フォシーガ");
  });
});

// ============================================
// 検索結果カウントテスト
// ============================================

describe("Search Result Counting", () => {
  const mockData = [
    { id: 1, name: "Item 1", category: "A" },
    { id: 2, name: "Item 2", category: "A" },
    { id: 3, name: "Item 3", category: "B" },
    { id: 4, name: "Item 4", category: "B" },
    { id: 5, name: "Item 5", category: "C" },
  ];

  function getResultCount(data: typeof mockData, category: string, search: string) {
    let filtered = data;
    if (category) {
      filtered = filtered.filter((item) => item.category === category);
    }
    if (search) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    return filtered.length;
  }

  it("counts results correctly for category filter", () => {
    const count = getResultCount(mockData, "A", "");
    expect(count).toBe(2);
  });

  it("counts results correctly for search filter", () => {
    const count = getResultCount(mockData, "", "Item 1");
    expect(count).toBe(1);
  });

  it("counts results correctly for combined filters", () => {
    const count = getResultCount(mockData, "B", "Item 3");
    expect(count).toBe(1);
  });

  it("counts zero results for non-matching filters", () => {
    const count = getResultCount(mockData, "A", "Item 3");
    expect(count).toBe(0);
  });

  it("counts all results when no filters applied", () => {
    const count = getResultCount(mockData, "", "");
    expect(count).toBe(5);
  });
});

// ============================================
// 一意のカテゴリ抽出テスト
// ============================================

describe("Unique Category Extraction", () => {
  const mockData = [
    { id: 1, category: "超超速効型" },
    { id: 2, category: "超超速効型" },
    { id: 3, category: "超速効型" },
    { id: 4, category: "持効型" },
    { id: 5, category: "持効型" },
  ];

  function getUniqueCategories(data: typeof mockData) {
    return Array.from(new Set(data.map((item) => item.category)));
  }

  it("extracts unique categories", () => {
    const categories = getUniqueCategories(mockData);
    expect(categories).toHaveLength(3);
    expect(categories).toContain("超超速効型");
    expect(categories).toContain("超速効型");
    expect(categories).toContain("持効型");
  });

  it("maintains order of first occurrence", () => {
    const categories = getUniqueCategories(mockData);
    expect(categories[0]).toBe("超超速効型");
    expect(categories[1]).toBe("超速効型");
  });

  it("handles empty data", () => {
    const categories = getUniqueCategories([]);
    expect(categories).toHaveLength(0);
  });
});
