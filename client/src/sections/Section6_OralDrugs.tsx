import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { AlertBox } from '@/components/AlertBox';

const drugClasses = [
  {
    class: 'ビグアナイド薬',
    color: 'text-green-400',
    borderColor: 'border-green-700/50',
    bgColor: 'bg-green-950/10',
    drugs: [
      {
        generic: 'メトホルミン塩酸塩',
        brands: ['グリコラン', 'メデット', 'メトグルコ'],
        dose: '250〜750mg 分2〜3（最大2250mg）',
        contraindications: ['eGFR<30', '造影剤使用前後48時間', '重篤な肝障害', '過度の飲酒', '脱水・低酸素状態'],
        periop: '前日〜当日朝から休薬',
        restart: '食事・水分摂取再開後、腎機能確認後',
        renalAdj: 'eGFR 30〜45：慎重投与（減量）、eGFR<30：禁忌',
      },
    ],
  },
  {
    class: 'SGLT2阻害薬',
    color: 'text-blue-400',
    borderColor: 'border-blue-700/50',
    bgColor: 'bg-blue-950/10',
    drugs: [
      { generic: 'ダパグリフロジン', brands: ['フォシーガ'], dose: '5〜10mg 分1（朝）', contraindications: ['eGFR<45（血糖降下）', '1型糖尿病（適応外）', '頻回の尿路感染症'], periop: '3日前から休薬', restart: '食事再開後3日以上', renalAdj: 'eGFR<45：血糖降下効果消失（心腎保護は継続）' },
      { generic: 'エンパグリフロジン', brands: ['ジャディアンス'], dose: '10〜25mg 分1（朝）', contraindications: ['eGFR<30', '1型糖尿病'], periop: '3日前から休薬', restart: '食事再開後3日以上', renalAdj: 'eGFR<45：血糖降下効果消失' },
      { generic: 'カナグリフロジン', brands: ['カナグル'], dose: '100mg 分1（朝）', contraindications: ['eGFR<45', '透析患者'], periop: '3日前から休薬', restart: '食事再開後3日以上', renalAdj: 'eGFR<45：禁忌' },
      { generic: 'イプラグリフロジン', brands: ['スーグラ'], dose: '50〜100mg 分1（朝）', contraindications: ['eGFR<45'], periop: '3日前から休薬', restart: '食事再開後3日以上', renalAdj: 'eGFR<45：禁忌' },
      { generic: 'トホグリフロジン', brands: ['デベルザ', 'アプルウェイ'], dose: '20mg 分1（朝）', contraindications: ['eGFR<45'], periop: '3日前から休薬', restart: '食事再開後3日以上', renalAdj: 'eGFR<45：禁忌' },
      { generic: 'ルセオグリフロジン', brands: ['ルセフィ'], dose: '2.5〜5mg 分1（朝）', contraindications: ['eGFR<45'], periop: '3日前から休薬', restart: '食事再開後3日以上', renalAdj: 'eGFR<45：禁忌' },
    ],
  },
  {
    class: 'DPP-4阻害薬',
    color: 'text-yellow-400',
    borderColor: 'border-yellow-700/50',
    bgColor: 'bg-yellow-950/10',
    drugs: [
      { generic: 'シタグリプチン', brands: ['ジャヌビア', 'グラクティブ'], dose: '50〜100mg 分1', contraindications: ['重篤な腎障害（要減量）'], periop: '当日朝から休薬', restart: '食事再開後', renalAdj: 'eGFR 30〜45：25mg、eGFR<30：12.5mg' },
      { generic: 'ビルダグリプチン', brands: ['エクア'], dose: '50mg 分2', contraindications: ['重篤な腎障害', '肝障害（ALT/AST上昇注意）'], periop: '当日朝から休薬', restart: '食事再開後', renalAdj: 'eGFR<50：50mg 分1に減量' },
      { generic: 'アログリプチン', brands: ['ネシーナ'], dose: '25mg 分1', contraindications: ['重篤な腎障害（要減量）'], periop: '当日朝から休薬', restart: '食事再開後', renalAdj: 'eGFR 30〜60：12.5mg、eGFR<30：6.25mg' },
      { generic: 'リナグリプチン', brands: ['トラゼンタ'], dose: '5mg 分1', contraindications: ['なし（腎機能低下でも減量不要）'], periop: '当日朝から休薬', restart: '食事再開後', renalAdj: '腎機能に関わらず5mg（腎排泄なし）' },
      { generic: 'テネリグリプチン', brands: ['テネリア'], dose: '20〜40mg 分1', contraindications: ['重篤な腎障害（要減量）'], periop: '当日朝から休薬', restart: '食事再開後', renalAdj: 'eGFR<30：20mg' },
      { generic: 'オマリグリプチン', brands: ['マリゼブ'], dose: '25mg 週1回', contraindications: ['重篤な腎障害（要減量）'], periop: '当日朝から休薬', restart: '食事再開後', renalAdj: 'eGFR<30：12.5mg 週1回' },
      { generic: 'トレラグリプチン', brands: ['ザファテック'], dose: '100mg 週1回', contraindications: ['重篤な腎障害（要減量）'], periop: '当日朝から休薬', restart: '食事再開後', renalAdj: 'eGFR<30：25mg 週1回' },
      { generic: 'サキサグリプチン', brands: ['オングリザ'], dose: '5mg 分1', contraindications: ['重篤な腎障害（要減量）', '心不全（注意）'], periop: '当日朝から休薬', restart: '食事再開後', renalAdj: 'eGFR<50：2.5mg' },
    ],
  },
  {
    class: 'GLP-1受容体作動薬（注射）',
    color: 'text-violet-400',
    borderColor: 'border-violet-700/50',
    bgColor: 'bg-violet-950/10',
    drugs: [
      { generic: 'リラグルチド', brands: ['ビクトーザ'], dose: '0.3〜1.8mg 1日1回 皮下注', contraindications: ['重篤な消化器疾患', '甲状腺髄様癌の既往・家族歴', '多発性内分泌腫瘍症2型'], periop: '前日から休薬', restart: '食事再開後', renalAdj: 'eGFR<15：慎重投与' },
      { generic: 'エキセナチド', brands: ['バイエッタ'], dose: '5〜10μg 1日2回 皮下注（食前）', contraindications: ['重篤な腎障害（eGFR<30）', '重篤な消化器疾患'], periop: '前日から休薬', restart: '食事再開後', renalAdj: 'eGFR<30：禁忌' },
      { generic: 'エキセナチド（週1回）', brands: ['ビデュリオン'], dose: '2mg 週1回 皮下注', contraindications: ['重篤な腎障害（eGFR<30）'], periop: '前日から休薬', restart: '食事再開後', renalAdj: 'eGFR<30：禁忌' },
      { generic: 'デュラグルチド', brands: ['トルリシティ'], dose: '0.75mg 週1回 皮下注', contraindications: ['甲状腺髄様癌の既往・家族歴', '重篤な消化器疾患'], periop: '前日から休薬', restart: '食事再開後', renalAdj: '腎機能に関わらず同量' },
      { generic: 'セマグルチド（注射）', brands: ['オゼンピック'], dose: '0.25〜1mg 週1回 皮下注', contraindications: ['甲状腺髄様癌の既往・家族歴', '重篤な消化器疾患'], periop: '前日から休薬', restart: '食事再開後', renalAdj: '腎機能に関わらず同量' },
      { generic: 'リキシセナチド', brands: ['リキスミア'], dose: '10〜20μg 1日1回 皮下注（朝食前）', contraindications: ['重篤な腎障害（eGFR<30）'], periop: '前日から休薬', restart: '食事再開後', renalAdj: 'eGFR<30：禁忌' },
    ],
  },
  {
    class: 'GLP-1受容体作動薬（経口）',
    color: 'text-purple-400',
    borderColor: 'border-purple-700/50',
    bgColor: 'bg-purple-950/10',
    drugs: [
      { generic: 'セマグルチド（経口）', brands: ['リベルサス'], dose: '3〜14mg 分1（空腹時、水少量で服用後30分は飲食不可）', contraindications: ['重篤な消化器疾患', '甲状腺髄様癌の既往・家族歴'], periop: '前日から休薬', restart: '食事再開後', renalAdj: '腎機能に関わらず同量' },
    ],
  },
  {
    class: 'SU薬（スルホニル尿素薬）',
    color: 'text-orange-400',
    borderColor: 'border-orange-700/50',
    bgColor: 'bg-orange-950/10',
    drugs: [
      { generic: 'グリメピリド', brands: ['アマリール'], dose: '0.5〜6mg 分1〜2（朝食前後）', contraindications: ['重篤な腎障害', '重篤な肝障害', '高齢者は少量から'], periop: '当日朝から休薬', restart: '食事再開後', renalAdj: 'eGFR<30：禁忌（低血糖リスク）' },
      { generic: 'グリベンクラミド', brands: ['オイグルコン', 'ダオニール'], dose: '1.25〜10mg 分1〜2', contraindications: ['腎障害', '肝障害', '高齢者（低血糖リスク高い）'], periop: '当日朝から休薬', restart: '食事再開後', renalAdj: 'eGFR<30：禁忌' },
      { generic: 'グリクラジド', brands: ['グリミクロン'], dose: '40〜160mg 分1〜2', contraindications: ['重篤な腎障害', '肝障害'], periop: '当日朝から休薬', restart: '食事再開後', renalAdj: 'eGFR<30：禁忌' },
    ],
  },
  {
    class: 'グリニド薬（速効型インスリン分泌促進薬）',
    color: 'text-pink-400',
    borderColor: 'border-pink-700/50',
    bgColor: 'bg-pink-950/10',
    drugs: [
      { generic: 'ナテグリニド', brands: ['スターシス', 'ファスティック'], dose: '90mg 分3（毎食直前）', contraindications: ['重篤な腎障害', '肝障害'], periop: '当日から休薬', restart: '食事再開後', renalAdj: 'eGFR<30：禁忌' },
      { generic: 'ミチグリニド', brands: ['グルファスト'], dose: '10mg 分3（毎食直前）', contraindications: ['重篤な腎障害', '肝障害'], periop: '当日から休薬', restart: '食事再開後', renalAdj: 'eGFR<30：禁忌' },
      { generic: 'レパグリニド', brands: ['シュアポスト'], dose: '0.25〜1mg 分3（毎食直前）', contraindications: ['重篤な腎障害'], periop: '当日から休薬', restart: '食事再開後', renalAdj: 'eGFR<30：慎重投与' },
    ],
  },
  {
    class: 'α-グルコシダーゼ阻害薬',
    color: 'text-cyan-400',
    borderColor: 'border-cyan-700/50',
    bgColor: 'bg-cyan-950/10',
    drugs: [
      { generic: 'アカルボース', brands: ['グルコバイ'], dose: '150〜300mg 分3（毎食直前）', contraindications: ['重篤な腎障害', '肝障害', '消化器疾患（腸閉塞など）'], periop: '当日から休薬', restart: '食事再開後', renalAdj: 'eGFR<25：禁忌' },
      { generic: 'ボグリボース', brands: ['ベイスン'], dose: '0.6〜0.9mg 分3（毎食直前）', contraindications: ['重篤な腎障害', '肝障害'], periop: '当日から休薬', restart: '食事再開後', renalAdj: 'eGFR<25：禁忌' },
      { generic: 'ミグリトール', brands: ['セイブル'], dose: '150〜225mg 分3（毎食直前）', contraindications: ['重篤な腎障害'], periop: '当日から休薬', restart: '食事再開後', renalAdj: 'eGFR<30：禁忌' },
    ],
  },
  {
    class: 'チアゾリジン薬',
    color: 'text-teal-400',
    borderColor: 'border-teal-700/50',
    bgColor: 'bg-teal-950/10',
    drugs: [
      { generic: 'ピオグリタゾン', brands: ['アクトス'], dose: '15〜45mg 分1（朝食前後）', contraindications: ['心不全', '浮腫', '膀胱癌の既往', '肝障害', '骨粗鬆症（女性）'], periop: '当日朝から休薬', restart: '食事再開後', renalAdj: '腎機能低下でも使用可能（浮腫注意）' },
    ],
  },
];

