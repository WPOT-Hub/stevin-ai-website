import StevinBrainVisual from '@/components/StevinBrainVisual'
/**
 * DeskProof, de tweede hero: een echte opname uit de Stevin Desk met een
 * melding eroverheen.
 *
 * Aanleiding 28 juli 2026. De site had nul productafbeeldingen: 33 plaatjes,
 * allemaal stockfoto's en logo's. Wat we toonden waren nagebouwde React-demo's.
 * Ondertussen doet de Desk iets dat de concurrentie structureel niet kan tonen.
 *
 * Vergelijk met Aizy (tryaizy.com), die dit goed doet maar leeg: hun feed geeft
 * per regel een handeling en een tijdstip, allemaal in de verleden tijd. Het is
 * al gebeurd, niemand heeft het gevraagd. Hier staat WAAROM en ADVIES, met de
 * keuze eronder. Dat verschil is het hele verhaal, en het is alleen zichtbaar
 * als je het laat zien.
 *
 * Bewust een object en niet drie: een dashboard met drie zwevende kaarten zijn
 * vier dingen die om aandacht vechten. Aizy komt met een druk beeld weg omdat
 * het EEN object is met twee chips ernaast.
 *
 * Staat in de gedeelde SeoLandingPage, dus alle SEO-landingspagina's krijgen
 * hem in een keer. Die waren tot nu toe vrij kaal.
 */

type Locale = 'nl' | 'en'

/**
 * Meldingen uit de LUMOS-demo in de Desk. Per pagina kies je er een die bij het
 * onderwerp past: op een pagina over Meta hoort de Meta-storing, op een pagina
 * over meerdere markten hoort een signaal dat maar een van de twee vestigingen
 * raakt. Twaalf pagina's met dezelfde melding wordt eentonig, en erger: dan
 * lijkt het een plaatje in plaats van een systeem dat meekijkt.
 *
 * Allemaal echt weggeschreven in de demo-omgeving, tag demo_only. Geen
 * klantdata.
 */
export type MeldingSleutel = 'meta-storing' | 'hittegolf' | 'consent-be' | 'influencer' | 'fr-creatives'

interface Melding {
  nr: string
  titel: string
  tags: string[]
  waarom: string
  advies: string
}

