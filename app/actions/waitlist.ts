"use server"

import { Resend } from "resend"
import { Redis } from "@upstash/redis"
import { z } from "zod"

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
      }
    }

    // Add email to Redis set
    await redis.sadd("waitlist:emails", email)

    // Increment waitlist count
    await redis.incr("waitlist:count")

    // Check if Resend API key is available before sending email
    if (!resendApiKey) {
      console.warn("Email not sent: RESEND_API_KEY is missing")
      return {
        success: true,
        message: "Thank you for joining our waitlist! We'll notify you when we launch.",
        emailSent: false,
        emailDetails: null,
      }
    }

    // Send confirmation email
    const emailResponse = await resend.emails.send({
      from: "Onchain Watch <noreply@onchainwatch.com>",
      to: email,
      subject: "Welcome to the Onchain Watch Waitlist!",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #1A2E40; margin-top: 40px;">Welcome to Onchain Watch!</h1>
          <p>Thank you for joining our waitlist. We're building the most comprehensive blockchain monitoring tool to help you navigate the crypto space safely.</p>
          <p>We'll notify you as soon as we launch.</p>
          <div style="margin: 40px 0; padding: 20px; background-color: #f8f9fa; border-radius: 5px;">
            <p style="margin: 0; color: #6c757d;">Stay safe in the blockchain ecosystem with real-time monitoring and alerts.</p>
          </div>
          <p>The Onchain Watch Team</p>
        </div>
      `,
    })

    return {
      success: true,
      message: "Thank you for joining our waitlist! We'll notify you when we launch.",
      emailSent: true,
      emailDetails: emailResponse,
    }
  } catch (error) {
    console.error("Waitlist registration error:", error)

    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: error.errors[0].message,
        emailSent: false,
        emailDetails: null,
      }
    }

    return {
      success: false,
      message: "Something went wrong. Please try again later.",
      emailSent: false,
      emailDetails: null,
    }
  }
}

