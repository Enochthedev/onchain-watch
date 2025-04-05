"use client"

import type React from "react"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"

export default function WaitlistStatsClient({ children }: { children: React.ReactNode }) {
  const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation<HTMLDivElement>()

  return (
    <div
      ref={statsRef}
      className={`mb-10 ${statsVisible ? "fade-up visible" : "fade-up"}`}
      style={{ transitionDelay: "0.7s" }}
    >
      {children}
    </div>
  )
}

