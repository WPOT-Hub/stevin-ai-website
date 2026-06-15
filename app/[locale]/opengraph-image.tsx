import { ImageResponse } from 'next/og'

export const runtime = 'nodejs'
export const alt = 'Stevin.AI'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

type Props = { params: Promise<{ locale: string }> }

export default async function OGImage({ params }: Props) {
  const { locale } = await params

  // ── NL: bestaande Wonder/Het is geen wonder/Het is Stevin versie ──
  if (locale === 'nl') {
    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            background: '#0D1B2E',
            padding: '80px 96px',
          }}
        >
          <span
            style={{
              fontSize: 92,
              fontWeight: 800,
              color: '#3D8EFF',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              display: 'flex',
            }}
          >
            Wonder?
          </span>
          <span
            style={{
              fontSize: 88,
              fontWeight: 800,
              color: 'rgba(255,255,255,0.85)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              display: 'flex',
              marginTop: '4px',
            }}
          >
            Het is geen wonder.
          </span>
          <span
            style={{
              fontSize: 96,
              fontWeight: 800,
              color: '#FFFFFF',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              display: 'flex',
              marginTop: '4px',
            }}
          >
            Het is Stevin.
          </span>
          <span
            style={{
              fontSize: 22,
              fontWeight: 400,
              fontStyle: 'italic',
              color: 'rgba(255,255,255,0.35)',
              marginTop: '40px',
              display: 'flex',
            }}
          >
            &quot;Wonder en is gheen wonder.&quot;, Simon Stevin, 1586
          </span>
        </div>
      ),
      { ...size },
    )
  }

  // ── EN: Signals/Evidence architecturale zin ──
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          background: '#0D1B2E',
          padding: '80px 96px',
        }}
      >
        {/* Signals */}
        <span
          style={{
            fontSize: 88,
            fontWeight: 800,
            color: '#3D8EFF',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            display: 'flex',
          }}
        >
          Signals
        </span>
        <span
          style={{
            fontSize: 36,
            fontWeight: 500,
            color: 'rgba(255,255,255,0.78)',
            lineHeight: 1.2,
            letterSpacing: '-0.01em',
            display: 'flex',
            marginTop: '6px',
          }}
        >
          tell you what changed.
        </span>

        {/* Evidence */}
        <span
          style={{
            fontSize: 88,
            fontWeight: 800,
            color: '#FFFFFF',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            display: 'flex',
            marginTop: '36px',
          }}
        >
          Evidence
        </span>
        <span
          style={{
            fontSize: 36,
            fontWeight: 500,
            color: 'rgba(255,255,255,0.78)',
            lineHeight: 1.2,
            letterSpacing: '-0.01em',
            display: 'flex',
            marginTop: '6px',
          }}
        >
          tells you what holds.
        </span>

        {/* Footer attribution */}
        <span
          style={{
            fontSize: 22,
            fontWeight: 500,
            color: 'rgba(255,255,255,0.35)',
            marginTop: '52px',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            display: 'flex',
          }}
        >
          Stevin.AI · since 1585
        </span>
      </div>
    ),
    { ...size },
  )
}
