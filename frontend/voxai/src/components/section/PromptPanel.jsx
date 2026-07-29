import { Zap } from "lucide-react"

const tags = ["Saloon", "Hotel", "Logistic"]

function StudioPromptPanel() {
  return (
    <div className="bg-slate-50 h-screen flex flex-col">

      <div className="flex-1 flex flex-col items-center justify-center gap-2 text-slate-400">
        <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-lg">
          ♪
        </div>
        <p className="text-xs">Your jingle will appear here</p>
      </div>

      <div className="p-4 border-t border-slate-200">
        <div className="border border-slate-200 rounded-xl bg-white overflow-hidden">
          <textarea
            placeholder="Tell Voxa what you want to create..."
            className="w-full resize-none bg-transparent px-4 pt-4 pb-2 text-slate-900 placeholder:text-slate-400 outline-none text-sm leading-relaxed"
            rows={3}
          />
          <div className="border-t border-slate-200 px-3 py-2.5 flex items-center justify-between gap-3 flex-wrap">
            <div className="flex gap-2 flex-wrap">
              {tags.map((tag) => (
                <button
                  key={tag}
                  className="border border-slate-200 rounded-full px-3 py-1 text-xs text-slate-500 hover:border-blue-500 hover:text-blue-600 transition-colors cursor-pointer"
                >
                  {tag}
                </button>
              ))}
            </div>
            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full px-5 py-2 text-sm transition-colors cursor-pointer">
              <Zap size={15} />
              Generate
            </button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default StudioPromptPanel