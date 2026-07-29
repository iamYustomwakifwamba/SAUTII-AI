import { useState } from "react"
import { Zap, Briefcase, AudioLines, Check, ChevronDown } from "lucide-react"
import { Link } from "react-router-dom"

const features = [
  { icon: <Zap size={20} />, title: "Fast generation", desc: "Create jingles in seconds using AI — no waiting, no setup." },
  { icon: <Briefcase size={20} />, title: "Business focused", desc: "Designed for shops, brands, and ads that need to stand out." },
  { icon: <AudioLines size={20} />, title: "High quality voices", desc: "Natural-sounding AI voices that make your brand memorable." },
]

const plans = [
  {
    name: "Starter",
    price: "Free",
    period: "",
    desc: "Try it out and see what VoxAI can do.",
    features: ["3 jingles per month", "Standard voices", "MP3 download", "Community support"],
    highlighted: false,
    cta: "Get started",
  },
  {
    name: "Business",
    price: "TZS 25,000",
    period: "/month",
    desc: "For shops and brands that need regular content.",
    features: ["30 jingles per month", "Premium AI voices", "All music styles", "Priority generation", "Email support"],
    highlighted: true,
    cta: "Start free trial",
  },
  {
    name: "Pro",
    price: "TZS 60,000",
    period: "/month",
    desc: "For agencies and heavy everyday use.",
    features: ["Unlimited jingles", "Premium AI voices", "Commercial license", "API access", "Priority support"],
    highlighted: false,
    cta: "Contact sales",
  },
]

const faqs = [
  {
    q: "How does VoxAI actually create a jingle?",
    a: "You type a short prompt describing your business or ad, pick a music style and voice, and our AI generates a studio-quality jingle in seconds — ready to download and use.",
  },
  {
    q: "Can I use the jingles for commercial purposes?",
    a: "Yes. Business and Pro plans include a commercial license, so you can use your jingles in ads, radio, social media, and in-store audio without extra fees.",
  },
  {
    q: "What languages are supported?",
    a: "VoxAI currently supports Swahili and English voices, with more languages and accents being added regularly based on demand.",
  },
  {
    q: "Can I cancel or change my plan anytime?",
    a: "Absolutely. You can upgrade, downgrade, or cancel your subscription at any time from your account settings — no long-term contracts.",
  },
  {
    q: "Do unused jingles roll over to the next month?",
    a: "No, monthly jingle credits reset at the start of each billing cycle and don't carry over. Pro plan users get unlimited generation, so this doesn't apply.",
  },
]

