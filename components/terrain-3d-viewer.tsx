"use client"

import { useRef, useMemo, useState, Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Text, Line, Html } from "@react-three/drei"
import * as THREE from "three"

// Spectral mode types
type SpectralMode = "elevation" | "hyperspectral" | "multispectral"

// Detection data for markers
interface Detection {
  position: [number, number, number]
  type: string
  label: string
  color: string
  description: string
}

// Generate procedural terrain heightmap
function generateTerrainData(width: number, height: number, scale = 1) {
  const data = new Float32Array(width * height)

  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      const x = j / width
      const y = i / height

      let elevation = 0
      elevation += Math.sin(x * 4 * Math.PI) * Math.cos(y * 3 * Math.PI) * 0.5
      elevation += Math.sin(x * 8 * Math.PI + 1) * Math.cos(y * 6 * Math.PI + 2) * 0.25
      elevation += Math.sin(x * 16 * Math.PI + 3) * Math.cos(y * 12 * Math.PI + 4) * 0.125
      elevation += Math.sin(x * 32 * Math.PI + 5) * Math.cos(y * 24 * Math.PI + 6) * 0.0625

      const peakX1 = 0.3,
        peakY1 = 0.4
      const peakX2 = 0.7,
        peakY2 = 0.6
      const peakX3 = 0.5,
        peakY3 = 0.3

      const dist1 = Math.sqrt((x - peakX1) ** 2 + (y - peakY1) ** 2)
      const dist2 = Math.sqrt((x - peakX2) ** 2 + (y - peakY2) ** 2)
      const dist3 = Math.sqrt((x - peakX3) ** 2 + (y - peakY3) ** 2)

      elevation += Math.max(0, 1.5 - dist1 * 4) ** 2
      elevation += Math.max(0, 1.2 - dist2 * 3.5) ** 2
      elevation += Math.max(0, 1.0 - dist3 * 5) ** 2

      const valleyX = 0.5,
        valleyY = 0.5
      const valleyDist = Math.sqrt((x - valleyX) ** 2 + (y - valleyY) ** 2)
      elevation -= Math.max(0, 0.3 - valleyDist * 2) * 0.5

      data[i * width + j] = elevation * scale
    }
  }

  return data
}

// Standard elevation coloring (like FATMAP)
function getElevationColor(height: number, maxHeight: number): THREE.Color {
  const normalizedHeight = height / maxHeight

  if (normalizedHeight < 0.15) {
    return new THREE.Color().lerpColors(new THREE.Color(0x2d1b4e), new THREE.Color(0x4a2c7c), normalizedHeight / 0.15)
  } else if (normalizedHeight < 0.3) {
    return new THREE.Color().lerpColors(
      new THREE.Color(0x8b2a8b),
      new THREE.Color(0xff4488),
      (normalizedHeight - 0.15) / 0.15,
    )
  } else if (normalizedHeight < 0.45) {
    return new THREE.Color().lerpColors(
      new THREE.Color(0xff6644),
      new THREE.Color(0xff8800),
      (normalizedHeight - 0.3) / 0.15,
    )
  } else if (normalizedHeight < 0.6) {
    return new THREE.Color().lerpColors(
      new THREE.Color(0xffaa00),
      new THREE.Color(0xffdd00),
      (normalizedHeight - 0.45) / 0.15,
    )
  } else if (normalizedHeight < 0.75) {
    return new THREE.Color().lerpColors(
      new THREE.Color(0x88cc44),
      new THREE.Color(0x44aa88),
      (normalizedHeight - 0.6) / 0.15,
    )
  } else if (normalizedHeight < 0.9) {
    return new THREE.Color().lerpColors(
      new THREE.Color(0x667788),
      new THREE.Color(0x889999),
      (normalizedHeight - 0.75) / 0.15,
    )
  } else {
    return new THREE.Color().lerpColors(
      new THREE.Color(0xaabbcc),
      new THREE.Color(0xffffff),
      (normalizedHeight - 0.9) / 0.1,
    )
  }
}

