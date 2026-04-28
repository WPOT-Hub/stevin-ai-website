import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { GoogleTagManagerHead, GoogleTagManagerBody } from '@/components/GoogleTagManager'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import MainShell from '@/components/MainShell'
import ConsentBanner from '@/components/ConsentBanner'

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
        default: 'Stevin.AI — Heers over je data. Stop de ruis.',
        template: '%s | Stevin.AI',
      },
      description: 'Stevin is de intelligente datalaag die versnipperde signalen omzet in actie. Voor agencies, inhouse teams, promotoren en artiesten. 245+ integraties, AI-analyses en 24/7 monitoring.',
      openGraph: {
        type: 'website',
        locale: 'nl_NL',
        siteName: 'Stevin.AI',
        title: 'Stevin.AI — Heers over je data. Stop de ruis.',
        description: 'De intelligente datalaag voor agencies, promotoren en artiesten. 245+ integraties, AI-analyses en 24/7 monitoring.',
        url: 'https://stevin.ai',
        images: [
          {
            url: '/opengraph-image',
            width: 1200,
            height: 630,
            alt: 'Stevin.AI — Wonder en is gheen wonder.',
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Stevin.AI — Heers over je data. Stop de ruis.',
        description: 'De intelligente datalaag voor agencies, promotoren en artiesten. 245+ integraties, AI-analyses en 24/7 monitoring.',
        images: ['/opengraph-image'],
      },
      alternates: {
        canonical: 'https://stevin.ai',
        languages: {
          nl: 'https://stevin.ai',
          en: 'https://stevin.ai/en',
        },
      },
    }
  }

  return {
    metadataBase: new URL('https://stevin.ai'),
    title: {
      default: 'Stevin.AI — Signals tell you what changed. Evidence tells you what holds.',
      template: '%s | Stevin.AI',
    },
    description: 'The intelligent decision layer for marketing teams and agencies. Signals reconcile what changed in your accounts; Evidence governs what marketing science says still holds. 245+ integrations.',
    openGraph: {
      type: 'website',
      locale: 'en_GB',
      siteName: 'Stevin.AI',
      title: 'Stevin.AI — Signals tell you what changed. Evidence tells you what holds.',
      description: 'The intelligent decision layer for marketing teams and agencies. 245+ integrations across paid, owned, analytics and CRM.',
      url: 'https://stevin.ai/en',
      images: [
        {
          url: '/en/opengraph-image',
          width: 1200,
          height: 630,
          alt: 'Stevin.AI — Signals tell you what changed. Evidence tells you what holds.',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Stevin.AI — Signals tell you what changed. Evidence tells you what holds.',
      description: 'The intelligent decision layer for marketing teams and agencies. 245+ integrations across paid, owned, analytics and CRM.',
      images: ['/en/opengraph-image'],
    },
    alternates: {
      canonical: 'https://stevin.ai/en',
      languages: {
        nl: 'https://stevin.ai',
        en: 'https://stevin.ai/en',
      },
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
      <GoogleTagManagerHead />
      <GoogleTagManagerBody />
      <Header />
      <MainShell>
        {children}
      </MainShell>
      <Footer />
      <ConsentBanner />
    </NextIntlClientProvider>
  )
}
