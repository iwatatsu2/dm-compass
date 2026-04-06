import React, { useState } from 'react';
import { AlertBox } from '@/components/AlertBox';
import { Card } from '@/components/ui/card';

export function Section4_DiabetesType() {
  const [activeTab, setActiveTab] = useState<'criteria' | 'type1' | 'type2' | 'other'>('criteria');
  const [cpiCpeptide, setCpiCpeptide] = useState('');
  const [cpiGlucose, setCpiGlucose] = useState('');
  const [cpiResult, setCpiResult] = useState<string | null>(null);

  const calcCPI = () => {
    const cp = parseFloat(cpiCpeptide);
    const gl = parseFloat(cpiGlucose);
    if (isNaN(cp) || isNaN(gl) || gl === 0) {
      setCpiResult('入力値を確認してください');
      return;
    }
    const cpi = (cp * 100) / gl;
    let judgment = '';
    if (cpi < 0.6) judgment = '重度低下 → インスリン治療必須の可能性が高い';
    else if (cpi < 1.0) judgment = '低下 → 経口薬のみでは不十分な可能性';
    else if (cpi < 1.5) judgment = 'やや低下 → 進行期2型糖尿病で多い';
    else judgment = '保たれている → 分泌は比較的維持';
    setCpiResult(`CPI = ${cpi.toFixed(2)}　→　${judgment}`);
  };

  return (
    <div className="space-y-4">
      {/* タブ */}
      <div className="grid grid-cols-4 gap-1">
        {[
          { key: 'criteria', label: '診断基準' },
          { key: 'type1',    label: '1型' },
          { key: 'type2',    label: '2型' },
          { key: 'other',    label: 'その他' },
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

      {/* ─── 診断基準タブ（SPIDDMは削除） ─── */}
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
                  <li className="flex gap-2">
                    <span className="text-green-400 flex-shrink-0">●</span>
                    <span>血糖値（①〜③）のいずれか + HbA1c（④）が<strong>同一検体</strong>で確認された場合</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-green-400 flex-shrink-0">●</span>
                    <span>血糖値（①〜③）のいずれかが<strong>別の日に2回</strong>確認された場合</span>
                  </li>
                </ul>
              </div>
              <div className="bg-blue-950/20 border border-blue-700/50 rounded p-3">
                <p className="font-semibold text-blue-400 mb-2">【境界型（IGT）】</p>
                <ul className="space-y-1 text-sm">
                  <li>空腹時血糖 110〜125 mg/dL（IFG）</li>
                  <li>75g OGTT 2時間値 140〜199 mg/dL（IGT）</li>
                </ul>
              </div>
            </div>
          </Card>
          <AlertBox type="warning">
            <p className="text-xs">HbA1cのみで糖尿病と診断することはできません。必ず血糖値との組み合わせで判断してください。</p>
          </AlertBox>
        </div>
      )}

      {/* ─── 1型タブ（SPIDDMをここに移動） ─── */}
      {activeTab === 'type1' && (
        <div className="space-y-3">
          <Card className="bg-card border-border p-4">
            <h3 className="font-semibold mb-3 text-primary text-sm">1型糖尿病の分類</h3>
            <div className="space-y-3">
              {/* 劇症1型 */}
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
              {/* 急性発症1型 */}
              <div className="border border-orange-700/50 rounded p-3 bg-orange-950/10">
                <p className="font-bold text-orange-400 text-xs mb-2">急性発症1型糖尿病</p>
                <ul className="space-y-1 text-xs">
                  <li>• 発症から数週間でインスリン依存状態に</li>
                  <li>• 膵島関連自己抗体：<span className="text-yellow-400">陽性（GAD抗体など）</span></li>
                  <li>• 発症時DKAを呈することが多い</li>
                  <li>• 口渇・多飲・多尿・体重減少などの症状が急激に出現</li>
                </ul>
              </div>
              {/* SPIDDM（緩徐進行1型）── 診断基準タブから移動 */}
              <div className="border border-yellow-700/50 rounded p-3 bg-yellow-950/10">
                <p className="font-bold text-yellow-400 text-xs mb-2">緩徐進行1型糖尿病（SPIDDM / LADA）</p>
                <ul className="space-y-1 text-xs">
                  <li>• 発症時は2型糖尿病様の経過</li>
                  <li>• 膵島関連自己抗体：<span className="text-yellow-400">陽性（GAD抗体が重要）</span></li>
                  <li>• 数年かけてインスリン依存状態に進行</li>
                </ul>
                {/* SPIDDM診断基準（正式） */}
                <div className="mt-3 space-y-2">
                  <div className="bg-blue-950/20 border border-blue-700/50 rounded p-3">
                    <p className="font-semibold text-blue-400 mb-2 text-xs">【必須項目】（日本糖尿病学会 SPIDDM診断基準）</p>
                    <div className="space-y-2 text-xs">
                      <p><span className="text-blue-300 font-semibold">1.</span> 経過のどこかの時点で膵島関連自己抗体が陽性である。<span className="text-yellow-400">a)</span></p>
                      <p><span className="text-blue-300 font-semibold">2.</span> 原則として、糖尿病の診断時、ケトーシスもしくはケトアシドーシスはなく、ただちには高血糖是正のためインスリン療法が必要とならない。</p>
                      <p><span className="text-blue-300 font-semibold">3.</span> 経過とともにインスリン分泌能が緩徐に低下し、糖尿病の診断後 3 ヶ月<span className="text-yellow-400">b)</span>を過ぎてからインスリン療法が必要になり、最終観察時点で内因性インスリン欠乏状態（空腹時血清 C ペプチド＜0.6 ng/mL）である。</p>
                    </div>
                  </div>
                  <div className="bg-green-950/20 border border-green-700/50 rounded p-3">
                    <p className="font-semibold text-green-400 mb-2 text-xs">【判定】</p>
                    <ul className="space-y-1.5 text-xs">
                      <li className="flex gap-2">
                        <span className="text-green-400 flex-shrink-0">●</span>
                        <span>1・2・3 を全て満たす → <strong>緩徐進行1型糖尿病（definite）</strong></span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-yellow-400 flex-shrink-0">●</span>
                        <span>1・2 のみを満たす（インスリン非依存状態）→ <strong>緩徐進行1型糖尿病（probable）</strong></span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-muted/20 border border-border rounded p-3">
                    <p className="font-semibold text-muted-foreground mb-2 text-xs">【注釈】</p>
                    <div className="space-y-1.5 text-xs text-muted-foreground">
                      <p><span className="text-yellow-400">a)</span> 膵島関連自己抗体：GAD抗体、ICA、IA-2抗体、ZnT8抗体、IAA（インスリン治療開始前に測定した場合に限る）</p>
                      <p><span className="text-yellow-400">b)</span> 典型例は 6 ヶ月以上である。</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
          <AlertBox type="info">
            <p className="text-xs">1型糖尿病疑い時は膵島関連自己抗体（GAD抗体、IA-2抗体、ICA、ZnT8抗体）を測定。Cペプチド（空腹時・負荷後）でインスリン分泌能を評価。</p>
          </AlertBox>
        </div>
      )}

      {/* ─── 2型タブ ─── */}
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
              {/* CPI計算機（React state対応） */}
              <div className="bg-yellow-950/20 border border-yellow-700/50 rounded p-3">
                <p className="font-semibold text-yellow-400 text-xs mb-2">インスリン分泌能評価</p>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span>空腹時Cペプチド</span>
                    <span>正常：0.5〜2.0 ng/mL</span>
                  </div>
                  <div className="flex justify-between">
                    <span>尿中Cペプチド（24時間）</span>
                    <span>正常：50〜100 μg/日</span>
                  </div>
                  <div className="border-t border-yellow-700/30 pt-2 mt-2">
                    <p className="font-semibold text-yellow-300 mb-1">CPI（Cペプチドインデックス）計算</p>
                    <p className="text-muted-foreground text-xs mb-2">CPI = 空腹時血清Cペプチド(ng/mL) × 100 ÷ 空腹時血糖(mg/dL)</p>
                    <div className="grid grid-cols-2 gap-2 mb-2">
                      <div>
                        <label className="text-muted-foreground block mb-1">Cペプチド(ng/mL)</label>
                        <input
                          type="number"
                          placeholder="例: 1.2"
                          value={cpiCpeptide}
                          onChange={(e) => setCpiCpeptide(e.target.value)}
                          className="w-full bg-input border border-border rounded px-2 py-1 text-xs"
                        />
                      </div>
                      <div>
                        <label className="text-muted-foreground block mb-1">血糖(mg/dL)</label>
                        <input
                          type="number"
                          placeholder="例: 120"
                          value={cpiGlucose}
                          onChange={(e) => setCpiGlucose(e.target.value)}
                          className="w-full bg-input border border-border rounded px-2 py-1 text-xs"
                        />
                      </div>
                    </div>
                    <button
                      onClick={calcCPI}
                      className="w-full bg-yellow-600 hover:bg-yellow-700 text-white text-xs py-1 rounded transition-colors"
                    >
                      計算
                    </button>
                    {cpiResult && (
                      <div className="mt-2 p-2 bg-yellow-950/50 rounded text-xs">
                        <p className="text-yellow-200 font-semibold">{cpiResult}</p>
                      </div>
                    )}
                    <div className="mt-2 p-2 bg-yellow-950/30 rounded text-xs space-y-1">
                      <p><span className="text-yellow-300">＜0.6:</span> 重度低下 - インスリン治療必須の可能性高い</p>
                      <p><span className="text-yellow-300">0.6〜1.0:</span> 低下 - 経口薬のみでは不十分な可能性</p>
                      <p><span className="text-yellow-300">1.0〜1.5:</span> やや低下 - 進行期2型糖尿病で多い</p>
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

      {/* ─── その他タブ ─── */}
      {activeTab === 'other' && (
        <div className="space-y-3">
          {/* MODY 詳細セクション */}
          <Card className="bg-card border-border p-4">
            <h3 className="font-semibold mb-1 text-purple-400 text-sm">MODY（Maturity-Onset Diabetes of the Young）</h3>
            <p className="text-xs text-muted-foreground mb-3">若年発症・常染色体優性遺伝・自己免疫なし・全糖尿病の1–2%</p>

            {/* まとめ表 */}
            <div className="overflow-x-auto mb-3">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="bg-purple-950/30">
                    <th className="text-left p-1.5 text-purple-300 font-semibold border border-purple-700/30">型</th>
                    <th className="text-left p-1.5 text-purple-300 font-semibold border border-purple-700/30">遺伝子</th>
                    <th className="text-left p-1.5 text-purple-300 font-semibold border border-purple-700/30">頻度</th>
                    <th className="text-left p-1.5 text-purple-300 font-semibold border border-purple-700/30">治療</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { type: 'MODY3', gene: 'HNF1A', freq: '30–50%', tx: 'SU有効', txColor: 'text-green-400' },
                    { type: 'MODY2', gene: 'GCK',   freq: '20–30%', tx: '治療不要', txColor: 'text-blue-400' },
                    { type: 'MODY1', gene: 'HNF4A', freq: '5–10%',  tx: 'SU有効', txColor: 'text-green-400' },
                    { type: 'MODY5', gene: 'HNF1B', freq: '1–5%',   tx: 'インスリン', txColor: 'text-orange-400' },
                    { type: 'MODY4', gene: 'PDX1',  freq: '＜1%',   tx: 'インスリン', txColor: 'text-orange-400' },
                  ].map((row) => (
                    <tr key={row.type} className="border-b border-purple-700/20">
                      <td className="p-1.5 border border-purple-700/20 font-bold text-purple-300">{row.type}</td>
                      <td className="p-1.5 border border-purple-700/20 text-yellow-300">{row.gene}</td>
                      <td className="p-1.5 border border-purple-700/20">{row.freq}</td>
                      <td className={`p-1.5 border border-purple-700/20 font-semibold ${row.txColor}`}>{row.tx}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* 各型の詳細 */}
            <div className="space-y-2">
              {[
                {
                  type: 'MODY3（最重要）', gene: 'HNF1A', freq: '約30–50%',
                  features: ['思春期〜若年で発症', '腎閾値低下 → 尿糖が出やすい', '進行性高血糖'],
                  tx: 'SU薬が非常に有効（第一選択）。インスリン不要になること多い',
                  txColor: 'text-green-400',
                },
                {
                  type: 'MODY2', gene: 'GCK', freq: '約20–30%',
                  features: ['軽度空腹時高血糖（100–150 mg/dL程度）', '生涯ほぼ安定・合併症リスク低い', '妊娠時のみ注意'],
                  tx: '基本的に治療不要',
                  txColor: 'text-blue-400',
                },
                {
                  type: 'MODY1', gene: 'HNF4A', freq: '約5–10%',
                  features: ['MODY3と臨床像が類似', '新生児期に巨大児・低血糖を呈することあり'],
                  tx: 'SU薬有効',
                  txColor: 'text-green-400',
                },
                {
                  type: 'MODY5', gene: 'HNF1B', freq: '約1–5%',
                  features: ['腎奇形（嚢胞・形成異常）', '肝機能異常・低Mg血症'],
                  tx: 'インスリンが必要なことが多い（SU効きにくい）',
                  txColor: 'text-orange-400',
                },
              ].map((m) => (
                <div key={m.type} className="border border-purple-700/30 rounded p-2.5 bg-purple-950/10">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-bold text-purple-300 text-xs">{m.type}</p>
                    <span className="text-xs text-muted-foreground">{m.gene} / {m.freq}</span>
                  </div>
                  <ul className="space-y-0.5 mb-1.5">
                    {m.features.map((f, i) => (
                      <li key={i} className="text-xs flex gap-1.5">
                        <span className="text-purple-400 flex-shrink-0">•</span><span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <p className={`text-xs font-semibold ${m.txColor}`}>▶ {m.tx}</p>
                </div>
              ))}
            </div>

            {/* 疑うべきポイント */}
            <div className="mt-3 bg-yellow-950/20 border border-yellow-700/40 rounded p-2.5">
              <p className="text-xs font-semibold text-yellow-400 mb-1.5">MODY を疑うポイント</p>
              <ul className="space-y-0.5 text-xs">
                <li className="flex gap-1.5"><span className="text-yellow-400">!</span>3世代連続の糖尿病家族歴</li>
                <li className="flex gap-1.5"><span className="text-yellow-400">!</span>25歳未満発症・非肥満・抗体陰性</li>
                <li className="flex gap-1.5"><span className="text-yellow-400">!</span>インスリン不要で長期経過</li>
                <li className="flex gap-1.5"><span className="text-yellow-400">!</span>「若年2型糖尿病」の誤診に注意</li>
              </ul>
              <p className="text-xs text-muted-foreground mt-1.5">→ Cペプチド保持・抗体陰性・若年非肥満 → 遺伝子検査を検討</p>
            </div>
          </Card>

          <Card className="bg-card border-border p-4">
            <h3 className="font-semibold mb-3 text-primary text-sm">その他の糖尿病</h3>
            <div className="space-y-3">
              {[
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
