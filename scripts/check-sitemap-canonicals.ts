/**
 * Toetst de harde sitemap-regel: elke URL in de sitemap moet naar zichzelf canonicalen.
 *
 * Waarom dit bestaat. Op 26 juli 2026 stonden er 901 URL's in de sitemap,
 * waarvan 284 (bijna een derde) canonicalden naar een andere URL: alle
 * /en-varianten van pagina's die gewoon Nederlandse tekst serveren. Je vraagt
 * Google dan om te crawlen en zegt daarna dat hij het resultaat moet weggooien.
 * Op een jong domein met krap crawlbudget is dat duur: twee landingspagina's
 * van 6 juli waren op 26 juli nog steeds nooit gecrawld, terwijl ze gewoon in
 * de sitemap stonden en vanuit de footer gelinkt waren.
 *
 *   npx tsx scripts/check-sitemap-canonicals.ts                 # tegen productie
 *   npx tsx scripts/check-sitemap-canonicals.ts http://localhost:3000
 *   STEEKPROEF=40 npx tsx scripts/check-sitemap-canonicals.ts   # sneller, willekeurige greep
 *
 * Exitcode 1 als er ook maar een URL niet naar zichzelf canonicalt.
 */

const BASIS = process.argv[2]?.replace(/\/$/, '') ?? 'https://stevin.ai'
const STEEKPROEF = process.env.STEEKPROEF ? Number(process.env.STEEKPROEF) : 0
const GELIJKTIJDIG = 6

async function haal(url: string): Promise<string> {
  const res = await fetch(url, { redirect: 'follow' })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.text()
}

function canonicalUit(html: string): string | null {
  const m = html.match(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/i)
    ?? html.match(/<link[^>]+href="([^"]+)"[^>]+rel="canonical"/i)
  return m ? m[1] : null
}

/**
 * Alleen het pad vergelijken. De canonical in de HTML wijst altijd naar
 * stevin.ai, ook als je lokaal draait; op de host vergelijken zou dan elke
 * URL afkeuren. Trailing slash weg, anders krijg je schijnfouten.
 */
function normaliseer(u: string): string {
  try {
    return new URL(u).pathname.replace(/\/$/, '') || '/'
  } catch {
    return u.replace(/\/$/, '')
  }
}

async function main() {
  const xml = await haal(`${BASIS}/sitemap.xml`)
  // De sitemap schrijft altijd absolute stevin.ai-URL's. Draai je lokaal, dan
  // moet de host naar de opgegeven basis, anders toets je stiekem productie.
  let urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map((m) => m[1].replace(/^https?:\/\/[^/]+/, BASIS))
  if (!urls.length) {
    console.error('Geen <loc>-entries gevonden. Is dit wel een sitemap?')
    process.exit(1)
  }

  const totaal = urls.length
  if (STEEKPROEF > 0 && STEEKPROEF < urls.length) {
    // Deterministische greep: elke n-de, zodat elke sectie aan bod komt.
    const stap = Math.ceil(urls.length / STEEKPROEF)
    urls = urls.filter((_, i) => i % stap === 0)
  }

  console.log(`Sitemap ${BASIS}: ${totaal} URL's, ${urls.length} gecontroleerd\n`)

  const fout: Array<{ url: string; canonical: string | null; reden: string }> = []
  let gedaan = 0

  for (let i = 0; i < urls.length; i += GELIJKTIJDIG) {
    await Promise.all(urls.slice(i, i + GELIJKTIJDIG).map(async (url) => {
      try {
        const c = canonicalUit(await haal(url))
        if (!c) fout.push({ url, canonical: null, reden: 'geen canonical in de HTML' })
        else if (normaliseer(c) !== normaliseer(url)) fout.push({ url, canonical: c, reden: 'canonicalt naar een andere URL' })
      } catch (e: unknown) {
        fout.push({ url, canonical: null, reden: `niet op te halen: ${(e as Error).message}` })
      }
      gedaan++
      if (gedaan % 25 === 0) process.stdout.write(`  ${gedaan}/${urls.length}\r`)
    }))
  }

  if (!fout.length) {
    console.log(`Alle ${urls.length} gecontroleerde URL's canonicalen naar zichzelf.`)
    return
  }

  console.log(`\n${fout.length} van ${urls.length} URL's deugen niet:\n`)
  for (const f of fout.slice(0, 40)) {
    console.log(`  ${f.url.replace(BASIS, '')}`)
    console.log(`      ${f.reden}${f.canonical ? `: ${f.canonical.replace(BASIS, '')}` : ''}`)
  }
  if (fout.length > 40) console.log(`  ... en nog ${fout.length - 40}`)
  console.log('\nEen URL die niet naar zichzelf canonicalt hoort niet in de sitemap.')
  console.log('Zet hem in app/sitemap.ts in nlOnlyPages, of haal hem er helemaal uit.')
  process.exit(1)
}

main().catch((e) => { console.error('Mislukt:', e.message); process.exit(1) })
