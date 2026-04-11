import { ImageResponse } from 'next/og'

export const runtime = 'nodejs'
export const alt = 'Stevin.AI — Heers over je data. Stop de ruis.'
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
          alignItems: 'center',
          background: '#0A1628',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Subtle grid pattern */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.06,
            display: 'flex',
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(61,142,255,0.5) 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />

        {/* Gradient orb top-right */}
        <div
          style={{
            position: 'absolute',
            top: -120,
            right: -80,
            width: 500,
            height: 500,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(61,142,255,0.15) 0%, transparent 70%)',
            display: 'flex',
          }}
        />

        {/* Gradient orb bottom-left */}
        <div
          style={{
            position: 'absolute',
            bottom: -150,
            left: -100,
            width: 600,
            height: 600,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0,212,160,0.1) 0%, transparent 70%)',
            display: 'flex',
          }}
        />

        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '60px 80px',
            position: 'relative',
          }}
        >
          {/* Logo text */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '40px',
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: 'rgba(61,142,255,0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 4,
                  background: '#3D8EFF',
                  display: 'flex',
                }}
              />
            </div>
            <span
              style={{
                fontSize: 28,
                fontWeight: 700,
                color: 'rgba(255,255,255,0.6)',
                letterSpacing: '-0.02em',
              }}
            >
              Stevin.AI
            </span>
          </div>

          {/* Main headline */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span
              style={{
                fontSize: 64,
                fontWeight: 800,
                color: '#FFFFFF',
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
              }}
            >
              Heers over je data.
            </span>
            <span
              style={{
                fontSize: 64,
                fontWeight: 800,
                color: '#00D4A0',
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
              }}
            >
              Stop de ruis.
            </span>
          </div>

          {/* Subtitle */}
          <span
            style={{
              fontSize: 22,
              color: 'rgba(255,255,255,0.4)',
              marginTop: '32px',
              lineHeight: 1.5,
              maxWidth: 700,
            }}
          >
            De intelligente datalaag voor agencies, promotoren en artiesten.
          </span>

          {/* Bottom bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '24px',
              marginTop: '48px',
            }}
          >
            {['170+ Integraties', 'AI-analyses', '24/7 Monitoring'].map((item) => (
              <div
                key={item}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: '#3D8EFF',
                    display: 'flex',
                  }}
                />
                <span
                  style={{
                    fontSize: 16,
                    color: 'rgba(255,255,255,0.5)',
                    fontWeight: 600,
                  }}
                >
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    },
  )
}
