import Header from "@/components/header"
import Hero from "@/components/hero"
import About from "@/components/about"
import WaitlistForm from "@/components/waitlist-form"
import Stats from "@/components/stats"
import Footer from "@/components/footer"

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

