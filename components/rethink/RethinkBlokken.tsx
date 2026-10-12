import type { ReactNode } from 'react'
import { Link } from '@/i18n/navigation'
import KennismakingVenster from './KennismakingVenster'
import NodeWatermerk from './NodeWatermerk'
import HeroUniversum, { type Kies } from './HeroUniversum'

/**
 * Bouwstenen voor de verdiepingspagina's in de stijl van de homepage en
 * /tarieven (W-535): kop, rij met punten, vragen en het slot met de knop
 * "Plan een kennismaking". Zelfde typografie als RethinkTarieven.tsx, zodat
 * de pagina's niet elk een eigen variant krijgen.
 *
 * Geen Desk-scherm of oude StevinBrainVisual: /tarieven laadde op mobiel in
 * acht seconden door zulke componenten. Het brein van de homepage
 * (HeroUniversum) mag wel als kop: dat laadt pas in de browser en de tekst
 * staat er al.
 */

export const h2Stijl = { fontSize: 'clamp(30px, 3.4vw, 48px)', letterSpacing: '-0.03em', lineHeight: '1.08' } as const
export const tekst = 'text-[18px] leading-[1.6] text-[#2A3A54]'

export type Vraag = { v: string; a: string }

export function Knop({ cta, licht = false }: { cta: string; licht?: boolean }) {
  return (
    <Link
      href="/kennismaking"
      data-cta={cta}
      data-open-kennismaking=""
      className={
        licht
          ? 'inline-flex items-center rounded-lg bg-accent px-7 py-3.5 font-display text-[15px] font-bold text-primary transition-[filter] hover:brightness-110'
          : 'inline-flex items-center rounded-lg bg-accent px-7 py-3.5 font-display text-[15px] font-bold text-primary transition-[filter] hover:brightness-110'
      }
    >
      Plan een kennismaking
    </Link>
  )
}

export function PaginaKop({
  eyebrow,
  kop,
  accent,
  lede,
  knop,
  brein,
}: {
  eyebrow: string
  kop: string
  accent?: string
  lede: ReactNode
  knop?: string
  /**
   * Het brein van de homepage als kop, met de bron van deze pagina al gekozen
   * (Koen, 12 okt 07:48: "verander je ook overal de nodes? pas ze wel aan per
   * pagina"). 'alles' = het hele brein, niets gekozen.
   */
  brein?: Kies | 'alles' | { herinnering: string }
}) {
  if (brein) {
    return (
      <HeroUniversum
        start={brein === 'alles' ? undefined : brein}
        kop={
          <>
            <p className="m-0 mb-5 font-display text-[12px] font-bold uppercase tracking-[0.12em] text-accent">{eyebrow}</p>
            <h1
              className="m-0 text-balance font-display font-extrabold text-white"
              style={{ ...h2Stijl, fontSize: 'clamp(34px, 4.4vw, 60px)' }}
            >
              {kop}
              {accent ? <span className="text-accent"> {accent}</span> : null}
            </h1>
            <div className="mt-5 text-balance text-[18px] leading-[1.5] text-white/75">{lede}</div>
          </>
        }
        knoppen={
          <div className="zij:mt-9 flex flex-wrap gap-3 tablet:justify-center">
            <Knop cta={knop ?? 'pagina_kop'} licht />
          </div>
        }
      />
    )
  }
  return (
    <section className="px-6 pb-16 pt-28 sm:pt-32">
      <div className="mx-auto max-w-[1152px]">
        <p className="m-0 mb-5 font-display text-[12px] font-bold uppercase tracking-[0.12em] text-accent">{eyebrow}</p>
        <h1
          className="m-0 max-w-[20ch] text-balance font-display font-extrabold text-primary"
          style={{ ...h2Stijl, fontSize: 'clamp(34px, 4vw, 56px)' }}
        >
          {kop}
          {accent ? <span className="text-accent"> {accent}</span> : null}
        </h1>
        <div className={`m-0 mt-6 max-w-[680px] ${tekst}`}>{lede}</div>
        {knop ? (
          <div className="mt-9">
            <Knop cta={knop} />
          </div>
        ) : null}
      </div>
    </section>
  )
}

/** Punten met een dun streepje erboven, twee of drie naast elkaar. */
export function Punten({
  items,
  donker = false,
  kolommen = 2,
}: {
  items: { t: string; d: string }[]
  donker?: boolean
  kolommen?: 2 | 3
}) {
  return (
    <div className={`mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 ${kolommen === 3 ? 'lg:grid-cols-3' : ''}`}>
      {items.map((p) => (
        <div key={p.t} className={`border-t pt-5 ${donker ? 'border-white/12' : 'border-border'}`}>
          <h3
            className={`m-0 font-display text-[18px] font-bold ${donker ? 'text-white' : 'text-primary'}`}
            style={{ letterSpacing: '-0.01em', lineHeight: '1.25' }}
          >
            {p.t}
          </h3>
          <p className={`m-0 mt-2.5 text-[16px] leading-[1.55] ${donker ? 'text-white/70' : 'text-[#2A3A54]'}`}>{p.d}</p>
        </div>
      ))}
    </div>
  )
}

