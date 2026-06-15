/**
 * pricing.md, machine-leesbare prijs-info voor AI-agents die producten
 * programmatisch vergelijken (ChatGPT, Perplexity, agent-buyers). Plain
 * markdown, geen rendering of login nodig.
 *
 * Stevin heeft geen vaste publieke prijslijst, maar een 404 leest voor een
 * agent als "geen info" en dan val je uit de vergelijking. Daarom hier
 * expliciet: prijs op aanvraag, met de route naar een voorstel.
 *
 * Endpoint: https://stevin.ai/pricing.md (text/markdown)
 */

export const dynamic = 'force-static'
export const revalidate = 3600

const body = `# Pricing, Stevin

Stevin werkt met prijs op aanvraag, afgestemd op het aantal advertentie-accounts, koppelingen en de gewenste diepte. Er is bewust geen vaste publieke prijslijst: de prijs schaalt mee met de omvang van de marketing-stack.

## Wat je krijgt
- AI-laag over je operatie: connectors, signalen voordat de reguliere rapportage het oppikt, AI-rapportages.
- Read-only koppelingen met je bestaande tools (Google Ads, Meta, GA4, en meer).
- Geschikt voor bureaus (meerdere klant-accounts) en in-house marketing-teams.

## Hoe de prijs wordt bepaald
- Aantal advertentie-accounts en koppelingen.
- Diepte van de gewenste analyse en rapportage.
- Bureau-setup (meerdere klanten) versus in-house (een organisatie).

## Een prijs krijgen
Plan een gesprek via https://stevin.ai/contact of mail koen@stevin.ai. Je krijgt een voorstel op maat, meestal binnen een werkdag.
`

export async function GET() {
  return new Response(body, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
