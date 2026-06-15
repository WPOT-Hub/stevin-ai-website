import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { JetBrains_Mono } from 'next/font/google'
import { getLocale } from 'next-intl/server'
import './globals.css'

// Self-hosted InterDisplay (display headings), from Stevin Design System
const interDisplay = localFont({
  src: [
    { path: '../public/fonts/InterDisplay-Medium.woff2', weight: '500', style: 'normal' },
    { path: '../public/fonts/InterDisplay-SemiBold.woff2', weight: '600', style: 'normal' },
    { path: '../public/fonts/InterDisplay-Bold.woff2', weight: '700', style: 'normal' },
    { path: '../public/fonts/InterDisplay-ExtraBold.woff2', weight: '800', style: 'normal' },
    { path: '../public/fonts/InterDisplay-Black.woff2', weight: '900', style: 'normal' },
  ],
  variable: '--font-display-inter',
  display: 'swap',
})

// Self-hosted Inter (body, variable weight)
const interBody = localFont({
  src: [
    { path: '../public/fonts/InterVariable.woff2', style: 'normal', weight: '100 900' },
    { path: '../public/fonts/InterVariable-Italic.woff2', style: 'italic', weight: '100 900' },
  ],
  variable: '--font-body-inter',
  display: 'swap',
})

// JetBrains Mono via next/font/google (bundled, no runtime CDN)
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://stevin.ai'),
  verification: {
    google: 'ItP2M9E-39xqD9M8dKV_qAwtizunWFlIH1pnw4E5p10',
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const locale = await getLocale()

  return (
    <html lang={locale} className={`${interDisplay.variable} ${interBody.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  )
}
