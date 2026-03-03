import React from 'react';

export function Section5_T2DAlgorithm() {
  return (
    <div className="space-y-3 text-xs">

      {/* ===== インスリンの絶対的・相対的適応 ===== */}
      <div className="flex flex-col items-center">
        <div className="w-full border-2 border-green-500 rounded-lg p-3 text-center bg-green-950/20">
          <p className="font-bold text-green-400 text-sm">インスリンの絶対的・相対的適応</p>
        </div>

        {/* いいえ / はい 分岐 */}
        <div className="w-full flex items-start mt-1">
          {/* 左：いいえ → 下へ */}
          <div className="flex flex-col items-center flex-1">
            <div className="text-gray-300 text-xs mb-1">いいえ</div>
            <div className="text-blue-400 text-xl">↓</div>
          </div>
          {/* 右：はい → インスリン治療 */}
          <div className="flex flex-col items-center flex-1">
            <div className="text-gray-300 text-xs mb-1">はい</div>
            <div className="text-green-400 text-xl">→</div>
            <div className="bg-green-600 text-white font-bold rounded px-3 py-1 text-xs mt-1">
              インスリン治療
            </div>
          </div>
        </div>
      </div>

      {/* ===== 目標HbA1c値の決定 ===== */}
      <div className="flex flex-col items-center">
        <div className="w-full border border-blue-400 rounded-lg p-3 text-center bg-blue-950/20">
          <p className="font-bold text-white text-sm mb-1">目標HbA1c値の決定</p>
          <p className="text-gray-300 text-xs">「熊本宣言2013」・「高齢者糖尿病の血糖コントロール目標（HbA1c値）」を参照</p>
        </div>
        <div className="text-blue-400 text-xl mt-1">↓</div>
      </div>

      {/* ===== Step 1 ===== */}
      <div className="w-full border border-orange-500 rounded-lg overflow-hidden">
        {/* Step 1 ラベル */}
        <div className="bg-orange-500 text-white font-bold px-3 py-1 text-xs inline-block">Step 1</div>

        <div className="p-3 space-y-3">
          <p className="font-bold text-white text-sm text-center">病態に応じた薬剤選択</p>

          {/* 非肥満 / 肥満 の2カラム */}
          <div className="grid grid-cols-2 gap-2">
            {/* 非肥満 */}
            <div className="border border-blue-600 rounded bg-blue-900/30 p-2">
              <p className="font-bold text-white text-center text-xs mb-1">非肥満</p>
              <p className="text-gray-300 text-center text-xs mb-2">[インスリン分泌不全を想定]</p>
              <p className="text-blue-300 text-xs leading-relaxed">
                DPP-4阻害薬, ビグアナイド薬, α-グルコシダーゼ阻害薬<span className="text-gray-400">*</span>,
                速効型インスリン分泌促進薬(グリニド薬), スルホニル尿素(SU)薬,
                SGLT2阻害薬<span className="text-gray-400">†</span>, GLP-1受容体作動薬<span className="text-gray-400">†</span>, イメグリミン
              </p>
              <p className="text-gray-400 text-xs mt-2 leading-relaxed">
                ＊：食後高血糖改善　†：やせの患者では体重減少に注意
              </p>
              <p className="text-red-400 font-bold text-xs mt-2 leading-relaxed">
                インスリン分泌不全, 抵抗性は, 糖尿病治療ガイドにある各指標を参考に評価し得る
              </p>
            </div>

            {/* 肥満 */}
            <div className="border border-blue-600 rounded bg-blue-900/30 p-2">
              <p className="font-bold text-white text-center text-xs mb-1">肥満</p>
              <p className="text-gray-300 text-center text-xs mb-2">[インスリン抵抗性を想定]</p>
              <p className="text-blue-300 text-xs leading-relaxed">
                ビグアナイド薬, SGLT2阻害薬,
                GLP-1受容体作動薬, DPP-4阻害薬, チアゾリジン薬,
                α-グルコシダーゼ阻害薬<span className="text-gray-400"> *</span>, イメグリミン, チルゼパチド
              </p>
              <p className="text-gray-400 text-xs mt-2 leading-relaxed">
                インスリン抵抗性はBMI, 腹囲での肥満・内臓脂肪蓄積から類推するが、HOMA-IR等の指標の評価が望ましい
              </p>
              <p className="text-gray-400 text-xs mt-1 leading-relaxed">
                ■日本における肥満の定義：BMI 25kg/m² 以上<br />
                ■日本における内臓脂肪蓄積を示す腹囲の基準：<br />
                　男性：85cm以上, 女性：90cm以上
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="text-blue-400 text-xl">↓</div>
      </div>

      {/* ===== Step 2 ===== */}
      <div className="w-full border border-orange-500 rounded-lg overflow-hidden">
        <div className="bg-orange-500 text-white font-bold px-3 py-1 text-xs inline-block">Step 2</div>
        <div className="p-3">
          <p className="font-bold text-white text-sm text-center mb-2">安全性への配慮</p>
          <p className="text-gray-300 text-xs text-center mb-2">別表の考慮すべき項目で赤に該当するものを避ける</p>
          <div className="space-y-1 text-gray-300 text-xs">
            <p>例１）低血糖リスクの高い高齢者にはSU薬，グリニド薬を避ける</p>
            <p>例２）腎機能障害合併者にはビグアナイド薬，SU薬，チアゾリジン薬，腎排泄型のグリニド薬を避ける<br />
              　　　（高度障害ではSU薬，ビグアナイド薬，チアゾリジン薬は禁忌）</p>
            <p>例３）心不全合併者にはチアゾリジン薬，ビグアナイド薬を避ける（禁忌）</p>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="text-blue-400 text-xl">↓</div>
      </div>

      {/* ===== Step 3 ===== */}
      <div className="w-full border border-orange-500 rounded-lg overflow-hidden">
        <div className="bg-orange-500 text-white font-bold px-3 py-1 text-xs inline-block">Step 3</div>
        <div className="p-3">
          <p className="font-bold text-white text-sm text-center mb-3">Additional benefits を考慮するべき併存疾患</p>
          <div className="grid grid-cols-3 gap-2">
            {/* 慢性腎臓病 */}
            <div className="border border-blue-600 rounded bg-blue-900/40 p-2 text-center">
              <p className="font-bold text-white text-xs mb-1">慢性腎臓病<span className="text-gray-400">*</span></p>
              <p className="text-blue-300 text-xs">SGLT2阻害薬<span className="text-gray-400">†</span>, GLP-1受容体作動薬</p>
            </div>
            {/* 心不全 */}
            <div className="border border-blue-600 rounded bg-blue-900/40 p-2 text-center">
              <p className="font-bold text-white text-xs mb-1">心不全</p>
              <p className="text-blue-300 text-xs">SGLT2阻害薬<span className="text-gray-400">†</span></p>
            </div>
            {/* 心血管疾患 */}
            <div className="border border-blue-600 rounded bg-blue-900/40 p-2 text-center">
              <p className="font-bold text-white text-xs mb-1">心血管疾患</p>
              <p className="text-blue-300 text-xs">SGLT2阻害薬, GLP-1受容体作動薬</p>
            </div>
          </div>
          <p className="text-gray-400 text-xs mt-2">＊：特に顕性腎症　†：一部の薬剤には適応症あり</p>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="text-blue-400 text-xl">↓</div>
      </div>

      {/* ===== Step 4 ===== */}
      <div className="w-full border border-orange-500 rounded-lg overflow-hidden">
        <div className="bg-orange-500 text-white font-bold px-3 py-1 text-xs inline-block">Step 4</div>
        <div className="p-3">
          <p className="font-bold text-white text-sm text-center mb-1">考慮すべき患者背景</p>
          <p className="text-gray-300 text-xs text-center">別表の服薬継続率およびコストを参照に薬剤を選択</p>
        </div>
      </div>

      {/* ===== 下部メッセージ ===== */}
      <div className="text-center space-y-2 pt-1">
        <p className="text-white font-bold text-xs">
          薬物療法開始後は、およそ３か月ごとに治療法の再評価と修正を検討する
        </p>
        <p className="text-red-400 font-bold text-xs leading-relaxed">
          目標HbA1cを達成できなかった場合は、病態や合併症に沿った<br />
          食事療法、運動療法、生活習慣改善を促すと同時に、冒頭に立ち返り、<br />
          インスリン適応の再評価も含めて薬剤の追加等を検討する
        </p>
        <p className="text-gray-400 text-xs">Fig. 2　2型糖尿病の薬物療法のアルゴリズム</p>
      </div>

    </div>
  );
}
