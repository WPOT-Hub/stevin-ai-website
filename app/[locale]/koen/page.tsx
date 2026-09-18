import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'

type Props = { params: Promise<{ locale: string }> }

/**
 * De bestemming van de QR-code op Koens beursbadge (18 sep 2026).
 *
 * Waarom een pagina en niet meteen de scan: op een beurs wil de een je
 * gegevens opslaan, de ander je LinkedIn zien en de derde pas later scannen.
 * Een QR die meteen een scan start bedient er maar een van. Koen: "wellicht
 * kunnen we ook gewoon een contactpagina maken waar ze dan zelf kunnen zien
 * wat ze kunnen doen."
 *
 * Noindex: dit is de bestemming van een gedrukte code, geen zoekresultaat.
 */
export const metadata: Metadata = {
  title: 'Koen Hoogenboom, Stevin.AI',
  description: 'Contactgegevens opslaan, verbinden op LinkedIn, of je eigen website laten scannen.',
  robots: 'noindex, nofollow',
}

const NAVY = '#0A1628'
const ACCENT = '#3D8EFF'

/**
 * De vCard als data-URI, zodat opslaan werkt zonder server-route en zonder
 * dat een telefoon eerst een download-toestemming vraagt aan een vreemde host.
 * Gegevens uit Stevin-company/governance/BEDRIJFSGEGEVENS.md, niet uit het hoofd.
 */
const VCARD = [
  'BEGIN:VCARD',
  'VERSION:3.0',
  'N:Hoogenboom;Koen;;;',
  'FN:Koen Hoogenboom',
  'ORG:Stevin.AI B.V.',
  'EMAIL;TYPE=WORK:koen@stevin.ai',
  'TEL;TYPE=CELL:+31640836055',
  'URL:https://stevin.ai',
  'ADR;TYPE=WORK:;;Claudius Prinsenlaan 12, Unit S8;Breda;;4811 DK;Nederland',
  'END:VCARD',
].join('\n')

const KAARTEN: { titel: string; uitleg: string; href: string; accent?: boolean }[] = [
  {
    titel: 'Bewaar mijn gegevens',
    uitleg: 'Zet me meteen in je contacten',
    href: `data:text/vcard;charset=utf-8,${encodeURIComponent(VCARD)}`,
    accent: true,
  },
  {
    titel: 'Scan je eigen website',
    uitleg: 'Wat je site doorgeeft over meting, aanvragen en advertenties',
    href: '/marketing-scan?p=badge-koen',
  },
  {
    titel: 'Plan een half uur',
    uitleg: 'Vrijblijvend, we kijken samen naar je cijfers',
    // Dezelfde link als in de scan (components/MarketingCheck.tsx), zelf
    // nagekeken: cal.com/stevin/30min gaf 404.
    href: 'https://cal.com/koen-hoogenboom/kennismaking',
  },
  {
    titel: 'Volg Stevin.AI op LinkedIn',
    uitleg: 'Wat we bouwen en wat we tegenkomen',
    href: 'https://www.linkedin.com/company/stevin-ai',
  },
]

export default async function KoenPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <main style={{ minHeight: '100vh', background: NAVY, color: '#fff', padding: '48px 20px 64px' }}>
      <div style={{ maxWidth: 420, margin: '0 auto' }}>
        <img src="/logos/logo-mono-white.svg" alt="Stevin.AI" style={{ width: 132, display: 'block', margin: '0 auto' }} />

        <h1 style={{ fontSize: 30, fontWeight: 700, textAlign: 'center', margin: '28px 0 4px', letterSpacing: '-0.01em' }}>
          Koen Hoogenboom
        </h1>
        <p style={{ textAlign: 'center', color: '#8fa2bd', margin: 0, fontSize: 15 }}>Stevin.AI, Breda</p>

        <div style={{ display: 'grid', gap: 12, marginTop: 34 }}>
          {KAARTEN.map((k) => (
            <a
              key={k.titel}
              href={k.href}
              download={k.href.startsWith('data:') ? 'koen-hoogenboom.vcf' : undefined}
              style={{
                display: 'block',
                padding: '16px 18px',
                borderRadius: 12,
                textDecoration: 'none',
                background: k.accent ? ACCENT : 'rgba(255,255,255,0.05)',
                border: k.accent ? 'none' : '1px solid rgba(255,255,255,0.12)',
                color: '#fff',
              }}
            >
              <span style={{ display: 'block', fontSize: 16, fontWeight: 600 }}>{k.titel}</span>
              <span style={{ display: 'block', fontSize: 13.5, marginTop: 3, color: k.accent ? 'rgba(255,255,255,0.86)' : '#8fa2bd' }}>
                {k.uitleg}
              </span>
            </a>
          ))}
        </div>

        <div style={{ marginTop: 30, textAlign: 'center', fontSize: 14, lineHeight: 1.9 }}>
          <a href="mailto:koen@stevin.ai" style={{ color: '#8fa2bd', textDecoration: 'none' }}>koen@stevin.ai</a>
          <br />
          <a href="tel:+31640836055" style={{ color: '#8fa2bd', textDecoration: 'none' }}>06 40 83 60 55</a>
        </div>
      </div>
    </main>
  )
}
