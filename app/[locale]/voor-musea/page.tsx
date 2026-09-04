import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { localizedMetadata } from '@/lib/seo'
import VoorWiePage, { type VoorWieCopy } from '@/components/VoorWiePage'

type Props = { params: Promise<{ locale: string }> }

// Herbouwd 4 sep 2026, herschreven 5 sep (W-042). Opbouw: components/VoorWiePage.tsx.
// Het "11 mln euro ticketomzet" dat hier stond klopt wel (Koen, 5 sep), maar
// hoort hier niet: een museum met een ton marketingbudget herkent zich niet in
// een evenement van die schaal, en het zegt niets over wat wij voor dat museum
// doen. Niet terugzetten.
// De oude koppelingsclaims (Tickitto, See Tickets, Stager, Eventbrite,
// WhyDonate, DonorPerfect, GeefGratis, QR- en locatiedata) bestaan niet in de
// code: docs/research/SITE_CLAIMS_AUDIT_2026-09-04.md, sectie 2.
// De meting is echt gedraaid op 4 sep op een Nederlands museum:
// docs/research/vindbaarheidsscans/textielmuseum-nl-2026-09-04.json, 12 vragen,
// alle 12 met web-search actief. Uitkomst was grotendeels goed en dat staat er
// ook zo. Museum niet bij naam: geen klant.
// Ad Grants-regels van Google zelf, nagekeken 4 sep 2026 op
// support.google.com/nonprofits (artikelen 117827 en 9314402): 5 procent CTR per
// maand op accountniveau, twee maanden onder elkaar is tijdelijke deactivatie,
// losse woorden als zoekwoord niet toegestaan op enkele uitzonderingen na.
// Principes woordelijk uit de kennislaag: kern 9, kern 13, kern 17.

