import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { localizedMetadata } from '@/lib/seo'
import VoorWiePage, { type VoorWieCopy } from '@/components/VoorWiePage'

type Props = { params: Promise<{ locale: string }> }

// Herbouwd 4 sep 2026, herschreven 5 sep (W-042). Opbouw: components/VoorWiePage.tsx.
// Gecontroleerd in de code: creative-verzadiging (src/services/creativeFatigue.ts,
// via runFullIntelligencePipeline in de scheduler), budgetscenario's uit
// dezelfde pijplijn, en geen enkel schrijfpad naar Google of Meta
// (src/core/governance/actionRequests.ts). LET OP voor deploy: W-046 (sheet-
// bridge meldt success op data van april) en W-032 (Meta sinds 22 juni niet
// gesynct) maken twee beloftes hieronder op dit moment niet waar voor een
// bestaande klant. Eerst fixen, dan live.
// De "meting" hier is geen vindbaarheidsscan maar het eigen bewijsstuk: de
// kennislaag zelf, met de cijfers uit docs/knowledge/ADVISOR_KNOWLEDGE.md en
// docs/research/SITE_CLAIMS_AUDIT_2026-09-04.md sectie 5.
// Principes woordelijk: kern 1, kern 4, kern 5.

const COPY: Record<'nl' | 'en', VoorWieCopy> = {
  nl: {
    eyebrow: 'Voor marketingteams en bureaus',
    h1_line: 'Je weet het maandag.',
    h1_accent: 'Het gebeurde dinsdag.',
    sub: 'De cijfers zijn er. Er kijkt alleen niemand doorlopend naar, en wat je vorig jaar leerde staat nergens. Wij kijken elke dag mee, melden wat afwijkt met de reden erbij, en veranderen niets zonder een mens met een naam.',
    cta: 'Vraag de gratis scan aan',
    cta_reason: 'Een kwartier werk aan onze kant, geen verplichting. Je ziet meteen op welke vragen van jouw klanten hun merk ontbreekt, per klant.',
    cta_sec: 'Bekijk de tarieven',

    scan_eyebrow: 'Wat er onder ligt',
    scan_h2: 'Geen zwarte doos. Een kennislaag die je kunt nalezen.',
    scan_p: 'Elk advies uit het systeem rust op principes uit gepubliceerd onderzoek, met bij elk principe de grens van wat het betekent. Geen model dat "iets ziet in de data", maar een redenering die je aan je klant kunt uitleggen en die je kunt tegenspreken.',
    scan_cijfers: [
      { n: '105', t: 'principes over zeven domeinen, van tracking tot merkopbouw' },
      { n: '27', t: 'met een citeerbaar anker: Ehrenberg-Bass, IPA Databank, Baymard, Cialdini, Kahneman' },
      { n: '12', t: 'conflictregels voor als twee principes elkaar tegenspreken' },
    ],
    scan_slot: 'Het sterkste deel is niet de lijst maar de grens. Bij 60/40 merk en activatie staat er: een kalibratiepunt per categorie, groeifase, budget en koopfrequentie, geen wet. Een belofte kan iedereen nazeggen. Een kennislaag met bronnen en grenzen niet.',

    kost_h2: 'Elke dag tussen het afwijken en het opmerken betaal je de volle prijs voor een creative die op is.',
    kost_p: 'Een uiting verliest zijn kracht in de loop van dagen, niet in een keer. De klikprijs loopt op, de doorklik zakt, en het weekrapport ziet het pas als het al een week duurt. Datzelfde geldt voor een meting die stil stukgaat.',
    kost_uitweg: 'De scan laat in een kwartier zien waar een klant nu staat. Daarna beslis jij.',

    eerlijk_h2: 'Twee dingen die wij niet doen.',
    eerlijk: [
      { t: 'Wij veranderen niets in je accounts', d: 'Er zit geen schrijfpad naar Google of Meta in dit systeem, met opzet. Elk voorstel wordt een taak met een naam eronder, en een mens voert het uit of legt uit waarom niet. Geen tweede hand die zonder overleg aan je budgetten zit.' },
      { t: 'Wij zijn geen dashboard erbij', d: 'Je hebt er al twee. Hier hoef je niet te kijken: je krijgt een melding als iets afwijkt, met de reden, het voorstel en de bron, zodat je het kunt nakijken.' },
    ],

    krijg_h2: 'Wat je wel krijgt.',
    krijg: [
      { t: 'Creative-verzadiging voordat je het voelt', d: 'Doorklikratio over rollende vensters, stijgende klikprijs, dalende interactie en tijd in de markt. Je hoort het terwijl je er nog iets aan kunt doen, niet in de evaluatie.' },
      { t: 'Verse data, of het staat er als oud', d: 'Elke koppeling schrijft weg wanneer hij voor het laatst slaagde. Loopt een sync vast, dan staat er stale, geen grafiek die stil doorloopt op cijfers van vorige maand.' },
      { t: 'Een geheugen dat blijft', d: 'Wat je vorig jaar in dezelfde week deed, wat het kostte en wat je leerde. Vertrekt de persoon die het wist, dan blijft het staan.' },
    ],

    canon_h2: 'Drie principes die we ook op onszelf toepassen.',
    canon_sub: 'Zoals ze in het systeem staan, met hun grens erbij. Een principe zonder grens is een dogma.',
    principes: [
      { p: 'Controleer tracking en conversieconfiguratie voordat je iets anders beoordeelt.', u: 'Een event dat op het verkeerde moment vuurt maakt elke diagnose ongeldig. De klassiekers: een aankoop-event bij het laden van de pagina, en UTM-tags die onderweg sneuvelen.', bron: 'Praktijkprincipe uit de kennislaag', grens: 'Betekent niet dat je zonder perfecte meting niet mag adverteren. Wel dat je je cijfers dan niet blind interpreteert.' },
      { p: 'Reken elk kanaal af op business-uitkomsten over kanalen heen, nooit op kanaal-eigen metrics.', u: 'E-mail duwt conversies die ergens anders landen, en bereikkanalen laten zich zien als lift op merkzoekvraag, niet op hun eigen last-click.', bron: 'Praktijkprincipe uit de kennislaag', grens: 'Betekent niet dat opens en kliks nutteloos zijn. Ze blijven diagnostiek, ze horen alleen niet in de stuurlaag.' },
      { p: 'Weeg platform-aanbevelingen als verkoopsignaal: eis bewijs voordat je iets doorvoert.', u: 'De optimalisatiescore is een verkoopmetric, en automatische verfraaiingen passen je creatie aan zonder dat je het vroeg.', bron: 'Praktijkprincipe uit de kennislaag', grens: 'Betekent niet dat aanbevolen functies nooit werken. Met een deugend conversiesignaal eronder kunnen ze prima zijn.' },
    ],

    waarom_h2: 'Waarom wij dit weten.',
    waarom_p1: 'Gebouwd door iemand die twintig jaar aan de bureau-kant zat en er zelf een had. De maandrapportage, de exports, het samenvoegen: dat is niet een detail van dat werk, dat is het grootste deel ervan.',
    waarom_p2: 'Wat er zelden bij zat: iemand die er doorlopend naar keek, en een plek waar bleef staan wat je vorig jaar had geleerd. Dat zat in het hoofd van wie het account deed, en dat hoofd wisselde van baan.',

    faq_h2: 'Wat teams ons eerst vragen.',
    faqs: [
      { question: 'Wij zijn zelf een bureau. Is dit concurrentie?', answer: 'Nee. Wij nemen geen accounts over en wij veranderen niets in de jouwe. Wij zijn de laag die elke dag meekijkt en onthoudt, zodat jij je tijd aan je klant besteedt in plaats van aan het rapport. Je klant ziet jouw naam, niet de onze.' },
      { question: 'Welke koppelingen zijn er echt?', answer: 'Google Ads, Meta, GA4, Search Console, Tag Manager, Merchant Center, Shopify, WooCommerce, Klaviyo, Mailchimp, TikTok, LinkedIn, Pinterest en YouTube. Geen andere. Staat er iets niet bij, dan lezen we de export in en zeggen we dat erbij.' },
      { question: 'Wat kost het?', answer: 'De scan is gratis. Daarna kies je: alleen meekijken vanaf 399 per maand per klant, of de volledige diagnose. Je houdt het rapport, ook als je daarna niets met ons doet.' },
    ],

    slot_h2: 'Begin met de scan.',
    slot_sub: 'Een kwartier per klant. Geen toegang tot accounts nodig. Je ziet op welke vragen van hun kopers het merk ontbreekt, en wie daar wel staat.',
  },
  en: {
    eyebrow: 'For marketing teams and agencies',
    h1_line: 'You find out on Monday.',
    h1_accent: 'It happened on Tuesday.',
    sub: 'The numbers are there. Nobody watches them continuously, and what you learned last year is written down nowhere. We watch every day, flag what deviates with the reason attached, and change nothing without a person with a name.',
    cta: 'Request the free scan',
    cta_reason: 'Fifteen minutes of work on our side, no commitment. You see straight away which of your clients\' buyer questions their brand is missing from, per client.',
    cta_sec: 'See pricing',

    scan_eyebrow: 'What sits underneath',
    scan_h2: 'No black box. A knowledge layer you can read.',
    scan_p: 'Every piece of advice from the system rests on principles from published research, each with the limit of what it means. Not a model that "sees something in the data", but reasoning you can explain to your client and argue with.',
    scan_cijfers: [
      { n: '105', t: 'principles across seven domains, from tracking to brand building' },
      { n: '27', t: 'with a citable anchor: Ehrenberg-Bass, IPA Databank, Baymard, Cialdini, Kahneman' },
      { n: '12', t: 'conflict rules for when two principles disagree' },
    ],
    scan_slot: 'The strongest part is not the list but the limit. Under 60/40 brand and activation it says: a calibration point per category, growth stage, budget and purchase frequency, not a law. Anyone can repeat a promise. A knowledge layer with sources and limits, they cannot.',

    kost_h2: 'Every day between the deviation and the noticing, you pay full price for a creative that is spent.',
    kost_p: 'An execution loses its power over days, not all at once. Cost per click rises, click-through drops, and the weekly report sees it once it has lasted a week. The same goes for a measurement that quietly breaks.',
    kost_uitweg: 'The scan shows in fifteen minutes where a client stands now. Then you decide.',

    eerlijk_h2: 'Two things we do not do.',
    eerlijk: [
      { t: 'We change nothing in your accounts', d: 'There is no write path to Google or Meta in this system, by design. Every proposal becomes a task with a name under it, and a person carries it out or explains why not. No second pair of hands touching your budgets without a conversation.' },
      { t: 'We are not another dashboard', d: 'You already have two. Here you do not have to look: you get a notification when something deviates, with the reason, the proposal and the source, so you can check it.' },
    ],

    krijg_h2: 'What you do get.',
    krijg: [
      { t: 'Creative fatigue before you feel it', d: 'Click-through across rolling windows, rising cost per click, declining interaction and time in market. You hear it while you can still act, not in the evaluation.' },
      { t: 'Fresh data, or it is marked as old', d: 'Every connection records when it last succeeded. If a sync breaks, it says stale, not a chart quietly running on last month\'s numbers.' },
      { t: 'A memory that stays', d: 'What you did in the same week last year, what it cost and what you learned. If the person who knew it leaves, it stays.' },
    ],

    canon_h2: 'Three principles we apply to ourselves too.',
    canon_sub: 'As they sit in the system, with their limits. A principle without a limit is a dogma.',
    principes: [
      { p: 'Check tracking and conversion configuration before judging anything else.', u: 'An event firing at the wrong moment invalidates every diagnosis. The classics: a purchase event on page load, and UTM tags breaking along the way.', bron: 'Practice principle from the knowledge layer', grens: 'Does not mean you cannot advertise without perfect measurement. It means you do not read your numbers blindly.' },
      { p: 'Judge every channel on business outcomes across channels, never on channel-owned metrics.', u: 'Email pushes conversions that land elsewhere, and reach channels show up as lift on brand search, not on their own last click.', bron: 'Practice principle from the knowledge layer', grens: 'Does not mean opens and clicks are useless. They remain diagnostics; they just do not belong in the steering layer.' },
      { p: 'Treat platform recommendations as a sales signal: demand evidence before applying them.', u: 'The optimisation score is a sales metric, and automatic enhancements change your creative without being asked.', bron: 'Practice principle from the knowledge layer', grens: 'Does not mean recommended features never work. With a sound conversion signal underneath they can be perfectly good.' },
    ],

    waarom_h2: 'Why we know this.',
    waarom_p1: 'Built by someone who spent twenty years on the agency side and owned one. The monthly report, the exports, the merging: that is not a detail of the work, it is the bulk of it.',
    waarom_p2: 'What was rarely included: someone watching continuously, and a place where last year\'s lessons stayed. That lived in the head of whoever ran the account, and that person changed jobs.',

    faq_h2: 'What teams ask us first.',
    faqs: [
      { question: 'We are an agency ourselves. Is this competition?', answer: 'No. We take over no accounts and change nothing in yours. We are the layer that watches and remembers every day, so you spend your time on your client instead of on the report. Your client sees your name, not ours.' },
      { question: 'Which integrations actually exist?', answer: 'Google Ads, Meta, GA4, Search Console, Tag Manager, Merchant Center, Shopify, WooCommerce, Klaviyo, Mailchimp, TikTok, LinkedIn, Pinterest and YouTube. No others. If something is not on the list, we read the export and say so.' },
      { question: 'What does it cost?', answer: 'The scan is free. After that you choose: monitoring only from 399 a month per client, or the full diagnosis. You keep the report, even if you do nothing further with us.' },
    ],

    slot_h2: 'Start with the scan.',
    slot_sub: 'Fifteen minutes per client. No account access needed. You see which of their buyers\' questions the brand is missing from, and who is there instead.',
  },
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const nl = locale !== 'en'
  return localizedMetadata({
    locale,
    path: '/voor-marketingteams',
    title: nl ? 'Voor marketingteams en bureaus' : 'For marketing teams and agencies',
    description: nl
      ? 'Je weet het maandag, het gebeurde dinsdag. Elke dag meekijken, met een kennislaag van 105 principes eronder. Wij veranderen niets in je accounts zonder een mens met een naam.'
      : 'You find out on Monday, it happened on Tuesday. Daily oversight, with a knowledge layer of 105 principles underneath. We change nothing in your accounts without a person with a name.',
    image: nl ? 'https://stevin.ai/marketing/opengraph-image' : 'https://stevin.ai/en/marketing/opengraph-image',
  })
}

export default async function MarketingTeamsPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  return <VoorWiePage locale={locale} c={locale === 'en' ? COPY.en : COPY.nl} melding="meta-storing" />
}
