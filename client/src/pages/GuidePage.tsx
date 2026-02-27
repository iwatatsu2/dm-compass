import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronDown } from "lucide-react";

export default function GuidePage() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState<"insulin" | "oral" | "classification" | "complications">("insulin");

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
            onClick={() => setActiveTab("insulin")}
          />
          <TabButton
            label="経口薬"
            active={activeTab === "oral"}
            onClick={() => setActiveTab("oral")}
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

      {/* コンテンツ */}
      <main className="flex-1 p-4 max-w-md mx-auto w-full overflow-y-auto">
        {activeTab === "insulin" && <InsulinGuide />}
        {activeTab === "oral" && <OralDrugGuide />}
        {activeTab === "classification" && <ClassificationGuide />}
        {activeTab === "complications" && <ComplicationsGuide />}
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

function InsulinGuide() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const insulinData = [
    {
      id: "超超速効型",
      category: "超超速効型",
      items: [
        { name: "フィアスプ", generic: "アスパルト酸速効型", onset: "10分", peak: "1時間", duration: "3～4時間" },
        { name: "ルムジェブ", generic: "リスプロ速効型", onset: "10分", peak: "1時間", duration: "3～4時間" },
      ],
    },
    {
      id: "超速効型",
      category: "超速効型",
      items: [
        { name: "ノボラピッド", generic: "アスパルト", onset: "10～20分", peak: "1～3時間", duration: "3～5時間" },
        { name: "ヒューマログ", generic: "リスプロ", onset: "10～20分", peak: "1～3時間", duration: "3～5時間" },
        { name: "アピドラ", generic: "グルリジン", onset: "10～20分", peak: "1～3時間", duration: "3～5時間" },
      ],
    },
    {
      id: "速効型",
      category: "速効型",
      items: [
        { name: "ヒューマリンR", generic: "ヒト正規インスリン", onset: "30分", peak: "2～3時間", duration: "5～8時間" },
        { name: "ノボリンR", generic: "ヒト正規インスリン", onset: "30分", peak: "2～3時間", duration: "5～8時間" },
      ],
    },
    {
      id: "中間型",
      category: "中間型",
      items: [
        { name: "ヒューマリンN", generic: "NPHインスリン", onset: "1～2時間", peak: "4～8時間", duration: "10～16時間" },
        { name: "ノボリンN", generic: "NPHインスリン", onset: "1～2時間", peak: "4～8時間", duration: "10～16時間" },
      ],
    },
    {
      id: "持効型",
      category: "持効型",
      items: [
        { name: "ランタス", generic: "グラルギン", onset: "1～2時間", peak: "フラット", duration: "24時間" },
        { name: "ランタスXR", generic: "グラルギン300単位/mL", onset: "1～2時間", peak: "フラット", duration: "24時間以上" },
        { name: "トレシーバ", generic: "デグルデク", onset: "1～2時間", peak: "フラット", duration: "42時間" },
        { name: "レベミル", generic: "デテミル", onset: "1～2時間", peak: "フラット", duration: "24時間" },
      ],
    },
  ];

  return (
    <div className="space-y-3">
      {insulinData.map((category) => (
        <Card key={category.id} className="bg-card border-border overflow-hidden">
          <button
            onClick={() => setExpandedId(expandedId === category.id ? null : category.id)}
            className="w-full p-4 flex items-center justify-between hover:bg-border/50 transition-colors"
          >
            <h3 className="font-bold text-secondary">{category.category}</h3>
            <ChevronDown
              className={`w-5 h-5 transition-transform ${
                expandedId === category.id ? "rotate-180" : ""
              }`}
            />
          </button>

          {expandedId === category.id && (
            <div className="border-t border-border p-4 space-y-3">
              {category.items.map((item, idx) => (
                <div key={idx} className="border-b border-border pb-3 last:border-b-0">
                  <p className="font-semibold text-foreground">{item.name}</p>
                  <p className="text-xs text-muted-foreground mb-2">{item.generic}</p>
                  <div className="text-xs space-y-1">
                    <p>
                      <span className="text-muted-foreground">作用発現:</span> {item.onset}
                    </p>
                    <p>
                      <span className="text-muted-foreground">ピーク:</span> {item.peak}
                    </p>
                    <p>
                      <span className="text-muted-foreground">持続:</span> {item.duration}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      ))}
    </div>
  );
}

function OralDrugGuide() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const drugClasses = [
    {
      id: "biguanide",
      class: "ビグアナイド",
      drugs: [
        { name: "メトホルミン", brand: "グリコランなど" },
      ],
    },
    {
      id: "sglt2",
      class: "SGLT2阻害薬",
      drugs: [
        { name: "ダパグリフロジン", brand: "フォシーガ" },
        { name: "エンパグリフロジン", brand: "ジャディアンス" },
        { name: "カナグリフロジン", brand: "カナグル" },
      ],
    },
    {
      id: "dpp4",
      class: "DPP-4阻害薬",
      drugs: [
        { name: "シタグリプチン", brand: "ジャヌビア" },
        { name: "ビルダグリプチン", brand: "ガルバス" },
        { name: "リナグリプチン", brand: "トラジェンタ" },
      ],
    },
    {
      id: "glp1",
      class: "GLP-1受容体作動薬",
      drugs: [
        { name: "リラグルチド", brand: "ビクトーザ" },
        { name: "セマグルチド", brand: "オゼンピック" },
        { name: "デュラグルチド", brand: "トルリシティ" },
      ],
    },
  ];

  return (
    <div className="space-y-3">
      {drugClasses.map((classItem) => (
        <Card key={classItem.id} className="bg-card border-border overflow-hidden">
          <button
            onClick={() => setExpandedId(expandedId === classItem.id ? null : classItem.id)}
            className="w-full p-4 flex items-center justify-between hover:bg-border/50 transition-colors"
          >
            <h3 className="font-bold text-secondary">{classItem.class}</h3>
            <ChevronDown
              className={`w-5 h-5 transition-transform ${
                expandedId === classItem.id ? "rotate-180" : ""
              }`}
            />
          </button>

          {expandedId === classItem.id && (
            <div className="border-t border-border p-4 space-y-3">
              {classItem.drugs.map((drug, idx) => (
                <div key={idx} className="border-b border-border pb-3 last:border-b-0">
                  <p className="font-semibold text-foreground">{drug.name}</p>
                  <p className="text-xs text-muted-foreground">{drug.brand}</p>
                </div>
              ))}
            </div>
          )}
        </Card>
      ))}
    </div>
  );
}

function ClassificationGuide() {
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

function ComplicationsGuide() {
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
