/**
 * appData.ts
 * アプリ全体の検索可能なグローバルデータオブジェクト
 * 全セクションのテキストコンテンツをここに統合する
 * 検索はこのオブジェクトのみを走査する
 */

export interface AppDataEntry {
  id: string;
  sectionId: number;
  title: string;
  group: string;
  content: string;
}

export const appData: AppDataEntry[] = [
  // ─── Section 1: 高血糖緊急症 ───
  {
    id: 'hyperglycemic-emergency',
    sectionId: 1,
    title: '高血糖緊急症',
    group: '高血糖緊急症',
    content: `
DKA 糖尿病性ケトアシドーシス HHS 高血糖性昏睡 euDKA 正常血糖DKA
初期対応 治療プロトコル
血糖値 High 600以上 400 250〜300 DKA 300〜350 HHS 150〜200 DKA 250〜300 HHS
血糖測定間隔 30分〜1時間毎 2〜4時間毎
インスリン投与量 0.15 U/kg iv 0.1 U/kg/h div
H-R 50U PSS 49.5ml 50kgの場合 7.5ml flash 5ml/hで開始
1時間あたりの血糖低下量 50以上でインスリン量を半減 50未満でそのまま
0.05 U/kg/h 2〜3 ml/h まで下記の通りに流量を減量する
血糖 BS インスリン 100以下 -1.0 ml/h 101〜150 -0.5 ml/h 151〜200 そのまま 201〜250 H-R 2U s.c 251〜300 H-R 4U s.c 301以上 H-R 6U s.c
Na Low〜normal 生理食塩水 High 生食と蒸留水の並列 0.45%PSS
K カリウム 3.3未満 40 mEq/hで混注 3.3〜5.0 20〜30 mEq/Lで混注 5.0超 2時間毎check
輸液の選択 ST3 K<5.0 ST1 K>5.0 0.45%PSS 5%GLU
BS<70の時 50%Glu 20ml iv 30分後再検 BS>100まで繰り返す ただし再検時はインスリン変更しない
HCO3 重炭酸 PH<6.9 100 mEq 120ml/30min PH 6.9〜7.0 50 mEq 60ml/15min PH>7.0 no HCO3 7%メイロン
輸液量 BP normal 500ml/h 200〜700ml/h 200ml/h 150〜250ml/h 1500〜2500 ml/day n.p.o BP低下 1000ml/h
アニオンギャップ AG計算 Na Cl HCO3 正常値 12±2 mEq/L
乳酸アシドーシス メトホルミン SGLT2阻害薬 正常血糖DKA
SGLT2阻害薬 euDKA 正常血糖 血糖正常でもケトアシドーシス 手術 絶食 飲酒 低炭水化物
    `,
  },
  // ─── Section 2: ケトメーター判定 ───
  {
    id: 'ketometer',
    sectionId: 2,
    title: 'ケトメーター判定',
    group: 'ケトメーター判定',
    content: `
ケトメーター β-ヒドロキシ酪酸 β-HB 基準値 判定
0.0〜0.5 mmol/L 正常 ケトーシスなし
0.5〜1.0 mmol/L 軽度上昇 注意
1.0〜3.0 mmol/L 中等度 ケトーシス
3.0以上 mmol/L 高度 ケトアシドーシス疑い DKA
シックデイ 絶食 嘔吐 下痢 発熱
インスリン中断禁止 水分補給 受診目安
    `,
  },
  // ─── Section 3: 糖分入り点滴・IVH ───
  {
    id: 'sugar-iv',
    sectionId: 3,
    title: '糖分入り点滴・IVH',
    group: '糖分入り点滴・IVH',
    content: `
糖分入り点滴 IVH 中心静脈栄養 商品一覧 インスリン混注量
5%ブドウ糖液 10%ブドウ糖液 50%ブドウ糖液
ソルデム ソリタ ラクテック ハルトマン
エルネオパ ピーエヌツイン フルカリック ミキシッド
インスリン混注 速効型 レギュラーインスリン ノボリンR ヒューマリンR
血糖管理 高カロリー輸液 TPN 周術期
    `,
  },
  // ─── Section 4: 糖尿病タイプ診断（診断基準） ───
  {
    id: 'diabetes-type-diagnosis',
    sectionId: 4,
    title: '糖尿病タイプ診断',
    group: '糖尿病タイプ診断',
    content: `
糖尿病診断基準 日本糖尿病学会
空腹時血糖 126 mg/dL以上
75g OGTT 2時間値 200 mg/dL以上
随時血糖 200 mg/dL以上
HbA1c 6.5%以上
糖尿病型 2回確認 または1回でも症状あり
境界型 IGT 耐糖能異常
正常型
慢性合併症 三大合併症 網膜症 腎症 神経障害
大血管障害 心筋梗塞 脳梗塞 末梢動脈疾患
    `,
  },
  // ─── Section 4: 1型糖尿病 ───
  {
    id: 'type1-diabetes',
    sectionId: 4,
    title: '1型糖尿病',
    group: '1型糖尿病',
    content: `
1型糖尿病 インスリン依存 自己免疫 膵島破壊
劇症1型糖尿病 急性発症1型糖尿病 緩徐進行1型糖尿病
GAD抗体 IA-2抗体 ZnT8抗体 膵島細胞抗体 ICA インスリン自己抗体 IAA
Cペプチド インスリン分泌能 CPI
インスリン強化療法 基礎インスリン 追加インスリン
カーボカウント 炭水化物係数
    `,
  },
  // ─── Section 4: SPIDDM（緩徐進行1型糖尿病）診断基準 ───
  {
    id: 'spiddm',
    sectionId: 4,
    title: 'SPIDDM（緩徐進行1型糖尿病）診断基準',
    group: '1型糖尿病',
    content: `
SPIDDM 緩徐進行1型糖尿病 Slowly Progressive Insulin-Dependent Diabetes Mellitus
診断基準 日本糖尿病学会 2021年改訂版

【必須項目】
1. 糖尿病型を示す
   空腹時血糖 126 mg/dL以上 または 75gOGTT 2時間値 200 mg/dL以上 または 随時血糖 200 mg/dL以上 または HbA1c 6.5%以上

2. 膵島関連自己抗体が陽性
   GAD抗体 グルタミン酸脱炭酸酵素抗体
   IA-2抗体 Insulinoma-associated antigen-2抗体
   ZnT8抗体 亜鉛輸送担体8抗体
   ICA 膵島細胞抗体
   IAA インスリン自己抗体（インスリン治療開始前に測定した場合に限る）

3. 診断時にインスリン非依存状態
   ケトアシドーシスなし インスリンなしで血糖コントロール可能

【判定】
definite 確実例：上記1、2、3をすべて満たす場合「緩徐進行1型糖尿病（definite）」と診断する
probable 疑い例：上記1、2のみを満たす場合はインスリン非依存状態の糖尿病であり「緩徐進行1型糖尿病（probable）」とする

【注釈】
a) 膵島関連自己抗体とはGAD抗体、ICA、IA-2抗体、ZnT8抗体、IAAを指す。ただしIAAはインスリン治療開始前に測定した場合に限る
b) 典型例は6ヶ月以上である
c) インスリン非依存状態とは診断時にケトアシドーシスを呈しておらず、インスリン治療なしで血糖コントロールが可能な状態を指す

Cペプチドインデックス CPI 計算式 CPI = 空腹時血中Cペプチド(ng/mL) / 空腹時血糖(mg/dL) × 100
CPI 1.2以上 インスリン分泌能保持 2型糖尿病
CPI 0.8〜1.2 境界域
CPI 0.8未満 インスリン分泌能低下 1型糖尿病疑い
    `,
  },
  // ─── Section 5: 2型治療アルゴリズム ───
  {
    id: 't2d-algorithm',
    sectionId: 5,
    title: '2型治療アルゴリズム',
    group: '2型治療アルゴリズム',
    content: `
2型糖尿病 治療アルゴリズム 日本糖尿病学会 2023年版
食事療法 運動療法 生活習慣改善
薬物療法 開始基準 HbA1c 7%以上
第一選択薬 メトホルミン ビグアナイド系
心血管疾患 既往 SGLT2阻害薬 GLP-1受容体作動薬 優先
心不全 SGLT2阻害薬 優先
CKD 慢性腎臓病 SGLT2阻害薬 優先
肥満 体重減少 GLP-1受容体作動薬 SGLT2阻害薬
低血糖リスク高い DPP-4阻害薬 αGI SGLT2阻害薬
インスリン強化療法 基礎インスリン 追加インスリン
HbA1c目標 7%未満 個別化
    `,
  },
  // ─── Section 6: HbA1c目標値 ───
  {
    id: 'hba1c-target',
    sectionId: 6,
    title: 'HbA1c目標値',
    group: 'HbA1c目標値',
    content: `
HbA1c目標値 血糖コントロール目標 個別化
6.0%未満 血糖正常化を目指す際の目標 食事運動療法のみで達成可能な場合
7.0%未満 合併症予防のための目標 空腹時血糖130未満 食後2時間血糖180未満
8.0%未満 治療強化が困難な際の目標 低血糖リスク高い

高齢者糖尿病 血糖コントロール目標
カテゴリーI 認知機能正常 ADL自立
カテゴリーII 軽度認知障害 手段的ADL低下
カテゴリーIII 中等度以上の認知症 基本的ADL低下

重症低血糖が危惧される薬剤なし SU薬なし インスリンなし
カテゴリーI 7.0%未満
カテゴリーII 7.0%未満
カテゴリーIII 8.0%未満

重症低血糖が危惧される薬剤あり SU薬あり インスリンあり
65〜74歳 7.5%未満 下限6.5%
75歳以上 8.0%未満 下限7.0%
カテゴリーII 8.0%未満 下限7.0%
カテゴリーIII 8.5%未満 下限7.5%

日本糖尿病学会 2018-2019 日本老年医学会 2017
妊娠糖尿病 空腹時血糖95未満 食後1時間140未満 食後2時間120未満
透析患者 HbA1c 7.0〜8.0%
    `,
  },
  // ─── Section 7: 内服薬一覧 ───
  {
    id: 'oral-drugs',
    sectionId: 7,
    title: '内服薬一覧',
    group: '内服薬一覧',
    content: `
経口血糖降下薬 内服薬 一覧 腎機能調整 eGFR
ビグアナイド系 メトホルミン メトグルコ グリコラン ジベトス
eGFR 45以上 通常量 eGFR 30〜45 最大750mg/日 eGFR 30未満 禁忌 透析 禁忌
乳酸アシドーシス リスク 造影剤 休薬

SU薬 スルホニル尿素薬 グリメピリド アマリール グリクラジド グリミクロン グリベンクラミド オイグルコン ダオニール
低血糖リスク 高い 腎機能低下で蓄積 高齢者 注意

グリニド薬 速効型インスリン分泌促進薬 ナテグリニド スターシス ファスティック ミチグリニド グルファスト レパグリニド シュアポスト
食前服用 食直前 低血糖

DPP-4阻害薬 シタグリプチン ジャヌビア グラクティブ ビルダグリプチン エクア アログリプチン ネシーナ リナグリプチン トラゼンタ テネリグリプチン テネリア アナグリプチン スイニー サキサグリプチン オングリザ オマリグリプチン マリゼブ トレラグリプチン ザファテック
低血糖リスク 低い 腎機能調整 週1回製剤

SGLT2阻害薬 ダパグリフロジン フォシーガ エンパグリフロジン ジャディアンス カナグリフロジン カナグル イプラグリフロジン スーグラ ルセオグリフロジン ルセフィ トホグリフロジン デベルザ アプルウェイ
心血管保護 腎保護 体重減少 尿路感染 性器感染 eGFR 30未満 使用しない
正常血糖DKA euDKA 手術前休薬

αGI アルファグルコシダーゼ阻害薬 ボグリボース ベイスン アカルボース グルコバイ ミグリトール セイブル
食直前服用 腹部膨満 放屁

チアゾリジン薬 ピオグリタゾン アクトス 浮腫 心不全 禁忌 骨折リスク

イメグリミン ツイミーグ ミトコンドリア機能改善 eGFR 45未満 使用しない

GLP-1受容体作動薬 経口 セマグルチド リベルサス 週1回 注射 デュラグルチド トルリシティ セマグルチド オゼンピック リラグルチド ビクトーザ

配合剤 イニシンク シタグリプチン メトホルミン エクメット ビルダグリプチン メトホルミン メタクト ピオグリタゾン メトホルミン スージャヌ シタグリプチン イプラグリフロジン トラディアンス リナグリプチン エンパグリフロジン カナリア カナグリフロジン メトホルミン

シックデイ 発熱 嘔吐 下痢 食欲不振 休薬 継続 判断
造影剤 メトホルミン 休薬 48時間
周術期 手術前 休薬 SGLT2阻害薬 3日前 メトホルミン 前日
    `,
  },
  // ─── Section 8: インスリン完全ガイド ───
  {
    id: 'insulin-guide',
    sectionId: 8,
    title: 'インスリン完全ガイド',
    group: 'インスリン完全ガイド',
    content: `
インスリン製剤 一覧 全製剤 混合製剤
超速効型 ノボラピッド アスパルト ヒューマログ リスプロ アピドラ グルリジン フィアスプ ルムジェブ
速効型 レギュラーインスリン ノボリンR ヒューマリンR
中間型 NPH ノボリンN ヒューマリンN
持効型 トレシーバ デグルデク ランタス グラルギン ランタスXR トウジェオ レベミル デテミル
混合型 ノボラピッド30ミックス ノボラピッド50ミックス ノボラピッド70ミックス ヒューマログミックス25 ヒューマログミックス50 ライゾデグ

インスリン投与量 1日必要量 体重 0.5〜1.0 U/kg
基礎インスリン 追加インスリン 1:1
カーボカウント 炭水化物係数 インスリン感受性係数 ISF
低血糖 対処 ブドウ糖 10g グルカゴン
自己注射 手技 注射部位 ローテーション
    `,
  },
  // ─── Section 9: スライディングスケール ───
  {
    id: 'sliding-scale',
    sectionId: 9,
    title: 'スライディングスケール',
    group: 'スライディングスケール',
    content: `
スライディングスケール 血糖値 インスリン投与量 自動生成
ISF25 インスリン感受性係数 25 50mg/dl刻み 2単位刻み
ISF50 インスリン感受性係数 50
速効型 超速効型 皮下注射 s.c
血糖測定 食前 食後 就寝前 起床時
低血糖 50mg/dL未満 ブドウ糖 50%ブドウ糖液
高血糖 300mg/dL以上 追加インスリン
絶食時 経管栄養時 スケール
    `,
  },
  // ─── Section 10: 周術期血糖管理 ───
  {
    id: 'perioperative',
    sectionId: 10,
    title: '周術期血糖管理',
    group: '周術期血糖管理',
    content: `
周術期 手術 血糖管理 休薬 再開
術前 休薬スケジュール
SGLT2阻害薬 手術3日前から休薬 正常血糖DKA euDKA 予防
メトホルミン 手術前日から休薬 造影剤使用時 48時間休薬
SU薬 グリニド薬 手術当日朝から休薬 低血糖予防
DPP-4阻害薬 手術当日朝から休薬 または継続 施設により異なる
インスリン 基礎インスリン 半量 または継続 追加インスリン 休薬

術中 血糖管理目標 150〜250 mg/dL
インスリン持続静注 血糖 1〜2時間毎測定

術後 再開基準
経口摂取再開後 内服薬再開
SGLT2阻害薬 十分な経口摂取が安定し脱水やケトーシスのリスクが低いことを確認してから再開
メトホルミン 腎機能確認後 48時間以降

絶食時 インスリン 基礎インスリン 継続 追加インスリン 食事量に応じて調整
    `,
  },
  // ─── Section 11: 食事・カロリー計算 ───
  {
    id: 'diet-calc',
    sectionId: 11,
    title: '食事・カロリー計算',
    group: '食事・カロリー計算',
    content: `
食事療法 カロリー計算 必要エネルギー 蛋白制限
総エネルギー摂取量 標準体重 身体活動量
標準体重 身長m 二乗 22
身体活動量 軽労作 25〜30 kcal/kg 普通 30〜35 kcal/kg 重労作 35〜 kcal/kg
炭水化物 50〜60% 蛋白質 15〜20% 脂質 20〜30%
CKD 蛋白制限 0.6〜0.8 g/kg/日
塩分制限 6g未満/日
食物繊維 20g以上/日
GI値 血糖上昇指数 低GI食品
    `,
  },
  // ─── Section 12: 糖尿病合併症 ───
  {
    id: 'complications',
    sectionId: 12,
    title: '糖尿病合併症',
    group: '糖尿病合併症',
    content: `
糖尿病合併症 三大合併症 細小血管障害
糖尿病網膜症 眼底検査 光凝固療法 硝子体手術 失明
糖尿病腎症 蛋白尿 eGFR低下 透析 腎代替療法 CKD
糖尿病神経障害 末梢神経障害 しびれ 疼痛 自律神経障害 起立性低血圧

大血管障害 動脈硬化
冠動脈疾患 心筋梗塞 狭心症
脳血管障害 脳梗塞 脳出血
末梢動脈疾患 PAD 足壊疽 切断

糖尿病足病変 フットケア 足潰瘍
高血圧 脂質異常症 肥満 喫煙 リスク因子
ACE阻害薬 ARB 腎保護 蛋白尿減少
スタチン LDL-C管理
    `,
  },
  // ─── Section 13: 認知機能チェック ───
  {
    id: 'cognitive-check',
    sectionId: 13,
    title: '認知機能チェック',
    group: '認知機能チェック',
    content: `
認知機能 評価 HDS-R 改訂長谷川式簡易知能評価スケール MMSE Mini-Mental State Examination
HDS-R 30点満点 20点以下 認知症疑い
MMSE 30点満点 23点以下 認知症疑い
軽度認知障害 MCI Mild Cognitive Impairment
認知症 アルツハイマー型 血管性 レビー小体型

高齢者糖尿病 認知機能低下 低血糖リスク 服薬管理困難
カテゴリーI 認知機能正常 ADL自立
カテゴリーII 軽度認知障害 手段的ADL低下
カテゴリーIII 中等度以上の認知症 基本的ADL低下
HbA1c目標 個別化 重症低血糖回避
    `,
  },
];

