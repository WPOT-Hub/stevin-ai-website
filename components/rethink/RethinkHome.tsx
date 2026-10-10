import { Link } from '@/i18n/navigation'
import { FileText, Phone, UsersRound } from 'lucide-react'
import StevinNetwerk from './StevinNetwerk'
import VraagDemo from './VraagDemo'
import HeroUniversum from './HeroUniversum'
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
const eyebrow = 'text-accent text-[12px] font-display font-bold tracking-[0.12em] uppercase mb-4'
const tekst = 'text-[18px] leading-[1.6] text-[#2A3A54]'

const LOGOS = [
  { src: '/logos/tools/google-ads.svg', naam: 'Google Ads' },
  { src: '/logos/tools/google-analytics.svg', naam: 'Google Analytics 4' },
  { src: '/logos/tools/google-search-console.svg', naam: 'Google Search Console' },
  { src: '/logos/tools/meta.svg', naam: 'Meta' },
  { src: '/logos/tools/instagram.svg', naam: 'Instagram' },
  { src: '/logos/tools/youtube.svg', naam: 'YouTube' },
  { src: '/logos/tools/tiktok.svg', naam: 'TikTok' },
  { src: '/logos/tools/linkedin.svg', naam: 'LinkedIn' },
  { src: '/logos/tools/shopify.svg', naam: 'Shopify' },
]

// Systemen zonder vast merk: een Lucide-icoon in dezelfde tegel (CLAUDE.md:
// iconen uit Lucide in gestylede containers).
const ZONDER_LOGO = [
  { Icoon: Phone, naam: 'Telefonie' },
  { Icoon: UsersRound, naam: 'Je CRM' },
  { Icoon: FileText, naam: 'Offertes' },
]

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
  'Werk aan je naam, niet alleen aan klikken.',
  'Verbeter de pagina waar je advertentie naartoe leidt.',
  'Laat marketing en verkoop dezelfde cijfers gebruiken.',
  'Verander nog niets. De cijfers zijn niet betrouwbaar genoeg.',
]

const UITVOERING = [
  'We zoeken uit waar het blijft hangen.',
  'We richten de opvolging in.',
  'We koppelen de systemen die nodig zijn.',
  'We helpen je team met de nieuwe werkwijze.',
  'We kijken na of het beter gaat, en blijft gaan.',
]

const WIE = [
  { kop: 'Wij', tekst: 'We doen het werk zelf, met jou als opdrachtgever.' },
  { kop: 'Je eigen team', tekst: 'Wij zeggen wat er moet gebeuren, jouw mensen doen het.' },
  { kop: 'Je bureau', tekst: 'Je bureau blijft. Wij kijken mee en zeggen het als iets niet klopt.' },
]

const PRAKTIJK = [
  {
    kop: 'Je wilt bekender worden',
    situatie: 'Je adverteert op zichtbaarheid. Het advertentieplatform meldt bereik en klikken.',
    aanpak:
      'Wij spreken vooraf af waar je naar kijkt: hoe vaak mensen op je naam zoeken, hoeveel mensen direct naar je site komen en wat er met de aanvragen gebeurt. Over maanden, niet over dagen. Geen van die cijfers bewijst los iets, en we zeggen eerlijk wanneer het beeld nog te dun is.',
  },
  {
    kop: 'Veel aanvragen, weinig goede',
    situatie: 'Een campagne levert veel aanvragen op. Een groot deel past niet bij je bedrijf.',
    aanpak:
      'Wij leggen de cijfers van je campagnes naast wat verkoop met de aanvragen deed. Dan stuur je op klanten in plaats van op aantallen.',
  },
  {
    kop: 'Aanvragen blijven liggen',
    situatie: 'Aanvragen komen binnen via de website, de telefoon en de mail. Niet alles wordt vastgelegd of opgepakt.',
    aanpak:
      'Wij richten in hoe een aanvraag wordt vastgelegd, beoordeeld en opgevolgd. Daarna kijken we mee of het zo blijft.',
  },
]

