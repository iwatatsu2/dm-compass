import React from 'react';
import { Card } from '@/components/ui/card';
import { AlertBox } from '@/components/AlertBox';

type DrugDef = {
  generic: string;
  brands: string[];
  dose: string;
  contraindications: string[];
  periop: string;
  restart: string;
  renalAdj: string;
};

type DrugClassDef = {
  class: string;
  color: string;
  borderColor: string;
  bgColor: string;
  drugs: DrugDef[];
};

const drugClasses: DrugClassDef[] = [
  {
    class: 'ビグアナイド薬',
    color: 'text-green-400',
    borderColor: 'border-green-700/50',
    bgColor: 'bg-green-950/10',
    drugs: [
      { generic: 'メトホルミン', brands: ['メトグルコ', 'グリコラン', 'ジベトス'], dose: '500〜2250mg 分2〜3（食直後）', contraindications: ['eGFR<30（禁忌）', '造影剤使用前後48h休薬', '重篤な肝障害', '心不全', '過度のアルコール摂取'], periop: '当日朝から休薬', restart: '食事再開後（腎機能確認後）', renalAdj: 'eGFR 30〜45：最大750mg/日・慎重投与、eGFR<30：禁忌' },
    ],
  },
  {
    class: 'SGLT2阻害薬',
    color: 'text-blue-400',
    borderColor: 'border-blue-700/50',
    bgColor: 'bg-blue-950/10',
    drugs: [
      { generic: 'ダパグリフロジン', brands: ['フォシーガ'], dose: '5〜10mg 分1（朝）', contraindications: ['eGFR<30（2型DM）', '尿路感染・性器感染に注意', '脱水・低血圧に注意'], periop: '3日前から休薬', restart: '少なくとも数日間は十分な経口摂取と全身状態の安定を確認してから再開', renalAdj: '2型DM：eGFR≥30で開始可、<30：新規開始しない。CKD：eGFR≥25で10mg固定' },
      { generic: 'エンパグリフロジン', brands: ['ジャディアンス'], dose: '10〜25mg 分1（朝）', contraindications: ['eGFR<30（2型DM）', '尿路感染・性器感染に注意', '脱水・低血圧に注意'], periop: '3日前から休薬', restart: '少なくとも数日間は十分な経口摂取と全身状態の安定を確認してから再開', renalAdj: '2型DM：eGFR≥30で開始可。心不全・CKD：eGFR≥20で使用可' },
      { generic: 'カナグリフロジン', brands: ['カナグル'], dose: '100mg 分1（朝）', contraindications: ['eGFR<30（2型DM）', '尿路感染・性器感染に注意'], periop: '3日前から休薬', restart: '少なくとも数日間は十分な経口摂取と全身状態の安定を確認してから再開', renalAdj: '2型DM：eGFR≥30で開始可。CKD：eGFR≥30で使用可' },
      { generic: 'イプラグリフロジン', brands: ['スーグラ'], dose: '50mg 分1（朝）', contraindications: ['eGFR<30：使用しない', '尿路感染・性器感染に注意'], periop: '3日前から休薬', restart: '少なくとも数日間は十分な経口摂取と全身状態の安定を確認してから再開', renalAdj: 'eGFR 30〜59：慎重投与（効果減弱）、eGFR<30：使用しない' },
      { generic: 'ルセオグリフロジン', brands: ['ルセフィ'], dose: '2.5〜5mg 分1（朝）', contraindications: ['eGFR<30：使用しない', '尿路感染・性器感染に注意'], periop: '3日前から休薬', restart: '少なくとも数日間は十分な経口摂取と全身状態の安定を確認してから再開', renalAdj: 'eGFR 30〜59：慎重投与（効果減弱）、eGFR<30：使用しない' },
      { generic: 'トホグリフロジン', brands: ['デベルザ', 'アプルウェイ'], dose: '20mg 分1（朝）', contraindications: ['eGFR<30：原則開始しない', '尿路感染・性器感染に注意'], periop: '3日前から休薬', restart: '少なくとも数日間は十分な経口摂取と全身状態の安定を確認してから再開', renalAdj: 'eGFR 30〜59：慎重投与（効果減弱）、eGFR<30：原則開始しない' },
    ],
  },
  {
    class: 'DPP-4阻害薬',
    color: 'text-yellow-400',
    borderColor: 'border-yellow-700/50',
    bgColor: 'bg-yellow-950/10',
    drugs: [
      { generic: 'シタグリプチン', brands: ['ジャヌビア', 'グラクティブ'], dose: '50〜100mg 分1（朝）', contraindications: ['重篤な腎障害（要減量）'], periop: '当日朝から休薬', restart: '食事再開後', renalAdj: 'eGFR 30〜50：50mg、eGFR<30：25mg' },
      { generic: 'ビルダグリプチン', brands: ['エクア'], dose: '50mg 分2（朝夕）', contraindications: ['重篤な腎障害', '肝障害（ALT/AST上昇注意）'], periop: '当日朝から休薬', restart: '食事再開後', renalAdj: 'eGFR<50：50mg 分1に減量' },
      { generic: 'アログリプチン', brands: ['ネシーナ'], dose: '25mg 分1（朝）', contraindications: ['重篤な腎障害（要減量）'], periop: '当日朝から休薬', restart: '食事再開後', renalAdj: 'eGFR 30〜60：12.5mg、eGFR<30：6.25mg' },
      { generic: 'リナグリプチン', brands: ['トラゼンタ'], dose: '5mg 分1（朝）', contraindications: ['なし（腎機能低下でも減量不要）'], periop: '当日朝から休薬', restart: '食事再開後', renalAdj: '腎機能に関わらず5mg（胆汁排泄型）' },
      { generic: 'テネリグリプチン', brands: ['テネリア'], dose: '20〜40mg 分1（朝）', contraindications: ['重篤な腎障害（要減量）'], periop: '当日朝から休薬', restart: '食事再開後', renalAdj: 'eGFR<30：20mg' },
      { generic: 'オマリグリプチン', brands: ['マリゼブ'], dose: '25mg 週1回（朝）', contraindications: ['重篤な腎障害（要減量）'], periop: '当日朝から休薬', restart: '食事再開後', renalAdj: 'eGFR<45：12.5mg 週1回' },
      { generic: 'トレラグリプチン', brands: ['ザファテック'], dose: '100mg 週1回（朝）', contraindications: ['重篤な腎障害（要減量）'], periop: '当日朝から休薬', restart: '食事再開後', renalAdj: 'eGFR 30〜45：50mg 週1回、eGFR<30：25mg 週1回' },
      { generic: 'サキサグリプチン', brands: ['オングリザ'], dose: '2.5〜5mg 分1（朝）', contraindications: ['重篤な腎障害（要減量）', '心不全（注意）'], periop: '当日朝から休薬', restart: '食事再開後', renalAdj: 'eGFR<50：2.5mg' },
      { generic: 'アナグリプチン', brands: ['スイニー'], dose: '200〜400mg 分2（朝夕）', contraindications: ['重篤な腎障害（要減量）'], periop: '当日朝から休薬', restart: '食事再開後', renalAdj: 'eGFR<45：100mg 分2' },
    ],
  },
  {
    class: 'GLP-1受容体作動薬（注射）',
    color: 'text-violet-400',
    borderColor: 'border-violet-700/50',
    bgColor: 'bg-violet-950/10',
    drugs: [
      { generic: 'リラグルチド', brands: ['ビクトーザ'], dose: '0.3〜1.8mg 1日1回 皮下注', contraindications: ['重篤な消化器疾患', '甲状腺髄様癌の既往・家族歴', '多発性内分泌腫瘍症2型'], periop: '前日から休薬', restart: '少なくとも数日間は十分な経口摂取と全身状態の安定を確認してから再開', renalAdj: 'eGFR<15：慎重投与' },
      { generic: 'エキセナチド', brands: ['バイエッタ'], dose: '5〜10μg 1日2回 皮下注（食前）', contraindications: ['重篤な腎障害（eGFR<30）', '重篤な消化器疾患'], periop: '前日から休薬', restart: '少なくとも数日間は十分な経口摂取と全身状態の安定を確認してから再開', renalAdj: 'eGFR<30：禁忌' },
      { generic: 'エキセナチド（週1回）', brands: ['ビデュリオン'], dose: '2mg 週1回 皮下注', contraindications: ['重篤な腎障害（eGFR<30）'], periop: '前日から休薬', restart: '少なくとも数日間は十分な経口摂取と全身状態の安定を確認してから再開', renalAdj: 'eGFR<30：禁忌' },
      { generic: 'デュラグルチド', brands: ['トルリシティ'], dose: '0.75mg 週1回 皮下注', contraindications: ['甲状腺髄様癌の既往・家族歴', '重篤な消化器疾患'], periop: '前日から休薬', restart: '少なくとも数日間は十分な経口摂取と全身状態の安定を確認してから再開', renalAdj: '腎機能に関わらず同量' },
      { generic: 'セマグルチド（注射）', brands: ['オゼンピック'], dose: '0.25〜1mg 週1回 皮下注', contraindications: ['甲状腺髄様癌の既往・家族歴', '重篤な消化器疾患'], periop: '前日から休薬', restart: '少なくとも数日間は十分な経口摂取と全身状態の安定を確認してから再開', renalAdj: '腎機能に関わらず同量' },
      { generic: 'リキシセナチド', brands: ['リキスミア'], dose: '10〜20μg 1日1回 皮下注（朝食前）', contraindications: ['重篤な腎障害（eGFR<30）'], periop: '前日から休薬', restart: '少なくとも数日間は十分な経口摂取と全身状態の安定を確認してから再開', renalAdj: 'eGFR<30：禁忌' },
    ],
  },
  {
    class: 'GLP-1受容体作動薬（経口）',
    color: 'text-purple-400',
    borderColor: 'border-purple-700/50',
    bgColor: 'bg-purple-950/10',
    drugs: [
      { generic: 'セマグルチド（経口）', brands: ['リベルサス'], dose: '3〜14mg 分1（空腹時、水少量で服用後30分は飲食不可）', contraindications: ['重篤な消化器疾患', '甲状腺髄様癌の既往・家族歴'], periop: '前日から休薬', restart: '少なくとも数日間は十分な経口摂取と全身状態の安定を確認してから再開', renalAdj: '腎機能に関わらず同量' },
    ],
  },
  {
    class: 'SU薬（スルホニル尿素薬）',
    color: 'text-orange-400',
    borderColor: 'border-orange-700/50',
    bgColor: 'bg-orange-950/10',
    drugs: [
      { generic: 'グリメピリド', brands: ['アマリール'], dose: '0.5〜6mg 分1〜2（朝食前後）', contraindications: ['重篤な腎障害', '重篤な肝障害', '高齢者は少量から（低血糖リスク）'], periop: '当日朝から休薬', restart: '食事再開後', renalAdj: 'eGFR 30〜60：慎重投与、eGFR<30：禁忌' },
      { generic: 'グリベンクラミド', brands: ['オイグルコン', 'ダオニール'], dose: '1.25〜10mg 分1〜2', contraindications: ['腎障害（活性代謝物蓄積）', '肝障害', '高齢者（低血糖リスク高い）'], periop: '当日朝から休薬', restart: '食事再開後', renalAdj: 'eGFR<60：禁忌（活性代謝物蓄積）' },
      { generic: 'グリクラジド', brands: ['グリミクロン'], dose: '40〜160mg 分1〜2', contraindications: ['重篤な腎障害', '肝障害'], periop: '当日朝から休薬', restart: '食事再開後', renalAdj: 'eGFR 30〜60：慎重投与、eGFR<30：禁忌' },
    ],
  },
  {
    class: 'グリニド薬（速効型インスリン分泌促進薬）',
    color: 'text-pink-400',
    borderColor: 'border-pink-700/50',
    bgColor: 'bg-pink-950/10',
    drugs: [
      { generic: 'ナテグリニド', brands: ['スターシス', 'ファスティック'], dose: '90mg 分3（毎食直前）', contraindications: ['重篤な腎障害', '肝障害'], periop: '当日から休薬', restart: '食事再開後', renalAdj: 'eGFR≥60：1回90〜120mg、eGFR<60：慎重投与' },
      { generic: 'ミチグリニド', brands: ['グルファスト'], dose: '10mg 分3（毎食直前）', contraindications: ['重篤な腎障害', '肝障害'], periop: '当日から休薬', restart: '食事再開後', renalAdj: 'eGFR 30〜59：1回2.5〜10mg、eGFR<30：慎重投与' },
      { generic: 'レパグリニド', brands: ['シュアポスト'], dose: '0.25〜1mg 分3（毎食直前）', contraindications: ['重篤な腎障害（慎重）'], periop: '当日から休薬', restart: '食事再開後', renalAdj: '全域：慎重投与（胆汁排泄主体）※現在販売中止' },
    ],
  },
  {
    class: 'α-グルコシダーゼ阻害薬',
    color: 'text-cyan-400',
    borderColor: 'border-cyan-700/50',
    bgColor: 'bg-cyan-950/10',
    drugs: [
      { generic: 'アカルボース', brands: ['グルコバイ'], dose: '150〜300mg 分3（毎食直前）', contraindications: ['重篤な腎障害', '肝障害', '消化器疾患（腸閉塞など）', '腹部オペ後は再開しない（イレウスリスク）'], periop: '当日から休薬', restart: '食事再開後（腹部オペ後は再開しない）', renalAdj: '全域：慎重投与 ※販売中止' },
      { generic: 'ボグリボース', brands: ['ベイスン'], dose: '0.6〜0.9mg 分3（毎食直前）', contraindications: ['重篤な腎障害', '肝障害', '腹部オペ後は再開しない（イレウスリスク）'], periop: '当日から休薬', restart: '食事再開後（腹部オペ後は再開しない）', renalAdj: '全域：慎重投与' },
      { generic: 'ミグリトール', brands: ['セイブル'], dose: '150〜225mg 分3（毎食直前）', contraindications: ['重篤な腎障害（腎排泄型）', '腹部オペ後は再開しない（イレウスリスク）'], periop: '当日から休薬', restart: '食事再開後（腹部オペ後は再開しない）', renalAdj: '全域：慎重投与（腎排泄型）' },
    ],
  },
  {
    class: 'チアゾリジン薬',
    color: 'text-teal-400',
    borderColor: 'border-teal-700/50',
    bgColor: 'bg-teal-950/10',
    drugs: [
      { generic: 'ピオグリタゾン', brands: ['アクトス'], dose: '15〜45mg 分1（朝食前後）', contraindications: ['心不全', '浮腫', '膀胱癌の既往', '肝障害', '骨粗鬆症（女性）'], periop: '当日朝から休薬', restart: '食事再開後', renalAdj: 'eGFR≥60：15〜45mg（浮腫注意）、eGFR<60：慎重投与、透析：禁忌' },
    ],
  },
  {
    class: 'イメグリミン（ミトコンドリア機能改善薬）',
    color: 'text-emerald-400',
    borderColor: 'border-emerald-700/50',
    bgColor: 'bg-emerald-950/10',
    drugs: [
      { generic: 'イメグリミン', brands: ['ツイミーグ'], dose: '1000mg 分2（朝夕食前後）', contraindications: ['重篤な腎障害（eGFR<15：禁忌）', '重篤な肝障害'], periop: '当日朝から休薬', restart: '食事再開後', renalAdj: 'eGFR 30〜45：慎重投与、eGFR 15〜30：500mg 分2、eGFR<15：禁忌' },
    ],
  },
];

