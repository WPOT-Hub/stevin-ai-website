import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { localizedMetadata } from '@/lib/seo'
import VoorWiePage, { type VoorWieCopy } from '@/components/VoorWiePage'

type Props = { params: Promise<{ locale: string }> }

// Nieuw 5 sep 2026 (W-042). Opbouw: components/VoorWiePage.tsx. Een van drie
// cultuurpagina's (/musea, /podia, /evenementen); /cultuur verdeelt.
//
// Onderbouwing van de bio en de patronen, zonder namen op de pagina:
// - Belgische tournee van een internationale circusshow, 2023, mediaplan en
//   strategie bij June20 (Koens huidige bureau, hij bracht de ervaring mee):
//   twee steden achter elkaar, fases on-sale / onderhoud / premiere / laatste
//   dagen, doel 50 procent van de capaciteit open bij on-sale, digitaal 30
//   procent van de verkoop, Brussel 140.000 tickets en netto 11,2 mln box
//   office als doel. DAAR komt de "11 mln" vandaan die eerst op de museapagina
//   stond; hier hoort hij thuis en hier staat hij als schaal, niet als claim.
// - IJsshow in Antwerpen en Brussel, seizoen 2019-2020, bij Addurance (Koen):
//   koper is de moeder, 25-44, 2 a 3 tickets per bestelling, bezoek uit een
//   straal van zo'n 60 km, verkoop trekt zo'n 40 dagen voor de eerste show
//   aan, budget 50/50 over twee steden, promotor maakt de creatie omdat de
//   licentiegever streng is, social doet de licentiegever zelf.
// Bronnen: ~/Downloads/Kurios Belgium MK Strategy.pptx en het mediaplan 2023
// (NIET DELEN), ~/Documents/Koen/addurance/Gracia Live/Disney on Ice/*.
// Er is hier geen vindbaarheidsscan als meting: een tourshow heeft een datum
// en die scan meet doorlopende vraag. De meetsectie draagt daarom de vier
// getallen die in elk showplan terugkomen, als patroon, met de bron erbij.
// Geen klantnamen, geen licentiegevers: werk van bureaus voor hun klanten.

