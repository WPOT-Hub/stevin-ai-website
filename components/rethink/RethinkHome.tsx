import { Link } from '@/i18n/navigation'
import KlantLogos from '@/components/KlantLogos'
import StevinNetwerk from './StevinNetwerk'
import VraagDemo from './VraagDemo'
import VraagChat from './VraagChat'
import HeroUniversum from './HeroUniversum'
import ScrollStappen from './ScrollStappen'
import KennismakingVenster from './KennismakingVenster'
import NodeWatermerk from './NodeWatermerk'
import type { BronId } from './netwerk'

/**
 * Voorstel nieuwe homepage, W-535 (briefing Koen 10 okt 2026, "Rethink your
 * marketing"). Twee richtingen met precies dezelfde inhoud:
 *
 *   a: licht, rustig en zakelijk. Netwerk naast de kop.
 *   b: donkere hero met het netwerk groot in beeld, daarna lichte blokken.
 *   c: het brein in 3D over het hele scherm (na "geen wow factor", 10 okt).
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

export type Richting = 'a' | 'b' | 'c'

const HERO_DEMO = {
  vraag: 'Resultaten deze week?',
  bronnen: ['website', 'telefonie', 'crm', 'offertes', 'verkoop'] as BronId[],
  signaal: '6 aanvragen open',
  uitleg: 'Voorbeeld: met website, telefoon, CRM en offertes gekoppeld ziet Stevin dat bij zes aanvragen niet vastligt of iemand heeft gebeld.',
  verderHref: '#hoe-het-werkt',
}

const h2 = 'font-display font-extrabold text-primary m-0'
const h2Stijl = { fontSize: 'clamp(30px, 3.4vw, 48px)', letterSpacing: '-0.03em', lineHeight: '1.08' } as const
const eyebrow = 'text-accent-diep text-[12px] font-display font-bold tracking-[0.12em] uppercase mb-4'
const tekst = 'text-[18px] leading-[1.6] text-[#2A3A54]'

// Echte kleurlogo's (Koen, 10 okt 23:32). Herkomst en controle:
// docs/MERKLOGOS_W535.md.
const LOGOS = [
  { src: '/logos/merken/google-ads.svg', naam: 'Google Ads' },
  { src: '/logos/merken/google-analytics.svg', naam: 'Google Analytics 4' },
  { src: '/logos/merken/google-search-console.svg', naam: 'Search Console' },
  { src: '/logos/merken/meta.svg', naam: 'Meta' },
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

const SIGNAALSOORTEN = [
  'De vraag naar een dienst verandert',
  'Een campagne trekt bezoek maar weinig aanvragen',
  'Aanvragen worden beter of slechter',
  'De opvolging blijft achter',
  'Een concurrent adverteert meer',
  'Er zoeken minder mensen op je naam',
  'Een seizoen of regeling biedt een kans',
]

const ADVIEZEN = [
  'Zorg eerst dat elke aanvraag wordt opgevolgd.',
  'Kijk eerst of je cijfers kloppen.',
  'Zoek uit waarom offertes geen klant worden.',
  'Bouw aan je naamsbekendheid, niet alleen aan klikken.',
  'Verbeter de pagina waar je advertentie naartoe leidt.',
  'Laat marketing en verkoop dezelfde cijfers gebruiken.',
  'Verander nog niets. De cijfers zijn niet betrouwbaar genoeg.',
]

// Van signaal via advies naar uitvoering, met een hittegolf als voorbeeld
// (Koen, 11 okt). Stevin ziet een hittegolf nog niet zelf: daarom begint de
// aanleiding met "Stel", en staat nergens dat Stevin het weer volgt. Tekst uit
// de verkoopsynthese van 11 okt (managed: wij doen het werk, jij houdt de knop
// over je budget).
const UITVOERING = {
  kop: 'Jij beslist over je budget. Wij regelen de rest.',
  vaststelling: "Stel, het is een hittegolf en je budget voor airco is 's middags al op.",
  stappen: [
    'We rekenen uit of meer budget loont.',
    'Pas als jij ja zegt, gaat je budget omhoog.',
    'We spreken af wie de telefoon opneemt.',
    'Na een week laten we zien hoeveel aanvragen erbij kwamen.',
  ],
  doel: 'Meer aanvragen, zonder dat ze duurder worden.',
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
  zelf: { wat: 'Je doet het zelf, of we zetten agents aan het werk', prijs: 'vanaf 399', per: 'per maand' },
}

// Niet meer op de homepage (W-535, less is more); de uitleg per keuze is voor
// de pagina Samenwerken.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const WIE = [
  { kop: 'Wij', tekst: 'We doen het werk zelf, met jou als opdrachtgever.' },
  { kop: 'Je eigen team', tekst: 'Wij zeggen wat er moet gebeuren, jouw mensen doen het.' },
  { kop: 'Je bureau', tekst: 'Je bureau blijft. Wij kijken mee en zeggen het als iets niet klopt.' },
]

// "Less is more" (Koen, 11 okt 01:18): per situatie een kop en een zin.
// De uitgewerkte versies (situatie en aanpak) gaan naar In de praktijk.
const PRAKTIJK = [
  { kop: 'Je investeert in naamsbekendheid', kort: 'We kijken niet alleen naar klikken, maar ook of meer mensen op je naam gaan zoeken.' },
  { kop: 'Veel aanvragen, weinig goede', kort: 'We leggen je campagnes naast wat verkoop met de aanvragen deed.' },
  { kop: 'Aanvragen blijven liggen', kort: 'We richten in hoe elke aanvraag wordt vastgelegd en opgevolgd.' },
]

const STAPPEN = [
  'We leren je bedrijf en je doelen kennen.',
  'We richten in wat nodig is.',
  'We helpen, en jij gaat steeds meer zelf doen.',
]

export default function RethinkHome({ richting }: { richting: Richting }) {
  const donkereHero = richting === 'b'

  return (
    <>
      {/* ── 1. HERO ── */}
      {richting === 'c' ? (
        <HeroUniversum
          kop={<HeroTekst donker deel="kop" mobielKort />}
          knoppen={<HeroTekst donker deel="knoppen" mobielKort />}
        />
      ) : donkereHero ? (
        <section className="relative -mt-[72px] overflow-hidden bg-primary px-6" style={{ padding: 'calc(88px + 72px) 24px 96px' }}>
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden="true"
            style={{ background: 'radial-gradient(60% 55% at 72% 45%, rgba(61,142,255,0.16) 0%, rgba(10,22,40,0) 70%)' }}
          />
          <div className="relative mx-auto grid max-w-[1200px] items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <HeroTekst donker />
            </div>
            <StevinNetwerk thema="donker" label="Stevin brengt je informatie samen" demo={HERO_DEMO} />
          </div>
        </section>
      ) : (
        // Ook de lichte hero schuift onder de header door: html is navy, en
        // tussen de header (65px) en main (72px) bleef anders een donkere streep.
        <section className="relative -mt-[72px] overflow-hidden bg-white" style={{ padding: 'calc(72px + 72px) 24px 88px' }}>
          <div className="mx-auto grid max-w-[1200px] items-center gap-12 lg:grid-cols-[1fr_1fr]">
            <div>
              <HeroTekst />
            </div>
            <StevinNetwerk thema="licht" label="Stevin brengt je informatie samen" demo={HERO_DEMO} />
          </div>
        </section>
      )}

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
        <div className="mx-auto max-w-[1200px]">
        </div>
      </section>

      {/* ── 3. VRAAG HET STEVIN ── */}
      {/* Richting C: overflow clip in plaats van hidden, anders blijft het
          paneel van de vraagdemo niet vaststaan tijdens het scrollen. */}
      <section
        id="hoe-het-werkt"
        className={`relative scroll-mt-24 bg-white ${richting === 'c' ? 'vc-klem' : 'overflow-hidden'}`}
        style={{ padding: '112px 24px 104px' }}
      >
        <NodeWatermerk seed={23} thema="licht" />
        <div className="relative mx-auto max-w-[1200px]">
          {/* Richting C: geen eyebrow en geen lege alinea's; het label
              Voorbeeld staat in het paneel zelf. De kop staat mee vast met
              het paneel, als die samen op het scherm passen. */}
          {richting !== 'c' && <p className={eyebrow}>Stel een vraag</p>}
          {richting === 'c' ? (
            <>
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
                  de hoofdstijl (accent-diep: wit haalt daarop AA). Google en
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
                  className="inline-flex items-center rounded-lg bg-accent-diep px-7 py-3.5 font-display text-[15px] font-bold text-white transition-colors hover:bg-accent-dieper"
                >
                  Plan een kennismaking
                </Link>
              </div>
            </>
          ) : (
            <>
              <h2 className={h2} style={{ ...h2Stijl, maxWidth: '18ch' }}>
                Geen rapportje achteraf.
              </h2>
              <p className={`${tekst} mb-12 mt-5 max-w-[640px]`}>Probeer het: kies een vraag.</p>
              <VraagDemo />
              <p className="mt-8 max-w-[720px] text-[14px] leading-relaxed text-muted">Voorbeeld met verzonnen cijfers.</p>
            </>
          )}
        </div>
      </section>

      {/* Richting C: kort ("less is more", "we zijn alles aan het vertellen",
          Koen 11 okt). Deze blokken gaan naar de verdiepingspagina's. */}
      {richting !== 'c' && (
        <>
      {/* ── 4. HET BREIN ── */}
      <section className="bg-surface" style={{ padding: '112px 24px' }} aria-labelledby="brein">
        <div className="mx-auto grid grid-cols-1 max-w-[1200px] items-center gap-14 lg:grid-cols-[1fr_1fr]">
          <div>
            <p className={eyebrow}>Het brein achter Stevin</p>
            <h2 id="brein" className={h2} style={{ ...h2Stijl, maxWidth: '16ch' }}>
              Niet alleen je cijfers. Ook wat je wilt bereiken.
            </h2>
            <p className={`${tekst} mt-5`}>
              Een cijfer zegt pas iets als je weet wat de bedoeling was.
            </p>
          </div>
          <StevinNetwerk
            fase="brein"
            actieveBronnen={['doelen', 'campagnes', 'website', 'verkoop', 'markt']}
            label="Een bedrijfsdoel verbonden aan campagnes, website, verkoop en de markt"
          />
        </div>
      </section>



      {/* ── 5. SIGNALEN ── */}
      <section className="relative overflow-hidden bg-white" style={{ padding: '112px 24px' }} aria-labelledby="signalen">
        <NodeWatermerk seed={37} thema="licht" />
        <div className="relative mx-auto max-w-[1200px]">
          <p className={eyebrow}>Signalen</p>
          <h2 id="signalen" className={h2} style={{ ...h2Stijl, maxWidth: '18ch' }}>
            Niet alleen terugkijken.
          </h2>
          <p className={`${tekst} mt-5 max-w-[660px]`}>
            We letten met je op wat verandert. Welke signalen voor jou tellen, bepalen we samen.
          </p>
          <div className="mt-10">
            {/* Het uitgewerkte signaalvoorbeeld (gezien, waarom, nog uitzoeken)
                hoort op Zo werkt Stevin, niet op de homepage (Koen, 11 okt
                01:17). Tekst staat in docs/research/W535_REDESIGN_STEVIN_AI.md. */}
            <div>
              <p className="m-0 mb-4 font-display text-[16px] font-bold text-primary">Waar we samen op kunnen letten</p>
              <ul className="veeg veeg-licht m-0 list-none space-y-3 p-0">
                {SIGNAALSOORTEN.map((s) => (
                  <li key={s} className="flex gap-3 text-[16px] leading-snug text-[#2A3A54]">
                    <span aria-hidden="true" className="mt-[7px] inline-block h-2 w-2 shrink-0 rounded-full bg-accent" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. DE ADVISOR ── */}
      <section className="relative overflow-hidden bg-primary text-white" style={{ padding: '112px 24px' }} aria-labelledby="advisor">
        <NodeWatermerk seed={53} thema="donker" />
        <div className="relative mx-auto grid grid-cols-1 max-w-[1200px] gap-14 lg:grid-cols-[1fr_1fr]">
          <div>
            <p className="mb-4 font-display text-[12px] font-bold uppercase tracking-[0.12em] text-accent-light">De Advisor</p>
            <h2 id="advisor" className="m-0 font-display font-extrabold text-white" style={{ ...h2Stijl, maxWidth: '16ch' }}>
              Soms luidt het advies: nog niet.
            </h2>
            <p className="mt-5 text-[18px] leading-[1.6] text-white/75">
              Meer budget is lang niet altijd het antwoord. Zijn de cijfers niet betrouwbaar, dan zegt de Advisor dat eerst.
            </p>
            <p className="mt-5 text-[18px] leading-[1.6] text-white/75">
              <strong className="font-semibold text-white">De Advisor verandert niets in je advertentieaccounts.</strong> Jij of je
              bureau beslist. Wij leggen uit waarom.
            </p>
          </div>
          <div>
            <p className="m-0 mb-4 font-display text-[16px] font-bold text-white">Een advies kan ook zijn</p>
            <ul className="veeg m-0 list-none space-y-3 p-0">
              {ADVIEZEN.map((a, i) => (
                <li
                  key={a}
                  className={`rounded-xl border px-4 py-3 text-[16px] leading-snug ${i === ADVIEZEN.length - 1 ? 'border-accent-light/50 bg-accent/10 text-white' : 'border-white/12 text-white/85'}`}
                >
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

        </>
      )}

      {/* ── 7. VAN ADVIES NAAR UITVOERING ── */}
      {/* Scrollverhaal: bij elk stuk scrollen komt er een stap bij (Koen, 11 okt). */}
      {/* Wie het werk doet staat in het vastgezette deel van de stappen, niet
          in een eigen band en niet erna: allebei oogden als een zesde blok
          (11 okt). In C volgt Kennismaken, ook donker; een haarlijn houdt de
          twee blokken uit elkaar. */}
      <section className="bg-primary px-6 text-white" aria-label="Uitvoering">
        <div className={`mx-auto max-w-[1200px] pb-20 lg:pb-24 ${richting === 'c' ? 'border-b border-white/10' : ''}`}>
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

      {/* Richting C: kort ("less is more", "we zijn alles aan het vertellen",
          Koen 11 okt). Deze blokken gaan naar de verdiepingspagina's. */}
      {richting !== 'c' && (
        <>
      {/* ── 8. IN DE PRAKTIJK ── */}
      <section id="in-de-praktijk" className="relative overflow-hidden scroll-mt-24 bg-surface" style={{ padding: '112px 24px' }}>
        <NodeWatermerk seed={67} thema="licht" />
        <div className="relative mx-auto max-w-[1200px]">
          <p className={eyebrow}>In de praktijk</p>
          <h2 className={h2} style={{ ...h2Stijl, maxWidth: '20ch' }}>
            Drie situaties die je misschien herkent.
          </h2>
          <div className="veeg veeg-breed mt-12 grid gap-5 lg:grid-cols-3">
            {PRAKTIJK.map((p) => (
              <article key={p.kop} className="flex flex-col rounded-[20px] border border-border bg-white p-6 sm:p-7">
                <span className="mb-4 self-start rounded-full bg-[#FFF4DB] px-2.5 py-1 text-[11.5px] font-semibold text-[#8A5A00]">
                  Voorbeeldsituatie
                </span>
                <h3 className="m-0 font-display text-[21px] font-bold leading-tight text-primary">{p.kop}</h3>
                <p className="m-0 mt-3 text-[15.5px] leading-relaxed text-muted">{p.kort}</p>
              </article>
            ))}
          </div>
          <p className="mt-6 text-[14px] text-muted">
            Dit zijn voorbeelden, geen klantcases. Echte cases zetten we hier zodra de resultaten vaststaan.
          </p>
        </div>
      </section>

      {/* ── 9. SAMENWERKEN ── */}
      <section id="samenwerken" className="relative overflow-hidden scroll-mt-24 bg-white" style={{ padding: '112px 24px' }}>
        <NodeWatermerk seed={79} thema="licht" />
        <div className="relative mx-auto grid max-w-[1200px] gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className={eyebrow}>Samenwerken</p>
            <h2 className={h2} style={{ ...h2Stijl, maxWidth: '14ch' }}>
              Zo begint het.
            </h2>
            <p className={`${tekst} mt-5`}>
              <strong className="font-semibold text-primary">Je advertentieaccounts en je meting staan op jouw naam, niet op de onze.</strong>{' '}
              Je kunt elke maand opzeggen.
            </p>
          </div>
          <ol className="m-0 list-none p-0">
            {STAPPEN.map((s, i) => (
              <li key={s} className="flex items-baseline gap-5 border-t border-border py-4 last:border-b">
                <span className="w-7 shrink-0 font-mono text-[13px] font-semibold text-accent">{String(i + 1).padStart(2, '0')}</span>
                <span className="text-[17.5px] leading-snug text-primary">{s}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

        </>
      )}

      {/* ── 10. KENNISMAKEN ── */}
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
          <p className="m-0 mt-4 sm:text-right">
            <Link
              href="/tarieven"
              data-cta="prijs_tarieven"
              className="text-[14px] text-white/60 underline underline-offset-4 transition-colors hover:text-white"
            >
              Alle tarieven
            </Link>
          </p>

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
                className="inline-flex items-center rounded-lg bg-accent-light px-7 py-3.5 font-display text-[15px] font-bold text-primary transition-colors hover:bg-[#7BB8FF]"
              >
                Plan een kennismaking
              </Link>
            </div>
          </div>
        </div>
      </section>
      <KennismakingVenster />
    </>
  )
}

// deel: 'alles' voor richting A en B; richting C zet kop en knoppen los in de
// hero, zodat op mobiel het brein ertussen kan. mobielKort: op mobiel een zin in
// plaats van de alinea (Koen, 10 okt 23:08: "niet gelijk die hele tekst").
function HeroTekst({
  donker = false,
  deel = 'alles',
  mobielKort = false,
}: {
  donker?: boolean
  deel?: 'alles' | 'kop' | 'knoppen'
  mobielKort?: boolean
}) {
  const kop = (
    <>
      {/* De kop is Engels op een Nederlandse pagina: lang="en" zodat een
          schermlezer hem goed uitspreekt (WCAG 3.1.2). */}
      <h1
        lang="en"
        className={`m-0 font-display font-extrabold ${donker ? 'text-white' : 'text-primary'}`}
        style={{ fontSize: 'clamp(44px, 6.2vw, 84px)', letterSpacing: '-0.045em', lineHeight: '0.98' }}
      >
        Rethink your marketing.
      </h1>
      {/* Richting C: op elke schermmaat alleen de korte zin; de blokken
          eronder vertellen de rest (W-535, less is more). */}
      {mobielKort ? (
        <p className={`mt-5 text-balance text-[19px] leading-[1.45] ${donker ? 'text-white/75' : 'text-[#2A3A54]'}`}>
          Wij doen je marketing. Jij ziet eindelijk welke aanvraag een opdracht werd.
        </p>
      ) : (
        <p className={`mt-7 max-w-[560px] text-[19px] leading-[1.55] ${donker ? 'text-white/70' : 'text-[#2A3A54]'}`}>
          Elke maand gaat er geld naar je marketing, en wat het oplevert weet je niet precies. Wij leggen je campagnes, je website,
          je telefoon en je verkoop naast elkaar, kijken mee en zeggen wat er beter kan.{' '}
          <strong className={`font-semibold ${donker ? 'text-white' : 'text-primary'}`}>En we helpen je het te doen.</strong>
        </p>
      )}
    </>
  )
  const knoppen = (
    <>
      {/* Richting C: naast elkaar onder de kop, op een staande tablet in het
          midden onder het brein (variant zij en tablet, app/globals.css). */}
      <div className={`${deel === 'knoppen' ? 'zij:mt-9' : 'mt-9'} flex flex-wrap gap-3 ${mobielKort ? 'tablet:justify-center' : ''}`}>
        {/* Opent het kennismakingsvenster (zelfde route als header en slot),
            met /kennismaking als terugval zonder JS. */}
        <Link
          href="/kennismaking"
          data-cta="hero_kennismaking"
          data-open-kennismaking=""
          className={`inline-flex items-center justify-center rounded-lg px-6 py-3.5 font-display text-[15px] font-bold transition-colors ${mobielKort ? 'w-full sm:w-auto' : ''} ${donker ? 'bg-accent-light text-primary hover:bg-[#7BB8FF]' : 'bg-accent text-white hover:bg-accent-dark'}`}
        >
          Plan een kennismaking
        </Link>
        <a
          href="#hoe-het-werkt"
          data-cta="hero_hoe"
          className={`items-center rounded-lg border px-6 py-3.5 font-display text-[15px] font-bold transition-colors ${mobielKort ? 'hidden zij:inline-flex' : 'inline-flex'} ${donker ? 'border-white/25 bg-primary/80 text-white hover:border-white/60' : 'border-border text-primary hover:border-primary'}`}
        >
          {/* Donker: een eigen vlak, anders schemerde in richting C een node
              van het brein door de knop heen (980 en 1024 breed). */}
          Bekijk hoe het werkt
        </a>
      </div>
      {/* Alleen A en B (ter vergelijking ongewijzigd). Richting C niet: de
          naschrift van Uitvoering zegt het budgetdeel, en "op jouw naam"
          belooft te veel (verkoopsynthese 11 okt). */}
      {!mobielKort && (
        <p className={`mt-5 text-[13.5px] ${donker ? 'text-white/60' : 'text-muted'}`}>
          Wat we opzetten, staat op jouw naam. We verdienen niets aan je advertentiebudget.
        </p>
      )}
    </>
  )
  if (deel === 'kop') return kop
  if (deel === 'knoppen') return knoppen
  return (
    <>
      {kop}
      {knoppen}
    </>
  )
}
