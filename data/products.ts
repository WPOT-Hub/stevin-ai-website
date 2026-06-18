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
      'Binnen een eigen bureau draaiden we deze aanpak jarenlang: pagina’s en campagnes die meebewogen met seizoen, voorraad en lokale vraag, in plaats van een opzet die het hele jaar bleef staan. Dat fundament zit nu in Stevin.',
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
    relatedSlugs: ['dynamic-ads', 'signals', 'uplift'],
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
      'In ons eigen bureau zagen we steeds hetzelfde: de winst zit niet in een nieuwe campagne, maar in eerder bijsturen. Die discipline zit nu in Stevin Dynamic Ads.',
    faqs: [
      {
        question: 'Heb ik hier een groot advertentiebudget voor nodig?',
        answer:
          'Nee. De winst zit juist in beter besteden, niet in meer besteden. Het werkt op elk budget waar je nu al mee adverteert.',
      },
    ],
    relatedSlugs: ['dynamic-optimization', 'signals', 'uplift'],
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
  'dynamic-ads': '/producten/outdoor.jpg',
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
