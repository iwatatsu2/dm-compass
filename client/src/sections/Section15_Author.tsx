import React from 'react';
import { Card } from '@/components/ui/card';

export function Section15_Author() {
  return (
    <div className="space-y-4">
      <Card className="bg-card border-border p-6">
        {/* イラスト（中央配置・200〜250px・レスポンシブ） */}
        <div className="flex justify-center mb-5">
          <img
            src="/dr-iwatatsu.jpg"
            alt="Dr.いわたつ イラスト"
            style={{ width: 'clamp(200px, 40vw, 250px)', height: 'auto' }}
            className="rounded-xl shadow-lg"
          />
        </div>

        {/* 製作者名 */}
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-primary mb-1">Dr.いわたつ</h2>
          <p className="text-sm text-muted-foreground">糖尿病・内分泌専門医</p>
        </div>

        {/* リンク一覧 */}
        <div className="space-y-3">
          {/* 公式サイト */}
          <div className="bg-muted/20 border border-border rounded-lg p-4">
            <p className="text-xs font-semibold text-muted-foreground mb-1">
              公式サイト（アプリ・研究・講演情報はこちら）
            </p>
            <a
              href="https://driwatatsu.readdy.co/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 underline underline-offset-2 text-sm font-medium break-all transition-colors"
            >
              https://driwatatsu.readdy.co/
            </a>
          </div>

          {/* Instagram */}
          <div className="bg-muted/20 border border-border rounded-lg p-4">
            <p className="text-xs font-semibold text-muted-foreground mb-1">Instagram</p>
            <a
              href="https://www.instagram.com/dr.iwatatsu/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 underline underline-offset-2 text-sm font-medium break-all transition-colors"
            >
              https://www.instagram.com/dr.iwatatsu/
            </a>
          </div>
        </div>

        {/* 免責事項 */}
        <div className="mt-6 bg-yellow-950/20 border border-yellow-700/40 rounded-lg p-4">
          <p className="text-xs font-semibold text-yellow-400 mb-2">【免責事項】</p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            本アプリは医療従事者向けの教育・参考目的で作成されています。
            掲載内容は作成時点の情報に基づいており、最新の添付文書・ガイドラインと異なる場合があります。
            最終的な治療判断は主治医の責任のもとで行ってください。
            本アプリの使用により生じた損害について、制作者は一切の責任を負いません。
          </p>
        </div>

        {/* 参考資料 */}
        <div className="mt-4 bg-blue-950/20 border border-blue-700/40 rounded-lg p-4">
          <p className="text-xs font-semibold text-blue-400 mb-2">【参考ガイドライン】</p>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• 日本糖尿病学会「糖尿病治療ガイド 2022-2023」</li>
            <li>• 日本老年医学会「高齢者糖尿病診療ガイドライン 2023」</li>
            <li>• 日本糖尿病学会「SPIDDM診断基準 2023年改訂版」</li>
            <li>• 各薬剤添付文書（2026年2月時点）</li>
          </ul>
        </div>

        {/* バージョン */}
        <div className="mt-4 text-center">
          <p className="text-xs text-muted-foreground/50">DM compass ver 2.0 ／ 2026年2月</p>
        </div>
      </Card>
    </div>
  );
}
