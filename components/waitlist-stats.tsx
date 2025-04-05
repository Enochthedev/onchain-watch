import { Redis } from "@upstash/redis"

// Initialize Upstash Redis
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || "",
  token: process.env.UPSTASH_REDIS_REST_TOKEN || "",
})

// Initial count to show for social proof
const INITIAL_COUNT = 100

export default async function WaitlistStats() {
  // Get waitlist count with fallback to 0
  let actualCount = 0

  try {
    // Try to get the count from Redis
    const redisCount = await redis.get("waitlist:count")
    actualCount = typeof redisCount === "number" ? redisCount : 0
  } catch (error) {
    console.error("Error fetching waitlist count:", error)
    // If there's an error, we'll use the default of 0
  }

  // Add the initial count to the actual count
  const displayCount = INITIAL_COUNT + actualCount

  // Format the count with commas
  const formattedCount = new Intl.NumberFormat().format(displayCount)

  return (
    <div className="text-center mt-2 mb-6">
      <div className="bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-[#00FFC8]/10 inline-flex items-center">
        <div className="text-white/80 text-sm">
          <span className="text-[#00FFC8] font-bold">{formattedCount}</span> people on the waitlist
        </div>
      </div>
    </div>
  )
}

