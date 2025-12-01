"use client"

import { useState } from "react"

interface HyperspectralViewerProps {
  selectedBand: string
}

export default function HyperspectralViewer({ selectedBand }: HyperspectralViewerProps) {
  const [hoveredLayer, setHoveredLayer] = useState<number | null>(null)
  const [selectedCubeLayer, setSelectedCubeLayer] = useState(0)
  const [multiLayerCount, setMultiLayerCount] = useState(6)
  const [hyperLayerCount, setHyperLayerCount] = useState(50)

  // Multispectral: 4-10 bands
  const multispectralBands = [
    { name: "Blue", wavelength: 475, color: "#3b82f6" },
    { name: "Green", wavelength: 560, color: "#22c55e" },
    { name: "Red", wavelength: 660, color: "#ef4444" },
    { name: "NIR", wavelength: 840, color: "#a855f7" },
    { name: "SWIR-1", wavelength: 1610, color: "#f59e0b" },
    { name: "SWIR-2", wavelength: 2190, color: "#f97316" },
  ]

  const generateRainbowColor = (index: number, total: number) => {
    const hue = (index / total) * 300 // 0-300 for violet to red
    return `hsl(${hue}, 80%, 50%)`
  }

  // Hyperspectral: 100-200+ bands (showing subset)
  const generateHyperspectralBands = () => {
    const bands = []
    for (let i = 400; i <= 2500; i += 20) {
      const idx = (i - 400) / 20
      const total = (2500 - 400) / 20
      bands.push({ wavelength: i, color: generateRainbowColor(idx, total) })
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
          <div className="text-sm text-slate-400 mb-3">N separated bands</div>
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
          <div className="text-sm text-slate-400 mb-3">Continuous spectrum</div>
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
        <div className="mt-4 text-sm text-slate-400">
          Enables Spectral Analysis: Segmentation, Spectral unmixing, Evolution of spectra in time
        </div>
      </div>

      {/* Hypercube Layer Comparison - 3 Equal Columns */}
      <div className="space-y-6">
        {/* Title and KIWI Label */}
        <div className="text-center relative">
          <h3 className="text-3xl font-bold text-white mb-2">Hypercube Layer Comparison</h3>
          <div className="absolute top-0 right-0 text-center">
            <div className="text-sm font-semibold text-cyan-400">
              ↓ KIWI (my cubesat)
              <br />
              Uses Hyperspectral Imaging
            </div>
          </div>
        </div>

        {/* 3 Equal Column Grid */}
        <div className="grid grid-cols-3 gap-6">
          {/* RGB Section */}
          <div className="space-y-4">
            <div className="text-center">
              <h4 className="text-lg font-bold text-white">RGB</h4>
              <p className="text-xs text-slate-400 mt-1">3 separated bands</p>
            </div>

            {/* 3D Box Stack - RGB Layers */}
            <div className="relative h-56 flex items-center justify-center">
              <div className="relative" style={{ perspective: "800px" }}>
                <div
                  className="relative"
                  style={{
                    transformStyle: "preserve-3d",
                    transform: "rotateX(15deg) rotateY(-25deg)",
                  }}
                >
                  {[
                    { name: "Red", color: "#ef4444" },
                    { name: "Green", color: "#22c55e" },
                    { name: "Blue", color: "#3b82f6" },
                  ].map((band, idx) => (
                    <div
                      key={idx}
                      className="absolute transition-all duration-300"
                      style={{
                        width: "100px",
                        height: "75px",
                        transform: `translateZ(${idx * 20}px) translateY(${-idx * 6}px)`,
                        background: `linear-gradient(135deg, ${band.color}90, ${band.color}50)`,
                        border: `2px solid ${band.color}`,
                        borderRadius: "4px",
                        boxShadow: `0 4px 15px ${band.color}40`,
                      }}
                      onMouseEnter={() => setHoveredLayer(idx)}
                      onMouseLeave={() => setHoveredLayer(null)}
                    >
                      {hoveredLayer === idx && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded">
                          <div className="text-center">
                            <div className="text-white font-bold text-xs">{band.name}</div>
                            <div className="text-[10px] text-slate-300">{[660, 560, 475][idx]}nm</div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute top-2 right-2 text-xs text-slate-400">Pixel (x, y)</div>
            </div>

            {/* Band Count Display */}
            <div className="text-center text-sm">
              <span className="text-slate-400">Bands: </span>
              <span className="font-bold text-white">3</span>
            </div>

            {/* RGB Bar Chart */}
            <div className="bg-slate-900/50 rounded-lg p-3">
              <div className="text-xs text-slate-400 mb-2 text-center">Intensity vs Wavelength</div>
              <div className="flex items-end justify-center gap-2 h-24">
                {[
                  { color: "#3b82f6", val: 65 },
                  { color: "#22c55e", val: 70 },
                  { color: "#ef4444", val: 60 },
                ].map((d, i) => (
                  <div key={i} className="flex-1">
                    <div
                      className="w-full rounded-t transition-all duration-300"
                      style={{
                        height: `${d.val}%`,
                        background: d.color,
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Multispectral Section */}
          <div className="space-y-4">
            <div className="text-center">
              <h4 className="text-lg font-bold text-orange-300">MULTISPECTRAL IMAGING</h4>
              <p className="text-xs text-slate-400 mt-1">N separated bands</p>
            </div>

            {/* 3D Box Stack - Separated Layers */}
            <div className="relative h-56 flex items-center justify-center">
              <div className="relative" style={{ perspective: "800px" }}>
                <div
                  className="relative"
                  style={{
                    transformStyle: "preserve-3d",
                    transform: "rotateX(15deg) rotateY(-25deg)",
                  }}
                >
                  {Array.from({ length: multiLayerCount }).map((_, idx) => {
                    const colors = ["#3b82f6", "#22c55e", "#eab308", "#f97316", "#ef4444", "#a855f7"]
                    const layerSpacing = 25
                    return (
                      <div
                        key={idx}
                        className="absolute transition-all duration-300"
                        style={{
                          width: "100px",
                          height: "75px",
                          transform: `translateZ(${idx * layerSpacing}px) translateY(${-idx * 8}px)`,
                          background: `linear-gradient(135deg, ${colors[idx % colors.length]}90, ${colors[idx % colors.length]}50)`,
                          border: `2px solid ${colors[idx % colors.length]}`,
                          borderRadius: "4px",
                          boxShadow: `0 4px 20px ${colors[idx % colors.length]}40`,
                        }}
                        onMouseEnter={() => setHoveredLayer(idx)}
                        onMouseLeave={() => setHoveredLayer(null)}
                      >
                        {hoveredLayer === idx && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded">
                            <div className="text-center">
                              <div className="text-white font-bold text-xs">
                                {multispectralBands[idx]?.name || `Band ${idx + 1}`}
                              </div>
                              <div className="text-[10px] text-slate-300">
                                {multispectralBands[idx]?.wavelength || 400 + idx * 200}nm
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
              <div className="absolute top-2 right-2 text-xs text-slate-400">Pixel (x, y)</div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Bands:</span>
                <span className="font-bold text-orange-400">{multiLayerCount}</span>
              </div>
              <input
                type="range"
                min="3"
                max="10"
                value={multiLayerCount}
                onChange={(e) => setMultiLayerCount(Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-orange-500"
              />
            </div>

            {/* Bar Chart for Multispectral */}
            <div className="bg-slate-900/50 rounded-lg p-3">
              <div className="text-xs text-slate-400 mb-2 text-center">Intensity vs Wavelength</div>
              <div className="flex items-end justify-center gap-1 h-24">
                {multiSpectralData.map((d, i) => (
                  <div key={i} className="flex-1">
                    <div
                      className="w-full rounded-t transition-all duration-300"
                      style={{
                        height: `${d.intensity}%`,
                        background: multispectralBands[i]?.color || "#f97316",
                      }}
                      onMouseEnter={() => setHoveredLayer(100 + i)}
                      onMouseLeave={() => setHoveredLayer(null)}
                    />
                    {hoveredLayer === 100 + i && (
                      <div className="absolute -top-8 bg-black/90 px-2 py-1 rounded text-xs text-white whitespace-nowrap">
                        {d.wavelength}nm: {Math.round(d.intensity)}%
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Hyperspectral Section */}
          <div className="space-y-4">
            <div className="text-center">
              <h4 className="text-lg font-bold text-cyan-300">HYPERSPECTRAL IMAGING</h4>
              <p className="text-xs text-slate-400 mt-1">Continuous spectrum</p>
            </div>

            {/* 3D Hypercube */}
            <div className="relative h-56 flex items-center justify-center">
              <div className="relative" style={{ perspective: "1200px" }}>
                <div
                  className="relative"
                  style={{
                    transformStyle: "preserve-3d",
                    transform: "rotateX(15deg) rotateY(-25deg)",
                    width: "140px",
                    height: "105px",
                  }}
                >
                  {Array.from({ length: hyperLayerCount }).map((_, idx) => {
                    const hue = (idx / hyperLayerCount) * 360
                    const layerSpacing = 2 // Increased from 1 to 2 for slight layer visibility
                    return (
                      <div
                        key={idx}
                        className="absolute transition-all duration-300 shadow-lg"
                        style={{
                          width: "140px",
                          height: "105px",
                          transform: `translateZ(${idx * layerSpacing}px)`,
                          background: `linear-gradient(135deg, hsl(${hue}, 100%, 55%), hsl(${hue}, 100%, 35%))`,
                          border: `1.5px solid hsl(${hue}, 100%, 75%)`,
                          borderRadius: "2px",
                          opacity: 0.95,
                          boxShadow: `0 2px 8px hsl(${hue}, 100%, 50%)40, inset 0 1px 2px rgba(255,255,255,0.1)`,
                        }}
                        onMouseEnter={() => setHoveredLayer(1000 + idx)}
                        onMouseLeave={() => setHoveredLayer(null)}
                      >
                        {hoveredLayer === 1000 + idx && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded">
                            <div className="text-center">
                              <div className="text-white font-bold text-xs">Layer {idx + 1}</div>
                              <div className="text-[10px] text-slate-300">{400 + (idx / hyperLayerCount) * 300}nm</div>
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
              <div className="absolute top-2 right-2 text-xs text-slate-400">Pixel (x, y)</div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Bands:</span>
                <span className="font-bold text-cyan-400">{hyperLayerCount}</span>
              </div>
              <input
                type="range"
                min="20"
                max="100"
                value={hyperLayerCount}
                onChange={(e) => setHyperLayerCount(Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
              />
            </div>

            <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
              <div className="text-xs text-slate-400 mb-3 text-center font-semibold">
                Intensity vs Wavelength (Continuous)
              </div>
              <svg
                className="w-full h-32"
                viewBox="0 0 400 120"
                preserveAspectRatio="xMidYMid meet"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="curveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="20%" stopColor="#3b82f6" />
                    <stop offset="40%" stopColor="#06b6d4" />
                    <stop offset="60%" stopColor="#22c55e" />
                    <stop offset="80%" stopColor="#eab308" />
                    <stop offset="100%" stopColor="#ef4444" />
                  </linearGradient>
                  <linearGradient id="curveFillGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.05" />
                  </linearGradient>
                </defs>
                {/* X and Y axes */}
                <line x1="30" y1="100" x2="380" y2="100" stroke="#475569" strokeWidth="1" />
                <line x1="30" y1="15" x2="30" y2="100" stroke="#475569" strokeWidth="1" />
                {/* Axis labels */}
                <text x="200" y="115" textAnchor="middle" fontSize="10" fill="#94a3b8">
                  Wavelength
                </text>
                <text x="10" y="50" textAnchor="middle" fontSize="10" fill="#94a3b8" transform="rotate(-90 10 50)">
                  Intensity
                </text>
                {/* Smooth continuous spectrum curve */}
                <path
                  d="M 30 85 Q 80 60 130 50 T 230 45 T 330 55 T 380 70"
                  stroke="url(#curveGradient)"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Filled area under curve */}
                <path
                  d="M 30 85 Q 80 60 130 50 T 230 45 T 330 55 T 380 70 L 380 100 L 30 100 Z"
                  fill="url(#curveFillGradient)"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Layer Explorer */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-purple-500/50 rounded-lg p-6">
        <h3 className="text-xl font-bold text-purple-300 mb-4">Hypercube Layer Explorer</h3>
        <div className="text-sm text-slate-400 mb-6">
          เลื่อน slider เพื่อสำรวจแต่ละ layer ของ Hypercube - สังเกตความถี่ที่หนาแน่นกว่า Multispectral
        </div>

        {/* Layer slider with wavelength display */}
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-400 whitespace-nowrap w-24">Layer {selectedCubeLayer + 1}</span>
            <div className="flex-1 relative">
              <input
                type="range"
                min="0"
                max={hyperspectralBands.length - 1}
                value={selectedCubeLayer}
                onChange={(e) => setSelectedCubeLayer(Number(e.target.value))}
                className="w-full h-3 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, ${hyperspectralBands
                    .map((b, i) => `${b.color} ${(i / hyperspectralBands.length) * 100}%`)
                    .join(", ")})`,
                }}
              />
            </div>
            <span className="text-sm font-bold text-cyan-400 whitespace-nowrap w-24 text-right">
              {hyperspectralBands[selectedCubeLayer]?.wavelength || 400} nm
            </span>
          </div>

          {/* Current layer info */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-slate-900/50 rounded-lg p-3">
              <div className="text-2xl font-bold" style={{ color: hyperspectralBands[selectedCubeLayer]?.color }}>
                {selectedCubeLayer + 1}
              </div>
              <div className="text-xs text-slate-400">Layer Index</div>
            </div>
            <div className="bg-slate-900/50 rounded-lg p-3">
              <div className="text-2xl font-bold text-cyan-400">
                {hyperspectralBands[selectedCubeLayer]?.wavelength || 400} nm
              </div>
              <div className="text-xs text-slate-400">Wavelength</div>
            </div>
            <div className="bg-slate-900/50 rounded-lg p-3">
              <div className="text-2xl font-bold text-purple-400">20 nm</div>
              <div className="text-xs text-slate-400">Band Width</div>
            </div>
          </div>

          <div className="text-xs text-slate-400 text-center">
            Hypercube มี {hyperspectralBands.length} layers - ความถี่สูงทำให้ตรวจจับวัตถุได้ละเอียดกว่า
          </div>
        </div>
      </div>

      {/* Spectral Slope Comparison section remains the same */}
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
                  onMouseEnter={() => setHoveredLayer(300 + idx)}
                  onMouseLeave={() => setHoveredLayer(null)}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-white">{obj.type}</span>
                    <span className="text-xs text-orange-300">{obj.confidence}%</span>
                  </div>

                  {hoveredLayer === 300 + idx && (
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

              {/* Slope line */}
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
                  onMouseEnter={() => setHoveredLayer(400 + idx)}
                  onMouseLeave={() => setHoveredLayer(null)}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-white">{obj.type}</span>
                    <span className="text-xs text-cyan-300">{obj.confidence}%</span>
                  </div>

                  {hoveredLayer === 400 + idx && (
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
