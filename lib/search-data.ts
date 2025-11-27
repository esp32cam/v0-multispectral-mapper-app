// Element emoji mapping
const ELEMENT_EMOJIS: Record<string, string> = {
  Fe: "🔴", // Iron - red/rusty color
  Si: "💎", // Silicon - crystal/glass
  C: "🌿", // Carbon - organic/plant
  Ca: "🪨", // Calcium - limestone/rock
  Na: "🧂", // Sodium - salt
  Cl: "🧂", // Chlorine - salt
  O: "💨", // Oxygen - air
  H: "💧", // Hydrogen - water
  N: "🌾", // Nitrogen - agriculture
  Al: "⚙️", // Aluminum - metal/industry
  Mg: "✨", // Magnesium - mineral
  K: "🌱", // Potassium - agriculture
}

interface ObjectTemplate {
  keywords: string[]
  description: string
  primaryBands: string[]
  secondaryBands: string[]
  elementComposition: Record<string, number>
  spectralPattern: "high-nir" | "low-nir" | "mixed" | "bright" | "dark" | "water"
  applications: string[]
  challenges: string[]
}

export const OBJECT_TEMPLATES: Record<string, ObjectTemplate> = {
  forest: {
    keywords: ["forest", "tree", "jungle", "woods", "vegetation"],
    description:
      "Dense forest areas are characterized by high chlorophyll content and complex canopy structure. Multispectral imaging leverages the strong near-infrared reflectance of healthy vegetation, combined with chlorophyll absorption in the visible red band, to accurately identify and monitor forest health. The spectral signature shows a distinctive 'red edge' transition between visible and NIR wavelengths, making forests easily distinguishable from other land cover types.",
    primaryBands: ["NIR", "VIS"],
    secondaryBands: ["SWIR", "TIR"],
    elementComposition: { C: 45, O: 30, H: 15, N: 5, Fe: 3, Si: 2 },
    spectralPattern: "high-nir",
    applications: [
      "Forest health monitoring and disease detection through changes in NIR reflectance patterns",
      "Deforestation tracking using temporal analysis of vegetation indices like NDVI",
      "Biomass estimation by correlating NIR reflectance with canopy density and structure",
      "Species classification using unique spectral signatures in multiple bands",
    ],
    challenges: [
      "Shadow effects from topography can reduce NIR reflectance and complicate interpretation",
      "Seasonal variations in leaf area and moisture content affect spectral signatures",
      "Mixed pixels at forest edges create ambiguity between forest and non-forest classes",
      "Atmospheric effects can distort the red edge position and NIR values",
    ],
  },
  lake: {
    keywords: ["lake", "water", "river", "pond", "reservoir"],
    description:
      "Water bodies exhibit unique spectral properties with very low reflectance across most wavelengths due to strong absorption. Clean water shows slightly higher reflectance in the blue-green visible spectrum while absorbing almost all near-infrared radiation. This distinctive pattern makes water one of the easiest features to detect in multispectral imagery. Water quality, depth, and suspended sediment content all influence the spectral signature, enabling detailed aquatic ecosystem monitoring.",
    primaryBands: ["VIS", "NIR"],
    secondaryBands: ["SWIR"],
    elementComposition: { O: 50, H: 40, C: 5, Na: 2, Cl: 2, Ca: 1 },
    spectralPattern: "water",
    applications: [
      "Water quality assessment by detecting chlorophyll-a and suspended sediments in visible bands",
      "Shoreline mapping using the sharp water-land boundary in NIR imagery",
      "Flood extent monitoring through temporal NIR analysis showing water expansion",
      "Bathymetry estimation in shallow water using blue-green band penetration ratios",
    ],
    challenges: [
      "Turbid water with high sediment load can increase reflectance and mimic soil signatures",
      "Submerged vegetation may show partial NIR reflectance, complicating water classification",
      "Sun glint on water surfaces creates bright spots that can be misclassified",
      "Shallow water allows bottom reflectance to influence the observed spectral signature",
    ],
  },
  building: {
    keywords: ["building", "urban", "city", "construction", "roof"],
    description:
      "Urban structures composed of concrete, metal, and synthetic materials display moderate to high reflectance across visible and near-infrared wavelengths. Building roofs exhibit diverse spectral signatures depending on materials used - metal roofs show high brightness across all bands, while dark asphalt shows low reflectance. The thermal infrared band is particularly valuable for detecting buildings through their distinct thermal signatures caused by heat absorption and retention in construction materials.",
    primaryBands: ["VIS", "SWIR"],
    secondaryBands: ["NIR", "TIR"],
    elementComposition: { Si: 35, Ca: 25, Fe: 20, C: 10, Al: 5, O: 5 },
    spectralPattern: "mixed",
    applications: [
      "Urban growth monitoring by tracking new construction through temporal change detection",
      "Building material identification using SWIR and TIR signatures of different roof types",
      "Energy efficiency assessment through thermal imaging showing heat loss patterns",
      "3D building extraction combining spectral data with height information from shadows",
    ],
    challenges: [
      "Spectral confusion with bare rock or concrete pavements sharing similar signatures",
      "Shadow effects from tall buildings obscure adjacent structures and reduce accuracy",
      "Mixed materials within single buildings create complex, variable spectral responses",
      "Seasonal heating/cooling affects thermal signatures and can cause temporal inconsistency",
    ],
  },
  road: {
    keywords: ["road", "highway", "street", "pavement", "asphalt"],
    description:
      "Paved roads, predominantly made of asphalt or concrete, show characteristically low to moderate reflectance patterns. Asphalt roads appear very dark in visible and NIR bands due to hydrocarbon content and carbon-black additives, while concrete roads show brighter signatures similar to bare soil. The linear geometry and consistent spectral signature make roads relatively easy to extract from imagery. Road condition and age affect reflectance, with older degraded surfaces showing higher reflectance due to weathering.",
    primaryBands: ["VIS", "NIR"],
    secondaryBands: ["SWIR"],
    elementComposition: { C: 40, Si: 25, Ca: 15, Fe: 10, O: 5, H: 5 },
    spectralPattern: "dark",
    applications: [
      "Road network mapping for transportation planning using automated extraction algorithms",
      "Pavement condition monitoring detecting cracks and deterioration through texture analysis",
      "Traffic flow estimation using thermal signatures from vehicle heat in TIR bands",
      "Road surface classification distinguishing asphalt, concrete, and unpaved roads",
    ],
    challenges: [
      "Shadow effects from trees and buildings can completely obscure road segments",
      "Spectral similarity with dark roofs and other impervious surfaces causes confusion",
      "Wet pavement shows dramatically different reflectance, appearing similar to water",
      "Lane markings and road paint create high-contrast features that complicate analysis",
    ],
  },
  cropland: {
    keywords: ["cropland", "farm", "agriculture", "field", "crop"],
    description:
      "Agricultural fields exhibit highly variable spectral signatures depending on crop type, growth stage, and management practices. Like forests, crops show elevated NIR reflectance when actively growing due to chlorophyll content and leaf structure. However, cropland displays more temporal variability with distinct seasonal patterns from bare soil (low NIR) to peak vegetation (high NIR) and back to harvest (low NIR). Different crops can be distinguished by their unique phenological cycles and spectral characteristics in multiple bands.",
    primaryBands: ["NIR", "VIS"],
    secondaryBands: ["SWIR", "TIR"],
    elementComposition: { C: 35, O: 25, H: 15, N: 10, K: 5, Fe: 5, Si: 5 },
    spectralPattern: "mixed",
    applications: [
      "Crop type classification using multi-temporal NIR and SWIR signatures throughout growing season",
      "Yield prediction by correlating vegetation indices with crop health and biomass accumulation",
      "Irrigation monitoring detecting stressed crops through reduced NIR reflectance and elevated TIR",
      "Precision agriculture identifying within-field variability for targeted management interventions",
    ],
    challenges: [
      "Bare soil exposure during planting and harvest creates dramatic spectral changes",
      "Crop type confusion when different species are at similar phenological stages",
      "Weed presence can alter the overall field spectral signature and mask crop condition",
      "Cloud cover during critical growth periods may prevent consistent monitoring",
    ],
  },
  desert: {
    keywords: ["desert", "sand", "dune", "arid", "dry"],
    description:
      "Desert landscapes dominated by exposed sand and rock exhibit high reflectance across visible, NIR, and SWIR wavelengths due to minimal vegetation cover and light-colored mineral surfaces. Quartz-rich sand shows particularly strong reflectance with a characteristic absorption feature near 2.2 micrometers in the SWIR band. The thermal infrared band reveals extreme temperature variations, with deserts showing high daytime temperatures and rapid nighttime cooling, creating distinct diurnal thermal signatures.",
    primaryBands: ["VIS", "SWIR"],
    secondaryBands: ["NIR", "TIR"],
    elementComposition: { Si: 45, O: 30, Fe: 10, Al: 8, Ca: 4, Na: 3 },
    spectralPattern: "bright",
    applications: [
      "Sand dune movement tracking using temporal analysis of surface texture and position",
      "Mineral mapping exploiting SWIR absorption features diagnostic of specific minerals",
      "Drought monitoring detecting changes in sparse vegetation and soil moisture through SWIR",
      "Archaeological site detection identifying subtle soil and vegetation anomalies from buried structures",
    ],
    challenges: [
      "Atmospheric scattering effects are amplified over bright surfaces, requiring careful correction",
      "Sparse vegetation can be difficult to detect against bright sand backgrounds",
      "Sand ripples and dune shadows create texture that may be confused with land cover changes",
      "Extreme thermal conditions can affect sensor performance and data quality",
    ],
  },
  snow: {
    keywords: ["snow", "ice", "glacier", "frozen"],
    description:
      "Snow and ice surfaces display the highest reflectance of any natural material in the visible spectrum, appearing brilliant white due to scattering from ice crystals. However, snow shows a dramatic reflectance decrease in the near-infrared and strong absorption in the shortwave infrared, particularly around 1.5 micrometers. This unique spectral pattern allows reliable snow mapping even in cloudy conditions. Snow grain size, liquid water content, and contamination all affect the spectral signature, enabling snow property estimation.",
    primaryBands: ["VIS", "SWIR"],
    secondaryBands: ["NIR"],
    elementComposition: { O: 50, H: 45, C: 3, Si: 1, Fe: 1 },
    spectralPattern: "bright",
    applications: [
      "Snow cover mapping for water resource management using SWIR to distinguish snow from clouds",
      "Glacier extent monitoring tracking changes in permanent ice cover over time",
      "Snow water equivalent estimation correlating grain size (from SWIR) with water content",
      "Avalanche risk assessment detecting snow property changes through multi-band analysis",
    ],
    challenges: [
      "Cloud confusion as both clouds and snow are bright in visible bands",
      "Shadow effects in mountainous terrain can darken snow signatures significantly",
      "Wet snow shows reduced reflectance and may be confused with rock or vegetation",
      "Mixed pixels at snow-vegetation boundaries create ambiguous spectral signatures",
    ],
  },
  wetland: {
    keywords: ["wetland", "marsh", "swamp", "bog"],
    description:
      "Wetlands represent a complex mixture of water, vegetation, and saturated soil, creating unique spectral signatures that vary seasonally and spatially. Emergent vegetation shows typical high NIR reflectance while standing water shows low NIR, resulting in intermediate values for wetland pixels. The combination of vegetation indices and water indices helps distinguish wetlands from upland forests or open water. Wetland spectral signatures are highly dynamic, changing with water level fluctuations and vegetation phenology.",
    primaryBands: ["NIR", "SWIR"],
    secondaryBands: ["VIS", "TIR"],
    elementComposition: { O: 40, H: 30, C: 20, N: 5, Fe: 3, Si: 2 },
    spectralPattern: "mixed",
    applications: [
      "Wetland extent mapping combining water and vegetation indices for boundary delineation",
      "Hydrological monitoring tracking seasonal inundation patterns through temporal NIR analysis",
      "Wetland health assessment detecting stressed vegetation through changes in red edge position",
      "Methane emission estimation correlating wetland extent and condition with greenhouse gas production",
    ],
    challenges: [
      "Spectral confusion with irrigated cropland showing similar water-vegetation mixtures",
      "Seasonal variations cause dramatic signature changes, requiring multi-date imagery",
      "Dense canopy can obscure underlying water, leading to classification as upland forest",
      "Small wetland features may be missed due to spatial resolution limitations",
    ],
  },
}

