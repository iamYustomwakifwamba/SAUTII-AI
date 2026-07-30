import { Zap, Music4, Mic2, Languages } from "lucide-react";

function PromptBox() {
  return (
    <div className="mt-12 flex justify-center">
      <div className="w-full max-w-4xl rounded-3xl border border-slate-200 bg-white shadow-sm">
        
        <textarea
          placeholder="Tell Voxa what you want to create..."
          className="w-full resize-none bg-transparent p-6 text-slate-900 placeholder:text-slate-400 outline-none"
          rows={6}
        />

        <div className="border-t border-slate-200 p-4 flex items-center justify-between flex-wrap gap-4">

          <div className="flex gap-3 flex-wrap">

            <button className="flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-slate-600 hover:border-blue-500 hover:text-blue-600 transition">
              <Music4 size={16} />
              Amapiano
            </button>

            <button className="flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-slate-600 hover:border-blue-500 hover:text-blue-600 transition">
              <Mic2 size={16} />
              Ads Style
            </button>

            <button className="flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-slate-600 hover:border-blue-500 hover:text-blue-600 transition">
              <Languages size={16} />
              Swahili
            </button>

          </div>

          <button className="flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 hover:scale-105 transition">
            <Zap size={18} />
            Generate
          </button>

        </div>
      </div>
    </div>
  );
}

export default PromptBox;