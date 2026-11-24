import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import ContactForm from '@/components/ContactForm'
import Image from 'next/image'
import { BarChart3, Megaphone, Phone, Smartphone } from 'lucide-react'
import { TELEFOON } from '@/lib/telefoon'
import { h2Stijl } from '@/components/rethink/RethinkBlokken'
import Citaten from '@/components/ps5/Citaten'
import CaseCarousel from '@/components/rethink/CaseCarousel'

type Props = {
  params: Promise<{ locale: string }>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

// W-861: elk vak krijgt in de advertentie een eigen link (?vak=dakdekker of ?vak=installateur).
// Alleen waarden uit deze lijst tellen; al het andere wordt genegeerd, zodat niemand
// via de link eigen tekst op de pagina kan zetten.
type Vak = { enkelvoud: string; meervoud: string; kop: string; bedrijf: string }
// Koen 22 nov 23:19: breed op alle adverteerders, vijf plekken in totaal, niet per vak.
// BEZET is het aantal vergeven plekken, voor alle varianten van de pagina samen. Bij elke
// nieuwe klant ophogen en de advertenties wisselen (meta-advertenties/per-aantal-bezet).
const BEZET = 1
const VAKKEN: Record<string, Vak> = {
  dakdekker: {
    enkelvoud: 'dakdekker',
    meervoud: 'dakdekkers',
    kop: 'Wij zoeken 5 dakdekkers.',
    bedrijf: 'dakbedrijf',
  },
  installateur: {
    enkelvoud: 'installateur',
    meervoud: 'installateurs',
    kop: 'Wij zoeken 5 installateurs.',
    bedrijf: 'installatiebedrijf',
  },
}
const ALGEMEEN = {
  kop: 'Wij zoeken 5 bedrijven in West-Brabant.',
  bedrijf: 'bedrijf',
}
// Koen 24 nov 2026: een tweede campagne in de regio Eindhoven, met een eigen link
// (?regio=eindhoven). Dezelfde vijf plekken in totaal, alleen het gebied in de kop
// verschilt. Zelfde pad, zodat de meting (MEET_PAD in lib/metaPixel.ts en in de Hub)
// en de codepoort in middleware.ts ongewijzigd blijven. Alleen waarden uit deze lijst.
type Regio = { kop: string; app: string; deeltitel: string; beeld: string }
const REGIOS: Record<string, Regio> = {
  eindhoven: {
    kop: 'Wij zoeken 5 bedrijven in regio Eindhoven.',
    app: 'Hoi, ik zit in de regio Eindhoven en wil meer weten over de actie.',
    deeltitel: 'Wij zoeken 5 bedrijven in regio Eindhoven. Gratis PS5 met GTA VI als je klant wordt.',
    beeld: 'og-eindhoven',
  },
}

// W-861 (19 nov 2026): de PS5-actie. De eerste vijf nieuwe klanten die tot en met
// 31 december 2026 starten met een jaarcontract en een volledig opstarttraject
// krijgen een PS5 Digital Edition met GTA VI cadeau. Opzet naar het voorbeeld
// van de KPN-actie (haak op de game, console als cadeau, contract als
// voorwaarde), met de voorwaarden dichtgeklapt onderaan de pagina zelf (Koen, 22 nov).
//
// Bewust zo:
//  - Dat woord staat er niet. Er hangt een jaarcontract aan en de
//    console wordt doorberekend bij opzeggen binnen drie maanden. De Nederlandse
//    Reclame Code noemt dat woord onder alle omstandigheden misleidend als er
//    toch kosten in rekening worden gebracht, ook als die elders staan; de
//    ACM-pagina over dat woord zegt hetzelfde over abonnementen.
//  - Geen bedragen en geen drempel op de pagina. De doorberekening staat vooraf
//    in de offerte.
//  - Open sinds 22 nov (Koen: "code mag eraf"), via PS5_OPEN in lib/ps5Toegang.ts.
//    De code 1500 en de poort in middleware.ts blijven staan voor een nieuwe pauze.
//    Daarom nog geen Open Graph-beeld en staan de beelden in private/ps5-actie.
//  - Beeld: de afbeelding die Koen zelf aanleverde (private/ps5-actie), met PS5-,
//    GTA- en Rockstar-logo's en een gemaakte hoes. Koen koos dit bewust, 19 nov,
//    nadat het merken- en misleidingsrisico was uitgelegd. Zie de PR-beschrijving.
//  - noindex en niet in de sitemap, zoals /black-friday: dit is een bestemming
//    voor onze eigen lijsten, geen zoekpagina (REGEL 8).
//  - Alleen Nederlands.

const URL = 'https://stevin.ai/ps5-actie'
const TITEL = 'Gratis PS5 met GTA VI als je nu klant wordt bij Stevin.AI'
const OMSCHRIJVING =
  'De eerste vijf nieuwe klanten die starten met een jaarcontract en een volledig opstarttraject krijgen gratis een PS5 met GTA VI, binnen een vast budget van Stevin.AI. De voorwaarden staan op deze pagina.'

// Deelbeeld per variant (Koen 23 nov: "betere og image met de actie"). Beeld uit
// meta-advertenties/bron/og-ps5-actie.html, zelfde opmaak als de advertenties.
// Bij een hoger aantal bezette plekken opnieuw renderen met ?bezet=N.
const DEELBEELD: Record<string, { beeld: string; titel: string }> = {
  dakdekker: { beeld: 'og-dakdekkers', titel: 'Wij zoeken 5 dakdekkers. Gratis PS5 met GTA VI als je klant wordt.' },
  installateur: { beeld: 'og-installateurs', titel: 'Wij zoeken 5 installateurs. Gratis PS5 met GTA VI als je klant wordt.' },
}
const DEELBEELD_ALGEMEEN = {
  beeld: 'og-bedrijven',
  titel: 'Wij zoeken 5 bedrijven in West-Brabant. Gratis PS5 met GTA VI als je klant wordt.',
}
const DEELTEKST = 'Wij regelen je nieuwe klanten. Gratis PS5 met GTA VI bij een jaarcontract. Bel of app ons.'

export async function generateMetadata({ searchParams }: Pick<Props, 'searchParams'>): Promise<Metadata> {
  const { vak, regio } = await searchParams
  const r = typeof regio === 'string' && Object.hasOwn(REGIOS, regio) ? REGIOS[regio] : null
  // Het deelbeeld van de algemene variant noemt West-Brabant; een regio deelt zonder beeldtekst met dat gebied.
  const d = typeof vak === 'string' && Object.hasOwn(DEELBEELD, vak)
    ? DEELBEELD[vak]
    : r ? { beeld: r.beeld, titel: r.deeltitel } : DEELBEELD_ALGEMEEN
  const url = r && typeof regio === 'string' ? `${URL}?regio=${regio}` : d === DEELBEELD_ALGEMEEN ? URL : `${URL}?vak=${vak}`
  const beeld = { url: `https://stevin.ai/images/ps5-actie/${d.beeld}.jpg`, width: 1200, height: 630, alt: d.titel }
  return {
    title: TITEL,
    description: OMSCHRIJVING,
    alternates: { canonical: URL },
    robots: { index: false, follow: true },
    openGraph: {
      title: d.titel,
      description: DEELTEKST,
      url,
      type: 'website',
      siteName: 'Stevin.AI',
      locale: 'nl_NL',
      images: [beeld],
    },
    twitter: { card: 'summary_large_image', title: d.titel, description: DEELTEKST, images: [beeld.url] },
  }
}

const VOORWAARDEN = [
  'De actie geldt voor de eerste vijf nieuwe klanten die tot en met 31 december 2026 tekenen voor een jaarcontract met Stevin.AI als bureau, inclusief een volledig opstarttraject. Vijf in totaal, ongeacht je vak. Op volgorde van tekenen. Is de vijfde plek toegezegd, dan sluit de actie, ook als het nog geen 31 december is.',
  'Een volledig opstarttraject betekent dat het in je offerte vooraf is afgesproken en bestaat uit meerdere onderdelen, bijvoorbeeld een nieuwe website, een campagne, het inrichten van je telefoon en de meting. Welke onderdelen en wat ze kosten, staat in je offerte.',
  'Je krijgt de PS5 binnen een vast budget van Stevin.AI. We denken aan een PlayStation 5 Digital Edition (Slim) met PlayStation Store-tegoed om GTA VI te kopen. Games zijn op PlayStation niet los weg te geven en de Digital Edition heeft geen schijfstation, dus het tegoed komt op jouw eigen PlayStation-account. Daarvoor heb je zo\'n account nodig.',
  'Wij bestellen de PS5 nadat je het opstarttraject hebt betaald. De levertijd hangt af van de voorraad. Bij de bestelling melden we je wanneer je de console verwacht.',
  'Zeg je je jaarcontract binnen drie maanden nadat je bent gestart op, dan berekenen we de console aan je door. Het bedrag staat vooraf in je offerte.',
  'Dit is een actie voor bedrijven in Nederland en Vlaanderen die nieuw zijn bij Stevin.AI. Wat je gratis krijgt, is niet in te ruilen voor korting of geld en is niet over te dragen.',
  'Stevin.AI is niet verbonden aan Sony of Rockstar Games en wordt niet door hen gesponsord. Alle merknamen zijn van hun eigenaren.',
]

const DOORVERWIJZEN = [
  'Iedereen kan een adverteerder aanbrengen. Je krijgt per adverteerder die je aanbrengt en die klant wordt een tegoed.',
  'De adverteerder moet nieuw zijn bij Stevin.AI. Je meldt hem aan voordat hij tekent, via info@stevin.ai. Wij bevestigen de aanmelding. Meld je hem pas aan nadat hij getekend heeft, dan telt hij niet mee.',
  'Wij kopen het tegoed nadat de adverteerder zijn jaarcontract heeft getekend en zijn opstarttraject heeft betaald.',
  'Zegt de adverteerder zijn contract binnen drie maanden na de start op, dan vervalt het tegoed. Heb je het al ontvangen, dan berekenen we het aan je door.',
  'Het tegoed is niet in te ruilen voor geld of korting. Je krijgt het op je eigen PlayStation-account.',
]

export default async function Ps5ActiePage({ params, searchParams }: Props) {
  const { locale } = await params
  const { vak: vakParam, regio: regioParam } = await searchParams
  const vak = typeof vakParam === 'string' && Object.hasOwn(VAKKEN, vakParam) ? VAKKEN[vakParam] : null
  const regio = typeof regioParam === 'string' && Object.hasOwn(REGIOS, regioParam) ? REGIOS[regioParam] : null
  // Meting per vak (22 nov): de klik op bellen of appen draagt het vak, en het appje zelf ook.
  const vakSleutel = vak && typeof vakParam === 'string' ? vakParam : undefined
  const appLink = vak
    ? `${TELEFOON.whatsapp}?text=${encodeURIComponent(`Hoi, ik ben ${vak.enkelvoud} en wil meer weten over de actie.`)}`
    : regio
      ? `${TELEFOON.whatsapp}?text=${encodeURIComponent(regio.app)}`
      : TELEFOON.whatsapp
  const kopTekst = vak ?? (regio ? { ...ALGEMEEN, kop: regio.kop } : ALGEMEEN)
  if (locale !== 'nl') notFound()
  setRequestLocale(locale)

  return (
    <main className="-mt-[72px] bg-white">
      {/* Eerste scherm (Koen, 22 nov: "moet de ps5 niet eerder in beeld", "veel tekst"): kop, PS5,
          een zin, belknop. Op de telefoon staat het beeld direct onder de kop; op een breed scherm rechts. */}
      <section className="relative overflow-hidden px-6 pb-8 pt-[104px] text-white sm:pb-20 sm:pt-[170px]" style={{ background: '#3D8EFF' }}>
        <div className="relative mx-auto grid max-w-[1152px] gap-x-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <h1
            className="m-0 text-balance font-display font-extrabold text-white lg:col-start-1 lg:row-start-1 lg:self-end"
            style={{ fontSize: 'clamp(36px, 5.2vw, 68px)', lineHeight: 1.02, letterSpacing: '-0.02em' }}
          >
            {kopTekst.kop}
          </h1>
          <figure className="relative m-0 mx-auto mt-3 w-full max-w-[280px] sm:max-w-[420px] lg:col-start-2 lg:row-span-3 lg:row-start-1 lg:mt-0 lg:max-w-[560px]">
            <Image
              src="/api/ps5-beeld/ps5-scene.webp"
              unoptimized
              alt="Een witte PS5 met controller en een GTA VI-spelhoes"
              width={1042}
              height={817}
              priority
              className="h-auto w-full"
            />
            <span
              className="absolute bottom-[4%] right-[0%] rounded-2xl px-4 py-2 font-display text-[26px] font-extrabold leading-none sm:px-6 sm:py-3 sm:text-[40px]"
              style={{ background: '#FFD400', color: '#0A1628', transform: 'rotate(-5deg)', boxShadow: '0 8px 22px rgba(10,22,40,.18)' }}
            >
              GRATIS
            </span>
          </figure>
          <div className="lg:col-start-1 lg:row-start-2">
            <p className="m-0 mt-3 max-w-[560px] font-display text-[24px] font-extrabold leading-[1.2] text-white sm:mt-6 sm:text-[30px]">
              Gratis PS5 incl. GTA VI.
            </p>
            <div className="mt-5 sm:mt-8">
              <a
                href={TELEFOON.tel}
                data-vak={vakSleutel}
                data-cta="ps5_actie_hero_bel"
                className="flex w-full items-center justify-center gap-3 rounded-xl bg-white px-7 py-5 font-display text-[20px] font-extrabold shadow-[0_10px_28px_rgba(10,22,40,0.22)] transition-[filter] hover:brightness-95 sm:inline-flex sm:w-auto sm:py-4 sm:text-[18px]"
                style={{ color: '#0A1628' }}
              >
                <Phone className="h-5 w-5" aria-hidden />
                Bel {TELEFOON.weergave}
              </a>
              <p className="m-0 mt-4 text-[16px] font-semibold text-white">
                Liever appen?{' '}
                <a href={appLink} data-vak={vakSleutel} data-cta="ps5_actie_hero_whatsapp" className="underline underline-offset-4">
                  App ons over jouw {kopTekst.bedrijf}
                </a>
              </p>
            </div>
          </div>
          <div className="lg:col-start-1 lg:row-start-3 lg:self-start">
            <ol className="m-0 mt-10 flex max-w-[420px] list-none gap-2 p-0 sm:gap-3" aria-label="Vijf plekken">
              {[1, 2, 3, 4, 5].map((n) => (
                <li
                  key={n}
                  className="relative flex aspect-[1.3/1] flex-1 items-center justify-center rounded-xl font-display text-[20px] font-extrabold sm:text-[26px]"
                  style={{ border: '3px dashed rgba(255,255,255,.85)', background: 'rgba(255,255,255,.1)' }}
                >
                  {n <= BEZET ? (
                    <>
                      <span className="sr-only">Plek {n} is bezet</span>
                      <Image
                        src="/api/ps5-beeld/ps5-haal.webp"
                        unoptimized
                        alt=""
                        width={200}
                        height={280}
                        className="absolute left-1/2 top-1/2 h-[135%] w-auto max-w-none -translate-x-1/2 -translate-y-1/2"
                      />
                    </>
                  ) : (
                    n
                  )}
                </li>
              ))}
            </ol>
            <p className="m-0 mt-3 text-[15px] font-bold text-white">
              {`Nog ${5 - BEZET} van de 5 plekken vrij.`}
            </p>
          </div>
        </div>
      </section>

      {/* Koen, 22 nov: "neemt veel te veel ruimte in". Citaten in een schuifrij op de telefoon (Koen 22 nov 23:51), zie components/ps5/Citaten.tsx, Marcel (Ecomy) als vierde citaat, Koen 22 nov 23:40 (zijn oom, Koen regelt het akkoord). Ingrid en Bart: akkoord via Koen.
          Faysal (Sterker Witgoed) als vijfde, Koen 24 nov 11:44: een zin letterlijk uit zijn eigen Google-review van 23 nov. */}
      <section className="pb-2 pt-6 sm:pt-16">
        <div className="mx-auto max-w-[1152px]">
          <Citaten
            items={[
              { q: 'Ik was al blij als er iemand een keer belde. Nu zijn we weer offertes aan het maken.', a: 'Hans, Hans Schepers Stoffering' },
              { q: 'Koen denkt mee alsof het zijn eigen bedrijf is. Je krijgt antwoord, geen verhaal.', a: 'Ingrid, Tonnisteiner' },
              { q: 'Eindelijk iemand die gewoon zegt wat werkt en wat niet.', a: 'Bart, Rijschool Bart' },
              { q: 'Ik houd alle aanvragen nu bij op mijn telefoon. Echt top!', a: 'Marcel, Ecomy Energie' },
              { q: 'Ze denken actief mee, communiceren duidelijk en zoeken altijd naar passende oplossingen.', a: 'Faysal, Sterker Witgoed' },
            ]}
          />
          <div className="mt-3 px-6">
            <p className="m-0 text-[14px] leading-[1.4] text-[#2A3A54]">
              <span className="font-semibold text-primary">20+ jaar online marketing</span>, onder meer voor Deceuninck, Etex, Hyundai, JBL en Leen Bakker.
            </p>
          </div>
        </div>
      </section>

      {/* Koen, 22 nov: "heb zo echt niet door wat we doen", "hoeft echt niet direct bovenin".
          Drie regels onder het bewijs, geen uitleg. Alleen wat bij klanten draait. */}
      <section className="px-6 pt-10 sm:pt-16">
        <div className="mx-auto max-w-[1152px]">
          <h2 className="m-0 font-display text-[22px] font-extrabold text-primary sm:text-[28px]">
            Wat wij voor je doen.
          </h2>
          <ul className="m-0 mt-3 grid list-none gap-2 p-0 sm:grid-cols-3 sm:gap-4">
            {[
              { Icoon: Megaphone, t: 'Wij adverteren voor je in Google, Facebook en Instagram.' },
              { Icoon: Smartphone, t: 'Elke aanvraag komt direct binnen op je telefoon.' },
              { Icoon: BarChart3, t: 'Elke week zie je wat je budget opleverde.' },
            ].map(({ Icoon, t }) => (
              <li key={t} className="flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg" style={{ background: '#EEF4FF' }}>
                  <Icoon className="h-4 w-4 text-[#3D8EFF]" aria-hidden />
                </span>
                <span className="text-[15px] font-semibold leading-[1.35] text-primary">{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Koen, 23 nov: de casepagina's ook op de actiepagina, Sterker mag hier wel bij.
          Dezelfde kaartstapel als op de homepage, zonder knop naar het overzicht en zonder
          doorklik naar de casepagina (Koen, 23 nov: bezoeker blijft op de actiepagina). */}
      <CaseCarousel alles bron="ps5_case" metOverzicht={false} metLink={false} metUitlichting eerst="hans-schepers" />

      {/* Gesprek en formulier */}
      <section id="gesprek" className="scroll-mt-24 px-6" style={{ paddingTop: 72, paddingBottom: 48 }}>
        <div className="mx-auto max-w-[900px]">
          <h2 className="m-0 max-w-[20ch] font-display font-extrabold text-primary" style={h2Stijl}>
            {`Nog ${5 - BEZET} plekken. Bel of app ons.`}
          </h2>
          <a href={TELEFOON.tel} data-vak={vakSleutel} data-cta="ps5_actie_onder_bel" className="mt-6 block font-display font-extrabold text-primary" style={{ fontSize: 'clamp(36px, 6vw, 60px)', letterSpacing: '-0.02em', lineHeight: 1 }}>
            {TELEFOON.weergave}
          </a>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={appLink} data-vak={vakSleutel} data-cta="ps5_actie_onder_whatsapp" className="inline-flex items-center rounded-lg px-7 py-3.5 font-display text-[16px] font-bold text-white" style={{ background: '#0A1628' }}>App ons</a>
          </div>
          <h3 className="m-0 mt-14 font-display text-[18px] font-bold text-primary">Liever dat wij je bellen?</h3>
          <div className="mt-4">
            <ContactForm
              subject={vak ? `PS5-actie 2026 (${vak.enkelvoud})` : 'PS5-actie 2026'}
              keuzeLabel="Waar ben je naar op zoek?"
              bedrijfEnTelefoonVerplicht
              keuzes={[
                'Ik wil weten of er nog een plek is',
                'Ik wil starten met een jaarcontract en een opstarttraject',
                'Ik wil eerst weten wat een opstarttraject voor mij inhoudt',
                'Iets anders',
              ]}
              messageLabel="Toelichting (mag leeg blijven)"
              messagePlaceholder="Bijvoorbeeld wat je zoekt, of het adres van je huidige site."
            />
          </div>
        </div>
      </section>

      {/* Op telefoons geen vraagbot: de knop viel over de tekst en de belknop, en bellen en appen staan al in de balk (Koen, 22 nov: conversie). */}
      <style>{`@media (max-width: 639px) { .vraagbot-knop { display: none; } }`}</style>
      <div className="fixed inset-x-0 bottom-0 z-40 flex gap-2 p-3 sm:hidden" style={{ background: '#0A1628' }}>
        <a href={TELEFOON.tel} data-vak={vakSleutel} data-cta="ps5_actie_sticky_bel" className="flex-1 rounded-lg py-3 text-center font-display text-[16px] font-bold text-white" style={{ background: '#3D8EFF' }}>Bel {TELEFOON.weergave}</a>
        <a href={appLink} data-vak={vakSleutel} data-cta="ps5_actie_sticky_whatsapp" className="flex-1 rounded-lg bg-white py-3 text-center font-display text-[16px] font-bold" style={{ color: '#0A1628' }}>App ons</a>
      </div>

      {/* Koen, 22 nov: "alle voorwaarden en geouwehoer" eraf. De voorwaarden blijven op de pagina,
          dichtgeklapt achter een kleine link onderaan, zodat ze vindbaar zijn zonder in beeld te staan. */}
      <section id="voorwaarden" className="scroll-mt-24 px-6 pb-28 pt-4 sm:pb-12">
        <details className="mx-auto max-w-[1152px] text-[14px] text-[#5B6B85]">
          <summary className="cursor-pointer underline underline-offset-4">Voorwaarden</summary>
          <ul className="m-0 mt-4 max-w-[760px] list-none space-y-3 p-0 leading-[1.55]">
            {[...VOORWAARDEN, ...DOORVERWIJZEN].map((v) => (
              <li key={v}>{v}</li>
            ))}
          </ul>
        </details>
      </section>
    </main>
  )
}
