import { ImageResponse } from 'next/og'
import { notFound } from 'next/navigation'
import { getCampaignAngle } from '@/content/campaign-landings/angles'
import {
  getCampaignAngleId,
  isCampaignDomain,
} from '@/content/campaign-landings/domains'

export const alt = 'Stevin.AI campagnescan'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

interface OpenGraphImageProps {
  params: Promise<{ domain: string }>
}

export default async function OpenGraphImage({ params }: OpenGraphImageProps) {
  const { domain } = await params
  if (!isCampaignDomain(domain)) notFound()

  const angle = getCampaignAngle(getCampaignAngleId(domain))

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#0A1628',
          color: '#FFFFFF',
          padding: '72px 80px',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        <div style={{ display: 'flex', fontSize: 30, fontWeight: 700 }}>
          Stevin<span style={{ color: '#3D8EFF' }}>.AI</span>
        </div>
        <div
          style={{
            display: 'flex',
            maxWidth: 980,
            fontSize: 68,
            fontWeight: 800,
            lineHeight: 1.06,
            letterSpacing: '-2px',
          }}
        >
          {angle.headline}
        </div>
        <div style={{ display: 'flex', color: '#9BC4FF', fontSize: 24 }}>
          {domain}
        </div>
      </div>
    ),
    size,
  )
}
