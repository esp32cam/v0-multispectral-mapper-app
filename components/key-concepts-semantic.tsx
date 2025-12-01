"use client"

import { useState } from "react"
import { Brain, ArrowRight, Layers, Car, Building2, User, Apple, TreePine, Factory } from "lucide-react"

// Semantic rules data
const semanticRules = [
  {
    id: "vehicle",
    label: "Vehicle",
    icon: Car,
    color: "#3b82f6",
    rules: [
      { material: "material:metal", weight: 0.4 },
      { material: "material:glass", weight: 0.2 },
      { material: "material:rubber", weight: 0.2 },
      { material: "material:polymer", weight: 0.2 },
    ],
    description:
      "Vehicles are detected by combining metal (body), glass (windows), rubber (tires), and polymer (interior/trim) signatures.",
  },
  {
    id: "building",
    label: "Building",
    icon: Building2,
    color: "#8b5cf6",
    rules: [
      { material: "material:concrete", weight: 0.4 },
      { material: "material:brick", weight: 0.3 },
      { material: "material:wood", weight: 0.2 },
      { material: "material:glass", weight: 0.1 },
    ],
    description:
      "Buildings are identified through construction materials: concrete, brick, wood structure, and glass windows.",
  },
  {
    id: "paved_surface",
    label: "Paved / Road Surface",
    icon: Factory,
    color: "#6b7280",
    rules: [
      { material: "material:asphalt", weight: 0.7 },
      { material: "material:concrete", weight: 0.3 },
    ],
    description: "Roads and paved areas are detected primarily through asphalt with some concrete contribution.",
  },
  {
    id: "human",
    label: "Human",
    icon: User,
    color: "#f59e0b",
    rules: [
      { material: "material:skin", weight: 0.8 },
      { material: "material:polymer", weight: 0.1 },
      { material: "material:starch", weight: 0.1 },
    ],
    description:
      "Human detection relies heavily on skin spectral signature, with minor contributions from clothing materials.",
  },
  {
    id: "food_meat",
    label: "Food: Meat",
    icon: Apple,
    color: "#ef4444",
    rules: [
      { material: "material:protein", weight: 0.5 },
      { material: "material:fat", weight: 0.3 },
      { material: "material:water", weight: 0.2 },
    ],
    description: "Meat products show protein-dominant signatures with fat and moisture content.",
  },
  {
    id: "food_fruit_veg",
    label: "Food: Fruit / Veg",
    icon: Apple,
    color: "#22c55e",
    rules: [
      { material: "material:water", weight: 0.4 },
      { material: "material:vegetation", weight: 0.4 },
      { material: "material:starch", weight: 0.2 },
    ],
    description: "Fresh produce shows high water content combined with vegetation and starch signatures.",
  },
  {
    id: "vegetation_cover",
    label: "Vegetation Cover",
    icon: TreePine,
    color: "#16a34a",
    rules: [
      { material: "material:vegetation", weight: 0.7 },
      { material: "material:water", weight: 0.3 },
    ],
    description: "Natural vegetation is identified through chlorophyll signatures and plant water content.",
  },
]

