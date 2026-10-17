import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'
import snoeiRedirects from './data/redirects.json'

const withNextIntl = createNextIntlPlugin('./i18n/request.ts')

// W-535 (12 okt 2026): alle permanente omleidingen staan in
// data/redirects.json, elk rechtstreeks naar zijn eindadres. Daar zitten ook
// de oudere omleidingen in (W-042, W-134, de sanering van 21 jul, de
// cultuursector) met hun nieuwe eindadres: een keten van twee omleidingen kost
// een extra hop en Google volgt er maar een beperkt aantal. Wat weg is zonder
// opvolger geeft 410 via middleware.ts (data/gone-urls.json), ook de
// nieuwsberichten die eerder naar /blog gingen: een omleiding naar een
// overzicht telt bij Google als een zachte 404.
//
// 301 en geen 308: hetzelfde voor Google, maar 301 is wat het plan en de
// controle noemen. Een Nederlands pad krijgt ook zijn /nl-vorm, want
// next-intl staat op 'as-needed' en /nl/... bestaat dus als alias. De query
// gaat mee (?p= en ?s= op de QR-codes van /marketing-check).
const omleidingen = snoeiRedirects.omleidingen.flatMap(({ van, naar }) => {
  const regel = { source: van, destination: naar, statusCode: 301 as const }
  return van === '/en' || van.startsWith('/en/') ? [regel] : [regel, { ...regel, source: `/nl${van}` }]
})

const nextConfig: NextConfig = {
  // Cache-Control voor static marketing-pages.
  // Default App Router serveert SSR pages met 'no-store' wat CDN-caching
  // uitschakelt (slecht voor performance + SEO PageSpeed). Override naar
  // s-maxage=300 + stale-while-revalidate=86400: browsers hercheck snel,
  // CDN cachet 5 min en serveert stale tot 24u terwijl revalidatie draait.
  async headers() {
    return [
      // W-574 (18 okt 2026): de basiskopregels die hub.stevin.ai, desk en
      // portal al sturen, stonden hier niet. Gemeten op stevin.ai: alleen
      // Strict-Transport-Security. Geen Content-Security-Policy hier: die
      // vraagt eerst een inventaris van GTM, Clarity en de inline scripts.
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
      {
        // Skip API routes, die hebben eigen policy. _next/static heeft al
        // immutable cache via Next.js.
        source: '/((?!api/).*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate, s-maxage=300, stale-while-revalidate=86400',
          },
        ],
      },
      // W-566: kavelpagina Laurentius-veiling nooit in de index. De metatag
      // staat ook in de pagina; deze kopregel dekt daarnaast de losse
      // schermafdrukken in public/laurentius. Niet via robots.txt: dan ziet
      // Google de noindex juist niet.
      ...['/laurentius', '/laurentius/:pad*', '/en/laurentius'].map((source) => ({
        source,
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      })),
    ]
  },
  async rewrites() {
    return [
      // Campagne-landingspagina als statisch bestand in /public, schone URL zonder .html
      {
        source: '/ads-data',
        destination: '/ads-data.html',
      },
      {
        source: '/inhouse',
        destination: '/inhouse.html',
      },
      {
        source: '/kies',
        destination: '/kies.html',
      },
    ]
  },
  async redirects() {
    return [
      ...omleidingen,
      // Vangnet voor oude productadressen die niet in de lijst staan (W-042:
      // van de tien producten bestonden er twee, de rest wees al naar
      // /platform). Alleen Nederlands: de twee Engelse adressen die het plan
      // noemt geven 410.
      { source: '/producten/:slug', destination: '/platform', statusCode: 301 },
      { source: '/nl/producten/:slug', destination: '/platform', statusCode: 301 },
    ]
  },
}

export default withNextIntl(nextConfig)