export function Section6_OralDrugs() {
  return (
    <div className="space-y-4">
      <AlertBox type="danger" title="SGLT2阻害薬 周術期注意">
        <div className="text-sm space-y-1">
          <p className="font-bold">手術3日前から必ず休薬！</p>
          <p>euDKA（血糖正常でもケトアシドーシス）のリスク。少なくとも数日間は十分な経口摂取と全身状態の安定を確認してから再開する。</p>
          <p className="text-yellow-300 font-semibold">⚠ 脳梗塞後の患者への新規投与は脱水を契機に再度脳梗塞になるリスクがあるため慎重投与が必要。</p>
        </div>
      </AlertBox>
      <AlertBox type="warning" title="周術期の内服薬管理">
        <div className="text-sm space-y-1">
          <p>メトホルミン：造影剤使用前後48時間は休薬（乳酸アシドーシスリスク）</p>
          <p>GLP-1受容体作動薬：消化管運動抑制による誤嚥リスクのため前日から休薬。少なくとも数日間は十分な経口摂取と全身状態の安定を確認してから再開する。</p>
          <p>α-GI：腹部オペ後は再開しない（イレウスリスク）</p>
        </div>
      </AlertBox>

      {/* 腎機能ドーズ確認ボタン */}
      <div className="flex items-center gap-3 bg-primary/10 border border-primary/40 rounded-lg p-3">
        <div className="flex-1">
          <p className="text-sm font-semibold text-primary">腎機能別投与量を詳しく確認</p>
          <p className="text-xs text-muted-foreground">Dr.いわたつ「Renal Dose Navigator」で詳細な腎機能別投与量を確認できます</p>
        </div>
        <a
          href="https://iwatatsu2.github.io/dr-iwatatsu-dm-renal-tool/"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-primary text-primary-foreground text-xs font-bold px-4 py-2 rounded-lg hover:opacity-90 transition-opacity whitespace-nowrap"
        >
          腎機能Dose確認 →
        </a>
      </div>

      {/* 薬剤一覧（折りたたみなし・常時表示） */}
      {drugClasses.map((dc) => (
        <Card key={dc.class} className={`border ${dc.borderColor} ${dc.bgColor} overflow-hidden`}>
          <div className="p-3 border-b border-border/30">
            <span className={`font-bold text-base ${dc.color}`}>{dc.class}</span>
            <span className="text-xs text-muted-foreground ml-2">（{dc.drugs.length}薬剤）</span>
          </div>
          <div className="divide-y divide-border/30">
            {dc.drugs.map((drug) => (
              <div key={drug.generic} className="p-3">
                <div className="flex flex-wrap items-baseline gap-x-2 mb-2">
                  <span className="font-bold text-sm text-foreground">{drug.generic}</span>
                  <span className="text-xs text-muted-foreground">{drug.brands.join(' / ')}</span>
                </div>
                <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-xs">
                  <div>
                    <span className="text-muted-foreground">用法用量：</span>
                    <span className="font-medium">{drug.dose}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">腎機能調整：</span>
                    <span className="font-medium text-blue-400">{drug.renalAdj}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">周術期休薬：</span>
                    <span className="font-medium text-orange-400">{drug.periop}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">再開目安：</span>
                    <span className="font-medium text-green-400">{drug.restart}</span>
                  </div>
                </div>
                {drug.contraindications.length > 0 && (
                  <div className="mt-1.5 flex flex-wrap gap-1">
                    {drug.contraindications.map((c, i) => (
                      <span key={i} className="text-xs text-red-400 bg-red-950/20 border border-red-800/40 rounded px-1.5 py-0.5">⚠ {c}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
}
