import { Fragment } from 'react'
import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { Ruler, ClipboardCheck, KeyRound, ChevronRight } from 'lucide-react'
import FAQAccordion from '@/components/FAQAccordion'
import StickyMobileCTA from '@/components/StickyMobileCTA'
import MarketingMemoryDemo from '@/components/MarketingMemoryDemo'
import StevinBrainVisual from '@/components/StevinBrainVisual'
import DeskProof from '@/components/DeskProof'
import KlantLogos from '@/components/KlantLogos'
import QuoteRotator from '@/components/QuoteRotator'
import BrainEdgeStrip from '@/components/BrainEdgeStrip'
import HeroHeadline from '@/components/HeroHeadline'
import { editorials } from '@/data/articles'
import { PosterWatermark } from '@/components/blog/PosterWatermark'

type Props = { params: Promise<{ locale: string }> }

// Homepage-copy voor de positionering van 19 jul 2026 (docs/research/
// website-positionering-2026-07 in Stevin-Hub). Inline per taal, zelfde
// patroon als eerdere iteraties: makkelijk itereren zonder de brede
// marketing-i18n te raken.
const COPY = {
  nl: {
    eyebrow: 'Voor bedrijven die betalen voor marketing',
    // Herschreven 13 sep 2026 (W-078). Koen: het moet simpeler, en het moet
    // duidelijk zijn dat we ook begeleiden en campagnes draaien waar nodig.
    // Wat we meten hangt af van wat het bedrijf verkoopt: telefoontjes voor wie
    // daarvan leeft, merkprestatie voor wie via de winkel verkoopt.
    hero_sub_1: 'Wij zetten alles terug op jouw naam, zorgen dat elke aanvraag geteld wordt, en laten je per week zien wat het oplevert: telefoontjes, verkopen, verkochte tickets. Daarna draaien we je campagnes, of we begeleiden je eigen mensen. En ',
    hero_sub_bold: 'alles blijft van jou.',
    cta_primary: 'Start de diagnose',
    cta_secondary: 'Kijk zelf mee',
    cta_micro: 'Eerst de diagnose op jouw eigen data. Daarna pas een voorstel.',
    // W-078, 13 sep: 'dag en nacht' klopte niet. De signaalscan draait drie keer
    // per dag (03:00, 07:00, 13:00) en de afwijkingscontrole alleen op werkdagen.
    // Het getal in de eerste chip is positionering en blijft een keuze van Koen.
    chips: ['1,9 mln advertenties in beeld', 'Elke dag gecontroleerd'],
    connectors_label: 'Leest mee op al je kanalen',

    herken_eyebrow: 'Herken je dit?',
    // Vier in plaats van zes, en letterlijk uit de gesprekken
    // (04_KLANTTAAL_BIBLIOTHEEK.md, 89 citaten uit 54 Plaud-gesprekken). De
    // blauwdruk vroeg om vier; er waren er later twee bijgekomen, allebei van
    // dezelfde creatief directeur. Twee keer dezelfde stem in een muur van zes
    // leest alsof je mensen tekortkwam, en het waren bureau-citaten terwijl de
    // lezer hier de ondernemer is. Die horen op /marketing-voor-bureaus.
    //
    // Deze vier dekken vier hoeken: geld weg, geen zicht, geen eigendom, geen
    // geheugen. Vier verschillende stemmen, vier verschillende schaalgroottes.
    herken_h2: 'Vier dingen die wij elke week horen.',
    quotes: [
      { q: 'Op een maand tijd had ik voor bijna 1100 euro leads en ik heb er geen een.', a: 'Installatiebedrijf' },
      { q: 'Nee, dat is allemaal op gevoel. En in het hoofd.', a: 'Eigenaar, handelsbedrijf' },
      // 13 sep 2026 (W-078): het marge-citaat is eruit. Bij het herlezen van
      // transcript 42e784ac bleek de passage 00:13:40 tot 00:14:22 te gaan over
      // een groothandelaar die zijn inkoopprijs kende bij zijn bol.com-handel.
      // Geen woord over data, accounts of bureaus. Stond hier dus in een
      // betekenis die de spreker niet bedoelde. Vervangen door een citaat dat
      // wel over dit onderwerp gaat, uit het gesprek van 30 juli.
      { q: 'Daar betalen wij maandelijks een godsvermogen voor en er gebeurt niks.', a: 'Dak- en gevelbedrijf' },
      { q: 'Dat zijn allemaal aparte systemen met bepaalde toegangen. Maar er zit nergens een link of een centraal geheugen.', a: 'Marketingverantwoordelijke, internationaal merk' },
      // Vanaf hier de pool waaruit de vier vakken om de zoveel seconden een
      // citaat wisselen (components/QuoteRotator.tsx). Sector wel, naam nooit:
      // niet de instelling, niet het bureau waar het over gaat.
      { q: 'Heb het gevoel dat we altijd weer opnieuw beginnen.', a: 'Concertzaal, over hun bureau' },
      // Strekking van Koen (13 sep 11:23), gesprek van 30 juli: het bureau zei
      // dat het op hun accounts moest draaien, anders konden ze niet bij alle
      // gegevens. LETTERLIJKE ZIN NOG NAKIJKEN in het transcript voor deploy.
      { q: 'Het moest op hun accounts draaien, anders konden ze niet bij alle gegevens.', a: 'Bouwbedrijf, over hun bureau' },
    ],
    // "Zelfs bureaus zeggen het zelf" is er 4 sep 2026 uit (W-042). Onnagekeken
    // bewering over derden, zonder bron, en het schuurt tegen de generieke
    // anti-bureau-framing die D-038 verbiedt. De rest van dit blok is
    // onaantastbaar omdat elk woord uit een echt gesprek komt; die ene zin was
    // het enige wat niet hard te maken viel.
    herken_close: 'Dit zijn geen uitzonderingen. Zo werkt het zolang niemand meekijkt.',
    herken_bron: 'Uit echte diagnosegesprekken, geanonimiseerd.',

    // Beat 2, toegevoegd 4 sep 2026 (W-042). Deze stap ontbrak: de pagina ging
    // van herkenning meteen naar de checks, zonder ooit te beantwoorden waarom
    // dit NU speelt. Bewust geen aanval op wie met AI bouwt: het punt is dat er
    // meer gebouwd wordt dan ooit, en dat een betrouwbare basis daardoor
    // zwaarder telt, niet lichter. Toon volgt proof_rules uit de canonieke
    // copyconfig: een concrete vraag verslaat een abstracte belofte.
    // Herschreven 13 sep 2026 (W-078) uit de uitgelezen verkoopgesprekken, niet
    // uit onze eigen woorden. Elke regel hieronder staat letterlijk zo in een
    // transcript, geanonimiseerd naar branche zoals het blok "Herken je dit".
    // Panman 18 aug 00:09:38, VOCA 18 jun 00:09:30, Nancy Schepers 9 sep 06:30
    // en 42:12, Hans Schepers 9 sep 20:33, Panman 30 jul 00:03:00.
    nu_eyebrow: 'Waarom wij',
    nu_h2: 'Je krijgt een factuur en een rapportje. Wat er gebeurd is, zie je niet.',
    nu_intro: '"Ik heb hier wel alle facturen, maar niet echt direct een rapportage." En: "Daar krijgen we inderdaad een rapportje van achteraf." Twee ondernemers, twee verschillende branches, dezelfde zin. Zo begint bijna elk gesprek dat wij voeren.',
    nu_kern: '"Dan moet ik maar vooropvertrouwen, want ik kan het niet zien." Dat is het echte probleem. Niet dat er te weinig gebeurt, maar dat je het niet kunt nakijken. En wie het niet kan nakijken, kan ook niet zien of het volgende voorstel klopt.',
    nu_punten: [
      // W-078, Koen 13 sep 11:41: "bekt niet helemaal lekker, 4 past ook net
      // niet mooi". Drie kaarten in een raster van drie, allemaal een citaat,
      // korter. De vierde (meetscript, wijzigingslogboek) was geen citaat en
      // zei wat check 02 onder "Kijk zelf mee" al zegt.
      { t: '"Er gebeurt niks"', d: 'Twee ondernemers, twee weken na elkaar, allebei over een rekening van duizend euro per maand. Of het waar was, wisten ze geen van beiden. Dat is precies het punt.' },
      { t: '"Ik ben het overzicht helemaal kwijt"', d: 'Vier systemen, drie inlogs, en een bureau dat onder jouw naam inlogt. Dat hoef je niet zelf bij te houden. Iemand moet het wel doen.' },
      // Koen 13 sep 12:14, gesprek van 30 juli. Cijfers uit dat gesprek, niet
      // zuiver vergelijkbaar (nieuwe naam, nieuw domein ertussen), en dat
      // staat er dan ook bij.
      { t: '"Sinds het bureau het heeft overgenomen komt er niks meer binnen"', d: 'Zelf gedaan: een paar honderd euro per maand, vier tot vijf aanvragen per dag. Via het bureau: tweeduizend per maand, vier tot vijf per week. Niet zuiver vergelijkbaar, er zat een nieuwe naam en een nieuwe site tussen. Maar de conversiemeting stond aan en telde niet wat er echt binnenkwam, dus stuurde Google op het verkeerde cijfer.' },
    ],
    nu_slot: 'Wij zorgen eerst dat klopt wat er binnenkomt, zodat Google en Meta echte aanvragen te zien krijgen in plaats van knopklikken. Dan gaan ze harder voor je werken. En het telt zwaarder dan vroeger, want wat zo\'n systeem voor jou kan uitrekenen hangt af van wat het van jou weet. Die geschiedenis bouwt zich op in het account waar hij staat, dus hoe langer je wacht, hoe duurder de overstap wordt. Een keer de pleister eraf. En bij ons gaat er niets uit de lucht: geen dag zonder site, geen dag zonder mail.',

    ladder_eyebrow: 'De volgorde',
    ladder_h2: 'Wat er moet kloppen voordat AI iets voor je kan betekenen.',
    ladder_sub: 'Niet omdat het braaf is, maar omdat elke stap de volgende mogelijk maakt. Sla er een over en alles daarboven is gokwerk met meer rekenkracht.',
    ladder_grip: 'Eerst grip',
    ladder_dan: 'Dan pas dit',
    ladder: [
      { n: '01', t: 'Op jouw naam', d: 'De accounts staan op naam van je bedrijf en jij bepaalt wie erbij mag. Zonder dit kun je morgen niet wisselen van uitvoerder, hoe goed de rest ook staat.' },
      { n: '02', t: 'Meting', d: 'Een conversie is een echte aanvraag, geen knopklik. Vuurt je meting op het verkeerde moment, dan is elk cijfer erboven onbruikbaar.' },
      { n: '03', t: 'Een bron', d: 'Een plek waar de cijfers samenkomen, in plaats van vier dashboards die elkaar tegenspreken. Anders discussieer je over wie gelijk heeft in plaats van over wat je doet.' },
      { n: '04', t: 'Geheugen', d: 'Wat is er geprobeerd, waarom, en wat kwam eruit. Zonder dat begint elke nieuwe partij weer bij nul, en betaal je twee keer voor dezelfde les.' },
      { n: '05', t: 'Automatiseren', d: 'Pas hier. Wat vier keer hetzelfde gaat, kan zichzelf doen. Daarvoor is het gokken welk werk je automatiseert.' },
      { n: '06', t: 'AI', d: 'Bovenop, niet eronder. Met de vier stappen hierboven op orde is dit een vliegwiel. Zonder is het een dure manier om sneller de verkeerde kant op te sturen.' },
    ],
    ladder_slot: 'Wij beginnen altijd onderaan. Niet omdat het de leukste kant is, maar omdat de rest daar op rust.',

    checks_eyebrow: 'Kijk zelf mee',
    checks_h2: 'Vertrouw ons niet op ons woord.',
    checks_sub: 'Je kunt vandaag zelf controleren hoe jouw marketing ervoor staat. Drie checks. De meeste ondernemers hebben ze nog nooit gedaan, omdat bijna niemand weet dat het kan.',
    checks: [
      { t: 'Wie betaalt jouw advertenties?', d: 'Google zet het gewoon openbaar online. Zoek je bedrijf op in het transparantieregister.', r: 'Staat daar een andere naam dan de jouwe?' },
      { t: 'Wist je dat je advertentie-account een logboek heeft?', d: 'Elke wijziging staat erin, met datum en gebruiker. Open het en kijk wat er de afgelopen 90 dagen echt is gedaan.', r: 'De meeste eigenaren hebben het nog nooit geopend.' },
      { t: 'Klopt je meting?', d: 'Tel je aanvragen van vorige maand. Staat hetzelfde aantal in het rapport dat je krijgt?', r: 'Vaak niet. En dan stuurt iedereen op de verkeerde cijfers.' },
    ],
    fig_label: 'fig. 01',
    fig_title: 'logboek van een advertentie-account',
    fig_before: 'Voor: 12 maanden onder een bureau',
    fig_after: 'Na: een maand onder Stevin',
    fig_before_ticks: ['JUL', 'AUG', 'SEP', 'OKT', 'NOV', 'DEC'],
    fig_after_ticks: ['W1', 'W2', 'W3', 'W4'],
    fig_caption: 'Geanonimiseerd voorbeeld uit een echte diagnose. Elke wijziging die wij doen staat in ditzelfde logboek, en jij kijkt altijd mee.',
    checks_cta: 'Wij lopen deze checks met je door',
    checks_link: 'Zo controleer je ons',

    how_eyebrow: 'Hoe het werkt',
    how_h2: 'Eerst bewijzen, dan pas beheren.',
    how_link: 'Bekijk de volledige werkwijze',
    steps: [
      {
        num: '01', kop: 'Diagnose', t: 'Zwart op wit waar je staat',
        d: 'We beginnen niet met een contract, maar met jouw data. Je ziet zwart op wit wat er goed staat en wat niet. Vrijblijvend, en je houdt het rapport.',
        b: ['Meting: telt je rapportage echte aanvragen?', 'Accounts: staat alles op jouw naam?', 'Advertenties: wie staat er als betaler geregistreerd?'],
      },
      {
        num: '02', kop: 'Goed zetten', t: 'De basis waar elk bureau ooit "geen tijd" voor had',
        d: 'Voordat er ook maar een euro extra naar campagnes gaat, staat het fundament.',
        b: ['Accounts op jouw naam, toegang geregeld', 'Meting gerepareerd: elke aanvraag telt', 'Campagnes opgeruimd, verspilling eruit'],
      },
      {
        num: '03', kop: 'Erop letten', t: 'Wij kijken elke dag mee. Ook op ons eigen werk',
        d: 'Elk besluit wordt vastgelegd, en jij kijkt altijd mee in hetzelfde logboek.',
        b: ['Warm weer op komst? Je advertenties voor koeling en airco staan maandag klaar', 'Wij volgen dagelijks wat je concurrenten adverteren, en je krijgt de advertentie te zien met de datum erbij', 'Meting valt uit? Wij controleren het elke dag'],
      },
      {
        num: '04', kop: 'Alles blijft van jou', t: 'Stoppen kan altijd. Zonder iets kwijt te raken',
        d: 'Wij bouwen je exit in vanaf dag een. Daarom durven we het ook te zeggen.',
        b: ['Je accounts staan op jouw naam, dus je kunt er altijd zelf bij', 'Een overdraagbaar dossier met elk besluit', 'Kennis die bij je bedrijf blijft, wie er ook vertrekt'],
      },
    ],

    // 13 sep 2026 (W-078): 'je marketinggeheugen' is onze term. De winst voor
    // hem staat in de gesprekken: bij een wissel begon alles weer bij nul en
    // moest hij het opnieuw vertellen. Dat staat er nu boven, de demo blijft.
    demo_eyebrow: 'Alles blijft terug te vinden',
    demo_h2: 'Je hoeft het niet elk jaar opnieuw uit te leggen.',
    demo_lede: 'Elke campagne, elk besluit en wat eruit kwam blijft staan. Wie hier volgend jaar begint, leest zich in. Typ \"zomer\" en kijk wat er tevoorschijn komt.',

    who_eyebrow: 'Voor wie',
    who: [
      {
        k: 'Wij doen het werk', t: 'Je wilt er geen omkijken naar hebben, maar wel kunnen zien wat er gebeurt.',
        d: 'Wij richten in, draaien de campagnes en houden het bij. Jij kunt op elk moment nakijken wat er is gedaan en waarom. En je haalt ons er zelf af, zonder te bellen.',
        link: 'Zo werkt dat', href: '/voor-ondernemers', img: '/images/voor-ondernemers.jpg', alt: 'Team van een Stevin-klant tijdens een overleg',
      },
      {
        k: 'Je doet het straks zelf', t: 'Wij zetten het goed en draaien mee tot het staat.',
        d: 'Meestal zes tot twaalf maanden. Wat we doen en waarom komt in een dossier dat van jou is, zodat je eigen mensen meeleren. Daarna heb je ons alleen nog nodig om mee te kijken.',
        link: 'Zo werkt de overdracht', href: '/voor-marketingteams', img: '/images/voor-teams.jpg', alt: 'Marketingteam in overleg',
      },
    ],

    name_eyebrow: 'Waarom Stevin',
    name_h2: 'Vernoemd naar de ingenieur die alles goed zette.',
    name_cards: [
      { g: 'S', t: 'Simon Stevin', d: 'De ingenieur uit Brugge die wiskunde naar gewone taal bracht.' },
      { g: '■', t: 'Goed gezet', d: 'Alles gemeten, alles vastgelegd, alles controleerbaar. Vakwerk in plaats van verkooppraatjes.' },
      { g: '↓', t: 'Van jou', d: 'Wat er is geprobeerd en wat eruit kwam hoort bij jouw bedrijf. Je accounts, je cijfers en je geschiedenis, wie er ook wisselt.' },
    ],
    name_link: 'Het hele verhaal achter de naam',
    founder_quote: 'Twintig jaar zat ik aan de andere kant van de factuur. Ik weet hoe uren en mediamarges werken, want ik heb er zelf aan verdiend. Daarom is Stevin andersom gebouwd.',
    founder_role: 'Oprichter van Stevin',

    research_eyebrow: 'Ons onderzoek',
    research_h2: 'Staat jouw bedrijf er als betaler, of iemand anders?',
    research_chip: 'Teller loopt door',
    research_stats: [
      { v: '1,9 mln', l: 'advertenties van Nederlandse en Belgische bedrijven, doorlopend gevolgd in het openbare register van Google' },
    ],
    research_cta_h: 'Wij zoeken het voor je op',
    research_cta_b: 'Google en Meta zetten openbaar online wie er voor een advertentie betaalt. Wij kijken na wat er bij jouw bedrijf staat. Daar heb je geen inlog voor nodig en het kost je niets.',
    research_cta_link: 'Neem contact op',
    research_bron: 'Bron: doorlopend Stevin-onderzoek op het openbare transparantieregister van Google, Nederland en Belgie, stand 12 september 2026: 4.610 bedrijven in Nederland en Belgie waar een ander dan het bedrijf zelf als betaler van de advertenties geregistreerd staat.',
    research_body: 'Dit is Google en Meta. LinkedIn en TikTok tellen we hierna mee. Dit onderzoek loopt elke week door, en alles wat we vinden publiceren we met methode en al. Zo bouwen we het bewijs dat de markt anders kan.',
    research_link: 'Naar het onderzoek',

    price_eyebrow: 'Tarieven',
    price_value: '1.399',
    price_period: 'per maand, en na zes tot twaalf maanden 399',
    price_link: 'Bekijk alle tarieven',
    price_body: 'Wij doen het werk en draaien mee tot het staat. Zodra je eigen mensen het kunnen, zak je naar 399. Bij ons gaat het bedrag dus omlaag als het werkt, in plaats van omhoog. Geen marge op je mediabudget, en stoppen kan altijd met alles wat van jou is.',

    faq_eyebrow: 'Veelgestelde vragen',
    faq_h2: 'Wat iedereen eerst wil weten.',
    faqs: [
      { question: 'Wie is eigenaar van mijn accounts en data?', answer: 'Jij. Altijd. Accounts staan op naam van jouw bedrijf, je accounts staan op naam van jouw bedrijf, dus je kunt er zelf alles uit halen, en elk besluit staat in een dossier dat van jou is.' },
      { question: 'Wat gebeurt er als ik stop?', answer: 'Dan houd je alles: accounts, data, kennis en het volledige dossier. De overdracht zit er vanaf dag een in, dus stoppen kost je niets. Behalve ons.' },
      { question: 'Doen jullie het werk, of moet ik zelf nog iets?', answer: 'Wij doen het werk. Inrichten, campagnes draaien, bijhouden. Jij kunt op elk moment nakijken wat er is gedaan en waarom. Wil je het later zelf doen, dan draaien we mee tot je eigen mensen het kunnen.' },
      { question: 'Kan dit naast mijn huidige bureau?', answer: 'Ja. De diagnose is juist een goede tweede blik: staat het goed, dan weet je dat nu zeker. Staat het niet goed, dan heb je iets om te bespreken.' },
      { question: 'Wat kost het?', answer: 'Alles laten beheren: 1.399 per maand, en zodra je eigen mensen het kunnen zak je naar 399. Zelf doen met Stevin erbij: vanaf 399. Altijd pas na de diagnose, en geen marge op je mediabudget.' },
      { question: 'Wat doen jullie met AI, en is dat veilig?', answer: 'AI leest mee en signaleert, mensen beslissen. Het platform verandert uit zichzelf niets, data staat in de EU, en niets gaat de deur uit zonder dat een mens ernaar keek.' },
    ],

    closing_eyebrow: 'De volgende stap',
    closing_l1: 'Wij regelen het nu goed.',
    closing_l2: 'Alles blijft van jou.',
    closing_body: 'Start de diagnose. Binnen twee weken zie je zwart op wit hoe je marketing ervoor staat. Op jouw eigen cijfers.',
    closing_micro: 'In die twee weken kijken wij na wie er als betaler achter je advertenties staat, op wiens naam je accounts en je domein staan, en of je meting echte aanvragen telt. Je krijgt het op papier, ook als je verder niets met ons doet.',
  },
  en: {
    eyebrow: 'For companies that pay for marketing',
    hero_sub_1: 'We put everything back in your name, make sure every enquiry gets counted, and show you every week what it brings in: phone calls, sales, tickets sold. After that we run your campaigns, or we coach your own people. And ',
    hero_sub_bold: 'everything stays yours.',
    cta_primary: 'Start the diagnosis',
    cta_secondary: 'See for yourself',
    cta_micro: 'First the diagnosis, on your own data. Only then a proposal.',
    chips: ['1.9 m ads in view', 'Checked every day'],
    connectors_label: 'Reads along on all your channels',

    herken_eyebrow: 'Sound familiar?',
    herken_h2: 'Four things we hear every week.',
    quotes: [
      { q: 'In one month I bought nearly 1,100 euro of leads. I got not a single job out of it.', a: 'Installation company' },
      { q: 'No, that is all on gut feeling. And in my head.', a: 'Owner, trading company' },
      { q: 'We pay a fortune for that every month and nothing happens.', a: 'Roofing and facade company' },
      { q: 'Those are all separate systems with their own logins. But there is no link anywhere, no central memory.', a: 'Marketing lead, international brand' },
      { q: 'It feels like we keep starting over, every single time.', a: 'Concert hall, about their agency' },
      { q: 'It had to run on their accounts, otherwise they could not get at all the data.', a: 'Construction company, about their agency' },
    ],
    herken_close: 'These are not exceptions. This is how it works as long as nobody is watching.',
    herken_bron: 'From real diagnosis conversations, anonymised.',

    nu_eyebrow: 'Why us',
    nu_h2: 'You get an invoice and a little report. What actually happened, you cannot see.',
    nu_intro: '"I do have all the invoices here, but not really a report." And: "We do get a little report afterwards, yes." Two business owners, two different trades, the same sentence. That is how almost every conversation we have begins.',
    nu_kern: '"So I just have to trust them, because I cannot see it." That is the real problem. Not that too little happens, but that you cannot check it. And whoever cannot check it, cannot see whether the next proposal is right either.',
    nu_punten: [
      { t: '"Nothing happens"', d: 'Two business owners, two weeks apart, both about a bill of a thousand euro a month. Neither knew whether it was true. That is exactly the point.' },
      { t: '"I have completely lost the overview"', d: 'Four systems, three logins, and an agency signing in under your name. You should not have to track that yourself. Someone has to, though.' },
      { t: '"Since the agency took over, nothing comes in anymore"', d: 'Doing it himself: a few hundred euro a month, four to five enquiries a day. Through the agency: two thousand a month, four to five a week. Not a clean comparison, a new name and a new site came in between. But conversion tracking was on and did not count what actually came in, so Google steered on the wrong number.' },
    ],
    nu_slot: 'First we make sure what comes in is right, so Google and Meta see real enquiries instead of button clicks. Then they start working harder for you. And it counts for more than it used to, because what such a system can work out for you depends on what it knows about you. That history builds up in whichever account it sits in, so the longer you wait, the more the switch costs. Rip the plaster off once. And with us nothing goes offline: not a day without your site, not a day without your mail.',

    ladder_eyebrow: 'The order',
    ladder_h2: 'What has to be right before AI can do anything for you.',
    ladder_sub: 'Not out of tidiness, but because each step makes the next one possible. Skip one and everything above it is guesswork with more compute.',
    ladder_grip: 'Grip first',
    ladder_dan: 'Only then this',
    ladder: [
      { n: '01', t: 'Ownership', d: 'The accounts are in your company name and you decide who gets access. Without this you cannot switch executor tomorrow, however good the rest is.' },
      { n: '02', t: 'Measurement', d: 'A conversion is a real enquiry, not a button click. If your tracking fires at the wrong moment, every number above it is unusable.' },
      { n: '03', t: 'One source', d: 'One place where the numbers meet, instead of four dashboards contradicting each other. Otherwise you argue about who is right instead of what to do.' },
      { n: '04', t: 'Memory', d: 'What was tried, why, and what came of it. Without it every new party starts from zero and you pay twice for the same lesson.' },
      { n: '05', t: 'Automation', d: 'Only here. What happens the same way four times can do itself. Before this you are guessing which work to automate.' },
      { n: '06', t: 'AI', d: 'On top, not underneath. With the four steps above in place this is a flywheel. Without them it is an expensive way to go the wrong way faster.' },
    ],
    ladder_slot: 'We always start at the bottom. Not because it is the fun part, but because the rest rests on it.',

    checks_eyebrow: 'See for yourself',
    checks_h2: 'Do not take our word for it.',
    checks_sub: 'You can check the state of your marketing yourself, today. Three checks. Most business owners have never done them, because almost nobody knows they exist.',
    checks: [
      { t: 'Who pays for your ads?', d: 'Google publishes it openly. Look up your company in the transparency register.', r: 'Is there a name that is not yours?' },
      { t: 'Did you know your ad account keeps a change log?', d: 'Every change is in there, with date and user. Open it and see what actually happened in the past 90 days.', r: 'Most owners have never opened it.' },
      { t: 'Is your measurement right?', d: 'Count last month’s enquiries. Does your dashboard show the same number?', r: 'Often it does not. And then everyone steers on the wrong numbers.' },
    ],
    fig_label: 'fig. 01',
    fig_title: 'change log of an ad account',
    fig_before: 'Before: 12 months under an agency',
    fig_after: 'After: one month under Stevin',
    fig_before_ticks: ['JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
    fig_after_ticks: ['W1', 'W2', 'W3', 'W4'],
    fig_caption: 'Anonymised example from a real diagnosis. Every change we make lands in this same log, and you always look along.',
    checks_cta: 'We will walk these checks through with you',
    checks_link: 'How to check up on us',

    how_eyebrow: 'How it works',
    how_h2: 'Prove it first, then manage it.',
    how_link: 'See the full approach',
    steps: [
      {
        num: '01', kop: 'Diagnosis', t: 'Where you stand, in black and white',
        d: 'We do not start with a contract, we start with your data. You see in black and white what is right and what is not. No strings attached, and you keep the report.',
        b: ['Measurement: does your report count real enquiries?', 'Accounts: is everything in your name?', 'Ads: who is registered as the payer?'],
      },
      {
        num: '02', kop: 'Set it right', t: 'The foundation every agency never had time for',
        d: 'Before a single extra euro goes to campaigns, the foundation is in place.',
        b: ['Accounts in your name, access arranged', 'Measurement repaired: every enquiry counts', 'Campaigns cleaned up, waste removed'],
      },
      {
        num: '03', kop: 'Watch it', t: 'We look in every day. On our own work too',
        d: 'Every decision is recorded, and you always look along in the same log.',
        b: ['Heat warning on Friday? The campaign for cooled venues is ready Monday', 'Competitor launches something new? You hear it first', 'Measurement breaks? We see it the same day'],
      },
      {
        num: '04', kop: 'Everything stays yours', t: 'You can always stop. Without losing anything',
        d: 'We build in your exit from day one. That is why we dare to say it.',
        b: ['Your accounts are in your name, so you can always get to them yourself', 'A transferable file with every decision', 'Knowledge that stays with your company, whoever leaves'],
      },
    ],

    demo_eyebrow: 'It all stays findable',
    demo_h2: 'You do not have to explain it all over again every year.',
    demo_lede: 'Every campaign, every decision and what came of it stays on record. Whoever starts here next year reads up. Type \"summer\" and see what comes up.',

    who_eyebrow: 'Who it is for',
    who: [
      {
        k: 'We do the work', t: 'You want it off your plate, but you want to see what is happening.',
        d: 'We set it up, run the campaigns and keep it up to date. You can check at any moment what was done and why. And you remove us yourself, without having to call.',
        link: 'How that works', href: '/voor-ondernemers', img: '/images/voor-ondernemers.jpg', alt: 'Team at a Stevin client during a meeting',
      },
      {
        k: 'You take it over later', t: 'We set it up properly and stay on until it stands.',
        d: 'Usually six to twelve months. What we do and why goes into a file that is yours, so your own people learn along. After that you only need us to look over your shoulder.',
        link: 'How the handover works', href: '/voor-marketingteams', img: '/images/voor-teams.jpg', alt: 'Marketing team in a meeting',
      },
    ],

    name_eyebrow: 'Why Stevin',
    name_h2: 'Named after the engineer who set things right.',
    name_cards: [
      { g: 'S', t: 'Simon Stevin', d: 'The engineer from Bruges who brought mathematics into plain language.' },
      { g: '■', t: 'Set right', d: 'Everything measured, everything recorded, everything verifiable. Craftsmanship instead of sales talk.' },
      { g: '↓', t: 'Yours', d: 'What was tried and what came of it belongs to your company. Your accounts, your numbers and your history, whoever comes or goes.' },
    ],
    name_link: 'The full story behind the name',
    founder_quote: 'For twenty years I sat on the other side of the invoice. I know how hours and media margins work, because I earned from them myself. That is why Stevin is built the other way around.',
    founder_role: 'Founder of Stevin',

    research_eyebrow: 'Our research',
    research_h2: 'We point you to what was there to see all along.',
    research_chip: 'Counter keeps running',
    research_stats: [
      { v: '1.9 m', l: 'ads from Dutch and Belgian companies, tracked continuously in Google\u2019s public register' },
    ],
    research_cta_h: 'Want to know where you stand?',
    research_cta_b: 'We check who the register lists as the payer behind your ads, and what that means for who owns your data.',
    research_cta_link: 'Get in touch',
    research_bron: 'Source: ongoing Stevin research on Google\u2019s public transparency register for the Netherlands and Belgium, as of 29 July 2026. What this does and does not prove is explained in the method.',
    research_body: 'And this is only Google. Meta, LinkedIn and TikTok are counted next. This research runs every week, and everything we find is published, method included. That is how we build the proof that this market can work differently.',
    research_link: 'To the research',

    price_eyebrow: 'Pricing',
    price_value: '1,399',
    price_period: 'per month, and 399 after six to twelve months',
    price_link: 'See all pricing',
    price_body: 'We do the work and stay on until it stands. Once your own people can run it, you drop to 399. With us the amount goes down when it works, instead of up. No margin on your media budget, and you can stop at any time with everything that is yours.',

    faq_eyebrow: 'Frequently asked questions',
    faq_h2: 'What everyone wants to know first.',
    faqs: [
      { question: 'Who owns my accounts and data?', answer: 'You do. Always. Accounts are in your company’s name, data is exportable and every decision sits in a file that belongs to you.' },
      { question: 'What happens if I stop?', answer: 'You keep everything: accounts, data, knowledge and the full file. The handover is built in from day one, so stopping costs you nothing. Except us.' },
      { question: 'Do you do the work, or do I still have to?', answer: 'We do the work. Setting it up, running the campaigns, keeping it current. You can check at any moment what was done and why. If you want to run it yourself later, we stay on until your own people can.' },
      { question: 'Can this run alongside my current agency?', answer: 'Yes. The diagnosis is a good second opinion: if things are right, you now know for sure. If they are not, you have something to discuss.' },
      { question: 'What does it cost?', answer: 'Full management: 1,399 per month, and once your own people can run it you drop to 399. Doing it yourself with Stevin alongside: from 399. Always after the diagnosis, and no margin on your media budget.' },
      { question: 'What do you do with AI, and is it safe?', answer: 'AI reads along and signals, people decide. The platform changes nothing on its own, data stays in the EU, and nothing leaves the door without a human looking at it.' },
    ],

    closing_eyebrow: 'The next step',
    closing_l1: 'We set it right now.',
    closing_l2: 'Everything stays yours.',
    closing_body: 'Start the diagnosis. Within two weeks you see in black and white where your marketing stands. On your own numbers.',
    closing_micro: 'In those two weeks we check who is registered as the payer behind your ads, whose name your accounts and domain are in, and whether your measurement counts real enquiries. You get it on paper, even if you never work with us.',
  },
} as const

// Zelfde canonical/hreflang als voorheen; extra: preview-deploys (Vercel
// preview env) mogen nooit geindexeerd worden, productie wel.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const isEn = locale === 'en'
  const nlUrl = 'https://stevin.ai'
  const enUrl = 'https://stevin.ai/en'
  return {
    alternates: {
      canonical: isEn ? enUrl : nlUrl,
      languages: { 'nl-NL': nlUrl, en: enUrl, 'x-default': nlUrl },
      types: { 'application/rss+xml': 'https://stevin.ai/feed.xml' },
    },
    ...(process.env.VERCEL_ENV !== 'production' ? { robots: { index: false, follow: false } } : {}),
  }
}

