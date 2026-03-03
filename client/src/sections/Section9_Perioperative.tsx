import React from 'react';
import { Card } from '@/components/ui/card';
import { AlertBox } from '@/components/AlertBox';

export function Section9_Perioperative() {
  return (
    <div className="space-y-4">
      <AlertBox type="danger" title="周術期血糖管理目標">
        <div className="space-y-1 text-sm">
          <p className="font-semibold">目標血糖：140〜180 mg/dL</p>
          <p>ICU・心臓手術：140〜180 mg/dL（厳格管理は低血糖リスクあり）</p>
          <p>一般手術：140〜200 mg/dL</p>
          <p>血糖 &lt;140 mg/dL：低血糖リスクに注意</p>
          <p>血糖 &gt;250 mg/dL：インスリン投与を検討</p>
        </div>
      </AlertBox>

      {/* ===== 内服薬の扱い ===== */}
      <Card className="bg-card border-border p-4">
        <h3 className="font-semibold mb-3 text-primary text-base">内服薬の扱い（全身麻酔・手術が決まった場合）</h3>

        {/* SGLT2阻害薬 */}
        <div className="border-2 border-red-600 rounded-lg p-3 mb-3 bg-red-950/20">
          <p className="font-bold text-red-400 text-sm mb-1">⚠️ SGLT2阻害薬</p>
          <p className="text-xs text-white font-semibold mb-1">術前 <span className="text-red-400">3日前</span> から必ず休薬</p>
          <p className="text-xs text-gray-300">理由：euDKA（血糖正常でもケトアシドーシス）リスク。添付文書にも明記。</p>
          <p className="text-xs text-gray-300 mt-1">再開：十分な経口摂取が安定し、脱水・ケトーシスのリスクが低いことを確認してから</p>
        </div>

        {/* 入院時より中止 */}
        <div className="border border-orange-600 rounded-lg p-3 mb-3 bg-orange-950/20">
          <p className="font-bold text-orange-400 text-sm mb-2">入院時より全て中止 → インスリンへ置き換え</p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-gray-200 mb-2">
            <p>• メトホルミン（ビグアナイド）</p>
            <p>• SU薬</p>
            <p>• グリニド薬</p>
            <p>• ピオグリタゾン（チアゾリジン）</p>
            <p>• GLP-1受容体作動薬（注射・経口）</p>
            <p>• α-グルコシダーゼ阻害薬（αGI）</p>
          </div>
          <p className="text-xs text-gray-300 leading-relaxed">
            全身麻酔では欠食期間が長くなるため、上記は入院時より全て中止し、<br />
            インスリンへ置き換えて血糖管理を行うのが一般的。
          </p>
        </div>

        {/* DPP-4阻害薬 */}
        <div className="border border-green-600 rounded-lg p-3 bg-green-950/20">
          <p className="font-bold text-green-400 text-sm mb-1">DPP-4阻害薬</p>
          <p className="text-xs text-gray-200">特に制限不要。</p>
          <p className="text-xs text-gray-300 mt-1">入院と同時に中止しても、直前まで内服継続してもいずれも可。</p>
        </div>
      </Card>

      {/* ===== 術中・術後の点滴インスリン管理 ===== */}
      <Card className="bg-card border-border p-4">
        <h3 className="font-semibold mb-3 text-primary text-base">術中・術後の点滴インスリン管理</h3>
        <div className="space-y-3 text-sm">
          <div>
            <p className="font-semibold text-yellow-400 mb-2">① 食事摂取不可の場合（維持輸液）</p>
            <ul className="space-y-1 ml-3 text-xs text-gray-300">
              <li>• ソルデム3A 500mL + ヒューマリンR 4〜5単位（5g/単位）</li>
              <li>• または KN3号 500mL + ヒューマリンR 4〜5単位</li>
              <li>• 血糖測定：4〜6時間毎</li>
              <li>• 目標血糖：140〜180 mg/dL</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-yellow-400 mb-2">② 血糖コントロール不良の場合（持続インスリン）</p>
            <ul className="space-y-1 ml-3 text-xs text-gray-300">
              <li>• 速効型インスリン（ヒューマリンR）持続静注</li>
              <li>• 初期速度：0.05〜0.1単位/kg/時</li>
              <li>• 血糖測定：1〜2時間毎</li>
              <li>• 血糖 &lt;100：インスリン中止、5%ブドウ糖液に変更</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-yellow-400 mb-2">③ スライディングスケール（術後・食事再開後）</p>
            <ul className="space-y-1 ml-3 text-xs text-gray-300">
              <li>• 超速効型インスリン（ノボラピッド等）を食前に投与</li>
              <li>• 目標血糖：140〜180 mg/dL</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* ===== 術後の内服薬再開 ===== */}
      <Card className="bg-card border-border p-4">
        <h3 className="font-semibold mb-3 text-primary text-base">術後の内服薬再開目安</h3>
        <div className="space-y-2 text-xs">
          <div className="bg-green-950/20 border border-green-700/50 rounded p-3">
            <p className="font-semibold text-green-400 mb-1">食事再開後に再開可</p>
            <p className="text-gray-300">DPP-4阻害薬、αGI、GLP-1受容体作動薬、グリニド薬、SU薬</p>
          </div>
          <div className="bg-yellow-950/20 border border-yellow-700/50 rounded p-3">
            <p className="font-semibold text-yellow-400 mb-1">腎機能・全身状態確認後に再開</p>
            <p className="text-gray-300">メトホルミン（術後腎機能が安定していることを確認）、ピオグリタゾン（浮腫・心不全に注意）</p>
          </div>
          <div className="bg-red-950/20 border border-red-700/50 rounded p-3">
            <p className="font-semibold text-red-400 mb-1">SGLT2阻害薬（特別注意）</p>
            <p className="text-gray-300">十分な経口摂取が安定し、脱水やケトーシスのリスクが低いことを確認してから再開する</p>
          </div>
        </div>
      </Card>

      <AlertBox type="warning">
        <p className="text-sm">術後の血糖管理は感染リスク・創傷治癒に直結します。血糖 &gt;200 mg/dL が続く場合は積極的にインスリン投与を検討してください。</p>
      </AlertBox>
    </div>
  );
}
