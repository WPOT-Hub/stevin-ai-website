// W-652: PHP-lekcheck. De bezoeker geeft een domein, wij halen de homepagina
// op zoals een gewone bezoeker dat doet en lezen wat de server zelf meldt.
// Er wordt niets aangevallen of veranderd; alleen een GET op de voorpagina.
//
// Veiligheid: de bezoeker bepaalt welk adres wij ophalen, dus dit is een
// SSRF-oppervlak. Daarom: alleen http(s) op poort 80 of 443, geen kale
// IP-adressen, en het IP-adres wordt gekeurd OP HET MOMENT VAN VERBINDEN via
// de lookup-hook van node:http(s). Er is dus maar een DNS-opvraging per
// verbinding, en een domein dat eerst een publiek en daarna een intern adres
// teruggeeft (DNS-rebinding) komt niet langs de keuring. Omleidingen volgen we
// zelf, elke stap met dezelfde keuring. Plus een totale deadline en een harde
// limiet op de body.
import { NextResponse } from 'next/server'
import dns from 'node:dns'
import http from 'node:http'
import https from 'node:https'
import net from 'node:net'
import {
  beoordeelVersie,
  herkenPlatform,
  isPrive,
  leesPhpVersie,
  normaliseerDomein,
  type MeetReden,
  type PhpUitslag,
} from '@/lib/php-check'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 15

const UA = 'Mozilla/5.0 (compatible; StevinPhpCheck/1.0; +https://stevin.ai/php-lek-check)'
const TOTAAL_MS = 9000
const MAX_BYTES = 400_000
const MAX_HOPS = 4

// Limiet per IP per functie-instantie: 10 checks per 10 minuten. Instanties
// delen niets, dus dit is een rem en geen waterdichte grens; de echte grens
// hoort in de Vercel Firewall (zie de PR).
const LIMIET = 10
const VENSTER_MS = 10 * 60 * 1000
const teller = new Map<string, number[]>()

function teVaak(ip: string): boolean {
  const nu = Date.now()
  if (teller.size > 5000) {
    for (const [k, v] of teller) if (!v.some((t) => nu - t < VENSTER_MS)) teller.delete(k)
  }
  const lijst = (teller.get(ip) || []).filter((t) => nu - t < VENSTER_MS)
  lijst.push(nu)
  teller.set(ip, lijst)
  return lijst.length > LIMIET
}

class Geweigerd extends Error {}

// Lookup die elk gevonden adres keurt voordat de socket verbindt.
const veiligeLookup: typeof dns.lookup = ((hostname: string, options: unknown, callback: unknown) => {
  const cb = (typeof options === 'function' ? options : callback) as (
    err: NodeJS.ErrnoException | null,
    address?: string | dns.LookupAddress[],
    family?: number,
  ) => void
  const opts = (typeof options === 'object' && options ? options : {}) as dns.LookupOptions
  dns.lookup(hostname, { all: true, verbatim: true }, (err, adressen) => {
    if (err) return cb(err)
    if (!adressen.length || adressen.some((a) => isPrive(a.address))) return cb(new Geweigerd('prive_adres'))
    if (opts.all) return cb(null, adressen)
    cb(null, adressen[0].address, adressen[0].family)
  })
}) as typeof dns.lookup

type Antwoord = { status: number; headers: Record<string, string>; cookies: string[]; html: string; host: string }
type Haal = Antwoord | { fout: MeetReden | 'geweigerd' }

