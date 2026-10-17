import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import { ScrollScherm } from './ScrollScherm'
import { ArrowUpRight, Globe, MessageCircle, Smartphone, Gauge, PenLine, Clock } from 'lucide-react'

type Props = { params: Promise<{ locale: string }> }

// W-566: kavelpagina voor de veiling van KBS Laurentius (lustrum, zie W-519).
// Stevin.AI biedt de winnaar een website van een pagina aan, op een eigen
// domeinnaam. Ouders komen hier via de kavelomschrijving in de veiling, niet via
// Google: noindex in de metadata en als kopregel (next.config.ts), niet in de
// sitemap, nergens op de site gelinkt. Alleen Nederlands; /en geeft 410 (W-535).
//
// De drie voorbeelden zijn VERZONNEN demobedrijven uit stevin-sites (Studio
// Adem, Barbier Wolff, Patisserie Saar) met stockfoto's. Daarom staan ze hier
// als voorbeeld en nooit als klant. De schermafdrukken in public/laurentius
// zijn op 17 okt 2026 gemaakt van de live sites, over de hele pagina: telefoon
// 390 breed (780 pixels), laptop 1440 breed. Daarvoor eerst helemaal naar
// beneden gescrold, zodat secties die pas bij het scrollen verschijnen erop
// staan. De vaste belbalk van de telefoon is apart opgenomen (*-balk.jpg), zie
// ScrollScherm.tsx. Nieuwe schermafdruk? Werk ook de hoogtes in VOORBEELDEN bij.
//
// De scores komen uit Lighthouse 12.6.0, op 17 okt 2026 gedraaid tegen de live
// sites. SEO staat er bewust niet bij: de demo's staan op noindex en scoren
// daardoor 60, terwijl elke andere SEO-controle slaagt. Een echte site gaat wel
// de index in. Mobiel wisselt per run (Studio Adem 92 tot 98, Barbier Wolff 88
// en 89, Saar 96 in drie runs); hier staat de laagste.

const VEILING_URL = 'https://veiling.deleuksteschoolvannederland.nl'

// Waarde van het kavel: de prijs van een onepager (Basis) op sites.stevin.ai.
const WAARDE = '495 euro'

const TEKST = {
  titel: 'Een eigen website, kavel in de Laurentius-veiling',
  omschrijving:
    'Stevin.AI bouwt een website van één pagina voor de winnaar, op je eigen domeinnaam. Bekijk hier drie voorbeelden.',
  eyebrow: 'Kavel in de veiling van KBS Laurentius',
  kop: 'Bied op een eigen website voor je bedrijf',
  intro:
    'Stevin.AI bouwt een website van één pagina voor de winnaar van dit kavel. Op je eigen domeinnaam, snel op je telefoon en net zo goed op je laptop.',
  knopVoorbeelden: 'Bekijk de voorbeelden',
  knopVeiling: 'Naar de veiling',
  waarde: `Waarde ${WAARDE}`,
}

const KRIJG = [
  {
    icon: PenLine,
    titel: 'Gemaakt voor jouw bedrijf',
    tekst: 'Wie je bent, wat je doet en hoe klanten je bereiken, met je eigen teksten, foto’s en kleuren.',
  },
  {
    icon: Globe,
    titel: 'Op je eigen domeinnaam',
    tekst: 'Je site staat op jouw adres, bijvoorbeeld jouwbedrijf.nl.',
  },
  {
    icon: Smartphone,
    titel: 'Goed op telefoon en computer',
    tekst: 'De meeste bezoekers komen via hun telefoon. Daar begint het ontwerp, en op een groot scherm ziet hij er net zo goed uit.',
  },
  {
    icon: MessageCircle,
    titel: 'Bellen, appen of een bericht',
    tekst: 'Een vaste knop om te bellen of te WhatsAppen, en een contactformulier voor wie liever schrijft.',
  },
  {
    icon: Gauge,
    titel: 'Snel en vindbaar',
    tekst: 'Licht gebouwd, zodat hij meteen laadt. Met alles wat Google nodig heeft om je te vinden.',
  },
  {
    icon: Clock,
    titel: 'Binnen een week online',
    tekst: 'Zodra we je teksten en foto’s hebben, staat je site binnen een week live.',
  },
]

