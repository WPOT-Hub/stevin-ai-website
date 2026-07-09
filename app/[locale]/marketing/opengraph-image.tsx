import { ImageResponse } from 'next/og'
import { OG_SIZE, StevinOgCard } from '@/lib/og-card'

export const runtime = 'nodejs'
export const alt = 'Stevin voor marketing. Grip op je data. Focus op resultaat.'
export const size = OG_SIZE
export const contentType = 'image/png'

export default async function OGImage() {
  return new ImageResponse(
    (
      <StevinOgCard
        eyebrow="Marketing-intelligence"
        lines={[
          { text: 'Grip op je data.' },
          { text: 'Focus op resultaat.', color: 'blue' },
        ]}
        subtitle="Voor agencies, in-house teams en promotoren."
      />
    ),
    { ...size },
  )
}
