import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import Section from '@/components/Section'
import SectionHeader from '@/components/SectionHeader'
import { localizedMetadata } from '@/lib/seo'
import DeskProof from '@/components/DeskProof'
import IntelligenceFeed from '@/components/IntelligenceFeed'

type Props = { params: Promise<{ locale: string }> }

// Herbouwd op 4 sep 2026 (W-042), in dezelfde vorm als /fmcg. De oude pagina
// draaide op de retail-namespace in messages/*.json en stond vol met dingen die
// niet kloppen: "250% meer conversies" bij een retailer met 30+ winkels (geen
// enkele klant die dat kan staven, en geen bron), "ad spend-schattingen tot
// promotiekalenders en prijspositionering" als feature, en een kolom FMCG Brands
// die nu een eigen pagina heeft. Zie docs/research/SITE_CLAIMS_AUDIT_2026-09-04.md
// in Stevin-Hub. De messages-keys blijven voorlopig staan, ze worden hier niet
// meer gebruikt.
//
// Wat deze pagina wel draagt:
// 1. De scan in de tweede sectie is op 4 sep 2026 echt gedraaid, met
//    src/scripts/vindbaarheidsscan.ts op een landelijke Nederlandse keten in
//    huishoudelijke artikelen. Ruwe uitkomst:
//    docs/research/vindbaarheidsscans/blokker-nl-2026-09-04.json in Stevin-Hub.
//    13 vragen, alle 13 met web-search actief (dus de nul is echt en geen
//    meetfout), 0 keer de eigen site als bron, 1 merkvermelding over de 12
//    vragen zonder merknaam. De keten wordt hier niet bij naam genoemd: het is
//    geen klant en het patroon is het punt, niet het bedrijf.
// 2. Geen enkele claim over kassadata, winkelbezoek of retailmedia-portalen.
//    Dat staat er expliciet als "wat we niet doen", en de Desk-melding en de
//    feed-scenario's zijn daarop nagelopen zodat ze het niet tegenspreken.
// 3. De drie principes staan woordelijk in de kennislaag, inclusief hun grens:
//    merk-effect-006 (prijskortingen), merk-effect-004 (share of voice) en
//    kern-12 (distinctiveness), uit research/output/consolidated/principles.json.
//    Ankers en "betekent niet" zijn overgenomen, niet zelf bedacht.

