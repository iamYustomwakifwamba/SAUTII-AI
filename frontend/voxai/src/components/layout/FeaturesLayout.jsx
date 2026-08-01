import { Link } from "react-router-dom"
import {
  Languages,
  PhoneCall,
  AudioLines,
  Mic2,
  Globe2,
  SlidersHorizontal,
  Headphones,
  Code2,
  BookOpenText,
  Voicemail,
  ArrowRight,
  Feather,
  ScrollText,
  Megaphone,
} from "lucide-react"

const features = [
  { icon: <Languages size={20} />, title: "Language practice", desc: "AI character that helps learners practice and improve a new language." },
  { icon: <PhoneCall size={20} />, title: "Phone call assistant", desc: "Answers customer calls automatically, any time of day or night." },
  { icon: <AudioLines size={20} />, title: "Jingle creation", desc: "Turns a text prompt into a studio-quality branded jingle in seconds." },
  { icon: <Mic2 size={20} />, title: "Voice actor", desc: "Natural AI voices for ads, narration, and any project needing a pro voice." },
  { icon: <Globe2 size={20} />, title: "Translator", desc: "Translates speech and text across languages, instantly and accurately." },
  { icon: <SlidersHorizontal size={20} />, title: "Sound designer", desc: "Custom audio effects and soundscapes tailored to your brand." },
  { icon: <Headphones size={20} />, title: "Customer care", desc: "Handles support calls 24/7 — built to scale for telecoms and beyond." },
  { icon: <BookOpenText size={20} />, title: "Audiobook narration", desc: "Turns scripts and articles into natural audiobook or podcast audio." },
  { icon: <Voicemail size={20} />, title: "Automated voice menus", desc: "Smart IVR that understands speech and routes callers instantly." },
  { icon: <Feather size={20} />, title: "Story teller", desc: "Narrates original stories and tales with warm, expressive AI voice." },
  { icon: <ScrollText size={20} />, title: "Poetry", desc: "Recites shairi and poetry with rhythm, emotion, and authentic delivery." },
  { icon: <Megaphone size={20} />, title: "Motivation speaker", desc: "Delivers powerful, energetic speeches that inspire and motivate listeners." },
]

export default function FeaturesLayout() {
  return (
    <div className="bg-slate-50 min-h-screen px-6 pt-20 pb-24">

      {/* HEADER */}
      <div className="text-center mb-12 max-w-2xl mx-auto">
        <span className="inline-block border border-blue-200 rounded-full text-blue-600 text-sm px-4 py-1.5 bg-white mb-5">
          ✦ One AI, every voice your business needs
        </span>
        <h1 className="text-slate-900 text-4xl md:text-5xl font-black leading-tight mb-4">
          Every voice service,<br />
          <span className="text-blue-600">powered by one AI.</span>
        </h1>
        <p className="text-slate-500 text-lg leading-relaxed">
          From learning a new language to answering thousands of customer calls a day —
          sautii gives your business a voice that never sleeps.
        </p>
      </div>

      {/* FEATURES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto mb-20">
        {features.map(({ icon, title, desc }) => (
          <div
            key={title}
            className="border border-slate-200 hover:border-blue-400 rounded-2xl p-6 bg-white transition-colors shadow-sm"
          >
            <div className="text-blue-600 mb-4">{icon}</div>
            <p className="text-slate-900 font-semibold mb-2">{title}</p>
            <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>

      {/* DEVELOPER API BANNER */}
      <div className="max-w-3xl mx-auto bg-slate-900 rounded-3xl px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
        <div className="flex items-center gap-4">
          <Code2 size={22} className="text-blue-400 flex-shrink-0" />
          <div>
            <p className="text-white font-semibold mb-1">Developer API</p>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Plug every voice feature above into your own app with a simple API.
            </p>
          </div>
        </div>
        <Link
          to="/developers"
          className="flex-shrink-0 flex items-center gap-2 bg-white hover:bg-blue-50 text-slate-900 font-semibold rounded-full px-6 py-3 text-sm transition-all hover:scale-105"
        >
          View docs
          <ArrowRight size={16} />
        </Link>
      </div>

      {/* CTA */}
      <div className="text-center mt-16">
        <p className="text-slate-500 text-sm mb-5">Ready to give your business a voice?</p>
        <Link
          to="/trial"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full px-8 py-3 text-sm transition-all hover:scale-105 shadow-lg shadow-blue-600/20"
        >
          Try it now
          <ArrowRight size={16} />
        </Link>
      </div>

    </div>
  )
}