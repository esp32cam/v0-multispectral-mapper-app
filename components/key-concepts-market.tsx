"use client"

import { useState } from "react"
import { TrendingUp, Leaf, Building, Factory, Utensils, MapPin, DollarSign, Shield, BarChart3 } from "lucide-react"

const marketApplications = [
  {
    id: "agri",
    title: "Agriculture & Commodity",
    icon: Leaf,
    color: "#22c55e",
    labels: ["crop_type", "stress_type", "yield_risk", "fertilizer_gap", "nitrogen_status", "water_stress"],
    description:
      "Hyperspectral imaging enables precision agriculture by detecting crop health, stress levels, and yield predictions at the pixel level.",
    useCases: [
      "Crop type classification and phenology tracking",
      "Early disease and pest detection",
      "Nitrogen and nutrient deficiency mapping",
      "Yield prediction for commodity trading",
      "Insurance risk assessment per field",
    ],
    customers: [
      "Hedge Funds",
      "Commodity Traders",
      "Insurance Companies",
      "Input Suppliers",
      "Agricultural Ministries",
    ],
  },
  {
    id: "food",
    title: "Food & Supply Chain",
    icon: Utensils,
    color: "#f59e0b",
    labels: ["quality_grade", "freshness_score", "contamination_risk", "moisture_content", "fat_protein_ratio"],
    description:
      "Non-destructive inspection of food products for quality grading, safety detection, and shelf-life prediction.",
    useCases: [
      "Fruit and vegetable ripeness grading (A/B/C)",
      "Meat quality and freshness assessment",
      "Contamination detection (plastic, metal, mold)",
      "Moisture and fat content measurement",
      "Sell-today vs. keep vs. discard decisions",
    ],
    customers: ["Food Processors", "Retailers", "Logistics Companies", "Quality Inspectors", "Food Safety Regulators"],
  },
  {
    id: "urban",
    title: "Urban & Real Estate",
    icon: Building,
    color: "#8b5cf6",
    labels: ["building_material", "roof_condition", "road_quality", "vegetation_cover", "solar_suitability"],
    description:
      "Material-level classification of urban environments for infrastructure monitoring, ESG scoring, and risk assessment.",
    useCases: [
      "Building material and roof condition assessment",
      "Road damage and maintenance priority mapping",
      "Urban heat island risk identification",
      "Green space and vegetation coverage analysis",
      "Solar panel suitability scoring",
    ],
    customers: [
      "Real Estate Analytics",
      "Municipal Governments",
      "Insurance Companies",
      "ESG Investors",
      "Urban Planners",
    ],
  },
  {
    id: "mining",
    title: "Mining & Strategic Minerals",
    icon: Factory,
    color: "#ef4444",
    labels: ["alteration_zone", "host_rock_class", "ore_probability", "surface_oxidation", "mineral_phase"],
    description: "Geological mapping and mineral prospectivity analysis for exploration and resource assessment.",
    useCases: [
      "Lithological and alteration zone mapping",
      "Ore body prospectivity scoring",
      "Surface oxidation and weathering analysis",
      "Strategic mineral identification (lithium, rare earths)",
      "Environmental impact monitoring",
    ],
    customers: [
      "Mining Companies",
      "Exploration Firms",
      "Quant Funds (Mining Stocks)",
      "Environmental Regulators",
      "Government Surveys",
    ],
  },
  {
    id: "logistics",
    title: "Logistics & OSINT",
    icon: MapPin,
    color: "#3b82f6",
    labels: ["traffic_density", "construction_activity", "yard_utilization", "port_congestion", "warehouse_turnover"],
    description:
      "Activity-level intelligence from semantic object tracking for supply chain and geopolitical analysis.",
    useCases: [
      "Port and warehouse congestion monitoring",
      "Construction activity indexing",
      "Traffic density and flow analysis",
      "Supply chain disruption early warning",
      "Infrastructure development tracking",
    ],
    customers: [
      "Quant Funds",
      "Supply Chain Analysts",
      "Intelligence Agencies",
      "Logistics Providers",
      "Economic Researchers",
    ],
  },
]

const labelTaxonomy = [
  {
    level: "Physical/Chemical",
    color: "#3b82f6",
    examples: ["water_content", "protein_fraction", "chlorophyll_index", "mineral_phase"],
  },
  {
    level: "Material/Semantic",
    color: "#8b5cf6",
    examples: ["material:metal", "material:vegetation", "vehicle", "building", "food_meat"],
  },
  {
    level: "Economic/Risk",
    color: "#22c55e",
    examples: ["yield_risk_bucket", "quality_grade", "ESG_red_flag", "supply_disruption_risk"],
  },
]

