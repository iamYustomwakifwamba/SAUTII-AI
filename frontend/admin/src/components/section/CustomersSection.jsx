// CustomersSection.jsx
import { useState } from "react"
import {
  ChevronDown,
  Search,
  Calendar,
  SlidersHorizontal,
  Download,
  RefreshCw,
  UserPlus,
  Bell,
  Sun,
} from "lucide-react"

// dummy data ya muda -- baadaye itatolewa kwenye database
const customers = [
  { id: 1, name: "Amina Hassan", email: "amina@example.com", phone: "+255 712 345 678", plan: "Pro plan", status: "Active", joined: "Aug 7, 2026" },
  { id: 2, name: "John Mrema", email: "john@example.com", phone: "+255 713 221 004", plan: "Starter plan", status: "Active", joined: "Aug 6, 2026" },
  { id: 3, name: "Grace Kileo", email: "grace@example.com", phone: "+255 754 890 213", plan: "Business plan", status: "Suspended", joined: "Aug 5, 2026" },
  { id: 4, name: "Peter Shayo", email: "peter@example.com", phone: "+255 621 004 552", plan: "Starter plan", status: "Active", joined: "Aug 3, 2026" },
]

const statusStyles = {
  Active: "bg-green-50 text-green-600",
  Suspended: "bg-red-50 text-red-600",
  Pending: "bg-amber-50 text-amber-600",
}

function initials(name) {
  return name.split(" ").map((n) => n[0]).join("").slice(0, 2)
}

function CustomersSection() {
  const [selected, setSelected] = useState([])

  const toggleAll = (e) => {
    setSelected(e.target.checked ? customers.map((c) => c.id) : [])
  }

  const toggleOne = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    )
  }

  return (
    <div className="bg-slate-50 h-full overflow-y-auto flex flex-col">

      {/* TOP BAR - breadcrumb + icons */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-slate-200 bg-white flex-shrink-0">
        <div className="flex items-center gap-1.5 text-sm min-w-0">
          <span className="text-blue-600 truncate">admin@sautii.com</span>
          <ChevronDown size={13} className="text-slate-300 -rotate-90 flex-shrink-0" />
          <span className="text-slate-900 font-medium">Customers</span>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 transition-colors">
            <Sun size={15} />
          </button>
          <button className="relative w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 transition-colors">
            <Bell size={15} />
            <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[9px] font-semibold w-4 h-4 rounded-full flex items-center justify-center">4</span>
          </button>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-4 sm:p-6">

        {/* FILTER BAR */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <button className="flex items-center gap-1.5 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-600 bg-white hover:bg-slate-50 transition-colors">
            All statuses
            <ChevronDown size={14} className="text-slate-400" />
          </button>

          <button className="flex items-center gap-1.5 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-600 bg-white hover:bg-slate-50 transition-colors">
            Plan
            <ChevronDown size={14} className="text-slate-400" />
          </button>

          <div className="flex items-center gap-2 flex-1 min-w-[160px] border border-slate-200 rounded-lg px-3 py-2 bg-white">
            <Search size={14} className="text-slate-400 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search by name or email..."
              className="w-full text-sm text-slate-700 placeholder:text-slate-400 outline-none bg-transparent"
            />
          </div>

          <button className="hidden sm:flex items-center gap-1.5 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-600 bg-white hover:bg-slate-50 transition-colors">
            <Calendar size={14} />
            Date range
          </button>

          <button className="hidden sm:flex items-center gap-1.5 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-600 bg-white hover:bg-slate-50 transition-colors">
            <SlidersHorizontal size={14} />
            View
          </button>

          <button className="hidden sm:flex items-center gap-1.5 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-600 bg-white hover:bg-slate-50 transition-colors">
            <Download size={14} />
            Export
          </button>

          <button className="w-9 h-9 flex-shrink-0 flex items-center justify-center border border-slate-200 rounded-lg text-slate-500 bg-white hover:bg-slate-50 transition-colors">
            <RefreshCw size={14} />
          </button>

          <button className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-3.5 py-2 text-sm transition-colors">
            <UserPlus size={14} />
            New customer
          </button>
        </div>

        {/* TABLE */}
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-separate border-spacing-0">
              <thead>
                <tr className="bg-slate-50/60">
                  <th className="w-10 px-4 py-3 border-b border-slate-200">
                    <input
                      type="checkbox"
                      checked={selected.length === customers.length}
                      onChange={toggleAll}
                      className="rounded border-slate-300"
                    />
                  </th>
                  <th className="text-left text-slate-500 text-xs font-semibold uppercase tracking-wide px-4 py-3 border-b border-slate-200 whitespace-nowrap">Customer</th>
                  <th className="text-left text-slate-500 text-xs font-semibold uppercase tracking-wide px-4 py-3 border-b border-slate-200 whitespace-nowrap">Email</th>
                  <th className="text-left text-slate-500 text-xs font-semibold uppercase tracking-wide px-4 py-3 border-b border-slate-200 whitespace-nowrap">Phone</th>
                  <th className="text-left text-slate-500 text-xs font-semibold uppercase tracking-wide px-4 py-3 border-b border-slate-200 whitespace-nowrap">Plan</th>
                  <th className="text-left text-slate-500 text-xs font-semibold uppercase tracking-wide px-4 py-3 border-b border-slate-200 whitespace-nowrap">Status</th>
                  <th className="text-right text-slate-500 text-xs font-semibold uppercase tracking-wide px-4 py-3 border-b border-slate-200 whitespace-nowrap">Joined</th>
                </tr>
              </thead>
              <tbody>
                {customers.length > 0 ? (
                  customers.map((c) => (
                    <tr key={c.id} className="group">
                      <td className="px-4 py-3 border-b border-slate-100 group-hover:bg-slate-50 transition-colors">
                        <input
                          type="checkbox"
                          checked={selected.includes(c.id)}
                          onChange={() => toggleOne(c.id)}
                          className="rounded border-slate-300"
                        />
                      </td>
                      <td className="px-4 py-3 border-b border-slate-100 group-hover:bg-slate-50 transition-colors">
                        <div className="flex items-center gap-2.5 whitespace-nowrap">
                          <div className="w-7 h-7 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-[11px] font-semibold flex-shrink-0">
                            {initials(c.name)}
                          </div>
                          <span className="text-slate-900 font-medium">{c.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 border-b border-slate-100 text-slate-500 whitespace-nowrap group-hover:bg-slate-50 transition-colors">
                        {c.email}
                      </td>
                      <td className="px-4 py-3 border-b border-slate-100 text-slate-500 whitespace-nowrap group-hover:bg-slate-50 transition-colors">
                        {c.phone}
                      </td>
                      <td className="px-4 py-3 border-b border-slate-100 text-slate-700 whitespace-nowrap group-hover:bg-slate-50 transition-colors">
                        {c.plan}
                      </td>
                      <td className="px-4 py-3 border-b border-slate-100 whitespace-nowrap group-hover:bg-slate-50 transition-colors">
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-md ${statusStyles[c.status]}`}>
                          {c.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 border-b border-slate-100 text-slate-400 text-right whitespace-nowrap group-hover:bg-slate-50 transition-colors">
                        {c.joined}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="text-center text-slate-400 text-sm py-16">
                      No customers yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>
  )
}

export default CustomersSection