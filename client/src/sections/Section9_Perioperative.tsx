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
          <p className="mt-2 text-xs text-gray-400">
            参考：NICE-SUGAR Trial (NEJM 2009; 360:1283-97) / ADA Standards of Care 2024
          </p>
        </div>
      </AlertBox>

      {/* ===== 休薬カウントダウン・タイムライン（当院プロトコール） ===== */}
      <Card className="bg-card border-border p-4">
        <h3 className="font-semibold mb-1 text-primary text-base">休薬カウントダウン・タイムライン</h3>
        <p className="text-xs text-gray-400 mb-4">当院ルール準拠／術前 何日前に止めるかを一目で確認</p>

        <div className="relative pl-5">
          {/* 縦のタイムライン軸 */}
          <div className="absolute left-1.5 top-1 bottom-1 w-px bg-gray-700" />

          {/* Day −7 */}
          <div className="relative mb-4">
            <div className="absolute -left-[15px] top-1 w-3 h-3 rounded-full bg-red-500 ring-2 ring-red-500/30" />
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-red-400 font-bold text-sm">術前 1週間前</span>
              <span className="text-[10px] text-gray-500 font-mono">Day −7</span>
            </div>
            <div className="border border-red-700/50 rounded-lg p-2.5 bg-red-950/20">
              <p className="text-xs font-semibold text-gray-100">GLP-1受容体作動薬（注射・週1製剤含む）</p>
              <p className="text-[11px] text-gray-400 mt-0.5">胃排出遅延による誤嚥リスク回避のため休薬</p>
            </div>
          </div>

          {/* Day −3 */}
          <div className="relative mb-4">
            <div className="absolute -left-[15px] top-1 w-3 h-3 rounded-full bg-orange-500 ring-2 ring-orange-500/30" />
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-orange-400 font-bold text-sm">術前 3日前</span>
              <span className="text-[10px] text-gray-500 font-mono">Day −3</span>
            </div>
            <div className="border border-orange-700/50 rounded-lg p-2.5 bg-orange-950/20 space-y-1.5">
              <div>
                <p className="text-xs font-semibold text-gray-100">SGLT2阻害薬</p>
                <p className="text-[11px] text-gray-400 mt-0.5">正常血糖ケトアシドーシス・脱水の回避</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-100">リベルサス（経口セマグルチド）</p>
                <p className="text-[11px] text-gray-400 mt-0.5">誤嚥リスク（経口は3日前）</p>
              </div>
            </div>
          </div>

          {/* Admission */}
          <div className="relative mb-4">
            <div className="absolute -left-[15px] top-1 w-3 h-3 rounded-full bg-yellow-500 ring-2 ring-yellow-500/30" />
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-yellow-400 font-bold text-sm">入院時 中止</span>
              <span className="text-[10px] text-gray-500 font-mono">Admission</span>
            </div>
            <div className="border border-yellow-700/50 rounded-lg p-2.5 bg-yellow-950/20">
              <div className="grid grid-cols-1 gap-1 text-[11px] text-gray-200">
                <p>・SU薬・グリニド薬 <span className="text-gray-500">（低血糖）</span></p>
                <p>・ピオグリタゾン <span className="text-gray-500">（浮腫）</span></p>
                <p>・α-GI <span className="text-gray-500">（絶食時は不要）</span></p>
                <p>・メトホルミン <span className="text-gray-500">（乳酸アシドーシス回避）</span></p>
              </div>
            </div>
          </div>

          {/* Day 0 */}
          <div className="relative">
            <div className="absolute -left-[15px] top-1 w-3 h-3 rounded-full bg-green-500 ring-2 ring-green-500/30" />
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-green-400 font-bold text-sm">当日朝・手術</span>
              <span className="text-[10px] text-gray-500 font-mono">Day 0（執刀）</span>
            </div>
            <div className="border border-green-700/50 rounded-lg p-2.5 bg-green-950/20">
              <p className="text-xs font-semibold text-gray-100">DPP-4阻害薬</p>
              <p className="text-[11px] text-gray-400 mt-0.5">原則継続可だが当日朝は休薬</p>
            </div>
          </div>
        </div>

        {/* 術後再開の目安 */}
        <div className="mt-4 pt-3 border-t border-gray-700">
          <p className="text-xs font-semibold text-green-400 mb-1.5">✓ 術後再開の目安（Resumption Rules）</p>
          <ul className="text-[11px] text-gray-300 space-y-1">
            <li>・SGLT2 / GLP-1：十分な経口摂取と全身状態の安定後に再開</li>
            <li className="text-yellow-300">・α-GI：腹部オペ後はイレウスリスクのため再開しない</li>
          </ul>
        </div>
      </Card>

      {/* ===== 内服薬の扱い ===== */}
      <Card className="bg-card border-border p-4">
        <h3 className="font-semibold mb-3 text-primary text-base">内服薬の扱い（全身麻酔・手術が決まった場合）</h3>

        {/* ① SGLT2阻害薬 */}
        <div className="border-2 border-red-600 rounded-lg p-3 mb-3 bg-red-950/20">
          <p className="font-bold text-red-400 text-sm mb-2">⚠️ SGLT2阻害薬</p>
          <ul className="text-xs text-gray-200 space-y-1 mb-2">
            <li>・原則：術前 <span className="text-red-400 font-bold">3日前</span> から休薬</li>
            <li>・入院時より原則中止し、インスリンへ切り替え</li>
          </ul>
          <p className="text-xs text-gray-400 font-semibold mb-1">理由：</p>
          <ul className="text-xs text-gray-400 space-y-0.5 mb-2 ml-2">
            <li>・euglycemic DKA リスク</li>
            <li>・周術期の脱水</li>
            <li>・絶食によるケトーシス増悪</li>
          </ul>
          <div className="bg-yellow-950/30 border border-yellow-700/50 rounded p-2 mb-2">
            <p className="text-xs text-yellow-300 font-semibold">※ ただし</p>
            <p className="text-xs text-gray-300">心不全・腎保護目的で投与中の場合は、循環器科／主治医と個別判断</p>
          </div>
          <p className="text-xs text-gray-400 font-semibold mb-1">再開：</p>
          <ul className="text-xs text-gray-400 space-y-0.5 ml-2">
            <li>・十分な経口摂取</li>
            <li>・脱水なし</li>
            <li>・ケトン体陰性を確認後</li>
          </ul>
        </div>

        {/* ② 原則入院時より中止 → インスリン置き換え */}
        <div className="border border-orange-600 rounded-lg p-3 mb-3 bg-orange-950/20">
          <p className="font-bold text-orange-400 text-sm mb-2">原則入院時より中止し、インスリンへ切り替え</p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-gray-200 mb-3">
            <p>・メトホルミン（ビグアナイド）</p>
            <p>・SU薬</p>
            <p>・グリニド薬</p>
            <p>・ピオグリタゾン（チアゾリジン）</p>
            <p>・αGI（α-グルコシダーゼ阻害薬）</p>
            <p>・イメグリミン</p>
          </div>

          {/* ③ GLP-1受容体作動薬 */}
          <div className="border border-orange-500/60 rounded p-2 mb-2 bg-orange-900/20">
            <p className="text-xs text-orange-300 font-semibold mb-1">GLP-1受容体作動薬（注射・経口）</p>
            <ul className="text-xs text-gray-300 space-y-0.5 mb-2">
              <li>・daily製剤：入院時中止</li>
              <li>・weekly製剤：原則休薬（直前投与は避ける）</li>
            </ul>
            <p className="text-xs text-gray-400 font-semibold mb-0.5">理由：</p>
            <ul className="text-xs text-gray-400 space-y-0.5 ml-2">
              <li>・胃排出遅延</li>
              <li>・誤嚥リスク</li>
              <li>・術後悪心嘔吐増悪</li>
            </ul>
          </div>

          <p className="text-xs text-gray-300 leading-relaxed">
            全身麻酔では欠食期間が長くなるため、上記は入院時より原則中止し、インスリンへ置き換えて血糖管理を行う。
          </p>
        </div>

        {/* ④ DPP-4阻害薬 */}
        <div className="border border-green-600 rounded-lg p-3 bg-green-950/20">
          <p className="font-bold text-green-400 text-sm mb-1">DPP-4阻害薬</p>
          <ul className="text-xs text-gray-200 space-y-1">
            <li>・原則継続可能</li>
            <li>・ただし絶食が長期化する場合は中止し、インスリン管理</li>
          </ul>
        </div>
      </Card>

      {/* ===== 術中・術後の点滴インスリン管理 ===== */}
      <Card className="bg-card border-border p-4">
        <h3 className="font-semibold mb-3 text-primary text-base">術中・術後の点滴インスリン管理</h3>
        <div className="space-y-3 text-sm">
          <div>
            <p className="font-semibold text-yellow-400 mb-2">① 食事摂取不可の場合（維持輸液）</p>
            <ul className="space-y-1 ml-3 text-xs text-gray-300">
              <li>・ソルデム3A 500mL + ヒューマリンR 4〜5単位（5g/単位）</li>
              <li>・または KN3号 500mL + ヒューマリンR 4〜5単位</li>
              <li>・血糖測定：4〜6時間毎</li>
              <li>・目標血糖：140〜180 mg/dL</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-yellow-400 mb-2">② 血糖コントロール不良の場合（持続インスリン）</p>
            <ul className="space-y-1 ml-3 text-xs text-gray-300">
              <li>・速効型インスリン（ヒューマリンR）持続静注</li>
              <li>・初期速度：0.05〜0.1単位/kg/時</li>
              <li>・血糖測定：1〜2時間毎</li>
              <li>・血糖 &lt;100：インスリン中止、5%ブドウ糖液に変更</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-yellow-400 mb-2">③ スライディングスケール（術後・食事再開後）</p>
            <ul className="space-y-1 ml-3 text-xs text-gray-300">
              <li>・超速効型インスリン（ノボラピッド等）を食前に投与</li>
              <li>・目標血糖：140〜180 mg/dL</li>
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
            <p className="text-gray-300">DPP-4阻害薬、αGI、GLP-1受容体作動薬（daily製剤）、グリニド薬、SU薬、イメグリミン</p>
          </div>
          <div className="bg-yellow-950/20 border border-yellow-700/50 rounded p-3">
            <p className="font-semibold text-yellow-400 mb-1">腎機能・全身状態確認後に再開</p>
            <p className="text-gray-300">メトホルミン（術後腎機能が安定していることを確認）、ピオグリタゾン（浮腫・心不全に注意）</p>
          </div>
          <div className="bg-red-950/20 border border-red-700/50 rounded p-3">
            <p className="font-semibold text-red-400 mb-1">SGLT2阻害薬（特別注意）</p>
            <p className="text-gray-300">十分な経口摂取・脱水なし・ケトン体陰性を確認してから再開する</p>
          </div>
        </div>
      </Card>

      <AlertBox type="warning">
        <p className="text-sm">術後の血糖管理は感染リスク・創傷治癒に直結します。血糖 &gt;200 mg/dL が続く場合は積極的にインスリン投与を検討してください。</p>
      </AlertBox>
    </div>
  );
}
