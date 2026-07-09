import { readFileSync } from 'fs'
import { join } from 'path'

export const OG_SIZE = { width: 1200, height: 630 }

const BLUE = '#3D8EFF'
const NAVY = '#0D1B2E'

type OgLine = {
  text: string
  color?: 'blue' | 'white' | 'soft'
}

type StevinOgCardProps = {
  eyebrow?: string
  lines: OgLine[]
  subtitle?: string
  footer?: string
  compact?: boolean
}

let logoDataUri: string | null = null

function getLogoDataUri() {
  if (!logoDataUri) {
    const logoPath = join(process.cwd(), 'public', 'logos', 'lockup-mono-white-web.png')
    const logoData = readFileSync(logoPath)
    logoDataUri = `data:image/png;base64,${logoData.toString('base64')}`
  }

  return logoDataUri
}

function colorFor(line: OgLine) {
  if (line.color === 'blue') return BLUE
  if (line.color === 'soft') return 'rgba(255,255,255,0.78)'
  return '#FFFFFF'
}

export function StevinOgCard({ eyebrow, lines, subtitle, footer, compact = false }: StevinOgCardProps) {
  const logo = getLogoDataUri()

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        background: NAVY,
        padding: '70px 86px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <img
        src={logo}
        width={160}
        height={26}
        style={{
          objectFit: 'contain',
          marginBottom: compact ? 54 : 72,
        }}
      />

      {eyebrow && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            marginBottom: 24,
          }}
        >
          <span
            style={{
              width: 28,
              height: 1,
              background: 'rgba(255,255,255,0.32)',
              display: 'flex',
            }}
          />
          <span
            style={{
              color: 'rgba(255,255,255,0.42)',
              fontSize: 17,
              fontWeight: 700,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              display: 'flex',
            }}
          >
            {eyebrow}
          </span>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, maxWidth: 980 }}>
        {lines.map((line, index) => (
          <span
            key={`${line.text}-${index}`}
            style={{
              color: colorFor(line),
              fontSize: compact ? 68 : 78,
              fontWeight: 800,
              lineHeight: 1.04,
              letterSpacing: '-0.02em',
              display: 'flex',
            }}
          >
            {line.text}
          </span>
        ))}
      </div>

      {subtitle && (
        <span
          style={{
            color: 'rgba(255,255,255,0.65)',
            fontSize: 25,
            fontWeight: 500,
            lineHeight: 1.35,
            maxWidth: 820,
            marginTop: 34,
            display: 'flex',
          }}
        >
          {subtitle}
        </span>
      )}

      {footer && (
        <span
          style={{
            color: 'rgba(255,255,255,0.34)',
            fontSize: 18,
            fontWeight: 600,
            letterSpacing: '0.08em',
            marginTop: 'auto',
            display: 'flex',
          }}
        >
          {footer}
        </span>
      )}
    </div>
  )
}