// Hyperspectral coloring - mineral detection (100+ bands, detailed spectral signatures)
function getHyperspectralColor(height: number, maxHeight: number, x: number, z: number): THREE.Color {
  const normalizedHeight = height / maxHeight

  // Simulate mineral signatures based on position and height
  const mineralNoise = Math.sin(x * 15) * Math.cos(z * 12) * 0.5 + 0.5
  const clayNoise = Math.sin(x * 8 + 2) * Math.cos(z * 10 + 1) * 0.5 + 0.5
  const ironNoise = Math.sin(x * 20 + 5) * Math.cos(z * 18 + 3) * 0.5 + 0.5

  // Lithium deposits - bright orange/yellow (high altitude zones)
  if (normalizedHeight > 0.6 && mineralNoise > 0.6) {
    return new THREE.Color().lerpColors(new THREE.Color(0xffaa00), new THREE.Color(0xff6600), mineralNoise)
  }
  // Iron oxide - red/rust color
  if (normalizedHeight > 0.3 && normalizedHeight < 0.7 && ironNoise > 0.55) {
    return new THREE.Color().lerpColors(new THREE.Color(0xcc3333), new THREE.Color(0xff4444), ironNoise)
  }
  // Clay minerals - magenta/pink
  if (normalizedHeight > 0.2 && normalizedHeight < 0.5 && clayNoise > 0.5) {
    return new THREE.Color().lerpColors(new THREE.Color(0xcc44aa), new THREE.Color(0xff66cc), clayNoise)
  }
  // Pegmatite/Alaskite - light purple
  if (normalizedHeight > 0.5 && mineralNoise > 0.4 && mineralNoise < 0.6) {
    return new THREE.Color(0x9966cc)
  }
  // Calcrete - cream/white
  if (normalizedHeight > 0.7 && clayNoise < 0.3) {
    return new THREE.Color(0xf5f5dc)
  }
  // Granite - light gray with pink tint
  if (normalizedHeight > 0.4 && normalizedHeight < 0.8 && ironNoise < 0.4) {
    return new THREE.Color(0xddbbbb)
  }
  // Alluvial deposits - tan/brown
  if (normalizedHeight < 0.25) {
    return new THREE.Color().lerpColors(new THREE.Color(0xaa8855), new THREE.Color(0xccaa77), normalizedHeight / 0.25)
  }
  // Vegetation areas - green
  if (normalizedHeight > 0.15 && normalizedHeight < 0.45 && clayNoise > 0.3 && clayNoise < 0.5) {
    return new THREE.Color(0x55aa44)
  }
  // Default rock - gray
  return new THREE.Color().lerpColors(new THREE.Color(0x666677), new THREE.Color(0x888899), normalizedHeight)
}

