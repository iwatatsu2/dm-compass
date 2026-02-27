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
        <h3 className="font-semibold mb-3 text-primary text-base">■ 高齢者糖尿病の血糖コントロール目標（HbA1c値）</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-muted/30">
                <th className="border border-border/50 p-2 text-left font-semibold">患者の特徴・健康状態</th>
                <th className="border border-border/50 p-2 text-center font-semibold">
                  カテゴリーI<br/>
                  <span className="font-normal text-muted-foreground text-xs">認知機能正常<br/>かつADL自立</span>
                </th>
                <th className="border border-border/50 p-2 text-center font-semibold">
                  カテゴリーII<br/>
                  <span className="font-normal text-muted-foreground text-xs">軽度認知障害、<br/>手段的ADL低下</span>
                </th>
                <th className="border border-border/50 p-2 text-center font-semibold">
                  カテゴリーIII<br/>
                  <span className="font-normal text-muted-foreground text-xs">中度以上の認知症<br/>基本的ADL低下</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border/50 p-2">
                  <span className="font-semibold">重症低血糖が危惧される薬剤を使用しない</span><br/>
                  <span className="text-muted-foreground text-xs">（SU薬・インスリンなし）</span>
                </td>
                <td className="border border-border/50 p-2 text-center">
                  <p className="font-bold text-green-400">7.0未満</p>
                </td>
                <td className="border border-border/50 p-2 text-center">
                  <p className="font-bold text-green-400">7.0未満</p>
                </td>
                <td className="border border-border/50 p-2 text-center">
                  <p className="font-bold text-yellow-400">8.0未満</p>
                </td>
              </tr>
              <tr className="bg-muted/10">
                <td className="border border-border/50 p-2">
                  <span className="font-semibold">重症低血糖が危惧される薬剤を使用する</span><br/>
                  <span className="text-muted-foreground text-xs">（SU薬・インスリンあり）</span>
                </td>
                <td className="border border-border/50 p-2 text-center">
                  <div className="space-y-1">
                    <p className="text-yellow-400 text-xs font-semibold">65～74歳</p>
                    <p className="font-bold text-primary">7.5未満</p>
                    <p className="text-xs text-muted-foreground">（下限 6.5%）</p>
                    <p className="text-yellow-400 text-xs font-semibold mt-1">75歳以上</p>
                    <p className="font-bold text-primary">8.0未満</p>
                    <p className="text-xs text-muted-foreground">（下限 7.0%）</p>
                  </div>
                </td>
                <td className="border border-border/50 p-2 text-center">
                  <p className="font-bold text-orange-400">8.0未満</p>
                  <p className="text-xs text-muted-foreground">（下限 7.0%）</p>
                </td>
                <td className="border border-border/50 p-2 text-center">
                  <p className="font-bold text-red-400">8.5未満</p>
                  <p className="text-xs text-muted-foreground">（下限 7.5%）</p>
                </td>
              </tr>
            </tbody>
          </table>
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
