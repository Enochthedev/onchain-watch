"use server"

import { Resend } from "resend"
import { z } from "zod"
import { EmailTemplate } from "../email-template"
import { addEmailToWaitlist, getStaticWaitlistCount } from "@/lib/redis"

// Get API key from environment variable
const resendApiKey = process.env.RESEND_API_KEY

// Check if API key exists
if (!resendApiKey) {
  console.error("RESEND_API_KEY is not defined in environment variables")
}

// Initialize Resend with explicit API key
const resend = new Resend(resendApiKey || "")

// Email validation schema
const emailSchema = z.string().email("Please enter a valid email address")

export async function registerForWaitlist(formData: FormData) {
  const email = formData.get("email") as string

  try {
    // Validate email
    emailSchema.parse(email)

    // Add email to waitlist using the centralized function
    const result = await addEmailToWaitlist(email)

    if (result.alreadyExists) {
      return {
        success: true,
        message: "You are already on our waitlist. We'll notify you when we launch!",
        alreadyRegistered: true,
        count: getStaticWaitlistCount(), // Use static count
        emailSent: false,
      }
    }

    if (!result.success) {
      throw new Error("Failed to add email to waitlist")
    }

    // Get the static count
    const count = getStaticWaitlistCount()

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
        from: "Onchain Watch <onboarding@resend.dev>",
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
        count: getStaticWaitlistCount(), // Use static count
      }
    }

    return {
      success: false,
      message: "Something went wrong. Please try again later.",
      emailSent: false,
      emailDetails: null,
      count: getStaticWaitlistCount(), // Use static count
    }
  }
}

