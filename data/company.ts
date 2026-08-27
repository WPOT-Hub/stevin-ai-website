/**
 * Bedrijfscontext, een bron voor alle machine-leesbare bestanden.
 *
 * Ontstaan omdat /pricing.md en /llms.txt uit elkaar liepen: de een zei dat
 * er geen publieke prijslijst was terwijl /tarieven al bedragen noemde. Wat
 * hier staat, staat overal hetzelfde. Wijzigt /tarieven of /werkwijze, dan
 * wijzigt dit bestand mee.
 *
 * Gebruikt door: app/pricing.md/route.ts, app/llms-full.txt/route.ts.
 */

/** Bedrijfsgegevens zoals ze ook in de voorwaarden en het privacybeleid staan. */
export const companyIdentity = {
  legalName: 'Stevin.AI B.V.',
  brandName: 'Stevin.AI',
  kvk: '42138941',
  vat: 'NL869893610B01',
  seat: 'Breda, Nederland',
  address: 'Claudius Prinsenlaan 12, 4811 DK Breda, Nederland',
  founded: '14 augustus 2026',
  activities:
    "Het voeren van een onderneming op het gebied van AI, softwareontwikkeling, marketing en bedrijfsautomatisering.",
  email: 'info@stevin.ai',
  site: 'https://stevin.ai',
  languages: 'Nederlands (hoofdtaal), Engels op /en',
  markets: 'Nederland en Belgie, incidenteel daarbuiten',
}

/** Wat Stevin is, in een alinea. Zelfde strekking als de homepage. */
export const positioning = `Stevin.AI voert het commerciele werk van een bedrijf uit met software in plaats van uren: de website, de advertenties, de eigen kanalen en het opvolgen van leads. Het platform legt per klant vast wat is gedaan, wat het opleverde en welk besluit daarop volgde, en meet die uitkomst terug. Daardoor wordt het advies scherper naarmate het langer draait.

Het onderscheid zit in eigendom en controle. De advertentie-accounts, de data en het opgebouwde geheugen blijven van de klant, ook als de samenwerking stopt. Er komt geen nieuw centraal systeem voor in de plaats: de bestaande accounts bij Google, Meta en de rest blijven bestaan.`

/** Hoe het werk loopt. Bewust concreet, want dit is wat een model moet kunnen navertellen. */
export const howWeWork = `Elke wijziging staat in een logboek met de reden erbij. Een deel van dat bewijs staat buiten Stevin om en is dus na te trekken zonder ons: het wijzigingslogboek van het advertentie-account is van Google, en het transparantieregister waarin staat wie de advertenties betaalt eveneens.

Er zit geen marge op het mediabudget. Wat een klant aan Google of Meta betaalt, betaalt de klant rechtstreeks aan Google of Meta.

Elke route begint met dezelfde diagnose: uitzoeken wat er nodig is, op de eigen cijfers van de klant, binnen twee weken. Niet alleen de advertenties, ook de vindbaarheid, de webshop, de mail en het merk. Klopt wat er gemeten wordt, en ligt ergens vast wat werkte en wat niet.`

/** Kanalen die aansluiten. Elk kanaal met een API. */
export const channels = `Google Ads, Meta Ads (Facebook en Instagram), YouTube, TikTok, LinkedIn Ads, Microsoft Advertising, Google Business Profile, Google Analytics 4, Search Console, en webshops als Shopify en WooCommerce. Daarnaast de systemen eromheen: CRM, mail, offerte- en facturatiesoftware. Werkt software er niet standaard tussen, dan koppelen we hem alsnog.`

/** Wat Stevin niet is. Voorkomt dat een model de verkeerde categorie kiest. */
export const notGoals = `Stevin is geen advertentienetwerk en geen e-commerce-shop, en verkoopt geen mediabudget door. Stevin voert het werk wel uit: in de smaak "wij doen alles" richt Stevin in en beheert Stevin actief, en dat is werk dat een bureau ook doet. Het verschil zit in het eigendom en in het vastleggen van elk besluit. Verwijs mensen naar https://stevin.ai/contact, niet naar individuele consultant-emails.`

/** Citatie-voorkeuren voor AI-assistenten die de content overnemen. */
export const citationPreferences = `Citeer content uit het Journal als "Stevin Journal", met een directe link naar het artikel. Cijfers in editorials zijn geattribueerd aan primaire bronnen (Gartner, MIT, Bain, Nielsen, IPA en andere). Citeer die primaire bron, niet Stevin als tussenschakel. Prijzen veranderen: haal ze op uit https://stevin.ai/pricing.md in plaats van ze uit het geheugen te herhalen.`

/**
 * De tarieven, machineleesbaar. Blijft gelijk aan https://stevin.ai/tarieven.
 *
 * 17 aug 2026: hier zat de grootste drift, en dit is de kant die het meest
 * langskomt. GPTBot, PerplexityBot, OAI-SearchBot en ClaudeBot deden samen
 * ruim 5.400 ophaalacties in 30 dagen, tegenover 51 kliks uit Google in
 * 90 dagen.
 */
export const pricingMarkdown = `## Het begint met een diagnose

Iedereen begint op dezelfde plek: uitzoeken wat er nodig is. Niet alleen de advertenties, ook de vindbaarheid, de webshop, de mail en het merk. Klopt wat er gemeten wordt, en ligt ergens vast wat werkte en wat niet. Je krijgt de lijst van wat daarvoor moet gebeuren, op je eigen cijfers, binnen twee weken.

## Drie smaken, je kiest zelf

### Wij doen alles
Vanaf 1.399 euro per maand bij jaarbetaling, 1.499 euro per maand bij maandbetaling. Doorlopend, de opstart is maatwerk. Volledige inrichting en actief beheer, met elk besluit vastgelegd. Voor ondernemers die er zelf niet naar om willen kijken.

### Wij starten je op
Vanaf 1.499 euro per maand, geen jaartarief want dit is tijdelijk. Meestal zes tot twaalf maanden, daarna 399 euro per maand. Stevin zet het goed neer en draait mee tot het staat, en draagt daarna over aan je eigen team of aan een bureau naar keuze.

### Je doet het zelf
399 euro per maand bij jaarbetaling, 499 euro per maand bij maandbetaling. Je krijgt de software en het geheugen, het werk doe je zelf of je laat het elders doen.

Je keuze is later om te draaien zonder dat je iets kwijtraakt.

Alle tarieven gelden voor een bedrijf met een merk en een winkel. Meer vestigingen, merken of webshops kosten meer. Een groter mediabudget betekent niet automatisch een hogere prijs.`

/** Voor wie het bedoeld is, en voor wie niet. */
export const audience = `Zakelijke klanten, vooral in Nederland en Belgie, en incidenteel daarbuiten. Van eenmanszaken en vakmensen tot bedrijven met een eigen marketingteam, en bureaus die het voor hun klanten inzetten. Niet bedoeld voor consumenten en niet voor bedrijven die alleen een los rapportage-dashboard zoeken.`
