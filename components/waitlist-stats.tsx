import { useEffect, useState } from "react"

export default function WaitlistStats() {
  const [count, setCount] = useState<number>(100)

  useEffect(() => {
    async function fetchWaitlistCount() {
      try {
        const response = await fetch("/api/waitlistCount")
        const data = await response.json()
        console.log("Fetched waitlist count:", data.count)
        
        // If the count is less than 100, display "100+"
        if (data.count < 100) {
          setCount(100) // This ensures it shows "100+"
        } else {
          setCount(data.count)
        }
      } catch (error) {
        console.error("Error fetching waitlist count:", error)
      }
    }

    fetchWaitlistCount()
  }, [])

  // Format the count for display
  const formattedCount = count < 100 ? "100+" : new Intl.NumberFormat().format(count)

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