/**
 * 検索関数
 * appData全体を走査して部分一致検索を行う
 * 全角半角・大文字小文字・日本語を正規化して比較
 */
export interface SearchResult {
  sectionId: number;
  title: string;
  group: string;
  snippet: string;
  id: string;
}

function normalize(str: string): string {
  return str
    .toLowerCase()
    // 全角英数字→半角
    .replace(/[Ａ-Ｚａ-ｚ０-９]/g, (s) => String.fromCharCode(s.charCodeAt(0) - 0xfee0))
    // 全角スペース→半角
    .replace(/\u3000/g, ' ')
    // 長音符の正規化
    .replace(/ー/g, 'ー')
    // 連続空白を1つに
    .replace(/\s+/g, ' ')
    .trim();
}

function extractSnippet(content: string, query: string, snippetLength = 80): string {
  const normalizedContent = normalize(content);
  const normalizedQuery = normalize(query);
  const idx = normalizedContent.indexOf(normalizedQuery);
  if (idx === -1) return content.slice(0, snippetLength).trim() + '…';
  const start = Math.max(0, idx - 20);
  const end = Math.min(content.length, idx + query.length + 60);
  const snippet = content.slice(start, end).replace(/\n/g, ' ').trim();
  return (start > 0 ? '…' : '') + snippet + (end < content.length ? '…' : '');
}

export function searchAppData(query: string): SearchResult[] {
  if (!query || query.trim().length === 0) return [];

  const normalizedQuery = normalize(query.trim());
  if (normalizedQuery.length === 0) return [];

  const results: SearchResult[] = [];

  for (const entry of appData) {
    const normalizedTitle = normalize(entry.title);
    const normalizedGroup = normalize(entry.group);
    const normalizedContent = normalize(entry.content);

    const matchesTitle = normalizedTitle.includes(normalizedQuery);
    const matchesGroup = normalizedGroup.includes(normalizedQuery);
    const matchesContent = normalizedContent.includes(normalizedQuery);

    if (matchesTitle || matchesGroup || matchesContent) {
      results.push({
        sectionId: entry.sectionId,
        title: entry.title,
        group: entry.group,
        snippet: extractSnippet(entry.content, query.trim()),
        id: entry.id,
      });
    }
  }

  return results;
}
