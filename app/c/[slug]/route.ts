import { NextResponse, type NextRequest } from 'next/server'

/**
 * Placement-ingang: stevin.ai/c/<slug>
 *
 * Dit is de ENIGE ingang die op drukwerk en in QR-codes terechtkomt. De slug
 * staat gedrukt, de configuratie niet: welke bestemming en of de diepere scan
 * aanstaat, bepaalt de Hub op basis van de placement. Zo blijft een gedrukte
 * QR bruikbaar als we de bestemming later wijzigen.
 *
 * Bewust buiten [locale] en buiten next-intl (zie de matcher in middleware.ts):
 * dit is geen inhoudspagina maar een doorgeefluik, en een taal-redirect
 * ervoor zou alleen maar een extra hop kosten op een telefoon bij een stand.
 *
 * Het entry-event wordt hier server-side vastgelegd, via de Hub. Niet via de
 * dataLayer: die wordt door adblockers weggevangen, en dan meet je juist het
 * verkeer niet dat je wilt tellen.
 */

const HUB = 'https://hub.stevin.ai/api/marketing-check'

export const dynamic = 'force-dynamic'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params
  const veilig = /^[a-z0-9][a-z0-9-]{1,60}$/.test(slug.toLowerCase()) ? slug.toLowerCase() : null

  let destination = '/marketing-scan'
  let session = ''

  if (veilig) {
    try {
      // W-380: deze fetch komt van de server, dus de Hub ziet anders alleen
      // "node" en het adres van Vercel. Mailscanners halen de link in Koens
      // handtekening vooraf op; om die achteraf van mensen te scheiden geven
      // we de user agent en het IP van de echte bezoeker door. Vercel
      // overschrijft x-forwarded-for zelf, dus dat adres is niet te vervalsen
      // door de bezoeker. De Hub bewaart het IP alleen gehasht.
      const bezoeker: Record<string, string> = {
        'x-stevin-bezoeker-ua': (request.headers.get('user-agent') ?? '').slice(0, 300),
      }
      const ip = request.headers.get('x-forwarded-for')
      if (ip) bezoeker['x-stevin-bezoeker-ip'] = ip.slice(0, 200)

      const res = await fetch(`${HUB}/placement/${veilig}`, {
        headers: { accept: 'application/json', ...bezoeker },
        cache: 'no-store',
        signal: AbortSignal.timeout(4000),
      })
      if (res.ok) {
        const data = await res.json()
        // Alleen interne paden. De Hub dwingt dat ook af met een CHECK op de
        // kolom, maar we vertrouwen hier niet blind op een externe waarde:
        // een volledige URL zou van deze route een open redirect maken.
        if (typeof data?.destination_path === 'string' && /^\/[a-zA-Z0-9/_-]*$/.test(data.destination_path)) {
          destination = data.destination_path
        }
        if (typeof data?.session_token === 'string') session = data.session_token
      }
    } catch {
      // De Hub plat mag nooit betekenen dat een gedrukte QR niets doet. De
      // bezoeker gaat gewoon door, alleen zonder herkomst.
    }
  }

  const url = new URL(destination, request.nextUrl.origin)
  if (veilig) url.searchParams.set('p', veilig)
  if (session) url.searchParams.set('s', session)

  const response = NextResponse.redirect(url, 307)
  response.headers.set('X-Robots-Tag', 'noindex, nofollow')
  response.headers.set('cache-control', 'no-store')
  return response
}
