"use client"

import type { Element, CompositionResult, SceneZone } from "@/lib/data"
import { getElementZoneInfo, getZoneTopElements } from "@/lib/data"

interface DetailPanelProps {
  activeElement: Element | null
  composition: CompositionResult
  sceneZones: SceneZone[]
  detectedElements: string[]
}

export default function DetailPanel({ activeElement, composition, sceneZones, detectedElements }: DetailPanelProps) {
  if (!activeElement) {
    return (
      <div className="space-y-6">
        <div>
          <div className="text-2xl font-bold text-white mb-3">Scene element composition</div>
          <div className="text-sm text-blue-300 mb-4">
            จากการ segment ภาพดาวเทียม model แยกออกมาเป็นวัสดุ/zone แล้วประมาณธาตุในแต่ละส่วน
          </div>

          <div className="space-y-2">
            {detectedElements.length === 0 ? (
              <div className="text-xs text-slate-400 italic">ยังไม่พบธาตุจาก model</div>
            ) : (
              detectedElements.map((sym) => {
                const percent = composition.sceneElementPerc[sym] || 0
                return (
                  <div key={sym} className="flex items-center gap-3">
                    <span className="w-12 text-sm font-bold text-blue-300">{sym}</span>
                    <div className="flex-1 bg-slate-700/50 rounded-full h-6 overflow-hidden border border-blue-500/30">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all"
                        style={{ width: `${Math.max(percent, 3)}%` }}
                      ></div>
                    </div>
                    <span className="w-12 text-right text-xs text-slate-300">{percent.toFixed(1)}%</span>
                  </div>
                )
              })
            )}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-blue-300 mb-3">Zones จากภาพดาวเทียม</h3>
          <div className="space-y-2">
            {sceneZones.map((zone) => {
              const topElements = getZoneTopElements(zone.id, composition, 2)
              const areaPercent = zone.areaFraction * 100
              return (
                <div key={zone.id} className="bg-slate-700/30 rounded p-3 border border-blue-500/20">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: zone.color }}></div>
                    <span className="text-sm font-medium text-white flex-1">{zone.label}</span>
                    <span className="text-xs text-slate-400">{areaPercent.toFixed(1)}% ของพื้นที่</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {topElements.length === 0 ? (
                      <span className="text-xs text-slate-400">-</span>
                    ) : (
                      topElements.map(([sym, pct]) => (
                        <span key={sym} className="px-2 py-1 rounded text-xs bg-slate-600/50 text-blue-300">
                          {sym} {pct.toFixed(1)}%
                        </span>
                      ))
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="bg-slate-700/50 rounded p-4 border border-blue-500/30 text-xs text-slate-300 italic">
          <strong className="text-blue-300">หมายเหตุ:</strong> กล้องดาวเทียมไม่ได้เห็น &quot;ธาตุ&quot; โดยตรง แต่เห็นวัสดุ/แร่/ดิน
          ที่เป็นสารประกอบของหลายธาตุ เลือกธาตุจากซ้ายเพื่อดูรายละเอียด
        </div>
      </div>
    )
  }

  const activeElementZoneInfo = getElementZoneInfo(activeElement.symbol, sceneZones, composition)

  return (
    <div className="space-y-6 max-h-[80vh] overflow-y-auto">
      <div>
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300 mb-2">
          {activeElement.symbol} — {activeElement.nameTh}
        </h1>
        <div className="text-sm text-blue-300">
          Atomic #{activeElement.atomicNumber} · {activeElement.groups.join(", ")}
        </div>
        <div className="text-xs text-slate-400 mt-1">({activeElement.nameEn})</div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-blue-300 mb-2">สัดส่วนในทั้ง scene</h3>
        <div className="bg-slate-700/50 rounded p-3 border border-blue-500/20">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-slate-300">รวมทั้งภาพ</span>
            <span className="text-sm font-bold text-cyan-300">
              {(composition.sceneElementPerc[activeElement.symbol] || 0).toFixed(1)}%
            </span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
              style={{ width: `${Math.max(composition.sceneElementPerc[activeElement.symbol] || 0, 2)}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-blue-300 mb-3">Band ที่เกี่ยวข้อง</h3>
        <div className="flex flex-wrap gap-2">
          {activeElement.bands.map((b) => (
            <span
              key={b}
              className="px-3 py-1 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm font-medium shadow-lg shadow-blue-500/30"
            >
              {b}
            </span>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-blue-300 mb-3">Spectral hints</h3>
        <div className="space-y-3">
          {Object.entries(activeElement.spectralHints).map(([band, text]) => (
            <div key={band} className="bg-slate-700/50 rounded p-3 border border-blue-500/20">
              <h4 className="font-semibold text-cyan-300 text-sm mb-1">{band}</h4>
              <p className="text-xs text-slate-300 leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-blue-300 mb-3">ธาตุนี้กระจายอยู่ใน zone</h3>
        {activeElementZoneInfo.zoneRows.length === 0 ? (
          <div className="text-xs text-slate-400 italic">model ไม่เจอธาตุนี้ใน data จำลอง</div>
        ) : (
          <div className="space-y-2">
            {activeElementZoneInfo.zoneRows.map((row) => (
              <div key={row.zone.id} className="bg-slate-700/30 rounded p-3 border border-blue-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded" style={{ backgroundColor: row.zone.color }}></div>
                  <span className="text-sm font-medium text-white">{row.zone.label}</span>
                </div>
                <p className="text-xs text-slate-300">
                  ใน zone นี้ ธาตุ <strong>{activeElement.symbol}</strong> ~{" "}
                  <strong>{row.withinZonePercent.toFixed(1)}%</strong> ของธาตุทั้งหมด และ zone นี้ถือครอง{" "}
                  <strong>{row.contributionPercent.toFixed(1)}%</strong> ของธาตุทั้ง scene
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <h3 className="text-lg font-semibold text-blue-300 mb-3">มักอยู่ในวัสดุอะไรบ้าง</h3>
        <ul className="space-y-2">
          {activeElement.typicalMaterials.map((m) => (
            <li key={m} className="text-sm text-slate-300 bg-slate-700/30 rounded px-3 py-2 border-l-2 border-blue-400">
              {m}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-blue-300 mb-3">โอกาสเจอในโลกจริง</h3>
        <ul className="space-y-2">
          {activeElement.typicalObjects.map((o) => (
            <li key={o} className="text-sm text-slate-300 bg-slate-700/30 rounded px-3 py-2 border-l-2 border-cyan-400">
              {o}
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-slate-700/50 rounded p-4 border border-blue-500/30 text-xs text-slate-300 italic">
        <strong className="text-blue-300">Tip:</strong> ถ้าจะใช้จริงจัง แนะนำผูกวัสดุพวกนี้กับ spectral library (เช่น USGS)
        แล้วต่อด้วย feature extraction / ML classifier บนภาพดาวเทียม
      </div>
    </div>
  )
}
