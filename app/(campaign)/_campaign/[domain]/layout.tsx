import localFont from 'next/font/local'
import { notFound } from 'next/navigation'
import { AnalyticsEvents } from '@/components/analytics/AnalyticsEvents'
import ConsentBanner from '@/components/ConsentBanner'
import {
  GoogleTagManagerBody,
  GoogleTagManagerHead,
} from '@/components/GoogleTagManager'
import { isCampaignDomain } from '@/content/campaign-landings/domains'

const interDisplay = localFont({
  src: [
    {
      path: '../../../../public/fonts/InterDisplay-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../../../public/fonts/InterDisplay-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../../../public/fonts/InterDisplay-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../../../public/fonts/InterDisplay-ExtraBold.woff2',
      weight: '800',
      style: 'normal',
    },
  ],
  variable: '--font-display-inter',
  display: 'swap',
})

const interBody = localFont({
  src: [
    {
      path: '../../../../public/fonts/InterVariable.woff2',
      weight: '100 900',
      style: 'normal',
    },
    {
      path: '../../../../public/fonts/InterVariable-Italic.woff2',
      weight: '100 900',
      style: 'italic',
    },
  ],
  variable: '--font-body-inter',
  display: 'swap',
})

interface CampaignLayoutProps {
  children: React.ReactNode
  params: Promise<{ domain: string }>
}

export default async function CampaignLayout({
  children,
  params,
}: CampaignLayoutProps) {
  const { domain } = await params
  if (!isCampaignDomain(domain)) notFound()

  return (
    <html lang="nl" className={`${interDisplay.variable} ${interBody.variable}`}>
      <body className="min-h-screen bg-surface">
        <GoogleTagManagerHead />
        <GoogleTagManagerBody />
        <AnalyticsEvents />
        {children}
        <ConsentBanner />
      </body>
    </html>
  )
}
