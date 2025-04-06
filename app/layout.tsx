import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { generateSEO } from "@/lib/seo";
import "./globals.css"
import { Providers } from "./providers"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Onchain Watch - Real-Time Blockchain Monitoring",
  description:
    "Stay safe onchain with real-time monitoring of blockchain activities, AI-powered alerts, and community-driven reporting.",
  icons: {
    icon: "/favicon.svg",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head dangerouslySetInnerHTML={{ __html: generateSEO({}) }}/>
      <body className={`${inter.className} bg-black`}>
        <Providers>
          <div id="root-layout">{children}</div>
        </Providers>
      </body>
    
    </html>
  )
}

