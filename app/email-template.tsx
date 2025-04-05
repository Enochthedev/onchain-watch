interface EmailTemplateProps {
  email: string
}

export function EmailTemplate({ email }: EmailTemplateProps) {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Welcome to Onchain Watch Waitlist</title>
      </head>
      <body style="font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif; line-height: 1.5; padding: 20px; background-color: #0a0a0a;">
        <div style="max-width: 560px; margin: 0 auto; background-color: #111111; border-radius: 12px; padding: 32px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5); border: 1px solid rgba(0, 255, 200, 0.2);">
          <div style="text-align: center; margin-bottom: 24px;">
            <img src="https://onchainwatch.com/logo-dark.svg" alt="Onchain Watch Logo" style="height: 40px; width: auto;">
          </div>
          
          <h1 style="color: #ffffff; font-size: 24px; margin-bottom: 16px; text-align: center;">Welcome to the Onchain Watch Waitlist!</h1>
          
          <div style="background-color: rgba(0, 0, 0, 0.3); border-radius: 8px; padding: 20px; margin-bottom: 24px; border: 1px solid rgba(0, 255, 200, 0.1);">
            <p style="color: #e0e0e0; font-size: 16px; margin-bottom: 0;">
              Thank you for joining our waitlist. We've received your email address (<span style="color: #00FFC8; font-weight: 500;">${email}</span>) and will keep you updated on our progress.
            </p>
          </div>
          
          <p style="color: #cccccc; font-size: 16px; margin-bottom: 24px;">
            We're building the most comprehensive blockchain monitoring tool to help you navigate the crypto space safely. Stay tuned for updates on our launch!
          </p>
          
          <div style="background-color: rgba(0, 255, 200, 0.05); border-radius: 8px; padding: 16px; margin-bottom: 24px;">
            <h2 style="color: #00FFC8; font-size: 18px; margin-top: 0; margin-bottom: 8px;">What to expect:</h2>
            <ul style="color: #cccccc; padding-left: 20px; margin: 0;">
              <li style="margin-bottom: 8px;">Real-time blockchain monitoring</li>
              <li style="margin-bottom: 8px;">AI-powered alerts for suspicious activities</li>
              <li style="margin-bottom: 8px;">Community-driven reporting system</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin-top: 32px;">
            <div style="display: inline-block; margin: 0 8px;">
              <a href="https://t.me" style="color: #00FFC8; text-decoration: none;">Telegram</a>
            </div>
            <div style="display: inline-block; margin: 0 8px;">
              <a href="https://x.com" style="color: #00FFC8; text-decoration: none;">X (Twitter)</a>
            </div>
            <div style="display: inline-block; margin: 0 8px;">
              <a href="https://discord.com" style="color: #00FFC8; text-decoration: none;">Discord</a>
            </div>
          </div>
          
          <p style="color: #888888; font-size: 14px; text-align: center; margin-top: 32px; margin-bottom: 0;">
            &copy; ${new Date().getFullYear()} Onchain Watch. All rights reserved.
          </p>
        </div>
      </body>
    </html>
  `
}