const COPY = {
  nl: {
    eyebrow: 'Voor retailketens en winkelformules',
    h1_line: 'Verkocht in de winkel.',
    h1_accent: 'Gemeten op een scherm.',
    sub: 'Daar zit het gat. Je weet tot achter de komma wat een klik kostte, en je weet niet of de campagne iemand de winkel in heeft gekregen. Aan het eind van het jaar onderbouw je een mediabudget met de helft van het verhaal.',
    cta: 'Start de diagnose',
    cta_sec: 'Wat het platform doet',

    scan_eyebrow: 'Een echte meting, 4 september',
    scan_h2: 'Vraag een AI waar je een goede pan koopt. De keten staat er niet bij.',
    scan_p: 'Wij stelden dertien koopvragen over huishoudelijke artikelen aan een AI-antwoordmachine met live zoekresultaten, gericht op een landelijke Nederlandse keten met honderden winkels. Twaalf ervan zonder merknaam erin, zoals een koper ze stelt: waar koop ik goed keukengerei, welke winkels hebben een groot assortiment, waar vind ik duurzame keukenartikelen in Amsterdam.',
    scan_cijfers: [
      { n: '0 van 13', t: 'keer werd de site van de keten als bron gebruikt' },
      { n: '1 van 12', t: 'open vragen noemde de keten uberhaupt' },
      { n: 'kookwinkel.nl', t: 'en andere kleine speciaalzaken leverden de antwoorden' },
    ],
    scan_slot: 'De pijnlijkste vraag was de laatste. Die ging expliciet over de acties van de keten zelf, en zelfs daar kwam het antwoord niet van de eigen site maar van twee foldersites die de folder doorplaatsen. Een keten met honderden winkels en tientallen jaren naamsbekendheid verliest de vraag van een kookwinkel met een goede productpagina. Dat is geen mediabudgetprobleem.',
    scan_cta: 'Deze scan draait in een kwartier op jouw formule, voordat je klant bent.',

    eerlijk_h2: 'Wat wij hier niet doen.',
    eerlijk_sub: 'Twee dingen vooraf, want dit is precies waar in retail standaard overheen wordt beloofd.',
    eerlijk: [
      {
        t: 'Wij trekken de brug naar de kassa niet dicht',
        d: 'Wij hebben geen kassadata, geen winkelbezoekmeting en geen loyaliteitsdata, dus wij gaan je niet vertellen welke advertentie iemand de winkel in heeft gekregen. Wie dat wel belooft zonder je kassasysteem te koppelen, rekent met aannames en noemt het meting.',
      },
      {
        t: 'Wij koppelen geen retailmedia-portalen',
        d: 'Verkoop je ook via andere retailers, dan koppelen wij hun advertentieportalen niet en beheren wij hun feeds niet. Wat wij wel doen is je eigen exports inlezen en ze naast de rest zetten, met een definitie eronder.',
      },
    ],

    wel_h2: 'Wat we wel doen, en waarom dat het verschil maakt.',
    wel: [
      {
        t: 'Een definitie, en die blijft staan',
        d: 'Wij spreken met je af wat een conversie is, wat er in de teller hoort en wat niet, en leggen vast waarom. Die definitie hangt aan je bedrijf, niet aan het bureau dat hem bedacht. Het volgende bureau erft hem in plaats van er een eigen versie van te maken.',
      },
      {
        t: 'Zoekvraag per regio als vroeg signaal',
        d: 'Beweegt de vraag naar jouw categorie, en beweegt die overal even hard. Dat zie je binnen dagen en per regio, dus je ziet ook waar je budget staat terwijl de vraag ergens anders zit. Het is geen winkelbezoek, en we doen ook niet alsof: het is het vroegste signaal dat je zonder kassakoppeling kunt hebben.',
      },
      {
        t: 'Zien wat je concurrent doet',
        d: 'De advertentieregisters van Google en Meta zijn openbaar, dus daar beginnen we: welke formules adverteren in jouw categorie, met welke boodschap en met welke acties. Dat is waar we starten, niet waar het ophoudt. Elk kanaal met een publieke bron komt erbij. En dit werkt al voordat je klant bent.',
      },
      {
        t: 'Je eigen kanalen nagekeken',
        d: 'Google Ads, Meta, GA4, Search Console, Merchant Center en je webshop. Waar je zichtbaar bent, waar je productfeed producten laat vallen, waar de meting stukloopt. Dit is het deel waar je al voor betaalt en waar het vaakst iets kapot is zonder dat iemand het meldt.',
      },
      {
        t: 'De actie nagerekend, met de marge erbij',
        d: 'Een actieweek laat zich makkelijk verkopen op omzet. Wij zetten er de marge naast, en de week erna, en wie er kocht: nieuwe kopers of mensen die toch al kwamen. Dat is een ander gesprek dan de omzetgrafiek van de actieweek alleen.',
      },
      {
        t: 'Vastleggen wat je probeerde',
        d: 'Welke actie, welke belofte, welk resultaat, en wat je ervan leerde. Ook de dingen die niet werkten. Zodat je over twee jaar niet dezelfde test opnieuw betaalt omdat niemand meer weet dat het al een keer geprobeerd is.',
      },
    ],

    canon_eyebrow: 'Waarom ons advies klopt',
    canon_h2: 'De canon van jouw vak zit in het systeem.',
    canon_sub: 'Onder elk advies ligt een kennislaag van 105 principes uit gepubliceerd onderzoek. Voor retail zijn dat vooral de IPA Databank van Binet en Field en het werk van Ehrenberg-Bass. Drie ervan, zoals ze in het systeem staan, met hun grens erbij, want een principe zonder grens is een dogma.',
    principes: [
      {
        p: 'Behandel prijskortingen als een tijdelijke volume-impuls met een verborgen kostenpost.',
        u: 'Ze raken vooral bestaande kopers, leren klanten wachten op korting en verhogen op termijn de prijsgevoeligheid. Niet-prijsgedreven acties, zoals een winactie of een cadeau, verlagen die gevoeligheid juist.',
        bron: 'IPA Databank, Binet en Field',
        grens: 'Betekent niet dat prijspromoties nooit mogen, zeker niet waar retailers ze afdwingen, en niet dat het volume-effect onecht is.',
      },
      {
        p: 'Een aandeel in mediabestedingen boven je marktaandeel is de sterkste bekende voorspeller van groei.',
        u: 'De vraag is dus niet alleen of je eigen rendement klopt, maar of je bestedingen meebewegen met wat concurrenten in de markt doen.',
        bron: 'IPA Databank, Binet en Field',
        grens: 'Betekent niet dat meer uitgeven altijd evenredig meer groei geeft, en het werkt niet in versnipperde categorieen zonder duidelijk marktaandeel.',
      },
      {
        p: 'Bouw herkenbaarheid boven onderscheidendheid.',
        u: 'Gemiddeld ziet maar ongeveer tien procent van je eigen kopers je merk als anders. Wat wel stuurbaar is zijn merkelementen die jarenlang consistent terugkomen: kleur, vorm, stem, opbouw van de folder.',
        bron: 'Ehrenberg-Bass',
        grens: 'Betekent niet dat vernieuwing onmogelijk is. De merkelementen blijven constant, de executies varieren, en zwakke assets hoef je niet te verdedigen.',
      },
    ],

    ervaring_h2: 'Waarom wij dit weten.',
    ervaring_p1: 'Dit systeem is gebouwd door iemand die twintig jaar aan de andere kant van de factuur zat, als oprichter van een bureau. Wat je daar bij elke klant met een winkelvloer ziet: een groot mediabudget en een meetketen die stopt bij de website.',
    ervaring_p2: 'Wat in al die jaren opviel: het plan was meestal in orde. Er lag een jaarkalender, een verdeling over merk en actie, een folderritme. Wat er niet lag, was een meting die de vraag beantwoordde of het gewerkt had, want de verkoop gebeurde in een winkel en de meting stopte bij de website. Iedereen wist dat, en iedereen rapporteerde toch op wat wel gemeten kon worden.',
    ervaring_p3: 'Dat is geen verwijt aan de mensen die het deden, want zo werkte de hele markt. Het is wel de reden dat dit systeem bestaat, en waarom het begint bij meten, benoemen wat je niet weet, en vastleggen wat je probeerde.',

    slot_h2: 'Begin bij wat er nu gemeten wordt.',
    slot_sub: 'De diagnose loopt op je eigen cijfers en laat zwart op wit zien wat er klopt en wat niet. Binnen twee weken, en je houdt het rapport.',
  },
  en: {
    eyebrow: 'For retail chains and store formats',
    h1_line: 'Sold in the store.',
    h1_accent: 'Measured on a screen.',
    sub: 'That is the gap. You know to the cent what a click cost, and you do not know whether the campaign got anyone through the door. At the end of the year you defend a media budget with half the story.',
    cta: 'Start the diagnosis',
    cta_sec: 'What the platform does',

    scan_eyebrow: 'A real measurement, 4 September',
    scan_h2: 'Ask an AI where to buy a good pan. The chain is not in the answer.',
    scan_p: 'We put thirteen buying questions about household goods to an AI answer engine with live search, aimed at a national Dutch chain with hundreds of stores. Twelve of them without the brand name in the question, the way a buyer asks: where do I buy good kitchen equipment, which shops have a wide range, where do I find sustainable kitchenware in Amsterdam.',
    scan_cijfers: [
      { n: '0 of 13', t: 'times the site of the chain was used as a source' },
      { n: '1 of 12', t: 'open questions named the chain at all' },
      { n: 'kookwinkel.nl', t: 'and other small specialist shops supplied the answers' },
    ],
    scan_slot: 'The last question was the painful one. It was explicitly about the promotions of the chain itself, and even there the answer came not from its own site but from two leaflet sites that republish the leaflet. A chain with hundreds of stores and decades of name recognition loses the question to a cookware shop with a good product page. That is not a media budget problem.',
    scan_cta: 'We run this scan on your format in fifteen minutes, before you are a client.',

    eerlijk_h2: 'What we do not do here.',
    eerlijk_sub: 'Two things up front, because in retail this is exactly where the overpromising starts.',
    eerlijk: [
      {
        t: 'We do not close the bridge to the till',
        d: 'We have no till data, no footfall measurement and no loyalty data, so we will not tell you which ad got someone into the store. Anyone promising that without connecting your point of sale is working from assumptions and calling it measurement.',
      },
      {
        t: 'We do not connect retail media portals',
        d: 'If you also sell through other retailers, we do not connect their ad portals and we do not manage their feeds. What we do is read your own exports and put them next to the rest, with a definition underneath.',
      },
    ],

    wel_h2: 'What we do, and why it matters.',
    wel: [
      {
        t: 'One definition, and it stays',
        d: 'We agree with you what a conversion is, what belongs in the count and what does not, and record why. That definition belongs to your company, not to the agency that invented it. The next agency inherits it instead of writing its own version.',
      },
      {
        t: 'Search demand by region as an early signal',
        d: 'Whether demand for your category is moving, and whether it moves everywhere at the same rate. You see that within days and per region, so you also see where your budget sits while demand is somewhere else. It is not footfall, and we will not pretend it is: it is the earliest signal you can have without a till connection.',
      },
      {
        t: 'See what your competitor is doing',
        d: 'The ad registers of Google and Meta are public, so that is where we start: which formats advertise in your category, with what message and what promotions. That is the starting point, not the limit. Any channel with a public source can be added. And it works before you are a client.',
      },
      {
        t: 'Your own channels checked',
        d: 'Google Ads, Meta, GA4, Search Console, Merchant Center and your webshop. Where you are visible, where your product feed drops items, where measurement breaks. This is the part you already pay for and the part where something is most often broken without anyone reporting it.',
      },
      {
        t: 'The promotion recalculated, with margin next to it',
        d: 'A promotion week is easy to sell on revenue. We put margin next to it, and the week after, and who bought: new buyers or people who were coming anyway. That is a different conversation from the revenue chart of the promotion week alone.',
      },
      {
        t: 'Record what you tried',
        d: 'Which promotion, which promise, which result, and what you learned. Including the things that did not work. So that in two years you do not pay for the same test again because nobody remembers it was already tried.',
      },
    ],

    canon_eyebrow: 'Why the advice holds',
    canon_h2: 'The canon of your trade sits in the system.',
    canon_sub: 'Under every piece of advice sits a knowledge layer of 105 principles from published research. For retail those come mainly from the IPA Databank of Binet and Field and the work of Ehrenberg-Bass. Three of them, as they sit in the system, with their limits, because a principle without a limit is a dogma.',
    principes: [
      {
        p: 'Treat price discounts as a temporary volume boost with a hidden cost.',
        u: 'They mostly reach existing buyers, teach customers to wait for a discount and raise price sensitivity over time. Non-price promotions, such as a prize draw or a gift, lower that sensitivity instead.',
        bron: 'IPA Databank, Binet and Field',
        grens: 'Does not mean price promotions are never allowed, certainly not where retailers impose them, and not that the volume effect is unreal.',
      },
      {
        p: 'A share of media spend above your market share is the strongest known predictor of growth.',
        u: 'So the question is not only whether your own return holds up, but whether your spending moves with what competitors are doing in the market.',
        bron: 'IPA Databank, Binet and Field',
        grens: 'Does not mean more spend always buys proportional growth, and it does not work in fragmented categories without a clear market share.',
      },
      {
        p: 'Build distinctiveness over differentiation.',
        u: 'On average only about ten percent of your own buyers see your brand as different. What you can steer are brand elements that come back consistently for years: colour, shape, voice, the structure of the leaflet.',
        bron: 'Ehrenberg-Bass',
        grens: 'Does not mean renewal is impossible. The brand elements stay constant, executions vary, and weak assets do not need defending.',
      },
    ],

    ervaring_h2: 'Why we know this.',
    ervaring_p1: 'This system was built by someone who spent twenty years on the other side of the invoice, as the founder of an agency. What you see there with every client that has a shop floor: a large media budget and a measurement chain that stops at the website.',
    ervaring_p2: 'What stood out across those years: the plan was usually fine. There was an annual calendar, a split between brand and promotion, a leaflet rhythm. What was missing was a measurement that answered whether it had worked, because the sale happened in a store and the measurement stopped at the website. Everyone knew that, and everyone still reported on what could be measured.',
    ervaring_p3: 'That is not a reproach to the people who did it, because that was how the whole market worked. It is the reason this system exists, and why it starts with measuring, naming what you do not know, and recording what you tried.',

    slot_h2: 'Start with what is being measured now.',
    slot_sub: 'The diagnosis runs on your own numbers and shows in black and white what holds and what does not. Within two weeks, and you keep the report.',
  },
} as const

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const nl = locale !== 'en'
  return localizedMetadata({
    locale,
    path: '/retail',
    title: nl ? 'Marketing voor retailketens' : 'Marketing for retail chains',
    description: nl
      ? 'De verkoop gebeurt in de winkel, de meting stopt bij het scherm. Wij trekken die brug niet dicht, we maken zichtbaar wat er wel te meten valt en leggen de definitie vast. Onderbouwd met de IPA Databank en Ehrenberg-Bass.'
      : 'The sale happens in the store, the measurement stops at the screen. We do not close that bridge; we show what can be measured and fix the definition. Grounded in the IPA Databank and Ehrenberg-Bass.',
  })
}

