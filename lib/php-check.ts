// W-652: rekenregels van de PHP-lekcheck. Los van de route, zodat ze zonder
// netwerk te testen zijn (scripts/check-php-check.ts, draait in prebuild).
//
// Bron voor de versies: de beveiligingsadvisory van php.net van 21 oktober 2026
// (https://www.php.net/archive/2026.php#2026-10-21-5, CVE-2026-109618 en
// CVE-2026-109619) en de releases 8.5.12, 8.4.27, 8.3.36 en 8.2.35 van die dag.
// Elke eerdere versie in die reeksen heeft het lek. Reeksen onder 8.2 krijgen
// geen nieuwe release meer, alleen losse reparaties.
//
// Derde lek, 23 oktober 2026 (CVE-2026-115560, php.net/archive/2026.php#2026-10-23-1):
// zit ook in de versies hierboven en krijgt pas een update in de volgende gewone
// release. Er is dus nog geen versiegrens; de uitslag 'gepatcht' noemt daarom de
// tijdelijke maatregel (session.upload_progress.enabled=0). Komt die release,
// dan krijgt deze tabel de nieuwe grenzen (W-670).

export const GEPATCHT: Record<string, number> = {
  '8.2': 35,
  '8.3': 36,
  '8.4': 27,
  '8.5': 12,
}

export type PhpOordeel =
  | 'gepatcht' // versie met de update
  | 'niet_gepatcht' // reeks krijgt de update, deze versie heeft hem niet
  | 'geen_release' // 8.1 of ouder: geen nieuwe release meer
  | 'versie_verborgen' // wel PHP gezien, geen bruikbaar versienummer
  | 'geen_php' // sterk kenmerk van een gehost platform zonder eigen PHP
  | 'onbekend' // niets gezien, dat zegt niets
  | 'geblokkeerd' // de site liet ons niet binnen (4xx)
  | 'onbereikbaar' // geen antwoord of een serverfout

export type MeetReden = 'dns' | 'te_traag' | 'geen_verbinding' | 'te_veel_omleidingen' | 'serverfout' | 'ongeldig_adres'

export interface PhpUitslag {
  domein: string
  oordeel: PhpOordeel
  versie?: string
  patchversie?: string
  platform?: string
  /** Versie uit een Linux-distributie (bv. 8.3.6-1ubuntu): die patcht vaak zonder ander versienummer. */
  distributie?: boolean
  server?: string
  status?: number
  reden?: MeetReden
  /** Host die we na omleidingen echt maten, alleen als die afwijkt van het domein. */
  eindhost?: string
  gemetenOp: string
}

// Achtervoegsel mag met -, + of ~ beginnen, of direct met letters (PHP schrijft RC's als 8.4.27RC1).
const VERSIE_RE = /PHP\/(\d+)\.(\d+)(?:\.(\d+))?((?:[-+~]|(?=[A-Za-z]))[\w.+~-]*)?/i

export interface PhpVersie {
  versie: string
  hoofd: number
  sub: number
  patch?: number
  achtervoegsel?: string
}

/** Haalt de PHP-versie uit X-Powered-By of Server, zoals de server die zelf meldt. */
export function leesPhpVersie(xPoweredBy?: string | null, server?: string | null): PhpVersie | undefined {
  const m = VERSIE_RE.exec(`${xPoweredBy || ''} ${server || ''}`)
  if (!m) return undefined
  const hoofd = parseInt(m[1], 10)
  const sub = parseInt(m[2], 10)
  const patch = m[3] !== undefined ? parseInt(m[3], 10) : undefined
  const achtervoegsel = m[4] || undefined
  const versie = [m[1], m[2], m[3]].filter((x) => x !== undefined).join('.') + (achtervoegsel || '')
  return { versie, hoofd, sub, patch, achtervoegsel }
}

export function beoordeelVersie(v: PhpVersie): { oordeel: PhpOordeel; patchversie?: string; distributie?: boolean } {
  const { hoofd, sub, patch, achtervoegsel } = v
  if (hoofd < 8 || (hoofd === 8 && sub < 2)) return { oordeel: 'geen_release' }
  const reeks = `${hoofd}.${sub}`
  const grens = GEPATCHT[reeks]
  // Een reeks die na 21 oktober is verschenen: geen bron, dus geen oordeel.
  if (grens === undefined) return { oordeel: 'onbekend' }
  const patchversie = `${reeks}.${grens}`
  // Test- en ontwikkelbuilds zeggen niets over de release.
  if (achtervoegsel && /(dev|alpha|beta|rc)/i.test(achtervoegsel)) return { oordeel: 'versie_verborgen', patchversie }
  if (patch === undefined) return { oordeel: 'versie_verborgen', patchversie }
  if (patch >= grens) return { oordeel: 'gepatcht', patchversie }
  // Distributiebuild (Debian, Ubuntu, RHEL): de reparatie kan erin zitten zonder hoger versienummer.
  if (achtervoegsel && /(ubuntu|deb|el\d|\+)/i.test(achtervoegsel)) return { oordeel: 'versie_verborgen', patchversie, distributie: true }
  return { oordeel: 'niet_gepatcht', patchversie }
}

