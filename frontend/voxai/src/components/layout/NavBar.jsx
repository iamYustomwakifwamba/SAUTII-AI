// NavigationBarLayout.jsx
import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { X, Menu, ArrowRight } from "lucide-react"

function SautiiLogo() {
  return (
    <Link to="/" className="flex items-center gap-2.5 group flex-shrink-0">
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="32" height="32" rx="9" className="fill-blue-600 group-hover:fill-blue-700 transition-colors" />
        <rect x="7" y="14" width="2.6" height="4" rx="1.3" fill="white" opacity="0.55" />
        <rect x="11.5" y="10" width="2.6" height="12" rx="1.3" fill="white" opacity="0.75" />
        <rect x="16" y="7" width="2.6" height="18" rx="1.3" fill="white" />
        <rect x="20.5" y="11" width="2.6" height="10" rx="1.3" fill="white" opacity="0.75" />
        <rect x="25" y="13.5" width="2.6" height="5" rx="1.3" fill="white" opacity="0.55" />
      </svg>
      <span className="text-slate-900 text-xl font-bold tracking-tight">
        sauti<span className="text-blue-600">i</span>
      </span>
    </Link>
  )
}

function NavigationBarLayout() {
  const [openMobileNav, setOpenMobileNav] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "Features", to: "/features" },
    { label: "Pricing", to: "/pricing" },
    { label: "AI", to: "/ai" },
    { label: "Documentation", to: "/developers" },
  ]

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setOpenMobileNav(false)
  }, [location.pathname])

  return (
    <div
      className={`sticky top-0 z-50 transition-shadow duration-200 ${
        scrolled ? "shadow-sm shadow-slate-900/5" : ""
      }`}
      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      {/* Main bar */}
      <div className="flex items-center justify-between px-6 md:px-16 h-16 bg-white/90 backdrop-blur-md border-b border-slate-200">

        <SautiiLogo />

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(({ label, to }) => {
            const isActive = location.pathname === to
            return (
              <Link
                key={label}
                to={to}
                className={`relative px-3.5 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? "text-slate-900 bg-slate-100"
                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                {label}
              </Link>
            )
          })}
        </div>

        {/* Desktop auth buttons */}
        <div className="hidden md:flex items-center gap-2.5">
          <Link
            to="/register"
            className="text-slate-700 text-sm font-medium px-4 py-2 rounded-full border border-transparent hover:border-slate-200 hover:bg-slate-50 transition-colors"
          >
            Sign up
          </Link>
          <Link
            to="/login"
            className="group flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold pl-5 pr-4 py-2.5 rounded-full transition-all shadow-sm shadow-blue-600/20 hover:shadow-md hover:shadow-blue-600/30"
          >
            Login
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpenMobileNav((prev) => !prev)}
          className="md:hidden text-slate-700 cursor-pointer p-2 -mr-2 rounded-lg hover:bg-slate-50 transition-colors"
          aria-label="Toggle menu"
        >
          {openMobileNav ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 z-50 bg-white border-b border-slate-200 shadow-lg overflow-hidden transition-all duration-300 ease-in-out ${
          openMobileNav ? "max-h-[28rem] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 py-4 flex flex-col gap-1">
          {navLinks.map(({ label, to }) => {
            const isActive = location.pathname === to
            return (
              <Link
                key={label}
                to={to}
                className={`px-3.5 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                  isActive ? "text-slate-900 bg-slate-100" : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                {label}
              </Link>
            )
          })}
        </div>

        <div className="border-t border-slate-200 px-6 py-4 flex flex-col gap-3">
          <Link
            to="/register"
            className="text-center text-slate-700 font-medium border border-slate-200 rounded-full py-2.5 hover:bg-slate-50 transition-colors"
          >
            Sign up
          </Link>
          <Link
            to="/login"
            className="flex items-center justify-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full text-center font-semibold transition-colors"
          >
            Login
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NavigationBarLayout