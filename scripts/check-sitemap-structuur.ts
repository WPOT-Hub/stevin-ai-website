/**
 * Structuurcontrole op de sitemap, zonder netwerk, dus geschikt voor de build.
 *
 * De live-controle (check-sitemap-canonicals.ts) is scherper maar heeft een
 * draaiende site nodig en kan dus niet in de build. Dit vangt dezelfde klasse
 * fouten af aan de bron:
 *
 *   1. Een /en-URL voor een pagina die niet in translatedPages staat. Dat was
 *      de bug van 26 juli 2026: 284 van de 901 URL's waren /en-varianten van
 *      Nederlandse pagina's die naar de NL-URL canonicalen. Google kreeg de
 *      opdracht te crawlen en daarna het resultaat weg te gooien, en verbruikte
 *      daar het crawlbudget mee dat twee landingspagina's nodig hadden.
 *   2. Dubbele URL's.
 *   3. Een NL-only entry die toch een en-hreflang adverteert.
 *   4. Relatieve of niet-stevin.ai URL's.
 *
 * Draait mee in `npm run build`. Exitcode 1 laat de build vallen.
 */

import sitemap from '../app/sitemap'

const BASIS = 'https://stevin.ai'

function main() {
  const entries = sitemap()
  const fouten: string[] = []

  const gezien = new Map<string, number>()
  for (const e of entries) gezien.set(e.url, (gezien.get(e.url) ?? 0) + 1)
  for (const [url, n] of gezien) if (n > 1) fouten.push(`dubbele URL (${n}x): ${url}`)

  const enUrls = entries.filter((e) => e.url.startsWith(`${BASIS}/en`))
  const nlUrls = new Set(entries.filter((e) => !e.url.startsWith(`${BASIS}/en`)).map((e) => e.url))

  for (const e of entries) {
    if (!e.url.startsWith(BASIS)) {
      fouten.push(`URL niet op ${BASIS}: ${e.url}`)
      continue
    }
    const talen = (e.alternates?.languages ?? {}) as Record<string, string>

    // Een NL-entry die een en-alternate adverteert terwijl die /en-URL zelf niet
    // in de sitemap staat, wijst naar een pagina die terugcanonicalt. Zelfde rondje.
    if (!e.url.startsWith(`${BASIS}/en`) && talen.en) {
      const enUrl = talen.en
      if (!enUrls.some((x) => x.url === enUrl)) {
        fouten.push(`${e.url.replace(BASIS, '') || '/'} adverteert en-hreflang naar ${enUrl.replace(BASIS, '')}, maar die staat niet in de sitemap`)
      }
    }

    // Een /en-URL hoort een NL-tegenhanger in de sitemap te hebben. Zo niet, dan
    // is het een losse Engelse pagina (mag) of een vergissing (meestal).
    if (e.url.startsWith(`${BASIS}/en`)) {
      const nl = BASIS + e.url.slice(`${BASIS}/en`.length)
      const losseEngelse = talen.en === e.url && !talen['nl-NL']
      if (!losseEngelse && !nlUrls.has(nl) && !nlUrls.has(nl + '/') && nl !== BASIS) {
        fouten.push(`${e.url.replace(BASIS, '')} heeft geen NL-tegenhanger in de sitemap`)
      }
    }
  }

  const en = enUrls.length
  const totaal = entries.length
  console.log(`Sitemap-structuur: ${totaal} URL's, waarvan ${en} op /en.`)

  // Vangnet tegen sluipende groei: als /en weer een flink deel van de sitemap
  // wordt, is er vrijwel zeker opnieuw automatisch gedupliceerd.
  if (en > totaal * 0.15) {
    fouten.push(`${en} van ${totaal} URL's staan op /en (${Math.round((en / totaal) * 100)}%). Boven de 15% is dat vrijwel altijd automatische duplicatie.`)
  }

  if (fouten.length) {
    console.error(`\n${fouten.length} probleem(en) in de sitemap:\n`)
    for (const f of fouten.slice(0, 30)) console.error(`  ${f}`)
    if (fouten.length > 30) console.error(`  ... en nog ${fouten.length - 30}`)
    console.error('\nZie app/sitemap.ts: translatedPages krijgt een /en-entry, nlOnlyPages niet.')
    process.exit(1)
  }

  console.log('Structuur in orde.')
}

main()
