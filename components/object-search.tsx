"use client"

import type React from "react"

import { useState } from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface ObjectSearchProps {
  onSearch: (query: string) => void
}

export default function ObjectSearch({ onSearch }: ObjectSearchProps) {
  const [query, setQuery] = useState("")

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query.trim())
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
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
        <Button
          onClick={handleSearch}
          className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white px-8 py-6 text-lg"
        >
          <Search className="w-5 h-5 mr-2" />
          Search
        </Button>
      </div>
    </div>
  )
}
