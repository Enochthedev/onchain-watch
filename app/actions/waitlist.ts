"use server"

import { Resend } from "resend"
import { Redis } from "@upstash/redis"
import { z } from "zod"
import { EmailTemplate } from "../email-template"
import { getWaitlistCount } from "@/components/waitlist-stats"

// Get API key from environment variable
const resendApiKey = process.env.RESEND_API_KEY

// Check if API key exists
if (!resendApiKey) {
  console.error("RESEND_API_KEY is not defined in environment variables")
}

// Initialize Resend with explicit API key
const resend = new Resend(resendApiKey || "")

// Initialize Upstash Redis
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || "",
  token: process.env.UPSTASH_REDIS_REST_TOKEN || "",
})

// Email validation schema
const emailSchema = z.string().email("Please enter a valid email address")

export async function registerForWaitlist(formData: FormData) {
  const email = formData.get("email") as string

  try {
    // Validate email
    emailSchema.parse(email)

    // Check if email already exists in waitlist
    const exists = await redis.sismember("waitlist:emails", email)
    if (exists) {
      return {
        success: true,
        message: "You are already on our waitlist. We'll notify you when we launch!",
        alreadyRegistered: true,
        count: await getWaitlistCount(),
        emailSent: false,
      }
    }

    // Add email to Redis set
    await redis.sadd("waitlist:emails", email)

    // Increment waitlist count
    await redis.incr("waitlist:count")

    // Get updated count
    const count = await getWaitlistCount()

    // Check if Resend API key is available before sending email
    if (!resendApiKey) {
      console.warn("Email not sent: RESEND_API_KEY is missing")
      return {
        success: true,
        message: "Thank you for joining our waitlist! We'll notify you when we launch.",
        emailSent: false,
        emailDetails: null,
        count,
      }
    }

    // Send confirmation email
    try {
      const emailResponse = await resend.emails.send({
        from: "Onchain Watch <onboarding@resend.dev",
        to: email,
        subject: "Welcome to the Onchain Watch Waitlist!",
        html: EmailTemplate({ email }),
      })

      console.log("Email sent successfully:", emailResponse)

      return {
        success: true,
        message: "Thank you for joining our waitlist! We'll notify you when we launch.",
        emailSent: true,
        emailDetails: {
          // The Resend API returns a data object with an id
          id: emailResponse.data?.id || "Confirmation sent",
          to: email,
          status: "Delivered",
        },
        count,
      }
    } catch (emailError) {
      console.error("Error sending email:", emailError)

      // Still return success for the waitlist registration
      return {
        success: true,
        message: "Thank you for joining our waitlist! We'll notify you when we launch.",
        emailSent: false,
        emailDetails: null,
        count,
      }
    }
  } catch (error) {
    console.error("Waitlist registration error:", error)

    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: error.errors[0].message,
        emailSent: false,
        emailDetails: null,
        count: await getWaitlistCount(),
      }
    }

    return {
      success: false,
      message: "Something went wrong. Please try again later.",
      emailSent: false,
      emailDetails: null,
      count: await getWaitlistCount(),
    }
  }
}

