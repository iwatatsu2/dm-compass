import { useState, useMemo } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, ChevronDown, Search, X } from "lucide-react";
import { trpc } from "@/lib/trpc";

export default function GuidePageEnhanced() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState<"insulin" | "oral" | "classification" | "complications">("insulin");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<string>("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // データを取得
  const { data: insulinData } = trpc.guide.getInsulinFormulations.useQuery();
  const { data: oralData } = trpc.guide.getOralAntidiabeticDrugs.useQuery();
  const { data: classificationData } = trpc.guide.getDiabetesClassifications.useQuery();
  const { data: complicationsData } = trpc.guide.getComplications.useQuery();

  // インスリン製剤のフィルタリング
  const filteredInsulin = useMemo(() => {
    if (!insulinData) return [];
    return insulinData.filter((item) => {
      const matchesSearch =
        item.brandName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.genericName?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = !selectedFilter || selectedFilter === '__all__' || item.category === selectedFilter;
      return matchesSearch && matchesFilter;
    });
  }, [insulinData, searchQuery, selectedFilter]);

  // 経口薬のフィルタリング
  const filteredOral = useMemo(() => {
    if (!oralData) return [];
    return oralData.filter((item) => {
      const matchesSearch =
        item.brandName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.genericName?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = !selectedFilter || selectedFilter === '__all__' || item.class === selectedFilter;
      return matchesSearch && matchesFilter;
    });
  }, [oralData, searchQuery, selectedFilter]);

  const insulinCategories = useMemo(() => {
    if (!insulinData) return [];
    return Array.from(new Set(insulinData.map((item) => item.category)));
  }, [insulinData]);

  const oralClasses = useMemo(() => {
    if (!oralData) return [];
    return Array.from(new Set(oralData.map((item) => item.class)));
  }, [oralData]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* ヘッダー */}
      <header className="bg-card border-b border-border p-4 flex items-center">
        <button
          onClick={() => setLocation("/")}
          className="mr-3 text-secondary hover:opacity-80"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold flex-1">GUIDE - 医学情報</h1>
      </header>

      {/* タブナビゲーション */}
      <div className="bg-card border-b border-border overflow-x-auto">
        <div className="flex gap-2 p-2 max-w-md mx-auto">
          <TabButton
            label="インスリン"
            active={activeTab === "insulin"}
            onClick={() => {
              setActiveTab("insulin");
              setSearchQuery("");
              setSelectedFilter("__all__");
            }}
          />
          <TabButton
            label="経口薬"
            active={activeTab === "oral"}
            onClick={() => {
              setActiveTab("oral");
              setSearchQuery("");
              setSelectedFilter("__all__");
            }}
          />
          <TabButton
            label="分類"
            active={activeTab === "classification"}
            onClick={() => setActiveTab("classification")}
          />
          <TabButton
            label="合併症"
            active={activeTab === "complications"}
            onClick={() => setActiveTab("complications")}
          />
        </div>
      </div>

      {/* 検索・フィルタバー */}
      {(activeTab === "insulin" || activeTab === "oral") && (
        <div className="bg-card border-b border-border p-4">
          <div className="max-w-md mx-auto space-y-3">
            {/* 検索ボックス */}
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="商品名または一般名で検索"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-border text-foreground"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* フィルタセレクト */}
            <div>
              <Label htmlFor="filter" className="text-xs text-muted-foreground mb-1 block">
                {activeTab === "insulin" ? "製剤分類" : "薬剤クラス"}
              </Label>
              <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                <SelectTrigger className="bg-border text-foreground">
                  <SelectValue placeholder="すべてを表示" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="__all__">すべてを表示</SelectItem>
                  {(activeTab === "insulin" ? insulinCategories : oralClasses).map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* 検索結果数 */}
            <p className="text-xs text-muted-foreground">
              {activeTab === "insulin"
                ? `${filteredInsulin.length}件の製剤が見つかりました`
                : `${filteredOral.length}件の薬剤が見つかりました`}
            </p>
          </div>
        </div>
      )}

      {/* コンテンツ */}
      <main className="flex-1 p-4 max-w-md mx-auto w-full overflow-y-auto">
        {activeTab === "insulin" && <InsulinGuideWithSearch data={filteredInsulin} expandedId={expandedId} setExpandedId={setExpandedId} />}
        {activeTab === "oral" && <OralDrugGuideWithSearch data={filteredOral} expandedId={expandedId} setExpandedId={setExpandedId} />}
        {activeTab === "classification" && <ClassificationGuide data={classificationData} />}
        {activeTab === "complications" && <ComplicationsGuide data={complicationsData} />}
      </main>

      {/* フッター */}
      <footer className="bg-card border-t border-border p-4 text-center">
        <p className="text-xs text-muted-foreground">
          本アプリは教育目的です。最終的な治療判断は主治医の責任で行ってください。
        </p>
      </footer>
    </div>
  );
}

