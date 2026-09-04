import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import Section from '@/components/Section'
import SectionHeader from '@/components/SectionHeader'
import { localizedMetadata } from '@/lib/seo'
import DeskProof from '@/components/DeskProof'

type Props = { params: Promise<{ locale: string }> }

// Herbouwd op 4 sep 2026 (W-042), in dezelfde vorm als /fmcg en /retail.
// De oude pagina noemde tien koppelingen die geen van alle bestaan (AutoLine,
// Carmen, Cars-IT, Werbas, Indicata, AutoTrack, AutoScout24, BOVAG,
// Marktplaats Auto, Gaspedaal) plus "-50% cost per customer" zonder case.
// Zie docs/research/SITE_CLAIMS_AUDIT_2026-09-04.md in Stevin-Hub, sectie 2.
//
// Wat hier wel onder ligt:
// 1. De meting is op 4 sep 2026 echt gedraaid met src/scripts/vindbaarheidsscan.ts
//    op een landelijke dealergroep, met zes koopvragen uit een regio waar die
//    groep vestigingen heeft. Ruwe uitkomst:
//    docs/research/vindbaarheidsscans/vanmossel-nl-2026-09-04.json (de tweede
//    run van die dag; de eerste had onbruikbare vragen doordat de branche als
//    product werd ingevuld, en is overschreven). Alle zes met web-search
//    actief. De groep werd geen enkele keer genoemd. De groep wordt hier niet
//    bij naam genoemd, het is geen klant.
// 2. Geen enkele claim over DMS, voorraadfeeds of occasionportalen. Dat staat
//    expliciet als "wat we niet doen".
// 3. De drie principes staan woordelijk in de kennislaag: kern 2 (biedsignaal),
//    kern 3 (volledige conversiecyclus) en kern 13 (frictie).

