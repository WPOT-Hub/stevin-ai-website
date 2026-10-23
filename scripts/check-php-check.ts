// W-652: toetst de rekenregels van de PHP-lek-check zonder netwerk.
// Gebruik: npx tsx scripts/check-php-check.ts (exitcode 1 bij een fout)
import { beoordeelVersie, herkenPlatform, leesPhpVersie, normaliseerDomein } from '../lib/php-check'

let fouten = 0
function is(naam: string, kreeg: unknown, verwacht: unknown) {
  const ok = JSON.stringify(kreeg) === JSON.stringify(verwacht)
  if (!ok) fouten++
  console.log(`${ok ? 'ok  ' : 'FOUT'} ${naam}: ${JSON.stringify(kreeg)}${ok ? '' : ` (verwacht ${JSON.stringify(verwacht)})`}`)
}

is('versie uit X-Powered-By', leesPhpVersie('PHP/8.3.35', 'nginx'), '8.3.35')
is('versie uit Server', leesPhpVersie(undefined, 'Apache/2.4.41 (Ubuntu) PHP/7.4.33'), '7.4.33')
is('geen versie', leesPhpVersie('Next.js', 'Vercel'), undefined)
is('8.3.35 niet gepatcht', beoordeelVersie('8.3.35'), { oordeel: 'niet_gepatcht', patchversie: '8.3.36' })
is('8.3.36 gepatcht', beoordeelVersie('8.3.36'), { oordeel: 'gepatcht', patchversie: '8.3.36' })
is('8.2.34 niet gepatcht', beoordeelVersie('8.2.34'), { oordeel: 'niet_gepatcht', patchversie: '8.2.35' })
is('8.5.12 gepatcht', beoordeelVersie('8.5.12'), { oordeel: 'gepatcht', patchversie: '8.5.12' })
is('8.4.26 niet gepatcht', beoordeelVersie('8.4.26'), { oordeel: 'niet_gepatcht', patchversie: '8.4.27' })
is('8.1.34 geen release', beoordeelVersie('8.1.34'), { oordeel: 'geen_release' })
is('7.4.33 geen release', beoordeelVersie('7.4.33'), { oordeel: 'geen_release' })
is('5.6.40 geen release', beoordeelVersie('5.6.40'), { oordeel: 'geen_release' })
is('8.3 zonder patchnummer', beoordeelVersie('8.3'), { oordeel: 'versie_verborgen', patchversie: '8.3.36' })
is('8.6 nieuwer', beoordeelVersie('8.6.0'), { oordeel: 'gepatcht' })
is('WordPress = PHP', herkenPlatform('<link href="/wp-content/themes/x.css">', {}), { platform: 'WordPress', php: true })
is('Shopify zonder PHP', herkenPlatform('<script src="https://cdn.shopify.com/x.js">', {}), { platform: 'Shopify', php: false })
is('PHPSESSID = PHP', herkenPlatform('<html>', { 'set-cookie': 'PHPSESSID=abc; path=/' }), { platform: undefined, php: true })
is('niets gezien', herkenPlatform('<html><body>hoi</body></html>', {}), { php: false })
is('domein uit URL', normaliseerDomein('https://www.KamilDak.nl/contact?x=1'), 'kamildak.nl')
is('domein met poort', normaliseerDomein('voorbeeld.be:8080'), 'voorbeeld.be')
is('onzin', normaliseerDomein('hallo daar'), undefined)
is('localhost geweigerd', normaliseerDomein('localhost'), undefined)
is('IP geweigerd', normaliseerDomein('127.0.0.1'), undefined)

if (fouten) {
  console.error(`${fouten} fout(en)`)
  process.exit(1)
}
console.log('alle regels kloppen')
