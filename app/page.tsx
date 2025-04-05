import Header from "@/components/header"
import Hero from "@/components/hero"
import About from "@/components/about"
import WaitlistForm from "@/components/waitlist-form"
import Stats from "@/components/stats"
import Footer from "@/components/footer"

// Use static rendering to eliminate unnecessary Redis calls
export const dynamic = "force-static"
export const revalidate = 3600 // Revalidate at most once per hour

export default function Home() {
  return (
    <>
      <div className="grid-background">
        <Header />
        <main>
          <Hero />
          <Stats />
          <About />
          <WaitlistForm />
        </main>
      </div>
      <Footer />
    </>
  )
}

