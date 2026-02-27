import React, { useState } from 'react';
import { AlertBox } from '@/components/AlertBox';
import { Card } from '@/components/ui/card';

export function Section5_T2DAlgorithm() {
  return (
    <div className="space-y-4">
      <AlertBox type="info" title="2型糖尿病治療アルゴリズム">
        <p className="text-sm">
          日本糖尿病学会 2023年版ガイドラインに基づいた段階的治療戦略を示しています。
          患者個別の状況（年齢、腎機能、心血管リスク、低血糖リスク）を考慮して治療選択を行ってください。
        </p>
      </AlertBox>

      <Card className="bg-card border-border p-6">
        <h3 className="font-semibold mb-4 text-primary text-base">2型糖尿病治療アルゴリズム フローチャート</h3>
        
        {/* アルゴリズムを図形式で表示 */}
        <div className="space-y-4 text-xs">
          {/* ステップ1 */}
          <div className="flex flex-col items-center">
            <div className="w-full max-w-md bg-blue-950/30 border border-blue-700/50 rounded-lg p-4 text-center">
              <p className="font-semibold text-blue-400 mb-2">2型糖尿病と診断</p>
              <p className="text-muted-foreground">HbA1c、血糖値、症状から診断確定</p>
            </div>
            <div className="text-blue-400 text-2xl my-2">↓</div>
          </div>

          {/* ステップ2 */}
          <div className="flex flex-col items-center">
            <div className="w-full max-w-md bg-green-950/30 border border-green-700/50 rounded-lg p-4">
              <p className="font-semibold text-green-400 mb-2">ステップ1：生活習慣改善</p>
              <ul className="space-y-1 text-muted-foreground">
                <li>• 食事療法（栄養指導）</li>
                <li>• 運動療法（週150分以上の中等度運動）</li>
                <li>• 体重管理（5～10%の減量目標）</li>
                <li>• 禁煙・ストレス管理</li>
              </ul>
            </div>
            <div className="text-green-400 text-2xl my-2">↓</div>
            <p className="text-muted-foreground text-xs">3ヶ月後の効果判定</p>
            <div className="text-green-400 text-2xl my-2">↓</div>
          </div>

          {/* ステップ3 */}
          <div className="flex flex-col items-center">
            <div className="w-full max-w-md bg-yellow-950/30 border border-yellow-700/50 rounded-lg p-4">
              <p className="font-semibold text-yellow-400 mb-2">ステップ2：薬物療法開始</p>
              <p className="text-muted-foreground mb-2">第一選択薬（個別化に基づいて選択）</p>
              <div className="space-y-2 text-muted-foreground">
                <div className="bg-background/50 p-2 rounded">
                  <p className="font-semibold text-yellow-300">心血管・腎臓保護が必要な場合</p>
                  <p>SGLT2阻害薬 または GLP-1受容体作動薬</p>
                </div>
                <div className="bg-background/50 p-2 rounded">
                  <p className="font-semibold text-yellow-300">低血糖リスクが低い場合</p>
                  <p>メトホルミン（第一選択）</p>
                </div>
                <div className="bg-background/50 p-2 rounded">
                  <p className="font-semibold text-yellow-300">その他の選択肢</p>
                  <p>DPP-4阻害薬、αGI、チアゾリジン、SU薬</p>
                </div>
              </div>
            </div>
            <div className="text-yellow-400 text-2xl my-2">↓</div>
            <p className="text-muted-foreground text-xs">3ヶ月後の効果判定</p>
            <div className="text-yellow-400 text-2xl my-2">↓</div>
          </div>

          {/* ステップ4 */}
          <div className="flex flex-col items-center">
            <div className="w-full max-w-md bg-orange-950/30 border border-orange-700/50 rounded-lg p-4">
              <p className="font-semibold text-orange-400 mb-2">ステップ3：薬物療法の強化</p>
              <p className="text-muted-foreground mb-2">目標HbA1cに達しない場合は以下から選択</p>
              <ul className="space-y-1 text-muted-foreground">
                <li>• 既存薬の増量</li>
                <li>• 他の薬剤クラスの追加（2剤併用）</li>
                <li>• 配合剤の使用</li>
                <li>• 3剤以上の併用も検討</li>
              </ul>
            </div>
            <div className="text-orange-400 text-2xl my-2">↓</div>
            <p className="text-muted-foreground text-xs">3ヶ月後の効果判定</p>
            <div className="text-orange-400 text-2xl my-2">↓</div>
          </div>

          {/* ステップ5 */}
          <div className="flex flex-col items-center">
            <div className="w-full max-w-md bg-red-950/30 border border-red-700/50 rounded-lg p-4">
              <p className="font-semibold text-red-400 mb-2">ステップ4：インスリン療法開始</p>
              <p className="text-muted-foreground mb-2">以下の場合はインスリン導入を検討</p>
              <ul className="space-y-1 text-muted-foreground">
                <li>• 経口薬の最大量でもHbA1c目標未達</li>
                <li>• 急激な血糖上昇がある場合</li>
                <li>• 膵β細胞機能が著しく低下している場合</li>
                <li>• シックデイ・周術期・妊娠時</li>
              </ul>
            </div>
          </div>
        </div>
      </Card>

      {/* 治療選択の考慮事項 */}
      <Card className="bg-card border-border p-4">
        <h3 className="font-semibold mb-3 text-primary text-base">薬剤選択時の重要な考慮事項</h3>
        <div className="space-y-2 text-xs">
          <div className="bg-green-950/20 border border-green-700/50 rounded p-3">
            <p className="font-semibold text-green-400 mb-1">心血管疾患・CKD患者</p>
            <p className="text-muted-foreground">SGLT2阻害薬 または GLP-1受容体作動薬を優先</p>
          </div>
          <div className="bg-yellow-950/20 border border-yellow-700/50 rounded p-3">
            <p className="font-semibold text-yellow-400 mb-1">高齢者（65歳以上）</p>
            <p className="text-muted-foreground">低血糖リスク・腎機能・ポリファーマシーを考慮</p>
          </div>
          <div className="bg-blue-950/20 border border-blue-700/50 rounded p-3">
            <p className="font-semibold text-blue-400 mb-1">腎機能低下患者</p>
            <p className="text-muted-foreground">eGFRに応じた用量調整・薬剤選択が必須</p>
          </div>
          <div className="bg-red-950/20 border border-red-700/50 rounded p-3">
            <p className="font-semibold text-red-400 mb-1">低血糖リスク</p>
            <p className="text-muted-foreground">SU薬・グリニド薬は慎重投与。SGLT2・DPP-4・αGIは低血糖リスク低い</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
