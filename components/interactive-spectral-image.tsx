"use client"

import { useState } from "react"
import Image from "next/image"

interface Marker {
  id: string
  x: number // percentage
  y: number // percentage
  label: string
  description: string
  elements: string[]
  color: string
}

const markers: Marker[] = [
  {
    id: "1",
    x: 15,
    y: 35,
    label: "Hydrothermal Alteration Zone",
    description: "High concentration of clay minerals and iron oxides indicating hydrothermal activity",
    elements: ["Fe₂O₃", "Al₂Si₂O₅(OH)₄", "SiO₂"],
    color: "from-pink-500 to-purple-500",
  },
  {
    id: "2",
    x: 35,
    y: 55,
    label: "Vegetation Index High",
    description: "Dense vegetation cover with high chlorophyll content detected in NIR band",
    elements: ["Chlorophyll-a", "H₂O", "Cellulose"],
    color: "from-green-500 to-emerald-500",
  },
  {
    id: "3",
    x: 50,
    y: 25,
    label: "Mineral Outcrop",
    description: "Exposed bedrock with sulfide minerals and quartz veins",
    elements: ["FeS₂", "CuFeS₂", "SiO₂"],
    color: "from-yellow-500 to-orange-500",
  },
  {
    id: "4",
    x: 72,
    y: 40,
    label: "Geological Formation",
    description: "Layered sedimentary rocks with carbonate and silicate composition",
    elements: ["CaCO₃", "MgCO₃", "SiO₂"],
    color: "from-cyan-500 to-blue-500",
  },
  {
    id: "5",
    x: 88,
    y: 65,
    label: "Saline Deposit",
    description: "Evaporite minerals and salt flats detected in SWIR bands",
    elements: ["NaCl", "CaSO₄", "MgCl₂"],
    color: "from-pink-400 to-rose-500",
  },
  {
    id: "6",
    x: 25,
    y: 75,
    label: "Mafic Intrusion",
    description: "Dark ignite minerals rich in iron and magnesium silicates",
    elements: ["(Mg,Fe)₂SiO₄", "CaMgSi₂O₆", "FeO"],
    color: "from-red-500 to-orange-500",
  },
]

export default function InteractiveSpectralImage() {
  const [activeMarker, setActiveMarker] = useState<Marker | null>(null)

  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-cyan-500/50 rounded-lg p-6 shadow-2xl">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-300 mb-2">
          Real Multispectral Satellite Imagery
        </h2>
        <p className="text-blue-200 text-sm">
          Hover over the markers to explore detected materials and spectral signatures in different regions
        </p>
      </div>

      <div className="relative rounded-lg overflow-hidden border border-cyan-500/30">
        <Image
          src="/images/image.png"
          alt="Multispectral satellite imagery showing geological and vegetation features"
          width={1200}
          height={600}
          className="w-full h-auto"
        />

        {/* Interactive Markers */}
        {markers.map((marker) => (
          <div
            key={marker.id}
            className="absolute"
            style={{ left: `${marker.x}%`, top: `${marker.y}%` }}
            onMouseEnter={() => setActiveMarker(marker)}
            onMouseLeave={() => setActiveMarker(null)}
          >
            {/* Marker Point */}
            <div className="relative cursor-pointer group">
              <div
                className={`w-4 h-4 rounded-full bg-gradient-to-r ${marker.color} animate-pulse shadow-lg border-2 border-white/80`}
              />
              <div
                className={`absolute inset-0 w-4 h-4 rounded-full bg-gradient-to-r ${marker.color} opacity-50 animate-ping`}
              />

              {/* Tooltip */}
              {activeMarker?.id === marker.id && (
                <div className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-3 w-64 pointer-events-none">
                  <div className="bg-slate-900/95 backdrop-blur-sm border border-cyan-500/50 rounded-lg p-3 shadow-xl">
                    <h4
                      className={`font-bold text-sm mb-1 text-transparent bg-clip-text bg-gradient-to-r ${marker.color}`}
                    >
                      {marker.label}
                    </h4>
                    <p className="text-xs text-slate-300 mb-2">{marker.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {marker.elements.map((el) => (
                        <span
                          key={el}
                          className="px-2 py-0.5 bg-cyan-500/20 text-cyan-300 text-xs rounded-full border border-cyan-500/30"
                        >
                          {el}
                        </span>
                      ))}
                    </div>
                    {/* Arrow */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-slate-900/95" />
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-3">
        {markers.map((marker) => (
          <div
            key={marker.id}
            className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer hover:text-white transition-colors"
            onMouseEnter={() => setActiveMarker(marker)}
            onMouseLeave={() => setActiveMarker(null)}
          >
            <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${marker.color}`} />
            <span>{marker.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
