// 無料ツール → 症例トレーニングへの入口（dm-compass）。
// 対応する症例がある場所にだけ置く。タイトルは症例側の表記そのまま（~/Desktop/Claude-Projects/revenue-report/check_entries.py が照合・URLの200も確認）。
// utm: utm_source=dm-compass / utm_medium=tool / utm_campaign=<場所>
export type TrainingCase = { app: 'dm' | 'endo'; title: string; free: boolean; url: string };

export const TRAINING_CASES: Record<number, TrainingCase> = {
  // 高血糖緊急症 → DKA症例
  1: {
    app: 'dm',
    title: "嘔吐と意識朦朧で救急搬送された24歳男性",
    free: true,
    url: 'https://dm-compass-training.vercel.app/case/dka-er-24?utm_source=dm-compass&utm_medium=tool&utm_campaign=s1-hyperglycemic-emergency',
  },
  // ケトメーター → 正常血糖ケトアシドーシス症例
  2: {
    app: 'dm',
    title: "血糖180なのにケトアシドーシス——2日食べられない65歳、電話口で止めるべき薬があった",
    free: true,
    url: 'https://dm-compass-training.vercel.app/case/dm-sickday-sglt2-euDKA-65?utm_source=dm-compass&utm_medium=tool&utm_campaign=s2-ketometer',
  },
  // 点滴・混注 → TPN中の血糖管理症例
  3: {
    app: 'dm',
    title: "TPN中に血糖300前後が続く71歳男性——スライディングスケールだけでよいか",
    free: false,
    url: 'https://dm-compass-training.vercel.app/case/tpn-insulin-71?utm_source=dm-compass&utm_medium=tool&utm_campaign=s3-iv-insulin',
  },
  // タイプ診断 → 成因鑑別症例
  4: {
    app: 'dm',
    title: "口渇と体重減少5kgの42歳非肥満男性——「2型と決めつけない」タイプ診断",
    free: false,
    url: 'https://dm-compass-training.vercel.app/case/dm-type-dx-42?utm_source=dm-compass&utm_medium=tool&utm_campaign=s4-dm-type',
  },
  // 2型治療アルゴリズム（OHA選択）→ 初診・薬剤選択症例
  5: {
    app: 'dm',
    title: "健診でHbA1c 8.7%を指摘された62歳男性",
    free: true,
    url: 'https://dm-compass-training.vercel.app/case/kenshin-hba1c-87?utm_source=dm-compass&utm_medium=tool&utm_campaign=s5-t2d-algorithm',
  },
  // HbA1c目標 → 高齢者の低血糖症例
  6: {
    app: 'dm',
    title: "ふらつきと冷汗を訴えるHbA1c 6.4%の78歳独居女性",
    free: false,
    url: 'https://dm-compass-training.vercel.app/case/elderly-hypo-78?utm_source=dm-compass&utm_medium=tool&utm_campaign=s6-hba1c-target',
  },
  // 内服／注射一覧 → CKD・メトホルミン症例
  7: {
    app: 'dm',
    title: "eGFR 38を指摘されたメトホルミン内服中の58歳男性",
    free: false,
    url: 'https://dm-compass-training.vercel.app/case/ckd-metformin-58?utm_source=dm-compass&utm_medium=tool&utm_campaign=s7-drugs',
  },
  // インスリン → インスリン導入症例
  8: {
    app: 'dm',
    title: "血糖348 mg/dL・HbA1c 11.2%で入院した未治療糖尿病の60歳男性",
    free: false,
    url: 'https://dm-compass-training.vercel.app/case/insulin-intro-60?utm_source=dm-compass&utm_medium=tool&utm_campaign=s8-insulin',
  },
  // スライディングスケール → TPN中の血糖管理症例
  9: {
    app: 'dm',
    title: "TPN中に血糖300前後が続く71歳男性——スライディングスケールだけでよいか",
    free: false,
    url: 'https://dm-compass-training.vercel.app/case/tpn-insulin-71?utm_source=dm-compass&utm_medium=tool&utm_campaign=s9-sliding-scale',
  },
  // 周術期 → 周術期管理症例
  10: {
    app: 'dm',
    title: "大腸癌手術を控えたHbA1c 8.1%の70歳男性",
    free: false,
    url: 'https://dm-compass-training.vercel.app/case/periop-insulin-70?utm_source=dm-compass&utm_medium=tool&utm_campaign=s10-periop',
  },
  // 食事・カロリー → 高齢者の食事・サルコペニア症例
  11: {
    app: 'dm',
    title: "3kg痩せて喜ぶ74歳——その減量は、筋肉が溶けているのかもしれない",
    free: false,
    url: 'https://dm-compass-training.vercel.app/case/dm-nutrition-sarcopenia-74?utm_source=dm-compass&utm_medium=tool&utm_campaign=s11-diet',
  },
  // 合併症 → 合併症スクリーニング症例
  12: {
    app: 'dm',
    title: "足のしびれで2年ぶりに受診した58歳——無症状のうちに合併症を拾いきる",
    free: false,
    url: 'https://dm-compass-training.vercel.app/case/dm-complication-screening-58?utm_source=dm-compass&utm_medium=tool&utm_campaign=s12-complications',
  },
  // 認知機能 → 高齢者の低血糖症例
  13: {
    app: 'dm',
    title: "ふらつきと冷汗を訴えるHbA1c 6.4%の78歳独居女性",
    free: false,
    url: 'https://dm-compass-training.vercel.app/case/elderly-hypo-78?utm_source=dm-compass&utm_medium=tool&utm_campaign=s13-cognitive',
  },
};