export default async function RetailPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = locale === 'en' ? COPY.en : COPY.nl

  return (
    <>
      <section className="bg-primary text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,440px)] gap-12 lg:gap-16 items-center">
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.14em] text-white/50">{t.eyebrow}</p>
              <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
                {t.h1_line} <span className="text-accent">{t.h1_accent}</span>
              </h1>
              <p className="mt-6 text-lg text-white/70 max-w-2xl leading-relaxed">{t.sub}</p>
              <div className="mt-10 flex flex-wrap gap-3">
                <Link href="/contact" className="inline-flex px-8 py-3.5 text-sm font-semibold text-primary bg-white rounded-xl hover:bg-white/90 transition-colors">{t.cta}</Link>
                <Link href="/platform" className="inline-flex px-8 py-3.5 text-sm font-semibold text-white/70 border border-white/20 rounded-xl hover:bg-white/5 transition-colors">{t.cta_sec}</Link>
              </div>
            </div>
            <IntelligenceFeed variant="retail" locale={locale} />
          </div>
        </div>
      </section>

      <Section bg="white">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-mono uppercase tracking-[0.14em] text-muted/70">{t.scan_eyebrow}</p>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight text-balance text-primary">{t.scan_h2}</h2>
          <p className="mt-5 text-muted leading-relaxed">{t.scan_p}</p>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {t.scan_cijfers.map((c) => (
              <div key={c.n} className="border-t border-border pt-4">
                <p className="text-xl font-bold text-accent leading-tight">{c.n}</p>
                <p className="mt-2 text-sm text-muted leading-relaxed">{c.t}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 text-primary leading-relaxed">{t.scan_slot}</p>
          <p className="mt-6 text-sm font-medium text-accent">{t.scan_cta}</p>
        </div>
      </Section>

      <Section bg="surface">
        <SectionHeader title={t.eerlijk_h2} subtitle={t.eerlijk_sub} />
        <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
          {t.eerlijk.map((i) => (
            <div key={i.t} className="rounded-xl border border-border bg-white p-6">
              <h3 className="text-base font-semibold text-primary">{i.t}</h3>
              <p className="mt-3 text-sm text-muted leading-relaxed">{i.d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section bg="white">
        <SectionHeader title={t.wel_h2} />
        <div className="grid gap-6 md:grid-cols-2">
          {t.wel.map((i) => (
            <div key={i.t} className="rounded-xl border border-border bg-white p-6">
              <h3 className="text-base font-semibold text-primary">{i.t}</h3>
              <p className="mt-3 text-sm text-muted leading-relaxed">{i.d}</p>
            </div>
          ))}
        </div>
      </Section>

      <DeskProof locale={locale} melding="retail-regio" />

      <Section bg="surface">
        <SectionHeader title={t.canon_h2} subtitle={t.canon_sub} />
        <div className="mx-auto max-w-3xl flex flex-col gap-5">
          {t.principes.map((p) => (
            <div key={p.p} className="rounded-xl border border-border bg-white p-6 border-l-[3px] border-l-accent">
              <p className="text-base font-semibold text-primary leading-snug">{p.p}</p>
              <p className="mt-2 text-sm text-muted leading-relaxed">{p.u}</p>
              <p className="mt-4 text-xs font-mono uppercase tracking-[0.1em] text-muted/70">{p.bron}</p>
              <p className="mt-3 text-sm text-primary/80 leading-relaxed border-t border-border pt-3">{p.grens}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section bg="white">
        <div className="mx-auto max-w-3xl">
          <SectionHeader title={t.ervaring_h2} centered={false} />
          <div className="flex flex-col gap-4">
            <p className="text-muted leading-relaxed">{t.ervaring_p1}</p>
            <p className="text-primary leading-relaxed font-medium">{t.ervaring_p2}</p>
            <p className="text-muted leading-relaxed">{t.ervaring_p3}</p>
          </div>
        </div>
      </Section>

      <Section bg="primary">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-balance">{t.slot_h2}</h2>
          <p className="mt-4 text-lg text-white/70 leading-relaxed">{t.slot_sub}</p>
          <Link href="/contact" className="mt-8 inline-flex px-8 py-3.5 text-sm font-semibold text-primary bg-white rounded-xl hover:bg-white/90 transition-colors">{t.cta}</Link>
        </div>
      </Section>
    </>
  )
}
