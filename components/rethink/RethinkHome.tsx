import { Link } from '@/i18n/navigation'
import KlantLogos from '@/components/KlantLogos'
import VraagChat from './VraagChat'
import HeroUniversum from './HeroUniversum'
import ScrollStappen from './ScrollStappen'
import NodeWatermerk from './NodeWatermerk'

/**
 * De Nederlandse homepage, W-535 (briefing Koen 10 okt 2026, "Rethink your
 * marketing"), richting C: het brein in 3D over het hele scherm. De richtingen
 * A en B en hun blokken (brein, signalen, Advisor, praktijk, samenwerken)
 * staan in de git-geschiedenis van dit bestand tot 69e2969; hun tekst gaat
 * naar de verdiepingspagina's.
 *
 * Elke zin die iets belooft is nagekeken tegen de Hub-audit van 10 okt (zie
 * docs/research/W535_REDESIGN_STEVIN_AI.md in Stevin-Hub). Wat niet bij een
 * klant draait, staat er als inrichting of als voorbeeld, niet als bestaande
 * koppeling.
 *
 * Koen, 11 okt 09:27: een belofte over wat ons team als managed dienst doet
 * mag, ook als het per klant nog ingericht wordt. Alleen een softwarefunctie
 * claimen die er niet is, mag niet. Geen voorbehouden over randgevallen op de
 * pagina.
 */

const h2 = 'font-display font-extrabold text-primary m-0'
const h2Stijl = { fontSize: 'clamp(30px, 3.4vw, 48px)', letterSpacing: '-0.03em', lineHeight: '1.08' } as const
const tekst = 'text-[18px] leading-[1.6] text-[#2A3A54]'

// Echte kleurlogo's (Koen, 10 okt 23:32). Herkomst en controle:
// docs/MERKLOGOS_W535.md.
const LOGOS = [
  { src: '/logos/merken/google-ads.svg', naam: 'Google Ads' },
  { src: '/logos/merken/google-analytics.svg', naam: 'Google Analytics 4' },
  { src: '/logos/merken/google-search-console.svg', naam: 'Search Console' },
  { src: '/logos/merken/meta.svg', naam: 'Meta' },
  { src: '/logos/merken/chatgpt.svg', naam: 'ChatGPT Ads' },
  { src: '/logos/merken/facebook.svg', naam: 'Facebook' },
  { src: '/logos/merken/instagram.svg', naam: 'Instagram' },
  { src: '/logos/merken/youtube.svg', naam: 'YouTube' },
  { src: '/logos/merken/tiktok.svg', naam: 'TikTok' },
  { src: '/logos/merken/linkedin.svg', naam: 'LinkedIn' },
  { src: '/logos/merken/shopify.svg', naam: 'Shopify' },
  { src: '/logos/merken/wordpress.svg', naam: 'WordPress' },
  { src: '/logos/merken/hubspot.svg', naam: 'HubSpot' },
  // De twee meest gebruikte boekhoudpakketten (Koen, 11 okt); keuze en bronnen
  // in docs/MERKLOGOS_W535.md.
  { src: '/logos/merken/exact-online.svg', naam: 'Exact Online' },
  { src: '/logos/merken/moneybird.svg', naam: 'Moneybird' },
]

// Systemen zonder vast merk: alleen tekst in een gestippelde chip. Geen
// template-icoon ernaast (Koen: "cheap", "goedkope icoontjes").
const ZONDER_LOGO = ['Telefonie', 'Je CRM', 'Offertes']

// Niet meer op de homepage ("less is more", 11 okt); bewaard voor Zo werkt Stevin.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const LAGEN = [
  { kop: 'Vakkennis', tekst: 'Wat in marketing en verkoop werkt, en wat niet.' },
  { kop: 'Je bedrijf', tekst: 'Wat je verkoopt, aan wie, en wat een goede klant is.' },
  { kop: 'Je doelen', tekst: 'Wat je dit jaar wilt bereiken, en wat een gewone week hoort op te leveren.' },
  { kop: 'Wat er eerder gebeurde', tekst: 'Resultaten van vorige maanden en jaren. Dan is een dip niet meteen paniek.' },
  { kop: 'Je kanalen', tekst: 'Campagnes, website, zoekresultaten en telefoon.' },
  { kop: 'De markt', tekst: 'Seizoen, zoekgedrag en wat concurrenten doen.' },
  { kop: 'Afspraken', tekst: 'Wie wat oppakt, en of het gebeurd is.' },
]

