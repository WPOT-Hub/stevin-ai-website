// W-652: rekenregels van de PHP-lek-check. Los van de route, zodat ze zonder
// netwerk te testen zijn (scripts/check-php-check.ts).
//
// Bron voor de versies: de beveiligingsrelease van PHP op 21 oktober 2026
// (CVE-2026-109618 en CVE-2026-109619), gepubliceerd door php.net en NCSC.
// Elke versie in een reeks onder het getal hieronder heeft het lek. Reeksen
// onder 8.2 krijgen geen nieuwe release meer, alleen losse reparaties.

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
  | 'versie_verborgen' // wel PHP gezien (CMS, cookie), geen versie
  | 'geen_php' // platform zonder PHP bij de klant
  | 'onbekend' // niets gezien, dat zegt niets
  | 'onbereikbaar'

export interface PhpUitslag {
  domein: string
  oordeel: PhpOordeel
  versie?: string
  patchversie?: string
  platform?: string
  server?: string
  gemetenOp: string
}

const VERSIE_RE = /PHP\/(\d+)\.(\d+)(?:\.(\d+))?/i

/** Haalt de PHP-versie uit X-Powered-By of Server, zoals de server die zelf meldt. */
export function leesPhpVersie(xPoweredBy?: string | null, server?: string | null): string | undefined {
  const m = VERSIE_RE.exec(`${xPoweredBy || ''} ${server || ''}`)
  if (!m) return undefined
  return [m[1], m[2], m[3]].filter((x) => x !== undefined).join('.')
}

export function beoordeelVersie(versie: string): { oordeel: PhpOordeel; patchversie?: string } {
  const delen = versie.split('.').map((x) => parseInt(x, 10))
  const [hoofd, sub, patch] = delen
  const reeks = `${hoofd}.${sub}`
  if (hoofd < 8 || (hoofd === 8 && sub < 2)) return { oordeel: 'geen_release' }
  const grens = GEPATCHT[reeks]
  if (grens === undefined) {
    // Nieuwer dan 8.5: na de release van 21 oktober uitgekomen.
    return hoofd > 8 || sub > 5 ? { oordeel: 'gepatcht' } : { oordeel: 'onbekend' }
  }
  const patchversie = `${reeks}.${grens}`
  if (patch === undefined || Number.isNaN(patch)) return { oordeel: 'versie_verborgen', patchversie }
  return patch >= grens ? { oordeel: 'gepatcht', patchversie } : { oordeel: 'niet_gepatcht', patchversie }
}

// Platformen waar de klant zelf geen PHP draait. Het platform patcht zelf.
const ZONDER_PHP: Array<[string, RegExp]> = [
  ['Shopify', /cdn\.shopify\.com|myshopify\.com/i],
  ['Wix', /static\.wixstatic\.com|wix\.com\/|x-wix-/i],
  ['Squarespace', /squarespace/i],
  ['Webflow', /webflow\.(com|io)|data-wf-site/i],
  ['Framer', /framerusercontent\.com|framer\.com\/m\//i],
  ['Next.js', /\/_next\/static\//i],
]

// Aanwijzingen dat er PHP draait, ook als de versie verborgen is.
const MET_PHP: Array<[string, RegExp]> = [
  ['WordPress', /wp-content\/|wp-includes\//i],
  ['WooCommerce', /woocommerce/i],
  ['Magento', /Mage\.Cookies|\/static\/version\d+\//i],
  ['PrestaShop', /prestashop/i],
  ['Joomla', /\/media\/jui\/|content="Joomla!/i],
  ['Drupal', /Drupal\.settings|drupal-settings-json|\/sites\/default\/files\//i],
  ['Craft CMS', /CRAFT_CSRF_TOKEN|Craft CMS/i],
  ['Lightspeed', /webshopapp\.com/i],
  ['CCV Shop', /ccvshop/i],
]

export function herkenPlatform(html: string, headers: Record<string, string>): { platform?: string; php: boolean } {
  const kop = Object.entries(headers).map(([k, v]) => `${k}: ${v}`).join('\n')
  for (const [naam, re] of MET_PHP) if (re.test(html)) return { platform: naam, php: true }
  for (const [naam, re] of ZONDER_PHP) if (re.test(html) || re.test(kop)) return { platform: naam, php: false }
  if (/PHPSESSID/i.test(headers['set-cookie'] || '')) return { platform: undefined, php: true }
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
