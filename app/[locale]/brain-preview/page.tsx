import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import StevinBrainVisual from '@/components/StevinBrainVisual'

/**
 * Interne review-pagina voor de Stevin Brain-visual. Staat bewust NIET in de
 * hoofdnavigatie en is noindex. Toont de drie formaten naast elkaar op een
 * navy vlak, zodat de transparante achtergrond van de visual goed te beoordelen is.
 *
 * Bereikbaar op /brain-preview (nl) en /en/brain-preview (en).
 */

type Props = { params: Promise<{ locale: string }> }

export const metadata: Metadata = {
  title: 'Stevin Brain visual, review',
  robots: { index: false, follow: false },
}

const NAVY = '#0A1628'

const FORMATS: Array<{ aspect: '1:1' | '3:4' | '9:16'; label: string; maxWidth: number }> = [
  { aspect: '1:1', label: 'Vierkant (1:1)', maxWidth: 460 },
  { aspect: '3:4', label: 'Portret (3:4)', maxWidth: 380 },
  { aspect: '9:16', label: 'Story (9:16)', maxWidth: 300 },
]

export default async function BrainPreviewPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <main style={{ background: NAVY, minHeight: '100vh', padding: '64px 24px 96px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <p
          style={{
            color: '#5DA3FF',
            fontFamily: 'var(--font-display, system-ui, sans-serif)',
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            margin: '0 0 12px',
          }}
        >
          Interne review, niet in navigatie
        </p>
        <h1
          style={{
            color: '#fff',
            fontFamily: 'var(--font-display, system-ui, sans-serif)',
            fontSize: 'clamp(34px, 3.4vw, 48px)',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            lineHeight: 1.08,
            margin: '0 0 16px',
            maxWidth: '18ch',
          }}
        >
          Stevin Brain, sfeer-visual
        </h1>
        <p
          style={{
            color: 'rgba(255,255,255,0.6)',
            fontFamily: 'var(--font-display, system-ui, sans-serif)',
            fontSize: 16,
            lineHeight: 1.6,
            maxWidth: 620,
            margin: '0 0 48px',
          }}
        >
          Een levend sterrenbeeld op een bevroren, volledig fictief snapshot (Lumos demodata,
          114 nodes). Geen API, geen echte klantdata. De achtergrond is transparant, dus de
          visual valt hier over een navy vlak. Elke stip is een campagne, creatie, resultaat
          of kennisbron. Om de negen seconden licht er rustig een node op.
        </p>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 32,
            alignItems: 'flex-start',
            justifyContent: 'center',
          }}
        >
          {FORMATS.map((f) => (
            <div key={f.aspect} style={{ flex: '1 1 280px', maxWidth: f.maxWidth }}>
              <div
                style={{
                  color: 'rgba(255,255,255,0.5)',
                  fontFamily: 'var(--font-display, system-ui, sans-serif)',
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: '0.02em',
                  marginBottom: 12,
                }}
              >
                {f.label}
              </div>
              <div
                style={{
                  borderRadius: 18,
                  overflow: 'hidden',
                  border: '1px solid rgba(255,255,255,0.08)',
                  background:
                    'radial-gradient(120% 120% at 50% 0%, rgba(61,142,255,0.06) 0%, rgba(10,22,40,0) 60%)',
                }}
              >
                <StevinBrainVisual aspect={f.aspect} />
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: 56,
            padding: '20px 22px',
            borderRadius: 14,
            border: '1px solid rgba(255,255,255,0.08)',
            background: 'rgba(255,255,255,0.03)',
            maxWidth: 720,
          }}
        >
          <p
            style={{
              color: 'rgba(255,255,255,0.55)',
              fontFamily: 'var(--font-display, system-ui, sans-serif)',
              fontSize: 13.5,
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            Gebruik: importeer StevinBrainVisual en geef een aspect mee (1:1, 3:4 of 9:16). De
            breedte volgt de container, de hoogte volgt vanzelf uit de verhouding. Zet brand op
            false om het merk-teken weg te laten. prefers-reduced-motion toont een stil frame,
            buiten beeld pauzeert de animatie.
          </p>
        </div>
      </div>
    </main>
  )
}
