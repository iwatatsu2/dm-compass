import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { AlertBox } from '@/components/AlertBox';

const insulinGroups = [
  {
    group: '超超速効型（faster-acting）',
    color: 'text-red-400',
    borderColor: 'border-red-700/50',
    bgColor: 'bg-red-950/10',
    insulins: [
      { name: 'フィアスプ注フレックスタッチ', generic: 'インスリン アスパルト（速効化）', onset: '2～4分', peak: '1～2時間', duration: '3～5時間', note: '最速の超速効型。食事開始2分前～食事開始後20分以内に投与' },
      { name: 'ルムジェブ注クイックペン', generic: 'インスリン リスプロ（速効化）', onset: '2～4分', peak: '1～2時間', duration: '3～5時間', note: '最速の超速効型。食事開始2分前～食事開始後20分以内に投与' },
    ],
  },
  {
    group: '超速効型',
    color: 'text-orange-400',
    borderColor: 'border-orange-700/50',
    bgColor: 'bg-orange-950/10',
    insulins: [
      { name: 'ノボラピッド注フレックスタッチ', generic: 'インスリン アスパルト', onset: '10～20分', peak: '1～3時間', duration: '3～5時間', note: '食直前に投与可。プレフィルド型ペン' },
      { name: 'ノボラピッド注イノレット', generic: 'インスリン アスパルト', onset: '10～20分', peak: '1～3時間', duration: '3～5時間', note: '高齢者・視力低下者向け大型ペン' },
      { name: 'ノボラピッド注フレックスペン', generic: 'インスリン アスパルト', onset: '10～20分', peak: '1～3時間', duration: '3～5時間', note: 'プレフィルド型ペン（旧型）' },
      { name: 'ヒューマログ注ミリオペン', generic: 'インスリン リスプロ', onset: '15～30分', peak: '0.5～1.5時間', duration: '2～5時間', note: '食直前に投与。プレフィルド型ペン' },
      { name: 'ヒューマログ注カートリッジ', generic: 'インスリン リスプロ', onset: '15～30分', peak: '0.5～1.5時間', duration: '2～5時間', note: 'カートリッジ式ペン用カートリッジ' },
      { name: 'アピドラ注ソロスター', generic: 'インスリン グルリジン', onset: '10～20分', peak: '1～2時間', duration: '3～5時間', note: '食直前に投与。プレフィルド型ペン' },
    ],
  },
  {
    group: '速効型（Regular）',
    color: 'text-yellow-400',
    borderColor: 'border-yellow-700/50',
    bgColor: 'bg-yellow-950/10',
    insulins: [
      { name: 'ヒューマリンR注100単位/mL', generic: 'インスリン ヒト（速効型）', onset: '30～60分', peak: '1～3時間', duration: '5～8時間', note: '食前30分投与。静脈内投与可。輸液混注・シリンジポンプに使用' },
      { name: 'ノボリンR注', generic: 'インスリン ヒト（速効型）', onset: '30～60分', peak: '1～3時間', duration: '5～8時間', note: '食前30分投与。静脈内投与可' },
    ],
  },
  {
    group: '中間型（NPH）',
    color: 'text-lime-400',
    borderColor: 'border-lime-700/50',
    bgColor: 'bg-lime-950/10',
    insulins: [
      { name: 'ヒューマリンN注', generic: 'ヒトインスリン（中間型）', onset: '1〜3時間', peak: '4〜10時間', duration: '12〜16時間', note: '混濁製剤。使用前に転倒混和' },
      { name: 'ノボリンN注', generic: 'ヒトインスリン（中間型）', onset: '1〜3時間', peak: '4〜12時間', duration: '12〜18時間', note: '混濁製剤。使用前に転倒混和' },
    ],
  },
  {
    group: '持効型溶解インスリン',
    color: 'text-blue-400',
    borderColor: 'border-blue-700/50',
    bgColor: 'bg-blue-950/10',
    insulins: [
      { name: 'ランタス注ソロスター', generic: 'インスリン グラルギン（100単位/mL）', onset: '1～2時間', peak: 'ほぼなし（フラット）', duration: '約24時間', note: '1日1回、毎日同じ時間に投与。他インスリンと混合禁忌' },
      { name: 'ランタスXR注ソロスター', generic: 'インスリン グラルギン（300単位/mL）', onset: '1～2時間', peak: 'ほぼなし（フラット）', duration: '約36時間', note: '高濃度製剤。低血糖リスク低下。1日1回' },
      { name: 'トレシーバ注フレックスタッチ', generic: 'インスリン デグルデク（100単位/mL）', onset: '1～2時間', peak: 'ほぼなし（フラット）', duration: '42時間以上', note: '1日1回。投与時間の変更が柔軟（同一日内なら変更可）' },
      { name: 'トレシーバ注200単位/mLフレックスタッチ', generic: 'インスリン デグルデク（200単位/mL）', onset: '1～2時間', peak: 'ほぼなし（フラット）', duration: '42時間以上', note: '高濃度製剤。多量のインスリンが必要な患者向け' },
      { name: 'レベミル注フレックスペン', generic: 'インスリン デテミル', onset: '1～2時間', peak: '3～9時間（緩やか）', duration: '6～23時間', note: '1～2回/日。体重増加が少ない' },
      { name: 'インスリン グラルギンBS注「リリー」', generic: 'インスリン グラルギン（バイオシミラー）', onset: '1～2時間', peak: 'ほぼなし', duration: '約24時間', note: 'ランタスのバイオシミラー。低コスト' },
    ],
  },
  {
    group: '週1回基礎インスリン',
    color: 'text-violet-400',
    borderColor: 'border-violet-700/50',
    bgColor: 'bg-violet-950/10',
    insulins: [
      { name: 'アウィクリ注', generic: 'インスリン イコデク', onset: '数日で定常状態', peak: 'ほぼなし', duration: '約1週間', note: '週1回投与。毎週同じ曜日に投与' },
    ],
  },
  {
    group: '混合型（超速効型ベース）',
    color: 'text-pink-400',
    borderColor: 'border-pink-700/50',
    bgColor: 'bg-pink-950/10',
    insulins: [
      { name: 'ノボラピッド30ミックス注', generic: 'アスパルト30% + 中間型70%', onset: '10〜20分', peak: '1〜4時間', duration: '約24時間', note: '食直前に投与。1〜2回/日' },
      { name: 'ノボラピッド50ミックス注', generic: 'アスパルト50% + 中間型50%', onset: '10〜20分', peak: '1〜4時間', duration: '約24時間', note: '食直前に投与。1〜2回/日' },
      { name: 'ノボラピッド70ミックス注', generic: 'アスパルト70% + 中間型30%', onset: '10〜20分', peak: '1〜4時間', duration: '約24時間', note: '食直前に投与。1〜2回/日' },
      { name: 'ヒューマログミックス25注', generic: 'リスプロ25% + 中間型75%', onset: '15〜30分', peak: '1〜4時間', duration: '約24時間', note: '食直前に投与。1〜2回/日' },
      { name: 'ヒューマログミックス50注', generic: 'リスプロ50% + 中間型50%', onset: '15〜30分', peak: '1〜4時間', duration: '約24時間', note: '食直前に投与。1〜2回/日' },
    ],
  },
  {
    group: '混合型（速効型ベース）',
    color: 'text-amber-400',
    borderColor: 'border-amber-700/50',
    bgColor: 'bg-amber-950/10',
    insulins: [
      { name: 'ノボリン30R注', generic: 'ヒトインスリン 速効型30% + 中間型70%', onset: '30〜60分', peak: '2〜8時間', duration: '約24時間', note: '食前30分に投与。1〜2回/日' },
      { name: 'ヒューマリン3/7注', generic: 'ヒトインスリン 速効型30% + 中間型70%', onset: '30〜60分', peak: '2〜8時間', duration: '約24時間', note: '食前30分に投与。1〜2回/日' },
      { name: 'イノレット30R注', generic: 'ヒトインスリン 速効型30% + 中間型70%', onset: '30〜60分', peak: '2〜8時間', duration: '約24時間', note: 'プレフィルド型' },
    ],
  },
  {
    group: '配合溶解型（持効型+超速効型）',
    color: 'text-indigo-400',
    borderColor: 'border-indigo-700/50',
    bgColor: 'bg-indigo-950/10',
    insulins: [
      { name: 'ライゾデグ配合注フレックスタッチ', generic: 'インスリン デグルデク70%+インスリン アスパルト30%', onset: '10～20分', peak: '1～3時間', duration: '42時間以上', note: '1日1～2回投与。基礎+食後血糖を同時管理。混濁しない' },
    ],
  },
  {
    group: '配合溶解型（GLP-1配合）',
    color: 'text-emerald-400',
    borderColor: 'border-emerald-700/50',
    bgColor: 'bg-emerald-950/10',
    insulins: [
      { name: 'ゾルトファイ配合注フレックスタッチ', generic: 'インスリン デグルデク + リラグルチド', onset: '1～2時間', peak: 'ほぼなし', duration: '約24時間', note: '1日1回。GLP-1配合で体重増加抑制。食欲抑制効果あり' },
      { name: 'ソリクア配合注ソロスター', generic: 'インスリン グラルギン + リキセナチド', onset: '1～2時間', peak: 'ほぼなし', duration: '約24時間', note: '1日1回朝食前投与。GLP-1配合。食後血糖改善効果あり' },
    ],
  },
];