const COPY = {
  nl: {
    eyebrow: 'Voor dealergroepen',
    h1_line: 'Landelijk ben je groot.',
    h1_accent: 'In de zoekvraag van de straat ernaast besta je niet.',
    sub: 'Voor groepen met meerdere merken en vestigingen. Het budget staat centraal, de verantwoording is per vestiging, en niemand kan zeggen welke regio meelift op de naam en welke er alleen geld in stopt.',
    cta: 'Start de diagnose',
    cta_sec: 'Wat het platform doet',

    scan_eyebrow: 'Een echte meting, 4 september',
    scan_h2: 'Zes koopvragen uit een regio. De grootste groep van het gebied kwam niet voor.',
    scan_p: 'Wij stelden zes vragen aan een AI-antwoordmachine met live zoekresultaten, over een regio waar een landelijke dealergroep meerdere vestigingen heeft. Vragen zoals een koper ze stelt: welke dealers hier hebben een goede keuze in nieuwe auto\'s met lease, waar koop ik een betrouwbare occasion met garantie, wie biedt onderhoudspakketten aan.',
    scan_cijfers: [
      { n: '0 van 6', t: 'keer werd de groep genoemd, op geen enkele vraag' },
      { n: '0 van 6', t: 'keer werd een site van de groep als bron gebruikt' },
      { n: 'autobedrijven', t: 'uit de buurt leverden vrijwel alle antwoorden' },
    ],
    scan_slot: 'De antwoorden kwamen van zelfstandige autobedrijven uit dezelfde plaats. Geen van hen heeft jouw inkoopmacht, jouw voorraad of jouw merkcontracten, en op de vraag van een koper stonden zij er wel en jij niet. Landelijke naamsbekendheid vertaalt zich niet vanzelf naar het antwoord dat iemand in jouw verzorgingsgebied krijgt.',
    scan_cta: 'Deze scan draait in een kwartier op jouw groep, per vestiging, voordat je klant bent.',

    eerlijk_h2: 'Wat wij hier niet doen.',
    eerlijk_sub: 'Twee dingen vooraf, want hier stonden tot voor kort tien koppelingen die niet bestaan.',
    eerlijk: [
      {
        t: 'Wij koppelen je DMS en je voorraad niet',
        d: 'Geen koppeling met je dealer management systeem en geen voorraadfeed, dus wij zien niet of een advertentie nog op een verkochte auto draait. Wie dat wel belooft, moet je vragen welke koppeling hij precies heeft en sinds wanneer die draait. Wat wij wel doen is je eigen export ernaast leggen, met een definitie eronder.',
      },
      {
        t: 'Wij koppelen geen occasionportalen',
        d: 'Geen koppeling met de bekende occasionsites en vergelijkers. Je verkoopt daar, en wat daar gebeurt zie je in hun eigen omgeving. Wij doen niet alsof wij dat samenvoegen, en dat scheelt je een gesprek over cijfers die nooit gaan kloppen.',
      },
    ],

    wel_h2: 'Wat we wel doen, en waarom dat het verschil maakt.',
    wel: [
      {
        t: 'Per vestiging, niet per land',
        d: 'Zoekvraag, zichtbaarheid en advertentiedruk per verzorgingsgebied. Waar je meelift op de naam en waar je betaalt zonder dat het beweegt. Dat is een ander gesprek dan een landelijk gemiddelde waar iedereen zich in kan verstoppen.',
      },
      {
        t: 'Zien wie er in jouw gebied adverteert',
        d: 'De advertentieregisters van Google en Meta zijn openbaar. Welke dealers en welke merken in jouw regio adverteren en waarmee, doorlopend, zonder dat iemand het handmatig opzoekt. Dit werkt al voordat je klant bent.',
      },
      {
        t: 'De vragen van iemand die je merk nog niet koos',
        d: 'Niet je eigen naam, maar de vraag ervoor: welke dealer hier is te vertrouwen, waar koop ik een occasion met garantie. Daar zit de koper die nog niets besloot, en daar valt het te winnen. Nulmeting vast, over negentig dagen opnieuw.',
      },
      {
        t: 'Verse data, of het staat er als oud',
        d: 'Elke koppeling schrijft weg wanneer hij voor het laatst geslaagd is. Loopt een sync vast bij een vestiging, dan zie je dat als stale in plaats van een grafiek die stil doorloopt. Bij een groep met veel accounts is dat het verschil tussen een rapportage en een sprookje.',
      },
      {
        t: 'Een definitie, over alle merken heen',
        d: 'Elk merk zijn eigen bureau betekent meestal elk merk zijn eigen definitie van een lead. Wij leggen er een vast, met de reden erbij, zodat je merken naast elkaar kunt leggen zonder dat iemand kan uitleggen waarom zijn cijfer anders telt.',
      },
      {
        t: 'Vastleggen wat je probeerde',
        d: 'Welke actie, welke vestiging, welk resultaat, en wat je ervan leerde. Ook de dingen die niet werkten. Zodat een wisseling van bureau of van marketeer geen geheugenverlies is.',
      },
    ],

    canon_eyebrow: 'Waarom ons advies klopt',
    canon_h2: 'Onder elk advies ligt een kennislaag met bronnen.',
    canon_sub: '105 principes uit gepubliceerd onderzoek. Drie ervan raken deze sector recht in het hart, want een auto koopt niemand vandaag en de meting doet vaak alsof van wel.',
    principes: [
      {
        p: 'Voed biedalgoritmes uitsluitend met voltooide, gekwalificeerde conversies en echte waarde.',
        u: 'De bedankpagina of het gevoerde gesprek, nooit de knopklik of een verzonnen waarde. Algoritmes zoeken meer van wat jij succes noemt, dus een vervuild signaal traint de verkeerde koper naar je showroom.',
        bron: 'Kernprincipe 2',
        grens: 'Betekent niet dat kliks niet geregistreerd mogen worden. Ze verhuizen naar de meetlaag, niet naar de stuurlaag.',
      },
      {
        p: 'Beoordeel resultaten pas na een volledige conversiecyclus.',
        u: 'Kosten zijn direct compleet, conversies druppelen na. Bij een aankoop met een lange orientatie laat een kort venster je kosten per klant kunstmatig verdubbelen, en wie dan bijstuurt stuurt op ruis.',
        bron: 'Kernprincipe 3',
        grens: 'Betekent niet dat recente cijfers waardeloos zijn. De kostenkant is wel compleet, en die mag je meteen beoordelen.',
      },
      {
        p: 'Zoek eerst de frictie voordat je een overtuigingscampagne adviseert.',
        u: 'De echte drempel is meestal gemak: een proefritformulier met te veel velden, geen prijs bij de occasion, geen antwoord binnen een dag. Gedrag makkelijker maken werkt vaker en goedkoper dan attitudes veranderen.',
        bron: 'Kernprincipe 13',
        grens: 'Betekent niet dat communicatie nooit een houding raakt. Wel dat je de drempel eerst wegneemt.',
      },
    ],

    ervaring_h2: 'Waarom wij dit weten.',
    ervaring_p1: 'Dit systeem is gebouwd door iemand die twintig jaar aan de andere kant van de factuur zat, als oprichter van een bureau. Groepen met meerdere vestigingen zijn daar een bekend patroon: het budget wordt centraal verdeeld, de verantwoording is lokaal, en de cijfers komen op de tiende van de maand binnen.',
    ervaring_p2: 'Wat daardoor gebeurt: de vestiging met de beste locatie lijkt de beste marketing te hebben, en de vestiging in een lastig gebied krijgt de schuld van iets dat aan het gebied ligt. Zonder meting per verzorgingsgebied is dat gesprek niet te voeren.',
    ervaring_p3: 'Daarom begint dit bij meten per vestiging, bij een definitie die over alle merken heen geldt, en bij vastleggen wat je probeerde.',

    slot_h2: 'Begin bij wat er nu gemeten wordt.',
    slot_sub: 'De diagnose loopt op je eigen cijfers en laat zwart op wit zien wat er klopt en wat niet. Binnen twee weken, en je houdt het rapport.',
  },
  en: {
    eyebrow: 'For dealer groups',
    h1_line: 'Nationally you are large.',
    h1_accent: 'In the search demand one street over you do not exist.',
    sub: 'For groups with several brands and locations. The budget is decided centrally, the accountability is per location, and nobody can say which region rides on the name and which one only spends money.',
    cta: 'Start the diagnosis',
    cta_sec: 'What the platform does',

    scan_eyebrow: 'A real measurement, 4 September',
    scan_h2: 'Six buying questions from one region. The largest group in the area did not appear.',
    scan_p: 'We put six questions to an AI answer engine with live search, about a region where a national dealer group has several locations. The questions a buyer asks: which dealers here have a good choice of new cars with leasing, where do I buy a reliable used car with warranty, who offers maintenance packages.',
    scan_cijfers: [
      { n: '0 of 6', t: 'times the group was named, on any question' },
      { n: '0 of 6', t: 'times a site of the group was used as a source' },
      { n: 'local dealers', t: 'from the same town supplied nearly all the answers' },
    ],
    scan_slot: 'The answers came from independent car dealers in the same town. None of them has your buying power, your stock or your brand contracts, and on a buyer\'s question they were there and you were not. National name recognition does not translate by itself into the answer someone gets in your catchment area.',
    scan_cta: 'We run this scan on your group, per location, in fifteen minutes, before you are a client.',

    eerlijk_h2: 'What we do not do here.',
    eerlijk_sub: 'Two things up front, because this page listed ten integrations that do not exist.',
    eerlijk: [
      {
        t: 'We do not connect your DMS or your stock',
        d: 'No integration with your dealer management system and no stock feed, so we cannot see whether an ad is still running on a sold car. If someone promises that, ask which integration exactly and since when it has been running. What we do is put your own export alongside, with a definition underneath.',
      },
      {
        t: 'We do not connect used-car portals',
        d: 'No integration with the well-known used-car sites and comparison portals. You sell there, and what happens there stays in their own environment. We will not pretend we merge that, which saves you a conversation about numbers that were never going to add up.',
      },
    ],

    wel_h2: 'What we do, and why it matters.',
    wel: [
      {
        t: 'Per location, not per country',
        d: 'Search demand, visibility and advertising pressure per catchment area. Where you ride on the name and where you pay without anything moving. That is a different conversation from a national average everyone can hide in.',
      },
      {
        t: 'See who advertises in your area',
        d: 'The ad registers of Google and Meta are public. Which dealers and which brands advertise in your region and with what, continuously, without anyone looking it up by hand. This works before you are a client.',
      },
      {
        t: 'The questions of someone who has not chosen your brand yet',
        d: 'Not your own name, but the question before it: which dealer here can be trusted, where do I buy a used car with a warranty. That is where the undecided buyer sits, and that is where it can be won. Baseline fixed, measured again in ninety days.',
      },
      {
        t: 'Fresh data, or it is marked as old',
        d: 'Every connection records when it last succeeded. If a sync breaks at one location you see it as stale, instead of a chart quietly running on. With a group holding many accounts, that is the difference between a report and a fairy tale.',
      },
      {
        t: 'One definition, across all brands',
        d: 'Every brand with its own agency usually means every brand with its own definition of a lead. We fix one, with the reason attached, so you can put brands side by side without anyone explaining why their number counts differently.',
      },
      {
        t: 'Record what you tried',
        d: 'Which action, which location, which result, and what you learned. Including the things that did not work. So a change of agency or of marketer is not memory loss.',
      },
    ],

    canon_eyebrow: 'Why the advice holds',
    canon_h2: 'Under every piece of advice sits a knowledge layer with sources.',
    canon_sub: '105 principles from published research. Three of them hit this sector squarely, because nobody buys a car today and measurement often pretends otherwise.',
    principes: [
      {
        p: 'Feed bidding algorithms only completed, qualified conversions and real value.',
        u: 'The thank-you page or the conversation that happened, never the button click or an invented value. Algorithms look for more of whatever you call success, so a polluted signal trains the wrong buyer towards your showroom.',
        bron: 'Core principle 2',
        grens: 'Does not mean clicks cannot be recorded. They move to the measurement layer, not the steering layer.',
      },
      {
        p: 'Judge results only after a full conversion cycle.',
        u: 'Costs are complete immediately, conversions trickle in afterwards. With a long consideration purchase, a short window makes your cost per customer look artificially doubled, and anyone correcting then is steering on noise.',
        bron: 'Core principle 3',
        grens: 'Does not mean recent numbers are worthless. The cost side is complete, and you can judge that straight away.',
      },
      {
        p: 'Look for friction before advising a persuasion campaign.',
        u: 'The real barrier is usually convenience: a test-drive form with too many fields, no price on the used car, no answer within a day. Making behaviour easier works more often and more cheaply than changing attitudes.',
        bron: 'Core principle 13',
        grens: 'Does not mean communication never shifts an attitude. It means you remove the barrier first.',
      },
    ],

    ervaring_h2: 'Why we know this.',
    ervaring_p1: 'This system was built by someone who spent twenty years on the other side of the invoice, as the founder of an agency. Multi-location groups are a familiar pattern there: budget divided centrally, accountability local, and the numbers arriving on the tenth of the month.',
    ervaring_p2: 'What that produces: the location with the best address appears to have the best marketing, and the location in a difficult area gets blamed for something the area is doing. Without measurement per catchment area, that conversation cannot be had.',
    ervaring_p3: 'So this starts with measuring per location, with a definition that holds across all brands, and with recording what you tried.',

    slot_h2: 'Start with what is being measured now.',
    slot_sub: 'The diagnosis runs on your own numbers and shows in black and white what holds and what does not. Within two weeks, and you keep the report.',
  },
} as const

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const nl = locale !== 'en'
  return localizedMetadata({
    locale,
    path: '/voor-dealers',
    title: nl ? 'Marketing voor dealergroepen' : 'Marketing for dealer groups',
    description: nl
      ? 'Per vestiging meten in plaats van een landelijk gemiddelde. Wij koppelen je DMS en je voorraad niet, en zeggen dat erbij. Onderbouwd met een kennislaag met bronnen.'
      : 'Measuring per location instead of a national average. We do not connect your DMS or your stock, and we say so. Grounded in a knowledge layer with sources.',
  })
}

export default async function DealersPage({ params }: Props) {
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
              <Link href="/platform" className="inline-flex px-8 py-3.5 text-sm font-semibold text-white/70 border border-white/20 rounded-xl hover:bg-white/5 transition-colors">{t.cta_sec}</Link>
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
              <div key={c.t} className="border-t border-border pt-4">
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
