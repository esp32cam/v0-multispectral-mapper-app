"use client"

import { useState } from "react"
import { TreePine, Eye, Footprints } from "lucide-react"

interface TrailPoint {
  x: number
  y: number
}

interface Trail {
  id: string
  name: string
  points: TrailPoint[]
  color: string
  difficulty: "easy" | "moderate" | "hard"
}

interface TreeZone {
  id: string
  name: string
  x: number
  y: number
  width: number
  height: number
  color: string
  bands: {
    name: string
    wavelength: string
    probability: number
  }[]
}

interface AnimalSpot {
  id: string
  emoji: string
  name: string
  x: number
  y: number
  probability: number
}

const TRAILS: Trail[] = [
  {
    id: "trail-1",
    name: "Elephant Trail",
    points: [
      { x: 5, y: 90 },
      { x: 15, y: 75 },
      { x: 25, y: 60 },
      { x: 40, y: 55 },
      { x: 55, y: 45 },
      { x: 70, y: 35 },
      { x: 85, y: 25 },
      { x: 95, y: 15 },
    ],
    color: "#f59e0b",
    difficulty: "moderate",
  },
  {
    id: "trail-2",
    name: "Riverside Path",
    points: [
      { x: 10, y: 20 },
      { x: 20, y: 30 },
      { x: 35, y: 35 },
      { x: 50, y: 40 },
      { x: 65, y: 50 },
      { x: 80, y: 60 },
      { x: 90, y: 75 },
    ],
    color: "#3b82f6",
    difficulty: "easy",
  },
  {
    id: "trail-3",
    name: "Mountain Ridge",
    points: [
      { x: 50, y: 10 },
      { x: 55, y: 25 },
      { x: 60, y: 40 },
      { x: 65, y: 55 },
      { x: 60, y: 70 },
      { x: 55, y: 85 },
    ],
    color: "#ef4444",
    difficulty: "hard",
  },
]

const TREE_ZONES: TreeZone[] = [
  {
    id: "teak",
    name: "Teak Forest",
    x: 5,
    y: 5,
    width: 25,
    height: 30,
    color: "rgba(34, 197, 94, 0.4)",
    bands: [
      { name: "NIR", wavelength: "750-900nm", probability: 92 },
      { name: "Red Edge", wavelength: "700-750nm", probability: 88 },
      { name: "SWIR", wavelength: "1400-1800nm", probability: 75 },
    ],
  },
  {
    id: "bamboo",
    name: "Bamboo Grove",
    x: 35,
    y: 10,
    width: 20,
    height: 25,
    color: "rgba(132, 204, 22, 0.4)",
    bands: [
      { name: "Green", wavelength: "500-565nm", probability: 95 },
      { name: "NIR", wavelength: "750-900nm", probability: 89 },
      { name: "Red", wavelength: "620-700nm", probability: 72 },
    ],
  },
  {
    id: "dipterocarp",
    name: "Dipterocarp",
    x: 60,
    y: 5,
    width: 35,
    height: 35,
    color: "rgba(5, 150, 105, 0.4)",
    bands: [
      { name: "NIR", wavelength: "750-900nm", probability: 94 },
      { name: "SWIR-1", wavelength: "1550-1750nm", probability: 86 },
      { name: "Red Edge", wavelength: "700-750nm", probability: 82 },
    ],
  },
  {
    id: "rubber",
    name: "Rubber Plantation",
    x: 5,
    y: 45,
    width: 30,
    height: 25,
    color: "rgba(16, 185, 129, 0.4)",
    bands: [
      { name: "Red Edge", wavelength: "700-750nm", probability: 91 },
      { name: "NIR", wavelength: "750-900nm", probability: 87 },
      { name: "Blue", wavelength: "450-520nm", probability: 68 },
    ],
  },
  {
    id: "mangrove",
    name: "Mangrove",
    x: 40,
    y: 50,
    width: 25,
    height: 30,
    color: "rgba(6, 95, 70, 0.4)",
    bands: [
      { name: "SWIR-2", wavelength: "2080-2350nm", probability: 93 },
      { name: "NIR", wavelength: "750-900nm", probability: 90 },
      { name: "Coastal", wavelength: "400-450nm", probability: 78 },
    ],
  },
  {
    id: "eucalyptus",
    name: "Eucalyptus",
    x: 70,
    y: 45,
    width: 25,
    height: 30,
    color: "rgba(20, 184, 166, 0.4)",
    bands: [
      { name: "SWIR-1", wavelength: "1550-1750nm", probability: 88 },
      { name: "NIR", wavelength: "750-900nm", probability: 85 },
      { name: "Red", wavelength: "620-700nm", probability: 79 },
    ],
  },
  {
    id: "mixed",
    name: "Mixed Forest",
    x: 15,
    y: 75,
    width: 35,
    height: 20,
    color: "rgba(74, 222, 128, 0.4)",
    bands: [
      { name: "NIR", wavelength: "750-900nm", probability: 82 },
      { name: "Red Edge", wavelength: "700-750nm", probability: 76 },
      { name: "Green", wavelength: "500-565nm", probability: 71 },
    ],
  },
  {
    id: "pine",
    name: "Pine Forest",
    x: 55,
    y: 80,
    width: 40,
    height: 18,
    color: "rgba(21, 128, 61, 0.4)",
    bands: [
      { name: "Red", wavelength: "620-700nm", probability: 90 },
      { name: "NIR", wavelength: "750-900nm", probability: 86 },
      { name: "SWIR-1", wavelength: "1550-1750nm", probability: 80 },
    ],
  },
]

