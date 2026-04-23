import { ImageResponse } from 'next/og'

export const runtime = 'nodejs'
export const alt = 'Stevin.AI — Wonder en is gheen wonder.'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OGImage() {
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
        {/* Wonder? */}
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

        {/* Het is geen wonder. */}
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

        {/* Het is Stevin. */}
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

        {/* Quote */}
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
          &quot;Wonder en is gheen wonder.&quot; — Simon Stevin, 1586
        </span>
      </div>
    ),
    {
      ...size,
    },
  )
}
