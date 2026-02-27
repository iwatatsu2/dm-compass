import React from 'react';
import { Card } from '@/components/ui/card';
import { AlertBox } from '@/components/AlertBox';

const drugWithdrawal = [
  { drug: 'メトホルミン', class: 'ビグアナイド', withdrawal: '前日〜当日朝から休薬', reason: '乳酸アシドーシスリスク（造影剤・術後腎機能低下）', restart: '食事・水分摂取再開後、腎機能確認後' },
  { drug: 'SGLT2阻害薬', class: 'SGLT2阻害薬', withdrawal: '手術3日前から必ず休薬', reason: 'euDKAリスク（血糖正常でもケトアシドーシス）', restart: '食事再開後3日以上経過してから', urgent: true },
  { drug: 'SU薬', class: 'SU薬', withdrawal: '当日朝から休薬', reason: '術中低血糖リスク', restart: '食事再開後' },
  { drug: 'グリニド薬', class: 'グリニド', withdrawal: '当日から休薬', reason: '術中低血糖リスク', restart: '食事再開後' },
  { drug: 'DPP-4阻害薬', class: 'DPP-4阻害薬', withdrawal: '当日朝から休薬', reason: '食事摂取不可時は不要', restart: '食事再開後' },
  { drug: 'GLP-1受容体作動薬（注射）', class: 'GLP-1', withdrawal: '前日から休薬', reason: '消化管運動抑制・誤嚥リスク', restart: '食事再開後' },
  { drug: 'セマグルチド（経口）', class: 'GLP-1（経口）', withdrawal: '前日から休薬', reason: '消化管運動抑制・誤嚥リスク', restart: '食事再開後' },
  { drug: 'α-GI', class: 'α-GI', withdrawal: '当日から休薬', reason: '食事摂取不可時は不要', restart: '食事再開後' },
  { drug: 'チアゾリジン', class: 'チアゾリジン', withdrawal: '当日朝から休薬', reason: '浮腫・心不全リスク', restart: '食事再開後' },
  { drug: 'インスリン（基礎）', class: 'インスリン', withdrawal: '通常通り投与', reason: '基礎インスリンは継続が原則', restart: '継続' },
];

export function Section9_Perioperative() {
  return (
    <div className="space-y-6">
      <AlertBox type="danger" title="周術期血糖管理目標">
        <div className="space-y-1 text-sm">
          <p className="font-semibold">目標血糖：140〜180 mg/dL</p>
          <p>ICU・心臓手術：140〜180 mg/dL（厳格管理は低血糖リスクあり）</p>
          <p>一般手術：140〜200 mg/dL</p>
          <p>血糖 &lt;140 mg/dL：低血糖リスクに注意</p>
          <p>血糖 &gt;250 mg/dL：インスリン投与を検討</p>
        </div>
      </AlertBox>

      {/* 内服薬の休薬一覧 */}
      <Card className="bg-card border-border p-4">
        <h3 className="font-semibold mb-3 text-primary text-base">内服薬の休薬・再開スケジュール</h3>
        <div className="space-y-2">
          {drugWithdrawal.map((d) => (
            <div
              key={d.drug}
              className={`border rounded p-3 text-xs ${
                d.urgent ? 'border-red-700 bg-red-950/20' : 'border-border/50 bg-card/30'
              }`}
            >
              <div className="flex justify-between items-start mb-1">
                <span className={`font-semibold text-sm ${d.urgent ? 'text-red-400' : 'text-foreground'}`}>
                  {d.drug}
                  {d.urgent && ' ⚠️'}
                </span>
                <span className="text-muted-foreground text-xs">{d.class}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-muted-foreground">休薬タイミング</p>
                  <p className={`font-medium ${d.urgent ? 'text-red-400' : 'text-orange-400'}`}>{d.withdrawal}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">再開目安</p>
                  <p className="font-medium text-green-400">{d.restart}</p>
                </div>
              </div>
              <p className="text-muted-foreground mt-1">{d.reason}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* 点滴へのインスリン混注 */}
      <Card className="bg-card border-border p-4">
        <h3 className="font-semibold mb-3 text-primary text-base">術中・術後の点滴インスリン管理</h3>
        <div className="space-y-3 text-sm">
          <div>
            <p className="font-semibold text-yellow-400 mb-2">① 食事摂取不可の場合（維持輸液）</p>
            <ul className="space-y-1 ml-3 text-xs">
              <li>• ソルデム3A 500mL + ヒューマリンR 4〜5単位（5g/単位）</li>
              <li>• または KN3号 500mL + ヒューマリンR 4〜5単位</li>
              <li>• 血糖測定：4〜6時間毎</li>
              <li>• 目標血糖：140〜180 mg/dL</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-yellow-400 mb-2">② 血糖コントロール不良の場合（持続インスリン）</p>
            <ul className="space-y-1 ml-3 text-xs">
              <li>• 速効型インスリン（ヒューマリンR）持続静注</li>
              <li>• 初期速度：0.05〜0.1単位/kg/時</li>
              <li>• 血糖測定：1〜2時間毎</li>
              <li>• 血糖 &lt;100：インスリン中止、5%ブドウ糖液に変更</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-yellow-400 mb-2">③ スライディングスケール（術後）</p>
            <ul className="space-y-1 ml-3 text-xs">
              <li>• 食事再開後に使用</li>
              <li>• 超速効型インスリン（ノボラピッド等）を食前に投与</li>
              <li>• 目標血糖：140〜180 mg/dL</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* 術後インスリン再開 */}
      <Card className="bg-card border-border p-4">
        <h3 className="font-semibold mb-3 text-primary text-base">術後の内服薬再開目安</h3>
        <div className="space-y-2 text-sm">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-green-950/20 border border-green-700/50 rounded p-3">
              <p className="font-semibold text-green-400 text-xs mb-1">早期再開可（食事再開後）</p>
              <ul className="space-y-0.5 text-xs">
                <li>• DPP-4阻害薬</li>
                <li>• α-GI</li>
                <li>• GLP-1受容体作動薬</li>
              </ul>
            </div>
            <div className="bg-yellow-950/20 border border-yellow-700/50 rounded p-3">
              <p className="font-semibold text-yellow-400 text-xs mb-1">腎機能確認後</p>
              <ul className="space-y-0.5 text-xs">
                <li>• メトホルミン</li>
                <li>• SU薬</li>
                <li>• グリニド薬</li>
              </ul>
            </div>
            <div className="bg-red-950/20 border border-red-700/50 rounded p-3 col-span-2">
              <p className="font-semibold text-red-400 text-xs mb-1">SGLT2阻害薬（特別注意）</p>
              <p className="text-xs">食事再開後3日以上経過し、euDKAリスクがないことを確認してから再開</p>
            </div>
          </div>
        </div>
      </Card>

      <AlertBox type="warning">
        <p className="text-sm">術後の血糖管理は感染リスク・創傷治癒に直結します。血糖 &gt;200 mg/dL が続く場合は積極的にインスリン投与を検討してください。</p>
      </AlertBox>
    </div>
  );
}
