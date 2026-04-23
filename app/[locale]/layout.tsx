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
      title: {
        default: 'Stevin.AI — Heers over je data. Stop de ruis.',
        template: '%s | Stevin.AI',
      },
      description: 'Stevin is de intelligente datalaag die versnipperde signalen omzet in actie. Voor agencies, inhouse teams, promotoren en artiesten. 220+ integraties, AI-analyses en 24/7 monitoring.',
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
    title: {
      default: 'Stevin.AI — Master your data. Stop the noise.',
      template: '%s | Stevin.AI',
    },
    description: 'Stevin is the intelligent data layer that turns fragmented signals into action. For agencies, in-house teams, promoters and artists. 220+ integrations, AI analyses and 24/7 monitoring.',
    openGraph: {
      type: 'website',
      locale: 'en_GB',
      siteName: 'Stevin.AI',
      title: 'Stevin.AI — Master your data. Stop the noise.',
      description: 'The intelligent data layer for agencies, promoters and artists. 220+ integrations, AI analyses and 24/7 monitoring.',
      url: 'https://stevin.ai/en',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Stevin.AI — Master your data. Stop the noise.',
      description: 'The intelligent data layer for agencies, promoters and artists. 220+ integrations, AI analyses and 24/7 monitoring.',
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
