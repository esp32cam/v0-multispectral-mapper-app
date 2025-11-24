"use client"

import { useState } from "react"

interface HyperspectralViewerProps {
  selectedBand: string
}

export default function HyperspectralViewer({ selectedBand }: HyperspectralViewerProps) {
  const [hoveredLayer, setHoveredLayer] = useState<number | null>(null)
  const [selectedCubeLayer, setSelectedCubeLayer] = useState(0)

  // Multispectral: 4-10 bands
  const multispectralBands = [
    { name: "Blue", wavelength: 475, color: "#3b82f6" },
    { name: "Green", wavelength: 560, color: "#10b981" },
    { name: "Red", wavelength: 660, color: "#ef4444" },
    { name: "NIR", wavelength: 840, color: "#8b5cf6" },
    { name: "SWIR-1", wavelength: 1610, color: "#f59e0b" },
    { name: "SWIR-2", wavelength: 2190, color: "#f97316" },
  ]

  // Hyperspectral: 100-200+ bands (showing subset)
  const generateHyperspectralBands = () => {
    const bands = []
    for (let i = 400; i <= 2500; i += 20) {
      let color = "#3b82f6"
      if (i < 500) color = "#818cf8"
      else if (i < 600) color = "#3b82f6"
      else if (i < 700) color = "#10b981"
      else if (i < 750) color = "#ef4444"
      else if (i < 1400) color = "#8b5cf6"
      else if (i < 1800) color = "#f59e0b"
      else color = "#f97316"
      bands.push({ wavelength: i, color })
    }
    return bands
  }

  const hyperspectralBands = generateHyperspectralBands()

  // Object detection comparison data
  const multispectralObjects = [
    { type: "ป่าไม้", confidence: 85, wavelengths: [560, 840] },
    { type: "ดินแดง", confidence: 78, wavelengths: [660, 1610] },
    { type: "น้ำ", confidence: 82, wavelengths: [475, 560] },
    { type: "ทราย", confidence: 70, wavelengths: [660, 1610, 2190] },
    { type: "เกลือ", confidence: 65, wavelengths: [660, 840] },
  ]

  const hyperspectralObjects = [
    { type: "ป่าไม้สุขภาพดี", confidence: 95, wavelengths: [550, 680, 740, 850, 1650] },
    { type: "ป่าไม้เครียด", confidence: 92, wavelengths: [550, 680, 720, 850, 1450] },
    { type: "ดินแดง (Laterite)", confidence: 94, wavelengths: [440, 660, 900, 1650, 2200] },
    { type: "ดินทรายแคลเซียม", confidence: 88, wavelengths: [560, 840, 1750, 2200, 2340] },
    { type: "น้ำใส", confidence: 96, wavelengths: [480, 560, 650] },
    { type: "น้ำขุ่น", confidence: 93, wavelengths: [520, 620, 700, 850] },
    { type: "ทรายควอทซ์", confidence: 91, wavelengths: [550, 680, 1400, 2200, 2400] },
    { type: "ทรายประกอบแร่เหล็ก", confidence: 89, wavelengths: [440, 660, 900, 1650, 2200] },
    { type: "เกลือบริสุทธิ์", confidence: 93, wavelengths: [480, 560, 840, 1650] },
    { type: "เกลือประกอบดิน", confidence: 87, wavelengths: [480, 560, 840, 1450, 2200] },
    { type: "พืชเกษตร (ข้าว)", confidence: 90, wavelengths: [560, 680, 740, 850, 1240] },
    { type: "พืชเกษตร (ข้าวโพด)", confidence: 88, wavelengths: [560, 680, 730, 850, 1650] },
    { type: "แอสฟัลต์", confidence: 85, wavelengths: [440, 660, 1650, 2200] },
    { type: "คอนกรีต", confidence: 86, wavelengths: [560, 840, 1750, 2200, 2340] },
    { type: "หินปูน", confidence: 89, wavelengths: [560, 840, 2340, 2500] },
  ]

  const detectionRatio = hyperspectralObjects.length / multispectralObjects.length

  // Generate spectral signature data for visualization
  const generateSpectralData = (objects: typeof multispectralObjects, isHyperspectral: boolean) => {
    const data: { wavelength: number; intensity: number }[] = []
    const wavelengthRange = isHyperspectral
      ? Array.from({ length: 105 }, (_, i) => 400 + i * 20)
      : [475, 560, 660, 840, 1610, 2190]

    wavelengthRange.forEach((wl) => {
      let intensity = 20 + Math.random() * 30
      objects.forEach((obj) => {
        if (obj.wavelengths.some((w) => Math.abs(w - wl) < 50)) {
          intensity += 30 + Math.random() * 20
        }
      })
      data.push({ wavelength: wl, intensity: Math.min(intensity, 100) })
    })
    return data
  }

  const multiSpectralData = generateSpectralData(multispectralObjects, false)
  const hyperSpectralData = generateSpectralData(hyperspectralObjects, true)

  return (
    <div className="space-y-8">
      {/* Comparison Header */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-orange-500/50 rounded-lg p-6">
          <h3 className="text-2xl font-bold text-orange-300 mb-3">Multispectral Imaging</h3>
          <div className="space-y-2 text-sm text-slate-300">
            <div className="flex justify-between">
              <span>จำนวน Bands:</span>
              <span className="font-bold text-orange-400">{multispectralBands.length} bands</span>
            </div>
            <div className="flex justify-between">
              <span>Objects ที่ตรวจพบ:</span>
              <span className="font-bold text-orange-400">{multispectralObjects.length} ชนิด</span>
            </div>
            <div className="flex justify-between">
              <span>ความละเอียด Spectral:</span>
              <span className="font-bold text-orange-400">100-300 nm/band</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-cyan-500/50 rounded-lg p-6">
          <h3 className="text-2xl font-bold text-cyan-300 mb-3">Hyperspectral Imaging</h3>
          <div className="space-y-2 text-sm text-slate-300">
            <div className="flex justify-between">
              <span>จำนวน Bands:</span>
              <span className="font-bold text-cyan-400">{hyperspectralBands.length} bands</span>
            </div>
            <div className="flex justify-between">
              <span>Objects ที่ตรวจพบ:</span>
              <span className="font-bold text-cyan-400">{hyperspectralObjects.length} ชนิด</span>
            </div>
            <div className="flex justify-between">
              <span>ความละเอียด Spectral:</span>
              <span className="font-bold text-cyan-400">5-20 nm/band</span>
            </div>
          </div>
        </div>
      </div>

      {/* Detection Ratio Display */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-green-500/50 rounded-lg p-8 text-center">
        <div className="text-sm text-slate-400 mb-2">HYPERSPECTRAL VS MULTISPECTRAL</div>
        <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400 mb-3">
          {detectionRatio.toFixed(1)}x
        </div>
        <div className="text-lg text-green-300 font-semibold">
          ตรวจจับ Objects ได้มากกว่า Multispectral {detectionRatio.toFixed(1)} เท่า
        </div>
      </div>

      {/* Hypercube Visualization */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-purple-500/50 rounded-lg p-6">
        <h3 className="text-2xl font-bold text-purple-300 mb-4">Hyperspectral Hypercube Layers</h3>
        <div className="text-sm text-slate-400 mb-6">
          แต่ละ layer แสดง spectral band ที่แตกต่างกัน - เลื่อน slider เพื่อสำรวจ
        </div>

        {/* Hypercube 3D-like visualization */}
        <div className="relative mb-6" style={{ height: "400px" }}>
          <div className="absolute inset-0 flex items-center justify-center">
            {hyperspectralBands.map((band, idx) => {
              const offset = (idx - selectedCubeLayer) * 3
              const opacity = Math.max(0, 1 - Math.abs(idx - selectedCubeLayer) * 0.1)
              const scale = 1 - Math.abs(offset) * 0.005
              const isSelected = idx === selectedCubeLayer

              return (
                <div
                  key={idx}
                  className="absolute transition-all duration-300 cursor-pointer"
                  style={{
                    width: `${300 * scale}px`,
                    height: `${200 * scale}px`,
                    transform: `translateZ(${offset}px) translateY(${offset * 0.5}px)`,
                    opacity: opacity,
                    zIndex: 100 - Math.abs(idx - selectedCubeLayer),
                    border: isSelected ? "3px solid white" : "1px solid rgba(255,255,255,0.2)",
                    borderRadius: "8px",
                    background: `linear-gradient(135deg, ${band.color}40, ${band.color}80)`,
                    boxShadow: isSelected ? `0 0 30px ${band.color}` : "none",
                  }}
                  onMouseEnter={() => setHoveredLayer(idx)}
                  onMouseLeave={() => setHoveredLayer(null)}
                  onClick={() => setSelectedCubeLayer(idx)}
                >
                  {(isSelected || hoveredLayer === idx) && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-black/90 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/30">
                        <div className="text-white font-bold text-lg">{band.wavelength} nm</div>
                        <div className="text-slate-300 text-xs">Layer {idx + 1}</div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Layer Slider */}
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-400 whitespace-nowrap">Layer: {selectedCubeLayer + 1}</span>
            <input
              type="range"
              min="0"
              max={hyperspectralBands.length - 1}
              value={selectedCubeLayer}
              onChange={(e) => setSelectedCubeLayer(Number(e.target.value))}
              className="flex-1 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, ${hyperspectralBands[selectedCubeLayer].color} 0%, ${hyperspectralBands[selectedCubeLayer].color} ${(selectedCubeLayer / hyperspectralBands.length) * 100}%, rgb(51, 65, 85) ${(selectedCubeLayer / hyperspectralBands.length) * 100}%, rgb(51, 65, 85) 100%)`,
              }}
            />
            <span className="text-sm font-bold text-cyan-400 whitespace-nowrap">
              {hyperspectralBands[selectedCubeLayer].wavelength} nm
            </span>
          </div>

          <div className="text-xs text-slate-400 text-center">
            Hypercube มี {hyperspectralBands.length} layers - แต่ละ layer คือ spectral band ที่แตกต่างกัน
          </div>
        </div>
      </div>

      {/* Spectral Slope Comparison */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Multispectral Slope */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-orange-500/50 rounded-lg p-6">
          <h3 className="text-xl font-bold text-orange-300 mb-4">Multispectral Spectral Signature</h3>
          <div className="relative h-64 bg-slate-900/50 rounded-lg p-4 overflow-hidden">
            <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
              {/* Grid lines */}
              {[0, 25, 50, 75, 100].map((y) => (
                <line
                  key={y}
                  x1="0"
                  y1={200 - y * 2}
                  x2="400"
                  y2={200 - y * 2}
                  stroke="rgba(148, 163, 184, 0.1)"
                  strokeWidth="1"
                />
              ))}

              {/* Slope line */}
              <polyline
                points={multiSpectralData
                  .map((d, i) => `${(i / (multiSpectralData.length - 1)) * 400},${200 - d.intensity * 2}`)
                  .join(" ")}
                fill="none"
                stroke="url(#multiGradient)"
                strokeWidth="3"
              />

              {/* Data points */}
              {multiSpectralData.map((d, i) => {
                const x = (i / (multiSpectralData.length - 1)) * 400
                const y = 200 - d.intensity * 2
                return (
                  <g key={i}>
                    <circle cx={x} cy={y} r="5" fill="#f97316" stroke="white" strokeWidth="2" />
                  </g>
                )
              })}

              <defs>
                <linearGradient id="multiGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#f97316" />
                  <stop offset="50%" stopColor="#fb923c" />
                  <stop offset="100%" stopColor="#fdba74" />
                </linearGradient>
              </defs>
            </svg>

            {/* Axis labels */}
            <div className="absolute bottom-0 left-0 right-0 text-[10px] text-slate-400 text-center">
              Wavelength (nm)
            </div>
            <div
              className="absolute top-0 bottom-0 left-0 text-[10px] text-slate-400 flex items-center"
              style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
            >
              Reflectance
            </div>
          </div>

          {/* Objects detected with hover info */}
          <div className="mt-4 space-y-2">
            <div className="text-xs font-semibold text-orange-300 mb-2">Objects ที่ตรวจพบ:</div>
            <div className="grid grid-cols-1 gap-1">
              {multispectralObjects.map((obj, idx) => (
                <div
                  key={idx}
                  className="group relative bg-orange-500/10 hover:bg-orange-500/30 border border-orange-500/30 rounded px-3 py-2 transition-colors cursor-pointer"
                  onMouseEnter={() => setHoveredLayer(idx)}
                  onMouseLeave={() => setHoveredLayer(null)}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-white">{obj.type}</span>
                    <span className="text-xs text-orange-300">{obj.confidence}%</span>
                  </div>

                  {hoveredLayer === idx && (
                    <div className="absolute left-full ml-2 top-0 bg-black/95 backdrop-blur-sm rounded-lg p-3 border border-orange-500 shadow-2xl z-50 whitespace-nowrap">
                      <div className="text-xs text-slate-300 mb-1">Wavelengths used:</div>
                      <div className="flex gap-1">
                        {obj.wavelengths.map((wl) => (
                          <span key={wl} className="px-2 py-1 rounded bg-orange-500 text-white text-[10px] font-bold">
                            {wl}nm
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Hyperspectral Slope */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-cyan-500/50 rounded-lg p-6">
          <h3 className="text-xl font-bold text-cyan-300 mb-4">Hyperspectral Spectral Signature</h3>
          <div className="relative h-64 bg-slate-900/50 rounded-lg p-4 overflow-hidden">
            <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
              {/* Grid lines */}
              {[0, 25, 50, 75, 100].map((y) => (
                <line
                  key={y}
                  x1="0"
                  y1={200 - y * 2}
                  x2="400"
                  y2={200 - y * 2}
                  stroke="rgba(148, 163, 184, 0.1)"
                  strokeWidth="1"
                />
              ))}

              {/* Smooth slope line */}
              <polyline
                points={hyperSpectralData
                  .map((d, i) => `${(i / (hyperSpectralData.length - 1)) * 400},${200 - d.intensity * 2}`)
                  .join(" ")}
                fill="none"
                stroke="url(#hyperGradient)"
                strokeWidth="3"
              />

              {/* Fill under curve */}
              <polygon
                points={`0,200 ${hyperSpectralData
                  .map((d, i) => `${(i / (hyperSpectralData.length - 1)) * 400},${200 - d.intensity * 2}`)
                  .join(" ")} 400,200`}
                fill="url(#hyperFillGradient)"
                opacity="0.2"
              />

              <defs>
                <linearGradient id="hyperGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="50%" stopColor="#22d3ee" />
                  <stop offset="100%" stopColor="#67e8f9" />
                </linearGradient>
                <linearGradient id="hyperFillGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
              </defs>
            </svg>

            {/* Axis labels */}
            <div className="absolute bottom-0 left-0 right-0 text-[10px] text-slate-400 text-center">
              Wavelength (nm)
            </div>
            <div
              className="absolute top-0 bottom-0 left-0 text-[10px] text-slate-400 flex items-center"
              style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
            >
              Reflectance
            </div>
          </div>

          {/* Objects detected with hover info */}
          <div className="mt-4 space-y-2 max-h-64 overflow-y-auto">
            <div className="text-xs font-semibold text-cyan-300 mb-2">
              Objects ที่ตรวจพบ ({hyperspectralObjects.length} ชนิด):
            </div>
            <div className="grid grid-cols-1 gap-1">
              {hyperspectralObjects.map((obj, idx) => (
                <div
                  key={idx}
                  className="group relative bg-cyan-500/10 hover:bg-cyan-500/30 border border-cyan-500/30 rounded px-3 py-2 transition-colors cursor-pointer"
                  onMouseEnter={() => setHoveredLayer(1000 + idx)}
                  onMouseLeave={() => setHoveredLayer(null)}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-white">{obj.type}</span>
                    <span className="text-xs text-cyan-300">{obj.confidence}%</span>
                  </div>

                  {hoveredLayer === 1000 + idx && (
                    <div className="absolute right-full mr-2 top-0 bg-black/95 backdrop-blur-sm rounded-lg p-3 border border-cyan-500 shadow-2xl z-50 whitespace-nowrap">
                      <div className="text-xs text-slate-300 mb-1">Wavelengths used:</div>
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {obj.wavelengths.map((wl) => (
                          <span key={wl} className="px-2 py-1 rounded bg-cyan-500 text-white text-[10px] font-bold">
                            {wl}nm
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
