"use client"

import { useState } from "react"
import MapViewer from "@/components/map-viewer"
import ZoneDetails from "@/components/zone-details"
import SpectralSlider from "@/components/spectral-slider"
import HyperspectralViewer from "@/components/hyperspectral-viewer"
import ObjectSearch from "@/components/object-search"
import ObjectDiscoveryDashboard from "@/components/object-discovery-dashboard"
import InteractiveSpectralImage from "@/components/interactive-spectral-image"
import Terrain3DViewer from "@/components/terrain-3d-viewer"
import { MATERIAL_LIBRARY, SCENE_ZONES, computeSceneCompositions } from "@/lib/data"
import { searchObject } from "@/lib/search-data"

export default function Home() {
  const [selectedZone, setSelectedZone] = useState<string | null>(null)
  const [selectedBand, setSelectedBand] = useState<string>("ALL")
  const [currentView, setCurrentView] = useState<"map" | "hyperspectral" | "search" | "terrain3d">("map")
  const [searchResult, setSearchResult] = useState<any>(null)

  const composition = computeSceneCompositions(SCENE_ZONES, MATERIAL_LIBRARY)

  const handleZoneClick = (zoneId: string) => {
    setSelectedZone(zoneId)
  }

  const handleSearch = (query: string) => {
    const result = searchObject(query)
    if (result) {
      setSearchResult(result)
    } else {
      alert("Object not found. Try: Forest, Lake, Building, Road, Cropland, Desert, Snow, or Wetland")
    }
  }

  const selectedZoneObj = SCENE_ZONES.find((z) => z.id === selectedZone) || null

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <header className="border-b border-blue-500/20 bg-black/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="text-4xl font-bold text-white mb-2">Multispectral Element Mapper</h1>
          <p className="text-blue-200 text-lg">
            Interactive satellite map visualization with hyperspectral comparison and object discovery
          </p>
          <div className="flex flex-wrap gap-3 mt-4">
            <button
              onClick={() => setCurrentView("map")}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                currentView === "map"
                  ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/50"
                  : "bg-slate-800 text-slate-400 hover:bg-slate-700"
              }`}
            >
              Interactive Map View
            </button>
            <button
              onClick={() => setCurrentView("hyperspectral")}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                currentView === "hyperspectral"
                  ? "bg-gradient-to-r from-purple-500 to-cyan-500 text-white shadow-lg shadow-purple-500/50"
                  : "bg-slate-800 text-slate-400 hover:bg-slate-700"
              }`}
            >
              Hyperspectral Analysis
            </button>
            <button
              onClick={() => setCurrentView("search")}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                currentView === "search"
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/50"
                  : "bg-slate-800 text-slate-400 hover:bg-slate-700"
              }`}
            >
              Object Search
            </button>
            <button
              onClick={() => setCurrentView("terrain3d")}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                currentView === "terrain3d"
                  ? "bg-gradient-to-r from-green-500 to-teal-500 text-white shadow-lg shadow-green-500/50"
                  : "bg-slate-800 text-slate-400 hover:bg-slate-700"
              }`}
            >
              3D Terrain View
              <span className="ml-2 px-2 py-0.5 text-xs bg-yellow-500 text-black rounded-full font-bold">Demo</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        {currentView === "terrain3d" ? (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-green-500/50 rounded-lg p-6 shadow-2xl backdrop-blur">
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-teal-300 mb-2">
                  3D Mountain Terrain Visualization
                </h2>
                <p className="text-base text-green-200">
                  Interactive 3D terrain map with elevation coloring and coordinate axes. Drag to rotate, scroll to
                  zoom.
                </p>
              </div>
              <Terrain3DViewer />
            </div>
          </div>
        ) : currentView === "search" ? (
          <ObjectSearch onSearch={handleSearch} />
        ) : currentView === "map" ? (
          <>
            <SpectralSlider selectedBand={selectedBand} onBandChange={setSelectedBand} />

            <div className="bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-cyan-500/50 rounded-lg p-6 shadow-2xl backdrop-blur">
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300 mb-2">
                  Interactive Zone Map
                </h2>
                <p className="text-base text-blue-200">
                  Hover over zones for instant element and object detection data. Click for detailed analysis. Use mouse
                  wheel to zoom in/out.
                </p>
              </div>
              <MapViewer
                zones={SCENE_ZONES}
                composition={composition}
                materials={MATERIAL_LIBRARY}
                onZoneClick={handleZoneClick}
                selectedBand={selectedBand}
              />
            </div>

            <InteractiveSpectralImage />
          </>
        ) : (
          <HyperspectralViewer selectedBand={selectedBand} />
        )}
      </main>

      {selectedZone && currentView === "map" && (
        <ZoneDetails
          zone={selectedZoneObj}
          composition={composition}
          materials={MATERIAL_LIBRARY}
          onClose={() => setSelectedZone(null)}
        />
      )}

      {searchResult && <ObjectDiscoveryDashboard result={searchResult} onClose={() => setSearchResult(null)} />}
    </div>
  )
}
