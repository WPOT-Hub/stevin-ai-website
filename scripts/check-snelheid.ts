/**
 * VERGRENDELD: de snelheidsbasis van stevin.ai (17 okt 2026).
 *
 * Koen: "de basis snelheid dingen, dat zou voortaan al basis moeten zijn".
 * Wat op 17 okt is rechtgezet, mag niet stil terugkomen. Dit script draait in
 * prebuild (bronregels) en in postbuild (gewicht van de gebouwde pagina's).
 * Gaat iets over de grens, dan faalt de build en gaat er niets live.
 *
 * Grenzen ophogen kan, maar alleen met akkoord van Koen en met de reden in
 * dezelfde commit. Gemeten op 17 okt na de fixes: homepage 158 KB HTML,
 * zwaarste pagina (Journal-overzicht) 192 KB, fonts 33 tot 92 KB.
 *
 * Run: npx tsx scripts/check-snelheid.ts          (bronregels)
 *      npx tsx scripts/check-snelheid.ts --html   (na de build)
 */

import fs from 'fs'
import path from 'path'

const KB = 1024
const GRENS = {
  font: 100 * KB, // per lettertypebestand; was 193 KB voor 17 okt
  rauwBeeld: 100 * KB, // afbeelding die NIET via next/image gaat (<img>, CSS url())
  html: 230 * KB, // per gebouwde pagina; was 296 KB voor de homepage
  beforeInteractive: 1, // alleen het consent-standaardscript mag de pagina ophouden
}

const fouten: string[] = []
const lees = (p: string) => fs.readFileSync(p, 'utf8')
const kb = (n: number) => `${Math.round(n / KB)} KB`

function bestanden(dir: string, filter: RegExp, uit: string[] = []): string[] {
  if (!fs.existsSync(dir)) return uit
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) bestanden(p, filter, uit)
    else if (filter.test(e.name)) uit.push(p)
  }
  return uit
}

