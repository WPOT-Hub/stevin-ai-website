// Stevin avatar/heartbeat generator. Run from repo root: node brand/gen-avatars.js
// Nieuwe variant = 1 regel toevoegen aan VARIANTS. Output: brand/avatars/
const sharp = require("sharp"), fs = require("fs"), cp = require("child_process");
const svgText = fs.readFileSync("public/logos/logo-icon.svg", "utf8");
const outDir = "brand/avatars";
fs.mkdirSync(outDir, { recursive: true });

// lub-dub hartslag-ritme (twee tikken, dan rust)
const keys = [[0, 1], [0.12, 1.10], [0.22, 1.0], [0.34, 1.06], [0.46, 1.0], [1.0, 1.0]];
const scaleAt = (t) => { for (let i = 1; i < keys.length; i++) { if (t <= keys[i][0]) { const [a, s0] = keys[i - 1], [b, s1] = keys[i]; return s0 + (s1 - s0) * ((t - a) / (b - a)); } } return 1; };
const hex = (h) => ({ r: parseInt(h.slice(1, 3), 16), g: parseInt(h.slice(3, 5), 16), b: parseInt(h.slice(5, 7), 16), alpha: 1 });

const VARIANTS = [
  { name: "blue-navy",  bar: "#3D8EFF", bg: "#0A1628" },
  { name: "blue-white", bar: "#3D8EFF", bg: "#FFFFFF" },
  { name: "blue-black", bar: "#3D8EFF", bg: "#000000" },
  { name: "white-blue", bar: "#FFFFFF", bg: "#3D8EFF" },
  { name: "pink-navy",  bar: "#F4216A", bg: "#0A1628" },
  { name: "teal-navy",  bar: "#00D4A0", bg: "#0A1628" },
  { name: "navy-white", bar: "#0A1628", bg: "#FFFFFF" },
  { name: "pink-white", bar: "#F4216A", bg: "#FFFFFF" },
  { name: "teal-white", bar: "#00D4A0", bg: "#FFFFFF" },
];

const W = 320, TARGET = 218, N = 35;
(async () => {
  for (const v of VARIANTS) {
    const colored = Buffer.from(svgText.replace(/#3D8EFF/gi, v.bar));
    const big = await sharp(colored, { density: 512 }).resize(900, 900, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
    const mark = await sharp(big).trim().png().toBuffer();
    const bg = hex(v.bg);
    const dir = `/tmp/hbgen_${v.name}`; fs.rmSync(dir, { recursive: true, force: true }); fs.mkdirSync(dir);
    for (let i = 0; i < N; i++) {
      const S = Math.round(TARGET * scaleAt(i / N));
      const f = await sharp(mark).resize(S, S, { fit: "inside", background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
      await sharp({ create: { width: W, height: W, channels: 4, background: bg } }).composite([{ input: f, gravity: "center" }]).png().toFile(`${dir}/f_${String(i).padStart(3, "0")}.png`);
    }
    cp.execSync(`ffmpeg -y -framerate 25 -i ${dir}/f_%03d.png -filter_complex "split[a][b];[a]palettegen[p];[b][p]paletteuse" -loop 0 ${outDir}/stevin-hb-${v.name}.gif`, { stdio: "ignore" });
    const stat = await sharp(mark).resize(360, 360, { fit: "inside", background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
    await sharp({ create: { width: 512, height: 512, channels: 4, background: bg } }).composite([{ input: stat, gravity: "center" }]).png().toFile(`${outDir}/stevin-avatar-${v.name}.png`);
    console.log("klaar (avatar):", v.name);
  }

  // Transparante varianten: schaalbare SVG + transparante PNG (voor overlays/social/site).
  // GIF kan geen nette transparantie, dus hier SVG + PNG i.p.v. GIF.
  const TRANSPARENT = [
    { name: "navy",  color: "#0A1628" },
    { name: "pink",  color: "#F4216A" },
    { name: "teal",  color: "#00D4A0" },
    { name: "white", color: "#FFFFFF" },
    { name: "blue",  color: "#3D8EFF" },
  ];
  for (const c of TRANSPARENT) {
    const svgC = svgText.replace(/#3D8EFF/gi, c.color);
    fs.writeFileSync(`${outDir}/stevin-logo-${c.name}.svg`, svgC);
    const big2 = await sharp(Buffer.from(svgC), { density: 512 }).resize(900, 900, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
    const mark2 = await sharp(big2).trim().png().toBuffer();
    // statische transparante PNG (zelfde vulling als de avatars)
    const stat2 = await sharp(mark2).resize(360, 360, { fit: "inside", background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
    await sharp({ create: { width: 512, height: 512, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } }).composite([{ input: stat2, gravity: "center" }]).png().toFile(`${outDir}/stevin-logo-${c.name}.png`);
    // kloppende transparante variant als animated WebP (GIF kan geen nette transparantie)
    const dir = `/tmp/hbt_${c.name}`; fs.rmSync(dir, { recursive: true, force: true }); fs.mkdirSync(dir);
    for (let i = 0; i < N; i++) {
      const S = Math.round(TARGET * scaleAt(i / N));
      const f = await sharp(mark2).resize(S, S, { fit: "inside", background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
      await sharp({ create: { width: W, height: W, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } }).composite([{ input: f, gravity: "center" }]).png().toFile(`${dir}/f_${String(i).padStart(3, "0")}.png`);
    }
    cp.execSync(`ffmpeg -y -framerate 25 -i ${dir}/f_%03d.png -loop 0 ${outDir}/stevin-hb-${c.name}-transparent.webp`, { stdio: "ignore" });
    // transparante GIF (1-bit transparantie, iets hardere randen dan webp)
    cp.execSync(`ffmpeg -y -framerate 25 -i ${dir}/f_%03d.png -filter_complex "split[a][b];[a]palettegen=reserve_transparent=1[p];[b][p]paletteuse=alpha_threshold=128" -loop 0 ${outDir}/stevin-hb-${c.name}-transparent.gif`, { stdio: "ignore" });
    console.log("klaar (transparant webp+gif):", c.name);
  }
  console.log("alle varianten ->", outDir);
})();
