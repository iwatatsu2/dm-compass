import React from 'react';
import { AlertBox } from '@/components/AlertBox';
import { Card } from '@/components/ui/card';

// 末梢輸液商品データ（添付資料に基づき修正）
// グルコース量 = 糖質g/L × 容量(L)
// 糖質%表記 G=グルコース, S=ソルビトール, M=マルトース, F=フルクトース

// 等張液・乳酸リンゲル・酢酸リンゲル・重炭酸リンゲル
const isotonicIVs = [
  // 生理食塩液
  { name: '生理食塩液（大塚生食注）', maker: '大塚', volume: 500, glucosePercent: 0, glucoseG: 0, category: '生理食塩液' },
  { name: 'テルモ生食', maker: 'テルモ', volume: 500, glucosePercent: 0, glucoseG: 0, category: '生理食塩液' },
  // リンゲル液
  { name: 'リンゲル液「オーツカ」', maker: '大塚', volume: 500, glucosePercent: 0, glucoseG: 0, category: 'リンゲル液' },
  // 乳酸リンゲル液
  { name: 'ラクテック注', maker: '大塚', volume: 500, glucosePercent: 0, glucoseG: 0, category: '乳酸リンゲル液' },
  { name: 'ラクテックD輸液', maker: '大塚', volume: 500, glucosePercent: 5, glucoseG: 25, category: '乳酸リンゲル液', sugarType: 'G' },
  { name: 'ラクテックG輸液', maker: '大塚', volume: 500, glucosePercent: 5, glucoseG: 25, category: '乳酸リンゲル液', sugarType: 'S' },
  { name: 'ポタコールR輸液', maker: '大塚', volume: 500, glucosePercent: 5, glucoseG: 25, category: '乳酸リンゲル液', sugarType: 'M' },
  { name: 'ソルラクト輸液', maker: 'テルモ', volume: 500, glucosePercent: 0, glucoseG: 0, category: '乳酸リンゲル液' },
  { name: 'ソルラクトTMR輸液', maker: 'テルモ', volume: 500, glucosePercent: 5, glucoseG: 25, category: '乳酸リンゲル液', sugarType: 'M' },
  // 酢酸リンゲル液
  { name: 'フィジオ140輸液', maker: '大塚', volume: 500, glucosePercent: 1, glucoseG: 5, category: '酢酸リンゲル液', sugarType: 'G' },
  { name: 'ヴィーンD輸液', maker: '扶桑', volume: 500, glucosePercent: 5, glucoseG: 25, category: '酢酸リンゲル液', sugarType: 'G' },
  { name: 'ソルアセトD輸液', maker: 'テルモ', volume: 500, glucosePercent: 5, glucoseG: 25, category: '酢酸リンゲル液', sugarType: 'G' },
  { name: 'ヴィーンF輸液', maker: '扶桑', volume: 500, glucosePercent: 0, glucoseG: 0, category: '酢酸リンゲル液' },
  { name: 'ソルアセトF輸液', maker: 'テルモ', volume: 500, glucosePercent: 0, glucoseG: 0, category: '酢酸リンゲル液' },
  { name: 'ソリューゲンF注', maker: 'ネオクリティケア', volume: 500, glucosePercent: 0, glucoseG: 0, category: '酢酸リンゲル液' },
  // 重炭酸リンゲル液
  { name: 'ビカネイト輸液', maker: '大塚', volume: 500, glucosePercent: 0, glucoseG: 0, category: '重炭酸リンゲル液' },
  { name: 'ビカーボン輸液', maker: 'エイワイ', volume: 500, glucosePercent: 0, glucoseG: 0, category: '重炭酸リンゲル液' },
];

