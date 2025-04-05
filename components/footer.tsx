"use client"

import Link from "next/link"
import { MessageSquare, Send} from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { FaDiscord } from "react-icons/fa"

export default function Footer() {
  const { ref: footerRef, isVisible: footerVisible } = useScrollAnimation<HTMLElement>()

  return (
    <footer id="contact" ref={footerRef} className={`footer py-12 ${footerVisible ? "fade-in visible" : "fade-in"}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className={`stagger-item ${footerVisible ? "visible" : ""}`}>
            <h3 className="footer-heading text-xl mb-4">Onchain Watch</h3>
            <p className="text-white/80 text-sm">
              Stay safe in the blockchain ecosystem with real-time monitoring and alerts.
            </p>
          </div>

          <div className={`stagger-item ${footerVisible ? "visible" : ""}`}>
            <h3 className="footer-heading text-xl mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <Link
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link bg-black/50 hover:bg-[#00FFC8]/10 p-3 rounded-full border border-[#00FFC8]/20 transition-all"
              >
                <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-[#00FFC8]"
              >
                <path
                  d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
                  fill="currentColor"
                />
              </svg>
                <span className="sr-only">X (Twitter)</span>
              </Link>
              <Link
                href="https://discord.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link bg-black/50 hover:bg-[#00FFC8]/10 p-3 rounded-full border border-[#00FFC8]/20 transition-all"
              >
               <FaDiscord className="h-6 w-6 text-[#00FFC8]" />
                <span className="sr-only">Discord</span>
              </Link>
              <Link
                href="https://t.me"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link bg-black/50 hover:bg-[#00FFC8]/10 p-3 rounded-full border border-[#00FFC8]/20 transition-all"
              >
               <Send className="h-6 w-6 text-[#00FFC8]" />
                <span className="sr-only">Discord</span>
              </Link>
            </div>
          </div>

          <div className={`stagger-item ${footerVisible ? "visible" : ""}`}>
            <h3 className="footer-heading text-xl mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="footer-link">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="footer-link">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <hr className="footer-divider" />

        <div
          className={`text-center footer-copyright ${footerVisible ? "fade-up visible" : "fade-up"}`}
          style={{ transitionDelay: "0.4s" }}
        >
          <p>&copy; {new Date().getFullYear()} Onchain Watch. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

