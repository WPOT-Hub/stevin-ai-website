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

  // Preview-deploys (new.stevin.ai en *.vercel.app) mogen nooit geindexeerd
  // worden; productie behoudt het normale gedrag.
  const previewRobots: Pick<Metadata, 'robots'> =
    process.env.VERCEL_ENV !== 'production' ? { robots: { index: false, follow: false } } : {}

  if (locale === 'nl') {
    return {
      ...previewRobots,
      metadataBase: new URL('https://stevin.ai'),
      alternates: { types: { 'application/rss+xml': 'https://stevin.ai/feed.xml' } },
      title: {
        default: 'Stevin.AI · Wij regelen je marketing goed. Alles blijft van jou.',
        template: '%s | Stevin.AI',
      },
      description: 'Je marketing goed geregeld, met dag en nacht een oog erop. Je accounts, je data en je kennis blijven van jou.',
      openGraph: {
        type: 'website',
        locale: 'nl_NL',
        siteName: 'Stevin.AI',
        title: 'Stevin.AI · Wij regelen je marketing goed. Alles blijft van jou.',
        description: 'Stevin zet je marketing goed en let er dag en nacht op. En alles blijft van jou: je accounts, je data, je kennis.',
        url: 'https://stevin.ai',
        images: [
          {
            url: '/opengraph-image',
            width: 1200,
            height: 630,
            alt: 'Stevin: wij regelen je marketing goed. Alles blijft van jou.',
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Stevin.AI · Wij regelen je marketing goed. Alles blijft van jou.',
        description: 'Stevin zet je marketing goed en let er dag en nacht op. En alles blijft van jou: je accounts, je data, je kennis.',
        images: ['/opengraph-image'],
      },
    }
  }

  return {
    ...previewRobots,
    metadataBase: new URL('https://stevin.ai'),
    title: {
      default: 'Stevin.AI · We set your marketing right. Everything stays yours.',
      template: '%s | Stevin.AI',
    },
    description: 'Stevin sets your marketing up right and watches it day and night. First a diagnosis on your own data, then a proposal. Your accounts, data and knowledge stay yours.',
    openGraph: {
      type: 'website',
      locale: 'en_GB',
      siteName: 'Stevin.AI',
      title: 'Stevin.AI · We set your marketing right. Everything stays yours.',
      description: 'Stevin sets your marketing up right and watches it day and night. Everything stays yours.',
      url: 'https://stevin.ai/en',
      images: [
        {
          url: '/en/opengraph-image',
          width: 1200,
          height: 630,
          alt: 'Stevin.AI · We set your marketing right. Everything stays yours.',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Stevin.AI · We set your marketing right. Everything stays yours.',
      description: 'Stevin sets your marketing up right and watches it day and night. Everything stays yours.',
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
