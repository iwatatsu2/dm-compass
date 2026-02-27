import React, { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Search, X } from 'lucide-react';

export interface Section {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  description: string;
  content: React.ReactNode;
}

interface LovableLayoutProps {
  sections: Section[];
  title: string;
  subtitle: string;
}

export function LovableLayout({ sections, title, subtitle }: LovableLayoutProps) {
  const [activeSection, setActiveSection] = useState<string>(sections[0]?.id || '');
  const [searchQuery, setSearchQuery] = useState('');

  // セクション検索フィルタリング
  const filteredSections = useMemo(() => {
    if (!searchQuery) return sections;
    return sections.filter(
      (section) =>
        section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        section.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        section.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [sections, searchQuery]);

  const activeSectionData = sections.find((s) => s.id === activeSection);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* ヘッダー */}
      <header className="bg-card border-b border-border p-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>
      </header>

      {/* メインコンテンツ */}
      <div className="flex-1 flex overflow-hidden">
        {/* 左サイドバー */}
        <aside className="w-48 bg-card border-r border-border flex flex-col overflow-hidden">
          {/* 検索ボックス */}
          <div className="p-3 border-b border-border">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="セクション検索..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 h-9 text-sm bg-input text-foreground"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-2.5 text-muted-foreground hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* セクションリスト */}
          <div className="flex-1 overflow-y-auto">
            <nav className="p-2 space-y-1">
              {filteredSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full text-left px-3 py-2 rounded text-sm transition-colors relative group ${
                    activeSection === section.id
                      ? 'bg-primary text-primary-foreground font-semibold'
                      : 'hover:bg-border text-foreground'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {/* 番号バッジ */}
                    <span
                      className={`flex-shrink-0 w-6 h-6 rounded flex items-center justify-center text-xs font-bold ${
                        activeSection === section.id
                          ? 'bg-primary-foreground text-primary'
                          : 'bg-primary text-primary-foreground'
                      }`}
                    >
                      {section.number}
                    </span>
                    {/* テキスト */}
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold truncate">{section.title}</div>
                      <div className="text-xs opacity-75 truncate">{section.subtitle}</div>
                    </div>
                  </div>
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* メインコンテンツエリア */}
        <main className="flex-1 overflow-y-auto">
          {activeSectionData ? (
            <div className="p-6 max-w-5xl">
              {/* セクションヘッダー */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <span className="bg-primary text-primary-foreground w-8 h-8 rounded flex items-center justify-center font-bold">
                    {activeSectionData.number}
                  </span>
                  <h2 className="text-3xl font-bold">{activeSectionData.title}</h2>
                </div>
                <p className="text-muted-foreground">{activeSectionData.description}</p>
              </div>

              {/* コンテンツ */}
              <div className="space-y-6">{activeSectionData.content}</div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              <p>セクションが見つかりません</p>
            </div>
          )}
        </main>
      </div>

      {/* フッター - 免責表示 */}
      <footer className="bg-card border-t border-border p-4 text-center">
        <p className="text-xs text-muted-foreground max-w-4xl mx-auto">
          本アプリは教育目的であり、最終的な治療判断は主治医の責任で行ってください。最新添付文書をご確認ください。
        </p>
      </footer>
    </div>
  );
}