export default function KeyConceptsMarket() {
  const [selectedApp, setSelectedApp] = useState("agri")
  const selected = marketApplications.find((a) => a.id === selectedApp)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-green-500/50 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-green-500/20 rounded-lg">
            <TrendingUp className="w-8 h-8 text-green-400" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-emerald-300">
              Market Applications & Labeling
            </h2>
            <p className="text-green-200">Transforming hyperspectral data into economic value</p>
          </div>
        </div>

        <p className="text-slate-300 mt-4">
          Think of every label as a <strong className="text-green-400">product</strong> that downstream users can
          consume directly — from farmers and insurers to hedge funds and ESG analysts. Instead of just "class 1-10"
          academic labels, we design labels that create <strong className="text-green-400">economic value</strong>.
        </p>
      </div>

      {/* Label Taxonomy */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-purple-500/50 rounded-lg p-6">
        <h3 className="text-2xl font-bold text-white mb-4">Label Taxonomy Hierarchy</h3>
        <p className="text-slate-300 mb-6">A multi-layer ontology from raw physics to economic signals:</p>

        <div className="space-y-4">
          {labelTaxonomy.map((level, i) => (
            <div key={i} className="flex items-start gap-4">
              <div className="w-3 h-full min-h-[80px] rounded-full shrink-0" style={{ backgroundColor: level.color }} />
              <div className="flex-1 bg-slate-700/30 rounded-lg p-4">
                <h4 className="font-bold text-white mb-2">{level.level} Labels</h4>
                <div className="flex flex-wrap gap-2">
                  {level.examples.map((ex, j) => (
                    <span
                      key={j}
                      className="px-3 py-1 rounded-full text-sm font-mono"
                      style={{ backgroundColor: `${level.color}30`, color: level.color }}
                    >
                      {ex}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-slate-700/50 rounded-lg p-4 flex items-center gap-4">
          <BarChart3 className="w-8 h-8 text-yellow-400 shrink-0" />
          <p className="text-slate-300 text-sm">
            <strong className="text-yellow-400">Pipeline:</strong> Pixel → Physics/Chemistry → Material → Semantic
            Object → Economic Signal
          </p>
        </div>
      </div>

      {/* Market Applications */}
      <div className="grid md:grid-cols-4 gap-6">
        {/* Selector */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-slate-600/50 rounded-lg p-4">
          <h3 className="text-lg font-bold text-white mb-4">Market Sectors</h3>
          <div className="space-y-2">
            {marketApplications.map((app) => {
              const Icon = app.icon
              return (
                <button
                  key={app.id}
                  onClick={() => setSelectedApp(app.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${
                    selectedApp === app.id
                      ? "bg-white/10 border-2"
                      : "bg-slate-700/30 border-2 border-transparent hover:bg-slate-700/50"
                  }`}
                  style={{ borderColor: selectedApp === app.id ? app.color : "transparent" }}
                >
                  <Icon className="w-5 h-5" style={{ color: app.color }} />
                  <span className="text-white font-medium text-sm">{app.title}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Details */}
        <div
          className="md:col-span-3 bg-gradient-to-br from-slate-800 to-slate-900 border-2 rounded-lg p-6"
          style={{ borderColor: `${selected?.color}50` }}
        >
          {selected && (
            <>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-lg" style={{ backgroundColor: `${selected.color}30` }}>
                  <selected.icon className="w-8 h-8" style={{ color: selected.color }} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{selected.title}</h3>
                  <p className="text-slate-400">Hyperspectral labeling products</p>
                </div>
              </div>

              <p className="text-slate-300 mb-6">{selected.description}</p>

              {/* Labels */}
              <div className="mb-6">
                <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <DollarSign className="w-5 h-5" style={{ color: selected.color }} />
                  Output Labels (Products)
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selected.labels.map((label, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full text-sm font-mono"
                      style={{ backgroundColor: `${selected.color}30`, color: selected.color }}
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </div>

              {/* Use cases */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-white mb-3">Use Cases</h4>
                  <ul className="space-y-2">
                    {selected.useCases.map((uc, i) => (
                      <li key={i} className="flex items-start gap-2 text-slate-300 text-sm">
                        <span
                          className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                          style={{ backgroundColor: selected.color }}
                        />
                        {uc}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-slate-400" />
                    Target Customers
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selected.customers.map((c, i) => (
                      <span key={i} className="px-3 py-1 bg-slate-700/50 rounded-lg text-sm text-slate-300">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Product Lines */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-yellow-500/50 rounded-lg p-6">
        <h3 className="text-2xl font-bold text-white mb-4">Product Lines Summary</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { name: "Agri HS Labels", outputs: "crop_type, stress_type, yield_risk, fertilizer_gap", color: "#22c55e" },
            { name: "Food HS Labels", outputs: "grade, freshness, composition, contamination_risk", color: "#f59e0b" },
            {
              name: "Urban HS Labels",
              outputs: "building_material, roof_condition, road_quality, vegetation_cover",
              color: "#8b5cf6",
            },
            {
              name: "Mining HS Labels",
              outputs: "alteration_type, ore_probability, surface_oxide_indicator",
              color: "#ef4444",
            },
          ].map((product, i) => (
            <div key={i} className="bg-slate-700/30 rounded-lg p-4 border-l-4" style={{ borderColor: product.color }}>
              <h4 className="font-bold text-white mb-2">{product.name}</h4>
              <p className="text-xs text-slate-400 font-mono">{product.outputs}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
