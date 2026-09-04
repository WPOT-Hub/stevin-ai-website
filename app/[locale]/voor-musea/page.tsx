import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import Section from '@/components/Section'
import SectionHeader from '@/components/SectionHeader'
import { localizedMetadata } from '@/lib/seo'
import DeskProof from '@/components/DeskProof'

type Props = { params: Promise<{ locale: string }> }

// Herbouwd op 4 sep 2026 (W-042), in dezelfde vorm als /fmcg en /retail.
// De oude pagina beloofde "native koppelingen met Tickitto, See Tickets,
// Stager, Eventbrite, plus WhyDonate, DonorPerfect en GeefGratis", plus
// bezoekersattributie via QR-codes en geanonimiseerde locatiedata. Geen van
// die koppelingen bestaat in de code (docs/research/SITE_CLAIMS_AUDIT_2026-09-04.md,
// sectie 2). Ook weg: de losse "11 mln euro ticketomzet" onderaan, want dat is
// werk bij een vorige werkgever en niet van ons om te claimen.
//
// Wat hier wel onder ligt:
// 1. De meting in sectie twee is op 4 sep 2026 echt gedraaid op een Nederlands
//    museum, met src/scripts/vindbaarheidsscan.ts. Ruwe uitkomst:
//    docs/research/vindbaarheidsscans/textielmuseum-nl-2026-09-04.json.
//    12 vragen, alle 12 met web-search actief. Het museum kwam er goed uit
//    (7 van 12 keer de eigen site als bron) en dat staat er ook zo, met de
//    ene plek waar het misging: de drie vragen van iemand die het museum nog
//    niet kent. Een scan die alleen slecht nieuws mag opleveren is geen meting.
//    Het museum wordt niet bij naam genoemd, het is geen klant.
// 2. Ad Grants: de regels komen van Google zelf, nagekeken op 4 sep 2026 op
//    support.google.com/nonprofits (artikel 117827 en 9314402). Vijf procent
//    doorklikratio per maand op accountniveau, twee maanden onder elkaar levert
//    tijdelijke deactivatie op, losse woorden als zoekwoord mogen niet met een
//    paar uitzonderingen. De oude pagina schreef "een paar dagen onbeheerd en
//    je verliest het", en dat is aantoonbaar niet hoe het werkt.
// 3. De drie principes staan woordelijk in de kennislaag, inclusief hun grens:
//    kern 9 (hele categoriekoper), kern 13 (koopfrictie) en kern 17 (sociaal
//    bewijs), uit docs/knowledge/ADVISOR_KNOWLEDGE.md.

