// FooterLayout.jsx
import { Link } from "react-router-dom"
import { Phone, Mail, MapPin,  } from "lucide-react"

const footerColumns = [
  {
    title: "Product",
    links: [
      { label: "Features", to: "/features" },
      { label: "Pricing", to: "/pricing" },
      { label: "AI & Direct Talk", to: "/ai" },
      { label: "Studio", to: "/studio" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", to: "/about" },
      { label: "Blog", to: "/blog" },
      { label: "Careers", to: "/careers" },
      { label: "Contact", to: "/contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", to: "/developers" },
      { label: "API reference", to: "/developers#api" },
      { label: "Support ticket", to: "/support" },
      { label: "Status", to: "/status" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy policy", to: "/privacy" },
      { label: "Terms of service", to: "/terms" },
      { label: "Cookie policy", to: "/cookies" },
    ],
  },
]

// const socials = [
//   { icon: Instagram, href: "https://www.instagram.com" },
//   { icon: Linkedin, href: "https://www.linkedin.com" },
//   { icon: Facebook, href: "https://www.facebook.com" },
// ]

function FooterLayout() {
  return (
    <footer
      className="border-t border-slate-200 bg-white px-6 md:px-16 pt-16 pb-8"
      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      <div className="max-w-6xl mx-auto">

        {/* TOP: brand + columns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">

          {/* BRAND + CONTACT */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-2 pr-4">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="32" height="32" rx="9" fill="#2563EB" />
                <rect x="7" y="14" width="2.6" height="4" rx="1.3" fill="white" opacity="0.55" />
                <rect x="11.5" y="10" width="2.6" height="12" rx="1.3" fill="white" opacity="0.75" />
                <rect x="16" y="7" width="2.6" height="18" rx="1.3" fill="white" />
                <rect x="20.5" y="11" width="2.6" height="10" rx="1.3" fill="white" opacity="0.75" />
                <rect x="25" y="13.5" width="2.6" height="5" rx="1.3" fill="white" opacity="0.55" />
              </svg>
              <span className="text-slate-900 text-lg font-bold tracking-tight">
                sauti<span className="text-blue-600">i</span>
              </span>
            </Link>

            <p className="text-slate-500 text-sm leading-relaxed mb-5 max-w-xs">
              One AI voice for your business — jingles, calls, WhatsApp, and Direct Talk,
              answered instantly, in your customers' own language.
            </p>

            <div className="flex flex-col gap-2.5 mb-5">
              <a href="tel:+255769350103" className="flex items-center gap-2 text-slate-500 hover:text-blue-600 text-sm transition-colors">
                <Phone size={14} />
                +255 769 350 103
              </a>
              <a href="mailto:hello@sautii.com" className="flex items-center gap-2 text-slate-500 hover:text-blue-600 text-sm transition-colors">
                <Mail size={14} />
                hello@sautii.com
              </a>
              <span className="flex items-center gap-2 text-slate-500 text-sm">
                <MapPin size={14} />
                Dar es Salaam, Tanzania
              </span>
            </div>

            {/* <div className="flex items-center gap-2">
              {socials.map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:text-blue-600 hover:border-blue-200 transition-colors"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div> */}
          </div>

          {/* LINK COLUMNS */}
          {footerColumns.map((col) => (
            <div key={col.title}>
              <p className="text-slate-900 text-sm font-semibold mb-4">{col.title}</p>
              <div className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <Link
                    key={link.label}
                    to={link.to}
                    className="text-slate-500 hover:text-blue-600 text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}

        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-slate-200 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-400 text-sm text-center sm:text-left">
            © 2026 sautii · Built in Dar es Salaam by Smart-route Africa
          </p>
          <div className="flex items-center gap-2 text-slate-400 text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
            All systems operational
          </div>
        </div>

      </div>
    </footer>
  )
}

export default FooterLayout