function TabButton({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-2 text-xs font-semibold rounded whitespace-nowrap transition-colors ${
        active
          ? "bg-secondary text-white"
          : "bg-border text-muted-foreground hover:bg-border/80"
      }`}
    >
      {label}
    </button>
  );
}

function InsulinGuideWithSearch({ data, expandedId, setExpandedId }: any) {
  if (!data || data.length === 0) {
    return (
      <Card className="bg-card border-border p-4">
        <p className="text-sm text-muted-foreground text-center">
          該当する製剤が見つかりません
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {data.map((item: any) => (
        <Card key={item.id} className="bg-card border-border overflow-hidden">
          <button
            onClick={() => setExpandedId(expandedId === `insulin-${item.id}` ? null : `insulin-${item.id}`)}
            className="w-full p-4 flex items-center justify-between hover:bg-border/50 transition-colors"
          >
            <div className="text-left flex-1">
              <p className="font-semibold text-foreground">{item.brandName}</p>
              <p className="text-xs text-muted-foreground">{item.genericName}</p>
            </div>
            <ChevronDown
              className={`w-5 h-5 transition-transform flex-shrink-0 ${
                expandedId === `insulin-${item.id}` ? "rotate-180" : ""
              }`}
            />
          </button>

          {expandedId === `insulin-${item.id}` && (
            <div className="border-t border-border p-4 space-y-2 text-xs">
              <div>
                <span className="text-muted-foreground">作用発現:</span> {item.onsetTime}
              </div>
              <div>
                <span className="text-muted-foreground">ピーク:</span> {item.peakTime}
              </div>
              <div>
                <span className="text-muted-foreground">持続:</span> {item.duration}
              </div>
              <div className="pt-2 border-t border-border">
                <p className="text-muted-foreground mb-1">病棟での使い分け</p>
                <p className="text-foreground">{item.wardUse}</p>
              </div>
            </div>
          )}
        </Card>
      ))}
    </div>
  );
}

function OralDrugGuideWithSearch({ data, expandedId, setExpandedId }: any) {
  if (!data || data.length === 0) {
    return (
      <Card className="bg-card border-border p-4">
        <p className="text-sm text-muted-foreground text-center">
          該当する薬剤が見つかりません
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {data.map((item: any) => (
        <Card key={item.id} className="bg-card border-border overflow-hidden">
          <button
            onClick={() => setExpandedId(expandedId === `oral-${item.id}` ? null : `oral-${item.id}`)}
            className="w-full p-4 flex items-center justify-between hover:bg-border/50 transition-colors"
          >
            <div className="text-left flex-1">
              <p className="font-semibold text-foreground">{item.brandName}</p>
              <p className="text-xs text-muted-foreground">{item.genericName}</p>
              <p className="text-xs text-primary mt-1">{item.class}</p>
            </div>
            <ChevronDown
              className={`w-5 h-5 transition-transform flex-shrink-0 ${
                expandedId === `oral-${item.id}` ? "rotate-180" : ""
              }`}
            />
          </button>

          {expandedId === `oral-${item.id}` && (
            <div className="border-t border-border p-4 space-y-3 text-xs">
              <div>
                <p className="text-muted-foreground mb-1">禁忌</p>
                <p className="text-foreground">{item.contraindications}</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">周術期休薬日数</p>
                <p className="text-foreground">{item.perioperativeSuspensionDays}日</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">再開目安</p>
                <p className="text-foreground">{item.resumptionGuidance}</p>
              </div>
            </div>
          )}
        </Card>
      ))}
    </div>
  );
}

function ClassificationGuide({ data }: any) {
  const classifications = [
    {
      type: "1型糖尿病",
      subtypes: ["劇症", "急性発症", "緩徐進行（definite）", "緩徐進行（probable）"],
    },
    {
      type: "2型糖尿病",
      subtypes: ["インスリン非依存型"],
    },
    {
      type: "その他",
      subtypes: ["MODY", "ミトコンドリア糖尿病", "二次性糖尿病"],
    },
  ];

  return (
    <div className="space-y-3">
      {classifications.map((item, idx) => (
        <Card key={idx} className="bg-card border-border p-4">
          <h3 className="font-bold text-secondary mb-3">{item.type}</h3>
          <div className="space-y-2">
            {item.subtypes.map((subtype, sidx) => (
              <div key={sidx} className="text-sm text-foreground pl-4 border-l-2 border-primary">
                {subtype}
              </div>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
}

function ComplicationsGuide({ data }: any) {
  const complications = [
    {
      category: "細血管障害",
      items: [
        { name: "網膜症", subtypes: ["単純網膜症", "前増殖網膜症", "増殖網膜症"] },
        { name: "糖尿病性腎症", subtypes: ["第1期", "第2期", "第3期", "第4期", "第5期"] },
        { name: "神経障害", subtypes: ["末梢神経障害", "自律神経障害"] },
      ],
    },
    {
      category: "大血管障害",
      items: [
        { name: "冠動脈疾患", subtypes: ["狭心症", "心筋梗塞"] },
        { name: "脳血管障害", subtypes: ["脳梗塞", "脳出血"] },
        { name: "末梢動脈疾患（PAD）", subtypes: ["間欠性跛行", "潰瘍"] },
      ],
    },
  ];

  return (
    <div className="space-y-3">
      {complications.map((cat, idx) => (
        <Card key={idx} className="bg-card border-border p-4">
          <h3 className="font-bold text-secondary mb-3">{cat.category}</h3>
          <div className="space-y-3">
            {cat.items.map((item, iidx) => (
              <div key={iidx} className="border-b border-border pb-3 last:border-b-0">
                <p className="font-semibold text-foreground text-sm">{item.name}</p>
                <div className="mt-2 space-y-1">
                  {item.subtypes.map((subtype, sidx) => (
                    <p key={sidx} className="text-xs text-muted-foreground pl-3">
                      • {subtype}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
}