// 低張液（1〜4号液）
const hypotonicIVs = [
  // 1号液（開始液）
  { name: 'KN1号輸液', maker: '大塚', volume: 500, glucosePercent: 2.5, glucoseG: 12.5, category: '1号液（開始液）', sugarType: 'G' },
  { name: 'ソルデム1輸液', maker: 'テルモ', volume: 500, glucosePercent: 2.6, glucoseG: 13, category: '1号液（開始液）', sugarType: 'G' },
  { name: 'ソリタT1号輸液', maker: 'エイワイ', volume: 500, glucosePercent: 2.6, glucoseG: 13, category: '1号液（開始液）', sugarType: 'G' },
  // 2号液（脱水補給液）
  { name: 'KN2号輸液', maker: '大塚', volume: 500, glucosePercent: 2.35, glucoseG: 11.75, category: '2号液（脱水補給液）', sugarType: 'G' },
  { name: 'ソリタT2号輸液', maker: 'エイワイ', volume: 500, glucosePercent: 3.2, glucoseG: 16, category: '2号液（脱水補給液）', sugarType: 'G' },
  { name: 'ソルデム2輸液', maker: 'テルモ', volume: 500, glucosePercent: 1.45, glucoseG: 7.25, category: '2号液（脱水補給液）', sugarType: 'G' },
  // 3号液（維持液）
  { name: 'KN3号輸液', maker: '大塚', volume: 500, glucosePercent: 2.7, glucoseG: 13.5, category: '3号液（維持液）', sugarType: 'G' },
  { name: 'フルクトラクト注', maker: '大塚', volume: 500, glucosePercent: 2.7, glucoseG: 13.5, category: '3号液（維持液）', sugarType: 'F' },
  { name: 'ソルデム3A輸液', maker: 'テルモ', volume: 500, glucosePercent: 4.3, glucoseG: 21.5, category: '3号液（維持液）', sugarType: 'G' },
  { name: 'ソリタT3号輸液', maker: 'エイワイ', volume: 500, glucosePercent: 4.3, glucoseG: 21.5, category: '3号液（維持液）', sugarType: 'G' },
  { name: 'ソルデム3輸液', maker: 'テルモ', volume: 500, glucosePercent: 2.7, glucoseG: 13.5, category: '3号液（維持液）', sugarType: 'G' },
  { name: 'アクチット輸液', maker: '扶桑', volume: 500, glucosePercent: 5, glucoseG: 25, category: '3号液（維持液）', sugarType: 'M' },
  { name: 'リプラス3号輸液', maker: '扶桑', volume: 500, glucosePercent: 5, glucoseG: 25, category: '3号液（維持液）', sugarType: 'G' },
  // 4号液（術後回復液）
  { name: 'KN4号輸液', maker: '大塚', volume: 500, glucosePercent: 4, glucoseG: 20, category: '4号液（術後回復液）', sugarType: 'G' },
  { name: 'ソリタT4号輸液', maker: 'エイワイ', volume: 500, glucosePercent: 4.3, glucoseG: 21.5, category: '4号液（術後回復液）', sugarType: 'G' },
  { name: 'ソルデム6輸液', maker: 'テルモ', volume: 500, glucosePercent: 4, glucoseG: 20, category: '4号液（術後回復液）', sugarType: 'G' },
];