type Score = { mobiel: number; computer: number }

const VOORBEELDEN: {
  naam: string
  soort: string
  url: string
  slug: string
  score: Score
  /** Hoogte in pixels van de lange schermafdrukken (telefoon 780 breed, laptop 1440 breed). */
  hoogte: { telefoon: number; laptop: number }
}[] = [
  { naam: 'Studio Adem', soort: 'Yoga en ademwerk', url: 'https://studioadem.stevin.ai', slug: 'studioadem', score: { mobiel: 92, computer: 100 }, hoogte: { telefoon: 13726, laptop: 4141 } },
  { naam: 'Barbier Wolff', soort: 'Herenkapper en barbier', url: 'https://barbierwolff.stevin.ai', slug: 'barbierwolff', score: { mobiel: 88, computer: 100 }, hoogte: { telefoon: 11274, laptop: 3288 } },
  { naam: 'Patisserie Saar', soort: 'Taarten op maat', url: 'https://saar.stevin.ai', slug: 'saar', score: { mobiel: 96, computer: 100 }, hoogte: { telefoon: 12448, laptop: 3389 } },
]

const voorbeeld = (slug: string) => VOORBEELDEN.find((v) => v.slug === slug)!

function Hint({ licht }: { licht?: boolean }) {
  const kleur = licht ? 'text-slate-400' : 'text-[var(--color-muted)]'
  return (
    <p className={`text-[13px] ${kleur}`}>
      <span className="pointer-coarse:hidden">Ga met je muis over een scherm en de site scrolt mee.</span>
      <span className="hidden pointer-coarse:inline">Tik op een scherm en de site scrolt mee.</span>
    </p>
  )
}

const STAPPEN = [
  { nr: '1', titel: 'Je wint het kavel', tekst: 'Na de veiling nemen we contact met je op.' },
  { nr: '2', titel: 'We bespreken je site', tekst: 'Wat je doet, voor wie, en welke foto’s en kleuren bij je passen.' },
  { nr: '3', titel: 'Je site gaat live', tekst: 'Op je eigen domeinnaam, binnen een week nadat we alles hebben.' },
]

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  if (locale !== 'nl') return {}
  return {
    title: { absolute: TEKST.titel },
    description: TEKST.omschrijving,
    robots: { index: false, follow: false },
    openGraph: {
      type: 'website',
      siteName: 'Stevin.AI',
      locale: 'nl_NL',
      url: 'https://stevin.ai/laurentius',
      title: TEKST.titel,
      description: TEKST.omschrijving,
    },
    twitter: { card: 'summary_large_image', title: TEKST.titel, description: TEKST.omschrijving },
  }
}

function Telefoon({ slug, naam, className }: { slug: string; naam: string; className?: string }) {
  return (
    <div className={`rounded-[26px] bg-[#0b0f17] p-[6px] shadow-[0_24px_60px_-20px_rgba(0,0,0,0.6)] ring-1 ring-white/10 ${className ?? ''}`}>
      <ScrollScherm
        soort="telefoon"
        src={`/laurentius/${slug}-telefoon-lang.jpg`}
        balk={`/laurentius/${slug}-balk.jpg`}
        breedte={780}
        hoogte={voorbeeld(slug).hoogte.telefoon}
        alt={`Voorbeeldsite ${naam} op een telefoon`}
        sizes="(min-width: 768px) 180px, 30vw"
      />
    </div>
  )
}

