import { Card } from '@/components/ui/card';
import { AlertBox } from '@/components/AlertBox';

export function Section6_HbA1cTarget() {
  return (
    <div className="space-y-4">
      <AlertBox type="info" title="HbA1c 目標値（個別化）">
        <p className="text-sm">
          日本糖尿病学会および日本老年医学会ガイドラインに基づいた個別化された目標値です。
          患者の年齢、認知機能、ADL、低血糖リスク、併存疾患を総合的に考慮して設定してください。
        </p>
      </AlertBox>

      {/* 一般成人 */}
      <Card className="bg-card border-border p-4">
        <h3 className="font-semibold mb-3 text-primary text-base">■ 血糖コントロール目標（一般成人）</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="bg-green-950/20 border border-green-700/50 rounded p-3">
            <p className="font-bold text-green-400 text-sm mb-2">6.0未満</p>
            <p className="text-muted-foreground mb-2">血糖正常化を目指す際の目標</p>
            <p className="text-xs text-muted-foreground">
              注1）食事・運動療法のみで達成可能な場合、または薬物療法の副作用がない場合
            </p>
          </div>
          <div className="bg-primary/10 border border-primary/50 rounded p-3">
            <p className="font-bold text-primary text-sm mb-2">7.0未満</p>
            <p className="text-muted-foreground mb-2">合併症予防のための目標</p>
            <p className="text-xs text-muted-foreground">
              注2）空腹時血糖 &lt;130 mg/dL、食後2時間血糖 &lt;180 mg/dL
            </p>
          </div>
          <div className="bg-orange-950/20 border border-orange-700/50 rounded p-3">
            <p className="font-bold text-orange-400 text-sm mb-2">8.0未満</p>
            <p className="text-muted-foreground mb-2">治療強化が困難な際の目標</p>
            <p className="text-xs text-muted-foreground">
              注3）低血糖等の副作用、その他の理由で治療強化が困難な場合
            </p>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-3">
          注4）いずれも成人に対する目標値であり、妊娠期は除く
        </p>
      </Card>

      {/* 高齢者 */}
      <Card className="bg-card border-border p-4">
        <h3 className="font-semibold mb-4 text-primary text-base">■ 高齢者糖尿病の血糖コントロール目標（HbA1c値）</h3>

        {/* カテゴリー説明 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-4 text-xs">
          <div className="bg-muted/20 border border-border/50 rounded p-2">
            <p className="font-bold text-primary mb-1">カテゴリー I</p>
            <p className="text-muted-foreground">認知機能正常かつADL自立</p>
          </div>
          <div className="bg-muted/20 border border-border/50 rounded p-2">
            <p className="font-bold text-primary mb-1">カテゴリー II</p>
            <p className="text-muted-foreground">軽度認知障害、または手段的ADL低下</p>
          </div>
          <div className="bg-muted/20 border border-border/50 rounded p-2">
            <p className="font-bold text-primary mb-1">カテゴリー III</p>
            <p className="text-muted-foreground">中度以上の認知症、または基本的ADL低下</p>
          </div>
        </div>

        {/* 低血糖リスク薬剤なし */}
        <div className="mb-3">
          <div className="bg-blue-950/20 border border-blue-700/50 rounded-t px-3 py-2">
            <p className="text-xs font-semibold text-blue-300">重症低血糖が危惧される薬剤を<span className="underline">使用しない</span>場合（SU薬・インスリンなし）</p>
          </div>
          <div className="grid grid-cols-3 border border-t-0 border-border/50 rounded-b divide-x divide-border/50 text-xs">
            <div className="p-3 text-center">
              <p className="text-muted-foreground mb-1">カテゴリー I</p>
              <p className="font-bold text-green-400 text-base">7.0未満</p>
            </div>
            <div className="p-3 text-center">
              <p className="text-muted-foreground mb-1">カテゴリー II</p>
              <p className="font-bold text-green-400 text-base">7.0未満</p>
            </div>
            <div className="p-3 text-center">
              <p className="text-muted-foreground mb-1">カテゴリー III</p>
              <p className="font-bold text-yellow-400 text-base">8.0未満</p>
            </div>
          </div>
        </div>

        {/* 低血糖リスク薬剤あり */}
        <div>
          <div className="bg-orange-950/20 border border-orange-700/50 rounded-t px-3 py-2">
            <p className="text-xs font-semibold text-orange-300">重症低血糖が危惧される薬剤を<span className="underline">使用する</span>場合（SU薬・インスリンあり）</p>
          </div>
          <div className="grid grid-cols-3 border border-t-0 border-border/50 rounded-b divide-x divide-border/50 text-xs">
            <div className="p-3 text-center">
              <p className="text-muted-foreground mb-1">カテゴリー I</p>
              <div className="space-y-2">
                <div>
                  <p className="text-yellow-400 font-semibold">65〜74歳</p>
                  <p className="font-bold text-primary text-base">7.5未満</p>
                  <p className="text-muted-foreground">（下限 6.5%）</p>
                </div>
                <div className="border-t border-border/30 pt-2">
                  <p className="text-yellow-400 font-semibold">75歳以上</p>
                  <p className="font-bold text-primary text-base">8.0未満</p>
                  <p className="text-muted-foreground">（下限 7.0%）</p>
                </div>
              </div>
            </div>
            <div className="p-3 text-center">
              <p className="text-muted-foreground mb-1">カテゴリー II</p>
              <p className="font-bold text-orange-400 text-base">8.0未満</p>
              <p className="text-muted-foreground">（下限 7.0%）</p>
            </div>
            <div className="p-3 text-center">
              <p className="text-muted-foreground mb-1">カテゴリー III</p>
              <p className="font-bold text-red-400 text-base">8.5未満</p>
              <p className="text-muted-foreground">（下限 7.5%）</p>
            </div>
          </div>
        </div>

        <div className="mt-4 space-y-2 text-xs text-muted-foreground">
          <div className="bg-blue-950/20 border border-blue-700/50 rounded p-3">
            <p className="font-semibold text-blue-400 mb-1">【重要な考慮事項】</p>
            <ul className="space-y-1">
              <li>● 治療目標は、年齢、罹病期間、低血糖の危険性、サポート体制などに加え、高齢者では認知機能・ADL、併存疾患なども考慮して個別に設定する</li>
              <li>● 加齢に伴って重症低血糖の危険性が高くなるため十分注意する</li>
              <li>● カテゴリーIIIに該当する状態で、多剤併用による有害作用が懸念される場合や、重篤な併存疾患を有する場合には、8.5%未満を目標とすることも許容される</li>
            </ul>
          </div>
          <p className="text-muted-foreground">
            <span className="text-yellow-400">出典：</span>日本糖尿病学会編・著『糖尿病治療ガイド 2018-2019』、日本老年医学会・日本糖尿病学会編・著『高齢者糖尿病診療ガイド 2017』
          </p>
        </div>
      </Card>

      {/* 特殊状況 */}
      <Card className="bg-card border-border p-4">
        <h3 className="font-semibold mb-3 text-primary text-base">■ 特殊状況下での目標設定</h3>
        <div className="space-y-2 text-xs">
          <div className="bg-yellow-950/20 border border-yellow-700/50 rounded p-3">
            <p className="font-semibold text-yellow-400 mb-1">妊娠糖尿病・妊娠中の糖尿病</p>
            <p className="text-muted-foreground">
              空腹時血糖 &lt;95 mg/dL、食後1時間 &lt;140 mg/dL、食後2時間 &lt;120 mg/dL
            </p>
          </div>
          <div className="bg-red-950/20 border border-red-700/50 rounded p-3">
            <p className="font-semibold text-red-400 mb-1">周術期・シックデイ</p>
            <p className="text-muted-foreground">
              血糖値 150～250 mg/dL を目標に管理。低血糖回避を優先。
            </p>
          </div>
          <div className="bg-orange-950/20 border border-orange-700/50 rounded p-3">
            <p className="font-semibold text-orange-400 mb-1">透析患者</p>
            <p className="text-muted-foreground">
              HbA1c 7.0～8.0% を目標。低血糖リスク・心血管イベント・栄養状態を総合的に判断。
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
