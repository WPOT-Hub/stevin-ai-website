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

function htmlGewicht() {
  const html = bestanden('.next/server/app', /\.html$/)
  if (!html.length) {
    fouten.push('Geen gebouwde pagina\'s gevonden in .next/server/app. Draai dit na next build.')
    return
  }
  for (const f of html) {
    const n = fs.statSync(f).size
    if (n > GRENS.html) fouten.push(`${f.replace('.next/server/app/', '/').replace(/\.html$/, '')} is ${kb(n)} HTML (grens ${kb(GRENS.html)}). Kijk wat er in de pagina-data meegaat.`)
  }
  if (!fouten.length) {
    const zwaarste = html.map((f) => [f, fs.statSync(f).size] as const).sort((a, b) => b[1] - a[1])[0]
    console.log(`  zwaarste pagina: ${zwaarste[0].replace('.next/server/app/', '/')} ${kb(zwaarste[1])} van ${kb(GRENS.html)}`)
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
