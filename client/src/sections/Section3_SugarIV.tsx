import React from 'react';
import { AlertBox } from '@/components/AlertBox';
import { Card } from '@/components/ui/card';

// 末梢輸液商品データ
const peripheralIVs = [
  { name: 'ブドウ糖液 5%', maker: '各社', volume: 500, glucosePercent: 5, glucoseG: 25 },
  { name: 'ブドウ糖液 10%', maker: '各社', volume: 500, glucosePercent: 10, glucoseG: 50 },
  { name: 'ソルデム3A', maker: 'テルモ', volume: 500, glucosePercent: 4.3, glucoseG: 21.5 },
  { name: 'ソルデム3AG', maker: 'テルモ', volume: 500, glucosePercent: 7.5, glucoseG: 37.5 },
  { name: 'ビーフリード', maker: '大塚製薬', volume: 500, glucosePercent: 7.5, glucoseG: 37.5 },
  { name: 'フィジオゾール3号', maker: '大塚製薬', volume: 500, glucosePercent: 4.3, glucoseG: 21.5 },
  { name: 'ヴィーンF', maker: '興和', volume: 500, glucosePercent: 0, glucoseG: 0 },
  { name: 'ヴィーンD', maker: '興和', volume: 500, glucosePercent: 5, glucoseG: 25 },
  { name: 'ラクテック注', maker: '大塚製薬', volume: 500, glucosePercent: 0, glucoseG: 0 },
  { name: 'ソリタT3号G', maker: 'テルモ', volume: 500, glucosePercent: 7.5, glucoseG: 37.5 },
  { name: 'KN3号', maker: '大塚製薬', volume: 500, glucosePercent: 4.3, glucoseG: 21.5 },
];

// IVH商品データ
const ivhProducts = [
  { name: 'エルネオパNF1号', maker: '大塚製薬', volume: 1000, glucoseG: 150, kcal: 820 },
  { name: 'エルネオパNF2号', maker: '大塚製薬', volume: 1000, glucoseG: 175, kcal: 1000 },
  { name: 'エルネオパNF1号', maker: '大塚製薬', volume: 500, glucoseG: 75, kcal: 410 },
  { name: 'エルネオパNF2号', maker: '大塚製薬', volume: 500, glucoseG: 87.5, kcal: 500 },
  { name: 'フルカリック1号', maker: 'テルモ', volume: 903, glucoseG: 120, kcal: 700 },
  { name: 'フルカリック2号', maker: 'テルモ', volume: 1003, glucoseG: 175, kcal: 1000 },
  { name: 'フルカリック3号', maker: 'テルモ', volume: 1103, glucoseG: 225, kcal: 1200 },
  { name: 'ネオパレン1号', maker: '大塚製薬', volume: 1000, glucoseG: 150, kcal: 820 },
  { name: 'ネオパレン2号', maker: '大塚製薬', volume: 1000, glucoseG: 175, kcal: 1000 },
  { name: 'ピーエヌツイン1号', maker: '大塚製薬', volume: 1000, glucoseG: 125, kcal: 560 },
  { name: 'ピーエヌツイン2号', maker: '大塚製薬', volume: 1000, glucoseG: 175, kcal: 820 },
  { name: 'ピーエヌツイン3号', maker: '大塚製薬', volume: 1000, glucoseG: 225, kcal: 1060 },
  { name: 'ミキシッドL', maker: 'バクスター', volume: 1000, glucoseG: 150, kcal: 750 },
  { name: 'ミキシッドH', maker: 'バクスター', volume: 1000, glucoseG: 200, kcal: 1000 },
  { name: 'ハイカリックRF', maker: 'テルモ', volume: 500, glucoseG: 175, kcal: 700 },
  { name: 'ハイカリックNC-L', maker: 'テルモ', volume: 700, glucoseG: 150, kcal: 700 },
  { name: 'ハイカリックNC-H', maker: 'テルモ', volume: 700, glucoseG: 200, kcal: 900 },
];

function calcInsulinUnits(glucoseG: number, ratio: number) {
  if (glucoseG === 0) return '—';
  return (glucoseG / ratio).toFixed(1);
}