function FAQItem({ q, a, isOpen, onClick }) {
  return (
    <div className="border-b border-slate-200 py-5">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between text-left gap-4"
      >
        <span className="text-slate-900 font-semibold text-sm md:text-base">{q}</span>
        <ChevronDown
          size={18}
          className={`text-slate-400 flex-shrink-0 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-blue-600" : ""
          }`}
        />
      </button>
      <div
        className={`grid transition-all duration-200 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100 mt-3" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="text-slate-500 text-sm leading-relaxed">{a}</p>
        </div>
      </div>
    </div>
  )
}

function HomeLandingLayout() {
  const [openFaq, setOpenFaq] = useState(0)

  return (
    <div className="bg-slate-50 min-h-screen px-6 pt-20 pb-24">

      <div className="text-center mb-7">
        <span className="border border-blue-200 rounded-full text-blue-600 text-sm px-4 py-1.5 bg-white">
          ✦ AI-powered audio for modern businesses
        </span>
      </div>

      <h1 className="text-center text-5xl font-black text-slate-900 leading-tight mb-4 animate-fade-up">
        Turn one line of text into a jingle,<br />
        <span className="text-blue-600">and sound professional.</span>
      </h1>

      <p className="text-center text-slate-500 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
        Jinglify helps traders, entrepreneurs, and small businesses create
        studio-quality branded audio in seconds. Just type, pick a vibe, and play.
      </p>

      <div className="flex justify-center mb-20">
        <Link
          to="/trial"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full px-8 py-3 text-sm transition-all hover:scale-105 shadow-lg shadow-blue-600/20"
        >
          Try it now →
        </Link>
      </div>

      <p className="text-center text-slate-900 text-xl font-bold mb-2">
        Everything you need to sound professional
      </p>
      <p className="text-center text-slate-500 text-sm mb-10">
        Built for businesses that want studio-quality audio without the studio.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto mb-24">
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

      {/* PRICING */}
      <p className="text-center text-slate-900 text-xl font-bold mb-2">
        Simple, transparent pricing
      </p>
      <p className="text-center text-slate-500 text-sm mb-10">
        Choose a plan that fits your business. Upgrade or cancel anytime.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-24 items-start">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`relative rounded-2xl p-7 flex flex-col ${
              plan.highlighted
                ? "bg-blue-600 text-white shadow-xl shadow-blue-600/25 md:-translate-y-3"
                : "bg-white border border-slate-200 text-slate-900"
            }`}
          >
            {plan.highlighted && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-400 text-slate-900 text-xs font-bold px-3 py-1 rounded-full">
                Most popular
              </span>
            )}

            <p className={`font-semibold mb-1 ${plan.highlighted ? "text-white" : "text-slate-900"}`}>
              {plan.name}
            </p>
            <p className={`text-sm mb-4 ${plan.highlighted ? "text-blue-100" : "text-slate-500"}`}>
              {plan.desc}
            </p>

            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-3xl font-black">{plan.price}</span>
              {plan.period && (
                <span className={`text-sm ${plan.highlighted ? "text-blue-100" : "text-slate-500"}`}>
                  {plan.period}
                </span>
              )}
            </div>

            <ul className="space-y-3 mb-7 flex-1">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm">
                  <Check size={16} className={plan.highlighted ? "text-white mt-0.5" : "text-blue-600 mt-0.5"} />
                  <span className={plan.highlighted ? "text-blue-50" : "text-slate-600"}>{f}</span>
                </li>
              ))}
            </ul>

            <Link
              to="/trial"
              className={`text-center font-semibold text-sm rounded-full py-3 transition-all ${
                plan.highlighted
                  ? "bg-white text-blue-600 hover:bg-blue-50"
                  : "bg-slate-900 text-white hover:bg-slate-800"
              }`}
            >
              {plan.cta}
            </Link>
          </div>
        ))}
      </div>

      {/* FAQ */}
      <p className="text-center text-slate-900 text-xl font-bold mb-2">
        Frequently asked questions
      </p>
      <p className="text-center text-slate-500 text-sm mb-10">
        Everything you need to know before you get started.
      </p>

      <div className="max-w-2xl mx-auto mb-24 bg-white border border-slate-200 rounded-2xl px-6 shadow-sm">
        {faqs.map((faq, i) => (
          <FAQItem
            key={faq.q}
            q={faq.q}
            a={faq.a}
            isOpen={openFaq === i}
            onClick={() => setOpenFaq(openFaq === i ? null : i)}
          />
        ))}
      </div>

      {/* FINAL CTA */}
      <div className="max-w-3xl mx-auto text-center bg-blue-600 rounded-3xl px-8 py-14 shadow-xl shadow-blue-600/20">
        <p className="text-white text-2xl md:text-3xl font-black mb-3">
          Ready to sound professional?
        </p>
        <p className="text-blue-100 text-sm mb-8 max-w-md mx-auto">
          Join hundreds of businesses using VoxAI to create branded audio in seconds.
        </p>
        <Link
          to="/trial"
          className="inline-block bg-white hover:bg-blue-50 text-blue-600 font-bold rounded-full px-8 py-3 text-sm transition-all hover:scale-105"
        >
          Try it now →
        </Link>
      </div>

    </div>
  )
}

export default HomeLandingLayout