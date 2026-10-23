// W-652: PHP-lek-check. De bezoeker geeft een domein, wij halen de homepagina
// op zoals een gewone bezoeker dat doet en lezen wat de server zelf meldt.
// Er wordt niets aangevallen of getest; alleen een GET op de voorpagina.
//
// Veiligheid: de bezoeker bepaalt welk adres wij ophalen, dus dit is een
// SSRF-oppervlak. Daarom: alleen http(s) op poort 80 of 443, alleen namen die
// naar een publiek IP-adres wijzen, omleidingen zelf volgen en elke stap
// opnieuw keuren, een totale deadline en een harde limiet op de body. Op
// Vercel is er achter de functie geen intern netwerk, maar de controle staat
// er toch, zodat de route ook elders veilig blijft.
import { NextResponse } from 'next/server'
import dns from 'node:dns/promises'
import net from 'node:net'
import {
  beoordeelVersie,
  herkenPlatform,
  leesPhpVersie,
  normaliseerDomein,
  type PhpUitslag,
} from '@/lib/php-check'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const UA = 'Mozilla/5.0 (compatible; StevinPhpCheck/1.0; +https://stevin.ai/php-lek-check)'
const TOTAAL_MS = 9000
const MAX_BYTES = 400_000
const MAX_HOPS = 4

// Eenvoudige limiet per IP per functie-instantie: 10 checks per 10 minuten.
// Geen waterdichte bescherming (instanties delen niets), wel een rem op
// iemand die de route als gratis scanner wil gebruiken.
const LIMIET = 10
const VENSTER_MS = 10 * 60 * 1000
const teller = new Map<string, number[]>()

function teVaak(ip: string): boolean {
  const nu = Date.now()
  const lijst = (teller.get(ip) || []).filter((t) => nu - t < VENSTER_MS)
  lijst.push(nu)
  teller.set(ip, lijst)
  if (teller.size > 5000) teller.clear()
  return lijst.length > LIMIET
}

function isPrive(ip: string): boolean {
  if (net.isIPv4(ip)) {
    const [a, b] = ip.split('.').map(Number)
    return (
      a === 0 || a === 10 || a === 127 || a >= 224 ||
      (a === 100 && b >= 64 && b <= 127) ||
      (a === 169 && b === 254) ||
      (a === 172 && b >= 16 && b <= 31) ||
      (a === 192 && b === 168) ||
      (a === 192 && b === 0) ||
      (a === 198 && (b === 18 || b === 19))
    )
  }
  const v6 = ip.toLowerCase()
  if (v6 === '::' || v6 === '::1') return true
  if (v6.startsWith('::ffff:')) return isPrive(v6.slice(7))
  return /^(fc|fd|fe8|fe9|fea|feb|ff)/.test(v6)
}

async function keurHost(host: string): Promise<boolean> {
  if (net.isIP(host)) return false // geen kale IP-adressen
  if (/(^|\.)(localhost|local|internal|intranet|lan|home|corp)$/i.test(host)) return false
  try {
    const adressen = await dns.lookup(host, { all: true, verbatim: true })
    return adressen.length > 0 && adressen.every((a) => !isPrive(a.address))
  } catch {
    return false
  }
}

type Haal = { status: number; headers: Record<string, string>; html: string } | { fout: string }

