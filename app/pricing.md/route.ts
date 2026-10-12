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
 * 12 okt 2026 (W-535): bijgewerkt naar de nieuwe /tarieven met twee pakketten
 * (components/rethink/RethinkTarieven.tsx). De zinnen komen van die pagina.
 * Nooit "vast bedrag": de prijs hangt af van het werk en groeit niet mee met
 * het advertentiebudget.
 *
 * Endpoint: https://stevin.ai/pricing.md (text/markdown)
 */

export const dynamic = 'force-static'
export const revalidate = 3600

const body = `# Tarieven, Stevin.AI

Stevin.AI doet de marketing van mkb-bedrijven. Jij ziet welke aanvraag een opdracht werd, en we verdienen niets aan je advertentiebudget.

Bij Stevin.AI betaal je vanaf 1.399 per maand als wij jouw bureau zijn, en vanaf 399 als je het zelf doet of jouw agents het werk laat doen. Wat je precies betaalt hangt af van het werk, niet van je advertentiebudget. Dat budget betaal je rechtstreeks aan Google en Meta, en daar verdienen wij niets aan.

## Wij worden jouw bureau

Vanaf 1.399 euro per maand bij jaarbetaling, 1.499 als je per maand betaalt. De opstart is maatwerk, de prijs hoor je vooraf.

- Eerst zetten we alles goed: meting, accounts en de koppeling met je CRM.
- Daarna sturen we bij op aanvragen en omzet, niet op klikken.
- Elk besluit leggen we vast, met de reden erbij.
- Wil je later zelf verder? Dan bouwen we agents die het werk overnemen.

## Je doet het zelf, of we zetten jouw agents aan het werk

Vanaf 399 euro per maand bij jaarbetaling, 499 als je per maand betaalt.

- Stevin ziet wat er misgaat en zet de oplossing klaar.
- Jij, je eigen team of jouw agents voeren het uit.
- Een klus toch door ons? Dan hoor je de prijs vooraf.
- Terug naar het bureau kan altijd.

## Je prijs groeit niet mee met je advertentiebudget

Je budget zegt weinig over hoeveel werk het is. Een campagne van 2.000 euro kan lastiger zijn dan een van 10.000. Wij rekenen naar het werk dat er ligt, niet naar je budget. Wat je bij Google en Meta uitgeeft, gaat naar Google en Meta.

## Meer vestigingen of merken

De tarieven gelden voor een bedrijf met een merk en een vestiging of webshop. Meer vestigingen, merken of webshops kosten meer. Hoeveel hoor je in de kennismaking.

## Contact

Plan een kennismaking via https://stevin.ai/kennismaking of mail info@stevin.ai. De volledige tarievenpagina staat op https://stevin.ai/tarieven, in het Engels op https://stevin.ai/en/tarieven.
`

export async function GET() {
  return new Response(body, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
