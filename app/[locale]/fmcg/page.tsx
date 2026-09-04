import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import Section from '@/components/Section'
import SectionHeader from '@/components/SectionHeader'
import { localizedMetadata } from '@/lib/seo'

type Props = { params: Promise<{ locale: string }> }

// Nieuw op 4 sep 2026 (W-042). De oude /fmcg is op 21 juli weggesneden in de
// sanering (commit b92033b) en redirectte sindsdien naar /voor-ondernemers. Dat
// was terecht: die pagina beloofde zeven retailmedia-koppelingen die geen van
// alle bestaan, plus "geen los inloggen per retailer". Zie
// docs/research/SITE_CLAIMS_AUDIT_2026-09-04.md in Stevin-Hub.
//
// Deze pagina staat op wat wel klopt, en dat is voor FMCG toevallig sterker dan
// voor welke andere branche ook:
// 1. De kennislaag onder de advisor hangt aan Ehrenberg-Bass en de IPA Databank
//    van Binet en Field. Dat is letterlijk de FMCG-canon. De drie principes
//    hieronder staan woordelijk in docs/knowledge/ADVISOR_KNOWLEDGE.md, inclusief
//    hun grens.
// 2. Geen enkele koppelingsclaim. Retailmedia-portalen koppelen we niet, en dat
//    staat er expliciet bij.
// 3. De meetleemte is de kern, en die mag Koen uit eigen ervaring benoemen.
//
// Databronnen in de kaart "Wat je al betaalt gaat er ook in" zijn nagekeken op
// 4 sep 2026, in de documentatie en licentievoorwaarden van de aanbieders zelf.
// - NielsenIQ en Circana zijn de twee parallelle retailmeetstandaarden in NL.
// - Het FMCG-huishoudpanel in NL en BE is sinds 9 jan 2024 van YouGov, niet
//   meer van GfK: dat panel moest verkocht worden als voorwaarde van de
//   Europese Commissie bij de fusie NIQ-GfK. GfK noemen dateert je meteen.
// - Kantar Worldpanel heet sinds 2025 Worldpanel by Numerator en staat niet
//   met een NL- of BE-markt op de eigen site. Niet als NL/BE-panel noemen.
//   Kantar heeft wel een API, maar die is voor advertentie- en contenttesten.
// - GWI (dus niet IWG) is survey-onderzoek, geen verkoopmeting: 50+ markten,
//   2 mln interviews per jaar. Drie koppelroutes gedocumenteerd op
//   api.globalwebindex.com/docs/platform-api; de MCP-connector zit volgens hun
//   helpcentrum bij elk betaald plan.
// - De regel over een getekende afspraak is geen slag om de arm maar feit.
//   NIQ (online license terms SA&I, v1.0 per 15 jan 2026): openbaarmaking aan
//   derden is beperkt tot consultants met een getekende Third Party Access
//   Agreement, en modellen trainen op NIQ-data is expliciet verboden. Circana
//   (Master T&C Europe, sectie 3): licentie niet overdraagbaar en niet
//   sublicentieerbaar, derden krijgen alleen "limited excerpts". Beloof dus
//   nooit "stuur je export, wij doen de rest".
// - Brandwatch staat het juist wel toe: Service Appendix 7.2 laat de klant de
//   API-sleutel delen met een geautoriseerde derde partij voor intern gebruik.
// GEEN klantnamen, geen cijfers van merken uit eerder bureauwerk. Dat is werk van
// andere partijen voor hun klanten; alleen de methode en het patroon zijn van hem.

