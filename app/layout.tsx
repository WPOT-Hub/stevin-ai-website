import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ConsentBanner from '@/components/ConsentBanner'
import { GoogleTagManagerHead, GoogleTagManagerBody } from '@/components/GoogleTagManager'

export const metadata: Metadata = {
  title: {
    default: 'Stevin.AI — Marketing met AI waar het versnelt',
    template: '%s | Stevin.AI',
  },
  description: 'Meer leads. Betere opvolging. Minder waste. Stevin.AI verbetert de volledige route van klik tot klant. Geen marge op je mediabudget.',
  metadataBase: new URL('https://stevin.ai'),
  openGraph: {
    type: 'website',
    locale: 'nl_NL',
    siteName: 'Stevin.AI',
    title: 'Stevin.AI — Jij focust op je business. Wij regelen je marketing.',
    description: 'Google Ads, SEO, social media en automation — vanaf €950 p/m. Dedicated specialist, geen marge op mediabudget.',
    url: 'https://stevin.ai',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stevin.AI — Jij focust op je business. Wij regelen je marketing.',
    description: 'Google Ads, SEO, social media en automation — vanaf €950 p/m. Dedicated specialist, geen marge op mediabudget.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="nl">
      <head>
        <GoogleTagManagerHead />
      </head>
      <body className="min-h-screen flex flex-col">
        <GoogleTagManagerBody />
        <Header />
        <main className="flex-1 pt-[72px]">
          {children}
        </main>
        <Footer />
        <ConsentBanner />
      </body>
    </html>
  )
}
