// SideBarSection.jsx
import { NavLink } from "react-router-dom"
import {
  LayoutDashboard,
  Users,
  CreditCard,
  Receipt,
  UserCog,
  Settings,
} from "lucide-react"

function SautiiLogo() {
  return (
    <div className="flex items-center gap-2.5">
      <svg width="30" height="30" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="32" height="32" rx="9" fill="white" />
        <rect x="7" y="14" width="2.6" height="4" rx="1.3" fill="#2563EB" opacity="0.55" />
        <rect x="11.5" y="10" width="2.6" height="12" rx="1.3" fill="#2563EB" opacity="0.75" />
        <rect x="16" y="7" width="2.6" height="18" rx="1.3" fill="#2563EB" />
        <rect x="20.5" y="11" width="2.6" height="10" rx="1.3" fill="#2563EB" opacity="0.75" />
        <rect x="25" y="13.5" width="2.6" height="5" rx="1.3" fill="#2563EB" opacity="0.55" />
      </svg>
      <span className="text-white text-lg font-bold tracking-tight">
        sauti<span className="text-blue-200">i</span>
      </span>
    </div>
  )
}

const navItems = [
  { label: "Overview", icon: LayoutDashboard, to: "/admin" },
  { label: "Customers", icon: Users, to: "/admin/customers" },
  { label: "Subscriptions", icon: CreditCard, to: "/admin/subscriptions" },
  { label: "Transactions", icon: Receipt, to: "/admin/transactions" },
  { label: "Staff", icon: UserCog, to: "/admin/staff" },
]

function SideBarSection() {
  return (
    <div className="bg-blue-600 h-full flex flex-col">

      {/* LOGO */}
      <div className="px-4 pt-5 pb-6">
        <SautiiLogo />
      </div>

      {/* NAV LINKS */}
      <nav className="flex-1 px-3 flex flex-col gap-1 text-sm">
        {navItems.map(({ label, icon: Icon, to }) => (
          <NavLink
            key={label}
            to={to}
            end={to === "/admin"}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3 py-2.5 font-medium transition-colors ${
                isActive
                  ? "bg-white text-blue-600"
                  : "text-blue-100 hover:text-white hover:bg-white/10"
              }`
            }
          >
            <Icon size={17} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* SETTINGS - PINNED BOTTOM */}
      <div className="px-3 pb-5 pt-3 border-t border-white/10">
        <NavLink
          to="/admin/settings"
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
              isActive
                ? "bg-white text-blue-600"
                : "text-blue-100 hover:text-white hover:bg-white/10"
            }`
          }
        >
          <Settings size={17} />
          Settings
        </NavLink>
      </div>

    </div>
  )
}

export default SideBarSection