/** Donkere band met watermerk. */
export function DonkerBlok({ seed, children, label }: { seed: number; children: ReactNode; label?: string }) {
  return (
    <section
      className="relative overflow-hidden bg-primary px-6 text-white"
      style={{ paddingTop: 104, paddingBottom: 104 }}
      aria-label={label}
    >
      <NodeWatermerk seed={seed} thema="donker" />
      <div className="relative mx-auto max-w-[1152px]">{children}</div>
    </section>
  )
}

/** Vragen als uitklapper, met dezelfde vragen als FAQPage voor zoekmachines. */
export function Vragen({ kop, vragen, schema: metSchema = true }: { kop: string; vragen: Vraag[]; schema?: boolean }) {
  // Statische tekst uit dit bestand, geen invoer van bezoekers.
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: vragen.map((q) => ({ '@type': 'Question', name: q.v, acceptedAnswer: { '@type': 'Answer', text: q.a } })),
  }
  return (
    <section className="px-6" style={{ paddingTop: 96, paddingBottom: 96 }}>
      {metSchema ? <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /> : null}
      <div className="mx-auto max-w-[1152px]">
        <h2 className="m-0 font-display font-extrabold text-primary" style={{ ...h2Stijl, fontSize: 'clamp(26px, 2.6vw, 36px)' }}>
          {kop}
        </h2>
        <div className="mt-6 border-t border-border">
          {vragen.map((q) => (
            <details key={q.v} className="group border-b border-border">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 font-display text-[17px] font-bold text-primary [&::-webkit-details-marker]:hidden">
                {q.v}
                <span className="shrink-0 text-[22px] font-normal text-muted transition-transform group-open:rotate-45" aria-hidden="true">
                  +
                </span>
              </summary>
              <p className="m-0 max-w-[680px] pb-6 text-[16px] leading-[1.6] text-[#2A3A54]">{q.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

/** Het slot van de homepage, met het kennismakingsvenster erbij. */
export function Kennismaken({
  kop = 'Wat zouden wij bij jou als eerste doen?',
  zin = 'Dat hoor je in een half uur. Past het niet, dan zeggen we dat ook.',
}: {
  kop?: string
  zin?: string
}) {
  return (
    <>
      <section
        id="kennismaken"
        className="relative overflow-hidden scroll-mt-24 bg-primary px-6 text-white"
        style={{ paddingTop: 112, paddingBottom: 112 }}
      >
        <NodeWatermerk seed={97} thema="donker" />
        <div className="relative mx-auto max-w-[880px] text-center">
          <h2 className="m-0 text-balance font-display font-extrabold text-white" style={h2Stijl}>
            {kop}
          </h2>
          <p className="mx-auto mt-5 max-w-[620px] text-[18px] leading-[1.6] text-white/75">{zin}</p>
          <div className="mt-9 flex justify-center">
            <Knop cta="kennismaking" licht />
          </div>
        </div>
      </section>
      <KennismakingVenster />
    </>
  )
}

/**
 * De kosten, gelijk aan /tarieven en de homepage. Een plek, zodat de bedragen
 * op de dienstpagina's niet uit elkaar kunnen lopen.
 */
export function Kosten({ kop, kanaal }: { kop: string; kanaal: string }) {
  return (
    <DonkerBlok seed={41} label="Kosten">
      <h2 className="m-0 max-w-[20ch] text-balance font-display font-extrabold text-white" style={h2Stijl}>
        {kop}
      </h2>
      <div className="mt-8 max-w-[680px] space-y-5 text-[18px] leading-[1.6]">
        <p className="m-0 text-white/75">
          Wij worden jouw bureau vanaf 1.399 per maand bij jaarbetaling, 1.499 als je per maand betaalt. {kanaal} valt daaronder,
          samen met je andere kanalen. Staat alles goed en wil je het zelf doen, of jouw agents het werk laten doen, dan is het vanaf 399
          per maand.
        </p>
        {/* Zelfde uitleg als het budgetblok op /tarieven (BUDGET in RethinkTarieven.tsx). */}
        <p className="m-0 text-white/75">
          Veel bureaus rekenen 10 tot 20 procent van wat je bij Google en Meta uitgeeft. Dan verdient je bureau meer zodra jij meer
          uitgeeft. Bovendien zegt je budget weinig over hoeveel werk het is.
        </p>
        <p className="m-0 text-white">
          Je prijs groeit niet mee met je advertentiebudget. Wat je precies betaalt hangt af van het werk. Je advertentiebudget betaal je
          rechtstreeks aan het platform, vanaf je eigen account, en wij rekenen er geen marge op.
        </p>
      </div>
      <p className="m-0 mt-8">
        <Link
          href="/tarieven"
          data-cta="kosten_tarieven"
          className="text-[15px] text-white/70 underline underline-offset-4 transition-colors hover:text-white"
        >
          Alle tarieven
        </Link>
      </p>
    </DonkerBlok>
  )
}