export function Section3_SugarIV() {
  return (
    <div className="space-y-6">
      <AlertBox type="info" title="インスリン混注の基本原則">
        <div className="space-y-1 text-sm">
          <p>ヒューマリンR（速効型インスリン）を輸液バッグに混注</p>
          <p>末梢輸液：グルコース <strong>5g あたり 1単位</strong>（または 10g あたり 1単位）</p>
          <p>IVH：グルコース <strong>10g あたり 1単位</strong>（または 15g あたり 1単位）</p>
          <p className="text-yellow-300">※ 血糖コントロール状況により調整。必ず血糖測定を行うこと。</p>
        </div>
      </AlertBox>

      {/* 末梢輸液 */}
      <Card className="bg-card border-border p-4">
        <h3 className="font-semibold mb-3 text-primary text-base">末梢輸液 商品一覧とインスリン混注量</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border text-muted-foreground">
                <th className="text-left pb-2 pr-2">商品名</th>
                <th className="text-center pb-2 px-1">容量</th>
                <th className="text-center pb-2 px-1">Glu%</th>
                <th className="text-center pb-2 px-1">Glu(g)</th>
                <th className="text-center pb-2 px-1 text-yellow-400">5g/単位</th>
                <th className="text-center pb-2 px-1 text-blue-400">10g/単位</th>
              </tr>
            </thead>
            <tbody>
              {peripheralIVs.map((iv, i) => (
                <tr key={i} className={`border-b border-border/30 ${iv.glucoseG === 0 ? 'opacity-40' : ''}`}>
                  <td className="py-1.5 pr-2 font-medium">{iv.name}</td>
                  <td className="text-center py-1.5 px-1">{iv.volume}mL</td>
                  <td className="text-center py-1.5 px-1">{iv.glucosePercent}%</td>
                  <td className="text-center py-1.5 px-1">{iv.glucoseG}g</td>
                  <td className="text-center py-1.5 px-1 text-yellow-400 font-semibold">
                    {calcInsulinUnits(iv.glucoseG, 5)}単位
                  </td>
                  <td className="text-center py-1.5 px-1 text-blue-400 font-semibold">
                    {calcInsulinUnits(iv.glucoseG, 10)}単位
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-muted-foreground mt-2">Glu(g) = グルコース含有量</p>
      </Card>

      {/* IVH */}
      <Card className="bg-card border-border p-4">
        <h3 className="font-semibold mb-3 text-primary text-base">IVH（中心静脈栄養）商品一覧とインスリン混注量</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border text-muted-foreground">
                <th className="text-left pb-2 pr-2">商品名</th>
                <th className="text-center pb-2 px-1">容量</th>
                <th className="text-center pb-2 px-1">Glu(g)</th>
                <th className="text-center pb-2 px-1">kcal</th>
                <th className="text-center pb-2 px-1 text-yellow-400">10g/単位</th>
                <th className="text-center pb-2 px-1 text-blue-400">15g/単位</th>
              </tr>
            </thead>
            <tbody>
              {ivhProducts.map((ivh, i) => (
                <tr key={i} className="border-b border-border/30">
                  <td className="py-1.5 pr-2 font-medium">{ivh.name}</td>
                  <td className="text-center py-1.5 px-1">{ivh.volume}mL</td>
                  <td className="text-center py-1.5 px-1">{ivh.glucoseG}g</td>
                  <td className="text-center py-1.5 px-1">{ivh.kcal}</td>
                  <td className="text-center py-1.5 px-1 text-yellow-400 font-semibold">
                    {calcInsulinUnits(ivh.glucoseG, 10)}単位
                  </td>
                  <td className="text-center py-1.5 px-1 text-blue-400 font-semibold">
                    {calcInsulinUnits(ivh.glucoseG, 15)}単位
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-muted-foreground mt-2">kcal = 総カロリー（アミノ酸含む）</p>
      </Card>

      <AlertBox type="warning">
        <p className="text-sm">末梢静脈では10%以上のブドウ糖液は血管炎・静脈炎のリスクがあります。高濃度は中心静脈から投与してください。</p>
      </AlertBox>
    </div>
  );
}
