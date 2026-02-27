import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const connection = await mysql.createConnection(process.env.DATABASE_URL);

try {
  console.log('🌱 Starting database seeding...\n');

  // ============================================
  // インスリン製剤データ
  // ============================================
  console.log('📊 Seeding insulin formulations...');
  
  const insulinData = [
    // 超超速効型
    { category: '超超速効型', genericName: 'アスパルト酸速効型', brandName: 'フィアスプ', onsetTime: '10分', peakTime: '1時間', duration: '3～4時間', wardUse: '食直前投与、速効性が必要な場合' },
    { category: '超超速効型', genericName: 'リスプロ速効型', brandName: 'ルムジェブ', onsetTime: '10分', peakTime: '1時間', duration: '3～4時間', wardUse: '食直前投与、速効性が必要な場合' },
    
    // 超速効型
    { category: '超速効型', genericName: 'アスパルト', brandName: 'ノボラピッド', onsetTime: '10～20分', peakTime: '1～3時間', duration: '3～5時間', wardUse: '食直前投与、基礎インスリンとの併用' },
    { category: '超速効型', genericName: 'リスプロ', brandName: 'ヒューマログ', onsetTime: '10～20分', peakTime: '1～3時間', duration: '3～5時間', wardUse: '食直前投与、基礎インスリンとの併用' },
    { category: '超速効型', genericName: 'グルリジン', brandName: 'アピドラ', onsetTime: '10～20分', peakTime: '1～3時間', duration: '3～5時間', wardUse: '食直前投与、血糖変動が大きい場合' },
    
    // 速効型
    { category: '速効型', genericName: 'ヒト正規インスリン', brandName: 'ヒューマリンR', onsetTime: '30分', peakTime: '2～3時間', duration: '5～8時間', wardUse: '食前投与、緊急時の血糖低下' },
    { category: '速効型', genericName: 'ヒト正規インスリン', brandName: 'ノボリンR', onsetTime: '30分', peakTime: '2～3時間', duration: '5～8時間', wardUse: '食前投与、緊急時の血糖低下' },
    
    // 中間型
    { category: '中間型', genericName: 'NPHインスリン', brandName: 'ヒューマリンN', onsetTime: '1～2時間', peakTime: '4～8時間', duration: '10～16時間', wardUse: '基礎インスリン、1日2回投与' },
    { category: '中間型', genericName: 'NPHインスリン', brandName: 'ノボリンN', onsetTime: '1～2時間', peakTime: '4～8時間', duration: '10～16時間', wardUse: '基礎インスリン、1日2回投与' },
    
    // 持効型
    { category: '持効型', genericName: 'グラルギン', brandName: 'ランタス', onsetTime: '1～2時間', peakTime: 'フラット', duration: '24時間', wardUse: '基礎インスリン、1日1回投与' },
    { category: '持効型', genericName: 'グラルギン300単位/mL', brandName: 'ランタスXR', onsetTime: '1～2時間', peakTime: 'フラット', duration: '24時間以上', wardUse: '基礎インスリン、1日1回投与、血糖変動が小さい' },
    { category: '持効型', genericName: 'デグルデク', brandName: 'トレシーバ', onsetTime: '1～2時間', peakTime: 'フラット', duration: '42時間', wardUse: '基礎インスリン、1日1回投与、週1回投与も可能' },
    { category: '持効型', genericName: 'デテミル', brandName: 'レベミル', onsetTime: '1～2時間', peakTime: 'フラット', duration: '24時間', wardUse: '基礎インスリン、1日1～2回投与' },
    
    // 混合型
    { category: '混合型', genericName: 'アスパルト混合（30/70）', brandName: 'ノボラピッドミックス30', onsetTime: '10～20分', peakTime: '1～4時間', duration: '16～24時間', wardUse: '食前投与、1日1～2回、血糖コントロールが良好な患者' },
    { category: '混合型', genericName: 'アスパルト混合（50/50）', brandName: 'ノボラピッドミックス50', onsetTime: '10～20分', peakTime: '1～4時間', duration: '16～24時間', wardUse: '食前投与、血糖変動が大きい場合' },
    { category: '混合型', genericName: 'アスパルト混合（70/30）', brandName: 'ノボラピッドミックス70', onsetTime: '10～20分', peakTime: '1～4時間', duration: '16～24時間', wardUse: '食前投与、基礎インスリンの必要性が高い場合' },
    { category: '混合型', genericName: 'リスプロ混合（25/75）', brandName: 'ヒューマログミックス25', onsetTime: '10～20分', peakTime: '1～4時間', duration: '16～24時間', wardUse: '食前投与、1日1～2回' },
    { category: '混合型', genericName: 'リスプロ混合（50/50）', brandName: 'ヒューマログミックス50', onsetTime: '10～20分', peakTime: '1～4時間', duration: '16～24時間', wardUse: '食前投与、血糖変動が大きい場合' },
    { category: '混合型', genericName: 'ヒト混合（30/70）', brandName: 'ヒューマリン3/7', onsetTime: '30分', peakTime: '2～8時間', duration: '24時間', wardUse: '食前投与、従来型混合インスリン' },
    { category: '混合型', genericName: 'ヒト混合（30/70）', brandName: 'ノボリン30R', onsetTime: '30分', peakTime: '2～8時間', duration: '24時間', wardUse: '食前投与、従来型混合インスリン' },
    { category: '混合型', genericName: 'デグルデク/アスパルト配合', brandName: 'ライゾデグ配合注', onsetTime: '10～20分', peakTime: '1～9時間', duration: '42時間', wardUse: '食前投与、基礎と食後血糖の両方に対応' },
    
    // 週1回基礎
    { category: '週1回基礎', genericName: 'デグルデク週1回', brandName: 'アウィクリ', onsetTime: '48～72時間', peakTime: 'フラット', duration: '168時間以上', wardUse: '週1回投与、コンプライアンス向上' },
  ];

  for (const insulin of insulinData) {
    await connection.execute(
      'INSERT INTO insulin_formulations (category, generic_name, brand_name, onset_time, peak_time, duration, ward_use) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [insulin.category, insulin.genericName, insulin.brandName, insulin.onsetTime, insulin.peakTime, insulin.duration, insulin.wardUse]
    );
  }
  console.log(`✅ Inserted ${insulinData.length} insulin formulations\n`);

  // ============================================
  // 経口血糖降下薬データ
  // ============================================
  console.log('📊 Seeding oral antidiabetic drugs...');
  
  const oralDrugsData = [
    // ビグアナイド
    { class: 'ビグアナイド', genericName: 'メトホルミン', brandName: 'グリコランなど', contraindications: '重度の腎機能障害、肝機能障害', perioperativeSuspensionDays: 2, resumptionGuidance: '術後腎機能確認後に再開' },
    
    // SGLT2阻害薬
    { class: 'SGLT2阻害薬', genericName: 'ダパグリフロジン', brandName: 'フォシーガ', contraindications: '1型糖尿病、DKA既往', perioperativeSuspensionDays: 1, resumptionGuidance: '術後1日以降に再開' },
    { class: 'SGLT2阻害薬', genericName: 'エンパグリフロジン', brandName: 'ジャディアンス', contraindications: '1型糖尿病、DKA既往', perioperativeSuspensionDays: 1, resumptionGuidance: '術後1日以降に再開' },
    { class: 'SGLT2阻害薬', genericName: 'カナグリフロジン', brandName: 'カナグル', contraindications: '1型糖尿病、DKA既往', perioperativeSuspensionDays: 1, resumptionGuidance: '術後1日以降に再開' },
    
    // DPP-4阻害薬
    { class: 'DPP-4阻害薬', genericName: 'シタグリプチン', brandName: 'ジャヌビア', contraindications: '重度の腎機能障害', perioperativeSuspensionDays: 0, resumptionGuidance: '術後腎機能確認後に再開' },
    { class: 'DPP-4阻害薬', genericName: 'ビルダグリプチン', brandName: 'ガルバス', contraindications: '肝機能障害', perioperativeSuspensionDays: 0, resumptionGuidance: '術後肝機能確認後に再開' },
    { class: 'DPP-4阻害薬', genericName: 'リナグリプチン', brandName: 'トラジェンタ', contraindications: 'なし', perioperativeSuspensionDays: 0, resumptionGuidance: '術後腎機能確認後に再開' },
    
    // GLP-1受容体作動薬
    { class: 'GLP-1受容体作動薬', genericName: 'リラグルチド', brandName: 'ビクトーザ', contraindications: '個人的または家族歴のある甲状腺髄様がん、MEN2', perioperativeSuspensionDays: 1, resumptionGuidance: '術後1日以降に再開' },
    { class: 'GLP-1受容体作動薬', genericName: 'セマグルチド', brandName: 'オゼンピック', contraindications: '個人的または家族歴のある甲状腺髄様がん、MEN2', perioperativeSuspensionDays: 1, resumptionGuidance: '術後1日以降に再開' },
    { class: 'GLP-1受容体作動薬', genericName: 'デュラグルチド', brandName: 'トルリシティ', contraindications: '個人的または家族歴のある甲状腺髄様がん、MEN2', perioperativeSuspensionDays: 1, resumptionGuidance: '術後1日以降に再開' },
    
    // SU薬
    { class: 'SU薬', genericName: 'グリベンクラミド', brandName: 'ダオニール', contraindications: '重度の肝・腎機能障害', perioperativeSuspensionDays: 1, resumptionGuidance: '術後1日以降に再開' },
    { class: 'SU薬', genericName: 'グリクラジド', brandName: 'グリミクロン', contraindications: '重度の肝・腎機能障害', perioperativeSuspensionDays: 1, resumptionGuidance: '術後1日以降に再開' },
    
    // グリニド
    { class: 'グリニド', genericName: 'ナテグリニド', brandName: 'スターシス', contraindications: '重度の肝・腎機能障害', perioperativeSuspensionDays: 0, resumptionGuidance: '術後腎機能確認後に再開' },
    { class: 'グリニド', genericName: 'ミチグリニド', brandName: 'グルファスト', contraindications: '重度の肝・腎機能障害', perioperativeSuspensionDays: 0, resumptionGuidance: '術後腎機能確認後に再開' },
    
    // α-GI
    { class: 'α-GI', genericName: 'アカルボース', brandName: 'グルコバイ', contraindications: '腸閉塞、重度の消化管疾患', perioperativeSuspensionDays: 0, resumptionGuidance: '術後腸機能回復後に再開' },
    { class: 'α-GI', genericName: 'ボグリボース', brandName: 'ベイスン', contraindications: '腸閉塞、重度の消化管疾患', perioperativeSuspensionDays: 0, resumptionGuidance: '術後腸機能回復後に再開' },
    
    // チアゾリジン
    { class: 'チアゾリジン', genericName: 'ピオグリタゾン', brandName: 'アクトス', contraindications: '心不全、膀胱がん既往', perioperativeSuspensionDays: 0, resumptionGuidance: '術後腎機能確認後に再開' },
  ];

  for (const drug of oralDrugsData) {
    await connection.execute(
      'INSERT INTO oral_antidiabetic_drugs (class, generic_name, brand_name, contraindications, perioperative_suspension_days, resumption_guidance) VALUES (?, ?, ?, ?, ?, ?)',
      [drug.class, drug.genericName, drug.brandName, drug.contraindications, drug.perioperativeSuspensionDays, drug.resumptionGuidance]
    );
  }
  console.log(`✅ Inserted ${oralDrugsData.length} oral antidiabetic drugs\n`);

  // ============================================
  // 糖含有輸液データ
  // ============================================
  console.log('📊 Seeding glucose containing fluids...');
  
  const fluidsData = [
    // ブドウ糖単独
    { category: 'ブドウ糖単独', brandName: '5％ブドウ糖注射液', volume: 500, glucoseConcentration: 5.0, totalGlucosePerBottle: 25.0 },
    { category: 'ブドウ糖単独', brandName: '10％ブドウ糖注射液', volume: 500, glucoseConcentration: 10.0, totalGlucosePerBottle: 50.0 },
    { category: 'ブドウ糖単独', brandName: '20％ブドウ糖注射液', volume: 500, glucoseConcentration: 20.0, totalGlucosePerBottle: 100.0 },
    { category: 'ブドウ糖単独', brandName: '50％ブドウ糖注射液', volume: 100, glucoseConcentration: 50.0, totalGlucosePerBottle: 50.0 },
    
    // 糖含有電解質液
    { category: '糖含有電解質液', brandName: 'ソリタT1号', volume: 500, glucoseConcentration: 5.0, totalGlucosePerBottle: 25.0 },
    { category: '糖含有電解質液', brandName: 'ソリタT2号', volume: 500, glucoseConcentration: 5.0, totalGlucosePerBottle: 25.0 },
    { category: '糖含有電解質液', brandName: 'ソリタT3号', volume: 500, glucoseConcentration: 5.0, totalGlucosePerBottle: 25.0 },
    { category: '糖含有電解質液', brandName: 'ソリタT4号', volume: 500, glucoseConcentration: 5.0, totalGlucosePerBottle: 25.0 },
    { category: '糖含有電解質液', brandName: 'EL-1号', volume: 500, glucoseConcentration: 5.0, totalGlucosePerBottle: 25.0 },
    { category: '糖含有電解質液', brandName: 'EL-2号', volume: 500, glucoseConcentration: 5.0, totalGlucosePerBottle: 25.0 },
    { category: '糖含有電解質液', brandName: 'EL-3号', volume: 500, glucoseConcentration: 5.0, totalGlucosePerBottle: 25.0 },
    { category: '糖含有電解質液', brandName: 'EL-4号', volume: 500, glucoseConcentration: 5.0, totalGlucosePerBottle: 25.0 },
    { category: '糖含有電解質液', brandName: 'フィジオ140', volume: 500, glucoseConcentration: 5.0, totalGlucosePerBottle: 25.0 },
    { category: '糖含有電解質液', brandName: 'ラクテックD', volume: 500, glucoseConcentration: 5.0, totalGlucosePerBottle: 25.0 },
    { category: '糖含有電解質液', brandName: 'ソルラクトD', volume: 500, glucoseConcentration: 5.0, totalGlucosePerBottle: 25.0 },
    { category: '糖含有電解質液', brandName: 'ビーフリード', volume: 500, glucoseConcentration: 5.0, totalGlucosePerBottle: 25.0 },
  ];

  for (const fluid of fluidsData) {
    await connection.execute(
      'INSERT INTO glucose_containing_fluids (category, brand_name, volume, glucose_concentration, total_glucose_per_bottle) VALUES (?, ?, ?, ?, ?)',
      [fluid.category, fluid.brandName, fluid.volume, fluid.glucoseConcentration, fluid.totalGlucosePerBottle]
    );
  }
  console.log(`✅ Inserted ${fluidsData.length} glucose containing fluids\n`);

  // ============================================
  // IVH製剤データ
  // ============================================
  console.log('📊 Seeding IVH formulations...');
  
  const ivhData = [
    { brandName: 'エルネオパ1号', totalGlucose: 100.0 },
    { brandName: 'エルネオパ2号', totalGlucose: 150.0 },
    { brandName: 'ハイカリック1号', totalGlucose: 120.0 },
    { brandName: 'ハイカリック2号', totalGlucose: 150.0 },
    { brandName: 'ハイカリック3号', totalGlucose: 180.0 },
    { brandName: 'ユニカリック', totalGlucose: 140.0 },
    { brandName: 'ピーエヌツイン', totalGlucose: 130.0 },
    { brandName: 'フルカリック', totalGlucose: 160.0 },
    { brandName: 'アミノフリード', totalGlucose: 110.0 },
  ];

  for (const ivh of ivhData) {
    await connection.execute(
      'INSERT INTO ivh_formulations (brand_name, total_glucose) VALUES (?, ?)',
      [ivh.brandName, ivh.totalGlucose]
    );
  }
  console.log(`✅ Inserted ${ivhData.length} IVH formulations\n`);

  // ============================================
  // 腎症ステージデータ
  // ============================================
  console.log('📊 Seeding nephropathy stages...');
  
  const stagesData = [
    { stage: 1, eGFRMin: 90, eGFRMax: 999, proteinMin: 0.8, proteinMax: 1.0, description: '正常～軽度低下' },
    { stage: 2, eGFRMin: 60, eGFRMax: 89, proteinMin: 0.8, proteinMax: 1.0, description: '軽度低下' },
    { stage: 3, eGFRMin: 30, eGFRMax: 59, proteinMin: 0.8, proteinMax: 0.8, description: '中等度低下' },
    { stage: 4, eGFRMin: 15, eGFRMax: 29, proteinMin: 0.6, proteinMax: 0.8, description: '高度低下' },
    { stage: 5, eGFRMin: 0, eGFRMax: 14, proteinMin: 0.6, proteinMax: 0.6, description: '腎不全' },
  ];

  for (const stage of stagesData) {
    await connection.execute(
      'INSERT INTO nephropathy_stages (stage, egfr_min, egfr_max, protein_recommendation_min, protein_recommendation_max, description) VALUES (?, ?, ?, ?, ?, ?)',
      [stage.stage, stage.eGFRMin, stage.eGFRMax, stage.proteinMin, stage.proteinMax, stage.description]
    );
  }
  console.log(`✅ Inserted ${stagesData.length} nephropathy stages\n`);

  console.log('✨ Database seeding completed successfully!\n');
} catch (error) {
  console.error('❌ Error during seeding:', error);
  process.exit(1);
} finally {
  await connection.end();
}
