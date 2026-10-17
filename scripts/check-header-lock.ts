/**
 * VERGRENDELD: kleurwissel van de header (W-567, 17 okt 2026).
 *
 * De header kiest wit logo of blauw logo op basis van de achtergrond die
 * direct ONDER de balk ligt, niet op basis van scrollafstand. Daarvoor
 * wisselde hij na 60px naar licht terwijl op een telefoon de donkere hero
 * nog een heel scherm doorliep. Koen heeft de werkende versie goedgekeurd en
 * vastgezet: dit gedrag mag niet meer veranderen.
 *
 * Dit script draait in prebuild. Breekt iemand (mens of agent) een van de
 * regels hieronder, dan faalt de build en gaat er niets live.
 *
 * Wil je dit echt aanpassen? Alleen met akkoord van Koen, en pas dan dit
 * script in dezelfde commit aan met de reden erbij.
 *
 * Run: npx tsx scripts/check-header-lock.ts
 */

import fs from "fs";

const HEADER = "components/Header.tsx";
const src = fs.readFileSync(HEADER, "utf8");

const regels: { ok: boolean; uitleg: string }[] = [
  {
    ok: src.includes("document.elementFromPoint("),
    uitleg:
      "De header moet meten wat er onder de balk ligt (elementFromPoint). Zonder die meting wisselt het logo op het verkeerde moment.",
  },
  {
    ok: /const showDark = overDark\b/.test(src),
    uitleg:
      "showDark moet afgeleid zijn van overDark (de gemeten achtergrond), niet van scrollafstand.",
  },
  {
    ok: !/showDark\s*=\s*[^\n]*!scrolled/.test(src),
    uitleg:
      "showDark mag niet van `scrolled` afhangen. Dat was precies de fout: na 60px blauw logo boven een donkere hero.",
  },
  {
    ok: !/transition-\[[^\]]*backdrop-filter[^\]]*\]/.test(src),
    uitleg:
      "backdrop-filter mag niet in de transition van de header. Op iPhone Safari geeft dat haperend scrollen.",
  },
  {
    ok: src.includes("'nav-glass bg-primary/85 border-white/10'"),
    uitleg:
      "Gescrold boven donkere inhoud hoort de header donker glas te hebben met het witte logo.",
  },
];

const fout = regels.filter((r) => !r.ok);

if (fout.length) {
  console.error(
    `\n✗ ${HEADER} wijkt af van de vergrendelde header (W-567).\n`,
  );
  for (const r of fout) console.error(`  - ${r.uitleg}`);
  console.error(
    "\nDit gedrag is goedgekeurd en vastgezet. Draai de wijziging terug of overleg eerst met Koen.\n",
  );
  process.exit(1);
}

console.log("✓ Header-vergrendeling (W-567) intact.");
