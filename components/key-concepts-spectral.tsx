"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, Waves, Layers, Target, Zap } from "lucide-react"

// Material Spectral Model Data
const materialSpectralData = {
  wavelengths: [0.4, 0.633, 0.867, 1.1, 1.333, 1.567, 1.8, 2.033, 2.267, 2.5],
  materials: [
    {
      name: "Metal",
      color: "#94a3b8",
      objectType: "material:metal",
      elements: ["Fe"],
      description: "High reflectance increasing with wavelength",
    },
    {
      name: "Rubber",
      color: "#1f2937",
      objectType: "material:rubber",
      elements: ["C", "H"],
      description: "Low flat reflectance with absorption at 1.5µm",
    },
    {
      name: "Polymer",
      color: "#6366f1",
      objectType: "material:polymer",
      elements: ["C", "H"],
      description: "Moderate reflectance with peak at 1.1µm",
    },
    {
      name: "Glass",
      color: "#67e8f9",
      objectType: "material:glass",
      elements: ["Si", "O"],
      description: "Gradually increasing reflectance",
    },
    {
      name: "Skin",
      color: "#fcd34d",
      objectType: "material:skin",
      elements: ["C", "H", "O"],
      description: "Peak reflectance in NIR region",
    },
    {
      name: "Protein",
      color: "#f87171",
      objectType: "material:protein",
      elements: ["C", "N", "H", "O"],
      description: "Absorption peak at 1.3µm",
    },
    {
      name: "Fat",
      color: "#fbbf24",
      objectType: "material:fat",
      elements: ["C", "H", "O"],
      description: "Strong absorption at 1.8µm",
    },
    {
      name: "Starch",
      color: "#a78bfa",
      objectType: "material:starch",
      elements: ["C", "H", "O"],
      description: "Peak at 0.86µm",
    },
    {
      name: "Water",
      color: "#3b82f6",
      objectType: "material:water",
      elements: ["H", "O"],
      description: "Strong absorption at 1.1µm and 1.8µm",
    },
    {
      name: "Concrete",
      color: "#9ca3af",
      objectType: "material:concrete",
      elements: ["Ca", "Si", "O"],
      description: "Gradual increase with wavelength",
    },
    {
      name: "Brick",
      color: "#dc2626",
      objectType: "material:brick",
      elements: ["Fe", "Si", "O"],
      description: "Peak at 0.63µm",
    },
    {
      name: "Wood",
      color: "#92400e",
      objectType: "material:wood",
      elements: ["C", "H", "O"],
      description: "Gradual increase in NIR",
    },
    {
      name: "Asphalt",
      color: "#374151",
      objectType: "material:asphalt",
      elements: ["C", "H"],
      description: "Flat low reflectance",
    },
    {
      name: "Vegetation",
      color: "#22c55e",
      objectType: "material:vegetation",
      elements: ["C", "N", "H", "O"],
      description: "Red edge at 0.7µm, peak in NIR",
    },
  ],
}

// Spectral bands explanation
const spectralBands = [
  {
    range: "0.4-0.5 µm",
    name: "Blue",
    color: "#3b82f6",
    applications: ["Water depth mapping", "Coastal analysis", "Atmospheric scattering studies"],
  },
  {
    range: "0.5-0.6 µm",
    name: "Green",
    color: "#22c55e",
    applications: ["Vegetation vigor assessment", "Water turbidity", "Urban mapping"],
  },
  {
    range: "0.6-0.7 µm",
    name: "Red",
    color: "#ef4444",
    applications: ["Chlorophyll absorption", "Plant stress detection", "Soil analysis"],
  },
  {
    range: "0.7-1.0 µm",
    name: "NIR (Red Edge)",
    color: "#dc2626",
    applications: ["Vegetation health", "Biomass estimation", "Water body delineation"],
  },
  {
    range: "1.0-1.4 µm",
    name: "SWIR-1",
    color: "#f59e0b",
    applications: ["Moisture content", "Cloud/snow discrimination", "Mineral mapping"],
  },
  {
    range: "1.4-1.8 µm",
    name: "SWIR-2",
    color: "#d97706",
    applications: ["Soil moisture", "Vegetation water stress", "Fire detection"],
  },
  {
    range: "1.8-2.5 µm",
    name: "SWIR-3",
    color: "#b45309",
    applications: ["Mineral identification", "Rock type classification", "Geological mapping"],
  },
]

