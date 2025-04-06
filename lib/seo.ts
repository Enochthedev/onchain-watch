export function generateSEO({
    title = "Onchain Watch - Real-Time Blockchain Monitoring",
    description = "Join the waitlist for Onchain Watch, your go-to tool for real-time blockchain monitoring, detecting scams, and ensuring crypto safety.",
    keywords = "Onchain Watch, blockchain monitoring, crypto security, scam detection, Ethereum, Solana, Polkadot, Bitcoin",
    url = "https://onchainwatch.vercel.app",
    image = "https://onchainwatch.vercel.app/onchain_watch.png", 
  }) {
    return `
      <title>${title}</title>
      <meta name="description" content="${description}" />
      <meta name="keywords" content="${keywords}" />
      <meta property="og:title" content="${title}" />
      <meta property="og:description" content="${description}" />
      <meta property="og:image" content="${image}" />
      <meta property="og:url" content="${url}" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="${title}" />
      <meta name="twitter:description" content="${description}" />
      <meta name="twitter:image" content="${image}" />
      <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Onchain Watch",
        "url": "${url}",
        "description": "${description}",
        "potentialAction": {
          "@type": "JoinAction",
          "target": "${url}/waitlist",
          "name": "Join Waitlist"
        }
      }
      </script>
    `;
}