const STAPPEN = [
  'We leren je bedrijf en je doelen kennen.',
  'We brengen de belangrijkste cijfers en werkwijzen bij elkaar.',
  'We bepalen samen waar het beter kan.',
  'We richten in wat daarvoor nodig is.',
  'We adviseren, helpen en voeren uit.',
  'Je organisatie gaat steeds meer zelf doen.',
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

      {/* ── 2. WAT WE VERBINDEN ── */}
      <section className="border-y border-border bg-surface" style={{ padding: '64px 24px' }} aria-labelledby="koppelingen">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <h2 id="koppelingen" className={h2} style={{ ...h2Stijl, fontSize: 'clamp(26px, 2.6vw, 36px)' }}>
              We verbinden wat je al gebruikt.
            </h2>
            <p className={`${tekst} m-0`}>
              Je hoeft niets te vervangen. Sommige koppelingen staan klaar, andere richten we voor je in, en wat er nog niet is
              bouwen we. In de kennismaking hoor je precies welke van de drie het bij jou is.
            </p>
          </div>
          <ul className="m-0 mt-12 grid list-none grid-cols-3 gap-3 p-0 sm:grid-cols-4 lg:grid-cols-6">
            {LOGOS.map((l) => (
              <li
                key={l.naam}
                className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-border bg-white px-2 py-5 text-center shadow-[0_1px_2px_rgba(10,22,40,0.04)] transition-shadow hover:shadow-[0_8px_24px_rgba(10,22,40,0.08)]"
              >
                <img src={l.src} alt="" width={30} height={30} className="h-[30px] w-[30px] object-contain" loading="lazy" />
                <span className="text-[12.5px] font-medium leading-tight text-[#2A3A54]">{l.naam}</span>
              </li>
            ))}
            {ZONDER_LOGO.map(({ Icoon, naam }) => (
              <li
                key={naam}
                className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-[#C8D2E0] bg-surface px-2 py-5 text-center"
              >
                <span className="flex h-[30px] w-[30px] items-center justify-center rounded-lg bg-white text-accent">
                  <Icoon size={18} strokeWidth={2} aria-hidden="true" />
                </span>
                <span className="text-[12.5px] font-medium leading-tight text-muted">{naam}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── 3. VRAAG HET STEVIN ── */}
      <section id="hoe-het-werkt" className="scroll-mt-24 bg-white" style={{ padding: '112px 24px 104px' }}>
        <div className="mx-auto max-w-[1200px]">
          <p className={eyebrow}>Stel een vraag</p>
          <h2 className={h2} style={{ ...h2Stijl, maxWidth: '18ch' }}>
            Vraag het Stevin.
          </h2>
          <p className={`${tekst} mb-12 mt-5 max-w-[640px]`}>
            Je wilt weten hoe de week ging. Stevin pakt de cijfers van je website, je telefoon, je CRM en je offertes erbij,
            en zegt wat opvalt. Probeer het hieronder.
          </p>
          <VraagDemo />
          <p className="mt-8 max-w-[720px] text-[14px] leading-relaxed text-muted">
            Dit is een voorbeeld met verzonnen cijfers, van een bedrijf waar website, telefonie, CRM en offertes gekoppeld zijn.
            Bij jou kijken we eerst wat er al is en wat we moeten inrichten.
          </p>
        </div>
      </section>

      {/* ── 4. HET BREIN ── */}
      <section className="bg-surface" style={{ padding: '112px 24px' }} aria-labelledby="brein">
        <div className="mx-auto grid max-w-[1200px] items-center gap-14 lg:grid-cols-[1fr_1fr]">
          <div>
            <p className={eyebrow}>Het brein achter Stevin</p>
            <h2 id="brein" className={h2} style={{ ...h2Stijl, maxWidth: '16ch' }}>
              Niet alleen je cijfers. Ook wat je wilt bereiken.
            </h2>
            <p className={`${tekst} mt-5`}>
              Een cijfer zegt weinig als je niet weet wat de bedoeling was. Daarom legt Stevin je resultaten naast je doelen, je
              bedrijf en de markt. Dat leggen we bij de start samen met je vast, en het blijft van jou.
            </p>
            <dl className="m-0 mt-8 grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {LAGEN.map((l) => (
                <div key={l.kop} className="border-t border-border pt-3">
                  <dt className="font-display text-[15.5px] font-bold text-primary">{l.kop}</dt>
                  <dd className="m-0 mt-1 text-[15px] leading-snug text-muted">{l.tekst}</dd>
                </div>
              ))}
            </dl>
          </div>
          <StevinNetwerk
            fase="brein"
            actieveBronnen={['doelen', 'campagnes', 'website', 'verkoop', 'markt']}
            label="Een bedrijfsdoel verbonden aan campagnes, website, verkoop en de markt"
          />
        </div>
      </section>

      {/* ── 5. SIGNALEN ── */}
      <section className="bg-white" style={{ padding: '112px 24px' }} aria-labelledby="signalen">
        <div className="mx-auto max-w-[1200px]">
          <p className={eyebrow}>Signalen</p>
          <h2 id="signalen" className={h2} style={{ ...h2Stijl, maxWidth: '18ch' }}>
            Niet alleen terugkijken.
          </h2>
          <p className={`${tekst} mt-5 max-w-[660px]`}>
            We letten met je op veranderingen die ertoe doen. Bij elk signaal staat wat er gezien is, waarom het belangrijk kan
            zijn en wat nog uitgezocht moet worden. Welke signalen voor jou tellen, bepalen we samen. Een deel kijken we met de
            hand na, een deel bouwen we voor je in.
          </p>
          <div className="mt-12 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <article className="rounded-[20px] border border-border bg-white p-6 shadow-[0_10px_40px_rgba(10,22,40,0.07)] sm:p-8">
              <div className="mb-5 flex items-center justify-between gap-3">
                <p className="m-0 font-display text-[18px] font-bold text-primary">Bezoek omhoog, aanvragen niet</p>
                <span className="rounded-full bg-[#FFF4DB] px-2.5 py-1 text-[11.5px] font-semibold text-[#8A5A00]">Voorbeeld</span>
              </div>
              <dl className="m-0 space-y-4 text-[15.5px] leading-relaxed">
                <div>
                  <dt className="text-[12px] font-bold uppercase tracking-[0.1em] text-muted">Gezien</dt>
                  <dd className="m-0 mt-1 text-primary">
                    De campagne voor warmtepompen kreeg 40 procent meer bezoek dan vorige maand. Het aantal aanvragen bleef gelijk.
                  </dd>
                </div>
                <div>
                  <dt className="text-[12px] font-bold uppercase tracking-[0.1em] text-muted">Waarom dit belangrijk kan zijn</dt>
                  <dd className="m-0 mt-1 text-primary">
                    Het extra bezoek levert tot nu toe geen extra aanvragen op. Dat kan aan de campagne liggen, aan het formulier of
                    aan de meting.
                  </dd>
                </div>
                <div>
                  <dt className="text-[12px] font-bold uppercase tracking-[0.1em] text-muted">Nog uitzoeken</dt>
                  <dd className="m-0 mt-1 text-primary">
                    Wat moest de campagne doen? Komt het bezoek uit je eigen regio? Werkt het formulier op een telefoon?
                  </dd>
                </div>
              </dl>
            </article>
            <div>
              <p className="m-0 mb-4 font-display text-[16px] font-bold text-primary">Waar we samen op kunnen letten</p>
              <ul className="m-0 list-none space-y-3 p-0">
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
      <section className="bg-primary text-white" style={{ padding: '112px 24px' }} aria-labelledby="advisor">
        <div className="mx-auto grid max-w-[1200px] gap-14 lg:grid-cols-[1fr_1fr]">
          <div>
            <p className="mb-4 font-display text-[12px] font-bold uppercase tracking-[0.12em] text-accent-light">De Advisor</p>
            <h2 id="advisor" className="m-0 font-display font-extrabold text-white" style={{ ...h2Stijl, maxWidth: '16ch' }}>
              Soms luidt het advies: nog niet.
            </h2>
            <p className="mt-5 text-[18px] leading-[1.6] text-white/75">
              De Advisor zegt op basis van de cijfers die er zijn wat je als volgende stap kunt doen. Hij houdt rekening met je
              doelen en met hoe betrouwbaar die cijfers zijn. Zijn ze oud of onvolledig, dan zegt hij dat eerst. Meer budget is
              lang niet altijd het antwoord.
            </p>
            <p className="mt-5 text-[18px] leading-[1.6] text-white/75">
              <strong className="font-semibold text-white">De Advisor verandert niets in je advertentieaccounts.</strong> Jij of je
              bureau beslist. Wij leggen uit waarom.
            </p>
          </div>
          <div>
            <p className="m-0 mb-4 font-display text-[16px] font-bold text-white">Een advies kan ook zijn</p>
            <ul className="m-0 list-none space-y-3 p-0">
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

      {/* ── 7. VAN ADVIES NAAR UITVOERING ── */}
      <section className="bg-white" style={{ padding: '112px 24px' }} aria-labelledby="uitvoering">
        <div className="mx-auto max-w-[1200px]">
          <p className={eyebrow}>Uitvoering</p>
          <h2 id="uitvoering" className={h2} style={{ ...h2Stijl, maxWidth: '18ch' }}>
            We stoppen niet bij een advies.
          </h2>
          <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_1fr]">
            <div>
              <p className="m-0 rounded-xl border-l-4 border-accent bg-surface px-5 py-4 text-[17px] font-medium text-primary">
                We zien dat aanvragen te laat worden opgevolgd.
              </p>
              <ol className="m-0 mt-6 list-none space-y-4 p-0">
                {UITVOERING.map((u, i) => (
                  <li key={u} className="flex gap-4 text-[16.5px] leading-snug text-[#2A3A54]">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary font-display text-[13px] font-bold text-white">
                      {i + 1}
                    </span>
                    <span className="pt-0.5">{u}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div>
              <p className={`${tekst} m-0`}>
                Wij werken vanuit jouw belang. Je kiest wie het werk doet: wij, je eigen team of je bureau. Of we pakken het samen
                op.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {WIE.map((w) => (
                  <div key={w.kop} className="rounded-2xl border border-border p-5">
                    <p className="m-0 font-display text-[17px] font-bold text-primary">{w.kop}</p>
                    <p className="m-0 mt-2 text-[14.5px] leading-snug text-muted">{w.tekst}</p>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-[15px] leading-relaxed text-muted">
                Omdat we niets aan je advertentiebudget verdienen, kunnen we zeggen wat we ervan vinden.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. IN DE PRAKTIJK ── */}
      <section id="in-de-praktijk" className="scroll-mt-24 bg-surface" style={{ padding: '112px 24px' }}>
        <div className="mx-auto max-w-[1200px]">
          <p className={eyebrow}>In de praktijk</p>
          <h2 className={h2} style={{ ...h2Stijl, maxWidth: '20ch' }}>
            Drie situaties die je misschien herkent.
          </h2>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {PRAKTIJK.map((p) => (
              <article key={p.kop} className="flex flex-col rounded-[20px] border border-border bg-white p-6 sm:p-7">
                <span className="mb-4 self-start rounded-full bg-[#FFF4DB] px-2.5 py-1 text-[11.5px] font-semibold text-[#8A5A00]">
                  Voorbeeldsituatie
                </span>
                <h3 className="m-0 font-display text-[21px] font-bold leading-tight text-primary">{p.kop}</h3>
                <p className="m-0 mt-3 text-[15.5px] leading-relaxed text-muted">{p.situatie}</p>
                <p className="m-0 mt-3 text-[15.5px] leading-relaxed text-primary">{p.aanpak}</p>
              </article>
            ))}
          </div>
          <p className="mt-6 text-[14px] text-muted">
            Dit zijn voorbeelden, geen klantcases. Echte cases zetten we hier zodra de resultaten vaststaan.
          </p>
        </div>
      </section>

      {/* ── 9. SAMENWERKEN ── */}
      <section id="samenwerken" className="scroll-mt-24 bg-white" style={{ padding: '112px 24px' }}>
        <div className="mx-auto grid max-w-[1200px] gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className={eyebrow}>Samenwerken</p>
            <h2 className={h2} style={{ ...h2Stijl, maxWidth: '14ch' }}>
              Zo begint het.
            </h2>
            <p className={`${tekst} mt-5`}>
              <strong className="font-semibold text-primary">Je advertentieaccounts en je meting staan op jouw naam, niet op de onze.</strong>{' '}
              Je kunt elke maand opzeggen. Het doel is dat je ons steeds minder nodig hebt: kunnen je eigen mensen het, dan
              gaat het bedrag omlaag.
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

      {/* ── 10. KENNISMAKEN ── */}
      <section id="kennismaken" className="scroll-mt-24 bg-primary text-white" style={{ padding: '112px 24px' }}>
        <div className="mx-auto max-w-[880px] text-center">
          <h2 className="m-0 font-display font-extrabold text-white" style={h2Stijl}>
            Benieuwd wat er in jouw marketing beter kan?
          </h2>
          <p className="mx-auto mt-5 max-w-[620px] text-[18px] leading-[1.6] text-white/75">
            Laat ons meekijken naar je marketing, je verkoop en je opvolging. In de kennismaking vragen we wat je wilt bereiken en
            wat je nu gebruikt, kijken we samen naar je cijfers, en hoor je eerlijk of we iets voor je kunnen doen.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <Link
              href="/kennismaking"
              data-cta="kennismaking"
              className="inline-flex items-center rounded-lg bg-accent-light px-7 py-3.5 font-display text-[15px] font-bold text-primary transition-colors hover:bg-[#7BB8FF]"
            >
              Plan een kennismaking
            </Link>
            <Link
              href="/contact"
              data-cta="diagnose"
              className="inline-flex items-center rounded-lg border border-white/25 px-7 py-3.5 font-display text-[15px] font-bold text-white transition-colors hover:border-white/60"
            >
              Liever eerst de diagnose
            </Link>
          </div>
          <p className="mt-5 text-[13.5px] text-white/50">
            De diagnose: binnen twee weken weet je wat klopt en wat niet. Het rapport mag je houden.
          </p>
        </div>
      </section>
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
      <h1
        className={`m-0 font-display font-extrabold ${donker ? 'text-white' : 'text-primary'}`}
        style={{ fontSize: 'clamp(44px, 6.2vw, 84px)', letterSpacing: '-0.045em', lineHeight: '0.98' }}
      >
        Rethink your marketing.
      </h1>
      {mobielKort && (
        <p className={`mt-5 text-[19px] leading-[1.45] lg:hidden ${donker ? 'text-white/75' : 'text-[#2A3A54]'}`}>
          Zie wat je marketing oplevert, en wat er beter kan.
        </p>
      )}
      <p
        className={`mt-7 max-w-[560px] text-[19px] leading-[1.55] ${mobielKort ? 'hidden lg:block' : ''} ${donker ? 'text-white/70' : 'text-[#2A3A54]'}`}
      >
        Elke maand gaat er geld naar je marketing, en wat het oplevert weet je niet precies. Wij leggen je campagnes, je website,
        je telefoon en je verkoop naast elkaar, kijken mee en zeggen wat er beter kan.{' '}
        <strong className={`font-semibold ${donker ? 'text-white' : 'text-primary'}`}>En we helpen je het te doen.</strong>
      </p>
    </>
  )
  const knoppen = (
    <>
      <div className={`${deel === 'knoppen' ? 'lg:mt-9' : 'mt-9'} flex flex-wrap gap-3`}>
        <a
          href="#kennismaken"
          data-cta="hero_ontdek"
          className={`inline-flex items-center justify-center rounded-lg px-6 py-3.5 font-display text-[15px] font-bold transition-colors ${mobielKort ? 'w-full sm:w-auto' : ''} ${donker ? 'bg-accent-light text-primary hover:bg-[#7BB8FF]' : 'bg-accent text-white hover:bg-accent-dark'}`}
        >
          Ontdek wat Stevin voor je kan doen
        </a>
        <a
          href="#hoe-het-werkt"
          data-cta="hero_hoe"
          className={`items-center rounded-lg border px-6 py-3.5 font-display text-[15px] font-bold transition-colors ${mobielKort ? 'hidden lg:inline-flex' : 'inline-flex'} ${donker ? 'border-white/25 text-white hover:border-white/60' : 'border-border text-primary hover:border-primary'}`}
        >
          Bekijk hoe het werkt
        </a>
      </div>
      <p className={`mt-5 text-[13.5px] ${mobielKort ? 'hidden lg:block' : ''} ${donker ? 'text-white/45' : 'text-muted'}`}>
        Je accounts blijven op jouw naam. We verdienen niets aan je advertentiebudget.
      </p>
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
