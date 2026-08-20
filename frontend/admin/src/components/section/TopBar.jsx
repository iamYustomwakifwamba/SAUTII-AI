// TopBar.jsx
import { useState, useRef, useEffect } from "react"
import { adminLogout } from "../../api/auth"
import {
  Bell,
  ChevronDown,
  Sun,
  UserPlus,
  CreditCard as CardIcon,
  AlertTriangle,
  CheckCheck,
  Pencil,
  X,
  Mail,
  ShieldCheck,
  LogOut,
} from "lucide-react"
import { useNavigate } from "react-router-dom"
import { getAdminProfile } from "../../api/auth"

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

// dummy data ya muda -- baadaye itatolewa kutoka context ya auth / API
// const currentUser = {
//   firstname: "Yusto",
//   lastname: "Mwakifwamba",
//   fullname: "Yusto Mwakifwamba",
//   email: "admin@sautii.com",
//   role: "Super Admin",
// }

function initials(firstname, lastname) {
  return `${firstname?.[0] || ""}${lastname?.[0] || ""}`.toLocaleUpperCase()
}

function TopBar({ pageTitle }) {
  const [notifOpen, setNotifOpen] = useState(false)
  const [notifList, setNotifList] = useState(notifications)
  const [userOpen, setUserOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [profileLoading, setProfileLoading] = useState(true)
  const notifRef = useRef(null)
  const userRef = useRef(null)
  const navigate = useNavigate()

  const unreadCount = notifList.filter((n) => n.unread).length

  useEffect(() => {
    const loadProfile = async () => {
        try {
            const profile = await getAdminProfile()
            setCurrentUser(profile)
        } catch (error) {
            console.error("Failed to load admin profile", error)
        } finally {
            setProfileLoading(false)
        }
    }

    loadProfile()
  }, [])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotifOpen(false)
      }
      if (userRef.current && !userRef.current.contains(e.target)) {
        setUserOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const markAllRead = () => {
    setNotifList((prev) => prev.map((n) => ({ ...n, unread: false })))
  }

  const handleEditProfile = () => {
    // TODO: fungua modal ya kuhariri profile au navigate kwenye settings
    console.log("Edit profile clicked")
  }

  const handleLogout = async () => {
    try {
        const refresh = localStorage.getItem("admin_refresh")

        if (refresh) {
            await adminLogout(refresh)
        }

    } catch (error) {
        console.error("Logout failed", error)

    } finally {
        // Futa tokens kwenye browser
        localStorage.removeItem("admin_access")
        localStorage.removeItem("admin_refresh")

        // Funga dropdown
        setUserOpen(false)

        // Mpeleke login
        navigate("/login")
    }
  }

  return (
    <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-slate-200 bg-white flex-shrink-0 relative z-10">

      <div className="flex items-center gap-1.5 text-sm min-w-0">
        <span className="text-blue-600 truncate">{currentUser?.email || "Loading..."}</span>
        <ChevronDown size={13} className="text-slate-300 -rotate-90 flex-shrink-0" />
        <span className="text-slate-900 font-medium">{pageTitle}</span>
      </div>

      <div className="flex items-center gap-2 flex-shrink-0">
        <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 transition-colors">
          <Sun size={15} />
        </button>

        {/* NOTIFICATION BELL + DROPDOWN */}
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

        {/* USER AVATAR (YM) + PROFILE DROPDOWN */}
        <div className="relative" ref={userRef}>
          <button
            type="button"
            onClick={() => setUserOpen((prev) => !prev)}
            className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-semibold flex-shrink-0 hover:bg-blue-700 transition-colors"
            aria-label="User profile"
          >
            {initials(currentUser?.firstname, currentUser?.lastname)}
          </button>

          {userOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden z-50">

              {/* HEADER */}
              <div className="flex items-start justify-between px-4 py-4 border-b border-slate-100">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-11 h-11 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-semibold flex-shrink-0">
                    {initials(currentUser?.firstname, currentUser?.lastname)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-slate-900 text-sm font-semibold truncate">
                      {currentUser? `${currentUser.firstname} ${currentUser.lastname}`:"Loading..."}
                      </p>
                    <span className="inline-flex items-center gap-1 mt-0.5 text-[11px] font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                      <ShieldCheck size={11} />
                      Super Admin
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setUserOpen(false)}
                  className="text-slate-400 hover:text-slate-600 transition-colors flex-shrink-0"
                  aria-label="Close"
                >
                  <X size={16} />
                </button>
              </div>

              {/* DETAILS */}
              <div className="px-4 py-3 flex flex-col gap-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">First name</span>
                  <span className="text-slate-700 font-medium">{currentUser?.firstname || "Loading..."}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Last name</span>
                  <span className="text-slate-700 font-medium">{currentUser?.lastname || "Loading...."}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 flex items-center gap-1">
                    <Mail size={12} />
                    Email
                  </span>
                  <span className="text-slate-700 font-medium truncate max-w-[160px]">{currentUser?.email || "Loading"}</span>
                </div>
              </div>

              {/* ACTIONS */}
              <div className="flex items-center gap-2 px-4 py-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={handleEditProfile}
                  className="flex-1 flex items-center justify-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium py-2 rounded-lg transition-colors"
                >
                  <Pencil size={12} />
                  Edit profile
                </button>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex-1 flex items-center justify-center gap-1.5 border border-red-200 text-red-600 hover:bg-red-50 text-xs font-medium py-2 rounded-lg transition-colors"
                >
                  <LogOut size={12} />
                  Logout
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