const ANIMALS: AnimalSpot[] = [
  { id: "elephant-1", emoji: "🐘", name: "Asian Elephant", x: 20, y: 55, probability: 78 },
  { id: "elephant-2", emoji: "🐘", name: "Asian Elephant", x: 65, y: 30, probability: 65 },
  { id: "tiger", emoji: "🐅", name: "Tiger", x: 75, y: 20, probability: 12 },
  { id: "deer-1", emoji: "🦌", name: "Sambar Deer", x: 30, y: 25, probability: 85 },
  { id: "deer-2", emoji: "🦌", name: "Sambar Deer", x: 50, y: 65, probability: 72 },
  { id: "monkey-1", emoji: "🐒", name: "Macaque", x: 15, y: 15, probability: 92 },
  { id: "monkey-2", emoji: "🐒", name: "Macaque", x: 45, y: 35, probability: 88 },
  { id: "bird-1", emoji: "🦜", name: "Hornbill", x: 80, y: 55, probability: 67 },
  { id: "bird-2", emoji: "🦅", name: "Eagle", x: 55, y: 15, probability: 45 },
  { id: "boar", emoji: "🐗", name: "Wild Boar", x: 35, y: 80, probability: 73 },
  { id: "snake", emoji: "🐍", name: "Python", x: 25, y: 40, probability: 35 },
  { id: "peacock", emoji: "🦚", name: "Peacock", x: 60, y: 85, probability: 58 },
  { id: "bear", emoji: "🐻", name: "Sun Bear", x: 85, y: 40, probability: 22 },
  { id: "gaur", emoji: "🐃", name: "Gaur", x: 40, y: 70, probability: 48 },
]

