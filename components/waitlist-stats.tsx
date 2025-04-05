import { Redis } from "@upstash/redis"

// Initialize Upstash Redis
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || "",
  token: process.env.UPSTASH_REDIS_REST_TOKEN || "",
})

// Minimum count to show for social proof
const MIN_DISPLAY_COUNT = 100

// Function to get the waitlist count
export async function getWaitlistCount() {
  try {
    const count = await redis.scard("waitlist:emails")
    return Number(count) || 0
  } catch {
    return 0
  }
}

export default async function WaitlistStats() {
  // Get actual count
  const actualCount = await getWaitlistCount()

  // Use the actual count or the minimum, whichever is higher
  const displayCount = Math.max(actualCount, MIN_DISPLAY_COUNT)

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

