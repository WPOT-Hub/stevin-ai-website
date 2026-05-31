# Blog SEO + AI-vindbaarheid audit
Datum: 31 mei 2026. Basis: Google's officiele AI-optimization-guide (developers.google.com/search/docs/fundamentals/ai-optimization-guide) toegepast op het Stevin Journal (98 artikelen, stevin.ai/blog).

## De kern in een paar zinnen

Het technische fundament van het Journal is goed. Schema, canonicals, OG-images, robots, sitemap: allemaal aanwezig en correct. Maar Google's guide zegt expliciet dat markup NIET de hefboom is voor AI-vindbaarheid. De hefboom is unieke, non-commodity content. En daar zit het echte probleem: van de 98 artikelen zijn er ongeveer 90 korte dispatches die een extern nieuwtje navertellen met een dunne laag duiding. Dat is precies de "content die informatie herhaalt die elders al beschikbaar is" die Google afraadt. Geen markup-tweak lost dat op.

Tweede probleem: dezelfde Nederlandse tekst staat zowel op /nl/ als op /en/. Dat is duplicate content in de verkeerde taal.

## Wat Google letterlijk zegt (de relevante punten)

Hoe AI-features werken:
- RAG: AI-Overviews en AI Mode halen pagina's uit de gewone Search-index en tonen klikbare bronlinks. Eerst geindexeerd en eligible voor een snippet zijn is dus de absolute voorwaarde.
- Query fan-out: het systeem genereert meerdere gerelateerde zoekopdrachten. Content die meerdere invalshoeken van een onderwerp dekt, wordt vaker opgehaald.

Wat WEL telt (citaten):
- "Create helpful, reliable, people-first content" met "a unique point of view" en "unique expert or experienced takes that go beyond common knowledge."
- "Avoid content that simply restates information already available elsewhere."
- Organiseer met "paragraphs and sections, along with headings that provide a clear structure."
- "Add high-quality, relevant images and video."
- Zorg dat content "crawlable" en "indexed and eligible to be shown with a snippet" is.
- "Reduce duplicate content" om crawl-resources niet te verspillen.

Wat expliciet NIET nodig is (citaten):
- "Structured data isn't required for generative AI search, and there's no special schema.org markup you need to add." (blijft wel nuttig voor rich results)
- "You don't need to create new machine readable files, AI text files, markup, or Markdown" (zoals llms.txt).
- "There's no requirement to break your content into tiny pieces" (geen chunking).
- Niet herschrijven "in a specific way just for generative AI search."

## Wat al goed staat (niet aankomen)

1. JSON-LD per artikel: Article, FAQPage (waar FAQs bestaan), BreadcrumbList. Correct opgebouwd in blog/[slug]/page.tsx.
2. robots.txt: Claude-SearchBot, Claude-User, ChatGPT-User, OAI-SearchBot, PerplexityBot, Googlebot-Extended en * allemaal allow. Sitemap gelinkt.
3. Per-post OG-image via de Next conventional route opengraph-image.tsx.
4. Canonical tags: blog/[slug] zet canonical op de niet-prefixed (NL) URL. De /en/ variant canonicaliseert daardoor al naar NL, wat de duplicate deels afvangt.
5. Sitemap met echte publishedAt als lastModified, changeFrequency, priority, hreflang-alternates.
6. Semantische HTML met H2/H3 in de editorials.
7. Reading-progress, dek, byline, dates: nette page-experience signalen.

## De twee echte problemen

### Probleem 1: content-dunheid (de grootste hefboom)

Van de 98 artikelen hebben er 8 een eigen, met de hand geschreven editorial-body (MIT-pilots, autonome agents, last-click, MMM, transcriptietools, WK-2026, AI-cowboys, organisatielaag). Die zijn sterk: eigen mening, eigen cijfers, eigen kader. Dat is exact wat Google "unique expert takes" noemt.

De overige ongeveer 90 zijn dispatches. Hun body wordt opgebouwd door 1 generieke component (ArticleDispatchBody) uit alleen het title- en dek-veld plus 1 paragraaf duiding. Inhoudelijk navertellen ze een extern bericht (TikTok Shop lanceert, SoftBank investeert, Google test X). Dat is per definitie commodity content: dezelfde informatie staat al op tientallen andere sites, vaak eerder en uitgebreider.

