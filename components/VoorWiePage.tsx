import { Link } from '@/i18n/navigation'
import Section from '@/components/Section'
import SectionHeader from '@/components/SectionHeader'
import DeskProof, { type MeldingSleutel } from '@/components/DeskProof'
import IntelligenceFeed, { type FeedVariant } from '@/components/IntelligenceFeed'
import FAQAccordion from '@/components/FAQAccordion'

/**
 * Gedeelde opbouw van de voor-wie-paginas. Ingevoerd 5 sep 2026 (W-042) na
 * de tweede lezing: zes pagina's droegen elk hun eigen kopie van dezelfde
 * secties, en de copy verwaterde per pagina in zes kaarten "wat we wel doen".
 *
 * De volgorde is niet willekeurig, hij volgt de kennislaag die we klanten
 * adviseren (docs/knowledge/ADVISOR_KNOWLEDGE.md), toegepast op onszelf:
 *
 *  1. Hero: een kernbelofte, niet zes (kern 16, Zhang en Fishbach 2007).
 *     De primaire actie is de gratis scan, een kleine, direct waardevolle
 *     eerste stap voor wie nog niet koopklaar is (kern 19, Freedman en
 *     Fraser 1966). De diagnose blijft de tweede knop.
 *  2. De meting: eerst competentie laten zien, met echte cijfers en een
 *     bron. Zonder dit werkt stap 4 niet.
 *  3. Wat het kost: verliesframe met een klein handelingsperspectief ernaast
 *     (kern 18, Kahneman en Tversky). Nooit angst zonder uitweg.
 *  4. Wat we niet doen: een zwakte benoemen verhoogt geloofwaardigheid, maar
 *     alleen na bewezen competentie (pratfall, Aronson). Daarom na de meting.
 *  5. Wat je krijgt: drie dingen, de eerste is de belofte uit de hero.
 *  6. De Desk: het systeem zelf, geen nagebouwde demo.
 *  7. De kennislaag: drie principes met hun grens.
 *  8. Waarom wij: kort, en alleen wat vastligt.
 *  9. Bezwaren: drie vragen die in elk eerste gesprek komen.
 * 10. Slot: de actie nog een keer, met de reden erbij (Langer 1978: een
 *     expliciete reden bij elke call-to-action).
 */

export interface VoorWieCopy {
  eyebrow: string
  h1_line: string
  h1_accent: string
  sub: string
  cta: string
  cta_reason: string
  cta_sec: string
  scan_eyebrow: string
  scan_h2: string
  scan_p: string
  scan_cijfers: readonly { n: string; t: string }[]
  scan_slot: string
  kost_h2: string
  kost_p: string
  kost_uitweg: string
  eerlijk_h2: string
  eerlijk: readonly { t: string; d: string }[]
  krijg_h2: string
  krijg: readonly { t: string; d: string }[]
  canon_h2: string
  canon_sub: string
  principes: readonly { p: string; u: string; bron: string; grens: string }[]
  waarom_h2: string
  waarom_p1: string
  waarom_p2: string
  faq_h2: string
  faqs: readonly { question: string; answer: string }[]
  slot_h2: string
  slot_sub: string
}

interface Props {
  locale: string
  c: VoorWieCopy
  melding: MeldingSleutel
  feed?: FeedVariant
  secHref?: string
}

