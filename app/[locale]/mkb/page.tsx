import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import Section from '@/components/Section'
import SectionHeader from '@/components/SectionHeader'
import { localizedMetadata } from '@/lib/seo'
import DeskProof from '@/components/DeskProof'

type Props = { params: Promise<{ locale: string }> }

// Herbouwd op 4 sep 2026 (W-042), in dezelfde vorm als /fmcg en /retail.
// De oude pagina beloofde "een foto of een appje wordt een nette offerte" en
// een site die zich "automatisch" aanpast aan seizoen en vraag. Allebei niet
// waar: Stevin Quote bestaat niet in de code, en op de negen klantsites staan
// de reviews met de hand in TypeScript-bestanden. Zie
// docs/research/SITE_CLAIMS_AUDIT_2026-09-04.md in Stevin-Hub.
//
// Wat er wel is en hier staat:
// 1. De meting is op 4 sep 2026 echt gedraaid op een installatiebedrijf in de
//    regio Breda, met src/scripts/vindbaarheidsscan.ts. Ruwe uitkomst:
//    docs/research/vindbaarheidsscans/vanwanrooijinstallatie-nl-2026-09-04.json.
//    12 vragen, alle 12 met web-search actief, 0 keer de eigen site als bron.
//    Op de vraag "hoe vind ik een betrouwbare installateur" kwamen uitsluitend
//    leadplatformen terug (werkspot.nl, solvari.nl, trustoo.nl, fixaroo.nl).
//    Dat is precies het punt van deze pagina en het is gemeten, niet bedacht.
//    Het bedrijf wordt niet bij naam genoemd, het is geen klant.
// 2. Negen sites in drie weken voor vakmensen in de regio Breda: echt gebeurd.
//    Wel eerlijk erbij: die sites worden door ons bijgehouden, ze onderhouden
//    zichzelf niet.
// 3. Inbound uit WhatsApp, mail en formulier komt binnen via
//    src/core/crm/inboundResolve.ts, en het opvolgconcept komt uit
//    src/core/crm/conceptGenerator.ts. Versturen gebeurt na akkoord, en dat
//    staat er ook zo.
// 4. De drie principes staan woordelijk in de kennislaag: kern 13 (frictie),
//    kern 17 (sociaal bewijs) en kern 16 (een kernbelofte).