function bronregels() {
  // 1. Lettertypen: gesubset tot Latijn, opsz-as behouden (zie fonts-commit 346f02c).
  for (const f of bestanden('public/fonts', /\.woff2$/)) {
    const n = fs.statSync(f).size
    if (n > GRENS.font) fouten.push(`${f} is ${kb(n)} (grens ${kb(GRENS.font)}). Subset het lettertype tot Latijn met pyftsubset; houd de opsz-as.`)
  }

  // 2. Afbeeldingen buiten next/image: die gaan onverkleind naar de telefoon.
  const bron = [...bestanden('app', /\.(tsx|ts|css)$/), ...bestanden('components', /\.(tsx|ts|css)$/)]
  for (const f of bron) {
    const s = lees(f)
    const paden = [
      ...[...s.matchAll(/<img\b[^>]*\bsrc=\{?["'`](\/[^"'`${}]+)["'`]/g)].map((m) => m[1]),
      ...[...s.matchAll(/url\(\s*["']?(\/[^"')]+)["']?\s*\)/g)].map((m) => m[1]),
    ]
    for (const p of paden) {
      const bestand = path.join('public', p.split('?')[0])
      if (!fs.existsSync(bestand)) continue
      const n = fs.statSync(bestand).size
      if (n > GRENS.rauwBeeld) fouten.push(`${f}: ${p} is ${kb(n)} en gaat niet via next/image (grens ${kb(GRENS.rauwBeeld)}). Gebruik <Image> of verklein het bestand.`)
    }
  }

  // 3. Alleen de vertalingen die client-componenten lezen gaan naar de browser.
  const layout = lees('app/[locale]/layout.tsx')
  if (!/CLIENT_NAMESPACES/.test(layout) || /messages=\{\s*await\s+getMessages\(\)\s*\}/.test(layout) || !/Object\.fromEntries\(\s*CLIENT_NAMESPACES/.test(layout)) {
    fouten.push('app/[locale]/layout.tsx: de browser moet alleen CLIENT_NAMESPACES krijgen, niet alle vertalingen (153 KB per pagina).')
  }

  // 4. Scripts die de eerste weergave ophouden.
  let blokkerend = 0
  const zonderCommentaar = (t: string) => t.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '')
  for (const f of bron) blokkerend += (zonderCommentaar(lees(f)).match(/strategy=["']beforeInteractive["']/g) || []).length
  if (blokkerend > GRENS.beforeInteractive) fouten.push(`${blokkerend} scripts met strategy="beforeInteractive" (grens ${GRENS.beforeInteractive}). Laad ze afterInteractive of lazyOnload.`)

  // 5. Het kennismakingsvenster laadt pas bij gebruik (KennismakingLader, dynamic import).
  const lader = fs.existsSync('components/rethink/KennismakingLader.tsx') ? lees('components/rethink/KennismakingLader.tsx') : ''
  if (!/dynamic\(/.test(lader)) fouten.push('components/rethink/KennismakingLader.tsx: het venster moet met dynamic() laden, niet mee in elke pagina.')
}

// Telt per map (twee niveaus diep onder .next) de bestanden per extensie.
function census(): string {
  const wortel = '.next'
  if (!fs.existsSync(wortel)) return `cwd=${process.cwd()}, geen .next; VERCEL=${process.env.VERCEL ?? ''}`
  const regels: string[] = []
  const tel = (dir: string, diepte: number) => {
    const per: Record<string, number> = {}
    let sub: string[] = []
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      if (e.isDirectory()) sub.push(path.join(dir, e.name))
      else { const ext = path.extname(e.name) || '(geen)'; per[ext] = (per[ext] ?? 0) + 1 }
    }
    const samenvatting = Object.entries(per).map(([k, v]) => `${k}:${v}`).join(' ')
    regels.push(`${dir}${samenvatting ? ` [${samenvatting}]` : ''}`)
    if (diepte < 2) for (const d of sub) tel(d, diepte + 1)
  }
  tel(wortel, 0)
  return `cwd=${process.cwd()}, VERCEL=${process.env.VERCEL ?? ''}; ` + regels.join('; ')
}

function htmlGewicht() {
  // Lokaal en in de Actions-runner zet next build de pagina's in
  // .next/server/app. In Vercels eigen build (uitrol via de git-koppeling)
  // blijft die map leeg en staat alles in .next/output: static voor de
  // vooraf gebouwde pagina's, functions voor de rest. Gemeten in het
  // buildlog van 18 okt 2026 (W-574), nadat elke git-uitrol sinds W-567
  // hier was afgeketst terwijl productie alleen via de Actions-workflow
  // overeind bleef.
  const WORTELS = ['.next/server/app', '.next/output/static', '.next/output/functions']
  let html = bestanden(WORTELS[0], /\.html$/)
  if (!html.length) html = [...bestanden(WORTELS[1], /\.html$/), ...bestanden(WORTELS[2], /\.html$/)]
  // Vercel kopieert ook public/ naar .next/output/static. De losse
  // campagnepagina's daar (ads-data.html, inhouse.html, 5,6 MB) zijn geen
  // gebouwde pagina's en vallen buiten deze basis; die hebben een eigen klus.
  const uitPublic = (f: string) => f.startsWith(`${WORTELS[1]}/`) && fs.existsSync(path.join('public', f.slice(WORTELS[1].length + 1)))
  const overgeslagen = html.filter(uitPublic)
  html = html.filter((f) => !uitPublic(f))
  if (overgeslagen.length) console.log(`  overgeslagen, statisch uit public/: ${overgeslagen.map((f) => f.slice(WORTELS[1].length)).join(', ')}`)
  const naam = (f: string) => '/' + WORTELS.reduce((r, w) => r.replace(`${w}/`, ''), f).replace(/\.html$/, '')
  if (!html.length) {
    fouten.push(`Geen gebouwde pagina's gevonden in ${WORTELS.join(', ')}. Draai dit na next build. Census: ${census()}`)
    return
  }
  for (const f of html) {
    const n = fs.statSync(f).size
    if (n > GRENS.html) fouten.push(`${naam(f)} is ${kb(n)} HTML (grens ${kb(GRENS.html)}). Kijk wat er in de pagina-data meegaat.`)
  }
  if (!fouten.length) {
    const zwaarste = html.map((f) => [f, fs.statSync(f).size] as const).sort((a, b) => b[1] - a[1])[0]
    console.log(`  ${html.length} pagina's, zwaarste: ${naam(zwaarste[0])} ${kb(zwaarste[1])} van ${kb(GRENS.html)}`)
  }
}

const naBuild = process.argv.includes('--html')
if (naBuild) htmlGewicht()
else bronregels()

if (fouten.length) {
  console.error(`\n✗ Snelheidsbasis ${naBuild ? '(gebouwde pagina\'s)' : '(bronregels)'} geschonden:\n`)
  for (const f of fouten) console.error(`  - ${f}`)
  console.error('\nDit is de vastgezette basis van 17 okt 2026. Los het op, of verhoog een grens alleen met akkoord van Koen.\n')
  process.exit(1)
}
console.log(`✓ Snelheidsbasis intact${naBuild ? ' (gebouwde pagina\'s)' : ' (bronregels)'}.`)
