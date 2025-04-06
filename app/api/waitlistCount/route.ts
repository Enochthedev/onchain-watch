// app/api/waitlistCount/route.ts
import { NextResponse } from "next/server"
import { getStaticWaitlistCount } from "@/lib/redis"

export async function GET() {
  try {
    const count = await getStaticWaitlistCount()
    return NextResponse.json({ count })
  } catch (error) {
    console.error("Error fetching waitlist count:", error)
    return NextResponse.json({ error: "Failed to fetch waitlist count" }, { status: 500 })
  }
}