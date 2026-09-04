import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { localizedMetadata } from '@/lib/seo'
import VoorWiePage, { type VoorWieCopy } from '@/components/VoorWiePage'

type Props = { params: Promise<{ locale: string }> }

// Nieuw 5 sep 2026 (W-042). Opbouw: components/VoorWiePage.tsx. Een van drie
// cultuurpagina's (/musea, /podia, /evenementen); /cultuur verdeelt.
//
// Meting: vindbaarheidsscan op een stadstheater in Brabant, gedraaid in de
// nacht van 4 op 5 sep met src/scripts/vindbaarheidsscan.ts. Ruwe uitkomst:
// docs/research/vindbaarheidsscans/chasse-nl-2026-09-04.json in Stevin-Hub
// (tweede run; de eerste viel terug op sjabloonvragen en was onbruikbaar).
// Het theater wordt niet bij naam genoemd: geen klant.
//
// Bio: Koen deed bij Addurance in 2019 de intake voor het jaarplan van een
// concertzaal in Vlaanderen (Koen laatste bewerker van het gespreksverslag).
// Het patroon op deze pagina komt daar letterlijk vandaan: ticketsysteem met
// loyaliteitslabels (nieuw, occasioneel, frequent, slaper, afhaker) zonder
// uitgetekende flow, jong publiek grootste deel van het bezoek maar 65-plus
// beter in conversie, retargeting op bestaand publiek als best lopende
// campagne, Ad Grant uitgezet omdat het "minder presteerde op commerciele
// uitingen", piek bij de seizoenslancering. Geen namen: werk van dat bureau
// voor die klant. Datzelfde gesprek loopt nu opnieuw (memory
// koen-cultuursector-ervaring).
// Principes woordelijk uit de kennislaag: kern 8 (penetratie), kern 3
// (conversiecyclus), merk-effect over loyaliteitsprogramma's.

