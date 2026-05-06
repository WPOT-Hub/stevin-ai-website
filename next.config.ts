import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./i18n/request.ts')

const nextConfig: NextConfig = {
  // Cache-Control voor static marketing-pages.
  // Default App Router serveert SSR pages met 'no-store' wat CDN-caching
  // uitschakelt (slecht voor performance + SEO PageSpeed). Override naar
  // s-maxage=300 + stale-while-revalidate=86400: browsers hercheck snel,
  // CDN cachet 5 min en serveert stale tot 24u terwijl revalidatie draait.
  async headers() {
    return [
      {
        // Skip API routes — die hebben eigen policy. _next/static heeft al
        // immutable cache via Next.js.
        source: '/((?!api/).*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate, s-maxage=300, stale-while-revalidate=86400',
          },
        ],
      },
    ]
  },
  async redirects() {
    return [
      {
        source: '/voor-artiesten',
        destination: '/artiesten',
        permanent: true,
      },
      {
        source: '/demo',
        destination: '/contact',
        permanent: false,
      },
      {
        source: '/alerts',
        destination: '/platform',
        permanent: false,
      },
    ]
  },
}

export default withNextIntl(nextConfig)
