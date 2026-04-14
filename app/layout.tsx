import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ConsentBanner from '@/components/ConsentBanner'
import { GoogleTagManagerHead, GoogleTagManagerBody } from '@/components/GoogleTagManager'

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
