// DashboardSection.jsx
import { useState, useRef, useEffect } from "react"
import {
  Wallet,
  Users,
  CreditCard,
  UserCog,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  Bell,
  UserPlus,
  CreditCard as CardIcon,
  AlertTriangle,
  CheckCheck,
} from "lucide-react"

const stats = [
  { label: "Total income", value: "TZS 12.4M", change: "+8.2%", trend: "up", icon: Wallet },
  { label: "Total customers", value: "1,284", change: "+4.6%", trend: "up", icon: Users },
  { label: "Total subscriptions", value: "312", change: "-1.3%", trend: "down", icon: CreditCard },
  { label: "Total staff", value: "18", change: "+2", trend: "up", icon: UserCog },
]

const recentTransactions = [
  { id: 1, name: "Yusto Mwakifwamba", plan: "Pro plan", amount: "TZS 45,000", status: "Success", date: "Aug 7" },
  { id: 2, name: "Amina Hassan", plan: "Starter plan", amount: "TZS 15,000", status: "Success", date: "Aug 7" },
  { id: 3, name: "John Mrema", plan: "Pro plan", amount: "TZS 45,000", status: "Pending", date: "Aug 6" },
  { id: 4, name: "Grace Kileo", plan: "Business plan", amount: "TZS 120,000", status: "Failed", date: "Aug 6" },
  { id: 5, name: "Peter Shayo", plan: "Starter plan", amount: "TZS 15,000", status: "Success", date: "Aug 5" },
]

const recentCustomers = [
  { id: 1, name: "Amina Hassan", email: "amina@example.com", joined: "Aug 7" },
  { id: 2, name: "John Mrema", email: "john@example.com", joined: "Aug 6" },
  { id: 3, name: "Grace Kileo", email: "grace@example.com", joined: "Aug 5" },
]

// dummy data ya muda -- baadaye itatolewa kwenye database
const notifications = [
  {
    id: 1,
    type: "customer",
    title: "New customer registered",
    desc: "Amina Hassan just created an account.",
    time: "5m ago",
    unread: true,
  },
  {
    id: 2,
    type: "payment",
    title: "Payment received",
    desc: "Yusto Mwakifwamba paid TZS 45,000 for Pro plan.",
    time: "1h ago",
    unread: true,
  },
  {
    id: 3,
    type: "alert",
    title: "Payment failed",
    desc: "Grace Kileo's transaction for Business plan failed.",
    time: "3h ago",
    unread: true,
  },
  {
    id: 4,
    type: "customer",
    title: "New customer registered",
    desc: "John Mrema just created an account.",
    time: "1d ago",
    unread: false,
  },
]

const notificationIcon = {
  customer: { icon: UserPlus, style: "bg-blue-50 text-blue-600" },
  payment: { icon: CardIcon, style: "bg-green-50 text-green-600" },
  alert: { icon: AlertTriangle, style: "bg-red-50 text-red-600" },
}

const statusStyles = {
  Success: "bg-green-50 text-green-600",
  Pending: "bg-amber-50 text-amber-600",
  Failed: "bg-red-50 text-red-600",
}

function initials(name) {
  return name.split(" ").map((n) => n[0]).join("").slice(0, 2)
}