export default function KeyConceptsSemantic() {
  const [selectedObject, setSelectedObject] = useState<string | null>("vehicle")

  const selected = semanticRules.find((r) => r.id === selectedObject)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-purple-500/50 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-purple-500/20 rounded-lg">
            <Brain className="w-8 h-8 text-purple-400" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300">
              Semantic Mapping Engine
            </h2>
            <p className="text-purple-200">From materials to real-world objects using rule-based inference</p>
          </div>
        </div>
      </div>

      {/* Pipeline visualization */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-cyan-500/50 rounded-lg p-6">
        <h3 className="text-2xl font-bold text-white mb-6">Processing Pipeline</h3>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="bg-cyan-500/20 border border-cyan-500/50 rounded-lg p-4 text-center flex-1">
            <Layers className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
            <h4 className="font-bold text-white">Pixel Spectrum</h4>
            <p className="text-sm text-slate-400">Raw reflectance values</p>
          </div>

          <ArrowRight className="w-8 h-8 text-slate-500 rotate-90 md:rotate-0" />

          <div className="bg-purple-500/20 border border-purple-500/50 rounded-lg p-4 text-center flex-1">
            <div className="w-8 h-8 bg-purple-500 rounded mx-auto mb-2 flex items-center justify-center text-white font-bold">
              M
            </div>
            <h4 className="font-bold text-white">Material Scores</h4>
            <p className="text-sm text-slate-400">Metal, glass, rubber...</p>
          </div>

          <ArrowRight className="w-8 h-8 text-slate-500 rotate-90 md:rotate-0" />

          <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4 text-center flex-1">
            <Brain className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <h4 className="font-bold text-white">Semantic Rules</h4>
            <p className="text-sm text-slate-400">Weighted combinations</p>
          </div>

          <ArrowRight className="w-8 h-8 text-slate-500 rotate-90 md:rotate-0" />

          <div className="bg-yellow-500/20 border border-yellow-500/50 rounded-lg p-4 text-center flex-1">
            <Car className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
            <h4 className="font-bold text-white">Object Detection</h4>
            <p className="text-sm text-slate-400">Vehicle, building, human...</p>
          </div>
        </div>
      </div>

      {/* Semantic rules explorer */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Object selector */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-slate-600/50 rounded-lg p-4">
          <h3 className="text-lg font-bold text-white mb-4">Semantic Objects</h3>
          <div className="space-y-2">
            {semanticRules.map((rule) => {
              const Icon = rule.icon
              return (
                <button
                  key={rule.id}
                  onClick={() => setSelectedObject(rule.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${
                    selectedObject === rule.id
                      ? "bg-white/10 border-2"
                      : "bg-slate-700/30 border-2 border-transparent hover:bg-slate-700/50"
                  }`}
                  style={{ borderColor: selectedObject === rule.id ? rule.color : "transparent" }}
                >
                  <div className="p-2 rounded-lg" style={{ backgroundColor: `${rule.color}30` }}>
                    <Icon className="w-5 h-5" style={{ color: rule.color }} />
                  </div>
                  <span className="text-white font-medium">{rule.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Rule details */}
        <div
          className="md:col-span-2 bg-gradient-to-br from-slate-800 to-slate-900 border-2 rounded-lg p-6"
          style={{ borderColor: `${selected?.color}50` }}
        >
          {selected && (
            <>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-lg" style={{ backgroundColor: `${selected.color}30` }}>
                  <selected.icon className="w-8 h-8" style={{ color: selected.color }} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{selected.label}</h3>
                  <p className="text-slate-400">Semantic object detection rules</p>
                </div>
              </div>

              <p className="text-slate-300 mb-6">{selected.description}</p>

              <h4 className="font-semibold text-white mb-3">Material Weights</h4>
              <div className="space-y-3">
                {selected.rules.map((rule, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <span className="text-slate-400 w-40 text-sm">{rule.material.replace("material:", "")}</span>
                    <div className="flex-1 h-6 bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${rule.weight * 100}%`,
                          backgroundColor: selected.color,
                        }}
                      />
                    </div>
                    <span className="text-white font-mono w-16 text-right">{(rule.weight * 100).toFixed(0)}%</span>
                  </div>
                ))}
              </div>

              {/* Formula */}
              <div className="mt-6 bg-slate-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2">Score Calculation</h4>
                <div className="bg-slate-800 rounded p-3 font-mono text-sm text-green-400 overflow-x-auto">
                  score = Σ(material_score × weight) / Σ(weights)
                </div>
                <p className="text-sm text-slate-400 mt-2">
                  The final score is a weighted average of all contributing material scores.
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Use case example */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-yellow-500/50 rounded-lg p-6">
        <h3 className="text-2xl font-bold text-white mb-4">Example: Detecting a Vehicle</h3>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="bg-slate-700/50 rounded-lg p-4">
            <h4 className="text-sm text-slate-400 mb-2">Input Materials</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-300">Metal</span>
                <span className="text-cyan-400 font-mono">0.85</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-300">Glass</span>
                <span className="text-cyan-400 font-mono">0.70</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-300">Rubber</span>
                <span className="text-cyan-400 font-mono">0.60</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-300">Polymer</span>
                <span className="text-cyan-400 font-mono">0.55</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-700/50 rounded-lg p-4">
            <h4 className="text-sm text-slate-400 mb-2">× Weights</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-300">0.85 × 0.4</span>
                <span className="text-purple-400 font-mono">= 0.34</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-300">0.70 × 0.2</span>
                <span className="text-purple-400 font-mono">= 0.14</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-300">0.60 × 0.2</span>
                <span className="text-purple-400 font-mono">= 0.12</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-300">0.55 × 0.2</span>
                <span className="text-purple-400 font-mono">= 0.11</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-700/50 rounded-lg p-4">
            <h4 className="text-sm text-slate-400 mb-2">Sum</h4>
            <div className="text-center mt-4">
              <div className="text-2xl font-bold text-yellow-400">0.71</div>
              <div className="text-sm text-slate-400">/ 1.0 (total weight)</div>
            </div>
          </div>

          <div className="bg-green-500/20 border-2 border-green-500/50 rounded-lg p-4">
            <h4 className="text-sm text-green-400 mb-2">Result</h4>
            <div className="text-center mt-2">
              <Car className="w-12 h-12 text-green-400 mx-auto mb-2" />
              <div className="text-xl font-bold text-white">Vehicle</div>
              <div className="text-sm text-green-400">Score: 0.71</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
