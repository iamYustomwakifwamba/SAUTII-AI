import { Play, Download } from "lucide-react"

const wave = Array.from({ length: 48 }, () => Math.floor(Math.random() * 80) + 10)
const progress = 0.4

function StudioOutputPanel() {
  return (
    <div className="bg-white h-screen flex flex-col border-l border-slate-200 p-4 gap-4">

      <p className="text-xs text-slate-400 uppercase tracking-widest font-medium">Output</p>

      <div className="flex items-center gap-3 border border-slate-200 rounded-xl bg-slate-50 px-3 py-2.5">
        <button className="w-8 h-8 flex-shrink-0 rounded-full bg-blue-600 flex items-center justify-center text-white">
          <Play size={14} />
        </button>
        <div className="flex items-center gap-[2px] flex-1 h-8">
          {wave.map((h, i) => (
            <div
              key={i}
              className="w-[2px] rounded-full"
              style={{
                height: `${h}%`,
                background: i / wave.length < progress ? "#2563eb" : "#cbd5e1",
              }}
            />
          ))}
        </div>
        <span className="text-xs text-slate-500 flex-shrink-0">0:32</span>
        <button className="text-slate-400 hover:text-blue-600 transition-colors">
          <Download size={15} />
        </button>
      </div>

      <p className="text-xs text-slate-400 uppercase tracking-widest font-medium mt-2">Recent</p>
      <p className="text-xs text-slate-400">No jingles yet</p>

    </div>
  )
}

export default StudioOutputPanel