const COPY = {
  nl: {
    eyebrow: 'Voor FMCG-merken',
    h1_line: 'Zeven retailerportalen,',
    h1_accent: 'zeven definities van goed.',
    sub: 'Ahold Delhaize, bol, Albert Heijn, Picnic, Amazon, Lidl, Carrefour. Elk met een eigen ROAS-definitie en een eigen attributievenster. Aan het eind van het kwartaal tellen ze niet op, en niemand kan zeggen of de merkcampagne iets aan het schap heeft gedaan.',
    cta: 'Start de diagnose',
    cta_sec: 'Wat het platform doet',

    eerlijk_h2: 'Wat wij hier niet doen.',
    eerlijk_sub: 'Twee dingen vooraf, want in deze categorie wordt daar standaard overheen beloofd.',
    eerlijk: [
      {
        t: 'Wij koppelen die portalen niet',
        d: 'Er is geen koppeling met Ahold Delhaize, bol, Albert Heijn, Picnic, Amazon, Lidl of Carrefour, en wij gaan niet doen alsof. Wie belooft dat hij die zeven achter een inlog samenbrengt, verkoopt je iets wat niemand goed heeft opgelost.',
      },
      {
        t: 'Wij zijn geen databron',
        d: 'Wij hebben geen eigen panel en wij verkopen je geen licentie. Wat wij doen is lezen wat jij al hebt. Je betaalt waarschijnlijk al voor een panel, een merktracker en een listening-tool, en die cijfers staan alleen zelden naast je mediadata.',
      },
    ],

    wel_h2: 'Wat we wel doen, en waarom dat het verschil maakt.',
    wel: [
      {
        t: 'Een definitie, en die blijft staan',
        d: 'Wij spreken met je af wat een conversie is, wat er in de teller hoort en wat niet, en leggen vast waarom. Die definitie hangt aan je bedrijf, niet aan het bureau dat hem bedacht. Het volgende bureau erft hem in plaats van er een eigen versie van te maken.',
      },
      {
        t: 'Zoekvraag als vroeg signaal',
        d: 'Beweegt je merkzoekvolume en dat van je categorie, en hoe verhoudt dat zich tot elkaar. Dat zie je binnen dagen, niet in de volgende kwartaalrapportage, en het loopt vooruit op wat er in het schap gebeurt.',
      },
      {
        t: 'Zien wat je concurrent doet',
        d: 'De advertentieregisters van Google en Meta zijn openbaar, dus daar beginnen we: welke merken adverteren in jouw categorie, en waarmee. Dat is waar we starten, niet waar het ophoudt. Elk kanaal met een publieke bron komt erbij. En dit werkt al voordat je klant bent.',
      },
      {
        t: 'Wat je al betaalt gaat er ook in',
        d: 'NielsenIQ, Circana, YouGov, GWI, je merktracker, je listening-tool, je eigen exports uit de retailerportalen. Is er een API, dan koppelen we die; bij GWI sluit die zelfs rechtstreeks op een AI-systeem aan. Is er alleen een export, dan lezen we het bestand in. En vraagt je leverancier een getekende afspraak voordat een derde partij meekijkt, zoals NielsenIQ en Circana doen, dan hoor je dat van ons voordat je tekent en niet erna. Wat er ook uitkomt, het eindigt naast je mediadata met een definitie eronder.',
      },
      {
        t: 'Vastleggen wat je probeerde',
        d: 'Welke flight, welke belofte, welk resultaat, en wat je ervan leerde. Ook de dingen die niet werkten. Zodat je over twee jaar niet dezelfde test opnieuw betaalt omdat niemand meer weet dat we dat al probeerden.',
      },
    ],

    canon_eyebrow: 'Waarom ons advies klopt',
    canon_h2: 'De canon van jouw vak zit in het systeem.',
    canon_sub: 'Onder elk advies ligt een kennislaag van 105 principes uit gepubliceerd onderzoek. Voor FMCG komen die uit Ehrenberg-Bass en de IPA Databank van Binet en Field, dus uit precies de hoek waar jouw categorie al decennia op stuurt. Drie ervan, zoals ze in het systeem staan, met hun grens erbij.',
    principes: [
      {
        p: 'Bereik de hele categoriekoper.',
        u: 'Zelfs grote merken halen de helft van hun kopers uit mensen die een of twee keer per jaar kopen. Kopersclassificaties op historisch gedrag zijn instabiel.',
        bron: 'Ehrenberg-Bass',
        grens: 'Betekent niet dat targeting nooit zinvol is. Bij een klein, identificeerbaar segment kan het wel.',
      },
      {
        p: 'Merkopbouw en activatie horen samen, rond 60/40.',
        u: 'Losse kortetermijncampagnes stapelen niet op tot groei op lange termijn.',
        bron: 'IPA Databank, Binet en Field',
        grens: 'Betekent niet dat 60/40 een wet is. Het is een kalibratiepunt dat schuift met categorie, groeifase, budget en koopfrequentie.',
      },
      {
        p: 'Evalueer merkwerk over minimaal zes tot twaalf maanden.',
        u: 'Korte meetvensters bevoordelen systematisch activatie en prijs. Merkeffecten zijn dun uitgesmeerd over veel incidentele kopers en onzichtbaar in weekcijfers.',
        bron: 'IPA Databank',
        grens: 'Betekent niet dat merkwerk onmeetbaar is. Het vraagt andere metrics en een andere horizon, vooraf vastgezet.',
      },
    ],

    ervaring_h2: 'Waarom wij dit weten.',
    ervaring_p1: 'Dit systeem is gebouwd door iemand die twintig jaar aan de andere kant van de factuur zat, en een flink deel daarvan in FMCG. Mediaplannen voor merken in zuivel, fruit, dranken, verzorging en diervoeding.',
    ervaring_p2: 'Wat in al die jaren opviel: de strategie was meestal in orde. Er lag een model, een jaarkalender, een verdeling over merk en activatie. Wat er niet lag, was een meetplan dat de vraag beantwoordde of het gewerkt had. Na jaren en tientallen merken kon niemand met zekerheid zeggen of een merkcampagne een extra pak had verkocht.',
    ervaring_p3: 'Dat is geen verwijt aan de mensen die het deden, want zo werkte de hele markt. Het is wel de reden dat dit systeem bestaat, en waarom het begint bij meten en vastleggen in plaats van bij een nieuw model.',

    slot_h2: 'Begin bij wat er nu gemeten wordt.',
    slot_sub: 'De diagnose loopt op je eigen cijfers en laat zwart op wit zien wat er klopt en wat niet. Binnen twee weken, en je houdt het rapport.',
  },
  en: {
    eyebrow: 'For FMCG brands',
    h1_line: 'Seven retailer portals,',
    h1_accent: 'seven definitions of good.',
    sub: 'Ahold Delhaize, bol, Albert Heijn, Picnic, Amazon, Lidl, Carrefour. Each with its own ROAS definition and its own attribution window. At the end of the quarter they do not add up, and nobody can say whether the brand campaign did anything at the shelf.',
    cta: 'Start the diagnosis',
    cta_sec: 'What the platform does',

    eerlijk_h2: 'What we do not do here.',
    eerlijk_sub: 'Two things up front, because in this category that is exactly where the overpromising starts.',
    eerlijk: [
      {
        t: 'We do not connect those portals',
        d: 'There is no integration with Ahold Delhaize, bol, Albert Heijn, Picnic, Amazon, Lidl or Carrefour, and we will not pretend otherwise. Anyone promising to bring those seven behind one login is selling you something nobody has solved well.',
      },
      {
        t: 'We are not a data vendor',
        d: 'We have no panel of our own and we will not sell you a licence. What we do is read what you already have. You are probably already paying for a panel, a brand tracker and a listening tool, and those numbers simply never sit next to your media data.',
      },
    ],

    wel_h2: 'What we do, and why it matters.',
    wel: [
      {
        t: 'One definition, and it stays',
        d: 'We agree with you what a conversion is, what belongs in the count and what does not, and record why. That definition belongs to your company, not to the agency that invented it. The next agency inherits it instead of writing its own version.',
      },
      {
        t: 'Search demand as an early signal',
        d: 'Whether your brand search volume and your category volume are moving, and how they relate. You see that within days, not in the next quarterly report, and it runs ahead of what happens at the shelf.',
      },
      {
        t: 'See what your competitor is doing',
        d: 'The ad registers of Google and Meta are public, so that is where we start: which brands advertise in your category, and with what. That is the starting point, not the limit. Any channel with a public source can be added. And it works before you are a client.',
      },
      {
        t: 'What you already pay for goes in too',
        d: 'NielsenIQ, Circana, YouGov, GWI, your brand tracker, your listening tool, your own exports from the retailer portals. If there is an API, we connect it; GWI even has one that plugs straight into an AI system. If there is only an export, we read the file. And if your provider wants a signed agreement before a third party looks in, as NielsenIQ and Circana do, you hear that from us before you sign and not after. Whatever the route, it ends next to your media data with a definition underneath.',
      },
      {
        t: 'Record what you tried',
        d: 'Which flight, which promise, which result, and what you learned. Including the things that did not work. So that in two years you do not pay for the same test again because nobody remembers you already tried it.',
      },
    ],

    canon_eyebrow: 'Why the advice holds',
    canon_h2: 'The canon of your trade sits in the system.',
    canon_sub: 'Under every piece of advice sits a knowledge layer of 105 principles from published research. For FMCG those come from Ehrenberg-Bass and the IPA Databank of Binet and Field, exactly the corner your category has steered by for decades. Three of them, as they sit in the system, with their limits.',
    principes: [
      {
        p: 'Reach the whole category buyer.',
        u: 'Even large brands draw half their buyers from people who buy once or twice a year. Buyer classifications based on past behaviour are unstable.',
        bron: 'Ehrenberg-Bass',
        grens: 'Does not mean targeting is never useful. With a small, identifiable segment it can be.',
      },
      {
        p: 'Brand building and activation belong together, around 60/40.',
        u: 'Isolated short term campaigns do not add up to long term growth.',
        bron: 'IPA Databank, Binet and Field',
        grens: 'Does not mean 60/40 is a law. It is a calibration point that shifts with category, growth stage, budget and purchase frequency.',
      },
      {
        p: 'Evaluate brand work over at least six to twelve months.',
        u: 'Short measurement windows systematically favour activation and price. Brand effects are spread thin across many occasional buyers and invisible in weekly numbers.',
        bron: 'IPA Databank',
        grens: 'Does not mean brand work is unmeasurable. It needs different metrics and a different horizon, fixed in advance.',
      },
    ],

    ervaring_h2: 'Why we know this.',
    ervaring_p1: 'This system was built by someone who spent twenty years on the other side of the invoice, a good part of it in FMCG. Media plans for brands in dairy, fruit, drinks, personal care and pet food.',
    ervaring_p2: 'What stood out across those years: the strategy was usually fine. There was a model, an annual calendar, a split between brand and activation. What was missing was a measurement plan that answered whether it had worked. After years and dozens of brands, nobody could say with certainty whether a brand campaign had sold one extra pack.',
    ervaring_p3: 'That is not a reproach to the people who did it, because that was how the whole market worked. It is the reason this system exists, and why it starts with measuring and recording rather than with another model.',

    slot_h2: 'Start with what is being measured now.',
    slot_sub: 'The diagnosis runs on your own numbers and shows in black and white what holds and what does not. Within two weeks, and you keep the report.',
  },
} as const

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const nl = locale !== 'en'
  return localizedMetadata({
    locale,
    path: '/fmcg',
    title: nl ? 'Marketing voor FMCG-merken' : 'Marketing for FMCG brands',
    description: nl
      ? 'Zeven retailerportalen met zeven definities van goed. Wij koppelen ze niet, we spreken een definitie af en leggen vast waarom. Onderbouwd met Ehrenberg-Bass en de IPA Databank.'
      : 'Seven retailer portals with seven definitions of good. We do not connect them; we agree one definition and record why. Grounded in Ehrenberg-Bass and the IPA Databank.',
  })
}

export default async function FmcgPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = locale === 'en' ? COPY.en : COPY.nl

  return (
    <>
      <section className="bg-primary text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <p className="text-xs font-mono uppercase tracking-[0.14em] text-white/50">{t.eyebrow}</p>
          <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight max-w-4xl text-balance">
            {t.h1_line} <span className="text-accent">{t.h1_accent}</span>
          </h1>
          <p className="mt-6 text-lg text-white/70 max-w-2xl leading-relaxed">{t.sub}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/contact" className="inline-flex px-8 py-3.5 text-sm font-semibold text-primary bg-white rounded-xl hover:bg-white/90 transition-colors">{t.cta}</Link>
            <Link href="/platform" className="inline-flex px-8 py-3.5 text-sm font-semibold text-white/70 border border-white/20 rounded-xl hover:bg-white/5 transition-colors">{t.cta_sec}</Link>
          </div>
        </div>
      </section>

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
