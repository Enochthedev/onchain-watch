"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"

export default function Stats() {
  const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation<HTMLDivElement>()

  return (
    <section className="pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            className={`stats-card p-6 md:p-8 relative overflow-hidden ${
              statsVisible ? "slide-in-left visible" : "slide-in-left"
            }`}
          >
            <div className="flex flex-col relative z-10">
              <span className="text-4xl md:text-5xl font-bold text-white mb-2">24/7</span>
              <span className="text-[#00FFC8]/70">Monitoring</span>
            </div>
            <div className="absolute -right-4 -bottom-4 w-24 h-24">
              <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 0L40 20L20 40L0 20L20 0Z" fill="#00FFC8" fillOpacity="0.1" />
                <path d="M60 0L80 20L60 40L40 20L60 0Z" fill="#00FFC8" fillOpacity="0.1" />
                <path d="M100 0L120 20L100 40L80 20L100 0Z" fill="#00FFC8" fillOpacity="0.1" />
                <path d="M20 40L40 60L20 80L0 60L20 40Z" fill="#00FFC8" fillOpacity="0.1" />
                <path d="M60 40L80 60L60 80L40 60L60 40Z" fill="#00FFC8" fillOpacity="0.1" />
                <path d="M100 40L120 60L100 80L80 60L100 40Z" fill="#00FFC8" fillOpacity="0.1" />
                <path d="M20 80L40 100L20 120L0 100L20 80Z" fill="#00FFC8" fillOpacity="0.1" />
                <path d="M60 80L80 100L60 120L40 100L60 80Z" fill="#00FFC8" fillOpacity="0.1" />
                <path d="M100 80L120 100L100 120L80 100L100 80Z" fill="#00FFC8" fillOpacity="0.1" />
              </svg>
            </div>
          </div>

          <div
            className={`stats-card p-6 md:p-8 relative overflow-hidden ${statsVisible ? "fade-up visible" : "fade-up"}`}
            style={{ transitionDelay: "0.2s" }}
          >
            <div className="flex flex-col relative z-10">
              <span className="text-4xl md:text-5xl font-bold text-white mb-2">100+</span>
              <span className="text-[#00FFC8]/70">Blockchains</span>
            </div>
            <div className="absolute -right-4 -bottom-4 w-32 h-16">
              <svg width="100%" height="100%" viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M0 60L20 40L40 45L60 30L80 35L100 20L120 30"
                  stroke="#00FFC8"
                  strokeOpacity="0.2"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </div>

          <div
            className={`stats-card p-6 md:p-8 relative overflow-hidden ${
              statsVisible ? "slide-in-right visible" : "slide-in-right"
            }`}
            style={{ transitionDelay: "0.4s" }}
          >
            <div className="flex flex-col relative z-10">
              <span className="text-4xl md:text-5xl font-bold text-white mb-2">10K+</span>
              <span className="text-[#00FFC8]/70">Scams Detected</span>
            </div>
            <div className="absolute -right-4 -bottom-4 w-32 h-16 opacity-30">
              <svg width="100%" height="100%" viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0" y="50" width="10" height="10" fill="#00FFC8" fillOpacity="0.2" />
                <rect x="15" y="40" width="10" height="20" fill="#00FFC8" fillOpacity="0.2" />
                <rect x="30" y="30" width="10" height="30" fill="#00FFC8" fillOpacity="0.2" />
                <rect x="45" y="35" width="10" height="25" fill="#00FFC8" fillOpacity="0.2" />
                <rect x="60" y="25" width="10" height="35" fill="#00FFC8" fillOpacity="0.2" />
                <rect x="75" y="15" width="10" height="45" fill="#00FFC8" fillOpacity="0.2" />
                <rect x="90" y="5" width="10" height="55" fill="#00FFC8" fillOpacity="0.2" />
                <rect x="105" y="20" width="10" height="40" fill="#00FFC8" fillOpacity="0.2" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

