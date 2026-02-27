import React, { useState, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { AlertBox } from '@/components/AlertBox';

// HDS-R と MMSE の質問定義
// shared: 両方に存在する質問（片方にチェックを入れると自動で連動）
type QuestionDef = {
  id: string;
  text: string;
  maxScore: number;
  sharedWith?: string; // 連動先のid
  detail?: string;
};

const hdsrQuestions: QuestionDef[] = [
  { id: 'hdsr_1', text: '① お歳はいくつですか？（±2年正解）', maxScore: 1, detail: '1点' },
  { id: 'hdsr_2', text: '② 今日は何年何月何日ですか？何曜日ですか？', maxScore: 4, detail: '年1点・月1点・日1点・曜日1点', sharedWith: 'mmse_3' },
  { id: 'hdsr_3', text: '③ 私たちが今いるところはどこですか？', maxScore: 2, detail: '自発2点・5秒後のヒントで1点', sharedWith: 'mmse_5' },
  { id: 'hdsr_4', text: '④ 3つの言葉を覚えてください（桜・猫・電車）', maxScore: 3, detail: '各1点', sharedWith: 'mmse_7' },
  { id: 'hdsr_5', text: '⑤ 100から7を順番に引いてください（93・86）', maxScore: 2, detail: '各1点', sharedWith: 'mmse_8' },
  { id: 'hdsr_6', text: '⑥ 私が今から言う数字を逆から言ってください（6-8-2、3-5-2-9）', maxScore: 2, detail: '各1点' },
  { id: 'hdsr_7', text: '⑦ 先ほど覚えてもらった言葉をもう一度言ってください', maxScore: 6, detail: '自発2点・ヒント1点（各）', sharedWith: 'mmse_9' },
  { id: 'hdsr_8', text: '⑧ これから5つの物品を見せます（後で聞きます）', maxScore: 5, detail: '各1点' },
  { id: 'hdsr_9', text: '⑨ 知っている野菜の名前をできるだけ多く言ってください', maxScore: 5, detail: '5個以上で1点ずつ加算（最大5点）' },
];

const mmseQuestions: QuestionDef[] = [
  { id: 'mmse_1', text: '① 今年は何年ですか？', maxScore: 1, detail: '1点', sharedWith: 'hdsr_2' },
  { id: 'mmse_2', text: '② 今の季節は何ですか？', maxScore: 1, detail: '1点' },
  { id: 'mmse_3', text: '③ 今日は何日ですか？何曜日ですか？何月ですか？', maxScore: 3, detail: '各1点', sharedWith: 'hdsr_2' },
  { id: 'mmse_4', text: '④ ここは何県ですか？何市ですか？何病院ですか？何階ですか？', maxScore: 4, detail: '各1点' },
  { id: 'mmse_5', text: '⑤ 今いる場所はどこですか？（病院・施設など）', maxScore: 1, detail: '1点', sharedWith: 'hdsr_3' },
  { id: 'mmse_6', text: '⑥ 3つの物の名前を覚えてください（物品名を言う）', maxScore: 3, detail: '各1点' },
  { id: 'mmse_7', text: '⑦ 100から7を順番に引いてください（93・86・79・72・65）', maxScore: 5, detail: '各1点', sharedWith: 'hdsr_5' },
  { id: 'mmse_8', text: '⑧ 先ほどの3つの物の名前を言ってください', maxScore: 3, detail: '各1点', sharedWith: 'hdsr_7' },
  { id: 'mmse_9', text: '⑨ 時計を見せて「これは何ですか？」「鉛筆は？」', maxScore: 2, detail: '各1点' },
  { id: 'mmse_10', text: '⑩ 「みんなで力を合わせて綱を引きます」を繰り返してください', maxScore: 1, detail: '1点' },
  { id: 'mmse_11', text: '⑪ 紙に書かれた「目を閉じてください」を読んで実行してください', maxScore: 1, detail: '1点' },
  { id: 'mmse_12', text: '⑫ 「右手にこの紙を持ってください・半分に折ってください・床に置いてください」', maxScore: 3, detail: '各1点' },
  { id: 'mmse_13', text: '⑬ 何か文章を書いてください（主語・述語を含む）', maxScore: 1, detail: '1点' },
  { id: 'mmse_14', text: '⑭ 図形（五角形が重なった図）を書き写してください', maxScore: 1, detail: '1点' },
];

// 連動マップ（id → sharedWith id）
const sharedMap: Record<string, string> = {};
[...hdsrQuestions, ...mmseQuestions].forEach((q) => {
  if (q.sharedWith) {
    sharedMap[q.id] = q.sharedWith;
    sharedMap[q.sharedWith] = q.id;
  }
});

export function Section12_CognitiveCheck() {
  const [hdsrScores, setHdsrScores] = useState<Record<string, number>>({});
  const [mmseScores, setMmseScores] = useState<Record<string, number>>({});

  const handleScore = useCallback(
    (type: 'hdsr' | 'mmse', id: string, value: number) => {
      if (type === 'hdsr') {
        setHdsrScores((prev) => ({ ...prev, [id]: value }));
        // 連動
        const linked = sharedMap[id];
        if (linked && mmseQuestions.find((q) => q.id === linked)) {
          const linkedQ = mmseQuestions.find((q) => q.id === linked)!;
          setMmseScores((prev) => ({ ...prev, [linked]: Math.min(value, linkedQ.maxScore) }));
        }
      } else {
        setMmseScores((prev) => ({ ...prev, [id]: value }));
        const linked = sharedMap[id];
        if (linked && hdsrQuestions.find((q) => q.id === linked)) {
          const linkedQ = hdsrQuestions.find((q) => q.id === linked)!;
          setHdsrScores((prev) => ({ ...prev, [linked]: Math.min(value, linkedQ.maxScore) }));
        }
      }
    },
    []
  );

  const hdsrTotal = hdsrQuestions.reduce((sum, q) => sum + (hdsrScores[q.id] ?? 0), 0);
  const mmseTotal = mmseQuestions.reduce((sum, q) => sum + (mmseScores[q.id] ?? 0), 0);
  const hdsrMax = hdsrQuestions.reduce((sum, q) => sum + q.maxScore, 0);
  const mmseMax = mmseQuestions.reduce((sum, q) => sum + q.maxScore, 0);

  const getHdsrJudge = (score: number) => {
    if (score >= 21) return { label: '正常（認知症の疑いなし）', color: 'text-green-400', category: 'I' };
    if (score >= 16) return { label: '軽度認知障害（MCI）疑い', color: 'text-yellow-400', category: 'II' };
    return { label: '認知症の疑いあり', color: 'text-red-400', category: 'III' };
  };

  const getMmseJudge = (score: number) => {
    if (score >= 24) return { label: '正常（認知症の疑いなし）', color: 'text-green-400', category: 'I' };
    if (score >= 20) return { label: '軽度認知障害（MCI）疑い', color: 'text-yellow-400', category: 'II' };
    return { label: '認知症の疑いあり', color: 'text-red-400', category: 'III' };
  };

  const hdsrJudge = getHdsrJudge(hdsrTotal);
  const mmseJudge = getMmseJudge(mmseTotal);

  // HbA1c目標カテゴリー（両方の判定の悪い方を採用）
  const categoryOrder = ['I', 'II', 'III'];
  const worstCategory = categoryOrder[Math.max(
    categoryOrder.indexOf(hdsrJudge.category),
    categoryOrder.indexOf(mmseJudge.category)
  )];

  const hba1cTarget: Record<string, { noSU: string; withSU: string }> = {
    'I':   { noSU: '7.0%未満', withSU: '65〜74歳：7.5%未満（下限6.5%）\n75歳以上：8.0%未満（下限7.0%）' },
    'II':  { noSU: '7.0%未満', withSU: '8.0%未満（下限7.0%）' },
    'III': { noSU: '8.0%未満', withSU: '8.5%未満（下限7.5%）' },
  };

  return (
    <div className="space-y-6">
      <AlertBox type="info" title="認知機能チェックと高齢者HbA1c目標">
        <p className="text-sm">HDS-R（長谷川式）またはMMSEを実施して合計点を入力すると、高齢者糖尿病のHbA1c目標カテゴリーが自動判定されます。共通する質問は片方に入力すると自動連動します。</p>
      </AlertBox>

      {/* スコア結果サマリー */}
      {(hdsrTotal > 0 || mmseTotal > 0) && (
        <Card className="bg-primary/10 border border-primary/40 p-4">
          <h3 className="font-bold text-primary mb-3">判定結果</h3>
          <div className="grid grid-cols-2 gap-3 mb-3">
            {hdsrTotal > 0 && (
              <div className="bg-card rounded p-3 text-center">
                <p className="text-xs text-muted-foreground">HDS-R</p>
                <p className="text-2xl font-bold text-primary">{hdsrTotal}<span className="text-sm text-muted-foreground">/{hdsrMax}</span></p>
                <p className={`text-xs font-semibold mt-1 ${hdsrJudge.color}`}>{hdsrJudge.label}</p>
              </div>
            )}
            {mmseTotal > 0 && (
              <div className="bg-card rounded p-3 text-center">
                <p className="text-xs text-muted-foreground">MMSE</p>
                <p className="text-2xl font-bold text-primary">{mmseTotal}<span className="text-sm text-muted-foreground">/{mmseMax}</span></p>
                <p className={`text-xs font-semibold mt-1 ${mmseJudge.color}`}>{mmseJudge.label}</p>
              </div>
            )}
          </div>
          <div className="bg-card rounded p-3">
            <p className="text-xs text-muted-foreground mb-1">高齢者糖尿病 HbA1c目標（カテゴリー {worstCategory}）</p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-green-950/20 border border-green-700/50 rounded p-2">
                <p className="text-green-400 font-semibold mb-1">SU薬・インスリンなし</p>
                <p className="font-bold">{hba1cTarget[worstCategory].noSU}</p>
              </div>
              <div className="bg-yellow-950/20 border border-yellow-700/50 rounded p-2">
                <p className="text-yellow-400 font-semibold mb-1">SU薬・インスリンあり</p>
                <p className="font-bold whitespace-pre-line">{hba1cTarget[worstCategory].withSU}</p>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* HDS-R */}
      <Card className="bg-card border-border p-4">
        <h3 className="font-semibold mb-1 text-primary text-base">長谷川式簡易知能評価スケール（HDS-R）</h3>
        <p className="text-xs text-muted-foreground mb-3">満点：{hdsrMax}点　カットオフ：20点以下で認知症疑い</p>
        <div className="space-y-3">
          {hdsrQuestions.map((q) => (
            <div key={q.id} className={`border rounded p-3 text-xs ${hdsrScores[q.id] !== undefined ? 'border-primary/50 bg-primary/5' : 'border-border/50'}`}>
              <div className="flex justify-between items-start gap-2 mb-2">
                <div className="flex-1">
                  <p className="font-medium">{q.text}</p>
                  <p className="text-muted-foreground mt-0.5">{q.detail}</p>
                  {q.sharedWith && <p className="text-primary/70 mt-0.5">※ MMSEと連動</p>}
                </div>
                <span className="text-muted-foreground whitespace-nowrap">最大{q.maxScore}点</span>
              </div>
              <div className="flex gap-1 flex-wrap">
                {Array.from({ length: q.maxScore + 1 }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => handleScore('hdsr', q.id, i)}
                    className={`w-8 h-8 rounded text-xs font-bold transition-colors ${
                      hdsrScores[q.id] === i
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted hover:bg-border'
                    }`}
                  >
                    {i}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 flex justify-between items-center bg-muted/20 rounded p-3">
          <span className="font-semibold">HDS-R 合計</span>
          <span className={`text-xl font-bold ${hdsrJudge.color}`}>{hdsrTotal} / {hdsrMax}点</span>
        </div>
        <div className="mt-2 space-y-1 text-xs text-muted-foreground">
          <p>• 20点以下：認知症の疑いあり（カテゴリーIII）</p>
          <p>• 21〜25点：軽度認知障害（MCI）疑い（カテゴリーII）</p>
          <p>• 26点以上：正常（カテゴリーI）</p>
        </div>
      </Card>

      {/* MMSE */}
      <Card className="bg-card border-border p-4">
        <h3 className="font-semibold mb-1 text-primary text-base">MMSE（Mini-Mental State Examination）</h3>
        <p className="text-xs text-muted-foreground mb-3">満点：{mmseMax}点　カットオフ：23点以下で認知症疑い</p>
        <div className="space-y-3">
          {mmseQuestions.map((q) => (
            <div key={q.id} className={`border rounded p-3 text-xs ${mmseScores[q.id] !== undefined ? 'border-primary/50 bg-primary/5' : 'border-border/50'}`}>
              <div className="flex justify-between items-start gap-2 mb-2">
                <div className="flex-1">
                  <p className="font-medium">{q.text}</p>
                  <p className="text-muted-foreground mt-0.5">{q.detail}</p>
                  {q.sharedWith && <p className="text-primary/70 mt-0.5">※ HDS-Rと連動</p>}
                </div>
                <span className="text-muted-foreground whitespace-nowrap">最大{q.maxScore}点</span>
              </div>
              <div className="flex gap-1 flex-wrap">
                {Array.from({ length: q.maxScore + 1 }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => handleScore('mmse', q.id, i)}
                    className={`w-8 h-8 rounded text-xs font-bold transition-colors ${
                      mmseScores[q.id] === i
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted hover:bg-border'
                    }`}
                  >
                    {i}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 flex justify-between items-center bg-muted/20 rounded p-3">
          <span className="font-semibold">MMSE 合計</span>
          <span className={`text-xl font-bold ${mmseJudge.color}`}>{mmseTotal} / {mmseMax}点</span>
        </div>
        <div className="mt-2 space-y-1 text-xs text-muted-foreground">
          <p>• 23点以下：認知症の疑いあり（カテゴリーIII）</p>
          <p>• 24〜27点：軽度認知障害（MCI）疑い（カテゴリーII）</p>
          <p>• 28点以上：正常（カテゴリーI）</p>
        </div>
      </Card>
    </div>
  );
}
