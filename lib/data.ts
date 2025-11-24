export interface Element {
  symbol: string
  atomicNumber: number
  nameTh: string
  nameEn: string
  groups: string[]
  bands: string[]
  spectralHints: Record<string, string>
  typicalMaterials: string[]
  typicalObjects: string[]
}

export interface MixRule {
  elements: string[]
  label: string
  materials: string[]
  objects: string[]
  bands: string[]
  spectralNote: string
}

export interface Material {
  id: string
  label: string
  elements: Record<string, number>
  objects: string[]
}

export interface SceneZone {
  id: string
  label: string
  color: string
  areaFraction: number
  materialMix: Record<string, number>
}

export interface CompositionResult {
  sceneElementTotals: Record<string, number>
  sceneElementPerc: Record<string, number>
  zoneElementTotals: Record<string, Record<string, number>>
  zoneElementPerc: Record<string, Record<string, number>>
}

export const ELEMENTS: Element[] = [
  {
    symbol: "Fe",
    atomicNumber: 26,
    nameTh: "เหล็ก",
    nameEn: "Iron",
    groups: ["Transition metal"],
    bands: ["VIS", "NIR", "SWIR"],
    spectralHints: {
      VIS: "iron oxides ทำให้ดิน/หินสีแดง-น้ำตาลเข้ม สะท้อนในแถบแดงสูงเมื่อเทียบกับน้ำเงิน/เขียว",
      NIR: "ดินที่มี Fe สูงมัก reflectance ต่ำใน NIR เมื่อเทียบกับ quartz-rich sand/rock",
      SWIR: "ร่วมกับแร่ดิน/ซิลิเกต ใช้ band ratio แยก lateritic soil / iron ore",
      TIR: "ใช้ thermal emissivity แยกชนิดแร่เหล็กกับหินรอบข้าง",
    },
    typicalMaterials: ["Hematite (Fe₂O₃)", "Goethite (FeO(OH))", "Laterite / red soil"],
    typicalObjects: ["ดินแดงในเขตร้อน", "เหมืองแร่เหล็ก", "สนิมเหล็กบนโครงสร้าง/หลังคา"],
  },
  {
    symbol: "Si",
    atomicNumber: 14,
    nameTh: "ซิลิคอน",
    nameEn: "Silicon",
    groups: ["Metalloid"],
    bands: ["SWIR", "TIR"],
    spectralHints: {
      VIS: "อยู่ใน quartz / sand / glass สีออกขาว-อ่อน",
      NIR: "quartz-rich sand/rock ค่อนข้างสว่าง",
      SWIR: "quartz มี absorption แถว ~2.2µm ใช้แยก quartzite / sandstone",
      TIR: "ซิลิกาเด่นใน thermal emissivity ของหิน felsic",
    },
    typicalMaterials: ["Quartz (SiO₂)", "Silica sand", "Glass, concrete"],
    typicalObjects: ["ชายหาดทรายขาว", "ทะเลทราย", "พื้นที่เมืองที่เต็มไปด้วย concrete / glass"],
  },
  {
    symbol: "C",
    atomicNumber: 6,
    nameTh: "คาร์บอน",
    nameEn: "Carbon",
    groups: ["Non-metal"],
    bands: ["VIS", "NIR", "SWIR"],
    spectralHints: {
      VIS: "organic matter, asphalt, soot มักมืดมากใน VIS",
      NIR: "vegetation สะท้อน NIR สูง (เพราะ chlorophyll + leaf structure)",
      SWIR: "hydrocarbons มี absorption บางช่วงใน SWIR",
      TIR: "ใช้ดู organic coatings / soot บางเคส",
    },
    typicalMaterials: ["Organic matter", "Hydrocarbons (oil, fuel)", "Asphalt"],
    typicalObjects: ["พื้นที่เกษตร/ป่า (พืช)", "ถนน asphalt", "oil spill บนผิวน้ำ"],
  },
  {
    symbol: "Ca",
    atomicNumber: 20,
    nameTh: "แคลเซียม",
    nameEn: "Calcium",
    groups: ["Alkaline earth metal"],
    bands: ["SWIR", "TIR"],
    spectralHints: {
      VIS: "หินปูน/คาร์บอเนตมักค่อนข้างสว่าง",
      NIR: "bright tone ใน NIR",
      SWIR: "คาร์บอเนตมี absorption ชัดใน SWIR บางช่วง",
      TIR: "เด่นใน thermal signatures ของ limestone/dolomite",
    },
    typicalMaterials: ["Calcite (CaCO₃)", "Limestone", "Cement"],
    typicalObjects: ["ภูเขาหินปูน", "เหมืองหินปูน", "โรงปูนซีเมนต์"],
  },
  {
    symbol: "Na",
    atomicNumber: 11,
    nameTh: "โซเดียม",
    nameEn: "Sodium",
    groups: ["Alkali metal"],
    bands: ["VIS", "NIR", "SWIR"],
    spectralHints: {
      VIS: "เกลือบริสุทธิ์ค่อนข้างขาวสว่าง",
      NIR: "salt flats สว่างใน VIS-NIR",
      SWIR: "บาง salt minerals มี absorption เฉพาะใน SWIR",
      TIR: "ใช้ร่วมกับข้อมูลอื่นแยก evaporites",
    },
    typicalMaterials: ["Halite (NaCl)", "Evaporite salts"],
    typicalObjects: ["salt flats", "บ่อระเหยเกลือ", "salty playa lakes"],
  },
  {
    symbol: "Cl",
    atomicNumber: 17,
    nameTh: "คลอรีน",
    nameEn: "Chlorine",
    groups: ["Halogen"],
    bands: ["VIS", "NIR", "SWIR"],
    spectralHints: {
      VIS: "อยู่ในเกลือ, PVC ฯลฯ",
      NIR: "คล้าย Na ในกรณี halite",
      SWIR: "ใช้ร่วมกับ Na ในการจำแนกเกลือ",
      TIR: "บาง evaporites เด่นใน LWIR",
    },
    typicalMaterials: ["Halite (NaCl)", "บางชนิดของ PVC / plastics"],
    typicalObjects: ["salt flats", "บ่อเกลือ", "เขตอุตสาหกรรมพลาสติกบางประเภท"],
  },
]

