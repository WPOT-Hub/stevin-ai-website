/**
 * Bewaakt een tegenstrijdigheid tussen de header en de hero eronder.
 *
 * Hoe het in elkaar zit. `<main>` heeft `pt-[72px]`, dus achter de header zit
 * normaal de achtergrond van `<html>`, en die is donkernavy. Daar staat de
 * transparante header met witte tekst prima leesbaar op. Een pagina die zijn
 * hero omhoog trekt met `-mt-[72px]` schuift die hero WEL onder de header door,
 * en dan bepaalt de hero wat er achter de navigatie ligt.
 *
 * Daar zit de fout die je stil kunt maken: trekt een DONKERE hero zichzelf
 * omhoog terwijl de pagina ook in `lightHeroPages` staat, dan schildert de
 * header een witte glasband bovenop die donkere hero. Dat is geen smaakkwestie
 * maar een tegenspraak: de pagina zegt twee dingen tegelijk.
 *
 * Precies dat gebeurde op /integraties (gevonden 25 juli 2026). De hero was ooit
 * licht, werd donker, en de lijst in Header.tsx bleef staan.
 *
 * Wat dit script BEWUST niet doet: oordelen over pagina's zonder `-mt-[72px]`.
 * Of daar een witte of een transparante header mooier is, hangt af van de hero
 * eronder en is een ontwerpkeuze. Een eerdere versie toetste dat wel en gaf
 * dertien valse meldingen; een controle die vals alarm slaat leer je negeren,
 * en dan vangt hij de echte fout ook niet meer.
 *
 * Run: npx tsx scripts/check-header-contrast.ts
 */

import fs from "fs";
import path from "path";

const APP = "app/[locale]";
const COMPONENTS = "components";
const HEADER = path.join(COMPONENTS, "Header.tsx");
const PULLS_UP = "-mt-[72px]";

/** Klassen en tokens die een donkere achtergrond betekenen. */
const DARK = /bg-primary\b|bg-\[#0[Aa]1628\]|bg-navy\b/;

/** Componenten die zelf een hero onder de header door trekken. */
function heroComponents(): { name: string; dark: boolean }[] {
  const out: { name: string; dark: boolean }[] = [];
  for (const file of fs.readdirSync(COMPONENTS)) {
    if (!file.endsWith(".tsx") || file === "Header.tsx") continue;
    const src = fs.readFileSync(path.join(COMPONENTS, file), "utf8");
    if (!src.includes(PULLS_UP)) continue;
    const line = src.split("\n").find((l) => l.includes(PULLS_UP)) ?? "";
    out.push({ name: path.basename(file, ".tsx"), dark: DARK.test(line) });
  }
  return out;
}

function routes(dir: string, prefix = ""): { route: string; file: string }[] {
  const out: { route: string; file: string }[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name.startsWith("[")) continue; // dynamische segmenten: geen vaste route
      out.push(...routes(full, `${prefix}/${entry.name}`));
    } else if (entry.name === "page.tsx") {
      out.push({ route: prefix === "" ? "/" : prefix, file: full });
    }
  }
  return out;
}

function lightHeroPages(): string[] {
  const src = fs.readFileSync(HEADER, "utf8");
  const m = src.match(/const lightHeroPages\s*=\s*\[([^\]]*)\]/);
  if (!m) throw new Error(`Kon lightHeroPages niet vinden in ${HEADER}`);
  return [...m[1].matchAll(/['"]([^'"]+)['"]/g)].map((x) => x[1]);
}

const heroCs = heroComponents();
const light = lightHeroPages();
const all = routes(APP).sort((a, b) => a.route.localeCompare(b.route));

type Problem = { route: string; bron: string };
const problems: Problem[] = [];
let pullsUpDark = 0;

for (const { route, file } of all) {
  const src = fs.readFileSync(file, "utf8");

  let darkPullUp: string | null = null;
  if (src.includes(PULLS_UP)) {
    const line = src.split("\n").find((l) => l.includes(PULLS_UP)) ?? "";
    if (DARK.test(line)) darkPullUp = "eigen hero";
  }
  if (!darkPullUp) {
    const c = heroCs.find((h) => h.dark && new RegExp(`<${h.name}[\\s/>]`).test(src));
    if (c) darkPullUp = `via ${c.name}`;
  }
  if (!darkPullUp) continue;

  pullsUpDark++;
  const inList = light.some((p) => route === p || route.startsWith(p + "/"));
  if (inList) problems.push({ route, bron: darkPullUp });
}

console.log("\n=== HEADER TEGENOVER HERO ===\n");
console.log(`Hero-componenten die omhoog trekken: ${heroCs.map((h) => `${h.name}${h.dark ? " (donker)" : ""}`).join(", ") || "geen"}`);
console.log(`lightHeroPages                     : ${light.join(", ")}`);
console.log(`Routes met een donkere hero onder de header: ${pullsUpDark} van ${all.length}\n`);

if (!problems.length) {
  console.log("Geen tegenstrijdigheden. Geen enkele donkere hero krijgt een witte header opgelegd.");
  process.exit(0);
}

for (const p of problems) {
  console.log(`[FOUT] ${p.route}`);
  console.log(`        donkere hero (${p.bron}) schuift onder de header,`);
  console.log(`        maar de route staat in lightHeroPages: dat geeft een witte balk bovenop de hero.`);
}
console.log(`\n${problems.length} tegenstrijdigheid(en). Herstel: haal de route uit lightHeroPages in ${HEADER}.`);
process.exit(1);