function Laptop({ slug, naam, priority }: { slug: string; naam: string; priority?: boolean }) {
  return (
    <div>
      <div className="rounded-t-[14px] bg-[#0b0f17] p-[8px] pb-[10px] ring-1 ring-white/10">
        <ScrollScherm
          soort="laptop"
          src={`/laurentius/${slug}-laptop-lang.jpg`}
          breedte={1440}
          hoogte={voorbeeld(slug).hoogte.laptop}
          alt={`Voorbeeldsite ${naam} op een laptop`}
          sizes="(min-width: 768px) 560px, 90vw"
          priority={priority}
        />
      </div>
      <div className="mx-[-4%] h-[12px] rounded-b-[10px] bg-gradient-to-b from-[#c9d1dc] to-[#8b95a3]" />
    </div>
  )
}

export default async function LaurentiusPage({ params }: Props) {
  const { locale } = await params
  if (locale !== 'nl') notFound()
  setRequestLocale(locale)

  return (
    <main>
      {/* Hero met de visual: laptop plus twee telefoons */}
      <section className="relative overflow-hidden bg-[var(--color-primary)] px-5 pb-20 pt-28 md:pb-28 md:pt-36">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-[var(--color-accent)] opacity-20 blur-[120px]"
        />
        <div className="relative mx-auto grid w-full max-w-[1120px] items-center gap-14 md:grid-cols-[1fr_1.1fr]">
          <div>
            <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-[var(--color-accent)]">{TEKST.eyebrow}</p>
            <h1 className="mt-4 font-display text-[36px] font-extrabold leading-[1.05] tracking-[-0.02em] text-white md:text-[52px]">
              {TEKST.kop}
            </h1>
            <p className="mt-5 max-w-[520px] text-[17px] leading-relaxed text-slate-300">{TEKST.intro}</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#voorbeelden"
                className="rounded-full bg-[var(--color-accent)] px-6 py-3 text-[15px] font-semibold text-white transition hover:brightness-110"
              >
                {TEKST.knopVoorbeelden}
              </a>
              <a
                href={VEILING_URL}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/25 px-6 py-3 text-[15px] font-semibold text-white transition hover:bg-white/10"
              >
                {TEKST.knopVeiling}
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </a>
            </div>
            <p className="mt-6 inline-block rounded-full bg-white/10 px-4 py-1.5 text-[13px] font-semibold text-white">
              {TEKST.waarde}
            </p>
          </div>

          <div className="mx-auto w-full max-w-[560px]">
            <div className="relative pb-10 md:pb-14">
              <Laptop slug="studioadem" naam="Studio Adem" priority />
              <Telefoon slug="barbierwolff" naam="Barbier Wolff" className="absolute bottom-0 -left-2 w-[23%] md:-left-8" />
              <Telefoon slug="saar" naam="Patisserie Saar" className="absolute bottom-0 -right-2 w-[23%] md:-right-8" />
            </div>
            <div className="mt-6 text-center">
              <Hint licht />
            </div>
          </div>
        </div>
      </section>

      {/* Wat je krijgt */}
      <section className="bg-white px-5 py-20 md:py-24">
        <div className="mx-auto w-full max-w-[1120px]">
          <h2 className="font-display text-[28px] font-extrabold tracking-[-0.01em] text-[var(--color-primary)] md:text-[36px]">
            Wat je krijgt
          </h2>
          <div className="mt-10 grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
            {KRIJG.map(({ icon: Icon, titel, tekst }) => (
              <div key={titel}>
                <div className="flex h-11 w-11 items-center justify-center rounded-[12px] bg-[var(--color-surface-alt)] text-[var(--color-accent)]">
                  <Icon className="h-5 w-5" aria-hidden />
                </div>
                <h3 className="mt-4 text-[17px] font-bold text-[var(--color-primary)]">{titel}</h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-[var(--color-muted)]">{tekst}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Voorbeelden met gemeten scores */}
      <section id="voorbeelden" className="scroll-mt-20 bg-[var(--color-surface)] px-5 py-20 md:py-24">
        <div className="mx-auto w-full max-w-[1120px]">
          <h2 className="font-display text-[28px] font-extrabold tracking-[-0.01em] text-[var(--color-primary)] md:text-[36px]">
            Drie voorbeelden
          </h2>
          <p className="mt-3 max-w-[640px] text-[16px] leading-relaxed text-[var(--color-muted)]">
            Deze bedrijven bestaan niet: we hebben ze verzonnen om te laten zien wat er kan. Open ze op je telefoon en op je
            computer. Jouw site krijgt je eigen teksten, foto’s en kleuren.
          </p>
          <div className="mt-2">
            <Hint />
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {VOORBEELDEN.map((v) => (
              <div
                key={v.slug}
                className="flex flex-col overflow-hidden rounded-[14px] border border-[var(--color-border)] bg-white"
              >
                <div className="relative bg-[var(--color-surface-alt)] px-6 pt-6">
                  <div className="overflow-hidden rounded-t-[8px] border border-b-0 border-[var(--color-border)]">
                    <ScrollScherm
                      soort="laptop"
                      src={`/laurentius/${v.slug}-laptop-lang.jpg`}
                      breedte={1440}
                      hoogte={v.hoogte.laptop}
                      alt={`Voorbeeldsite ${v.naam} op een computer`}
                      sizes="(min-width: 768px) 340px, 90vw"
                    />
                  </div>
                  <Telefoon slug={v.slug} naam={v.naam} className="absolute bottom-[-18px] right-4 w-[26%]" />
                </div>
                <div className="flex flex-1 flex-col px-6 pb-6 pt-8">
                  <p className="text-[12px] font-bold uppercase tracking-[0.1em] text-[var(--color-muted)]">{v.soort}</p>
                  <h3 className="mt-1 text-[20px] font-bold text-[var(--color-primary)]">{v.naam}</h3>
                  <dl className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-[10px] bg-[var(--color-surface)] px-3 py-2.5">
                      <dt className="text-[12px] text-[var(--color-muted)]">Snelheid mobiel</dt>
                      <dd className="text-[22px] font-extrabold text-[#1f9d55]">{v.score.mobiel}</dd>
                    </div>
                    <div className="rounded-[10px] bg-[var(--color-surface)] px-3 py-2.5">
                      <dt className="text-[12px] text-[var(--color-muted)]">Snelheid computer</dt>
                      <dd className="text-[22px] font-extrabold text-[#1f9d55]">{v.score.computer}</dd>
                    </div>
                  </dl>
                  <a
                    href={v.url}
                    target="_blank"
                    rel="noopener"
                    className="group mt-5 inline-flex items-center gap-1.5 self-start text-[15px] font-semibold text-[var(--color-accent)]"
                  >
                    Bekijk de site
                    <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
                  </a>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-[13px] leading-relaxed text-[var(--color-muted)]">
            Snelheid uit 100, gemeten met Lighthouse van Google in oktober 2026. Toegankelijkheid scoort 95 en de technische
            basis 100 op alle drie.
          </p>
        </div>
      </section>

      {/* Hoe het werkt na de veiling */}
      <section className="bg-[var(--color-primary)] px-5 py-20 md:py-24">
        <div className="mx-auto w-full max-w-[1120px]">
          <h2 className="font-display text-[28px] font-extrabold tracking-[-0.01em] text-white md:text-[36px]">
            Zo gaat het als je wint
          </h2>
          <ol className="mt-10 grid gap-6 md:grid-cols-3">
            {STAPPEN.map((s) => (
              <li key={s.nr} className="rounded-[14px] border border-white/10 bg-white/[0.04] p-6">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-accent)] text-[15px] font-bold text-white">
                  {s.nr}
                </span>
                <h3 className="mt-4 text-[17px] font-bold text-white">{s.titel}</h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-slate-300">{s.tekst}</p>
              </li>
            ))}
          </ol>
          <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-4">
            <a
              href={VEILING_URL}
              className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-accent)] px-6 py-3 text-[15px] font-semibold text-white transition hover:brightness-110"
            >
              Bied mee in de veiling
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </a>
            <p className="text-[15px] text-slate-300">
              Vragen over dit kavel? Mail{' '}
              <a href="mailto:koen@stevin.ai" className="font-semibold text-white underline underline-offset-4">
                koen@stevin.ai
              </a>
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
