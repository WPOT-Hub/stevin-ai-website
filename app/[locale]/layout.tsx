import type { Metadata } from 'next'
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
        default: 'Stevin · de AI-laag over je operatie',
        template: '%s | Stevin.AI',
      },
      description: 'De AI-laag over je operatie. Eerst resultaat in marketing en sales, daarna breder. Voor agencies, multi-vestiging en multi-market bedrijven en in-house teams.',
      openGraph: {
        type: 'website',
        locale: 'nl_NL',
        siteName: 'Stevin.AI',
        title: 'Stevin · de AI-laag over je operatie',
        description: 'De AI-laag over je operatie. Eerst resultaat in marketing en sales, daarna breder.',
        url: 'https://stevin.ai',
        images: [
          {
            url: '/opengraph-image',
            width: 1200,
            height: 630,
            alt: 'Stevin.AI: de AI-laag over je operatie.',
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Stevin · de AI-laag over je operatie',
        description: 'De AI-laag over je operatie. Eerst resultaat in marketing en sales, daarna breder.',
        images: ['/opengraph-image'],
      },
    }
  }

  return {
    metadataBase: new URL('https://stevin.ai'),
    title: {
      default: 'Stevin · the AI layer over your operation',
      template: '%s | Stevin.AI',
    },
    description: 'The AI layer over your operation. Results in marketing and sales first, then broader. For agencies, multi-location and multi-market businesses and in-house teams.',
    openGraph: {
      type: 'website',
      locale: 'en_GB',
      siteName: 'Stevin.AI',
      title: 'Stevin · the AI layer over your operation',
      description: 'The AI layer over your operation. Results in marketing and sales first, then broader.',
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
  )
}
