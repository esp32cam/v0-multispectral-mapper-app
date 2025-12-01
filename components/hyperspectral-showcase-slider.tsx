"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react"

interface Marker {
  id: string
  x: number
  y: number
  label: string
  description: string
  color: string
  materials: string[]
}

interface SlideData {
  id: number
  image: string
  title: string
  visibleDescription: string
  hyperspectralInsights: string[]
  markers: Marker[]
}

const slides: SlideData[] = [
  {
    id: 1,
    image: "/images/image.png",
    title: "Wildfire Detection & Analysis",
    visibleDescription: "ภาพถ่ายปกติ: เห็นเพียงเปลวไฟและควันบนภูเขา",
    hyperspectralInsights: [
      "ตรวจจับจุดร้อน (Hotspots) ที่ซ่อนอยู่ใต้ควัน ด้วยช่วงคลื่น SWIR (1.4-3μm)",
      "วิเคราะห์อุณหภูมิพื้นผิวแบบละเอียดด้วย Thermal Infrared (8-14μm)",
      "ระบุพื้นที่เสี่ยงลุกลามจากความชื้นในพืชพรรณด้วย NIR bands",
      "ตรวจวัดก๊าซพิษ (CO, CO2, CH4) ในกลุ่มควันด้วย Spectral Absorption",
      "แยกแยะเชื้อเพลิงประเภทต่างๆ (ไม้, หญ้า, พุ่มไม้) จาก Spectral Signature",
    ],
    markers: [
      {
        id: "fire-1",
        x: 45,
        y: 30,
        label: "Active Fire Front",
        description: "จุดไฟไหม้หลักที่มีอุณหภูมิสูงสุด 800-1200°C",
        color: "#ff4500",
        materials: ["Thermal Hotspot", "CO2 Emission", "Particulate Matter"],
      },
      {
        id: "fire-2",
        x: 25,
        y: 50,
        label: "Smoldering Zone",
        description: "พื้นที่ไฟคุกรุ่นใต้ควัน ตรวจจับด้วย SWIR",
        color: "#ff8c00",
        materials: ["Sub-surface Heat", "CO Emission", "Char Residue"],
      },
      {
        id: "fire-3",
        x: 70,
        y: 60,
        label: "Vegetation Stress",
        description: "พืชพรรณที่เสี่ยงต่อการลุกลาม ความชื้นต่ำ",
        color: "#32cd32",
        materials: ["Low Moisture", "Dry Biomass", "Stressed Chlorophyll"],
      },
      {
        id: "fire-4",
        x: 55,
        y: 15,
        label: "Smoke Plume Analysis",
        description: "วิเคราะห์องค์ประกอบควันและก๊าซพิษ",
        color: "#a0a0a0",
        materials: ["CH4", "NOx", "Aerosols"],
      },
    ],
  },
  {
    id: 2,
    image: "/images/image.png",
    title: "Flood Mapping & Water Quality",
    visibleDescription: "ภาพถ่ายปกติ: เห็นเพียงน้ำท่วมสีน้ำตาลขุ่นในเมือง",
    hyperspectralInsights: [
      "วัดความลึกของน้ำท่วมด้วย Water Penetration bands (Blue-Green)",
      "ตรวจสอบคุณภาพน้ำ: ตะกอน, สารเคมี, น้ำมัน ด้วย Spectral Analysis",
      "ระบุแหล่งน้ำปนเปื้อนสารพิษหรือน้ำเสียจากโรงงาน",
      "แยกแยะน้ำจืด-น้ำเค็ม-น้ำกร่อย จาก Chlorophyll และ Turbidity indices",
      "ประเมินความเสียหายของพืชผลใต้น้ำด้วย Vegetation Health bands",
    ],
    markers: [
      {
        id: "flood-1",
        x: 30,
        y: 45,
        label: "Deep Water Zone",
        description: "พื้นที่น้ำลึก >2m ตรวจจากการดูดกลืนแสง NIR",
        color: "#1e90ff",
        materials: ["High Turbidity", "Sediment Load", "Depth >2m"],
      },
      {
        id: "flood-2",
        x: 60,
        y: 35,
        label: "Contaminated Water",
        description: "น้ำปนเปื้อนสารเคมีจากพื้นที่อุตสาหกรรม",
        color: "#ff6347",
        materials: ["Oil Sheen", "Chemical Runoff", "Heavy Metals"],
      },
      {
        id: "flood-3",
        x: 45,
        y: 70,
        label: "Submerged Vegetation",
        description: "พืชผลที่จมอยู่ใต้น้ำ ประเมินความเสียหาย",
        color: "#228b22",
        materials: ["Stressed Crops", "Algae Bloom", "Decaying Matter"],
      },
      {
        id: "flood-4",
        x: 15,
        y: 55,
        label: "Infrastructure Damage",
        description: "โครงสร้างพื้นฐานที่ได้รับความเสียหาย",
        color: "#ffd700",
        materials: ["Structural Change", "Road Damage", "Building Impact"],
      },
    ],
  },
  {
    id: 3,
    image: "/images/image.png",
    title: "Mining & Deforestation Monitoring",
    visibleDescription: "ภาพถ่ายปกติ: เห็นเพียงพื้นที่เหมืองและป่าไม้รอบข้าง",
    hyperspectralInsights: [
      "ระบุชนิดแร่ธาตุ: ทองคำ, ดีบุก, ลิเธียม จาก Mineral Spectral Signatures",
      "ตรวจจับการปนเปื้อนโลหะหนักในดินและน้ำ (Mercury, Lead, Arsenic)",
      "วิเคราะห์สุขภาพป่าไม้รอบเหมือง: ความเครียดของต้นไม้จากมลพิษ",
      "ติดตามการฟื้นตัวของพืชพรรณหลังการทำเหมือง",
      "ประเมินการกัดเซาะดินและตะกอนในแหล่งน้ำจาก Sediment indices",
    ],
    markers: [
      {
        id: "mine-1",
        x: 45,
        y: 35,
        label: "Active Mining Zone",
        description: "พื้นที่ขุดเหมืองที่มีการเปิดหน้าดิน",
        color: "#daa520",
        materials: ["Exposed Soil", "Iron Oxide", "Clay Minerals"],
      },
      {
        id: "mine-2",
        x: 25,
        y: 55,
        label: "Contaminated Tailings",
        description: "บ่อกักเก็บน้ำที่ปนเปื้อนโลหะหนัก",
        color: "#ff4500",
        materials: ["Mercury", "Arsenic", "Lead Compounds"],
      },
      {
        id: "mine-3",
        x: 70,
        y: 40,
        label: "Stressed Forest",
        description: "ป่าไม้ที่ได้รับผลกระทบจากมลพิษเหมือง",
        color: "#9acd32",
        materials: ["Chlorosis", "Reduced NIR", "Stressed Canopy"],
      },
      {
        id: "mine-4",
        x: 55,
        y: 70,
        label: "Sediment Plume",
        description: "ตะกอนและสารพิษไหลลงสู่แหล่งน้ำ",
        color: "#8b4513",
        materials: ["Suspended Sediment", "Acid Drainage", "Mineral Runoff"],
      },
      {
        id: "mine-5",
        x: 15,
        y: 30,
        label: "Healthy Forest",
        description: "ป่าไม้สมบูรณ์สำหรับเปรียบเทียบ",
        color: "#006400",
        materials: ["High Chlorophyll", "Dense Canopy", "Healthy Biomass"],
      },
    ],
  },
]

