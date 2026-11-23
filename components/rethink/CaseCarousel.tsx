'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { Link } from '@/i18n/navigation'

// Carrousel met de klantcases (W-860). Eigen opbouw, geen bibliotheek. Alleen
// echte beelden en cijfers uit de klantdossiers, geen bedragen, geen citaten
// zonder akkoord. Kaarten staan in een scrollcontainer met snap, de buren
// kijken om de hoek mee. Pijlen en stippen sturen dezelfde scroll aan.

type Kaart = {
  slug: string
  klant: string
  kop: string
  tekst: string
  beeld: ReactNode
  cijfers: { getal: string; label: string }[]
}

const FOTO = 'relative min-h-[240px] overflow-hidden rounded-2xl bg-primary md:min-h-[320px]'

const KAARTEN: Kaart[] = [
  {
    slug: 'hans-schepers',
    klant: 'Hans Schepers Stoffering',
    kop: 'Op zijn site stonden gokpagina’s. Hans wist van niets.',
    tekst: 'In de eerste week haalden we ze weg, bouwden de meting opnieuw op en zetten echte aanvragen terug die in de spambak waren beland.',
    beeld: (
      <div className={FOTO}>
        <Image
          src="/images/cases/hans-gokpagina-2026-04-17.jpg"
          alt="Een casinopagina op hansschepers.nl uit het Internet Archive"
          fill
          sizes="(min-width: 768px) 560px, 88vw"
          className="object-cover object-top"
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

export default function CaseCarousel() {
  const lijst = useRef<HTMLDivElement>(null)
  const [actief, setActief] = useState(0)

  const naar = useCallback((i: number) => {
    const el = lijst.current
    const kaart = el?.children[i] as HTMLElement | undefined
    if (!el || !kaart) return
    el.scrollTo({ left: kaart.offsetLeft - (el.clientWidth - kaart.clientWidth) / 2, behavior: 'smooth' })
  }, [])

  useEffect(() => {
    const el = lijst.current
    if (!el) return
    const bijwerken = () => {
      const midden = el.scrollLeft + el.clientWidth / 2
      let dichtst = 0
      let afstand = Infinity
      Array.from(el.children).forEach((k, i) => {
        const c = k as HTMLElement
        const d = Math.abs(c.offsetLeft + c.clientWidth / 2 - midden)
        if (d < afstand) {
          afstand = d
          dichtst = i
        }
      })
      setActief(dichtst)
    }
    el.addEventListener('scroll', bijwerken, { passive: true })
    return () => el.removeEventListener('scroll', bijwerken)
  }, [])

  const stap = (r: -1 | 1) => naar(Math.min(KAARTEN.length - 1, Math.max(0, actief + r)))

  return (
    <section className="bg-white px-0 py-20 sm:py-24" aria-label="Klantcases">
      <div className="mx-auto max-w-[1152px] px-6 text-center">
        <p className="m-0 font-display text-[12px] font-bold uppercase tracking-[0.12em] text-accent">Klantcases</p>
        <h2
          className="m-0 mt-4 text-balance font-display font-extrabold text-primary"
          style={{ fontSize: 'clamp(30px, 3.4vw, 48px)', letterSpacing: '-0.03em', lineHeight: '1.08' }}
        >
          Wat we voor klanten deden.
        </h2>
      </div>

      <div className="relative mt-12">
        <div
          ref={lijst}
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto px-[6vw] pb-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          tabIndex={0}
          aria-roledescription="carrousel"
        >
          {KAARTEN.map((k, i) => (
            <article
              key={k.slug}
              aria-label={`${i + 1} van ${KAARTEN.length}: ${k.klant}`}
              className={`grid w-[88vw] max-w-[1080px] shrink-0 snap-center gap-6 rounded-[28px] border border-border bg-[#F7F8FA] p-4 shadow-[0_10px_40px_rgba(10,22,40,0.08)] transition-opacity duration-300 md:grid-cols-[1.05fr_1fr] md:p-5 ${
                i === actief ? 'opacity-100' : 'opacity-50'
              }`}
            >
              {k.beeld}
              <div className="flex flex-col justify-center gap-5 px-2 py-3 md:px-4">
                <p className="m-0 font-display text-[13px] font-bold uppercase tracking-[0.14em] text-primary">{k.klant}</p>
                <h3 className="m-0 font-display text-[26px] font-bold text-primary md:text-[30px]" style={{ letterSpacing: '-0.02em', lineHeight: '1.15' }}>
                  {k.kop}
                </h3>
                <p className="m-0 text-[16px] leading-[1.55] text-[#2A3A54]">{k.tekst}</p>
                <Link
                  href={`/case-studies/${k.slug}`}
                  data-cta={`case_carrousel_${k.slug}`}
                  className="inline-flex w-fit items-center gap-2 border-b-2 border-primary font-display text-[16px] font-semibold text-primary"
                >
                  Lees de case <span aria-hidden="true">{'→'}</span>
                </Link>
                <dl className="m-0 mt-2 grid grid-cols-3 gap-3">
                  {k.cijfers.map((c) => (
                    <div key={c.label}>
                      <dt className="font-display text-[26px] font-extrabold text-primary" style={{ letterSpacing: '-0.02em', lineHeight: '1.1' }}>{c.getal}</dt>
                      <dd className="m-0 mt-1 text-[13px] leading-[1.35] text-[#5B6B85]">{c.label}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </article>
          ))}
        </div>

        <button
          type="button"
          onClick={() => stap(-1)}
          disabled={actief === 0}
          aria-label="Vorige case"
          className="absolute left-3 top-1/2 hidden h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-[22px] text-white shadow-lg transition-opacity disabled:opacity-30 md:flex"
        >
          {'‹'}
        </button>
        <button
          type="button"
          onClick={() => stap(1)}
          disabled={actief === KAARTEN.length - 1}
          aria-label="Volgende case"
          className="absolute right-3 top-1/2 hidden h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-[22px] text-white shadow-lg transition-opacity disabled:opacity-30 md:flex"
        >
          {'›'}
        </button>
      </div>

      <div className="mt-2 flex items-center justify-center gap-2" role="tablist" aria-label="Kies een case">
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
          className="inline-flex items-center rounded-full bg-primary px-8 py-4 font-display text-[16px] font-semibold text-white transition-[filter] hover:brightness-125"
        >
          Bekijk alle cases
        </Link>
      </div>
    </section>
  )
}