const MELDINGEN: Record<MeldingSleutel, Record<Locale, Melding>> = {
  'meta-storing': {
    nl: {
      nr: '01',
      titel: '[Beide vestigingen] Grote storing bij Meta raakt advertentielevering',
      tags: ['bug', 'meta', 'outage', 'incident'],
      waarom: 'Advertentielevering hapert en accounts geven onregelmatig uit. Bevestigd door meerdere bronnen.',
      advies: 'Pauzeer de kwetsbare Meta-sets, verschuif budget tijdelijk naar TikTok en Google, herstart zodra Meta groen meldt.',
    },
    en: {
      nr: '01',
      titel: '[Both venues] Major Meta outage is affecting ad delivery',
      tags: ['bug', 'meta', 'outage', 'incident'],
      waarom: 'Ad delivery is stuttering and accounts are spending erratically. Confirmed by several sources.',
      advies: 'Pause the exposed Meta sets, shift budget to TikTok and Google for now, restart once Meta reports green.',
    },
  },
  hittegolf: {
    nl: {
      nr: '02',
      titel: '[Scheveningen] KNMI hittegolf wk28, strand wint, tenzij wij contra-acten',
      tags: ['trend', 'hittegolf', 'campagnes'],
      waarom: 'KNMI hittegolf 32-35°C wk28 voor Midden+Zuid-NL, strand-bezetting Scheveningen verwacht +120%. Brussel raakt dit niet.',
      advies: 'Switch creative naar de indoor-set en stuur budget bij voor een window van vijf dagen, alleen op de vestiging die het raakt.',
    },
    en: {
      nr: '02',
      titel: '[The Hague] Heatwave week 28, the beach wins unless we counter',
      tags: ['trend', 'heatwave', 'campaigns'],
      waarom: 'Heatwave of 32-35°C forecast for week 28, beach occupancy expected up 120%. The Brussels venue is unaffected.',
      advies: 'Switch creative to the indoor set and shift budget for a five-day window, only for the venue it hits.',
    },
  },
  'consent-be': {
    nl: {
      nr: '03',
      titel: '[Brussel] Consent-rate cookies onder 58%, modeled conversions activeren',
      tags: ['trend', 'cookies', 'consent'],
      waarom: 'Consent-rate gedaald naar 58 procent, tegen 71 procent in Nederland. De Belgische toezichthouder beboette afgelopen maand drie ticketing-platforms voor een onvolledige consent-flow.',
      advies: 'Activeer modeled conversions voor Google Ads en Meta, en laat de consent-flow nakijken voor de meting verder wegzakt.',
    },
    en: {
      nr: '03',
      titel: '[Brussels] Cookie consent rate below 58%, switch on modeled conversions',
      tags: ['trend', 'cookies', 'consent'],
      waarom: 'Consent rate has dropped to 58 percent, against 71 percent in the Netherlands. The Belgian regulator fined three ticketing platforms last month over an incomplete consent flow.',
      advies: 'Switch on modeled conversions for Google Ads and Meta, and have the consent flow reviewed before measurement slips further.',
    },
  },
  influencer: {
    nl: {
      nr: '04',
      titel: '[Beide vestigingen] Reel haalt 480k views in 36 uur, boost-window sluit over 12 uur',
      tags: ['trend', 'influencer', 'timing'],
      waarom: '480k views in 36 uur met 4,2 procent engagement, tegen een baseline van 2,1 procent. Het boost-window sluit op T+12u.',
      advies: 'Zet nu budget op deze creative en target NL 25-45 plus de Duitse grensstreek. Niets doen betekent dat het bereik verdampt.',
    },
    en: {
      nr: '04',
      titel: '[Both venues] Reel hits 480k views in 36 hours, boost window closes in 12',
      tags: ['trend', 'influencer', 'timing'],
      waarom: '480k views in 36 hours at 4.2 percent engagement, against a 2.1 percent baseline. The boost window closes at T+12h.',
      advies: 'Put budget behind this creative now and target NL 25-45 plus the German border region. Doing nothing means the reach evaporates.',
    },
  },
  'fr-creatives': {
    nl: {
      nr: '05',
      titel: '[Brussel] Franse creatives halen 1,5 procent CTR, Nederlandse 2,4 procent',
      tags: ['creatives', 'meta', 'vertaling'],
      waarom: 'De Franstalige set draait op 1,5 procent CTR terwijl dezelfde campagne in het Nederlands 2,4 procent haalt. Dat patroon wijst op letterlijk vertaalde teksten in plaats van herschreven teksten.',
      advies: 'Laat de Franse set herschrijven in plaats van vertalen, en zet het budget zolang op de best presterende Nederlandse variant.',
    },
    en: {
      nr: '05',
      titel: '[Brussels] French creatives hit 1.5% CTR, Dutch ones 2.4%',
      tags: ['creatives', 'meta', 'translation'],
      waarom: 'The French-language set runs at 1.5 percent CTR while the same campaign in Dutch reaches 2.4 percent. That pattern points to literally translated copy rather than rewritten copy.',
      advies: 'Have the French set rewritten rather than translated, and put the budget on the best performing Dutch variant meanwhile.',
    },
  },
}

const COPY: Record<Locale, {
  eyebrow: string
  h2: string
  sub: string
  knoppen: string[]
  bijschrift: string
  breinKop: string
  breinBody: string
  breinBijschrift: string
  breinHint: string
}> = {
  nl: {
    eyebrow: 'Zo ziet dat eruit',
    h2: 'Wat er misgaat, wat er wel werkt, en waarom. Op een scherm.',
    sub: 'Geen rapport achteraf. Stevin kijkt mee op wat vandaag binnenkomt en op wat je merk over een jaar waard is. Dat zijn twee verschillende dingen, en ze staan zelden in hetzelfde overzicht.',
    knoppen: ['Oppakken', 'Meer info', 'Niet relevant'],
    bijschrift: 'Uit de Stevin Desk. LUMIOS is onze demo-omgeving, geen klantdata.',
    breinKop: 'En alles wat geprobeerd is, staat er nog.',
    breinBody:
      'Elke campagne, elk besluit, elk resultaat en wat de concurrent ondertussen deed. Ook het werk dat pas over maanden betaalt, want dat is het eerste dat uit beeld verdwijnt. Wie hier morgen begint leest zich in, in plaats van dat jij het opnieuw gaat vertellen.',
    breinBijschrift: 'Het geheugen van een klant, zoals het in de Desk staat.',
    breinHint: 'Sleep gerust aan de knopen.',
  },
  en: {
    eyebrow: 'What that looks like',
    h2: 'What is going wrong, what is working, and why. On one screen.',
    sub: 'Not a report after the fact. Stevin watches what comes in today and what your brand is worth a year from now. Those are two different things, and they rarely sit in the same overview.',
    knoppen: ['Pick up', 'More info', 'Not relevant'],
    bijschrift: 'From the Stevin Desk. LUMIOS is our demo environment, not client data.',
    breinKop: 'And everything that was tried is still there.',
    breinBody:
      'Every campaign, every decision, every result, and what the competition was doing at the time. Including the work that only pays off months later, which is the first thing to drop out of sight. Whoever starts here tomorrow reads up, instead of you explaining it all over again.',
    breinBijschrift: 'One client memory, the way it sits in the Desk.',
    breinHint: 'Drag the nodes around.',
  },
}