// Multispectral coloring - broader bands for vegetation, water, soil (4-10 bands)
function getMultispectralColor(height: number, maxHeight: number, x: number, z: number): THREE.Color {
  const normalizedHeight = height / maxHeight

  // NDVI-like vegetation index simulation
  const vegNoise = Math.sin(x * 6) * Math.cos(z * 7) * 0.5 + 0.5
  const waterNoise = Math.sin(x * 3 + 1) * Math.cos(z * 4 + 2) * 0.5 + 0.5
  const soilNoise = Math.sin(x * 10) * Math.cos(z * 8) * 0.5 + 0.5

  // Snow/Ice - cyan/white (high albedo in visible + NIR)
  if (normalizedHeight > 0.85) {
    return new THREE.Color().lerpColors(
      new THREE.Color(0xaaddff),
      new THREE.Color(0xffffff),
      (normalizedHeight - 0.85) / 0.15,
    )
  }
  // Dense vegetation - bright red (false color composite: NIR as red)
  if (normalizedHeight > 0.2 && normalizedHeight < 0.55 && vegNoise > 0.55) {
    return new THREE.Color().lerpColors(new THREE.Color(0xcc2255), new THREE.Color(0xff4477), vegNoise)
  }
  // Sparse vegetation - pink/magenta
  if (normalizedHeight > 0.15 && normalizedHeight < 0.6 && vegNoise > 0.35 && vegNoise < 0.55) {
    return new THREE.Color().lerpColors(new THREE.Color(0xaa6688), new THREE.Color(0xcc8899), vegNoise)
  }
  // Water bodies - dark blue/black (low NIR reflectance)
  if (normalizedHeight < 0.12 && waterNoise > 0.6) {
    return new THREE.Color().lerpColors(new THREE.Color(0x112244), new THREE.Color(0x224466), waterNoise)
  }
  // Wet soil/sediment - dark brown
  if (normalizedHeight < 0.2 && waterNoise > 0.4 && waterNoise < 0.6) {
    return new THREE.Color(0x443322)
  }
  // Bare soil - tan/brown
  if (normalizedHeight > 0.1 && normalizedHeight < 0.4 && soilNoise > 0.5 && vegNoise < 0.4) {
    return new THREE.Color().lerpColors(new THREE.Color(0xbb9966), new THREE.Color(0xddbb88), soilNoise)
  }
  // Exposed rock - gray
  if (normalizedHeight > 0.5 && normalizedHeight < 0.85 && vegNoise < 0.3) {
    return new THREE.Color().lerpColors(new THREE.Color(0x778899), new THREE.Color(0x99aabb), normalizedHeight)
  }
  // Urban/built areas - cyan (high reflectance in visible)
  if (normalizedHeight < 0.3 && soilNoise > 0.7 && vegNoise < 0.3) {
    return new THREE.Color(0x66aacc)
  }
  // Default mixed
  return new THREE.Color().lerpColors(new THREE.Color(0x887766), new THREE.Color(0xaa9988), normalizedHeight)
}

function TerrainMesh({ mode }: { mode: SpectralMode }) {
  const meshRef = useRef<THREE.Mesh>(null)

  const { geometry } = useMemo(() => {
    const width = 128
    const height = 128
    const terrainData = generateTerrainData(width, height, 2)

    const geo = new THREE.PlaneGeometry(10, 10, width - 1, height - 1)
    geo.rotateX(-Math.PI / 2)

    const positions = geo.attributes.position
    const colors = new Float32Array(positions.count * 3)

    let maxH = 0
    for (let i = 0; i < positions.count; i++) {
      const elevation = terrainData[i] || 0
      maxH = Math.max(maxH, elevation)
    }

    for (let i = 0; i < positions.count; i++) {
      const elevation = terrainData[i] || 0
      positions.setY(i, elevation)

      const x = positions.getX(i)
      const z = positions.getZ(i)

      let color: THREE.Color
      switch (mode) {
        case "hyperspectral":
          color = getHyperspectralColor(elevation, maxH, x, z)
          break
        case "multispectral":
          color = getMultispectralColor(elevation, maxH, x, z)
          break
        default:
          color = getElevationColor(elevation, maxH)
      }

      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b
    }

    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3))
    geo.computeVertexNormals()

    return { geometry: geo, maxHeight: maxH }
  }, [mode])

  return (
    <mesh ref={meshRef} geometry={geometry} receiveShadow castShadow>
      <meshLambertMaterial vertexColors side={THREE.DoubleSide} />
    </mesh>
  )
}