export default function HyperspectralShowcaseSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [activeMarker, setActiveMarker] = useState<string | null>(null)

  useEffect(() => {
    if (!isPlaying) return
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
      setActiveMarker(null)
    }, 8000)
    return () => clearInterval(interval)
  }, [isPlaying])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
    setActiveMarker(null)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    setActiveMarker(null)
  }

  const currentData = slides[currentSlide]

  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-purple-500/50 rounded-lg p-6 shadow-2xl">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300 mb-1">
          Hyperspectral Imaging: มองเห็นมากกว่าที่ตาเห็น
        </h2>
        <p className="text-purple-200 text-sm">คลิกที่จุด marker บนภาพเพื่อดูข้อมูลที่ Hyperspectral สามารถตรวจจับได้</p>
      </div>

      <div className="relative">
        {/* Main Image with Markers */}
        <div className="relative aspect-video rounded-lg overflow-hidden bg-black">
          <img
            src={currentData.image || "/placeholder.svg"}
            alt={currentData.title}
            className="w-full h-full object-cover transition-opacity duration-500"
          />

          {currentData.markers.map((marker) => (
            <div
              key={marker.id}
              className="absolute cursor-pointer z-10"
              style={{ left: `${marker.x}%`, top: `${marker.y}%` }}
              onMouseEnter={() => setActiveMarker(marker.id)}
              onMouseLeave={() => setActiveMarker(null)}
              onClick={() => setActiveMarker(activeMarker === marker.id ? null : marker.id)}
            >
              {/* Pulsing marker */}
              <div
                className="relative w-5 h-5 rounded-full animate-pulse -translate-x-1/2 -translate-y-1/2"
                style={{ backgroundColor: marker.color, boxShadow: `0 0 15px ${marker.color}` }}
              >
                <div
                  className="absolute inset-0 rounded-full animate-ping opacity-75"
                  style={{ backgroundColor: marker.color }}
                />
              </div>

              {/* Tooltip */}
              {activeMarker === marker.id && (
                <div
                  className="absolute z-50 w-64 p-3 rounded-lg shadow-2xl border backdrop-blur-md"
                  style={{
                    backgroundColor: "rgba(15, 23, 42, 0.95)",
                    borderColor: marker.color,
                    left: marker.x > 50 ? "auto" : "20px",
                    right: marker.x > 50 ? "20px" : "auto",
                    top: marker.y > 60 ? "auto" : "-10px",
                    bottom: marker.y > 60 ? "20px" : "auto",
                  }}
                >
                  <h3 className="font-bold text-base mb-1" style={{ color: marker.color }}>
                    {marker.label}
                  </h3>
                  <p className="text-slate-300 text-xs mb-2">{marker.description}</p>
                  <div>
                    <p className="text-xs text-slate-400 mb-1">Detected:</p>
                    <div className="flex flex-wrap gap-1">
                      {marker.materials.map((mat) => (
                        <span
                          key={mat}
                          className="px-2 py-0.5 rounded text-xs font-medium"
                          style={{ backgroundColor: `${marker.color}30`, color: marker.color }}
                        >
                          {mat}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

          {/* Title on image */}
          <div className="absolute bottom-4 left-4 right-4 pointer-events-none">
            <h3 className="text-xl font-bold text-white mb-1">{currentData.title}</h3>
            <p className="text-amber-300 text-sm font-medium">{currentData.visibleDescription}</p>
          </div>

          {/* Navigation arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-all z-20"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-all z-20"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        <div className="mt-3 flex flex-wrap gap-3">
          {currentData.markers.map((marker) => (
            <div
              key={marker.id}
              className={`flex items-center gap-2 text-xs cursor-pointer px-2 py-1 rounded transition-all ${
                activeMarker === marker.id ? "bg-slate-700" : "hover:bg-slate-700/50"
              }`}
              onMouseEnter={() => setActiveMarker(marker.id)}
              onMouseLeave={() => setActiveMarker(null)}
            >
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: marker.color }} />
              <span className="text-slate-300">{marker.label}</span>
            </div>
          ))}
        </div>

        {/* Hyperspectral Insights Panel */}
        <div className="mt-4 bg-gradient-to-r from-purple-900/50 to-pink-900/50 border border-purple-500/30 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse" />
            <h4 className="text-purple-200 font-semibold">Hyperspectral Imaging สามารถเผยข้อมูลเพิ่มเติม:</h4>
          </div>
          <ul className="space-y-2">
            {currentData.hyperspectralInsights.map((insight, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-slate-200">
                <span className="text-cyan-400 font-bold mt-0.5">{index + 1}.</span>
                <span>{insight}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Slide indicators and controls */}
        <div className="flex items-center justify-center gap-4 mt-4">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 bg-slate-700 hover:bg-slate-600 rounded-full text-white transition-all"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
          <div className="flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentSlide(index)
                  setActiveMarker(null)
                }}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentSlide
                    ? "bg-gradient-to-r from-purple-400 to-pink-400 scale-125"
                    : "bg-slate-600 hover:bg-slate-500"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