export default function DeskProof({
  locale,
  toonBrein = true,
  melding = 'meta-storing',
}: {
  locale: string
  /** Welke melding je toont. Kies er een die bij het onderwerp van de pagina past. */
  melding?: MeldingSleutel
  /**
   * Het brein-blok aan of uit. Op de homepage uit: daar staat het brein al in
   * de hero, en de sectie eronder ("Typ zomer") doet het geheugen beter, want
   * daar zoek je zelf. Drie keer hetzelfde onderwerp op een pagina is precies
   * de drukte die we bij Aizy nog net vermijden. Op de landingspagina's aan,
   * want daar is geen hero-brein en geen geheugen-demo.
   */
  toonBrein?: boolean
}) {
  const taal = (locale === 'en' ? 'en' : 'nl') as Locale
  const c = COPY[taal]
  const m = MELDINGEN[melding][taal]

  return (
    <section className="bg-white" style={{ padding: 'clamp(64px, 8vw, 104px) 24px' }}>
      {/* Geen scroll-animatie hier. Een view()-timeline blijft halverwege
          hangen zodra de hele sectie in een keer in beeld staat, bijvoorbeeld op
          een hoog scherm of in een schermafdruk, en dan ziet de bezoeker een
          halfdoorzichtige kaart. Beweging hoort in de hero; dit is bewijs en
          dat mag stilstaan. */}
      <div className="mx-auto max-w-[1140px]">
        <div className="max-w-[640px]">
          <p className="text-accent text-[12px] font-display font-bold tracking-[0.12em] uppercase mb-5 flex items-center gap-[14px]">
            <span className="inline-block w-6 h-px bg-accent opacity-60 flex-shrink-0" aria-hidden="true" />
            {c.eyebrow}
          </p>
          <h2
            className="font-display font-extrabold text-primary m-0"
            style={{ fontWeight: 800, fontSize: 'clamp(30px, 3.4vw, 48px)', letterSpacing: '-0.03em', lineHeight: '1.08', textWrap: 'balance' }}
          >
            {c.h2}
          </h2>
          <p className="text-muted leading-[1.65]" style={{ fontSize: '17px', maxWidth: '52ch', marginTop: '20px' }}>
            {c.sub}
          </p>
        </div>

        {/* Een object: de opname, met de melding over de ONDERrand heen. Ruimte
            eronder gereserveerd, zodat de kaart in die marge hangt en niet over
            de grafiek in de opname valt. */}
        <div className="relative md:pb-[120px]" style={{ marginTop: '40px' }}>
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              border: '1px solid rgba(10,22,40,0.10)',
              boxShadow: '0 32px 70px -28px rgba(10,22,40,0.42)',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/product/desk-dashboard.png"
              alt="De Stevin Desk: meldingen met reden en advies, cijfers per kanaal en de markt-radar"
              style={{ display: 'block', width: '100%' }}
            />
          </div>

          {/* De melding steekt uit het kader, net als bij de hero. Op mobiel
              staat hij eronder in plaats van eroverheen, anders bedekt hij de
              hele opname. */}
          <article
            className="rounded-xl md:absolute md:left-[-1.5%] md:bottom-0 md:w-[430px] lg:w-[470px] md:mt-0"
            style={{
              background: '#fff',
              border: '1px solid rgba(10,22,40,0.08)',
              boxShadow: '0 24px 50px -18px rgba(10,22,40,0.42)',
              padding: '16px 18px',
              marginTop: '14px',
            }}
          >
            <div className="flex items-start gap-3.5">
              <span
                className="font-display font-extrabold text-accent flex-shrink-0"
                style={{ fontSize: '12px', letterSpacing: '0.08em', paddingTop: '3px' }}
              >
                {m.nr}
              </span>
              <div style={{ minWidth: 0 }}>
                <p
                  className="font-display font-bold text-primary m-0"
                  style={{ fontSize: '15px', lineHeight: '1.35', letterSpacing: '-0.01em' }}
                >
                  {m.titel}
                </p>
                <p className="flex flex-wrap gap-x-3 gap-y-1 m-0" style={{ marginTop: '7px' }}>
                  {m.tags.map((t) => (
                    <span key={t} className="text-muted" style={{ fontSize: '11px' }}>
                      {t}
                    </span>
                  ))}
                </p>
                <p className="text-muted m-0" style={{ fontSize: '13px', lineHeight: '1.55', marginTop: '11px' }}>
                  <strong className="text-primary font-semibold">Waarom:</strong> {m.waarom}
                </p>
                <p className="text-muted m-0" style={{ fontSize: '13px', lineHeight: '1.55', marginTop: '5px' }}>
                  <strong className="text-primary font-semibold">Advies:</strong> {m.advies}
                </p>
                <div className="flex flex-wrap gap-1.5" style={{ marginTop: '14px' }}>
                  {c.knoppen.map((k, i) => (
                    <span
                      key={k}
                      className="font-display font-bold rounded-md"
                      style={{
                        fontSize: '11.5px',
                        padding: '6px 12px',
                        background: i === 0 ? '#0A1628' : 'transparent',
                        color: i === 0 ? '#fff' : '#4A5568',
                        border: i === 0 ? '1px solid #0A1628' : '1px solid rgba(10,22,40,0.16)',
                      }}
                    >
                      {k}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </article>
        </div>

        <p className="text-muted" style={{ fontSize: '13px', marginTop: '24px' }}>
          {c.bijschrift}
        </p>

        {/* Tweede blok, en bewust apart. De meldingen beantwoorden "wat vraagt
            nu aandacht", de brein-kaart beantwoordt "en hoeveel weet dit ding
            eigenlijk". Twee vragen, dus twee objecten onder elkaar, niet twee
            beelden naast elkaar in een blok. */}
        {toonBrein && (
        <div style={{ marginTop: 'clamp(56px, 7vw, 104px)' }}>
          <div className="max-w-[640px]">
            <h3
              className="font-display font-extrabold text-primary m-0"
              style={{ fontSize: 'clamp(24px, 2.6vw, 34px)', letterSpacing: '-0.03em', lineHeight: '1.15', textWrap: 'balance' }}
            >
              {c.breinKop}
            </h3>
            <p className="text-muted leading-[1.65]" style={{ fontSize: '16px', maxWidth: '54ch', marginTop: '16px' }}>
              {c.breinBody}
            </p>
          </div>

          {/* Geen schermafdruk maar het echte ding. StevinBrainVisual bestond al
              (canvas, physics, bevroren Lumos-snapshot) en kon al gesleept
              worden; alleen stond hij nergens waar een bezoeker hem tegenkomt
              behalve als sfeerbeeld in de hero. Hier mag hij zijn werk doen.
              Lichte variant, zoals de brein-kaart in de Desk zelf: die staat
              ook op licht. Het paneel is een tint donkerder dan wit zodat de
              kaart een vlak is en niet in de pagina wegvalt. */}
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              marginTop: 'clamp(24px, 3vw, 36px)',
              background: '#F7F9FC',
              border: '1px solid rgba(10,22,40,0.10)',
              boxShadow: '0 32px 70px -30px rgba(10,22,40,0.36)',
            }}
          >
            <StevinBrainVisual aspect="21:9" theme="light" brand={false} claim="" ariaLabel="" locale={locale} />
          </div>

          <p className="text-muted flex flex-wrap items-center gap-x-2 gap-y-1" style={{ fontSize: '13px', marginTop: '20px' }}>
            <span>{c.breinBijschrift}</span>
            <span className="text-accent font-semibold">{c.breinHint}</span>
          </p>
        </div>
        )}
      </div>
    </section>
  )
}
