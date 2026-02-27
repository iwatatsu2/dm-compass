import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getLoginUrl } from "@/const";
import { useLocation } from "wouter";
import { Calculator, BookOpen } from "lucide-react";

export default function Home() {
  const { user, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* ヘッダー */}
      <header className="bg-card border-b border-border p-4">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold text-center mb-1">DM Compass</h1>
          <p className="text-sm text-muted-foreground text-center">
            Diabetes Ward OS
          </p>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="flex-1 flex flex-col justify-center items-center p-4">
        <div className="w-full max-w-md space-y-6">
          {/* CALCボタン */}
          <Card className="bg-card border-border p-6 cursor-pointer hover:bg-opacity-90 transition-all"
            onClick={() => setLocation("/calc")}>
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h2 className="text-xl font-bold text-primary mb-2">CALC</h2>
                <p className="text-sm text-muted-foreground">
                  必要エネルギー、腎症ステージ、インスリン混注計算などの判断支援ツール
                </p>
              </div>
              <Calculator className="w-12 h-12 text-primary ml-4 flex-shrink-0" />
            </div>
          </Card>

          {/* GUIDEボタン */}
          <Card className="bg-card border-border p-6 cursor-pointer hover:bg-opacity-90 transition-all"
            onClick={() => setLocation("/guide")}>
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h2 className="text-xl font-bold text-secondary mb-2">GUIDE</h2>
                <p className="text-sm text-muted-foreground">
                  インスリン製剤、経口薬、分類、合併症などの医学情報ガイド
                </p>
              </div>
              <BookOpen className="w-12 h-12 text-secondary ml-4 flex-shrink-0" />
            </div>
          </Card>
        </div>
      </main>

      {/* フッター - 免責表示 */}
      <footer className="bg-card border-t border-border p-4 text-center">
        <p className="text-xs text-muted-foreground max-w-md mx-auto">
          本アプリは教育目的であり、最終的な治療判断は主治医の責任で行ってください。最新添付文書をご確認ください。
        </p>
        <div className="mt-4 flex justify-center gap-2">
          {isAuthenticated ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setLocation("/profile")}
            >
              プロフィール
            </Button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.location.href = getLoginUrl()}
            >
              ログイン
            </Button>
          )}
        </div>
      </footer>
    </div>
  );
}
