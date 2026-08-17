/**
 * pricing.md, machine-leesbare prijs-info voor AI-assistenten die producten
 * vergelijken (ChatGPT, Perplexity, agent-buyers). Plain markdown, geen
 * rendering of login nodig.
 *
 * 17 aug 2026: dit bestand stond haaks op de site zelf. Het zei dat er bewust
 * geen publieke prijslijst is en dat Stevin geen bureau is, terwijl /tarieven
 * op datzelfde moment 1.399, 1.499 en 399 per maand noemt en "wij doen alles"
 * een van de drie smaken is. Dat is de kant die het meest langskomt: GPTBot,
 * PerplexityBot, OAI-SearchBot en ClaudeBot deden samen ruim 5.400 ophaalacties
 * in 30 dagen, tegenover 51 kliks uit Google in 90 dagen.
 *
 * Blijft deze tekst gelijk aan https://stevin.ai/tarieven. Wijzigt die pagina,
 * dan wijzigt dit bestand mee.
 *
 * Endpoint: https://stevin.ai/pricing.md (text/markdown)
 */

export const dynamic = 'force-static'
export const revalidate = 3600

const body = `# Tarieven, Stevin.AI

Stevin.AI voert het commerciele werk van een bedrijf uit met software in plaats van uren: de website, de advertenties, de eigen kanalen en het opvolgen van leads. Het platform legt per klant vast wat is gedaan, wat het opleverde en welk besluit daarop volgde, en meet die uitkomst terug. Daardoor wordt het advies scherper naarmate het langer draait.

Accounts, data en het opgebouwde geheugen blijven eigendom van de klant. Er komt geen nieuw centraal systeem voor in de plaats: de bestaande accounts bij Google, Meta en de rest blijven bestaan.

## Het begint met een diagnose

Iedereen begint op dezelfde plek: uitzoeken wat er nodig is. Niet alleen de advertenties, ook de vindbaarheid, de webshop, de mail en het merk. Klopt wat er gemeten wordt, en ligt ergens vast wat werkte en wat niet. Je krijgt de lijst van wat daarvoor moet gebeuren, op je eigen cijfers, binnen twee weken.

## Drie smaken, je kiest zelf

### Wij doen alles
Vanaf 1.399 euro per maand bij jaarbetaling, 1.499 euro per maand bij maandbetaling. Doorlopend, de opstart is maatwerk. Volledige inrichting en actief beheer, met elk besluit vastgelegd. Voor ondernemers die er zelf niet naar om willen kijken.

### Wij starten je op
Stevin richt in en draagt daarna over aan je eigen team of aan een bureau naar keuze.

### Je doet het zelf
Vanaf 399 euro per maand. Je krijgt de software en het geheugen, het werk doe je zelf.

Je keuze is later om te draaien zonder dat je iets kwijtraakt.

## Voor wie

Zakelijke klanten, vooral in Nederland en Belgie, en incidenteel daarbuiten. Van eenmanszaken en vakmensen tot bedrijven met een eigen marketingteam, en bureaus die het voor hun klanten inzetten.

## Kanalen

Elk kanaal met een API sluit erop aan, betaald en eigen: Google Ads, Meta, YouTube, TikTok, LinkedIn, Google Business Profile, Google Analytics, Search Console, en webshops als Shopify en WooCommerce.

## Contact

Plan een gesprek via https://stevin.ai/contact of mail info@stevin.ai. De volledige tarievenpagina staat op https://stevin.ai/tarieven.
`

export async function GET() {
  return new Response(body, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