function DashboardSection() {
  const [notifOpen, setNotifOpen] = useState(false)
  const [notifList, setNotifList] = useState(notifications)
  const notifRef = useRef(null)

  const unreadCount = notifList.filter((n) => n.unread).length

  // funga dropdown ukibofya nje yake
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotifOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const markAllRead = () => {
    setNotifList((prev) => prev.map((n) => ({ ...n, unread: false })))
  }

  return (
    <div className="bg-slate-50 h-full overflow-y-auto flex flex-col">

      {/* TOP BAR */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-slate-200 bg-white flex-shrink-0 relative z-10">
        <div>
          <h1 className="text-slate-900 text-lg sm:text-xl font-bold">Overview</h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-0.5 hidden sm:block">
            Welcome back, here's what's happening today.
          </p>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">

          {/* NOTIFICATION BELL + DROPDOWN */}
          <div className="relative" ref={notifRef}>
            <button
              type="button"
              onClick={() => setNotifOpen((prev) => !prev)}
              className="relative w-9 h-9 flex items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 transition-colors"
              aria-label="Notifications"
            >
              <Bell size={18} />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1.5 w-2 h-2 bg-blue-600 rounded-full border border-white" />
              )}
            </button>

            {notifOpen && (
              <div className="absolute right-0 mt-2 w-[320px] sm:w-96 bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden z-50">

                {/* HEADER */}
                <div className="flex items-center justify-between px-4 py-3.5 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <p className="text-slate-900 font-semibold text-sm">Notifications</p>
                    {unreadCount > 0 && (
                      <span className="bg-blue-600 text-white text-[10px] font-semibold px-1.5 py-0.5 rounded-full">
                        {unreadCount} new
                      </span>
                    )}
                  </div>
                  <button
                    onClick={markAllRead}
                    className="flex items-center gap-1 text-xs text-blue-600 hover:underline font-medium"
                  >
                    <CheckCheck size={13} />
                    Mark all read
                  </button>
                </div>

                {/* LIST */}
                <div className="max-h-80 overflow-y-auto">
                  {notifList.length > 0 ? (
                    notifList.map((n) => {
                      const { icon: Icon, style } = notificationIcon[n.type]
                      return (
                        <div
                          key={n.id}
                          className={`flex items-start gap-3 px-4 py-3 border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors cursor-pointer ${
                            n.unread ? "bg-blue-50/40" : ""
                          }`}
                        >
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${style}`}>
                            <Icon size={14} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-slate-900 text-sm font-medium leading-snug">{n.title}</p>
                            <p className="text-slate-500 text-xs mt-0.5 leading-snug">{n.desc}</p>
                            <p className="text-slate-400 text-[11px] mt-1">{n.time}</p>
                          </div>
                          {n.unread && (
                            <span className="w-2 h-2 rounded-full bg-blue-600 flex-shrink-0 mt-1.5" />
                          )}
                        </div>
                      )
                    })
                  ) : (
                    <p className="text-center text-slate-400 text-sm py-8">No notifications</p>
                  )}
                </div>

                {/* FOOTER */}
                <div className="px-4 py-3 border-t border-slate-100">
                  <button className="w-full text-center text-xs text-blue-600 hover:underline font-medium">
                    View all notifications
                  </button>
                </div>

              </div>
            )}
          </div>

          {/* PROFILE */}
          <button
            type="button"
            className="flex items-center gap-2 pl-1 pr-1 sm:pr-3 py-1 rounded-full hover:bg-slate-100 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-semibold flex-shrink-0">
              YM
            </div>
            <span className="hidden sm:block text-sm font-medium text-slate-700">Yusto M.</span>
          </button>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-4 sm:p-6">

        {/* STAT CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
          {stats.map(({ label, value, change, trend, icon: Icon }) => (
            <div key={label} className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                  <Icon size={16} />
                </div>
                <span className={`flex items-center gap-0.5 text-xs font-medium ${trend === "up" ? "text-green-600" : "text-red-500"}`}>
                  {trend === "up" ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
                  {change}
                </span>
              </div>
              <div>
                <p className="text-slate-900 text-xl font-bold">{value}</p>
                <p className="text-slate-500 text-xs mt-0.5">{label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CHART + RECENT CUSTOMERS */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-6">

          <div className="xl:col-span-2 bg-white border border-slate-200 rounded-2xl p-4 sm:p-5">
            <div className="flex items-center justify-between mb-4">
              <p className="text-slate-900 font-semibold text-sm">Revenue overview</p>
              <button className="text-slate-400 hover:text-slate-600 transition-colors">
                <MoreHorizontal size={17} />
              </button>
            </div>
            <div className="h-48 flex items-end gap-2">
              {[40, 65, 50, 80, 60, 90, 70, 55, 85, 95, 75, 100].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 bg-blue-100 hover:bg-blue-500 rounded-t-md transition-colors"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5">
            <p className="text-slate-900 font-semibold text-sm mb-4">Recent customers</p>
            <div className="flex flex-col gap-3">
              {recentCustomers.map((customer) => (
                <div key={customer.id} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-medium flex-shrink-0">
                    {initials(customer.name)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-slate-900 text-sm font-medium truncate">{customer.name}</p>
                    <p className="text-slate-400 text-xs truncate">{customer.email}</p>
                  </div>
                  <span className="text-slate-400 text-xs flex-shrink-0">{customer.joined}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* RECENT TRANSACTIONS */}
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">

          <div className="flex items-center justify-between px-4 sm:px-5 py-4 border-b border-slate-100">
            <p className="text-slate-900 font-semibold text-sm">Recent transactions</p>
            <button className="text-blue-600 text-xs font-medium hover:underline">View all</button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border-separate border-spacing-0">
              <thead>
                <tr>
                  <th className="text-left text-slate-400 text-xs uppercase tracking-wide font-medium px-4 sm:px-5 py-3">Customer</th>
                  <th className="text-left text-slate-400 text-xs uppercase tracking-wide font-medium px-4 py-3">Plan</th>
                  <th className="text-left text-slate-400 text-xs uppercase tracking-wide font-medium px-4 py-3">Amount</th>
                  <th className="text-left text-slate-400 text-xs uppercase tracking-wide font-medium px-4 py-3">Status</th>
                  <th className="text-right text-slate-400 text-xs uppercase tracking-wide font-medium px-4 sm:px-5 py-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentTransactions.map((tx) => (
                  <tr key={tx.id} className="group">
                    <td className="px-4 sm:px-5 py-3 border-t border-slate-100 group-hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-2.5 whitespace-nowrap">
                        <div className="w-7 h-7 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-[11px] font-semibold flex-shrink-0">
                          {initials(tx.name)}
                        </div>
                        <span className="text-slate-900 font-medium">{tx.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 border-t border-slate-100 text-slate-500 whitespace-nowrap group-hover:bg-slate-50 transition-colors">
                      {tx.plan}
                    </td>
                    <td className="px-4 py-3 border-t border-slate-100 text-slate-900 font-medium whitespace-nowrap group-hover:bg-slate-50 transition-colors">
                      {tx.amount}
                    </td>
                    <td className="px-4 py-3 border-t border-slate-100 whitespace-nowrap group-hover:bg-slate-50 transition-colors">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusStyles[tx.status]}`}>
                        {tx.status}
                      </span>
                    </td>
                    <td className="px-4 sm:px-5 py-3 border-t border-slate-100 text-slate-400 text-right whitespace-nowrap group-hover:bg-slate-50 transition-colors">
                      {tx.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>
  )
}

export default DashboardSection