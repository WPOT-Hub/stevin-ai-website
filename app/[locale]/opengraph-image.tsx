import { ImageResponse } from 'next/og'
import { OG_SIZE, StevinOgCard } from '@/lib/og-card'

export const runtime = 'nodejs'
export const alt = 'Stevin.AI'
export const size = OG_SIZE
export const contentType = 'image/png'

type Props = { params: Promise<{ locale: string }> }

export default async function OGImage({ params }: Props) {
  const { locale } = await params

  if (locale === 'nl') {
    return new ImageResponse(
      (
        <StevinOgCard
          lines={[
            { text: 'Wonder?', color: 'blue' },
            { text: 'Het is geen wonder.', color: 'soft' },
            { text: 'Het is Stevin.' },
          ]}
          footer={'"Wonder en is gheen wonder.", Simon Stevin, 1586'}
        />
      ),
      { ...size },
    )
  }

  return new ImageResponse(
    (
      <StevinOgCard
        lines={[
          { text: 'Signals', color: 'blue' },
          { text: 'tell you what changed.', color: 'soft' },
          { text: 'Evidence' },
          { text: 'tells you what holds.', color: 'soft' },
        ]}
        footer="STEVIN.AI · SINCE 1585"
        compact
      />
    ),
    { ...size },
  )
}
