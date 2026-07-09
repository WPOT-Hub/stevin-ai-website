import { ImageResponse } from 'next/og'
import { OG_SIZE, StevinOgCard } from '@/lib/og-card'

export const runtime = 'nodejs'
export const alt = 'Stevin voor artiesten. Het signaal in de ruis.'
export const size = OG_SIZE
export const contentType = 'image/png'

export default async function OGImage() {
  return new ImageResponse(
    (
      <StevinOgCard
        eyebrow="Voor artiesten"
        lines={[
          { text: 'Het signaal' },
          { text: 'in de ruis.', color: 'blue' },
        ]}
        subtitle="Filter de ruis. Reageer op het signaal dat ertoe doet."
      />
    ),
    { ...size },
  )
}
