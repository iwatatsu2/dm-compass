import React from 'react';
import { AlertBox } from '@/components/AlertBox';
import { Card } from '@/components/ui/card';

export function Section2_Ketometer() {
  return (
    <div className="space-y-6">
      <Card className="bg-card border-border p-4">
        <h3 className="font-semibold mb-3 text-primary">β-HB（血液ケトン体）判定基準</h3>
        <div className="space-y-2 text-sm">
          <div className="grid grid-cols-3 gap-2 font-semibold border-b border-border pb-1 mb-1 text-xs">
            <span>β-HB値</span>
            <span>判定</span>
            <span>対応</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <span>&lt;0.6 mmol/L</span>
            <span className="text-green-400 font-semibold">正常</span>
            <span className="text-xs">経過観察</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <span>0.6〜1.5</span>
            <span className="text-yellow-400 font-semibold">軽度上昇</span>
            <span className="text-xs">補液・経過観察</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <span>1.5〜3.0</span>
            <span className="text-orange-400 font-semibold">中等度</span>
            <span className="text-xs">入院・インスリン</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <span>&gt;3.0 mmol/L</span>
            <span className="text-red-400 font-semibold">高度上昇</span>
            <span className="text-xs">DKA疑い・ICU</span>
          </div>
        </div>
      </Card>

      <AlertBox type="info" title="euDKA（ユーグリセミックDKA）の注意点">
        <div className="space-y-1 text-sm">
          <p>SGLT2阻害薬使用中は血糖が低くてもβ-HBが高値になることがある</p>
          <p>β-HB &gt;3.0 mmol/L かつ pH &lt;7.30 → DKAとして治療</p>
          <p>血糖が250 mg/dL未満でもDKAが成立する</p>
        </div>
      </AlertBox>

      <Card className="bg-card border-border p-4">
        <h3 className="font-semibold mb-2 text-primary">尿ケトン体との比較</h3>
        <div className="space-y-2 text-sm">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-semibold text-yellow-400 mb-1">血液β-HB（推奨）</p>
              <ul className="space-y-1 text-xs">
                <li>• 定量的で正確</li>
                <li>• リアルタイムで変動を追える</li>
                <li>• 治療効果の判定に有用</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-muted-foreground mb-1">尿ケトン体</p>
              <ul className="space-y-1 text-xs">
                <li>• 半定量（±〜3+）</li>
                <li>• 遅延あり（数時間前の状態）</li>
                <li>• euDKAでは偽陰性あり</li>
              </ul>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
