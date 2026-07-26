/**
 * Loopt de echte pagina's na op titel, omschrijving, H1 en verboden woorden.
 *
 * Aanleiding 27 juli 2026: de <title> van /platform zei nog "de AI-laag over je
 * operatie", een formulering die op 4 juli was vervangen. Die stond er drie
 * weken, en werd gevonden doordat iemand er toevallig naar keek. Dat is geen
 * controle. Dit script kijkt naar de GERENDERDE pagina, niet naar de bron, want
 * teksten komen ook uit messages/*.json en data/*.ts.
 *
 *   npx tsx scripts/check-copy.ts                      # tegen productie
 *   npx tsx scripts/check-copy.ts http://localhost:3009
 *
 * Exitcode 1 zodra er iets hard fout staat.
 */

const BASIS = process.argv[2]?.replace(/\/$/, '') ?? 'https://stevin.ai'

/** De pagina's die tellen. Programmatic long tail zit er als steekproef in. */
const PADEN = [
  '/', '/platform', '/diensten', '/werkwijze', '/controle', '/contact',
  '/mkb', '/retail', '/voor-ondernemers', '/voor-marketingteams', '/voor-musea', '/voor-dealers',
  '/producten', '/integraties', '/multi-market', '/marketing-automation', '/seo', '/geo',
  '/google-ads-uitbesteden', '/social-media-uitbesteden',
  '/google-ad-grants-nederland', '/google-ad-grants-belgie',
  '/case-studies', '/simon-stevin', '/blog', '/woordenboek', '/vergelijken', '/alternatief',
  // De acht SEO-landingspagina's
  '/marketing-intelligence', '/leadopvolging', '/marketing-voor-bureaus', '/website-met-crm',
  '/google-ads-ga4', '/first-party-data', '/lead-generatie', '/ai-briefing',
  // Steekproef uit de programmatic sets
  '/integraties/google-ads', '/woordenboek/roas', '/producten/signals',
]

/** Woorden en tekens die er niet meer in horen. Bron: de schrijfregels. */
const VERBODEN: Array<{ patroon: RegExp; waarom: string; hard: boolean }> = [
  { patroon: /—/, waarom: 'em-dash', hard: true },
  { patroon: /–/, waarom: 'en-dash', hard: true },
  { patroon: /weglek|lekt weg|lekken weg/i, waarom: '"weglekt" over geld', hard: true },
  { patroon: /meetlat/i, waarom: 'meetlat, door Koen geschrapt motief (25 jul 2026)', hard: true },
  // Bewust "let op" en niet "fout": Koen heeft de MEETLAT geschrapt, over
  // "black box" heeft hij zich nooit uitgesproken. Dat het daarbij hoorde is
  // een aanname, en die hoort niet als feit in een controle te staan.
  { patroon: /black.?box/i, waarom: 'black box, hoorde bij het meetlat-verhaal; Koen moet zeggen of dit ook weg moet', hard: false },
  { patroon: /AI-laag over je (operatie|hele bedrijf)/i, waarom: 'oude of te brede scope-claim', hard: true },
  { patroon: /data-eigenaarschap|eigenaarschap van data/i, waarom: 'moet "data ownership" zijn', hard: true },
  { patroon: /\b(B\.?V\.?|V\.?O\.?F\.?|N\.?V\.?|BVBA)\b/, waarom: 'rechtsvorm in copy', hard: false },
  { patroon: /incrementaliteit|causale data/i, waarom: 'academisch jargon', hard: false },
  { patroon: /dat gat sluiten we|dat lossen we op\.|dat pakken we aan\.|dat regelen we\./i, waarom: 'generieke afsluitzin', hard: false },
]

/** Accenten horen niet in Nederlandse copy. Losse leenwoorden zijn te veel ruis, dus alleen de veelvoorkomende. */
const ACCENTEN = /\b(één|vóór|zélf|hé|dé|nú|áls)\b/i

interface Pagina {
  pad: string
  titel: string
  omschrijving: string
  h1: string[]
  tekst: string
  status: number
}

const striptags = (s: string) => s.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()