export default function KeyConceptsSpectral() {
  const [expandedMaterial, setExpandedMaterial] = useState<string | null>(null)
  const [selectedBand, setSelectedBand] = useState<number | null>(null)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-cyan-500/50 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-cyan-500/20 rounded-lg">
            <Waves className="w-8 h-8 text-cyan-400" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300">
              Spectral Model & Material Detection
            </h2>
            <p className="text-blue-200">Understanding how hyperspectral imaging identifies materials</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-6">
          <div className="bg-slate-700/50 rounded-lg p-4 border border-cyan-500/30">
            <Layers className="w-6 h-6 text-cyan-400 mb-2" />
            <h3 className="font-semibold text-white">10+ Spectral Bands</h3>
            <p className="text-sm text-slate-300">From visible (0.4µm) to SWIR (2.5µm)</p>
          </div>
          <div className="bg-slate-700/50 rounded-lg p-4 border border-purple-500/30">
            <Target className="w-6 h-6 text-purple-400 mb-2" />
            <h3 className="font-semibold text-white">14 Material Classes</h3>
            <p className="text-sm text-slate-300">Metal, organic, construction, vegetation</p>
          </div>
          <div className="bg-slate-700/50 rounded-lg p-4 border border-green-500/30">
            <Zap className="w-6 h-6 text-green-400 mb-2" />
            <h3 className="font-semibold text-white">Real-time Analysis</h3>
            <p className="text-sm text-slate-300">Spectral angle matching algorithm</p>
          </div>
        </div>
      </div>

      {/* Wavelength Bands */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-purple-500/50 rounded-lg p-6">
        <h3 className="text-2xl font-bold text-white mb-4">Spectral Wavelength Bands</h3>
        <p className="text-slate-300 mb-6">
          Each wavelength band reveals different material properties. Click on a band to see its applications.
        </p>

        <div className="relative mb-8">
          {/* Wavelength bar */}
          <div className="h-16 rounded-lg overflow-hidden flex">
            {spectralBands.map((band, i) => (
              <button
                key={i}
                onClick={() => setSelectedBand(selectedBand === i ? null : i)}
                className={`flex-1 transition-all duration-200 relative group ${
                  selectedBand === i ? "ring-4 ring-white scale-105 z-10" : "hover:scale-102"
                }`}
                style={{ backgroundColor: band.color }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white text-xs font-bold drop-shadow-lg">{band.name}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Scale */}
          <div className="flex justify-between mt-2 text-xs text-slate-400">
            <span>0.4 µm</span>
            <span>1.0 µm</span>
            <span>1.5 µm</span>
            <span>2.0 µm</span>
            <span>2.5 µm</span>
          </div>
        </div>

        {/* Selected band details */}
        {selectedBand !== null && (
          <div
            className="bg-slate-700/50 rounded-lg p-4 border-l-4"
            style={{ borderColor: spectralBands[selectedBand].color }}
          >
            <h4 className="font-bold text-white text-lg">
              {spectralBands[selectedBand].name} ({spectralBands[selectedBand].range})
            </h4>
            <p className="text-slate-300 mt-2">Applications:</p>
            <ul className="list-disc list-inside text-slate-400 mt-1">
              {spectralBands[selectedBand].applications.map((app, i) => (
                <li key={i}>{app}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Material Library */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-green-500/50 rounded-lg p-6">
        <h3 className="text-2xl font-bold text-white mb-4">Material Spectral Library</h3>
        <p className="text-slate-300 mb-6">
          Each material has a unique spectral signature (reflectance pattern across wavelengths). The system matches
          pixel spectra against this library to identify materials.
        </p>

        <div className="grid gap-3">
          {materialSpectralData.materials.map((material) => (
            <div key={material.name} className="bg-slate-700/30 rounded-lg overflow-hidden border border-slate-600/50">
              <button
                onClick={() => setExpandedMaterial(expandedMaterial === material.name ? null : material.name)}
                className="w-full flex items-center gap-4 p-4 hover:bg-slate-700/50 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg shrink-0" style={{ backgroundColor: material.color }} />
                <div className="flex-1 text-left">
                  <h4 className="font-semibold text-white">{material.name}</h4>
                  <p className="text-sm text-slate-400">{material.objectType}</p>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <span className="text-xs bg-slate-600 px-2 py-1 rounded">{material.elements.join(", ")}</span>
                  {expandedMaterial === material.name ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </div>
              </button>

              {expandedMaterial === material.name && (
                <div className="px-4 pb-4 border-t border-slate-600/50">
                  <p className="text-slate-300 mt-3">{material.description}</p>

                  {/* Mini spectral chart */}
                  <div className="mt-4 h-20 bg-slate-800 rounded-lg p-2 flex items-end gap-1">
                    {[0.3, 0.35, 0.4, 0.5, 0.55, 0.6, 0.45, 0.5, 0.55, 0.6].map((val, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-t transition-all"
                        style={{
                          height: `${val * 100}%`,
                          backgroundColor: material.color,
                          opacity: 0.5 + i * 0.05,
                        }}
                      />
                    ))}
                  </div>
                  <div className="flex justify-between text-xs text-slate-500 mt-1">
                    <span>0.4µm</span>
                    <span>Wavelength</span>
                    <span>2.5µm</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Algorithm explanation */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-yellow-500/50 rounded-lg p-6">
        <h3 className="text-2xl font-bold text-white mb-4">Spectral Angle Mapping (SAM) Algorithm</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p className="text-slate-300 mb-4">
              The system uses <strong className="text-yellow-400">Spectral Angle Mapping</strong> to identify materials:
            </p>
            <ol className="space-y-3 text-slate-300">
              <li className="flex gap-3">
                <span className="bg-yellow-500 text-black w-6 h-6 rounded-full flex items-center justify-center shrink-0 font-bold">
                  1
                </span>
                <span>Capture pixel spectrum (reflectance at each wavelength)</span>
              </li>
              <li className="flex gap-3">
                <span className="bg-yellow-500 text-black w-6 h-6 rounded-full flex items-center justify-center shrink-0 font-bold">
                  2
                </span>
                <span>Compare against all materials in spectral library</span>
              </li>
              <li className="flex gap-3">
                <span className="bg-yellow-500 text-black w-6 h-6 rounded-full flex items-center justify-center shrink-0 font-bold">
                  3
                </span>
                <span>Calculate spectral angle (cosine similarity)</span>
              </li>
              <li className="flex gap-3">
                <span className="bg-yellow-500 text-black w-6 h-6 rounded-full flex items-center justify-center shrink-0 font-bold">
                  4
                </span>
                <span>Smaller angle = better match = identified material</span>
              </li>
            </ol>
          </div>
          <div className="bg-slate-700/50 rounded-lg p-4">
            <h4 className="font-semibold text-white mb-2">Formula</h4>
            <div className="bg-slate-800 rounded p-3 font-mono text-sm text-green-400">
              angle = arccos(A · B / |A| × |B|)
            </div>
            <p className="text-sm text-slate-400 mt-3">
              Where A is the pixel spectrum vector and B is the reference material spectrum. The result is invariant to
              illumination intensity.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