function eenVerzoek(u: URL, rest: number): Promise<Antwoord & { location?: string }> {
  return new Promise((resolve, reject) => {
    const mod = u.protocol === 'https:' ? https : http
    const req = mod.request(
      u,
      {
        method: 'GET',
        lookup: veiligeLookup,
        timeout: rest,
        headers: { 'user-agent': UA, accept: 'text/html,*/*;q=0.8', 'accept-language': 'nl-NL,nl;q=0.9' },
      },
      (res) => {
        const headers: Record<string, string> = {}
        for (const [k, v] of Object.entries(res.headers)) if (typeof v === 'string') headers[k.toLowerCase()] = v
        const cookies = ([] as string[]).concat(res.headers['set-cookie'] || [])
        const status = res.statusCode || 0
        if (status >= 300 && status < 400) {
          res.destroy() // body van een omleiding lezen we niet
          return resolve({ status, headers, cookies, html: '', host: u.hostname, location: headers.location })
        }
        let html = ''
        let gelezen = 0
        res.setEncoding('utf8')
        res.on('data', (chunk: string) => {
          gelezen += Buffer.byteLength(chunk)
          html += chunk
          if (gelezen >= MAX_BYTES) res.destroy()
        })
        const klaar = () => resolve({ status, headers, cookies, html, host: u.hostname })
        res.on('end', klaar)
        res.on('close', klaar) // ook na destroy: de koppen hebben we al
        res.on('error', klaar)
      },
    )
    // Harde grens over het hele verzoek, ook bij een site die heel traag druppelt.
    const klok = setTimeout(() => req.destroy(new Error('te_traag')), rest)
    req.on('close', () => clearTimeout(klok))
    req.on('timeout', () => req.destroy(new Error('te_traag')))
    req.on('error', reject)
    req.end()
  })
}

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
    if (net.isIP(u.hostname.replace(/^\[|\]$/g, ''))) return { fout: 'geweigerd' }
    if (/(^|\.)(localhost|local|internal|intranet|lan|home|corp)$/i.test(u.hostname)) return { fout: 'geweigerd' }
    const rest = deadline - Date.now()
    if (rest <= 0) return { fout: 'te_traag' }
    let r: Antwoord & { location?: string }
    try {
      r = await eenVerzoek(u, rest)
    } catch (e) {
      if (e instanceof Geweigerd) return { fout: 'geweigerd' }
      const code = (e as NodeJS.ErrnoException)?.code || (e as Error)?.message
      if (code === 'ENOTFOUND' || code === 'EAI_AGAIN' || code === 'ENODATA' || code === 'ESERVFAIL') return { fout: 'dns' }
      if (code === 'te_traag' || code === 'ETIMEDOUT') return { fout: 'te_traag' }
      return { fout: 'geen_verbinding' }
    }
    if (r.location) {
      try {
        url = new URL(r.location, u).toString()
      } catch {
        return { fout: 'ongeldig_adres' }
      }
      continue
    }
    return r
  }
  return { fout: 'te_veel_omleidingen' }
}

function log(uitkomst: Record<string, unknown>) {
  // Geen domein in het log: de pagina belooft dat we het adres niet bewaren.
  // Wel de uitkomst, zodat in de Vercel-logs te zien is als de check voor
  // iedereen faalt (bv. veel 'onbereikbaar' met dezelfde reden).
  console.log(JSON.stringify({ evt: 'php_check', ...uitkomst }))
}

export async function POST(req: Request) {
  const begin = Date.now()
  const ip = (req.headers.get('x-forwarded-for') || '').split(',')[0].trim() || 'onbekend'
  if (teVaak(ip)) {
    log({ uitkomst: 'te_vaak' })
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
  let r: Haal = { fout: 'dns' }
  for (const start of [`https://${domein}/`, `https://www.${domein}/`, `http://${domein}/`]) {
    r = await haalOp(start, deadline)
    if (!('fout' in r) || r.fout === 'geweigerd' || r.fout === 'te_traag') break
  }

  const gemetenOp = new Date().toISOString()
  if ('fout' in r) {
    if (r.fout === 'geweigerd') {
      log({ uitkomst: 'geweigerd', ms: Date.now() - begin })
      return NextResponse.json({ fout: 'geweigerd' }, { status: 400 })
    }
    const uitslag: PhpUitslag = { domein, oordeel: 'onbereikbaar', reden: r.fout, gemetenOp }
    log({ uitkomst: uitslag.oordeel, reden: r.fout, ms: Date.now() - begin })
    return NextResponse.json(uitslag, { headers: { 'cache-control': 'no-store' } })
  }

  const eindhost = r.host.replace(/^www\./, '') !== domein ? r.host : undefined
  const server = (r.headers['server'] || '').slice(0, 60) || undefined
  const basis = { domein, server, status: r.status, eindhost, gemetenOp }
  const v = leesPhpVersie(r.headers['x-powered-by'], r.headers['server'])
  const platform = herkenPlatform(r.html, r.headers, r.cookies)
  let uitslag: PhpUitslag
  if (v) {
    const b = beoordeelVersie(v)
    uitslag = { ...basis, oordeel: b.oordeel, versie: v.versie, patchversie: b.patchversie, distributie: b.distributie, platform: platform.platform }
  } else if (platform.php) {
    uitslag = { ...basis, oordeel: 'versie_verborgen', platform: platform.platform }
  } else if (r.status >= 500) {
    uitslag = { ...basis, oordeel: 'onbereikbaar', reden: 'serverfout' }
  } else if (r.status >= 400) {
    uitslag = { ...basis, oordeel: 'geblokkeerd' }
  } else if (platform.platform) {
    uitslag = { ...basis, oordeel: 'geen_php', platform: platform.platform }
  } else {
    uitslag = { ...basis, oordeel: 'onbekend' }
  }
  log({ uitkomst: uitslag.oordeel, status: r.status, ms: Date.now() - begin })
  return NextResponse.json(uitslag, { headers: { 'cache-control': 'no-store' } })
}
