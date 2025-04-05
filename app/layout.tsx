import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Onchain Watch - Real-Time Blockchain Monitoring",
  description:
    "Stay safe onchain with real-time monitoring of blockchain activities, AI-powered alerts, and community-driven reporting.",
  icons: {
    icon: "/favicon.svg",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-black`}>
        <div id="root-layout">{children}</div>
      </body>
    </html>
  )
}



import './globals.css'