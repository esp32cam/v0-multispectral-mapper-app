"use client"

import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js"
import { X, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

interface ObjectDiscoveryResult {
  objectName: string
  description: string
  primaryBands: string[]
  secondaryBands: string[]
  elements: Array<{ symbol: string; emoji: string; percentage: number }>
  confidence: number
  spectralData: {
    wavelengths: number[]
    reflectance: number[]
  }
  applications: string[]
  challenges: string[]
}

interface ObjectDiscoveryDashboardProps {
  result: ObjectDiscoveryResult
  onClose: () => void
}

export default function ObjectDiscoveryDashboard({ result, onClose }: ObjectDiscoveryDashboardProps) {
  const chartData = {
    labels: result.spectralData.wavelengths.map((w) => `${w}nm`),
    datasets: [
      {
        label: "Spectral Reflectance",
        data: result.spectralData.reflectance,
        borderColor: "rgb(34, 211, 238)",
        backgroundColor: "rgba(34, 211, 238, 0.2)",
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(15, 23, 42, 0.9)",
        titleColor: "#22d3ee",
        bodyColor: "#e0f2fe",
        borderColor: "#22d3ee",
        borderWidth: 1,
        padding: 12,
        displayColors: false,
      },
    },
    scales: {
      x: {
        grid: {
          color: "rgba(59, 130, 246, 0.1)",
        },
        ticks: {
          color: "#93c5fd",
        },
      },
      y: {
        grid: {
          color: "rgba(59, 130, 246, 0.1)",
        },
        ticks: {
          color: "#93c5fd",
          callback: (value: number | string) => value + "%",
        },
        title: {
          display: true,
          text: "Reflectance (%)",
          color: "#60a5fa",
        },
      },
    },
  }

  const bandChartData = {
    labels: [...result.primaryBands, ...result.secondaryBands],
    datasets: [
      {
        label: "Band Importance",
        data: [
          ...result.primaryBands.map(() => 90 + Math.random() * 10),
          ...result.secondaryBands.map(() => 50 + Math.random() * 30),
        ],
        borderColor: "rgb(168, 85, 247)",
        backgroundColor: "rgba(168, 85, 247, 0.2)",
        fill: true,
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  }

  const bandChartOptions = {
    ...chartOptions,
    scales: {
      ...chartOptions.scales,
      y: {
        ...chartOptions.scales.y,
        title: {
          display: true,
          text: "Importance (%)",
          color: "#60a5fa",
        },
      },
    },
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 border-2 border-cyan-500/50 rounded-xl shadow-2xl overflow-hidden">
        <div className="bg-slate-900/95 backdrop-blur border-b border-cyan-500/30 p-6 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-300">
              Discovery Dashboard: {result.objectName}
            </h2>
            <p className="text-blue-200 mt-1">Multispectral detection analysis and insights</p>
          </div>
          <Button
            onClick={onClose}
            variant="outline"
            className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-950 hover:text-cyan-300"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Search
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {/* Overview Section */}
          <div className="bg-slate-800/50 border border-blue-500/30 rounded-lg p-6">
            <h3 className="text-xl font-bold text-cyan-300 mb-3">Overview</h3>
            <p className="text-blue-100 leading-relaxed text-base">{result.description}</p>
            <div className="mt-4 flex items-center gap-4">
              <div className="flex-1 bg-slate-900/50 rounded-lg p-4 border border-purple-500/30">
                <div className="text-sm text-slate-400 mb-1">Detection Confidence</div>
                <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                  {result.confidence}%
                </div>
              </div>
              <div className="flex-1 bg-slate-900/50 rounded-lg p-4 border border-cyan-500/30">
                <div className="text-sm text-slate-400 mb-1">Primary Bands</div>
                <div className="text-2xl font-bold text-cyan-300">{result.primaryBands.join(", ")}</div>
              </div>
            </div>
          </div>

          {/* Element Composition */}
          <div className="bg-slate-800/50 border border-blue-500/30 rounded-lg p-6">
            <h3 className="text-xl font-bold text-cyan-300 mb-4">Element Composition</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {result.elements.map((elem) => (
                <div
                  key={elem.symbol}
                  className="bg-gradient-to-br from-slate-900 to-slate-800 border border-purple-500/30 rounded-lg p-4 text-center hover:scale-105 transition-transform"
                >
                  <div className="text-5xl mb-2">{elem.emoji}</div>
                  <div className="text-lg font-bold text-white">{elem.symbol}</div>
                  <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                    {elem.percentage}%
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Spectral Signature Chart */}
          <div className="bg-slate-800/50 border border-blue-500/30 rounded-lg p-6">
            <h3 className="text-xl font-bold text-cyan-300 mb-4">Spectral Signature Analysis</h3>
            <div className="h-80">
              <Line data={chartData} options={chartOptions} />
            </div>
            <p className="text-blue-200 mt-4 text-sm leading-relaxed">
              The spectral signature shows how {result.objectName.toLowerCase()} reflects electromagnetic radiation
              across different wavelengths. Peak reflectance values indicate the optimal bands for detection, while
              absorption features (valleys) help distinguish this object from similar materials in the scene.
            </p>
          </div>

          {/* Band Importance Chart */}
          <div className="bg-slate-800/50 border border-blue-500/30 rounded-lg p-6">
            <h3 className="text-xl font-bold text-cyan-300 mb-4">Multispectral Band Importance</h3>
            <div className="h-80">
              <Line data={bandChartData} options={bandChartOptions} />
            </div>
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div>
                <h4 className="text-sm font-semibold text-purple-300 mb-2">Primary Bands</h4>
                <p className="text-blue-200 text-sm leading-relaxed">
                  {result.primaryBands.join(", ")} provide the strongest signals for detecting{" "}
                  {result.objectName.toLowerCase()}. These bands capture the unique spectral characteristics that make
                  this object distinguishable from its surroundings.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-cyan-300 mb-2">Secondary Bands</h4>
                <p className="text-blue-200 text-sm leading-relaxed">
                  {result.secondaryBands.join(", ")} offer supplementary information that improves classification
                  accuracy and helps resolve ambiguities when multiple objects have similar primary signatures.
                </p>
              </div>
            </div>
          </div>

          {/* Applications & Challenges */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-800/50 border border-blue-500/30 rounded-lg p-6">
              <h3 className="text-xl font-bold text-cyan-300 mb-4">Applications</h3>
              <ul className="space-y-3">
                {result.applications.map((app, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0" />
                    <p className="text-blue-100 text-sm leading-relaxed">{app}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-slate-800/50 border border-blue-500/30 rounded-lg p-6">
              <h3 className="text-xl font-bold text-purple-300 mb-4">Detection Challenges</h3>
              <ul className="space-y-3">
                {result.challenges.map((challenge, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0" />
                    <p className="text-blue-100 text-sm leading-relaxed">{challenge}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