Gevolg voor AI-vindbaarheid: een RAG-systeem heeft geen reden om juist de Stevin-versie te citeren boven de oorspronkelijke bron. De dispatch voegt te weinig eigen analyse toe om als unieke bron te gelden.

Extra signaal-probleem: veel dispatches hebben `source: { url: 'https://stevin.ai' }` terwijl het een navertelling van een externe gebeurtenis is. Dat is misleidend (de echte bron wordt niet gecrediteerd) en mist de uitgaande-link-autoriteit die een eerlijke bronvermelding zou geven.

Dit is geen code-fix. Het is een redactionele en pipeline-keuze. Opties, oplopend in effort:
- A. Stop met pure navertel-dispatches. Publiceer alleen wat een eigen Stevin-hoek heeft (de "Wat dit betekent voor jou"-paragraaf wordt dan de kern, niet de bijzaak). Minder artikelen, hogere gemiddelde kwaliteit. Google beloont dat.
- B. Verrijk elke dispatch met minimaal 2 tot 3 alinea's eigen analyse die nergens anders staat: een Stevin-cijfer, een consultant-observatie, een concreet advies. De Hub journal-pipeline (draftWriter) moet dan een hardere eis krijgen op eigen inhoud.
- C. Bundel losse dispatches over hetzelfde thema tot 1 diepere pillar (bijvoorbeeld alle ChatGPT-ads-berichten tot 1 stuk "Wat betaalde advertenties in ChatGPT betekenen voor bureaus"). Pillars ranken structureel beter dan losse korte berichten.

Aanbeveling: A plus C. Snoei de navertellingen, bouw pillars op de thema's waar Stevin echt een mening heeft (meetbaarheid, attributie, consultant-in-the-loop, AI-tooling-chaos). Dat sluit ook aan op de positionering-review (brug-positie "marketing intelligence die beslist").

### Probleem 2: taal-duplicatie /nl/ versus /en/

Nu staat dezelfde NL-tekst op beide locales. De canonical vangt het deels af, maar de sitemap biedt /en/blog/<slug> wel als aparte indexeerbare URL aan met NL-inhoud. Voor een Engelstalige zoeker of AI-query is dat geen bruikbaar resultaat.

Keuze (door Koen gemaakt): echte EN-vertaling, geen NL-tekst op /en/.

Dat is Hub-pipeline-werk: de journal-pipeline moet per artikel een EN-variant produceren (vertaling plus licht gelokaliseerd). Tot die er is, is de juiste tussenstand: /en/blog/<slug> canonicaliseert naar de NL-versie (zoals nu), zodat er geen duplicate-straf is. Zodra de EN-content bestaat, krijgt de EN-URL zijn eigen canonical en eigen hreflang-paar.

## Mechanische quick-wins die nu wel kunnen (website, los van de Hub)

Deze zijn klein en veilig, maar het zijn randverbeteringen, niet de hoofdzaak:
1. hreflang expliciet in generateMetadata van blog/[slug] zetten (nu alleen in sitemap), zodat elke pagina zelf zijn taalrelatie aangeeft.
2. De `source`-vermelding: waar een dispatch een echte externe bron heeft, die tonen en als uitgaande link opnemen, niet stevin.ai naar zichzelf. (Vereist data-correctie in de pipeline-output, niet puur code.)
3. Author-schema versterken: per editorial een echte Person met profielpagina (EEAT). Nu valt alles terug op Organization "Stevin".
4. Sitemap: voor dispatches changeFrequency op "never" of een verre datum zetten zodra ze statisch zijn, zodat crawl-budget naar de pillars gaat.

## Prioritering

1. Hoogste impact, meeste werk: content-dunheid aanpakken (snoeien plus pillars). Redactie plus Hub-pipeline. Dit is 80 procent van de winst.
2. Middel: echte EN-vertaling via de pipeline, dan hreflang-paren goedzetten.
3. Laag, snel: de 4 mechanische quick-wins hierboven.

## Wat ik expliciet NIET aanraad

- Geen energie in nog meer schema of een uitgebreidere llms.txt. Google zegt zelf dat het niet de hefboom is, en het Journal heeft het al.
- Niet content herschrijven puur voor AI. Schrijf voor de lezer met een eigen hoek, de AI-vindbaarheid volgt daaruit.
- Niet meer losse navertel-dispatches bijpompen om volume te maken. Dat verlaagt het gemiddelde en kan onder de scaled-content-abuse-policy vallen.
