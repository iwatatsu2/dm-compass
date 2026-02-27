import React, { useState, useMemo } from 'react';
import { Section1_HyperglycemicEmergency } from '@/sections/Section1_HyperglycemicEmergency';
import { Section2_Ketometer } from '@/sections/Section2_Ketometer';
import { Section3_SugarIV } from '@/sections/Section3_SugarIV';
import { Section4_DiabetesType } from '@/sections/Section4_DiabetesType';
import { Section5_T2DAlgorithm } from '@/sections/Section5_T2DAlgorithm';
import { Section6_OralDrugs } from '@/sections/Section6_OralDrugs';
import { Section6_HbA1cTarget } from '@/sections/Section6_HbA1cTarget';
import { Section7_InsulinGuide } from '@/sections/Section7_InsulinGuide';
import { Section8_SlidingScale } from '@/sections/Section8_SlidingScale';
import { Section9_Perioperative } from '@/sections/Section9_Perioperative';
import { Section10_DietCalc } from '@/sections/Section10_DietCalc';
import { Section11_Complications } from '@/sections/Section11_Complications';
import { Section12_CognitiveCheck } from '@/sections/Section12_CognitiveCheck';
import { Section14_About } from '@/sections/Section14_About';

interface SectionDef {
  id: number;
  label: string;
  subtitle: string;
  component: React.ReactNode;
}

const sections: SectionDef[] = [
  { id: 1, label: '高血糖緊急症', subtitle: 'DKA / HHS / euDKA', component: <Section1_HyperglycemicEmergency /> },
  { id: 2, label: 'ケトメーター判定', subtitle: 'β-HB 基準値', component: <Section2_Ketometer /> },
  { id: 3, label: '糖分入り点滴・IVH', subtitle: '商品一覧 & インスリン混注量', component: <Section3_SugarIV /> },
  { id: 4, label: '糖尿病タイプ診断', subtitle: '診断基準（学会準拠）', component: <Section4_DiabetesType /> },
  { id: 5, label: '2型治療アルゴリズム', subtitle: '日本糖尿病学会 2023年版', component: <Section5_T2DAlgorithm /> },
  { id: 7, label: 'HbA1c目標値', subtitle: '個別化・高齢者対応', component: <Section6_HbA1cTarget /> },
  { id: 8, label: '内服薬一覧', subtitle: '全クラス・腎機能調整', component: <Section6_OralDrugs /> },
  { id: 8, label: 'インスリン完全ガイド', subtitle: '全製剤・混合製剤含む', component: <Section7_InsulinGuide /> },
  { id: 9, label: 'スライディングスケール', subtitle: 'ISF25/50 自動生成', component: <Section8_SlidingScale /> },
  { id: 10, label: '周術期血糖管理', subtitle: '休薬・再開スケジュール', component: <Section9_Perioperative /> },
  { id: 11, label: '食事・カロリー計算', subtitle: '必要エネルギー & 蛋白制限', component: <Section10_DietCalc /> },
  { id: 12, label: '糖尿病合併症', subtitle: '網膜症・腎症・神経障害', component: <Section11_Complications /> },
  { id: 13, label: '認知機能チェック', subtitle: 'HDS-R / MMSE 連動・高齢者HbA1c目標設定', component: <Section12_CognitiveCheck /> },
];

