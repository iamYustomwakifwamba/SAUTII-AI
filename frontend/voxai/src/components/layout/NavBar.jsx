import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { X, Menu, ArrowRight } from "lucide-react"

function SautiiLogo() {
  return (
    <Link to="/" className="flex items-center gap-2.5 group">
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
  const location = useLocation()

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "Features", to: "/features" },
    { label: "Pricing", to: "/pricing" },
    { label: "AI", to: "/ai" },
    { label: "Documentation", to: "/developers" },
  ]

  return (
    <div className="sticky top-0 z-50">
      {/* Main bar */}
      <div className="flex items-center justify-between px-6 md:px-12 h-14 bg-white border-b border-slate-200">
        {/* Logo */}
        <SautiiLogo />

        {/* Desktop nav links */}
        <div className="hidden md:flex gap-8">
          {navLinks.map(({ label, to }) => {
            const isActive = location.pathname === to
            return (
              <Link
                key={label}
                to={to}
                className={`relative font-sans py-1 transition-colors ${
                  isActive ? "text-blue-600" : "text-slate-500 hover:text-blue-600"
                } after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:h-[2px] after:bg-blue-600 after:transition-all after:duration-200 ${
                  isActive ? "after:w-full" : "after:w-0 hover:after:w-full"
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
            className="group flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium pl-5 pr-4 py-2 rounded-full transition-all shadow-sm shadow-blue-600/20 hover:shadow-md hover:shadow-blue-600/30"
          >
            Login
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpenMobileNav((prev) => !prev)}
          className="md:hidden text-slate-700 cursor-pointer p-1"
          aria-label="Toggle menu"
        >
          {openMobileNav ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {openMobileNav && (
        <div className="md:hidden absolute top-full left-0 right-0 z-50 bg-white border-b border-slate-200 px-6 py-4 flex flex-col gap-4 shadow-lg">
          {navLinks.map(({ label, to }) => (
            <Link
              key={label}
              to={to}
              className="font-sans text-slate-500 hover:text-blue-600 transition-colors"
              onClick={() => setOpenMobileNav(false)}
            >
              {label}
            </Link>
          ))}
          <div className="border-t border-slate-200 pt-4 flex flex-col gap-3">
            <Link
              to="/signup"
              className="text-center text-slate-700 font-medium border border-slate-200 rounded-full py-2.5 hover:bg-slate-50 transition-colors"
              onClick={() => setOpenMobileNav(false)}
            >
              Sign up
            </Link>
            <Link
              to="/login"
              className="flex items-center justify-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full text-center font-medium transition-colors"
              onClick={() => setOpenMobileNav(false)}
            >
              Login
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default NavigationBarLayout