// IVH商品データ（PDNレクチャー 2.8 TPN基本液とキット製剤の種類と特徴 参照・2024年6月改訂版）
const ivhProducts = [
  // 電解質＋糖質＋アミノ酸＋ビタミン剤＋微量元素
  { name: 'エルネオパNF1号', maker: '大塚製薬', volume: 1000, glucoseG: 120, kcal: 560 },
  { name: 'エルネオパNF1号', maker: '大塚製薬', volume: 1500, glucoseG: 180, kcal: 840 },
  { name: 'エルネオパNF1号', maker: '大塚製薬', volume: 2000, glucoseG: 240, kcal: 1120 },
  { name: 'エルネオパNF2号', maker: '大塚製薬', volume: 1000, glucoseG: 175, kcal: 820 },
  { name: 'エルネオパNF2号', maker: '大塚製薬', volume: 1500, glucoseG: 262.5, kcal: 1230 },
  { name: 'エルネオパNF2号', maker: '大塚製薬', volume: 2000, glucoseG: 350, kcal: 1640 },
  { name: 'ワンパル1号', maker: 'エイワイファーマ', volume: 800, glucoseG: 120, kcal: 560 },
  { name: 'ワンパル1号', maker: 'エイワイファーマ', volume: 1200, glucoseG: 180, kcal: 840 },
  { name: 'ワンパル2号', maker: 'エイワイファーマ', volume: 800, glucoseG: 180, kcal: 840 },
  { name: 'ワンパル2号', maker: 'エイワイファーマ', volume: 1200, glucoseG: 270, kcal: 1260 },
  // 電解質＋糖質＋アミノ酸＋ビタミン剤
  { name: 'ネオパレン1号', maker: '大塚製薬', volume: 1000, glucoseG: 120, kcal: 560 },
  { name: 'ネオパレン1号', maker: '大塚製薬', volume: 1500, glucoseG: 180, kcal: 840 },
  { name: 'ネオパレン2号', maker: '大塚製薬', volume: 1000, glucoseG: 175, kcal: 820 },
  { name: 'ネオパレン2号', maker: '大塚製薬', volume: 1500, glucoseG: 262.5, kcal: 1230 },
  { name: 'フルカリック1号', maker: 'テルモ', volume: 903, glucoseG: 120, kcal: 560 },
  { name: 'フルカリック1号', maker: 'テルモ', volume: 1354.5, glucoseG: 180, kcal: 840 },
  { name: 'フルカリック2号', maker: 'テルモ', volume: 1003, glucoseG: 175, kcal: 820 },
  { name: 'フルカリック2号', maker: 'テルモ', volume: 1504.5, glucoseG: 262.5, kcal: 1230 },
  { name: 'フルカリック3号', maker: 'テルモ', volume: 1103, glucoseG: 250, kcal: 1160 },
  // 電解質＋糖質＋アミノ酸
  { name: 'ピーエヌツイン1号', maker: '陽進堂', volume: 1000, glucoseG: 120, kcal: 560 },
  { name: 'ピーエヌツイン2号', maker: '陽進堂', volume: 1100, glucoseG: 180, kcal: 840 },
  { name: 'ピーエヌツイン3号', maker: '陽進堂', volume: 1200, glucoseG: 250.4, kcal: 1160 },
  // 電解質＋糖質＋アミノ酸＋脂肪
  { name: 'ミキシッドL', maker: '大塚製薬', volume: 900, glucoseG: 110, kcal: 700 },
  { name: 'ミキシッドH', maker: '大塚製薬', volume: 900, glucoseG: 150, kcal: 900 },
  // TPN基本液（アミノ酸別添加）
  { name: 'ハイカリック1号', maker: 'テルモ', volume: 700, glucoseG: 120, kcal: 480 },
  { name: 'ハイカリック2号', maker: 'テルモ', volume: 700, glucoseG: 175, kcal: 700 },
  { name: 'ハイカリック3号', maker: 'テルモ', volume: 700, glucoseG: 250, kcal: 1000 },
  { name: 'ハイカリックNC-L', maker: 'テルモ', volume: 700, glucoseG: 120, kcal: 480 },
  { name: 'ハイカリックNC-N', maker: 'テルモ', volume: 700, glucoseG: 175, kcal: 700 },
  { name: 'ハイカリックNC-H', maker: 'テルモ', volume: 700, glucoseG: 250, kcal: 1000 },
  { name: 'ハイカリックRF', maker: 'テルモ', volume: 250, glucoseG: 125, kcal: 500 },
  { name: 'ハイカリックRF', maker: 'テルモ', volume: 500, glucoseG: 250, kcal: 1000 },
];

function calcInsulinUnits(glucoseG: number, ratio: number) {
  if (glucoseG === 0) return '—';
  return (glucoseG / ratio).toFixed(1);
}

// カテゴリごとに色分け
const categoryColors: Record<string, string> = {
  '生理食塩液': 'text-slate-300',
  'リンゲル液': 'text-slate-300',
  '乳酸リンゲル液': 'text-blue-300',
  '酢酸リンゲル液': 'text-cyan-300',
  '重炭酸リンゲル液': 'text-teal-300',
  '1号液（開始液）': 'text-green-300',
  '2号液（脱水補給液）': 'text-yellow-300',
  '3号液（維持液）': 'text-orange-300',
  '4号液（術後回復液）': 'text-red-300',
};

