import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { AlertBox } from '@/components/AlertBox';
import { ChevronDown, ChevronRight } from 'lucide-react';

function Accordion({ title, label, color, defaultOpen = false, children }: {
  title: string;
  label: string;
  color: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-border/50 rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-border/20 transition-colors"
      >
        <div className="flex items-center gap-2">
          <span className={`font-bold text-sm ${color}`}>{label}</span>
          <span className="text-sm text-foreground">{title}</span>
        </div>
        {open ? <ChevronDown className="w-4 h-4 text-muted-foreground" /> : <ChevronRight className="w-4 h-4 text-muted-foreground" />}
      </button>
      {open && <div className="px-4 pb-4 pt-1 space-y-3">{children}</div>}
    </div>
  );
}

export function Section11_Complications() {
  const [eGFR, setEGFR] = useState('');
  const [uAlb, setUAlb] = useState('');

  const calcNephropathyStage = () => {
    const egfr = parseFloat(eGFR);
    const alb = parseFloat(uAlb);
    if (isNaN(alb)) {
      if (!isNaN(egfr) && egfr < 30) return { stage: '第4期', label: '腎不全期', color: 'text-red-400', protein: '0.6、0.8 g/kg' };
      return null;
    }
    if (alb < 30) return { stage: '第1期', label: '腎症前期', color: 'text-green-400', protein: '0.8、1.0 g/kg' };
    if (alb < 300) return { stage: '第2期', label: '早期腎症期', color: 'text-yellow-400', protein: '0.8、1.0 g/kg' };
    if (!isNaN(egfr) && egfr < 30) return { stage: '第4期', label: '腎不全期', color: 'text-red-400', protein: '0.6、0.8 g/kg' };
    return { stage: '第3期', label: '顕性腎症期', color: 'text-orange-400', protein: '0.8 g/kg' };
  };

  const nephropathyResult = calcNephropathyStage();

  return (
    <div className="space-y-6">

      {/* 細血管障害 しめじ */}
      <Card className="bg-card border-border p-4">
        <div className="mb-3">
          <h3 className="font-bold text-primary text-base">細血管障害</h3>
          <p className="text-sm text-yellow-400 font-semibold mt-1">🍄 しめじ（<span className="text-white">し</span>んけい・<span className="text-white">め</span>・<span className="text-white">じ</span>んぞう）</p>
        </div>
        <div className="space-y-2">

          {/* し：神経 */}
          <Accordion title="神経障害" label="し" color="text-blue-400">
            <div className="space-y-3 text-sm">
              <div className="bg-blue-950/20 border border-blue-700/50 rounded p-3">
                <p className="font-semibold text-blue-400 mb-2">1. 診断の前提条件</p>
                <ul className="space-y-1 text-xs">
                  <li>① 糖尿病が存在すること（診断基準を満たす）</li>
                  <li>② 他の末梢神経障害の原因を除外すること</li>
                </ul>
                <div className="mt-2 bg-card/30 rounded p-2">
                  <p className="text-xs text-muted-foreground mb-1">主な鑑別疾患：</p>
                  <div className="grid grid-cols-2 gap-1 text-xs">
                    <span>• アルコール性神経障害</span>
                    <span>• ビタミンB1・B12欠乏</span>
                    <span>• 甲状腺機能低下症</span>
                    <span>• 腎不全（尿毒症性）</span>
                    <span>• 薬剤性</span>
                    <span>• CIDP</span>
                  </div>
                </div>
              </div>
              <div className="bg-yellow-950/20 border border-yellow-700/50 rounded p-3">
                <p className="font-semibold text-yellow-400 mb-2">2. 簡易診断基準（必須条件）</p>
                <p className="text-xs text-muted-foreground mb-2">以下のいずれかを認める：</p>
                <div className="space-y-2">
                  {[
                    { num: '①', title: '両側性の足趾・足底の自覚症状', items: ['しびれ', '異常感覚', '灼熱感', '痛み'] },
                    { num: '②', title: '両側性のアキレス腱反射低下または消失', items: [] },
                    { num: '③', title: '両側性の振動覚低下', items: ['128Hz音叉', '内果で10秒未満'] },
                  ].map((item) => (
                    <div key={item.num} className="bg-card/30 rounded p-2">
                      <p className="font-semibold text-xs">{item.num} {item.title}</p>
                      {item.items.length > 0 && (
                        <ul className="mt-1 space-y-0.5">
                          {item.items.map((i) => (
                            <li key={i} className="text-xs text-muted-foreground ml-3">• {i}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <AlertBox type="success" title="診断成立">
                <p className="text-sm font-semibold">上記①〜③のうち <span className="text-yellow-400">2項目以上</span>を満たす場合</p>
                <p className="text-sm">→ 糖尿病性多発神経障害と診断</p>
              </AlertBox>
            </div>
          </Accordion>

          {/* め：目（網膜症） */}
          <Accordion title="目（網膜症）" label="め" color="text-green-400">
            <div className="space-y-2 text-sm">
              <div className="grid grid-cols-3 gap-1 text-xs font-semibold border-b border-border pb-1 mb-1 text-muted-foreground">
                <span>病期</span>
                <span>所見</span>
                <span>眼科受診間隔</span>
              </div>
              {[
                { stage: '網膜症なし', findings: '異常なし', interval: '12ヶ月毎', color: 'text-green-400', bg: 'bg-green-950/10' },
                { stage: '単純網膜症', findings: '点状出血・硬性白斑・軟性白斑', interval: '6ヶ月毎', color: 'text-yellow-400', bg: 'bg-yellow-950/10' },
                { stage: '前増殖網膜症', findings: '軟性白斑・静脈異常・IRMAあり', interval: '1〜2ヶ月毎', color: 'text-orange-400', bg: 'bg-orange-950/10' },
                { stage: '増殖網膜症', findings: '新生血管・硝子体出血・牽引性網膜剥離', interval: '2週〜1ヶ月毎（緊急）', color: 'text-red-400', bg: 'bg-red-950/10' },
              ].map((row) => (
                <div key={row.stage} className={`grid grid-cols-3 gap-1 text-xs rounded px-2 py-2 ${row.bg}`}>
                  <span className={`font-semibold ${row.color}`}>{row.stage}</span>
                  <span className="text-xs">{row.findings}</span>
                  <span className="font-medium">{row.interval}</span>
                </div>
              ))}
              <AlertBox type="info">
                <p className="text-xs">糖尿病診断時・妊娠時・血糖コントロール急激改善時は眼科受診を推奨。黄斑浮腫は病期に関わらず視力低下の主因。</p>
              </AlertBox>
            </div>
          </Accordion>

          {/* じ：腎臓（腎症） */}
          <Accordion title="腎臓（腎症）" label="じ" color="text-orange-400">
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-muted-foreground block mb-1">eGFR（mL/分/1.73m²）任意</label>
                  <input
                    type="number"
                    value={eGFR}
                    onChange={(e) => setEGFR(e.target.value)}
                    placeholder="例: 65"
                    className="w-full bg-input border border-border rounded px-3 py-2 text-sm text-foreground"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground block mb-1">尿中アルブミン（mg/gCr）任意</label>
                  <input
                    type="number"
                    value={uAlb}
                    onChange={(e) => setUAlb(e.target.value)}
                    placeholder="例: 150"
                    className="w-full bg-input border border-border rounded px-3 py-2 text-sm text-foreground"
                  />
                </div>
              </div>
              {nephropathyResult && (
                <div className="bg-primary/10 border border-primary/30 rounded p-3 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">腎症ステージ</span>
                    <span className={`font-bold text-lg ${nephropathyResult.color}`}>{nephropathyResult.stage}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">病期</span>
                    <span className="font-medium">{nephropathyResult.label}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">推奨蛋白摂取量</span>
                    <span className="font-bold text-yellow-400">{nephropathyResult.protein}</span>
                  </div>
                </div>
              )}
              <div>
                <p className="text-xs text-muted-foreground mb-2 font-semibold">腎症ステージ分類</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-1 pr-2 text-muted-foreground">ステージ</th>
                        <th className="text-center py-1 px-1 text-muted-foreground">尿Alb（mg/gCr）</th>
                        <th className="text-center py-1 px-1 text-muted-foreground">eGFR</th>
                        <th className="text-left py-1 pl-2 text-muted-foreground">病期</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { stage: '第1期', alb: '<30（正常）', egfr: '—', label: '腎症前期', color: 'text-green-400' },
                        { stage: '第2期', alb: '30〜299（微量）', egfr: '—', label: '早期腎症期', color: 'text-yellow-400' },
                        { stage: '第3期', alb: '≥300（顕性）', egfr: '—', label: '顕性腎症期', color: 'text-orange-400' },
                        { stage: '第4期', alb: '顕性', egfr: '<30', label: '腎不全期', color: 'text-red-400' },
                        { stage: '第5期', alb: '顕性〜透析', egfr: '—', label: '透析療法期', color: 'text-red-600' },
                      ].map((row) => (
                        <tr key={row.stage} className="border-b border-border/30">
                          <td className={`py-1.5 pr-2 font-semibold ${row.color}`}>{row.stage}</td>
                          <td className="text-center py-1.5 px-1">{row.alb}</td>
                          <td className="text-center py-1.5 px-1">{row.egfr}</td>
                          <td className="py-1.5 pl-2">{row.label}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </Accordion>

        </div>
      </Card>

      {/* 大血管障害 えのき */}
      <Card className="bg-card border-border p-4">
        <div className="mb-3">
          <h3 className="font-bold text-primary text-base">大血管障害</h3>
          <p className="text-sm text-yellow-400 font-semibold mt-1">🍄 えのき（<span className="text-white">え</span>し・<span className="text-white">の</span>うそっちゅう・<span className="text-white">き</span>ょうしんしょう）</p>
        </div>
        <div className="space-y-2">

          {/* え：壊死（PAD）※デフォルトで開く */}
          <Accordion title="壊死（PAD：末梢動脈疾患）" label="え" color="text-red-400">
            <ul className="space-y-1 text-xs ml-1">
              <li>• ABI &lt;0.9 で診断</li>
              <li>• 間欠性跛行・安静時疼痛・壊疽</li>
              <li>• 足病変の早期発見・フットケアが重要</li>
            </ul>
          </Accordion>

          {/* の：脳出血/脳梗塞 */}
          <Accordion title="脳出血／脳梗塞" label="の" color="text-orange-400">
            <ul className="space-y-1 text-xs ml-1">
              <li>• ラクナ梗塞が多い</li>
              <li>• 血圧管理が重要（目標：&lt;130/80 mmHg）</li>
              <li>• TIAは緊急対応が必要</li>
            </ul>
          </Accordion>

          {/* き：狭心症（CAD） */}
          <Accordion title="狭心症（CAD：冠動脈疾患）" label="き" color="text-yellow-400">
            <ul className="space-y-1 text-xs ml-1">
              <li>• 無症候性心筋虚血が多い</li>
              <li>• ABI測定・心電図・負荷試験</li>
              <li>• LDL-C目標：一次予防 &lt;120 / 二次予防 &lt;100 mg/dL（超高リスク：&lt;70）</li>
            </ul>
          </Accordion>

        </div>
      </Card>

    </div>
  );
}
