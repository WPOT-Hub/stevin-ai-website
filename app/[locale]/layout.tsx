import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { JetBrains_Mono } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { GoogleTagManagerHead, GoogleTagManagerBody } from '@/components/GoogleTagManager'
import { MicrosoftClarity } from '@/components/MicrosoftClarity'
import { AnalyticsEvents } from '@/components/analytics/AnalyticsEvents'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import MainShell from '@/components/MainShell'
import ConsentBanner from '@/components/ConsentBanner'
import SiteJsonLd from '@/components/SiteJsonLd'

// Fonts staan hier (niet in de root-layout) zodat de root pass-through blijft en
// de hele site statisch geprerenderd kan worden. Paden zijn ../../ want deze
// layout zit een niveau dieper dan de oude root-layout.
const interDisplay = localFont({
  src: [
    { path: '../../public/fonts/InterDisplay-Medium.woff2', weight: '500', style: 'normal' },
    { path: '../../public/fonts/InterDisplay-SemiBold.woff2', weight: '600', style: 'normal' },
    { path: '../../public/fonts/InterDisplay-Bold.woff2', weight: '700', style: 'normal' },
    { path: '../../public/fonts/InterDisplay-ExtraBold.woff2', weight: '800', style: 'normal' },
    { path: '../../public/fonts/InterDisplay-Black.woff2', weight: '900', style: 'normal' },
  ],
  variable: '--font-display-inter',
  display: 'swap',
})

const interBody = localFont({
  src: [
    { path: '../../public/fonts/InterVariable.woff2', style: 'normal', weight: '100 900' },
    { path: '../../public/fonts/InterVariable-Italic.woff2', style: 'italic', weight: '100 900' },
  ],
  variable: '--font-body-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
})

interface Props {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params

  if (locale === 'nl') {
    return {
      metadataBase: new URL('https://stevin.ai'),
      alternates: { types: { 'application/rss+xml': 'https://stevin.ai/feed.xml' } },
      title: {
        default: 'Stevin · de AI-laag over je marketing en sales',
        template: '%s | Stevin.AI',
      },
      description: 'Stevin brengt je eigen marketingdata samen, ziet wat aandacht nodig heeft voordat je rapportage het oppikt en beweegt je campagnes mee. Jouw data blijft van jou. Marketing-intelligence voor bureaus, merken en in-house teams.',
      openGraph: {
        type: 'website',
        locale: 'nl_NL',
        siteName: 'Stevin.AI',
        title: 'Stevin · de AI-laag over je marketing en sales',
        description: 'Stevin brengt je eigen marketingdata samen, ziet wat aandacht nodig heeft en beweegt je campagnes mee. Jouw data blijft van jou.',
        url: 'https://stevin.ai',
        images: [
          {
            url: '/opengraph-image',
            width: 1200,
            height: 630,
            alt: 'Stevin.AI: de AI-laag over je marketing en sales.',
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Stevin · de AI-laag over je marketing en sales',
        description: 'Stevin brengt je eigen marketingdata samen, ziet wat aandacht nodig heeft en beweegt je campagnes mee. Jouw data blijft van jou.',
        images: ['/opengraph-image'],
      },
    }
  }

  return {
    metadataBase: new URL('https://stevin.ai'),
    title: {
      default: 'Stevin · the AI layer over your marketing and sales',
      template: '%s | Stevin.AI',
    },
    description: 'Your own data, your own marketing brain. Stevin sees what needs attention and moves your campaigns with it, on data that stays yours. For agencies, multi-location and multi-market businesses and in-house teams.',
    openGraph: {
      type: 'website',
      locale: 'en_GB',
      siteName: 'Stevin.AI',
      title: 'Stevin · the AI layer over your marketing and sales',
      description: 'Your own data, your own marketing brain. Stevin sees what needs attention and moves with it.',
      url: 'https://stevin.ai/en',
      images: [
        {
          url: '/en/opengraph-image',
          width: 1200,
          height: 630,
          alt: 'Stevin · the AI layer over your operation.',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Stevin · the AI layer over your operation',
      description: 'The AI layer over your operation. Results in marketing and sales first, then broader.',
      images: ['/en/opengraph-image'],
    },
  }
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params

  if (!routing.locales.includes(locale as 'nl' | 'en')) {
    notFound()
  }

  // Enable static rendering for this locale
  setRequestLocale(locale)

  const messages = await getMessages()

  return (
    <html lang={locale} className={`${interDisplay.variable} ${interBody.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen flex flex-col">
        <NextIntlClientProvider messages={messages} locale={locale}>
          <SiteJsonLd />
          <GoogleTagManagerHead />
          <GoogleTagManagerBody />
          <MicrosoftClarity />
          <AnalyticsEvents />
          <Header />
          <MainShell>
            {children}
          </MainShell>
          <Footer />
          <ConsentBanner />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