export default function VoorWiePage({ locale, c, melding, feed, secHref = '/tarieven' }: Props) {
  const primary = (
    <Link href="/contact" className="inline-flex px-8 py-3.5 text-sm font-semibold text-primary bg-white rounded-xl hover:bg-white/90 transition-colors">{c.cta}</Link>
  )
  return (
    <>
      <section className="bg-primary text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className={feed ? 'grid lg:grid-cols-[minmax(0,1fr)_minmax(0,440px)] gap-12 lg:gap-16 items-center' : 'max-w-3xl'}>
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.14em] text-white/50">{c.eyebrow}</p>
              <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
                {c.h1_line} <span className="text-accent">{c.h1_accent}</span>
              </h1>
              <p className="mt-6 text-lg text-white/70 max-w-2xl leading-relaxed">{c.sub}</p>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                {primary}
                <Link href={secHref} className="inline-flex px-8 py-3.5 text-sm font-semibold text-white/70 border border-white/20 rounded-xl hover:bg-white/5 transition-colors">{c.cta_sec}</Link>
              </div>
              <p className="mt-4 text-sm text-white/45">{c.cta_reason}</p>
            </div>
            {feed && <IntelligenceFeed variant={feed} locale={locale} />}
          </div>
        </div>
      </section>

      <Section bg="white">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-mono uppercase tracking-[0.14em] text-muted/70">{c.scan_eyebrow}</p>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight text-balance text-primary">{c.scan_h2}</h2>
          <p className="mt-5 text-muted leading-relaxed">{c.scan_p}</p>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {c.scan_cijfers.map((x) => (
              <div key={x.t} className="border-t border-border pt-4">
                <p className="text-xl font-bold text-accent leading-tight">{x.n}</p>
                <p className="mt-2 text-sm text-muted leading-relaxed">{x.t}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 text-primary leading-relaxed">{c.scan_slot}</p>
        </div>
      </Section>

      <Section bg="primary">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-balance">{c.kost_h2}</h2>
          <p className="mt-5 text-lg text-white/70 leading-relaxed">{c.kost_p}</p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            {primary}
            <p className="text-sm text-white/55 m-0">{c.kost_uitweg}</p>
          </div>
        </div>
      </Section>

      <Section bg="surface">
        <SectionHeader title={c.eerlijk_h2} />
        <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
          {c.eerlijk.map((i) => (
            <div key={i.t} className="rounded-xl border border-border bg-white p-6">
              <h3 className="text-base font-semibold text-primary">{i.t}</h3>
              <p className="mt-3 text-sm text-muted leading-relaxed">{i.d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section bg="white">
        <SectionHeader title={c.krijg_h2} />
        <div className="grid gap-6 md:grid-cols-3">
          {c.krijg.map((i, idx) => (
            <div key={i.t} className={`rounded-xl border bg-white p-6 ${idx === 0 ? 'border-accent border-t-[3px]' : 'border-border'}`}>
              <h3 className="text-base font-semibold text-primary">{i.t}</h3>
              <p className="mt-3 text-sm text-muted leading-relaxed">{i.d}</p>
            </div>
          ))}
        </div>
      </Section>

      <DeskProof locale={locale} melding={melding} />

      <Section bg="surface">
        <SectionHeader title={c.canon_h2} subtitle={c.canon_sub} />
        <div className="mx-auto max-w-3xl flex flex-col gap-5">
          {c.principes.map((p) => (
            <div key={p.p} className="rounded-xl border border-border bg-white p-6 border-l-[3px] border-l-accent">
              <p className="text-base font-semibold text-primary leading-snug">{p.p}</p>
              <p className="mt-2 text-sm text-muted leading-relaxed">{p.u}</p>
              <p className="mt-4 text-xs font-mono uppercase tracking-[0.1em] text-muted/70">{p.bron}</p>
              <p className="mt-3 text-sm text-primary/80 leading-relaxed border-t border-border pt-3">{p.grens}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section bg="white">
        <div className="mx-auto max-w-3xl">
          <SectionHeader title={c.waarom_h2} centered={false} />
          <p className="text-muted leading-relaxed">{c.waarom_p1}</p>
          <p className="mt-4 text-primary leading-relaxed font-medium">{c.waarom_p2}</p>
        </div>
      </Section>

      <Section bg="surface">
        <SectionHeader title={c.faq_h2} />
        <FAQAccordion faqs={[...c.faqs]} />
      </Section>

      <Section bg="primary">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-balance">{c.slot_h2}</h2>
          <p className="mt-4 text-lg text-white/70 leading-relaxed">{c.slot_sub}</p>
          <div className="mt-8">{primary}</div>
          <p className="mt-4 text-sm text-white/45">{c.cta_reason}</p>
        </div>
      </Section>
    </>
  )
}
