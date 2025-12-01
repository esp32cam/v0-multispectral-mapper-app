"use client"

import { useState } from "react"

interface Marker {
  id: string
  x: number // percentage
  y: number // percentage
  label: string
  description: string
  color: string
  materials: string[]
}

const markers: Marker[] = [
  {
    id: "1",
    x: 8,
    y: 35,
    label: "Hydrothermal Zone",
    description: "High temperature alteration zone indicating potential geothermal activity",
    color: "#00ffff",
    materials: ["Silica", "Sulfur", "Iron Oxide"],
  },
  {
    id: "2",
    x: 25,
    y: 55,
    label: "Vegetation Cover",
    description: "Dense vegetation with high chlorophyll content, indicating healthy plant growth",
    color: "#00ff00",
    materials: ["Chlorophyll-a", "Chlorophyll-b", "Carotenoids"],
  },
  {
    id: "3",
    x: 38,
    y: 25,
    label: "Mineral Deposits",
    description: "Rich mineral concentration zone with copper and iron oxide signatures",
    color: "#ffd700",
    materials: ["Copper", "Iron Oxide", "Manganese"],
  },
  {
    id: "4",
    x: 55,
    y: 40,
    label: "Geological Formation",
    description: "Ancient rock formation with distinct spectral signatures",
    color: "#ff6b6b",
    materials: ["Granite", "Quartz", "Feldspar"],
  },
  {
    id: "5",
    x: 72,
    y: 30,
    label: "Altered Terrain",
    description: "Weathered surface showing oxidation and mineral alteration patterns",
    color: "#a855f7",
    materials: ["Limonite", "Goethite", "Hematite"],
  },
  {
    id: "6",
    x: 88,
    y: 60,
    label: "Salt Flat / Evaporite",
    description: "Evaporite deposits with high reflectance in visible spectrum",
    color: "#ff69b4",
    materials: ["Halite", "Gypsum", "Carbonate"],
  },
]

export default function InteractiveSpectralImage() {
  const [activeMarker, setActiveMarker] = useState<string | null>(null)

  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-purple-500/50 rounded-lg p-6 shadow-2xl">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300 mb-2">
          Multispectral Satellite Analysis
        </h2>
        <p className="text-base text-purple-200">
          Hover over the markers to explore detected materials and geological features in this hyperspectral composite
          image.
        </p>
      </div>

      <div className="relative rounded-lg overflow-hidden border border-purple-500/30">
        <img
          src="/images/image.png"
          alt="Multispectral satellite imagery showing various geological and vegetation features"
          className="w-full h-auto"
        />

        {/* Interactive Markers */}
        {markers.map((marker) => (
          <div
            key={marker.id}
            className="absolute cursor-pointer"
            style={{ left: `${marker.x}%`, top: `${marker.y}%` }}
            onMouseEnter={() => setActiveMarker(marker.id)}
            onMouseLeave={() => setActiveMarker(null)}
          >
            {/* Pulsing marker */}
            <div
              className="relative w-4 h-4 rounded-full animate-pulse"
              style={{ backgroundColor: marker.color, boxShadow: `0 0 12px ${marker.color}` }}
            >
              <div
                className="absolute inset-0 rounded-full animate-ping opacity-75"
                style={{ backgroundColor: marker.color }}
              />
            </div>

            {/* Tooltip */}
            {activeMarker === marker.id && (
              <div
                className="absolute z-50 w-72 p-4 rounded-lg shadow-2xl border backdrop-blur-md"
                style={{
                  backgroundColor: "rgba(15, 23, 42, 0.95)",
                  borderColor: marker.color,
                  left: marker.x > 50 ? "auto" : "24px",
                  right: marker.x > 50 ? "24px" : "auto",
                  top: marker.y > 50 ? "auto" : "0",
                  bottom: marker.y > 50 ? "24px" : "auto",
                }}
              >
                <h3 className="font-bold text-lg mb-2" style={{ color: marker.color }}>
                  {marker.label}
                </h3>
                <p className="text-slate-300 text-sm mb-3">{marker.description}</p>
                <div>
                  <p className="text-xs text-slate-400 mb-1">Detected Materials:</p>
                  <div className="flex flex-wrap gap-1">
                    {marker.materials.map((mat) => (
                      <span
                        key={mat}
                        className="px-2 py-1 rounded text-xs font-medium"
                        style={{ backgroundColor: `${marker.color}20`, color: marker.color }}
                      >
                        {mat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-4">
        {markers.map((marker) => (
          <div
            key={marker.id}
            className="flex items-center gap-2 text-sm"
            onMouseEnter={() => setActiveMarker(marker.id)}
            onMouseLeave={() => setActiveMarker(null)}
          >
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: marker.color }} />
            <span className="text-slate-300">{marker.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
