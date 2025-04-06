import { Redis } from "@upstash/redis"

let redisInstance: Redis | null = null

export function getRedisInstance() {
  if (!redisInstance) {
    redisInstance = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL || "",
      token: process.env.UPSTASH_REDIS_REST_TOKEN || "",
    })
    console.log("Redis instance created")
  }
  return redisInstance
}

let STATIC_WAITLIST_COUNT = 0

export function getStaticWaitlistCount() {
  console.log("Getting static waitlist count:", STATIC_WAITLIST_COUNT)
  return STATIC_WAITLIST_COUNT < 100 ? STATIC_WAITLIST_COUNT + 100 : STATIC_WAITLIST_COUNT
}

export async function updateWaitlistCount() {
  try {
    const redis = getRedisInstance()
    const count = await redis.scard("waitlist:emails")
    const actualCount = Number(count) || 0

    STATIC_WAITLIST_COUNT = actualCount
    console.log("Updated waitlist count:", STATIC_WAITLIST_COUNT)

    return getStaticWaitlistCount()
  } catch (error) {
    console.error("Error updating waitlist count:", error)
    return getStaticWaitlistCount()
  }
}

// Call the update function immediately during module loading
(async () => {
  console.log("Initializing waitlist count...")
  await updateWaitlistCount()
})().catch(console.error)

export async function addEmailToWaitlist(email: string) {
  try {
    const redis = getRedisInstance()

    // Check if email already exists
    const exists = await redis.sismember("waitlist:emails", email)
    if (exists) {
      return { success: true, alreadyExists: true }
    }

    // Add email and update count
    await redis.sadd("waitlist:emails", email)
    await updateWaitlistCount()

    return { success: true, alreadyExists: false }
  } catch (error) {
    console.error("Error adding email to waitlist:", error)
    return { success: false, error }
  }
}