"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import MapViewer from "@/components/map-viewer"
import ZoneDetails from "@/components/zone-details"
import SpectralSlider from "@/components/spectral-slider"
import ObjectSearch from "@/components/object-search"
import ObjectDiscoveryDashboard from "@/components/object-discovery-dashboard"
import Terrain3DViewer from "@/components/terrain-3d-viewer"
import HyperspectralShowcaseSlider from "@/components/hyperspectral-showcase-slider"
import KeyConceptsSpectral from "@/components/key-concepts-spectral"
import KeyConceptsSemantic from "@/components/key-concepts-semantic"
import KeyConceptsMarket from "@/components/key-concepts-market"
import AboutUs from "@/components/about-us"
import ForestryMap from "@/components/forestry-map"
import { MATERIAL_LIBRARY, SCENE_ZONES, computeSceneCompositions } from "@/lib/data"
import { searchObject } from "@/lib/search-data"

export default function Home() {
  const [selectedZone, setSelectedZone] = useState<string | null>(null)
  const [selectedBand, setSelectedBand] = useState<string>("ALL")
  const [currentView, setCurrentView] = useState<
    | "map"
    | "hyperspectral"
    | "search"
    | "terrain3d"
    | "forestry"
    | "concepts-spectral"
    | "concepts-semantic"
    | "concepts-market"
    | "about"
  >("map")
  const [searchResult, setSearchResult] = useState<any>(null)
  const [cubesatDropdownOpen, setCubesatDropdownOpen] = useState(false)
  const [hsiDropdownOpen, setHsiDropdownOpen] = useState(false)

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
      <nav className="fixed top-0 left-0 right-0 z-[100] bg-black/30 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="text-xl font-bold text-white">Hyperspectral Imaging System</div>

            <div className="flex items-center gap-8">
              {/* About Us */}
              <button
                onClick={() => setCurrentView("about")}
                className="text-white hover:text-emerald-400 transition-colors font-medium relative z-[110] py-2"
              >
                About Us
              </button>

              {/* CubeSat Features Dropdown */}
              <div className="relative z-[110]">
                <button
                  onMouseEnter={() => setCubesatDropdownOpen(true)}
                  onMouseLeave={() => setCubesatDropdownOpen(false)}
                  className="flex items-center gap-1 text-white hover:text-cyan-400 transition-colors font-medium py-2"
                >
                  CubeSat Features
                  <ChevronDown className="w-4 h-4" />
                </button>
                {cubesatDropdownOpen && (
                  <div
                    onMouseEnter={() => setCubesatDropdownOpen(true)}
                    onMouseLeave={() => setCubesatDropdownOpen(false)}
                    className="absolute top-full left-0 mt-2 w-64 bg-black/90 backdrop-blur-md border border-white/20 rounded-lg shadow-xl py-2 z-[120]"
                  >
                    <button
                      onClick={() => {
                        setCurrentView("map")
                        setCubesatDropdownOpen(false)
                      }}
                      className="w-full px-5 py-3 text-left text-white hover:bg-cyan-500/20 hover:text-cyan-400 transition-colors"
                    >
                      Interactive Map View
                    </button>
                    <button
                      onClick={() => {
                        setCurrentView("hyperspectral")
                        setCubesatDropdownOpen(false)
                      }}
                      className="w-full px-5 py-3 text-left hover:bg-purple-500/20 transition-colors flex items-center justify-between gap-3"
                    >
                      <span className="text-white hover:text-purple-400">Hyperspectral Analysis</span>
                      <span className="px-2.5 py-1 text-xs bg-yellow-500 text-black rounded-md font-bold shrink-0">
                        Demo
                      </span>
                    </button>
                    <button
                      onClick={() => {
                        setCurrentView("search")
                        setCubesatDropdownOpen(false)
                      }}
                      className="w-full px-5 py-3 text-left hover:bg-pink-500/20 transition-colors flex items-center justify-between gap-3"
                    >
                      <span className="text-white hover:text-pink-400">Object Search</span>
                      <span className="px-2.5 py-1 text-xs bg-yellow-500 text-black rounded-md font-bold shrink-0">
                        Demo
                      </span>
                    </button>
                    <button
                      onClick={() => {
                        setCurrentView("terrain3d")
                        setCubesatDropdownOpen(false)
                      }}
                      className="w-full px-5 py-3 text-left hover:bg-green-500/20 transition-colors flex items-center justify-between gap-3"
                    >
                      <span className="text-white hover:text-green-400">3D Terrain View</span>
                      <span className="px-2.5 py-1 text-xs bg-yellow-500 text-black rounded-md font-bold shrink-0">
                        Demo
                      </span>
                    </button>
                    <button
                      onClick={() => {
                        setCurrentView("forestry")
                        setCubesatDropdownOpen(false)
                      }}
                      className="w-full px-5 py-3 text-left hover:bg-emerald-500/20 transition-colors flex items-center justify-between gap-3"
                    >
                      <span className="text-white hover:text-emerald-400">Forestry Map</span>
                      <span className="px-2.5 py-1 text-xs bg-yellow-500 text-black rounded-md font-bold shrink-0">
                        Demo
                      </span>
                    </button>
                  </div>
                )}
              </div>

              {/* What HSI Makes Better Dropdown */}
              <div className="relative z-[110]">
                <button
                  onMouseEnter={() => setHsiDropdownOpen(true)}
                  onMouseLeave={() => setHsiDropdownOpen(false)}
                  className="flex items-center gap-1 text-white hover:text-purple-400 transition-colors font-medium py-2"
                >
                  What HSI Makes Better
                  <ChevronDown className="w-4 h-4" />
                </button>
                {hsiDropdownOpen && (
                  <div
                    onMouseEnter={() => setHsiDropdownOpen(true)}
                    onMouseLeave={() => setHsiDropdownOpen(false)}
                    className="absolute top-full right-0 mt-2 w-72 bg-black/90 backdrop-blur-md border border-white/20 rounded-lg shadow-xl py-2 z-[120]"
                  >
                    <button
                      onClick={() => {
                        setCurrentView("concepts-spectral")
                        setHsiDropdownOpen(false)
                      }}
                      className="w-full px-5 py-3 text-left hover:bg-cyan-500/20 transition-colors flex items-center justify-between gap-4"
                    >
                      <span className="text-white hover:text-cyan-400 text-sm">Spectral Model & Materials</span>
                      <span className="px-2.5 py-1 text-[10px] bg-orange-500 text-white rounded-md font-bold shrink-0 leading-none">
                        First Draft
                      </span>
                    </button>
                    <button
                      onClick={() => {
                        setCurrentView("concepts-semantic")
                        setHsiDropdownOpen(false)
                      }}
                      className="w-full px-5 py-3 text-left hover:bg-purple-500/20 transition-colors flex items-center justify-between gap-4"
                    >
                      <span className="text-white hover:text-purple-400 text-sm">Semantic Mapping Engine</span>
                      <span className="px-2.5 py-1 text-[10px] bg-orange-500 text-white rounded-md font-bold shrink-0 leading-none">
                        First Draft
                      </span>
                    </button>
                    <button
                      onClick={() => {
                        setCurrentView("concepts-market")
                        setHsiDropdownOpen(false)
                      }}
                      className="w-full px-5 py-3 text-left hover:bg-green-500/20 transition-colors flex items-center justify-between gap-4"
                    >
                      <span className="text-white hover:text-green-400 text-sm">Market Applications</span>
                      <span className="px-2.5 py-1 text-[10px] bg-orange-500 text-white rounded-md font-bold shrink-0 leading-none">
                        First Draft
                      </span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div>
        {currentView !== "about" && (
          <div className="relative h-[400px] w-full overflow-hidden">
            <img src="/images/image.png" alt="Hyperspectral Imaging Satellite" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-slate-900" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
              <div className="mb-3 px-4 py-1.5 bg-emerald-500/20 border border-emerald-400/50 rounded-full backdrop-blur-sm">
                <span className="text-emerald-300 font-semibold text-sm tracking-wide uppercase">
                  KIWI CubeSat Mission
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
                Hyperspectral Imaging System
              </h1>
              <p className="text-xl md:text-2xl text-blue-200 max-w-3xl drop-shadow">
                Advanced satellite visualization with multispectral analysis and object discovery
              </p>
            </div>
          </div>
        )}

        {currentView === "about" ? (
          <AboutUs />
        ) : (
          <>
            <header className="border-b border-blue-500/20 bg-black/40 backdrop-blur-sm">
              <div className="max-w-7xl mx-auto px-6 py-6">
                <div className="mb-4">
                  <span className="text-sm text-slate-400 uppercase tracking-wider">Key Concepts of Hyperspectral</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <button
                      onClick={() => setCurrentView("concepts-spectral")}
                      className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                        currentView === "concepts-spectral"
                          ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg"
                          : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                      }`}
                    >
                      Spectral Model & Materials
                      <span className="ml-2 px-2 py-0.5 text-xs bg-orange-500 text-white rounded-full font-bold">
                        First Draft Design
                      </span>
                    </button>
                    <button
                      onClick={() => setCurrentView("concepts-semantic")}
                      className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                        currentView === "concepts-semantic"
                          ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                          : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                      }`}
                    >
                      Semantic Mapping Engine
                      <span className="ml-2 px-2 py-0.5 text-xs bg-orange-500 text-white rounded-full font-bold">
                        First Draft Design
                      </span>
                    </button>
                    <button
                      onClick={() => setCurrentView("concepts-market")}
                      className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                        currentView === "concepts-market"
                          ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg"
                          : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                      }`}
                    >
                      Market Applications & Labeling
                      <span className="ml-2 px-2 py-0.5 text-xs bg-orange-500 text-white rounded-full font-bold">
                        First Draft Design
                      </span>
                    </button>
                  </div>
                </div>

                <div className="border-t border-slate-700 pt-4">
                  <span className="text-sm text-slate-400 uppercase tracking-wider">Demo Features</span>
                  <div className="flex flex-wrap gap-3 mt-2">
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
                      <span className="ml-2 px-2 py-0.5 text-xs bg-yellow-500 text-black rounded-full font-bold">
                        Demo
                      </span>
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
                      <span className="ml-2 px-2 py-0.5 text-xs bg-yellow-500 text-black rounded-full font-bold">
                        Demo
                      </span>
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
                      <span className="ml-2 px-2 py-0.5 text-xs bg-yellow-500 text-black rounded-full font-bold">
                        Demo
                      </span>
                    </button>
                    <button
                      onClick={() => setCurrentView("forestry")}
                      className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                        currentView === "forestry"
                          ? "bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-lg shadow-emerald-500/50"
                          : "bg-slate-800 text-slate-400 hover:bg-slate-700"
                      }`}
                    >
                      Forestry Map
                      <span className="ml-2 px-2 py-0.5 text-xs bg-yellow-500 text-black rounded-full font-bold">
                        Demo
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-8 space-y-6">
              {currentView === "map" && <HyperspectralShowcaseSlider />}

              {currentView === "concepts-spectral" ? (
                <KeyConceptsSpectral />
              ) : currentView === "concepts-semantic" ? (
                <KeyConceptsSemantic />
              ) : currentView === "concepts-market" ? (
                <KeyConceptsMarket />
              ) : currentView === "terrain3d" ? (
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-green-500/50 rounded-lg p-6 shadow-2xl backdrop-blur">
                    <div className="mb-6">
                      <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-teal-300 mb-2">
                        3D Mountain Terrain Visualization
                      </h2>
                      <p className="text-base text-green-200">
                        Interactive 3D terrain map with elevation coloring and coordinate axes. Drag to rotate, scroll
                        to zoom.
                      </p>
                    </div>
                    <Terrain3DViewer />
                  </div>
                </div>
              ) : currentView === "forestry" ? (
                <ForestryMap />
              ) : currentView === "search" ? (
                <ObjectSearch onSearch={handleSearch} />
              ) : (
                <>
                  <SpectralSlider selectedBand={selectedBand} onBandChange={setSelectedBand} />

                  <div className="bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-cyan-500/50 rounded-lg p-6 shadow-2xl backdrop-blur">
                    <div className="mb-6">
                      <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300 mb-2">
                        Interactive Zone Map
                      </h2>
                      <p className="text-base text-blue-200">
                        Hover over zones for instant element and object detection data. Click for detailed analysis. Use
                        mouse wheel to zoom in/out.
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
                </>
              )}
            </main>
          </>
        )}
      </div>

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
