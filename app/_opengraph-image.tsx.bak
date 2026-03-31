import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Stevin.AI — Jij focust op je business. Wij regelen je marketing.'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  const personData = await fetch(
    new URL('../public/og-person.jpg', import.meta.url)
  ).then((res) => res.arrayBuffer())

  const logoData = await fetch(
    new URL('../public/logos/lockup-mono-white-web.png', import.meta.url)
  ).then((res) => res.arrayBuffer())

  const personSrc = `data:image/jpeg;base64,${Buffer.from(personData).toString('base64')}`
  const logoSrc = `data:image/png;base64,${Buffer.from(logoData).toString('base64')}`

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          overflow: 'hidden',
          background: '#0A1628',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        {/* Person photo — right side, original orientation pointing left */}
        <img
          src={personSrc}
          width={500}
          height={630}
          style={{
            position: 'absolute',
            right: '140px',
            top: 0,
            width: '500px',
            height: '630px',
            objectFit: 'cover',
            objectPosition: 'center top',
          }}
        />
        {/* Gradient overlay left edge of person */}
        <div
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            width: '650px',
            height: '630px',
            background: 'linear-gradient(to right, #0A1628 0%, rgba(10,22,40,0.85) 30%, rgba(10,22,40,0.3) 55%, rgba(10,22,40,0) 75%, transparent 100%)',
          }}
        />
        {/* Bottom gradient */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: '120px',
            background: 'linear-gradient(to top, rgba(10,22,40,0.9) 0%, transparent 100%)',
          }}
        />

        {/* Content — left side */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '48px 56px',
            width: '100%',
            height: '100%',
            position: 'relative',
          }}
        >
          {/* Top: Logo PNG */}
          <img
            src={logoSrc}
            width={186}
            height={30}
            style={{ width: '186px', height: '30px' }}
          />

          {/* Middle: headline + price */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '620px' }}>
            <div style={{ fontSize: '58px', fontWeight: 800, color: 'white', lineHeight: 1.05, letterSpacing: '-2.5px' }}>
              Jij focust op je business.
            </div>
            <div style={{ fontSize: '26px', fontWeight: 400, color: 'rgba(255,255,255,0.5)', lineHeight: 1.3 }}>
              Wij regelen je marketing en sturen op resultaat.
            </div>
            {/* Big neon price button */}
            <div style={{ display: 'flex', marginTop: '10px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '16px 36px',
                  borderRadius: '14px',
                  background: '#D4FF00',
                }}
              >
                <span style={{ fontSize: '30px', fontWeight: 800, color: '#0A1628', letterSpacing: '-0.5px' }}>
                  Vanaf €950 p/m
                </span>
              </div>
            </div>
          </div>

          {/* Bottom: features + tagline */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            {['Paid Ads', 'SEO & GEO', 'Automation', 'Tracking'].map((item) => (
              <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#3D8EFF' }} />
                <span style={{ fontSize: '20px', color: 'rgba(255,255,255,0.6)', fontWeight: 600 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
