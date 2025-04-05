"use client"

import type React from "react"

import { useState, useEffect, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, CheckCircle, Mail, AlertCircle } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { registerForWaitlist } from "@/app/actions/waitlist"
import { toast } from "sonner"

export default function WaitlistForm() {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)
  const [emailDetails, setEmailDetails] = useState<any>(null)
  const [emailSent, setEmailSent] = useState(false)
  const [userEmail, setUserEmail] = useState("")
  const [isPending, startTransition] = useTransition()

  const { ref: formRef, isVisible: formVisible } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.2,
  })

  useEffect(() => {
    if (isSuccess && message) {
      toast.success(message, {
        duration: 5000,
      })
    } else if (!isSuccess && message) {
      toast.error(message, {
        duration: 5000,
      })
    }
  }, [isSuccess, message])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Reset message
    setMessage("")
    setEmailDetails(null)

    // Basic client-side validation
    if (!email || !email.includes("@")) {
      setMessage("Please enter a valid email address")
      setIsSuccess(false)
      return
    }

    // Store the email for display purposes
    const submittedEmail = email
    setUserEmail(submittedEmail)

    const formData = new FormData()
    formData.append("email", email)

    startTransition(async () => {
      try {
        const result = await registerForWaitlist(formData)

        setIsSuccess(result.success)
        setMessage(result.message)
        setEmailSent(result.emailSent || false)
        setEmailDetails(result.emailDetails)

        if (result.success) {
          setEmail("")

          // Add a slight delay before refreshing to allow the user to see the success message
          setTimeout(() => {
            // Use window.location.reload() to refresh the page and update the count
            window.location.reload()
          }, 3000)
        }
      } catch (error) {
        console.error("Error submitting form:", error)
        setIsSuccess(false)
        setMessage("Something went wrong. Please try again.")
        setEmailSent(false)
        setEmailDetails(null)
      }
    })
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

          {isSuccess && message ? (
            <div className="text-center py-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#00FFC8]/10 mb-4">
                <CheckCircle className="w-8 h-8 text-[#00FFC8]" />
              </div>
              <h3 className="text-xl font-medium text-white mb-2">Thank You!</h3>
              <p className="text-white/70 mb-4">{message}</p>

              {emailSent && (
                <div className="mt-6 bg-black/30 p-4 rounded-lg border border-[#00FFC8]/10 text-left">
                  <div className="flex items-center mb-3">
                    <Mail className="h-5 w-5 text-[#00FFC8] mr-2" />
                    <h4 className="text-white font-medium">Email Confirmation Sent</h4>
                  </div>
                  <div className="text-sm text-white/70 space-y-2">
                    <p>
                      <span className="text-white/50">ID:</span> {emailDetails?.id || "Confirmation sent"}
                    </p>
                    <p>
                      <span className="text-white/50">To:</span> {userEmail || "your email"}
                    </p>
                    <p>
                      <span className="text-white/50">Status:</span> <span className="text-green-400">Delivered</span>
                    </p>
                  </div>
                </div>
              )}

              {!emailSent && (
                <div className="mt-6 bg-black/30 p-4 rounded-lg border border-[#00FFC8]/10 text-left">
                  <div className="flex items-center mb-2">
                    <AlertCircle className="h-5 w-5 text-yellow-500 mr-2" />
                    <h4 className="text-white font-medium">Email Notification</h4>
                  </div>
                  <p className="text-sm text-white/70">
                    Your registration was successful, but the confirmation email could not be sent at this time. Don't
                    worry, you're still on our waitlist!
                  </p>
                </div>
              )}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex overflow-hidden rounded-xl bg-white/5 p-1 ring-1 ring-[#00FFC8]/20 focus-within:ring-2 focus-within:ring-[#00FFC8]">
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border-0 bg-transparent text-white placeholder:text-gray-400 focus:ring-0 focus:border-transparent focus-visible:border-transparent focus:outline-none active:ring-0 active:outline-none focus-visible:ring-0 focus-visible:outline-none active:border-transparent focus-visible:ring-offset-0"
                  required
                  disabled={isPending}
                />
                <Button
                  type="submit"
                  className="bg-[#00FFC8] hover:bg-[#00FFC8]/90 text-black font-medium rounded-lg w-[120px]"
                  disabled={isPending}
                >
                  {isPending ? <Loader2 className="h-5 w-5 animate-spin" /> : "Join Now"}
                </Button>
              </div>

              {!isSuccess && message && <p className="mt-1 text-sm text-red-400">{message}</p>}

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

