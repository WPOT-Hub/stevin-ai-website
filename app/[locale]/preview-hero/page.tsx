import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'

type Props = { params: Promise<{ locale: string }> }

// VOORBEELDPAGINA, niet gelinkt en op noindex.
//
// Hero-voorstel van 28 juli 2026. Aanleiding: Aizy (tryaizy.com/pricing) zet
// een dashboard op de homepage met zwevende kaarten die uit het kader steken.
// Dat werkt, maar hun zwevende kaarten tonen omzetcijfers (+398%), en dat is
// precies het verhaal dat Stevin niet vertelt.
//
// Wat hier zweeft is daarom niet een getal maar de redenering: een melding met
// Waarom, Advies en de keuze wie hem uitvoert. Dat is het enige dat een
// paid-tool structureel niet kan tonen, want die heeft het al gedaan.
//
// De meldingen komen een voor een binnen. Niet als truc: het laat zien dat het
// ding doorwerkt, en dat is exact wat Aizy met tijdstempels probeert te
// suggereren. De achtergrond is een echte opname uit de Desk (LUMOS-demo),
// geen mockup.
//
// Zodra dit akkoord is verhuist het naar de hero in app/[locale]/page.tsx.

export const metadata: Metadata = {
  title: 'Voorbeeld hero',
  robots: { index: false, follow: false },
}

const COPY = {
  eyebrow: 'Uit de Desk, geen schermontwerp',
  h1a: 'Niet alleen dat er iets misgaat.',
  h1b: 'Ook waarom, en wat je eraan doet.',
  sub: 'Stevin kijkt mee op je advertenties, je vindbaarheid, je winkel en je merk. Wat hij vindt komt met de reden erbij en de actie er klaar naast.',
  slot: 'Wie hem uitvoert, kies je zelf.',
  cta: 'Start de diagnose',
  ctaSub: 'Eerst de diagnose op je eigen cijfers. Daarna pas een voorstel.',
  live: 'Nu aan het meekijken',

  meldingen: [
    {
      nr: '01',
      titel: '[Scheveningen] KNMI hittegolf wk28, strand wint, tenzij wij contra-acten',
      tags: ['trend', 'hittegolf', 'campagnes'],
      waarom: 'KNMI hittegolf 32-35°C wk28 voor Midden+Zuid-NL, strand-bezetting Scheveningen verwacht +120%.',
      advies: 'Switch creative naar de indoor-set, budget bijsturen voor een window van vijf dagen.',
    },
    {
      nr: '02',
      titel: '[Beide vestigingen] Grote storing bij Meta raakt advertentielevering',
      tags: ['bug', 'meta', 'outage', 'incident'],
      waarom: 'Advertentielevering hapert en accounts geven onregelmatig uit. Bevestigd door meerdere bronnen.',
      advies: 'Pauzeer de kwetsbare Meta-sets, verschuif budget tijdelijk, herstart zodra Meta groen meldt.',
    },
    {
      nr: '03',
      titel: '[Brussel] Consent-rate cookies onder 58%, modeled conversions activeren',
      tags: ['trend', 'cookies', 'consent'],
      waarom: 'Consent-rate gedaald naar 58 procent, tegen 71 procent in Nederland. Toezichthouder beboette drie platforms.',
      advies: 'Modeled conversions activeren en de consent-flow laten nakijken voor de meting verder wegzakt.',
    },
  ],
  knoppen: ['Oppakken', 'Meer info', 'Niet relevant'],
}

