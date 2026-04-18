import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import MainShell from '@/components/MainShell'
import ConsentBanner from '@/components/ConsentBanner'
import { GoogleTagManagerHead, GoogleTagManagerBody } from '@/components/GoogleTagManager'

// Self-hosted InterDisplay (display headings) — from Stevin Design System
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
  title: {
    default: 'Stevin.AI — Heers over je data. Stop de ruis.',
    template: '%s | Stevin.AI',
  },
  description: 'Stevin is de intelligente datalaag die versnipperde signalen omzet in actie. Voor agencies, inhouse teams, promotoren en artiesten. 220+ integraties, AI-analyses en 24/7 monitoring.',
  metadataBase: new URL('https://stevin.ai'),
  verification: {
    google: 'ItP2M9E-39xqD9M8dKV_qAwtizunWFlIH1pnw4E5p10',
  },
  openGraph: {
    type: 'website',
    locale: 'nl_NL',
    siteName: 'Stevin.AI',
    title: 'Stevin.AI — Heers over je data. Stop de ruis.',
    description: 'De intelligente datalaag voor agencies, promotoren en artiesten. 220+ integraties, AI-analyses en 24/7 monitoring.',
    url: 'https://stevin.ai',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stevin.AI — Heers over je data. Stop de ruis.',
    description: 'De intelligente datalaag voor agencies, promotoren en artiesten. 220+ integraties, AI-analyses en 24/7 monitoring.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="nl" className={`${interDisplay.variable} ${interBody.variable} ${jetbrainsMono.variable}`}>
      <head>
        <GoogleTagManagerHead />
      </head>
      <body className="min-h-screen flex flex-col">
        <GoogleTagManagerBody />
        <Header />
        <MainShell>
          {children}
        </MainShell>
        <Footer />
        <ConsentBanner />
      </body>
    </html>
  )
}
