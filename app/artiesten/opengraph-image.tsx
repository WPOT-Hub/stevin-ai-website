import { ImageResponse } from 'next/og'

export const runtime = 'nodejs'
export const alt = 'Stevin voor Artiesten — Het signaal in de ruis.'
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
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.06,
            display: 'flex',
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(244,33,106,0.5) 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -150,
            left: -100,
            width: 600,
            height: 600,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(244,33,106,0.15) 0%, transparent 70%)',
            display: 'flex',
          }}
        />
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
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '32px',
              padding: '8px 20px',
              borderRadius: '999px',
              background: 'rgba(244,33,106,0.1)',
              border: '1px solid rgba(244,33,106,0.2)',
            }}
          >
            <span style={{ fontSize: 16, fontWeight: 600, color: '#F4216A' }}>
              Voor Artiesten
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: 60, fontWeight: 800, color: '#FFFFFF', lineHeight: 1.1, letterSpacing: '-0.03em' }}>
              Het Signaal
            </span>
            <span style={{ fontSize: 60, fontWeight: 800, color: '#00D4A0', lineHeight: 1.1, letterSpacing: '-0.03em' }}>
              in de Ruis.
            </span>
          </div>
          <span style={{ fontSize: 22, color: 'rgba(255,255,255,0.4)', marginTop: '28px', lineHeight: 1.5 }}>
            Filter de ruis. Reageer op het signaal dat ertoe doet.
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '40px' }}>
            <span style={{ fontSize: 18, fontWeight: 700, color: 'rgba(255,255,255,0.5)' }}>stevin.ai</span>
          </div>
        </div>
      </div>
    ),
    { ...size },
  )
}