// Gehoste platformen waar de klant zelf geen PHP-server heeft. Alleen sterke
// kenmerken: een eigen kop van het platform of de generator-meta. Een link of
// een woord in de tekst telt nooit, want dat staat ook op PHP-sites.
const ZONDER_PHP: Array<{ naam: string; kop?: (h: Record<string, string>) => boolean; generator?: RegExp }> = [
  { naam: 'Shopify', kop: (h) => 'x-shopify-stage' in h || /shopify/i.test(h['powered-by'] || '') },
  { naam: 'Wix', kop: (h) => 'x-wix-request-id' in h || /pepyaka/i.test(h['server'] || ''), generator: /^Wix\.com/i },
  { naam: 'Squarespace', kop: (h) => /squarespace/i.test(h['server'] || ''), generator: /^Squarespace/i },
  { naam: 'Webflow', kop: (h) => 'x-wf-page-id' in h, generator: /^Webflow/i },
  { naam: 'Framer', generator: /^Framer/i },
]

// Kenmerken dat er PHP draait, ook als de versie verborgen is. Opmaak in de
// pagina zelf (thema- en pluginbestanden, generator-meta), geen losse woorden.
const MET_PHP: Array<{ naam: string; re: RegExp }> = [
  { naam: 'WordPress', re: /\/wp-content\/(?:themes|plugins)\/|\/wp-includes\/|<meta[^>]+name=["']generator["'][^>]+content=["']WordPress/i },
  { naam: 'WooCommerce', re: /<meta[^>]+name=["']generator["'][^>]+content=["']WooCommerce|\/wp-content\/plugins\/woocommerce\//i },
  { naam: 'Magento', re: /Mage\.Cookies|\/static\/version\d+\/frontend\//i },
  { naam: 'PrestaShop', re: /<meta[^>]+name=["']generator["'][^>]+content=["']PrestaShop|var\s+prestashop\s*=/i },
  { naam: 'Joomla', re: /<meta[^>]+name=["']generator["'][^>]+content=["']Joomla/i },
  { naam: 'Drupal', re: /<meta[^>]+name=["']generator["'][^>]+content=["']Drupal|data-drupal-selector|drupal-settings-json/i },
]

function generatorMeta(html: string): string | undefined {
  const m = /<meta[^>]+name=["']generator["'][^>]+content=["']([^"']{1,80})["']/i.exec(html)
    || /<meta[^>]+content=["']([^"']{1,80})["'][^>]+name=["']generator["']/i.exec(html)
  return m ? m[1] : undefined
}

export function herkenPlatform(
  html: string,
  headers: Record<string, string>,
  cookies: string[] = [],
): { platform?: string; php: boolean } {
  for (const { naam, re } of MET_PHP) if (re.test(html)) return { platform: naam, php: true }
  if (/craft cms/i.test(headers['x-powered-by'] || '')) return { platform: 'Craft CMS', php: true }
  if (cookies.some((c) => /^PHPSESSID=/i.test(c.trim()))) return { php: true }
  const gen = generatorMeta(html)
  for (const p of ZONDER_PHP) {
    if ((p.kop && p.kop(headers)) || (gen && p.generator && p.generator.test(gen))) return { platform: p.naam, php: false }
  }
  return { php: false }
}

/** Kaal domein uit wat een bezoeker intypt. Geeft undefined bij onzin. */
export function normaliseerDomein(invoer: string): string | undefined {
  let d = (invoer || '').trim().toLowerCase()
  if (!d || d.length > 253) return undefined
  d = d.replace(/^[a-z]+:\/\//, '').split(/[/?#]/)[0].replace(/:\d+$/, '').replace(/^www\./, '').replace(/\.$/, '')
  if (!/^(?=.{4,253}$)([a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$/.test(d)) return undefined
  return d
}

/** Is dit IP-adres niet publiek bereikbaar? Ook IPv4 verpakt in IPv6-vormen. */
export function isPrive(ip: string): boolean {
  const v4 = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/.exec(ip)
  if (v4) {
    const [a, b] = [Number(v4[1]), Number(v4[2])]
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
  // IPv4-mapped, IPv4-compatible en NAT64: beoordeel het ingesloten IPv4-adres.
  const ingesloten = /^(?:::ffff:|::|64:ff9b::)(\d{1,3}(?:\.\d{1,3}){3})$/.exec(v6)
  if (ingesloten) return isPrive(ingesloten[1])
  // 6to4 (2002::/16), NAT64 in hex, unique local, link-local, site-local, multicast.
  return /^(2002:|64:ff9b:|fc|fd|fe[89ab]|fe[c-f]|ff)/.test(v6)
}
