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
      title: {
        default: 'Stevin · Marketing intelligence die signalen geeft voor het maandrapport',
        template: '%s | Stevin.AI',
      },
      description: 'Stevin verbindt je marketing-stack en wijst aan waar omzet, marge of aandacht weglekt voor reguliere rapportage het oppikt. Voor bureaus en in-house marketing-teams.',
      openGraph: {
        type: 'website',
        locale: 'nl_NL',
        siteName: 'Stevin.AI',
        title: 'Stevin · Marketing intelligence die signalen geeft voor het maandrapport',
        description: 'Stevin verbindt je marketing-stack en wijst aan waar omzet, marge of aandacht weglekt voor reguliere rapportage het oppikt.',
        url: 'https://stevin.ai',
        images: [
          {
            url: '/opengraph-image',
            width: 1200,
            height: 630,
            alt: 'Stevin.AI — Marketing-intelligence voor paid en owned media.',
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Stevin · Marketing intelligence die signalen geeft voor het maandrapport',
        description: 'Stevin verbindt je marketing-stack en wijst aan waar omzet, marge of aandacht weglekt voor reguliere rapportage het oppikt.',
        images: ['/opengraph-image'],
      },
    }
  }

  return {
    metadataBase: new URL('https://stevin.ai'),
    title: {
      default: 'Stevin · Marketing intelligence that signals before the monthly report does',
      template: '%s | Stevin.AI',
    },
    description: 'Stevin connects your marketing stack and shows where revenue, margin or attention is leaking before regular reporting catches it. For agencies and in-house marketing teams.',
    openGraph: {
      type: 'website',
      locale: 'en_GB',
      siteName: 'Stevin.AI',
      title: 'Stevin · Marketing intelligence that signals before the monthly report does',
      description: 'Stevin connects your marketing stack and shows where revenue, margin or attention is leaking before regular reporting catches it.',
      url: 'https://stevin.ai/en',
      images: [
        {
          url: '/en/opengraph-image',
          width: 1200,
          height: 630,
          alt: 'Stevin · Marketing intelligence that signals before the monthly report does',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Stevin · Marketing intelligence that signals before the monthly report does',
      description: 'Stevin connects your marketing stack and shows where revenue, margin or attention is leaking before regular reporting catches it.',
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
