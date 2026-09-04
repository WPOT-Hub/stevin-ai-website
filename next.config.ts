import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'
import retiredArticles from './data/retired-articles.json'

const withNextIntl = createNextIntlPlugin('./i18n/request.ts')

const journalConsolidationRedirects = retiredArticles.flatMap(({ from, to }) => [
  { source: `/blog/${from}`, destination: `/blog/${to}`, permanent: true },
  {
    source: `/:locale(nl|en)/blog/${from}`,
    destination: `/:locale(nl|en)/blog/${to}`,
    permanent: true,
  },
])

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
      // 4 sep 2026 (W-042): van de tien producten op /producten bestonden er
      // twee. Getoetst aan draaiende code, tabellen met rijen en cronjobs, niet
      // aan documentatie. Ads Radar en Signals blijven; de andere acht zijn
      // roadmap, dormant of helemaal afwezig. Bij dynamic-optimization,
      // dynamic-pages en dynamic-ads is de oorzaak dezelfde: er bestaat geen
      // enkel schrijfpad naar Google of Meta, en dat was met D-019 een bewuste
      // keuze, inclusief de afspraak het niet in de copy te zetten voordat het
      // bestaat. De URL's kunnen geindexeerd zijn (35 vertoningen in 90 dagen),
      // dus 301 naar het overzicht in plaats van een 404.
      // Zie docs/research/SITE_CLAIMS_AUDIT_2026-09-04.md in Stevin-Hub.
      // 4 sep 2026 (W-042): /platform, /producten en /werkwijze vertelden elk
      // een eigen versie van wat Stevin is. /platform is herbouwd tot een
      // verhaal (wat het doet, wat het niet doet, waarop het advies steunt) en
      // neemt de andere twee over. /werkwijze had nul zoekvertoningen, dus daar
      // valt niets te verliezen; /producten had er 35, vandaar een 301 en geen
      // 404. De twee producten die echt bestaan, Signals en Ads Radar, staan nu
      // als eigenschap op /platform in plaats van als los product.
      { source: '/werkwijze', destination: '/platform', permanent: true },
      { source: '/:locale(nl|en)/werkwijze', destination: '/:locale(nl|en)/platform', permanent: true },
      { source: '/producten', destination: '/platform', permanent: true },
      { source: '/:locale(nl|en)/producten', destination: '/:locale(nl|en)/platform', permanent: true },
      { source: '/producten/:slug', destination: '/platform', permanent: true },
      { source: '/:locale(nl|en)/producten/:slug', destination: '/:locale(nl|en)/platform', permanent: true },
      // 17 aug 2026: /case-studies/e-commerce stond publiek met verzonnen
      // resultaten (+42% leads, -35% kosten per acquisitie, 8 uur bespaard) bij
      // een naamloze klant. Niets daarvan is na te kijken, en dat is precies de
      // claim die je niet maakt als je verkoopt dat het bewijs controleerbaar
      // is. Pagina verwijderd; de URL kan geindexeerd zijn, dus 301 naar het
      // overzicht in plaats van een 404. Echte klantverhalen komen na 1 sep.
      { source: '/case-studies/e-commerce', destination: '/case-studies', permanent: true },
      { source: '/:locale(nl|en)/case-studies/e-commerce', destination: '/:locale(nl|en)/case-studies', permanent: true },
      // Sanering Fase 1 (21 jul 2026, doc 24): doelgroep-duplicaten en dode
      // feature-pagina's 301 naar de dichtstbijzijnde overlevende pagina.
      { source: '/creatieve-bureaus', destination: '/voor-marketingteams', permanent: true },
      { source: '/:locale(nl|en)/creatieve-bureaus', destination: '/:locale(nl|en)/voor-marketingteams', permanent: true },
      { source: '/mediabureaus', destination: '/voor-marketingteams', permanent: true },
      { source: '/:locale(nl|en)/mediabureaus', destination: '/:locale(nl|en)/voor-marketingteams', permanent: true },
      { source: '/pr-bureaus', destination: '/voor-marketingteams', permanent: true },
      { source: '/:locale(nl|en)/pr-bureaus', destination: '/:locale(nl|en)/voor-marketingteams', permanent: true },
      { source: '/voor-agencies', destination: '/voor-marketingteams', permanent: true },
      { source: '/:locale(nl|en)/voor-agencies', destination: '/:locale(nl|en)/voor-marketingteams', permanent: true },
      { source: '/marketing', destination: '/voor-marketingteams', permanent: true },
      { source: '/:locale(nl|en)/marketing', destination: '/:locale(nl|en)/voor-marketingteams', permanent: true },
      { source: '/automotive', destination: '/voor-dealers', permanent: true },
      { source: '/:locale(nl|en)/automotive', destination: '/:locale(nl|en)/voor-dealers', permanent: true },
      { source: '/autodealer-campagnes', destination: '/voor-dealers', permanent: true },
      { source: '/:locale(nl|en)/autodealer-campagnes', destination: '/:locale(nl|en)/voor-dealers', permanent: true },
      { source: '/non-profit-marketing-nederland', destination: '/google-ad-grants-nederland', permanent: true },
      { source: '/:locale(nl|en)/non-profit-marketing-nederland', destination: '/:locale(nl|en)/google-ad-grants-nederland', permanent: true },
      { source: '/non-profit-marketing-belgie', destination: '/google-ad-grants-belgie', permanent: true },
      { source: '/:locale(nl|en)/non-profit-marketing-belgie', destination: '/:locale(nl|en)/google-ad-grants-belgie', permanent: true },
      { source: '/voor-non-profit', destination: '/google-ad-grants-nederland', permanent: true },
      { source: '/:locale(nl|en)/voor-non-profit', destination: '/:locale(nl|en)/google-ad-grants-nederland', permanent: true },
      { source: '/voor-retail', destination: '/retail', permanent: true },
      { source: '/:locale(nl|en)/voor-retail', destination: '/:locale(nl|en)/retail', permanent: true },
      { source: '/fmcg', destination: '/voor-ondernemers', permanent: true },
      { source: '/:locale(nl|en)/fmcg', destination: '/:locale(nl|en)/voor-ondernemers', permanent: true },
      { source: '/healthcare-marketing', destination: '/voor-ondernemers', permanent: true },
      { source: '/:locale(nl|en)/healthcare-marketing', destination: '/:locale(nl|en)/voor-ondernemers', permanent: true },
      { source: '/e-commerce', destination: '/voor-ondernemers', permanent: true },
      { source: '/:locale(nl|en)/e-commerce', destination: '/:locale(nl|en)/voor-ondernemers', permanent: true },
      { source: '/b2b', destination: '/voor-ondernemers', permanent: true },
      { source: '/:locale(nl|en)/b2b', destination: '/:locale(nl|en)/voor-ondernemers', permanent: true },
      { source: '/artiesten', destination: '/voor-ondernemers', permanent: true },
      { source: '/:locale(nl|en)/artiesten', destination: '/:locale(nl|en)/voor-ondernemers', permanent: true },
      { source: '/influencers', destination: '/voor-ondernemers', permanent: true },
      { source: '/:locale(nl|en)/influencers', destination: '/:locale(nl|en)/voor-ondernemers', permanent: true },
      { source: '/promotoren', destination: '/voor-ondernemers', permanent: true },
      { source: '/:locale(nl|en)/promotoren', destination: '/:locale(nl|en)/voor-ondernemers', permanent: true },
      { source: '/merken', destination: '/voor-ondernemers', permanent: true },
      { source: '/:locale(nl|en)/merken', destination: '/:locale(nl|en)/voor-ondernemers', permanent: true },
      { source: '/voor-verhuur', destination: '/voor-ondernemers', permanent: true },
      { source: '/:locale(nl|en)/voor-verhuur', destination: '/:locale(nl|en)/voor-ondernemers', permanent: true },
      { source: '/ai-agents', destination: '/platform', permanent: true },
      { source: '/:locale(nl|en)/ai-agents', destination: '/:locale(nl|en)/platform', permanent: true },
      { source: '/data-verrijking', destination: '/platform', permanent: true },
      { source: '/:locale(nl|en)/data-verrijking', destination: '/:locale(nl|en)/platform', permanent: true },
      {
        source: '/voor-artiesten',
        destination: '/voor-ondernemers',
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
      ...journalConsolidationRedirects,
      {
        source: '/blog/openai-brengt-conversie-gerichte-ads-voor-chatgpt',
        destination: '/blog/openai-introduceert-conversiegericht-adverteren-in-chatgpt',
        permanent: true,
      },
      {
        source: '/:locale(nl|en)/blog/openai-brengt-conversie-gerichte-ads-voor-chatgpt',
        destination: '/:locale(nl|en)/blog/openai-introduceert-conversiegericht-adverteren-in-chatgpt',
        permanent: true,
      },
      {
        source: '/blog/seo-changelogs-ondermijnd-door-onzichtbare-updates',
        destination: '/blog/seo-changelogs-ondergewaardeerde-spil-in-enterprise-governance',
        permanent: true,
      },
      {
        source: '/:locale(nl|en)/blog/seo-changelogs-ondermijnd-door-onzichtbare-updates',
        destination: '/:locale(nl|en)/blog/seo-changelogs-ondergewaardeerde-spil-in-enterprise-governance',
        permanent: true,
      },
      {
        source: '/blog/tiktok-shop-lanceert-in-nederland-en-belgie-op-15-juni',
        destination: '/blog/tiktok-shop-lanceert-in-nederland-op-15-juni',
        permanent: true,
      },
      {
        source: '/:locale(nl|en)/blog/tiktok-shop-lanceert-in-nederland-en-belgie-op-15-juni',
        destination: '/:locale(nl|en)/blog/tiktok-shop-lanceert-in-nederland-op-15-juni',
        permanent: true,
      },
      {
        source: '/blog/google-ads-kosten-stijgen-conversies-verbeteren-2025',
        destination: '/blog/google-ads-kosten-stijgen-conversie-efficientie-2025',
        permanent: true,
      },
      {
        source: '/:locale(nl|en)/blog/google-ads-kosten-stijgen-conversies-verbeteren-2025',
        destination: '/:locale(nl|en)/blog/google-ads-kosten-stijgen-conversie-efficientie-2025',
        permanent: true,
      },
      {
        source: '/blog/ai-print-on-demand-spelers-moeten-fundament-leggen',
        destination: '/blog/ai-verandert-print-on-demand-ecommerce',
        permanent: true,
      },
      {
        source: '/:locale(nl|en)/blog/ai-print-on-demand-spelers-moeten-fundament-leggen',
        destination: '/:locale(nl|en)/blog/ai-verandert-print-on-demand-ecommerce',
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
        source: '/:locale(nl|en)/blog/social-media-opgeblazen-drone-algoritme-claim',
        destination: '/:locale(nl|en)/blog',
        permanent: true,
      },
      {
        source: '/blog/softbank-investeert-tientallen-miljarden-in-franse-ai-data-centers',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/:locale(nl|en)/blog/softbank-investeert-tientallen-miljarden-in-franse-ai-data-centers',
        destination: '/:locale(nl|en)/blog',
        permanent: true,
      },
      {
        source: '/blog/robotaxis-in-de-vs-komen-onder-druk-door-onveilige-incidenten',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/:locale(nl|en)/blog/robotaxis-in-de-vs-komen-onder-druk-door-onveilige-incidenten',
        destination: '/:locale(nl|en)/blog',
        permanent: true,
      },
      {
        source: '/blog/tno-defensie-samenwerken-innovatie',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/:locale(nl|en)/blog/tno-defensie-samenwerken-innovatie',
        destination: '/:locale(nl|en)/blog',
        permanent: true,
      },
      {
        source: '/blog/amerika-budget-9-miljard-voor-ai-spionage',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/:locale(nl|en)/blog/amerika-budget-9-miljard-voor-ai-spionage',
        destination: '/:locale(nl|en)/blog',
        permanent: true,
      },
      {
        source: '/blog/cerebras-beursgang-ai-chipsector',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/:locale(nl|en)/blog/cerebras-beursgang-ai-chipsector',
        destination: '/:locale(nl|en)/blog',
        permanent: true,
      },
      {
        source: '/blog/btw-fraude-netwerk-europa-operatie-admiral',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/:locale(nl|en)/blog/btw-fraude-netwerk-europa-operatie-admiral',
        destination: '/:locale(nl|en)/blog',
        permanent: true,
      },
      {
        source: '/blog/mistral-overname-emmi-ai-versterkt-europese-chip-en-auto-sector',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/:locale(nl|en)/blog/mistral-overname-emmi-ai-versterkt-europese-chip-en-auto-sector',
        destination: '/:locale(nl|en)/blog',
        permanent: true,
      },
      {
        source: '/blog/mazda-centraliseert-ai-ready-dataplatform-met-dell-technologies',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/:locale(nl|en)/blog/mazda-centraliseert-ai-ready-dataplatform-met-dell-technologies',
        destination: '/:locale(nl|en)/blog',
        permanent: true,
      },
      {
        source: '/blog/spotify-lanceert-ai-remixes-voor-premium-gebruikers',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/:locale(nl|en)/blog/spotify-lanceert-ai-remixes-voor-premium-gebruikers',
        destination: '/:locale(nl|en)/blog',
        permanent: true,
      },
      {
        source: '/blog/ai-gemaakte-boeken-zonder-waarschuwing-te-koop',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/:locale(nl|en)/blog/ai-gemaakte-boeken-zonder-waarschuwing-te-koop',
        destination: '/:locale(nl|en)/blog',
        permanent: true,
      },
      {
        source: '/blog/vodafone-batterijgarantie-drie-jaar-accuvervanging',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/:locale(nl|en)/blog/vodafone-batterijgarantie-drie-jaar-accuvervanging',
        destination: '/:locale(nl|en)/blog',
        permanent: true,
      },
      {
        source: '/blog/alibaba-omzet-kwartaal-stijgt-maar-blijft-achter-verwachtingen',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/:locale(nl|en)/blog/alibaba-omzet-kwartaal-stijgt-maar-blijft-achter-verwachtingen',
        destination: '/:locale(nl|en)/blog',
        permanent: true,
      },
      {
        source: '/blog/openai-race-naar-agi-onthuld',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/:locale(nl|en)/blog/openai-race-naar-agi-onthuld',
        destination: '/:locale(nl|en)/blog',
        permanent: true,
      },
      {
        source: '/blog/ai-presentatrice-kids-top-20-wekt-teleurstelling',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/:locale(nl|en)/blog/ai-presentatrice-kids-top-20-wekt-teleurstelling',
        destination: '/:locale(nl|en)/blog',
        permanent: true,
      },
      {
        source: '/blog/microsoft-verbergt-copilot-knop-in-office-na-kritiek',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/:locale(nl|en)/blog/microsoft-verbergt-copilot-knop-in-office-na-kritiek',
        destination: '/:locale(nl|en)/blog',
        permanent: true,
      },
      {
        source: '/blog/new-york-pizza-toont-macht-van-lokale-marketing',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/:locale(nl|en)/blog/new-york-pizza-toont-macht-van-lokale-marketing',
        destination: '/:locale(nl|en)/blog',
        permanent: true,
      },
      {
        source: '/blog/beardbrand-expansion-plan-na-groeistagnatie',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/:locale(nl|en)/blog/beardbrand-expansion-plan-na-groeistagnatie',
        destination: '/:locale(nl|en)/blog',
        permanent: true,
      },
    ]
  },
}

export default withNextIntl(nextConfig)
