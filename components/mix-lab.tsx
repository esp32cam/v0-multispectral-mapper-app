import type { MixRule } from "@/lib/data"

interface MixLabProps {
  selectedElements: string[]
  mixMatches: MixRule[]
}

export default function MixLab({ selectedElements, mixMatches }: MixLabProps) {
  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-blue-500/30 rounded-lg p-6 shadow-xl backdrop-blur">
      <div className="mb-4">
        <div className="text-lg font-semibold text-white mb-1">Mix Lab</div>
        <div className="text-xs text-blue-300">เลือกหลายธาตุ แล้วดูว่าในฐานข้อมูลมีวัสดุ/วัตถุอะไรที่เป็น combination นั้นบ้าง</div>
      </div>

      <div className="mb-6">
        <div className="text-sm font-medium text-blue-300 mb-2">ธาตุที่เลือกตอนนี้:</div>
        <div className="flex flex-wrap gap-2">
          {selectedElements.length === 0 ? (
            <span className="text-xs text-slate-400 italic">ยังไม่ได้เลือกธาตุ ลองคลิกจากตารางด้านบน</span>
          ) : (
            selectedElements.map((sym) => (
              <span
                key={sym}
                className="px-3 py-1 rounded-full bg-blue-500/30 text-blue-200 text-sm border border-blue-400/50"
              >
                {sym}
              </span>
            ))
          )}
        </div>
      </div>

      <div>
        <div className="text-sm font-medium text-blue-300 mb-3">Candidate materials / objects:</div>
        {selectedElements.length === 0 ? (
          <span className="text-xs text-slate-400 italic">ยังไม่มี combination ให้ดู rule</span>
        ) : mixMatches.length === 0 ? (
          <span className="text-xs text-slate-400 italic">ยังไม่มี rule สำหรับ combination นี้ ในข้อมูลตัวอย่าง</span>
        ) : (
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {mixMatches.map((rule, idx) => (
              <div key={idx} className="bg-slate-700/50 rounded p-3 border border-blue-500/20 text-sm">
                <h4 className="font-semibold text-blue-300 mb-2">{rule.label}</h4>
                <div className="space-y-1 text-xs text-slate-300">
                  <p>
                    <span className="text-blue-400 font-medium">Elements:</span> {rule.elements.join(", ")}
                  </p>
                  <p>
                    <span className="text-blue-400 font-medium">Materials:</span> {rule.materials.join(", ")}
                  </p>
                  <p>
                    <span className="text-blue-400 font-medium">Objects:</span> {rule.objects.join(", ")}
                  </p>
                  <p>
                    <span className="text-blue-400 font-medium">Bands:</span> {rule.bands.join(", ")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