function DetectionMarkers({ mode }: { mode: SpectralMode }) {
  const hyperspectralDetections: Detection[] = [
    {
      position: [-2, 2.5, -1],
      type: "mineral",
      label: "Lithium Deposit",
      color: "#ff8800",
      description: "Li-bearing pegmatite",
    },
    {
      position: [2, 1.8, 2],
      type: "mineral",
      label: "Iron Oxide",
      color: "#cc3333",
      description: "Fe₂O₃ concentration",
    },
    {
      position: [-1, 1.2, 3],
      type: "mineral",
      label: "Clay Minerals",
      color: "#cc44aa",
      description: "Kaolinite/Illite",
    },
    {
      position: [3, 2.2, -2],
      type: "mineral",
      label: "Pegmatite",
      color: "#9966cc",
      description: "Alaskite formation",
    },
    { position: [0, 2.8, -3], type: "mineral", label: "Calcrete", color: "#f5f5dc", description: "Hardpan calcrete" },
    { position: [-3, 1.5, 0], type: "mineral", label: "Granite", color: "#ddbbbb", description: "Bloedkoppie type" },
    { position: [1, 0.6, 4], type: "sediment", label: "Alluvial Fan", color: "#aa8855", description: "Gemsbok Fm." },
  ]

  const multispectralDetections: Detection[] = [
    {
      position: [-2, 1.2, 2],
      type: "vegetation",
      label: "Dense Vegetation",
      color: "#ff4477",
      description: "High NDVI (0.7-0.9)",
    },
    {
      position: [2, 1.0, 3],
      type: "vegetation",
      label: "Sparse Vegetation",
      color: "#cc8899",
      description: "Low NDVI (0.3-0.5)",
    },
    { position: [0, 0.3, 4], type: "water", label: "Water Body", color: "#224466", description: "Low NIR reflectance" },
    { position: [-3, 0.8, 1], type: "soil", label: "Bare Soil", color: "#ddbb88", description: "High SWIR response" },
    { position: [3, 2.8, -2], type: "snow", label: "Snow/Ice", color: "#ffffff", description: "High albedo" },
    {
      position: [1, 0.5, 2],
      type: "urban",
      label: "Built Area",
      color: "#66aacc",
      description: "High visible reflectance",
    },
  ]

  const detections =
    mode === "hyperspectral" ? hyperspectralDetections : mode === "multispectral" ? multispectralDetections : []

  if (detections.length === 0) return null

  return (
    <group>
      {detections.map((detection, index) => (
        <group key={index} position={detection.position}>
          {/* Marker pin */}
          <mesh position={[0, 0.3, 0]}>
            <coneGeometry args={[0.15, 0.4, 8]} />
            <meshBasicMaterial color={detection.color} />
          </mesh>
          <mesh position={[0, 0.6, 0]}>
            <sphereGeometry args={[0.12, 16, 16]} />
            <meshBasicMaterial color={detection.color} />
          </mesh>
          {/* Pulsing ring */}
          <mesh position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.2, 0.25, 32]} />
            <meshBasicMaterial color={detection.color} transparent opacity={0.6} />
          </mesh>
          {/* Label */}
          <Html position={[0, 1, 0]} center distanceFactor={10}>
            <div
              className="bg-black/80 backdrop-blur-sm px-2 py-1 rounded text-xs whitespace-nowrap border"
              style={{ borderColor: detection.color }}
            >
              <div className="font-semibold" style={{ color: detection.color }}>
                {detection.label}
              </div>
              <div className="text-gray-300 text-[10px]">{detection.description}</div>
            </div>
          </Html>
        </group>
      ))}
    </group>
  )
}

