"use client"

import type { Element } from "@/lib/data"

interface ElementGridProps {
  elements: Element[]
  selectedElements: string[]
  selectedBand: string
  onToggle: (symbol: string) => void
}

export default function ElementGrid({ elements, selectedElements, selectedBand, onToggle }: ElementGridProps) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {elements.map((el) => {
        const isSelected = selectedElements.includes(el.symbol)
        const isHighlight = selectedBand !== "ALL" && el.bands.includes(selectedBand)

        return (
          <button
            key={el.symbol}
            onClick={() => onToggle(el.symbol)}
            className={`aspect-square rounded-lg font-bold text-center p-2 transition-all duration-200 ${
              isSelected
                ? "bg-gradient-to-br from-blue-400 to-blue-600 text-white shadow-lg shadow-blue-500/50 scale-105"
                : isHighlight
                  ? "bg-gradient-to-br from-cyan-500 to-blue-500 text-white shadow-md shadow-cyan-500/30"
                  : "bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-blue-200"
            }`}
          >
            <div className="text-xl font-bold">{el.symbol}</div>
            <div className="text-xs opacity-75">{el.atomicNumber}</div>
          </button>
        )
      })}
    </div>
  )
}
