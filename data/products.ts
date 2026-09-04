// Stevin productsuite. Leidt met de beschrijvende naam, het acroniem is kortschrift.
// Schrijfregels: geen em-dash of en-dash (komma, punt, dubbele punt, haakjes),
// geen accenten in Nederlandse tekst, geen academisch jargon. Toon: nuchter en concreet.

export interface Product {
  name: string // beschrijvende naam, bijv. "Stevin Dynamic Optimization"
  acronym?: string // "SDO"
  slug: string
  tagline: string // de een-regel "wat het doet"
  description: string
  whoFor: string
  howItWorks: string
  problemsSolved: string[]
  inPractice?: string
  // Echte cijfers uit eerder bureauwerk (anoniem). Extractbaar bewijs voor SEO + GEO.
  results?: string[]
  faqs?: { question: string; answer: string }[]
  relatedSlugs: string[]
}

export const products: Product[] = [
  {
    name: 'Stevin Ads Radar',
    acronym: 'SAR',
    slug: 'ads-radar',
    tagline: 'Zie wie er in jouw markt adverteert en welke advertenties draaien, op Google en Meta.',
    description:
      'De meeste bedrijven weten niet wat hun concurrenten online adverteren, en missen zo wat er in hun markt beweegt. Stevin Ads Radar houdt doorlopend in de gaten wat er aan advertenties draait in jouw markt, en laat zien wie er actief adverteert en welke boodschappen lopen. Twee dingen tegelijk: zicht op je concurrentie, en een radar voor bedrijven die actief in marketing investeren en daarmee interessante prospects zijn.',
    whoFor:
      'Bedrijven die willen weten wat hun concurrenten adverteren, en sales- en bureauteams die actieve adverteerders als warme leads willen vinden.',
    howItWorks:
      'Stevin houdt de advertentiemarkt op Google en Meta doorlopend in de gaten, herkent welke bedrijven actief zijn en welke boodschappen lopen, en zet dat om in een radar: wie is nieuw, wie schaalt op, wat verandert. Je ziet de markt bewegen in plaats van te gokken.',
    problemsSolved: [
      'Geen zicht op wat je concurrenten online adverteren',
      'Niet weten wie er in je markt actief investeert',
      'Te laat reageren op een concurrent die opschaalt',
      'Leads zoeken zonder te weten wie er echt geld in marketing steekt',
    ],
    inPractice:
      'We gebruiken de radar zelf om actieve adverteerders te vinden en als warme leads te benaderen. Bedrijven die al in marketing investeren zijn nu eenmaal makkelijker te helpen.',
    faqs: [
      {
        question: 'Werkt het binnen de regels?',
        answer:
          'Ja. Stevin gebruikt alleen openbare, toegestane bronnen. Niets grijs, niets dat niet mag.',
      },
    ],
    relatedSlugs: ['dynamic-ads', 'signals', 'dynamic-optimization'],
  },
  {
    name: 'Stevin Signals',
    slug: 'signals',
    tagline: 'De intelligentielaag die 24/7 marktsignalen oppikt voordat ze in je rapportage staan.',
    description:
      'Een rapportage vertelt je wat vorige maand gebeurde. Stevin Signals vertelt je wat nu speelt. Het draait dag en nacht mee en haalt signalen uit de markt, bij platformen, bij concurrenten en in je eigen data, en zet die om in concrete attentiepunten. Zo kun je eerder bijsturen, in plaats van achteraf terugkijken.',
    whoFor:
      'Ondernemers en marketingteams die niet willen wachten op de maandrapportage om te zien dat er iets misging.',
    howItWorks:
      'Stevin monitort continu je kanalen, de markt en je eigen data, en filtert de ruis eruit. Wat aandacht vraagt komt als signaal naar je toe, met de reden erbij, zodat je weet wat je ermee moet.',
    problemsSolved: [
      'Pas in de maandrapportage zien dat iets misliep',
      'Belangrijke verschuivingen in de markt missen',
      'Verdrinken in dashboards zonder te weten waar je moet kijken',
      'Reageren als het al te laat is',
    ],
    inPractice:
      'Het idee: niet nog een dashboard, maar een laag die voor je kijkt en alleen aan de bel trekt als er echt iets speelt.',
    faqs: [
      {
        question: 'Is dit weer een dashboard om in de gaten te houden?',
        answer:
          'Nee, het tegenovergestelde. Stevin Signals kijkt voor je en komt naar je toe met wat aandacht vraagt, zodat jij niet in dashboards hoeft te zoeken.',
      },
    ],
    relatedSlugs: ['dynamic-optimization', 'uplift', 'follow-up'],
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getRelatedProducts(slugs: string[]): Product[] {
  return slugs.map((s) => getProductBySlug(s)).filter((p): p is Product => Boolean(p))
}

// Hero-beelden per product, in de Stevin-stijl (navy basis, blauw als signatuur).
// Bestanden geoptimaliseerd in public/producten/. Thematisch gekoppeld.
const productHeroes: Record<string, string> = {
  'dynamic-optimization': '/producten/dev.jpg',
  'dynamic-pages': '/producten/outdoor.jpg',
  'dynamic-ads': '/producten/dev.jpg',
  'ads-radar': '/producten/blue-figures.jpg',
  'content-optimization': '/producten/vr-portrait.jpg',
  'blog-automation': '/producten/dev.jpg',
  signals: '/producten/vr-studio.jpg',
  'follow-up': '/producten/meeting.jpg',
  quote: '/producten/meeting.jpg',
  uplift: '/producten/vr-crop.jpg',
}

export function getProductHero(slug: string): string | undefined {
  return productHeroes[slug]
}

// SEO/GEO-laag per product: een generieke, gezochte title (de merknaam blijft de H1,
// de title pakt de term die mensen echt zoeken) plus extra natuurlijke FAQ's die
// als citeerbare antwoord-blokken werken in Google en AI-zoekmachines.
interface ProductSeo {
  title: string
  faqs: { question: string; answer: string }[]
}

const productSeo: Record<string, ProductSeo> = {
  'dynamic-optimization': {
    title: 'Campagnes optimaliseren op de marktvraag',
    faqs: [
      {
        question: 'Hoe optimaliseer je een campagne op de marktvraag?',
        answer:
          'Door je boodschap, budget en kanalen mee te laten bewegen met wat mensen nu zoeken, in plaats van een vaste opzet te laten staan. Stevin doet dat doorlopend, op basis van marktsignalen en je eigen data.',
      },
      {
        question: 'Wat is het verschil met handmatig je campagnes bijsturen?',
        answer:
          'Handmatig bijsturen gebeurt te laat en te onregelmatig. Stevin stuurt continu bij op de actuele vraag, zonder dat jij er elke week aan hoeft te sleutelen.',
      },
    ],
  },
  'dynamic-pages': {
    title: 'Dynamische landingspagina’s die meebewegen',
    faqs: [
      {
        question: 'Wat is een dynamische landingspagina?',
        answer:
          'Een pagina die zich aanpast aan wat bezoekers zoeken en aan externe factoren zoals seizoen, weer of lokale vraag, in plaats van een vaste pagina die het hele jaar gelijk blijft.',
      },
      {
        question: 'Kun je reviews automatisch op je website tonen?',
        answer:
          'Ja. Stevin haalt je reviews automatisch op en zet ze op de juiste plek op je pagina, zodat je vertrouwen toont zonder dat je het handmatig hoeft bij te werken.',
      },
    ],
  },
  'dynamic-ads': {
    title: 'Advertenties die zich aanpassen aan de vraag',
    faqs: [
      {
        question: 'Hoe maak je advertenties die zich aanpassen aan de vraag?',
        answer:
          'Door de boodschap en doelgroep mee te laten bewegen met wat er nu in de markt speelt. Stevin ziet eerder dan je rapportage wat rendeert en stuurt daarop bij.',
      },
      {
        question: 'Wat is het verschil met een vaste advertentieset?',
        answer:
          'Een vaste set blijft draaien, ook als zijn moment voorbij is. Stevin past boodschap en timing aan op de actuele vraag, zodat je betaalt voor wat nu raakt.',
      },
    ],
  },
  'ads-radar': {
    title: 'Advertenties van concurrenten bekijken',
    faqs: [
      {
        question: 'Hoe zie je welke advertenties je concurrent draait?',
        answer:
          'Stevin houdt de advertentiemarkt op Google en Meta voor je in de gaten en laat zien wie er adverteert en welke boodschappen lopen, samengevat in een radar in plaats van losse zoekacties.',
      },
      {
        question: 'Kun je zien wie er nieuw begint of opschaalt met adverteren?',
        answer:
          'Ja. De radar laat zien wie nieuw is, wie opschaalt en welke boodschap verandert, zodat je de markt ziet bewegen in plaats van te gokken.',
      },
    ],
  },
  'content-optimization': {
    title: 'Van foto naar social post in je huisstijl',
    faqs: [
      {
        question: 'Hoe maak je snel content voor je website en socials?',
        answer:
          'Stuur een foto naar WhatsApp. Stevin bouwt hem na in jouw huisstijl en zet hem klaar voor je website en socials, zodat je niet achter een ontwerpprogramma hoeft.',
      },
      {
        question: 'Op welke kanalen kan Stevin de content plaatsen?',
        answer: 'Op je website en, als je dat wilt, je socials. Jij keurt goed, Stevin plaatst.',
      },
    ],
  },
  'blog-automation': {
    title: 'Blog automatiseren op echte zoekvraag',
    faqs: [
      {
        question: 'Hoe automatiseer je je blog?',
        answer:
          'Stevin kijkt waar de zoekvraag zit, schrijft daarnaartoe en publiceert op een vast ritme. Jij houdt de regie op toon en goedkeuring.',
      },
      {
        question: 'Hoe vaak verschijnt er nieuwe content?',
        answer:
          'Op een vast ritme dat je zelf bepaalt. Consistentie is wat een blog in Google laat scoren, niet af en toe een los stuk.',
      },
    ],
  },
  signals: {
    title: 'Je markt en concurrenten monitoren',
    faqs: [
      {
        question: 'Hoe houd je je markt en concurrenten in de gaten?',
        answer:
          'Stevin monitort doorlopend je kanalen, de markt en je eigen data, filtert de ruis eruit en komt naar je toe met wat aandacht vraagt, met de reden erbij.',
      },
      {
        question: 'Wat voor signalen pikt Stevin op?',
        answer:
          'Verschuivingen in de vraag, beweging bij concurrenten en platformen, en wat opvalt in je eigen data, voordat het in je maandrapportage staat.',
      },
    ],
  },
  'follow-up': {
    title: 'Leadopvolging automatiseren',
    faqs: [
      {
        question: 'Hoe automatiseer je de opvolging van leads?',
        answer:
          'Na een gesprek of aanvraag zet Stevin een opvolg-concept klaar op basis van wat besproken is. Jij keurt goed of past aan, en de mail vertrekt vanaf je eigen adres.',
      },
      {
        question: 'Werkt dit ook als ik veel bel op een dag?',
        answer:
          'Juist dan. Tijdens het bellen zet je de opvolging in de wachtrij, en aan het eind van de dag staat alles klaar om goed te keuren en te versturen.',
      },
    ],
  },
  quote: {
    title: 'Offertes maken via WhatsApp',
    faqs: [
      {
        question: 'Hoe maak je een offerte via WhatsApp?',
        answer:
          'De aanvraag en afspraken komen via WhatsApp binnen. Stevin zet de offerte op in jouw vorm, jij controleert en verstuurt, zonder dat je achter een computer hoeft.',
      },
      {
        question: 'Is dit geschikt voor vakmensen en kleine bedrijven?',
        answer:
          'Ja, juist voor wie liever bouwt of klanten helpt dan in systemen werkt. Alles loopt door de lijn waar je toch al de hele dag zit.',
      },
    ],
  },
  uplift: {
    title: 'Wat levert je marketing echt op',
    faqs: [
      {
        question: 'Wat is uplift-meting?',
        answer:
          'Uplift-meting kijkt naar de echte extra bijdrage van je marketing, los van wat sowieso was gebeurd. Zo weet je welke euro daadwerkelijk omzet oplevert.',
      },
      {
        question: 'Wat is Marketing Mix Modeling?',
        answer:
          'Een model dat de bijdrage van elk kanaal aan je omzet schat op basis van je data. Het laat zien waar je budget het meeste oplevert, zonder afhankelijk te zijn van cookies.',
      },
    ],
  },
}

export function getProductSeo(slug: string): ProductSeo | undefined {
  return productSeo[slug]
}