const COPY = {
  nl: {
    eyebrow: 'Voor musea en cultuur',
    h1_line: 'Wie je kent, vindt je.',
    h1_accent: 'Wie je nog niet kent, vindt iemand anders.',
    sub: 'Voor instellingen met een klein marketingteam en veel kanalen. Het probleem is zelden je naamsbekendheid bij mensen die al komen. Het zit bij de bezoeker die nog niet aan jou dacht, en dat is precies de groep waar je groei vandaan moet komen.',
    cta: 'Start de diagnose',
    cta_sec: 'Wat het platform doet',

    scan_eyebrow: 'Een echte meting, 4 september',
    scan_h2: 'We maten een Nederlands museum. Op zeven van de twaalf vragen ging het goed.',
    scan_p: 'Twaalf vragen aan een AI-antwoordmachine met live zoekresultaten. Vragen over de collectie, over de stad, over openingstijden en tickets, en drie vragen van iemand die het museum nog niet kent: wat doe je met kinderen rond dit thema, hoe bereid je een museumbezoek voor.',
    scan_cijfers: [
      { n: '7 van 12', t: 'keer werd de eigen site als bron gebruikt, en dat is een goede score' },
      { n: '0 van 3', t: 'vragen van iemand die het museum nog niet kende noemde het museum' },
      { n: 'quiltmuseum.org', t: 'en twee andere buitenlandse instellingen gaven die antwoorden' },
    ],
    scan_slot: 'Dat is het patroon, en het is het omgekeerde van wat je zou verwachten. Op je naam sta je er prima op. Op de vraag van een gezin dat een dagje uit zoekt rond jouw thema stond er een museum in Londen en een in New York. Die groep is precies waar je bezoekersgroei uit moet komen, en daar ben je onzichtbaar.',
    scan_cta: 'Deze scan draait in een kwartier op jouw instelling, voordat je klant bent.',

    eerlijk_h2: 'Wat wij hier niet doen.',
    eerlijk_sub: 'Twee dingen vooraf, want hier stond tot voor kort iets anders, en dat klopte niet.',
    eerlijk: [
      {
        t: 'Wij koppelen je ticketsysteem niet',
        d: 'Geen koppeling met je ticketplatform, je donatieformulier of je ledenadministratie. Wij tellen dus niet mee welke advertentie welk kaartje verkocht. Wat wij wel doen is je eigen export of rapportage ernaast leggen, met een definitie eronder, zodat het cijfer tenminste een betekenis heeft.',
      },
      {
        t: 'Wij meten geen bezoekers in het gebouw',
        d: 'Geen tellers, geen locatiedata, geen QR-constructies waarmee je iemand door de zaal volgt. Als iemand je belooft dat hij online media aan bezoek in het pand koppelt zonder je kassasysteem, dan rekent hij met aannames.',
      },
    ],

    wel_h2: 'Wat we wel doen, en waarom dat het verschil maakt.',
    wel: [
      {
        t: 'Google Ad Grants volgens de regels van Google',
        d: 'Het Grant vraagt vijf procent doorklikratio per maand op accountniveau, en twee maanden daaronder levert een tijdelijke deactivatie op. Losse woorden als zoekwoord mogen niet, op een paar uitzonderingen na. Wij beheren het account binnen die regels en waarschuwen ruim voor je in de gevarenzone komt, in plaats van erachter te komen als het al uit staat.',
      },
      {
        t: 'De vragen van wie je nog niet kent',
        d: 'Waar sta je in zoekresultaten en in AI-antwoorden op vragen waar jouw naam niet in voorkomt. Dat is een andere lijst dan waar je nu op stuurt, en het is de lijst waar nieuwe bezoekers vandaan komen. We leggen een nulmeting vast en meten opnieuw, zodat je ziet of het beweegt.',
      },
      {
        t: 'Zien wie er in jouw regio adverteert',
        d: 'De advertentieregisters van Google en Meta zijn openbaar. Welke instellingen, attracties en dagjes-uit in jouw gebied adverteren, en waarmee, in de weken dat het ertoe doet. Dit werkt al voordat je klant bent.',
      },
      {
        t: 'Seizoen en vakanties als context, niet als ruis',
        d: 'Vakanties, feestdagen, weer en lokale evenementen bepalen in deze sector meer dan een creatieve keuze. Ze horen dus naast je cijfers te staan als je beoordeelt of een campagne werkte, niet als excuus achteraf.',
      },
      {
        t: 'Een definitie, en die blijft staan',
        d: 'Wat is een conversie: een ticket, een reservering, een aanmelding voor de nieuwsbrief, en tellen groepsboekingen mee. Wij spreken het af, leggen vast waarom, en die afspraak blijft van de instelling, ook als de marketeer of het bureau wisselt.',
      },
      {
        t: 'Vastleggen wat je probeerde',
        d: 'Welke campagne, welke tentoonstelling, welk resultaat, en wat je ervan leerde. Ook de dingen die niet werkten. In een sector waar veel op tijdelijke contracten en projecten draait, is dat het verschil tussen leren en elke keer opnieuw beginnen.',
      },
    ],

    canon_eyebrow: 'Waarom ons advies klopt',
    canon_h2: 'De canon van je vak zit in het systeem.',
    canon_sub: 'Onder elk advies ligt een kennislaag van 105 principes uit gepubliceerd onderzoek. Drie ervan raken deze sector recht in het hart, zoals ze in het systeem staan, met hun grens erbij.',
    principes: [
      {
        p: 'Bereik de hele categoriekoper: lichte en incidentele bezoekers leveren een groot deel van het volume.',
        u: 'Zelfs sterke merken halen de helft van hun publiek uit mensen die een of twee keer per jaar komen. Groei komt van meer nieuwe bezoekers, niet van je vrienden nog loyaler maken.',
        bron: 'Ehrenberg-Bass',
        grens: 'Betekent niet dat targeting nooit zinvol is. Bij een klein, identificeerbaar segment kan het wel, en vriendenwerving heeft een eigen functie.',
      },
      {
        p: 'Zoek eerst de frictie voordat je een overtuigingscampagne adviseert.',
        u: 'De echte drempel is meestal gemak: een ticketflow met te veel stappen, onduidelijkheid over parkeren of over wat er nu te zien is. Gedrag makkelijker maken werkt vaker en goedkoper dan een houding veranderen.',
        bron: 'Kernprincipe 13',
        grens: 'Betekent niet dat communicatie nooit een houding raakt. Wel dat je de drempel eerst wegneemt voordat je hem overschreeuwt.',
      },
      {
        p: 'Zet sociaal bewijs in met herkenbare mensen en concrete, controleerbare aantallen.',
        u: 'Bewijs dat mensen zelf kunnen waarnemen verslaat geclaimde populariteit, en referenten die op de bezoeker lijken werken beter dan een prijs of een citaat uit de vakpers.',
        bron: 'Keizer et al. 2008',
        grens: 'Betekent niet dat het overal even sterk werkt. Bij mensen die op inhoud beoordelen weegt het zwakker, en generieke populariteitsclaims doen weinig.',
      },
    ],

    ervaring_h2: 'Waarom wij dit weten.',
    ervaring_p1: 'Dit systeem is gebouwd door iemand die twintig jaar aan de andere kant van de factuur zat, als oprichter van een bureau. Culturele instellingen zijn daar altijd een aparte klant: het budget is klein, het team is klein, en de verantwoording is groot, want er zit vaak publiek geld in.',
    ervaring_p2: 'Wat daar opvalt: er wordt hard gewerkt aan zichtbaarheid bij mensen die de instelling al kennen, en bijna niets aan de vraag van iemand die nog nergens aan dacht. Dat is geen luiheid, dat is een gebrek aan tijd en aan meting die die kant op kijkt.',
    ervaring_p3: 'Daarom begint dit bij meten wat er nu gebeurt, ook als de uitkomst is dat het goed zit, en bij vastleggen wat je probeerde zodat de volgende persoon niet opnieuw begint.',

    slot_h2: 'Begin bij wat er nu gemeten wordt.',
    slot_sub: 'De diagnose loopt op je eigen cijfers en laat zwart op wit zien wat er klopt en wat niet. Binnen twee weken, en je houdt het rapport.',
  },
  en: {
    eyebrow: 'For museums and cultural institutions',
    h1_line: 'People who know you, find you.',
    h1_accent: 'People who do not, find someone else.',
    sub: 'For institutions with a small marketing team and a lot of channels. The problem is rarely your name recognition among people who already come. It sits with the visitor who was not thinking of you yet, and that is exactly where growth has to come from.',
    cta: 'Start the diagnosis',
    cta_sec: 'What the platform does',

    scan_eyebrow: 'A real measurement, 4 September',
    scan_h2: 'We measured a Dutch museum. On seven of twelve questions it did well.',
    scan_p: 'Twelve questions put to an AI answer engine with live search. Questions about the collection, about the city, about opening hours and tickets, and three questions from someone who does not know the museum yet: what can you do with children around this theme, how do you prepare for a museum visit.',
    scan_cijfers: [
      { n: '7 of 12', t: 'times its own site was used as a source, which is a good score' },
      { n: '0 of 3', t: 'questions from someone who did not know the museum named it' },
      { n: 'quiltmuseum.org', t: 'and two other foreign institutions gave those answers' },
    ],
    scan_slot: 'That is the pattern, and it is the opposite of what you would expect. On your name you do fine. On the question from a family looking for a day out around your theme, the answer named a museum in London and one in New York. That group is exactly where visitor growth has to come from, and there you are invisible.',
    scan_cta: 'We run this scan on your institution in fifteen minutes, before you are a client.',

    eerlijk_h2: 'What we do not do here.',
    eerlijk_sub: 'Two things up front, because this page used to say something else, and that was not true.',
    eerlijk: [
      {
        t: 'We do not connect your ticketing system',
        d: 'No integration with your ticketing platform, your donation form or your membership administration. So we do not count which ad sold which ticket. What we do is put your own export or report alongside, with a definition underneath, so the number at least means something.',
      },
      {
        t: 'We do not measure visitors inside the building',
        d: 'No counters, no location data, no QR constructions that follow someone through the galleries. If somebody promises to connect online media to footfall without your point of sale, they are working from assumptions.',
      },
    ],

    wel_h2: 'What we do, and why it matters.',
    wel: [
      {
        t: 'Google Ad Grants by the rules of Google itself',
        d: 'The Grant requires a five percent click-through rate per month at account level, and two consecutive months below that leads to temporary deactivation. Single-word keywords are not allowed, with a few exceptions. We manage the account within those rules and warn you well before you enter the danger zone, instead of finding out once it is already switched off.',
      },
      {
        t: 'The questions of people who do not know you',
        d: 'Where you stand in search results and AI answers on questions that do not contain your name. That is a different list from the one you steer on now, and it is the list new visitors come from. We fix a baseline and measure again, so you can see whether it moves.',
      },
      {
        t: 'See who advertises in your region',
        d: 'The ad registers of Google and Meta are public. Which institutions, attractions and days out advertise in your area, and with what, in the weeks that matter. This works before you are a client.',
      },
      {
        t: 'Season and holidays as context, not noise',
        d: 'Holidays, weather and local events decide more in this sector than a creative choice does. So they belong next to your numbers when you judge whether a campaign worked, not as an excuse afterwards.',
      },
      {
        t: 'One definition, and it stays',
        d: 'What counts as a conversion: a ticket, a reservation, a newsletter signup, and do group bookings count. We agree it, record why, and that agreement stays with the institution, even when the marketer or the agency changes.',
      },
      {
        t: 'Record what you tried',
        d: 'Which campaign, which exhibition, which result, and what you learned. Including the things that did not work. In a sector running on temporary contracts and projects, that is the difference between learning and starting over every time.',
      },
    ],

    canon_eyebrow: 'Why the advice holds',
    canon_h2: 'The canon of your trade sits in the system.',
    canon_sub: 'Under every piece of advice sits a knowledge layer of 105 principles from published research. Three of them hit this sector squarely, as they sit in the system, with their limits.',
    principes: [
      {
        p: 'Reach the whole category buyer: light and occasional visitors deliver a large share of the volume.',
        u: 'Even strong brands draw half their audience from people who come once or twice a year. Growth comes from more new visitors, not from making your friends even more loyal.',
        bron: 'Ehrenberg-Bass',
        grens: 'Does not mean targeting is never useful. With a small, identifiable segment it can be, and membership schemes have a function of their own.',
      },
      {
        p: 'Look for friction before you advise a persuasion campaign.',
        u: 'The real barrier is usually convenience: a ticket flow with too many steps, unclear parking, unclear what is on right now. Making behaviour easier works more often and more cheaply than changing an attitude.',
        bron: 'Core principle 13',
        grens: 'Does not mean communication never shifts an attitude. It means you remove the barrier before shouting over it.',
      },
      {
        p: 'Use social proof with recognisable people and concrete, verifiable numbers.',
        u: 'Evidence people can observe themselves beats claimed popularity, and referents who resemble the visitor work better than an award or a quote from the trade press.',
        bron: 'Keizer et al. 2008',
        grens: 'Does not mean it works equally well everywhere. With people judging on content it weighs less, and generic popularity claims do little.',
      },
    ],

    ervaring_h2: 'Why we know this.',
    ervaring_p1: 'This system was built by someone who spent twenty years on the other side of the invoice, as the founder of an agency. Cultural institutions are always a particular kind of client there: the budget is small, the team is small, and the accountability is large, because public money is often involved.',
    ervaring_p2: 'What stands out: a lot of effort goes into visibility among people who already know the institution, and almost none into the question of someone who was not thinking about it at all. That is not laziness, it is a lack of time and of measurement pointing that way.',
    ervaring_p3: 'So this starts with measuring what happens now, even when the answer is that things are fine, and with recording what you tried so the next person does not start over.',

    slot_h2: 'Start with what is being measured now.',
    slot_sub: 'The diagnosis runs on your own numbers and shows in black and white what holds and what does not. Within two weeks, and you keep the report.',
  },
} as const

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const nl = locale !== 'en'
  return localizedMetadata({
    locale,
    path: '/voor-musea',
    title: nl ? 'Marketing voor musea en cultuur' : 'Marketing for museums and culture',
    description: nl
      ? 'Op je eigen naam vind men je wel. Wij meten waar je staat bij de bezoeker die je nog niet kent, beheren Google Ad Grants binnen de regels, en zeggen erbij wat we niet koppelen.'
      : 'On your own name people find you. We measure where you stand with the visitor who does not know you yet, manage Google Ad Grants within the rules, and say what we do not connect.',
  })
}

export default async function MuseaPage({ params }: Props) {
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

      <DeskProof locale={locale} melding="hittegolf" />

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
