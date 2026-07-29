import { UserRound, WandSparkles, History, Zap } from "lucide-react"

function LeftStudioPanel() {
  return (
    <div className="bg-white h-screen flex flex-col border-r border-slate-200">

      <div className="pt-4 px-3">
        <div className="flex items-center gap-2 border border-blue-600 rounded-xl px-3 py-2.5">
          <div className="bg-blue-600 rounded-full p-1.5 flex items-center justify-center text-white">
            <UserRound size={16} />
          </div>
          <span className="text-slate-900 text-sm font-medium">Yusto Mwakifwamba</span>
        </div>
      </div>

      <nav className="mt-4 px-3 flex flex-col gap-1 text-sm">
        <div className="flex items-center gap-3 bg-blue-600 text-white font-medium rounded-lg px-3 py-2 cursor-pointer">
          <WandSparkles size={16} />
          Studio
        </div>
        <div className="flex items-center gap-3 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg px-3 py-2 cursor-pointer transition-colors">
          <History size={16} />
          History
        </div>
      </nav>

      <div className="mx-3 my-4 border-t border-slate-200" />

      <div className="mt-auto mx-3 mb-4 border border-slate-200 rounded-xl p-3">
        <div className="flex items-center gap-2 text-slate-900 mb-1">
          <Zap size={15} className="text-blue-600" />
          <span className="text-sm font-medium">Credits</span>
        </div>
        <p className="text-slate-500 text-xs">12 remaining this month</p>
        <div className="mt-2 h-1 bg-slate-200 rounded-full">
          <div className="h-full w-2/5 bg-blue-600 rounded-full" />
        </div>
      </div>

    </div>
  )
}

export default LeftStudioPanel