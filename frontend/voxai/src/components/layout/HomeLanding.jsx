import { useState } from "react"
import { Zap, Briefcase, AudioLines, Check, ChevronDown, PhoneCall, ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import { TypeAnimation } from "react-type-animation"
import WhoCanBenefitSection from "../section/WhoCanBenefitSection"
import StatsRow from "../section/StatsRowSection"

const features = [
  {
    icon: <Zap size={24} />,
    title: "Fast generation",
    desc: "Create jingles in seconds using AI — no waiting, no setup.",
    accent: "bg-blue-50 text-blue-600",
  },
  {
    icon: <Briefcase size={24} />,
    title: "Business focused",
    desc: "Designed for shops, brands, and ads that need to stand out.",
    accent: "bg-violet-50 text-violet-600",
  },
  {
    icon: <AudioLines size={24} />,
    title: "High quality voices",
    desc: "Natural-sounding AI voices that make your brand memorable.",
    accent: "bg-amber-50 text-amber-600",
  },
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
    <div className="border-b border-slate-200 py-6">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between text-left gap-4"
      >
        <span className="text-slate-900 font-semibold text-base md:text-lg">{q}</span>
        <ChevronDown
          size={20}
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
          <p className="text-slate-500 text-sm md:text-base leading-relaxed max-w-2xl">{a}</p>
        </div>
      </div>
    </div>
  )
}