function generateSpectralData(pattern: string): { wavelengths: number[]; reflectance: number[] } {
  const wavelengths = [450, 550, 650, 750, 850, 950, 1050, 1250, 1450, 1650, 2150]

  let reflectance: number[]

  switch (pattern) {
    case "high-nir":
      reflectance = [8, 10, 6, 15, 45, 48, 50, 45, 42, 38, 25]
      break
    case "low-nir":
      reflectance = [12, 15, 10, 8, 5, 4, 3, 2, 2, 2, 1]
      break
    case "water":
      reflectance = [15, 12, 5, 2, 1, 1, 0, 0, 0, 0, 0]
      break
    case "bright":
      reflectance = [70, 75, 78, 80, 82, 83, 80, 75, 70, 68, 50]
      break
    case "dark":
      reflectance = [8, 10, 12, 13, 14, 15, 14, 13, 12, 11, 10]
      break
    case "mixed":
    default:
      reflectance = [20, 25, 22, 30, 28, 26, 24, 20, 18, 16, 12]
  }

  return { wavelengths, reflectance }
}

export function searchObject(query: string): {
  objectName: string
  description: string
  primaryBands: string[]
  secondaryBands: string[]
  elements: Array<{ symbol: string; emoji: string; percentage: number }>
  confidence: number
  spectralData: { wavelengths: number[]; reflectance: number[] }
  applications: string[]
  challenges: string[]
} | null {
  const queryLower = query.toLowerCase()

  // Find matching template
  let matchedTemplate: ObjectTemplate | null = null
  let matchedName = ""

  for (const [name, template] of Object.entries(OBJECT_TEMPLATES)) {
    if (template.keywords.some((keyword) => queryLower.includes(keyword) || keyword.includes(queryLower))) {
      matchedTemplate = template
      matchedName = name.charAt(0).toUpperCase() + name.slice(1)
      break
    }
  }

  if (!matchedTemplate) {
    return null
  }

  // Convert element composition to array with emojis
  const elements = Object.entries(matchedTemplate.elementComposition)
    .map(([symbol, percentage]) => ({
      symbol,
      emoji: ELEMENT_EMOJIS[symbol] || "⚛️",
      percentage,
    }))
    .sort((a, b) => b.percentage - a.percentage)

  // Generate spectral data
  const spectralData = generateSpectralData(matchedTemplate.spectralPattern)

  // Calculate confidence (randomized but consistent range)
  const confidence = 85 + Math.floor(Math.random() * 13)

  return {
    objectName: matchedName,
    description: matchedTemplate.description,
    primaryBands: matchedTemplate.primaryBands,
    secondaryBands: matchedTemplate.secondaryBands,
    elements,
    confidence,
    spectralData,
    applications: matchedTemplate.applications,
    challenges: matchedTemplate.challenges,
  }
}
