// LeftPanel.jsx
import { useEffect, useState } from "react"
import { UserRound, WandSparkles, History, Zap, ChevronDown, FileAudio, LogOut, Phone } from "lucide-react"
import { getProfile } from "../../api/auth"
import { useAuth } from "../../context/AuthContext"
import { useNavigate } from "react-router-dom"
import { getRecentJingles } from "../../api/studio"

// dummy data ya muda -- baadaye itatolewa kwenye database
// const historyItems = [
//   { id: 1, title: "Hotel welcome jingle" },
//   { id: 2, title: "Saloon promo audio" },
//   { id: 3, title: "Logistics ad - 30sec" },
//   { id: 4, title: "Restaurant opening jingle" },
// ]

function LeftStudioPanel() {
  const [isHistoryOpen, setIsHistoryOpen] = useState(false)
  const [historyItems, setHistoryItems] = useState([])
  // const [user, setUser] = useState(null)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {

    const loadHistory = async () => {
      
      try {
        
        const data = await getRecentJingles()
        setHistoryItems(data)

      }catch(error) {
        console.log(error)
      }
    }
    loadHistory()
    
  }, [])

  const handleLogout = () => {
    logout();
    navigate("/login")
    console.log("Logged out")
  }

  return (
    <div className="bg-white flex flex-col border-b lg:border-b-0 lg:border-r border-slate-200 lg:h-full">

      <div className="pt-3 lg:pt-4 px-3">
        <div className="flex items-center gap-2 border border-blue-600 rounded-xl px-3 py-2.5">
          <div className="bg-blue-600 rounded-full p-1.5 flex items-center justify-center text-white flex-shrink-0">
            <UserRound size={16} />
          </div>
          <span className="text-slate-900 text-sm font-medium truncate">{user ? `${user.firstname} ${user.lastname}` : "loading user" }</span>
        </div>
      </div>

      <nav className="mt-3 lg:mt-4 px-3 flex flex-col gap-1 text-sm">
        <div className="flex items-center gap-3 bg-blue-600 text-white font-medium rounded-lg px-3 py-2 cursor-pointer whitespace-nowrap flex-shrink-0">
          <WandSparkles size={16} />
          Studio
        </div>

        {/* HISTORY TOGGLE */}
        <button
          type="button"
          onClick={() => setIsHistoryOpen((prev) => !prev)}
          className="flex items-center justify-between gap-3 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg px-3 py-2 cursor-pointer transition-colors whitespace-nowrap"
        >
          <div className="flex items-center gap-3">
            <History size={16} />
            History
          </div>
          <ChevronDown
            size={15}
            className={`transition-transform duration-200 ${isHistoryOpen ? "rotate-180" : ""}`}
          />
        </button>

        {/* HISTORY DROPDOWN LIST */}
        {isHistoryOpen && (
          <div className="ml-2 pl-3 border-l border-slate-200 flex flex-col gap-0.5 max-h-48 overflow-y-auto">
            {historyItems.length > 0 ? (
              historyItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-2 text-slate-500 hover:text-blue-600 hover:bg-slate-50 rounded-lg px-2.5 py-2 cursor-pointer transition-colors text-xs"
                >
                  <FileAudio size={13} className="flex-shrink-0" />
                  <span className="truncate">{item.title}</span>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-400 px-2.5 py-2">No history yet</p>
            )}
          </div>
        )}
      </nav>

      <div className="hidden lg:block mx-3 my-4 border-t border-slate-200" />

      <div className="lg:mt-auto mx-3 my-3 lg:mb-4 border border-slate-200 rounded-xl p-3">
        <div className="flex items-center gap-2 text-slate-900 mb-1">
          <Zap size={15} className="text-blue-600" />
          <span className="text-sm font-medium">Credits</span>
        </div>
        <p className="text-slate-500 text-xs">12 remaining this month</p>
        <div className="mt-2 h-1 bg-slate-200 rounded-full">
          <div className="h-full w-2/5 bg-blue-600 rounded-full" />
        </div>
      </div>

      {/* CUSTOMER CARE + LOGOUT */}
      <div className="mx-3 mb-3 lg:mb-4 flex flex-col gap-1">
        
        <a href="tel:+255769350103" className="flex items-center gap-2 text-slate-500 hover:text-blue-600 text-xs px-2.5 py-2 rounded-lg transition-colors">
          <Phone size={14} className="flex-shrink-0" />
          +255 769 350 103
        </a>

        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-2 text-slate-500 hover:text-red-600 text-xs font-medium px-2.5 py-2 rounded-lg transition-colors cursor-pointer"
        >
          <LogOut size={14} className="flex-shrink-0" />
          Logout
        </button>
      </div>

    </div>
  )
}

export default LeftStudioPanel