function ontleed(pad: string, html: string, status: number): Pagina {
  const titel = html.match(/<title>([^<]*)<\/title>/i)?.[1]?.trim() ?? ''
  const omschrijving = html.match(/<meta name="description" content="([^"]*)"/i)?.[1]?.trim() ?? ''
  const h1 = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) => striptags(m[1]))
  // JSON-LD en scripts eruit, anders tel je schema-tekst mee als copy.
  const body = html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
  return { pad, titel, omschrijving, h1, tekst: striptags(body), status }
}

async function main() {
  const paginas: Pagina[] = []
  for (let i = 0; i < PADEN.length; i += 5) {
    await Promise.all(PADEN.slice(i, i + 5).map(async (pad) => {
      try {
        const res = await fetch(`${BASIS}${pad === '/' ? '' : pad}`)
        paginas.push(ontleed(pad, await res.text(), res.status))
      } catch (e) {
        paginas.push({ pad, titel: '', omschrijving: '', h1: [], tekst: '', status: 0 })
      }
    }))
  }
  paginas.sort((a, b) => PADEN.indexOf(a.pad) - PADEN.indexOf(b.pad))

  const hard: string[] = []
  const zacht: string[] = []

  // Dubbele titels en omschrijvingen: Google ziet dat als kannibalisatie.
  const perTitel = new Map<string, string[]>()
  const perOms = new Map<string, string[]>()
  for (const p of paginas) {
    if (p.titel) perTitel.set(p.titel, [...(perTitel.get(p.titel) ?? []), p.pad])
    if (p.omschrijving) perOms.set(p.omschrijving, [...(perOms.get(p.omschrijving) ?? []), p.pad])
  }
  for (const [t, paden] of perTitel) if (paden.length > 1) hard.push(`dubbele titel op ${paden.join(', ')}: "${t}"`)
  for (const [d, paden] of perOms) if (paden.length > 1) hard.push(`dubbele omschrijving op ${paden.join(', ')}: "${d.slice(0, 60)}..."`)

  for (const p of paginas) {
    const waar = p.pad
    if (p.status !== 200) { hard.push(`${waar}: HTTP ${p.status}`); continue }
    if (!p.titel) hard.push(`${waar}: geen titel`)
    else if (p.titel.length > 65) zacht.push(`${waar}: titel ${p.titel.length} tekens, Google kapt rond 60`)
    if (!p.omschrijving) hard.push(`${waar}: geen omschrijving`)
    else if (p.omschrijving.length > 160) zacht.push(`${waar}: omschrijving ${p.omschrijving.length} tekens`)
    if (p.h1.length === 0) hard.push(`${waar}: geen H1`)
    else if (p.h1.length > 1) zacht.push(`${waar}: ${p.h1.length} H1's (${p.h1.map((h) => h.slice(0, 24)).join(' | ')})`)

    const doorzoek = `${p.titel} ${p.omschrijving} ${p.tekst}`
    for (const v of VERBODEN) {
      const m = doorzoek.match(v.patroon)
      if (m) {
        const zin = doorzoek.slice(Math.max(0, doorzoek.indexOf(m[0]) - 45), doorzoek.indexOf(m[0]) + 55).trim()
        ;(v.hard ? hard : zacht).push(`${waar}: ${v.waarom} → "...${zin}..."`)
      }
    }
    const acc = doorzoek.match(ACCENTEN)
    if (acc) zacht.push(`${waar}: accent in NL-copy → "${acc[0]}"`)
  }

  console.log(`${paginas.length} pagina's nagelopen op ${BASIS}\n`)
  if (hard.length) {
    console.log(`FOUT (${hard.length}):`)
    for (const r of hard) console.log(`  ${r}`)
    console.log()
  }
  if (zacht.length) {
    console.log(`LET OP (${zacht.length}):`)
    for (const r of zacht) console.log(`  ${r}`)
    console.log()
  }
  if (!hard.length && !zacht.length) console.log('Niets gevonden.')

  if (hard.length) process.exit(1)
}

main().catch((e) => { console.error('Mislukt:', e.message); process.exit(1) })