export default function LovableHome() {
  const [activeSection, setActiveSection] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filteredSections = useMemo(() => {
    if (!searchQuery.trim()) return sections;
    const q = searchQuery.toLowerCase();
    return sections.filter(
      (s) => s.label.toLowerCase().includes(q) || s.subtitle.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const currentSection = sections.find((s) => s.id === activeSection);

  const handleSectionSelect = (id: number) => {
    setActiveSection(id);
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col" style={{ maxWidth: '100vw', overflow: 'hidden' }}>
      {/* ヘッダー */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded hover:bg-border/50 transition-colors"
            aria-label="メニュー"
          >
            <div className="space-y-1">
              <div className="w-5 h-0.5 bg-foreground"></div>
              <div className="w-5 h-0.5 bg-foreground"></div>
              <div className="w-5 h-0.5 bg-foreground"></div>
            </div>
          </button>
          <div>
            <h1 className="text-lg font-bold text-primary tracking-tight">DM compass</h1>
            <p className="text-xs text-muted-foreground leading-none">糖尿病病棟管理 研修医向け</p>
          </div>
        </div>
        <div className="text-xs text-muted-foreground hidden sm:block">
          {currentSection?.label}
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* モバイルオーバーレイ */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/60 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* サイドバー */}
        <aside
          className={[
            'fixed lg:static top-0 left-0 h-full lg:h-auto z-50 lg:z-auto',
            'w-64 lg:w-56 xl:w-64',
            'bg-sidebar border-r border-border',
            'flex flex-col',
            'transition-transform duration-300',
            sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
          ].join(' ')}
        >
          {/* モバイルヘッダー */}
          <div className="lg:hidden flex items-center justify-between px-4 py-3 border-b border-border">
            <span className="font-semibold text-sm">セクション一覧</span>
            <button onClick={() => setSidebarOpen(false)} className="text-muted-foreground hover:text-foreground">
              ✕
            </button>
          </div>

          {/* アプリ内検索 */}
          <div className="p-3 border-b border-border">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="アプリ内検索..."
              className="w-full bg-input border border-border rounded px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          {/* セクションリスト */}
          <nav className="flex-1 overflow-y-auto py-2">
            {filteredSections.length === 0 ? (
              <p className="text-xs text-muted-foreground text-center py-4">見つかりません</p>
            ) : (
              filteredSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => handleSectionSelect(section.id)}
                  className={[
                    'w-full text-left px-3 py-2.5 flex items-start gap-2.5 transition-colors hover:bg-border/50',
                    activeSection === section.id ? 'bg-primary/20 border-r-2 border-primary' : '',
                  ].join(' ')}
                >
                  <span
                    className={[
                      'flex-shrink-0 w-6 h-6 rounded text-xs font-bold flex items-center justify-center mt-0.5',
                      activeSection === section.id
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground',
                    ].join(' ')}
                  >
                    {section.id}
                  </span>
                  <div className="min-w-0">
                    <p
                      className={[
                        'text-xs font-semibold leading-tight',
                        activeSection === section.id ? 'text-primary' : 'text-foreground',
                      ].join(' ')}
                    >
                      {section.label}
                    </p>
                    <p className="text-xs text-muted-foreground leading-tight mt-0.5 truncate">
                      {section.subtitle}
                    </p>
                  </div>
                </button>
              ))
            )}
          </nav>

          {/* 免責事項 */}
          <div className="p-3 border-t border-border">
            <p className="text-xs text-muted-foreground leading-relaxed">
              本アプリは教育目的であり、最終的な治療判断は主治医の責任で行ってください。最新添付文書をご確認ください。
            </p>
          </div>
        </aside>

        {/* メインコンテンツ */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 max-w-2xl mx-auto">
            {/* セクションタイトル */}
            {currentSection && (
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-7 h-7 rounded bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center flex-shrink-0">
                    {currentSection.id}
                  </span>
                  <h2 className="text-lg font-bold text-foreground">{currentSection.label}</h2>
                </div>
                <p className="text-sm text-muted-foreground ml-9">{currentSection.subtitle}</p>
              </div>
            )}

            {/* セクションコンテンツ */}
            {currentSection?.component}

            {/* 前後ナビゲーション */}
            <div className="flex justify-between mt-6 pt-4 border-t border-border">
              <button
                onClick={() => {
                  const prev = sections.find((s) => s.id === activeSection - 1);
                  if (prev) setActiveSection(prev.id);
                }}
                disabled={activeSection === 1}
                className="text-xs text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed"
              >
                ← 前のセクション
              </button>
              <button
                onClick={() => {
                  const next = sections.find((s) => s.id === activeSection + 1);
                  if (next) setActiveSection(next.id);
                }}
                disabled={activeSection === sections.length}
                className="text-xs text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed"
              >
                次のセクション →
              </button>
            </div>

            {/* フッター免責 */}
            <div className="mt-6 pb-6 text-center space-y-2">
              <p className="text-xs text-muted-foreground">
                本アプリは教育目的であり、最終的な治療判断は主治医の責任で行ってください。最新添付文書をご確認ください。
              </p>
              <p className="text-xs text-muted-foreground/60">
                制作：Dr.いわたつ ／ 参考：日本糖尿病学会ガイドライン・日本老年医学会ガイドライン
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
