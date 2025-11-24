"use client"

import { useState } from "react"
import { BANDS, ELEMENTS } from "@/lib/data"

interface SpectralSliderProps {
  selectedBand: string
  onBandChange: (band: string) => void
}

export default function SpectralSlider({ selectedBand, onBandChange }: SpectralSliderProps) {
  const [hoveredBand, setHoveredBand] = useState<string | null>(null)

  const bandColors: Record<string, string> = {
    ALL: "from-slate-500 to-slate-700",
    VIS: "from-violet-500 via-green-500 to-red-500",
    NIR: "from-red-600 to-red-800",
    SWIR: "from-orange-600 to-yellow-700",
    TIR: "from-purple-600 to-pink-700",
  }

  const bandDescriptions: Record<string, string> = {
    ALL: "แสดงข้อมูลทุก spectral bands",
    VIS: "Visible Light (0.4-0.7µm) - สีที่ตามองเห็น",
    NIR: "Near-Infrared (0.7-1.4µm) - ตรวจพืช สุขภาพพืช",
    SWIR: "Short-Wave IR (1.4-3µm) - แร่ธาตุ ความชื้น",
    TIR: "Thermal IR (8-14µm) - อุณหภูมิผิว ความร้อน",
  }

  // Get elements and objects detected in each band
  const getBandData = (band: string) => {
    if (band === "ALL") {
      return {
        elements: ELEMENTS.slice(0, 6).map((e) => e.symbol),
        objects: ["ทุกประเภท objects ตรวจพบได้"],
      }
    }

    const elementsInBand = ELEMENTS.filter((e) => e.bands.includes(band)).map((e) => e.symbol)
    const objectsInBand = new Set<string>()

    ELEMENTS.filter((e) => e.bands.includes(band)).forEach((elem) => {
      elem.typicalObjects.slice(0, 2).forEach((obj) => objectsInBand.add(obj))
    })

    return {
      elements: elementsInBand.slice(0, 6),
      objects: Array.from(objectsInBand).slice(0, 4),
    }
  }

  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-cyan-500/50 rounded-lg p-6 shadow-2xl backdrop-blur">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300 mb-2">
          Spectral Band Explorer
        </h2>
        <p className="text-sm text-blue-200">เลื่อน slider เพื่อดูธาตุและ objects ที่ตรวจพบในแต่ละ spectral band</p>
      </div>

      {/* Spectral Band Slider */}
      <div className="relative">
        <div className="flex gap-2 mb-4">
          {BANDS.map((band) => {
            const isSelected = selectedBand === band
            const isHovered = hoveredBand === band
            const bandData = getBandData(band)

            return (
              <div key={band} className="flex-1 relative">
                <button
                  onClick={() => onBandChange(band)}
                  onMouseEnter={() => setHoveredBand(band)}
                  onMouseLeave={() => setHoveredBand(null)}
                  className={`w-full h-24 rounded-lg transition-all relative overflow-hidden ${
                    isSelected
                      ? "ring-4 ring-cyan-400 scale-105 shadow-2xl"
                      : isHovered
                        ? "ring-2 ring-white/50 scale-102"
                        : "ring-1 ring-slate-600"
                  }`}
                >
                  {/* Gradient background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${bandColors[band]} opacity-80`}></div>

                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col items-center justify-center px-2">
                    <div className="text-white font-bold text-lg mb-1">{band}</div>
                    <div className="text-xs text-white/80 text-center">
                      {band === "ALL" ? "All Bands" : bandDescriptions[band]?.split("(")[0].trim()}
                    </div>
                  </div>

                  {/* Spectral visualization pattern */}
                  <div className="absolute bottom-0 left-0 right-0 h-8 opacity-30">
                    <svg className="w-full h-full" viewBox="0 0 100 30" preserveAspectRatio="none">
                      <path
                        d={`M 0,${20 + Math.sin(BANDS.indexOf(band)) * 5} Q 25,${10 + Math.cos(BANDS.indexOf(band) * 2) * 5} 50,${15 + Math.sin(BANDS.indexOf(band) * 3) * 5} T 100,${12 + Math.cos(BANDS.indexOf(band) * 4) * 5}`}
                        fill="none"
                        stroke="white"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                </button>

                {/* Hover tooltip */}
                {isHovered && (
                  <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-black/95 backdrop-blur-sm rounded-lg p-4 border-2 border-cyan-500 shadow-2xl z-50 min-w-[280px] pointer-events-none">
                    <div className="text-sm font-bold text-cyan-300 mb-2">{band} Band Details</div>
                    <div className="text-xs text-slate-300 mb-3">{bandDescriptions[band]}</div>

                    {/* Elements detected */}
                    <div className="mb-3">
                      <div className="text-[10px] font-semibold text-blue-300 mb-1">ธาตุที่ตรวจพบ:</div>
                      <div className="flex flex-wrap gap-1">
                        {bandData.elements.map((sym) => (
                          <span key={sym} className="px-2 py-1 rounded text-[10px] font-bold bg-cyan-500 text-white">
                            {sym}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Objects detected */}
                    <div>
                      <div className="text-[10px] font-semibold text-blue-300 mb-1">Objects ที่เป็นไปได้:</div>
                      <div className="space-y-1">
                        {bandData.objects.map((obj, idx) => (
                          <div key={idx} className="text-[10px] text-slate-300">
                            • {obj}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Spectral signature visualization */}
                    <div className="mt-3 pt-3 border-t border-slate-700">
                      <div className="text-[10px] text-slate-400 mb-2">Spectral Signature:</div>
                      <svg className="w-full h-12" viewBox="0 0 100 40" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id={`grad-${band}`} x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" style={{ stopColor: "#06b6d4", stopOpacity: 0.6 }} />
                            <stop offset="100%" style={{ stopColor: "#06b6d4", stopOpacity: 0.1 }} />
                          </linearGradient>
                        </defs>
                        {/* Spectral curve */}
                        <path
                          d={`M 0,${30 + Math.sin(BANDS.indexOf(band)) * 10} 
                             Q 20,${25 + Math.cos(BANDS.indexOf(band) * 2) * 10} 
                             40,${20 + Math.sin(BANDS.indexOf(band) * 3) * 10} 
                             T 80,${15 + Math.cos(BANDS.indexOf(band) * 4) * 10} 
                             100,${18 + Math.sin(BANDS.indexOf(band) * 5) * 10}
                             L 100,40 L 0,40 Z`}
                          fill={`url(#grad-${band})`}
                          stroke="#06b6d4"
                          strokeWidth="1"
                        />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Selected band info bar */}
        <div className="bg-black/60 rounded-lg p-4 border border-cyan-500/30">
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <div className="text-sm font-bold text-white mb-1">
                Selected: <span className="text-cyan-400">{selectedBand}</span>
              </div>
              <div className="text-xs text-slate-300">{bandDescriptions[selectedBand]}</div>
            </div>
            <div className="flex-1">
              <div className="text-[10px] font-semibold text-blue-300 mb-2">ธาตุหลักที่ตรวจพบใน {selectedBand}:</div>
              <div className="flex flex-wrap gap-1">
                {getBandData(selectedBand).elements.map((sym) => (
                  <span key={sym} className="px-2 py-1 rounded text-[10px] font-bold bg-cyan-600 text-white">
                    {sym}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
