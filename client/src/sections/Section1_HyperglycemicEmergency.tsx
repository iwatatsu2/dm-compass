import React, { useState } from 'react';
import { AlertBox } from '@/components/AlertBox';
import { Card } from '@/components/ui/card';
import { ChevronDown, ChevronUp } from 'lucide-react';

// ─────────────────────────────────────────────
// Section1: 高血糖緊急症（DKA）
// 構成：① 行動（実践アルゴリズム）→ ② ロジック（当院プロトコル）→ ③ 理論（基礎整理）
// ─────────────────────────────────────────────

export function Section1_HyperglycemicEmergency() {
  const [protocolOpen, setProtocolOpen] = useState(false);
  const [basicsOpen, setBasicsOpen] = useState(false);
  const [remissionOpen, setRemissionOpen] = useState(false);

  // AG計算
  const [agNa, setAgNa] = useState('');
  const [agCl, setAgCl] = useState('');
  const [agHco3, setAgHco3] = useState('');
  const [agAlb, setAgAlb] = useState('');

  const calcAG = () => {
    const na = parseFloat(agNa);
    const cl = parseFloat(agCl);
    const hco3 = parseFloat(agHco3);
    const alb = parseFloat(agAlb);
    if (isNaN(na) || isNaN(cl) || isNaN(hco3)) return null;
    const ag = na - cl - hco3;
    let correctedAg = ag;
    if (!isNaN(alb)) correctedAg = ag + 2.5 * (4.0 - alb);
    return { ag, correctedAg, hasAlb: !isNaN(alb) };
  };
  const agResult = calcAG();

  return (
    <div className="space-y-4">

      {/* ══════════════════════════════════════════
          ① DKA：まず何をするか（実践アルゴリズム）
         ══════════════════════════════════════════ */}
      <div>
        <h3 className="text-sm font-bold text-primary mb-3 tracking-wide">
          DKA：まず何をするか（実践アルゴリズム）
        </h3>

        <div className="grid grid-cols-2 gap-2">

          {/* 脱水 */}
          <div className="bg-blue-950/40 border border-blue-600/60 rounded-lg p-3">
            <p className="text-xs font-bold text-blue-300 mb-2">① 脱水</p>
            <p className="text-sm font-semibold text-white">生理食塩水</p>
            <p className="text-sm text-blue-200">500〜1000 mL/h</p>
            <div className="mt-2 pt-2 border-t border-blue-700/50">
              <p className="text-xs text-blue-400">Na ≥ 155 の場合</p>
              <p className="text-xs text-blue-200">→ 0.45%（生食+蒸留水）へ変更</p>
            </div>
          </div>

          {/* 高血糖 */}
          <div className="bg-red-950/40 border border-red-600/60 rounded-lg p-3">
            <p className="text-xs font-bold text-red-300 mb-2">② 高血糖</p>
            <p className="text-sm font-semibold text-white">インスリン持続静注</p>
            <p className="text-sm text-red-200">0.1 単位/kg/h</p>
            <div className="mt-2 pt-2 border-t border-red-700/50">
              <p className="text-xs text-red-400">配合</p>
              <p className="text-xs text-red-200">生食49.5mL + HR 50単位</p>
            </div>
          </div>

          {/* 電解質 */}
          <div className="bg-green-950/40 border border-green-600/60 rounded-lg p-3">
            <p className="text-xs font-bold text-green-300 mb-2">③ 電解質</p>
            <p className="text-sm font-semibold text-white">K &lt; 5.0 mEq/L</p>
            <p className="text-sm text-green-200">→ KCl 補充開始</p>
            <div className="mt-2 pt-2 border-t border-green-700/50">
              <p className="text-xs text-green-400">注意</p>
              <p className="text-xs text-green-200">インスリン開始でK低下</p>
            </div>
          </div>

          {/* pH */}
          <div className="bg-yellow-950/40 border border-yellow-600/60 rounded-lg p-3">
            <p className="text-xs font-bold text-yellow-300 mb-2">④ pH</p>
            <p className="text-sm font-semibold text-white">pH ≤ 6.9</p>
            <p className="text-sm text-yellow-200">→ メイロン検討</p>
            <div className="mt-2 pt-2 border-t border-yellow-700/50">
              <p className="text-xs text-yellow-400">基本</p>
              <p className="text-xs text-yellow-200">①②で改善することが多い</p>
            </div>
          </div>

        </div>
      </div>

      {/* ══════════════════════════════════════════
          ② 当院プロトコル（折りたたみ）
         ══════════════════════════════════════════ */}
      <div className="border border-border rounded-lg overflow-hidden">
        <button
          className="w-full flex items-center justify-between px-4 py-3 bg-muted/30 hover:bg-muted/50 transition-colors text-left"
          onClick={() => setProtocolOpen(!protocolOpen)}
        >
          <div>
            <span className="text-sm font-bold text-foreground">当院プロトコル（展開）</span>
            <span className="ml-2 text-xs text-muted-foreground">ローカルプロトコル</span>
          </div>
          {protocolOpen
            ? <ChevronUp className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            : <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
          }
        </button>

        {protocolOpen && (
          <div className="p-4 space-y-4 bg-card">

            {/* DKAの病態分類表 */}
            <div>
              <p className="text-xs font-semibold text-muted-foreground mb-2">■ DKAの病態分類</p>
              <div className="overflow-x-auto">
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="bg-muted/40">
                      <th className="text-left px-2 py-1.5 font-semibold border border-border">項目</th>
                      <th className="text-center px-2 py-1.5 font-semibold border border-border">Mild</th>
                      <th className="text-center px-2 py-1.5 font-semibold border border-border">Moderate</th>
                      <th className="text-center px-2 py-1.5 font-semibold border border-border">Severe</th>
                      <th className="text-center px-2 py-1.5 font-semibold border border-border">HHS</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-2 py-1.5 font-semibold border border-border">血糖</td>
                      <td className="px-2 py-1.5 text-center border border-border">&gt;250</td>
                      <td className="px-2 py-1.5 text-center border border-border">&gt;250</td>
                      <td className="px-2 py-1.5 text-center border border-border">&gt;250</td>
                      <td className="px-2 py-1.5 text-center border border-border">&gt;600</td>
                    </tr>
                    <tr className="bg-muted/20">
                      <td className="px-2 py-1.5 font-semibold border border-border">pH</td>
                      <td className="px-2 py-1.5 text-center border border-border">7.25-7.30</td>
                      <td className="px-2 py-1.5 text-center border border-border">7.00-7.24</td>
                      <td className="px-2 py-1.5 text-center border border-border text-red-400 font-bold">&lt;7.00</td>
                      <td className="px-2 py-1.5 text-center border border-border">&gt;7.3</td>
                    </tr>
                    <tr>
                      <td className="px-2 py-1.5 font-semibold border border-border">HCO₃⁻</td>
                      <td className="px-2 py-1.5 text-center border border-border">15-18</td>
                      <td className="px-2 py-1.5 text-center border border-border">10-15</td>
                      <td className="px-2 py-1.5 text-center border border-border">&lt;10</td>
                      <td className="px-2 py-1.5 text-center border border-border">&gt;18</td>
                    </tr>
                    <tr className="bg-muted/20">
                      <td className="px-2 py-1.5 font-semibold border border-border">AG</td>
                      <td className="px-2 py-1.5 text-center border border-border">&gt;10</td>
                      <td className="px-2 py-1.5 text-center border border-border">&gt;12</td>
                      <td className="px-2 py-1.5 text-center border border-border">&gt;12</td>
                      <td className="px-2 py-1.5 text-center border border-border">正常が多い</td>
                    </tr>
                    <tr>
                      <td className="px-2 py-1.5 font-semibold border border-border">精神症状</td>
                      <td className="px-2 py-1.5 text-center border border-border">Alert</td>
                      <td className="px-2 py-1.5 text-center border border-border">Alert/drowsy</td>
                      <td className="px-2 py-1.5 text-center border border-border">Stupor/coma</td>
                      <td className="px-2 py-1.5 text-center border border-border">Stupor/coma</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* 初期治療①脱水 */}
            <div className="bg-blue-950/20 border border-blue-700/50 rounded-lg p-3">
              <p className="text-xs font-bold text-blue-400 mb-2">■ 初期治療① 脱水</p>
              <p className="text-sm font-bold text-white mb-2">生理食塩水を 500〜1000 mL/h で点滴投与！</p>
              <div className="space-y-1 text-xs text-muted-foreground">
                <p><span className="text-foreground font-semibold">Na ≥ 155 の場合：</span>補正Naを計算 → 0.45%（生食250mL + 5%Glu 250mL）へ変更</p>
                <p><span className="text-foreground font-semibold">尿量確認：</span>尿道カテーテル留置</p>
                <p><span className="text-foreground font-semibold">大量補液の評価：</span>モニター装着・IVC評価・胸部Xp</p>
                <p><span className="text-foreground font-semibold">頻回採血：</span>Aライン確保を検討</p>
              </div>
            </div>

            {/* 補正Na計算式 */}
            <div className="bg-muted/20 border border-border rounded-lg p-3">
              <p className="text-xs font-bold text-cyan-400 mb-2">■ 補正Na計算式</p>
              <p className="text-xs text-muted-foreground mb-2">高血糖 → 血漿浸透圧↑ → 水が細胞内から細胞外へ → 血清Naが希釈されて低下</p>
              <div className="space-y-2">
                <div className="bg-muted/30 rounded p-2 font-mono text-xs text-center">
                  <p className="text-muted-foreground mb-0.5">血糖 &lt; 400 mg/dL</p>
                  <p className="text-foreground font-semibold">補正Na = 測定Na + 1.6 × (測定血糖 − 100) / 100</p>
                </div>
                <div className="bg-muted/30 rounded p-2 font-mono text-xs text-center">
                  <p className="text-muted-foreground mb-0.5">血糖 ≥ 400 mg/dL</p>
                  <p className="text-foreground font-semibold">補正Na = 測定Na + 2.4 × (測定血糖 − 100) / 100</p>
                </div>
              </div>
            </div>

            {/* 初期治療②高血糖 */}
            <div className="bg-red-950/20 border border-red-700/50 rounded-lg p-3">
              <p className="text-xs font-bold text-red-400 mb-2">■ 初期治療② 高血糖</p>
              <p className="text-sm font-bold text-white mb-2">インスリン持続静注！！</p>
              <div className="space-y-1 text-xs">
                <p><span className="text-foreground font-semibold">配合：</span><span className="text-muted-foreground">生食 49.5mL + ヒューマリンR 50単位 → 1単位 = 1mL でシリンジポンプ</span></p>
                <div className="bg-red-900/30 border border-red-600/40 rounded p-2 mt-2 text-center">
                  <p className="text-xs text-red-300 mb-0.5">初期投与量</p>
                  <p className="text-base font-bold text-white">0.1 単位/体重kg/h</p>
                </div>
              </div>
            </div>

            {/* 血糖値フロー */}
            <div>
              <p className="text-xs font-semibold text-muted-foreground mb-2">■ 血糖値の推移目標</p>
              <div className="flex items-center gap-2 text-xs flex-wrap">
                <div className="bg-red-950/40 border border-red-700/60 rounded px-3 py-2 text-center min-w-[90px]">
                  <p className="font-bold text-red-400">初期</p>
                  <p>High〜400</p>
                </div>
                <span className="text-muted-foreground">→</span>
                <div className="bg-yellow-950/40 border border-yellow-700/60 rounded px-3 py-2 text-center min-w-[110px]">
                  <p className="font-bold text-yellow-400">中期目標</p>
                  <p>DKA：250〜300</p>
                  <p>HHS：300〜350</p>
                </div>
                <span className="text-muted-foreground">→</span>
                <div className="bg-green-950/40 border border-green-700/60 rounded px-3 py-2 text-center min-w-[110px]">
                  <p className="font-bold text-green-400">最終目標</p>
                  <p>DKA：150〜200</p>
                  <p>HHS：250〜300</p>
                </div>
              </div>
            </div>



            {/* 初期治療③電解質 */}
            <div className="bg-green-950/20 border border-green-700/50 rounded-lg p-3">
              <p className="text-xs font-bold text-green-400 mb-2">■ 初期治療③ 電解質（K補正）</p>
              <p className="text-sm font-bold text-white mb-2">K &lt; 5.0 mEq/L なら KCl 補充開始！</p>
              <div className="grid grid-cols-2 gap-1 text-xs">
                <span className="font-semibold">K &lt; 3.3</span>
                <span className="text-muted-foreground">40 mEq/h で混注（インスリン開始前に補正）</span>
                <span className="font-semibold">K 3.3〜5.0</span>
                <span className="text-muted-foreground">20〜30 mEq/L で混注</span>
                <span className="font-semibold">K &gt; 5.0</span>
                <span className="text-muted-foreground">2時間毎に check</span>
              </div>
            </div>

            {/* 初期治療④pH */}
            <div className="bg-yellow-950/20 border border-yellow-700/50 rounded-lg p-3">
              <p className="text-xs font-bold text-yellow-400 mb-2">■ 初期治療④ pH（HCO₃補正）</p>
              <p className="text-xs text-muted-foreground mb-2">基本的にはアシドーシスの補正は不要。①②の治療で改善することがほとんど。</p>
              <div className="bg-red-950/30 border border-red-700/50 rounded p-2 mb-2">
                <p className="text-xs font-semibold text-red-300">pH ≤ 6.9 の時はメイロンでの補正を考慮</p>
              </div>
              <div className="grid grid-cols-2 gap-1 text-xs mb-2">
                <span className="font-semibold">pH &lt; 6.9</span>
                <span className="text-muted-foreground">100 mEq（120mL / 30分）</span>
                <span className="font-semibold">pH 6.9〜7.0</span>
                <span className="text-muted-foreground">50 mEq（60mL / 15分）</span>
                <span className="font-semibold">pH &gt; 7.0</span>
                <span className="text-muted-foreground">no HCO₃（不要）</span>
              </div>
              <div className="bg-muted/20 rounded p-2 font-mono text-xs space-y-1">
                <p className="text-muted-foreground">★ 7%：必要量(mL) = 不足塩基量(mEq/L) × 0.25 × 体重(kg)</p>
                <p className="text-muted-foreground">★ 8.4%：必要量(mL) = 不足塩基量(mEq/L) × 0.2 × 体重(kg)</p>
              </div>
              <p className="text-xs text-muted-foreground mt-1">※ 不足塩基量 = Base Excess　→ 低K血症・脳浮腫に注意</p>
            </div>

            {/* 輸液量 */}
            <div className="bg-orange-950/20 border border-orange-700/50 rounded-lg p-3">
              <p className="text-xs font-bold text-orange-400 mb-2">■ 輸液量の目安</p>
              <div className="flex items-center gap-2 flex-wrap text-xs">
                <div className="text-center">
                  <p className="font-semibold">BP 正常</p>
                  <p className="text-muted-foreground">500 mL/h（200〜700）</p>
                </div>
                <span className="text-muted-foreground">→</span>
                <p className="text-muted-foreground">200 mL/h（150〜250）</p>
                <span className="text-muted-foreground">→</span>
                <p className="text-muted-foreground">1500〜2500 mL/day</p>
              </div>
              <p className="text-xs mt-1"><span className="font-semibold">BP 低下時：</span><span className="text-muted-foreground">1000 mL/h</span></p>
            </div>

            {/* 低血糖対応 */}
            <div className="bg-red-950/20 border border-red-700/50 rounded-lg p-3">
              <p className="text-xs font-bold text-red-400 mb-2">■ BS &lt; 70 の時（低血糖対応）</p>
              <div className="space-y-0.5 text-xs text-muted-foreground">
                <p>• 50%Glu 20mL iv</p>
                <p>• 30分後 再検</p>
                <p>• BS &gt; 100 まで繰り返す</p>
                <p className="text-yellow-300">• 再検時はインスリン変更しない</p>
              </div>
            </div>

            {/* 血糖測定間隔 */}
            <div className="bg-muted/20 rounded-lg p-3">
              <p className="text-xs font-semibold text-muted-foreground mb-2">■ 血糖測定間隔</p>
              <div className="flex items-center gap-2 text-xs flex-wrap">
                <span className="bg-border/50 rounded px-2 py-1">初期：30分〜1時間毎</span>
                <span className="text-muted-foreground">→</span>
                <span className="bg-border/50 rounded px-2 py-1">中期：30分〜1時間毎</span>
                <span className="text-muted-foreground">→</span>
                <span className="bg-border/50 rounded px-2 py-1">安定後：2〜4時間毎</span>
              </div>
            </div>

          </div>
        )}
      </div>

      {/* ══════════════════════════════════════════
          ③ 基礎整理（折りたたみ）
         ══════════════════════════════════════════ */}
      <div className="border border-border rounded-lg overflow-hidden">
        <button
          className="w-full flex items-center justify-between px-4 py-3 bg-muted/30 hover:bg-muted/50 transition-colors text-left"
          onClick={() => setBasicsOpen(!basicsOpen)}
        >
          <div>
            <span className="text-sm font-bold text-foreground">基礎整理</span>
            <span className="ml-2 text-xs text-muted-foreground">診断・病態・計算式・成因</span>
          </div>
          {basicsOpen
            ? <ChevronUp className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            : <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
          }
        </button>

        {basicsOpen && (
          <div className="p-4 space-y-4 bg-card">

            {/* DKAとは */}
            <div>
              <p className="text-xs font-semibold text-primary mb-2">■ DKAとは</p>
              <div className="text-xs text-muted-foreground space-y-0.5">
                <p>インスリンの絶対的または相対的欠乏 → インスリン補充が必ず必要</p>
                <p>↓ 細胞にグルコースを取り込めず、細胞内飢餓に</p>
                <p>↓ 脂肪分解促進</p>
                <p>↓ ケトン体が体内に蓄積</p>
                <p>↓ <span className="text-foreground font-semibold">高血糖 + ケトン体陽性 + 代謝性アシドーシス</span></p>
              </div>
            </div>

            {/* DKAの診断 */}
            <AlertBox type="danger" title="DKA 診断基準（3徴）">
              <div className="space-y-1 text-sm">
                <p>• 高血糖：血糖値 ≥ 250 mg/dL</p>
                <p>• 代謝性アシドーシス（pH &lt; 7.30 / HCO₃⁻ &lt; 15）</p>
                <p>• ケトン体陽性（血中β-HB &gt; 3.0 mmol/L）</p>
                <p className="text-xs text-red-300 mt-1">上記が揃えば診断</p>
              </div>
            </AlertBox>

            {/* DKA診断時の注意点 */}
            <AlertBox type="warning" title="DKA診断時の注意点">
              <div className="space-y-1 text-sm">
                <p>• 血糖250以下でもケトン体陽性ならDKAを否定できない。SGLT2阻害薬内服中は正常血糖ケトアシドーシス（euDKA）の可能性。</p>
                <p>• pH正常でもケトン体陽性ならAGを計算。AG開大代謝性アルカローシスであればDKAを否定できない。</p>
              </div>
            </AlertBox>

            {/* ケトン体について */}
            <div>
              <p className="text-xs font-semibold text-primary mb-2">■ ケトン体について</p>
              <div className="space-y-2 text-xs">
                <div>
                  <p className="font-semibold text-foreground">血中ケトン体（β-ヒドロキシ酪酸）</p>
                  <p className="text-muted-foreground">ケトメーターで測定。定量的・リアルタイムで治療効果の判定に有用。</p>
                  <div className="mt-1 space-y-0.5 text-muted-foreground">
                    <p>&lt; 0.6　正常</p>
                    <p>0.6〜1.5　軽度上昇（外来：インスリン混注補液など）</p>
                    <p>1.5〜3.0　中等度（入院：インスリンシリンジポンプなど）</p>
                    <p className="text-yellow-300">&gt; 3.0　DKAを強く疑う</p>
                    <p className="text-red-300">&gt; 5.0　重症域</p>
                  </div>
                </div>
                <div className="pt-2 border-t border-border">
                  <p className="font-semibold text-foreground">尿中ケトン体（アセト酢酸）</p>
                  <p className="text-muted-foreground">半定量で不正確。数時間前の状態を反映。初期DKAや正常血糖DKAでは偽陰性になることも。</p>
                </div>
                <p className="text-muted-foreground">※ ケトン体陽性でもアシドーシスがなければ「ケトーシス」と診断</p>
              </div>
            </div>

            {/* HHS診断基準 */}
            <AlertBox type="warning" title="HHS（高浸透圧高血糖状態）診断基準">
              <div className="space-y-1 text-sm">
                <p>血糖 &gt;600 mg/dL</p>
                <p>有効浸透圧 &gt;320 mOsm/kg（= 2×Na + 血糖/18）</p>
                <p>pH &gt;7.30（アシドーシスなし）</p>
                <p>HCO₃⁻ &gt;18 mEq/L</p>
                <p>ケトン体：陰性〜弱陽性</p>
                <p>意識障害：傾眠〜昏睡</p>
              </div>
            </AlertBox>

            {/* euDKA */}
            <AlertBox type="info" title="euDKA（ユーグリセミックDKA）">
              <div className="space-y-1 text-sm">
                <p className="font-semibold">SGLT2阻害薬使用中に注意</p>
                <p>血糖が比較的低値（200〜250 mg/dL）でもDKAが発生</p>
                <p>β-HB高値（&gt;3.0 mmol/L）が診断の鍵</p>
                <p>原因：SGLT2阻害薬によるグルカゴン↑・インスリン↓</p>
              </div>
            </AlertBox>

            {/* DKAの成因（5i's） */}
            <div>
              <p className="text-xs font-semibold text-primary mb-2">■ DKAの成因（5i's）</p>
              <div className="text-xs text-muted-foreground space-y-1">
                <p>• <span className="text-foreground">Infection</span>（肺炎・尿路感染症など） / Inflammation（熱傷など）</p>
                <p>• <span className="text-foreground">Insulin deficiency</span>（1型糖尿病・アドヒアランス不良）</p>
                <p>• <span className="text-foreground">Iatrogenesis</span>（医原性：ステロイド・SGLT2阻害薬など）</p>
                <p>• <span className="text-foreground">Infarction/Ischemia</span>（心臓・脳の梗塞・虚血）</p>
                <p>• <span className="text-foreground">Intra-abdominal process</span>（膵炎・胆囊炎など）</p>
                <p className="pt-1">その他：Intoxication（アルコール・コカインなど）/ Infant（妊娠）</p>
                <p className="text-yellow-300">※ 妊娠・SGLT2阻害薬・飢餓状態では高血糖を示さないことがある</p>
              </div>
            </div>

            {/* AG計算ツール */}
            <Card className="bg-card border-border p-4">
              <h3 className="font-semibold mb-2 text-primary text-sm">AG（アニオンギャップ）計算</h3>
              <p className="text-xs text-muted-foreground mb-3">AG = Na − Cl − HCO₃⁻　（正常値：8〜12 mEq/L）</p>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="text-xs text-muted-foreground block mb-1">Na（mEq/L）</label>
                  <input
                    type="number"
                    value={agNa}
                    onChange={(e) => setAgNa(e.target.value)}
                    placeholder="例: 140"
                    className="w-full bg-input border border-border rounded px-3 py-2 text-sm text-foreground"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground block mb-1">Cl（mEq/L）</label>
                  <input
                    type="number"
                    value={agCl}
                    onChange={(e) => setAgCl(e.target.value)}
                    placeholder="例: 100"
                    className="w-full bg-input border border-border rounded px-3 py-2 text-sm text-foreground"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground block mb-1">HCO₃⁻（mEq/L）</label>
                  <input
                    type="number"
                    value={agHco3}
                    onChange={(e) => setAgHco3(e.target.value)}
                    placeholder="例: 24"
                    className="w-full bg-input border border-border rounded px-3 py-2 text-sm text-foreground"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground block mb-1">Alb（g/dL）任意</label>
                  <input
                    type="number"
                    step="0.1"
                    value={agAlb}
                    onChange={(e) => setAgAlb(e.target.value)}
                    placeholder="例: 4.0"
                    className="w-full bg-input border border-border rounded px-3 py-2 text-sm text-foreground"
                  />
                </div>
              </div>
              {agResult && (
                <div className="bg-primary/10 border border-primary/30 rounded p-3 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">AG</span>
                    <span className={`font-bold text-lg ${agResult.ag > 12 ? 'text-red-400' : 'text-green-400'}`}>
                      {agResult.ag.toFixed(1)} mEq/L
                      {agResult.ag > 12 ? ' ▲高値' : ' 正常'}
                    </span>
                  </div>
                  {agResult.hasAlb && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm">補正AG（Alb補正）</span>
                      <span className={`font-bold text-lg ${agResult.correctedAg > 12 ? 'text-red-400' : 'text-green-400'}`}>
                        {agResult.correctedAg.toFixed(1)} mEq/L
                        {agResult.correctedAg > 12 ? ' ▲高値' : ' 正常'}
                      </span>
                    </div>
                  )}
                  <p className="text-xs text-muted-foreground">補正AG = AG + 2.5 × (4.0 − Alb)</p>
                </div>
              )}
            </Card>

          </div>
        )}
      </div>

      {/* ══════════════════════════════════════════
          ④ DKA寛解基準（折りたたみ）
         ══════════════════════════════════════════ */}
      <div className="border border-border rounded-lg overflow-hidden">
        <button
          className="w-full flex items-center justify-between px-4 py-3 bg-muted/30 hover:bg-muted/50 transition-colors text-left"
          onClick={() => setRemissionOpen(!remissionOpen)}
        >
          <div>
            <span className="text-sm font-bold text-foreground">DKA寛解基準</span>
            <span className="ml-2 text-xs text-muted-foreground">治療終了の判定</span>
          </div>
          {remissionOpen
            ? <ChevronUp className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            : <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
          }
        </button>

        {remissionOpen && (
          <div className="p-4 bg-card">
            <AlertBox type="success" title="寛解基準（以下をすべて満たす）">
              <div className="space-y-1 text-sm">
                <p>• 血糖 &lt; 250 mg/dL</p>
                <p>• pH ≥ 7.30</p>
                <p>• HCO₃⁻ ≥ 15 mEq/L</p>
                <p>• 血中ケトン体 &lt; 1.0 mmol/L</p>
                <p>• 患者が経口摂取可能</p>
              </div>
            </AlertBox>
          </div>
        )}
      </div>

    </div>
  );
}
