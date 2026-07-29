import { useEffect, useState } from "react"
import { Zap } from "lucide-react"
import PromptBox from "../section/JingleForm"

const phrases = [
  "in a few seconds.",
  "to grow your brand.",
  "to reach more customers.",
  "to sound unforgettable.",
]

function useTypewriter(phrases) {
  const [text, setText] = useState("")
  const [pi, setPi] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const phrase = phrases[pi]
    const speed = deleting ? 30 : 50

    const timeout = setTimeout(() => {
      if (!deleting) {
        setText(phrase.slice(0, text.length + 1))
        if (text.length + 1 === phrase.length) setTimeout(() => setDeleting(true), 2000)
      } else {
        setText(phrase.slice(0, text.length - 1))
        if (text.length - 1 === 0) {
          setDeleting(false)
          setPi((p) => (p + 1) % phrases.length)
        }
      }
    }, speed)

    return () => clearTimeout(timeout)
  }, [text, deleting, pi, phrases])

  return text
}

function TrialPromptSectionLayout() {
  const typed = useTypewriter(phrases)

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col items-center px-6 pt-24 pb-16">

      <h1 className="text-slate-900 text-5xl font-black text-center leading-tight mb-3">
        Make professional jingles
      </h1>
      <h2 className="text-blue-600 text-5xl font-black text-center min-h-[60px] mb-6">
        {typed}<span className="animate-pulse">|</span>
      </h2>

      <p className="text-slate-500 text-sm text-center mb-10 leading-relaxed">
        Start with a simple prompt — your next track is just a step away.
      </p>

      <PromptBox />

    </div>
  )
}

export default TrialPromptSectionLayout