export function Section7_InsulinGuide() {
  const [expandedGroup, setExpandedGroup] = useState<string | null>(insulinGroups[0]?.group || null);

  return (
    <div className="space-y-4">
      <AlertBox type="info" title="インスリン製剤の使い分けポイント">
        <div className="space-y-1 text-sm">
          <p><strong className="text-yellow-400">基礎インスリン</strong>：持効型（ランタス、トレシーバ）で空腹時血糖をコントロール</p>
          <p><strong className="text-orange-400">追加インスリン</strong>：超速効型（ノボラピッド、ヒューマログ）で食後血糖をコントロール</p>
          <p><strong className="text-pink-400">混合型</strong>：注射回数を減らしたい場合（1〜2回/日）</p>
          <p><strong className="text-violet-400">週1回製剤</strong>：アドヒアランス向上が必要な場合</p>
        </div>
      </AlertBox>

      {insulinGroups.map((group) => (
        <Card key={group.group} className={`border ${group.borderColor} ${group.bgColor} overflow-hidden`}>
          <button
            className="w-full text-left p-4 flex justify-between items-center"
            onClick={() => setExpandedGroup(expandedGroup === group.group ? null : group.group)}
          >
            <div>
              <span className={`font-bold text-sm ${group.color}`}>{group.group}</span>
              <span className="text-xs text-muted-foreground ml-2">（{group.insulins.length}製剤）</span>
            </div>
            <span className="text-muted-foreground">{expandedGroup === group.group ? '▲' : '▼'}</span>
          </button>

          {expandedGroup === group.group && (
            <div className="px-4 pb-4 space-y-3">
              {group.insulins.map((insulin) => (
                <div key={insulin.name} className="border border-border/40 rounded p-3 bg-card/30">
                  <p className="font-semibold text-sm mb-1">{insulin.name}</p>
                  <p className="text-xs text-muted-foreground mb-2">{insulin.generic}</p>
                  <div className="grid grid-cols-3 gap-2 text-xs mb-2">
                    <div>
                      <p className="text-muted-foreground">作用発現</p>
                      <p className="font-medium text-green-400">{insulin.onset}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">ピーク</p>
                      <p className="font-medium text-yellow-400">{insulin.peak}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">持続時間</p>
                      <p className="font-medium text-blue-400">{insulin.duration}</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground border-t border-border/30 pt-2">{insulin.note}</p>
                </div>
              ))}
            </div>
          )}
        </Card>
      ))}

      <AlertBox type="warning">
        <p className="text-sm">混合製剤・配合溶解型は使用前に転倒混和が必要な製剤があります。各製剤の添付文書を必ず確認してください。</p>
      </AlertBox>
    </div>
  );
}
