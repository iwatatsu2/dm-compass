import { useMemo, useState } from 'react';
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

interface SearchResult {
  sectionId: string;
  sectionTitle: string;
  sectionNumber: number;
  matchText: string;
  context: string;
}

interface LovableLayoutProps {
  sections: Section[];
  title: string;
  subtitle: string;
}

// テキスト正規化関数（全角・半角、大文字・小文字を統一）
function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[Ａ-Ｚａ-ｚ０-９]/g, (s) => String.fromCharCode(s.charCodeAt(0) - 0xFEE0))
    .replace(/[ぁ-ん]/g, (s) => {
      const kanaMap: { [key: string]: string } = {
        'ぁ': 'あ', 'ぃ': 'い', 'ぅ': 'う', 'ぇ': 'え', 'ぉ': 'お',
        'ゃ': 'や', 'ゅ': 'ゆ', 'ょ': 'よ', 'ゎ': 'わ',
      };
      return kanaMap[s] || s;
    });
}

// セクションコンテンツからテキストを抽出
function extractTextFromContent(content: React.ReactNode): string {
  if (typeof content === 'string') return content;
  if (typeof content === 'number') return String(content);
  if (Array.isArray(content)) {
    return content.map(c => extractTextFromContent(c)).join(' ');
  }
  if (content && typeof content === 'object' && 'props' in content) {
    const props = (content as any).props;
    if (props.children) {
      return extractTextFromContent(props.children);
    }
  }
  return '';
}

// 検索結果の前後20文字を抽出
function getContext(text: string, searchTerm: string, contextLength: number = 20): string {
  const index = text.toLowerCase().indexOf(searchTerm.toLowerCase());
  if (index === -1) return text.substring(0, 40);
  
  const start = Math.max(0, index - contextLength);
  const end = Math.min(text.length, index + searchTerm.length + contextLength);
  
  let context = text.substring(start, end);
  if (start > 0) context = '...' + context;
  if (end < text.length) context = context + '...';
  
  return context;
}

export function LovableLayout({ sections, title, subtitle }: LovableLayoutProps) {
  const [activeSection, setActiveSection] = useState<string>(sections[0]?.id || '');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);

  // 全体横断検索：すべてのセクションをインデックス化して検索
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];

    const normalizedQuery = normalizeText(searchQuery);
    const results: SearchResult[] = [];

    sections.forEach((section) => {
      // セクションタイトル・サブタイトル・説明を検索
      const sectionText = normalizeText(
        `${section.title} ${section.subtitle} ${section.description}`
      );
      
      // コンテンツテキストを抽出して検索
      const contentText = normalizeText(extractTextFromContent(section.content));
      const fullText = `${sectionText} ${contentText}`;

      // 部分一致検索
      if (fullText.includes(normalizedQuery)) {
        // マッチ箇所を複数抽出（最大3件）
        let searchIndex = 0;
        let matchCount = 0;
        
        while (matchCount < 3) {
          const index = fullText.indexOf(normalizedQuery, searchIndex);
          if (index === -1) break;

          const originalIndex = contentText.includes(normalizedQuery) 
            ? contentText.indexOf(normalizedQuery, searchIndex)
            : sectionText.indexOf(normalizedQuery, searchIndex);

          const context = getContext(
            originalIndex !== -1 ? contentText : sectionText,
            normalizedQuery
          );

          results.push({
            sectionId: section.id,
            sectionTitle: section.title,
            sectionNumber: section.number,
            matchText: normalizedQuery,
            context: context,
          });

          searchIndex = index + normalizedQuery.length;
          matchCount++;
        }
      }
    });

    return results.slice(0, 20); // 最大20件まで表示
  }, [sections, searchQuery]);

  const activeSectionData = sections.find((s) => s.id === activeSection);

  const handleSearchResultClick = (sectionId: string) => {
    setActiveSection(sectionId);
    setShowSearchResults(false);
    setSearchQuery('');
  };

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
        <aside className="w-64 bg-card border-r border-border flex flex-col overflow-hidden">
          {/* 検索ボックス */}
          <div className="p-3 border-b border-border">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="アプリ全体を検索..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSearchResults(true);
                }}
                onFocus={() => searchQuery && setShowSearchResults(true)}
                className="pl-8 h-9 text-sm bg-input text-foreground"
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setShowSearchResults(false);
                  }}
                  className="absolute right-2 top-2.5 text-muted-foreground hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* 検索結果表示 */}
          {showSearchResults && searchQuery.trim() && (
            <div className="flex-1 overflow-y-auto bg-background/50 border-t border-border p-2">
              <div className="space-y-2">
                {searchResults.length > 0 ? (
                  <>
                    <p className="text-xs text-muted-foreground px-2 py-1">
                      {searchResults.length}件の検索結果
                    </p>
                    {searchResults.map((result, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSearchResultClick(result.sectionId)}
                        className="w-full text-left p-2 rounded bg-card hover:bg-primary/20 transition-colors border border-border text-xs"
                      >
                        <div className="font-semibold text-primary text-sm mb-1">
                          Section {result.sectionNumber}: {result.sectionTitle}
                        </div>
                        <div className="text-muted-foreground line-clamp-2">
                          {result.context}
                        </div>
                      </button>
                    ))}
                  </>
                ) : (
                  <p className="text-xs text-muted-foreground px-2 py-3">
                    検索結果がありません
                  </p>
                )}
              </div>
            </div>
          )}

          {/* セクションリスト */}
          {!showSearchResults && (
            <div className="flex-1 overflow-y-auto">
              <nav className="p-2 space-y-1">
                {sections.map((section) => (
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
          )}
        </aside>

        {/* メインコンテンツエリア */}
        <main className="flex-1 overflow-y-auto">
          {activeSectionData && (
            <div className="max-w-4xl mx-auto p-6">
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-primary-foreground font-bold text-lg">
                    {activeSectionData.number}
                  </span>
                  <div>
                    <h2 className="text-3xl font-bold">{activeSectionData.title}</h2>
                    <p className="text-sm text-muted-foreground">{activeSectionData.subtitle}</p>
                  </div>
                </div>
              </div>
              <div className="prose prose-invert max-w-none">
                {activeSectionData.content}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
