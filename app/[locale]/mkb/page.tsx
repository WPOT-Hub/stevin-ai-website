import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { localizedMetadata } from '@/lib/seo'
import VoorWiePage, { type VoorWieCopy } from '@/components/VoorWiePage'

type Props = { params: Promise<{ locale: string }> }

// Herbouwd 4 sep 2026, herschreven 5 sep (W-042). Opbouw: components/VoorWiePage.tsx.
// Weg omdat het niet bestaat: "een appje wordt een offerte" (Stevin Quote is
// MISSING) en "een site die zichzelf aanpast" (reviews staan met de hand in
// TypeScript). Zie docs/research/SITE_CLAIMS_AUDIT_2026-09-04.md.
// Wat wel bestaat: negen sites in drie weken voor vakmensen in de regio Breda;
// inbound via src/core/crm/inboundResolve.ts; opvolgconcept via
// src/core/crm/conceptGenerator.ts, verzenden na akkoord.
// Meting echt gedraaid 4 sep op een installatiebedrijf regio Breda:
// docs/research/vindbaarheidsscans/vanwanrooijinstallatie-nl-2026-09-04.json,
// 12 vragen, alle 12 met web-search actief. Niet bij naam: geen klant.
// De quote over 1.100 euro aan leads komt uit een echt diagnosegesprek
// (staat ook op /voor-ondernemers). Principes: kern 13, gw-04, kern 16.

