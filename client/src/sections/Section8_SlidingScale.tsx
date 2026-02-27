import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { AlertBox } from '@/components/AlertBox';

type ISFType = 25 | 50;
type TargetType = 'strict' | 'standard' | 'loose';
type StartType = 151 | 181 | 201;

interface ScaleRow {
  range: string;
  units: number;
}

function generateScale(isf: ISFType, start: StartType): ScaleRow[] {
  const rows: ScaleRow[] = [];

  // ISF25の場合は50mg/dl刻みで2単位ずつ、ISF50の場合は25mg/dl刻みで1単位ずつ
  const step = isf === 25 ? 50 : 25;
  const unitStep = isf === 25 ? 2 : 1;

  // 開始前は0単位
  if (start === 151) {
    rows.push({ range: '〜150', units: 0 });
  } else if (start === 181) {
    rows.push({ range: '〜150', units: 0 });
    rows.push({ range: '151〜180', units: 0 });
  } else {
    rows.push({ range: '〜150', units: 0 });
    rows.push({ range: '151〜180', units: 0 });
    rows.push({ range: '181〜200', units: 0 });
  }

  // 開始から補正
  const startVal = start;
  let current = startVal;
  let units = unitStep;

  while (units <= 8) {
    const next = current + step - 1;
    rows.push({ range: `${current}〜${next}`, units });
    current += step;
    units += unitStep;
  }
  rows.push({ range: `${current}〜`, units: 8 });

  return rows;
}

export function Section8_SlidingScale() {
  const [isf, setIsf] = useState<ISFType>(50);
  const [start, setStart] = useState<StartType>(151);
  const [target, setTarget] = useState<TargetType>('standard');

  const targetLabels: Record<TargetType, string> = {
    strict: '目標血糖 100〜140 mg/dL（ICU・術後）',
    standard: '目標血糖 140〜180 mg/dL（一般病棟）',
    loose: '目標血糖 150〜200 mg/dL（高齢者・緩和）',
  };

  const scale = generateScale(isf, start);

  return (
    <div className="space-y-6">
      <AlertBox type="info" title="スライディングスケールの使い方">
        <div className="space-y-1 text-sm">
          <p>超速効型インスリン（ノボラピッド、ヒューマログ等）を使用</p>
          <p>食前・就寝前の血糖測定時に使用</p>
          <p>ISF（インスリン感受性係数）= 1単位で下がる血糖値（mg/dL）</p>
        </div>
      </AlertBox>

      {/* 設定パネル */}
      <Card className="bg-card border-border p-4">
        <h3 className="font-semibold mb-4 text-primary text-base">スケール設定</h3>
        <div className="space-y-4">
          {/* 目標血糖 */}
          <div>
            <p className="text-sm text-muted-foreground mb-2">目標血糖</p>
            <div className="grid grid-cols-1 gap-2">
              {(Object.entries(targetLabels) as [TargetType, string][]).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setTarget(key)}
                  className={`text-left px-3 py-2 rounded text-xs border transition-colors ${
                    target === key
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'border-border text-foreground hover:bg-border/50'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* ISF設定 */}
          <div>
            <p className="text-sm text-muted-foreground mb-2">ISF（インスリン感受性係数）</p>
            <div className="grid grid-cols-2 gap-2">
              {([25, 50] as ISFType[]).map((val) => (
                <button
                  key={val}
                  onClick={() => setIsf(val)}
                  className={`px-3 py-2 rounded text-sm border transition-colors ${
                    isf === val
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'border-border text-foreground hover:bg-border/50'
                  }`}
                >
                  ISF {val}（1単位で{val}mg/dL↓）
                </button>
              ))}
            </div>
          </div>

          {/* 開始血糖 */}
          <div>
            <p className="text-sm text-muted-foreground mb-2">補正開始血糖</p>
            <div className="grid grid-cols-3 gap-2">
              {([151, 181, 201] as StartType[]).map((val) => (
                <button
                  key={val}
                  onClick={() => setStart(val)}
                  className={`px-3 py-2 rounded text-sm border transition-colors ${
                    start === val
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'border-border text-foreground hover:bg-border/50'
                  }`}
                >
                  {val}〜
                </button>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* スケール表示 */}
      <Card className="bg-card border-border p-4">
        <h3 className="font-semibold mb-1 text-primary text-base">スライディングスケール</h3>
        <p className="text-xs text-muted-foreground mb-3">
          {targetLabels[target]} / ISF {isf} / 補正開始 {start} mg/dL〜
        </p>
        <div className="overflow-hidden rounded border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-card/80 border-b border-border">
                <th className="text-left px-3 py-2 text-muted-foreground">血糖値（mg/dL）</th>
                <th className="text-center px-3 py-2 text-muted-foreground">インスリン単位数</th>
              </tr>
            </thead>
            <tbody>
              {scale.map((row, i) => (
                <tr
                  key={i}
                  className={`border-b border-border/30 ${
                    row.units === 0
                      ? 'opacity-50'
                      : row.units >= 6
                      ? 'bg-red-950/20'
                      : row.units >= 4
                      ? 'bg-orange-950/20'
                      : row.units >= 2
                      ? 'bg-yellow-950/20'
                      : 'bg-green-950/10'
                  }`}
                >
                  <td className="px-3 py-2">{row.range}</td>
                  <td className="px-3 py-2 text-center">
                    {row.units === 0 ? (
                      <span className="text-muted-foreground">投与なし</span>
                    ) : (
                      <span
                        className={`font-bold ${
                          row.units >= 6 ? 'text-red-400' : row.units >= 4 ? 'text-orange-400' : row.units >= 2 ? 'text-yellow-400' : 'text-green-400'
                        }`}
                      >
                        {row.units} 単位
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          ※ 血糖 ≥400 mg/dL または ≤70 mg/dL は主治医に連絡
        </p>
      </Card>

      <AlertBox type="warning" title="低血糖時の対応">
        <div className="space-y-1 text-sm">
          <p>血糖 70 mg/dL 未満：インスリン投与中止、ブドウ糖10〜20g経口投与</p>
          <p>血糖 50 mg/dL 未満：50%ブドウ糖液 20〜40mL 静注</p>
          <p>意識障害あり：グルカゴン 1mg 筋注 または 50%ブドウ糖液静注</p>
        </div>
      </AlertBox>
    </div>
  );
}
