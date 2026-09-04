import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { localizedMetadata } from '@/lib/seo'
import VoorWiePage, { type VoorWieCopy } from '@/components/VoorWiePage'

type Props = { params: Promise<{ locale: string }> }

// Herbouwd 4 sep 2026, herschreven 5 sep (W-042). Opbouw en de reden erachter:
// components/VoorWiePage.tsx. De meting is echt gedraaid op 4 sep met
// src/scripts/vindbaarheidsscan.ts op een landelijke keten in huishoudelijke
// artikelen; ruwe uitkomst in Stevin-Hub,
// docs/research/vindbaarheidsscans/blokker-nl-2026-09-04.json. 13 vragen,
// alle 13 met web-search actief, 0 keer de eigen site als bron. De keten wordt
// niet bij naam genoemd: geen klant, en het patroon is het punt.
// Geen claims over kassadata, winkelbezoek of retailmedia-portalen: die
// koppelingen bestaan niet (docs/research/SITE_CLAIMS_AUDIT_2026-09-04.md).
// Principes woordelijk uit research/output/consolidated/principles.json:
// merk-effect-006, merk-effect-004, kern-12, inclusief "betekent niet".

const COPY: Record<'nl' | 'en', VoorWieCopy> = {
  nl: {
    eyebrow: 'Voor retailketens',
    h1_line: 'Je weet wat een klik kost.',
    h1_accent: 'Niet of er iemand de winkel in kwam.',
    sub: 'Elke maand verdedig je een mediabudget met de helft van het verhaal. Wij maken de andere helft zichtbaar: waar de vraag zit, per regio, voordat de kwartaalcijfers het je vertellen.',
    cta: 'Vraag de gratis scan aan',
    cta_reason: 'Een kwartier werk aan onze kant, geen verplichting. Je ziet meteen op welke koopvragen je formule niet voorkomt.',
    cta_sec: 'Bekijk de tarieven',

    scan_eyebrow: 'Gemeten op 4 september',
    scan_h2: 'Vraag een AI waar je een goede pan koopt. De keten staat er niet bij.',
    scan_p: 'Dertien koopvragen over huishoudelijke artikelen, gesteld aan een AI met live zoekresultaten, gericht op een landelijke keten met honderden winkels. Twaalf zonder merknaam: waar koop ik goed keukengerei, welke winkel heeft een groot assortiment, waar vind ik duurzame keukenspullen in Amsterdam.',
    scan_cijfers: [
      { n: '0 van 13', t: 'keer was de site van de keten een bron' },
      { n: '1 van 12', t: 'open vragen noemde de keten' },
      { n: 'kookwinkel.nl', t: 'en andere kleine speciaalzaken gaven de antwoorden' },
    ],
    scan_slot: 'De pijnlijkste was de vraag over de acties van de keten zelf. Zelfs daar kwam het antwoord van twee foldersites, niet van de eigen site. Honderden winkels en tientallen jaren naamsbekendheid verliezen het van een kookwinkel met een goede productpagina. Dat is geen budgetprobleem, dat is een pagina die er niet staat.',

    kost_h2: 'Elke week zonder meting betaal je voor bereik dat je niet kunt bijsturen.',
    kost_p: 'De vraag in je categorie beweegt per regio en per week. Staat je budget landelijk gelijk verdeeld, dan koop je bereik waar niemand zoekt en kom je tekort waar het piekt. Je ziet het pas in de kwartaalrapportage, als het voorbij is.',
    kost_uitweg: 'De scan laat in een kwartier zien waar je nu staat. Daarna beslis jij.',

    eerlijk_h2: 'Twee dingen die wij niet doen.',
    eerlijk: [
      { t: 'Wij trekken de brug naar de kassa niet dicht', d: 'Geen kassadata, geen winkelbezoekmeting. Wij vertellen je dus niet welke advertentie iemand de winkel in kreeg. Wie dat wel belooft zonder je kassasysteem, rekent met aannames en noemt het meting.' },
      { t: 'Wij koppelen geen retailmedia-portalen', d: 'Verkoop je ook via andere retailers, dan koppelen wij hun portalen niet en beheren wij hun feeds niet. Wij lezen je eigen exports in en zetten ze naast de rest, met een definitie eronder.' },
    ],

    krijg_h2: 'Wat je wel krijgt.',
    krijg: [
      { t: 'De vraag per regio, binnen dagen', d: 'Beweegt de vraag naar jouw categorie, en overal even hard. Je ziet waar je budget staat terwijl de vraag ergens anders zit. Het vroegste signaal dat je zonder kassakoppeling kunt hebben.' },
      { t: 'De actie nagerekend, met marge', d: 'Een actieweek verkoopt zichzelf op omzet. Wij zetten er de marge naast, de week erna, en wie er kocht: nieuwe klanten of mensen die toch al kwamen.' },
      { t: 'Een definitie die blijft', d: 'Wat een conversie is en wat niet, vastgelegd met de reden. Van jouw bedrijf, niet van het bureau. Het volgende bureau erft hem.' },
    ],

    canon_h2: 'Waarom ons advies klopt.',
    canon_sub: 'Onder elk advies ligt een kennislaag van 105 principes uit gepubliceerd onderzoek. Drie ervan, zoals ze in het systeem staan, met hun grens erbij.',
    principes: [
      { p: 'Prijskortingen zijn een tijdelijke volume-impuls met een verborgen kostenpost.', u: 'Ze raken vooral bestaande kopers, leren klanten wachten op korting en verhogen de prijsgevoeligheid. Een winactie of cadeau verlaagt die juist.', bron: 'IPA Databank, Binet en Field', grens: 'Betekent niet dat prijspromoties nooit mogen, zeker niet waar retailers ze afdwingen, en niet dat het volume-effect onecht is.' },
      { p: 'Een aandeel in mediabestedingen boven je marktaandeel is de sterkste bekende voorspeller van groei.', u: 'De vraag is dus niet alleen of je eigen rendement klopt, maar of je bestedingen meebewegen met de concurrentie.', bron: 'IPA Databank, Binet en Field', grens: 'Betekent niet dat meer uitgeven altijd evenredig meer groei geeft, en het werkt niet in versnipperde categorieen zonder duidelijk marktaandeel.' },
      { p: 'Bouw herkenbaarheid boven onderscheidendheid.', u: 'Gemiddeld ziet maar tien procent van je eigen kopers je merk als anders. Wat wel stuurbaar is: kleur, vorm, stem, de opbouw van de folder, jarenlang consistent.', bron: 'Ehrenberg-Bass', grens: 'Betekent niet dat vernieuwing onmogelijk is. De merkelementen blijven, de executies varieren.' },
    ],

    waarom_h2: 'Waarom wij dit weten.',
    waarom_p1: 'Gebouwd door iemand die twintig jaar aan de andere kant van de factuur zat, als oprichter van een bureau. Bij elke klant met een winkelvloer zag je hetzelfde: een groot mediabudget en een meting die stopte bij de website.',
    waarom_p2: 'Iedereen wist het, en iedereen rapporteerde toch op wat wel te meten viel. Daarom begint dit systeem bij meten, bij benoemen wat je niet weet, en bij vastleggen wat je probeerde.',

    faq_h2: 'Wat retailers ons eerst vragen.',
    faqs: [
      { question: 'Wij hebben al een bureau. Kan dit ernaast?', answer: 'Ja. De scan en de diagnose zijn een tweede blik op je eigen cijfers. Staat het goed, dan weet je dat nu zeker. Staat het niet goed, dan heb je iets concreets om met je bureau te bespreken. Wij veranderen niets in je accounts.' },
      { question: 'Wat als uit de scan blijkt dat het goed zit?', answer: 'Dan zeggen we dat. Bij een museum dat we deze week maten was de uitkomst grotendeels goed nieuws, en dat staat gewoon op die pagina. Een scan die alleen slecht nieuws mag opleveren is geen meting.' },
      { question: 'Wat kost het?', answer: 'De scan is gratis. Daarna kies je: alleen meekijken vanaf 399 per maand, of de volledige diagnose op je eigen data. Je houdt het rapport, ook als je daarna niets met ons doet.' },
    ],

    slot_h2: 'Begin met de scan.',
    slot_sub: 'Een kwartier. Geen toegang tot je accounts nodig. Je ziet op welke koopvragen je formule ontbreekt en wie daar wel staat.',
  },
  en: {
    eyebrow: 'For retail chains',
    h1_line: 'You know what a click costs.',
    h1_accent: 'Not whether anyone walked into the store.',
    sub: 'Every month you defend a media budget with half the story. We make the other half visible: where demand sits, by region, before the quarterly numbers tell you.',
    cta: 'Request the free scan',
    cta_reason: 'Fifteen minutes of work on our side, no commitment. You see straight away which buying questions your format is missing from.',
    cta_sec: 'See pricing',

    scan_eyebrow: 'Measured on 4 September',
    scan_h2: 'Ask an AI where to buy a good pan. The chain is not in the answer.',
    scan_p: 'Thirteen buying questions about household goods, put to an AI with live search, aimed at a national chain with hundreds of stores. Twelve without the brand name: where do I buy good kitchen equipment, which shop has a wide range, where do I find sustainable kitchenware in Amsterdam.',
    scan_cijfers: [
      { n: '0 of 13', t: 'times the site of the chain was a source' },
      { n: '1 of 12', t: 'open questions named the chain' },
      { n: 'kookwinkel.nl', t: 'and other small specialist shops gave the answers' },
    ],
    scan_slot: 'The painful one was the question about the promotions of the chain itself. Even there the answer came from two leaflet sites, not from its own site. Hundreds of stores and decades of name recognition lose to a cookware shop with a good product page. That is not a budget problem, that is a page that does not exist.',

    kost_h2: 'Every week without measurement you pay for reach you cannot steer.',
    kost_p: 'Demand in your category moves by region and by week. If your budget is spread evenly across the country, you buy reach where nobody is searching and fall short where it peaks. You see it in the quarterly report, once it is over.',
    kost_uitweg: 'The scan shows in fifteen minutes where you stand now. Then you decide.',

    eerlijk_h2: 'Two things we do not do.',
    eerlijk: [
      { t: 'We do not close the bridge to the till', d: 'No till data, no footfall measurement. So we will not tell you which ad got someone into the store. Anyone promising that without your point of sale is working from assumptions and calling it measurement.' },
      { t: 'We do not connect retail media portals', d: 'If you also sell through other retailers, we do not connect their portals or manage their feeds. We read your own exports and put them next to the rest, with a definition underneath.' },
    ],

    krijg_h2: 'What you do get.',
    krijg: [
      { t: 'Demand by region, within days', d: 'Whether demand for your category is moving, and whether it moves everywhere at the same rate. You see where your budget sits while demand is somewhere else. The earliest signal you can have without a till connection.' },
      { t: 'The promotion recalculated, with margin', d: 'A promotion week sells itself on revenue. We put margin next to it, the week after, and who bought: new customers or people who were coming anyway.' },
      { t: 'A definition that stays', d: 'What counts as a conversion and what does not, recorded with the reason. Owned by your company, not the agency. The next agency inherits it.' },
    ],

    canon_h2: 'Why the advice holds.',
    canon_sub: 'Under every piece of advice sits a knowledge layer of 105 principles from published research. Three of them, as they sit in the system, with their limits.',
    principes: [
      { p: 'Price discounts are a temporary volume boost with a hidden cost.', u: 'They mostly reach existing buyers, teach customers to wait for a discount and raise price sensitivity. A prize draw or a gift lowers it instead.', bron: 'IPA Databank, Binet and Field', grens: 'Does not mean price promotions are never allowed, certainly not where retailers impose them, and not that the volume effect is unreal.' },
      { p: 'A share of media spend above your market share is the strongest known predictor of growth.', u: 'So the question is not only whether your own return holds up, but whether your spending moves with the competition.', bron: 'IPA Databank, Binet and Field', grens: 'Does not mean more spend always buys proportional growth, and it does not work in fragmented categories without a clear market share.' },
      { p: 'Build distinctiveness over differentiation.', u: 'On average only ten percent of your own buyers see your brand as different. What you can steer: colour, shape, voice, the structure of the leaflet, consistent for years.', bron: 'Ehrenberg-Bass', grens: 'Does not mean renewal is impossible. The brand elements stay, the executions vary.' },
    ],

    waarom_h2: 'Why we know this.',
    waarom_p1: 'Built by someone who spent twenty years on the other side of the invoice, as the founder of an agency. With every client that had a shop floor you saw the same thing: a large media budget and a measurement that stopped at the website.',
    waarom_p2: 'Everyone knew it, and everyone still reported on what could be measured. So this system starts with measuring, with naming what you do not know, and with recording what you tried.',

    faq_h2: 'What retailers ask us first.',
    faqs: [
      { question: 'We already have an agency. Can this run alongside?', answer: 'Yes. The scan and the diagnosis are a second opinion on your own numbers. If things are right, you now know for sure. If not, you have something concrete to discuss with your agency. We change nothing in your accounts.' },
      { question: 'What if the scan shows everything is fine?', answer: 'Then we say so. A museum we measured this week came out mostly as good news, and that is what its page says. A scan that may only deliver bad news is not a measurement.' },
      { question: 'What does it cost?', answer: 'The scan is free. After that you choose: monitoring only from 399 a month, or the full diagnosis on your own data. You keep the report, even if you do nothing further with us.' },
    ],

    slot_h2: 'Start with the scan.',
    slot_sub: 'Fifteen minutes. No access to your accounts needed. You see which buying questions your format is missing from, and who is there instead.',
  },
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const nl = locale !== 'en'
  return localizedMetadata({
    locale,
    path: '/retail',
    title: nl ? 'Marketing voor retailketens' : 'Marketing for retail chains',
    description: nl
      ? 'Je weet wat een klik kost, niet of er iemand de winkel in kwam. Gratis scan in een kwartier: op welke koopvragen ontbreekt je formule, en wie staat daar wel.'
      : 'You know what a click costs, not whether anyone walked into the store. Free scan in fifteen minutes: which buying questions your format is missing from, and who is there instead.',
  })
}

export default async function RetailPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  return <VoorWiePage locale={locale} c={locale === 'en' ? COPY.en : COPY.nl} melding="retail-regio" feed="retail" />
}