// Van signaal via advies naar uitvoering, met een hittegolf als voorbeeld
// (Koen, 11 okt). Stevin ziet een hittegolf nog niet zelf: daarom begint de
// aanleiding met "Stel", en staat nergens dat Stevin het weer volgt. Tekst uit
// de verkoopsynthese van 11 okt (managed: wij doen het werk, jij houdt de knop
// over je budget).
const UITVOERING = {
  kop: 'Jij beslist over je budget. Wij regelen de rest.',
  vaststelling: "Stel, het is een hittegolf en je budget voor airco is 's middags al op.",
  // Koen, 12 okt 09:29: "we kijken of je uberhaupt meer werk aan kan, budget
  // verlagen is natuurlijk ook een optie". Was: uitrekenen, ja, "we spreken
  // af wie de telefoon opneemt", na een week aanvragen tellen.
  stappen: [
    'We kijken eerst of je meer werk aankunt.',
    'We rekenen uit of meer budget loont. Soms is minder slimmer.',
    'Pas als jij ja zegt, passen we je budget aan.',
    'Na een week laten we zien wat het opleverde.',
  ],
  doel: 'Zoveel aanvragen als je aankunt, zonder dat ze duurder worden.',
  naschrift: 'We verdienen niets aan je advertentiebudget.',
}

// Prijsblok in Kennismaken (Koen, 11 okt 09:21: "noem gewoon de vanaf. 1399
// wij worden jouw bureau. 399 je doet het zelf of met je bureau"). Managed
// eerst en groot. Bedragen zoals op /tarieven (kaart 01 en 03, bij
// jaarbetaling); de uitleg over jaar- of maandbetaling staat daar, niet hier.
// Kop: Koen, 11 okt 09:27 ("we mogen ons ook een bureau noemen"). Zin en de
// twee regels letterlijk zoals Koen ze gaf (11 okt 09:48 en 09:49).
const PRIJZEN = {
  kop: 'Het laatste bureau dat je nodig hebt.',
  zin: ['Eerst zetten wij alles goed.', 'Daarna bouwen we agents die het werk voor je doen.'],
  hoofd: { wat: 'Wij worden jouw bureau', prijs: 'vanaf 1.399', per: 'per maand' },
  zelf: { wat: 'Je doet het zelf, of we zetten jouw agents aan het werk', prijs: 'vanaf 399', per: 'per maand' },
  // Onder de twee prijzen (Koen, 11 okt 13:57). De uitleg (2.000 tegen 10.000
  // budget, geen marge) hoort op /tarieven.
  budget: 'Je prijs groeit niet mee met je advertentiebudget.',
}

// Niet meer op de homepage (W-535, less is more); de uitleg per keuze is voor
// de pagina Samenwerken.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const WIE = [
  { kop: 'Wij', tekst: 'We doen het werk zelf, met jou als opdrachtgever.' },
  { kop: 'Je eigen team', tekst: 'Wij zeggen wat er moet gebeuren, jouw mensen doen het.' },
  { kop: 'Je bureau', tekst: 'Je bureau blijft. Wij kijken mee en zeggen het als iets niet klopt.' },
]

