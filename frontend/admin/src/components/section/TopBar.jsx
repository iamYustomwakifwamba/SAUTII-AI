// TopBar.jsx
import { useState, useRef, useEffect } from "react"
import {
  Bell,
  ChevronDown,
  Sun,
  UserPlus,
  CreditCard as CardIcon,
  AlertTriangle,
  CheckCheck,
} from "lucide-react"

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

// pageTitle: jina la page linaloonekana kwenye breadcrumb (mf. "Overview", "Customers")
function TopBar({ pageTitle }) {
  const [notifOpen, setNotifOpen] = useState(false)
  const [notifList, setNotifList] = useState(notifications)
  const notifRef = useRef(null)

  const unreadCount = notifList.filter((n) => n.unread).length

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
    <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-slate-200 bg-white flex-shrink-0 relative z-10">

      <div className="flex items-center gap-1.5 text-sm min-w-0">
        <span className="text-blue-600 truncate">admin@sautii.com</span>
        <ChevronDown size={13} className="text-slate-300 -rotate-90 flex-shrink-0" />
        <span className="text-slate-900 font-medium">{pageTitle}</span>
      </div>

      <div className="flex items-center gap-2 flex-shrink-0">
        <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 transition-colors">
          <Sun size={15} />
        </button>

        <div className="relative" ref={notifRef}>
          <button
            type="button"
            onClick={() => setNotifOpen((prev) => !prev)}
            className="relative w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 transition-colors"
            aria-label="Notifications"
          >
            <Bell size={15} />
            {unreadCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[9px] font-semibold w-4 h-4 rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {notifOpen && (
            <div className="absolute right-0 mt-2 w-[320px] sm:w-96 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden z-50">

              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
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
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${style}`}>
                          <Icon size={14} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-slate-900 text-sm font-medium leading-snug">{n.title}</p>
                          <p className="text-slate-500 text-xs mt-0.5 leading-snug">{n.desc}</p>
                          <p className="text-slate-400 text-[11px] mt-1">{n.time}</p>
                        </div>
                        {n.unread && (
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 flex-shrink-0 mt-1.5" />
                        )}
                      </div>
                    )
                  })
                ) : (
                  <p className="text-center text-slate-400 text-sm py-8">No notifications</p>
                )}
              </div>

              <div className="px-4 py-2.5 border-t border-slate-100">
                <button className="w-full text-center text-xs text-blue-600 hover:underline font-medium">
                  View all notifications
                </button>
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TopBar