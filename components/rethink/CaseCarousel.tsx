'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { Link } from '@/i18n/navigation'

// Kaartenstapel met de klantcases (W-860). Eigen opbouw, geen bibliotheek. Alleen
// echte beelden en cijfers uit de klantdossiers, geen bedragen, geen citaten
// zonder akkoord. Alle kaarten liggen in dezelfde gridcel. De actieve staat
// voorop op ware grootte, de buren liggen er aan beide kanten verkleind
// (84%) en opzij geschoven achter, een stap verder is onzichtbaar.
// Bladeren kan met pijlen, stippen, een klik op een buur, swipen en de
// pijltjestoetsen.

type Kaart = {
  slug: string
  // false tot de klant akkoord heeft gegeven op openbare vermelding.
  openbaar: boolean
  klant: string
  kop: string
  tekst: string
  beeld: ReactNode
  cijfers: { getal: string; label: string }[]
}

const FOTO = 'relative min-h-[240px] overflow-hidden rounded-2xl bg-primary md:min-h-[320px]'

const ALLE_KAARTEN: Kaart[] = [
  {
    slug: 'hans-schepers',
    openbaar: true,
    klant: 'Hans Schepers Stoffering',
    kop: 'Op zijn site stonden gokpagina’s. Hans wist van niets.',
    tekst: 'In de eerste week haalden we ze weg, bouwden de meting opnieuw op en zetten echte aanvragen terug die in de spambak waren beland.',
    beeld: (
      <div className="relative aspect-[8/5] w-full self-center overflow-hidden rounded-2xl border border-border bg-white">
        <Image
          src="/images/cases/hans-gokpagina-2026-04-17.jpg"
          alt="Een casinopagina op hansschepers.nl uit het Internet Archive"
          fill
          sizes="(min-width: 768px) 560px, 88vw"
          className="object-contain"
        />
      </div>
    ),
    cijfers: [
      { getal: '137+', label: 'gokpagina’s weggehaald' },
      { getal: '605', label: 'spaminzendingen doorgelezen' },
      { getal: '2', label: 'echte aanvragen teruggezet' },
    ],
  },
  {
    slug: 'ecomy-energie',
    openbaar: true,
    klant: 'Ecomy Energie',
    kop: 'Nieuw logo, nieuwe site en een check die je dak tekent.',
    tekst: 'Een installateur in Wijchen kreeg in een paar weken het hele merk opnieuw, met een check die de panelen op je eigen dak legt.',
    beeld: (
      <div className={`${FOTO} bg-[#F3F6FA]`}>
        <Image
          src="/images/cases/ecomy-check.webp"
          alt="De check van Ecomy: een dak van bovenaf met de panelen erop"
          fill
          sizes="(min-width: 768px) 560px, 88vw"
          className="object-contain p-3"
        />
      </div>
    ),
    cijfers: [
      { getal: '342', label: 'gemeenten met een eigen leningregeling' },
      { getal: '4', label: 'gemeentepagina’s live' },
      { getal: '1', label: 'telefoon voor elke aanvraag' },
    ],
  },
  {
    slug: 'sterker-witgoed',
    openbaar: false,
    klant: 'Sterker Witgoed',
    kop: '667 handelingen in acht weken, elk met bewijs vastgelegd.',
    tekst: 'Een webwinkel in witgoed kreeg zijn productfeed hersteld en een begeleide livegang van zijn nieuwe site.',
    beeld: (
      <div className={`${FOTO} flex flex-col justify-center gap-6 p-8 text-white`}>
        <div>
          <p className="m-0 font-display text-[64px] font-extrabold leading-none" style={{ letterSpacing: '-0.03em' }}>667</p>
          <p className="m-0 mt-2 text-[15px] text-white/70">handelingen in het logboek</p>
        </div>
        <div className="grid gap-3 text-[13px] text-white/80">
          <div>
            <div className="flex justify-between"><span>Voor het herstel</span><span>2 van 3 klikken</span></div>
            <div className="mt-1.5 h-2.5 rounded-full bg-white/15"><div className="h-2.5 rounded-full bg-white/70" style={{ width: '67%' }} /></div>
          </div>
          <div>
            <div className="flex justify-between"><span>Na het herstel</span><span>1 van 128 klikken</span></div>
            <div className="mt-1.5 h-2.5 rounded-full bg-white/15"><div className="h-2.5 rounded-full bg-accent" style={{ width: '1.5%' }} /></div>
          </div>
        </div>
      </div>
    ),
    cijfers: [
      { getal: '667', label: 'handelingen in acht weken' },
      { getal: '11', label: 'incidenten rond de nieuwe site vastgelegd' },
      { getal: '1 van 128', label: 'klikken ging nog naar een verkeerd product' },
    ],
  },
]

const KAARTEN = ALLE_KAARTEN.filter((k) => k.openbaar)

