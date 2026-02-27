import React, { useState } from 'react';
import { AlertBox } from '@/components/AlertBox';
import { Card } from '@/components/ui/card';

export function Section5_T2DAlgorithm() {
  const [hasHF, setHasHF] = useState(false);
  const [hasCKD, setHasCKD] = useState(false);
  const [hasASCVD, setHasASCVD] = useState(false);
  const [isObese, setIsObese] = useState(false);
  const [hypoglycemiaRisk, setHypoglycemiaRisk] = useState(false);
  const [hba1c, setHba1c] = useState('');

  const hba1cNum = parseFloat(hba1c);

  const getRecommendation = () => {
    const drugs: { name: string; reason: string; priority: string; brands?: string }[] = [];
    if (hasHF || hasCKD) {
      drugs.push({ name: 'SGLT2阔害薬', reason: '心不全・CKDへの臓器保護効果（EMPA-REG, CREDENCE, DAPA-HF）', priority: 'high', brands: 'ジャディアンス / カナグル / フォシーガ' });
    }
    if (hasASCVD) {
      drugs.push({ name: 'GLP-1受容体作動薬', reason: '心血管イベント抑制（LEADER, SUSTAIN-6, REWIND）', priority: 'high', brands: 'ビクトーザ / オゼンピック / トルリシティ' });
    }
    if (isObese) {
      drugs.push({ name: 'GLP-1受容体作動薬', reason: '体重減少効果（セマグルチドで-5～-15%）', priority: 'medium', brands: 'リベルサス（経口）/ オゼンピック（注射）' });
    }
    if (hypoglycemiaRisk) {
      drugs.push({ name: 'DPP-4阔害薬', reason: '低血糖リスクが低い、腐機能に応じて減量', priority: 'medium', brands: 'ジャヌビア / トラゼンタ / エクア / オングリザ' });
    }
    if (drugs.length === 0) {
      drugs.push({ name: 'メトホルミン', reason: '第一選択薬（禁忌がなければ全例）', priority: 'high', brands: 'メトグルコ / グリコラン' });
    }
    if (hba1cNum >= 10.0) {
      drugs.push({ name: 'インスリン導入を強く考慮', reason: 'HbA1c ≥10%の場合、高血糖毒性の解除のため早期導入を検討', priority: 'danger' });
    }
    return drugs;
  };

  const recommendations = getRecommendation();

  return (
    <div className="space-y-4">
      <AlertBox type="info" title="日本糖尿病学会 2型糖尿病薬物療法アルゴリズム（2023年）">
        <p className="text-xs">生活習慣の改善（食事・運動）を基本とし、薬物療法を追加する。HbA1c目標：一般的に7.0%未満（個別化が重要）</p>
      </AlertBox>

      {/* 患者背景による薬剤選択 */}
      <Card className="bg-card border-border p-4">
        <h3 className="font-semibold mb-3 text-primary text-sm">患者背景による薬剤選択</h3>
        <div className="space-y-2 mb-3">
          {[
            { label: '心不全（HF）あり', state: hasHF, setter: setHasHF },
            { label: '慢性腎臓病（CKD）あり', state: hasCKD, setter: setHasCKD },
            { label: '動脈硬化性心血管疾患（ASCVD）あり', state: hasASCVD, setter: setHasASCVD },
            { label: '肥満（BMI≥25）あり', state: isObese, setter: setIsObese },
            { label: '低血糖リスク高（高齢・腎機能低下）', state: hypoglycemiaRisk, setter: setHypoglycemiaRisk },
          ].map((item) => (
            <label key={item.label} className="flex items-center gap-2 text-xs cursor-pointer">
              <input
                type="checkbox"
                checked={item.state}
                onChange={(e) => item.setter(e.target.checked)}
                className="w-4 h-4 accent-yellow-400"
              />
              <span>{item.label}</span>
            </label>
          ))}
        </div>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs text-muted-foreground">HbA1c:</span>
          <input
            type="number"
            value={hba1c}
            onChange={(e) => setHba1c(e.target.value)}
            placeholder="例: 8.5"
            step="0.1" min="5" max="15"
            className="w-24 bg-input border border-border rounded px-2 py-1 text-xs text-foreground"
          />
          <span className="text-xs text-muted-foreground">%</span>
          {parseFloat(hba1c) >= 10.0 && <span className="text-red-400 text-xs font-bold">→ インスリン導入を考慮</span>}
        </div>
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground font-semibold">推奨薬剤：</p>
          {recommendations.map((rec, i) => (
            <div
              key={i}
              className={`rounded p-2.5 ${
                rec.priority === 'danger'
                  ? 'bg-red-950/30 border border-red-700'
                  : rec.priority === 'high'
                  ? 'bg-yellow-950/30 border border-yellow-700'
                  : 'bg-blue-950/20 border border-blue-700/50'
              }`}
            >
              <p className={`font-semibold text-xs ${
                rec.priority === 'danger' ? 'text-red-400' :
                rec.priority === 'high' ? 'text-yellow-400' : 'text-blue-400'
              }`}>
                {rec.name}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">{rec.reason}</p>
              {rec.brands && <p className="text-xs text-green-400 mt-0.5">商品名: {rec.brands}</p>}
            </div>
          ))}
        </div>
      </Card>

      {/* 薬剤クラス別特徴 */}
      <Card className="bg-card border-border p-4">
        <h3 className="font-semibold mb-3 text-primary text-sm">薬剤クラス別 特徴と使い分け</h3>
        <div className="space-y-3 text-sm">
          {[
            {
              name: 'メトホルミン',
              color: 'text-green-400',
              features: ['第一選択薬', '体重増加なし', '低血糖リスク低', '腎機能低下（eGFR<30）で禁忌', '造影剤使用前後は休薬'],
            },
            {
              name: 'SGLT2阻害薬',
              color: 'text-blue-400',
              features: ['心不全・CKD保護効果', '体重減少', '血圧低下', 'eGFR<45で血糖降下効果減弱', '尿路感染・性器感染に注意', '周術期3日前から休薬'],
            },
            {
              name: 'GLP-1受容体作動薬',
              color: 'text-purple-400',
              features: ['体重減少効果大', '心血管イベント抑制', '消化器症状（悪心・嘔吐）', '注射薬（週1回製剤あり）', '経口薬（セマグルチド）あり'],
            },
            {
              name: 'DPP-4阻害薬',
              color: 'text-yellow-400',
              features: ['低血糖リスク低', '体重増加なし', '腎機能に応じて用量調整', '心不全への影響は薬剤による'],
            },
            {
              name: 'SU薬',
              color: 'text-orange-400',
              features: ['低血糖リスク高（特に高齢者）', '体重増加', '安価', '高齢者・腎機能低下では慎重投与'],
            },
            {
              name: 'インスリン',
              color: 'text-red-400',
              features: ['HbA1c高値（>10%）や症状あり', '1型糖尿病', '妊娠糖尿病', '手術・重篤疾患時', '低血糖リスクあり'],
            },
          ].map((drug) => (
            <div key={drug.name} className="border-b border-border/30 pb-3">
              <p className={`font-semibold ${drug.color} mb-1`}>{drug.name}</p>
              <ul className="space-y-0.5 ml-3">
                {drug.features.map((f, i) => (
                  <li key={i} className="text-xs">• {f}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Card>

      {/* HbA1c目標 */}
      <Card className="bg-card border-border p-4">
        <h3 className="font-semibold mb-3 text-primary text-base">HbA1c 目標値の個別化</h3>
        <div className="space-y-2 text-sm">
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-green-950/20 border border-green-700/50 rounded p-2">
              <p className="font-semibold text-green-400 text-xs mb-1">積極的目標（&lt;6.5%）</p>
              <p className="text-xs">若年、罹病期間短、合併症なし</p>
            </div>
            <div className="bg-yellow-950/20 border border-yellow-700/50 rounded p-2">
              <p className="font-semibold text-yellow-400 text-xs mb-1">標準目標（&lt;7.0%）</p>
              <p className="text-xs">一般的な2型糖尿病患者</p>
            </div>
            <div className="bg-orange-950/20 border border-orange-700/50 rounded p-2">
              <p className="font-semibold text-orange-400 text-xs mb-1">緩和目標（&lt;8.0%）</p>
              <p className="text-xs">高齢者、低血糖リスク高</p>
            </div>
            <div className="bg-red-950/20 border border-red-700/50 rounded p-2">
              <p className="font-semibold text-red-400 text-xs mb-1">最緩和（&lt;8.5%）</p>
              <p className="text-xs">フレイル、認知症、終末期</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
