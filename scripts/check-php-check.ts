// W-652: toetst de rekenregels van de PHP-lekcheck zonder netwerk.
// Draait in prebuild; los: npx tsx scripts/check-php-check.ts (exitcode 1 bij een fout).
import { beoordeelVersie, herkenPlatform, isPrive, leesPhpVersie, normaliseerDomein } from '../lib/php-check'

let fouten = 0
function is(naam: string, kreeg: unknown, verwacht: unknown) {
  const ok = JSON.stringify(kreeg) === JSON.stringify(verwacht)
  if (!ok) fouten++
  console.log(`${ok ? 'ok  ' : 'FOUT'} ${naam}: ${JSON.stringify(kreeg)}${ok ? '' : ` (verwacht ${JSON.stringify(verwacht)})`}`)
}
const oordeel = (x: string) => {
  const v = leesPhpVersie(`PHP/${x}`)
  return v ? beoordeelVersie(v).oordeel : 'geen versie'
}

is('versie uit X-Powered-By', leesPhpVersie('PHP/8.3.35', 'nginx')?.versie, '8.3.35')
is('versie uit Server', leesPhpVersie(undefined, 'Apache/2.4.41 (Ubuntu) PHP/7.4.33')?.versie, '7.4.33')
is('geen versie', leesPhpVersie('Next.js', 'Vercel'), undefined)
is('8.3.35 niet gepatcht', oordeel('8.3.35'), 'niet_gepatcht')
is('8.3.36 gepatcht', oordeel('8.3.36'), 'gepatcht')
is('8.2.34 niet gepatcht', oordeel('8.2.34'), 'niet_gepatcht')
is('8.5.12 gepatcht', oordeel('8.5.12'), 'gepatcht')
is('8.4.26 niet gepatcht', oordeel('8.4.26'), 'niet_gepatcht')
is('8.1.34 geen release', oordeel('8.1.34'), 'geen_release')
is('7.4.33 geen release', oordeel('7.4.33'), 'geen_release')
is('5.6.40 geen release', oordeel('5.6.40'), 'geen_release')
is('8.3 zonder patchnummer', oordeel('8.3'), 'versie_verborgen')
is('8.6 onbekende reeks', oordeel('8.6.0'), 'onbekend')
is('rc-build verborgen', oordeel('8.4.27-rc1'), 'versie_verborgen')
is('RC zonder streepje verborgen', oordeel('8.4.27RC1'), 'versie_verborgen')
is('RC-versie blijft zichtbaar', leesPhpVersie('PHP/8.4.27RC1')?.versie, '8.4.27RC1')
is('distributiebuild', beoordeelVersie(leesPhpVersie('PHP/8.3.6-1ubuntu0.24.04.5')!), { oordeel: 'versie_verborgen', patchversie: '8.3.36', distributie: true })

is('WordPress-thema = PHP', herkenPlatform('<link href="/wp-content/themes/x/style.css">', {}), { platform: 'WordPress', php: true })
is('WordPress-generator = PHP', herkenPlatform('<meta name="generator" content="WordPress 6.6">', {}), { platform: 'WordPress', php: true })
is('blog over WooCommerce is geen PHP', herkenPlatform('<p>Wij migreren je WooCommerce-winkel</p>', {}), { php: false })
is('alleen uploads van wp-content (headless) is geen bewijs', herkenPlatform('<img src="https://cms.x.nl/wp-content/uploads/a.jpg">', {}), { php: false })
is('Shopify-kop = geen PHP', herkenPlatform('<html>', { 'x-shopify-stage': 'production' }), { platform: 'Shopify', php: false })
is('Shopify-embed op PHP-site is niet groen', herkenPlatform('<script src="https://cdn.shopify.com/buy-button.js">', {}), { php: false })
is('link naar wix.com is niet groen', herkenPlatform('<a href="https://www.wix.com/">wix</a>', {}), { php: false })
is('Webflow-generator = geen PHP', herkenPlatform('<meta content="Webflow" name="generator">', {}), { platform: 'Webflow', php: false })
is('Next.js is nooit een platform', herkenPlatform('<script src="/_next/static/x.js">', { server: 'Vercel' }), { php: false })
is('PHPSESSID tussen andere cookies', herkenPlatform('<html>', {}, ['a=1', 'PHPSESSID=abc; path=/', 'b=2']), { php: true })

is('domein uit URL', normaliseerDomein('https://www.KamilDak.nl/contact?x=1'), 'kamildak.nl')
is('domein met poort', normaliseerDomein('voorbeeld.be:8080'), 'voorbeeld.be')
is('onzin', normaliseerDomein('hallo daar'), undefined)
is('localhost geweigerd', normaliseerDomein('localhost'), undefined)
is('IP geweigerd', normaliseerDomein('127.0.0.1'), undefined)

for (const ip of ['127.0.0.1', '10.1.2.3', '172.16.0.1', '192.168.1.1', '169.254.169.254', '100.64.0.1', '0.0.0.0', '::1', '::', '::ffff:127.0.0.1', '::127.0.0.1', '64:ff9b::10.0.0.1', '2002:7f00:1::', 'fd00::1', 'fe80::1', 'fec0::1'])
  is(`prive ${ip}`, isPrive(ip), true)
for (const ip of ['93.184.216.34', '8.8.8.8', '2a00:1450:4001:80b::200e', '::ffff:8.8.8.8'])
  is(`publiek ${ip}`, isPrive(ip), false)

if (fouten) {
  console.error(`${fouten} fout(en)`)
  process.exit(1)
}
console.log('alle regels kloppen')
