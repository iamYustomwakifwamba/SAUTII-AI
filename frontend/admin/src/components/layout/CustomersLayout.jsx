// CustomersLayout.jsx
import { useState } from "react"
import SideBarSection from "../section/SideBar"
import CustomersSection from "../section/CustomersSection"

// Custom toggle icon: mstari wa juu mrefu, wa chini mfupi
function SidebarToggleIcon() {
  return (
    <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
      <rect x="0" y="0" width="20" height="2.4" rx="1.2" fill="currentColor" />
      <rect x="0" y="9.6" width="13" height="2.4" rx="1.2" fill="currentColor" />
    </svg>
  )
}

function CustomersLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-[240px_1fr] h-screen overflow-hidden">

      {/* MOBILE TOP BAR */}
      <div className="lg:hidden flex items-center gap-3 px-3 py-2.5 border-b border-slate-200 bg-white z-20 flex-shrink-0">
        <button
          type="button"
          onClick={() => setSidebarOpen((prev) => !prev)}
          aria-label="Toggle sidebar"
          className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <SidebarToggleIcon />
        </button>
        <span className="text-sm font-semibold text-slate-900">Customers</span>
      </div>

      {/* BACKDROP */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/40 z-30"
        />
      )}

      {/* SIDEBAR */}
      <div
        className={`
          fixed lg:static top-0 bottom-0 left-0 z-40
          w-64 lg:w-auto h-screen lg:h-full
          flex flex-col
          [&>div]:flex-1 [&>div]:min-h-0
          transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0
        `}
      >
        <SideBarSection />
      </div>

      {/* CUSTOMERS CONTENT */}
      <div className="flex-1 min-h-0 h-full flex flex-col overflow-hidden [&>div]:flex-1 [&>div]:min-h-0">
        <CustomersSection />
      </div>

    </div>
  )
}

export default CustomersLayout