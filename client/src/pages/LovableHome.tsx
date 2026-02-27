import React from 'react';
import { LovableLayout, Section } from '@/components/LovableLayout';
import { AlertBox } from '@/components/AlertBox';
import { Card } from '@/components/ui/card';

export default function LovableHome() {
  const sections: Section[] = [
    {
      id: 'hyperglycemic-emergency',
      number: 1,
      title: '高血糖緊急症',
      subtitle: 'DKA / HHS / euDKA',
      description: '糖尿病ケトアシドーシス、高浸透圧高血糖状態、ユーグリセミックDKAの診断と治療',
      content: (
        <div className="space-y-4">
          <AlertBox type="danger" title="DKA（糖尿病ケトアシドーシス）">
            <p>
              pH &lt; 7.30、HCO₃⁻ &lt; 18 mEq/L、ケトン体陽性の状態。初期治療は生理食塩水の大量輸液とインスリン投与。
            </p>
          </AlertBox>

          <Card className="bg-card border-border p-4">
            <h3 className="font-semibold mb-3 text-primary">治療プロトコル</h3>
            <ol className="space-y-2 text-sm">
              <li>1. 生食補液：1～1.5L/時（初期2時間）</li>
              <li>2. インスリン：0.1単位/kg/時 持続投与</li>
              <li>3. K補正：K&lt;5.3で補給開始、K≥5.3では投与禁止</li>
              <li>4. 血液ガス：一昼夜で pH 改善確認</li>
            </ol>
          </Card>

          <AlertBox type="warning">
            <p className="font-semibold mb-1">⚠️ 重要な注意点</p>
            <p>低カリウム血症はリバウンド低血糖の原因となるため、厳密に管理してください。</p>
          </AlertBox>
        </div>
      ),
    },
    {
      id: 'ketometer',
      number: 2,
      title: 'ケトメーター判定',
      subtitle: 'β-HB',
      description: 'ベータヒドロキシ酪酸による血液ケトン体測定と判定基準',
      content: (
        <div className="space-y-4">
          <Card className="bg-card border-border p-4">
            <h3 className="font-semibold mb-3">β-HB判定基準</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>&lt; 0.6 mmol/L</span>
                <span className="text-primary font-semibold">正常</span>
              </div>
              <div className="flex justify-between">
                <span>0.6～1.5 mmol/L</span>
                <span className="text-yellow-400 font-semibold">軽度上昇</span>
              </div>
              <div className="flex justify-between">
                <span>1.5～3.0 mmol/L</span>
                <span className="text-orange-400 font-semibold">中等度上昇</span>
              </div>
              <div className="flex justify-between">
                <span>&gt; 3.0 mmol/L</span>
                <span className="text-red-500 font-semibold">高度上昇</span>
              </div>
            </div>
          </Card>

          <AlertBox type="info" title="euDKAについて">
            <p>
              SGLT2阻害薬使用中に血糖値が比較的低い状態でケトアシドーシスが発生する状態。β-HBが高値でも血糖値が低い場合は要注意。
            </p>
          </AlertBox>
        </div>
      ),
    },
    {
      id: 'sugar-iv',
      number: 3,
      title: '糖入り点滴・IVH混注計算',
      subtitle: '末梢・中心静脈栄養',
      description: '糖含有輸液とIVH（中心静脈栄養）の混注計算ツール',
      content: (
        <div className="space-y-4">
          <Card className="bg-card border-border p-4">
            <h3 className="font-semibold mb-3">末梢輸液（5g/単位）</h3>
            <div className="space-y-2 text-sm">
              <p>計算式：ブドウ糖量（g）÷ 5 = 必要単位数</p>
              <p className="text-muted-foreground">例）500mL 5%ブドウ糖 = 25g ÷ 5 = 5単位</p>
            </div>
          </Card>

          <Card className="bg-card border-border p-4">
            <h3 className="font-semibold mb-3">IVH（10g/単位、15g/単位）</h3>
            <div className="space-y-2 text-sm">
              <p>計算式：ブドウ糖量（g）÷ 単位 = 必要単位数</p>
              <p className="text-muted-foreground">例）500mL 20%ブドウ糖 = 100g ÷ 10 = 10単位</p>
            </div>
          </Card>

          <AlertBox type="warning">
            <p>末梢ルートでは 10% 以上のブドウ糖は血管炎の原因となるため、5～8% に制限してください。</p>
          </AlertBox>
        </div>
      ),
    },
    {
      id: 'diabetes-type',
      number: 4,
      title: '糖尿病タイプ診断',
      subtitle: '1型/2型/MODY',
      description: '糖尿病の分類と診断基準',
      content: (
        <div className="space-y-4">
          <Card className="bg-card border-border p-4">
            <h3 className="font-semibold mb-3">1型糖尿病</h3>
            <ul className="space-y-1 text-sm">
              <li>• 劇症：数日で発症、DKAで発見</li>
              <li>• 急性発症：数週間で発症</li>
              <li>• 緩徐進行：LADA（latent autoimmune diabetes in adults）</li>
            </ul>
          </Card>

          <Card className="bg-card border-border p-4">
            <h3 className="font-semibold mb-3">2型糖尿病</h3>
            <ul className="space-y-1 text-sm">
              <li>• インスリン抵抗性が主体</li>
              <li>• インスリン分泌能は比較的保持</li>
              <li>• 肥満、加齢、遺伝が関連</li>
            </ul>
          </Card>

          <Card className="bg-card border-border p-4">
            <h3 className="font-semibold mb-3">その他の糖尿病</h3>
            <ul className="space-y-1 text-sm">
              <li>• MODY：若年発症、常染色体優性遺伝</li>
              <li>• ミトコンドリア糖尿病：母親由来遺伝</li>
              <li>• 二次性：膵炎、血色素沈着症など</li>
            </ul>
          </Card>
        </div>
      ),
    },
    {
      id: 'type2-algorithm',
      number: 5,
      title: '2型治療アルゴリズム',
      subtitle: 'ガイドライン準拠',
      description: '2型糖尿病の段階的治療アルゴリズム',
      content: (
        <div className="space-y-4">
          <Card className="bg-card border-border p-4">
            <h3 className="font-semibold mb-3">ステップ1：生活療法</h3>
            <ul className="space-y-1 text-sm">
              <li>• 食事療法：カロリー制限、栄養バランス</li>
              <li>• 運動療法：有酸素運動 150分/週</li>
              <li>• 体重減少：5～10% の減量目標</li>
            </ul>
          </Card>

          <Card className="bg-card border-border p-4">
            <h3 className="font-semibold mb-3">ステップ2：単剤療法</h3>
            <ul className="space-y-1 text-sm">
              <li>• メトホルミン（第一選択）</li>
              <li>• SGLT2阻害薬（心腎保護）</li>
              <li>• GLP-1受容体作動薬（体重減少）</li>
            </ul>
          </Card>

          <Card className="bg-card border-border p-4">
            <h3 className="font-semibold mb-3">ステップ3：多剤併用</h3>
            <ul className="space-y-1 text-sm">
              <li>• 2～3剤の組み合わせ</li>
              <li>• インスリン導入の検討</li>
              <li>• HbA1c 目標値に応じた調整</li>
            </ul>
          </Card>
        </div>
      ),
    },
    {
      id: 'oral-drugs',
      number: 6,
      title: '内服薬一覧',
      subtitle: '分類明示',
      description: '経口血糖降下薬の全分類と商品名',
      content: (
        <div className="space-y-4">
          <Card className="bg-card border-border p-4">
            <h3 className="font-semibold mb-3">ビグアナイド薬</h3>
            <p className="text-sm">メトホルミン（グリコラン、メデット）</p>
          </Card>

          <Card className="bg-card border-border p-4">
            <h3 className="font-semibold mb-3">SGLT2阻害薬</h3>
            <p className="text-sm">ダパグリフロジン（フォシーガ）、エンパグリフロジン（ジャディアンス）</p>
          </Card>

          <Card className="bg-card border-border p-4">
            <h3 className="font-semibold mb-3">DPP-4阻害薬</h3>
            <p className="text-sm">シタグリプチン（ジャヌビア）、ビルダグリプチン（ガルバス）</p>
          </Card>

          <Card className="bg-card border-border p-4">
            <h3 className="font-semibold mb-3">GLP-1受容体作動薬</h3>
            <p className="text-sm">リラグルチド（ビクトーザ）、セマグルチド（オゼンピック）</p>
          </Card>
        </div>
      ),
    },
    {
      id: 'insulin-guide',
      number: 7,
      title: 'インスリン完全ガイド',
      subtitle: '全製剤',
      description: 'インスリン製剤の全分類と使い分け',
      content: (
        <div className="space-y-4">
          <Card className="bg-card border-border p-4">
            <h3 className="font-semibold mb-3">超超速効型</h3>
            <p className="text-sm">フィアスプ、ルムジェブ（作用発現：10～15分）</p>
          </Card>

          <Card className="bg-card border-border p-4">
            <h3 className="font-semibold mb-3">超速効型</h3>
            <p className="text-sm">ノボラピッド、ヒューマログ（作用発現：15～30分）</p>
          </Card>

          <Card className="bg-card border-border p-4">
            <h3 className="font-semibold mb-3">速効型</h3>
            <p className="text-sm">レギュラーインスリン（作用発現：30～60分）</p>
          </Card>

          <Card className="bg-card border-border p-4">
            <h3 className="font-semibold mb-3">持効型</h3>
            <p className="text-sm">ランタス、トレシーバ（持続時間：24時間以上）</p>
          </Card>

          <Card className="bg-card border-border p-4">
            <h3 className="font-semibold mb-3">週1回基礎</h3>
            <p className="text-sm">アウィクリ（デグルデク週1回）</p>
          </Card>
        </div>
      ),
    },
    {
      id: 'sliding-scale',
      number: 8,
      title: 'スライディングスケール',
      subtitle: '自動生成',
      description: 'スライディングスケール計算ツール',
      content: (
        <div className="space-y-4">
          <AlertBox type="info" title="スライディングスケールについて">
            <p>
              現在の血糖値に基づいて補正インスリンを決定する方法。急性期や入院中に使用されます。
            </p>
          </AlertBox>

          <Card className="bg-card border-border p-4">
            <h3 className="font-semibold mb-3">軽症例（1単位/40mg/dL）</h3>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>100～140 mg/dL</span>
                <span className="text-primary">0単位</span>
              </div>
              <div className="flex justify-between">
                <span>141～180 mg/dL</span>
                <span className="text-primary">1単位</span>
              </div>
              <div className="flex justify-between">
                <span>181～220 mg/dL</span>
                <span className="text-primary">2単位</span>
              </div>
            </div>
          </Card>
        </div>
      ),
    },
    {
      id: 'perioperative',
      number: 9,
      title: '周術期管理',
      subtitle: '血糖管理',
      description: '手術時の血糖管理と薬剤調整',
      content: (
        <div className="space-y-4">
          <AlertBox type="warning" title="周術期の血糖管理目標">
            <p>手術中：140～180 mg/dL、手術後：150～200 mg/dL</p>
          </AlertBox>

          <Card className="bg-card border-border p-4">
            <h3 className="font-semibold mb-3">内服薬の休薬</h3>
            <ul className="space-y-1 text-sm">
              <li>• メトホルミン：手術前日から中止（造影剤使用時も）</li>
              <li>• SU薬：手術当日朝から中止</li>
              <li>• SGLT2阻害薬：手術3日前から中止</li>
            </ul>
          </Card>

          <Card className="bg-card border-border p-4">
            <h3 className="font-semibold mb-3">インスリン管理</h3>
            <ul className="space-y-1 text-sm">
              <li>• 基礎インスリンは通常通り投与</li>
              <li>• 食事摂取不可時は補正インスリンのみ</li>
              <li>• 術中は持続輸液＋インスリン投与</li>
            </ul>
          </Card>
        </div>
      ),
    },
    {
      id: 'diet-exercise',
      number: 10,
      title: '食事・運動療法',
      subtitle: 'カロリー計算',
      description: '栄養管理と運動処方',
      content: (
        <div className="space-y-4">
          <Card className="bg-card border-border p-4">
            <h3 className="font-semibold mb-3">必要カロリー計算</h3>
            <div className="space-y-2 text-sm">
              <p>標準体重（kg）= 身長（m）² × 22</p>
              <p>必要カロリー = 標準体重 × 活動係数</p>
              <ul className="mt-2 space-y-1">
                <li>• 安静：25 kcal/kg</li>
                <li>• 普通：30 kcal/kg</li>
                <li>• 高：35 kcal/kg</li>
              </ul>
            </div>
          </Card>

          <Card className="bg-card border-border p-4">
            <h3 className="font-semibold mb-3">運動処方</h3>
            <ul className="space-y-1 text-sm">
              <li>• 有酸素運動：150分/週（中等度）</li>
              <li>• 筋トレ：週2～3回</li>
              <li>• 低血糖リスク時は避ける</li>
            </ul>
          </Card>
        </div>
      ),
    },
    {
      id: 'complications',
      number: 11,
      title: '糖尿病合併症',
      subtitle: '神経/腎/網膜',
      description: '細血管障害と大血管障害の診断基準',
      content: (
        <div className="space-y-4">
          <Card className="bg-card border-border p-4">
            <h3 className="font-semibold mb-3">細血管障害</h3>
            <ul className="space-y-1 text-sm">
              <li>• 網膜症：単純型 → 前増殖型 → 増殖型</li>
              <li>• 腎症：第1～5期（eGFRで分類）</li>
              <li>• 神経障害：感覚神経障害、自律神経障害</li>
            </ul>
          </Card>

          <Card className="bg-card border-border p-4">
            <h3 className="font-semibold mb-3">大血管障害</h3>
            <ul className="space-y-1 text-sm">
              <li>• 冠動脈疾患（CAD）</li>
              <li>• 脳血管障害（CVD）</li>
              <li>• 末梢動脈疾患（PAD）</li>
            </ul>
          </Card>

          <AlertBox type="warning">
            <p>HbA1c 7% 未満を目標に血糖管理を行うことで、合併症の発症・進展を遅延させることができます。</p>
          </AlertBox>
        </div>
      ),
    },
    {
      id: 'adrenal-incidentaloma',
      number: 12,
      title: '副腎偶発腫',
      subtitle: 'DST / ARR',
      description: '副腎偶発腫の診断と評価',
      content: (
        <div className="space-y-4">
          <Card className="bg-card border-border p-4">
            <h3 className="font-semibold mb-3">診断フローチャート</h3>
            <ul className="space-y-1 text-sm">
              <li>1. 画像検査：CT/MRI で腫瘍確認</li>
              <li>2. ホルモン検査：コルチゾール、アルドステロン</li>
              <li>3. 低用量デキサメタゾン抑制試験（DST）</li>
              <li>4. アルドステロン/レニン比（ARR）</li>
            </ul>
          </Card>

          <Card className="bg-card border-border p-4">
            <h3 className="font-semibold mb-3">DST 判定基準</h3>
            <div className="space-y-1 text-sm">
              <p>&lt; 1.8 μg/dL：正常（クッシング症候群除外）</p>
              <p>1.8～5.0 μg/dL：グレーゾーン</p>
              <p>&gt; 5.0 μg/dL：クッシング症候群疑い</p>
            </div>
          </Card>
        </div>
      ),
    },
    {
      id: 'pituitary-adrenal',
      number: 13,
      title: '下垂体・副腎負荷試験',
      subtitle: 'GH / ACTH',
      description: '下垂体・副腎軸の機能評価',
      content: (
        <div className="space-y-4">
          <Card className="bg-card border-border p-4">
            <h3 className="font-semibold mb-3">成長ホルモン（GH）刺激試験</h3>
            <ul className="space-y-1 text-sm">
              <li>• インスリン低血糖刺激試験（ITT）</li>
              <li>• アルギニン刺激試験</li>
              <li>• GHRH + アルギニン</li>
            </ul>
          </Card>

          <Card className="bg-card border-border p-4">
            <h3 className="font-semibold mb-3">ACTH 刺激試験</h3>
            <ul className="space-y-1 text-sm">
              <li>• CRH 刺激試験：下垂体機能評価</li>
              <li>• ACTH 刺激試験：副腎機能評価</li>
              <li>• メトピロン試験：下垂体予備能評価</li>
            </ul>
          </Card>
        </div>
      ),
    },
    {
      id: 'men-syndrome',
      number: 14,
      title: 'MEN症候群',
      subtitle: 'MEN1 / MEN2',
      description: '多発性内分泌腫瘍症候群の診断と管理',
      content: (
        <div className="space-y-4">
          <Card className="bg-card border-border p-4">
            <h3 className="font-semibold mb-3">MEN1 症候群</h3>
            <ul className="space-y-1 text-sm">
              <li>• 下垂体腺腫（プロラクチノーマ）</li>
              <li>• 副甲状腺機能亢進症</li>
              <li>• 膵神経内分泌腫瘍（ガストリノーマ、インスリノーマ）</li>
            </ul>
          </Card>

          <Card className="bg-card border-border p-4">
            <h3 className="font-semibold mb-3">MEN2 症候群</h3>
            <ul className="space-y-1 text-sm">
              <li>• MEN2A：髄様癌、褐色細胞腫、副甲状腺機能亢進症</li>
              <li>• MEN2B：髄様癌、褐色細胞腫、粘液腫</li>
            </ul>
          </Card>

          <AlertBox type="warning">
            <p>遺伝性疾患のため、家族スクリーニングが重要です。</p>
          </AlertBox>
        </div>
      ),
    },
    {
      id: 'insulinoma',
      number: 15,
      title: 'インスリノーマ',
      subtitle: 'Whipple三徴',
      description: 'インスリン産生腫瘍の診断と治療',
      content: (
        <div className="space-y-4">
          <AlertBox type="info" title="Whipple三徴">
            <ul className="space-y-1 text-sm">
              <li>1. 低血糖症状（発汗、動悸、意識障害）</li>
              <li>2. 低血糖の客観的証明（血糖 &lt; 55 mg/dL）</li>
              <li>3. 低血糖時のインスリン高値（&gt; 3 μU/mL）</li>
            </ul>
          </AlertBox>

          <Card className="bg-card border-border p-4">
            <h3 className="font-semibold mb-3">診断検査</h3>
            <ul className="space-y-1 text-sm">
              <li>• 空腹時血糖：&lt; 55 mg/dL</li>
              <li>• インスリン/血糖比：&gt; 0.3</li>
              <li>• C-ペプチド：高値</li>
              <li>• 画像検査：CT、MRI、EUS</li>
            </ul>
          </Card>

          <Card className="bg-card border-border p-4">
            <h3 className="font-semibold mb-3">治療</h3>
            <ul className="space-y-1 text-sm">
              <li>• 外科的切除（第一選択）</li>
              <li>• 薬物療法：ジアゾキシド、ソマトスタチン</li>
            </ul>
          </Card>
        </div>
      ),
    },
    {
      id: 'hba1c-target',
      number: 16,
      title: 'HbA1c目標',
      subtitle: '熊本宣言',
      description: 'HbA1c 目標値と血糖管理',
      content: (
        <div className="space-y-4">
          <Card className="bg-card border-border p-4">
            <h3 className="font-semibold mb-3">熊本宣言 2013 改訂版</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>健常人</span>
                <span className="text-primary font-semibold">&lt; 5.6%</span>
              </div>
              <div className="flex justify-between">
                <span>糖尿病患者（一般）</span>
                <span className="text-primary font-semibold">&lt; 7.0%</span>
              </div>
              <div className="flex justify-between">
                <span>高齢者・低血糖リスク高</span>
                <span className="text-primary font-semibold">&lt; 8.0%</span>
              </div>
              <div className="flex justify-between">
                <span>妊娠糖尿病</span>
                <span className="text-primary font-semibold">&lt; 5.8%</span>
              </div>
            </div>
          </Card>

          <AlertBox type="success" title="良好な血糖管理のメリット">
            <ul className="space-y-1 text-sm">
              <li>• 合併症の発症・進展を遅延</li>
              <li>• 心血管イベント減少</li>
              <li>• QOL 向上</li>
            </ul>
          </AlertBox>
        </div>
      ),
    },
  ];

  return (
    <LovableLayout
      sections={sections}
      title="DM & Endo Clinical Engine"
      subtitle="Diabetes & Endocrine Clinical Decision Support System"
    />
  );
}
