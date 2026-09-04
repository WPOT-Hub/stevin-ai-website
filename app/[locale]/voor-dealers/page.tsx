import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { localizedMetadata } from '@/lib/seo'
import VoorWiePage, { type VoorWieCopy } from '@/components/VoorWiePage'

type Props = { params: Promise<{ locale: string }> }

// Herbouwd 4 sep 2026, herschreven 5 sep (W-042). Opbouw: components/VoorWiePage.tsx.
// De oude tien koppelingen (AutoLine, Carmen, Cars-IT, Werbas, Indicata,
// AutoTrack, AutoScout24, BOVAG, Marktplaats Auto, Gaspedaal) en "-50% cost per
// customer" bestaan niet: docs/research/SITE_CLAIMS_AUDIT_2026-09-04.md.
// Meting echt gedraaid 4 sep op een landelijke dealergroep, zes koopvragen uit
// een regio met vestigingen: docs/research/vindbaarheidsscans/vanmossel-nl-2026-09-04.json
// (tweede run van die dag; de eerste had onbruikbare vragen). Alle zes met
// web-search actief, groep nergens genoemd. Niet bij naam: geen klant.
// Principes woordelijk uit de kennislaag: kern 2, kern 3, kern 13.
// Bio (5 sep): Koen draaide bij Addurance de online dealercampagnes voor een
// automerk in NL en BE (deck 2020 met Koen als laatste bewerker: 90 dealers,
// 90 campagnes per geolocatie, per dealer rapportage en budgetverdeling;
// planningssheet per dealer op inwoners en bereik per postcode). Geen merk-
// of dealernamen hier: dat werk is van dat bureau voor die klant.

