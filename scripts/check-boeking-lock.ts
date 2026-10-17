/**
 * VERGRENDELD: een afsprakenmodule, overal dezelfde (17 okt 2026).
 *
 * Koen: "De afspraken module moet overal hetzelfde zijn, gelocked." Boeken
 * gaat op de hele site en op de campagnedomeinen via het eigen
 * kennismakingsvenster (components/rethink/KennismakingVenster.tsx, met de
 * Hub als boekingsengine). Cal.com is weg.
 *
 * Dit script draait in prebuild. Breekt een wijziging een van de regels
 * hieronder, dan faalt de build en gaat er niets live. Wil je dit echt
 * aanpassen? Alleen met akkoord van Koen, en pas dan dit script in dezelfde
 * commit aan met de reden erbij.
 *
 * Run: npx tsx scripts/check-boeking-lock.ts
 */

import fs from 'fs'
import path from 'path'

const fouten: string[] = []
const lees = (p: string) => fs.readFileSync(p, 'utf8')

// Alle broncode, zonder commentaarregels (daar mag Cal.com als geschiedenis staan).
function bestanden(dir: string, uit: string[] = []): string[] {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) bestanden(p, uit)
    else if (/\.(tsx?|mjs|js)$/.test(e.name)) uit.push(p)
  }
  return uit
}
const zonderCommentaar = (src: string) =>
  src
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\{\s*\/\*[\s\S]*?\*\/\s*\}/g, '')
    .split('\n')
    .filter((r) => !/^\s*(\/\/|\*)/.test(r))
    .join('\n')

const bron = [...bestanden('app'), ...bestanden('components'), ...bestanden('lib'), ...bestanden('content')]

// 1. Geen andere boekingsmodule: geen Cal.com-embed of -link.
for (const f of bron) {
  const s = zonderCommentaar(lees(f))
  if (/app\.cal\.com|cal\.com\/[a-z0-9-]+\/|window\.Cal\b|calendly\.com/i.test(s)) {
    fouten.push(`${f}: bevat een Cal.com- of Calendly-boeking. Boeken gaat alleen via het kennismakingsvenster.`)
  }
}

// 2. Het venster wordt alleen door de lader geladen, en de lader staat in de layout.
for (const f of bron) {
  if (f.endsWith('KennismakingLader.tsx') || f.endsWith('KennismakingVenster.tsx')) continue
  if (/from\s+['"][^'"]*KennismakingVenster['"]/.test(lees(f))) {
    fouten.push(`${f}: importeert KennismakingVenster direct. Het venster staat een keer in de layout via KennismakingLader.`)
  }
}
const layout = lees('app/[locale]/layout.tsx')
if (!/<KennismakingLader\s*\/>/.test(layout)) {
  fouten.push('app/[locale]/layout.tsx: <KennismakingLader /> ontbreekt. Zonder lader opent Kennismaken nergens het venster.')
}

// 3. Campagnedomeinen boeken via stevin.ai/kennismaking (zelfde venster).
const campagne = lees('components/campaign/CampaignLanding.tsx')
if (!campagne.includes('https://stevin.ai/kennismaking?')) {
  fouten.push('components/campaign/CampaignLanding.tsx: de knop moet naar https://stevin.ai/kennismaking gaan, het eigen venster.')
}

if (fouten.length) {
  console.error('\n✗ Afsprakenmodule wijkt af van de vergrendelde opzet.\n')
  for (const f of fouten) console.error(`  - ${f}`)
  console.error('\nDit is goedgekeurd en vastgezet. Draai de wijziging terug of overleg eerst met Koen.\n')
  process.exit(1)
}
console.log('✓ Afsprakenmodule-vergrendeling intact (een venster, geen Cal.com).')