function CoordinateAxes() {
  const axisLength = 6
  const arrowSize = 0.3

  return (
    <group position={[-5.5, 0, -5.5]}>
      {/* X Axis - Red */}
      <Line
        points={[
          [0, 0, 0],
          [axisLength, 0, 0],
        ]}
        color="#ff3333"
        lineWidth={3}
      />
      <mesh position={[axisLength, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <coneGeometry args={[arrowSize * 0.5, arrowSize, 8]} />
        <meshBasicMaterial color="#ff3333" />
      </mesh>
      <Text position={[axisLength + 0.5, 0, 0]} fontSize={0.5} color="#ff3333" anchorX="left">
        X
      </Text>
      {[1, 2, 3, 4, 5].map((i) => (
        <group key={`x-${i}`}>
          <Line
            points={[
              [i, 0, 0],
              [i, -0.15, 0],
            ]}
            color="#ff3333"
            lineWidth={2}
          />
          <Text position={[i, -0.4, 0]} fontSize={0.25} color="#ff6666" anchorX="center">
            {i}
          </Text>
        </group>
      ))}

      {/* Y Axis - Green */}
      <Line
        points={[
          [0, 0, 0],
          [0, axisLength, 0],
        ]}
        color="#33ff33"
        lineWidth={3}
      />
      <mesh position={[0, axisLength, 0]}>
        <coneGeometry args={[arrowSize * 0.5, arrowSize, 8]} />
        <meshBasicMaterial color="#33ff33" />
      </mesh>
      <Text position={[0, axisLength + 0.5, 0]} fontSize={0.5} color="#33ff33" anchorX="center">
        Y (Elevation)
      </Text>
      {[1, 2, 3, 4, 5].map((i) => (
        <group key={`y-${i}`}>
          <Line
            points={[
              [0, i, 0],
              [-0.15, i, 0],
            ]}
            color="#33ff33"
            lineWidth={2}
          />
          <Text position={[-0.4, i, 0]} fontSize={0.25} color="#66ff66" anchorX="right">
            {i}
          </Text>
        </group>
      ))}

      {/* Z Axis - Blue */}
      <Line
        points={[
          [0, 0, 0],
          [0, 0, axisLength],
        ]}
        color="#3366ff"
        lineWidth={3}
      />
      <mesh position={[0, 0, axisLength]} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[arrowSize * 0.5, arrowSize, 8]} />
        <meshBasicMaterial color="#3366ff" />
      </mesh>
      <Text position={[0, 0, axisLength + 0.5]} fontSize={0.5} color="#3366ff" anchorX="center">
        Z
      </Text>
      {[1, 2, 3, 4, 5].map((i) => (
        <group key={`z-${i}`}>
          <Line
            points={[
              [0, 0, i],
              [-0.15, 0, i],
            ]}
            color="#3366ff"
            lineWidth={2}
          />
          <Text position={[-0.4, 0, i]} fontSize={0.25} color="#6699ff" anchorX="right">
            {i}
          </Text>
        </group>
      ))}

      <Text position={[-0.3, -0.3, -0.3]} fontSize={0.3} color="#ffffff" anchorX="right">
        O
      </Text>
    </group>
  )
}

function GridPlane() {
  return (
    <group position={[0, -0.01, 0]}>
      <gridHelper args={[12, 12, "#334455", "#223344"]} position={[0, 0, 0]} />
    </group>
  )
}

function SpectralLegend({ mode }: { mode: SpectralMode }) {
  const elevationItems = [
    { color: "#ffffff", label: "Snow Peaks" },
    { color: "#889999", label: "High Rock" },
    { color: "#44aa88", label: "Alpine" },
    { color: "#ffdd00", label: "Highland" },
    { color: "#ff8800", label: "Mid Elevation" },
    { color: "#ff4488", label: "Lowland" },
    { color: "#4a2c7c", label: "Valleys" },
  ]

  const hyperspectralItems = [
    { color: "#ff8800", label: "Lithium Deposits" },
    { color: "#cc3333", label: "Iron Oxide (Fe₂O₃)" },
    { color: "#cc44aa", label: "Clay Minerals" },
    { color: "#9966cc", label: "Pegmatite/Alaskite" },
    { color: "#f5f5dc", label: "Calcrete" },
    { color: "#ddbbbb", label: "Granite" },
    { color: "#aa8855", label: "Alluvial Deposits" },
    { color: "#55aa44", label: "Vegetation" },
    { color: "#888899", label: "Bare Rock" },
  ]

  const multispectralItems = [
    { color: "#ffffff", label: "Snow/Ice (High Albedo)" },
    { color: "#ff4477", label: "Dense Vegetation (NIR)" },
    { color: "#cc8899", label: "Sparse Vegetation" },
    { color: "#224466", label: "Water Bodies" },
    { color: "#443322", label: "Wet Soil/Sediment" },
    { color: "#ddbb88", label: "Bare Soil" },
    { color: "#99aabb", label: "Exposed Rock" },
    { color: "#66aacc", label: "Urban/Built Areas" },
  ]

  const items =
    mode === "hyperspectral" ? hyperspectralItems : mode === "multispectral" ? multispectralItems : elevationItems

  const title =
    mode === "hyperspectral"
      ? "Hyperspectral Analysis"
      : mode === "multispectral"
        ? "Multispectral Analysis"
        : "Elevation Legend"

  return (
    <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-sm rounded-lg p-4 border border-cyan-500/30 max-h-[400px] overflow-y-auto">
      <h4 className="text-cyan-300 font-semibold mb-3 text-sm">{title}</h4>
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded-sm border border-white/20 flex-shrink-0"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-white/80 text-xs">{item.label}</span>
          </div>
        ))}
      </div>
      {mode !== "elevation" && (
        <div className="mt-4 pt-3 border-t border-cyan-500/20">
          <p className="text-cyan-300/70 text-[10px]">
            {mode === "hyperspectral"
              ? "100+ spectral bands (380-2500nm) for mineral identification"
              : "4-10 bands (RGB + NIR + SWIR) for land cover classification"}
          </p>
        </div>
      )}
    </div>
  )
}

