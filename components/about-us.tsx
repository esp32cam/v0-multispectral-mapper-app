"use client"

import { Satellite, Users, Target, Calendar, Radio } from "lucide-react"

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto px-6 py-12 space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold text-emerald-500">EM: Elephas Maximus</h1>
          <p className="text-2xl text-neutral-300">KEWE - Keeping an Eye on Wild Elephants</p>
          <div className="flex items-center justify-center gap-4 text-neutral-400">
            <span>School Satellite Competition 2024</span>
            <span>•</span>
            <span>Global Environmental Surveillance</span>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="border border-emerald-900 rounded-lg p-8 bg-neutral-900">
          <h2 className="text-3xl font-bold text-emerald-500 mb-4">Our Mission</h2>
          <p className="text-lg text-neutral-300 leading-relaxed">
            Tracking wild elephant migration patterns using CubeSat technology to prevent human-wildlife conflicts and
            create safe corridors for both elephants and communities. By analyzing elephant movement data, we aim to
            design wildlife crossings and implement effective protection strategies for residential and agricultural
            areas.
          </p>
        </div>

        {/* Team Section */}
        <div className="border border-emerald-900 rounded-lg p-8 bg-neutral-900">
          <div className="flex items-center gap-3 mb-6">
            <Users className="w-8 h-8 text-emerald-500" />
            <h2 className="text-3xl font-bold text-emerald-500">Our Team</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-emerald-400">Chulalongkorn University</h3>
              <ul className="space-y-2 text-neutral-300">
                <li>
                  <span className="text-emerald-500 font-medium">Napat Hemthanon</span> - System Engineer
                </li>
                <li>
                  <span className="text-emerald-500 font-medium">Kritsakorn Pengin</span> - Structure Engineer
                </li>
                <li>
                  <span className="text-emerald-500 font-medium">Booncharat Noiprasert</span> - Electronics Engineer
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-emerald-400">Panyapiwat Institute of Management (PIM)</h3>
              <ul className="space-y-2 text-neutral-300">
                <li>
                  <span className="text-emerald-500 font-medium">Suphachote Baochalee</span> - Flight Software Engineer
                </li>
                <li>
                  <span className="text-emerald-500 font-medium">Pongsapak Khongchae</span> - RF Engineer
                </li>
              </ul>
              <div className="mt-4 pt-4 border-t border-emerald-900/50">
                <p className="text-sm text-neutral-400">
                  <span className="text-emerald-500 font-medium">Advisor:</span> Potiwat Ngamkajornwiwat
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Technology Section */}
        <div className="border border-emerald-900 rounded-lg p-8 bg-neutral-900">
          <div className="flex items-center gap-3 mb-6">
            <Target className="w-8 h-8 text-emerald-500" />
            <h2 className="text-3xl font-bold text-emerald-500">Technology</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-emerald-400">Synthetic Aperture Radar (SAR)</h3>
              <p className="text-neutral-300 text-sm">
                High-resolution imaging through clouds and at night for continuous elephant monitoring
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-emerald-400">Near-Infrared (NIR)</h3>
              <p className="text-neutral-300 text-sm">
                Thermal signature detection to identify elephants from other wildlife species
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-emerald-400">AI-Powered Analysis</h3>
              <p className="text-neutral-300 text-sm">
                Machine learning algorithms for automatic elephant detection and behavior prediction
              </p>
            </div>
          </div>
        </div>

        {/* CubeSat Specifications */}
        <div className="border border-emerald-900 rounded-lg p-8 bg-neutral-900">
          <div className="flex items-center gap-3 mb-6">
            <Satellite className="w-8 h-8 text-emerald-500" />
            <h2 className="text-3xl font-bold text-emerald-500">CubeSat Specifications</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <h3 className="text-emerald-400 font-semibold mb-2">Structure</h3>
                <ul className="space-y-1 text-neutral-300 text-sm">
                  <li>• Size: 1U CubeSat (10×10×10 cm)</li>
                  <li>• Material: Aluminum alloy frame</li>
                  <li>• Thermal insulation for temperature control</li>
                  <li>• Optical aperture for SAR camera</li>
                </ul>
              </div>
              <div>
                <h3 className="text-emerald-400 font-semibold mb-2">Power System</h3>
                <ul className="space-y-1 text-neutral-300 text-sm">
                  <li>• 4× 1U deployable solar panels</li>
                  <li>• Battery capacity: 26 orbits (≈2 days)</li>
                  <li>• Earth-facing panel configuration</li>
                </ul>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-emerald-400 font-semibold mb-2">Payload</h3>
                <ul className="space-y-1 text-neutral-300 text-sm">
                  <li>• SAR imaging system (Visible + NIR)</li>
                  <li>• Resolution: 1 m²/pixel at 700 km altitude</li>
                  <li>• All-weather, day/night capability</li>
                </ul>
              </div>
              <div>
                <h3 className="text-emerald-400 font-semibold mb-2">Communication</h3>
                <ul className="space-y-1 text-neutral-300 text-sm">
                  <li>• UHF: Telemetry & command (Monopole antenna)</li>
                  <li>• X-Band: High-speed data transfer (Patch antenna)</li>
                  <li>• Ground stations: Thailand & ASEAN region</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Mission Objectives */}
        <div className="border border-emerald-900 rounded-lg p-8 bg-neutral-900">
          <div className="flex items-center gap-3 mb-6">
            <Radio className="w-8 h-8 text-emerald-500" />
            <h2 className="text-3xl font-bold text-emerald-500">Mission Objectives</h2>
          </div>
          <ol className="space-y-3 text-neutral-300">
            <li className="flex gap-3">
              <span className="text-emerald-500 font-bold">1.</span>
              <span>
                Study wild elephant migration patterns outside their traditional habitats using satellite data
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-emerald-500 font-bold">2.</span>
              <span>Develop satellite capability to observe and analyze elephant movement behaviors in real-time</span>
            </li>
            <li className="flex gap-3">
              <span className="text-emerald-500 font-bold">3.</span>
              <span>Design wildlife crossing infrastructure when new roads are constructed</span>
            </li>
            <li className="flex gap-3">
              <span className="text-emerald-500 font-bold">4.</span>
              <span>Plan protection strategies for residential and agricultural areas against elephant intrusion</span>
            </li>
            <li className="flex gap-3">
              <span className="text-emerald-500 font-bold">5.</span>
              <span>Support wildlife conservation and ecosystem sustainability initiatives</span>
            </li>
          </ol>
        </div>

        {/* Timeline */}
        <div className="border border-emerald-900 rounded-lg p-8 bg-neutral-900">
          <div className="flex items-center gap-3 mb-6">
            <Calendar className="w-8 h-8 text-emerald-500" />
            <h2 className="text-3xl font-bold text-emerald-500">Project Timeline</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-32 flex-shrink-0 text-emerald-400 font-semibold">Sep - Dec 2024</div>
              <div className="text-neutral-300">Critical Design & Subsystem Development</div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-32 flex-shrink-0 text-emerald-400 font-semibold">Jan - Mar 2025</div>
              <div className="text-neutral-300">Assembly, Integration & Test Readiness Review</div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-32 flex-shrink-0 text-emerald-400 font-semibold">Apr - Jun 2025</div>
              <div className="text-neutral-300">Environment Test Campaign</div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-32 flex-shrink-0 text-emerald-400 font-semibold">Jul - Aug 2025</div>
              <div className="text-neutral-300">Test Results Review & Launch Preparation</div>
            </div>
          </div>
        </div>

        {/* Partner Organizations */}
        <div className="text-center border border-emerald-900 rounded-lg p-8 bg-neutral-900">
          <p className="text-sm text-neutral-400 mb-2">Supported by</p>
          <p className="text-lg text-emerald-400 font-semibold">
            Geo-Informatics and Space Technology Development Agency (GISTDA)
          </p>
          <p className="text-sm text-neutral-500 mt-2">องค์การมหาชน สำนักงานพัฒนาเทคโนโลยีอวกาศและภูมิสารสนเทศ</p>
        </div>
      </div>
    </div>
  )
}
