import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { AlertBox } from '@/components/AlertBox';

type ActivityLevel = 'rest' | 'light' | 'normal' | 'high';

const activityLabels: Record<ActivityLevel, string> = {
  rest: '安静（寝たきり・入院中）',
  light: '軽労作（デスクワーク・軽い家事）',
  normal: '普通（立ち仕事・軽い運動）',
  high: '高労作（重労働・激しい運動）',
};

const activityKcal: Record<ActivityLevel, number> = {
  rest: 25,
  light: 27.5,
  normal: 30,
  high: 35,
};

export function Section10_DietCalc() {
  const [height, setHeight] = useState('');
  const [activity, setActivity] = useState<ActivityLevel>('normal');

  const calcResult = () => {
    const h = parseFloat(height);
    if (isNaN(h) || h < 100 || h > 250) return null;
    const hm = h / 100;
    const ibw = hm * hm * 22;
    const totalKcal = ibw * activityKcal[activity];
    return {
      ibw: ibw.toFixed(1),
      totalKcal: Math.round(totalKcal),
      perMealKcal: Math.round(totalKcal / 3),
      kcalPerKg: activityKcal[activity],
    };
  };

  const result = calcResult();

  return (
    <div className="space-y-6">
      {/* カロリー計算 */}
      <Card className="bg-card border-border p-4">
        <h3 className="font-semibold mb-3 text-primary text-base">必要エネルギー計算</h3>
        <p className="text-xs text-muted-foreground mb-3">標準体重（IBW）= 身長(m)² × 22</p>
        <div className="space-y-4">
          <div>
            <label className="text-sm text-muted-foreground block mb-1">身長（cm）</label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="例: 165"
              className="w-full bg-input border border-border rounded px-3 py-2 text-sm text-foreground"
            />
          </div>
          <div>
            <label className="text-sm text-muted-foreground block mb-2">活動量</label>
            <div className="space-y-2">
              {(Object.entries(activityLabels) as [ActivityLevel, string][]).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setActivity(key)}
                  className={`w-full text-left px-3 py-2 rounded text-xs border transition-colors ${
                    activity === key
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'border-border text-foreground hover:bg-border/50'
                  }`}
                >
                  {label}（{activityKcal[key]} kcal/kg/日）
                </button>
              ))}
            </div>
          </div>
          {result && (
            <div className="bg-primary/10 border border-primary/30 rounded p-4 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">標準体重（IBW）</p>
                  <p className="text-2xl font-bold text-primary">{result.ibw} kg</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">係数</p>
                  <p className="text-2xl font-bold text-yellow-400">{result.kcalPerKg} kcal/kg</p>
                </div>
              </div>
              <div className="border-t border-border/30 pt-3 grid grid-cols-2 gap-3">
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">1日必要カロリー</p>
                  <p className="text-2xl font-bold text-green-400">{result.totalKcal} kcal</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">1食あたり</p>
                  <p className="text-2xl font-bold text-blue-400">{result.perMealKcal} kcal</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* 腎症ステージ別蛋白制限 */}
      <Card className="bg-card border-border p-4">
        <h3 className="font-semibold mb-3 text-primary text-base">腎症ステージ別 蛋白制限</h3>
        <div className="space-y-2 text-sm">
          <div className="grid grid-cols-4 gap-1 text-xs font-semibold border-b border-border pb-1 mb-1 text-muted-foreground">
            <span>ステージ</span>
            <span>eGFR</span>
            <span>尿Alb</span>
            <span>蛋白制限</span>
          </div>
          {[
            { stage: '第1期', egfr: '≥90', alb: '正常（<30）', protein: '0.8〜1.0 g/kg', color: 'text-green-400' },
            { stage: '第2期', egfr: '60〜89', alb: '微量（30〜299）', protein: '0.8〜1.0 g/kg', color: 'text-yellow-400' },
            { stage: '第3期', egfr: '30〜59', alb: '顕性（≥300）', protein: '0.8 g/kg', color: 'text-orange-400' },
            { stage: '第4期', egfr: '15〜29', alb: '顕性', protein: '0.6〜0.8 g/kg', color: 'text-red-400' },
            { stage: '第5期', egfr: '<15', alb: '顕性〜透析', protein: '0.6 g/kg', color: 'text-red-600' },
          ].map((row) => (
            <div key={row.stage} className="grid grid-cols-4 gap-1 text-xs border-b border-border/30 py-1.5">
              <span className={`font-semibold ${row.color}`}>{row.stage}</span>
              <span>{row.egfr}</span>
              <span className="text-xs">{row.alb}</span>
              <span className="font-medium">{row.protein}</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-2">蛋白制限は標準体重あたり（g/kg IBW/日）</p>
      </Card>

      {/* 食塩制限 */}
      <Card className="bg-card border-border p-4">
        <h3 className="font-semibold mb-3 text-primary text-base">食塩・カリウム制限</h3>
        <div className="space-y-2 text-sm">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-blue-950/20 border border-blue-700/50 rounded p-3">
              <p className="font-semibold text-blue-400 text-xs mb-1">食塩制限</p>
              <p className="text-xs">高血圧合併：6g/日未満</p>
              <p className="text-xs">腎症：6g/日未満</p>
            </div>
            <div className="bg-orange-950/20 border border-orange-700/50 rounded p-3">
              <p className="font-semibold text-orange-400 text-xs mb-1">カリウム制限</p>
              <p className="text-xs">第4〜5期：1500mg/日以下</p>
              <p className="text-xs">透析患者：2000mg/日以下</p>
            </div>
          </div>
        </div>
      </Card>

      <AlertBox type="info">
        <p className="text-sm">蛋白制限が厳しすぎると低栄養・筋肉量低下のリスクがあります。管理栄養士と連携して個別化した食事指導を行ってください。</p>
      </AlertBox>
    </div>
  );
}
