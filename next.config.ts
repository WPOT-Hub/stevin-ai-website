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
      // 301-redirects voor geschrapte off-topic dispatches (geen marketing-hoek).
      // Verwijzen naar de blog-index zodat oude URLs niet 404'en.
      // Per slug twee varianten: kaal /blog/-pad (NL default, geen locale-prefix)
      // plus /:locale/blog/-vorm voor /en/ (en eventuele /nl/) URLs.
      {
        source: '/blog/social-media-opgeblazen-drone-algoritme-claim',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/:locale/blog/social-media-opgeblazen-drone-algoritme-claim',
        destination: '/:locale/blog',
        permanent: true,
      },
      {
        source: '/blog/softbank-investeert-tientallen-miljarden-in-franse-ai-data-centers',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/:locale/blog/softbank-investeert-tientallen-miljarden-in-franse-ai-data-centers',
        destination: '/:locale/blog',
        permanent: true,
      },
      {
        source: '/blog/robotaxis-in-de-vs-komen-onder-druk-door-onveilige-incidenten',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/:locale/blog/robotaxis-in-de-vs-komen-onder-druk-door-onveilige-incidenten',
        destination: '/:locale/blog',
        permanent: true,
      },
      {
        source: '/blog/tno-defensie-samenwerken-innovatie',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/:locale/blog/tno-defensie-samenwerken-innovatie',
        destination: '/:locale/blog',
        permanent: true,
      },
      {
        source: '/blog/amerika-budget-9-miljard-voor-ai-spionage',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/:locale/blog/amerika-budget-9-miljard-voor-ai-spionage',
        destination: '/:locale/blog',
        permanent: true,
      },
      {
        source: '/blog/cerebras-beursgang-ai-chipsector',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/:locale/blog/cerebras-beursgang-ai-chipsector',
        destination: '/:locale/blog',
        permanent: true,
      },
      {
        source: '/blog/btw-fraude-netwerk-europa-operatie-admiral',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/:locale/blog/btw-fraude-netwerk-europa-operatie-admiral',
        destination: '/:locale/blog',
        permanent: true,
      },
      {
        source: '/blog/mistral-overname-emmi-ai-versterkt-europese-chip-en-auto-sector',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/:locale/blog/mistral-overname-emmi-ai-versterkt-europese-chip-en-auto-sector',
        destination: '/:locale/blog',
        permanent: true,
      },
      {
        source: '/blog/mazda-centraliseert-ai-ready-dataplatform-met-dell-technologies',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/:locale/blog/mazda-centraliseert-ai-ready-dataplatform-met-dell-technologies',
        destination: '/:locale/blog',
        permanent: true,
      },
      {
        source: '/blog/spotify-lanceert-ai-remixes-voor-premium-gebruikers',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/:locale/blog/spotify-lanceert-ai-remixes-voor-premium-gebruikers',
        destination: '/:locale/blog',
        permanent: true,
      },
      {
        source: '/blog/ai-gemaakte-boeken-zonder-waarschuwing-te-koop',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/:locale/blog/ai-gemaakte-boeken-zonder-waarschuwing-te-koop',
        destination: '/:locale/blog',
        permanent: true,
      },
      {
        source: '/blog/vodafone-batterijgarantie-drie-jaar-accuvervanging',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/:locale/blog/vodafone-batterijgarantie-drie-jaar-accuvervanging',
        destination: '/:locale/blog',
        permanent: true,
      },
      {
        source: '/blog/alibaba-omzet-kwartaal-stijgt-maar-blijft-achter-verwachtingen',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/:locale/blog/alibaba-omzet-kwartaal-stijgt-maar-blijft-achter-verwachtingen',
        destination: '/:locale/blog',
        permanent: true,
      },
      {
        source: '/blog/openai-race-naar-agi-onthuld',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/:locale/blog/openai-race-naar-agi-onthuld',
        destination: '/:locale/blog',
        permanent: true,
      },
      {
        source: '/blog/ai-presentatrice-kids-top-20-wekt-teleurstelling',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/:locale/blog/ai-presentatrice-kids-top-20-wekt-teleurstelling',
        destination: '/:locale/blog',
        permanent: true,
      },
      {
        source: '/blog/microsoft-verbergt-copilot-knop-in-office-na-kritiek',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/:locale/blog/microsoft-verbergt-copilot-knop-in-office-na-kritiek',
        destination: '/:locale/blog',
        permanent: true,
      },
      {
        source: '/blog/new-york-pizza-toont-macht-van-lokale-marketing',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/:locale/blog/new-york-pizza-toont-macht-van-lokale-marketing',
        destination: '/:locale/blog',
        permanent: true,
      },
      {
        source: '/blog/beardbrand-expansion-plan-na-groeistagnatie',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/:locale/blog/beardbrand-expansion-plan-na-groeistagnatie',
        destination: '/:locale/blog',
        permanent: true,
      },
    ]
  },
}

export default withNextIntl(nextConfig)