const COPY: Record<'nl' | 'en', VoorWieCopy> = {
  nl: {
    eyebrow: 'Voor podia en concertzalen',
    h1_line: 'Je ticketsysteem weet wie een slaper is.',
    h1_accent: 'Je campagne niet.',
    sub: 'Honderden voorstellingen per seizoen, elk met een eigen campagne, en een systeem vol labels waar niemand op stuurt. Wij zetten de verkoop per titel naast de vraag per titel, en zorgen dat het volgende seizoen begint met wat dit seizoen leerde.',
    cta: 'Vraag de gratis scan aan',
    cta_reason: 'Een kwartier werk aan onze kant, geen verplichting. Je ziet meteen op welke vragen van iemand die een avond uit zoekt jouw zaal ontbreekt.',
    cta_sec: 'Bekijk de tarieven',

    scan_eyebrow: 'Gemeten in de nacht van 4 september',
    scan_h2: 'We maten een stadstheater. Op de specifieke vragen won het. Op de brede vraag naar zijn eigen vak niet.',
    scan_p: 'Zeven vragen aan een AI met live zoekresultaten, over een stadstheater in Brabant. Welk theater is goed voor gezinnen, waar kun je workshops volgen, wat kost een avond uit, welke zaal past bij een schooluitje. En de brede vraag: welk theater in deze stad voor cabaret, musical en toneel.',
    scan_cijfers: [
      { n: '4 van 7', t: 'keer was de eigen site een bron: gezinnen, workshops, prijzen, scholen' },
      { n: '0 van 2', t: 'keer op de brede vraag naar cabaret, musical en toneel, het eigen vak' },
      { n: 'explorebreda', t: 'en visitbreda beantwoordden de vraag wat het theater uniek maakt' },
    ],
    scan_slot: 'Dat is het patroon bij een goed geprogrammeerd podium: op de specifieke vraag sta je er, op de vraag van iemand die gewoon een avond uit zoekt niet, en wie je bent vertelt de toeristensite van je stad in jouw plaats. Precies de bezoeker die je nog niet kent, en precies het verhaal dat je zelf zou willen vertellen.',

    kost_h2: 'Elke titel krijgt een nieuwe campagne, en elke campagne begint bij nul.',
    kost_p: 'De voorstelling die niet loopt krijgt extra budget in de laatste week, de voorstelling die vanzelf verkoopt krijgt hetzelfde plan als altijd. Wat vorig seizoen bij dezelfde titel werkte, weet niemand meer. Zo betaal je elk seizoen opnieuw voor dezelfde les.',
    kost_uitweg: 'De scan laat in een kwartier zien welke vragen je mist. Daarna beslis jij.',

    eerlijk_h2: 'Twee dingen die wij niet doen.',
    eerlijk: [
      { t: 'Wij koppelen je ticketsysteem niet', d: 'Geen koppeling met je ticketplatform of je CRM. Wij lezen je export: verkoop per titel per dag, en de labels die je systeem al bijhoudt. Dat is genoeg om op te sturen, en eerlijker dan doen alsof we in je kassa kijken.' },
      { t: 'Wij programmeren niet mee', d: 'Welke voorstelling je boekt is jouw vak. Wij zeggen niet wat er op het podium moet, wij zeggen wat de vraag per titel doet en waar het budget nu moet zitten.' },
    ],

    krijg_h2: 'Wat je wel krijgt.',
    krijg: [
      { t: 'Per titel: verkoop naast vraag', d: 'Hoeveel er verkocht is, hoeveel er gezocht wordt, en hoe die twee zich verhouden, per voorstelling. Een titel met veel vraag en weinig verkoop is een ander probleem dan een titel waar niemand naar zoekt, en het plan hoort dat te weten.' },
      { t: 'De labels die je al hebt, in de campagne', d: 'Nieuw, frequent, slaper, afhaker: je systeem kent ze, je advertenties niet. Wij zorgen dat de slaper een ander aanbod ziet dan de vaste bezoeker, en meten of hij terugkomt.' },
      { t: 'Een geheugen van seizoen naar seizoen', d: 'Wat deze titel vorig jaar deed, wat het kostte, wat je ervan leerde. Ook wat niet werkte. Zodat de seizoenslancering niet elk jaar een nieuw experiment is.' },
    ],

    canon_h2: 'Waarom ons advies klopt.',
    canon_sub: 'Onder elk advies ligt een kennislaag van 105 principes uit gepubliceerd onderzoek. Drie ervan gaan over precies dit vak, zoals ze in het systeem staan, met hun grens erbij.',
    principes: [
      { p: 'Groei komt primair van meer nieuwe bezoekers, niet van bestaande bezoekers loyaler maken.', u: 'Merken van gelijke grootte hebben vrijwel gelijke loyaliteit. Wie groeit, groeit door meer mensen te bereiken die nog niet kwamen. Voor een zaal: de stad in, niet alleen de nieuwsbrief.', bron: 'Ehrenberg-Bass', grens: 'Betekent niet dat je vaste publiek er niet toe doet. Het is je eerste week bij elke lancering, alleen niet je groei.' },
      { p: 'Wees kritisch op loyaliteitsprogramma\'s als groeistrategie.', u: 'Aanmelders zijn klanten die je al had. Een vriendenkring of abonnement houdt vast, maar haalt zelden iemand binnen die anders niet kwam.', bron: 'Ehrenberg-Bass', grens: 'Betekent niet dat je ze moet afschaffen. Ze horen alleen niet in het groeiplan, maar in het behoudplan.' },
      { p: 'Beoordeel resultaten pas na een volledige conversiecyclus.', u: 'Kosten zijn direct compleet, kaartjes druppelen na. Wie een campagne na een week afrekent, rekent het publiek af dat pas de week voor de voorstelling beslist.', bron: 'Praktijkprincipe uit de kennislaag', grens: 'Betekent niet dat je wacht tot de avond zelf. De zoekvraag en de kostenkant zie je meteen.' },
    ],

    waarom_h2: 'Waarom wij dit weten.',
    waarom_p1: 'Gebouwd door iemand die twintig jaar aan de andere kant van de factuur zat, als oprichter van een bureau, en daar het jaarplan uitwerkte voor een concertzaal. Het beeld uit dat gesprek: een ticketsysteem dat elke bezoeker al een label gaf, van nieuw tot afhaker, en niemand die de route van eerste kaartje naar vaste bezoeker kon uittekenen.',
    waarom_p2: 'In de cijfers stond het al: het jonge publiek was het grootste deel van het bezoek, de conversie zat bij 65-plus, en de campagne die het beste liep was de retargeting op wie al geweest was. Alles wees naar de bezoeker die je al kent. Daarom begint dit bij de vraag per titel, bij de labels die je al hebt, en bij een geheugen dat het seizoen overleeft.',

    faq_h2: 'Wat podia ons eerst vragen.',
    faqs: [
      { question: 'Wij hebben een bureau voor de campagnes per voorstelling. Kan dit ernaast?', answer: 'Ja. Wij nemen geen campagnes over en veranderen niets in accounts. Wij zetten verkoop en vraag per titel naast elkaar en leggen vast wat werkte, zodat jouw bureau het volgende seizoen niet bij nul begint. Je bureau houdt zijn werk, jij houdt het geheugen.' },
      { question: 'Ons ticketsysteem heeft al labels. Wat voegt dit toe?', answer: 'De stap van label naar campagne. Je systeem weet wie een slaper is; je advertenties laten hem hetzelfde zien als de vaste bezoeker. Wij zorgen dat het verschil in de campagne terechtkomt, en dat je meet of de slaper terugkomt.' },
      { question: 'Wat kost het?', answer: 'De scan is gratis. Daarna kies je: alleen meekijken vanaf 399 per maand, of de volledige diagnose op je eigen cijfers. Je houdt het rapport, ook als je daarna niets met ons doet.' },
    ],

    slot_h2: 'Begin met de scan.',
    slot_sub: 'Een kwartier. Geen toegang tot je accounts nodig. Je ziet op welke vragen van iemand die een avond uit zoekt jouw zaal ontbreekt, en wie daar wel staat.',
  },
  en: {
    eyebrow: 'For venues and concert halls',
    h1_line: 'Your ticketing system knows who went dormant.',
    h1_accent: 'Your campaign does not.',
    sub: 'Hundreds of shows a season, each with its own campaign, and a system full of labels nobody steers on. We put sales per title next to demand per title, and make sure next season starts with what this season taught.',
    cta: 'Request the free scan',
    cta_reason: 'Fifteen minutes of work on our side, no commitment. You see straight away which questions from someone looking for a night out your venue is missing from.',
    cta_sec: 'See pricing',

    scan_eyebrow: 'Measured in the night of 4 September',
    scan_h2: 'We measured a city theatre. On the specific questions it won. On the broad question about its own trade it did not.',
    scan_p: 'Seven questions put to an AI with live search, about a city theatre in the south of the Netherlands. Which theatre is good for families, where can you take workshops, what does a night out cost, which venue suits a school trip. And the broad one: which theatre in this city for cabaret, musicals and plays.',
    scan_cijfers: [
      { n: '4 of 7', t: 'times its own site was a source: families, workshops, prices, schools' },
      { n: '0 of 2', t: 'times on the broad question about cabaret, musicals and plays, its own trade' },
      { n: 'explorebreda', t: 'and the city tourism site answered what makes the theatre unique' },
    ],
    scan_slot: 'That is the pattern at a well programmed venue: on the specific question you are there, on the question of someone simply looking for a night out you are not, and who you are is told by the tourism site of your city in your place. Exactly the visitor you do not know yet, and exactly the story you would want to tell yourself.',

    kost_h2: 'Every title gets a new campaign, and every campaign starts from zero.',
    kost_p: 'The show that is not selling gets extra budget in the last week, the show that sells itself gets the same plan as always. What worked for the same title last season, nobody remembers. So every season you pay for the same lesson again.',
    kost_uitweg: 'The scan shows in fifteen minutes which questions you are missing. Then you decide.',

    eerlijk_h2: 'Two things we do not do.',
    eerlijk: [
      { t: 'We do not connect your ticketing system', d: 'No integration with your ticketing platform or CRM. We read your export: sales per title per day, and the labels your system already keeps. That is enough to steer on, and more honest than pretending we look into your till.' },
      { t: 'We do not programme with you', d: 'Which show you book is your trade. We do not say what belongs on stage, we say what demand per title is doing and where the budget should sit now.' },
    ],

    krijg_h2: 'What you do get.',
    krijg: [
      { t: 'Per title: sales next to demand', d: 'How much is sold, how much is searched, and how the two relate, per show. A title with high demand and low sales is a different problem from a title nobody searches for, and the plan should know that.' },
      { t: 'The labels you already have, in the campaign', d: 'New, frequent, dormant, lapsed: your system knows them, your ads do not. We make sure the dormant customer sees a different offer than the regular, and measure whether they come back.' },
      { t: 'A memory from season to season', d: 'What this title did last year, what it cost, what you learned. Including what did not work. So the season launch is not a new experiment every year.' },
    ],

    canon_h2: 'Why the advice holds.',
    canon_sub: 'Under every piece of advice sits a knowledge layer of 105 principles from published research. Three of them are about exactly this trade, as they sit in the system, with their limits.',
    principes: [
      { p: 'Growth comes primarily from more new visitors, not from making existing visitors more loyal.', u: 'Brands of similar size have almost identical loyalty. The ones that grow reach more people who have not come yet. For a venue: into the city, not only into the newsletter.', bron: 'Ehrenberg-Bass', grens: 'Does not mean your regulars do not matter. They are your first week at every launch, just not your growth.' },
      { p: 'Be critical of loyalty programmes as a growth strategy.', u: 'People who sign up are customers you already had. A friends scheme or subscription retains, but rarely brings in someone who would not have come otherwise.', bron: 'Ehrenberg-Bass', grens: 'Does not mean you should scrap them. They just belong in the retention plan, not the growth plan.' },
      { p: 'Judge results only after a full conversion cycle.', u: 'Costs are complete immediately, tickets trickle in. Anyone settling a campaign after a week is judging the audience that decides the week before the show.', bron: 'Practice principle from the knowledge layer', grens: 'Does not mean you wait until the night itself. Search demand and the cost side you see straight away.' },
    ],

    waarom_h2: 'Why we know this.',
    waarom_p1: 'Built by someone who spent twenty years on the other side of the invoice, as the founder of an agency, working out the annual plan for a concert hall. The picture from that conversation: a ticketing system that already gave every visitor a label, from new to lapsed, and nobody who could draw the route from first ticket to regular.',
    waarom_p2: 'The numbers already said it: the young audience was the largest share of visits, conversion sat with the over-65s, and the best performing campaign was the retargeting of people who had already been. Everything pointed at the visitor you already know. So this starts with demand per title, with the labels you already have, and with a memory that outlives the season.',

    faq_h2: 'What venues ask us first.',
    faqs: [
      { question: 'We have an agency for the campaigns per show. Can this run alongside?', answer: 'Yes. We take over no campaigns and change nothing in accounts. We put sales and demand per title side by side and record what worked, so your agency does not start next season from zero. Your agency keeps its work, you keep the memory.' },
      { question: 'Our ticketing system already has labels. What does this add?', answer: 'The step from label to campaign. Your system knows who went dormant; your ads show them the same thing as the regular. We make sure the difference ends up in the campaign, and that you measure whether the dormant customer comes back.' },
      { question: 'What does it cost?', answer: 'The scan is free. After that you choose: monitoring only from 399 a month, or the full diagnosis on your own numbers. You keep the report, even if you do nothing further with us.' },
    ],

    slot_h2: 'Start with the scan.',
    slot_sub: 'Fifteen minutes. No access to your accounts needed. You see which night-out questions your venue is missing from, and who is there instead.',
  },
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const nl = locale !== 'en'
  return localizedMetadata({
    locale,
    path: '/podia',
    title: nl ? 'Marketing voor podia en concertzalen' : 'Marketing for venues and concert halls',
    description: nl
      ? 'Je ticketsysteem weet wie een slaper is, je campagne niet. Verkoop naast vraag per titel, en een geheugen van seizoen naar seizoen. Gratis scan in een kwartier.'
      : 'Your ticketing system knows who went dormant, your campaign does not. Sales next to demand per title, and a memory from season to season. Free scan in fifteen minutes.',
  })
}

export default async function PodiaPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  return <VoorWiePage locale={locale} c={locale === 'en' ? COPY.en : COPY.nl} melding="hittegolf" />
}