function HomeLandingLayout() {
  const [openFaq, setOpenFaq] = useState(0)

  return (
    <div
      className="bg-slate-50 min-h-screen px-6 pt-20 pb-24"
      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
    >

      <div className="text-center mb-7">
        <span className="border border-blue-200 rounded-full text-blue-600 text-sm px-4 py-1.5 bg-white">
          ✦ One AI voice line for every way customers reach you
        </span>
      </div>

      <h1 className="text-center text-4xl sm:text-5xl font-black text-slate-900 leading-tight mb-4 min-h-[3.6em] sm:min-h-[2.4em]">
        <span className="block mb-1">Your business, answered by AI.</span>
        <TypeAnimation
          sequence={[
            "Turn a line of text into a jingle.",
            2200,
            "Answer every call and WhatsApp message.",
            2200,
            "Give your website a voice agent.",
            2200,
            "Let customers Direct Talk to your AI.",
            2200,
          ]}
          wrapper="span"
          speed={50}
          repeat={Infinity}
          className="text-blue-600"
        />
      </h1>

      <p className="text-center text-slate-500 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
        sautii gives your business one AI voice for everything: branded jingles and ads,
        automatic call and WhatsApp answering, a voice agent on your website, and Direct Talk (DT)
        links — a unique way for customers to speak to your AI, built only by sautii.
      </p>

      <div className="flex justify-center mb-20">
        <Link
          to="/trial"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full px-8 py-3 text-sm transition-all hover:scale-105 shadow-lg shadow-blue-600/20"
        >
          Try it now →
        </Link>
      </div>

      {/* STATS SECTION */}
      <StatsRow />

      {/* FEATURES - cards kubwa, muundo unaofanana na stats */}
      <p className="text-center text-slate-900 text-2xl font-bold mb-2">
        Everything you need to sound professional
      </p>
      <p className="text-center text-slate-500 text-sm mb-10 max-w-lg mx-auto">
        Built for businesses that want studio-quality audio without the studio.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto mb-24">
        {features.map(({ icon, title, desc, accent }) => (
          <div
            key={title}
            className="group bg-white border border-slate-200 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-600/5 rounded-2xl p-8 transition-all duration-300"
          >
            <div
              className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110 ${accent}`}
            >
              {icon}
            </div>
            <p className="text-slate-900 font-semibold text-lg mb-2">{title}</p>
            <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>

      {/* WHO CAN BENEFIT SECTION */}
      <WhoCanBenefitSection />

      {/* PRICING - cards kubwa zaidi, muundo bora */}
      <p className="text-center text-slate-900 text-2xl font-bold mb-2">
        Simple, transparent pricing
      </p>
      <p className="text-center text-slate-500 text-sm mb-12 max-w-lg mx-auto">
        Choose a plan that fits your business. Upgrade or cancel anytime.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-24 items-start">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`relative  p-9 flex flex-col transition-all duration-300 ${
              plan.highlighted
                ? "bg-blue-600 text-white shadow-2xl shadow-blue-600/30 md:-translate-y-4 md:scale-105"
                : "bg-white border border-slate-200 text-slate-900 hover:border-blue-300 hover:shadow-lg"
            }`}
          >
            {plan.highlighted && (
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-amber-400 text-slate-900 text-xs font-bold px-4 py-1.5 rounded-full shadow-md">
                Most popular
              </span>
            )}

            <p className={`font-bold text-lg mb-1.5 ${plan.highlighted ? "text-white" : "text-slate-900"}`}>
              {plan.name}
            </p>
            <p className={`text-sm mb-6 ${plan.highlighted ? "text-blue-100" : "text-slate-500"}`}>
              {plan.desc}
            </p>

            <div className="flex items-baseline gap-1 mb-7">
              <span className="text-4xl font-black">{plan.price}</span>
              {plan.period && (
                <span className={`text-sm ${plan.highlighted ? "text-blue-100" : "text-slate-500"}`}>
                  {plan.period}
                </span>
              )}
            </div>

            <ul className="space-y-3.5 mb-8 flex-1">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm">
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      plan.highlighted ? "bg-white/20" : "bg-blue-50"
                    }`}
                  >
                    <Check size={12} className={plan.highlighted ? "text-white" : "text-blue-600"} />
                  </div>
                  <span className={plan.highlighted ? "text-blue-50" : "text-slate-600"}>{f}</span>
                </li>
              ))}
            </ul>

            <Link
              to="/trial"
              className={`text-center font-semibold text-sm rounded-full py-3.5 transition-all ${
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

      {/* FAQ - upana zaidi, bila border-radius */}
      <p className="text-center text-slate-900 text-2xl font-bold mb-2">
        Frequently asked questions
      </p>
      <p className="text-center text-slate-500 text-sm mb-12 max-w-lg mx-auto">
        Everything you need to know before you get started.
      </p>

      <div className="max-w-4xl mx-auto mb-24 bg-white border border-slate-200 px-8 sm:px-10">
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

      {/* FINAL CTA - imeongezwa maudhui na muundo bora */}
      <div className="max-w-4xl mx-auto text-center bg-blue-600 rounded-3xl px-8 sm:px-14 py-16 shadow-2xl shadow-blue-600/25 relative overflow-hidden">

        {/* decorative glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />

        <div className="relative">
          <span className="inline-block border border-white/30 rounded-full text-white text-xs font-medium px-3 py-1 mb-5">
            Live in minutes, not weeks
          </span>

          <p className="text-white text-2xl md:text-4xl font-black mb-4 leading-tight">
            Ready to give your business a voice?
          </p>
          <p className="text-blue-100 text-sm md:text-base mb-10 max-w-lg mx-auto leading-relaxed">
            From branded jingles to AI that answers calls, chats, and talks directly to your
            customers — sautii brings it all under one number, no studio or hardware required.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
            <Link
              to="/trial"
              className="inline-flex items-center gap-2 bg-white hover:bg-blue-50 text-blue-600 font-bold rounded-full px-8 py-3.5 text-sm transition-all hover:scale-105 w-full sm:w-auto justify-center"
            >
              Try it now
              <ArrowRight size={16} />
            </Link>
            <a
              href="tel:+255769350103"
              className="inline-flex items-center gap-2 border border-white/30 hover:bg-white/10 text-white font-semibold rounded-full px-8 py-3.5 text-sm transition-all w-full sm:w-auto justify-center"
            >
              <PhoneCall size={16} />
              Talk to our team
            </a>
          </div>

          <p className="text-blue-200 text-xs">
            No credit card required · Cancel anytime
          </p>
        </div>

      </div>

    </div>
  )
}

export default HomeLandingLayout