export const MIX_RULES: MixRule[] = [
  {
    elements: ["Fe", "O"],
    label: "Iron oxides (hematite/goethite) → red soil / iron ore",
    materials: ["Hematite", "Goethite", "Laterite soil"],
    objects: ["ดินแดง", "เหมืองแร่เหล็ก", "สนิมเหล็กบนโครงสร้าง"],
    bands: ["VIS", "NIR"],
    spectralNote: "สีแดง-น้ำตาลเข้มใน VIS; reflectance ค่อนข้างต่ำใน NIR",
  },
  {
    elements: ["Si", "O"],
    label: "Quartz / silica-rich materials → sand / glass / concrete",
    materials: ["Quartz", "Silica sand", "Glass", "Concrete"],
    objects: ["ชายหาดทรายขาว", "ทะเลทราย", "พื้นที่เมือง"],
    bands: ["SWIR", "VIS", "NIR"],
    spectralNote: "SWIR มี absorption แถว ~2.2µm; โดยรวมค่อนข้างสว่าง",
  },
  {
    elements: ["C", "H"],
    label: "Hydrocarbons → oil / fuel / asphalt",
    materials: ["Crude oil", "Refined fuels", "Asphalt"],
    objects: ["oil spill บนทะเล", "ถังเก็บน้ำมัน", "ถนน asphalt"],
    bands: ["SWIR", "VIS", "NIR"],
    spectralNote: "มืดใน VIS-NIR; มี absorption บางช่วงใน SWIR",
  },
  {
    elements: ["Ca", "C", "O"],
    label: "Carbonates (calcite/limestone) → limestone cliffs / cement",
    materials: ["Calcite", "Limestone", "Cement"],
    objects: ["ภูเขาหินปูน", "เหมืองหิน", "โรงปูน"],
    bands: ["SWIR", "TIR", "VIS"],
    spectralNote: "สว่างใน VIS-NIR; SWIR มี absorption เฉพาะของ carbonates",
  },
  {
    elements: ["Na", "Cl"],
    label: "Halite (salt) → salt flats / evaporation ponds",
    materials: ["Halite", "Evaporite salts"],
    objects: ["salt flats", "บ่อระเหยเกลือ"],
    bands: ["VIS", "NIR", "SWIR"],
    spectralNote: "โทนสว่างมากใน VIS-NIR; pattern ขาวมากในภาพดาวเทียม",
  },
]

export const MATERIAL_LIBRARY: Material[] = [
  {
    id: "healthy_veg",
    label: "Healthy green vegetation",
    elements: { C: 1.0 },
    objects: ["ป่าเขียวสมบูรณ์", "สวนเกษตรเขียว"],
  },
  {
    id: "stressed_veg",
    label: "Stressed / dry vegetation",
    elements: { C: 0.7, Fe: 0.3 },
    objects: ["ป่าเสื่อมโทรม", "พื้นที่ไฟไหม้เก่า"],
  },
  {
    id: "iron_soil",
    label: "Iron-rich soil / laterite",
    elements: { Fe: 0.8, Si: 0.2 },
    objects: ["ดินแดง", "เหมืองเปิดหน้า", "ไหล่เขาดินแดง"],
  },
  {
    id: "quartz_sand",
    label: "Quartz sand / bright bare ground",
    elements: { Si: 1.0 },
    objects: ["ชายหาดทราย", "ลานหินทราย", "ถนนลูกรังสีอ่อน"],
  },
  {
    id: "salt_crust",
    label: "Surface salt / evaporite",
    elements: { Na: 0.5, Cl: 0.5 },
    objects: ["salt flats", "บ่อระเหยเกลือ"],
  },
]

