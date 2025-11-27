"use client"

import type React from "react"

import { useState } from "react"
import type { SceneZone, CompositionResult, Material } from "@/lib/data"
import { ELEMENTS } from "@/lib/data"

interface MapViewerProps {
  zones: SceneZone[]
  composition: CompositionResult
  materials: Material[]
  onZoneClick: (zoneId: string) => void
  selectedBand: string
}

export default function MapViewer({ zones, composition, materials, onZoneClick, selectedBand }: MapViewerProps) {
  const [hoveredZone, setHoveredZone] = useState<string | null>(null)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [panX, setPanX] = useState(0)
  const [panY, setPanY] = useState(0)
  const [isPanning, setIsPanning] = useState(false)
  const [startPan, setStartPan] = useState({ x: 0, y: 0 })

  const materialMap: Record<string, Material> = {}
  materials.forEach((m) => {
    materialMap[m.id] = m
  })

  const getFilteredElements = (zoneId: string) => {
    const zoneElements = composition.zoneElementPerc[zoneId] || {}
    if (selectedBand === "ALL") return zoneElements

    const filtered: Record<string, number> = {}
    Object.entries(zoneElements).forEach(([symbol, percent]) => {
      const element = ELEMENTS.find((e) => e.symbol === symbol)
      if (element && element.bands.includes(selectedBand)) {
        filtered[symbol] = percent
      }
    })
    return filtered
  }

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    const delta = e.deltaY > 0 ? 0.9 : 1.1
    setZoomLevel((prev) => Math.min(Math.max(prev * delta, 1), 4))
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0) {
      setIsPanning(true)
      setStartPan({ x: e.clientX - panX, y: e.clientY - panY })
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isPanning) {
      setPanX(e.clientX - startPan.x)
      setPanY(e.clientY - startPan.y)
    }
  }

  const handleMouseUp = () => {
    setIsPanning(false)
  }

  return (
    <div
      className="relative w-full h-full min-h-[700px] bg-slate-900 rounded-lg overflow-hidden border border-blue-500/30 cursor-grab active:cursor-grabbing"
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div
        className="absolute inset-0 transition-transform"
        style={{
          transform: `scale(${zoomLevel}) translate(${panX / zoomLevel}px, ${panY / zoomLevel}px)`,
          transformOrigin: "center center",
        }}
      >
        <div className="absolute inset-0">
          <img
            src="/aerial-satellite-view-of-mixed-terrain-with-forest.jpg"
            alt="Satellite map"
            className="w-full h-full object-cover opacity-70"
          />
        </div>

        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {zones.map((zone, idx) => {
            const isHovered = hoveredZone === zone.id
            const filteredElements = getFilteredElements(zone.id)
            const hasElementsInBand = Object.keys(filteredElements).length > 0

            let points = ""
            if (idx === 0) points = "0,0 60,0 55,20 70,35 60,60 30,50 20,80 0,70" // Forest (Top-Left/Center)
            else if (idx === 1) points = "60,0 100,0 100,60 75,50 70,35 55,20" // Dry Forest (Top-Right)
            else if (idx === 2) points = "0,70 20,80 30,50 60,60 50,85 40,100 0,100" // Bare Ground (Bottom-Left)
            else if (idx === 3) points = "60,60 75,50 100,60 100,100 40,100 50,85" // Salt/Disturbed (Bottom-Right)

            return (
              <g key={zone.id}>
                <polygon
                  points={points}
                  fill={zone.color}
                  opacity={hasElementsInBand ? (isHovered ? 0.6 : 0.4) : 0.1}
                  stroke={isHovered ? "#fff" : zone.color}
                  strokeWidth={isHovered ? 0.8 : 0.3}
                  className="transition-all cursor-pointer"
                  onMouseEnter={() => setHoveredZone(zone.id)}
                  onMouseLeave={() => setHoveredZone(null)}
                  onClick={() => onZoneClick(zone.id)}
                />
              </g>
            )
          })}
        </svg>

        <div className="absolute inset-0 pointer-events-none">
          {zones.map((zone, idx) => {
            const filteredElements = getFilteredElements(zone.id)
            const topElements = Object.entries(filteredElements)
              .sort((a, b) => b[1] - a[1])
              .slice(0, 3)
            const isHovered = hoveredZone === zone.id
            const hasElementsInBand = Object.keys(filteredElements).length > 0

            let positionClass = ""
            if (idx === 0) positionClass = "top-[30%] left-[20%]"
            else if (idx === 1) positionClass = "top-[20%] right-[10%]"
            else if (idx === 2) positionClass = "bottom-[15%] left-[10%]"
            else if (idx === 3) positionClass = "bottom-[15%] right-[15%]"

            return (
              <div key={zone.id} className={`absolute ${positionClass} pointer-events-auto`}>
                <div
                  className={`bg-black/80 backdrop-blur-sm rounded-lg p-3 border-2 transition-all cursor-pointer ${isHovered ? "border-white scale-105 shadow-2xl" : "border-transparent"
                    } ${!hasElementsInBand ? "opacity-40" : ""}`}
                  style={{ borderColor: isHovered ? "#fff" : zone.color }}
                  onMouseEnter={() => setHoveredZone(zone.id)}
                  onMouseLeave={() => setHoveredZone(null)}
                  onClick={() => onZoneClick(zone.id)}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 rounded" style={{ backgroundColor: zone.color }}></div>
                    <span className="text-xs font-bold text-white">{zone.label.replace("Zone ", "Z")}</span>
                  </div>
                  <div className="text-xs text-slate-300 mb-1">{(zone.areaFraction * 100).toFixed(0)}% of area</div>
                  {topElements.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      {topElements.map(([sym, pct]) => (
                        <span
                          key={sym}
                          className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-cyan-500 text-white"
                        >
                          {sym}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <div className="text-[10px] text-slate-500 italic">No detection in {selectedBand}</div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {hoveredZone &&
        (() => {
          const zone = zones.find((z) => z.id === hoveredZone)
          if (!zone) return null

          const filteredElements = getFilteredElements(zone.id)
          const elementEntries = Object.entries(filteredElements)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)

          if (elementEntries.length === 0) {
            return (
              <div className="absolute top-4 right-4 bg-black/95 backdrop-blur-sm rounded-lg p-5 border-2 border-red-500 shadow-2xl pointer-events-none max-w-md">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-6 h-6 rounded" style={{ backgroundColor: zone.color }}></div>
                  <div>
                    <div className="text-lg font-bold text-red-300">{zone.label}</div>
                    <div className="text-xs text-slate-400">ไม่พบธาตุใน {selectedBand} band</div>
                  </div>
                </div>
                <div className="text-sm text-slate-300">เปลี่ยน spectral band เพื่อดูธาตุอื่นๆ ที่ตรวจพบในโซนนี้</div>
              </div>
            )
          }

          const zoneMaterials = Object.entries(zone.materialMix)
            .map(([matId, fraction]) => ({
              material: materialMap[matId],
              fraction,
            }))
            .filter(({ material }) => material)
            .slice(0, 3)

          const allObjects = new Set<string>()
          zoneMaterials.forEach(({ material }) => {
            if (material) {
              material.objects.slice(0, 3).forEach((obj) => allObjects.add(obj))
            }
          })

          return (
            <div className="absolute top-4 right-4 bg-black/95 backdrop-blur-sm rounded-lg p-5 border-2 border-cyan-500 shadow-2xl pointer-events-none max-w-md">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-6 rounded" style={{ backgroundColor: zone.color }}></div>
                <div>
                  <div className="text-lg font-bold text-cyan-300">{zone.label}</div>
                  <div className="text-xs text-slate-400">
                    {(zone.areaFraction * 100).toFixed(1)}% of scene • {selectedBand} band
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <div className="text-xs font-semibold text-blue-300 mb-2">ELEMENTS IN {selectedBand} BAND</div>
                <div className="space-y-1">
                  {elementEntries.map(([symbol, percent]) => (
                    <div key={symbol} className="flex items-center gap-2">
                      <span className="w-8 text-xs font-bold text-cyan-400">{symbol}</span>
                      <div className="flex-1 bg-slate-700 rounded-full h-2 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                          style={{ width: `${Math.max(percent, 5)}%` }}
                        ></div>
                      </div>
                      <span className="w-12 text-right text-[10px] text-slate-300">{percent.toFixed(1)}%</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <div className="text-xs font-semibold text-blue-300 mb-2">DETECTED MATERIALS</div>
                <div className="space-y-1">
                  {zoneMaterials.map(({ material, fraction }) => (
                    <div key={material.id} className="flex items-center justify-between text-xs">
                      <span className="text-white font-medium">{material.label}</span>
                      <span className="text-slate-400">{(fraction * 100).toFixed(0)}%</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-xs font-semibold text-blue-300 mb-2">POSSIBLE OBJECTS</div>
                <div className="flex flex-wrap gap-1">
                  {Array.from(allObjects).map((obj) => (
                    <span
                      key={obj}
                      className="px-2 py-1 rounded text-[10px] bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/50 text-cyan-200"
                    >
                      {obj}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-slate-700 text-[10px] text-slate-500 italic">
                Click zone for full detailed analysis
              </div>
            </div>
          )
        })()}

      <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-sm rounded-lg p-3 border border-blue-500/30 pointer-events-auto">
        <div className="text-xs font-bold text-white mb-2">Zone Legend</div>
        <div className="space-y-1">
          {zones.map((zone) => (
            <div key={zone.id} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded" style={{ backgroundColor: zone.color }}></div>
              <span className="text-[10px] text-slate-300">{zone.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-sm rounded-lg p-2 border border-blue-500/30 pointer-events-auto flex flex-col gap-2">
        <button
          onClick={() => setZoomLevel((prev) => Math.min(prev * 1.2, 4))}
          className="px-3 py-2 bg-cyan-500/20 hover:bg-cyan-500/40 text-white rounded text-sm font-bold transition-colors"
        >
          +
        </button>
        <div className="text-[10px] text-center text-slate-300">{zoomLevel.toFixed(1)}x</div>
        <button
          onClick={() => setZoomLevel((prev) => Math.max(prev / 1.2, 1))}
          className="px-3 py-2 bg-cyan-500/20 hover:bg-cyan-500/40 text-white rounded text-sm font-bold transition-colors"
        >
          -
        </button>
        <button
          onClick={() => {
            setZoomLevel(1)
            setPanX(0)
            setPanY(0)
          }}
          className="px-2 py-1 bg-slate-600/50 hover:bg-slate-600/70 text-white rounded text-[10px] transition-colors"
        >
          Reset
        </button>
      </div>

      <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm rounded-lg p-3 border border-blue-500/30 pointer-events-none">
        <div className="text-xs text-slate-300 space-y-1">
          <div>
            <span className="text-cyan-400 font-semibold">Hover:</span> View instant data
          </div>
          <div>
            <span className="text-cyan-400 font-semibold">Click:</span> Detailed analysis
          </div>
          <div>
            <span className="text-cyan-400 font-semibold">Scroll:</span> Zoom in/out
          </div>
          <div>
            <span className="text-cyan-400 font-semibold">Drag:</span> Pan around
          </div>
        </div>
      </div>
    </div>
  )
}
