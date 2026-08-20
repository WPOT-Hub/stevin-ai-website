import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CampaignLanding } from '@/components/campaign/CampaignLanding'
import { getCampaignAngle } from '@/content/campaign-landings/angles'
import {
  CAMPAIGN_DOMAINS,
  getCampaignAngleId,
  isCampaignDomain,
} from '@/content/campaign-landings/domains'

interface CampaignPageProps {
  params: Promise<{ domain: string }>
}

export const dynamicParams = false

export function generateStaticParams() {
  return CAMPAIGN_DOMAINS.map((domain) => ({ domain }))
}

export async function generateMetadata({
  params,
}: CampaignPageProps): Promise<Metadata> {
  const { domain } = await params
  if (!isCampaignDomain(domain)) notFound()

  const angle = getCampaignAngle(getCampaignAngleId(domain))
  const campaignUrl = `https://${domain}`

  return {
    metadataBase: new URL(campaignUrl),
    title: angle.headline,
    description: angle.subheadline,
    robots: {
      index: false,
      follow: false,
      googleBot: {
        index: false,
        follow: false,
        noimageindex: true,
      },
    },
    openGraph: {
      type: 'website',
      locale: 'nl_NL',
      siteName: 'Stevin.AI',
      url: campaignUrl,
      title: angle.headline,
      description: angle.subheadline,
    },
    twitter: {
      card: 'summary_large_image',
      title: angle.headline,
      description: angle.subheadline,
    },
  }
}

export default async function CampaignPage({ params }: CampaignPageProps) {
  const { domain } = await params
  if (!isCampaignDomain(domain)) notFound()

  const angle = getCampaignAngle(getCampaignAngleId(domain))
  return <CampaignLanding domain={domain} angle={angle} />
}