export function Section3_SugarIV() {
  // カテゴリ別にグループ化
  const isotonicGroups = isotonicIVs.reduce((acc, iv) => {
    if (!acc[iv.category]) acc[iv.category] = [];
    acc[iv.category].push(iv);
    return acc;
  }, {} as Record<string, typeof isotonicIVs>);

  const hypotonicGroups = hypotonicIVs.reduce((acc, iv) => {
    if (!acc[iv.category]) acc[iv.category] = [];
    acc[iv.category].push(iv);
    return acc;
  }, {} as Record<string, typeof hypotonicIVs>);

  return (
    <div className="space-y-6">
      <AlertBox type="info" title="インスリン混注の基本原則">
        <div className="space-y-1 text-sm">
          <p>ヒューマリンR（速効型インスリン）を輸液バッグに混注</p>
          <p>末梢輸液：グルコース <strong>5g あたり 1単位</strong>（または 10g あたり 1単位）</p>
          <p>IVH：グルコース <strong>10g あたり 1単位</strong>（または 15g あたり 1単位）</p>
          <p className="text-yellow-300">※ 血糖コントロール状況により調整。必ず血糖測定を行うこと。</p>
          <p className="text-xs text-muted-foreground mt-1">糖質表記：G=グルコース　S=ソルビトール　M=マルトース　F=フルクトース</p>
        </div>
      </AlertBox>

      {/* 等張液（生食・リンゲル類） */}
      <Card className="bg-card border-border p-4">
        <h3 className="font-semibold mb-3 text-primary text-base">等張液（生理食塩液・リンゲル液類）</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border text-muted-foreground">
                <th className="text-left pb-2 pr-2">商品名</th>
                <th className="text-left pb-2 pr-1">メーカー</th>
                <th className="text-center pb-2 px-1">容量</th>
                <th className="text-center pb-2 px-1">Glu(g)</th>
                <th className="text-center pb-2 px-1 text-yellow-400">5g/単位</th>
                <th className="text-center pb-2 px-1 text-blue-400">10g/単位</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(isotonicGroups).map(([category, items]) => (
                <React.Fragment key={category}>
                  <tr>
                    <td colSpan={6} className={`pt-3 pb-1 text-xs font-bold ${categoryColors[category] || 'text-muted-foreground'}`}>
                      ▍{category}
                    </td>
                  </tr>
                  {items.map((iv, i) => (
                    <tr key={i} className={`border-b border-border/30 ${iv.glucoseG === 0 ? 'opacity-50' : ''}`}>
                      <td className="py-1.5 pr-2 font-medium">
                        {iv.name}
                        {'sugarType' in iv && iv.sugarType && (
                          <span className="ml-1 text-muted-foreground">({iv.sugarType})</span>
                        )}
                      </td>
                      <td className="py-1.5 pr-1 text-muted-foreground">{iv.maker}</td>
                      <td className="text-center py-1.5 px-1">{iv.volume}mL</td>
                      <td className="text-center py-1.5 px-1">{iv.glucoseG === 0 ? '—' : `${iv.glucoseG}g`}</td>
                      <td className="text-center py-1.5 px-1 text-yellow-400 font-semibold">
                        {calcInsulinUnits(iv.glucoseG, 5)}単位
                      </td>
                      <td className="text-center py-1.5 px-1 text-blue-400 font-semibold">
                        {calcInsulinUnits(iv.glucoseG, 10)}単位
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* 低張液（1〜4号液） */}
      <Card className="bg-card border-border p-4">
        <h3 className="font-semibold mb-3 text-primary text-base">低張液（1〜4号液）</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border text-muted-foreground">
                <th className="text-left pb-2 pr-2">商品名</th>
                <th className="text-left pb-2 pr-1">メーカー</th>
                <th className="text-center pb-2 px-1">容量</th>
                <th className="text-center pb-2 px-1">Glu(g)</th>
                <th className="text-center pb-2 px-1 text-yellow-400">5g/単位</th>
                <th className="text-center pb-2 px-1 text-blue-400">10g/単位</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(hypotonicGroups).map(([category, items]) => (
                <React.Fragment key={category}>
                  <tr>
                    <td colSpan={6} className={`pt-3 pb-1 text-xs font-bold ${categoryColors[category] || 'text-muted-foreground'}`}>
                      ▍{category}
                    </td>
                  </tr>
                  {items.map((iv, i) => (
                    <tr key={i} className="border-b border-border/30">
                      <td className="py-1.5 pr-2 font-medium">
                        {iv.name}
                        {'sugarType' in iv && iv.sugarType && (
                          <span className="ml-1 text-muted-foreground">({iv.sugarType})</span>
                        )}
                      </td>
                      <td className="py-1.5 pr-1 text-muted-foreground">{iv.maker}</td>
                      <td className="text-center py-1.5 px-1">{iv.volume}mL</td>
                      <td className="text-center py-1.5 px-1">{iv.glucoseG}g</td>
                      <td className="text-center py-1.5 px-1 text-yellow-400 font-semibold">
                        {calcInsulinUnits(iv.glucoseG, 5)}単位
                      </td>
                      <td className="text-center py-1.5 px-1 text-blue-400 font-semibold">
                        {calcInsulinUnits(iv.glucoseG, 10)}単位
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-muted-foreground mt-2">Glu(g) = 500mL容器あたりのグルコース含有量</p>
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