async function haalOp(startUrl: string, deadline: number): Promise<Haal> {
  let url = startUrl
  for (let hop = 0; hop <= MAX_HOPS; hop++) {
    let u: URL
    try {
      u = new URL(url)
    } catch {
      return { fout: 'ongeldig_adres' }
    }
    if (!/^https?:$/.test(u.protocol) || (u.port && u.port !== '80' && u.port !== '443')) return { fout: 'geweigerd' }
    if (!(await keurHost(u.hostname))) return { fout: 'geweigerd' }
    const rest = deadline - Date.now()
    if (rest <= 0) return { fout: 'te_traag' }
    let res: Response
    try {
      res = await fetch(u, {
        method: 'GET',
        redirect: 'manual',
        headers: { 'user-agent': UA, accept: 'text/html,*/*;q=0.8', 'accept-language': 'nl-NL,nl;q=0.9' },
        signal: AbortSignal.timeout(rest),
        cache: 'no-store',
      })
    } catch (e) {
      return { fout: (e as Error)?.name === 'TimeoutError' ? 'te_traag' : 'geen_verbinding' }
    }
    const headers: Record<string, string> = {}
    res.headers.forEach((v, k) => (headers[k.toLowerCase()] = v))
    if (res.status >= 300 && res.status < 400 && headers.location) {
      url = new URL(headers.location, u).toString()
      continue
    }
    let html = ''
    if (res.body) {
      const reader = res.body.getReader()
      const dec = new TextDecoder()
      let gelezen = 0
      try {
        while (gelezen < MAX_BYTES) {
          const { done, value } = await reader.read()
          if (done) break
          gelezen += value.byteLength
          html += dec.decode(value, { stream: true })
        }
      } catch {
        // Afgebroken body: we werken met wat er is. De koppen hebben we al.
      } finally {
        reader.cancel().catch(() => {})
      }
    }
    return { status: res.status, headers, html }
  }
  return { fout: 'te_veel_omleidingen' }
}

export async function POST(req: Request) {
  const ip = (req.headers.get('x-forwarded-for') || '').split(',')[0].trim() || 'onbekend'
  if (teVaak(ip)) {
    return NextResponse.json({ fout: 'te_vaak' }, { status: 429 })
  }
  let invoer = ''
  try {
    const body = await req.json()
    invoer = typeof body?.domein === 'string' ? body.domein.slice(0, 300) : ''
  } catch {
    return NextResponse.json({ fout: 'ongeldig_verzoek' }, { status: 400 })
  }
  const domein = normaliseerDomein(invoer)
  if (!domein) return NextResponse.json({ fout: 'ongeldig_domein' }, { status: 400 })

  const deadline = Date.now() + TOTAAL_MS
  let r = await haalOp(`https://${domein}/`, deadline)
  if ('fout' in r && r.fout !== 'geweigerd') r = await haalOp(`https://www.${domein}/`, deadline)
  if ('fout' in r && r.fout !== 'geweigerd') r = await haalOp(`http://${domein}/`, deadline)

  const gemetenOp = new Date().toISOString()
  if ('fout' in r) {
    if (r.fout === 'geweigerd') return NextResponse.json({ fout: 'geweigerd' }, { status: 400 })
    const uitslag: PhpUitslag = { domein, oordeel: 'onbereikbaar', gemetenOp }
    return NextResponse.json(uitslag)
  }

  const versie = leesPhpVersie(r.headers['x-powered-by'], r.headers['server'])
  const platform = herkenPlatform(r.html, r.headers)
  const server = (r.headers['server'] || '').slice(0, 60) || undefined
  let uitslag: PhpUitslag
  if (versie) {
    const b = beoordeelVersie(versie)
    uitslag = { domein, oordeel: b.oordeel, versie, patchversie: b.patchversie, platform: platform.platform, server, gemetenOp }
  } else if (platform.php) {
    uitslag = { domein, oordeel: 'versie_verborgen', platform: platform.platform, server, gemetenOp }
  } else if (platform.platform) {
    uitslag = { domein, oordeel: 'geen_php', platform: platform.platform, server, gemetenOp }
  } else if (r.status >= 500) {
    // Een serverfout (bv. een 503 van een hoster die de site uit voorzorg dichtzette) is geen 'onbekend'.
    uitslag = { domein, oordeel: 'onbereikbaar', server, gemetenOp }
  } else {
    uitslag = { domein, oordeel: 'onbekend', server, gemetenOp }
  }
  return NextResponse.json(uitslag, { headers: { 'cache-control': 'no-store' } })
}
