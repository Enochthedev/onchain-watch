"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Send } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { FaDiscord } from "react-icons/fa"
import WaitlistStatsStatic from "./waitlist-stats-static"

export default function Hero() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation<HTMLHeadingElement>()
  const { ref: subtitleRef, isVisible: subtitleVisible } = useScrollAnimation<HTMLHeadingElement>()
  const { ref: descRef, isVisible: descVisible } = useScrollAnimation<HTMLParagraphElement>()
  const { ref: buttonsRef, isVisible: buttonsVisible } = useScrollAnimation<HTMLDivElement>()
  const { ref: socialRef, isVisible: socialVisible } = useScrollAnimation<HTMLDivElement>()
  const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation<HTMLDivElement>()

  return (
    <section className="py-24 md:py-32 lg:py-40 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <h1
            ref={titleRef}
            className={`text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 glow-text ${
              titleVisible ? "fade-in visible" : "fade-in"
            }`}
          >
            Stay Safe <span className="text-[#00FFC8]">Onchain</span>
          </h1>

          <h2
            ref={subtitleRef}
            className={`text-3xl md:text-4xl lg:text-5xl font-bold text-white/90 mb-8 ${
              subtitleVisible ? "fade-up visible" : "fade-up"
            }`}
            style={{ transitionDelay: "0.2s" }}
          >
            Real-Time Blockchain Monitoring
          </h2>

          <p
            ref={descRef}
            className={`text-lg md:text-xl text-white/70 max-w-2xl mb-10 ${
              descVisible ? "fade-up visible" : "fade-up"
            }`}
            style={{ transitionDelay: "0.4s" }}
          >
            Onchain Watch helps detect scams, fake betting ads, and fraudulent transactions on Ethereum, Solana,
            Polkadot, and Bitcoin.
          </p>

          <div
            ref={buttonsRef}
            className={`flex flex-col sm:flex-row gap-4 mb-8 ${buttonsVisible ? "fade-up visible" : "fade-up"}`}
            style={{ transitionDelay: "0.6s" }}
          >
            <Button
              className="bg-[#00FFC8] hover:bg-[#00FFC8]/90 text-black font-medium px-8 py-6 rounded-full text-lg"
              onClick={() => document.getElementById("waitlist-form")?.scrollIntoView({ behavior: "smooth" })}
            >
              Join Waitlist
            </Button>

            <Button
              variant="outline"
              className="border-[#00FFC8]/30 hover:bg-[#00FFC8]/10 text-[#00FFC8] font-medium px-8 py-6 rounded-full text-lg"
            >
              Learn More <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          <div
            ref={statsRef}
            className={`mb-10 ${statsVisible ? "fade-up visible" : "fade-up"}`}
            style={{ transitionDelay: "0.7s" }}
          >
            <WaitlistStatsStatic />
          </div>

          <div
            ref={socialRef}
            className={`flex gap-4 ${socialVisible ? "fade-up visible" : "fade-up"}`}
            style={{ transitionDelay: "0.8s" }}
          >
            <a
              href="https://t.me"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black/50 hover:bg-[#00FFC8]/10 p-3 rounded-full border border-[#00FFC8]/20 transition-all"
            >
              <Send className="h-6 w-6 text-[#00FFC8]" />
            </a>

            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black/50 hover:bg-[#00FFC8]/10 p-3 rounded-full border border-[#00FFC8]/20 transition-all"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-[#00FFC8]"
              >
                <path
                  d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
                  fill="currentColor"
                />
              </svg>
            </a>

            <a
              href="https://discord.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black/50 hover:bg-[#00FFC8]/10 p-3 rounded-full border border-[#00FFC8]/20 transition-all"
            >
              <FaDiscord className="h-6 w-6 text-[#00FFC8]" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