export const SCENE_ZONES: SceneZone[] = [
  {
    id: "zone1",
    label: "Zone 1 – Healthy forest",
    color: "#22c55e",
    areaFraction: 0.4,
    materialMix: {
      healthy_veg: 0.8,
      iron_soil: 0.2,
    },
  },
  {
    id: "zone2",
    label: "Zone 2 – Damaged / dry forest",
    color: "#f97316",
    areaFraction: 0.25,
    materialMix: {
      stressed_veg: 0.6,
      iron_soil: 0.3,
      quartz_sand: 0.1,
    },
  },
  {
    id: "zone3",
    label: "Zone 3 – Bright bare ground",
    color: "#eab308",
    areaFraction: 0.2,
    materialMix: {
      quartz_sand: 0.7,
      iron_soil: 0.3,
    },
  },
  {
    id: "zone4",
    label: "Zone 4 – Salt / disturbed area",
    color: "#38bdf8",
    areaFraction: 0.15,
    materialMix: {
      salt_crust: 0.7,
      quartz_sand: 0.3,
    },
  },
]

export const BANDS = ["ALL", "VIS", "NIR", "SWIR", "TIR"]

export function computeSceneCompositions(zones: SceneZone[], materials: Material[]): CompositionResult {
  const materialMap: Record<string, Material> = {}
  materials.forEach((m) => {
    materialMap[m.id] = m
  })

  const sceneElementTotals: Record<string, number> = {}
  const zoneElementTotals: Record<string, Record<string, number>> = {}

  zones.forEach((zone) => {
    if (!zoneElementTotals[zone.id]) zoneElementTotals[zone.id] = {}
    const zTotals = zoneElementTotals[zone.id]

    Object.entries(zone.materialMix).forEach(([matId, matFraction]) => {
      const mat = materialMap[matId]
      if (!mat) return
      Object.entries(mat.elements).forEach(([symbol, elemWeight]) => {
        const contribution = zone.areaFraction * matFraction * elemWeight
        sceneElementTotals[symbol] = (sceneElementTotals[symbol] || 0) + contribution
        zTotals[symbol] = (zTotals[symbol] || 0) + contribution
      })
    })
  })

  const sceneTotal = Object.values(sceneElementTotals).reduce((sum, v) => sum + v, 0) || 1
  const sceneElementPerc: Record<string, number> = {}
  Object.entries(sceneElementTotals).forEach(([sym, val]) => {
    sceneElementPerc[sym] = (val / sceneTotal) * 100
  })

  const zoneElementPerc: Record<string, Record<string, number>> = {}
  Object.entries(zoneElementTotals).forEach(([zoneId, zMap]) => {
    const zTotal = Object.values(zMap).reduce((s, v) => s + v, 0) || 1
    const percMap: Record<string, number> = {}
    Object.entries(zMap).forEach(([sym, val]) => {
      percMap[sym] = (val / zTotal) * 100
    })
    zoneElementPerc[zoneId] = percMap
  })

  return { sceneElementTotals, sceneElementPerc, zoneElementTotals, zoneElementPerc }
}

export function getElementZoneInfo(symbol: string, zones: SceneZone[], composition: CompositionResult) {
  const { sceneElementTotals, zoneElementTotals } = composition
  const totalElem = sceneElementTotals[symbol] || 0
  if (!totalElem) return { totalElem: 0, zoneRows: [] }

  interface ZoneRow {
    zone: SceneZone
    withinZonePercent: number
    contributionPercent: number
  }
  const zoneRows: ZoneRow[] = []
  zones.forEach((zone) => {
    const zMap = zoneElementTotals[zone.id] || {}
    const elemVal = zMap[symbol]
    if (!elemVal) return
    const zoneTotal = Object.values(zMap).reduce((s, v) => s + v, 0) || 1
    zoneRows.push({
      zone,
      withinZonePercent: (elemVal / zoneTotal) * 100,
      contributionPercent: (elemVal / totalElem) * 100,
    })
  })

  zoneRows.sort((a, b) => b.contributionPercent - a.contributionPercent)
  return { totalElem, zoneRows }
}

export function getZoneTopElements(zoneId: string, composition: CompositionResult, limit = 2) {
  const zMap = composition.zoneElementPerc[zoneId] || {}
  const entries = Object.entries(zMap).sort((a, b) => b[1] - a[1])
  return entries.slice(0, limit)
}