function SpectralInfoPanel({ mode }: { mode: SpectralMode }) {
  if (mode === "elevation") return null

  const hyperspectralInfo = {
    title: "Hyperspectral Imaging",
    bands: "100-200+ narrow bands (380-2500nm)",
    detects: [
      "Mineral composition (Lithium, Iron, Clay)",
      "Geological formations (Pegmatite, Granite)",
      "Alteration zones and ore deposits",
      "Precise spectral signatures for each mineral",
      "Vegetation health and species identification",
    ],
    applications: "Mining exploration, geology, environmental monitoring",
  }

  const multispectralInfo = {
    title: "Multispectral Imaging",
    bands: "4-10 broad bands (Visible + NIR + SWIR)",
    detects: [
      "Vegetation coverage (NDVI calculation)",
      "Water bodies and moisture content",
      "Soil types and land cover",
      "Snow/Ice extent",
      "Urban development areas",
    ],
    applications: "Agriculture, forestry, urban planning, climate studies",
  }

  const info = mode === "hyperspectral" ? hyperspectralInfo : multispectralInfo

  return (
    <div className="absolute top-20 right-4 bg-black/80 backdrop-blur-sm rounded-lg p-4 border border-cyan-500/30 w-72">
      <h4 className="text-cyan-300 font-semibold mb-2 text-sm">{info.title}</h4>
      <p className="text-cyan-200/60 text-xs mb-3">{info.bands}</p>
      <div className="mb-3">
        <p className="text-white/90 text-xs font-medium mb-1">Detects:</p>
        <ul className="space-y-1">
          {info.detects.map((item, i) => (
            <li key={i} className="text-white/70 text-xs flex items-start gap-1">
              <span className="text-cyan-400">•</span> {item}
            </li>
          ))}
        </ul>
      </div>
      <p className="text-cyan-300/50 text-[10px] border-t border-cyan-500/20 pt-2">
        <strong>Applications:</strong> {info.applications}
      </p>
    </div>
  )
}

function AxisLegend() {
  return (
    <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm rounded-lg p-4 border border-cyan-500/30">
      <h4 className="text-cyan-300 font-semibold mb-3 text-sm">Coordinate Axes</h4>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-1 rounded" style={{ backgroundColor: "#ff3333" }} />
          <span className="text-white/80 text-xs">X - East-West</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-1 rounded" style={{ backgroundColor: "#33ff33" }} />
          <span className="text-white/80 text-xs">Y - Elevation</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-1 rounded" style={{ backgroundColor: "#3366ff" }} />
          <span className="text-white/80 text-xs">Z - North-South</span>
        </div>
      </div>
    </div>
  )
}

function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color="#4488ff" wireframe />
    </mesh>
  )
}

