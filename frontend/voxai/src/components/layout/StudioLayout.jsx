// StudioLayout.jsx
import { useState } from "react"
import LeftStudioPanel from "../section/LeftPanel"
import StudioPromptPanel from "../section/PromptPanel"
import StudioOutputPanel from "../section/OutputPanel"

// Custom toggle icon: mstari wa juu mrefu, wa chini mfupi
function SidebarToggleIcon({ mirrored = false }) {
  return (
    <svg width="20" height="14" viewBox="0 0 20 14" fill="none" className={mirrored ? "scale-x-[-1]" : ""}>
      <rect x="0" y="0" width="20" height="2.4" rx="1.2" fill="currentColor" />
      <rect x="0" y="9.6" width="13" height="2.4" rx="1.2" fill="currentColor" />
    </svg>
  )
}

function StudioLayout() {
  const [leftOpen, setLeftOpen] = useState(false)
  const [rightOpen, setRightOpen] = useState(false)

  const closeAll = () => {
    setLeftOpen(false)
    setRightOpen(false)
  }

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-12 h-screen overflow-hidden">

      {/* MOBILE TOP BAR */}
      <div className="lg:hidden flex items-center justify-between px-3 py-2.5 border-b border-slate-200 bg-white z-20 flex-shrink-0">
        <button
          type="button"
          onClick={() => setLeftOpen((prev) => !prev)}
          aria-label="Toggle left panel"
          className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <SidebarToggleIcon />
        </button>

        <span className="text-sm font-semibold text-slate-900">Studio</span>

        <button
          type="button"
          onClick={() => setRightOpen((prev) => !prev)}
          aria-label="Toggle output panel"
          className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <SidebarToggleIcon mirrored />
        </button>
      </div>

      {/* BACKDROP */}
      {(leftOpen || rightOpen) && (
        <div
          onClick={closeAll}
          className="lg:hidden fixed inset-0 bg-black/40 z-30"
        />
      )}

      {/* LEFT PANEL — sasa inachukua urefu WOTE wa skrini kwenye mobile */}
      <div
        className={`
          fixed lg:static top-0 bottom-0 left-0 z-40
          w-72 lg:w-auto h-screen lg:h-full
          flex flex-col
          [&>div]:flex-1 [&>div]:min-h-0
          transition-transform duration-300 ease-in-out
          ${leftOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0
          lg:col-span-2
        `}
      >
        <LeftStudioPanel />
      </div>

      {/* PROMPT PANEL — height chain sahihi, sticky input itatulia mara moja */}
      <div className="flex-1 lg:col-span-7 min-h-0 h-full flex flex-col overflow-hidden [&>div]:flex-1 [&>div]:min-h-0">
        <StudioPromptPanel />
      </div>

      {/* OUTPUT PANEL — sasa inachukua urefu WOTE wa skrini kwenye mobile */}
      <div
        className={`
          fixed lg:static top-0 bottom-0 right-0 z-40
          w-72 lg:w-auto h-screen lg:h-full
          flex flex-col
          [&>div]:flex-1 [&>div]:min-h-0
          transition-transform duration-300 ease-in-out
          ${rightOpen ? "translate-x-0" : "translate-x-full"} lg:translate-x-0
          lg:col-span-3
        `}
      >
        <StudioOutputPanel />
      </div>

    </div>
  )
}

export default StudioLayout