export function Section6_OralDrugs() {
  const [expandedClass, setExpandedClass] = useState<string | null>(drugClasses[0]?.class || null);
  const [expandedDrug, setExpandedDrug] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      <AlertBox type="danger" title="SGLT2阻害薬 周術期注意">
        <div className="text-sm space-y-1">
          <p className="font-bold">手術3日前から必ず休薬！</p>
          <p>euDKA（血糖正常でもケトアシドーシス）のリスク。食事再開後3日以上経過してから再開。</p>
        </div>
      </AlertBox>

      <AlertBox type="warning" title="周術期の内服薬管理">
        <div className="text-sm space-y-1">
          <p>メトホルミン：造影剤使用前後48時間は休薬（乳酸アシドーシスリスク）</p>
          <p>GLP-1受容体作動薬：消化管運動抑制による誤嚥リスクのため前日から休薬</p>
        </div>
      </AlertBox>

      {drugClasses.map((dc) => (
        <Card key={dc.class} className={`border ${dc.borderColor} ${dc.bgColor} overflow-hidden`}>
          <button
            className="w-full text-left p-4 flex justify-between items-center"
            onClick={() => setExpandedClass(expandedClass === dc.class ? null : dc.class)}
          >
            <div>
              <span className={`font-bold text-base ${dc.color}`}>{dc.class}</span>
              <span className="text-xs text-muted-foreground ml-2">（{dc.drugs.length}薬剤）</span>
            </div>
            <span className="text-muted-foreground">{expandedClass === dc.class ? '▲' : '▼'}</span>
          </button>

          {expandedClass === dc.class && (
            <div className="px-4 pb-4 space-y-3">
              {dc.drugs.map((drug) => (
                <div key={drug.generic} className="border border-border/50 rounded overflow-hidden">
                  <button
                    className="w-full text-left p-3 flex justify-between items-center bg-card/50"
                    onClick={() => setExpandedDrug(expandedDrug === drug.generic ? null : drug.generic)}
                  >
                    <div>
                      <span className="font-semibold text-sm">{drug.generic}</span>
                      <span className="text-xs text-muted-foreground ml-2">
                        {drug.brands.join(' / ')}
                      </span>
                    </div>
                    <span className="text-muted-foreground text-xs">{expandedDrug === drug.generic ? '▲' : '▼'}</span>
                  </button>
                  {expandedDrug === drug.generic && (
                    <div className="p-3 space-y-2 text-xs bg-card/20">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <p className="text-muted-foreground">用量</p>
                          <p className="font-medium">{drug.dose}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">周術期休薬</p>
                          <p className="font-medium text-orange-400">{drug.periop}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">再開目安</p>
                          <p className="font-medium text-green-400">{drug.restart}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">腎機能調整</p>
                          <p className="font-medium text-blue-400">{drug.renalAdj}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-1">禁忌・注意</p>
                        <ul className="space-y-0.5">
                          {drug.contraindications.map((c, i) => (
                            <li key={i} className="text-red-400">• {c}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </Card>
      ))}
    </div>
  );
}
