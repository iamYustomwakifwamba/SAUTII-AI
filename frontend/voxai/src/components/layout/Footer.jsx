import { Link } from "react-router-dom"

function FooterLayout() {
  return (
    <footer className="border-t border-slate-200 px-6 bg-white md:px-16">
      <div className="flex items-center justify-between h-16">

        <div className="flex items-center gap-3">
          <span className="text-blue-600 font-mono font-bold text-sm">sautii</span>
          <span className="text-slate-400 text-sm">© 2026 · sound well</span>
        </div>

        <div className="flex gap-6">
          {["Privacy", "Terms", "Contact"].map((label) => (
            <Link
              key={label}
              to={`/${label.toLowerCase()}`}
              className="text-slate-500 hover:text-blue-600 text-sm transition-colors"
            >
              {label}
            </Link>
          ))}
        </div>

      </div>
    </footer>
  )
}

export default FooterLayout