const COPY: Record<'nl' | 'en', VoorWieCopy> = {
  nl: {
    eyebrow: 'Voor evenementen en tourshows',
    h1_line: 'De datum schuift niet.',
    h1_accent: 'De verkoop wel.',
    sub: 'Een tournee heeft een on-sale, een premiere en laatste dagen, en daartussen tien weken waarin de verkoop elke dag iets zegt. Wij lezen dat elke dag, per stad, en zeggen wat er nu moet gebeuren in plaats van wat er vorige week gebeurd is.',
    cta: 'Vraag de gratis scan aan',
    cta_reason: 'Een kwartier werk aan onze kant, geen verplichting. Je ziet meteen op welke koopvragen rond jouw show een ander het antwoord geeft.',
    cta_sec: 'Bekijk de tarieven',

    scan_eyebrow: 'Wat in elk showplan terugkomt',
    scan_h2: 'Vier getallen die elke tournee bepalen, en die zelden naast elkaar staan.',
    scan_p: 'Uit tien jaar mediaplannen voor tournees, ijsshows en circusproducties in Nederland en Belgie. Geen theorie, de patronen die in de verkoopdata van elke stad terugkwamen.',
    scan_cijfers: [
      { n: '60 km', t: 'is de straal waar het overgrote deel van je publiek vandaan komt, per stad opnieuw' },
      { n: '40 dagen', t: 'voor de eerste show trekt de verkoop aan. Tot dan koop je bekendheid, daarna urgentie' },
      { n: '2 a 3', t: 'tickets per bestelling, meestal gekocht door een moeder tussen de 25 en 44' },
    ],
    scan_slot: 'En het vierde getal: bij on-sale wil je een deel van de zaal al vol hebben, want een lege eerste week is het duurste wat je kunt kopen. Elke stad heeft die vier getallen, en bijna nooit staan ze in een systeem naast het mediaplan. Dan stuur je op het gevoel van de promotor, en die heeft meestal gelijk, tot de keer dat hij het niet heeft.',

    kost_h2: 'Elke week hetzelfde mediaplan, terwijl de koper elke week iets anders nodig heeft.',
    kost_p: 'Voor on-sale koop je bekendheid, rond de premiere praat de stad, in de laatste dagen koop je urgentie. Wie een vlak mediaplan draait, geeft in week twee te veel uit aan mensen die pas in week acht beslissen, en houdt in week negen te weinig over voor wie nu wil kopen.',
    kost_uitweg: 'De scan laat in een kwartier zien wie er nu op de koopvragen rond je show staat. Daarna beslis jij.',

    eerlijk_h2: 'Twee dingen die wij niet doen.',
    eerlijk: [
      { t: 'Wij koppelen je ticketing niet', d: 'Geen koppeling met je ticketplatform of je verkoopsysteem. Wij zien de verkoop zoals jij hem ons geeft: een export, een dagelijks getal per stad. Dat is genoeg om op te sturen, en het is eerlijker dan doen alsof we in je kassa kijken.' },
      { t: 'Wij zijn geen mediabureau met een inkoopmarge', d: 'Wij kopen geen media in en verdienen niets aan je spend. Je bureau of je promotor blijft dat doen. Wij zijn de laag die elke dag meekijkt, vastlegt wat werkte, en de volgende stad daarmee begint.' },
    ],

    krijg_h2: 'Wat je wel krijgt.',
    krijg: [
      { t: 'Per stad, per fase, per dag', d: 'Verkoop, zoekvraag en advertentiedruk per stad naast elkaar, in de fase waar die stad in zit. On-sale in Brussel is niet hetzelfde als laatste dagen in Antwerpen, en het plan hoort dat te weten.' },
      { t: 'Een geheugen dat de tournee overleeft', d: 'Wat de vorige stad deed, wat de vorige show in deze stad deed, en wat je ervan leerde. De beste doelgroep voor een show is wie de vorige zag, en dat weet niemand meer als het bureau of de promotor wisselt.' },
      { t: 'Wie er rond je show adverteert', d: 'De advertentieregisters van Google en Meta zijn openbaar. Welke shows, parken en dagjes-uit in jouw stad adverteren in jouw weken, en waarmee. Dit werkt al voordat je klant bent.' },
    ],

    canon_h2: 'Waarom ons advies klopt.',
    canon_sub: 'Onder elk advies ligt een kennislaag van 105 principes uit gepubliceerd onderzoek. Drie ervan gaan over precies dit vak: een deadline, een breed publiek en een koper die pas laat beslist.',
    principes: [
      { p: 'Bereik de hele categoriekoper: het meeste volume komt van wie zelden gaat.', u: 'Zelfs sterke merken halen de helft van hun kopers uit mensen die een of twee keer per jaar kopen. Voor een show: het gezin dat een keer per jaar iets groots doet, niet de liefhebber die alles ziet.', bron: 'Ehrenberg-Bass', grens: 'Betekent niet dat je eigen database niets waard is. Wie de vorige show zag is je beste eerste week, alleen niet je hele zaal.' },
      { p: 'Alleen echte, tijdelijke schaarste, als zichtbare daad.', u: 'Laatste dagen, laatste rijen, een datum die niet schuift: dat is echte schaarste en die werkt. Kunstmatige urgentie beschadigt vertrouwen en raakt aan consumentenrecht.', bron: 'Cialdini', grens: 'Betekent niet dat je elke week "bijna uitverkocht" mag roepen. Een tournee heeft die luxe niet nodig, de datum is de schaarste.' },
      { p: 'Beoordeel resultaten pas na een volledige conversiecyclus.', u: 'Kosten zijn direct compleet, kaartjes druppelen na. Wie in week twee bijstuurt op de verkoop van week twee, stuurt op ruis: die koper beslist over zes weken.', bron: 'Praktijkprincipe uit de kennislaag', grens: 'Betekent niet dat je wacht tot de premiere. De kostenkant en de zoekvraag zie je meteen, en daar stuur je op.' },
    ],

    waarom_h2: 'Waarom wij dit weten.',
    waarom_p1: 'Gebouwd door iemand die twintig jaar aan de andere kant van de factuur zat, en daar de online media deed voor ijsshows en internationale circusproducties in Nederland en Belgie. Twee steden achter elkaar, een on-sale in maart, een premiere in de zomer, laatste dagen in de herfst, en een promotor die elke ochtend als eerste naar het verkoopgetal keek.',
    waarom_p2: 'Wat daar altijd ontbrak: die verkoopcijfers stonden in het ene systeem en het mediaplan in het andere, en wat de vorige stad had geleerd zat in het hoofd van wie die stad gedaan had. Daarom begint dit bij per stad meten, per fase sturen en vastleggen wat je probeerde, zodat de volgende tournee niet bij nul begint.',

    faq_h2: 'Wat promotors ons eerst vragen.',
    faqs: [
      { question: 'Ons mediabureau doet de inkoop al. Wat voegt dit toe?', answer: 'Niets aan de inkoop, alles aan het sturen. Wij kopen niets en verdienen niets aan je spend. Wij kijken elke dag mee per stad en per fase, leggen vast wat werkte, en geven je bureau een reden om te verschuiven voordat de week om is.' },
      { question: 'De licentiegever bepaalt de creatie en doet social zelf. Past dit dan?', answer: 'Ja, dat is de normale situatie bij grote titels. Wij veranderen niets in accounts en maken geen creatie. Wij lezen wat de verkoop en de zoekvraag per stad doen en zeggen waar het budget nu moet zitten, binnen wat de licentiegever toestaat.' },
      { question: 'Wat kost het?', answer: 'De scan is gratis. Daarna kies je: alleen meekijken vanaf 399 per maand, of de volledige diagnose op je eigen cijfers. Je houdt het rapport, ook als je daarna niets met ons doet.' },
    ],

    slot_h2: 'Begin met de scan.',
    slot_sub: 'Een kwartier. Geen toegang tot je accounts nodig. Je ziet wie er nu op de koopvragen rond je show staat, per stad.',
  },
  en: {
    eyebrow: 'For events and touring shows',
    h1_line: 'The date does not move.',
    h1_accent: 'Sales do.',
    sub: 'A tour has an on-sale, a premiere and last days, and ten weeks in between where sales say something every day. We read that every day, per city, and say what has to happen now instead of what happened last week.',
    cta: 'Request the free scan',
    cta_reason: 'Fifteen minutes of work on our side, no commitment. You see straight away which buying questions around your show someone else is answering.',
    cta_sec: 'See pricing',

    scan_eyebrow: 'What comes back in every show plan',
    scan_h2: 'Four numbers that decide every tour, and rarely sit side by side.',
    scan_p: 'From ten years of media plans for tours, ice shows and circus productions in the Netherlands and Belgium. Not theory: the patterns that came back in the sales data of every city.',
    scan_cijfers: [
      { n: '60 km', t: 'is the radius most of your audience comes from, city by city' },
      { n: '40 days', t: 'before the first show, sales pick up. Until then you buy awareness, after that urgency' },
      { n: '2 to 3', t: 'tickets per order, usually bought by a mother between 25 and 44' },
    ],
    scan_slot: 'And the fourth number: at on-sale you want part of the house sold already, because an empty first week is the most expensive thing you can buy. Every city has those four numbers, and almost never do they sit in a system next to the media plan. Then you steer on the gut of the promoter, who is usually right, until the one time he is not.',

    kost_h2: 'The same media plan every week, while the buyer needs something different every week.',
    kost_p: 'Before on-sale you buy awareness, around the premiere the city talks, in the last days you buy urgency. A flat media plan spends too much in week two on people who decide in week eight, and has too little left in week nine for the people who want to buy now.',
    kost_uitweg: 'The scan shows in fifteen minutes who sits on the buying questions around your show. Then you decide.',

    eerlijk_h2: 'Two things we do not do.',
    eerlijk: [
      { t: 'We do not connect your ticketing', d: 'No integration with your ticketing platform or sales system. We see sales the way you give them to us: an export, a daily number per city. That is enough to steer on, and more honest than pretending we look into your till.' },
      { t: 'We are not a media agency with a buying margin', d: 'We buy no media and earn nothing on your spend. Your agency or promoter keeps doing that. We are the layer that watches every day, records what worked, and starts the next city with it.' },
    ],

    krijg_h2: 'What you do get.',
    krijg: [
      { t: 'Per city, per phase, per day', d: 'Sales, search demand and advertising pressure per city side by side, in the phase that city is in. On-sale in Brussels is not the same as last days in Antwerp, and the plan should know that.' },
      { t: 'A memory that outlives the tour', d: 'What the previous city did, what the previous show did in this city, and what you learned. The best audience for a show is whoever saw the last one, and nobody remembers that once the agency or promoter changes.' },
      { t: 'Who advertises around your show', d: 'The ad registers of Google and Meta are public. Which shows, parks and days out advertise in your city in your weeks, and with what. This works before you are a client.' },
    ],

    canon_h2: 'Why the advice holds.',
    canon_sub: 'Under every piece of advice sits a knowledge layer of 105 principles from published research. Three of them are about exactly this trade: a deadline, a broad audience and a buyer who decides late.',
    principes: [
      { p: 'Reach the whole category buyer: most volume comes from people who rarely go.', u: 'Even strong brands draw half their buyers from people who buy once or twice a year. For a show: the family that does one big thing a year, not the fan who sees everything.', bron: 'Ehrenberg-Bass', grens: 'Does not mean your own database is worthless. Whoever saw the last show is your best first week, just not your whole house.' },
      { p: 'Only real, temporary scarcity, as a visible act.', u: 'Last days, last rows, a date that does not move: that is real scarcity and it works. Artificial urgency damages trust and touches consumer law.', bron: 'Cialdini', grens: 'Does not mean you may shout "almost sold out" every week. A tour does not need that luxury; the date is the scarcity.' },
      { p: 'Judge results only after a full conversion cycle.', u: 'Costs are complete immediately, tickets trickle in. Anyone correcting in week two on week two sales is steering on noise: that buyer decides in six weeks.', bron: 'Practice principle from the knowledge layer', grens: 'Does not mean you wait for the premiere. The cost side and search demand you see straight away, and that is what you steer on.' },
    ],

    waarom_h2: 'Why we know this.',
    waarom_p1: 'Built by someone who spent twenty years on the other side of the invoice, doing the online media for ice shows and international circus productions in the Netherlands and Belgium. Two cities back to back, an on-sale in March, a premiere in summer, last days in autumn, and a promoter who looked at the sales number first thing every morning.',
    waarom_p2: 'What was always missing: those sales numbers sat in one system and the media plan in another, and what the previous city had taught sat in the head of whoever had done that city. So this starts with measuring per city, steering per phase and recording what you tried, so the next tour does not start from zero.',

    faq_h2: 'What promoters ask us first.',
    faqs: [
      { question: 'Our media agency already does the buying. What does this add?', answer: 'Nothing to the buying, everything to the steering. We buy nothing and earn nothing on your spend. We watch every day per city and per phase, record what worked, and give your agency a reason to shift before the week is over.' },
      { question: 'The licensor controls the creative and runs social itself. Does this still fit?', answer: 'Yes, that is the normal situation with big titles. We change nothing in accounts and make no creative. We read what sales and search demand do per city and say where the budget should sit now, within what the licensor allows.' },
      { question: 'What does it cost?', answer: 'The scan is free. After that you choose: monitoring only from 399 a month, or the full diagnosis on your own numbers. You keep the report, even if you do nothing further with us.' },
    ],

    slot_h2: 'Start with the scan.',
    slot_sub: 'Fifteen minutes. No access to your accounts needed. You see who sits on the buying questions around your show now, per city.',
  },
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const nl = locale !== 'en'
  return localizedMetadata({
    locale,
    path: '/evenementen',
    title: nl ? 'Marketing voor evenementen en tourshows' : 'Marketing for events and touring shows',
    description: nl
      ? 'De datum schuift niet, de verkoop wel. Per stad, per fase, per dag meekijken, met een geheugen dat de tournee overleeft. Gratis scan in een kwartier.'
      : 'The date does not move, sales do. Daily oversight per city and per phase, with a memory that outlives the tour. Free scan in fifteen minutes.',
  })
}

export default async function EvenementenPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  return <VoorWiePage locale={locale} c={locale === 'en' ? COPY.en : COPY.nl} melding="influencer" />
}