const COPY: Record<'nl' | 'en', VoorWieCopy> = {
  nl: {
    eyebrow: 'Voor musea en cultuur',
    h1_line: 'Wie je kent, vindt je.',
    h1_accent: 'Wie je nog niet kent, vindt een ander.',
    sub: 'Je groei zit bij de bezoeker die nog niet aan je dacht. Wij meten waar je staat op de vragen van die bezoeker, en houden je Google Ad Grant binnen de regels, met een klein team en een klein budget.',
    cta: 'Vraag de gratis scan aan',
    cta_reason: 'Een kwartier werk aan onze kant, geen verplichting. Je ziet meteen op welke vragen van een nieuwe bezoeker jouw instelling ontbreekt.',
    cta_sec: 'Bekijk de tarieven',

    scan_eyebrow: 'Gemeten op 4 september',
    scan_h2: 'We maten een Nederlands museum. Op de vragen van wie het kende ging het goed. Op de rest niet.',
    scan_p: 'Twaalf vragen aan een AI met live zoekresultaten. Over de collectie, de stad, openingstijden en tickets. En drie vragen van iemand die het museum nog niet kent: wat doe je met kinderen rond dit thema, hoe bereid je zo\'n bezoek voor.',
    scan_cijfers: [
      { n: '7 van 12', t: 'keer was de eigen site een bron. Een goede score.' },
      { n: '0 van 3', t: 'vragen van een nieuwe bezoeker noemde het museum' },
      { n: 'quiltmuseum.org', t: 'en twee andere buitenlandse sites gaven die antwoorden' },
    ],
    scan_slot: 'Op de vraag van een gezin dat een dagje uit zoekt rond jouw thema stond een museum in Londen en een in New York. Niet jij. Die groep is waar je bezoekersgroei vandaan moet komen, en daar ben je onzichtbaar terwijl je op je eigen naam prima scoort.',

    kost_h2: 'Elke campagne die op je eigen naam mikt, betaalt voor bezoekers die toch al kwamen.',
    kost_p: 'Een klein team stuurt op wat het ziet: de naam, de tentoonstelling, de vrienden. De vraag van iemand die nog nergens aan dacht ziet niemand, dus daar gaat geen budget heen. Ondertussen loopt het Ad Grant risico zonder dat iemand ernaar kijkt.',
    kost_uitweg: 'De scan laat in een kwartier zien welke vragen je mist. Daarna beslis jij.',

    eerlijk_h2: 'Twee dingen die wij niet doen.',
    eerlijk: [
      { t: 'Wij koppelen je ticketsysteem niet', d: 'Geen koppeling met je ticketplatform, donatieformulier of ledenadministratie. Wij tellen dus niet welke advertentie welk kaartje verkocht. Wij leggen je eigen export ernaast, met een definitie eronder, zodat het cijfer een betekenis heeft.' },
      { t: 'Wij meten geen bezoekers in het gebouw', d: 'Geen tellers, geen locatiedata, geen QR-constructies. Wie belooft dat hij online media aan bezoek in het pand koppelt zonder je kassasysteem, rekent met aannames.' },
    ],

    krijg_h2: 'Wat je wel krijgt.',
    krijg: [
      { t: 'De vragen van wie je nog niet kent', d: 'Waar je staat in zoekresultaten en AI-antwoorden op vragen zonder jouw naam erin. Een andere lijst dan waar je nu op stuurt, en de lijst waar nieuwe bezoekers vandaan komen. Nulmeting vast, over negentig dagen opnieuw.' },
      { t: 'Ad Grants binnen de regels van Google', d: 'Vijf procent doorklikratio per maand op accountniveau, twee maanden eronder is tijdelijke deactivatie, geen losse woorden als zoekwoord. Wij beheren het daarbinnen en waarschuwen ruim voor de gevarenzone.' },
      { t: 'Seizoen naast je cijfers', d: 'Vakanties, weer en lokale evenementen bepalen hier meer dan een creatieve keuze. Ze staan naast je cijfers als je beoordeelt of een campagne werkte, niet als excuus achteraf.' },
    ],

    canon_h2: 'Waarom ons advies klopt.',
    canon_sub: 'Onder elk advies ligt een kennislaag van 105 principes uit gepubliceerd onderzoek. Drie ervan, zoals ze in het systeem staan, met hun grens erbij.',
    principes: [
      { p: 'Bereik de hele categoriekoper: lichte en incidentele bezoekers leveren een groot deel van het volume.', u: 'Zelfs sterke merken halen de helft van hun kopers uit mensen die een of twee keer per jaar kopen. Dat onderzoek komt uit de supermarkt, maar het patroon is hetzelfde: groei komt van de dagjesmens, niet van je vrienden nog loyaler maken.', bron: 'Ehrenberg-Bass', grens: 'Betekent niet dat targeting nooit zinvol is, en vriendenwerving heeft een eigen functie.' },
      { p: 'Zoek eerst de frictie voordat je een overtuigingscampagne adviseert.', u: 'De echte drempel is meestal gemak: een ticketflow met te veel stappen, onduidelijk parkeren, onduidelijk wat er nu te zien is. Gedrag makkelijker maken werkt vaker en goedkoper dan een houding veranderen.', bron: 'Praktijkprincipe uit de kennislaag', grens: 'Betekent niet dat communicatie nooit een houding raakt. Wel dat je de drempel eerst wegneemt.' },
      { p: 'Zet sociaal bewijs in met herkenbare mensen en controleerbare aantallen.', u: 'Bewijs dat mensen zelf kunnen waarnemen verslaat geclaimde populariteit. Een gezin dat op de bezoeker lijkt werkt beter dan een prijs of een citaat uit de vakpers.', bron: 'Keizer et al. 2008', grens: 'Betekent niet dat het overal even sterk werkt. Bij wie op inhoud beoordeelt weegt het zwakker.' },
    ],

    waarom_h2: 'Waarom wij dit weten.',
    waarom_p1: 'Gebouwd door iemand die twintig jaar aan de andere kant van de factuur zat, als oprichter van een bureau. Niet in de cultuursector, dat zeggen we er eerlijk bij. Wat overal hetzelfde is: een klein team, een klein budget en een grote verantwoording.',
    waarom_p2: 'Wat in gesprekken met instellingen opvalt: er wordt hard gewerkt aan zichtbaarheid bij wie je al kent, en bijna niets aan de vraag van wie nog nergens aan dacht. Geen luiheid, een gebrek aan tijd en aan meting die die kant op kijkt.',

    faq_h2: 'Wat instellingen ons eerst vragen.',
    faqs: [
      { question: 'Ons Ad Grant is al eens gepauzeerd. Is dat te herstellen?', answer: 'Ja. Google heeft daar een vaste route voor: de oorzaak wegnemen, meestal zoekwoorden met veel vertoningen en weinig kliks pauzeren, en dan heractivering aanvragen. Wij doen dat met je, en zorgen dat het daarna niet opnieuw gebeurt.' },
      { question: 'Wat als uit de scan blijkt dat het goed zit?', answer: 'Dan zeggen we dat. Het museum hierboven kwam er op de eigen naam goed uit, en dat staat gewoon op deze pagina. Een scan die alleen slecht nieuws mag opleveren is geen meting.' },
      { question: 'Wat kost het?', answer: 'De scan is gratis. Daarna kies je: alleen meekijken vanaf 399 per maand, of de volledige diagnose op je eigen cijfers. Je houdt het rapport, ook als je daarna niets met ons doet.' },
    ],

    slot_h2: 'Begin met de scan.',
    slot_sub: 'Een kwartier. Geen toegang tot je accounts nodig. Je ziet op welke vragen van een nieuwe bezoeker je ontbreekt, en wie daar wel staat.',
  },
  en: {
    eyebrow: 'For museums and culture',
    h1_line: 'People who know you, find you.',
    h1_accent: 'People who do not, find someone else.',
    sub: 'Your growth sits with the visitor who was not thinking of you yet. We measure where you stand on that visitor\'s questions, and keep your Google Ad Grant within the rules, with a small team and a small budget.',
    cta: 'Request the free scan',
    cta_reason: 'Fifteen minutes of work on our side, no commitment. You see straight away which new-visitor questions your institution is missing from.',
    cta_sec: 'See pricing',

    scan_eyebrow: 'Measured on 4 September',
    scan_h2: 'We measured a Dutch museum. On questions from people who knew it, it did well. On the rest, it did not.',
    scan_p: 'Twelve questions put to an AI with live search. About the collection, the city, opening hours and tickets. And three questions from someone who does not know the museum yet: what to do with children around this theme, how to prepare for such a visit.',
    scan_cijfers: [
      { n: '7 of 12', t: 'times its own site was a source. A good score.' },
      { n: '0 of 3', t: 'new-visitor questions named the museum' },
      { n: 'quiltmuseum.org', t: 'and two other foreign sites gave those answers' },
    ],
    scan_slot: 'On the question from a family looking for a day out around your theme, the answer named a museum in London and one in New York. Not you. That group is where your visitor growth has to come from, and there you are invisible while you score fine on your own name.',

    kost_h2: 'Every campaign aimed at your own name pays for visitors who were coming anyway.',
    kost_p: 'A small team steers on what it sees: the name, the exhibition, the friends. Nobody sees the question of someone who was not thinking about it yet, so no budget goes there. Meanwhile the Ad Grant runs its risk with nobody watching.',
    kost_uitweg: 'The scan shows in fifteen minutes which questions you are missing. Then you decide.',

    eerlijk_h2: 'Two things we do not do.',
    eerlijk: [
      { t: 'We do not connect your ticketing system', d: 'No integration with your ticketing platform, donation form or membership records. So we do not count which ad sold which ticket. We put your own export alongside, with a definition underneath, so the number means something.' },
      { t: 'We do not measure visitors inside the building', d: 'No counters, no location data, no QR constructions. Anyone promising to connect online media to footfall without your point of sale is working from assumptions.' },
    ],

    krijg_h2: 'What you do get.',
    krijg: [
      { t: 'The questions of people who do not know you', d: 'Where you stand in search results and AI answers on questions without your name in them. A different list from the one you steer on now, and the list new visitors come from. Baseline fixed, measured again in ninety days.' },
      { t: 'Ad Grants within the rules of Google', d: 'Five percent click-through rate per month at account level, two months below means temporary deactivation, no single-word keywords. We manage within that and warn you well before the danger zone.' },
      { t: 'Season next to your numbers', d: 'Holidays, weather and local events decide more here than a creative choice. They sit next to your numbers when you judge whether a campaign worked, not as an excuse afterwards.' },
    ],

    canon_h2: 'Why the advice holds.',
    canon_sub: 'Under every piece of advice sits a knowledge layer of 105 principles from published research. Three of them, as they sit in the system, with their limits.',
    principes: [
      { p: 'Reach the whole category buyer: light and occasional visitors deliver a large share of the volume.', u: 'Even strong brands draw half their buyers from people who buy once or twice a year. That research comes from the supermarket, but the pattern is the same: growth comes from the day-tripper, not from making your friends even more loyal.', bron: 'Ehrenberg-Bass', grens: 'Does not mean targeting is never useful, and membership schemes have a function of their own.' },
      { p: 'Look for friction before you advise a persuasion campaign.', u: 'The real barrier is usually convenience: a ticket flow with too many steps, unclear parking, unclear what is on right now. Making behaviour easier works more often and more cheaply than changing an attitude.', bron: 'Practice principle from the knowledge layer', grens: 'Does not mean communication never shifts an attitude. It means you remove the barrier first.' },
      { p: 'Use social proof with recognisable people and verifiable numbers.', u: 'Evidence people can observe themselves beats claimed popularity. A family that resembles the visitor works better than an award or a quote from the trade press.', bron: 'Keizer et al. 2008', grens: 'Does not mean it works equally well everywhere. With people judging on content it weighs less.' },
    ],

    waarom_h2: 'Why we know this.',
    waarom_p1: 'Built by someone who spent twenty years on the other side of the invoice, as the founder of an agency. Not in the cultural sector, and we say so plainly. What is the same everywhere: a small team, a small budget and a large accountability.',
    waarom_p2: 'What stands out in conversations with institutions: a lot of effort goes into visibility among people who already know you, and almost none into the question of someone who was not thinking about it. Not laziness, a lack of time and of measurement pointing that way.',

    faq_h2: 'What institutions ask us first.',
    faqs: [
      { question: 'Our Ad Grant was paused once. Can that be repaired?', answer: 'Yes. Google has a fixed route for it: remove the cause, usually by pausing keywords with many impressions and few clicks, then request reactivation. We do that with you, and make sure it does not happen again.' },
      { question: 'What if the scan shows everything is fine?', answer: 'Then we say so. The museum above came out well on its own name, and that is what this page says. A scan that may only deliver bad news is not a measurement.' },
      { question: 'What does it cost?', answer: 'The scan is free. After that you choose: monitoring only from 399 a month, or the full diagnosis on your own numbers. You keep the report, even if you do nothing further with us.' },
    ],

    slot_h2: 'Start with the scan.',
    slot_sub: 'Fifteen minutes. No access to your accounts needed. You see which new-visitor questions you are missing from, and who is there instead.',
  },
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const nl = locale !== 'en'
  return localizedMetadata({
    locale,
    path: '/voor-musea',
    title: nl ? 'Marketing voor musea en cultuur' : 'Marketing for museums and culture',
    description: nl
      ? 'Wie je kent, vindt je. Wie je nog niet kent, vindt een ander. Gratis scan in een kwartier op de vragen van een nieuwe bezoeker, en Google Ad Grants binnen de regels.'
      : 'People who know you find you. People who do not, find someone else. Free scan in fifteen minutes on new-visitor questions, and Google Ad Grants within the rules.',
  })
}

export default async function MuseaPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  return <VoorWiePage locale={locale} c={locale === 'en' ? COPY.en : COPY.nl} melding="hittegolf" />
}