const COPY: Record<'nl' | 'en', VoorWieCopy> = {
  nl: {
    eyebrow: 'Voor dealergroepen',
    h1_line: 'Landelijk ben je groot.',
    h1_accent: 'Op de koopvraag om de hoek besta je niet.',
    sub: 'Het budget staat centraal, de verantwoording is per vestiging, en niemand kan zeggen welke regio meelift op de naam en welke er alleen geld in stopt. En in Amsterdam wordt naar een ander model gezocht dan in Heerenveen, terwijl beide vestigingen dezelfde campagne krijgen. Wij meten het per verzorgingsgebied, per model.',
    cta: 'Vraag de gratis scan aan',
    cta_reason: 'Een kwartier werk aan onze kant, per vestiging, geen verplichting. Je ziet meteen op welke koopvragen in jouw regio je groep ontbreekt.',
    cta_sec: 'Bekijk de tarieven',

    scan_eyebrow: 'Gemeten op 4 september',
    scan_h2: 'Zes koopvragen uit een regio. De landelijke groep met vestigingen daar kwam niet voor.',
    scan_p: 'Zes vragen aan een AI met live zoekresultaten, over een regio waar een landelijke dealergroep meerdere vestigingen heeft. Zoals een koper ze stelt: welke dealer hier heeft nieuwe auto\'s met lease, waar koop ik een betrouwbare occasion met garantie, wie biedt onderhoudspakketten.',
    scan_cijfers: [
      { n: '0 van 6', t: 'keer werd de groep genoemd' },
      { n: '0 van 6', t: 'keer was een site van de groep een bron' },
      { n: 'autobedrijven', t: 'uit dezelfde plaats gaven vrijwel alle antwoorden' },
    ],
    scan_slot: 'Zelfstandige autobedrijven zonder jouw inkoopmacht, voorraad of merkcontracten stonden er wel. Landelijke naamsbekendheid vertaalt zich niet vanzelf naar het antwoord dat een koper in jouw gebied krijgt. Zes vragen is een steekproef, geen onderzoek. Maar zes keer nul is geen toeval meer.',

    kost_h2: 'Een landelijk gemiddelde verstopt de vestiging die geld verbrandt en de vestiging die het verdient.',
    kost_p: 'De vestiging met de beste locatie lijkt de beste marketing te hebben. De vestiging in een lastig gebied krijgt de schuld van iets dat aan het gebied ligt. Zolang je per land rapporteert, betaal je voor allebei zonder te weten welke.',
    kost_uitweg: 'De scan laat per vestiging zien waar je nu staat. Daarna beslis jij.',

    eerlijk_h2: 'Twee dingen die wij niet doen.',
    eerlijk: [
      { t: 'Wij koppelen je DMS en je voorraad niet', d: 'Geen koppeling met je dealer management systeem, geen voorraadfeed. Wij zien dus niet of een advertentie nog op een verkochte auto draait. Wie dat belooft: vraag welke koppeling precies, en sinds wanneer die draait.' },
      { t: 'Wij koppelen geen occasionportalen', d: 'Wat je op de bekende occasionsites doet, zie je in hun eigen omgeving. Wij doen niet alsof we dat samenvoegen. Dat scheelt een gesprek over cijfers die nooit gaan kloppen.' },
    ],

    krijg_h2: 'Wat je wel krijgt.',
    krijg: [
      { t: 'Per vestiging en per model, niet per land', d: 'Zoekvraag, zichtbaarheid en advertentiedruk per verzorgingsgebied, uitgesplitst naar model. Waar de SUV loopt en waar de stationwagen, waar je meelift op de naam en waar je betaalt zonder dat het beweegt. Een gesprek dat je met een landelijk gemiddelde niet kunt voeren.' },
      { t: 'Een definitie over alle merken heen', d: 'Elk merk zijn eigen bureau is meestal elk merk zijn eigen definitie van een lead. Wij leggen er een vast, met de reden, zodat je merken naast elkaar kunt leggen.' },
      { t: 'Wie er in jouw gebied adverteert', d: 'De advertentieregisters van Google en Meta zijn openbaar. Welke dealers en merken in jouw regio adverteren en waarmee, doorlopend. Dit werkt al voordat je klant bent.' },
    ],

    canon_h2: 'Waarom ons advies klopt.',
    canon_sub: 'Onder elk advies ligt een kennislaag van 105 principes uit gepubliceerd onderzoek. Drie ervan raken deze sector recht in het hart, want een auto koopt niemand vandaag en de meting doet vaak alsof van wel.',
    principes: [
      { p: 'Voed biedalgoritmes alleen met voltooide, gekwalificeerde conversies.', u: 'De bedankpagina of het gevoerde gesprek, nooit de knopklik. Algoritmes zoeken meer van wat jij succes noemt, dus een vervuild signaal traint de verkeerde koper naar je showroom.', bron: 'Praktijkprincipe uit de kennislaag', grens: 'Betekent niet dat kliks niet geregistreerd mogen worden. Ze verhuizen naar de meetlaag, niet naar de stuurlaag.' },
      { p: 'Beoordeel resultaten pas na een volledige conversiecyclus.', u: 'Kosten zijn direct compleet, conversies druppelen na. Bij een lange orientatie laat een kort venster je kosten per klant kunstmatig verdubbelen, en wie dan bijstuurt, stuurt op ruis.', bron: 'Praktijkprincipe uit de kennislaag', grens: 'Betekent niet dat recente cijfers waardeloos zijn. De kostenkant mag je meteen beoordelen.' },
      { p: 'Zoek eerst de frictie voordat je een overtuigingscampagne adviseert.', u: 'Een proefritformulier met te veel velden, geen prijs bij de occasion, geen antwoord binnen een dag. Gedrag makkelijker maken werkt vaker en goedkoper dan een houding veranderen.', bron: 'Praktijkprincipe uit de kennislaag', grens: 'Betekent niet dat communicatie nooit een houding raakt. Wel dat je de drempel eerst wegneemt.' },
    ],

    waarom_h2: 'Waarom wij dit weten.',
    waarom_p1: 'Gebouwd door iemand die twintig jaar aan de andere kant van de factuur zat, als oprichter van een bureau, en daar voor een automerk de dealercampagnes draaide in Nederland en Belgie. Negentig dealers, negentig campagnes, elk met een eigen boodschap in het eigen werkgebied, en per dealer een eigen rapportage en budgetverdeling op inwoners en bereik per postcode.',
    waarom_p2: 'Dat werkte, en het leerde een ding: het importeursbudget was landelijk, de vraag was lokaal, en de enige manier om het gesprek over een vestiging eerlijk te voeren was meten per verzorgingsgebied. Daarom begint dit daar, en bij een definitie van een lead die over alle merken en alle bureaus heen hetzelfde is.',

    faq_h2: 'Wat dealergroepen ons eerst vragen.',
    faqs: [
      { question: 'Elk merk heeft zijn eigen bureau. Hoe past dit daartussen?', answer: 'Als onafhankelijke laag erboven. Wij veranderen niets in de accounts van je bureaus, wij leggen een definitie vast en meten alle merken op dezelfde manier. Je bureaus houden hun werk, jij krijgt een beeld dat over alle merken heen klopt.' },
      { question: 'Wat als uit de scan blijkt dat het goed zit?', answer: 'Dan zeggen we dat, per vestiging. Een museum dat we deze week maten kwam er grotendeels goed uit, en dat staat gewoon op die pagina. Een scan die alleen slecht nieuws mag opleveren is geen meting.' },
      { question: 'Wat kost het?', answer: 'De scan is gratis. Daarna kies je: alleen meekijken vanaf 399 per maand, of de volledige diagnose op je eigen cijfers. Je houdt het rapport, ook als je daarna niets met ons doet.' },
    ],

    slot_h2: 'Begin met de scan.',
    slot_sub: 'Een kwartier per vestiging. Geen toegang tot je accounts nodig. Je ziet op welke koopvragen in jouw regio je ontbreekt, en wie daar wel staat.',
  },
  en: {
    eyebrow: 'For dealer groups',
    h1_line: 'Nationally you are large.',
    h1_accent: 'On the buying question around the corner you do not exist.',
    sub: 'Budget is decided centrally, accountability is per location, and nobody can say which region rides on the name and which one only spends. And Amsterdam searches for a different model than a town in the north, while both locations get the same campaign. We measure it per catchment area, per model.',
    cta: 'Request the free scan',
    cta_reason: 'Fifteen minutes of work on our side, per location, no commitment. You see straight away which buying questions in your region your group is missing from.',
    cta_sec: 'See pricing',

    scan_eyebrow: 'Measured on 4 September',
    scan_h2: 'Six buying questions from one region. The national group with locations there did not appear.',
    scan_p: 'Six questions put to an AI with live search, about a region where a national dealer group has several locations. The way a buyer asks: which dealer here has new cars with leasing, where do I buy a reliable used car with warranty, who offers maintenance packages.',
    scan_cijfers: [
      { n: '0 of 6', t: 'times the group was named' },
      { n: '0 of 6', t: 'times a site of the group was a source' },
      { n: 'local dealers', t: 'from the same town gave nearly all the answers' },
    ],
    scan_slot: 'Independent dealers without your buying power, stock or brand contracts were there. National name recognition does not translate by itself into the answer a buyer gets in your area. Six questions is a sample, not a study. But six zeros is no longer a coincidence.',

    kost_h2: 'A national average hides the location burning money and the location earning it.',
    kost_p: 'The location with the best address appears to have the best marketing. The location in a difficult area gets blamed for what the area is doing. As long as you report per country, you pay for both without knowing which is which.',
    kost_uitweg: 'The scan shows per location where you stand now. Then you decide.',

    eerlijk_h2: 'Two things we do not do.',
    eerlijk: [
      { t: 'We do not connect your DMS or your stock', d: 'No integration with your dealer management system, no stock feed. So we cannot see whether an ad is still running on a sold car. If someone promises that: ask which integration exactly, and since when it has been running.' },
      { t: 'We do not connect used-car portals', d: 'What you do on the well-known used-car sites stays in their own environment. We will not pretend to merge it. That saves a conversation about numbers that were never going to add up.' },
    ],

    krijg_h2: 'What you do get.',
    krijg: [
      { t: 'Per location and per model, not per country', d: 'Search demand, visibility and advertising pressure per catchment area, split by model. Where the SUV sells and where the estate does, where you ride on the name and where you pay without anything moving. A conversation you cannot have with a national average.' },
      { t: 'One definition across all brands', d: 'Every brand with its own agency usually means every brand with its own definition of a lead. We fix one, with the reason, so you can put brands side by side.' },
      { t: 'Who advertises in your area', d: 'The ad registers of Google and Meta are public. Which dealers and brands advertise in your region and with what, continuously. This works before you are a client.' },
    ],

    canon_h2: 'Why the advice holds.',
    canon_sub: 'Under every piece of advice sits a knowledge layer of 105 principles from published research. Three of them hit this sector squarely, because nobody buys a car today and measurement often pretends otherwise.',
    principes: [
      { p: 'Feed bidding algorithms only completed, qualified conversions.', u: 'The thank-you page or the conversation that happened, never the button click. Algorithms look for more of whatever you call success, so a polluted signal trains the wrong buyer towards your showroom.', bron: 'Practice principle from the knowledge layer', grens: 'Does not mean clicks cannot be recorded. They move to the measurement layer, not the steering layer.' },
      { p: 'Judge results only after a full conversion cycle.', u: 'Costs are complete immediately, conversions trickle in afterwards. With a long consideration, a short window makes your cost per customer look artificially doubled, and anyone correcting then is steering on noise.', bron: 'Practice principle from the knowledge layer', grens: 'Does not mean recent numbers are worthless. The cost side you can judge straight away.' },
      { p: 'Look for friction before advising a persuasion campaign.', u: 'A test-drive form with too many fields, no price on the used car, no answer within a day. Making behaviour easier works more often and more cheaply than changing attitudes.', bron: 'Practice principle from the knowledge layer', grens: 'Does not mean communication never shifts an attitude. It means you remove the barrier first.' },
    ],

    waarom_h2: 'Why we know this.',
    waarom_p1: 'Built by someone who spent twenty years on the other side of the invoice, as the founder of an agency, running the dealer campaigns for a car brand in the Netherlands and Belgium. Ninety dealers, ninety campaigns, each with its own message in its own area, and per dealer its own report and a budget split on inhabitants and reach per postcode.',
    waarom_p2: 'It worked, and it taught one thing: the importer\'s budget was national, demand was local, and the only way to have an honest conversation about one location was to measure per catchment area. So this starts there, and with a definition of a lead that is the same across all brands and all agencies.',

    faq_h2: 'What dealer groups ask us first.',
    faqs: [
      { question: 'Every brand has its own agency. How does this fit in between?', answer: 'As an independent layer above them. We change nothing in your agencies\' accounts; we fix one definition and measure every brand the same way. Your agencies keep their work, you get a picture that holds across all brands.' },
      { question: 'What if the scan shows everything is fine?', answer: 'Then we say so, per location. A museum we measured this week came out mostly as good news, and that is what its page says. A scan that may only deliver bad news is not a measurement.' },
      { question: 'What does it cost?', answer: 'The scan is free. After that you choose: monitoring only from 399 a month, or the full diagnosis on your own numbers. You keep the report, even if you do nothing further with us.' },
    ],

    slot_h2: 'Start with the scan.',
    slot_sub: 'Fifteen minutes per location. No access to your accounts needed. You see which buying questions in your region you are missing from, and who is there instead.',
  },
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const nl = locale !== 'en'
  return localizedMetadata({
    locale,
    path: '/voor-dealers',
    title: nl ? 'Marketing voor dealergroepen' : 'Marketing for dealer groups',
    description: nl
      ? 'Landelijk groot, op de koopvraag om de hoek onzichtbaar. Gratis scan per vestiging in een kwartier. Wij koppelen je DMS niet, en zeggen dat erbij.'
      : 'Large nationally, invisible on the buying question around the corner. Free scan per location in fifteen minutes. We do not connect your DMS, and we say so.',
  })
}

export default async function DealersPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  return <VoorWiePage locale={locale} c={locale === 'en' ? COPY.en : COPY.nl} melding="retail-regio" />
}
