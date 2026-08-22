// WhatMakesUsDifferent.jsx
import { Mic2, MessageCircleHeart, Zap, Radio, Sparkles, Building2 } from "lucide-react"

const highlights = [
  {
    icon: <Mic2 size={20} />,
    title: "Voice cloning",
    desc: "Clone your own voice or pick one that fits your brand — every jingle sounds unmistakably yours.",
    accent: "bg-blue-50 text-blue-600",
  },
  {
    icon: <MessageCircleHeart size={20} />,
    title: "Human-like conversation",
    desc: "AI that talks back and forth naturally, not a robotic script — customers feel heard, not handled.",
    accent: "bg-violet-50 text-violet-600",
  },
  {
    icon: <Zap size={20} />,
    title: "Instant generation",
    desc: "From a single line of text to a studio-quality jingle in under 30 seconds. No waiting, no studio booking.",
    accent: "bg-amber-50 text-amber-600",
  },
  {
    icon: <Building2 size={20} />,
    title: "Always-on AI",
    desc: "Calls and WhatsApp messages answered around the clock — even after hours, weekends, and holidays.",
    accent: "bg-green-50 text-green-600",
  },
  {
    icon: <Radio size={20} />,
    title: "Direct Talk (DT) links",
    desc: "A unique link that lets customers speak directly to your AI — no app, no phone call, just tap and talk.",
    accent: "bg-pink-50 text-pink-600",
  },
  {
    icon: <Sparkles size={20} />,
    title: "Zero hardware",
    desc: "No studio, no equipment, no IT project. Everything runs from your browser, live in minutes.",
    accent: "bg-cyan-50 text-cyan-600",
  },
]

function WhatMakesUsDifferent() {
  return (
    <div className="max-w-5xl mx-auto mb-24">

      <div className="text-center mb-10">
        <span className="inline-block border border-blue-200 rounded-full text-blue-600 text-xs font-medium px-3 py-1 bg-white mb-4">
          Why sautii
        </span>
        <p className="text-slate-900 text-xl sm:text-2xl font-bold mb-2">
          What makes sautii different
        </p>
        <p className="text-slate-500 text-sm max-w-lg mx-auto">
          Not just another AI voice tool — a handful of things built to make your
          business sound and feel unmistakably human.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {highlights.map(({ icon, title, desc, accent }) => (
          <div
            key={title}
            className="group relative bg-white border border-slate-200 rounded-2xl p-6 overflow-hidden hover:border-blue-300 hover:shadow-lg hover:shadow-blue-600/5 transition-all duration-300"
          >
            <div
              className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 ${accent}`}
            >
              {icon}
            </div>
            <p className="text-slate-900 font-semibold mb-1.5">{title}</p>
            <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>

            {/* subtle decorative glow on hover */}
            <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full bg-blue-600/0 group-hover:bg-blue-600/5 blur-2xl transition-colors duration-300" />
          </div>
        ))}
      </div>

    </div>
  )
}

export default WhatMakesUsDifferent