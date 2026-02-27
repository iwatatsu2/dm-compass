import { Card } from '@/components/ui/card';
import { AlertBox } from '@/components/AlertBox';
import { ExternalLink, Github, Mail } from 'lucide-react';

export function Section14_About() {
  return (
    <div className="space-y-4">
      <AlertBox type="info" title="このアプリについて">
        <p className="text-sm">
          dm-compass は、糖尿病診療を支援するための包括的なデジタルツールです。
          診断基準、治療アルゴリズム、薬剤情報、インスリン計算など、日常診療に必要な情報を一元管理できます。
        </p>
      </AlertBox>

      {/* 製作者情報 */}
      <Card className="bg-card border-border p-4">
        <h3 className="font-semibold mb-3 text-primary text-base">製作者</h3>
        <div className="flex items-start gap-4">
          {/* イラスト */}
          <div className="flex-shrink-0">
            <div className="w-24 h-24 bg-muted rounded-lg flex items-center justify-center">
              <div className="text-center">
                <p className="text-2xl">👨‍⚕️</p>
                <p className="text-xs text-muted-foreground mt-1">Dr.いわたつ</p>
              </div>
            </div>
          </div>
          
          {/* 情報 */}
          <div className="flex-1">
            <p className="font-semibold text-lg mb-1">Dr.いわたつ</p>
            <p className="text-sm text-muted-foreground mb-3">
              内分泌・代謝疾患専門医<br/>
              糖尿病診療・教育を専門とする医師
            </p>
            <div className="space-y-2 text-sm">
              <p className="text-muted-foreground">
                <span className="font-semibold text-foreground">専門分野：</span> 2型糖尿病、1型糖尿病、高齢者糖尿病、周術期血糖管理
              </p>
              <p className="text-muted-foreground">
                <span className="font-semibold text-foreground">資格：</span> 日本糖尿病学会認定糖尿病専門医、日本内科学会認定医
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* 参考資料・ガイドライン */}
      <Card className="bg-card border-border p-4">
        <h3 className="font-semibold mb-3 text-primary text-base">参考資料・ガイドライン</h3>
        <div className="space-y-2 text-sm">
          <div className="bg-blue-950/20 border border-blue-700/50 rounded p-3">
            <p className="font-semibold text-blue-400 mb-1 flex items-center gap-2">
              <ExternalLink className="w-4 h-4" />
              日本糖尿病学会
            </p>
            <ul className="space-y-1 text-muted-foreground ml-6">
              <li>• 糖尿病治療ガイド 2018-2019</li>
              <li>• 糖尿病診療ガイドライン 2023年版</li>
              <li>• 糖尿病と妊娠に関する診療ガイドライン</li>
            </ul>
          </div>

          <div className="bg-green-950/20 border border-green-700/50 rounded p-3">
            <p className="font-semibold text-green-400 mb-1 flex items-center gap-2">
              <ExternalLink className="w-4 h-4" />
              日本老年医学会
            </p>
            <ul className="space-y-1 text-muted-foreground ml-6">
              <li>• 高齢者糖尿病診療ガイド 2017年版</li>
              <li>• 高齢者糖尿病の血糖コントロール目標</li>
            </ul>
          </div>

          <div className="bg-yellow-950/20 border border-yellow-700/50 rounded p-3">
            <p className="font-semibold text-yellow-400 mb-1 flex items-center gap-2">
              <ExternalLink className="w-4 h-4" />
              その他の参考資料
            </p>
            <ul className="space-y-1 text-muted-foreground ml-6">
              <li>• 日本腎臓学会：CKD診療ガイド</li>
              <li>• 日本循環器学会：心血管疾患予防ガイドライン</li>
              <li>• 厚生労働省：周術期血糖管理ガイドライン</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* 機能一覧 */}
      <Card className="bg-card border-border p-4">
        <h3 className="font-semibold mb-3 text-primary text-base">搭載機能</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
          {[
            { icon: '🔍', title: '糖尿病診断基準', desc: '日本糖尿病学会準拠の診断基準' },
            { icon: '🧬', title: 'SPIDDM診断', desc: '緩徐進行1型糖尿病の診断基準' },
            { icon: '💊', title: '内服薬一覧', desc: '全経口血糖降下薬の腎機能別投与量' },
            { icon: '🩺', title: '血糖管理', desc: 'HbA1c目標値・個別化治療' },
            { icon: '💉', title: 'インスリン計算', desc: 'スライディングスケール・1日必要量' },
            { icon: '🏥', title: '周術期管理', desc: '手術時の血糖管理プロトコル' },
            { icon: '⚠️', title: '高血糖緊急症', desc: 'DKA・HHS初期対応' },
            { icon: '🧠', title: '認知機能評価', desc: 'HDS-R・MMSE連動・高齢者HbA1c目標' },
            { icon: '🔐', title: 'プライベート', desc: '入力データはブラウザ内に保存' },
            { icon: '📱', title: 'レスポンシブ', desc: 'PC・タブレット・スマートフォン対応' },
          ].map((feature, idx) => (
            <div key={idx} className="bg-muted/20 border border-border rounded p-2">
              <p className="font-semibold text-sm mb-1">{feature.icon} {feature.title}</p>
              <p className="text-xs text-muted-foreground">{feature.desc}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* リンク・サポート */}
      <Card className="bg-card border-border p-4">
        <h3 className="font-semibold mb-3 text-primary text-base">リンク・サポート</h3>
        <div className="space-y-2">
          <a
            href="https://github.com/iwatatsu2/dm-compass"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 p-3 bg-muted/20 border border-border rounded hover:bg-muted/40 transition-colors text-sm"
          >
            <Github className="w-4 h-4 text-primary" />
            <span>GitHub リポジトリ</span>
            <ExternalLink className="w-4 h-4 ml-auto text-muted-foreground" />
          </a>

          <a
            href="https://iwatatsu2.github.io/dr-iwatatsu-dm-renal-tool/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 p-3 bg-muted/20 border border-border rounded hover:bg-muted/40 transition-colors text-sm"
          >
            <span className="text-lg">🧪</span>
            <span>腎機能別投与量ナビゲーター</span>
            <ExternalLink className="w-4 h-4 ml-auto text-muted-foreground" />
          </a>

          <a
            href="mailto:iwatatsu@example.com"
            className="flex items-center gap-2 p-3 bg-muted/20 border border-border rounded hover:bg-muted/40 transition-colors text-sm"
          >
            <Mail className="w-4 h-4 text-primary" />
            <span>お問い合わせ</span>
            <ExternalLink className="w-4 h-4 ml-auto text-muted-foreground" />
          </a>
        </div>
      </Card>

      {/* 免責事項 */}
      <Card className="bg-red-950/20 border border-red-700/50 p-4">
        <h3 className="font-semibold mb-2 text-red-400 text-base">⚠️ 免責事項</h3>
        <p className="text-xs text-muted-foreground leading-relaxed">
          このアプリケーションは教育・参考目的で提供されています。医学的判断は必ず専門医の指導の下で行ってください。
          本アプリの情報に基づいて行った医療行為について、製作者は一切の責任を負いません。
          最新のガイドラインに従い、患者個別の状況を総合的に判断して治療方針を決定してください。
        </p>
      </Card>

      {/* バージョン情報 */}
      <div className="text-center text-xs text-muted-foreground p-4 border-t border-border">
        <p>dm-compass v2.0</p>
        <p>Last updated: 2026年2月27日</p>
        <p className="mt-2">© 2026 Dr.いわたつ. All rights reserved.</p>
      </div>
    </div>
  );
}
