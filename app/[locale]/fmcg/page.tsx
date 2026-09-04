import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { localizedMetadata } from '@/lib/seo'
import VoorWiePage, { type VoorWieCopy } from '@/components/VoorWiePage'

type Props = { params: Promise<{ locale: string }> }

// Nieuw 4 sep 2026, herschreven 5 sep (W-042). Opbouw: components/VoorWiePage.tsx.
// De oude /fmcg is op 21 jul weggesneden (commit b92033b) omdat hij zeven
// retailmedia-koppelingen beloofde die niet bestaan. Deze pagina koppelt niets
// en zegt dat. Meting echt gedraaid 4 sep op een merk in een supermarktcategorie:
// docs/research/vindbaarheidsscans/bolletje-nl-2026-09-04.json, 7 vragen, alle
// met web-search actief. Niet bij naam: geen klant.
// Databronnen nagekeken 4 sep in de documentatie en licentievoorwaarden van de
// aanbieders zelf, naslag in docs/research/FMCG_DATABRONNEN_2026-09-04.md:
// NIQ eist een getekende Third Party Access Agreement, Circana staat geen
// sublicentie toe, Brandwatch laat API-sleutel delen met een derde wel toe.
// Principes woordelijk uit de kennislaag: kern 9, kern 10, kern 11.
// Geen klantnamen of cijfers uit eerder bureauwerk (Addurance): dat is van hen.
// De categorieen in de bio zijn Koens eigen klanten daar (bevestigd 5 sep 2026,
// zie memory koen-fmcg-ervaring), dus de claim is van hem; de namen niet.

