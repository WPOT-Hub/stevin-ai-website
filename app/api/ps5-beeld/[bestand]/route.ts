import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { ps5CookieWaarde } from '@/lib/ps5Toegang'

// W-861: de beelden van de PS5-actie staan niet meer in /public, want daar kan
// iedereen met de URL bij, ook zonder code. Deze route geeft ze alleen met de
// toegangscookie. /api valt buiten de middleware, dus de controle staat hier zelf.
const BESTANDEN: Record<string, string> = {
  'ps5-gta-zonsondergang.webp': 'image/webp',
  'ps5-scene.webp': 'image/webp',
  'ps5-haal.webp': 'image/webp',
}

export async function GET(request: Request, { params }: { params: Promise<{ bestand: string }> }) {
  const { bestand } = await params
  const type = BESTANDEN[bestand]
  const cookie = /(?:^|;\s*)ps5_toegang=([a-f0-9]{64})/.exec(request.headers.get('cookie') ?? '')?.[1]
  if (!type || cookie !== (await ps5CookieWaarde())) {
    return new Response('Niet gevonden', { status: 404, headers: { 'cache-control': 'no-store', 'x-robots-tag': 'noindex' } })
  }
  const data = await readFile(path.join(process.cwd(), 'private', 'ps5-actie', bestand))
  return new Response(new Uint8Array(data), {
    headers: { 'content-type': type, 'cache-control': 'private, no-store', 'x-robots-tag': 'noindex, nofollow' },
  })
}
