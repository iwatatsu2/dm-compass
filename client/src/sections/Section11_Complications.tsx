import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { AlertBox } from '@/components/AlertBox';

export function Section11_Complications() {
  const [eGFR, setEGFR] = useState('');
  const [uAlb, setUAlb] = useState('');

  const calcNephropathyStage = () => {
    const egfr = parseFloat(eGFR);
    const alb = parseFloat(uAlb);
    if (isNaN(egfr)) return null;

    if (egfr >= 90) {
      if (isNaN(alb) || alb < 30) return { stage: '第1期', label: '腎症前期', color: 'text-green-400', protein: '0.8〜1.0 g/kg' };
      if (alb < 300) return { stage: '第2期', label: '早期腎症期', color: 'text-yellow-400', protein: '0.8〜1.0 g/kg' };
    }
    if (egfr >= 60) {
      if (isNaN(alb) || alb < 30) return { stage: '第2期', label: '早期腎症期', color: 'text-yellow-400', protein: '0.8〜1.0 g/kg' };
      if (alb < 300) return { stage: '第2期', label: '早期腎症期', color: 'text-yellow-400', protein: '0.8〜1.0 g/kg' };
      return { stage: '第3期', label: '顕性腎症期', color: 'text-orange-400', protein: '0.8 g/kg' };
    }
    if (egfr >= 30) return { stage: '第3〜4期', label: '顕性腎症期〜腎不全期', color: 'text-orange-400', protein: '0.6〜0.8 g/kg' };
    if (egfr >= 15) return { stage: '第4期', label: '腎不全期', color: 'text-red-400', protein: '0.6〜0.8 g/kg' };
    return { stage: '第5期', label: '透析療法期', color: 'text-red-600', protein: '0.6 g/kg' };
  };

  const nephropathyResult = calcNephropathyStage();

  return (
    <div className="space-y-6">
      {/* 網膜症 */}
      <Card className="bg-card border-border p-4">
        <h3 className="font-semibold mb-3 text-primary text-base">糖尿病網膜症 フォローアップ</h3>
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
        </div>
        <AlertBox type="info" className="mt-3">
          <p className="text-xs">糖尿病診断時・妊娠時・血糖コントロール急激改善時は眼科受診を推奨。黄斑浮腫は病期に関わらず視力低下の主因。</p>
        </AlertBox>
      </Card>

      {/* 腎症ステージ判定ツール */}
      <Card className="bg-card border-border p-4">
        <h3 className="font-semibold mb-3 text-primary text-base">糖尿病性腎症 ステージ判定</h3>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <label className="text-xs text-muted-foreground block mb-1">eGFR（mL/分/1.73m²）</label>
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

        {/* ステージ一覧表 */}
        <div className="mt-4">
          <p className="text-xs text-muted-foreground mb-2 font-semibold">腎症ステージ分類（尿中Alb × eGFR）</p>
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
                  { stage: '第1期', alb: '<30（正常）', egfr: '≥90', label: '腎症前期', color: 'text-green-400' },
                  { stage: '第2期', alb: '30〜299（微量）', egfr: '≥60', label: '早期腎症期', color: 'text-yellow-400' },
                  { stage: '第3期', alb: '≥300（顕性）', egfr: '30〜59', label: '顕性腎症期', color: 'text-orange-400' },
                  { stage: '第4期', alb: '顕性', egfr: '15〜29', label: '腎不全期', color: 'text-red-400' },
                  { stage: '第5期', alb: '顕性〜透析', egfr: '<15', label: '透析療法期', color: 'text-red-600' },
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
      </Card>

      {/* 神経障害診断基準 */}
      <Card className="bg-card border-border p-4">
        <h3 className="font-semibold mb-3 text-primary text-base">
          糖尿病性神経障害 簡易診断基準（2011年改訂）
        </h3>
        <div className="space-y-4 text-sm">
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
                {
                  num: '①',
                  title: '両側性の足趾・足底の自覚症状',
                  items: ['しびれ', '異常感覚', '灼熱感', '痛み'],
                },
                {
                  num: '②',
                  title: '両側性のアキレス腱反射低下または消失',
                  items: [],
                },
                {
                  num: '③',
                  title: '両側性の振動覚低下',
                  items: ['128Hz音叉', '内果で10秒未満'],
                },
              ].map((item) => (
                <div key={item.num} className="bg-card/30 rounded p-2">
                  <p className="font-semibold text-xs">
                    {item.num} {item.title}
                  </p>
                  {item.items.length > 0 && (
                    <ul className="mt-1 space-y-0.5">
                      {item.items.map((i) => (
                        <li key={i} className="text-xs text-muted-foreground ml-3">
                          • {i}
                        </li>
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
      </Card>

      {/* 大血管障害 */}
      <Card className="bg-card border-border p-4">
        <h3 className="font-semibold mb-3 text-primary text-base">大血管障害</h3>
        <div className="space-y-3 text-sm">
          {[
            {
              name: '冠動脈疾患（CAD）',
              color: 'text-red-400',
              points: ['無症候性心筋虚血が多い', 'ABI測定・心電図・負荷試験', 'LDL-C目標：<100 mg/dL（高リスク：<70）'],
            },
            {
              name: '脳血管障害',
              color: 'text-orange-400',
              points: ['ラクナ梗塞が多い', '血圧管理が重要（目標：<130/80 mmHg）', 'TIAは緊急対応が必要'],
            },
            {
              name: '末梢動脈疾患（PAD）',
              color: 'text-yellow-400',
              points: ['ABI <0.9 で診断', '間欠性跛行・安静時疼痛・壊疽', '足病変の早期発見・フットケアが重要'],
            },
          ].map((item) => (
            <div key={item.name} className="border-b border-border/30 pb-3">
              <p className={`font-semibold ${item.color} mb-1`}>{item.name}</p>
              <ul className="space-y-0.5 ml-3">
                {item.points.map((p, i) => (
                  <li key={i} className="text-xs">• {p}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