const COPY: Record<'nl' | 'en', VoorWieCopy> = {
  nl: {
    eyebrow: 'Voor FMCG-merken',
    h1_line: 'Zeven retailerportalen.',
    h1_accent: 'Zeven definities van goed.',
    sub: 'Elk portaal zijn eigen ROAS en zijn eigen venster. Aan het eind van het kwartaal tellen ze niet op, en niemand kan zeggen of de merkcampagne iets aan het schap deed. Wij leggen een definitie vast en meten wat er wel te meten valt.',
    cta: 'Vraag de gratis scan aan',
    cta_reason: 'Een kwartier werk aan onze kant, geen verplichting. Je ziet meteen op welke categorievragen je merk ontbreekt, en welke retailer daar het antwoord geeft.',
    cta_sec: 'Bekijk de tarieven',

    scan_eyebrow: 'Gemeten op 4 september',
    scan_h2: 'Vraag een AI welke crackers goed zijn. Je merk staat er niet bij.',
    scan_p: 'Zeven koopvragen uit een Nederlandse supermarktcategorie, gesteld aan een AI met live zoekresultaten. Zoals een lichte koper ze stelt: welke merken hebben koekjes met volle granen, wie verkoopt crackers zonder toegevoegde suiker. Geen merknaam in de vraag.',
    scan_cijfers: [
      { n: '0 van 7', t: 'keer was de site van het merk een bron' },
      { n: '1 van 5', t: 'open categorievragen noemde het merk' },
      { n: 'ah.nl, jumbo.com', t: 'plus.nl en hoogvliet.com gaven de antwoorden' },
    ],
    scan_slot: 'Bij een vraag over volkoren koekjes werd een webshop uit Nieuw-Zeeland geciteerd, en een uit Brazilie. Het merk dat die koekjes in Nederland maakt niet. De retailer die in het schap tussen jou en de shopper staat, staat nu ook tussen jou en het antwoord. En hier kun je je niet inkopen.',

    kost_h2: 'Elke kwartaalrapportage die zeven vensters optelt, verdedigt een budget met een leeg getal.',
    kost_p: 'Zeven portalen, zeven attributievensters. Wie ze optelt krijgt iets dat op een ROAS lijkt maar nergens naar verwijst. En omdat het volgende bureau zijn eigen definitie meebrengt, begint de discussie elk jaar opnieuw.',
    kost_uitweg: 'De scan laat in een kwartier zien waar je merk staat op de vragen van de lichte koper. Daarna beslis jij.',

    eerlijk_h2: 'Twee dingen die wij niet doen.',
    eerlijk: [
      { t: 'Wij koppelen die portalen niet', d: 'Geen koppeling met Ahold Delhaize, bol, Picnic, Amazon, Lidl of Carrefour, en wij doen niet alsof. Wie belooft dat hij die zeven achter een inlog samenbrengt, verkoopt je iets wat niemand goed heeft opgelost.' },
      { t: 'Wij zijn geen databron', d: 'Geen eigen panel, geen licentie te koop. Wij lezen wat jij al hebt. Vraagt je leverancier een getekende afspraak voordat een derde meekijkt, zoals NielsenIQ en Circana, dan hoor je dat van ons voordat je tekent.' },
    ],

    krijg_h2: 'Wat je wel krijgt.',
    krijg: [
      { t: 'Een definitie, en die blijft', d: 'Wat een conversie is, wat er in de teller hoort en waarom. Vastgelegd op naam van je merk, niet van het bureau. Het volgende bureau erft hem in plaats van er een eigen versie van te maken.' },
      { t: 'Zoekvraag als vroeg signaal', d: 'Beweegt je merkzoekvolume, en je categorie, en hoe verhouden die zich. Dat zie je binnen dagen, niet in de volgende kwartaalrapportage, en het loopt vooruit op het schap.' },
      { t: 'Wat je al betaalt gaat erin', d: 'NielsenIQ, Circana, YouGov, GWI, je merktracker, je listening-tool, je exports uit de portalen. Is er een API, dan koppelen we die. Is er een export, dan lezen we die in. Het eindigt naast je mediadata, met een definitie eronder.' },
    ],

    canon_h2: 'De canon van jouw vak zit in het systeem.',
    canon_sub: 'Onder elk advies ligt een kennislaag van 105 principes uit gepubliceerd onderzoek. Voor FMCG komen die uit Ehrenberg-Bass en de IPA Databank, precies de hoek waar jouw categorie al decennia op stuurt. Drie ervan, met hun grens erbij.',
    principes: [
      { p: 'Bereik de hele categoriekoper.', u: 'Zelfs grote merken halen de helft van hun kopers uit mensen die een of twee keer per jaar kopen. Kopersclassificaties op historisch gedrag zijn instabiel.', bron: 'Ehrenberg-Bass', grens: 'Betekent niet dat targeting nooit zinvol is. Bij een klein, identificeerbaar segment kan het wel.' },
      { p: 'Merkopbouw en activatie horen samen, rond 60/40.', u: 'Losse kortetermijncampagnes stapelen niet op tot groei op lange termijn.', bron: 'IPA Databank, Binet en Field', grens: 'Betekent niet dat 60/40 een wet is. Het is een kalibratiepunt dat schuift met categorie, groeifase, budget en koopfrequentie.' },
      { p: 'Evalueer merkwerk over minimaal zes tot twaalf maanden.', u: 'Korte meetvensters bevoordelen systematisch activatie en prijs. Merkeffecten zijn dun uitgesmeerd over veel incidentele kopers en onzichtbaar in weekcijfers.', bron: 'IPA Databank', grens: 'Betekent niet dat merkwerk onmeetbaar is. Het vraagt andere metrics en een andere horizon, vooraf vastgezet.' },
    ],

    waarom_h2: 'Waarom wij dit weten.',
    waarom_p1: 'Gebouwd door iemand die twintig jaar aan de andere kant van de factuur zat, een flink deel daarvan in FMCG. Mediaplannen voor merken in zuivel, groente en fruit, dranken, snacks, verzorging en dierverzorging.',
    waarom_p2: 'De strategie was meestal in orde: een model, een jaarkalender, een verdeling over merk en activatie. Wat er niet lag, was een meetplan dat de vraag beantwoordde of het gewerkt had. Na tientallen merken kon niemand met zekerheid zeggen of een merkcampagne een extra pak had verkocht. Daarom bestaat dit.',

    faq_h2: 'Wat merkteams ons eerst vragen.',
    faqs: [
      { question: 'Ons mediabureau doet de rapportage al. Wat voegt dit toe?', answer: 'Een definitie die niet van het bureau is, en een meting die doorloopt als het bureau wisselt. Wij veranderen niets in je accounts en vervangen je bureau niet. Wij zorgen dat de cijfers van alle partijen naar hetzelfde verwijzen.' },
      { question: 'Mogen we onze paneldata wel met jullie delen?', answer: 'Dat hangt af van je leverancier, en dat zoeken we uit voordat je iets tekent. NielsenIQ vraagt een getekende afspraak voor toegang door derden, Circana staat geen sublicentie toe, Brandwatch staat delen van de API-sleutel juist wel toe. Wij zeggen het vooraf, niet achteraf.' },
      { question: 'Wat kost het?', answer: 'De scan is gratis. Daarna kies je: alleen meekijken vanaf 399 per maand, of de volledige diagnose op je eigen data. Je houdt het rapport, ook als je daarna niets met ons doet.' },
    ],

    slot_h2: 'Begin met de scan.',
    slot_sub: 'Een kwartier. Geen toegang tot je accounts nodig. Je ziet op welke categorievragen je merk ontbreekt, en welke retailer daar het antwoord geeft.',
  },
  en: {
    eyebrow: 'For FMCG brands',
    h1_line: 'Seven retailer portals.',
    h1_accent: 'Seven definitions of good.',
    sub: 'Each portal with its own ROAS and its own window. At the end of the quarter they do not add up, and nobody can say whether the brand campaign did anything at the shelf. We fix one definition and measure what can be measured.',
    cta: 'Request the free scan',
    cta_reason: 'Fifteen minutes of work on our side, no commitment. You see straight away which category questions your brand is missing from, and which retailer gives the answer there.',
    cta_sec: 'See pricing',

    scan_eyebrow: 'Measured on 4 September',
    scan_h2: 'Ask an AI which crackers are good. Your brand is not in the answer.',
    scan_p: 'Seven buying questions from a Dutch supermarket category, put to an AI with live search. The way a light buyer asks: which brands make wholegrain biscuits, who sells crackers without added sugar. No brand name in the question.',
    scan_cijfers: [
      { n: '0 of 7', t: 'times the brand site was a source' },
      { n: '1 of 5', t: 'open category questions named the brand' },
      { n: 'ah.nl, jumbo.com', t: 'plus.nl and hoogvliet.com gave the answers' },
    ],
    scan_slot: 'On a question about wholegrain biscuits it cited a webshop in New Zealand, and one in Brazil. Not the brand that makes those biscuits in the Netherlands. The retailer standing between you and the shopper at the shelf now stands between you and the answer. And here you cannot buy your way in.',

    kost_h2: 'Every quarterly report that adds up seven windows defends a budget with an empty number.',
    kost_p: 'Seven portals, seven attribution windows. Add them up and you get something that looks like a ROAS but refers to nothing. And because the next agency brings its own definition, the discussion starts over every year.',
    kost_uitweg: 'The scan shows in fifteen minutes where your brand stands on the light buyer\'s questions. Then you decide.',

    eerlijk_h2: 'Two things we do not do.',
    eerlijk: [
      { t: 'We do not connect those portals', d: 'No integration with Ahold Delhaize, bol, Picnic, Amazon, Lidl or Carrefour, and we will not pretend. Anyone promising to bring those seven behind one login is selling you something nobody has solved well.' },
      { t: 'We are not a data vendor', d: 'No panel of our own, no licence for sale. We read what you already have. If your provider wants a signed agreement before a third party looks in, as NielsenIQ and Circana do, you hear that from us before you sign.' },
    ],

    krijg_h2: 'What you do get.',
    krijg: [
      { t: 'One definition, and it stays', d: 'What a conversion is, what belongs in the count and why. Recorded in your brand\'s name, not the agency\'s. The next agency inherits it instead of writing its own version.' },
      { t: 'Search demand as an early signal', d: 'Whether your brand search volume and your category are moving, and how they relate. You see that within days, not in the next quarterly report, and it runs ahead of the shelf.' },
      { t: 'What you already pay for goes in', d: 'NielsenIQ, Circana, YouGov, GWI, your brand tracker, your listening tool, your exports from the portals. If there is an API, we connect it. If there is an export, we read it. It ends next to your media data, with a definition underneath.' },
    ],

    canon_h2: 'The canon of your trade sits in the system.',
    canon_sub: 'Under every piece of advice sits a knowledge layer of 105 principles from published research. For FMCG those come from Ehrenberg-Bass and the IPA Databank, exactly the corner your category has steered by for decades. Three of them, with their limits.',
    principes: [
      { p: 'Reach the whole category buyer.', u: 'Even large brands draw half their buyers from people who buy once or twice a year. Buyer classifications based on past behaviour are unstable.', bron: 'Ehrenberg-Bass', grens: 'Does not mean targeting is never useful. With a small, identifiable segment it can be.' },
      { p: 'Brand building and activation belong together, around 60/40.', u: 'Isolated short term campaigns do not add up to long term growth.', bron: 'IPA Databank, Binet and Field', grens: 'Does not mean 60/40 is a law. It is a calibration point that shifts with category, growth stage, budget and purchase frequency.' },
      { p: 'Evaluate brand work over at least six to twelve months.', u: 'Short measurement windows systematically favour activation and price. Brand effects are spread thin across many occasional buyers and invisible in weekly numbers.', bron: 'IPA Databank', grens: 'Does not mean brand work is unmeasurable. It needs different metrics and a different horizon, fixed in advance.' },
    ],

    waarom_h2: 'Why we know this.',
    waarom_p1: 'Built by someone who spent twenty years on the other side of the invoice, a good part of it in FMCG. Media plans for brands in dairy, fruit and vegetables, drinks, snacks, personal care and pet care.',
    waarom_p2: 'The strategy was usually fine: a model, an annual calendar, a split between brand and activation. What was missing was a measurement plan that answered whether it had worked. After dozens of brands, nobody could say with certainty whether a brand campaign had sold one extra pack. That is why this exists.',

    faq_h2: 'What brand teams ask us first.',
    faqs: [
      { question: 'Our media agency already does the reporting. What does this add?', answer: 'A definition that does not belong to the agency, and a measurement that continues when the agency changes. We change nothing in your accounts and do not replace your agency. We make sure everyone\'s numbers refer to the same thing.' },
      { question: 'Are we even allowed to share our panel data with you?', answer: 'That depends on your provider, and we find out before you sign anything. NielsenIQ requires a signed agreement for third-party access, Circana allows no sublicensing, Brandwatch does allow sharing the API key. We say it beforehand, not afterwards.' },
      { question: 'What does it cost?', answer: 'The scan is free. After that you choose: monitoring only from 399 a month, or the full diagnosis on your own data. You keep the report, even if you do nothing further with us.' },
    ],

    slot_h2: 'Start with the scan.',
    slot_sub: 'Fifteen minutes. No access to your accounts needed. You see which category questions your brand is missing from, and which retailer gives the answer there.',
  },
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const nl = locale !== 'en'
  return localizedMetadata({
    locale,
    path: '/fmcg',
    title: nl ? 'Marketing voor FMCG-merken' : 'Marketing for FMCG brands',
    description: nl
      ? 'Zeven retailerportalen, zeven definities van goed. Gratis scan in een kwartier: op welke categorievragen ontbreekt je merk, en welke retailer geeft daar het antwoord. Onderbouwd met Ehrenberg-Bass en de IPA Databank.'
      : 'Seven retailer portals, seven definitions of good. Free scan in fifteen minutes: which category questions your brand is missing from, and which retailer answers there. Grounded in Ehrenberg-Bass and the IPA Databank.',
  })
}

export default async function FmcgPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  return <VoorWiePage locale={locale} c={locale === 'en' ? COPY.en : COPY.nl} melding="fmcg-categorie" feed="fmcg" />
}