export default function ForestryMap() {
  const [selectedZone, setSelectedZone] = useState<TreeZone | null>(null)
  const [selectedAnimal, setSelectedAnimal] = useState<AnimalSpot | null>(null)
  const [showTrails, setShowTrails] = useState(true)
  const [showAnimals, setShowAnimals] = useState(true)
  const [selectedBand, setSelectedBand] = useState<string>("all")

  const bands = ["all", "NIR", "Red Edge", "SWIR-1", "SWIR-2", "Red", "Green", "Blue", "Coastal"]

  const getTrailPath = (trail: Trail) => {
    return trail.points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ")
  }

  const getProbabilityColor = (prob: number) => {
    if (prob >= 80) return "text-green-400"
    if (prob >= 50) return "text-yellow-400"
    if (prob >= 30) return "text-orange-400"
    return "text-red-400"
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-500"
      case "moderate":
        return "bg-yellow-500"
      case "hard":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-green-500/50 rounded-lg p-6 shadow-2xl">
        <div className="flex items-center gap-3 mb-2">
          <TreePine className="w-8 h-8 text-green-400" />
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-emerald-300">
            Forestry Map - Walker Observation Forest
          </h2>
        </div>
        <p className="text-green-200 mb-4">
          Interactive forest map showing walking trails, tree species detection via spectral bands, and wildlife
          observation probabilities.
        </p>

        {/* Controls */}
        <div className="flex flex-wrap gap-4 mb-4">
          <button
            onClick={() => setShowTrails(!showTrails)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              showTrails ? "bg-amber-500 text-black" : "bg-slate-700 text-slate-300"
            }`}
          >
            <Footprints className="w-4 h-4" />
            Walking Trails
          </button>
          <button
            onClick={() => setShowAnimals(!showAnimals)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              showAnimals ? "bg-pink-500 text-white" : "bg-slate-700 text-slate-300"
            }`}
          >
            <Eye className="w-4 h-4" />
            Wildlife Spots
          </button>
        </div>

        {/* Band Filter */}
        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-slate-400 self-center mr-2">Filter by Band:</span>
          {bands.map((band) => (
            <button
              key={band}
              onClick={() => setSelectedBand(band)}
              className={`px-3 py-1.5 rounded text-sm font-medium transition-all ${
                selectedBand === band ? "bg-green-500 text-black" : "bg-slate-700 text-slate-300 hover:bg-slate-600"
              }`}
            >
              {band === "all" ? "All Bands" : band}
            </button>
          ))}
        </div>
      </div>

      {/* Map Container */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Map */}
        <div className="lg:col-span-2 bg-gradient-to-br from-slate-800 to-slate-900 border border-green-500/30 rounded-lg p-4">
          <div className="relative aspect-[4/3] bg-gradient-to-br from-green-950 to-emerald-950 rounded-lg overflow-hidden">
            <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
              {/* Background grid */}
              <defs>
                <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.2" />
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#grid)" />

              {/* Tree Zones */}
              {TREE_ZONES.map((zone) => {
                const isFiltered = selectedBand === "all" || zone.bands.some((b) => b.name === selectedBand)
                const opacity = isFiltered ? 1 : 0.3

                return (
                  <g key={zone.id} style={{ opacity }}>
                    <rect
                      x={zone.x}
                      y={zone.y}
                      width={zone.width}
                      height={zone.height}
                      fill={zone.color}
                      stroke={selectedZone?.id === zone.id ? "#22c55e" : "rgba(255,255,255,0.2)"}
                      strokeWidth={selectedZone?.id === zone.id ? 0.8 : 0.3}
                      rx="1"
                      className="cursor-pointer transition-all hover:stroke-green-400"
                      onClick={() => setSelectedZone(zone)}
                    />
                    <text
                      x={zone.x + zone.width / 2}
                      y={zone.y + zone.height / 2}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="white"
                      fontSize="2.5"
                      fontWeight="bold"
                      className="pointer-events-none"
                    >
                      {zone.name}
                    </text>
                  </g>
                )
              })}

              {/* Walking Trails (dashed lines) */}
              {showTrails &&
                TRAILS.map((trail) => (
                  <g key={trail.id}>
                    <path
                      d={getTrailPath(trail)}
                      fill="none"
                      stroke={trail.color}
                      strokeWidth="1"
                      strokeDasharray="2,1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="drop-shadow-lg"
                    />
                    {/* Trail markers */}
                    {trail.points.map((point, i) => (
                      <circle
                        key={i}
                        cx={point.x}
                        cy={point.y}
                        r="1"
                        fill={trail.color}
                        stroke="white"
                        strokeWidth="0.3"
                      />
                    ))}
                  </g>
                ))}

              {/* Animal Spots */}
              {showAnimals &&
                ANIMALS.map((animal) => (
                  <g key={animal.id} className="cursor-pointer" onClick={() => setSelectedAnimal(animal)}>
                    <circle
                      cx={animal.x}
                      cy={animal.y}
                      r="3"
                      fill={selectedAnimal?.id === animal.id ? "rgba(236, 72, 153, 0.6)" : "rgba(0,0,0,0.5)"}
                      stroke={selectedAnimal?.id === animal.id ? "#ec4899" : "transparent"}
                      strokeWidth="0.5"
                    />
                    <text
                      x={animal.x}
                      y={animal.y}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontSize="4"
                      className="pointer-events-none"
                    >
                      {animal.emoji}
                    </text>
                  </g>
                ))}
            </svg>

            {/* Trail Legend */}
            {showTrails && (
              <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm rounded-lg p-3 border border-white/10">
                <h4 className="text-xs font-bold text-white mb-2 flex items-center gap-1">
                  <Footprints className="w-3 h-3" /> Walking Trails
                </h4>
                <div className="space-y-1">
                  {TRAILS.map((trail) => (
                    <div key={trail.id} className="flex items-center gap-2 text-xs">
                      <div
                        className="w-8 h-0.5"
                        style={{
                          backgroundImage: `repeating-linear-gradient(90deg, ${trail.color} 0, ${trail.color} 4px, transparent 4px, transparent 6px)`,
                        }}
                      />
                      <span className="text-white">{trail.name}</span>
                      <span className={`px-1.5 py-0.5 rounded text-[10px] ${getDifficultyColor(trail.difficulty)}`}>
                        {trail.difficulty}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Side Panel */}
        <div className="space-y-4">
          {/* Selected Tree Zone Info */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-green-500/30 rounded-lg p-4">
            <h3 className="text-lg font-bold text-green-300 mb-3 flex items-center gap-2">
              <TreePine className="w-5 h-5" />
              Tree Detection via Bands
            </h3>
            {selectedZone ? (
              <div className="space-y-3">
                <div
                  className="px-3 py-2 rounded-lg border"
                  style={{
                    backgroundColor: selectedZone.color,
                    borderColor: "rgba(34, 197, 94, 0.5)",
                  }}
                >
                  <span className="font-bold text-white">{selectedZone.name}</span>
                </div>
                <div className="space-y-2">
                  {selectedZone.bands.map((band) => (
                    <div key={band.name} className="bg-slate-700/50 rounded-lg p-2">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-white">{band.name}</span>
                        <span className={`text-sm font-bold ${getProbabilityColor(band.probability)}`}>
                          {band.probability}%
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 mb-1">{band.wavelength}</div>
                      <div className="w-full bg-slate-600 rounded-full h-2">
                        <div
                          className="h-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-400"
                          style={{ width: `${band.probability}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-slate-400 text-sm">Click on a tree zone to see spectral band detection data.</p>
            )}
          </div>

          {/* Selected Animal Info */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-pink-500/30 rounded-lg p-4">
            <h3 className="text-lg font-bold text-pink-300 mb-3 flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Wildlife Observation
            </h3>
            {selectedAnimal ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3 bg-slate-700/50 rounded-lg p-3">
                  <span className="text-4xl">{selectedAnimal.emoji}</span>
                  <div>
                    <div className="font-bold text-white">{selectedAnimal.name}</div>
                    <div className={`text-lg font-bold ${getProbabilityColor(selectedAnimal.probability)}`}>
                      {selectedAnimal.probability}% chance
                    </div>
                  </div>
                </div>
                <div className="text-sm text-slate-400">
                  Observation probability based on thermal signatures and movement patterns detected via hyperspectral
                  imaging.
                </div>
              </div>
            ) : (
              <p className="text-slate-400 text-sm">Click on an animal icon to see observation probability.</p>
            )}
          </div>

          {/* Wildlife Summary */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-600/30 rounded-lg p-4">
            <h3 className="text-lg font-bold text-slate-300 mb-3">Wildlife Summary</h3>
            <div className="grid grid-cols-2 gap-2">
              {ANIMALS.slice(0, 8).map((animal) => (
                <div
                  key={animal.id}
                  className="flex items-center gap-2 bg-slate-700/30 rounded p-2 cursor-pointer hover:bg-slate-700/50 transition-colors"
                  onClick={() => setSelectedAnimal(animal)}
                >
                  <span className="text-xl">{animal.emoji}</span>
                  <span className={`text-sm font-bold ${getProbabilityColor(animal.probability)}`}>
                    {animal.probability}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