const COPY: Record<'nl' | 'en', VoorWieCopy> = {
  nl: {
    eyebrow: 'Voor MKB en vakmensen',
    h1_line: 'Je werk is goed.',
    h1_accent: 'Alleen verdient een leadsite aan de vraag ernaar.',
    sub: 'Wie een betrouwbare installateur zoekt, krijgt een platform dat jouw aanvraag aan vijf bedrijven doorverkoopt. Wij zorgen dat die vraag bij jou uitkomt, op een site die van jou is.',
    cta: 'Vraag de gratis scan aan',
    cta_reason: 'Een kwartier werk aan onze kant, geen verplichting. Je ziet meteen op welke vragen van je klanten jij ontbreekt, en wie daar wel staat.',
    cta_sec: 'Bekijk de websites',

    scan_eyebrow: 'Gemeten op 4 september',
    scan_h2: 'We vroegen een AI hoe je een betrouwbare installateur vindt. Er kwamen alleen leadsites terug.',
    scan_p: 'Twaalf vragen aan een AI met live zoekresultaten, over een installatiebedrijf in de regio Breda. Zoals een klant ze stelt: wie doet goede cv-installaties hier, wat kost een warmtepomp, wie kan snel komen voor een kapotte ketel.',
    scan_cijfers: [
      { n: '0 van 12', t: 'keer was de site van het bedrijf een bron' },
      { n: '1 van 12', t: 'vragen noemde het bedrijf: de vraag met de naam erin' },
      { n: 'werkspot, solvari', t: 'en twee andere leadplatformen kregen de vraag over betrouwbaarheid' },
    ],
    scan_slot: 'Buurtbedrijven stonden er wel. En verder de platformen die jouw aanvragen doorverkopen. De vraag die er echt toe doet, wie is te vertrouwen, is dus al eigendom van een partij die daar per lead aan verdient. Geen pech, geen algoritme dat je tegenwerkt. Een pagina die er niet staat.',

    kost_h2: '"Elfhonderd euro aan gekochte leads. Nul opdrachten."',
    kost_p: 'Dat zei een installateur in een diagnosegesprek. Een leadplatform verkoopt dezelfde aanvraag aan vijf bedrijven, en volgend jaar betaal je opnieuw, want je hebt niets opgebouwd. Elke maand zonder eigen vindbaarheid is een maand huur betalen voor je eigen klanten.',
    kost_uitweg: 'De scan laat in een kwartier zien welke vragen je mist. Daarna beslis jij.',

    eerlijk_h2: 'Twee dingen die wij niet doen.',
    eerlijk: [
      { t: 'Wij maken geen offertes voor je', d: 'Er staat geen machine klaar die van een foto en een appje een prijsopgave maakt. Wie het je wel belooft, laat jou het rekenwerk alsnog nakijken. Wij leggen de aanvraag vast en zetten het opvolgbericht klaar, zodat het niet twee dagen blijft liggen.' },
      { t: 'Je site houdt zichzelf niet bij', d: 'Wij bouwen en onderhouden hem, en dat is mensenwerk. Geen knop die je site aan het seizoen aanpast. Wel een site die van jou is, op je eigen domein, en niet stilstaat omdat wij hem bijhouden.' },
    ],

    krijg_h2: 'Wat je wel krijgt.',
    krijg: [
      { t: 'Een site die van jou is', d: 'Op je eigen domein, klaar in dagen, met je echte projecten en beoordelingen. Negen vakmensen in de regio Breda kregen er zo een in drie weken. Stop je met ons, dan houd je de site en het domein.' },
      { t: 'De vragen die je klanten stellen', d: 'Niet je bedrijfsnaam, maar de vraag ervoor: wie kan snel komen, wat kost het ongeveer, waar let ik op. Daar zitten nu leadplatformen op. Nulmeting vast, over negentig dagen opnieuw.' },
      { t: 'Opvolging klaar, jij drukt op verzenden', d: 'WhatsApp, mail en je formulier komen op een plek binnen. Het opvolgbericht ligt klaar met wat er besproken is. Er gaat nooit iets naar je klant zonder dat jij het gezien hebt.' },
    ],

    canon_h2: 'Geen onderbuik, maar onderzoek.',
    canon_sub: 'Onder elk advies ligt een kennislaag van 105 principes uit gepubliceerd onderzoek. Drie ervan gaan recht over jouw situatie, met hun grens erbij.',
    principes: [
      { p: 'Haal eerst de drempel weg voordat je harder gaat overtuigen.', u: 'De reden dat iemand niet belt is meestal gemak: een lang formulier, geen prijsindicatie, onduidelijk wanneer je kunt komen. Dat oplossen werkt vaker en goedkoper dan een campagne.', bron: 'Praktijkprincipe uit de kennislaag', grens: 'Betekent niet dat je nooit hoeft te vertellen wat je goed doet. Wel dat bellen eerst makkelijk moet zijn.' },
      { p: 'Laat je klanten zeggen wat je zelf niet geloofwaardig kunt zeggen.', u: 'Dezelfde zin overtuigt een veelvoud beter uit de mond van iemand zonder eigen belang die op de lezer lijkt. Een buurman met hetzelfde huis verslaat je eigen reclametekst.', bron: 'Hovland en Weiss 1953', grens: 'Betekent niet dat het argument er niet toe doet. De bron is een vermenigvuldiger, en een keurmerk zonder uitleg doet niets.' },
      { p: 'Bouw elke uiting rond een kernbelofte.', u: 'Elk extra voordeel verzwakt de geloofwaardigheid van je hoofdvoordeel. Zet een ding centraal en verplaats de rest naar de onderbouwing.', bron: 'Zhang en Fishbach 2007', grens: 'Betekent niet dat je maar een ding mag doen. Je mag alles aanbieden, je moet alleen niet alles tegelijk roepen.' },
    ],

    waarom_h2: 'Waarom wij dit weten.',
    waarom_p1: 'Gebouwd door iemand met twintig jaar online marketing en een eigen bureau. De bedrijven waar dit voor bedoeld is, zijn precies de bedrijven die zo\'n bureau meestal niet kunnen betalen.',
    waarom_p2: 'Daarom begint dit bij je eigen site, je eigen vindbaarheid en je eigen aanvragen. Alles wat je opbouwt blijft van jou, ook als je met ons stopt.',

    faq_h2: 'Wat vakmensen ons eerst vragen.',
    faqs: [
      { question: 'Moet ik hier technisch voor zijn?', answer: 'Nee. Jij appt en belt zoals altijd. Wij bouwen de site, houden hem bij en zetten de opvolging klaar. Jij leest en drukt op verzenden.' },
      { question: 'Ik sta al op Werkspot. Waarom nog een eigen site?', answer: 'Omdat Werkspot jouw aanvraag aan vier concurrenten doorverkoopt en volgend jaar opnieuw factureert. Een eigen site bouwt op: elke beoordeling en elk project maakt je beter vindbaar, en dat blijft van jou.' },
      { question: 'Wat kost het?', answer: 'De scan is gratis. Een site is een vast bedrag, de opvolging een abonnement. We kijken samen wat bij je bedrijf past, en je houdt de site en het domein als je stopt.' },
    ],

    slot_h2: 'Begin met de scan.',
    slot_sub: 'Een kwartier. Je hoeft niets aan te leveren. Je ziet op welke vragen van je klanten jij ontbreekt, en wie daar nu aan verdient.',
  },
  en: {
    eyebrow: 'For small businesses and trades',
    h1_line: 'Your work is good.',
    h1_accent: 'It is just that a lead site earns on the demand for it.',
    sub: 'Someone looking for a reliable installer gets a platform that resells your enquiry to five companies. We make sure that question lands with you, on a site that is yours.',
    cta: 'Request the free scan',
    cta_reason: 'Fifteen minutes of work on our side, no commitment. You see straight away which customer questions you are missing from, and who is there instead.',
    cta_sec: 'See the websites',

    scan_eyebrow: 'Measured on 4 September',
    scan_h2: 'We asked an AI how to find a reliable heating engineer. Only lead sites came back.',
    scan_p: 'Twelve questions put to an AI with live search, about an installation company near Breda. The way a customer asks: who does good boiler installations here, what does a heat pump cost, who can come quickly for a broken boiler.',
    scan_cijfers: [
      { n: '0 of 12', t: 'times the company site was a source' },
      { n: '1 of 12', t: 'questions named the company: the one with its name in it' },
      { n: 'werkspot, solvari', t: 'and two other lead platforms got the question about reliability' },
    ],
    scan_slot: 'Local competitors were there. And beyond them, the platforms that resell your enquiries. The question that really matters, who can be trusted, is already owned by a party earning per lead on it. Not bad luck, not an algorithm working against you. A page that does not exist.',

    kost_h2: '"Eleven hundred euros on bought leads. Zero jobs."',
    kost_p: 'An installer said that in a diagnosis conversation. A lead platform sells the same enquiry to five companies, and next year you pay again, because you built nothing. Every month without your own visibility is a month paying rent for your own customers.',
    kost_uitweg: 'The scan shows in fifteen minutes which questions you are missing. Then you decide.',

    eerlijk_h2: 'Two things we do not do.',
    eerlijk: [
      { t: 'We do not write your quotes', d: 'There is no machine that turns a photo and a text message into a price. Anyone promising it still leaves you to check the sums. We capture the enquiry and prepare the follow-up, so it does not sit for two days.' },
      { t: 'Your site does not maintain itself', d: 'We build and maintain it, and that is human work. No switch that adapts your site to the season. What you get is a site that is yours, on your own domain, that does not go stale because we keep it up.' },
    ],

    krijg_h2: 'What you do get.',
    krijg: [
      { t: 'A site that is yours', d: 'On your own domain, ready in days, with your real projects and reviews. Nine tradespeople near Breda got one that way in three weeks. If you stop, you keep the site and the domain.' },
      { t: 'The questions your customers ask', d: 'Not your company name, but the question before it: who can come quickly, what does it roughly cost, what should I watch for. Lead platforms sit on those today. Baseline fixed, measured again in ninety days.' },
      { t: 'Follow-up ready, you press send', d: 'WhatsApp, email and your form arrive in one place. The follow-up is prepared with what was discussed. Nothing ever goes to your customer without you seeing it.' },
    ],

    canon_h2: 'Not a hunch, but research.',
    canon_sub: 'Under every piece of advice sits a knowledge layer of 105 principles from published research. Three of them speak directly to your situation, with their limits.',
    principes: [
      { p: 'Remove the barrier before you try harder to persuade.', u: 'The reason someone does not call is usually convenience: a long form, no price indication, unclear when you could come. Fixing that works more often and more cheaply than a campaign.', bron: 'Practice principle from the knowledge layer', grens: 'Does not mean you never need to say what you are good at. It means calling has to be easy first.' },
      { p: 'Let your customers say what you cannot credibly say yourself.', u: 'The same sentence persuades far better from someone with no stake who resembles the reader. A neighbour with the same house beats your own advertising copy.', bron: 'Hovland and Weiss 1953', grens: 'Does not mean the argument does not matter. The source is a multiplier, and an unexplained certification does nothing.' },
      { p: 'Build every message around one core promise.', u: 'Every extra benefit weakens the credibility of the main one. Put one thing at the centre and move the rest into the evidence.', bron: 'Zhang and Fishbach 2007', grens: 'Does not mean you may only do one thing. Offer everything; just do not shout all of it at once.' },
    ],

    waarom_h2: 'Why we know this.',
    waarom_p1: 'Built by someone with twenty years in online marketing and an agency of their own. The businesses this is meant for are exactly the ones that usually cannot afford such an agency.',
    waarom_p2: 'So this starts with your own site, your own visibility and your own enquiries. Everything you build stays yours, including when you stop working with us.',

    faq_h2: 'What tradespeople ask us first.',
    faqs: [
      { question: 'Do I need to be technical for this?', answer: 'No. You text and call as you always do. We build the site, keep it up and prepare the follow-up. You read and press send.' },
      { question: 'I am already on a lead platform. Why a site of my own?', answer: 'Because the platform resells your enquiry to four competitors and invoices you again next year. Your own site builds up: every review and every project makes you easier to find, and that stays yours.' },
      { question: 'What does it cost?', answer: 'The scan is free. A site is a fixed amount, the follow-up a subscription. We look together at what fits your business, and you keep the site and the domain if you stop.' },
    ],

    slot_h2: 'Start with the scan.',
    slot_sub: 'Fifteen minutes. You do not need to supply anything. You see which customer questions you are missing from, and who is earning on them now.',
  },
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const nl = locale !== 'en'
  return localizedMetadata({
    locale,
    path: '/mkb',
    title: nl ? 'Marketing voor MKB en vakmensen' : 'Marketing for small businesses and trades',
    description: nl
      ? 'Je werk is goed, alleen verdient een leadsite aan de vraag ernaar. Gratis scan in een kwartier: op welke vragen van je klanten ontbreek jij, en wie staat daar wel.'
      : 'Your work is good, it is just that a lead site earns on the demand for it. Free scan in fifteen minutes: which customer questions you are missing from, and who is there instead.',
  })
}

export default async function MkbPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  return <VoorWiePage locale={locale} c={locale === 'en' ? COPY.en : COPY.nl} melding="hittegolf" secHref="/websites" />
}
