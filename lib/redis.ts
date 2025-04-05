import { Redis } from "@upstash/redis"

// Create a singleton Redis instance to be reused across the application
let redisInstance: Redis | null = null

export function getRedisInstance() {
  if (!redisInstance) {
    redisInstance = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL || "",
      token: process.env.UPSTASH_REDIS_REST_TOKEN || "",
    })
  }
  return redisInstance
}

// Static count that's updated only when needed
// This completely eliminates the need for frequent Redis calls
let STATIC_WAITLIST_COUNT = 100

// Function to get the waitlist count without making a Redis call
export function getStaticWaitlistCount() {
  return STATIC_WAITLIST_COUNT
}

// This function should only be called during registration or server startup
export async function updateWaitlistCount() {
  try {
    const redis = getRedisInstance()
    const count = await redis.scard("waitlist:emails")
    const actualCount = Number(count) || 0

    // Update the static count
    STATIC_WAITLIST_COUNT = Math.max(actualCount, 100)

    return STATIC_WAITLIST_COUNT
  } catch (error) {
    console.error("Error updating waitlist count:", error)
    return STATIC_WAITLIST_COUNT
  }
}

// Initialize the count at startup (this will run once when the server starts)
updateWaitlistCount().catch(console.error)

export async function addEmailToWaitlist(email: string) {
  try {
    const redis = getRedisInstance()

    // Check if email already exists - this is the only Redis call during registration
    const exists = await redis.sismember("waitlist:emails", email)
    if (exists) {
      return { success: true, alreadyExists: true }
    }

    // Add email to set
    await redis.sadd("waitlist:emails", email)

    // Update the static count after adding a new email
    await updateWaitlistCount()

    return { success: true, alreadyExists: false }
  } catch (error) {
    console.error("Error adding email to waitlist:", error)
    return { success: false, error }
  }
}

