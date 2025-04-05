"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

export default function WaitlistForm() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")

  const { ref: formRef, isVisible: formVisible } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.2,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Reset states
    setError("")

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address")
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setIsSubmitted(true)
      setEmail("")
    } catch (err) {
      setError("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="waitlist-form" className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={formRef}
          className={`max-w-md mx-auto bg-black/50 backdrop-blur-md p-8 rounded-xl border border-[#00FFC8]/10 hover:border-[#00FFC8]/30 transition-all ${
            formVisible ? "scale-up visible" : "scale-up"
          }`}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center">
            Join Our <span className="text-[#00FFC8]">Waitlist</span>
          </h2>

          {isSubmitted ? (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#00FFC8]/10 mb-4">
                <svg
                  className="w-8 h-8 text-[#00FFC8]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-white mb-2">Thank You!</h3>
              <p className="text-white/70">
                You've been added to our waitlist. We'll notify you when Onchain Watch is ready.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white/70 mb-1">
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-black/50 border-[#00FFC8]/20 focus:border-[#00FFC8] text-white"
                  required
                />
                {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
              </div>

              <Button
                type="submit"
                className="w-full bg-[#00FFC8] hover:bg-[#00FFC8]/90 text-black font-medium py-3 rounded-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Join Waitlist"
                )}
              </Button>

              <p className="text-xs text-center text-white/50 mt-4">
                We respect your privacy and will never share your information.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

