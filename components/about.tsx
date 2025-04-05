"use client"

import { CheckCircle } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

export default function About() {
  const features = [
    {
      title: "Real-Time Monitoring",
      description: "Stay updated with blockchain activities.",
    },
    {
      title: "AI-Powered Alerts",
      description: "Get notified of suspicious transactions.",
    },
    {
      title: "Community-Driven Reporting",
      description: "Verified by users, for users.",
    },
  ]

  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation<HTMLDivElement>()
  const { ref: featuresRef, isVisible: featuresVisible } = useScrollAnimation<HTMLDivElement>()

  return (
    <section id="about" className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={titleRef}
          className={`max-w-3xl mx-auto text-center mb-12 ${titleVisible ? "fade-up visible" : "fade-up"}`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            About <span className="text-[#00FFC8]">Onchain Watch</span>
          </h2>
          <p className="text-lg text-white/70">
            We're building the most comprehensive blockchain monitoring tool to help you navigate the crypto space
            safely.
          </p>
        </div>

        <div ref={featuresRef} className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`bg-black/50 backdrop-blur-md p-6 rounded-xl border border-[#00FFC8]/10 hover:border-[#00FFC8]/30 transition-all stagger-item ${
                featuresVisible ? "visible" : ""
              }`}
            >
              <div className="flex items-start mb-4">
                <CheckCircle className="h-6 w-6 text-[#00FFC8] mr-2 flex-shrink-0" />
                <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
              </div>
              <p className="text-white/70">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

