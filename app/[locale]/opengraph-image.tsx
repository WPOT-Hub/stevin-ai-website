import { readFile } from 'node:fs/promises'
import path from 'node:path'

// W-535 (13 okt 2026): de preview van stevin.ai in WhatsApp, LinkedIn en mail
// is het brein (Koen: "ik zou daar toch ons brein in willen"), in plaats van de
// tekstkaart "Wonder? Het is geen wonder." Een vast beeld uit
// public/og/stevin-brein.jpg: het brein is een animatie in de browser en laat
// zich niet in ImageResponse tekenen. Gerenderd met de echte component op
// 1200 bij 630, met het logo linksboven. JPG van ongeveer 150 kB, want WhatsApp
// laat grote afbeeldingen soms weg. De Engelse site is weg (410), dus geen
// aparte Engelse kaart meer.

export const runtime = 'nodejs'
export const alt = 'Stevin.AI: al je marketing en sales in één brein'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/jpeg'

export default async function OGImage() {
  const beeld = await readFile(path.join(process.cwd(), 'public/og/stevin-brein.jpg'))
  return new Response(new Uint8Array(beeld), {
    headers: { 'content-type': 'image/jpeg', 'cache-control': 'public, max-age=3600, s-maxage=86400' },
  })
}
