import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['nl', 'en'],
  defaultLocale: 'nl',
  localePrefix: 'as-needed', // no prefix for NL (default)
  // W-443, 2 okt 2026: next-intl zette standaard op ELKE pagina een HTTP
  // Link-kopregel met hreflang nl, en en x-default, ook op de ruim 700
  // NL-only pagina's (blog, integraties, woordenboek, landingspagina's) waar
  // /en dezelfde Nederlandse tekst toont en canonicalt naar de NL-URL. De
  // HTML-tags uit lib/seo.ts stonden sinds 26 jul goed, maar de kopregel
  // adverteerde er een Engelse versie bij die niet canoniek is. Ahrefs telde
  // daardoor 736 pagina's "Hreflang to non-canonical" (healthscore 55) en
  // niemand las die mail. De hreflang komt nu alleen nog uit de HTML-tags
  // (per pagina bepaald via translated: true/false) en de sitemap.
  alternateLinks: false,
})
