import { ImageResponse } from 'next/og'
import { getArticle } from '@/data/articles'

export const runtime = 'nodejs'
export const alt = 'Stevin Journal'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

type Props = { params: Promise<{ locale: string; slug: string }> }

export default async function BlogOGImage({ params }: Props) {
  const { slug } = await params
  const article = getArticle(slug)

  // Fallback: titel onbekend → algemene Stevin Journal kaart
  const title = article?.title ?? 'Stevin Journal'
  const category = article?.category ?? 'JOURNAL'
  const edition = article?.edition ? `EDITIE ${article.edition}` : ''
  const author = article?.author?.name ?? 'Stevin Journal'

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          background: '#0D1B2E',
          padding: '72px 88px',
        }}
      >
        {/* Top: category + edition */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: '#3D8EFF',
            fontFamily: 'JetBrains Mono, monospace',
          }}
        >
          <span style={{ display: 'flex' }}>{category}</span>
          {edition && (
            <>
              <span style={{ display: 'flex', color: 'rgba(255,255,255,0.30)' }}>/</span>
              <span style={{ display: 'flex', color: 'rgba(255,255,255,0.55)' }}>{edition}</span>
            </>
          )}
        </div>

        {/* Middle: titel */}
        <div
          style={{
            display: 'flex',
            fontSize: title.length > 70 ? 56 : title.length > 50 ? 64 : 72,
            fontWeight: 800,
            color: '#FFFFFF',
            lineHeight: 1.08,
            letterSpacing: '-0.02em',
            maxWidth: '1024px',
          }}
        >
          {title}
        </div>

        {/* Bottom: brand + author */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            width: '100%',
          }}
        >
          <span
            style={{
              display: 'flex',
              fontSize: 28,
              fontWeight: 700,
              color: '#FFFFFF',
              letterSpacing: '-0.01em',
            }}
          >
            Stevin.AI
          </span>
          <span
            style={{
              display: 'flex',
              fontSize: 20,
              fontWeight: 500,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.45)',
              fontFamily: 'JetBrains Mono, monospace',
            }}
          >
            {author}
          </span>
        </div>
      </div>
    ),
    { ...size },
  )
}
