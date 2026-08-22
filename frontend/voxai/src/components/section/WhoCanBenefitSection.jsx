// WhoCanBenefitSection.jsx
import { useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import BankImage from "../../assets/images/banks.jpg"
import BrokersImage from "../../assets/images/brokers.jpg"
import GovernmentImage from "../../assets/images/logistic.jpg"

const ImagesLinks = {
  BankImageLink: BankImage,
  BrokersImageLink: BrokersImage,
  GovernmentImageLink: GovernmentImage,
}

const audiences = [
  { title: "Telephone HQ", caption: "Automated call handling", imageSrc: ImagesLinks.BankImageLink },
  { title: "Universities", caption: "Announcements & IVR", imageSrc: ImagesLinks.BrokersImageLink },
  { title: "Developers", caption: "API-first voice integration", imageSrc: ImagesLinks.GovernmentImageLink },
  { title: "Banks", caption: "Compliance-ready voice", imageSrc: ImagesLinks.GovernmentImageLink },
  { title: "Shops", caption: "Branded audio ads", imageSrc: ImagesLinks.BrokersImageLink },
  { title: "Voice actors", caption: "AI-assisted narration", imageSrc: ImagesLinks.BrokersImageLink },
  { title: "Story creators", caption: "Narrated storytelling", imageSrc: ImagesLinks.BankImageLink },
  { title: "Motivational speakers", caption: "Speech-to-audio content", imageSrc: ImagesLinks.BankImageLink },
  { title: "Public speakers", caption: "Polished spoken content", imageSrc: ImagesLinks.BankImageLink },
]

function WhoCanBenefitSection() {
  const scrollRef = useRef(null)

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: direction * 370, behavior: "smooth" })
    }
  }

  return (
    <div className="max-w-6xl mx-auto mb-24">

      <p className="text-center text-slate-900 text-2xl font-bold mb-2">
        Who can benefit from sautii?
      </p>
      <p className="text-center text-slate-500 text-sm mb-10 max-w-xl mx-auto">
        Built for anyone who needs a voice — from businesses answering calls
        to creators telling stories.
      </p>

      <div className="relative">
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-2 px-1 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: "none" }}
        >
          {audiences.map(({ title, caption, imageSrc }) => (
            <div
              key={title}
              className="relative flex-shrink-0 w-80 h-[28rem] overflow-hidden snap-start group cursor-pointer"
            >
              <img
                src={imageSrc}
                alt={title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-7">
                <p className="text-white font-semibold text-xl mb-1.5">{title}</p>
                <p className="text-white/70 text-sm">{caption}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="hidden sm:flex justify-center gap-2 mt-6">
          <button
            onClick={() => scroll(-1)}
            className="w-9 h-9 flex items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 transition-colors"
            aria-label="Scroll left"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => scroll(1)}
            className="w-9 h-9 flex items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

    </div>
  )
}

export default WhoCanBenefitSection