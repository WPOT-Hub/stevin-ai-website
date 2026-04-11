import { ImageResponse } from 'next/og'
import { readFileSync } from 'fs'
import { join } from 'path'

export const runtime = 'nodejs'
export const alt = 'Stevin voor Marketing — Grip op je data. Focus op resultaat.'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OGImage() {
  const logoPath = join(process.cwd(), 'public', 'logos', 'lockup-mono-white-on-navy-web.png')
  const logoData = readFileSync(logoPath)
  const logoBase64 = `data:image/png;base64,${logoData.toString('base64')}`

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
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(61,142,255,0.5) 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: -120,
            right: -80,
            width: 500,
            height: 500,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(61,142,255,0.2) 0%, transparent 70%)',
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
          {/* Logo */}
          <img
            src={logoBase64}
            width={180}
            height={30}
            style={{ marginBottom: '32px', opacity: 0.7 }}
          />
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '32px',
              padding: '8px 20px',
              borderRadius: '999px',
              background: 'rgba(61,142,255,0.1)',
              border: '1px solid rgba(61,142,255,0.2)',
            }}
          >
            <span style={{ fontSize: 16, fontWeight: 600, color: '#3D8EFF' }}>
              Voor Marketing
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: 60, fontWeight: 800, color: '#FFFFFF', lineHeight: 1.1, letterSpacing: '-0.03em' }}>
              Grip op je data.
            </span>
            <span style={{ fontSize: 60, fontWeight: 800, color: '#00D4A0', lineHeight: 1.1, letterSpacing: '-0.03em' }}>
              Focus op resultaat.
            </span>
          </div>
          <span style={{ fontSize: 22, color: 'rgba(255,255,255,0.4)', marginTop: '28px', lineHeight: 1.5 }}>
            Voor agencies, inhouse teams en promotoren.
          </span>
        </div>
      </div>
    ),
    { ...size },
  )
}
