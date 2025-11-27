"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"

import { OBJECT_TEMPLATES } from "@/lib/search-data"

interface ObjectSearchProps {
  onSearch: (query: string) => void
}

export default function ObjectSearch({ onSearch }: ObjectSearchProps) {
  const [query, setQuery] = useState("")

  const handleSearch = (searchQuery: string = query) => {
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim())
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  const filteredObjects = Object.entries(OBJECT_TEMPLATES).filter(([key, template]) => {
    const searchLower = query.toLowerCase()
    return (
      key.toLowerCase().includes(searchLower) ||
      template.keywords.some((k) => k.toLowerCase().includes(searchLower))
    )
  })

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-purple-500/50 rounded-lg p-6 shadow-2xl backdrop-blur">
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-cyan-300 mb-2">
            Object Search & Discovery
          </h2>
          <p className="text-blue-200">
            Enter any object name to discover which multispectral bands and elements are used to detect it
          </p>
        </div>
        <div className="flex gap-3">
          <Input
            type="text"
            placeholder="e.g., Forest, Lake, Building, Road, Cropland..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 bg-slate-900/50 border-blue-500/30 text-white placeholder:text-slate-400 text-lg py-6"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredObjects.map(([key, template]) => (
          <div
            key={key}
            onClick={() => handleSearch(key)}
            className="group cursor-pointer bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-purple-500/50 rounded-lg p-5 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-bold text-slate-200 group-hover:text-purple-300 capitalize">
                {key}
              </h3>
              <div className="flex gap-1">
                {template.primaryBands.slice(0, 2).map((band) => (
                  <span key={band} className="text-[10px] px-2 py-1 rounded bg-slate-700 text-slate-300">
                    {band}
                  </span>
                ))}
              </div>
            </div>
            <p className="text-sm text-slate-400 line-clamp-2 group-hover:text-slate-300">
              {template.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