export default function Terrain3DViewer() {
  const [showAxes, setShowAxes] = useState(true)
  const [showGrid, setShowGrid] = useState(true)
  const [spectralMode, setSpectralMode] = useState<SpectralMode>("elevation")

  return (
    <div className="relative w-full h-[700px] bg-gradient-to-b from-slate-800 to-slate-900 rounded-xl overflow-hidden border-2 border-cyan-500/30">
      <Canvas
        camera={{ position: [15, 10, 15], fov: 50 }}
        shadows
        gl={{ antialias: true, alpha: false }}
        onCreated={({ gl }) => {
          gl.setClearColor("#1a2a3a")
        }}
      >
        <color attach="background" args={["#1a2a3a"]} />

        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 20, 10]} intensity={1.5} castShadow />
        <directionalLight position={[-5, 15, -5]} intensity={0.5} color="#88aaff" />
        <hemisphereLight intensity={0.6} color="#ffffff" groundColor="#445566" />

        <Suspense fallback={<LoadingFallback />}>
          <TerrainMesh mode={spectralMode} />
          <DetectionMarkers mode={spectralMode} />
          {showAxes && <CoordinateAxes />}
          {showGrid && <GridPlane />}
        </Suspense>

        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={5}
          maxDistance={35}
          maxPolarAngle={Math.PI / 2.1}
          target={[0, 1, 0]}
        />
      </Canvas>

      <AxisLegend />
      <SpectralLegend mode={spectralMode} />
      <SpectralInfoPanel mode={spectralMode} />

      {/* Spectral Mode Selector */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <div className="bg-black/80 backdrop-blur-sm rounded-lg p-3 border border-cyan-500/30">
          <p className="text-cyan-300 text-xs font-semibold mb-2">Spectral Mode</p>
          <div className="flex flex-col gap-1">
            <button
              onClick={() => setSpectralMode("elevation")}
              className={`px-3 py-1.5 rounded text-xs font-medium transition-all text-left ${
                spectralMode === "elevation"
                  ? "bg-cyan-500/30 text-cyan-300 border border-cyan-500/50"
                  : "bg-slate-800/50 text-slate-400 border border-slate-600/50 hover:bg-slate-700/50"
              }`}
            >
              Elevation
            </button>
            <button
              onClick={() => setSpectralMode("hyperspectral")}
              className={`px-3 py-1.5 rounded text-xs font-medium transition-all text-left ${
                spectralMode === "hyperspectral"
                  ? "bg-orange-500/30 text-orange-300 border border-orange-500/50"
                  : "bg-slate-800/50 text-slate-400 border border-slate-600/50 hover:bg-slate-700/50"
              }`}
            >
              Hyperspectral
            </button>
            <button
              onClick={() => setSpectralMode("multispectral")}
              className={`px-3 py-1.5 rounded text-xs font-medium transition-all text-left ${
                spectralMode === "multispectral"
                  ? "bg-pink-500/30 text-pink-300 border border-pink-500/50"
                  : "bg-slate-800/50 text-slate-400 border border-slate-600/50 hover:bg-slate-700/50"
              }`}
            >
              Multispectral
            </button>
          </div>
        </div>

        <button
          onClick={() => setShowAxes(!showAxes)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            showAxes
              ? "bg-cyan-500/30 text-cyan-300 border border-cyan-500/50"
              : "bg-slate-800/50 text-slate-400 border border-slate-600/50"
          }`}
        >
          {showAxes ? "Hide Axes" : "Show Axes"}
        </button>
        <button
          onClick={() => setShowGrid(!showGrid)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            showGrid
              ? "bg-cyan-500/30 text-cyan-300 border border-cyan-500/50"
              : "bg-slate-800/50 text-slate-400 border border-slate-600/50"
          }`}
        >
          {showGrid ? "Hide Grid" : "Show Grid"}
        </button>
      </div>

      {/* Title */}
      <div className="absolute bottom-4 right-4 text-right">
        <h3 className="text-xl font-bold text-white">3D Terrain Mapping</h3>
        <p className="text-cyan-300/70 text-sm">
          {spectralMode === "hyperspectral"
            ? "Mineral Detection Mode"
            : spectralMode === "multispectral"
              ? "Land Cover Analysis Mode"
              : "Elevation Mapping Mode"}
        </p>
        <p className="text-cyan-300/50 text-xs">Drag to rotate | Scroll to zoom</p>
      </div>
    </div>
  )
}
