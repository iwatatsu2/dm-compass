import React, { useState } from 'react';
import { AlertBox } from '@/components/AlertBox';
import { Card } from '@/components/ui/card';

export function Section4_DiabetesType() {
  const [activeTab, setActiveTab] = useState<'criteria' | 'type1' | 'type2' | 'other'>('criteria');

  return (
    <div className="space-y-4">
      {/* タブ */}
      <div className="grid grid-cols-4 gap-1">
        {[
          { key: 'criteria', label: '診断基準' },
          { key: 'type1', label: '1型' },
          { key: 'type2', label: '2型' },
          { key: 'other', label: 'その他' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as typeof activeTab)}
            className={`py-1.5 rounded text-xs font-semibold transition-colors ${
              activeTab === tab.key
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-border'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'criteria' && (
        <div className="space-y-3">
          <Card className="bg-card border-border p-4">
            <h3 className="font-semibold mb-3 text-primary text-base">糖尿病の診断基準（日本糖尿病学会）</h3>
            <div className="space-y-3 text-sm">
              <div className="bg-red-950/20 border border-red-700/50 rounded p-3">
                <p className="font-semibold text-red-400 mb-2">【糖尿病型】以下のいずれかを満たす</p>
                <ul className="space-y-1">
                  <li>① 空腹時血糖 <span className="text-yellow-400 font-bold">≥ 126 mg/dL</span></li>
                  <li>② 75g OGTT 2時間値 <span className="text-yellow-400 font-bold">≥ 200 mg/dL</span></li>
                  <li>③ 随時血糖 <span className="text-yellow-400 font-bold">≥ 200 mg/dL</span></li>
                  <li>④ HbA1c <span className="text-yellow-400 font-bold">≥ 6.5%</span></li>
                </ul>
              </div>
              <div className="bg-yellow-950/20 border border-yellow-700/50 rounded p-3">
                <p className="font-semibold text-yellow-400 mb-2">【糖尿病の診断確定】</p>
                <ul className="space-y-1.5">
                  <li className="flex gap-2"><span className="text-green-400 flex-shrink-0">●</span><span>血糖値（①〜③）のいずれか + HbA1c（④）が<strong>同一検体</strong>で確認された場合</span></li>
                  <li className="flex gap-2"><span className="text-green-400 flex-shrink-0">●</span><span>血糖値（①〜③）のいずれかが<strong>別の日に2回</strong>確認された場合</span></li>
                </ul>
              </div>
            </div>
          </Card>

          <Card className="bg-card border-border p-4">
            <h3 className="font-semibold mb-3 text-primary text-base">緩徐進行1型糖尿病（SPIDDM）診断基準</h3>
            <div className="space-y-3 text-xs">
              <div className="bg-blue-950/20 border border-blue-700/50 rounded p-3">
                <p className="font-semibold text-blue-400 mb-2">【必須項目】</p>
                <div className="space-y-2">
                  <div>
                    <p className="font-semibold text-blue-300 mb-1">1. 経過のどこかの時点で膵島関連自己抗体が陽性である。a)</p>
                  </div>
                  <div>
                    <p className="font-semibold text-blue-300 mb-1">2. 原則として、糖尿病の診断時、ケトーシスもしくはケトアシドーシスはなく、ただちには高血糖是正のためインスリン療法が必要とならない。</p>
                  </div>
                  <div>
                    <p className="font-semibold text-blue-300 mb-1">3. 経過とともにインスリン分泌能が緩徐に低下し、糖尿病の診断後 3 ヶ月b)を過ぎてからインスリン療法が必要になり、最終観察時点で内因性インスリン欠乏状態（空腹時血清 C ペプチド＜0.6ng/ml）である。</p>
                  </div>
                </div>
              </div>

              <div className="bg-green-950/20 border border-green-700/50 rounded p-3">
                <p className="font-semibold text-green-400 mb-2">【判定】</p>
                <ul className="space-y-1.5">
                  <li className="flex gap-2"><span className="text-green-400 flex-shrink-0">●</span><span>上記 1、2、3 を満たす場合、「<strong>緩徐進行 1 型糖尿病（definite）</strong>」と診断する。</span></li>
                  <li className="flex gap-2"><span className="text-green-400 flex-shrink-0">●</span><span>上記 1、2 のみを満たす場合は、インスリン非依存状態の糖尿病であり、「<strong>緩徐進行 1 型糖尿病（probable）</strong>」とする。</span></li>
                </ul>
              </div>

              <div className="bg-muted/20 border border-border rounded p-3">
                <p className="font-semibold text-muted-foreground mb-2">【注釈】</p>
                <div className="space-y-1.5 text-xs text-muted-foreground">
                  <p><span className="text-yellow-400">a)</span> 膵島関連自己抗体とは、グルタミン酸脱炭酸酵素（GAD）抗体、膵島細胞抗体（ICA）、Insulinoma-associated antigen-2（IA-2）抗体、亜鉛輸送担体 8（ZnT8）抗体、インスリン自己抗体（IAA）を指す。ただし、IAA はインスリン治療開始前に測定した場合に限る。</p>
                  <p><span className="text-yellow-400">b)</span> 典型例は 6 ヶ月以上である。</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'type1'  && (
        <div className="space-y-3">
          <Card className="bg-card border-border p-4">
            <h3 className="font-semibold mb-3 text-primary text-sm">1型糖尿病の分類</h3>
            <div className="space-y-3">
              <div className="border border-red-700/50 rounded p-3 bg-red-950/10">
                <p className="font-bold text-red-400 text-xs mb-2">劇症1型糖尿病</p>
                <ul className="space-y-1 text-xs">
                  <li>• 発症から数日以内にDKAに至る</li>
                  <li>• 膵島関連自己抗体：<span className="text-yellow-400">陰性が多い</span></li>
                  <li>• HbA1c：正常〜軽度上昇（発症直後のため）</li>
                  <li>• 血糖値：著明高値（&gt;288 mg/dL）</li>
                  <li>• 尿中Cペプチド：<span className="text-red-400">&lt;10 μg/日</span></li>
                  <li>• 膵酵素上昇（アミラーゼ・リパーゼ）を伴うことあり</li>
                </ul>
                <div className="mt-2 bg-red-950/20 rounded p-2">
                  <p className="text-xs font-semibold text-red-300">診断基準（3項目全て満たす）</p>
                  <ul className="text-xs mt-1 space-y-0.5">
                    <li>① 発症から7日以内にケトーシス/DKA</li>
                    <li>② 血糖値 ≥ 288 mg/dL</li>
                    <li>③ 尿中Cペプチド &lt;10μg/日 or 空腹時血清Cペプチド &lt;0.3 ng/mL</li>
                  </ul>
                </div>
              </div>
              <div className="border border-orange-700/50 rounded p-3 bg-orange-950/10">
                <p className="font-bold text-orange-400 text-xs mb-2">急性発症1型糖尿病</p>
                <ul className="space-y-1 text-xs">
                  <li>• 発症から数週間でインスリン依存状態に</li>
                  <li>• 膵島関連自己抗体：<span className="text-yellow-400">陽性（GAD抗体など）</span></li>
                  <li>• 発症時DKAを呈することが多い</li>
                  <li>• 口渇・多飲・多尿・体重減少などの症状が急激に出現</li>
                </ul>
              </div>
              <div className="border border-yellow-700/50 rounded p-3 bg-yellow-950/10">
                <p className="font-bold text-yellow-400 text-xs mb-2">緩徐進行1型糖尿病（LADA）</p>
                <ul className="space-y-1 text-xs">
                  <li>• 発症時は2型糖尿病様の経過</li>
                  <li>• 膵島関連自己抗体：<span className="text-yellow-400">陽性（GAD抗体が重要）</span></li>
                  <li>• 数年かけてインスリン依存状態に進行</li>
                </ul>
                <div className="mt-2 bg-yellow-950/20 rounded p-2 space-y-1">
                  <p className="text-xs font-semibold text-yellow-300">Definite（確実）</p>
                  <p className="text-xs">GAD抗体陽性 + インスリン非依存期間あり（発症後6ヶ月以上）</p>
                  <p className="text-xs font-semibold text-yellow-200 mt-1">Probable（疑い）</p>
                  <p className="text-xs">GAD抗体陰性だが他の膵島抗体陽性（ICA、IA-2抗体など）</p>
                </div>
              </div>
            </div>
          </Card>
          <AlertBox type="info">
            <p className="text-xs">1型糖尿病疑い時は膵島関連自己抗体（GAD抗体、IA-2抗体、ICA、ZnT8抗体）を測定。Cペプチド（空腹時・負荷後）でインスリン分泌能を評価。</p>
          </AlertBox>
        </div>
      )}

      {activeTab === 'type2' && (
        <div className="space-y-3">
          <Card className="bg-card border-border p-4">
            <h3 className="font-semibold mb-3 text-primary text-sm">2型糖尿病の特徴</h3>
            <div className="space-y-3">
              <div className="bg-blue-950/20 border border-blue-700/50 rounded p-3">
                <p className="font-semibold text-blue-400 text-xs mb-2">病態</p>
                <ul className="space-y-1 text-xs">
                  <li>• インスリン分泌低下 + インスリン抵抗性の両者が関与</li>
                  <li>• 遺伝的素因 + 環境因子（肥満・運動不足・加齢）</li>
                  <li>• 膵島関連自己抗体：<span className="text-green-400">陰性</span></li>
                  <li>• 緩徐な発症（多くは無症状で発見）</li>
                  <li>• 全糖尿病患者の約95%を占める</li>
                </ul>
              </div>
              <div className="bg-card/50 border border-border rounded p-3">
                <p className="font-semibold text-xs mb-2">血糖コントロール目標（HbA1c）</p>
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between items-center py-1 border-b border-border/30">
                    <span>合併症予防の目標</span>
                    <span className="text-yellow-400 font-bold">7.0%未満</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-border/30">
                    <span>より厳格な管理（低血糖なし）</span>
                    <span className="text-green-400 font-bold">6.0%未満</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-border/30">
                    <span>低血糖リスクが高い場合</span>
                    <span className="text-orange-400 font-bold">8.0%未満</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span>高齢者（75歳以上）</span>
                    <span className="text-red-400 font-bold">8.0〜8.5%未満</span>
                  </div>
                </div>
              </div>
              <div className="bg-yellow-950/20 border border-yellow-700/50 rounded p-3">
                <p className="font-semibold text-yellow-400 text-xs mb-2">インスリン分泌能評価</p>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span>空腹時Cペプチド</span>
                    <span>正常：0.5～2.0 ng/mL</span>
                  </div>
                  <div className="flex justify-between">
                    <span>尿中Cペプチド（24時間）</span>
                    <span>正常：50～100 μg/日</span>
                  </div>
                  <div className="border-t border-yellow-700/30 pt-2 mt-2">
                    <p className="font-semibold text-yellow-300 mb-1">CPI（Cペプチドインデックス）計算</p>
                    <p className="text-muted-foreground text-xs mb-2">CPI = 空腹時血清Cペプチド(ng/mL) × 100 ÷ 空腹時血糖(mg/dL)</p>
                    <div className="grid grid-cols-2 gap-2 mb-2">
                      <div>
                        <label className="text-muted-foreground block mb-1">Cペプチド(ng/mL)</label>
                        <input type="number" placeholder="例: 1.2" className="w-full bg-input border border-border rounded px-2 py-1 text-xs" id="cpi-cpeptide" />
                      </div>
                      <div>
                        <label className="text-muted-foreground block mb-1">血糖(mg/dL)</label>
                        <input type="number" placeholder="例: 120" className="w-full bg-input border border-border rounded px-2 py-1 text-xs" id="cpi-glucose" />
                      </div>
                    </div>
                    <button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white text-xs py-1 rounded transition-colors">計算</button>
                    <div className="mt-2 p-2 bg-yellow-950/50 rounded text-xs space-y-1">
                      <p><span className="text-yellow-300">＜0.6:</span> 重度低下 - インスリン治療必須の可能性高い</p>
                      <p><span className="text-yellow-300">0.6～1.0:</span> 低下 - 分泌低下あり。経口薬のみでは不十分な可能性</p>
                      <p><span className="text-yellow-300">1.0～1.5:</span> やや低下 - 進行期2型糖尿病で多い</p>
                      <p><span className="text-yellow-300">&gt;1.5:</span> 保たれている - 分泌は比較的維持</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground mt-1">インスリン依存状態の判断に使用</p>
                </div>
              </div>

            </div>
          </Card>
        </div>
      )}

      {activeTab === 'other' && (
        <div className="space-y-3">
          <Card className="bg-card border-border p-4">
            <h3 className="font-semibold mb-3 text-primary text-sm">その他の糖尿病</h3>
            <div className="space-y-3">
              {[
                {
                  name: 'MODY（若年発症成人型糖尿病）',
                  color: 'text-purple-400',
                  bg: 'bg-purple-950/10',
                  border: 'border-purple-700/50',
                  points: [
                    '常染色体優性遺伝（家族歴が強い）',
                    '25歳以下での発症が多い',
                    '肥満なし、自己抗体陰性',
                    'MODY2（GCK変異）：軽度の空腹時高血糖、治療不要なことも',
                    'MODY3（HNF1α変異）：進行性、スルホニル尿素薬に感受性高い',
                    'MODY5（HNF1β変異）：腎嚢胞を合併',
                  ],
                },
                {
                  name: 'ミトコンドリア糖尿病（MIDD）',
                  color: 'text-teal-400',
                  bg: 'bg-teal-950/10',
                  border: 'border-teal-700/50',
                  points: [
                    '母系遺伝（ミトコンドリアDNA変異：m.3243A>G）',
                    '難聴を合併することが多い（MIDD）',
                    'インスリン分泌低下が主体',
                    'メトホルミンは禁忌（乳酸アシドーシスリスク）',
                    'インスリン療法が基本',
                  ],
                },
                {
                  name: '二次性糖尿病',
                  color: 'text-orange-400',
                  bg: 'bg-orange-950/10',
                  border: 'border-orange-700/50',
                  points: [
                    '膵疾患：慢性膵炎、膵癌、膵切除後',
                    '内分泌疾患：クッシング症候群、先端巨大症、褐色細胞腫',
                    '薬剤性：ステロイド、抗精神病薬、免疫抑制薬',
                    '遺伝性疾患：ウォルフラム症候群など',
                  ],
                },
                {
                  name: '妊娠糖尿病（GDM）',
                  color: 'text-pink-400',
                  bg: 'bg-pink-950/10',
                  border: 'border-pink-700/50',
                  points: [
                    '妊娠中に初めて発見または発症した糖代謝異常',
                    '75g OGTT：空腹時≥92、1時間≥180、2時間≥153 mg/dL（1点以上）',
                    '妊娠中の明らかな糖尿病は除く',
                    '分娩後に再評価（多くは改善するが将来の2型DM発症リスク高い）',
                  ],
                },
              ].map((item) => (
                <div key={item.name} className={`border ${item.border} rounded p-3 ${item.bg}`}>
                  <p className={`font-bold text-xs mb-2 ${item.color}`}>{item.name}</p>
                  <ul className="space-y-0.5">
                    {item.points.map((p, i) => (
                      <li key={i} className="text-xs flex gap-1.5">
                        <span className={`flex-shrink-0 ${item.color}`}>•</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
