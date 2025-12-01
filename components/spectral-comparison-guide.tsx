import Image from "next/image"

export default function SpectralComparisonGuide() {
  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-purple-500/50 rounded-lg p-6 shadow-2xl">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300 mb-2">
          Understanding Hyper/Multispectral Imaging
        </h2>
        <p className="text-purple-200 text-sm">
          Compare different spectral imaging techniques and their applications in remote sensing
        </p>
      </div>

      <div className="rounded-lg overflow-hidden border border-purple-500/30 bg-white p-4">
        <Image
          src="/images/image.png"
          alt="Comparison of Single Band, Multispectral, and Hyperspectral imaging techniques"
          width={1000}
          height={600}
          className="w-full h-auto"
        />
      </div>

      <div className="mt-6 grid md:grid-cols-3 gap-4">
        {/* Single Band */}
        <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
          <h3 className="text-lg font-bold text-slate-200 mb-2">Single Band</h3>
          <ul className="text-sm text-slate-300 space-y-1">
            <li>• Grayscale imagery (1 wavelength)</li>
            <li>• Limited material differentiation</li>
            <li>• Basic terrain visualization</li>
            <li>• Low data storage requirements</li>
          </ul>
        </div>

        {/* Multispectral */}
        <div className="bg-cyan-900/30 rounded-lg p-4 border border-cyan-500/50">
          <h3 className="text-lg font-bold text-cyan-300 mb-2">Multispectral</h3>
          <ul className="text-sm text-cyan-100 space-y-1">
            <li>• 3-10 discrete spectral bands</li>
            <li>• Color composite imagery</li>
            <li>• Vegetation indices (NDVI)</li>
            <li>• Land cover classification</li>
          </ul>
        </div>

        {/* Hyperspectral */}
        <div className="bg-purple-900/30 rounded-lg p-4 border border-purple-500/50">
          <h3 className="text-lg font-bold text-purple-300 mb-2">Hyperspectral</h3>
          <ul className="text-sm text-purple-100 space-y-1">
            <li>• 100-300+ contiguous bands</li>
            <li>• Complete spectral signatures</li>
            <li>• Mineral identification</li>
            <li>• Chemical composition analysis</li>
          </ul>
        </div>
      </div>

      {/* Usage Guidelines */}
      <div className="mt-6 bg-gradient-to-r from-cyan-900/40 to-purple-900/40 rounded-lg p-5 border border-cyan-500/30">
        <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-300 mb-3">
          Hyper/Multispectral Usage Guidelines
        </h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-semibold text-cyan-300 mb-2">Applications</h4>
            <ul className="text-slate-300 space-y-1">
              <li>
                🔬 <strong>Mineral Exploration:</strong> Identify ore deposits and alteration zones
              </li>
              <li>
                🌿 <strong>Agriculture:</strong> Crop health monitoring and yield prediction
              </li>
              <li>
                🌊 <strong>Water Quality:</strong> Detect algae blooms and sediment levels
              </li>
              <li>
                🏙️ <strong>Urban Planning:</strong> Land use mapping and change detection
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-purple-300 mb-2">Best Practices</h4>
            <ul className="text-slate-300 space-y-1">
              <li>
                📊 <strong>Band Selection:</strong> Choose bands based on target material signatures
              </li>
              <li>
                🔄 <strong>Atmospheric Correction:</strong> Always apply corrections for accurate analysis
              </li>
              <li>
                📐 <strong>Ground Truth:</strong> Validate remote sensing with field measurements
              </li>
              <li>
                🧮 <strong>Index Calculation:</strong> Use ratios (NDVI, NDWI) to enhance features
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
