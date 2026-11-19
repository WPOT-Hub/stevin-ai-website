// W-861 (19 nov 2026): de PS5-actiepagina staat op pauze achter een code.
// Koen: "zet er maar een code op 1500". Dit is een drempel, geen beveiliging van
// klantdata: er staat alleen een actiepagina achter. Daarom staat de code hier en
// niet in de omgeving, naar het voorbeeld van de poort van /marketing-scan.
//
// Zelfde berekening in de middleware (edge) en in de beeldroute (node), daarom
// alleen globalThis.crypto.subtle, dat beide hebben.
export const PS5_CODE = '1500'
export const PS5_COOKIE = 'ps5_toegang'

export async function ps5CookieWaarde(): Promise<string> {
  const buf = await globalThis.crypto.subtle.digest('SHA-256', new TextEncoder().encode(`${PS5_CODE}:${PS5_COOKIE}`))
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, '0')).join('')
}