export default async function PreviewHero({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <main style={{ background: '#0A1628' }}>
      <div
        className="text-center text-white"
        style={{ padding: '10px 24px', fontSize: '13px', letterSpacing: '0.04em', background: 'rgba(255,255,255,0.06)' }}
      >
        Voorbeeld, staat niet online en is niet gelinkt
      </div>

      <style>{`
        @keyframes stv-in {
          from { opacity: 0; transform: translateY(16px) scale(0.985); }
          to   { opacity: 1; transform: translateY(0)    scale(1); }
        }
        /* Een kaart tegelijk, niet drie. Aizy komt met een druk beeld weg omdat
           het EEN object is met twee chips ernaast; drie kaarten plus een
           dashboard zijn vier dingen die om aandacht vechten. Wisselen geeft
           dezelfde beweging zonder de drukte, en je hoeft maar een ding te
           lezen. Cyclus van 15s, drie meldingen van 5s. */
        @keyframes stv-wissel {
          0%              { opacity: 0; transform: translateY(14px) scale(0.985); }
          3%, 30%         { opacity: 1; transform: translateY(0)    scale(1); }
          33%, 100%       { opacity: 0; transform: translateY(-8px) scale(0.99); }
        }
        .stv-wissel {
          opacity: 0;
          animation: stv-wissel 15s cubic-bezier(0.16, 1, 0.3, 1) infinite;
        }
        @keyframes stv-tekst {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes stv-puls {
          0%, 100% { opacity: 1;   transform: scale(1); }
          50%      { opacity: 0.45; transform: scale(0.82); }
        }
        .stv-anim { opacity: 0; animation: stv-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .stv-tekst { opacity: 0; animation: stv-tekst 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .stv-puls { animation: stv-puls 2.2s ease-in-out infinite; }
        /* Beweging is hier betekenisdragend (het ding werkt door), maar nooit
           ten koste van wie er ziek van wordt. */
        @media (prefers-reduced-motion: reduce) {
          .stv-anim, .stv-tekst { opacity: 1; animation: none; }
          .stv-puls { animation: none; }
          /* Zonder beweging blijft alleen de eerste melding staan. */
          .stv-wissel { opacity: 0; animation: none; }
          .stv-wissel:first-of-type { opacity: 1; }
        }
      `}</style>

      <section style={{ padding: '80px 24px 96px', overflow: 'hidden' }}>
        <div className="mx-auto max-w-[1240px] grid gap-16 lg:gap-12 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1fr)] items-center">

          {/* ── Tekst ── */}
          <div>
            <p
              className="stv-tekst font-display font-bold m-0 mb-6 flex items-center gap-[14px]"
              style={{ fontSize: '12px', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#5DA3FF', animationDelay: '0.05s' }}
            >
              <span className="inline-block w-6 h-px flex-shrink-0" style={{ background: '#5DA3FF', opacity: 0.6 }} aria-hidden="true" />
              {COPY.eyebrow}
            </p>

            <h1
              className="stv-tekst font-display font-extrabold text-white m-0"
              style={{ fontSize: 'clamp(34px, 4vw, 60px)', letterSpacing: '-0.04em', lineHeight: '1.04', textWrap: 'balance', animationDelay: '0.12s' }}
            >
              {COPY.h1a}
              <br />
              <span style={{ color: '#5DA3FF' }}>{COPY.h1b}</span>
            </h1>

            <p
              className="stv-tekst text-slate-300 leading-[1.65]"
              style={{ fontSize: '17px', maxWidth: '46ch', marginTop: '26px', animationDelay: '0.2s' }}
            >
              {COPY.sub}
            </p>

            <p
              className="stv-tekst font-display font-bold text-white"
              style={{ fontSize: '19px', letterSpacing: '-0.02em', marginTop: '18px', animationDelay: '0.28s' }}
            >
              {COPY.slot}
            </p>

            <div className="stv-tekst" style={{ marginTop: '34px', animationDelay: '0.36s' }}>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-accent text-white font-display font-bold text-[15px] px-8 py-3.5 rounded-lg hover:bg-accent-dark transition-colors"
              >
                {COPY.cta}
              </Link>
              <p className="text-slate-400 m-0" style={{ fontSize: '13px', marginTop: '14px' }}>
                {COPY.ctaSub}
              </p>
            </div>
          </div>

          {/* ── Beeld: echte opname, met de redenering eroverheen ── */}
          <div className="relative">
            {/* De opname zelf. Gedimd en naar rechts geschoven zodat hij bewijs
                levert zonder de leesbare kaarten te beconcurreren. */}
            <div
              className="stv-anim relative rounded-2xl overflow-hidden"
              style={{
                animationDelay: '0.1s',
                border: '1px solid rgba(255,255,255,0.10)',
                boxShadow: '0 40px 80px -24px rgba(0,0,0,0.65)',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/product/desk-dashboard.png"
                alt="De Stevin Desk met meldingen, cijfers per kanaal en de markt-radar"
                style={{ display: 'block', width: '112%', maxWidth: 'none', marginLeft: '-6%', opacity: 0.78 }}
              />
              {/* Nu er nog maar een kaart overheen ligt, mag het dashboard zelf
                  weer gezien worden. Alleen links dimmen, waar de kaart komt. */}
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(100deg, rgba(10,22,40,0.88) 0%, rgba(10,22,40,0.55) 46%, rgba(10,22,40,0.12) 100%)',
                }}
              />
            </div>

            {/* De meldingen komen een voor een binnen, over de opname heen. */}
            <div
              className="absolute inset-0 flex flex-col justify-center gap-3"
              style={{ padding: '4% 6% 4% 2%' }}
            >
              <p
                className="stv-tekst flex items-center gap-2.5 m-0"
                style={{ fontSize: '11px', letterSpacing: '0.09em', textTransform: 'uppercase', color: '#5DA3FF', animationDelay: '0.5s' }}
              >
                <span className="stv-puls inline-block rounded-full" style={{ width: '7px', height: '7px', background: '#5DA3FF' }} aria-hidden="true" />
                {COPY.live}
              </p>

              {COPY.meldingen.map((m, i) => (
                <article
                  key={m.nr}
                  className="stv-anim rounded-xl"
                  style={{
                    animationDelay: `${0.75 + i * 0.55}s`,
                    background: 'rgba(255,255,255,0.97)',
                    border: '1px solid rgba(255,255,255,0.6)',
                    boxShadow: '0 18px 40px -14px rgba(0,0,0,0.55)',
                    padding: '16px 18px',
                    // Trapje naar rechts, zodat het een stapel lijkt die
                    // binnenkomt in plaats van een nette lijst.
                    marginLeft: `${i * 5}%`,
                    marginRight: `${(2 - i) * 3}%`,
                  }}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className="font-display font-extrabold flex-shrink-0"
                      style={{ fontSize: '11px', letterSpacing: '0.08em', color: '#3D8EFF', paddingTop: '2px' }}
                    >
                      {m.nr}
                    </span>
                    <div style={{ minWidth: 0 }}>
                      <p
                        className="font-display font-bold text-primary m-0"
                        style={{ fontSize: '14px', lineHeight: '1.35', letterSpacing: '-0.01em' }}
                      >
                        {m.titel}
                      </p>
                      <p className="m-0 flex flex-wrap gap-x-2.5 gap-y-1" style={{ marginTop: '6px' }}>
                        {m.tags.map((t) => (
                          <span key={t} className="text-muted" style={{ fontSize: '11px' }}>
                            {t}
                          </span>
                        ))}
                      </p>
                      <p className="text-muted m-0" style={{ fontSize: '12.5px', lineHeight: '1.5', marginTop: '9px' }}>
                        <strong className="text-primary font-semibold">Waarom:</strong> {m.waarom}
                      </p>
                      <p className="text-muted m-0" style={{ fontSize: '12.5px', lineHeight: '1.5', marginTop: '4px' }}>
                        <strong className="text-primary font-semibold">Advies:</strong> {m.advies}
                      </p>
                      <div className="flex flex-wrap gap-1.5" style={{ marginTop: '11px' }}>
                        {COPY.knoppen.map((k, ki) => (
                          <span
                            key={k}
                            className="font-display font-bold rounded-md"
                            style={{
                              fontSize: '11px',
                              padding: '5px 11px',
                              background: ki === 0 ? '#0A1628' : 'transparent',
                              color: ki === 0 ? '#fff' : '#4A5568',
                              border: ki === 0 ? '1px solid #0A1628' : '1px solid rgba(10,22,40,0.16)',
                            }}
                          >
                            {k}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
