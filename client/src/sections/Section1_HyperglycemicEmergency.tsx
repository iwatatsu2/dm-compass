import React, { useState } from 'react';
import { AlertBox } from '@/components/AlertBox';
import { Card } from '@/components/ui/card';

export function Section1_HyperglycemicEmergency() {
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
    if (!isNaN(alb)) {
      correctedAg = ag + 2.5 * (4.0 - alb);
    }
    return { ag, correctedAg, hasAlb: !isNaN(alb) };
  };

  const agResult = calcAG();

  return (
    <div className="space-y-6">

      {/* ===== 治療プロトコル（添付資料準拠） ===== */}
      <Card className="bg-card border-border p-4">
        <h3 className="font-bold mb-4 text-primary text-base text-center">
          ≪ DKA・HHS 初期対応プロトコル ≫
        </h3>

        {/* 血糖値フロー */}
        <div className="mb-4">
          <p className="text-xs font-semibold text-muted-foreground mb-2">■ 血糖値（mg/dL）の推移目標</p>
          <div className="flex items-center gap-2 text-xs flex-wrap">
            <div className="bg-red-950/40 border border-red-700/60 rounded px-3 py-2 text-center min-w-[100px]">
              <p className="font-bold text-red-400">初期</p>
              <p>High（&gt;600）〜400</p>
            </div>
            <span className="text-muted-foreground">→</span>
            <div className="bg-yellow-950/40 border border-yellow-700/60 rounded px-3 py-2 text-center min-w-[120px]">
              <p className="font-bold text-yellow-400">中期目標</p>
              <p>DKA：250〜300</p>
              <p>HHS：300〜350</p>
            </div>
            <span className="text-muted-foreground">→</span>
            <div className="bg-green-950/40 border border-green-700/60 rounded px-3 py-2 text-center min-w-[120px]">
              <p className="font-bold text-green-400">最終目標</p>
              <p>DKA：150〜200</p>
              <p>HHS：250〜300</p>
            </div>
          </div>
        </div>

        {/* 血糖測定間隔 */}
        <div className="mb-4 bg-muted/20 rounded p-3">
          <p className="text-xs font-semibold text-muted-foreground mb-1">■ 血糖測定間隔</p>
          <div className="flex items-center gap-2 text-xs flex-wrap">
            <span className="bg-border/50 rounded px-2 py-1">初期：30分〜1時間毎</span>
            <span className="text-muted-foreground">→</span>
            <span className="bg-border/50 rounded px-2 py-1">中期：30分〜1時間毎</span>
            <span className="text-muted-foreground">→</span>
            <span className="bg-border/50 rounded px-2 py-1">安定後：2〜4時間毎</span>
          </div>
        </div>

        {/* インスリン投与量 */}
        <div className="mb-4">
          <p className="text-xs font-semibold text-yellow-400 mb-2">■ インスリン投与量（BSは避ける！）</p>
          <div className="grid grid-cols-1 gap-3 text-xs">
            <div className="bg-yellow-950/20 border border-yellow-700/50 rounded p-3">
              <p className="font-semibold mb-2">【初期】H-R 50単位 + PSS 49.5mL（シリンジポンプ）</p>
              <ul className="space-y-1">
                <li>• 0.15 U/kg iv（ボーラス）</li>
                <li>• 0.1 U/kg/h div（持続静注）</li>
                <li className="text-muted-foreground">例）50kgの場合：7.5mL フラッシュ → 5mL/hで開始</li>
              </ul>
            </div>
            <div className="bg-yellow-950/20 border border-yellow-700/50 rounded p-3">
              <p className="font-semibold mb-2">【中期】0.05 U/kg/h（2〜3 mL/h）まで流量を減量する</p>
              <div className="bg-yellow-900/30 border border-yellow-600/40 rounded p-2">
                <p className="font-semibold text-yellow-300">1時間あたりの血糖低下量が</p>
                <ul className="mt-1 space-y-0.5">
                  <li>• 50 以上 → インスリン流量を半減</li>
                  <li>• 50 未満 → そのまま継続</li>
                </ul>
              </div>
            </div>
            <div className="bg-blue-950/20 border border-blue-700/50 rounded p-3">
              <p className="font-semibold mb-2">【安定後】血糖値に応じた皮下注スケール</p>
              <div className="grid grid-cols-2 gap-1 text-xs">
                <div className="font-semibold text-muted-foreground">BS（mg/dL）</div>
                <div className="font-semibold text-muted-foreground">インスリン</div>
                <div>〜100</div><div className="text-blue-400">-1.0 mL/h</div>
                <div>101〜150</div><div className="text-blue-400">-0.5 mL/h</div>
                <div>151〜200</div><div className="text-green-400">そのまま</div>
                <div>201〜250</div><div className="text-yellow-400">H-R 2U s.c</div>
                <div>251〜300</div><div className="text-orange-400">H-R 4U s.c</div>
                <div>301〜</div><div className="text-red-400">H-R 6U s.c</div>
              </div>
            </div>
          </div>
        </div>

        {/* Na・輸液選択 */}
        <div className="mb-4">
          <p className="text-xs font-semibold text-cyan-400 mb-2">■ Na と輸液選択</p>
          <div className="grid grid-cols-1 gap-2 text-xs">
            <div className="bg-cyan-950/20 border border-cyan-700/50 rounded p-3">
              <p className="font-semibold mb-1">初期輸液（0.9%PSS）</p>
              <ul className="space-y-0.5">
                <li>• Na Low〜normal：生理食塩水（0.9%PSS）</li>
                <li>• Na High：生食と蒸留水の並列（0.45%PSS）</li>
              </ul>
            </div>
            <div className="bg-cyan-950/20 border border-cyan-700/50 rounded p-3">
              <p className="font-semibold mb-2">中期輸液の選択（0.45%PSS + 5%GLU）</p>
              <div className="flex gap-4 items-center">
                <div className="bg-primary/20 border border-primary/50 rounded p-2 text-center">
                  <p className="font-bold text-primary text-sm">ST3</p>
                  <p className="text-muted-foreground">K &lt; 5.0</p>
                </div>
                <span className="text-muted-foreground">or</span>
                <div className="bg-blue-900/30 border border-blue-600/50 rounded p-2 text-center">
                  <p className="font-bold text-blue-400 text-sm">ST1</p>
                  <p className="text-muted-foreground">K &gt; 5.0</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* K補正 */}
        <div className="mb-4">
          <p className="text-xs font-semibold text-green-400 mb-2">■ K（カリウム）補正</p>
          <div className="bg-green-950/20 border border-green-700/50 rounded p-3 text-xs">
            <div className="grid grid-cols-2 gap-2">
              <span className="font-semibold">K &lt; 3.3</span>
              <span>40 mEq/h で混注（インスリン開始前に補正）</span>
              <span className="font-semibold">K 3.3〜5.0</span>
              <span>20〜30 mEq/L で混注</span>
              <span className="font-semibold">K &gt; 5.0</span>
              <span>2時間毎に check</span>
            </div>
          </div>
        </div>

        {/* HCO3補正 */}
        <div className="mb-4">
          <p className="text-xs font-semibold text-purple-400 mb-2">■ HCO₃ 補正（7%メイロン）</p>
          <div className="bg-purple-950/20 border border-purple-700/50 rounded p-3 text-xs">
            <div className="grid grid-cols-2 gap-2">
              <span className="font-semibold">pH &lt; 6.9</span>
              <span>100 mEq（120mL / 30分）</span>
              <span className="font-semibold">pH 6.9〜7.0</span>
              <span>50 mEq（60mL / 15分）</span>
              <span className="font-semibold">pH &gt; 7.0</span>
              <span>no HCO₃（7%メイロン不要）</span>
            </div>
          </div>
        </div>

        {/* 輸液量 */}
        <div className="mb-4">
          <p className="text-xs font-semibold text-orange-400 mb-2">■ 輸液量</p>
          <div className="bg-orange-950/20 border border-orange-700/50 rounded p-3 text-xs space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <div className="text-center">
                <p className="font-semibold">BP normal</p>
                <p>500 mL/h（200〜700 mL/h）</p>
              </div>
              <span className="text-muted-foreground">→</span>
              <p>200 mL/h（150〜250 mL/h）</p>
              <span className="text-muted-foreground">→</span>
              <p>1500〜2500 mL/day（n.p.o）</p>
            </div>
            <p><span className="font-semibold">BP 低下時：</span>1000 mL/h</p>
          </div>
        </div>

        {/* BS<70 低血糖対応 */}
        <div>
          <p className="text-xs font-semibold text-red-400 mb-2">■ BS &lt; 70 の時（低血糖対応）</p>
          <div className="bg-red-950/20 border border-red-700/50 rounded p-3 text-xs space-y-1">
            <p>• 50%Glu 20mL iv</p>
            <p>• 30分後 再検</p>
            <p>• BS &gt; 100 まで繰り返す</p>
            <p className="text-yellow-300">• ただし再検時はインスリン変更しない</p>
          </div>
        </div>
      </Card>

      {/* DKA診断基準 */}
      <AlertBox type="danger" title="DKA（糖尿病ケトアシドーシス）診断基準">
        <div className="space-y-2 text-sm">
          <div className="grid grid-cols-3 gap-2 font-semibold border-b border-red-700 pb-1 mb-1">
            <span>項目</span>
            <span>軽症</span>
            <span>中等症/重症</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <span>血糖</span>
            <span>&gt;250 mg/dL</span>
            <span>&gt;250 mg/dL</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <span>動脈血pH</span>
            <span>7.25〜7.30</span>
            <span>&lt;7.25 / &lt;7.00</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <span>HCO₃⁻</span>
            <span>15〜18 mEq/L</span>
            <span>&lt;15 / &lt;10 mEq/L</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <span>ケトン体</span>
            <span>陽性</span>
            <span>陽性</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <span>AG</span>
            <span>&gt;10 mEq/L</span>
            <span>&gt;12 mEq/L</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <span>意識</span>
            <span>清明</span>
            <span>傾眠〜昏睡</span>
          </div>
        </div>
      </AlertBox>

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

      {/* DKA治療プロトコル */}
      <Card className="bg-card border-border p-4">
        <h3 className="font-semibold mb-3 text-primary text-base">DKA 治療プロトコル</h3>
        <div className="space-y-3 text-sm">
          <div>
            <p className="font-semibold text-yellow-400 mb-1">① 輸液（最優先）</p>
            <ul className="space-y-1 ml-3">
              <li>• 生食 1〜1.5L/時 × 1〜2時間（初期急速補液）</li>
              <li>• 以降：0.9%生食 250〜500 mL/時</li>
              <li>• 血糖 200 mg/dL 以下になったら5%ブドウ糖液に切替</li>
              <li>• Na補正：Na高値なら0.45%生食</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-yellow-400 mb-1">② インスリン投与</p>
            <ul className="space-y-1 ml-3">
              <li>• K≥3.5 mEq/L を確認してから開始</li>
              <li>• 速効型（ヒューマリンR）0.1単位/kg/時 持続静注</li>
              <li>• 血糖低下目標：50〜75 mg/dL/時</li>
              <li>• 血糖 200 mg/dL 以下：0.05単位/kg/時に減量</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-yellow-400 mb-1">③ カリウム補正</p>
            <ul className="space-y-1 ml-3">
              <li>• K &lt;3.5：20〜40 mEq/時 補充後にインスリン開始</li>
              <li>• K 3.5〜5.5：20〜30 mEq/L を輸液に混注</li>
              <li>• K &gt;5.5：補充不要、1〜2時間毎に再測定</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-yellow-400 mb-1">④ DKA離脱基準</p>
            <ul className="space-y-1 ml-3">
              <li>• 血糖 &lt;200 mg/dL</li>
              <li>• HCO₃⁻ ≥15 mEq/L</li>
              <li>• pH ≥7.30</li>
              <li>• AG ≤12 mEq/L</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* HHS治療プロトコル */}
      <Card className="bg-card border-border p-4">
        <h3 className="font-semibold mb-3 text-primary text-base">HHS 治療プロトコル</h3>
        <div className="space-y-3 text-sm">
          <div>
            <p className="font-semibold text-yellow-400 mb-1">① 輸液（最重要）</p>
            <ul className="space-y-1 ml-3">
              <li>• 0.9%生食 1L/時 × 1〜2時間</li>
              <li>• 以降：0.45%生食 250〜500 mL/時</li>
              <li>• 血糖 300 mg/dL 以下：5%ブドウ糖液に切替</li>
              <li>• 24時間で4〜6L 補液目標</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-yellow-400 mb-1">② インスリン</p>
            <ul className="space-y-1 ml-3">
              <li>• 輸液のみで血糖が下がらない場合に使用</li>
              <li>• 0.05〜0.1単位/kg/時（DKAより少量）</li>
              <li>• 急速な血糖低下は脳浮腫・橋中心髄鞘崩壊のリスク</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* AG計算ツール */}
      <Card className="bg-card border-border p-4">
        <h3 className="font-semibold mb-3 text-primary text-base">AG（アニオンギャップ）計算</h3>
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
  );
}
