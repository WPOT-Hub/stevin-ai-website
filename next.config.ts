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
      // 301-redirects voor gemergede duplicaat-blogartikelen.
      // Per duplicaat twee varianten: kaal /blog/-pad (NL default, geen
      // locale-prefix bij next-intl 'as-needed') plus /:locale/blog/-vorm
      // zodat /en/ (en eventuele /nl/) URLs ook redirecten.
      {
        source: '/blog/openai-brengt-conversie-gerichte-ads-voor-chatgpt',
        destination: '/blog/openai-introduceert-conversiegericht-adverteren-in-chatgpt',
        permanent: true,
      },
      {
        source: '/:locale/blog/openai-brengt-conversie-gerichte-ads-voor-chatgpt',
        destination: '/:locale/blog/openai-introduceert-conversiegericht-adverteren-in-chatgpt',
        permanent: true,
      },
      {
        source: '/blog/seo-changelogs-ondermijnd-door-onzichtbare-updates',
        destination: '/blog/seo-changelogs-ondergewaardeerde-spil-in-enterprise-governance',
        permanent: true,
      },
      {
        source: '/:locale/blog/seo-changelogs-ondermijnd-door-onzichtbare-updates',
        destination: '/:locale/blog/seo-changelogs-ondergewaardeerde-spil-in-enterprise-governance',
        permanent: true,
      },
      {
        source: '/blog/tiktok-shop-lanceert-in-nederland-en-belgie-op-15-juni',
        destination: '/blog/tiktok-shop-lanceert-in-nederland-op-15-juni',
        permanent: true,
      },
      {
        source: '/:locale/blog/tiktok-shop-lanceert-in-nederland-en-belgie-op-15-juni',
        destination: '/:locale/blog/tiktok-shop-lanceert-in-nederland-op-15-juni',
        permanent: true,
      },
      {
        source: '/blog/google-ads-kosten-stijgen-conversies-verbeteren-2025',
        destination: '/blog/google-ads-kosten-stijgen-conversie-efficientie-2025',
        permanent: true,
      },
      {
        source: '/:locale/blog/google-ads-kosten-stijgen-conversies-verbeteren-2025',
        destination: '/:locale/blog/google-ads-kosten-stijgen-conversie-efficientie-2025',
        permanent: true,
      },
      {
        source: '/blog/ai-print-on-demand-spelers-moeten-fundament-leggen',
        destination: '/blog/ai-verandert-print-on-demand-ecommerce',
        permanent: true,
      },
      {
        source: '/:locale/blog/ai-print-on-demand-spelers-moeten-fundament-leggen',
        destination: '/:locale/blog/ai-verandert-print-on-demand-ecommerce',
        permanent: true,
      },
    ]
  },
}

export default withNextIntl(nextConfig)
