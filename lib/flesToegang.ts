// W-918 (28 nov 2026): de pagina bij de relatiefles opent alleen met de code
// uit de QR-code op de fles. Koen: "Zet online met een code die je enkel vanuit
// de QR code op kunt."
//
// De code zelf staat nergens in deze repo, alleen zijn SHA-256. Hij is in metaal
// gebrand en kan dus niet meer veranderen: haal een hash hier nooit weg, anders
// staat iemand met een fles in zijn hand voor een dichte deur. Een code erbij
// (bijvoorbeeld een eigen code per klant) is een regel erbij.
//
// Dit is een drempel, geen beveiliging van klantdata: vier tekens houden iemand
// tegen die de link toevallig vindt, niet iemand die gaat proberen. Er staat
// alleen een dankwoord en een playlist achter.
//
// Zelfde berekening in de middleware (edge) en in de pagina (node), daarom
// alleen globalThis.crypto.subtle, dat beide hebben. Naar het voorbeeld van
// lib/ps5Toegang.ts.
export const FLES_COOKIE = 'fles_toegang'

const FLES_CODE_HASHES: readonly string[] = [
  '0106c67f9aba89b1c22e3c24589bdf47db8b4331261eeb694069d9a2c9679729',
]

/** Wat een code mag zijn: letters en cijfers, kort. Alles daarbuiten is geen code. */
export const FLES_CODE_VORM = /^[A-Za-z0-9]{2,16}$/

async function sha256Hex(s: string): Promise<string> {
  const buf = await globalThis.crypto.subtle.digest('SHA-256', new TextEncoder().encode(s))
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

function cookieVoorHash(hash: string): Promise<string> {
  return sha256Hex(`${hash}:${FLES_COOKIE}`)
}

/** De cookiewaarde bij een geldige code, of null als de code niet klopt. */
export async function flesCookieVoorCode(invoer: string): Promise<string | null> {
  const code = invoer.trim()
  if (!FLES_CODE_VORM.test(code)) return null
  const hash = await sha256Hex(code.toLowerCase())
  if (!FLES_CODE_HASHES.includes(hash)) return null
  return cookieVoorHash(hash)
}

/** Hoort deze cookiewaarde bij een van de geldige codes? */
export async function flesCookieGeldig(waarde: string | undefined): Promise<boolean> {
  if (!waarde || !/^[0-9a-f]{64}$/.test(waarde)) return false
  for (const hash of FLES_CODE_HASHES) {
    if ((await cookieVoorHash(hash)) === waarde) return true
  }
  return false
}
