import { ImageResponse } from 'next/og'
import { OG_SIZE, StevinOgCard } from '@/lib/og-card'

// W-480: de preview die WhatsApp, LinkedIn en mail tonen bij de boekingslink.
// Vervangt de preview van Cal.com, die je daar niet kunt aanpassen.

export const runtime = 'nodejs'
export const alt = 'Kennismaken met Stevin.AI'
export const size = OG_SIZE
export const contentType = 'image/png'

type Props = { params: Promise<{ locale: string }> }

export default async function OGImage({ params }: Props) {
  const { locale } = await params

  if (locale === 'en') {
    return new ImageResponse(
      (
        <StevinOgCard
          eyebrow="Introduction"
          lines={[
            { text: 'Pick a time.', color: 'blue' },
            { text: 'We look at your', color: 'soft' },
            { text: 'numbers together.', color: 'soft' },
          ]}
          footer="STEVIN.AI"
        />
      ),
      { ...size },
    )
  }

  return new ImageResponse(
    (
      <StevinOgCard
        eyebrow="Kennismaking"
        lines={[
          { text: 'Kies een moment.', color: 'blue' },
          { text: 'We kijken samen', color: 'soft' },
          { text: 'naar je cijfers.', color: 'soft' },
        ]}
        footer="STEVIN.AI"
      />
    ),
    { ...size },
  )
}
