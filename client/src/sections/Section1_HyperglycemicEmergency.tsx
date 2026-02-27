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
