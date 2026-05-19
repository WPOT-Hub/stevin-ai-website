import Link from 'next/link'

export default function NotFound() {
  return (
    <html lang="nl">
      <body
        style={{
          margin: 0,
          fontFamily: "'Inter', system-ui, sans-serif",
          backgroundColor: '#0A1628',
          color: '#ffffff',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ textAlign: 'center', padding: '48px 24px', maxWidth: '480px' }}>
          <p
            style={{
              fontSize: '13px',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#5DA3FF',
              marginBottom: '24px',
            }}
          >
            404
          </p>
          <h1
            style={{
              fontSize: 'clamp(32px, 6vw, 52px)',
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: '-0.03em',
              color: '#ffffff',
              margin: '0 0 16px',
            }}
          >
            Pagina niet gevonden
          </h1>
          <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, margin: '0 0 40px' }}>
            Deze pagina bestaat niet (meer).
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            <Link
              href="/"
              style={{
                display: 'inline-block',
                padding: '12px 32px',
                backgroundColor: '#00D4A0',
                color: '#0A1628',
                fontSize: '14px',
                fontWeight: 600,
                borderRadius: '12px',
                textDecoration: 'none',
              }}
            >
              Terug naar de homepage →
            </Link>
            <Link
              href="/contact"
              style={{
                display: 'inline-block',
                padding: '12px 32px',
                border: '1px solid rgba(255,255,255,0.2)',
                color: 'rgba(255,255,255,0.7)',
                fontSize: '14px',
                fontWeight: 600,
                borderRadius: '12px',
                textDecoration: 'none',
              }}
            >
              Neem contact op
            </Link>
          </div>
        </div>
      </body>
    </html>
  )
}
