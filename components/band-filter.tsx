"use client"

interface BandFilterProps {
  selectedBand: string
  onBandChange: (band: string) => void
  bands: string[]
}

export default function BandFilter({ selectedBand, onBandChange, bands }: BandFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {bands.map((band) => (
        <button
          key={band}
          onClick={() => onBandChange(band)}
          className={`px-4 py-2 rounded-full font-medium text-sm transition-all ${
            selectedBand === band
              ? "bg-blue-500 text-white shadow-lg shadow-blue-500/50"
              : "bg-slate-700 text-blue-200 hover:bg-slate-600 hover:text-blue-100"
          }`}
        >
          {band}
        </button>
      ))}
    </div>
  )
}
