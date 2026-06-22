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
    name: 'Stevin Dynamic Optimization',
    acronym: 'SDO',
    slug: 'dynamic-optimization',
    tagline: 'Campagnes en landingspagina’s die meebewegen met de marktvraag, zodat je op het juiste moment relevant bent in Google.',
    description:
      'De meeste bedrijven zetten een campagne en een landingspagina neer en laten die maanden staan. De markt beweegt ondertussen wel: zoekgedrag verschuift, een concurrent verandert zijn aanbod, het weer slaat om. Stevin Dynamic Optimization laat je campagnes en pagina’s meebewegen met die vraag, zodat je zichtbaar bent op het moment dat mensen echt zoeken in plaats van met een vaste pagina te blijven staan.',
    whoFor:
      'Ondernemers en marketingteams die met betaalde en eigen kanalen werken en merken dat een statische opzet kansen laat liggen.',
    howItWorks:
      'Stevin leest de vraagsignalen uit de markt en je eigen data, en past de boodschap, de landingspagina en de campagne-instellingen daarop aan. Geen handmatig elke week bijschaven, het beweegt mee terwijl jij verder werkt.',
    problemsSolved: [
      'Een vaste landingspagina die niet aansluit op wat mensen nu zoeken',
      'Campagnes die maanden ongewijzigd doorlopen',
      'Te laat reageren op een piek of dip in de vraag',
      'Budget dat naar zoekwoorden gaat die hun moment voorbij zijn',
    ],
    inPractice:
      'Binnen een eigen bureau draaiden we deze aanpak jarenlang: campagnes en pagina’s die meebewogen met seizoen, voorraad en lokale vraag, in plaats van een opzet die het hele jaar bleef staan. Dat fundament zit nu in Stevin.',
    results: [
      '881.000 bereikte personen voor een toeristische bestemming, precies op de juiste doelgroep',
      '250% meer conversies door doorlopende optimalisatie en slimme targeting',
    ],
    faqs: [
      {
        question: 'Vervangt dit mijn bureau of mijn campagnemanager?',
        answer:
          'Nee. Stevin draait eronder en doet het bijsturen op vraag continu, zodat jij of je bureau zich op de strategie kan richten in plaats van op het wekelijkse handwerk.',
      },
      {
        question: 'Werkt het ook met mijn huidige campagnes?',
        answer:
          'Ja. Stevin koppelt op je bestaande Google- en Meta-accounts en je eigen website-data, en bouwt daarop voort.',
      },
    ],
    relatedSlugs: ['dynamic-pages', 'dynamic-ads', 'signals'],
  },
  {
    name: 'Stevin Dynamic Pages',
    acronym: 'SDP',
    slug: 'dynamic-pages',
    tagline: 'Website- en landingspagina’s die zich aanpassen aan zoekgedrag, marktwerking en externe factoren, met reviews automatisch erin.',
    description:
      'Een vaste website-pagina veroudert op het moment dat je ’m publiceert. Stevin Dynamic Pages maakt je pagina’s levend: ze passen zich aan op wat mensen zoeken, op wat er in de markt en daarbuiten gebeurt (denk aan seizoen, weer of een lokale piek), en ze halen je reviews automatisch op en zetten ze op de juiste plek. Zo is je pagina relevant op het moment dat een bezoeker komt, zonder dat jij er steeds aan hoeft te sleutelen.',
    whoFor:
      'Bedrijven met een website of landingspagina’s die merken dat statische pagina’s niet meebewegen met wat hun bezoekers nu zoeken.',
    howItWorks:
      'Stevin leest zoekgedrag, marktsignalen en externe factoren, en past de inhoud, koppen en het aanbod van je pagina daarop aan. Reviews worden automatisch opgehaald en geplaatst, zodat het vertrouwen op je pagina staat zonder handwerk.',
    problemsSolved: [
      'Een vaste pagina die niet aansluit op wat bezoekers nu zoeken',
      'Reviews die niet of verouderd op je site staan',
      'Pagina’s die niet reageren op seizoen, weer of lokale vraag',
      'Steeds handmatig je website moeten bijwerken',
    ],
    inPractice:
      'Stel, het weer slaat om of er is lokaal een piek in de vraag. Je pagina beweegt mee: andere boodschap, het juiste aanbod bovenaan, verse reviews erbij. Zonder dat iemand de site hoeft open te trekken.',
    faqs: [
      {
        question: 'Is dit hetzelfde als Stevin Dynamic Optimization?',
        answer:
          'Ze vullen elkaar aan. Dynamic Optimization stuurt je campagnes en marketing bij op de marktvraag, Dynamic Pages maakt de pagina’s zelf levend met zoekgedrag, externe factoren en automatische reviews.',
      },
    ],
    relatedSlugs: ['dynamic-optimization', 'content-optimization', 'signals'],
  },
  {
    name: 'Stevin Dynamic Ads',
    acronym: 'SDA',
    slug: 'dynamic-ads',
    tagline: 'Advertenties die zich aanpassen aan vraag en signalen, in plaats van een vaste set die blijft draaien.',
    description:
      'Een advertentieset opzetten en hopen dat hij blijft werken kost geld zodra de markt verschuift. Stevin Dynamic Ads past je advertenties aan op wat er nu speelt: welke boodschap aanslaat, welke vraag stijgt, wat een concurrent doet. Zo betaal je voor advertenties die op het juiste moment de juiste mensen raken.',
    whoFor:
      'Bedrijven die structureel adverteren op Google en Meta en meer uit hetzelfde budget willen halen.',
    howItWorks:
      'Stevin combineert je campagnedata met marktsignalen en stuurt de boodschap, doelgroep en timing van je advertenties bij. Het ziet eerder dan je rapportage wat wel en niet rendeert, en handelt daarnaar.',
    problemsSolved: [
      'Advertenties die blijven draaien terwijl hun moment voorbij is',
      'Een boodschap die niet meebeweegt met de actuele vraag',
      'Budget dat weglekt naar wat niet meer converteert',
      'Pas in de maandrapportage zien dat iets niet werkte',
    ],
    inPractice:
      'In een eigen bureau zagen we steeds hetzelfde: de winst zit niet in een nieuwe campagne, maar in eerder en slimmer bijsturen. Die discipline zit nu in Stevin Dynamic Ads.',
    results: [
      '308% hogere doorklikratio op Meta voor een toeristische bestemming',
      '85% lagere kosten per klik dan de benchmark',
      '140.000 verkochte tickets en meer dan 11 miljoen euro omzet voor een grootschalig evenement, via dynamische advertenties en urgentie-boodschappen',
    ],
    faqs: [
      {
        question: 'Heb ik hier een groot advertentiebudget voor nodig?',
        answer:
          'Nee. De winst zit juist in beter besteden, niet in meer besteden. Het werkt op elk budget waar je nu al mee adverteert.',
      },
    ],
    relatedSlugs: ['ads-radar', 'dynamic-optimization', 'signals'],
  },
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
    name: 'Stevin Content Optimization',
    acronym: 'SCO',
    slug: 'content-optimization',
    tagline: 'Een foto naar WhatsApp, Stevin bouwt hem na in je huisstijl en zet hem op je site en socials.',
    description:
      'Goede content maken kost tijd die ondernemers niet hebben, dus blijft het liggen. Met Stevin Content Optimization stuur je gewoon een foto naar WhatsApp. Stevin pakt hem op, bouwt hem na in jouw huisstijl en zet hem op je website en eventueel je socials. Van het moment zelf naar online, zonder dat iemand achter een ontwerpprogramma hoeft te kruipen.',
    whoFor:
      'Ondernemers en teams die op locatie of onderweg mooie momenten hebben, maar geen tijd of designer om er content van te maken.',
    howItWorks:
      'Je stuurt een foto naar WhatsApp. Stevin herkent wat het is, bouwt het op in jouw stijl met je eigen of bestaande tools, en zet het klaar voor je website en socials. Jij keurt goed, Stevin plaatst.',
    problemsSolved: [
      'Mooie momenten die nooit online komen omdat het maken te veel werk is',
      'Content die niet in de huisstijl past',
      'Afhankelijk zijn van een designer voor elke post',
      'Een website en socials die stil blijven staan',
    ],
    inPractice:
      'Stel, iemand op locatie maakt iets moois en schiet een foto. Die gaat naar WhatsApp, en even later staat er een nette post in de huisstijl klaar. Zo simpel willen we dat het is.',
    faqs: [
      {
        question: 'Moet ik mijn huisstijl ergens instellen?',
        answer:
          'We zetten je stijl eenmalig goed, daarna herkent Stevin hem en past het automatisch toe op nieuwe content.',
      },
    ],
    relatedSlugs: ['blog-automation', 'dynamic-optimization', 'follow-up'],
  },
  {
    name: 'Stevin Blog Automation',
    acronym: 'SBA',
    slug: 'blog-automation',
    tagline: 'Vraaggestuurde blog- en redactie-content op cadans. We gebruiken het zelf.',
    description:
      'Veel websites scoren slecht in Google omdat ze te weinig publiceren over wat mensen echt zoeken. Stevin Blog Automation draait je content als een motor: het kijkt waar de vraag zit, schrijft daarnaartoe, en publiceert op cadans. Niet meer artikelen die niemand zoekt, maar stukken die aansluiten op echte zoekvraag. We draaien het zelf voor onze eigen redactie.',
    whoFor:
      'Bedrijven die meer organisch gevonden willen worden en weten dat losse, sporadische content niet genoeg is.',
    howItWorks:
      'Stevin bepaalt op basis van zoekvraag en signalen waar je over moet schrijven, maakt vraaggestuurde content en publiceert die op een vast ritme. Jij houdt de regie op toon en goedkeuring.',
    problemsSolved: [
      'Een blog die stilstaat of te onregelmatig is om effect te hebben',
      'Content schrijven over wat interessant lijkt in plaats van wat gezocht wordt',
      'Geen tijd of redactie om consistent te publiceren',
      'Slecht vindbaar in Google en in AI-zoekmachines',
    ],
    inPractice:
      'Onze eigen redactie draait op deze motor: vraaggestuurde stukken op cadans, in plaats van af en toe een artikel als er net tijd is.',
    faqs: [
      {
        question: 'Wordt dit niet generieke AI-tekst die Google afstraft?',
        answer:
          'Nee. We sturen op echte zoekvraag en houden redactionele regie op toon en kwaliteit, juist om de val van dunne massacontent te vermijden.',
      },
    ],
    relatedSlugs: ['content-optimization', 'signals', 'dynamic-optimization'],
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
  {
    name: 'Stevin Follow-up',
    slug: 'follow-up',
    tagline: 'Lead-opvolging die voor je klaarstaat: concept klaar, jij keurt goed, de mail vertrekt.',
    description:
      'De meeste leads gaan niet verloren door slechte producten, maar door opvolging die blijft liggen. Stevin Follow-up zet de opvolging voor je klaar: na een gesprek of een binnenkomende aanvraag staat er een concept klaar, jij keurt het goed of past het aan, en de mail vertrekt vanaf je eigen adres. Geen aanvraag die wegglipt omdat er niemand aan toekwam.',
    whoFor:
      'Iedereen die met leads en gesprekken werkt en merkt dat opvolging het zwakke punt is.',
    howItWorks:
      'Zodra een gesprek of aanvraag binnen is, maakt Stevin een opvolg-concept op basis van wat er besproken is. Jij ziet het klaar staan, keurt goed, past aan of plant het in. De mail gaat vanaf je eigen adres de deur uit.',
    problemsSolved: [
      'Leads die wegglippen omdat opvolging blijft liggen',
      'Steeds opnieuw vanaf nul een opvolgmail typen',
      'Geen overzicht van wie je nog moet opvolgen',
      'Opvolging die te laat komt om nog warm te zijn',
    ],
    inPractice:
      'Concept klaar, een klik om te versturen of in te plannen voor later. Zo houd je grip op je opvolging zonder dat het je dag opslokt.',
    faqs: [
      {
        question: 'Verstuurt het automatisch mails namens mij?',
        answer:
          'Alleen als jij dat zegt. Standaard zet Stevin het concept klaar en bepaal jij wat er de deur uit gaat. Niets vertrekt zonder jouw akkoord.',
      },
    ],
    relatedSlugs: ['quote', 'signals', 'content-optimization'],
  },
  {
    name: 'Stevin Quote',
    slug: 'quote',
    tagline: 'Offertes via WhatsApp, voor de vakman die niet achter een systeem wil zitten.',
    description:
      'Een vakman wil bouwen en klanten helpen, niet in vijftien systemen werken. Met Stevin Quote loopt de offerte via WhatsApp: de gegevens komen binnen, Stevin zet de offerte klaar, jij stuurt hem met een klik. Van aanvraag tot offerte zonder dat je achter een computer hoeft te kruipen.',
    whoFor:
      'Vakmensen en kleine bedrijven die offertes maken en hun opvolging het liefst vanuit WhatsApp doen.',
    howItWorks:
      'De aanvraag en de afspraken komen via WhatsApp binnen. Stevin zet de offerte op in jouw vorm, jij controleert en verstuurt. Alles loopt door dezelfde lijn waar je toch al de hele dag zit.',
    problemsSolved: [
      'Offertes die blijven liggen omdat het systeem gedoe is',
      'In vijftien losse tools werken voor een simpele offerte',
      'Geen opvolging op verstuurde offertes',
      'Aanvragen die kwijtraken tussen de bedrijven door',
    ],
    inPractice:
      'Het doel: van een appje naar een nette offerte, zonder dat je je werk hoeft neer te leggen om achter een computer te gaan zitten.',
    faqs: [
      {
        question: 'Moet mijn klant een app installeren?',
        answer:
          'Nee. Het loopt via WhatsApp, waar je klanten toch al zitten. Geen extra app, geen drempel.',
      },
    ],
    relatedSlugs: ['follow-up', 'content-optimization', 'signals'],
  },
  {
    name: 'Stevin Uplift',
    slug: 'uplift',
    tagline: 'Uplift-meting en Marketing Mix Modeling: wat levert je marketing nou echt op.',
    description:
      'Veel marketing wordt afgerekend op cijfers die mooi lijken maar niet kloppen, zoals klikken die niemand zou hebben overgeslagen. Stevin Uplift meet de echte bijdrage van je marketing met uplift-meting en Marketing Mix Modeling, zodat je weet welk kanaal en welke euro daadwerkelijk omzet oplevert, en welke je beter anders besteedt.',
    whoFor:
      'Bedrijven die genoeg geven om hun marketingbudget om te willen weten wat het echt oplevert, niet wat het rapport zegt.',
    howItWorks:
      'Stevin combineert je kanaaldata met een model dat de echte bijdrage per kanaal schat. Je ziet wat marketing extra opleverde, los van wat sowieso was gebeurd, zodat je budget naar wat werkt kan.',
    problemsSolved: [
      'Marketingcijfers die mooi lijken maar geen echte bijdrage tonen',
      'Niet weten welk kanaal je omzet echt aanjaagt',
      'Budget verdelen op gevoel in plaats van op bijdrage',
      'Dubbel betalen voor conversies die je toch had gehad',
    ],
    inPractice:
      'De simpele vraag eronder: als je dit kanaal zou uitzetten, hoeveel omzet verlies je dan echt. Daar geeft Stevin Uplift antwoord op.',
    faqs: [
      {
        question: 'Is dit niet hetzelfde als wat mijn advertentieplatform al rapporteert',
        answer:
          'Nee. Platformen rekenen zichzelf graag de conversie toe. Uplift-meting kijkt naar de echte extra bijdrage, los van wat sowieso was gebeurd.',
      },
    ],
    relatedSlugs: ['signals', 'dynamic-optimization', 'dynamic-ads'],
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
