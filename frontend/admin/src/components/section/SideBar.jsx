// SideBarSection.jsx
import { NavLink } from "react-router-dom"
import {
  LayoutDashboard,
  Users,
  CreditCard,
  Receipt,
  UserCog,
  Settings,
  ChevronUp,
} from "lucide-react"

function SautiiLogo() {
  return (
    <div className="flex items-center gap-2">
      <svg width="26" height="26" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="32" height="32" rx="9" fill="#2563EB" />
        <rect x="7" y="14" width="2.6" height="4" rx="1.3" fill="white" opacity="0.55" />
        <rect x="11.5" y="10" width="2.6" height="12" rx="1.3" fill="white" opacity="0.75" />
        <rect x="16" y="7" width="2.6" height="18" rx="1.3" fill="white" />
        <rect x="20.5" y="11" width="2.6" height="10" rx="1.3" fill="white" opacity="0.75" />
        <rect x="25" y="13.5" width="2.6" height="5" rx="1.3" fill="white" opacity="0.55" />
      </svg>
      <span className="text-slate-900 text-base font-bold tracking-tight">
        sauti<span className="text-blue-600">i</span>
      </span>
    </div>
  )
}

const navItems = [
  { label: "Overview", icon: LayoutDashboard, to: "/dashboard", end: true },
  { label: "Customers", icon: Users, to: "/customers", end: false },
  { label: "Subscriptions", icon: CreditCard, to: "/admin/subscriptions", end: false },
  { label: "Transactions", icon: Receipt, to: "/admin/transactions", end: false },
  { label: "Staff", icon: UserCog, to: "/admin/staff", end: false },
]

function SideBarSection() {
  return (
    <div className="bg-white h-full flex flex-col border-r border-slate-200">

      {/* LOGO */}
      <div className="px-4 pt-4 pb-5">
        <SautiiLogo />
      </div>

      {/* NAV LINKS */}
      <nav className="flex-1 px-3 flex flex-col gap-0.5 text-sm">
        <p className="px-3 pb-1.5 text-xs font-medium text-slate-400">Menu</p>
        {navItems.map(({ label, icon: Icon, to, end }) => (
          <NavLink
            key={label}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2 font-medium transition-colors ${
                isActive
                  ? "bg-blue-50 text-blue-600"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`
            }
          >
            <Icon size={16} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* UPGRADE-STYLE PROMO CARD */}
      <div className="mx-3 mb-3 border border-slate-200 rounded-xl p-3">
        <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center mb-2">
          <ChevronUp size={14} className="text-slate-500" />
        </div>
        <p className="text-slate-900 text-xs font-semibold mb-1">Invite your team</p>
        <p className="text-slate-500 text-[11px] leading-relaxed">
          Bring your team in to collaborate and manage jingles together.
        </p>
      </div>

      {/* SETTINGS - PINNED BOTTOM */}
      <div className="px-3 pb-4 border-t border-slate-200 pt-3">
        <NavLink
          to="/admin/settings"
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              isActive
                ? "bg-blue-50 text-blue-600"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`
          }
        >
          <Settings size={16} />
          Settings
        </NavLink>
      </div>

    </div>
  )
}

export default SideBarSection