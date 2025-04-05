import Header from "@/components/header"
import Hero from "@/components/hero"
import About from "@/components/about"
import WaitlistForm from "@/components/waitlist-form"
import Stats from "@/components/stats"
import Footer from "@/components/footer"
import WaitlistStats from "@/components/waitlist-stats"
import WaitlistStatsClient from "@/components/waitlist-stats-client"
import { Suspense } from "react"

export default function Home() {
  return (
    <>
      <div className="grid-background">
        <Header />
        <main>
          <Hero />
          <Suspense
            fallback={
              <WaitlistStatsClient>
                <div className="text-center mt-2 mb-6">
                  <div className="bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-[#00FFC8]/10 inline-flex items-center">
                    <div className="text-white/80 text-sm">
                      <span className="text-[#00FFC8] font-bold">100</span> people on the waitlist
                    </div>
                  </div>
                </div>
              </WaitlistStatsClient>
            }
          >
            <WaitlistStatsClient>
              <WaitlistStats />
            </WaitlistStatsClient>
          </Suspense>
          <Stats />
          <About />
          <WaitlistForm />
        </main>
      </div>
      <Footer />
    </>
  )
}

