"use client"

import type { SceneZone, CompositionResult, Material } from "@/lib/data"
import { X } from "lucide-react"

interface ZoneDetailsProps {
  zone: SceneZone | null
  composition: CompositionResult
  materials: Material[]
  onClose: () => void
}

export default function ZoneDetails({ zone, composition, materials, onClose }: ZoneDetailsProps) {
  if (!zone) return null

  const zoneElements = composition.zoneElementPerc[zone.id] || {}
  const elementEntries = Object.entries(zoneElements).sort((a, b) => b[1] - a[1])

  // Get materials in this zone
  const materialMap: Record<string, Material> = {}
  materials.forEach((m) => {
    materialMap[m.id] = m
  })

  const zoneMaterials = Object.entries(zone.materialMix).map(([matId, fraction]) => ({
    material: materialMap[matId],
    fraction,
  }))

  // Collect all possible objects from materials in this zone
  const allObjects = new Set<string>()
  zoneMaterials.forEach(({ material }) => {
    if (material) {
      material.objects.forEach((obj) => allObjects.add(obj))
    }
  })

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-cyan-500 rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-slate-900/95 backdrop-blur-sm border-b border-cyan-500/30 p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded" style={{ backgroundColor: zone.color }}></div>
            <h2 className="text-2xl font-bold text-white">{zone.label}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-700/50 transition-colors text-slate-300 hover:text-white"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Area coverage */}
          <div>
            <h3 className="text-lg font-semibold text-cyan-300 mb-2">Area Coverage</h3>
            <div className="bg-slate-700/50 rounded p-4 border border-blue-500/20">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-slate-300">Percentage of total scene</span>
                <span className="text-xl font-bold text-cyan-300">{(zone.areaFraction * 100).toFixed(1)}%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
                <div
                  className="h-full transition-all"
                  style={{ width: `${zone.areaFraction * 100}%`, backgroundColor: zone.color }}
                ></div>
              </div>
            </div>
          </div>

          {/* Element composition */}
          <div>
            <h3 className="text-lg font-semibold text-cyan-300 mb-3">Element Composition</h3>
            <div className="space-y-2">
              {elementEntries.map(([symbol, percent]) => (
                <div key={symbol} className="flex items-center gap-3">
                  <span className="w-12 text-sm font-bold text-blue-300">{symbol}</span>
                  <div className="flex-1 bg-slate-700/50 rounded-full h-6 overflow-hidden border border-blue-500/30">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all"
                      style={{ width: `${Math.max(percent, 3)}%` }}
                    ></div>
                  </div>
                  <span className="w-16 text-right text-xs text-slate-300">{percent.toFixed(1)}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Material composition */}
          <div>
            <h3 className="text-lg font-semibold text-cyan-300 mb-3">Detected Materials</h3>
            <div className="space-y-2">
              {zoneMaterials.map(({ material, fraction }) => {
                if (!material) return null
                return (
                  <div key={material.id} className="bg-slate-700/30 rounded p-3 border border-blue-500/20">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-white">{material.label}</span>
                      <span className="text-xs text-slate-400">{(fraction * 100).toFixed(0)}% of zone</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {Object.entries(material.elements).map(([sym, weight]) => (
                        <span key={sym} className="px-2 py-1 rounded text-xs bg-slate-600/50 text-blue-300">
                          {sym}
                        </span>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Possible objects */}
          <div>
            <h3 className="text-lg font-semibold text-cyan-300 mb-3">Detected Objects & Features</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {Array.from(allObjects).map((obj) => (
                <div
                  key={obj}
                  className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded px-3 py-2 text-sm text-white"
                >
                  {obj}
                </div>
              ))}
            </div>
          </div>

          {/* Info note */}
          <div className="bg-slate-700/50 rounded p-4 border border-blue-500/30 text-xs text-slate-300 italic">
            <strong className="text-blue-300">Note:</strong> Object detection is based on the material composition
            identified from multispectral analysis. Actual ground truth may vary.
          </div>
        </div>
      </div>
    </div>
  )
}
