import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import ContactForm from '@/components/ContactForm'
import Image from 'next/image'
import { TELEFOON } from '@/lib/telefoon'
import { Knop, Punten, Vragen, h2Stijl, tekst, type Vraag } from '@/components/rethink/RethinkBlokken'

type Props = {
  params: Promise<{ locale: string }>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

// W-861: elk vak krijgt in de advertentie een eigen link (?vak=dakdekker of ?vak=installateur).
// Alleen waarden uit deze lijst tellen; al het andere wordt genegeerd, zodat niemand
// via de link eigen tekst op de pagina kan zetten.
type Vak = { enkelvoud: string; meervoud: string; kop: string; werk: string; bezig: string; bedrijf: string; pand: string; soort: string; wil: string }
const VAKKEN: Record<string, Vak> = {
  dakdekker: {
    enkelvoud: 'dakdekker',
    meervoud: 'dakdekkers',
    kop: 'Wij zoeken 5 dakdekkers.',
    soort: 'het dakwerk',
    wil: 'Wil je een dakcalculator op je site?',
    werk: 'Wil je vooral complete daken vervangen?',
    bezig: 'terwijl je op het dak staat',
    bedrijf: 'dakbedrijf',
    pand: 'dak',
  },
  installateur: {
    enkelvoud: 'installateur',
    meervoud: 'installateurs',
    kop: 'Wij zoeken 5 installateurs.',
    soort: 'het installatiewerk',
    wil: 'Wil je een check op je site waarmee klanten zien wat hun huis kan opwekken?',
    werk: 'Wil je vooral warmtepompen plaatsen?',
    bezig: 'terwijl je bij een klant bezig bent',
    bedrijf: 'installatiebedrijf',
    pand: 'huis',
  },
}
const ALGEMEEN = {
  kop: 'Wij zoeken 5 bedrijven per vak.',
  soort: 'het werk',
  wil: 'Wil je een calculator op je site?',
  werk: 'Wil je vooral de grotere klussen?',
  bezig: 'terwijl je aan het werk bent',
  bedrijf: 'bedrijf',
  pand: 'pand',
}

// W-861 (19 nov 2026): de PS5-actie. De eerste vijf nieuwe klanten die tot en met
// 31 december 2026 starten met een jaarcontract en een volledig opstarttraject
// krijgen een PS5 Digital Edition met GTA VI cadeau. Opzet naar het voorbeeld
// van de KPN-actie (haak op de game, console als cadeau, contract als
// voorwaarde), met de voorwaarden zichtbaar op de pagina zelf.
//
// Bewust zo:
//  - Dat woord staat er niet. Er hangt een jaarcontract aan en de
//    console wordt doorberekend bij opzeggen binnen drie maanden. De Nederlandse
//    Reclame Code noemt dat woord onder alle omstandigheden misleidend als er
//    toch kosten in rekening worden gebracht, ook als die elders staan; de
//    ACM-pagina over dat woord zegt hetzelfde over abonnementen.
//  - Geen bedragen en geen drempel op de pagina. De doorberekening staat vooraf
//    in de offerte.
//  - Op pauze achter een code (19 nov, Koen: 1500), zie middleware.ts en
//    lib/ps5Toegang.ts. Daarom ook geen Open Graph-beeld meer en staan de
//    beelden in private/ps5-actie en niet in public.
//  - Beeld: de afbeelding die Koen zelf aanleverde (private/ps5-actie), met PS5-,
//    GTA- en Rockstar-logo's en een gemaakte hoes. Koen koos dit bewust, 19 nov,
//    nadat het merken- en misleidingsrisico was uitgelegd. Zie de PR-beschrijving.
//  - noindex en niet in de sitemap, zoals /black-friday: dit is een bestemming
//    voor onze eigen lijsten, geen zoekpagina (REGEL 8).
//  - Alleen Nederlands.

const URL = 'https://stevin.ai/ps5-actie'
const TITEL = 'Een PS5 met GTA VI cadeau als je nu klant wordt bij Stevin.AI'
const OMSCHRIJVING =
  'De eerste vijf nieuwe klanten per vak tot en met 31 december 2026 die starten met een jaarcontract en een volledig opstarttraject kiezen zelf een cadeau binnen een vast budget van Stevin.AI, bijvoorbeeld een PS5 Digital Edition met tegoed voor GTA VI. De voorwaarden staan op deze pagina.'

export const metadata: Metadata = {
  title: TITEL,
  description: OMSCHRIJVING,
  alternates: { canonical: URL },
  robots: { index: false, follow: true },
  openGraph: {
    title: TITEL,
    description: OMSCHRIJVING,
    url: URL,
    type: 'website',
    siteName: 'Stevin.AI',
    locale: 'nl_NL',
  },
  twitter: { card: 'summary_large_image', title: TITEL, description: OMSCHRIJVING },
}

const label = 'm-0 mb-5 font-display text-[12px] font-bold uppercase tracking-[0.12em] text-accent'

const OPSTART = [
  {
    t: 'Een nieuwe website',
    d: 'Gebouwd voor de telefoon, snel, op je eigen domein en met de meting erin.',
  },
  {
    t: 'Je eerste campagne',
    d: 'Een campagne die wij voor je inrichten, met de meting erin zodat je ziet wat een aanvraag oplevert.',
  },
  {
    t: 'Je telefoon ingericht',
    d: 'Zodat je telefoontjes niet in het niets verdwijnen en je kunt zien wat je marketing je aan gesprekken oplevert.',
  },
  {
    t: 'De meting',
    d: 'Server-side meting en conversies die kloppen, zodat je vanaf de eerste dag ziet wat het oplevert.',
  },
]

const STAPPEN = [
  {
    t: '1. Plan een kennismaking',
    d: 'We kijken naar je cijfers en je huidige situatie, en zeggen eerlijk of het past. Een half uur, geen verplichting.',
  },
  {
    t: '2. Je tekent voor een jaar met een opstarttraject',
    d: 'In je offerte staat wat er in je opstarttraject zit, wat het kost en wat de console kost als je binnen drie maanden opzegt. Je weet alles voordat je tekent.',
  },
  {
    t: '3. Je kiest je cadeau, wij bestellen het',
    d: 'Jij kiest wat je wilt, binnen het budget. Zodra het opstarttraject is betaald bestellen wij het. Intussen gaan we aan de slag met je opstart.',
  },
]

const VOORWAARDEN = [
  'De actie geldt per vak voor de eerste vijf nieuwe klanten die tot en met 31 december 2026 tekenen voor een jaarcontract met Stevin.AI als bureau, inclusief een volledig opstarttraject. Dus vijf dakdekkers en vijf installateurs, niet vijf in totaal. Op volgorde van tekenen. Is het vijfde cadeau in jouw vak toegezegd, dan sluit de actie voor dat vak, ook als het nog geen 31 december is.',
  'Een volledig opstarttraject betekent dat het in je offerte vooraf is afgesproken en bestaat uit meerdere onderdelen, bijvoorbeeld een nieuwe website, een campagne, het inrichten van je telefoon en de meting. Welke onderdelen en wat ze kosten, staat in je offerte.',
  'Je kiest zelf je cadeau, binnen een vast budget van Stevin.AI. Wij denken aan een PlayStation 5 Digital Edition (Slim) met PlayStation Store-tegoed om GTA VI te kopen. Games zijn op PlayStation niet los cadeau te doen en de Digital Edition heeft geen schijfstation, dus het tegoed komt op jouw eigen PlayStation-account. Daarvoor heb je zo\'n account nodig.',
  'Wij bestellen het cadeau nadat je het opstarttraject hebt betaald. De levertijd hangt af van de voorraad. Bij de bestelling melden we je wanneer je de console verwacht.',
  'Zeg je je jaarcontract binnen drie maanden nadat je bent gestart op, dan berekenen we de console aan je door. Het bedrag staat vooraf in je offerte.',
  'Dit is een actie voor bedrijven in Nederland en Vlaanderen die nieuw zijn bij Stevin.AI. Het cadeau is niet in te ruilen voor korting of geld en is niet over te dragen.',
  'Stevin.AI is niet verbonden aan Sony of Rockstar Games en wordt niet door hen gesponsord. Alle merknamen zijn van hun eigenaren.',
]

const DOORVERWIJZEN = [
  'Iedereen kan een adverteerder aanbrengen. Je krijgt per adverteerder die je aanbrengt en die klant wordt een tegoed.',
  'De adverteerder moet nieuw zijn bij Stevin.AI. Je meldt hem aan voordat hij tekent, via info@stevin.ai. Wij bevestigen de aanmelding. Meld je hem pas aan nadat hij getekend heeft, dan telt hij niet mee.',
  'Wij kopen het tegoed nadat de adverteerder zijn jaarcontract heeft getekend en zijn opstarttraject heeft betaald.',
  'Zegt de adverteerder zijn contract binnen drie maanden na de start op, dan vervalt het tegoed. Heb je het al ontvangen, dan berekenen we het aan je door.',
  'Het tegoed is niet in te ruilen voor geld of korting. Je krijgt het op je eigen PlayStation-account.',
]

const VRAGEN: Vraag[] = [
  {
    v: 'Wat kost het cadeau mij?',
    a: 'Er hangen voorwaarden aan. Je tekent voor een jaar en je betaalt je opstarttraject. Zeg je binnen drie maanden op, dan berekenen we de console door. Dat noemen wij liever een cadeau met voorwaarden, en die staan hierboven.',
  },
  {
    v: 'Waarom doen jullie dit?',
    a: 'Een nieuwe klant brengt in de eerste weken veel werk mee: website, campagne, telefoon, meting. Dit is onze manier om je te bedanken, en jij kiest zelf wat je er het leukst aan vindt. En het houdt de instroom beperkt: vijf plekken per vak, omdat we alles zelf inrichten.',
  },
  {
    v: 'Wat is een volledig opstarttraject?',
    a: 'Een traject van meerdere onderdelen waarmee je goed van start gaat, bijvoorbeeld een nieuwe website, een campagne, je telefoon ingericht en de meting. We bespreken in de kennismaking wat bij jou past en zetten het in je offerte.',
  },
  {
    v: 'Wanneer krijg ik de console?',
    a: 'We bestellen hem nadat je het opstarttraject hebt betaald. Bij de bestelling zeggen we je wanneer hij binnen is.',
  },
  {
    v: 'Wat gebeurt er als ik binnen drie maanden opzeg?',
    a: 'Dan berekenen we de console aan je door. Het bedrag staat in je offerte, dus je weet het voordat je tekent.',
  },
  {
    v: 'Hoe weet ik of er nog een plek is?',
    a: 'Plan een kennismaking of mail naar info@stevin.ai. We zeggen meteen hoeveel plekken er nog zijn.',
  },
]

export default async function Ps5ActiePage({ params, searchParams }: Props) {
  const { locale } = await params
  const { vak: vakParam } = await searchParams
  const vak = typeof vakParam === 'string' && Object.hasOwn(VAKKEN, vakParam) ? VAKKEN[vakParam] : null
  // Meting per vak (22 nov): de klik op bellen of appen draagt het vak, en het appje zelf ook.
  const vakSleutel = vak && typeof vakParam === 'string' ? vakParam : undefined
  const appLink = vak
    ? `${TELEFOON.whatsapp}?text=${encodeURIComponent(`Hoi, ik ben ${vak.enkelvoud} en wil meer weten over de actie.`)}`
    : TELEFOON.whatsapp
  const kopTekst = vak ?? ALGEMEEN
  if (locale !== 'nl') notFound()
  setRequestLocale(locale)

  return (
    <main className="-mt-[72px] bg-white">
      {/* Eerste scherm (Koen, 20 nov): eerst wat je bij ons koopt, dan pas de vijf plekken en de PS5. Blauw als de advertenties. */}
      <section className="relative overflow-hidden px-6 pb-20 pt-[150px] text-white sm:pt-[170px]" style={{ background: '#3D8EFF' }}>
        <div className="relative mx-auto grid max-w-[1152px] items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <h1
              className="m-0 text-balance font-display font-extrabold text-white"
              style={{ fontSize: 'clamp(38px, 5.2vw, 68px)', lineHeight: 1.02, letterSpacing: '-0.02em' }}
            >
              {kopTekst.kop}
            </h1>
            <p className="m-0 mt-6 max-w-[560px] text-[18px] font-semibold leading-[1.5] text-white sm:text-[20px]">
              Vijf, niet meer. Voor die vijf adverteren wij in Google, Facebook en Instagram. {kopTekst.wil} Een
              slimme telefooncentrale met AI? Of gewoon precies zien wat jouw campagnes opleveren?
            </p>
            <div className="mt-8">
              <a
                href={TELEFOON.tel}
                data-vak={vakSleutel}
                data-cta="ps5_actie_hero_bel"
                className="inline-flex items-center rounded-lg bg-white px-7 py-4 font-display text-[17px] font-bold transition-[filter] hover:brightness-95"
                style={{ color: '#0A1628' }}
              >
                Bel {TELEFOON.weergave}
              </a>
              <p className="m-0 mt-4 text-[16px] font-semibold text-white">
                Liever appen?{' '}
                <a href={appLink} data-vak={vakSleutel} data-cta="ps5_actie_hero_whatsapp" className="underline underline-offset-4">
                  App ons over jouw {kopTekst.bedrijf}
                </a>
              </p>
            </div>
            {/* Koen, 22 nov: ervaring als bewijs in het eerste scherm. Alleen wat klopt, geen budgetcijfer. */}
            <dl className="m-0 mt-9 flex max-w-[520px] items-stretch gap-5 text-white sm:gap-7">
              <div>
                <dt className="font-display text-[30px] font-extrabold leading-none sm:text-[36px]">20+ jaar</dt>
                <dd className="m-0 mt-2 text-[14px] font-semibold leading-[1.35]">ervaring in online marketing</dd>
              </div>
              <div className="w-px shrink-0" style={{ background: 'rgba(255,255,255,.45)' }} aria-hidden="true" />
              <div>
                <dt className="text-[14px] font-semibold leading-[1.35]">Onder meer voor</dt>
                <dd className="m-0 mt-1 font-display text-[16px] font-extrabold leading-[1.3] sm:text-[18px]">
                  Etex, Hyundai, JBL en Leen Bakker
                </dd>
              </div>
            </dl>
            <ol className="m-0 mt-10 flex max-w-[420px] list-none gap-2 p-0 sm:gap-3" aria-label="Vijf plekken">
              {[1, 2, 3, 4, 5].map((n) => (
                <li
                  key={n}
                  className="relative flex aspect-[1.3/1] flex-1 items-center justify-center rounded-xl font-display text-[20px] font-extrabold sm:text-[26px]"
                  style={{ border: '3px dashed rgba(255,255,255,.85)', background: 'rgba(255,255,255,.1)' }}
                >
                  {n === 1 && vak ? (
                    <>
                      <span className="sr-only">Plek 1 is bezet</span>
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
            <p className="m-0 mt-4 max-w-[560px] text-[15px] font-semibold leading-[1.5] text-white">
              De eerste vijf nieuwe {vak ? vak.meervoud : 'klanten per vak'} met een jaarcontract en een volledig opstarttraject kiezen
              een PS5 met GTA VI als welkomstcadeau. Tot en met 31 december.
            </p>
          </div>
          <figure className="relative m-0 mx-auto w-full max-w-[560px]">
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
              className="absolute bottom-[4%] right-[2%] rounded-2xl px-4 py-2 font-display text-[16px] font-extrabold sm:text-[22px]"
              style={{ background: '#FFD400', color: '#0A1628', transform: 'rotate(-5deg)', boxShadow: '0 8px 22px rgba(10,22,40,.18)' }}
            >
              WELKOMSTCADEAU
            </span>
          </figure>
        </div>
        <p className="relative m-0 mx-auto mt-10 max-w-[1152px] text-[14px] text-white/90">
          PS5 bij jaarcontract. GTA6 via PlayStation Store-tegoed. T/m 31 december 2026.
        </p>
      </section>

      {/* W-699 (21 nov 2026): twee klanten als bewijs, direct na het eerste scherm.
          Ecomy: de check staat live op ecomy.nl en een aanvraag kwam aantoonbaar binnen;
          akkoord via Koen op 21 nov. Geen link naar ecomy.nl: de pagina heeft een doel, bellen of appen (Koen, 21 nov). Hans Schepers: zijn eigen woorden, door hem bevestigd
          in WhatsApp op 21 nov 19:59. Bewust geen aantallen of omzet: die zijn er nog niet. */}
      <section className="px-6" style={{ paddingTop: 104, paddingBottom: 24 }}>
        <div className="mx-auto max-w-[1152px]">
          <h2 className="m-0 max-w-[20ch] font-display font-extrabold text-primary" style={h2Stijl}>
            Dit draait al bij onze klanten.
          </h2>
          <div className="mt-10 grid items-start gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[14px] border border-[#D6DDE8] bg-white p-6 sm:p-8">
              <p className="m-0 font-display text-[14px] font-bold uppercase tracking-[0.06em] text-[#3D8EFF]">
                Ecomy, installateur uit Wijchen
              </p>
              <h3 className="m-0 mt-3 font-display text-[24px] font-extrabold leading-[1.15] text-primary sm:text-[28px]">
                De klant vult eerst zijn adres in.
              </h3>
              <div className={`mt-4 flex flex-col gap-4 ${tekst}`}>
                <p className="m-0">
                  Meestal begint een aanvraag met een naam en een nummer. Jij belt terug, vraagt naar het adres en plant
                  een bezoek. Pas dan weet je of de klus iets voor je is.
                </p>
                <p className="m-0">
                  Bij Ecomy ziet de bezoeker zijn eigen dak van bovenaf, met wat erop past. Daarna laat hij zijn nummer
                  achter. De aanvraag komt als bericht op de telefoon van de eigenaar binnen, met het dak en de klus
                  erbij.
                </p>
              </div>
              <div className="mt-6 overflow-hidden rounded-[12px] border border-[#D6DDE8]">
                <Image
                  src="/images/cases/ecomy-check.webp"
                  alt="De check op de site van Ecomy: een dak van bovenaf met de dakvlakken, het aantal panelen dat past en de opwek per jaar"
                  width={1200}
                  height={619}
                  className="h-auto w-full"
                />
              </div>
              <p className="m-0 mt-4 text-[15px] text-[#2A3A54]">
                Het voorbeeld is het huis van de eigenaar zelf. De check staat op de site van Ecomy.
              </p>
            </div>
            <figure className="m-0 rounded-[14px] p-6 text-white sm:p-8" style={{ background: '#0A1628' }}>
              <p className="m-0 font-display text-[14px] font-bold uppercase tracking-[0.06em] text-[#3D8EFF]">
                Hans Schepers Stoffering
              </p>
              <blockquote className="m-0 mt-4 font-display text-[22px] font-bold leading-[1.35] sm:text-[26px]">
                &ldquo;Ik was al blij als er iemand een keer belde. Nu zijn we weer offertes aan het maken. Ik betaal
                geen cent meer dan bij de vorige jongens, maar dit levert wel op. Ik ben er oprecht heel blij
                mee.&rdquo;
              </blockquote>
              <figcaption className="mt-6 text-[16px] text-white/80">Hans Schepers</figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* Hoe wij klussen regelen (Koen, 20 nov: eerst dit uitleggen). De telefoon staat in stap 2:
          alleen wat bij een klant bewezen draait (Voys naar Hub, W-660, 4 nov 2026). */}
      <section className="px-6" style={{ paddingTop: 104, paddingBottom: 24 }}>
        <div className="mx-auto grid max-w-[1152px] items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <h2 className="m-0 max-w-[20ch] font-display font-extrabold text-primary" style={h2Stijl}>
              Zo komen die aanvragen binnen.
            </h2>
            {/* Schema in drie stappen (Koen, 21 nov): het beeld vertelt het, de tekst is een regel per stap. */}
            <ol className="m-0 mt-10 list-none p-0">
              {[
                { t: 'Aanvraag komt binnen', d: `Iemand in jouw regio zoekt een ${vak ? vak.enkelvoud : 'vakman'}, ziet je advertentie en belt of vult je formulier in.` },
                { t: 'Jij krijgt bericht', d: 'Meteen op je telefoon, ook als je aan het werk bent en niet opneemt.' },
                { t: 'Jij neemt contact op', d: 'Je belt terug terwijl de klant nog zoekt. Wij zien welke advertentie de aanvraag opleverde en zetten je budget daar.' },
              ].map((stap, i, alle) => (
                <li key={stap.t} className="relative flex gap-5 pb-8 last:pb-0">
                  {i < alle.length - 1 && <span aria-hidden className="absolute left-[21px] top-11 bottom-0 w-[2px]" style={{ background: '#C4DCFF' }} />}
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-display text-[18px] font-extrabold text-white" style={{ background: '#3D8EFF' }}>
                    {i + 1}
                  </span>
                  <div className="pt-1.5">
                    <p className="m-0 font-display text-[20px] font-bold text-primary">{stap.t}</p>
                    <p className="m-0 mt-1 max-w-[46ch] text-[17px] leading-[1.5] text-[#2A3A54]">{stap.d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Voorbeeld van een aanvraag op een telefoon (Koen, 21 nov). Getekend in HTML, geen foto.
              Het is een voorbeeld en staat er zo bij: geen naam, geen nummer, geen echte klant. */}
          <figure className="m-0 mx-auto w-full max-w-[340px]">
            <div className="rounded-[44px] p-3 shadow-[0_24px_60px_rgba(10,22,40,0.22)]" style={{ background: '#0A1628' }}>
              <div className="overflow-hidden rounded-[34px] bg-white">
                <div className="flex items-center justify-between px-6 pb-2 pt-4 font-display text-[13px] font-bold text-primary">
                  <span>14:07</span>
                  <span aria-hidden className="h-[18px] w-[72px] rounded-full" style={{ background: '#0A1628' }} />
                  <span aria-hidden className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full" style={{ background: '#0A1628' }} />
                    <span className="h-2 w-4 rounded-sm" style={{ background: '#0A1628' }} />
                  </span>
                </div>
                <div className="px-4 pb-6 pt-6" style={{ background: '#EEF4FF' }}>
                  <div className="rounded-2xl bg-white p-4 shadow-[0_6px_18px_rgba(10,22,40,0.10)]">
                    <div className="flex items-center justify-between">
                      <span className="font-display text-[13px] font-bold uppercase tracking-[0.08em] text-accent">Nieuwe aanvraag</span>
                      <span className="text-[13px] text-[#5B6B85]">nu</span>
                    </div>
                    <p className="m-0 mt-2 font-display text-[21px] font-extrabold leading-[1.2] text-primary">
                      {vak?.enkelvoud === 'installateur' ? 'Cv-ketel valt uit in Breda.' : 'Dak lekt in Breda.'}
                    </p>
                    <p className="m-0 mt-1 text-[16px] leading-[1.45] text-[#2A3A54]">Klant wil deze week contact.</p>
                    <dl className="m-0 mt-4 space-y-1.5 border-t border-border pt-3 text-[14px] text-[#2A3A54]">
                      <div className="flex justify-between gap-3"><dt>Via</dt><dd className="m-0 font-bold text-primary">Google-advertentie</dd></div>
                      <div className="flex justify-between gap-3"><dt>Hoe</dt><dd className="m-0 font-bold text-primary">Formulier op je site</dd></div>
                    </dl>
                    <div className="mt-4 rounded-xl py-3 text-center font-display text-[16px] font-bold text-white" style={{ background: '#3D8EFF' }}>
                      Bel terug
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <figcaption className="mt-4 text-center text-[14px] text-[#5B6B85]">Voorbeeld van een aanvraag zoals jij hem krijgt.</figcaption>
          </figure>
        </div>
      </section>

      {/* Ons systeem laten zien (Koen, 22 nov: "we kunnen wel net wat meer tonen, ons systeem etc").
          Twee schermen getekend in HTML. Het zijn voorbeelden en zo staan ze erbij: geen klantnaam,
          geen echte cijfers. */}
      <section className="px-6" style={{ paddingTop: 104, paddingBottom: 24 }}>
        <div className="mx-auto max-w-[1152px]">
          <h2 className="m-0 max-w-[20ch] font-display font-extrabold text-primary" style={h2Stijl}>
            Dit zie je zelf, elke week.
          </h2>
          <p className={`m-0 mt-6 max-w-[680px] ${tekst}`}>
            Je krijgt een eigen inlog. Daar staat wat je uitgaf, wat het opleverde en wie er belde. Geen rapport
            achteraf, je kijkt mee wanneer je wilt.
          </p>
          <div className="mt-10 grid items-start gap-8 lg:grid-cols-2">
            <figure className="m-0">
              <div className="rounded-[14px] border border-[#D6DDE8] bg-white p-5 shadow-[0_12px_32px_rgba(10,22,40,0.08)] sm:p-7">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-display text-[13px] font-bold uppercase tracking-[0.08em] text-accent">Deze week</span>
                  <span className="text-[13px] text-[#5B6B85]">ma t/m zo</span>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-3">
                  {[
                    { l: 'Uitgegeven', w: '€ 310' },
                    { l: 'Aanvragen', w: '9' },
                    { l: 'Per aanvraag', w: '€ 34' },
                  ].map((c) => (
                    <div key={c.l} className="rounded-[12px] p-3 sm:p-4" style={{ background: '#F7F8FA' }}>
                      <p className="m-0 text-[12px] text-[#5B6B85] sm:text-[13px]">{c.l}</p>
                      <p className="m-0 mt-1 font-display text-[22px] font-extrabold text-primary sm:text-[28px]">{c.w}</p>
                    </div>
                  ))}
                </div>
                <table className="mt-5 w-full border-collapse text-left text-[14px] text-[#2A3A54] sm:text-[15px]">
                  <thead>
                    <tr className="text-[12px] text-[#5B6B85] sm:text-[13px]">
                      <th className="pb-2 font-semibold">Kanaal</th>
                      <th className="pb-2 text-right font-semibold">Uitgegeven</th>
                      <th className="pb-2 pl-3 text-right font-semibold">Aanvragen</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Google zoeken', '€ 190', '6'],
                      ['Facebook en Instagram', '€ 120', '2'],
                      ['Gevonden zonder advertentie', '€ 0', '1'],
                    ].map(([k, u, a]) => (
                      <tr key={k} className="border-t border-[#D6DDE8]">
                        <td className="py-2.5 font-semibold text-primary">{k}</td>
                        <td className="py-2.5 text-right">{u}</td>
                        <td className="py-2.5 pl-3 text-right font-bold text-primary">{a}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <figcaption className="mt-4 text-[14px] text-[#5B6B85]">
                Voorbeeld van je weekoverzicht. De cijfers zijn verzonnen.
              </figcaption>
            </figure>

            <figure className="m-0">
              <div className="rounded-[14px] border border-[#D6DDE8] bg-white p-5 shadow-[0_12px_32px_rgba(10,22,40,0.08)] sm:p-7">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-display text-[13px] font-bold uppercase tracking-[0.08em] text-accent">Gesprekken</span>
                  <span className="text-[13px] text-[#5B6B85]">vandaag</span>
                </div>
                <ul className="m-0 mt-4 list-none p-0">
                  {[
                    {
                      t: '08:12',
                      s: 'Gemist, teruggebeld',
                      d: vak?.enkelvoud === 'installateur'
                        ? 'Ketel geeft storing, woning in Etten-Leur. Wil vandaag iemand langs.'
                        : 'Lekkage bij de dakgoot, woning in Etten-Leur. Wil vandaag iemand langs.',
                    },
                    {
                      t: '10:40',
                      s: 'Opgenomen',
                      d: vak?.enkelvoud === 'installateur'
                        ? 'Vraagt een offerte voor een warmtepomp, tussenwoning in Breda.'
                        : 'Vraagt een offerte voor een nieuw plat dak, garage in Breda.',
                    },
                    {
                      t: '13:05',
                      s: 'Buiten werktijd, bericht ingesproken',
                      d: 'Bestaande klant, vraagt naar de afspraak van donderdag.',
                    },
                  ].map((g, i) => (
                    <li key={g.t} className={`flex gap-4 py-3.5 ${i > 0 ? 'border-t border-[#D6DDE8]' : ''}`}>
                      <span className="w-[46px] shrink-0 font-display text-[15px] font-bold text-primary">{g.t}</span>
                      <div>
                        <p className="m-0 text-[13px] font-semibold text-[#3D8EFF]">{g.s}</p>
                        <p className="m-0 mt-1 text-[15px] leading-[1.45] text-[#2A3A54]">{g.d}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <figcaption className="mt-4 text-[14px] text-[#5B6B85]">
                Voorbeeld van je telefooncentrale. Elk gesprek wordt in een zin samengevat.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* Wat het opstarttraject is */}
      <section className="px-6" style={{ paddingTop: 104, paddingBottom: 104 }}>
        <div className="mx-auto max-w-[1152px]">
          <h2 className="m-0 max-w-[20ch] font-display font-extrabold text-primary" style={h2Stijl}>
            Eerst goed van start, dan pas de rest.
          </h2>
          <div className={`mt-8 flex max-w-[680px] flex-col gap-5 ${tekst}`}>
            <p className="m-0">
              Wij zijn een marketing- en salesbureau uit Breda. Elk traject begint met de basis. Wat erin zit en wat het kost, staat vooraf in je offerte.
            </p>
          </div>
          <Punten items={OPSTART} kolommen={2} />
        </div>
      </section>

      {/* Zo werkt het */}
      <section className="bg-surface px-6" style={{ paddingTop: 104, paddingBottom: 104 }}>
        <div className="mx-auto max-w-[1152px]">
          <h2 className="m-0 max-w-[20ch] font-display font-extrabold text-primary" style={h2Stijl}>
            Zo word je klant, in drie stappen.
          </h2>
          <Punten items={STAPPEN} kolommen={3} />
        </div>
      </section>

      {/* Voorwaarden */}
      <section id="voorwaarden" className="scroll-mt-24 px-6" style={{ paddingTop: 104, paddingBottom: 104 }}>
        <div className="mx-auto max-w-[1152px]">
          <p className={label}>Zonder kleine lettertjes</p>
          <h2 className="m-0 max-w-[20ch] font-display font-extrabold text-primary" style={h2Stijl}>
            Wat er precies geldt.
          </h2>
          <ul className={`m-0 mt-8 max-w-[760px] list-none space-y-4 p-0 ${tekst}`}>
            {VOORWAARDEN.map((v) => (
              <li key={v} className="flex gap-4">
                <span className="mt-[11px] inline-block h-2 w-2 flex-shrink-0 rounded-full bg-accent" aria-hidden="true" />
                <span>{v}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Doorverwijzen: de voorwaarden zijn een voorstel van Claude, Koen beslist (W-861). */}
      <section id="doorverwijzen" className="scroll-mt-24 bg-surface px-6" style={{ paddingTop: 48, paddingBottom: 48 }}>
        <details className="mx-auto max-w-[1152px]">
          <summary className="cursor-pointer font-display text-[20px] font-bold text-primary">Ken je een adverteerder? Breng hem mee.</summary>
          <h2 className="m-0 max-w-[20ch] font-display font-extrabold text-primary" style={h2Stijl}>
            Breng een adverteerder mee, en speel samen.
          </h2>
          <div className={`mt-8 flex max-w-[680px] flex-col gap-5 ${tekst}`}>
            <p className="m-0">
              Wij hebben geen dure salesmensen. Wij geven liever een bonus aan jou. Zo houden wij meer tijd over voor
              wat we echt leuk vinden: werk dat voor onze klanten op winst stuurt.
            </p>
            <p className="m-0">
              Ken je een adverteerder die een bureau zoekt dat op winst stuurt? Stuur hem naar ons. Wordt hij klant, dan krijgt
              hij de PS5 met GTA VI. Jij krijgt GTA VI als PlayStation Store-tegoed. Dan kun je samen met je maat spelen.
            </p>
            <p className="m-0">
              Het tegoed koopt Stevin.AI nadat de adverteerder die je aanbracht zijn jaarcontract heeft getekend en zijn
              opstarttraject heeft betaald. Je meldt hem aan bij ons voordat hij tekent, via info@stevin.ai.
            </p>
          </div>
          <h3 className="m-0 mt-12 font-display text-[20px] font-bold text-primary">Voorwaarden voor doorverwijzen</h3>
          <ul className={`m-0 mt-6 max-w-[760px] list-none space-y-4 p-0 ${tekst}`}>
            {DOORVERWIJZEN.map((v) => (
              <li key={v} className="flex gap-4">
                <span className="mt-[11px] inline-block h-2 w-2 flex-shrink-0 rounded-full bg-accent" aria-hidden="true" />
                <span>{v}</span>
              </li>
            ))}
          </ul>
        </details>
      </section>

      {/* Gesprek en formulier */}
      <section id="gesprek" className="scroll-mt-24 px-6" style={{ paddingTop: 104, paddingBottom: 104 }}>
        <div className="mx-auto max-w-[900px]">
          <h2 className="m-0 max-w-[20ch] font-display font-extrabold text-primary" style={h2Stijl}>
            Bel of app ons.
          </h2>
          <a href={TELEFOON.tel} data-vak={vakSleutel} data-cta="ps5_actie_onder_bel" className="mt-6 block font-display font-extrabold text-primary" style={{ fontSize: 'clamp(36px, 6vw, 60px)', letterSpacing: '-0.02em', lineHeight: 1 }}>
            {TELEFOON.weergave}
          </a>
          <p className={`m-0 mt-4 max-w-[680px] ${tekst}`}>
            We zeggen meteen hoeveel plekken er nog zijn.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={appLink} data-vak={vakSleutel} data-cta="ps5_actie_onder_whatsapp" className="inline-flex items-center rounded-lg px-7 py-3.5 font-display text-[16px] font-bold text-white" style={{ background: '#0A1628' }}>App ons</a>
            <Knop cta="ps5_actie_gesprek_knop" />
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

      {/* Op telefoons alleen het bolletje van de vraagbot: het label viel over de tekst en bellen en appen staan al in de balk. */}
      <style>{`@media (max-width: 639px) { .vraagbot-label { display: none; } }`}</style>
      <div className="fixed inset-x-0 bottom-0 z-40 flex gap-2 p-3 sm:hidden" style={{ background: '#0A1628' }}>
        <a href={TELEFOON.tel} data-vak={vakSleutel} data-cta="ps5_actie_sticky_bel" className="flex-1 rounded-lg py-3 text-center font-display text-[16px] font-bold text-white" style={{ background: '#3D8EFF' }}>Bel {TELEFOON.weergave}</a>
        <a href={appLink} data-vak={vakSleutel} data-cta="ps5_actie_sticky_whatsapp" className="flex-1 rounded-lg bg-white py-3 text-center font-display text-[16px] font-bold" style={{ color: '#0A1628' }}>App ons</a>
      </div>

      {/* Geen FAQPage-schema: de pagina staat op noindex. */}
      <Vragen kop="Wat mensen ons hierover vragen" vragen={VRAGEN} schema={false} />
    </main>
  )
}
