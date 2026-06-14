# SEO en GEO conventies

Vaste regels zodat elke nieuwe pagina de SEO- en GEO-basis automatisch meekrijgt
en niks per ongeluk vergeten wordt. Kort en hard: volg deze bij elke nieuwe
pagina, content-type of integratie.

## 1. Elke nieuwe pagina: gebruik `localizedMetadata`

In `generateMetadata` altijd `localizedMetadata` uit `@/lib/seo` gebruiken. Dat
zet canonical, hreflang (nl-NL, en, x-default), OpenGraph en Twitter-cards in een
keer goed.

```ts
import { localizedMetadata } from '@/lib/seo'

export async function generateMetadata({ params }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'mijnpagina' })
  return localizedMetadata({
    path: '/mijn-pagina',          // locale-agnostisch, zonder /en
    locale,
    title: t('meta_title'),
    description: t('sub'),
  })
}
```

- `translated` (default `true`): pagina heeft echte NL en EN content via
  `messages/en.json`. Self-canonical per taal plus hreflang naar beide.
- `translated: false`: NL-only content (bijv. data-gedreven long-tail die nog
  niet vertaald is). Canonical altijd naar NL, geen losse EN-indexatie. Zo
  voorkom je een duplicate-signaal als `/en/...` dezelfde NL-tekst toont.

## 2. Entiteit-schema staat al sitewide

`components/SiteJsonLd.tsx` (Organization + WebSite) hangt in de gedeelde layout,
dus elke pagina draagt de entiteit en alle `#organization`-referenties resolveren.
Niet per pagina dupliceren.

Voeg per nieuw page-type het passende schema toe (zelfde patroon als de bestaande
templates):
- Index/hub-pagina: `components/ItemListJsonLd.tsx`.
- Woordenlijst: `DefinedTermSet` (zie `woordenboek/page.tsx`).
- Artikel: `Article` of `BlogPosting` plus `BreadcrumbList` (zie `blog/[slug]`).
- Product/feature: `SoftwareApplication` met `publisher` naar `#organization`
  (zie `platform/page.tsx`).
- FAQ: vul `faqs` en render via `components/FAQAccordion` (antwoord staat altijd
  in de DOM) plus `FAQPage`-schema.

## 3. Sitemap is dynamisch, maar respecteer de indexable-regels

`app/sitemap.ts` genereert uit `data/*`. Nieuwe content verschijnt automatisch.
Twee filters om te kennen:
- `/en`-duplicaten van NL-only content horen NIET als losse indexeerbare URL in
  de sitemap.
- Integratie-categorieen in `NOINDEX_INTEGRATION_CATEGORIES`
  (`data/integrations.ts`) vallen uit de sitemap en krijgen `robots: noindex`.
  Een categorie verplaatsen naar wel/niet indexeren is 1 regel in die set.

## 4. Journal (blog) blijft goed indexeerbaar

- Elk artikel heeft `publishedAt` (verplicht). Bij inhoudelijke revisie zet je
  `updatedAt`, dat voedt `dateModified` en het freshness-signaal.
- Nieuwe publiceerbare artikelen verschijnen automatisch in de sitemap, in
  `feed.xml` (RSS) en in `llms.txt`. Body-loze dispatches worden uitgefilterd
  (thin content), die horen er bewust niet in.
- Houd de interne links sterk: `getRelatedArticles` linkt verwante artikelen,
  zodat geen artikel een orphan wordt.

## 5. Machine-leesbaar voor AI

- `app/llms.txt/route.ts`: manifest voor LLM-crawlers, dynamisch uit `data/*`.
- `app/pricing.md/route.ts`: prijs-info voor agent-buyers (nu op aanvraag).
- `app/feed.xml/route.ts`: RSS-feed van het Journal.
- `robots.txt` staat alle AI-bots toe (Claude, ChatGPT, Perplexity, Gemini).

## 6. Schrijfregels (gelden ook in schema en meta)

- NOOIT em-dash of en-dash. Komma, punt, dubbele punt of haakjes.
- Geen accenten in NL copy (echte, Belgie, categorieen), ook niet in JSON-LD.
- Simon Stevin altijd "Vlaams-Nederlandse", nooit alleen Vlaams of Nederlands.
