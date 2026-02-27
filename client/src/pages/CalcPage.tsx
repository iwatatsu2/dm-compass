import { useState } from "react";
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
import { ChevronLeft } from "lucide-react";

export default function CalcPage() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState<"energy" | "nephropathy" | "peripheral" | "ivh" | "sliding">("energy");

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* ヘッダー */}
      <header className="bg-card border-b border-border p-4 flex items-center">
        <button
          onClick={() => setLocation("/")}
          className="mr-3 text-primary hover:opacity-80"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold flex-1">CALC - 計算ツール</h1>
      </header>

      {/* タブナビゲーション */}
      <div className="bg-card border-b border-border overflow-x-auto">
        <div className="flex gap-2 p-2 max-w-md mx-auto">
          <TabButton
            label="必要エネルギー"
            active={activeTab === "energy"}
            onClick={() => setActiveTab("energy")}
          />
          <TabButton
            label="腎症ステージ"
            active={activeTab === "nephropathy"}
            onClick={() => setActiveTab("nephropathy")}
          />
          <TabButton
            label="末梢輸液"
            active={activeTab === "peripheral"}
            onClick={() => setActiveTab("peripheral")}
          />
          <TabButton
            label="IVH"
            active={activeTab === "ivh"}
            onClick={() => setActiveTab("ivh")}
          />
          <TabButton
            label="スケール"
            active={activeTab === "sliding"}
            onClick={() => setActiveTab("sliding")}
          />
        </div>
      </div>

      {/* コンテンツ */}
      <main className="flex-1 p-4 max-w-md mx-auto w-full">
        {activeTab === "energy" && <EnergyCalculator />}
        {activeTab === "nephropathy" && <NephropathyCalculator />}
        {activeTab === "peripheral" && <PeripheralGlucoseCalculator />}
        {activeTab === "ivh" && <IVHCalculator />}
        {activeTab === "sliding" && <SlidingScaleCalculator />}
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
          ? "bg-primary text-white"
          : "bg-border text-muted-foreground hover:bg-border/80"
      }`}
    >
      {label}
    </button>
  );
}

function EnergyCalculator() {
  const [height, setHeight] = useState<string>("");
  const [activity, setActivity] = useState<"rest" | "normal" | "high">("normal");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    if (!height) return;
    const h = parseFloat(height);
    const hm = h / 100;
    const sw = hm * hm * 22;
    const cal = {
      rest: 25,
      normal: 30,
      high: 35,
    }[activity];
    const daily = sw * cal;
    setResult({
      standardWeight: (Math.round(sw * 10) / 10).toFixed(1),
      dailyCalories: Math.round(daily),
      caloriesPerMeal: Math.round(daily / 3),
    });
  };

  return (
    <div className="space-y-4">
      <Card className="bg-card border-border p-4">
        <div className="space-y-4">
          <div>
            <Label htmlFor="height" className="text-sm font-semibold">
              身長 (cm)
            </Label>
            <Input
              id="height"
              type="number"
              placeholder="170"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="mt-1 bg-border text-foreground"
            />
          </div>

          <div>
            <Label htmlFor="activity" className="text-sm font-semibold">
              活動量
            </Label>
            <Select value={activity} onValueChange={(v: any) => setActivity(v)}>
              <SelectTrigger className="mt-1 bg-border text-foreground">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rest">安静</SelectItem>
                <SelectItem value="normal">普通</SelectItem>
                <SelectItem value="high">高</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={calculate}
            className="w-full bg-primary text-white hover:bg-primary/90"
          >
            計算
          </Button>
        </div>
      </Card>

      {result && (
        <Card className="bg-card border-border p-4">
          <div className="space-y-3">
            <div className="border-b border-border pb-3">
              <p className="text-xs text-muted-foreground">標準体重</p>
              <p className="text-lg font-bold text-primary">{result.standardWeight} kg</p>
            </div>
            <div className="border-b border-border pb-3">
              <p className="text-xs text-muted-foreground">1日必要カロリー</p>
              <p className="text-lg font-bold text-primary">{result.dailyCalories} kcal</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">1食あたりカロリー</p>
              <p className="text-lg font-bold text-primary">{result.caloriesPerMeal} kcal</p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}

function NephropathyCalculator() {
  const [egfr, setEgfr] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    if (!egfr || !weight) return;
    const e = parseFloat(egfr);
    const w = parseFloat(weight);

    // 簡易的な腎症ステージ判定
    let stage = 1;
    let proteinMin = 0.8;
    let proteinMax = 1.0;

    if (e < 90) stage = 2;
    if (e < 60) {
      stage = 3;
      proteinMin = 0.8;
      proteinMax = 0.8;
    }
    if (e < 30) {
      stage = 4;
      proteinMin = 0.6;
      proteinMax = 0.8;
    }
    if (e < 15) {
      stage = 5;
      proteinMin = 0.6;
      proteinMax = 0.6;
    }

    setResult({
      stage,
      proteinMin,
      proteinMax,
      dailyProteinMin: (Math.round(w * proteinMin * 10) / 10).toFixed(1),
      dailyProteinMax: (Math.round(w * proteinMax * 10) / 10).toFixed(1),
    });
  };

  return (
    <div className="space-y-4">
      <Card className="bg-card border-border p-4">
        <div className="space-y-4">
          <div>
            <Label htmlFor="egfr" className="text-sm font-semibold">
              eGFR (mL/min/1.73m²)
            </Label>
            <Input
              id="egfr"
              type="number"
              placeholder="60"
              value={egfr}
              onChange={(e) => setEgfr(e.target.value)}
              className="mt-1 bg-border text-foreground"
            />
          </div>

          <div>
            <Label htmlFor="weight" className="text-sm font-semibold">
              体重 (kg)
            </Label>
            <Input
              id="weight"
              type="number"
              placeholder="70"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="mt-1 bg-border text-foreground"
            />
          </div>

          <Button
            onClick={calculate}
            className="w-full bg-primary text-white hover:bg-primary/90"
          >
            判定
          </Button>
        </div>
      </Card>

      {result && (
        <Card className="bg-card border-border p-4">
          <div className="space-y-3">
            <div className="border-b border-border pb-3">
              <p className="text-xs text-muted-foreground">腎症ステージ</p>
              <p className="text-2xl font-bold text-primary">第{result.stage}期</p>
            </div>
            <div className="border-b border-border pb-3">
              <p className="text-xs text-muted-foreground">推奨蛋白摂取量</p>
              <p className="text-sm font-semibold">
                {result.proteinMin.toFixed(1)} ～ {result.proteinMax.toFixed(1)} g/kg
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">1日推奨蛋白量</p>
              <p className="text-lg font-bold text-primary">
                {result.dailyProteinMin} ～ {result.dailyProteinMax} g
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}

function PeripheralGlucoseCalculator() {
  return (
    <Card className="bg-card border-border p-4">
      <p className="text-sm text-muted-foreground">
        末梢糖含有輸液インスリン混注計算機能は準備中です。
      </p>
    </Card>
  );
}

function IVHCalculator() {
  return (
    <Card className="bg-card border-border p-4">
      <p className="text-sm text-muted-foreground">
        IVH混注計算機能は準備中です。
      </p>
    </Card>
  );
}

function SlidingScaleCalculator() {
  const [weight, setWeight] = useState<string>("");
  const [severity, setSeverity] = useState<"mild" | "moderate" | "severe">("moderate");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    if (!weight) return;
    const w = parseFloat(weight);
    const baseUnits = {
      mild: 0.3,
      moderate: 0.5,
      severe: 0.7,
    }[severity];

    const insulinPerUnit = w * baseUnits;

    const scale = [
      { bloodGlucose: "～100", insulin: 0 },
      { bloodGlucose: "101～150", insulin: Math.round(insulinPerUnit * 0.5) },
      { bloodGlucose: "151～200", insulin: Math.round(insulinPerUnit * 1) },
      { bloodGlucose: "201～250", insulin: Math.round(insulinPerUnit * 1.5) },
      { bloodGlucose: "251～300", insulin: Math.round(insulinPerUnit * 2) },
      { bloodGlucose: "301～", insulin: Math.round(insulinPerUnit * 2.5) },
    ];

    setResult({ scale, baseUnits: insulinPerUnit.toFixed(1) });
  };

  return (
    <div className="space-y-4">
      <Card className="bg-card border-border p-4">
        <div className="space-y-4">
          <div>
            <Label htmlFor="weight" className="text-sm font-semibold">
              体重 (kg)
            </Label>
            <Input
              id="weight"
              type="number"
              placeholder="70"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="mt-1 bg-border text-foreground"
            />
          </div>

          <div>
            <Label htmlFor="severity" className="text-sm font-semibold">
              重症度
            </Label>
            <Select value={severity} onValueChange={(v: any) => setSeverity(v)}>
              <SelectTrigger className="mt-1 bg-border text-foreground">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mild">軽症</SelectItem>
                <SelectItem value="moderate">中等度</SelectItem>
                <SelectItem value="severe">高度</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={calculate}
            className="w-full bg-primary text-white hover:bg-primary/90"
          >
            作成
          </Button>
        </div>
      </Card>

      {result && (
        <Card className="bg-card border-border p-4">
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground mb-3">
              基本単位: {result.baseUnits} 単位
            </p>
            <div className="space-y-2">
              {result.scale.map((item: any, idx: number) => (
                <div key={idx} className="flex justify-between items-center border-b border-border pb-2">
                  <span className="text-sm">{item.bloodGlucose} mg/dL</span>
                  <span className="font-bold text-primary">{item.insulin} 単位</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