const eyebrowLight = 'text-accent text-[12px] font-display font-bold tracking-[0.12em] uppercase mb-4 flex items-center gap-[14px]'
const eyebrowDark = 'text-[#5DA3FF] text-[12px] font-display font-bold tracking-[0.12em] uppercase mb-4 flex items-center gap-[14px]'
const dashLight = <span className="inline-block w-6 h-px bg-accent opacity-60 flex-shrink-0" aria-hidden="true" />
const dashDark = <span className="inline-block w-6 h-px bg-[#5DA3FF] opacity-60 flex-shrink-0" aria-hidden="true" />
// Ladder-waarden, zie docs/TYPOGRAFIE.md. fontWeight hier wint bewust van de
// font-extrabold-klassen die nog op de h2's staan.
const h2Style = { fontSize: 'clamp(30px, 3.4vw, 48px)', letterSpacing: '-0.03em', lineHeight: '1.08', fontWeight: 800 } as const

export default async function HomePage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const c = locale === 'en' ? COPY.en : COPY.nl

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: c.faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: { '@type': 'Answer', text: faq.answer },
            })),
          }),
        }}
      />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-primary -mt-[72px]" style={{ padding: 'calc(96px + 72px) 24px 128px' }}>
        <div
          className="absolute inset-y-0 right-0 z-20 hidden lg:flex items-center justify-end overflow-hidden"
          aria-hidden="true"
          style={{
            maskImage: 'linear-gradient(90deg, transparent 0%, black 26%)',
            WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, black 26%)',
          }}
        >
          <div className="w-[52vw] max-w-[600px] translate-x-[4%]">
            <StevinBrainVisual aspect="3:4" brand={false} claim="" ariaLabel="" locale={locale} />
          </div>
        </div>
        <div
          className="absolute inset-0 z-0"
          aria-hidden="true"
          style={{ background: 'linear-gradient(90deg, #0A1628 0%, #0A1628 30%, rgba(10,22,40,0.6) 56%, rgba(10,22,40,0) 84%)' }}
        />
        <div
          className="absolute inset-0 z-0"
          aria-hidden="true"
          style={{ background: 'linear-gradient(180deg, rgba(10,22,40,0.3) 0%, rgba(10,22,40,0) 35%, rgba(10,22,40,0.5) 100%)' }}
        />
        <div className="relative z-10 mx-auto max-w-[1200px]">

          <div className="relative">
            <div
              className="absolute inset-y-0 right-0 z-0 flex lg:hidden items-stretch justify-end overflow-hidden pointer-events-none w-[30vw] max-w-[132px]"
              aria-hidden="true"
              style={{
                maskImage:
                  'linear-gradient(90deg, transparent 0%, black 58%), linear-gradient(180deg, transparent 0%, black 12%, black 88%, transparent 100%)',
                WebkitMaskImage:
                  'linear-gradient(90deg, transparent 0%, black 58%), linear-gradient(180deg, transparent 0%, black 12%, black 88%, transparent 100%)',
                maskComposite: 'intersect',
                WebkitMaskComposite: 'source-in',
              }}
            >
              <BrainEdgeStrip className="w-full h-full" />
            </div>

            {/* Eyebrow + H1 schakelen samen per kop-variant (C default; ?kop=a/b;
                switcher alleen op preview) */}
            <HeroHeadline locale={locale} />

            {/* Sub */}
            <p
              className="text-white/60 leading-[1.55]"
              style={{ fontSize: '19px', maxWidth: '520px', marginTop: '32px' }}
            >
              {c.hero_sub_1}
              <strong className="text-white/85 font-semibold">{c.hero_sub_bold}</strong>
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 mt-10">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#5DA3FF] text-[#0A1628] font-display font-bold text-[15px] px-7 py-3.5 rounded-lg hover:bg-[#7BB8FF] transition-colors"
            >
              {c.cta_primary}
            </Link>
            <a
              href="#kijk-zelf-mee"
              className="inline-flex items-center gap-2 border border-white/20 text-white font-display font-semibold text-[15px] px-7 py-3.5 rounded-lg hover:border-white/40 hover:bg-white/5 transition-colors"
            >
              {c.cta_secondary}
            </a>
          </div>

          {/* Microcopy: diagnose-eerst */}
          <p className="text-white/45 text-[13.5px] mt-5">{c.cta_micro}</p>

          {/* Proof chips */}
          <div className="flex flex-wrap gap-2.5 mt-8">
            {c.chips.map((p) => (
              <span
                key={p}
                className="text-[12px] text-white/70 border border-white/15 rounded-full px-3.5 py-1.5 leading-none"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── KLANTLOGOS (W-078, 13 sep 2026) ──
          Stond hier eerst de strook met platformlogo's en "en 245+ andere".
          Die zegt "wij koppelen met alles", en dat is de taal van een
          datapijplijn terwijl /platform juist zegt dat we NIET met je kassa of
          ERP koppelen. De koper die hier landt kan niet bij zijn eigen account;
          die wordt niet overtuigd door 245 tools maar door bedrijven zoals hij.
          De platformlogo's staan nu verderop, teruggebracht tot wat echt
          dagelijks meeleest. */}
      <KlantLogos locale={locale} />

      {/* ── HERKEN JE DIT ── */}
      <section className="bg-white" style={{ padding: '112px 24px 96px' }}>
        <div className="mx-auto max-w-[1200px]">
          <p className={eyebrowLight}>{dashLight}{c.herken_eyebrow}</p>
          <h2 className="font-display font-extrabold text-primary m-0 mb-14" style={{ ...h2Style, maxWidth: '20ch' }}>
            {c.herken_h2}
          </h2>

          {/* Twee kolommen, niet drie: vier citaten in een raster van drie laat
              een leeg vak achter. Twee bij twee geeft ze bovendien de breedte
              die ze nodig hebben, want dit zijn letterlijke zinnen uit een
              gesprek en die zijn langer dan een geredigeerde kreet. */}
          <QuoteRotator quotes={c.quotes} />

          <div className="mt-8 flex flex-wrap items-baseline justify-between gap-3">
            <p className="text-primary font-display font-semibold m-0" style={{ fontSize: '16px', maxWidth: '620px' }}>
              {c.herken_close}
            </p>
            <p className="text-muted text-[13px] m-0">{c.herken_bron}</p>
          </div>
        </div>
      </section>

      {/* ── WAAROM NU ── */}
      {/* Staat tussen de herkenning en de checks: pas als iemand zijn eigen
          situatie heeft herkend, is de vraag "waarom nu" beantwoordbaar. */}
      <section className="bg-surface" style={{ padding: '96px 24px' }}>
        <div className="mx-auto max-w-[1200px]">
          <p className={eyebrowLight}>{dashLight}{c.nu_eyebrow}</p>
          <h2 className="font-display font-extrabold text-primary m-0 mb-8" style={{ ...h2Style, maxWidth: '24ch' }}>
            {c.nu_h2}
          </h2>
          <div className="max-w-[68ch] flex flex-col gap-4 mb-12">
            <p className="text-muted text-[17px] leading-[1.65] m-0">{c.nu_intro}</p>
            <p className="text-primary text-[17px] leading-[1.65] m-0 font-medium">{c.nu_kern}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border border border-border rounded-[14px] overflow-hidden">
            {c.nu_punten.map((p) => (
              <div key={p.t} className="bg-white p-7">
                <h3 className="font-display font-bold text-primary text-[17px] m-0 mb-3 leading-snug">{p.t}</h3>
                <p className="text-muted text-[15px] leading-[1.6] m-0">{p.d}</p>
              </div>
            ))}
          </div>
          <p className="text-muted text-[15px] leading-[1.65] mt-8 mb-0 max-w-[64ch]">{c.nu_slot}</p>
        </div>
      </section>

      {/* ── DE VOLGORDE ── van de homepage gehaald op 13 sep 2026 (W-078).
          Zes stappen die eindigden bij "AI", met als kop "wat er moet kloppen
          voordat AI iets voor je kan betekenen". Maatstaf van deze ronde: zou
          de ondernemer die hier landt dit snappen en zou het hem iets schelen.
          Nee op allebei. Hij besteedt zijn marketing uit en AI is zijn vraag
          niet; zijn vraag is of hij kan zien wat er met zijn geld gebeurt. Het
          blok dubbelde bovendien met "Hoe het werkt", dat hetzelfde zegt in
          concrete stappen die hij wel herkent (diagnose, goed zetten, erop
          letten). De copy (c.ladder_*) blijft in dit bestand staan en hoort
          thuis op /platform, waar de lezer wel de marketeer is. */}

      {/* ── KIJK ZELF MEE (compact) ── */}
      {/* Was drie kaarten plus een logboekfiguur: een volle schermhoogte
          voordat iemand zag wat we verkopen. Die checks zijn sterk IN een
          gesprek, waar je het scherm deelt en hij het live ziet gebeuren. Los
          op een pagina is het huiswerk: inloggen bij Google Ads, een logboek
          openen, aanvragen tellen. Vrijwel niemand doet dat, en wie het wel
          doet, doet het in plaats van contact opnemen.
          De blauwdruk noteert het zelf bij check 01: "faalde de hardop-test
          omdat iedereen denkt dat hij dat weet."
          Uitgebreide versie plus de logboekfiguur staan op /controle. */}
      <section id="kijk-zelf-mee" className="bg-surface scroll-mt-24" style={{ padding: '80px 24px' }}>
        <div className="mx-auto max-w-[1200px]">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)] lg:items-center">
            <div>
              <p className={eyebrowLight}>{dashLight}{c.checks_eyebrow}</p>
              <h2 className="font-display font-extrabold text-primary m-0" style={{ ...h2Style, maxWidth: '16ch' }}>
                {c.checks_h2}
              </h2>
              <p className="text-muted leading-[1.6]" style={{ fontSize: '16px', maxWidth: '46ch', marginTop: '18px' }}>
                {c.checks_sub}
              </p>
            </div>

            <div>
              <ol className="m-0 p-0 list-none">
                {c.checks.map((item, i) => (
                  <li
                    key={item.t}
                    className="flex items-baseline gap-4 border-t border-border"
                    style={{ padding: '16px 0' }}
                  >
                    <span className="font-mono text-[11px] text-muted flex-shrink-0">{String(i + 1).padStart(2, '0')}</span>
                    {/* W-078, 13 sep 2026: d en r stonden wel in de data maar werden
                        nergens uitgelezen, dus het blok beloofde drie checks en toonde
                        drie kale vragen. Zelfde fout als bij de stap-bullets op 4 sep. */}
                    <span className="flex flex-col gap-1">
                      <span className="font-display font-semibold text-primary" style={{ fontSize: '16px', lineHeight: '1.4' }}>
                        {item.t}
                      </span>
                      <span className="text-muted" style={{ fontSize: '14.5px', lineHeight: '1.55' }}>
                        {item.d}
                      </span>
                      <span className="text-primary font-medium" style={{ fontSize: '14.5px', lineHeight: '1.55' }}>
                        {item.r}
                      </span>
                    </span>
                  </li>
                ))}
              </ol>
              <div className="flex flex-wrap items-center gap-x-7 gap-y-3" style={{ marginTop: '26px' }}>
                <Link href="/contact" className="font-display font-semibold text-accent inline-flex items-center gap-2" style={{ fontSize: '15px' }}>
                  {c.checks_cta} &rarr;
                </Link>
                <Link href="/controle" className="font-display font-semibold text-muted hover:text-primary transition-colors inline-flex items-center gap-2" style={{ fontSize: '15px' }}>
                  {c.checks_link} &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ZO ZIET DAT ERUIT: echte opname uit de Desk ── */}
      {/* Staat VOOR "Hoe het werkt", niet erna. Anders scrol je langs zes
          secties voordat je ziet wat je koopt: hero, kanalen, vier citaten,
          drie checks, een logboekfiguur, en dan pas vier tekststappen.
          Andersom legt het scherm zichzelf uit, en lezen die vier stappen
          daarna concreter omdat je weet waar ze naartoe werken.
          Zelfde component als op de SEO-landingspagina's. */}
      {/* W-078: toonBrein stond hier op de default true, terwijl elke andere
          pagina hem expliciet uitzet en DeskProof.tsx zelf schrijft dat het blok op
          de homepage uit hoort. Het geheugenverhaal staat verderop al met een eigen
          demo, dus het stond er twee keer. */}
      <DeskProof locale={locale} toonBrein={false} />

      {/* ── HOE HET WERKT ── */}
      <section id="hoe-het-werkt" className="bg-primary scroll-mt-24" style={{ padding: '112px 24px' }}>
        <div className="mx-auto max-w-[1200px]">
          <div className="flex justify-between items-end gap-12 mb-14 flex-col lg:flex-row">
            <div>
              <p className={eyebrowDark}>{dashDark}{c.how_eyebrow}</p>
              <h2 className="font-display font-extrabold text-white m-0" style={{ ...h2Style, maxWidth: '18ch' }}>
                {c.how_h2}
              </h2>
            </div>
            <Link
              href="/werkwijze"
              className="font-display font-semibold text-[14px] text-white/55 hover:text-white transition-colors flex-shrink-0"
            >
              {c.how_link} &rarr;
            </Link>
          </div>

          <div className="max-w-[860px]">
            {c.steps.map((item, i) => (
              <article
                key={item.num}
                className={`grid grid-cols-[56px_1fr] gap-6 py-9 ${i > 0 ? 'border-t border-white/10' : ''}`}
              >
                <span className="font-display font-extrabold text-accent leading-none pt-1" style={{ fontSize: '26px', letterSpacing: '-0.02em' }}>
                  {item.num}
                </span>
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-white/40 mb-2.5 m-0">{item.kop}</p>
                  <h3 className="font-display font-bold text-white mb-2.5" style={{ fontSize: '21px', letterSpacing: '-0.02em', lineHeight: '1.2' }}>
                    {item.t}
                  </h3>
                  <p className="text-white/55 leading-[1.6] m-0" style={{ fontSize: '15px', maxWidth: '58ch' }}>
                    {item.d}
                  </p>
                  {/* Deze drie bullets stonden al in de data maar werden nooit
                      uitgelezen: dode copy, en juist het concreetste van de hele
                      pagina. Zichtbaar gemaakt 4 sep 2026 (W-042). Ze doen wat
                      de rest van de sectie niet doet, namelijk het abstracte
                      ("de basis staat") vervangen door iets wat je kunt nakijken
                      ("staat alles op jouw naam?"). */}
                  {item.b?.length ? (
                    <ul className="mt-5 mb-0 p-0 list-none grid gap-2.5" style={{ maxWidth: '58ch' }}>
                      {item.b.map((punt) => (
                        <li key={punt} className="grid grid-cols-[14px_1fr] gap-3 items-start">
                          <span
                            aria-hidden="true"
                            className="mt-[7px] w-[6px] h-[6px] rounded-full"
                            style={{ background: 'var(--color-accent)' }}
                          />
                          <span className="text-white/70 leading-[1.55]" style={{ fontSize: '14px' }}>{punt}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── DEMO: marketinggeheugen ── */}
      <section className="bg-white" style={{ padding: '112px 24px 96px' }}>
        <div className="mx-auto max-w-[1200px]">
          <p className={eyebrowLight}>{dashLight}{c.demo_eyebrow}</p>
          <h2 className="font-display font-extrabold text-primary m-0 mb-4" style={{ ...h2Style, maxWidth: '20ch' }}>
            {c.demo_h2}
          </h2>
          <p className="text-muted leading-[1.6] mb-14" style={{ fontSize: '16px', maxWidth: '540px' }}>
            {c.demo_lede}
          </p>
          <MarketingMemoryDemo locale={locale} />
        </div>
      </section>

      {/* ── VOOR WIE ── */}
      <section className="bg-surface" style={{ padding: '96px 24px' }}>
        <div className="mx-auto max-w-[1200px]">
          <p className={eyebrowLight}>{dashLight}{c.who_eyebrow}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            {c.who.map((card) => (
              <article key={card.k} className="rounded-[14px] bg-white border border-border overflow-hidden flex flex-col">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={card.img}
                  alt={card.alt}
                  className="w-full border-b border-border"
                  style={{ aspectRatio: '2.26 / 1', objectFit: 'cover' }}
                />
                <div className="p-8 lg:p-10 flex flex-col flex-1">
                  <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted mb-4">{card.k}</p>
                  <h3 className="font-display font-bold text-primary mb-4" style={{ fontSize: 'clamp(20px, 2vw, 26px)', lineHeight: '1.15', letterSpacing: '-0.02em' }}>
                    {card.t}
                  </h3>
                  <p className="text-muted leading-[1.6] mb-8" style={{ fontSize: '15px' }}>{card.d}</p>
                  <div className="mt-auto pt-5 border-t border-border">
                    <Link href={card.href} className="font-display font-semibold text-accent text-sm inline-flex items-center gap-2 hover:gap-3 transition-all">
                      {card.link} <span aria-hidden="true">&rarr;</span>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── NAAMVERHAAL ── */}
      <section className="bg-white" style={{ padding: '96px 24px' }}>
        <div className="mx-auto max-w-[1200px]">
          <p className={eyebrowLight}>{dashLight}{c.name_eyebrow}</p>
          <h2 className="font-display font-extrabold text-primary m-0 mb-14" style={{ ...h2Style, maxWidth: '22ch' }}>
            {c.name_h2}
          </h2>

          {/* Was drie gelijke vakjes met losse tekens als icoon (een S, een zwart
              blokje, een pijl). Dat leest als een lijstje, terwijl het een keten
              is: de naam, wat die betekent voor hoe we werken, en wat jij
              overhoudt. Nu met Lucide-iconen zoals de huisregel voorschrijft, en
              met een pijl ertussen zodat de opeenvolging zichtbaar wordt. */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr] items-stretch gap-px md:gap-0 bg-border md:bg-transparent border md:border-0 border-border rounded-[14px] md:rounded-none overflow-hidden md:overflow-visible mb-14">
            {c.name_cards.map((card, i) => {
              const Icoon = [Ruler, ClipboardCheck, KeyRound][i] ?? Ruler
              return (
                <Fragment key={card.t}>
                  <div className="bg-white p-8 lg:p-10 md:border md:border-border md:rounded-[14px] h-full">
                    <span
                      className="inline-flex items-center justify-center w-11 h-11 rounded-full mb-6"
                      style={{ background: 'rgba(93,163,255,0.12)', color: 'var(--color-primary)' }}
                      aria-hidden="true"
                    >
                      <Icoon size={20} strokeWidth={1.75} />
                    </span>
                    <h3 className="font-display font-bold text-primary mb-3" style={{ fontSize: '19px', letterSpacing: '-0.01em' }}>{card.t}</h3>
                    <p className="text-muted leading-[1.6] m-0" style={{ fontSize: '14.5px' }}>{card.d}</p>
                  </div>
                  {i < 2 && (
                    <div className="hidden md:flex items-center justify-center px-3" aria-hidden="true">
                      <ChevronRight size={20} strokeWidth={2} style={{ color: 'var(--color-border)' }} />
                    </div>
                  )}
                </Fragment>
              )
            })}
          </div>

          <div className="grid grid-cols-[auto_1fr] items-start gap-6 max-w-[760px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/oprichter.png"
              alt={c.founder_role}
              className="w-20 h-20 flex-shrink-0"
            />
            <figure className="m-0">
              <blockquote className="m-0 font-display font-semibold text-primary leading-[1.45]" style={{ fontSize: '18px', letterSpacing: '-0.01em' }}>
                &ldquo;{c.founder_quote}&rdquo;
              </blockquote>
              <figcaption className="text-muted text-[13px] mt-3">{c.founder_role}</figcaption>
            </figure>
          </div>

          <div className="mt-10">
            <Link href="/simon-stevin" className="font-display font-semibold text-accent text-[15px] inline-flex items-center gap-2 hover:gap-3 transition-all">
              {c.name_link} <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── ONDERZOEK ── */}
      <section className="bg-primary" style={{ padding: '96px 24px' }}>
        <div className="mx-auto max-w-[1200px]">
          <p className={eyebrowDark}>{dashDark}{c.research_eyebrow}</p>
          <h2 className="font-display font-extrabold text-white m-0 mb-12" style={{ ...h2Style, maxWidth: '20ch' }}>
            {c.research_h2}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 mb-8">
            {c.research_stats.map((stat) => (
              <div key={stat.v} className="rounded-[14px] border border-white/12 p-6 lg:p-8" style={{ background: 'rgba(255,255,255,0.04)' }}>
                <span className="inline-flex items-center gap-2 text-[10.5px] font-display font-semibold text-[#5DA3FF] border border-[#5DA3FF]/30 rounded-full px-2.5 py-0.5 mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#5DA3FF] flex-shrink-0" aria-hidden="true" />
                  {c.research_chip}
                </span>
                <p className="font-display font-extrabold text-white" style={{ fontSize: 'clamp(44px, 6vw, 76px)', letterSpacing: '-0.04em', lineHeight: '1' }}>
                  {stat.v}
                </p>
                <p className="text-white/55 mt-4 leading-[1.5] m-0" style={{ fontSize: '14px', maxWidth: '34ch' }}>{stat.l}</p>
              </div>
            ))}
            <div className="rounded-[14px] border border-white/12 p-6 lg:p-8 flex flex-col justify-center" style={{ background: 'rgba(255,255,255,0.04)' }}>
              <p className="font-display font-extrabold text-white m-0" style={{ fontSize: 'clamp(22px, 2.4vw, 28px)', letterSpacing: '-0.02em', lineHeight: '1.2' }}>
                {c.research_cta_h}
              </p>
              <p className="text-white/55 mt-3 mb-6 leading-[1.5] m-0" style={{ fontSize: '14px' }}>{c.research_cta_b}</p>
              <Link href="/contact" className="font-display font-semibold text-[#5DA3FF] text-[15px] inline-flex items-center gap-2 hover:gap-3 transition-all self-start">
                {c.research_cta_link} <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>

          <p className="text-white/35 text-[12.5px] mb-8 m-0">{c.research_bron}</p>
          <p className="text-white/65 leading-[1.6] m-0" style={{ fontSize: '16px', maxWidth: '640px' }}>{c.research_body}</p>

          <div className="mt-8">
            {/* W-078, 13 sep 2026: stond hard op de Engelse pagina, ook in de
                Nederlandse versie. Een Nederlandse lezer klikte vanuit
                Nederlandse tekst op "Naar het onderzoek" en kreeg Engels, en het
                Nederlandse origineel (editorial 020, 7 juli) kreeg geen enkele
                interne link vanaf de homepage. Nu per taal naar de juiste versie.
                Gevonden bij de vindbaarheidsscan op onze eigen naam: op elf van
                de twaalf koopvragen wordt stevin.ai niet geciteerd, ook niet op
                de vraag welke bedrijven je je eigen data laten houden. */}
            <Link href={locale === 'en' ? '/who-owns-your-advertising-data' : '/blog/wie-is-eigenaar-van-je-advertentiedata'} className="font-display font-semibold text-[#5DA3FF] text-[15px] inline-flex items-center gap-2 hover:gap-3 transition-all">
              {c.research_link} <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── JOURNAL FEATURED ── */}
      {(() => {
        const featured = editorials()[0]
        if (!featured) return null
        const bgStyle =
          featured.posterStyle === 'gradient'
            ? 'linear-gradient(135deg, var(--navy) 0%, #1a2f52 100%)'
            : featured.posterStyle === 'surface'
            ? 'var(--surface-alt, #E8EFF7)'
            : 'var(--navy)'
        const txtColor = featured.posterStyle === 'surface' ? 'var(--navy)' : '#fff'
        const tagBg = featured.posterStyle === 'surface' ? 'var(--navy)' : 'rgba(255,255,255,0.94)'
        const tagColor = featured.posterStyle === 'surface' ? '#fff' : 'var(--navy)'
        return (
          <section className="bg-[var(--surface)]" style={{ padding: '96px 24px' }}>
            <div className="mx-auto max-w-[1200px]">
              <p
                className="font-display font-bold tracking-[0.12em] uppercase mb-10 flex items-center gap-[14px]"
                style={{ fontSize: '11px', color: 'var(--muted)' }}
              >
                <span className="inline-block w-6 h-px bg-muted opacity-60 flex-shrink-0" aria-hidden="true" />
                UIT HET JOURNAL
              </p>
              <Link
                href={`/blog/${featured.slug}`}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 no-underline text-inherit group items-center"
              >
                <div
                  className="overflow-hidden w-full h-full flex flex-col justify-between"
                  style={{
                    background: bgStyle,
                    color: txtColor,
                    borderRadius: '14px',
                    aspectRatio: '4 / 3',
                    padding: 'clamp(28px, 5vw, 44px)',
                    position: 'relative',
                  }}
                >
                  <PosterWatermark style={featured.posterStyle} />
                  <span
                    style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '10px',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      background: tagBg,
                      color: tagColor,
                      padding: '6px 10px',
                      borderRadius: '4px',
                      alignSelf: 'flex-start',
                      position: 'relative',
                    }}
                  >
                    {featured.posterTag}
                  </span>
                  <span
                    className="font-display font-extrabold"
                    style={{
                      fontSize: 'clamp(26px, 3vw, 38px)',
                      lineHeight: '1.05',
                      letterSpacing: '-0.025em',
                      maxWidth: '14ch',
                      position: 'relative',
                    }}
                  >
                    {featured.posterTopic}
                  </span>
                </div>
                <div>
                  <p
                    style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '11px',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'var(--muted)',
                      marginBottom: '14px',
                    }}
                  >
                    Editie {featured.edition} · {featured.category} · {featured.readMinutes} min
                  </p>
                  <h2
                    className="font-display font-bold text-[var(--navy)] m-0 group-hover:text-[var(--accent)] transition-colors"
                    style={{
                      fontSize: 'clamp(30px, 3.4vw, 48px)',
                      lineHeight: '1.08',
                      letterSpacing: '-0.03em',
                      fontWeight: 800,
                      marginBottom: '20px',
                    }}
                  >
                    {featured.title}
                  </h2>
                  <p
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '17px',
                      lineHeight: '1.55',
                      color: 'var(--muted)',
                      marginBottom: '28px',
                    }}
                  >
                    {featured.dek}
                  </p>
                  <span
                    className="font-display font-semibold text-[var(--accent)] inline-flex items-center gap-2"
                    style={{ fontSize: '15px' }}
                  >
                    Lees editie {featured.edition} →
                  </span>
                </div>
              </Link>
            </div>
          </section>
        )
      })()}

      {/* ── PRIJS ── */}
      <section className="bg-white" style={{ padding: '112px 24px' }}>
        <div className="mx-auto max-w-[680px] text-center">
          <p className="text-accent text-[12px] font-display font-bold tracking-[0.12em] uppercase mb-6 flex items-center justify-center gap-[14px]">
            <span className="inline-block w-6 h-px bg-accent opacity-60 flex-shrink-0" aria-hidden="true" />
            {c.price_eyebrow}
          </p>
          <p className="font-display font-extrabold text-primary m-0" style={{ fontSize: 'clamp(44px, 5vw, 68px)', letterSpacing: '-0.04em', lineHeight: '1' }}>
            {c.price_value}
            {/* W-078: het periodelabel draagt nu de tweede prijs, dus het mag
                afbreken op een smal scherm in plaats van naast het bedrag te
                blijven plakken. */}
            <span className="text-muted font-semibold align-baseline block sm:inline mt-2 sm:mt-0 sm:ml-3" style={{ fontSize: '18px', letterSpacing: '0' }}>
              {c.price_period}
            </span>
          </p>
          <p className="text-muted leading-[1.65] mx-auto" style={{ fontSize: '16px', maxWidth: '46ch', marginTop: '24px' }}>
            {c.price_body}
          </p>
          {/* Doorklikken naar de tarievenpagina. Stond er tot 28 jul 2026 niet:
              de homepage noemde een bedrag en de knop ging naar /contact, dus
              wie wilde weten wat het kost kwam nergens. */}
          <p style={{ marginTop: '18px' }}>
            <Link
              href="/tarieven"
              className="font-display font-semibold text-accent inline-flex items-center gap-2"
              style={{ fontSize: '15px' }}
            >
              {c.price_link}
            </Link>
          </p>
          <div className="mt-9">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-accent text-white font-display font-bold text-[15px] px-8 py-3.5 rounded-lg hover:bg-accent-dark transition-colors"
            >
              {c.cta_primary}
            </Link>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-surface" style={{ padding: '96px 24px' }}>
        <div className="mx-auto max-w-[1200px]">
          <div className="flex justify-between items-end gap-12 mb-12 flex-col lg:flex-row">
            <div>
              <p className={eyebrowLight}>{dashLight}{c.faq_eyebrow}</p>
              <h2 className="font-display font-extrabold text-primary m-0" style={{ fontSize: 'clamp(30px, 3.4vw, 48px)', letterSpacing: '-0.03em', lineHeight: '1.08', fontWeight: 800 }}>
                {c.faq_h2}
              </h2>
            </div>
          </div>
          <FAQAccordion faqs={[...c.faqs]} />
        </div>
      </section>

      {/* ── SLOT ── */}
      <section className="bg-primary" style={{ padding: '112px 24px 128px' }}>
        <div className="mx-auto max-w-[1200px]">
          <p className="text-[#5DA3FF] text-[14px] font-display font-bold tracking-[0.14em] uppercase mb-7 flex items-center gap-[14px]">
            <span className="inline-block w-6 h-px bg-[#5DA3FF] flex-shrink-0" aria-hidden="true" />
            {c.closing_eyebrow}
          </p>
          <div className="flex items-end justify-between gap-12 flex-col lg:flex-row">
            <h2
              className="font-display font-extrabold text-white m-0"
              style={{ fontSize: 'clamp(30px, 3.4vw, 48px)', lineHeight: '1.08', letterSpacing: '-0.03em', fontWeight: 800, maxWidth: '15ch' }}
            >
              {c.closing_l1}<br />
              <span className="text-[#5DA3FF]">{c.closing_l2}</span>
            </h2>
            <div className="flex flex-col items-start lg:items-end gap-5">
              <p className="text-white/55 leading-[1.6] m-0 lg:text-right" style={{ fontSize: '16px', maxWidth: '380px' }}>
                {c.closing_body}
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[#5DA3FF] text-[#0A1628] font-display font-bold text-[15px] px-7 py-3.5 rounded-lg hover:bg-[#7BB8FF] transition-colors"
              >
                {c.cta_primary}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                </svg>
              </Link>
            </div>
          </div>

          <div
            className="mt-20 flex justify-between flex-wrap gap-4 pt-7"
            style={{ borderTop: '1px solid rgba(255,255,255,.1)' }}
          >
            <p className="text-[13px] m-0" style={{ color: 'rgba(255,255,255,.4)' }}>
              {c.closing_micro}
            </p>
            <p
              className="font-display text-[12px] font-medium tracking-[0.06em] uppercase m-0"
              style={{ color: 'rgba(255,255,255,.3)' }}
            >
              stevin.ai
            </p>
          </div>
        </div>
      </section>

      <StickyMobileCTA locale={locale} />
    </>
  )
}