const COPY = {
  nl: {
    eyebrow: 'Voor MKB en vakmensen',
    h1_line: 'Je werk is goed.',
    h1_accent: 'Alleen vindt niemand je op de vraag die ertoe doet.',
    sub: 'Voor bedrijven waar de eigenaar zelf op de bus zit, zelf offreert en zelf de telefoon opneemt. Marketing is dan het werk na het werk, en dus blijft het liggen. Precies daar verdienen anderen aan jouw naam.',
    cta: 'Start de diagnose',
    cta_sec: 'Bekijk de websites',

    scan_eyebrow: 'Een echte meting, 4 september',
    scan_h2: 'Wij vroegen een AI hoe je een betrouwbare installateur vindt. Er kwamen alleen leadsites terug.',
    scan_p: 'Twaalf vragen aan een AI-antwoordmachine met live zoekresultaten, over een installatiebedrijf in de regio Breda. Vragen zoals een klant ze stelt: wie doet goede cv-installaties in Breda, wat kost een warmtepomp, wie kan er snel komen voor een kapotte ketel.',
    scan_cijfers: [
      { n: '0 van 12', t: 'keer werd de site van het bedrijf als bron gebruikt' },
      { n: '1 van 12', t: 'vragen noemde het bedrijf, en dat was de vraag met de naam erin' },
      { n: 'werkspot, solvari', t: 'en twee andere leadplatformen kregen de vraag over een betrouwbare installateur' },
    ],
    scan_slot: 'Kijk goed naar wie er wel stond. Buurtbedrijven, en verder de platformen die je aanvragen doorverkopen. De vraag waar het echt om gaat, wie is te vertrouwen, is dus al eigendom van een partij die daar per lead geld voor rekent. Dat is geen pech en geen algoritme dat je tegenwerkt, dat is een pagina die er niet staat.',
    scan_cta: 'Deze scan draait in een kwartier op jouw bedrijf, voordat je klant bent.',

    eerlijk_h2: 'Wat wij hier niet doen.',
    eerlijk_sub: 'Twee dingen vooraf, want op deze pagina stond tot voor kort iets dat mooier was dan de werkelijkheid.',
    eerlijk: [
      {
        t: 'Wij maken geen offertes voor je',
        d: 'Er staat geen machine klaar die van een foto en een appje een prijsopgave maakt. Dat kunnen wij niet, en wie het je wel belooft, laat jou het rekenwerk nog steeds zelf nakijken. Wat wij wel doen is de aanvraag vastleggen en het opvolgbericht klaarzetten, zodat het niet twee dagen blijft liggen.',
      },
      {
        t: 'Je site houdt zichzelf niet bij',
        d: 'Wij bouwen en onderhouden hem, en dat is mensenwerk. Er is geen knop waarmee je site zichzelf aanpast aan het seizoen. Wat je wel krijgt is een site die van jou is, op je eigen domein, en die niet stilstaat omdat wij hem bijhouden.',
      },
    ],

    wel_h2: 'Wat we wel doen.',
    wel: [
      {
        t: 'Een site die van jou is',
        d: 'Op je eigen domein, klaar in dagen, met je echte projecten en je echte beoordelingen erin. Negen vakmensen in de regio Breda kregen er zo een in drie weken tijd. Stop je ermee, dan houd je de site en het domein.',
      },
      {
        t: 'De vragen die je klanten stellen',
        d: 'Niet je bedrijfsnaam, maar de vraag ervoor: wie kan er snel komen, wat kost het ongeveer, waar let ik op. Daar zitten nu leadplatformen op. Wij meten waar je staat, leggen een nulmeting vast en meten opnieuw.',
      },
      {
        t: 'Alles komt op een plek binnen',
        d: 'WhatsApp, mail en het formulier op je site komen samen in een lijst, met wie het was en waar het over ging. Niet meer terugzoeken in drie telefoons.',
      },
      {
        t: 'Opvolging staat klaar, jij drukt op verzenden',
        d: 'Het bericht ligt klaar met wat er besproken is. Jij leest het, past het aan als je wilt, en verstuurt. Er gaat nooit iets naar je klant zonder dat jij het gezien hebt.',
      },
      {
        t: 'Zien wie er in jouw gebied adverteert',
        d: 'De advertentieregisters van Google en Meta zijn openbaar. Welke concurrenten in jouw regio adverteren en waarmee, zonder dat iemand dat handmatig hoeft op te zoeken. Dit werkt al voordat je klant bent.',
      },
      {
        t: 'Vastleggen wat werkte',
        d: 'Welke actie, welk seizoen, wat het opleverde. Zodat je volgend voorjaar niet opnieuw begint met gokken, en zodat een volgende partij die het overneemt niet bij nul begint.',
      },
    ],

    canon_eyebrow: 'Waarom ons advies klopt',
    canon_h2: 'Geen onderbuik, maar onderzoek.',
    canon_sub: 'Onder elk advies ligt een kennislaag van 105 principes uit gepubliceerd onderzoek. Drie ervan gaan recht over jouw situatie, zoals ze in het systeem staan, met hun grens erbij.',
    principes: [
      {
        p: 'Haal eerst de drempel weg voordat je harder gaat overtuigen.',
        u: 'De echte reden dat iemand niet belt is meestal gemak: een formulier dat te lang is, geen prijsindicatie, onduidelijkheid over wanneer je kunt komen. Dat oplossen werkt vaker en goedkoper dan een campagne.',
        bron: 'Kernprincipe 13',
        grens: 'Betekent niet dat je nooit hoeft te vertellen wat je goed doet. Wel dat je het pas hoeft te roepen als bellen makkelijk is.',
      },
      {
        p: 'Laat je klanten zeggen wat je zelf niet geloofwaardig kunt zeggen.',
        u: 'Dezelfde zin overtuigt een veelvoud beter uit de mond van iemand zonder eigen belang, met verstand van zaken, die op de lezer lijkt. Een buurman met hetzelfde huis verslaat je eigen reclametekst.',
        bron: 'Hovland en Weiss 1953',
        grens: 'Betekent niet dat het argument er niet toe doet. De bron is een vermenigvuldiger, geen vervanging, en een keurmerk zonder uitleg doet niets.',
      },
      {
        p: 'Bouw elke uiting rond een kernbelofte.',
        u: 'Elk extra voordeel dat je erbij zet, verzwakt de geloofwaardigheid van je hoofdvoordeel. Zet een ding centraal en verplaats de rest naar de onderbouwing.',
        bron: 'Zhang en Fishbach 2007',
        grens: 'Betekent niet dat je bedrijf maar een ding mag doen. Je mag alles aanbieden, je moet alleen niet alles tegelijk roepen.',
      },
    ],

    ervaring_h2: 'Waarom wij dit weten.',
    ervaring_p1: 'Dit systeem is gebouwd door iemand die twintig jaar in online marketing zat en zelf een bureau had. De bedrijven waar dit voor bedoeld is, zijn precies de bedrijven die zo\'n bureau meestal niet kunnen betalen.',
    ervaring_p2: 'Wat we in gesprekken telkens terugzien: geld naar gekochte leads die aan vijf bedrijven tegelijk verkocht worden, en niets dat blijft. Elf honderd euro aan leads en geen enkele opdracht, dat is een echt cijfer uit zo\'n gesprek. Volgend jaar betaal je opnieuw, want je hebt niets opgebouwd.',
    ervaring_p3: 'Daarom begint dit bij je eigen site, je eigen vindbaarheid en je eigen aanvragen. Alles wat je opbouwt blijft van jou, ook als je met ons stopt.',

    slot_h2: 'Begin bij wat er nu gebeurt.',
    slot_sub: 'De diagnose laat zien waar je staat, wie er op jouw vragen staat en wat je nu laat liggen. Daarna pas een voorstel.',
  },
  en: {
    eyebrow: 'For small businesses and trades',
    h1_line: 'Your work is good.',
    h1_accent: 'It is just that nobody finds you on the question that matters.',
    sub: 'For companies where the owner drives the van, writes the quotes and answers the phone. Marketing is the work after the work, so it stays undone. And that is exactly where other people make money off your name.',
    cta: 'Start the diagnosis',
    cta_sec: 'See the websites',

    scan_eyebrow: 'A real measurement, 4 September',
    scan_h2: 'We asked an AI how to find a reliable heating engineer. Only lead platforms came back.',
    scan_p: 'Twelve questions put to an AI answer engine with live search, about an installation company near Breda. The questions a customer asks: who does good boiler installations here, what does a heat pump cost, who can come quickly for a broken boiler.',
    scan_cijfers: [
      { n: '0 of 12', t: 'times the company site was used as a source' },
      { n: '1 of 12', t: 'questions named the company, and that was the one with its name in it' },
      { n: 'werkspot, solvari', t: 'and two other lead platforms got the question about a reliable installer' },
    ],
    scan_slot: 'Look closely at who was there instead. Local competitors, and beyond that the platforms that resell your enquiries. The question that really matters, who can be trusted, is already owned by a party charging by the lead for it. That is not bad luck or an algorithm working against you, it is a page that does not exist.',
    scan_cta: 'We run this scan on your business in fifteen minutes, before you are a client.',

    eerlijk_h2: 'What we do not do here.',
    eerlijk_sub: 'Two things up front, because this page used to promise something prettier than reality.',
    eerlijk: [
      {
        t: 'We do not write your quotes',
        d: 'There is no machine standing by that turns a photo and a text message into a price. We cannot do that, and anyone promising it still leaves you to check the sums. What we do is capture the enquiry and prepare the follow-up, so it does not sit for two days.',
      },
      {
        t: 'Your site does not maintain itself',
        d: 'We build and maintain it, and that is human work. There is no switch that adapts your site to the season on its own. What you do get is a site that is yours, on your own domain, and that does not go stale because we keep it up.',
      },
    ],

    wel_h2: 'What we do.',
    wel: [
      {
        t: 'A site that is yours',
        d: 'On your own domain, ready in days, with your real projects and your real reviews in it. Nine tradespeople near Breda got one that way in three weeks. If you stop, you keep the site and the domain.',
      },
      {
        t: 'The questions your customers ask',
        d: 'Not your company name, but the question before it: who can come quickly, what does it roughly cost, what should I watch out for. Lead platforms sit on those today. We measure where you stand, fix a baseline and measure again.',
      },
      {
        t: 'Everything arrives in one place',
        d: 'WhatsApp, email and the form on your site come together in one list, with who it was and what it was about. No more searching back through three phones.',
      },
      {
        t: 'The follow-up is ready, you press send',
        d: 'The message is prepared with what was discussed. You read it, change it if you want, and send. Nothing ever goes to your customer without you seeing it.',
      },
      {
        t: 'See who advertises in your area',
        d: 'The ad registers of Google and Meta are public. Which competitors advertise in your region and with what, without anyone having to look it up by hand. This works before you are a client.',
      },
      {
        t: 'Record what worked',
        d: 'Which action, which season, what it brought in. So next spring you are not guessing again, and whoever takes over does not start from zero.',
      },
    ],

    canon_eyebrow: 'Why the advice holds',
    canon_h2: 'Not a hunch, but research.',
    canon_sub: 'Under every piece of advice sits a knowledge layer of 105 principles from published research. Three of them speak directly to your situation, as they sit in the system, with their limits.',
    principes: [
      {
        p: 'Remove the barrier before you try harder to persuade.',
        u: 'The real reason someone does not call is usually convenience: a form that is too long, no price indication, no clarity about when you could come. Fixing that works more often and more cheaply than a campaign.',
        bron: 'Core principle 13',
        grens: 'Does not mean you never need to say what you are good at. It means you say it once calling is easy.',
      },
      {
        p: 'Let your customers say what you cannot credibly say yourself.',
        u: 'The same sentence persuades far better from someone with no stake, with expertise, who resembles the reader. A neighbour with the same house beats your own advertising copy.',
        bron: 'Hovland and Weiss 1953',
        grens: 'Does not mean the argument does not matter. The source is a multiplier, not a replacement, and an unexplained certification does nothing.',
      },
      {
        p: 'Build every message around one core promise.',
        u: 'Every extra benefit you add weakens the credibility of the main one. Put one thing at the centre and move the rest into the evidence.',
        bron: 'Zhang and Fishbach 2007',
        grens: 'Does not mean your business may only do one thing. Offer everything; just do not shout all of it at once.',
      },
    ],

    ervaring_h2: 'Why we know this.',
    ervaring_p1: 'This system was built by someone with twenty years in online marketing who ran an agency. The businesses this is meant for are exactly the ones that usually cannot afford such an agency.',
    ervaring_p2: 'What keeps coming back in conversations: money spent on bought leads sold to five companies at once, and nothing that lasts. Eleven hundred euros on leads and not a single job, that is a real number from one of those conversations. Next year you pay again, because you built nothing.',
    ervaring_p3: 'So this starts with your own site, your own visibility and your own enquiries. Everything you build stays yours, including when you stop working with us.',

    slot_h2: 'Start with what is happening now.',
    slot_sub: 'The diagnosis shows where you stand, who sits on your questions and what you are leaving on the table. A proposal only comes after that.',
  },
} as const

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const nl = locale !== 'en'
  return localizedMetadata({
    locale,
    path: '/mkb',
    title: nl ? 'Marketing voor MKB en vakmensen' : 'Marketing for small businesses and trades',
    description: nl
      ? 'Je eigen site, je eigen aanvragen en de vragen die je klanten echt stellen. Gemeten voordat je klant bent, en we zeggen erbij wat we niet doen.'
      : 'Your own site, your own enquiries and the questions your customers actually ask. Measured before you are a client, and we say what we do not do.',
  })
}

export default async function MkbPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = locale === 'en' ? COPY.en : COPY.nl

  return (
    <>
      <section className="bg-primary text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl">
            <p className="text-xs font-mono uppercase tracking-[0.14em] text-white/50">{t.eyebrow}</p>
            <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
              {t.h1_line} <span className="text-accent">{t.h1_accent}</span>
            </h1>
            <p className="mt-6 text-lg text-white/70 leading-relaxed">{t.sub}</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/contact" className="inline-flex px-8 py-3.5 text-sm font-semibold text-primary bg-white rounded-xl hover:bg-white/90 transition-colors">{t.cta}</Link>
              <Link href="/websites" className="inline-flex px-8 py-3.5 text-sm font-semibold text-white/70 border border-white/20 rounded-xl hover:bg-white/5 transition-colors">{t.cta_sec}</Link>
            </div>
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

      <DeskProof locale={locale} toonBrein={false} melding="hittegolf" />

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