export default function RethinkHome() {
  return (
    <>
      {/* ── 1. HERO ── */}
      <HeroUniversum kop={<HeroKop />} knoppen={<HeroKnoppen />} />

      {/* Voor wie we al werken: hetzelfde blok als op de huidige homepage
          (Koen, 11 okt 01:17: "voor wie we al werken is helemaal weg"). */}
      <KlantLogos locale="nl" />

      {/* ── 2. WAT WE VERBINDEN ── */}
      <section className="relative overflow-hidden border-y border-border bg-surface" style={{ padding: '64px 24px' }} aria-labelledby="koppelingen">
        <NodeWatermerk seed={11} thema="licht" />
        <div className="relative mx-auto max-w-[1200px]">
          <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <h2 id="koppelingen" className={h2} style={{ ...h2Stijl, fontSize: 'clamp(26px, 2.6vw, 36px)' }}>
              We verbinden wat je al gebruikt.
            </h2>
            {/* "Je hoeft niets te vervangen" mag terug (Koen, 11 okt 09:27):
                het geval waarin het bureau bij Meta betaalt is niet de
                standaardklant. */}
            <p className={`${tekst} m-0 max-w-[620px]`}>
              Je hoeft niets te vervangen. Een deel koppelen we meteen, de rest richten we voor je in.
            </p>
          </div>
        </div>
        {/* Logo-band: twee rijen chips die langzaam voorbij schuiven. Op mobiel
            namen de tegels een heel scherm in (Koen, 11 okt 01:16). De extra
            kopieen per rij zijn alleen voor de naadloze lus en zijn verborgen
            voor schermlezers. Drie kopieen en hoogstens 1440px breed: met twee
            was een rij (ongeveer 1030px) smaller dan de band vanaf 1080px
            breed, en schoof er aan het eind van elke ronde een leeg stuk in
            beeld (gemeten 11 okt). Onder reduced motion staat alles stil en
            loopt het af. */}
        <div className="lb-band relative mx-auto mt-10 max-w-[1440px] space-y-3" aria-label="Systemen die we koppelen">
          {[LOGOS.slice(0, 7), [...LOGOS.slice(7)]].map((rij, ri) => (
            <div key={ri} className="lb-rij overflow-hidden">
              <div className={`lb-spoor flex w-max gap-3 ${ri === 1 ? 'lb-terug' : ''}`}>
                {[0, 1, 2].map((kopie) => (
                  <ul key={kopie} className="m-0 flex list-none gap-3 p-0" aria-hidden={kopie > 0 ? true : undefined}>
                    {rij.map((l) => (
                      <li
                        key={l.naam}
                        className="flex shrink-0 items-center gap-2.5 rounded-full border border-border bg-white py-2 pl-2.5 pr-4 shadow-[0_1px_2px_rgba(10,22,40,0.04)]"
                      >
                        <img src={l.src} alt="" width={22} height={22} className="h-[22px] w-[22px] object-contain" loading="lazy" />
                        <span className="whitespace-nowrap text-[14px] font-medium text-[#2A3A54]">{l.naam}</span>
                      </li>
                    ))}
                    {ri === 1 &&
                      ZONDER_LOGO.map((naam) => (
                        <li
                          key={naam}
                          className="flex shrink-0 items-center rounded-full border border-dashed border-[#C8D2E0] bg-surface px-4 py-2"
                        >
                          <span className="whitespace-nowrap text-[14px] font-medium text-muted">{naam}</span>
                        </li>
                      ))}
                  </ul>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 3. VRAAG HET STEVIN ── */}
      {/* overflow clip in plaats van hidden, anders blijft het paneel van de
          vraagdemo niet vaststaan tijdens het scrollen. */}
      <section
        id="hoe-het-werkt"
        className="vc-klem relative scroll-mt-24 bg-white"
        style={{ padding: '112px 24px 104px' }}
      >
        <NodeWatermerk seed={23} thema="licht" />
        <div className="relative mx-auto max-w-[1200px]">
          {/* Geen eyebrow en geen lege alinea's; het label Voorbeeld staat in
              het paneel zelf. De kop staat mee vast met het paneel, als die
              samen op het scherm passen. */}
              <VraagChat
                kop={
                  // In het midden, op dezelfde as als het paneel en de zin en
                  // knop eronder. Links stond hij op een breed scherm los van
                  // het paneel (1440: kop op 144px, paneel vanaf 400px).
                  <h2 className={`${h2} mx-auto text-center`} style={{ ...h2Stijl, maxWidth: '18ch' }}>
                    Geen rapportje achteraf.
                  </h2>
                }
              />
              {/* Onder het paneel een zin en dezelfde knop als in de hero, in
                  de hoofdstijl (logoblauw met witte tekst). Google en
                  Meta staan hier ook voor wie de demo niet invult (Koen, 11 okt
                  09:27: "tuurlijk doen we dat straks wel"). */}
              <div className="mx-auto mt-8 flex max-w-[640px] flex-col items-center gap-5 text-center">
                <p className={`${tekst} m-0 text-balance`}>
                  Het gaat ons om opdrachten, niet om klikken. Daarom vertellen we Google en Meta welke aanvraag een opdracht werd.
                </p>
                <Link
                  href="/kennismaking"
                  data-cta="demo_kennismaking"
                  data-open-kennismaking=""
                  className="inline-flex items-center rounded-lg bg-accent px-7 py-3.5 font-display text-[15px] font-bold text-white transition-[filter] hover:brightness-110"
                >
                  Plan een kennismaking
                </Link>
              </div>
        </div>
      </section>

      {/* ── 4. VAN ADVIES NAAR UITVOERING ── */}
      {/* Scrollverhaal: bij elk stuk scrollen komt er een stap bij (Koen, 11 okt). */}
      {/* Wie het werk doet staat in het vastgezette deel van de stappen, niet
          in een eigen band en niet erna: allebei oogden als een zesde blok
          (11 okt). Daarna volgt Kennismaken, ook donker; een haarlijn houdt de
          twee blokken uit elkaar. */}
      <section className="bg-primary px-6 text-white" aria-label="Uitvoering">
        <div className="mx-auto max-w-[1200px] border-b border-white/10 pb-20 lg:pb-24">
          <ScrollStappen
            eyebrow="Uitvoering"
            kop={UITVOERING.kop}
            vaststelling={UITVOERING.vaststelling}
            stappen={UITVOERING.stappen}
            doel={UITVOERING.doel}
            naschrift={UITVOERING.naschrift}
          />
        </div>
      </section>

      {/* ── 5. KENNISMAKEN ── */}
      <section id="kennismaken" className="relative overflow-hidden scroll-mt-24 bg-primary text-white" style={{ padding: '112px 24px' }}>
        <NodeWatermerk seed={97} thema="donker" />
        <div className="relative mx-auto max-w-[880px]">
          {/* Prijzen: typografisch op donker zoals Uitvoering, geen kaartjes,
              geen opsomming. Managed groot, zelf doen kleiner eronder. De kop
              en Koens zin erboven (11 okt 09:27 en 09:48); pay per fix en
              klant blijven staan op /tarieven. */}
          <h2 className="m-0 font-display font-extrabold text-white" style={{ ...h2Stijl, maxWidth: '16ch' }}>
            {PRIJZEN.kop}
          </h2>
          {/* Elke zin op een eigen regel: als een doorlopende alinea bleef er
              op elke breedte "je doen." alleen op de laatste regel staan
              (gemeten 11 okt, 360 tot 3440). */}
          <p className="m-0 mt-5 max-w-[620px] text-balance text-[18px] leading-[1.6] text-white/75">
            {PRIJZEN.zin.map((z) => (
              <span key={z} className="block">
                {z}
              </span>
            ))}
          </p>
          <dl className="m-0 mt-10 border-t border-white/12">
            <div className="flex flex-col gap-1.5 border-b border-white/12 py-6 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
              <dt
                className="font-display font-extrabold text-white"
                style={{ fontSize: 'clamp(24px, 2.6vw, 34px)', letterSpacing: '-0.025em', lineHeight: '1.15' }}
              >
                {PRIJZEN.hoofd.wat}
              </dt>
              <dd className="m-0 whitespace-nowrap font-display text-white">
                <span className="font-extrabold" style={{ fontSize: 'clamp(24px, 2.6vw, 34px)', letterSpacing: '-0.025em' }}>
                  {PRIJZEN.hoofd.prijs}
                </span>{' '}
                <span className="text-[15px] font-medium text-white/60">{PRIJZEN.hoofd.per}</span>
              </dd>
            </div>
            <div className="flex flex-col gap-1 border-b border-white/12 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
              <dt className="text-balance text-[17px] leading-snug text-white/75">{PRIJZEN.zelf.wat}</dt>
              <dd className="m-0 whitespace-nowrap text-[17px] text-white/75">
                <span className="font-display font-bold text-white/90">{PRIJZEN.zelf.prijs}</span> {PRIJZEN.zelf.per}
              </dd>
            </div>
          </dl>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
            <p className="m-0 text-balance text-[15px] leading-snug text-white/60">{PRIJZEN.budget}</p>
            <p className="m-0 shrink-0">
              <Link
                href="/tarieven"
                data-cta="prijs_tarieven"
                className="text-[14px] text-white/60 underline underline-offset-4 transition-colors hover:text-white"
              >
                Alle tarieven
              </Link>
            </p>
          </div>

          {/* Een knop: de diagnoseknop en de zin eronder zijn eraf (11 okt). */}
          <div className="mt-20 text-center sm:mt-24">
            <h2 className="m-0 font-display font-extrabold text-white" style={h2Stijl}>
              Wat zouden wij bij jou als eerste doen?
            </h2>
            <p className="mx-auto mt-5 max-w-[620px] text-[18px] leading-[1.6] text-white/75">
              Dat hoor je in een half uur. Past het niet, dan zeggen we dat ook.
            </p>
            <div className="mt-9 flex justify-center">
              <Link
                href="/kennismaking"
                data-cta="kennismaking"
                data-open-kennismaking=""
                className="inline-flex items-center rounded-lg bg-accent px-7 py-3.5 font-display text-[15px] font-bold text-white transition-[filter] hover:brightness-110"
              >
                Plan een kennismaking
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

// De hero zet kop en knoppen los, zodat op mobiel het brein ertussen kan. Op
// elke schermmaat alleen de korte subregel onder de kop; de blokken eronder
// vertellen de rest (Koen, 10 okt 23:08: "niet gelijk die hele tekst").
// W-684 (Koen, 27 okt): "Van klik tot klant" als kop, met AI in de regel
// erboven en de volgorde eerst cijfers, dan AI in de subregel. De regel boven
// de kop heeft dezelfde opmaak als op de andere pagina's (RethinkBlokken).
function HeroKop() {
  return (
    <>
      <p className="m-0 mb-5 font-display text-[12px] font-bold uppercase tracking-[0.12em] text-accent">
        AI-marketingbureau voor het mkb
      </p>
      <h1
        className="m-0 font-display font-extrabold text-white"
        style={{ fontSize: 'clamp(44px, 6.2vw, 84px)', letterSpacing: '-0.045em', lineHeight: '0.98' }}
      >
        Van klik tot klant.
      </h1>
      <p className="mt-5 text-balance text-[19px] leading-[1.45] text-white/75">
        Eerst zetten we je marketing en je cijfers goed. Levert dat wat op, dan bouwen we de AI die het werk van je overneemt.
      </p>
    </>
  )
}

// Naast elkaar onder de kop, op een staande tablet in het midden onder het
// brein (variant zij en tablet, app/globals.css).
function HeroKnoppen() {
  return (
    <div className="zij:mt-9 flex flex-wrap gap-3 tablet:justify-center">
      {/* Opent het kennismakingsvenster (zelfde route als header en slot),
          met /kennismaking als terugval zonder JS. */}
      <Link
        href="/kennismaking"
        data-cta="hero_kennismaking"
        data-open-kennismaking=""
        className="inline-flex w-full items-center justify-center rounded-lg bg-accent px-6 py-3.5 font-display text-[15px] font-bold text-white transition-[filter] hover:brightness-110 sm:w-auto"
      >
        Plan een kennismaking
      </Link>
      {/* Een eigen vlak, anders schemerde een node van het brein door de knop
          heen (980 en 1024 breed). */}
      <a
        href="#hoe-het-werkt"
        data-cta="hero_hoe"
        className="hidden items-center rounded-lg border border-white/25 bg-primary/80 px-6 py-3.5 font-display text-[15px] font-bold text-white transition-colors hover:border-white/60 zij:inline-flex"
      >
        Bekijk hoe het werkt
      </a>
    </div>
  )
}