export default function CaseCarousel() {
  const [actief, setActief] = useState(0)
  const n = KAARTEN.length
  const naar = (i: number) => setActief(Math.min(n - 1, Math.max(0, i)))
  const start = useRef<number | null>(null)

  return (
    <section className="overflow-x-clip bg-white px-4 py-20 sm:py-24" aria-label="Klantcases">
      <div className="mx-auto max-w-[1152px] text-center">
        <p className="m-0 font-display text-[12px] font-bold uppercase tracking-[0.12em] text-accent">Klantcases</p>
        <h2
          className="m-0 mt-4 text-balance font-display font-extrabold text-primary"
          style={{ fontSize: 'clamp(30px, 3.4vw, 48px)', letterSpacing: '-0.03em', lineHeight: '1.08' }}
        >
          Wat we voor klanten deden.
        </h2>
      </div>

      <div
        className="relative mx-auto mt-12 max-w-[1240px] touch-pan-y outline-none"
        aria-roledescription="carrousel"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') naar(actief - 1)
          if (e.key === 'ArrowRight') naar(actief + 1)
        }}
        onPointerDown={(e) => {
          start.current = e.clientX
        }}
        onPointerUp={(e) => {
          if (start.current === null) return
          const dx = e.clientX - start.current
          start.current = null
          if (Math.abs(dx) > 50) naar(actief + (dx < 0 ? 1 : -1))
        }}
      >
        <div className="grid justify-items-center">
          {KAARTEN.map((k, i) => {
            const d = i - actief
            const a = Math.abs(d)
            const voor = d === 0
            return (
              <article
                key={k.slug}
                aria-label={`${i + 1} van ${n}: ${k.klant}`}
                aria-hidden={!voor}
                onClick={voor ? undefined : () => naar(i)}
                style={{
                  gridArea: '1 / 1',
                  zIndex: 100 - a * 10,
                  transform: `translateX(${d * 22}%) scale(${1 - a * 0.16})`,
                  opacity: a > 1 ? 0 : 1,
                  pointerEvents: a > 1 ? 'none' : 'auto',
                }}
                className={`flex w-[min(560px,84vw)] flex-col gap-5 rounded-[32px] lg:grid lg:w-[min(1000px,84vw)] lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-6 bg-[#F3F5F9] p-2.5 shadow-[0_24px_48px_-24px_rgba(10,22,40,0.28)] ring-1 ring-primary/5 transition-[transform,opacity] duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  voor ? '' : 'cursor-pointer select-none'
                }`}
              >
                {k.beeld}
                <div className={`flex flex-col gap-4 px-4 pb-4 pt-1 lg:px-6 lg:py-6 ${voor ? '' : 'pointer-events-none'}`}>
                  <p className="m-0 font-display text-[13px] font-bold uppercase tracking-[0.14em] text-primary">{k.klant}</p>
                  <h3 className="m-0 font-display text-[24px] font-bold text-primary md:text-[28px]" style={{ letterSpacing: '-0.02em', lineHeight: '1.15' }}>
                    {k.kop}
                  </h3>
                  <p className="m-0 text-[16px] leading-[1.55] text-[#2A3A54]">{k.tekst}</p>
                  <dl className="m-0 grid grid-cols-3 gap-2 border-t border-border pt-4 sm:gap-3">
                    {k.cijfers.map((c) => (
                      <div key={c.label}>
                        <dt className="font-display text-[20px] font-extrabold text-primary sm:text-[24px]" style={{ letterSpacing: '-0.02em', lineHeight: '1.1' }}>{c.getal}</dt>
                        <dd className="m-0 mt-1 break-words text-[11.5px] leading-[1.35] text-[#5B6B85] sm:text-[12.5px]">{c.label}</dd>
                      </div>
                    ))}
                  </dl>
                  <Link
                    href={`/case-studies/${k.slug}`}
                    tabIndex={voor ? 0 : -1}
                    data-cta={`case_carrousel_${k.slug}`}
                    className="inline-flex w-fit items-center gap-2 rounded-full bg-primary px-6 py-3 font-display text-[15px] font-semibold text-white transition-[filter] hover:brightness-125"
                  >
                    Lees de case <span aria-hidden="true">{'\u2192'}</span>
                  </Link>
                </div>
              </article>
            )
          })}
        </div>

        <button
          type="button"
          onClick={() => naar(actief - 1)}
          disabled={actief === 0}
          aria-label="Vorige case"
          className="absolute left-0 top-[38%] z-[110] flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[22px] text-primary shadow-lg ring-1 ring-primary/10 transition-opacity disabled:opacity-30 sm:h-14 sm:w-14"
        >
          {'\u2039'}
        </button>
        <button
          type="button"
          onClick={() => naar(actief + 1)}
          disabled={actief === n - 1}
          aria-label="Volgende case"
          className="absolute right-0 top-[38%] z-[110] flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[22px] text-primary shadow-lg ring-1 ring-primary/10 transition-opacity disabled:opacity-30 sm:h-14 sm:w-14"
        >
          {'\u203A'}
        </button>
      </div>

      <div className="mt-8 flex items-center justify-center gap-2" role="tablist" aria-label="Kies een case">
        {KAARTEN.map((k, i) => (
          <button
            key={k.slug}
            type="button"
            role="tab"
            aria-selected={i === actief}
            aria-label={k.klant}
            onClick={() => naar(i)}
            className={`h-2 rounded-full transition-all ${i === actief ? 'w-10 bg-accent' : 'w-2 bg-[#D6DDE8]'}`}
          />
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link
          href="/case-studies"
          data-cta="case_carrousel_alle"
          className="inline-flex items-center rounded-full border border-primary px-8 py-4 font-display text-[16px] font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
        >
          Bekijk alle cases
        </Link>
      </div>
    </section>
  )
}
