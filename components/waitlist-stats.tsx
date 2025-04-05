import { getStaticWaitlistCount } from "@/lib/redis"

export default function WaitlistStats() {
  // Use the static count that doesn't require a Redis call
  const count = getStaticWaitlistCount()

  // Format the count with commas
  const formattedCount = new Intl.NumberFormat().format(count)

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

