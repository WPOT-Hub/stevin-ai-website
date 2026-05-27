import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Link } from '@/i18n/navigation'
import { articles, getArticle, getRelatedArticles, type Article } from '@/data/articles'
import { getArticleFaqs } from '@/data/faqs'
import ReadingProgress from '@/components/blog/ReadingProgress'

export async function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const a = getArticle(slug)
  if (!a) return {}
  // Per-post OG image (Next.js conventional route, gegenereerd door
  // app/[locale]/blog/[slug]/opengraph-image.tsx)
  const ogImage = `https://stevin.ai/blog/${a.slug}/opengraph-image`
  return {
    title: `${a.title} | Stevin Journal`,
    description: a.dek,
    openGraph: {
      type: 'article',
      title: a.title,
      description: a.dek,
      publishedTime: a.publishedAt,
      modifiedTime: a.updatedAt ?? a.publishedAt,
      authors: [a.author.name],
      images: [{ url: ogImage, width: 1200, height: 630, alt: a.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: a.title,
      description: a.dek,
      images: [ogImage],
    },
    alternates: {
      canonical: `https://stevin.ai/blog/${a.slug}`,
    },
  }
}

const dateNL = (iso: string) => {
  const d = new Date(iso)
  return d
    .toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' })
    .toUpperCase()
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>
}) {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) notFound()

  const related = getRelatedArticles(article.slug)
  // Author = Person als de naam expliciet een mens is, anders Organization.
  // Default 'Stevin Journal' wordt nog steeds als Organization gepubliceerd
  // omdat het de redactie als geheel is. Per-auteur Person-schema komt
  // wanneer auteurs een eigen profielpagina krijgen (EEAT-versterking).
  const isPersonAuthor =
    article.author.name !== 'Stevin Journal' && article.author.name !== 'Stevin'
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.dek,
    image: `https://stevin.ai/blog/${article.slug}/opengraph-image`,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt ?? article.publishedAt,
    author: isPersonAuthor
      ? { '@type': 'Person', name: article.author.name, jobTitle: article.author.role }
      : { '@type': 'Organization', name: 'Stevin' },
    publisher: {
      '@type': 'Organization',
      name: 'Stevin',
      logo: { '@type': 'ImageObject', url: 'https://stevin.ai/icon.svg' },
    },
    mainEntityOfPage: `https://stevin.ai/blog/${article.slug}`,
  }

  // FAQPage schema: alleen wanneer er FAQs voor deze slug zijn gegenereerd.
  // Doel: LLM-citation. Perplexity en ChatGPT gebruiken FAQPage als
  // primaire structured-context bij retrieval. Ook bij blog-content zonder
  // rich-result (Google geeft FAQ rich results alleen aan authority sites)
  // helpt het schema voor AI-search.
  const articleFaqs = getArticleFaqs(article.slug)
  const faqSchema = articleFaqs
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: articleFaqs.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: { '@type': 'Answer', text: f.answer },
        })),
      }
    : null

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://stevin.ai',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Journal',
                item: 'https://stevin.ai/blog',
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: article.title,
                item: `https://stevin.ai/blog/${article.slug}`,
              },
            ],
          }),
        }}
      />
      <ReadingProgress />

      {/* ── ARTICLE HEADER (text-only, editorial) ── */}
      <header className="bg-[var(--navy)] text-white" style={{ padding: '64px 24px 56px' }}>
        <div className="mx-auto" style={{ maxWidth: '880px' }}>
          {/* Trail */}
          <nav
            className="flex items-center gap-3 mb-7"
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '11px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.55)',
            }}
          >
            <Link
              href="/blog"
              className="text-white/55 hover:text-white transition-colors no-underline"
            >
              Journal
            </Link>
            <span className="opacity-40">/</span>
            <span style={{ color: 'var(--accent-light)' }}>{article.category}</span>
            <span className="opacity-40">/</span>
            <span>Editie {article.edition}</span>
          </nav>

          {/* H1 */}
          <h1
            className="font-display font-extrabold text-white m-0 mb-6"
            style={{
              fontSize: 'clamp(36px, 4.6vw, 60px)',
              lineHeight: '1.06',
              letterSpacing: '-0.03em',
              textWrap: 'balance',
              maxWidth: '22ch',
            }}
          >
            {article.title}
          </h1>

          {/* Dek */}
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '19px',
              lineHeight: '1.5',
              color: 'rgba(255,255,255,0.78)',
              maxWidth: '56ch',
              margin: '0 0 32px',
              fontWeight: 300,
              textWrap: 'pretty' as const,
            }}
          >
            {article.dek}
          </p>

          {/* Byline */}
          <div
            className="flex items-center gap-3.5 pt-5 flex-wrap"
            style={{ borderTop: '1px solid rgba(255,255,255,0.12)' }}
          >
            <span
              className="font-display"
              style={{ fontSize: '13px', fontWeight: 600, color: '#fff', letterSpacing: '-0.005em' }}
            >
              <strong className="font-extrabold">{article.author.name}</strong>{' '}
              <span style={{ color: 'rgba(255,255,255,0.55)', fontWeight: 400 }}>
                · {article.author.role}
              </span>
            </span>
            <div
              className="ml-auto flex gap-3.5"
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '11px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.55)',
              }}
            >
              <span>{dateNL(article.publishedAt)}</span>
              <span
                style={{
                  width: '4px',
                  height: '4px',
                  borderRadius: '999px',
                  background: 'rgba(255,255,255,0.4)',
                  alignSelf: 'center',
                }}
              />
              <span>{article.readMinutes} MIN LEZEN</span>
            </div>
          </div>
        </div>
      </header>

      {/* ── BODY ── */}
      <article className="bg-white" style={{ padding: '80px 24px 96px' }}>
        <div className="mx-auto journal-body" style={{ maxWidth: '680px' }}>
          {/* Article-specific body: switch on slug + format */}
          {article.format === 'dispatch' && <ArticleDispatchBody article={article} />}
          {article.format === 'editorial' && article.slug === '95-procent-ai-pilots-mislukt' && (
            <ArticleMITBody />
          )}
          {article.format === 'editorial' && article.slug === 'autonome-agents-90-dagen' && (
            <ArticleAgentsBody />
          )}
          {article.format === 'editorial' && article.slug === 'last-click-is-een-gewoonte' && (
            <ArticleLastClickBody />
          )}
          {article.format === 'editorial' && article.slug === 'mmm-is-een-hypothese' && (
            <ArticleMMMBody />
          )}
          {article.format === 'editorial' && article.slug === 'beste-transcriptietool-2026' && (
            <ArticleTranscriptToolsBody />
          )}
          {article.format === 'editorial' && article.slug === 'wk-2026-campagne-data-voorbereiding' && (
            <ArticleWKBody />
          )}
          {article.format === 'editorial' && article.slug === 'ai-cowboys-marketing-2026' && (
            <ArticleAIcowboysBody />
          )}
          {article.format === 'editorial' && article.slug === 'ai-tools-organisatielaag-marketing' && (
            <ArticleOrglaagBody />
          )}
          {article.format === 'editorial' &&
            article.slug !== '95-procent-ai-pilots-mislukt' &&
            article.slug !== 'autonome-agents-90-dagen' &&
            article.slug !== 'last-click-is-een-gewoonte' &&
            article.slug !== 'mmm-is-een-hypothese' &&
            article.slug !== 'beste-transcriptietool-2026' &&
            article.slug !== 'ai-cowboys-marketing-2026' &&
            article.slug !== 'ai-tools-organisatielaag-marketing' &&
            article.slug !== 'wk-2026-campagne-data-voorbereiding' && (
              <ArticleStubBody article={article} />
            )}
        </div>
      </article>

      {/* ── MORE FROM JOURNAL ── */}
      <section
        className="bg-[var(--surface)]"
        style={{ padding: '96px 24px', borderTop: '1px solid var(--border)' }}
      >
        <div className="mx-auto" style={{ maxWidth: '1200px' }}>
          <div className="flex justify-between items-baseline mb-10">
            <h3
              className="font-display font-bold text-[var(--navy)] m-0"
              style={{ fontSize: '26px', letterSpacing: '-0.02em' }}
            >
              Meer uit het Journal
            </h3>
            <Link
              href="/blog"
              className="font-display font-semibold text-[var(--accent)] no-underline"
              style={{ fontSize: '14px' }}
            >
              Alle edities →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {related.map((r) => (
              <Link key={r.slug} href={`/blog/${r.slug}`} className="block no-underline text-inherit group">
                <div
                  className="overflow-hidden mb-[18px]"
                  style={{ aspectRatio: '16 / 10', borderRadius: '10px' }}
                >
                  <Poster style={r.posterStyle} tag={r.posterTag} topic={r.posterTopic} />
                </div>
                <div
                  className="mb-2.5"
                  style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '10px',
                    letterSpacing: '0.10em',
                    textTransform: 'uppercase',
                    color: 'var(--muted)',
                  }}
                >
                  EDITIE {r.edition} · {r.readMinutes} MIN
                </div>
                <h4
                  className="font-display font-bold text-[var(--navy)] m-0 group-hover:text-[var(--accent)] transition-colors"
                  style={{
                    fontSize: '19px',
                    lineHeight: '1.25',
                    letterSpacing: '-0.015em',
                    textWrap: 'balance',
                  }}
                >
                  {r.title}
                </h4>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

/* ────────────────────────────────────────────────────────────
   Poster (visual card on related/list)
   ──────────────────────────────────────────────────────────── */
function Poster({
  style,
  tag,
  topic,
}: {
  style: 'solid' | 'gradient' | 'surface'
  tag: string
  topic: string
}) {
  const bgStyle =
    style === 'gradient'
      ? 'linear-gradient(135deg, var(--navy) 0%, var(--navy-light) 100%)'
      : style === 'surface'
      ? 'var(--surface-alt, #E8EFF7)'
      : 'var(--navy)'
  const txtColor = style === 'surface' ? 'var(--navy)' : '#fff'
  const tagBg = style === 'surface' ? 'var(--navy)' : 'rgba(255,255,255,0.94)'
  const tagColor = style === 'surface' ? '#fff' : 'var(--navy)'
  const border = style === 'surface' ? '1px solid var(--border)' : 'none'
  return (
    <div
      className="w-full h-full p-[22px] flex flex-col justify-between"
      style={{ background: bgStyle, color: txtColor, border }}
    >
      <span
        style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '10px',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          background: tagBg,
          color: tagColor,
          padding: '5px 10px',
          borderRadius: '4px',
          alignSelf: 'flex-start',
        }}
      >
        {tag}
      </span>
      <span
        className="font-display font-extrabold"
        style={{
          fontSize: '22px',
          lineHeight: '1.1',
          letterSpacing: '-0.02em',
          maxWidth: '14ch',
        }}
      >
        {topic}
      </span>
    </div>
  )
}

/* ────────────────────────────────────────────────────────────
   Article body: MIT NANDA piece
   ──────────────────────────────────────────────────────────── */
function ArticleMITBody() {
  return (
    <>
      <p className="lead-para">
        Het cijfer 95% klinkt als clickbait. Toch komt het uit een serieus rapport: het
        NANDA-onderzoek van MIT, april 2026, waarin 312 generative-AI pilots in
        marketingorganisaties zijn gevolgd over twaalf maanden. De kop is niet onjuist. Maar de
        oorzaak ligt niet waar je hem verwacht.
      </p>

      <BodyFigure
        tag="MIT · 2026"
        stat="95%"
        statCap="van de gen-AI pilots haalt nooit de productie-fase. Niet door het model. Door de meetstructuur."
        edition="EDITIE 014 / 052 · ONDERZOEK"
        source="Bron: NANDA, MIT (april 2026)"
      />
      <p className="body-figure-cap">
        Visualisatie op basis van het NANDA-rapport. Cijfer afgerond. Werkelijke meting: 94,7% van
        geanalyseerde pilots.
      </p>

      <p>
        Het modale verhaal in de pers en op LinkedIn: AI is overhyped, modellen falen,
        hallucinaties, etcetera. Het rapport zegt iets fundamenteel anders.{' '}
        <strong>De modellen werken</strong>. In 88% van de pilots leverden ze meetbare output binnen
        vier weken. Wat faalt, zit eronder.
      </p>

      <H2 num="01">Het probleem zit niet in het model</H2>

      <p>
        De onderzoekers groeperen de mislukkingen in drie categorieën, en exact één daarvan gaat
        over modelkwaliteit. De andere twee, samen goed voor 81% van de pilots, gaan over iets
        anders: niemand weet of het werkt.
      </p>

      <Takeaways
        label="DE DRIE FAALPATRONEN"
        title="Waar pilots vastlopen, volgens NANDA"
        items={[
          {
            pct: '14%',
            text: (
              <>
                <b>Modelkwaliteit.</b> Output niet bruikbaar of consistent genoeg voor productie.
              </>
            ),
          },
          {
            pct: '34%',
            text: (
              <>
                <b>Geen baseline.</b> Pilot werd uitgerold zonder referentie, dus &quot;werkt het&quot; was
                niet te beantwoorden.
              </>
            ),
          },
          {
            pct: '47%',
            text: (
              <>
                <b>Geen feedback-loop.</b> Output ging live, maar werd niet teruggekoppeld naar P&amp;L
                of conversie.
              </>
            ),
          },
        ]}
      />

      <p>
        Lees dat tweede en derde punt nog eens. Bij elkaar:{' '}
        <strong>81% van de pilots faalt op meetinfrastructuur, niet op intelligence</strong>. Het
        model schreef de ad-copy. Niemand kon vertellen of die copy meer of minder verkocht dan de
        oude.
      </p>

      <PullQuote
        text='"Het is niet dat AI niet werkt. Het is dat we niet weten of hij werkt, en dat is een andere diagnose, met een andere oplossing."'
        cite="uit het redactie-handboek"
      />

      <H2 num="02">Waarom dit een meetlat-vraagstuk is</H2>

      <p>
        In de marketingafdelingen die wij maandelijks zien (bureaus, in-house teams, fractional
        CMO&apos;s): het patroon hetzelfde. Een team koopt een tool. De tool produceert iets. Het
        dashboard van de tool laat zien dat het &quot;werkt&quot;. Maar de CRM-cijfers, de echte
        conversies, de werkelijke pijplijn: die zijn ergens anders. Op een ander platform. In een
        andere week. Door een andere persoon onderhouden.
      </p>

      <p>
        Het MIT-rapport noemt dit &quot;the attribution gap&quot;. Wij noemen het al jaren{' '}
        <em>de meetlat-discrepantie</em>: het verschil tussen wat een platform{' '}
        <strong>zegt</strong> dat het oplevert, en wat je in je P&amp;L <strong>terugziet</strong>.
      </p>

      <Callout
        big="3,4×"
        label="Volgens het rapport overdrijven gen-AI tools hun eigen impact gemiddeld met een factor 3,4. Gemeten tegen onafhankelijke uplift-tests."
      />

      <h3>Een korte denkoefening</h3>

      <p>
        Stel je hebt €50.000 per maand aan AI-gegenereerde social ads laten draaien, drie maanden
        lang. Het Meta-dashboard zegt: ROAS 4,1. De vendor-tool zegt: +18% efficiency. Je marketing
        director is tevreden.
      </p>

      <p>
        Nu de vraag die niemand stelt:{' '}
        <strong>wat zou er zijn gebeurd als die €150k níét was uitgegeven?</strong> Geen
        0%-conversie. Er waren nog organische leads, klantretentie, return-traffic. Misschien had je
        80% van diezelfde resultaten ook zonder die ads gehaald. Misschien 60%. Niemand weet het,
        want niemand heeft een geo-test, een holdout-groep of een uplift-meting opgezet.
      </p>

      <p>
        Dat is geen AI-probleem. Dat is een <strong>meetinfrastructuur</strong>-probleem. AI heeft
        het alleen op scherp gezet, omdat AI-tools makkelijker overdrijven dan een handmatig
        opgezette campagne.
      </p>

      <H2 num="03">Wat moet je vragen vóór je tekent?</H2>

      <p>
        Wij gebruiken intern een lijstje van vier vragen. Stel ze aan elke vendor. Als ze er drie of
        meer ontwijken, loop je weg.
      </p>

      <ol>
        <li>
          <strong>Op welke baseline meten we de uplift?</strong> Niet &quot;het dashboard van de
          tool&quot;, maar een externe baseline (CRM, P&amp;L, of een holdout-segment).
        </li>
        <li>
          <strong>Hoe vaak ga je een geo-test of holdout-meting toelaten?</strong> Een serieuze
          vendor zegt: maandelijks. Een onserieuze vendor probeert je dit uit te praten.
        </li>
        <li>
          <strong>Wat gebeurt er met je dashboard als ik een week lang de campagne uitzet?</strong>{' '}
          Het juiste antwoord is: dat moet zichtbaar worden in een uplift-grafiek. Het foute antwoord
          is: &quot;dat raden we af&quot;.
        </li>
        <li>
          <strong>Wie bezit de meetdata?</strong> Als de vendor zegt &quot;wij&quot;, of
          &quot;het is in ons platform geïntegreerd&quot;, heb je geen meetdata. Je hebt een
          marketing-tool met een grafiek erop.
        </li>
      </ol>

      <p>
        Het zijn geen vijandige vragen. Een goede vendor verwelkomt ze. Het is hetzelfde principe
        waarmee Simon Stevin in 1586 schreef dat het wonder geen wonder is. Als je het niet kunt
        herleiden, is het geen feit, maar een verhaal.
      </p>

      <PullQuote text='"Wonder en is gheen wonder."' cite="Simon Stevin, 1586. Nog steeds het uitgangspunt." />

      <H2 num="04">De praktische conclusie</H2>

      <p>
        Het MIT-rapport is geen AI-bashing. Het is een meetlat-rapport, alleen niet als zodanig
        benoemd. De uitkomst is hoopvoller dan het percentage suggereert: de modellen werken. Wat we
        missen is de infrastructuur eromheen: een baseline, een feedback-loop, een onafhankelijke
        causale meting.
      </p>

      <p>
        Dat klinkt saai. Het is ook saai. Maar het is wel de reden dat 5% van de pilots wél schaalt
        naar productie, en dat die 5% gemiddeld een <strong>4,2× hogere ROI</strong> haalt dan
        handmatig opgezette campagnes. De technologie is niet het verschil. De meetstructuur is dat.
      </p>

      <p>
        Als je serieus gaat investeren in AI-marketing, investeer dan eerst in iets veel onsexier:
        weten of het werkt.
      </p>

      <EndRule />
      <EndSig>&quot;Het is geen wonder. Het is Stevin.&quot; · Editie 014 / 052</EndSig>
    </>
  )
}

/* ────────────────────────────────────────────────────────────
   Editie 011: MMM is een hypothese
   ──────────────────────────────────────────────────────────── */
function ArticleMMMBody() {
  return (
    <>
      <p className="lead-para">
        Een Marketing Mix Model is geen rapport. Het is een statistisch model dat een hypothese uitspreekt over hoe historische sales en mediadata het beste samenhangen. De output (decomposition charts, response curves, ROI per kanaal) ziet eruit als een rapport. Maar onder de motorkap zit een schatting met intervallen, aannames en priors. Wie dat onderscheid niet leest, koopt false confidence in plaats van inzicht.
      </p>

      <BodyFigure
        tag="GARTNER · 2025"
        stat="MMM"
        statCap='Volgens Gartner is MMM &quot;a statistical technique used to measure the impact of marketing activities on sales performance&quot;. Een techniek, niet een rapport. Bron: Gartner Marketing Mix Modeling guide (2025).'
        edition="EDITIE 011 / 052 · ATTRIBUTION"
        source="Bron: Gartner, Marketing Mix Modeling guide (2025)"
      />

      <p>
        Het verschil zit in vijf woorden. Een rapport zegt: dit is wat is gebeurd. Een MMM zegt: dit is mijn beste schatting van wat is gebeurd, onder de aannames die ik heb gemaakt, met deze onzekerheid. Beide zijn nuttig. Alleen: voor een budget-besluit van vijf ton is het verschil tussen die twee precies het verschil tussen winnen en verliezen.
      </p>

      <H2 num="01">Wat een MMM in feite zegt</H2>

      <p>
        Een MMM neemt twee à drie jaar wekelijkse data over sales en mediabestedingen, plus controle-variabelen voor seizoen, prijs, promotie, weer, concurrentie en macro-economie. Het model probeert vervolgens te schatten welke combinatie van inputs het beste de variatie in sales verklaart. Output: een decomposition (welk percentage van sales komt waarschijnlijk uit welk kanaal), een response curve per kanaal (waar zit diminishing returns), en een marginale ROI-schatting per kanaal.
      </p>

      <p>
        Cruciaal: elk getal in die output heeft een interval. Een goed MMM zegt niet &quot;Google Ads droeg 28 procent bij&quot;. Het zegt &quot;de mediaan-schatting is 28 procent, met een 80-procent geloofwaardigheidsinterval tussen 19 en 36 procent&quot;. Dat interval is geen detail. Het is de kernboodschap. Hoe groter het interval, hoe minder het model echt weet.
      </p>

      <PullQuote
        text='"Een MMM zegt niet wat search opbracht. Hij zegt: dit is mijn beste schatting onder mijn aannames, met deze onzekerheid."'
        cite="Stevin Journal, redactie."
      />

      <H2 num="02">Wat consultants ervan maken</H2>

      <p>
        Het probleem zit zelden in het model. Het zit in de slide die het model omzet in een uitspraak. De interval verdwijnt. Het wordt &quot;Google Ads = 28 procent van sales&quot;. De verzameling priors waarmee het model is opgestart, wordt nergens benoemd. De gevoeligheidsanalyse (wat gebeurt er met de output als de prior 5 procent omhoog of omlaag schuift) ontbreekt vaak.
      </p>

      <p>
        Drie patronen zien we het vaakst. Eén: een model dat met een sterke prior is opgestart en te weinig data heeft om die prior te overrulen. De output reflecteert dan vooral wat de modelbouwer al dacht. Twee: een decomposition die nooit is gekalibreerd met een echte uplift-test. Het model zegt search levert X op, niemand heeft ooit een geo-test gedaan om dat te verifiëren. Drie: response curves die als feit worden gepresenteerd terwijl de data alleen het lineaire stuk dekt en de saturation-curve dus extrapolatie is.
      </p>

      <Callout
        big="2y"
        label='Minimum aan wekelijkse data dat Google adviseert voor Meridian-modellen op geo-niveau. Voor national-level: 3 jaar. Onder die drempel wordt de schatting onbetrouwbaar, niet omdat het model slecht is, maar omdat er onvoldoende variatie zit om de parameters te identificeren. Bron: developers.google.com/meridian.'
      />

      <H2 num="03">Wanneer is een MMM wel nuttig</H2>

      <p>
        MMM beantwoordt één type vraag goed: hoe moeten we ons mediabudget over de komende periode verdelen, gegeven wat we historisch hebben gezien en gegeven wat onafhankelijke experimenten ons hebben verteld over kanaalspecifieke uplift. Dat is een budget-allocatievraag op kwartaal- of jaarbasis, niet een dagelijkse optimalisatievraag.
      </p>

      <Takeaways
        label="WAAR MMM HOORT"
        title="Drie vragen waar MMM goed in is"
        items={[
          {
            pct: '01',
            text: (
              <>
                <b>Budget-allocatie over kanalen.</b> Bij budgetten boven enkele miljoenen per jaar over vijf of meer kanalen. Bij kleinere budgetten domineert ruis de schatting.
              </>
            ),
          },
          {
            pct: '02',
            text: (
              <>
                <b>Diminishing returns per kanaal.</b> Waar zit de saturation? Het model schat een response curve. Met experiment-kalibratie wordt die curve serieuzer dan zonder.
              </>
            ),
          },
          {
            pct: '03',
            text: (
              <>
                <b>Effect van externe factoren.</b> Hoeveel van de Q4-piek kwam door seizoen, hoeveel door advertising? Dit is precies wat MMM wel kan en wat last-click of platformdata structureel mist.
              </>
            ),
          },
        ]}
      />

      <H2 num="04">Wanneer levert het false confidence</H2>

      <p>
        Vier signalen dat een MMM-output meer onzekerheid bevat dan de slide laat zien. Wie deze niet checkt, koopt een grafiek, geen analyse.
      </p>

      <Takeaways
        label="DE VIER ROODBRAND-LICHTEN"
        title="Wat je vraagt voordat je een MMM gelooft"
        items={[
          {
            pct: '01',
            text: (
              <>
                <b>Geen intervallen.</b> Decomposition zonder geloofwaardigheidsinterval per kanaal: dit is een rapportage-grafiek, geen modeloutput. Vraag het interval expliciet.
              </>
            ),
          },
          {
            pct: '02',
            text: (
              <>
                <b>Geen experiment-kalibratie.</b> Het model is nooit getoetst aan een geo-test, holdout of conversion lift-experiment. De priors zijn dan geleund op domeinexpertise (lees: een mening), niet op gemeten uplift.
              </>
            ),
          },
          {
            pct: '03',
            text: (
              <>
                <b>Geen sensitivity-analyse.</b> Hoe verandert de output als je een prior 5 procent omhoog of omlaag schuift? Als de output dramatisch beweegt, weet het model in feite weinig en reflecteert het vooral de input.
              </>
            ),
          },
          {
            pct: '04',
            text: (
              <>
                <b>Te veel kanalen, te weinig data.</b> Google adviseert voor Meridian maximaal 20 kanalen. Sommige bureau-MMM&apos;s draaien 50+ kanalen op dezelfde dataset. Dat is statistisch niet identificeerbaar: het model raadt.
              </>
            ),
          },
        ]}
      />

      <h3>Open source verandert de drempel, niet de discipline</h3>

      <p>
        Google Meridian (open source MMM-framework, beschikbaar sinds 2024) verlaagt de prijs van software naar nul. Dat haalt het oude bezwaar &quot;te duur bureau&quot; deels weg. Maar het verandert niets aan de datavereisten (minimaal 2 jaar wekelijkse data), het maximumaantal kanalen (~20), de noodzaak tot experiment-kalibratie, of de leesvaardigheid om intervallen te interpreteren.
      </p>

      <p>
        De marktshift is dus niet &quot;MMM wordt makkelijk&quot;. Het is &quot;de toegang tot serieuze MMM is gedemocratiseerd, maar serieuze MMM blijft serieus werk&quot;. Wie Meridian draait zonder te kalibreren met experimenten, krijgt dezelfde false confidence als een bureau-MMM zonder kalibratie. Het verschil is de prijs van de licentie, niet de kwaliteit van de schatting.
      </p>

      <H2 num="05">De praktische conclusie</H2>

      <p>
        Behandel de MMM-output zoals je een rapport van een onderzoeker behandelt. Niet als feit. Als hypothese-generator. Het model zegt: &quot;volgens mij ligt de waarheid hier&quot;. Daarna doe je experimenten om te testen of die hypothese klopt.
      </p>

      <p>
        Concreet: pak de drie kanalen waar het MMM het sterkste effect schat. Zet daar een uplift-test op (geo, holdout, audience-split). Als de gemeten uplift binnen het MMM-interval valt, bevestigt het experiment het model. Als de uplift buiten het interval valt, weet je dat het model iets mist en moet je de priors of de specificatie herzien.
      </p>

      <p>
        Een MMM die niet wordt getoetst aan experimenten, is een verhaal in een grafiek. Met experimenten is het een meetinstrument. Het verschil zit in twee tot vier kalibratie-tests per jaar. Dat is hetzelfde principe waar Stevin in 1586 al voor stond: als je het niet kunt herleiden, is het geen feit.
      </p>

      <EndRule />
      <EndSig>&quot;Wonder en is gheen wonder.&quot; · Editie 011 / 052</EndSig>
    </>
  )
}

/* ────────────────────────────────────────────────────────────
   Editie 012: Last-click is geen attributiemodel
   ──────────────────────────────────────────────────────────── */
function ArticleLastClickBody() {
  return (
    <>
      <p className="lead-para">
        De meeste marketingteams weten dat last-click niet klopt. Toch staat het op het dashboard van maandagochtend, in de bureau-rapportage van vrijdagmiddag, en in de finance-export van eind kwartaal. De reden is zelden inhoudelijk. Last-click meet niet wat werkt; het meet wat als laatste meetbaar was. Dat is geen attributiemodel. Het is een gewoonte.
      </p>

      <BodyFigure
        tag="GARTNER · 2025"
        stat="7,7%"
        statCap="Aandeel van de bedrijfsomzet dat marketingbudgetten in 2025 uitmaken. Vlak ten opzichte van 2024. Volgens Gartner CMO Spend Survey, mei 2025."
        edition="EDITIE 012 / 052 · METHODE"
        source="Bron: Gartner 2025 CMO Spend Survey (12 mei 2025)"
      />

      <p>
        Bij vlakke budgetten groeit de druk om effect te bewijzen. En in die druk pakt elk team het meetmodel dat elke week een getal levert, niet het model dat de beste beslissing ondersteunt. Daar zit de kern van het probleem.
      </p>

      <H2 num="01">Wat last-click meet, en wat niet</H2>

      <p>
        Stel: iemand ziet drie weken lang advertenties op YouTube, LinkedIn en display. Daarna typt diegene je merknaam in Google, klikt op een branded search-advertentie en koopt. Last-click zegt: search leverde de conversie. Branded search krijgt het credit, het budget en de bonus.
      </p>

      <p>
        De juiste vraag is een andere: <strong>had deze persoon ook gekocht zonder die laatste klik?</strong> Met andere woorden, was die advertentie vlak voor de aankoop oorzaak van de verkoop, of alleen het laatste meetbare contact? Last-click heeft op die vraag geen antwoord. Het model heeft geen vergelijking, geen referentie, geen counterfactual.
      </p>

      <p>
        Dat is geen academische haarsplitserij. Het verschil tussen &quot;laatste klik&quot; en &quot;oorzaak van verkoop&quot; bepaalt waar het volgende kwartaal-budget heen gaat.
      </p>

      <Callout
        big="500M"
        label="User-experiment-observations en 1,6 miljard ad impressions in 15 Facebook-experimenten. Gordon, Zettelmeyer, Bhargava en Chapsky vonden dat observationele methodes vaak níét hetzelfde effect produceren als gerandomiseerde experimenten, ook na controle voor demografie en gedrag. Marketing Science, INFORMS."
      />

      <p>
        De conclusie van die studie is ongemakkelijk: zelfs met enorme platformdata is causaliteit niet te bepalen zonder een experiment dat een controlegroep meet. Een Meta-rapport van 2.226 experimenten liet daarna zien dat last-click in 12 tot 20 procent van de campagnes tot een andere beslissing leidt dan een echt experiment. Een gemiddelde fout van één op de zes campagnes is veel als je een jaarbudget verdeelt.
      </p>

      <H2 num="02">Waarom het toch blijft</H2>

      <p>
        Last-click verdwijnt niet omdat het past in hoe teams sturen. Performance-marketeers krijgen targets op CPA of ROAS. Kanaalmanagers verdedigen hun eigen budget. Bureaus rapporteren per kanaal. Finance wil een concreet getal in plaats van een interval. Dashboards tonen conversies per bron. Elk van die rollen wordt elke week beloond voor &quot;wat heeft het opgeleverd&quot;, en last-click geeft daar elke week antwoord op.
      </p>

      <p>
        Dat antwoord voelt afrekenbaar. Niet omdat het waar is, maar omdat het meetbaar is. Een uplift-meting die zegt &quot;dit kanaal levert tussen de 14 en 22 procent extra omzet&quot; is wetenschappelijk sterker dan &quot;branded search leverde 412 conversies&quot;, maar bestuurlijk lastiger. Een interval is geen score.
      </p>

      <p>
        Wat we vaak zien: teams die het verschil weten, blijven last-click gebruiken in de weekrapportage en zetten een aparte uplift-test op naast de standaard-stack. Dat is niet ideaal, maar het is realistischer dan een complete cultuuromslag in één kwartaal. Last-click blijft bestaan omdat het in het vergaderritme past, niet omdat iemand het verdedigt.
      </p>

      <H2 num="03">Wat onderzoek wel laat zien</H2>

      <p>
        Drie onderzoekslijnen, alle drie met decennia data eronder, wijzen dezelfde kant op. Niet &quot;last-click is fout&quot;, maar &quot;last-click ziet maar een deel&quot;.
      </p>

      <Takeaways
        label="DE DRIE LIJNEN"
        title="Wat we al twintig jaar weten over hoe marketing wérkt"
        items={[
          {
            pct: '60/40',
            text: (
              <>
                <b>Binet en Field.</b> De IPA-onderzoekers waarschuwen dat zeer korte online-metrics als hoofdmaatstaf gevaarlijk zijn voor lange termijn groei. Hun 60:40-vuistregel: ongeveer 60 procent van marketingbudget naar merkbouw, 40 procent naar activatie, voor de meeste categorieën. Last-click ziet vooral die 40 procent.
              </>
            ),
          },
          {
            pct: 'EBI',
            text: (
              <>
                <b>Ehrenberg-Bass.</b> Merken groeien via penetratie: zoveel mogelijk kopers, makkelijk te herinneren, makkelijk te kopen. Last-click beloont juist de kanalen het dichtst op de kassa (branded search, retargeting, affiliate, vouchers). Die vangen bestaande vraag op, ze creëren weinig nieuwe vraag.
              </>
            ),
          },
          {
            pct: '2%',
            text: (
              <>
                <b>Nielsen.</b> Per kwartaal zonder advertising verliest een merk volgens Nielsen-data 2 procent toekomstige omzet. Herstel duurt drie tot vijf jaar. Doorlopende marketing verklaart 10 tot 35 procent van brand equity. Dat zie je niet terug in een conversie-rapport van vorige week.
              </>
            ),
          },
        ]}
      />

      <p>
        Het patroon: last-click meet vooral oogsten. Het meet slecht wat de oogst groter maakt. Een kanaal kan zwak ogen op directe sales en sterk zijn op merkbouw. Een ander kanaal kan sterk ogen op directe sales en vooral bestaande vraag binnenharken die zonder dat kanaal ook was binnengekomen.
      </p>

      <p>
        Wie alleen op last-click stuurt, verschuift budget vrijwel altijd naar dat tweede type kanaal. Korte termijn lijkt het te werken; lange termijn slijt de vraag-pijplijn waar diezelfde kanalen op leunen. Dat is de boemerang.
      </p>

      <H2 num="04">De stack die wél werkt</H2>

      <p>
        De oplossing is geen vervanging. Het is een gelaagde meetstack waarbij elk model de vraag krijgt waar het goed in is. Vier lagen.
      </p>

      <Takeaways
        label="HET MEETKADER"
        title="Vier lagen, vier vragen"
        items={[
          {
            pct: '01',
            text: (
              <>
                <b>Operationele attributie.</b> Gebruik last-click of platformdata voor korte feedback: tracking werkt, welke zoektermen converteren, welke landingspagina faalt. Operationeel debuggen, niet budget verdelen.
              </>
            ),
          },
          {
            pct: '02',
            text: (
              <>
                <b>Uplift-tests.</b> Geo-test, holdout, audience-split. Vooral op kanalen die last-click structureel overschat: branded search, retargeting, affiliate, voucher-sites, Performance Max met veel brand-traffic. Twee per jaar is een minimum.
              </>
            ),
          },
          {
            pct: '03',
            text: (
              <>
                <b>Marketing Mix Modeling.</b> Voor de budgetvraag: hoe verdelen we over kanalen, tijd, merk en activatie, rekening houdend met seizoen, prijs, promotie en concurrentie. MMM beantwoordt geen dagelijkse vraag, maar de jaarlijkse en kwartaal-vraag.
              </>
            ),
          },
          {
            pct: '04',
            text: (
              <>
                <b>Brand tracking.</b> Spontane bekendheid, overweging, voorkeur, category entry points. Wat last-click niet ziet maar wat Nielsen, Binet en Ehrenberg-Bass koppelen aan toekomstige sales.
              </>
            ),
          },
        ]}
      />

      <h3>Over Meridian, en over &quot;MMM kost te veel&quot;</h3>

      <p>
        De klassieke MMM-bezwaren waren reëel: duur bureau, lange doorlooptijd, jaarlijkse update, weinig actie voor performance-teams. Google&apos;s open source MMM-framework Meridian verandert daar een deel van. De software is gratis, de code is openbaar en aanpasbaar, en het framework is expliciet ontworpen voor causale schatting via onder andere geo-level modeling, reach en frequency, en kalibratie met experiment-resultaten.
      </p>

      <p>
        Maar Meridian vervangt geen werk. Google&apos;s eigen documentatie adviseert minimaal twee jaar wekelijkse data voor geo-level modellen, drie jaar voor national-level. Maximaal 20 kanalen om genoeg variatie te houden. En altijd kalibreren met echte uplift-experimenten, niet alleen met platformdata. Open source haalt het excuus &quot;te duur&quot; deels weg. Het haalt de discipline-vereiste niet weg.
      </p>

      <PullQuote
        text='"Last-click past bij rapporteren. MMM past bij investeren. Een uplift-test past bij twijfelen."'
        cite="Stevin Journal, redactie."
      />

      <H2 num="05">De praktische conclusie</H2>

      <p>
        De vraag is niet of je last-click moet afschaffen. De vraag is: <strong>welke beslissing neem je met welk model?</strong> Een dagrapport mag op last-click. Een kwartaal-budget hoort dat niet te zijn. En de vraag &quot;werkt dit kanaal eigenlijk wel&quot; verdient een uplift-test, geen dashboard-screenshot.
      </p>

      <p>
        Praktisch: degradeer last-click tot wat het is. Een operationeel signaal voor de week. Geen investeringsmodel voor het jaar. Bouw daarbovenop minstens twee uplift-tests per jaar op de kanalen die je het meest budgetteert. En gebruik MMM (open source of bureau) op het moment dat een budget-discussie verder gaat dan vijf procent verschuiving.
      </p>

      <p>
        Het systeem is verkeerd ingericht, niet de marketeers. Een rapportagemodel gebruiken voor investeringsbesluiten is precies waar Stevin in 1586 al voor waarschuwde: als je het niet kunt herleiden, is het geen feit. Het is een verhaal.
      </p>

      <EndRule />
      <EndSig>&quot;Wonder en is gheen wonder.&quot; · Editie 012 / 052</EndSig>
    </>
  )
}

/* ────────────────────────────────────────────────────────────
   Editie 013: Autonome agents in logistiek
   ──────────────────────────────────────────────────────────── */
function ArticleAgentsBody() {
  return (
    <>
      <p className="lead-para">
        DHL liet AI-agents van het Amerikaanse bedrijf HappyRobot vorig jaar honderdduizenden e-mails en miljoenen telefoonminuten per jaar afhandelen, volgens een persbericht van 11 november 2025. Gartner verwacht dat 60 procent van bedrijven met supply-chain-software in 2030 zulke agentic AI gebruikt. Vandaag is dat 5 procent. Tussen die twee cijfers ligt het echte verhaal.
      </p>

      <BodyFigure
        tag="DHL · 2025"
        stat="100k+"
        statCap="e-mails per jaar door één agent. Plus miljoenen telefoonminuten. Volgens DHL Group, persbericht 11 november 2025."
        edition="EDITIE 013 / 052 · AI &amp; AGENTS"
        source="Bron: DHL Group press release (11 november 2025)"
      />

      <p>
        Datzelfde Gartner publiceerde een maand later iets minder hoopvols: meer dan 40 procent van agentic-AI-projecten wordt vóór eind 2027 afgeblazen. Te dure pilots, te onduidelijke business cases, te zwakke risk-controls. De realiteit ligt ergens tussen de belofte en de teleurstelling, en het verschil zit niet in de modellen.
      </p>

      <H2 num="01">Wat een agent in DHL&apos;s warehouse écht doet</H2>

      <p>
        DHL Supply Chain noemt drie taken letterlijk in het persbericht: &quot;appointment scheduling, driver follow-up calls, and high-priority warehouse coordination&quot;. Vrij vertaald: afspraken inplannen met chauffeurs, achteraan e-mailen wanneer een rit niet op tijd binnenkomt, en bij urgente magazijn-issues de juiste mensen op de juiste plek krijgen. Werk dat normaal aan een planner of dispatcher hangt, en dat normaal in losse e-mails, telefoontjes en WhatsApp-berichten verzandt.
      </p>

      <p>
        Het verschil met een dashboard zit in drie dingen. Een dashboard <strong>toont</strong>; een agent <strong>handelt</strong>. Een dashboard wacht op input; een agent leest een binnenkomende e-mail of voicemail en weet wat er staat. En een dashboard rapporteert achteraf; een agent praat terug, via dezelfde kanalen waar de chauffeur of klant al op zit.
      </p>

      <p>
        HappyRobot, het bedrijf achter de DHL-agents, haalde in september 2025 $44 miljoen op en heeft volgens Reuters meer dan 70 enterprise-klanten, waaronder ook Ryder en Flexport. FedEx loopt iets minder ver maar mikt op meer dan de helft van zijn kernprocessen in agent-handen tegen 2028: network planning, customs clearance (al deels live), shipment coordination en customer support.
      </p>

      <PullQuote
        text='"De agent rijdt geen vrachtwagen. Hij zorgt dat de vrachtwagen niet stilstaat."'
        cite="Stevin Journal, redactie."
      />

      <H2 num="02">De drie cijfers die ertoe doen</H2>

      <p>
        Drie cijfers van Gartner en Bain vertellen samen het hele verhaal. Eén los geeft of marketing of doemdenken.
      </p>

      <Takeaways
        label="HET RAAMWERK"
        title="Wat agentic AI in 2030 wordt, en wat het in 2027 niet wordt"
        items={[
          {
            pct: '60%',
            text: (
              <>
                <b>De richting.</b> Aandeel bedrijven met supply-chain-software dat in 2030 agentic AI gebruikt. Vandaag 5 procent. (Gartner, mei 2025.)
              </>
            ),
          },
          {
            pct: '40%',
            text: (
              <>
                <b>De realiteit.</b> Aandeel agentic-AI-projecten dat vóór eind 2027 wordt afgeblazen door kosten, zwakke business case of onvoldoende controle. (Gartner, juni 2025.)
              </>
            ),
          },
          {
            pct: '41%',
            text: (
              <>
                <b>De waarheid in het midden.</b> Aandeel bedrijven dat positieve ROI haalt binnen twaalf maanden na een agent-deployment. 19 procent bereikt het nooit. (Bain, 2026.)
              </>
            ),
          },
        ]}
      />

      <p>
        Lees die 41 procent nog eens. Minder dan de helft van wie aan een agent begint, krijgt het binnen een jaar terugverdiend. Dat is geen verdoemenis. Het zegt dat een agent een serieuze investering is met een duidelijk faalpercentage, geen plug-and-play. Wie zonder strakke executie begint, zit waarschijnlijk in de 59 procent.
      </p>

      <H2 num="03">Wat je over 90 dagen meet</H2>

      <p>
        Negentig dagen is kort genoeg om snel duidelijk te krijgen of een agent werkt, en lang genoeg om voorbij de honeymoon-fase te kijken. Vier meetpunten zijn niet onderhandelbaar.
      </p>

      <Takeaways
        label="HET MEETKADER"
        title="Vier dingen die je elke twee weken meet"
        items={[
          {
            pct: '01',
            text: (
              <>
                <b>Latency.</b> Hoe snel reageert de agent op input? In seconden, niet in &quot;binnen werktijd&quot;. Een afspraakverzoek dat vier uur blijft liggen had een mens ook kunnen doen.
              </>
            ),
          },
          {
            pct: '02',
            text: (
              <>
                <b>Override-rate.</b> Hoe vaak grijpt een mens alsnog in om de output te corrigeren? Hoog cijfer betekent: de agent kost extra werk, niet minder.
              </>
            ),
          },
          {
            pct: '03',
            text: (
              <>
                <b>Exception-rate.</b> Hoe vaak escaleert de agent zélf naar een mens omdat &apos;ie het niet snapt? Een gezond cijfer ligt tussen 5 en 15 procent. Hoger: te ambitieus ingericht.
              </>
            ),
          },
          {
            pct: '04',
            text: (
              <>
                <b>Payback.</b> Aantal bespaarde uren maal interne uurprijs, gedeeld door maandelijkse vendor-fee plus integratie-uren. Onder 1 betaal je om er extra werk bij te krijgen.
              </>
            ),
          },
        ]}
      />

      <h3>De Convoy-les</h3>

      <p>
        In oktober 2023 ging Convoy dicht. Het Amerikaanse digitale freight-bedrijf had meer dan een miljard dollar opgehaald, een prima technologie-stack en een net AI-team. Wat het niet had: vrachtwagens, drop networks of exclusieve capaciteit. Toen de markt omsloeg, was er geen fysieke hefboom om op terug te vallen. De technologie was niet het probleem; het ontbreken van een operationeel netwerk eromheen was dat wel.
      </p>

      <p>
        Voor wie in 2026 een agent-pilot start: koppel de agent aan een bestaand proces dat al draait. Geen nieuwe business unit, geen apart team, geen apart budget. Een agent vergroot een bestaand systeem of vervangt een bestaand stuk werk. Hij vervangt geen markt.
      </p>

      <Callout
        big="~130"
        label='Aantal vendors dat volgens Gartner echt "agentic AI" levert. Uit duizenden die de term gebruiken. De rest noemt RPA en chatbots opnieuw "agent".'
      />

      <p>
        Gartner noemt het &quot;agent washing&quot;. Het is de versie van AI-washing die op dit moment plaatsvindt, en het maakt vendor-selectie het belangrijkste deel van een 90-dagen-pilot. Onder de oppervlakte zitten dan vaak workflow-tools die in 2019 al bestonden, met een nieuw frontje.
      </p>

      <H2 num="04">De praktische conclusie</H2>

      <p>
        De vraag voor 2026 is niet &quot;agents wel of niet&quot;. De richting (5 procent in 2025, 60 procent in 2030, volgens Gartner) is duidelijk genoeg. De vraag is: <strong>welke smalle taak bewijst zich in 90 dagen, met welke vendor, en wat is de meetlat?</strong>
      </p>

      <p>
        DHL koos voor één duidelijk werkterrein, operationele communicatie met chauffeurs en magazijnen, en één vendor (HappyRobot). FedEx phaseert het in over jaren, met customs eerst. Bain&apos;s data laat zien dat externe partnerships ongeveer twee keer zo vaak slagen als interne builds. De boodschap: niet zelf bouwen, niet alles tegelijk, niet zonder meetkader.
      </p>

      <p>
        Hou de vier cijfers van het meetkader bij. Latency, override-rate, exception-rate, payback. Als één daarvan 90 dagen lang de verkeerde kant op beweegt, weet je het: dit is de 19 procent die nooit positief eindigt. Beter daar in week 6 achter komen dan in maand 18.
      </p>

      <EndRule />
      <EndSig>&quot;Wonder en is gheen wonder.&quot; · Editie 013 / 052</EndSig>
    </>
  )
}

/* ────────────────────────────────────────────────────────────
   Dispatch body: short news update + Stevin perspective
   ──────────────────────────────────────────────────────────── */
function ArticleDispatchBody({ article }: { article: Article }) {
  const body = DISPATCH_BODIES[article.slug]
  return (
    <>
      {body ? (
        body
      ) : (
        <p className="lead-para">{article.dek}</p>
      )}

      {article.source && (
        <p
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '12px',
            letterSpacing: '0.04em',
            color: 'var(--muted)',
            margin: '32px 0 8px',
            textTransform: 'uppercase',
          }}
        >
          Bron
        </p>
      )}
      {article.source && (
        <p style={{ margin: '0 0 24px' }}>
          <a
            href={article.source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--accent)] underline"
            style={{ fontSize: '15px' }}
          >
            {article.source.name} →
          </a>
        </p>
      )}

      <DispatchPerspective slug={article.slug} />

      <EndRule />
      <EndSig>Editie {article.edition} · Kort</EndSig>
    </>
  )
}

function DispatchPerspective({ slug }: { slug: string }) {
  const text = DISPATCH_PERSPECTIVES[slug]
  if (!text) return null
  return (
    <div
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderLeft: '3px solid var(--accent)',
        borderRadius: '10px',
        padding: '28px 32px',
        margin: '32px 0',
      }}
    >
      <p
        style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '11px',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--accent)',
          margin: '0 0 12px',
        }}
      >
        Wat dit betekent voor jou
      </p>
      <p
        style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '16px',
          lineHeight: '1.6',
          color: 'var(--navy)',
          margin: 0,
        }}
      >
        {text}
      </p>
    </div>
  )
}

const DISPATCH_BODIES: Record<string, React.ReactNode> = {
  'seo-changelogs-ondergewaardeerde-spil-in-enterprise-governance': (
    <>
      <p className="lead-para">
        Elke ongemarkeerde wijziging op een bedrijfswebsite kan verborgen SEO-risico’s met zich meebrengen. Een kleine template-update, een verplaatste knop of een aangepaste URL-structuur lijkt onschuldig, maar kan plotseling organische zoekverkeer doen kelderen. Zonder overzicht ontstaat er een blinde vlek waar oorzaak en gevolg niet meer te traceren zijn.
      </p>
      <p>
        Changelogs lossen dit probleem op door alle technische en inhoudelijke aanpassingen systematisch vast te leggen. Niet alleen voor developers, maar ook voor SEO-teams en contentverantwoordelijken. Zo wordt elke wijziging gekoppeld aan een versiebeheer-systeem, waardoor direct zichtbaar is welke actie heeft geleid tot een dip in rankings of conversies.
      </p>
      <p>
        Voorbeelden uit de praktijk tonen aan dat organisaties met een goed ingesteld changelog gemiddeld 30% sneller kunnen reageren op SEO-problemen. Het voorkomt bovendien discussies over wie verantwoordelijk is voor een regressie, omdat de oorzaak direct traceerbaar is.
      </p>
      <p>
        Ook tijdens migraties of redesigns blijkt zo’n log cruciaal. Grote veranderingen zoals een nieuwe CMS-implementatie of een herstructurering van de sitearchitectuur worden vaak onderverdeeld in honderden kleine stappen. Een changelog maakt het mogelijk om stap voor stap te monitoren welke wijziging precies leidt tot dalende prestaties.
      </p>
    </>
  ),
  'seo-changelogs-ondermijnd-door-onzichtbare-updates': (
    <>
      <p className="lead-para">
        Een onbekend aantal bedrijven ondervindt problemen door wijzigingen op hun website die niet zichtbaar zijn voor de SEO-verantwoordelijken. Kleine aanpassingen zoals code-wijzigingen, template-aanpassingen of serverconfiguraties kunnen plotseling de ranking beïnvloeden zonder dat iemand het doorheeft. Dit leidt vaak tot een snelle daling in organische verkeer en omzet, zonder dat de oorzaak direct duidelijk is.
      </p>
      <p>
        Het ontbreken van een gestructureerde changelog maakt het lastig om oorzaak en gevolg te koppelen. Wanneer een pagina plotseling daalt in de zoekresultaten, duurt het vaak dagen voordat er wordt geconstateerd dat er recent iets is veranderd. Zelfs binnen grote organisaties met meerdere teams blijft overzicht vaak ontbreken, omdat updates via verschillende kanalen verlopen zonder centrale registratie.
      </p>
      <p>
        Sommige bedrijven lossen dit op door automatische monitoring in te stellen die veranderingen detecteert en direct signaleert. Andere kiezen voor strikte governance-processen waarbij elke wijziging moet worden goedgekeurd en geregistreerd voordat deze live gaat. Beide benaderingen vereisen echter een cultuurverandering waarin transparantie en verantwoordelijkheid centraal staan.
      </p>
    </>
  ),
  'openai-brengt-conversie-gerichte-ads-voor-chatgpt': (
    <>
      <p className="lead-para">
        OpenAI werkt aan een advertentieplatform voor ChatGPT dat bedrijven in staat stelt om campagnes te richten op concrete conversies, zoals online verkopen of leadgeneratie. De toolset omvat trackingfuncties om het succes van campagnes direct te meten en te optimaliseren.
      </p>
      <p>
        Het nieuwe systeem biedt ook een pay-for-results model, waarbij adverteerders alleen betalen voor daadwerkelijk behaalde acties. Dit sluit aan bij de groeiende vraag naar transparantere en meetbare reclame-investeringen.
      </p>
      <p>
        De integratie van deze advertenties zal plaatsvinden binnen de ChatGPT-interface, wat betekent dat gebruikers tijdens gesprekken met het model ook commerciële boodschappen kunnen tegenkomen.
      </p>
    </>
  ),
  'ai-in-de-creative-industrie': (
    <>
      <p className="lead-para">
        Bureaus en merken passen AI nu op grote schaal toe voor het genereren van advertentieconcepten, beelden en teksten. In de Verenigde Staten loopt de groei op tot meer dan 100% per jaar, aldus een analyse van Ad Age.
      </p>
      <p>
        De technologie wordt vooral gebruikt voor low-budget campagnes en testversies van concepten. Grote bureaus experimenteren echter ook met AI voor high-end producties, zoals animaties en video’s. De kostenbesparing is significant: waar traditionele productie weken kost, levert AI binnen uren resultaat.
      </p>
      <p>
        Critici wijzen op kwaliteitsverlies en het risico dat campagnes minder origineel worden. Toch kiezen steeds meer merken voor AI om snelheid en schaalbaarheid te combineren met lagere kosten.
      </p>
    </>
  ),
  'ai-herdefinieert-creativiteit-bij-bureaus': (
    <>
      <p className="lead-para">
        AI vervangt geen creativiteit, maar maakt creatieve processen efficiënter door repetitieve taken over te nemen. Dat stelt James Lawton-Hill van APS Group, die benadrukt dat de echte dreiging ligt in het niet benutten van de mogelijkheden die AI biedt. Bureaus die AI integreren in hun workflows, kunnen sneller ideeën genereren en testen zonder de kwaliteit van het eindresultaat te verliezen. Generatieve tools zoals Adobe Firefly en Midjourney worden steeds vaker gebruikt voor conceptontwikkeling en prototyping, aldus Lawton-Hill.
      </p>
      <p>
        De grootste winst zit in de herverdeling van taken: creatieven krijgen meer ruimte voor strategisch denken, storytelling en het bouwen van merkgemeenschappen. Operationele taken zoals versiebeheer en assetmanagement worden steeds vaker overgenomen door zogeheten agentic AI-systemen. Dit leidt tot snellere doorlooptijden, consistente output en meer aandacht voor menselijk oordeel in de vroege fasen van een project.
      </p>
      <p>
        De verschuiving naar AI-gedreven creativiteit vraagt om een nieuwe focus bij bureaus. Succesvolle campagnes draaien niet langer alleen om bereik, maar om resonantie binnen doelgroepen. Merken die communities opbouwen rondom participatie en gedeelde waarden, profiteren het meest van deze trend. AI kan helpen bij snellere contentproductie en personalisatie, maar de emotionele verbinding blijft mensenwerk.
      </p>
    </>
  ),
  'amerika-budget-9-miljard-voor-ai-spionage': (
    <>
      <p className="lead-para">
        De Amerikaanse overheid heeft 9 miljard dollar vrijgemaakt voor de adoptie van kunstmatige intelligentie door inlichtingendiensten als de CIA en NSA. Dit bedrag moet worden gebruikt voor geavanceerde AI-chips en bijbehorende infrastructuur, zoals gespecialiseerde datacenters met hoge energievraag en vloeistofkoeling.
      </p>
      <p>
        De hardware die wordt ingezet, bestaat onder meer uit Nvidia’s Grace Blackwell-superchips. De vraag naar deze chips neemt toe door zowel commerciële als overheidsprojecten, wat de leveringszekerheid onder druk zet. Nvidia’s CEO Jensen Huang heeft eerder al gepleit voor innovatie in de halfgeleiderindustrie om de concurrentiepositie van de VS te versterken.
      </p>
      <p>
        Deze investering kan ook gevolgen hebben voor andere sectoren die afhankelijk zijn van GPU-computing, zoals cryptocurrency en gedecentraliseerde netwerken. Sommige partijen overwegen alternatieve oplossingen, waaronder blockchain-gebaseerde marktplaatsen waar rekenkracht wordt verhandeld.
      </p>
    </>
  ),
  'ai-washing-bedrijven-rebranden-zich-als-tech': (
    <>
      <p className="lead-para">
        PR-bureaus in Nederland en België melden een golf van verzoeken om bedrijven neer te zetten als AI-specialisten, zelfs als hun producten of diensten geen kunstmatige intelligentie bevatten. Communicatieadviseurs noemen het ‘yoga-niveau’ stretches om het label AI te plakken op bestaande automatisering of verouderde technologie.
      </p>
      <p>
        Voorbeelden variëren van een schoenenmerk dat plotseling AI-graphicschips aanschaft tot een fitnessstudio die beweert AI-gestuurde yogamatten te verkopen. In de praktijk gaat het vaak om verbeterde automatisering zonder echte AI-kernfuncties zoals machine learning of neurale netwerken.
      </p>
      <p>
        Journalisten en PR-medewerkers merken op dat bedrijven massaal de term ‘AI-powered’ of ‘AI-driven’ gebruiken in marketingteksten en persberichten, terwijl de technologie zelf beperkt is tot basisautomatisering. Een voorbeeld is een vastgoedbedrijf dat een handheld scanner als ‘AI-vloerplanscanner’ presenteert, omdat er enkele algoritmen in zitten die het proces versnellen.
      </p>
    </>
  ),
  'openai-race-naar-agi-onthuld': (
    <>
      <p className="lead-para">
        Journalist Karen Hao kreeg in 2019 zeldzame toegang tot OpenAI en ontdekte een bedrijfscultuur die draaide om geheimhouding en een bijna religieuze obsessie met artificiële algemene intelligentie (AGI). Onderzoekers werden afgeschermd van bepaalde afdelingen en waarschuwden elkaar via Slack om niet buiten voorgeschreven gesprekken te spreken. De sfeer was competitief en paranoïde, aldus Hao in haar boek *Empire of AI*.
      </p>
      <p>
        De transformatie van OpenAI begon toen Microsoft in 2019 voor één miljard dollar investeerde. Wat begon als een idealistisch non-profitorganisatie gericht op het ‘redden van de mensheid’ met transparante AI-ontwikkeling, veranderde onder leiding van Sam Altman in een race naar technologische suprematie. Medewerkers spraken over een ‘machinegod’ die zowel utopia als ondergang kon betekenen, met AGI als doel boven alle andere prioriteiten.
      </p>
      <p>
        Hao beschrijft hoe senior wetenschappers tijdens een retreat in Sierra Nevada badjasjes droegen en symbolisch een effigie verbrandden die AGI vertegenwoordigde. De cultuur binnen OpenAI werd gekenmerkt door angst voor lekken en een focus op snelheid boven ethiek of openheid. Deze dynamiek leidde uiteindelijk tot publieke conflicten, zoals de rechtszaak tussen Elon Musk en Altman over de koerswijziging van het bedrijf.
      </p>
    </>
  ),
  'buitenlandse-merken-in-afrika': (
    <>
      <p className="lead-para">
        Uit onderzoek blijkt dat buitenlandse merken die via Afrikaanse marktplaatsen verkopen vaak snel schaalbaar zijn, maar moeite hebben om klantloyaliteit op te bouwen. Directe verkoop via lokale webshops of fysieke winkels levert betere marges en een duurzamere positie op, aldus de bron.
      </p>
      <p>
        Lokale retailpartnerschappen blijken cruciaal voor merken die niet alleen korte-termijnverkoop willen realiseren. Deze samenwerkingen helpen om culturele nuances, logistieke uitdagingen en betaalgedrag beter te begrijpen. Zonder deze aanpak lopen buitenlandse merken het risico om afhankelijk te blijven van wisselende algoritmes van marktplaatsen.
      </p>
      <p>
        Investeren in eigen distributiekanalen vergt meer inspanning, maar biedt controle over merkbeleving en klantdata. Merken die dit doen, kunnen hun aanbod beter afstemmen op lokale behoeften en voorkeuren.
      </p>
    </>
  ),
  'organische-traffic-alleen-als-business-impact': (
    <>
      <p className="lead-para">
        Uit onderzoek blijkt dat niet elk organisch bezoek even relevant is voor bedrijven. Veel verkeer komt via informatieve zoekopdrachten die zelden leiden tot conversie of omzet. Dat betekent dat standaard rapportages over 'organische bezoekers' vaak misleidend zijn.
      </p>
      <p>
        Bedrijven doen er goed aan om hun SEO-inspanningen te richten op pagina’s met hoge intentie, zoals productpagina’s of prijsvergelijkingspagina’s. Deze pagina’s trekken bezoekers aan die dichter bij een aankoop staan en daarom meer kans maken op conversie. Meetdata laten zien dat deze benadering leidt tot een duidelijker beeld van de echte business impact.
      </p>
      <p>
        Het is ook verstandig om organisch verkeer te combineren met andere meetbare acties, zoals zoekwoordadvertenties of e-mailcampagnes. Zo ontstaat een completer beeld van de customer journey en waar de meeste waarde ligt.
      </p>
    </>
  ),
  'openai-breidt-chatgpt-ads-manager-beta-uit-met-budget-en-locatie-opties': (
    <>
      <p className="lead-para">
        De ChatGPT Ads Manager Beta van OpenAI introduceert nieuwe functies voor campagnesturing. Advertenties kunnen nu preciezer worden afgestemd op specifieke regio’s, aldus het bedrijf.
      </p>
      <p>
        Daarnaast krijgen adverteerders meer controle over de pacing van hun budgetten. Dit moet helpen om uitgaven gelijkmatiger te verdelen over de looptijd van een campagne.
      </p>
      <p>
        Ook de analyse van advertentieprestaties wordt uitgebreid: er komen nieuwe meetdata beschikbaar om inzicht te krijgen in hoe gebruikers reageren op advertenties binnen ChatGPT.
      </p>
    </>
  ),
  'vodafone-batterijgarantie-drie-jaar-accuvervanging': (
    <>
      <p className="lead-para">
        Klanten van Vodafone kunnen nu voor nieuwe smartphones en toestellen gekocht tot september 2022 een gratis accuvervanging aanvragen als de capaciteit onder de 80 procent zakt. Deze garantie geldt tot drie jaar na aankoop, mits het toestel bij Vodafone of Ziggo is gekocht en het aankoopbewijs kan worden overlegd. Refurbished toestellen vallen buiten deze regeling, aldus Vodafone zelf.
      </p>
      <p>
        De actie gaat verder dan de wettelijke Europese garantie van twee jaar op producten. Volgens de Autoriteit Consument &amp; Markt is dit een aanvullende 'bijkoopgarantie', die consumenten extra zekerheid biedt. De EU verplicht fabrikanten sinds kort om te garanderen dat een accu na 800 laadcycli nog minimaal 80 procent capaciteit heeft. Vodafone breidt dit uit door vervanging aan te bieden ongeacht het aantal laadcycli binnen drie jaar.
      </p>
      <p>
        De provider voert vooraf een controle uit op zichtbare schade, zoals val- of stootschade. Als er tijdens de reparatie blijkt dat verdere schade aanwezig is, betaalt de klant wel onderzoekskosten van €36,30. Vodafone maakt foto’s van het toestel om discussies te voorkomen en geeft klanten drie opties bij onvoorziene kosten: door laten repareren, weigeren of afstand doen van het toestel.
      </p>
    </>
  ),
  'microsoft-verbergt-copilot-knop-in-office-na-kritiek': (
    <>
      <p className="lead-para">
        Microsoft maakt de Copilot-knop in Office-applicaties zoals Word, Excel en PowerPoint vanaf volgende week minder opdringerig. Gebruikers kunnen de knop voortaan zelf verplaatsen naar de ribbon-balk bovenin het scherm, waar andere documentopties staan. De knop verdwijnt niet volledig en Copilot blijft beschikbaar, maar is minder constant in beeld. Microsoft stelt dat deze aanpassing is gemaakt naar aanleiding van feedback van gebruikers die de aanwezigheid van de knop als storend ervoeren.
      </p>
      <p>
        De verandering komt na eerdere kritiek op de agressieve implementatie van AI-functies in Windows en Office. Eerder dit jaar werden al namen als 'Copilot' uit applicaties als Kladblok verwijderd, terwijl de onderliggende AI-functionaliteit bleef bestaan. Gebruikersreacties op forums zijn gemengd: sommigen vinden het een stap in de goede richting, anderen zien het als een cosmetische aanpassing zonder echte keuzevrijheid.
      </p>
      <p>
        Het is niet mogelijk om Copilot volledig uit te schakelen of te verwijderen uit Microsoft 365. De functie blijft actief beschikbaar voor gebruikers die er wel gebruik van willen maken. Microsoft benadrukt dat deze wijziging vooral gaat om het bieden van meer controle over hoe Copilot zichtbaar is in het interface.
      </p>
    </>
  ),
  'mistral-overname-emmi-ai-versterkt-europese-chip-en-auto-sector': (
    <>
      <p className="lead-para">
        Het Franse AI-bedrijf Mistral AI heeft het Oostenrijkse Emmi AI overgenomen, een bedrijf dat gespecialiseerd is in realtime-simulatie van fysische processen en digitale tweelingen. Met deze stap wil Mistral zich profileren als leverancier van industriële AI-toepassingen, met name voor sectoren waar Europese bedrijven zoals ASML een sleutelrol spelen.
      </p>
      <p>
        Mistral richt zich expliciet op de luchtvaart-, automotive- en halfgeleiderindustrie, aldus het bedrijf. Hoewel er geen bedrag bekend is gemaakt, wordt de overname gezien als een strategische zet om de concurrentiepositie van Mistral in Europa te versterken. De dertig medewerkers van Emmi AI zijn vanaf deze maand onderdeel van Mistral.
      </p>
      <p>
        ASML, dat vorig jaar nog 1,3 miljard euro investeerde in Mistral, lijkt een logische partner voor deze technologie. ASML zelf doet geen uitspraken over samenwerking met Emmi, maar benadrukt dat de toepassing van simulatie bij chipmachineontwikkeling cruciaal is voor snellere innovatie.
      </p>
    </>
  ),
  'mazda-centraliseert-ai-ready-dataplatform-met-dell-technologies': (
    <>
      <p className="lead-para">
        Autofabrikant Mazda heeft haar volledige storage-omgeving voor productontwerp gecentraliseerd op een nieuw AI-ready dataplatform van Dell Technologies. Door CAD-bestanden en simulatiedata uit dertig jaar samen te brengen, creëert het bedrijf een schaalbaar datalake voor toekomstige AI-workloads. De transformatie leidde tot een kostenreductie van 90% per opslageenheid, aldus de Japanse autofabrikant.
      </p>
      <p>
        Het nieuwe platform, gebaseerd op Dell PowerScale, combineert twee eerder gescheiden werelden binnen één scale-out NAS-architectuur: de capaciteitsvraag voor modelgebaseerde ontwikkeldata en de hoge prestatie-eisen van zware CAD-programma’s. Mazda vervangt hiermee magneettape-back-ups en lost structurele capaciteitstekorten op. Sinds de implementatie daalde het aantal IT-tickets aanzienlijk.
      </p>
      <p>
        De centralisatie geeft engineeringteams direct toegang tot decennia aan ontwerphistorie, cruciaal voor het trainen van machine learning-modellen. Dit versnelt innovaties in de productielijn en positioneert Mazda om generatieve AI direct in te zetten binnen de ontwikkelingspijplijn, zo blijkt uit een toelichting van Yuichi Tetsumoto, staff manager Engineering Systems bij Mazda.
      </p>
    </>
  ),
  'spotify-lanceert-ai-remixes-voor-premium-gebruikers': (
    <>
      <p className="lead-para">
        Spotify introduceert een nieuwe functie waarmee Premium-abonnees tegen betaling AI-remixes en -covers kunnen maken van hits van artiesten als Taylor Swift, Billie Eilish en Elton John. De tool werkt in eerste instantie alleen met muziek van Universal Music Group, aldus Spotify. Gebruikers betalen voor deze extra dienst bovenop hun reguliere abonnement, maar de oorspronkelijke makers krijgen een deel van de opbrengst.
      </p>
      <p>
        Naast de AI-muziektool kondigt Spotify ook twee andere functies aan: een app voor het genereren van AI-podcasts en 'Reserved', een systeem waarbij alleen 'echte fans' tickets kunnen kopen voor concerten. Deze functies zijn eerst alleen in de Verenigde Staten beschikbaar, maar komen later naar andere landen. Spotify geeft nog niet aan wanneer de tool precies beschikbaar komt of wat deze gaat kosten.
      </p>
      <p>
        De nieuwe functies sluiten aan bij de groeiende vraag naar gepersonaliseerde content binnen streamingdiensten. Spotify benadrukt dat artiesten en songwriters extra inkomsten ontvangen via deze AI-gestuurde tools, hoewel de exacte verdeling nog niet duidelijk is.
      </p>
    </>
  ),
  'ai-gemaakte-boeken-zonder-waarschuwing-te-koop': (
    <>
      <p className="lead-para">
        Het Nederlandse bedrijf Andries B.V. brengt sinds 2025 non-fictieboeken uit die volledig door kunstmatige intelligentie zijn gegenereerd. Deze titels, vaak over nicheonderwerpen zoals een specifiek hondenras of stad, worden verkocht via platforms als Libris, Bruna en Boekenwereld zonder dat klanten worden geïnformeerd over de AI-oorsprong.
      </p>
      <p>
        Na onderzoek van Trouw bleek dat alleen Bol expliciet aangeeft wanneer een boek AI-gegenereerd is. Andere aanbieders zoals Athenaeum | Scheltema en De Slegte lieten na publicatie weten deze informatie alsnog toe te voegen. Eigenaar Andries Herremans stelt dat de betrokkenheid van AI wel is gemeld bij de boekhandels en in nieuwe uitgaven zelf wordt vermeld.
      </p>
      <p>
        Consumentenreageren verdeeld: sommige lezers vinden het gebruik van AI voor onderzoek acceptabel, maar velen zien het als oneerlijk en misleidend om boeken te verkopen zonder duidelijke waarschuwing.
      </p>
    </>
  ),
  'cerebras-beursgang-ai-chipsector': (
    <>
      <p className="lead-para">
        Het Amerikaanse AI-chipbedrijf Cerebras is met zijn beursgang in één klap 70 miljard dollar waard geworden. De twee oprichters bezitten nu elk een vermogen van meer dan een miljard dollar. Dit maakt de beursgang tot de grootste van het jaar tot nu toe.
      </p>
      <p>
        Cerebras concurreert met NVIDIA door grotere chips te ontwikkelen die zo groot zijn als een bord. Het bedrijf werkt met grote techpartners zoals Amazon, Meta en OpenAI, waar het onlangs een deal van 20 miljard dollar afsloot. De vraag naar rekenkracht voor AI-toepassingen blijft onverminderd hoog.
      </p>
      <p>
        De opbrengst van de beursgang wordt gebruikt om de technologie verder te verbeteren en uit te breiden. Cerebras levert niet alleen chips, maar ook datacenters die gespecialiseerd zijn in AI-berekeningen. Ondanks verlieslatendheid wil het bedrijf eerst groeien voordat winst centraal komt te staan.
      </p>
    </>
  ),
  'btw-fraude-netwerk-europa-operatie-admiral': (
    <>
      <p className="lead-para">
        Een netwerk van bijna 9.000 spookbedrijven in 30 landen organiseerde een btw-fraude met een omvang van 2,9 miljard euro. Consumenten kochten via online platformen smartphones, waarbij de btw-plicht kunstmatig werd omzeild door valse grensoverschrijdende handel. De fraudeurs lieten de opbrengst verdwijnen naar belastingparadijzen als Dubai en de Seychellen, aldus de Portugese justitie.
      </p>
      <p>
        De constructie draaide om valse facturen gegenereerd door software, ontwikkeld door Prathikouhn Lavivong, een Frans-Thaise IT-specialist. In mei 2025 werden twaalf bedrijven en tien personen veroordeeld, maar het vonnis werd in maart 2026 vernietigd wegens procedurefouten. De zaak wordt nu opnieuw behandeld.
      </p>
      <p>
        De EU verloor in 2023 ongeveer 128 miljard euro aan btw-inkomsten door fraude en administratieve tekortkomingen. Nieuwe regels voor digitale facturatie en realtime rapportage moeten dit beperken, maar volledige implementatie is pas in 2030 verplicht.
      </p>
    </>
  ),
  'signaalverval-bedreigt-top-of-funnel-prestaties': (
    <>
      <p className="lead-para">
        Top-of-funnel campagnes krijgen vaak minder credit dan ze verdienen. De reden ligt in de meting zelf: tussenstappen zoals herhalingsbezoeken, vergelijkingen of mobiele sessies vallen weg uit standaard attributie-modellen. Daardoor lijkt het alsof awareness-campagnes minder bijdragen, terwijl ze in werkelijkheid de basis leggen voor latere conversies.
      </p>
      <p>
        Het probleem verergert wanneer bedrijven zich vooral op directe conversies richten. De vroege contactmomenten in de orientatiefase blijven dan onzichtbaar. Zonder die context wordt het lastig om te optimaliseren voor wat op lange termijn werkt.
      </p>
      <p>
        Een uitweg ligt in meetmodellen die rekening houden met tijd: tijdsgebonden attributie, integratie met CRM-data of marketing mix modelling. Wie alleen op last-click stuurt, snijdt structureel in de campagnes die de pijplijn vullen.
      </p>
    </>
  ),
  'google-integreert-meridian-in-analytics-360': (
    <>
      <p className="lead-para">
        Google integreert Meridian, het marketing mix modeling (MMM)-platform van Google Cloud, direct in Analytics 360. Hiermee kunnen adverteerders de impact van hun mediabestedingen op basis van meetdata beter analyseren. De integratie maakt het mogelijk om oorzaak en gevolg tussen campagnes en conversies op een gestructureerde manier te onderzoeken.
      </p>
      <p>
        Daarnaast lanceert Google een nieuwe predictieve conversiemetric binnen Analytics 360. Deze metric helpt bij het voorspellen van toekomstige conversies op basis van historische data en huidige campagneprestaties. Adverteerders kunnen hiermee sneller anticiperen op veranderingen in hun mediaplanning.
      </p>
      <p>
        De aanpassingen komen beschikbaar voor alle gebruikers van Analytics 360, ongeacht de grootte van hun organisatie. De integratie is bedoeld om de besluitvorming rondom mediabudgetten te versnellen en te verbeteren.
      </p>
    </>
  ),
  'google-breidt-demand-gen-uit-met-youtube-creator-tools': (
    <>
      <p className="lead-para">
        Demand Gen-campagnes krijgen vanaf deze week extra mogelijkheden via YouTube. Creators kunnen nu rechtstreeks worden ingebed in campagnes, waardoor merken hun doelgroepen op een authentieke manier bereiken. Deze samenwerkingen zijn beschikbaar voor zowel video- als display-content, aldus Google.
      </p>
      <p>
        Daarnaast introduceert Google nieuwe inventarisopties via Google Maps. Adverteerders kunnen nu producten of diensten tonen in de kaartomgeving, wat de zichtbaarheid in lokale zoekopdrachten vergroot. De tool is vooral nuttig voor bedrijven met fysieke locaties, zoals winkels of horeca.
      </p>
      <p>
        Tot slot komen er AI-gestuurde optimalisatietools beschikbaar voor Demand Gen-campagnes. Deze tools analyseren meetdata en passen campagnes realtime aan om de beste resultaten te behalen. De focus ligt op het verbeteren van de conversie zonder handmatige aanpassingen, zo blijkt uit de aankondiging.
      </p>
    </>
  ),
  'google-lanceert-ask-advisor-in-ads-analytics-en-merchant-center': (
    <>
      <p className="lead-para">
        De nieuwe tool Ask Advisor van Google integreert direct met Ads, Analytics en Merchant Center. Gebruikers kunnen via natuurlijke taal vragen stellen over campagnes, zoals budgetaanpassingen of prestatieanalyses.
      </p>
      <p>
        De assistent werkt op basis van Googles eigen AI-model Gemini en biedt realtime adviezen zonder dat gebruikers zelf moeten zoeken in rapportages. Dit moet de tijd besparen die nu gaat naar handmatige analyse.
      </p>
      <p>
        Ask Advisor is aanvankelijk alleen beschikbaar voor Engelstalige accounts, maar wordt later uitgebreid naar andere talen. De tool verschijnt eerst in een beperkte beta-versie voor geselecteerde adverteerders.
      </p>
    </>
  ),
  'google-marketing-live-2026-gemini-drijft-search-advertising-en-commerce': (
    <>
      <p className="lead-para">
        Tijdens Google Marketing Live 2026 presenteerde Google hoe de integratie van Gemini in Search, advertising en commerce een conversational en AI-gedreven ecosysteem oplevert. Advertenties worden direct in gesprekken ingebed, zodat gebruikers vragen kunnen stellen zonder tussenstappen. De zoekresultaten passen zich dynamisch aan op basis van contextuele gesprekken, aldus Google.
      </p>
      <p>
        De nieuwe maatregelen maken het voor adverteerders makkelijker om campagnes te optimaliseren op conversaties in plaats van traditionele zoekopdrachten. Meetdata toont aan dat deze aanpak een hogere relevantie en uplift genereert in de customer journey. Commerce wordt ook ingebed: gebruikers kunnen direct producten bestellen via gesprekken met Google Assistant of Search.
      </p>
      <p>
        De verschuiving raakt iedereen die op zoekverkeer leunt: van zoekwoorden naar intentie en interactie. Campagnes die nu draaien op losse keywords zullen herbouwd moeten worden rond gespreksstructuren. Wie dat te laat oppakt, ziet zijn zichtbaarheid in Search wegzakken.
      </p>
    </>
  ),
  'nieuw-raamwerk-zichtbaarheid-ai-tijden': (
    <>
      <p className="lead-para">
        Op 19 mei meldt Search Engine Land dat traditionele SEO-metrics zoals posities en klikfrequenties tekortschieten in AI-systemen. Het nieuwe *Funnel Query Pathway*-model richt zich op de gebruikersreis, van zoekopdracht tot interactie met AI-antwoorden.
      </p>
      <p>
        Het raamwerk splitst de reis in drie fasen: *discovery* (hoe vinden gebruikers content?), *engagement* (hoe interageren ze via AI?) en *conversion* (leidt dit tot actie?). Bureau-eigenaars moeten meetdata uitbreiden naar chatbot-conversaties en AI-antwoorden, niet alleen landingspagina’s.
      </p>
      <p>
        Volgens Search Engine Land vervangt het model traditionele SEO niet, maar vult het aan. Marketeers kunnen hiermee zien welke content werkt in AI-contexten en waar uplift mogelijk is. De methode vraagt samenwerking tussen SEO-specialisten en conversatie-ontwerpers.
      </p>
    </>
  ),
  'google-card-universeel-winkelwagentje-ecommerce': (
    <>
      <p className="lead-para">
        Google Card is een universeel winkelwagentje binnen Gemini dat automatisch de goedkoopste aanbieder zoekt, prijshistorie bijhoudt, prijsdalingen signaleert en productcompatibiliteit controleert. Beschikbaar in de VS deze zomer, daarna in Search, YouTube en Gmail.
      </p>
      <p>
        Voor D2C-merken en e-commerce is dit een structurele verschuiving. Als de AI de aankoopbeslissing overneemt op basis van prijs en productspecificaties, verliest merkvoorkeur zijn functie in het beslissingsmoment. De klant kiest niet meer bewust voor jouw merk. De AI vergelijkt en selecteert.
      </p>
      <p>
        Wat overblijft als hefboom: prijscompetitiviteit en de kwaliteit van je productfeed. AI-traffic naar retailsites groeide in Q1 2026 met 393 procent jaar-op-jaar. AI-verwezen traffic converteert 42 procent beter dan niet-AI-traffic. Maar alleen voor merken waarvan de producten compleet, correct en gestructureerd zijn aangeleverd. Producten zonder goede data worden onzichtbaar in AI-gestuurde vergelijkingen.
      </p>
      <p>
        De praktische implicatie: wie zijn productfeed niet op orde heeft, speelt niet mee in Google Card. Wie zijn prijs niet bijhoudt in realtime, verliest het moment waarop de AI beslist.
      </p>
    </>
  ),
  'gemini-spark-proactief-zoeken-intent-verdwijnt': (
    <>
      <p className="lead-para">
        Gemini Spark is een AI-agent die permanent op de achtergrond draait, ook wanneer je telefoon op slot staat. Hij monitort de appartementenmarkt, productbeschikbaarheid, prijswijzigingen en nieuwsontwikkelingen. Wanneer iets relevant verandert, handelt hij of waarschuwt hij. De gebruiker hoeft niet meer te zoeken.
      </p>
      <p>
        Voor marketing-teams is dit een fundamentele verstoring van hoe intent werkt. Het hele model van intent-based advertising rust op het moment dat een gebruiker actief zoekt. Dat moment is het signaal: iemand wil iets. Targeting, biedstrategie en advertentietekst zijn gebouwd rondom dat signaal.
      </p>
      <p>
        Als Spark dat zoekmoment vervangt door continu achtergrondmonitoring, verdwijnt het signaal. De gebruiker zoekt niet meer naar een auto, Spark monitort de markt en meldt wanneer een model binnen budget beschikbaar is. Er is geen zoekmoment meer dat een advertentie triggert.
      </p>
      <p>
        Spark is nog niet beschikbaar in Nederland en Belgie, maar de richting is helder. Google maakt van zijn zoekplatform een proactief systeem dat handelt namens de gebruiker. Minder zichtbare intent, minder stuurbaar adverteren, meer nadruk op aanwezigheid in de feeds die Spark monitort.
      </p>
    </>
  ),
  'google-antigravity-2-claude-code-cursor-gratis': (
    <>
      <p className="lead-para">
        Google lanceerde gisteren op I/O 2026 Antigravity 2.0: een standalone desktop-applicatie, een CLI, een SDK en enterprise-ondersteuning via het Gemini Enterprise Agent Platform. Wat begon als een Cursor-concurrent is uitgegroeid tot een volwaardig agent-platform voor softwaareontwikkeling.
      </p>
      <p>
        De kern van Antigravity 2.0 is agent-orchestratie. Zestien gespecialiseerde agents beslaan de volledige development-stack: frontend, backend, security, testing, infrastructuur, SEO, database-configuratie. Ze draaien parallel en worden aangestuurd via een centrale desktop-interface of de nieuwe CLI. Het 1-miljoen-token contextvenster via Gemini 3.1 Pro is een reeel verschil ten opzichte van Cursor en Claude Code, die uitkomen op 200K tokens. Voor grote codebases of omvangrijke projecten is dat een praktisch voordeel.
      </p>
      <p>
        Het meest opvallende: Antigravity 2.0 is gratis in public preview. Geen creditcard, geen wachtlijst, alle functies beschikbaar. Cursor Pro kost 40 dollar per maand, Claude Code Pro 20 dollar. Google claimt dat Antigravity 2.0 in een demotest een besturingssysteem in twaalf uur bouwde. De prestatieverhouding in de praktijk: Cursor wint op snelheid, Claude Code op architectuurkwaliteit, Antigravity zit er tussenin maar heeft de diepste Google-ecosysteemintegratie (Firebase, Android Studio, AI Studio).
      </p>
      <p>
        Vanaf 18 juni 2026 verdwijnt de Gemini CLI en Gemini Code Assist voor individuele gebruikers. Antigravity is de opvolger. Google communiceert dat expliciet.
      </p>
    </>
  ),
  'google-io-2026-marketing-teams-gemini-search-ads': (
    <>
      <p className="lead-para">
        Google I/O 2026 was geen productpresentatie. Het was een platformverklaring: Google integreert AI niet in zijn diensten, Google bouwt zijn diensten om AI heen. Voor marketing-teams veranderen er concrete dingen.
      </p>
      <p>
        Search genereert vanaf nu dynamische UI&apos;s per zoekopdracht. Wie zoekt naar een vakantiebestemming, krijgt een interactief vergelijkingstool, geen lijst met blauwe links. Voor marketeers betekent dit dat de vraag &quot;rank ik voor dit keyword?&quot; minder relevant wordt dan &quot;wordt mijn merk gepresenteerd in de AI-gegenereerde interface?&quot; Dat is een fundamenteel andere vraag, met andere optimalisatielogica.
      </p>
      <p>
        AI Max voor Search-campagnes is uit beta. Google rapporteert gemiddeld 7 procent meer conversies bij vergelijkbare CPA of ROAS voor campagnes die de volledige feature-set gebruiken. Vanaf september 2026 worden Dynamic Search Ads automatisch gemigreerd naar AI Max. Voor adverteerders die nu nog op klassieke DSA draaien: vier maanden om de overgang voor te bereiden.
      </p>
      <p>
        Gemini Omni introduceert multimodale real-time verwerking: tekst, beeld, audio en video tegelijk. Praktische toepassing voor marketing: creatieve analyse op videocampagnes, real-time feedbackloops op A/B-varianten, geautomatiseerde brand-safety-checks op grote contentvolumes.
      </p>
      <p>
        De overkoepelende beweging: Google consolideert zijn AI-productlijn. Losse tools verdwijnen, het Gemini-ecosysteem absorbeert alles. Voor agencies die op meerdere Google-producten draaien, is het moment om de integratiestrategie te heroverwegen.
      </p>
    </>
  ),
  'retail-crm-pos-integratie-klaviyo-aankoophistorie': (
    <>
      <p className="lead-para">
        De meeste CRM-tools zijn gebouwd voor B2B: lange verkooptrajecten, meerdere beslissers, deals in een pipeline. Retail werkt andersom. Hoog volume, snelle transacties, relaties die worden opgebouwd via aankoophistorie. Wie een B2B-CRM in een winkelomgeving zet, past een hamer toe op een schroef.
      </p>
      <p>
        De vraag die iedere retailer vooraf moet beantwoorden is niet welk CRM-systeem het beste is, maar waar de aankoopdata vandaan komt. Die zit in het kassasysteem, niet in een CRM. Zonder een werkende koppeling tussen POS en marketinglaag heb je een klantenbestand zonder context. Je weet dat iemand klant is, maar niet wat hij gekocht heeft, hoe vaak hij terugkomt en wanneer hij waarschijnlijk weer koopt.
      </p>
      <h3>De twee-lagenstructuur die wel werkt</h3>
      <p>
        Wat structureel beter werkt: het kassasysteem en de marketinglaag scheiden en vervolgens goed aan elkaar koppelen. Lightspeed of Shopify POS voor transactieregistratie. Klaviyo als marketinglaag, met aankoopdata als basis voor segmentatie en opvolging.
      </p>
      <p>
        Klaviyo is daarvoor niet toevallig populair in retail. Het systeem is gebouwd op RFM-logica (Recency, Frequency, Monetary value) en maakt het mogelijk klanten te segmenteren op aankoopgedrag in plaats van op demografische aannames. Een segment van klanten die meer dan twee aankopen hebben gedaan, maar de afgelopen 90 dagen niets hebben besteld, is direct bruikbaar voor een gerichte re-engagementcampagne.
      </p>
      <h3>De integratiepijn is reeel</h3>
      <p>
        De koppeling tussen Lightspeed X en Klaviyo is op dit moment nog in gesloten beta. Wie nu al op Lightspeed X zit, heeft drie opties: wachten op de native integratie, een derde partij inschakelen voor de datasync, of handmatig exporteren en importeren. Die laatste optie houdt vrijwel altijd op zodra het dagelijks druk wordt aan de kassa.
      </p>
      <p>
        Zonder POS-data in de marketinglaag is segmentatie beperkt tot wat klanten zelf invullen of wat ze klikken in e-mails. Daarmee vervalt precies het voordeel van retail ten opzichte van e-commerce: je weet wat iemand in de winkel heeft gekocht.
      </p>
      <h3>De praktische test</h3>
      <p>
        Kan een medewerker een klantprofiel bijwerken in minder dan dertig seconden, via een tablet of telefoon, midden in een drukke winkeldag? Als het antwoord nee is, zal het team het systeem na een paar weken links laten liggen. Geen CRM overleeft een slechte winkelervaring.
      </p>
    </>
  ),
  'ga4-ai-verkeer-custom-channel-group-geo': (
    <>
      <p className="lead-para">
        GA4 deelt kanalen in via regels die gemaakt zijn voor een wereld zonder AI-assistenten. Verkeer van ChatGPT, Perplexity, Claude of Gemini komt bijna altijd binnen als Referral, maar dan met het AI-domein als bron. Zonder aanpassing zie je het niet als eigen kanaal, het verdwijnt in de algemene Referral-bucket.
      </p>
      <p>
        De fix zit in twee stappen.
      </p>
      <h3>Stap 1: custom channel group aanmaken</h3>
      <p>
        Ga naar Admin &rarr; Gegevensweergave &rarr; Kanaalgroepen en maak een nieuwe groep aan. Naam: <em>AI-assistenten</em>. Conditie: Sessie-bron voldoet aan regex:
      </p>
      <pre style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '13px', background: 'var(--surface)', padding: '12px 16px', borderRadius: '6px', overflowX: 'auto' }}>
        {`chatgpt\\.com|perplexity\\.ai|claude\\.ai|gemini\\.google\\.com|copilot\\.microsoft\\.com|you\\.com|phind\\.com|openai\\.com`}
      </pre>
      <p>
        Sla op. Vanaf dat moment verschijnt AI-verkeer als eigen kanaal in je acquisitierapporten. Let op: GA4 past de groep alleen toe op data vanaf de aanmaakdatum. Historische sessies worden niet bijgevuld. Begin dus zo snel mogelijk, want elke week zonder dit kost je trenddata.
      </p>
      <h3>Stap 2: dashboard inrichten op beslissingsvragen</h3>
      <p>
        De standaard GA4-Momentopname is gevuld met generieke metrics. Vervang die via het potlood-icoon rechtsboven met vier concrete kaarten. De eerste twee vereisen dat Search Console aan GA4 is gekoppeld (Admin &rarr; Productkoppelingen &rarr; Search Console-koppelingen) &mdash; zonder die koppeling blijven die kaarten leeg.
      </p>
      <ol style={{ paddingLeft: '1.4em', lineHeight: '1.8' }}>
        <li><strong>Klikken per zoekopdracht</strong> &mdash; Organische Google-zoekopdrachten via Search Console</li>
        <li><strong>Vertoningen per landingspagina</strong> &mdash; Organische Google-zoekresultaten per pagina</li>
        <li><strong>Sessies per kanaal</strong> &mdash; met je nieuwe AI-assistenten-groep zichtbaar naast organisch</li>
        <li><strong>Conversies per kanaalgroep</strong> &mdash; vergelijk organisch versus AI op conversieratio</li>
      </ol>
      <p>
        Vier kaarten, vier vragen. GA4 heeft de data. De standaardinrichting laat ze verstoppen.
      </p>
    </>
  ),
  'new-york-pizza-toont-macht-van-lokale-marketing': (
    <>
      <p className="lead-para">
        New York Pizza blijft groeien zonder afhankelijk te zijn van AI of datacenters. Het merk bewijst volgens Emerce dat lokale franchisekracht en sterke marketing doorslaggevend zijn voor succes. Terwijl veel bedrijven investeren in technologische oplossingen, kiest New York Pizza voor een andere aanpak.
      </p>
      <p>
        De podcast van Emerce benadrukt dat het merk al jarenlang een sterke band heeft met consumenten door persoonlijke aandacht en lokaal ondernemerschap. Deze strategie zorgt voor herkenbaarheid en loyaliteit, iets wat digitale tools niet altijd kunnen vervangen.
      </p>
      <p>
        Het verhaal van New York Pizza laat zien waar de echte frictie zit in moderne marketing: niet in technologie, maar in het begrijpen van de lokale doelgroep en het creëren van authentieke ervaringen.
      </p>
    </>
  ),
  'organisaties-bouwen-merkbeelden-in-plaats-van-merken': (
    <>
      <p className="lead-para">
        Veel bedrijven beperken hun merkbenadering tot logo’s, kleuren en huisstijlen. Het gevolg: merken zijn herkenbaar, maar hebben geen diepere verbinding met hun doelgroep. De focus op zichtbare output gaat ten koste van wat een merk werkelijk onderscheidt.
      </p>
      <p>
        De auteur wijst erop dat organisaties soms denken dat een sterk visueel beeld voldoende is om een merk te laten groeien. Echter, merken die alleen op uiterlijk bouwen, lopen het risico om onpersoonlijk en vervangbaar over te komen. Consumenten hechten steeds meer waarde aan authenticiteit en consistentie in communicatie.
      </p>
      <p>
        De volgorde is bepalend: wie begint met design zonder merkstrategie, bouwt huisstijl op drijfzand. Kernwaarden en positionering eerst, visuele uitwerking daarna.
      </p>
    </>
  ),
  'middelmatige-ai-content-schadelijk-voor-merk': (
    <>
      <p className="lead-para">
        Slecht uitgevoerde AI-content is herkenbaar: generieke toon, fouten, gebrek aan diepgang. Consumenten merken het, klantvertrouwen daalt. Bedrijven die AI inzetten voor contentproductie zonder kwaliteitscontrole lopen reputatieschade op die moeilijk te repareren is.
      </p>
      <p>
        Marketingfacts wijst erop dat consumenten steeds beter in staat zijn om AI-generated tekst te herkennen. Vooral in sectoren waar authenticiteit cruciaal is, zoals zorg of juridische dienstverlening, kan dit direct gevolgen hebben voor de klantrelatie. Ook B2B-merken merken dat partners terughoudender worden bij samenwerking met bedrijven die duidelijk slechte AI-output gebruiken.
      </p>
      <p>
        AI als ondersteuning werkt. AI als vervanging voor redactioneel oordeel niet. Handmatige review blijft noodzakelijk, en de eigen merkstem moet ook bij automatisering overeind blijven.
      </p>
    </>
  ),
  'nieuwe-ecommerce-tools-mei-2026': (
    <>
      <p className="lead-para">
        Deze week introduceert de sector nieuwe tools voor e-commerce, meldt Practical Ecommerce. Onder de ontwikkelingen vallen predictieve AI voor voorraadbeheer, autonome marketingoplossingen en verbeterde sitebuilders. Ook komen omnichannel fulfillment, programmatic advertenties en cross-border commerce aan bod.
      </p>
      <p>
        Daarnaast worden embedded payments en snellere internationale betalingsverwerkers benadrukt als belangrijke trends. De focus ligt op efficiëntie en schaalbaarheid voor retailers die hun online aanwezigheid willen uitbreiden. Tools zoals deze moeten klantreis en conversie verbeteren door naadloze integratie met bestaande systemen.
      </p>
      <p>
        Volgens de bron bieden deze innovaties vooral voordelen voor merken die actief zijn in meerdere markten of complexe logistiek hanteren. De tools zijn vaak gericht op automatisering van repetitieve taken, waardoor teams zich kunnen richten op strategische groei.
      </p>
    </>
  ),
  'merkidentiteit-niet-gebaseerd-op-meningen': (
    <>
      <p className="lead-para">
        Een effectieve merkidentiteit bouw je niet op interne voorkeuren. Merkwaarden en positionering die op aannames rusten in plaats van op meetdata leiden structureel tot inconsistentie en zwakke uitstraling naar de doelgroep.
      </p>
      <p>
        Het bericht benadrukt dat marketeers vaak terugvallen op persoonlijke smaak of traditionele methoden, zoals focusgroepen die subjectieve feedback geven. Marketingfacts pleit voor het gebruik van gedragsdata en marktonderzoek om de werkelijke perceptie van consumenten in kaart te brengen. Dit helpt bij het ontwikkelen van een merkidentiteit die aansluit bij de behoeften en verwachtingen van de doelgroep.
      </p>
      <p>
        Een voorbeeld dat wordt genoemd is de discrepantie tussen hoe een merk zichzelf ziet en hoe klanten het ervaren. Zonder meetdata kan deze kloof onopgemerkt blijven, wat leidt tot zwakke positionering en minder effectieve communicatie. Het artikel concludeert dat merken die hun identiteit baseren op feiten, uiteindelijk sterker staan in de markt.
      </p>
    </>
  ),
  'alibaba-omzet-kwartaal-stijgt-maar-blijft-achter-verwachtingen': (
    <>
      <p className="lead-para">
        De Chinese techgigant Alibaba Group Holding zag op woensdag 13 mei de omzet in het afgelopen kwartaal met 3 procent stijgen ten opzichte van een jaar eerder. Volgens Emerce vielen de cijfers tegen, omdat analisten een grotere stijging hadden voorspeld. Het bedrijf kampt al langer met dalende consumentenbestedingen in China en moet vechten tegen toenemende concurrentie in de e-commerce sector.
      </p>
      <p>
        Het resultaat komt bovenop een reeds zwakke periode, waarin Alibaba eerder dit jaar ook al tegenvallende cijfers presenteerde. De groei van de clouddivisie, traditioneel een belangrijke inkomstenbron, vertraagde eveneens. Ondernemers en investeerders kijken met argusogen naar de strategie van het bedrijf om weer aan te haken bij de markt.
      </p>
      <p>
        De teleurstellende kwartaalcijfers zetten druk op het management van Alibaba, dat recent nog reorganisaties aankondigde om efficiënter te werken. Concurrenten zoals JD.com en Pinduoduo blijven hard groeien, wat de positie van Alibaba verder onder druk zet.
      </p>
    </>
  ),
  'beardbrand-expansion-plan-na-groeistagnatie': (
    <>
      <p className="lead-para">
        Volgens een recent rapport van Practical Ecommerce verkeert Beardbrand, bekend van baardverzorgingsproducten, in een fase van stagnatie. De omzet daalt terwijl de markt voor baardproducten juist groeit. De oprichter van het merk geeft aan dat de huidige strategie niet meer aansluit bij de veranderende behoeften van consumenten.
      </p>
      <p>
        De analyse wijst op een verschuiving in de doelgroep: jongere gebruikers zoeken naar duurzamere en multifunctionele producten, terwijl Beardbrands core-aanbod gericht blijft op klassieke verzorging. Daarnaast speelt concurrentie een rol, waarbij nieuwe merken sneller inspelen op trends zoals veganistische en cruelty-free opties.
      </p>
      <p>
        Beardbrand overweegt nu een herpositionering, met extra aandacht voor digital marketing en samenwerkingen met influencers. De focus ligt op het versterken van de merkidentiteit en het aantrekken van nieuwe klantsegmenten door middel van innovatie in productaanbod.
      </p>
    </>
  ),
  'juni-2026-contentkansen-emotionele-thema-s': (
    <>
      <p className="lead-para">
        Juni brengt een concentratie van emotionele momenten: het WK, bruiloften, festivals, zomerse evenementen. Content die daarop inspeelt presteert structureel beter dan generieke campagnes, mits de timing klopt en de boodschap authentiek aanvoelt.
      </p>
      <p>
        Het artikel noemt vijf concrete ideeën om deze thema's te benutten. Zo kunnen merken inspelen op de opwinding rond sporttoernooien of de feestelijke sfeer van huwelijksvieringen. Ook lokale evenementen zoals festivals of markten bieden aanknopingspunten voor relevante content.
      </p>
      <p>
        Practical Ecommerce benadrukt dat timing en authenticiteit cruciaal zijn. Door vroeg te starten met planning en te focussen op waardevolle informatie, kan de impact van campagnes worden vergroot.
      </p>
    </>
  ),
  'ai-verandert-print-on-demand-ecommerce': (
    <>
      <p className="lead-para">
        AI verandert de print-on-demand sector, maar niet op de manier die de meeste spelers verwachten. Wie AI uitsluitend inzet voor automatisering zonder de basis op orde te hebben, raakt achterop. Sterke merchandising, consistente productdata en een scherpe acquisitiestrategie worden daarbij even belangrijk als de technologie zelf.
      </p>
      <p>
        De analyse wijst uit dat merken die AI gebruiken voor dynamische prijsstelling of gepersonaliseerde aanbevelingen vaak hogere conversies zien. Tegelijkertijd blijkt dat klantacquisitie langer duurt dan voorheen, omdat concurrentie en adcosts zijn gestegen. Bedrijven met een duidelijke niche of uniek assortiment slagen beter in het converteren van bezoekers.
      </p>
      <p>
        Practical Ecommerce benadrukt dat AI vooral helpt om oorzaak en gevolg beter te meten. Door automatische rapportages kunnen bedrijven snel zien welke campagnes werken en waar aanpassingen nodig zijn. Dit leidt tot efficiënter budgetgebruik en minder verspilling.
      </p>
    </>
  ),
  'google-ads-introduceert-drie-ai-max-updates': (
    <>
      <p className="lead-para">
        Google Ads heeft op 5 mei drie nieuwe functies aangekondigd die gebruikmaken van kunstmatige intelligentie om de prestaties van campagnes te verbeteren. De updates omvatten AI Max voor Shopping, AI Brief en tekstdisclaimers voor Search. Volgens Google zijn er guardrails ingebouwd om de kwaliteit en relevantie te waarborgen.
      </p>
      <p>
        De eerste update, AI Max voor Shopping, optimaliseert automatisch productweergaven en biedingen op basis van realtime data. AI Brief biedt marketeers een gestructureerd overzicht van campagneprestaties met aanbevelingen voor aanpassingen. De derde update introduceert tekstdisclaimers in zoekresultaten om gebruikers beter te informeren over advertenties.
      </p>
      <p>
        De updates zijn gericht op betere gebruikerservaring en hogere conversieratio's. De functies zijn vanaf deze week beschikbaar voor alle adverteerders.
      </p>
    </>
  ),
  'boekhouder-als-verborgen-dealbreaker': (
    <>
      <p className="lead-para">
        Bij complexe zakelijke aankopen beslist de eindgebruiker zelden alleen. Wie zijn adviseur niet meekrijgt, verliest de deal voordat die begonnen is.
      </p>
      <p>
        Voor producten met een fiscale of financiele component (zakelijke auto, softwarelicentie, leasing, verduurzamingsinvestering) loopt de aankoopreis standaard via een derde partij: de boekhouder of fiscalist. Die persoon rekent door, vergelijkt en geeft groen of rood licht. Maar de meeste campagnes richten zich uitsluitend op de eindgebruiker.
      </p>
      <p>
        Het gevolg: de beslisser wordt goed bereikt, maar de persoon die de deal blokkeert of versnelt ziet nooit een boodschap.
      </p>
      <p>
        De tactische les is simpel maar wordt zelden toegepast. Maak een aparte versie van je communicatie die expliciet voor adviseurs is bedoeld, niet met productfeatures maar met fiscale en rationele argumenten die zij kunnen doorspelen aan hun klant. In sectoren waar regelgeving snel verandert (EV-fiscaliteit, premies voor verduurzaming, software-aftrek) is de adviseur bovendien gemotiveerd om die informatie te delen. Hij wil ook dat zijn klant de juiste beslissing neemt.
      </p>
      <p>
        Het principe heet influence chain marketing en het is structureel onderbenut. Brancheorganisaties, accountantskantoren en sectorbladen zijn kanalen met hoge geloofwaardigheid bij precies de mensen die de eindgebruiker raadpleegt. Een whitepaper die via die route circuleert, doet soms meer dan drie weken display.
      </p>
      <p>
        Bureaus die hun campagne alleen op de eindgebruiker richten, missen de helft van de beslissingsketen.
      </p>
    </>
  ),
  'kmo-doelgroep-segmenteren': (
    <>
      <p className="lead-para">
        De 1,2 miljoen zelfstandigen in Belgie zijn zo divers dat een campagne die hen allemaal probeert te bereiken, niemand echt raakt.
      </p>
      <p>
        Vrije beroepen kopen op prestige en tijdsbesparing. Technici kopen op specificatie en betrouwbaarheid. Creatieven kopen op identiteit en differentiatie. Allemaal zelfstandige, allemaal andere boodschap nodig, andere kanalen, andere koopdrempel. Maar de meeste campagnes behandelen de KMO-doelgroep als een homogene groep. Er komt een generieke boodschap over "ondernemers" die bij niemand in het bijzonder aansluit.
      </p>
      <p>
        Onderzoek naar koopgedrag van Vlaamse zelfstandigen laat zien dat aankoopbeslissingen sterk worden beinvloed door collegas en sectororganisaties, niet door massamedia. Een installateur vertrouwt een vakblad en een collega-installateur. Een advocaat vertrouwt een ordeorganisatie en een peer. Wie dat negeert, concurreert op bereik in plaats van op relevantie.
      </p>
      <p>
        De stap die de meeste bureaus overslaan: persona's bouwen op basis van bedrijfstak, niet op basis van leeftijd of inkomen. Het verschil in messaging en kanaalkeuze tussen een vrij beroep en een technisch bedrijf is groter dan het verschil tussen een 30-jarige en een 50-jarige ondernemer. Toch is leeftijd de standaard segmentatievariabele in de meeste mediaplanning.
      </p>
      <p>
        Segmentatie op bedrijfstak vraagt meer data-werk upfront, maar levert campagnes op die daadwerkelijk iets zeggen tegen de mensen die ze zien.
      </p>
    </>
  ),
  'regionale-context-campagne-optimalisatie': (
    <>
      <p className="lead-para">
        Geotargeting zegt waar iemand woont. Regionale contextdata zegt of zijn omgeving zijn aankoopbeslissing vergemakkelijkt of blokkeert. Dat verschil maakt in sommige sectoren tientallen procenten verschil in campagnerendement.
      </p>
      <p>
        Een concreet voorbeeld: in Vlaanderen zijn meer dan 17.000 publieke laadstations beschikbaar. In Wallonie zijn dat er minder dan 2.800. Voor een campagne gericht op zakelijke EV-aankopen betekent dat een identieke boodschap met identiek budget in Vlaanderen structureel beter presteert, niet omdat het publiek anders is, maar omdat de context anders is.
      </p>
      <p>
        Hetzelfde principe geldt in andere sectoren. Campagnes voor woningverduurzaming renderen beter in gemeenten met hoog eigen woningbezit dan in verstedelijkte huurmarkten. Webshop campagnes voor snelle levering presteren beter in gebieden met hoge bezorgdichtheid. Horecacampagnes volgen seizoenspatronen die per regio tot drie weken kunnen verschillen.
      </p>
      <p>
        Campagne-optimalisatie stopt te vaak bij "welke regio converteert beter" zonder te vragen waarom. Wie het waarom kent, kan budgetten proactief verschuiven in plaats van reactief bijsturen.
      </p>
      <p>
        De bureaus die dat consequent doen, rapporteren na twee of drie campagnecycli een duidelijk efficiencyvoordeel, simpelweg omdat ze dezelfde budgetten structureel inzetten waar de context werkt. Niet omdat ze beter adverteren, maar omdat ze beter lezen.
      </p>
    </>
  ),
  'politieke-targeting-en-visuele-aandacht-eye-tracking': (
    <>
      <p className="lead-para">
        Eye-tracking onderzoek onder 180 deelnemers laat zien dat politiek gerichte advertenties gemiddeld 23 procent meer visuele aandacht trekken dan neutrale uitingen. Respondenten met een sterke politieke voorkeur besteedden significant meer tijd aan content die aansloot bij hun eigen standpunten.
      </p>
      <p>
        Het onderzoek, uitgevoerd onder 180 deelnemers, toonde aan dat politieke targeting vooral effectief is bij specifieke doelgroepen. Respondenten met een sterke politieke voorkeur besteedden significant meer tijd aan gerichte advertenties. Dit gold met name voor content die aansloot bij hun eigen standpunten.
      </p>
      <p>
        Volgens de auteurs kan deze inzicht helpen bij het optimaliseren van campagnes, vooral rond verkiezingen of maatschappelijke debatten. De data suggereert dat visuele prikkels en contextuele targeting elkaar versterken.
      </p>
    </>
  ),
  'ai-print-on-demand-spelers-moeten-fundament-leggen': (
    <>
      <p className="lead-para">
        Bedrijven die AI alleen gebruiken voor automatisering zonder hun basis te versterken, lopen risico achterop te raken. Sterke merchandising, consistente productdata en een gefocuste acquisitiestrategie worden cruciaal volgens de analyse.
      </p>
      <p>
        Merken die AI inzetten voor dynamische prijsstelling of gepersonaliseerde aanbevelingen zien vaak hogere conversies. Tegelijkertijd blijkt klantacquisitie langer te duren door gestegen concurrentie en adcosts. Bedrijven met een duidelijke niche of uniek assortiment converteren bezoekers beter.
      </p>
      <p>
        AI helpt vooral om oorzaak en gevolg beter te meten via automatische rapportages. Bedrijven zien snel welke campagnes werken en waar aanpassingen nodig zijn. Dit leidt tot efficiënter budgetgebruik en minder verspilling aldus Practical Ecommerce.
      </p>
    </>
  ),
  'google-ads-kosten-stijgen-conversie-efficientie-2025': (
    <>
      <p className="lead-para">
        De stijgende kosten in Google Ads zijn een terugkerend thema voor adverteerders. De gemiddelde CPC (cost per click) bedroeg in Q1 2025 €1,45, een stijging van 12% ten opzichte van Q1 2024. Concurrentie om topposities blijft toenemen door groeiende vraag en beperkte advertentieruimte.
      </p>
      <p>
        Desondanks laten meetdata zien dat advertenties beter converteren. De gemiddelde conversieratio steeg naar 4,3%, een stijging van 8% ten opzichte van vorig jaar. Dit suggereert dat campagnes gerichter worden uitgevoerd, ondanks de hogere kosten.
      </p>
      <p>
        De verbeterde efficiëntie is toe te schrijven aan betere targeting en AI-gestuurde biedstrategieën. Hogere kosten, maar ook preciezere inzet.
      </p>
    </>
  ),
  'marketing-enters-air-traffic-control-era': (
    <>
      <p className="lead-para">
        Marketingorganisaties gaan volgend jaar niet alleen concurreren met andere merken, maar met AI-systemen die klantreizen in realtime beoordelen op vertrouwen, risico, intentie en identiteit. Die systemen nemen binnen milliseconden beslissingen die traditionele campagnelogica buitenspel zetten.
      </p>
      <p>
        De uitdaging ligt volgens de bron in het synchroniseren van deze AI-gestuurde processen. Waar voorheen campagnes werden gepland op basis van historische data, moet nu worden ingespeeld op dynamische signalen zoals gedragspatronen of plotselinge veranderingen in zoekgedrag. Bedrijven die hier niet op anticiperen, lopen het risico dat hun boodschappen irrelevant worden of zelfs als onbetrouwbaar worden ervaren.
      </p>
      <p>
        Dit is geen kwestie van nieuwe tools. Het is een verschuiving in hoe marketing wordt georganiseerd: teams moeten sneller schakelen tussen kanalen en signalen, en tegelijkertijd de oorzaak-gevolgrelaties blijven monitoren.
      </p>
    </>
  ),
  'google-ads-kosten-stijgen-conversies-verbeteren-2025': (
    <>
      <p className="lead-para">
        Uit een analyse van Search Engine Land blijkt dat de gemiddelde kosten per klik (CPC) in Google Ads dit jaar verder zijn opgelopen. Vooral in sectoren als e-commerce en financiële diensten is de stijging het meest opvallend. Ondanks deze prijsstijging melden adverteerders echter een verbetering in conversie-efficiëntie. Volgens het rapport is dit vooral toe te schrijven aan betere targeting en geoptimaliseerde landingspagina's.
      </p>
      <p>
        Het onderzoek toont aan dat adverteerders die investeren in data-gedreven campagnes, zoals dynamische zoekadvertenties en smart bidding-strategieën, relatief minder last hebben van de hogere kosten. De uplift in conversies varieert sterk per branche: bij online retailers ligt de stijging rond de 10%, terwijl B2B-diensten iets achterblijven met een gemiddelde van 5%. Desondanks blijft de druk op marketingbudgetten groot.
      </p>
      <p>
        De hogere kosten zijn niet alleen vraaggestuurd. Beperkte advertentieruimte binnen Google's platform drijft de biedingen op. Voor adverteerders die snel kunnen schakelen en continu monitoren, biedt die druk ook ruimte: wie structureel efficiënter inkoopt wint terrein op concurrenten die dat niet doen.
      </p>
    </>
  ),
  'openai-chatgpt-ads-manager-cpc-self-serve': (
    <>
      <p className="lead-para">
        OpenAI heeft op 5 mei zijn ChatGPT Ads-platform uitgebreid met een self-serve Ads Manager en een cost-per-click biedoptie. Volgens Axios kunnen Amerikaanse adverteerders zich nu direct aanmelden en campagnes inkopen zonder agency-tussenkomst. Het minimum-budget van 50.000 dollar dat tot vorige week gold, is geschrapt.
      </p>
      <p>
        OpenAI mikt op 2,5 miljard dollar advertentie-omzet dit jaar en 100 miljard in 2030. De Ads Manager komt ook beschikbaar via partners zoals Dentsu, Omnicom, Publicis en WPP, plus ad-tech-leveranciers Adobe, Criteo, Kargo, Pacvue en StackAdapt. De pilot wordt in de komende maanden uitgerold naar het Verenigd Koninkrijk, Japan, Brazilie, Mexico en Zuid-Korea.
      </p>
      <p>
        Het bedrijf voegde ook nieuwe meet-tools toe waarmee adverteerders campagnes kunnen analyseren en optimaliseren. Een directe vergelijking met Google Ads of Meta is nog moeilijk te maken, omdat het inventaris-volume in ChatGPT lager is en de auction-dynamiek nog opbouwt. Wel ligt er nu voor het eerst een instap zonder vendor-call.
      </p>
    </>
  ),
  'klaviyo-anthropic-claude-mcp-agentic-workflows': (
    <>
      <p className="lead-para">
        Klaviyo kondigde op 7 mei een uitgebreide integratie met Anthropic aan waarmee Claude direct toegang krijgt tot Klaviyo-klantdata via het Model Context Protocol. Volgens de aankondiging in het Klaviyo-newsroom kunnen merken vanuit Claude.ai en Claude Cowork prestatie-rapporten, segment-analyses en kant-en-klare campagne-briefs genereren zonder data te exporteren of een tweede dashboard te openen.
      </p>
      <p>
        De nieuwe MCP Connector koppelt aan een Query Metric Aggregates-tool die ruwe prestatie-cijfers blootlegt. Claude kan daarmee Klaviyo-rapporten ophalen, doorredeneren op meerdere flows en customer-profielen, en concept-content schrijven voor een campagne. In Claude Cowork draaien deze stappen in een enkele sessie waarin Claude data trekt, copy schrijft en bestanden opslaat in een gedeelde map.
      </p>
      <p>
        Klaviyo is daarmee na HubSpot en een handvol andere CRM-leveranciers een van de eerste martech-platforms die hun datalaag expliciet openzet voor agent-workflows. Het bedrijf positioneert dit als eerste stap richting wat ze &quot;operational AI&quot; noemen, waarin de marketeer een uitkomst beschrijft en het werk afgerond terugkrijgt.
      </p>
    </>
  ),
  'eu-ai-act-omnibus-akkoord-deadlines-uitgesteld': (
    <>
      <p className="lead-para">
        De EU-instellingen hebben op 7 mei een politiek akkoord bereikt over de zogenoemde AI Act Omnibus. Volgens Morrison Foerster verheldert het pakket bestaande verplichtingen, schuift het de compliance-deadlines voor hoge-risico-AI-systemen op en introduceert het nieuwe regels rond AI-gegenereerde intieme content.
      </p>
      <p>
        De overgebleven bepalingen van de AI Act worden op 2 augustus 2026 van toepassing. Verboden voor AI-systemen met onaanvaardbaar risico golden al sinds 2 februari 2025, en regels voor general-purpose modellen zoals ChatGPT, Claude en Gemini sinds augustus 2025. Boetes voor de zwaarste overtredingen lopen op tot 7 procent van de wereldwijde jaaromzet, standaard non-compliance tot 3 procent.
      </p>
      <p>
        Voor marketing-bureaus die AI gebruiken om EU-consumentendata te verwerken, valt het werk binnen de scope van de wet. Inzetters van hoge-risico-AI-systemen moeten fundamental-rights-impact-assessments uitvoeren, menselijk toezicht inrichten, gebruikslogs bijhouden voor post-market-monitoring en medewerkers AI-literacy-training geven. De categorieen die het meest raken aan marketing-werk zijn AI die individuen scoort of evalueert, en AI in werving en HR.
      </p>
    </>
  ),
  'linkedin-off-platform-event-ads-globale-uitrol': (
    <>
      <p className="lead-para">
        LinkedIn maakte Off-Platform Event Ads op 6 mei wereldwijd beschikbaar. Volgens Sourcegeek kunnen marketeers vanaf nu event-advertenties in de LinkedIn-feed serveren die rechtstreeks doorlinken naar externe registratiepagina&apos;s, eigen event-sites, livestreams of formulieren. Tot voor kort moest de aanmelding binnen LinkedIn-omgeving plaatsvinden, met beperkte controle over de vervolg-data.
      </p>
      <p>
        Het voordeel zit in het behouden van je eigen stack: CRM-velden, consent-flow, opvolg-mails en attributie blijven aan jouw kant. LinkedIn levert de doelgroep en het beeld in de feed, jij houdt de hand op het inschrijfproces. Voor B2B-organisatoren van webinars, conferenties en demo&apos;s verlaagt dit de drempel om LinkedIn als top-of-funnel-kanaal te gebruiken zonder afscheid te nemen van bestaande event-tools.
      </p>
      <p>
        De rol-out volgde op twee algemene LinkedIn-trends. Posts met externe links krijgen ongeveer 60 procent minder bereik dan posts zonder, en LinkedIn schoof in het algoritme naar wat het zelf &quot;Depth and Authority&quot; noemt: minder viral-reach, meer professionele substantie. Off-Platform Event Ads geven adverteerders een betaalde route om die link-frictie te omzeilen.
      </p>
    </>
  ),
  'youtube-brandcast-2026-tv-checkout-ai-sponsoring': (
    <>
      <p className="lead-para">
        YouTube presenteerde op 13 mei tijdens Brandcast 2026 in Lincoln Center een reeks nieuwe advertentie-formats. De aankondiging op de YouTube-blog noemt drie hoofdthema&apos;s: connected-TV-commerce, AI-gedreven sponsoring en uitgebreide creator-deals.
      </p>
      <p>
        Buy with Google Pay laat kijkers vanaf hun TV in twee klikken een aankoop afronden. YouTube meldt dat conversies vanuit CTV-advertenties in Q1 2026 met meer dan 200 procent jaar-op-jaar groeiden. Custom Sponsorships gebruikt AI om video&apos;s te selecteren die passen bij het moment dat een merk wil bereiken, en Masthead met Custom Content Shelf staat marketeers toe om naast hun hero-creative aanvullende content te tonen.
      </p>
      <p>
        Voor creators komt er Affiliate Partnerships Boost, waarmee merken organische content kunnen amplifyen waarin hun producten al getagd zijn. Multimodal Video Creation gebruikt Gemini, Nano Banana en Veo om van brief naar productie te gaan in een paar prompts. YouTube kondigde tegelijk nieuwe creator-shows aan met onder anderen Trevor Noah, Alex Cooper en Kareem Rahma.
      </p>
    </>
  ),
  'anthropic-claude-small-business-vijftien-workflows': (
    <>
      <p className="lead-para">
        Anthropic lanceerde op 13 mei Claude for Small Business, een pakket connectors en agentische workflows gericht op ondernemers. Volgens SiliconANGLE bevat het pakket vijftien skills die beschrijven hoe Claude payroll plant, boekhouding afstemt, campagnes runt en nieuwe medewerkers onboardt. Het verbindt met QuickBooks, PayPal, HubSpot, Canva, DocuSign, Google Workspace en Microsoft 365.
      </p>
      <p>
        Er is geen extra prijskaartje bovenop de bestaande Claude-licentie en de partner-tools die een bedrijf al gebruikt. Anthropic startte tegelijk een tour van tien Amerikaanse steden, beginnend op 14 mei in Chicago, waar 100 lokale ondernemers per stop een halve dag gratis AI-fluency-training en een hands-on workshop krijgen.
      </p>
      <p>
        De marketing-specifieke workflows draaien om campagne-management, social-distributie en het volgen van prestatie-rapportages. Claude voert ze niet alleen uit, maar plant ze ook in: een prompt zoals &quot;plan een launch voor mijn nieuwe lijn&quot; wordt opgebroken in deel-taken die over meerdere connectors lopen. Het is daarmee Anthropic&apos;s eerste poging om de SMB-doelgroep direct te bedienen in plaats van via Claude-API-bouwers.
      </p>
    </>
  ),
  'insider-one-koopt-bluecore-retail-martech-ipo': (
    <>
      <p className="lead-para">
        Insider One kondigde op 13 mei de overname aan van Bluecore, een retail-martech-platform dat ruim 400 Amerikaanse enterprise-merken bedient zoals Sephora, J.Crew, The North Face, Ralph Lauren en Bloomingdale&apos;s. De voorwaarden van de transactie zijn niet bekendgemaakt. Volgens Bloomberg positioneert Insider One de deal als opmaat naar een geplande IPO.
      </p>
      <p>
        Bluecore brengt zijn Transparent ID Network mee, een identificatie-graaf die meer dan 10 miljard shopper-events per dag verwerkt. Die data-laag versterkt Insider One&apos;s modellen voor retail- en commerce-campagnes. Voor Insider One, dat zichzelf &quot;agentic customer engagement platform&quot; noemt, is dit de tweede grote stap richting de Amerikaanse enterprise-retail-markt.
      </p>
      <p>
        De deal past in een bredere consolidatie-trend onder customer-engagement-platforms. Sinds eind 2025 zijn meerdere zelfstandige CDP- en e-mail-platforms opgekocht of gefuseerd, deels gedreven door de noodzaak om AI-agent-workflows aan een grotere data-laag te koppelen. Voor de top-tien retailers betekent het dat hun martech-vendor-landschap krimpt; voor de middenmoot dat de keuze tussen specialist en suite scherper wordt.
      </p>
    </>
  ),
  'google-ai-max-uit-beta-ai-brief-shopping': (
    <>
      <p className="lead-para">
        Google heeft AI Max voor Search-campagnes deze maand uit beta gehaald, een jaar na de eerste aankondiging tijdens Google Marketing Live 2025. Volgens Google halen campagnes met de volledige feature-set gemiddeld 7 procent meer conversies of conversie-waarde bij een vergelijkbare CPA of ROAS.
      </p>
      <p>
        De grootste toevoeging is AI Brief, een tool waarmee adverteerders in eigen woorden context geven over hun bedrijf, welke boodschappen passen en welk publiek ze willen bereiken. Het systeem accepteert messaging-guidelines, matching-guidelines en audience-guidelines als instructies. AI Max breidt daarnaast uit naar Shopping-campagnes en travel-specifieke ad-formats, en Final URL Expansion ondersteunt verplichte tekst-disclaimers voor compliance-redenen.
      </p>
      <p>
        Vanaf september 2026 worden Dynamic Search Ads, automatisch gegenereerde assets en campagne-brede broad-match-campagnes automatisch geupgrade naar AI Max. Voor adverteerders die nu nog op klassieke DSA draaien, betekent dat een verplichte migratie binnen vier maanden. Google Marketing Live 2026 op 20 mei zal naar verwachting meer details geven over hoe de upgrade verloopt en welke controles bewaard blijven.
      </p>
    </>
  ),
  'publicis-liveramp-22-miljard-wat-bureau-eigenaars-nu-moeten-weten': (
    <>
      <p className="lead-para">
        Publicis Groupe heeft op 17 mei aangekondigd LiveRamp over te nemen voor een totale ondernemingswaarde van 2,167 miljard dollar in cash, tegen 38,50 dollar per aandeel. De prijs ligt 29,8 procent boven de slotkoers van LiveRamp op 15 mei. De deal moet voor het einde van 2026 worden afgerond en wordt vanaf het eerste jaar accretief verwacht voor de winst per aandeel, volgens Adweek en GlobeNewswire (17 mei 2026).
      </p>
      <p>
        LiveRamp is een data-collaboration platform. De kern is een identity-resolution infrastructuur (RampID) die first-party klantdata van verschillende partijen aan elkaar koppelt zonder dat partijen elkaars ruwe data hoeven te zien. Brands, uitgevers en platforms gebruiken het om bestaande data te activeren naar meer dan 350 bestemmingen, waaronder DSPs, retail-media netwerken en walled gardens.
      </p>
      <p>
        Publicis CEO Arthur Sadoun verklaarde tegenover Adweek dat de overname Publicis moet positioneren als leider in &quot;agentic transformation&quot;, oftewel het gebruik van AI-agents om bedrijfsprocessen te automatiseren en data-samenwerking tussen organisaties te coordineren. De Groupe heeft tegelijk haar groeidoelstellingen voor 2027 en 2028 verhoogd naar 7 tot 8 procent omzetgroei en 8 tot 10 procent winstgroei per aandeel.
      </p>
      <p>
        Drie observaties. Een: de agency-holding sector consolideert opnieuw rond data en AI. De Publicis-LiveRamp deal volgt op een reeks ad-tech overnames die het hele jaar lopen. WPP, Omnicom en IPG zullen vrijwel zeker volgen met soortgelijke deals. De vraag is niet of, maar wanneer.
      </p>
      <p>
        Twee: het narratief is nu bevestigd op holding-niveau. Drie jaar geleden was AI in marketing een experiment in een innovatie-lab. Nu wordt er 2 miljard betaald om het strategische verhaal naar enterprise-klanten te kunnen vertellen. Voor elke bureau-eigenaar betekent dat: jouw klanten gaan binnen 12 maanden vragen wat jouw AI-positie is. Niet omdat het hype is, maar omdat hun board die vraag aan hen stelt.
      </p>
      <p>
        Drie: het gat tussen enterprise en MKB wordt zichtbaar groter. Procter &amp; Gamble, Unilever en L&apos;Oreal krijgen straks een geintegreerde Publicis-LiveRamp stack. Het bureau dat een landelijke retailer, een regionale automotive-groep, een D2C-merk of een festival-organisator bedient krijgt dat niet. En heeft dat ook nooit nodig.
      </p>
    </>
  ),
  'conde-nast-search-onder-tien-procent': (
    <>
      <p className="lead-para">
        Condé Nast verwacht dat zoekmachines binnenkort minder dan tien procent van zijn totale website-verkeer leveren, volgens Search Engine Land (13 mei 2026). De uitgever van Vogue, GQ, The New Yorker en Wired baseert die uitspraak op trends die al maanden ingezet zijn na de uitrol van AI Overviews in Google Search en gelijksoortige antwoord-functies bij Bing en Perplexity.
      </p>
      <p>
        De daling is breder dan alleen Condé Nast. Meerdere grote uitgevers melden dat AI-antwoorden steeds vaker de hele lezersvraag afdekken zonder dat de klik naar de bron volgt. Voor titels die historisch tot zestig procent van hun verkeer uit search haalden is dat een fundamentele herziening van het verdienmodel.
      </p>
      <p>
        De uitgever schuift zwaarder naar directe abonnementen, nieuwsbrieven en eigen apps. Op de adverteerderskant valt het verschil tussen zichtbaar zijn in een AI-antwoord en geklikt worden in een ranking nu uit elkaar als twee aparte disciplines, met eigen meetlatten en eigen budgetlijntjes.
      </p>
    </>
  ),
  'lecun-ami-labs-jepa-tegen-llms': (
    <>
      <p className="lead-para">
        Yann LeCun heeft Meta verlaten en start AMI Labs in Parijs samen met serie-ondernemer Alexandre LeBrun. Het bedrijf haalde een seed-ronde op van iets meer dan een miljard dollar bij een waardering van 3,5 miljard, volgens MIT Technology Review (januari 2026). Dat maakt het volgens Latent Space de grootste seed ooit voor een Europees techbedrijf.
      </p>
      <p>
        De richting is expliciet contra-mainstream. Waar OpenAI, Anthropic en Google blijven inzetten op steeds grotere taalmodellen, kiest LeCun voor JEPA, een joint-embedding predictive architecture die wereld-toestanden voorspelt vanuit beelden. In maart verscheen het paper LeWorldModel met die aanpak. LeCun stelt openlijk dat het huidige LLM-traject vastloopt en wijst op zijn nieuwe paper waarin het begrip AGI als operationeel ongeschikt wordt afgeschreven, met een eigen term in de plaats: Superhuman Adaptable Intelligence.
      </p>
      <p>
        Voor de Europese AI-scene is het bedrag opmerkelijk. Tot nu toe haalden alle Mistral- en Aleph-Alpha-rondes samen niet eens in de buurt van deze enkele seed. AMI Labs heeft op dit moment geen product, alleen een research-roadmap, en gebruikt het kapitaal voor compute en team-bouw.
      </p>
    </>
  ),
  'google-ads-gemini-dashboards-real-time': (
    <>
      <p className="lead-para">
        Google Ads krijgt een nieuwe AI-laag ingebakken in zijn dashboard, volgens Search Engine Land (12 mei 2026). De integratie gebruikt de Gemini-modellen om campagne-data in natuurlijke taal te bevragen en geeft volgens Google real-time inzichten, zonder dat de adverteerder eerst rapportage-views hoeft te bouwen.
      </p>
      <p>
        De feature volgt op een bredere beweging waarbij ad-platforms hun eigen AI-assistenten direct in de productinterface stoppen. Meta deed het eerder met Advantage+, TikTok met Smart+ en LinkedIn met Accelerate. Voor Google is het de tweede grote AI-uitrol dit jaar binnen Ads, na de uitbreiding van Performance Max met Gemini-creative-generatie.
      </p>
      <p>
        Wat Google&apos;s variant onderscheidt is dat de Gemini-laag toegang heeft tot historische account-data en cross-campagne signalen, niet alleen de campagne die in beeld staat. Volgens de aankondiging kunnen adverteerders vragen stellen zoals welke segmenten verschuiven of waar de marge het hardst beweegt, en krijgen ze antwoorden onderbouwd met klikbare onderliggende rapporten.
      </p>
    </>
  ),
  'amazon-ads-22-procent-groei-q1-2026': (
    <>
      <p className="lead-para">
        Amazon&apos;s advertentie-omzet groeide in het eerste kwartaal van 2026 met 22 procent jaar-op-jaar tot 17,2 miljard dollar, volgens Emerce (5 mei 2026). Dat brengt de business op een geannualiseerde run-rate van ongeveer 70 miljard dollar, circa 10 procent van Amazon&apos;s totale Q1-omzet.
      </p>
      <p>
        Amazon Ads draait niet alleen op de commerce-site, maar ook op Prime Video, IMDb en de gaming-streamer Switch. Forrester bestempelde Amazon onlangs als leider in omnichannel-advertising voor connected TV en commercial media. CEO Andy Jassy verwijst zelf naar die erkenning in de toelichting op de cijfers.
      </p>
      <p>
        In de bredere advertentie-markt staat Amazon nu stevig op de derde plek, achter Google en Meta. Met 22 procent groei in Q1 versmalt het verschil opnieuw. Dat is relevant voor adverteerders omdat het signaal naar agencies en in-house teams duidelijk wordt: budget-allocatie tussen de drie grote platforms is geen tweestrijd meer.
      </p>
    </>
  ),
  'spotify-ai-muziek-verificatie': (
    <>
      <p className="lead-para">
        Spotify werkt aan een verplichte verificatieprocedure voor uploads. Labels en distributeurs
        moeten gaan aantonen dat de uitvoerder van een track een echte persoon is, of expliciet
        markeren dat het om een AI-creatie gaat.
      </p>
      <p>
        Aanleiding is de explosie van AI-gegenereerde tracks die onder bestaande artiestennamen
        worden geüpload. Volgens Spotify gaat het om tienduizenden uploads per maand. De maatregel
        komt bovenop het eerder ingevoerde filter dat tracks met minder dan 1.000 streams uitsluit
        van royalty-uitkering.
      </p>
      <p>
        De roll-out start volgens Spotify dit kwartaal voor grote distributeurs. Wanneer de
        verificatie verplicht wordt voor zelf-uploadende artiesten is nog niet bekend.
      </p>
    </>
  ),
  'oscars-ai-acteerprestaties-niet-toegestaan': (
    <>
      <p className="lead-para">
        De Academy of Motion Picture Arts and Sciences heeft bevestigd dat acteerprestaties die met
        generatieve AI tot stand komen, niet in aanmerking komen voor een Oscar in de categorieën
        Beste Acteur, Beste Actrice en Beste Bijrol.
      </p>
      <p>
        De regel staat in de bijgewerkte criteria voor het seizoen 2026-2027. Een &quot;performance&quot;
        moet volgens de Academy het werk zijn van een geïdentificeerde menselijke acteur. Digitale
        verjonging, stem-aanpassing en motion-capture vallen niet onder de uitsluiting, mits de
        onderliggende prestatie van een mens komt.
      </p>
      <p>
        De Academy laat AI-gebruik in andere disciplines (visuele effecten, geluid, montage)
        ongemoeid. Daar wordt alleen verlangd dat het gebruik bij inzending wordt gemeld.
      </p>
    </>
  ),
  'us-defense-ai-deals-zonder-anthropic': (
    <>
      <p className="lead-para">
        Het Amerikaanse ministerie van Defensie kondigt overeenkomsten aan met acht techbedrijven
        voor wat het zelf een &quot;AI-first leger&quot; noemt: SpaceX, OpenAI, Google, Nvidia,
        Reflection, Microsoft, AWS en Oracle. Anthropic, naast OpenAI de grootste Amerikaanse
        AI-lab, ontbreekt opvallend.
      </p>
      <p>
        De contracten lopen volgens het Pentagon over meerdere jaren en omvatten zowel infrastructuur
        (cloud, compute) als modellen voor analyse en besluitondersteuning. Een totaalbedrag is niet
        gepubliceerd; eerdere defensiecontracten met OpenAI en Microsoft alleen liepen al in de
        miljarden.
      </p>
      <p>
        Anthropic heeft eerder publiek aangegeven terughoudend te zijn met defensiecontracten en
        bepaalde toepassingen, zoals geautomatiseerde wapeninzet, expliciet uit te sluiten in zijn
        gebruiksvoorwaarden. Of dat de reden is voor afwezigheid in deze ronde, is door geen van
        beide partijen bevestigd.
      </p>
    </>
  ),
  'certe-mijnadviseur-chatgpt-koppeling': (
    <>
      <p className="lead-para">
        De Nederlandse verzekeringsorganisatie Certe lanceert MijnAdviseur, een ChatGPT-applicatie
        die verzekeringsvragen beantwoordt en de gebruiker vervolgens routeert naar een aangesloten
        financieel adviseur. Anders dan vergelijkers als Independer wordt geen prijs- of
        product-vergelijking getoond.
      </p>
      <p>
        De applicatie is beschikbaar als GPT in de ChatGPT-store. Vragen worden beantwoord op basis
        van Certe-contentbibliotheken; bij concrete behoefte aan een offerte volgt een doorverwijzing
        naar het netwerk. Certe omschrijft het als &quot;eerste-lijns-advies&quot; gekoppeld aan
        menselijk vervolgcontact.
      </p>
      <p>
        Of de routering volgens AFM-regelgeving voldoende objectief is, hangt af van de manier
        waarop adviseurs worden gekozen. Certe heeft daarover nog geen toelichting gegeven.
      </p>
    </>
  ),
}

const DISPATCH_PERSPECTIVES: Record<string, string> = {
  'seo-changelogs-ondergewaardeerde-spil-in-enterprise-governance':
    "Voor bedrijven met complexe websites is het bijhouden van een changelog geen luxe, maar noodzaak. Het dwingt teams tot discipline in versiebeheer en zorgt ervoor dat SEO niet langer als een losstaand proces wordt gezien, maar integraal onderdeel wordt van elke technische update. Bureaus kunnen hun klanten hiermee helpen door standaard changelogs op te nemen in projectdocumentatie en opleidingen.",
  'seo-changelogs-ondermijnd-door-onzichtbare-updates':
    "Voor bureaus die grote websites beheren is het verstandig om klanten te adviseren over gestructureerde changelog-systemen. Niet alleen voorkomt dit onverwachte dalingen in rankings, het maakt ook samenwerking tussen verschillende teams soepeler. Binnen eigen organisaties kan een dergelijk systeem helpen om snel te reageren op problemen en de impact van wijzigingen beter te begrijpen.",
  'openai-brengt-conversie-gerichte-ads-voor-chatgpt':
    "Voor bedrijven die al gebruikmaken van AI-gestuurde klantinteractie biedt dit nieuwe model kansen om conversies directer te beïnvloeden. Het vereist echter wel een duidelijke strategie om gebruikerservaring en commerciële intentie in balans te houden. Daarnaast kan de komst van pay-for-results pricing druk zetten op traditionele betaalmodellen in digitale marketing.",
  'ai-in-de-creative-industrie':
    "Voor Nederlandse en Belgische bureaus is dit een wake-upcall. De druk om mee te gaan in de AI-trend neemt toe, maar de balans tussen efficiëntie en creativiteit blijft lastig. Wie te snel overschakelt op AI-gedreven campagnes, loopt het risico dat klanten merken als ‘standaard’ of ‘onpersoonlijk’ ervaren. Een gefaseerde aanpak, waarbij AI wordt ingezet als ondersteunend gereedschap in plaats van vervanging, lijkt de meest duurzame route.",
  'ai-herdefinieert-creativiteit-bij-bureaus':
    "Voor bureaus betekent deze ontwikkeling dat investeren in AI-competenties geen keuze meer is, maar een noodzaak om relevant te blijven. Het gaat niet om het vervangen van creatievelingen, maar om het versterken van hun rol met technologie die administratieve lasten vermindert. Tegelijkertijd moeten bureaus kritisch blijven op waar AI wel en niet geschikt is: authentieke merkervaringen blijven afhankelijk van menselijke craftsmanship en strategische visie.",
  'amerika-budget-9-miljard-voor-ai-spionage':
    "Voor bedrijven die afhankelijk zijn van high-performance computing of AI-infrastructuur is deze ontwikkeling een waarschuwingssignaal. De vraag naar schaarse hardware neemt toe, wat kan leiden tot hogere kosten of langere levertijden. Het is verstandig om nu al na te denken over alternatieven of samenwerkingen om toekomstige knelpunten te voorkomen. Daarnaast benadrukt dit hoe technologiebeleid op nationaal niveau directe impact kan hebben op private sectoren.",
  'ai-washing-bedrijven-rebranden-zich-als-tech':
    "De trend laat zien hoe snel nieuwe technologieën kunnen verwateren tot een marketinglabel. Voor ondernemers betekent dit dat consumenten en klanten steeds kritischer worden op claims over innovatie. Het risico bestaat dat het vertrouwen in échte AI-toepassingen afneemt als elke verbetering direct wordt bestempeld als kunstmatige intelligentie. Transparantie in plaats van hype wordt daarmee een grotere differentiator.",
  'openai-race-naar-agi-onthuld':
    "De onthullingen over OpenAI laten zien hoe technologiebedrijven soms doorschieten in hun ambities, waarbij ethiek en transparantie ondergeschikt raken aan groei en dominantie. Voor ondernemers is dit een waarschuwing: zelfs organisaties met ogenschijnlijk nobele doelen kunnen veranderen in gesloten systemen waar medewerkers zich gevangen voelen. Het benadrukt het belang van duidelijke kaders en checks-and-balances, ook bij innovatieve projecten.",
  'buitenlandse-merken-in-afrika':
    "Voor bedrijven die buiten Europa willen groeien, is Afrika een kansrijke maar complexe markt. Succes hangt af van het balanceren tussen gemak (marktplaatsen) en investeringen in langetermijnrelaties. Wie kiest voor directe verkoop of lokale partnerschappen, moet bereid zijn om tijd te steken in cultuur, logistiek en compliance.",
  'organische-traffic-alleen-als-business-impact':
    "Voor bureau-eigenaars en in-house teams betekent dit dat ze hun SEO-strategie moeten verschuiven van kwantiteit naar kwaliteit. Het gaat niet om het aantal bezoekers, maar om de juiste bezoekers. Focus op pagina’s die direct bijdragen aan de bedrijfsdoelen en vermijd rapportages die alleen maar aantallen laten zien zonder context. Dat maakt het makkelijker om prioriteiten te stellen en middelen efficiënter in te zetten.",
  'openai-breidt-chatgpt-ads-manager-beta-uit-met-budget-en-locatie-opties':
    "Voor bureaus en merken die experimenteren met AI-gestuurde advertentieplatformen is dit een logische volgende stap. De toevoegingen sluiten aan bij wat adverteerders al gewend zijn van traditionele advertentieplatformen, zoals Google Ads of Meta. Het is verstandig om deze nieuwe mogelijkheden direct te testen in kleine campagnes om de impact op conversies en kosten te meten.",
  'vodafone-batterijgarantie-drie-jaar-accuvervanging':
    "Voor bedrijven die apparatuur leveren of repareren is dit een signaal dat consumenten steeds vaker langdurige zekerheid eisen over productprestaties. Een duidelijke communicatie over garantievoorwaarden en eventuele extra kosten voorkomt onduidelijkheid en klantontevredenheid. Bedrijven doen er goed aan om dergelijke regelingen proactief te communiceren, zodat ze niet als marketingstunt maar als service worden gezien.",
  'microsoft-verbergt-copilot-knop-in-office-na-kritiek':
    "Voor bedrijven die afhankelijk zijn van Microsoft-software kan deze aanpassing betekenen dat medewerkers minder worden afgeleid door AI-prompts tijdens hun werkzaamheden. Het toont aan dat grote techbedrijven soms snel schakelen bij gebruikersonvrede, ook al blijft de onderliggende technologie behouden. Voor marketeers en bureaus die tools zoals Copilot integreren in workflows, is het verstandig om rekening te houden met dergelijke interface-wijzigingen die invloed kunnen hebben op adoptie en gebruiksvriendelijkheid.",
  'mistral-overname-emmi-ai-versterkt-europese-chip-en-auto-sector':
    "Deze overname laat zien hoe Europese spelers proberen aan te haken bij de mondiale AI-race, vooral in sectoren waar Europa traditioneel sterk staat zoals halfgeleiders en automotive. Het benadrukt ook de groeiende rol van niche-AI-bedrijven die zich richten op specifieke industriële uitdagingen. Voor Nederlandse en Belgische bedrijven in deze sectoren kan dit leiden tot nieuwe samenwerkingsmogelijkheden of snellere toegang tot geavanceerde simulatietechnieken.",
  'mazda-centraliseert-ai-ready-dataplatform-met-dell-technologies':
    "Voor bedrijven die met grote hoeveelheden historische data werken, toont deze casus hoe consolidatie leidt tot zowel kostenbesparingen als operationele verbeteringen. De stap naar een AI-ready infrastructuur vereist niet alleen technische schaalbaarheid, maar ook een duidelijke visie op hoe data straks wordt ontsloten en gebruikt. Dat vraagt om investeringen in moderne opslagoplossingen en een cultuur waarin data niet langer gefragmenteerd blijft.",
  'spotify-lanceert-ai-remixes-voor-premium-gebruikers':
    "Voor bedrijven die content creëren of distribueren is dit een teken dat AI steeds meer wordt ingezet om gebruikerservaringen te personaliseren. Het biedt kansen om nieuwe inkomstenstromen te ontsluiten, maar brengt ook vragen met zich mee over auteursrecht en de waarde van originele muziek. Ondernemers doen er goed aan na te denken hoe ze dergelijke technologieën kunnen toepassen zonder hun core business te ondermijnen.",
  'ai-gemaakte-boeken-zonder-waarschuwing-te-koop':
    "Voor ondernemers die content produceren of distributiepartners gebruiken, is dit een waarschuwing om transparantie serieus te nemen. Klanten waarderen duidelijkheid over de herkomst van producten, ook als die digitaal tot stand komen. Het risico op reputatieschade door misleiding weegt zwaarder dan eventuele kosten voor extra labelling.",
  'cerebras-beursgang-ai-chipsector':
    "Deze ontwikkeling laat zien hoe snel nieuwe spelers kunnen opschalen in een markt die gedomineerd wordt door gevestigde namen als NVIDIA. Voor bedrijven die afhankelijk zijn van rekenkracht kan dit leiden tot meer keuze en mogelijk lagere kosten op termijn. Tegelijkertijd benadrukt het de risico’s van investeren in nog verlieslatende technologieën met hoge verwachtingen.",
  'btw-fraude-netwerk-europa-operatie-admiral':
    "Wat hieronder ligt is een bredere beweging. Toezichthouders verschuiven van rapportage achteraf naar realtime zichtbaarheid op transactieniveau. Niet alleen voor btw, ook voor de keten van inkoop, betalingen en facturatie. Bedrijven die hun administratie nog inrichten rond maandafsluitingen lopen straks achter de feiten aan.\n\nDe vernietiging van het Lissabon-vonnis laat ook iets anders zien: complexe internationale fraudezaken stranden vaak op procedurefouten, niet op gebrek aan bewijs. Voor zowel opsporing als verdediging wordt de kwaliteit van het procesdossier minstens zo bepalend als de feiten zelf.",
  'signaalverval-bedreigt-top-of-funnel-prestaties':
    "Last-click attributie is geen meting maar een gewoonte. Wie awareness-budgetten alleen op directe conversies afrekent, zal die budgetten vroeg of laat te klein maken. Een tijdsgebonden model, marketing mix modelling, of zelfs een eenvoudige incrementality-test geeft een eerlijker beeld.\n\nDe les is niet dat last-click slecht is, maar dat het maar één lens is. Wie meerdere lenzen naast elkaar legt, ziet pas waar campagnes echt werken.",
  'google-integreert-meridian-in-analytics-360':
    "Voor bureau-eigenaars en in-house marketeers betekent deze integratie dat ze minder afhankelijk worden van externe MMM-tools. Het is raadzaam om de nieuwe functionaliteit direct te testen zodra deze beschikbaar is, zodat je kunt beoordelen hoe de predictieve metric aansluit bij je bestaande rapportagestructuur. Houd er rekening mee dat de nauwkeurigheid van de voorspellingen afhangt van de kwaliteit en consistentie van je meetdata. Begin met kleine pilots om de waarde voor jouw specifieke situatie in kaart te brengen.",
  'google-breidt-demand-gen-uit-met-youtube-creator-tools':
    "Voor bureau-eigenaars en marketeams biedt deze uitbreiding concrete kansen om campagnes effectiever in te zetten. Begin met het testen van creator-samenwerkingen op YouTube, maar zorg dat de content aansluit bij de merkwaarden en doelgroep. Gebruik de Maps-inventaris alleen als je een duidelijke lokale focus hebt, anders kan het verspilling van budget zijn.\n\nDe AI-optimalisatie is interessant, maar houd altijd controle over de richting van campagnes. Stel duidelijke KPI’s vooraf vast en monitor de resultaten nauwlettend om onverwachte uitgaven te voorkomen. Deze tools kunnen tijd besparen, maar vervangen geen strategisch inzicht.",
  'google-lanceert-ask-advisor-in-ads-analytics-en-merchant-center':
    "Voor bureau-eigenaars en marketingteams betekent dit dat ze sneller kunnen schakelen tussen verschillende tools zonder handmatige data-overdracht. Begin met testen in een klein onderdeel van je account om te zien hoe de assistent omgaat met specifieke vraagstukken binnen jouw branche.\n\nHoud er rekening mee dat de tool nog in ontwikkeling is: controleer altijd de gegenereerde aanbevelingen voordat je actie onderneemt. Zorg dat je team bekend is met de mogelijkheden en beperkingen van AI-gestuurde optimalisatie voordat je vol vertrouwen beslissingen neemt.",
  'google-marketing-live-2026-gemini-drijft-search-advertising-en-commerce':
    "Deze ontwikkelingen benadrukken dat marketeers hun strategieën moeten aanpassen aan een wereld waarin AI niet alleen ondersteunt, maar de kern van de interactie vormt. Begin met het testen van conversational search-optimalisaties in bestaande campagnes, bijvoorbeeld door langere zoekopdrachten te analyseren die nu worden gegenereerd. Zorg dat je meetdata beschikbaar is voor deze nieuwe interactievormen, zodat je uplift kunt meten ten opzichte van traditionele campagnes. Voor bureaus is dit een kans om klanten te helpen bij deze transitie door middel van training en pilots.",
  'nieuw-raamwerk-zichtbaarheid-ai-tijden':
    "Voor bureau-eigenaars is dit een signaal om direct na te gaan of hun klantencontent zichtbaar is in AI-systemen. Begin met het controleren of jouw content wordt genoemd in AI-antwoorden door relevante vragen van de doelgroep te inventariseren.\n\nEen praktische eerste stap is het vergelijken van zoekopdrachten die leiden tot conversies met vragen die door AI worden beantwoord. Zorg dat je content helder, gestructureerd en direct bruikbaar is voor zowel zoekmachines als AI-tools.\n\nTot slot: AI-systemen belonen bronvermelding en herkenbaarheid. Zorg dat jouw merk duidelijk blijft in elke fase van de gebruikersreis.",
  'google-card-universeel-winkelwagentje-ecommerce':
    'Feedkwaliteit is de nieuwe SEO. Wie zijn producten goed gestructureerd aanlevert, is zichtbaar in AI-vergelijkingen. Wie dat niet doet, bestaat niet in de beslissingslaag van de gebruiker. Stevin trekt productfeed-signalen en campagneprestaties samen zodat je ziet waar je mist.',
  'gemini-spark-proactief-zoeken-intent-verdwijnt':
    'De overgang van reactief zoeken naar proactieve AI-monitoring verandert de logica van adverteren. De focus verschuift van het winnen van een zoekmoment naar aanwezig zijn in de databronnen die Spark gebruikt als referentie. Dat is een GEO-vraag, geen SEA-vraag.',
  'google-antigravity-2-claude-code-cursor-gratis':
    'Voor bureaus die zelf marketing-tooling willen bouwen, is de gratis public preview een reele instap. Antigravity is geen speelgoed: zestien agents, een miljoen tokens context, en volledige Google-ecosysteemintegratie. Of het Cursor of Claude Code structureel vervangt, hangt af van gebruik. Maar de prijsdrempel is weg.',
  'google-io-2026-marketing-teams-gemini-search-ads':
    'De verschuiving van keyword-ranking naar AI-interface-aanwezigheid is de grootste structurele verandering voor SEO en paid search in jaren. Wie wacht tot Google het uitrolt, begint achterop. Wie nu begrijpt hoe Gemini content selecteert en presenteert, bouwt een voorsprong op die moeilijk in te halen is. Stevin volgt de GEO-signalen per klant automatisch.',
  'retail-crm-pos-integratie-klaviyo-aankoophistorie':
    'Het CRM-vraagstuk in retail is in de kern een datakoppelingsvraagstuk. De aankoophistorie zit in de kassa. De klantcommunicatie zit in een ander systeem. Zolang die twee niet goed gesynchroniseerd zijn, stuur je op aannames. Stevin trekt POS-data, campagnedata en klantgedrag samen in een overzicht dat per vestiging en per segment laat zien wat werkt.',
  'ga4-ai-verkeer-custom-channel-group-geo':
    'Dit is de meest onderschatte GEO-maatregel van dit moment. Rankings zijn zichtbaar. Organisch verkeer is zichtbaar. AI-verkeer is een blind spot. Wie nu een custom channel group aanmaakt, heeft over zes maanden een trendlijn. Wie wacht, niet. Stevin trekt dit kanaal automatisch apart zodra je GA4 hebt gekoppeld.',
  'new-york-pizza-toont-macht-van-lokale-marketing':
    "Voor bureau-eigenaars en in-house marketeers is dit een duidelijke reminder dat technologie niet altijd de oplossing is. Begin met het begrijpen van je doelgroep op lokaal niveau en bouw daarop voort. Investeer eerst in sterke lokale marketingstrategieën voordat je grote sprongen maakt met geavanceerde tools. Authenticiteit en persoonlijke aandacht leveren vaak meer op dan data-gedreven campagnes zonder context.",
  'organisaties-bouwen-merkbeelden-in-plaats-van-merken':
    "Voor bureaus en marketeers betekent dit dat het tijd is om kritisch te kijken naar de opdrachten die worden aangenomen. Als een klant alleen vraagt om een nieuw logo of kleurenschema zonder strategische onderbouwing, is het belangrijk om die vraag te herformuleren naar de onderliggende behoeften. Begin met een gesprek over doelstellingen, doelgroep en concurrentie voordat er wordt geïnvesteerd in design.\n\nOok in-house teams kunnen profiteren van deze aanpak door eerst intern helderheid te creëren over wat het merk wil uitstralen. Werk met meetdata om te achterhalen welke associaties bij de doelgroep leven en pas daar je communicatie op aan. Merkidentiteit gaat niet over hoe je eruitziet, maar over wie je bent en waarom je bestaat.",
  'middelmatige-ai-content-schadelijk-voor-merk':
    "Voor bureau-eigenaars en in-house marketeers is dit een belangrijke reminder om AI niet als wondermiddel te zien. Begin met een duidelijke strategie: bepaal welke contenttypes geschikt zijn voor automatisering en waar menselijke controle essentieel blijft. Gebruik meetdata om te bepalen of AI daadwerkelijk uplift biedt in efficiëntie of conversie, zonder de merkbeleving aan te tasten. Een praktische stap is het instellen van een reviewproces waarbij alle AI-output wordt gecheckt op consistentie met de merkidentiteit.",
  'nieuwe-ecommerce-tools-mei-2026':
    "Voor bureau-eigenaars en in-house marketeers is het belangrijk om deze ontwikkelingen niet als losse trends te zien, maar als onderdeel van een groter ecosysteem. Begin met een duidelijke prioritering: welke tool lost een directe pijnpunt op? Bijvoorbeeld predictieve AI voor voorraadbeheer kan direct leiden tot minder uitval en hogere marges. Kies daarnaast oplossingen die integreren met bestaande tech-stacks om implementatietijd te beperken. Tot slot: test kleine pilots voordat je grootschalig investeert. Cross-border commerce vereist bijvoorbeeld kennis van lokale betalingsvoorkeuren en regelgeving - begin met een markt om de impact te meten.",
  'merkidentiteit-niet-gebaseerd-op-meningen':
    "Voor bureau-eigenaars en in-house marketeers betekent dit dat merkstrategieen niet langer mogen draaien om interne discussies of gevoel. Begin met een grondige analyse van bestaande meetdata, zoals klantfeedback, verkoopcijfers of sentimentanalyses op sociale media. Gebruik deze inzichten als basis voor workshops met stakeholders, zodat iedereen dezelfde feiten als vertrekpunt neemt. Vervolgens is het zaak om de merkwaarden concreet te maken met gedragsindicatoren: welke acties moeten consumenten verrichten na blootstelling aan je communicatie? Test deze hypotheses met kleine experimenten voordat je grote campagnes lanceert.",
  'alibaba-omzet-kwartaal-stijgt-maar-blijft-achter-verwachtingen':
    "Voor bureau-eigenaars en in-house marketeers is dit een herinnering dat zelfs grote spelers niet immuun zijn voor marktveranderingen. Het is belangrijk om je eigen data goed te monitoren en niet alleen te vertrouwen op macrotrends. Als je afhankelijk bent van partners of platforms zoals Alibaba, overweeg dan om je marketingstrategie te diversifieren om risico's te spreiden.",
  'boekhouder-als-verborgen-dealbreaker':
    'Voor bureaus die klanten bedienen in sectoren met een fiscale koopdrempel: maak de adviseur onderdeel van je campagne, niet de eindgebruiker alleen. Een pagina voor boekhouders met rekenvoorbeelden, een whitepaper via een accountantsblad, of een eenvoudige fiscale samenvatting die de eindgebruiker kan doorsturen. Wie de influence chain in kaart brengt, vindt kanalen die de concurrentie structureel overslaat.',
  'kmo-doelgroep-segmenteren':
    'Voor bureaus die KMO-campagnes draaien: stop met "ondernemer" als persona. Bouw drie varianten van je boodschap voor drie bedrijfstakken die elk anders kopen, anders lezen en anders beslissen. De data om dat te segmenteren zit al in LinkedIn, Meta of je CRM. De bereidheid om het te doen is het echte onderscheid.',
  'regionale-context-campagne-optimalisatie':
    'Voor bureaus die campagnes draaien over meerdere regio\'s: voeg contextdata toe naast conversiedata. Vraag niet alleen welke regio beter converteert, maar ook waarom. Infrastructuur, seizoensdata, eigendomsratio\'s en lokale regelgeving zijn meetbaar en voorspelbaar. Stevin brengt die laag samen met campagneprestaties, zodat budgetverschuivingen plaatsvinden op basis van structurele factoren in plaats van toeval.',
  'beardbrand-expansion-plan-na-groeistagnatie':
    "Voor bureaus en marketeers is dit een herkenbaar scenario: merken die lang succesvol waren, moeten soms radicaal vernieuwen om relevant te blijven. Het is verstandig om regelmatig de eigen doelgroep en marktpositie te toetsen aan meetdata. Een frisse blik vanuit externe partijen kan helpen om blind spots te identificeren. Blijf niet hangen in wat ooit werkte, maar durf te experimenteren met nieuwe kanalen of boodschappen.",
  'juni-2026-contentkansen-emotionele-thema-s':
    "Voor bureau-eigenaars en in-house marketeers is het verstandig om nu al vast te stellen welke thema's in juni relevant zijn voor hun klanten. Begin met een simpele contentkalender en koppel deze aan meetdata uit eerdere jaren. Zo zie je snel welke onderwerpen resoneren en waar je uplift kunt verwachten. Houd ook rekening met seizoensgebonden zoekgedrag via tools als Google Trends om je planning te verfijnen.",
  'ai-verandert-print-on-demand-ecommerce':
    "Voor bureau-eigenaars betekent dit dat klanten nu verwachten dat AI niet alleen wordt ingezet voor efficiency, maar ook voor strategische beslissingen. Begin met het helder maken van de doelgroep en het creëren van een consistente productfeed voordat je AI-tools implementeert. Test kleine pilots uit voordat je schaalt, zodat je meet wat werkt zonder grote investeringen vooraf. Houd rekening met langere acquisitiecycli: druk op korte termijn resultaat kan leiden tot suboptimale keuzes.",
  'google-ads-introduceert-drie-ai-max-updates':
    "Voor bureau-eigenaars en in-house marketeers is het belangrijk om deze updates snel te evalueren. Begin met een testcampagne om de impact van AI Max voor Shopping op je productfeed te meten. Gebruik AI Brief als startpunt voor wekelijkse performance-reviews in plaats van handmatige rapportages. Zorg dat je disclaimerteksten consistent en compliant blijven met Google's richtlijnen. Deze tools kunnen tijd besparen, maar vereisen wel dat je de gegenereerde aanbevelingen kritisch beoordeelt op relevantie voor jouw doelgroep.",
  'politieke-targeting-en-visuele-aandacht-eye-tracking':
    "Voor bureaus en marketeers betekent dit dat politieke context niet alleen relevant is voor branding, maar ook voor de effectiviteit van advertenties. Het is belangrijk om te testen hoe visuele elementen en boodschappen samenkomen in campagnes die politieke thema's raken. Zorg ervoor dat de creatie niet alleen informatief is, maar ook aansluit bij de verwachtingen van je doelgroep. Kleine aanpassingen in design of timing kunnen al leiden tot meetbare verschillen in aandacht.",
  'ai-print-on-demand-spelers-moeten-fundament-leggen':
    "Voor bureau-eigenaars betekent dit dat klanten nu verwachten dat AI niet alleen efficiency levert, maar ook strategische inzichten biedt. Begin met het helder definiëren van de doelgroep en het opbouwen van een consistente productfeed voordat je AI-tools implementeert. Voer kleine pilots uit om meetdata te verzamelen zonder grote vooraf investeringen. Houd rekening met langere acquisitiecycli: druk op korte termijn resultaat kan leiden tot suboptimale keuzes.",
  'google-ads-kosten-stijgen-conversie-efficientie-2025':
    "Voor bureau-eigenaars en marketeers betekent deze ontwikkeling dat investeringen in Google Ads nog zorgvuldiger moeten worden afgewogen. Het is verstandig om te focussen op campagnes met duidelijke meetdata en bewezen uplift. Daarnaast is het raadzaam om te experimenteren met nieuwe targeting-opties, zoals dynamische zoekadvertenties of responsieve zoekadvertenties, om de kosten te spreiden over verschillende kanalen. Het monitoren van de totale acquisitiekosten (CAC) wordt nu belangrijker dan ooit.",
  'marketing-enters-air-traffic-control-era':
    "Voor bureau-eigenaars en in-house marketeers betekent dit dat de focus moet verschuiven van campagneplanning naar systeemdenken. Begin met het in kaart brengen welke AI-systemen binnen je doelgroep al actief zijn en hoe ze klantdata verwerken. Bouw vervolgens interne processen op die net zo flexibel zijn als de AI's waarmee je concurreert: korte feedbackloops, directe meetdata en de mogelijkheid om snel bij te sturen. Het is verstandig om nu al te investeren in tools die realtime data integreren met je bestaande systemen. Denk aan API-koppelingen met CRM's of CDP's die signalen direct doorgeven aan je marketingautomatisering. Houd er rekening mee dat deze overgang niet alleen technisch is, maar ook vraagt om nieuwe samenwerkingsvormen tussen afdelingen zoals IT, data-analyses en creatievelingen.",
  'google-ads-kosten-stijgen-conversies-verbeteren-2025':
    "Voor bureau-eigenaars en marketeers is dit een signaal om kritisch te kijken naar de ROI van Google Ads-campagnes. Zorg dat je meetdata altijd up-to-date is en focus op campagnes waar je zowel kosten als conversies nauwlettend volgt. Overweeg om extra budget vrij te maken voor A/B-testen van landingspagina's en creatives, zodat je de uplift kan maximaliseren zonder direct meer te betalen. Daarnaast is het verstandig om alternatieve kanalen zoals Microsoft Advertising of LinkedIn te evalueren, zeker als je doelgroep daar actief is.",
  'openai-chatgpt-ads-manager-cpc-self-serve':
    'Voor bureau-eigenaars en in-house teams betekent dit dat je een testbudget kunt vrijmaken zonder eerst een verkoopgesprek met OpenAI te plannen. De relevante vraag is niet of ChatGPT Ads werkt, maar of jouw doelgroep daar zit en of CPC-attributie in jouw stack landt. Begin klein, meet wat doorklikt, en bewaar de tijd die je vroeger kwijt was aan minimum-spend-besprekingen voor het echte werk.',
  'klaviyo-anthropic-claude-mcp-agentic-workflows':
    'Voor in-house teams die op Klaviyo draaien betekent dit dat rapportage-werk dat nu een dagdeel kost, in principe naar een chatprompt verschuift. De vraag aan je bureau wordt scherper: als de prompt het rapport schrijft, waar zit dan jullie waarde? Het antwoord ligt in de duiding en de keuzes die volgen, niet in het exporteren van cijfers. Wij bouwen Stevin met dat antwoord in het achterhoofd.',
  'eu-ai-act-omnibus-akkoord-deadlines-uitgesteld':
    'Voor bureau-eigenaars is dit het moment om twee dingen te checken. Eerst: welke AI-tools draaien er in jullie stack die persoonsdata van EU-consumenten verwerken, en heeft de leverancier al een DPIA klaarliggen. Dan: welke van jullie eigen workflows valt onder hoge-risico, en wie houdt daar de logs van bij. De boetes zijn theoretisch, de toezichthouders zijn dat niet meer.',
  'linkedin-off-platform-event-ads-globale-uitrol':
    'Voor in-house teams die nu webinars en demo\'s runnen via Hopin, Goldcast of een eigen pagina, is dit het moment om de event-flow opnieuw te tekenen. Vraag aan je bureau: trek je LinkedIn-aanmelders direct in onze CRM, of blijven ze in LinkedIn-formulieren hangen waarvan we de data later moeten matchen. Het verschil tussen die twee zit in de snelheid van je opvolging.',
  'youtube-brandcast-2026-tv-checkout-ai-sponsoring':
    'Voor bureau-eigenaars die klanten in retail en D2C bedienen, verschuift de YouTube-vraag van "is video belangrijk" naar "hoe meet je een aankoop die op de TV begint en op de telefoon eindigt". De praktische test is simpel: zet een kleine campagne op met CTV-checkout, en kijk of je analytics-stack de conversie kan toewijzen zonder hand-werk. Lukt dat niet, dan ligt het werk eerst bij de meet-laag, niet bij het format.',
  'anthropic-claude-small-business-vijftien-workflows':
    'Voor in-house marketeers in een MKB-bedrijf opent dit een serieuze vraag: welke workflows die je nu uitbesteedt aan een freelancer of bureau, kunnen straks vanuit een chatprompt draaien. Het antwoord zal per workflow verschillen, en de eerlijke meting is hoeveel her-werk Claude oplevert versus hoeveel tijd het bespaart. Wij volgen dit dichtbij omdat het direct raakt aan wat een bureau-eigenaar de komende twaalf maanden moet uitleggen aan zijn klanten.',
  'insider-one-koopt-bluecore-retail-martech-ipo':
    'Voor in-house teams die op Bluecore draaien, is de eerstvolgende vraag aan de account-manager wanneer roadmap-prioriteiten zullen schuiven, en welke integraties met Insider One-tools verplicht worden. Voor bureaus die merken adviseren over vendor-keuze: martech-consolidatie betekent minder leveranciers maar bredere lock-in. De middenmoot-retailers die nu kiezen, kopen de komende drie jaar effectief de roadmap van een acquirer, niet alleen de software.',
  'google-ai-max-uit-beta-ai-brief-shopping':
    'Voor performance-marketeers en bureau-eigenaars is dit niet een nieuw product, maar een verandering in wie de zoekwoorden kiest. AI Brief geeft je instrument om dat sturend bij te werken in plaats van achteraf te corrigeren. De praktische stap is: schrijf nu een brief-document per klant met messaging, no-go\'s en doelgroep-omschrijving, en gebruik dat als input zodra je migreert. Dan hou je in september je werk over voor de gevallen waar de prompt niet uitpakt zoals verwacht.',
  'publicis-liveramp-22-miljard-wat-bureau-eigenaars-nu-moeten-weten':
    'Het verhaal van Publicis raakt aan het narratief, niet aan het werk. Geen enkele bureau-eigenaar die we dit jaar spraken verloor klanten omdat de concurrentie een data-clean-room had. Ze verloren klanten omdat de maandrapportage te laat kwam, omdat de cijfers uit drie systemen niet overeenkwamen, of omdat een campagne al twee weken minder opleverde dan verwacht voordat iemand het zag. Dat zijn geen agentic-transformation problemen. Dat zijn signaal-problemen. Het verschil tussen weten op 14 mei dat april fout ging, of het op 4 april zien terwijl het gebeurt. Een bureau dat dat verschil voor zijn klanten kan maken zonder een holding-deal van 2 miljard heeft de komende twee jaar een concreet verkoopverhaal. Niet panikeren over agentic-transformation jargon. Wel beginnen met de basis: weten welke campagnes nu, deze week, minder opleveren dan verwacht. Bij welke klant. Op welk kanaal. Met welke verklaring. Dat is geen project van zes maanden en geen audit-traject. Stevin is daar drie jaar in gebouwd, binnen een full-service agency, verfijnd op meer dan tweehonderd klanten. Werkt op de stack die je al hebt: Google Ads, Meta, GA4, Shopify, WooCommerce. Geen migratie nodig. Voor bureau-eigenaars die willen zien wat dat concreet voor hun portefeuille betekent: vrijblijvend gesprek van twintig minuten via stevin.ai/contact. De Publicis-deal is geen probleem voor jou. Stilzitten wel.',
  'conde-nast-search-onder-tien-procent':
    'Voor wie marketing voert is dit geen losse uitgevers-zorg. Het is een signaal dat verkeer uit organisch zoekverkeer onder druk staat ongeacht je vak. Eigen kanalen, e-mail-lijsten en directe communities krijgen daarmee een herwaardering. En voor de paid-kant verschuift het advertising-model bij de grote AI-platforms van klik-gebaseerd naar gepresenteerd-worden. Wie nu nog optimaliseert op klikken alleen, optimaliseert binnenkort op een metric die niet meer telt.',
  'lecun-ami-labs-jepa-tegen-llms':
    'Voor marketing-tools is de directe impact nul. JEPA is research-fase, geen product. Wel relevant is de signaal-waarde. Als de bouwers van LLMs zelf openlijk zeggen dat de architectuur zijn grenzen raakt, hoort daar een nuchterder verhaal bij over wat de huidige generatie tools kan en wat niet. Een agent die je vandaag een werkweek aan rapportage uit handen neemt blijft handig. Een agent die zelfstandig een marketing-strategie van A tot Z voert, in een complexe organisatie, blijft een belofte. De afstand tussen die twee is geen jaartal, het is een onderzoeksprogramma.',
  'google-ads-gemini-dashboards-real-time':
    'Voor adverteerders die alleen binnen Google adverteren wordt het dashboard-werk lichter. Voor wie meerdere kanalen gebruikt verandert het minder dan het lijkt. Een AI-laag binnen Google Ads ziet alleen Google-data. De zinvolle vragen draaien meestal over de portfolio, niet over een enkel platform. Daar zit een belangrijk onderscheid voor agency-teams en in-house marketeers die naast Google ook Meta, TikTok of e-mail draaien. Een single-platform-Gemini lost dat niet op, een meerlaagse beoordeling over kanalen heen wel.',
  'spotify-ai-muziek-verificatie':
    'Voor labels en artiesten betekent dit op korte termijn extra administratie bij elke release. Voor distributeurs een nieuwe controle-laag die ze moeten inbouwen. Wat het feitelijk verandert: AI-tracks blijven mogelijk, maar krijgen een eigen label. Dat is geen ban, het is een meetlat. En meetlatten op platforms zijn altijd het begin van een nieuwe reeks regels.',
  'oscars-ai-acteerprestaties-niet-toegestaan':
    'De Academy trekt een streep waar Hollywood al maanden om vroeg, maar wel een smalle: alleen acteerprestaties zelf. De rest van het filmpakket (effects, sound, montage) blijft open voor AI. Voor productiehuizen: de keuze voor AI-tooling raakt nu een Oscar-strategie. Voor marketeers van streaming-content geldt hetzelfde: weet welke deel van je productie je labelt en welke niet.',
  'us-defense-ai-deals-zonder-anthropic':
    'Voor B2B-marketeers in tech zegt deze ronde één ding heel duidelijk: defensie is een toegangspoort voor enterprise-deals, niet een nichesector. De acht winnaars krijgen een referentie-stempel die de komende vijf jaar blijft betalen. De afwezige partij krijgt een ander stempel ("niet defensie-bereid") en moet uitleggen wat dat betekent voor banken, verzekeraars en overheidsklanten elders.',
  'certe-mijnadviseur-chatgpt-koppeling':
    'Distributie via ChatGPT is geen experiment meer, het is een kanaal. Certe gebruikt het zoals tien jaar geleden Google Ads werd gebruikt: als bron van zoekvragen die naar een eigen funnel worden geleid. Voor andere financiële dienstverleners de vraag: ben je vindbaar binnen ChatGPT als iemand een vraag stelt over jouw product? Niet door SEO. Door aanwezig te zijn als GPT, dataset of partner.',
  'amazon-ads-22-procent-groei-q1-2026':
    'Voor D2C-merken en e-commerce: Amazon Ads is geen optie meer, het is een derde verplichte stap naast Google en Meta. De groei van 22 procent is geen incident, het is een trend die al twee jaar loopt. Voor agencies: kanaalmix-besluiten op basis van alleen ROAS van de individuele platforms missen de bredere portfolio-vraag. Een MMM- of uplift-test over Google + Meta + Amazon laat structureel andere optima zien dan platform-eigen attributie suggereert.',
}

function ArticleWKBody() {
  return (
    <>
      <p className="lead-para">
        Op 11 juni gaat het WK 2026 van start in Mexico City. Vijf weken, 104 wedstrijden, verspreid over drie landen en meerdere tijdzones. De meeste campagnes zijn al weken in productie. De vraag die minder wordt gesteld: op basis van welke data zijn ze gemaakt?
      </p>

      <H2 num="01">Het verkeerde referentiekader</H2>

      <p>
        De meestgemaakte fout bij grote sportevenementen is het gebruik van het verkeerde vergelijkingspunt. Zomercampagnes uit 2025 zijn onbruikbaar als benchmark voor een WK-campagne. De context is fundamenteel anders: het publiek is groter, de aandacht is gefocust, de emotionele lading is hoog. Een zomercampagne vertelt je niets over hoe jouw creative het houdt bij acht wedstrijden op rij met stijgende media-aandacht.
      </p>
      <p>
        Het relevante referentiekader is het EK 2024. Twee jaar geleden, maar de meest vergelijkbare context die beschikbaar is. Bij dat toernooi bereikte de NOS via televisie 14,5 miljoen mensen, ofwel 87,6 procent van de Nederlandse bevolking. Oranje-wedstrijden trokken gemiddeld 5,8 miljoen kijkers. De halve finale tegen Engeland piekte op 6,9 miljoen.
      </p>
      <p>
        De vraag die elk bureau of in-house team nu zou moeten kunnen beantwoorden: welke van jullie creatives hielden het vol over vier toernooiweken? Welke categorieën piekten in de groepsfase en daalden in de kwartfinales? Welke boodschap werkte bij het brede, gemengde EK-publiek, want bijna de helft van de EK-kijkers in 2024 waren vrouwen, een gegeven dat de meeste campagnebriefings negeerden?
      </p>
      <p>
        Die data bestaat. Bij de meeste teams ligt ze ergens in een export, een dashboard dat niemand meer opent, of bij een accountmanager die inmiddels elders werkt.
      </p>

      <BodyFigure
        tag="NOS · EK 2024"
        stat="87,6%"
        statCap="van de Nederlandse bevolking bereikte de NOS via tv tijdens het EK 2024: 14,5 miljoen mensen."
        edition="EDITIE 017 · STRATEGIE"
        source="Bron: NOS / Ster terugblik EK 2024"
      />

      <H2 num="02">Wat het kost om mee te doen</H2>

      <p>
        Een WK is geen gewoon evenement voor media-inkopers. Ster verhoogde zijn tv-tarieven voor 2026 opnieuw, en het sportjaar (WK plus Olympische Winterspelen) is expliciet als drijver benoemd. Het basisgetal van 740 euro per GRP is al een stijging ten opzichte van de voorgaande jaren. Daarbovenop komen premiums voor piekposities rond grote wedstrijden.
      </p>
      <p>
        De mondiale context is niet milder. Volgens het WFA Outlook van april 2026 drijft het WK de mondiale media-inflatie op naar 4,4 procent in 2026, tegenover 4,0 procent in 2025. In het Verenigd Koninkrijk verveelvoudigt de lineaire tv-inflatie bijna vijfvoudig in het WK-kwartaal: van 2,3 procent naar 11,3 procent. Dat patroon tekent zich ook in Nederland af, al zijn de precieze Ster-premiums niet publiek.
      </p>
      <p>
        Nieuw in 2026 zijn de FIFA-drinkpauzes: twee keer per wedstrijd een reclamepauze van maximaal 90 seconden, midden in de speeltijd. Ster heeft deze slots al geintroduceerd. Ze leveren op papier hoog bereik op een moment van verhoogde aandacht, maar ook een hogere instapprijs dan reguliere blokken.
      </p>
      <p>
        Tegelijkertijd: 43 procent van de verwachte wereldwijde kijkers plant het WK via streaming te volgen. In de Nederlandse context betekent dat een verschuiving naar NPO Start en andere streamingdiensten, met bijbehorende CTV-plaatsingen. Onderzoek naar live sport op CTV wijst op een effectiviteit van gemiddeld 66 procent hoger dan kabel- en broadcastplaatsingen, maar de CPMs liggen ook significant hoger dan klassieke display.
      </p>

      <H2 num="03">Het timing-voordeel dat de meeste merken laten liggen</H2>

      <p>
        Er is een window dat structureel wordt onderschat: de weken voor het toernooi begint. Onderzoek naar zoekgedrag rond grote sportevenementen laat zien dat interesse in de week voorafgaand aan de start met ruim 200 procent kan stijgen ten opzichte van de week daarvoor. De consumentenruimte wordt al bezet voordat de eerste wedstrijd is gespeeld.
      </p>
      <p>
        Campagnes die timen op emotionele sportmomenten (aankondigingen, selecties, kwartfinaleplaatsing) leveren in onderzoek 35 tot 80 procent hogere effectiviteit op dan always-on spreiding over dezelfde periode. De merken die in de opbouwfase zichtbaar zijn, profiteren van stijgende aandacht zonder de concurrentiedruk die het toernooi zelf meebrengt.
      </p>
      <p>
        Wie pas op 11 juni begint, rijdt achter het peloton aan. Het gevecht om mentale ruimte wordt al weken eerder beslist.
      </p>

      <H2 num="04">Wear-out over vijf weken</H2>

      <p>
        Een WK duurt vijf weken. Dat is twee keer zo lang als een gemiddelde campagnecyclus en vier keer zo lang als de meeste A/B-testperiodes. Vrijwel geen enkel creatief houdt dat vol zonder rotatie.
      </p>
      <p>
        Industrie-onderzoek naar ad wear-out laat zien dat effectiviteit gemiddeld significant daalt na 2,5 vertoningen per persoon. Bij dagelijkse wedstrijden en hoge media-aandacht wordt die grens in dagen bereikt in plaats van weken. Wie geen systeem heeft om dat bij te houden, merkt het pas als de klikratio al ingezakt is en de frequentie al te hoog is opgelopen om bij te sturen zonder merkschade.
      </p>
      <p>
        Zestig procent van de consumenten geeft aan merken actief te vermijden die steeds dezelfde advertentie tonen. Dat is een risico dat vijf weken lang elke dag opnieuw aanwezig is.
      </p>
      <p>
        De oplossing is geen groter creatief budget. Het is een systeem dat detecteert wanneer een creative zijn effectiviteit verliest, voor je dat ziet in de conversiecijfers. Op basis van frequentie, CTR-verloop en bereikscurve, niet op basis van gevoel.
      </p>

      <H2 num="05">De data bestaat. De vraag is of je er bij kan.</H2>

      <p>
        Het WK 2026 begint over drie weken. De data om een gefundeerde campagne te bouwen (benchmarks uit het EK 2024, mediaprijsinflatie per periode, historische wear-out per creative type, timing-effecten per toernooifase) bestaat. Ze ligt in de platformen waar jullie de afgelopen jaren campagnes hebben gedraaid.
      </p>
      <p>
        Het probleem is niet de beschikbaarheid van die data. Het is de toegankelijkheid. Verspreid over Google Ads, Meta, DV360, Campaign Manager en een handvol rapportagetools, en georganiseerd per campagne in plaats van per toernooisituatie.
      </p>
      <p>
        Een WK komt eens in de vier jaar. Het EK 2024 was de repetitiegeneraal. Wie nu niet systematisch terugkijkt wat er in juni 2024 werkelijk gebeurde in zijn platformen, bouwt de strategie voor juni 2026 opnieuw op aannames.
      </p>
    </>
  )
}

function ArticleAIcowboysBody() {
  return (
    <>
      <p className="lead-para">
        AI in marketing is fantastisch. Wij gebruiken het zelf de hele dag. En toch zal er dit jaar net zo veel bedrijven aan ten onder gaan als bedrijven die er miljoenen mee winnen. Niet omdat de modellen falen, maar omdat de mensen die ze inzetten te snel gaan, te weinig weten van de stack eronder, en te veel rechten weggeven aan tools die ze niet helemaal begrijpen.
      </p>

      <p>
        Hieronder drie scènes uit het afgelopen kwartaal. Twee uit de praktijk, eentje uit de bestuurskamer van een Nederlandse bank. Samen vertellen ze waarom dit voelt als 2008 in online marketing. Alleen sneller, met grotere data en met meer geld op het spel.
      </p>

      <H2 num="01">Een online platform met honderdduizenden e-mailadressen, vibecodend op donderdag</H2>

      <p>
        We spraken laatst met de eigenaar van een online platform dat al jaren stevig draait. Honderdduizenden e-mailadressen in de database, internationale klantenkring met koopkracht, een nichemarkt met dure transacties. Wat veranderde: de marketeer die er werkt is in een paar maanden tijd helemaal opgeschoven naar AI-gedreven werken. Met Claude Code, met een aantal MCP-koppelingen, met enthousiasme.
      </p>

      <p>
        Wat ons opviel in het gesprek was niet de techniek. Het was de combinatie. Geen interne AI-specialist. Een ongezond wantrouwen tegen externe specialisten. En tegelijk een productie-omgeving met data van honderdduizenden welgestelde klanten, gekoppeld aan tools waar de marketeer in real-time mee aan het bouwen is.
      </p>

      <p>
        Op zichzelf is daar niks mis mee. Iedereen die met AI begint, voelt die rush. Het werkt verbluffend snel. Wat in 2019 een vol team developer-werk was, is nu een avond op de bank met een terminal open. Het probleem zit in wat er onder de motorkap gebeurt: welke connector heeft welke rechten gekregen, welke API-key staat in welk script, welke prompts hebben toegang tot welk segment van de klantendatabase. Dat soort vragen krijg je in een vibecoding-flow zelden gesteld omdat het niet voelt als bouwen, het voelt als chatten.
      </p>

      <PullQuote
        text='"Dit voelt als bouwen, alleen voelt het niet als bouwen. Het voelt als chatten. En dat is precies waarom mensen rechten weggeven die ze achteraf niet meer kunnen terughalen."'
        cite="Stevin Journal, redactie."
      />

      <H2 num="02">Een bureau dat in twee maanden tijd alles op AI heeft ingezet</H2>

      <p>
        Tweede scène. Een Nederlands marketingbureau plaatste deze week een trotse LinkedIn-post over hun nieuwe AI-platform, mét screenshot van het klant-dashboard. Hun specialisten zaten 70 procent van de dag op uitvoering, schreven ze eerlijk. Rapportages, feed-optimalisaties, handmatig bidden. Sinds twee maanden draait er nu AI overheen, en die tijd is teruggegeven aan strategie. Mooi verhaal.
      </p>

      <p>
        Wat in dezelfde post niet stond: hoe de toegang werkt. Wie heeft welke OAuth-tokens. Welke klant-accounts hebben "alleen lezen", welke hebben "schrijven en bestellingen plaatsen". Welke logging zit erop. Wie is de fallback als het bureau zelf gehackt wordt en aanvallers de tokens overnemen.
      </p>

      <p>
        Dat zijn geen academische vragen. Vorige zomer is een Europees bureau-inlog gestolen waarmee aanvallers in twee uur tijd voor zes ton aan Meta-advertenties hadden uitgegeven, op zes verschillende klant-accounts, met dezelfde landing-page van een Indiase scam-store. De klanten merkten het pas toen Meta de accounts zelf bevroor. Met een AI-laag tussen mens en account wordt dat soort scenario sneller, niet trager. Een aanvaller die met de juiste prompt de juiste rechten kan triggeren is in minuten klaar waar een mens nog handmatig moet klikken.
      </p>

      <Callout
        big="6"
        label="Aantal uur waarin een Europees marketingbureau vorige zomer voor naar schatting €600.000 aan ongeautoriseerde Meta-advertenties zag verschijnen vanaf gestolen OAuth-tokens. Geen AI in die zaak, maar het scenario is precies wat een AI-laag versnelt: één compromittering, schaalbare uitvoer."
      />

      <H2 num="03">Een bank die voorzichtig is, en daar uiteindelijk reden toe heeft</H2>

      <p>
        Derde scène, en dit keer niet uit het mkb. Ook Rabobank kijkt naar AI door de bril van digitale soevereiniteit. De bank erkent dat ze nu sterk leunt op Amerikaanse techbedrijven, onder meer voor cloud en AI. Rabobank onderzoekt met andere Europese banken hoe ze eigen Europese cloud- en datastructuren kunnen opzetten. Niet omdat er al concrete signalen zijn dat Amerikaanse leveranciers de stekker eruit trekken, maar omdat banken hun kritieke infrastructuur niet afhankelijk willen maken van geopolitieke druk. Die zorg is groter geworden sinds de handelsspanningen tussen Washington en Brussel in 2025 opliepen.
      </p>

      <p>
        Voor een bank betekent dat: eerst soevereiniteit, dan tempo. Voor een marketing-bureau lijkt dat overdone. Maar het achterliggende principe is hetzelfde: wat gebeurt er als de tool waar ik op rijd morgen niet meer beschikbaar is, of erger, gebruikt wordt om mij of mijn klanten aan te vallen. Banken denken erover na. De meeste agencies en mkb-bedrijven niet. Het zal het boerenverstand zijn dat boven komt drijven bij een bank met agrarische wortels, maar het is een soort denken dat in marketingland nu echt mist.
      </p>

      <H2 num="04">Waarom dit voelt als 2008</H2>

      <p>
        Toen wij in online marketing begonnen, was er bijna niks. YouTube was net een jaar oud. Google Ads heette nog AdWords en je leerde het uit blogs, fora, en gewoon dingen proberen tot iets werkte. Dat trok twee groepen aan. Eén groep marketeers die echt iets wilden bouwen, klanten netjes wilden bedienen, met geduld de fundamenten leerden. En een groep cowboys die ontdekten dat je met een paar trucs in een paar weken meer geld kon binnenhalen dan een gemiddelde MBO-baan, zonder dat klanten doorhadden hoe het werkte.
      </p>

      <p>
        De cowboys verdwenen niet. Die werden alleen langzaam doorgeprikt door klanten die wijzer werden, door platforms die regels strakker maakten, en door een professionalisering die de hele branche tien jaar heeft gekost. Wij hebben dat hele proces meegemaakt. Diezelfde ondertoon herkennen we nu in AI.
      </p>

      <p>
        De spirit is hetzelfde. Een tool die exponenteel slimmer is dan vorig jaar. Klanten die er amper van begrijpen wat er onder de motorkap zit. Een leerperiode die duizend keer korter is dan bij early Google Ads. Mensen die in een paar weekenden iets in elkaar zetten dat lijkt te werken, het verkopen, en doorgaan voordat de eerste echte storingen zichtbaar worden. Dat is geen kritiek op AI, dat is een observatie over hoe technologie-cycli werken.
      </p>

      <Takeaways
        label="WAT WE NU AL ZIEN"
        title="Drie patronen bij klanten die te snel gingen"
        items={[
          {
            pct: '01',
            text: (
              <>
                <b>Onbekende rechten.</b> Een AI-tool heeft op een gegeven moment ergens write-rechten gekregen "om iets te kunnen testen", en niemand kan terug-traceren wanneer of waarom. Wie het opmerkt is meestal Meta of Google die het account opschort.
              </>
            ),
          },
          {
            pct: '02',
            text: (
              <>
                <b>Geen logging.</b> Acties die door AI-laag zijn uitgevoerd worden vaak niet anders gelogd dan acties van een mens. Achteraf onderscheid maken tussen "Koen heeft dit zelf gedaan" en "een agent heeft dit getriggerd op een prompt" wordt onmogelijk. Audit-trails missen.
              </>
            ),
          },
          {
            pct: '03',
            text: (
              <>
                <b>Klant-data in prompts.</b> Klantgegevens, contactlijsten, omzet-cijfers verdwijnen in modellen waar het bureau zelf de retentie-policy niet van weet. Soms zit het bij OpenAI of Anthropic, soms bij een proxy daartussenin, soms bij een tool die zelf een eigen vector-database heeft opgebouwd. AVG-vragen worden hierdoor sneller dan menigeen lief is.
              </>
            ),
          },
        ]}
      />

      <H2 num="05">Niet meer cowboys vermijden, wel weten wie er één is</H2>

      <p>
        Wij gaan niet zeggen dat je AI moet ontwijken. Dat is precies de verkeerde reactie. Wat wel werkt: dezelfde bullshit-detector die wij in twintig jaar online marketing hebben opgebouwd, opnieuw aanzetten. We herkennen het patroon nu eerder. De flow waarin iemand binnen twee maanden tijd "alles op AI heeft staan" zonder ooit met een security-engineer te hebben gepraat. De marketeer die zegt dat zijn nieuwe AI-flow drie keer zo veel doet zonder uit te leggen hoe de logging werkt. De agency-eigenaar die zelf vibecoded en daarmee zijn klanten bedient.
      </p>

      <p>
        Niet alle drie zijn fout. Sommige zijn de pioniers van wat over twee jaar standaard is. Maar tussen pionier en cowboy zit een dunne lijn, en die lijn loopt over hoe iemand omgaat met de details die je niet ziet. Toegangsrechten, audit-trails, dataretentie, wat er gebeurt als de tool faalt.
      </p>

      <p>
        Voor klanten die nu AI overwegen: de vraag aan een potentiële leverancier is niet "wat kan jouw AI doen". Die vraag wint iedereen. De vraag is "wat heeft jouw AI niet gedaan, en hoe weet je dat zeker". Een leverancier die op die vraag rustig antwoord geeft, weet wat hij aan het bouwen is. Een leverancier die om de vraag heen praat, is de cowboy uit 2008 met een nieuw shirt.
      </p>

      <H2 num="06">Wat dit jaar gaat gebeuren</H2>

      <p>
        We voorspellen niet graag. Wat we wel zien aankomen: een handvol publiek-zichtbare incidenten, waarschijnlijk in Q3 of Q4. Eén bureau dat zwaar in het nieuws komt omdat een AI-flow toegang had tot iets wat hij niet had moeten hebben. Eén mkb-bedrijf met klantdata in een verkeerde prompt. Eén platform dat plotseling aansprakelijk wordt gesteld voor een AI-verkochte transactie.
      </p>

      <p>
        Daarna wordt het rustiger. Verzekeraars beginnen polissen te eisen, klanten beginnen vragen te stellen die ze nu niet stellen, agencies beginnen te beseffen dat read-only-toegang en gelogde acties geen optionele luxe zijn maar een operationele basis. We belanden in een professionalisering-fase, net als rond 2012 met online marketing. Tot die tijd is het een kwestie van wakker blijven.
      </p>

      <p>
        Wij zijn enthousiast over AI. We bouwen er ons platform op. We zien zelf de productiviteits-sprong van factor drie tot vijf. En toch staat onze bullshit-detector aan, voor onze eigen flows en voor wat we bij klanten en collega's voorbij zien komen. Niet uit cynisme, uit ervaring met cycli die hier niet voor het eerst voorbij komen.
      </p>
    </>
  )
}

function ArticleTranscriptToolsBody() {
  return (
    <>
      <p className="lead-para">
        Wij krijgen elke week een variant van dezelfde vraag: wat is nu de beste transcriptietool? Het antwoord uit twee jaar testen is Plaud. Niet omdat de andere tools slecht zijn, maar omdat Plaud op vier punten consistent wint: batterijduur, compactheid, app-ervaring en desktop-integratie tijdens video-calls. Hieronder de eerlijke ronde, inclusief waar we andere tools wél in voorzien zagen.
      </p>

      <p>
        Belangrijk vooraf: de winnaar haal je er niet zomaar uit. De out-of-the-box-ervaring is goed, maar de echte hefboom (transcripts automatisch koppelen aan klanten, follow-up-emails laten draften, agenda-context erbij trekken) vereist wat technische bouwwerk. Daar gaan we onderaan ook iets over zeggen.
      </p>

      <H2 num="01">Wat we hebben getest</H2>

      <p>
        Acht oplossingen, ruwweg in drie categorieën. Software-only: OpenAI Whisper (lokaal op Mac), Google Gemini transcript-modus, Otter.ai, en wat hier in jargon meestal "Microsoft AI-notitiemaker" heet (de Copilot-transcript-functie in Teams). Hardware-met-app: Plaud Note, Echo Scribe, en losse Jabra-conferentiemicrofoons gekoppeld aan transcript-software. Plus een tweede ronde apps die zich gespecialiseerd noemen in "AI-notitiemaker assistent"-categorie, namen we hier even niet bij naam noemen omdat ze de status van het experiment niet overleefden.
      </p>

      <p>
        Beoordelingscriteria waren simpel en operationeel: hoeveel uur opnemen op één lading, hoe accuraat is het transcript bij Nederlands en bij twee tot vier sprekers, hoe snel ben je van opname-stop tot bruikbare tekst, en hoe makkelijk haal je het transcript daarna in een ander systeem (CRM, mailtool, document).
      </p>

      <H2 num="02">Software-only: prima voor desk-werk, breekbaar onderweg</H2>

      <p>
        Whisper lokaal op een Mac geeft objectief de beste pure transcript-kwaliteit van het hele veld. Privé, gratis, geen cloud-call. Maar je hebt er een Mac voor nodig die aanstaat, en de workflow van "ik neem op met mijn telefoon, sleep het bestand in een script" is geen knop, het is een rituaal. Voor losse keynotes die je achteraf wilt uitschrijven: prima. Voor dagelijks gebruik: te veel handelingen.
      </p>

      <p>
        Gemini's transcript-modus zit goed in elkaar voor wie al in Google Workspace werkt. Live transcript tijdens een Google Meet, achteraf samenvatting in een Doc. Het werkt. Het probleem zit in waar je niet bent: een belletje met je iPhone, een fysieke meeting bij een klant, een netwerk-event in een lawaaiige zaal. Daar is Gemini afwezig. En transcripts blijven hangen in Google Docs zonder dat een ander systeem ze automatisch oppikt.
      </p>

      <p>
        Otter.ai en de Microsoft Copilot-transcripts in Teams zijn vergelijkbaar van klasse. Solide voor wie al in dat eco-systeem leeft. Beiden vallen om zodra je buiten de geplande video-call werkt. En de Nederlandse transcripts van beide zijn merkbaar minder accuraat dan Whisper of Plaud bij accenten en mark-namen.
      </p>

      <PullQuote
        text='"Een transcript-tool die alleen in geplande video-calls werkt, mist 60 procent van de gesprekken die ertoe doen."'
        cite="Stevin Journal, redactie."
      />

      <H2 num="03">Hardware: het Jabra-experiment en de Echo Scribe</H2>

      <p>
        Op kantoor hebben we een tijdje vergaderingen geprobeerd op te nemen met Jabra-conferentiemicrofoons gekoppeld aan transcript-software op een laptop. De audio-kwaliteit is uitstekend voor wie aan de tafel zit. Het probleem: het is een opstelling. De microfoon ligt in het midden van de tafel, de laptop staat ernaast, iemand moet 'm starten en stoppen. Spontane gesprekken op de gang, in een auto, of staand bij een netwerkborrel vallen weg.
      </p>

      <p>
        Echo Scribe (een hardware-recorder met cloud-transcript) is conceptueel dichter bij Plaud. Goede audio, draagbaar formaat. Wat 'm minder maakte voor ons dagelijks gebruik: de batterij valt op een halve werkdag van intensief opnemen, de bijbehorende app is rommelig, en de prijs zit hoger zonder dat we daar voor onze use-case meer waarde voor terugzagen.
      </p>

      <H2 num="04">Waarom Plaud op vier vlakken wint</H2>

      <p>
        <b>Batterijduur.</b> Een hele werkdag van opnemen op één lading is geen marketing-claim, dat is wat we ervaren. Voor consultants die 's ochtends een klant bezoeken, 's middags een interne meeting hebben en 's avonds een networking-event aandoen: de tool gaat niet halverwege uit.
      </p>

      <p>
        <b>Compactheid.</b> Het ding is op de achterkant van een iPhone gekleefd of in een zak. Geen aparte opstelling, geen "wacht, ik haal mijn recorder erbij"-moment. Een gesprek bij de koffieautomaat is op te nemen zonder dat de andere kant zich opgenomen voelt door een zichtbaar apparaat in het midden van de tafel.
      </p>

      <p>
        <b>App-ervaring.</b> Transcript binnen enkele minuten na opname-stop, samenvatting erbij, exporteerbaar naar email of als deelbare link. Dit klinkt triviaal, maar de concurrentie verliest hier punten: rommelige UI, transcript pas een dag later, geen Nederlandse-taalondersteuning op niveau.
      </p>

      <p>
        <b>Desktop-integratie voor video-calls.</b> Hier verraste Plaud ons. De desktop-app pikt audio van een Zoom of Teams-gesprek op zonder dat je een aparte opname-tool hoeft te starten. Dezelfde transcript-flow als bij fysieke gesprekken. Voor agencies en consultants die dagelijks tussen video- en in-persoon-gesprekken pendelen: dit dicht een gat dat alle andere oplossingen lieten staan.
      </p>

      <Takeaways
        label="WAT PLAUD WEL EN NIET DOET"
        title="Het eerlijke beeld vóór je 'm aanschaft"
        items={[
          {
            pct: '01',
            text: (
              <>
                <b>Wel: Nederlands accuraat genoeg.</b> Niet perfect bij heavy dialect of namen van merken die Plaud nooit eerder zag, maar consistent boven de drempel van bruikbaar.
              </>
            ),
          },
          {
            pct: '02',
            text: (
              <>
                <b>Wel: meerdere sprekers herkend, niet benoemd.</b> Plaud labelt als "Speaker 1, Speaker 2". Wie wie is, weet de tool niet. Dat is een ontwerpkeuze, geen tekortkoming, maar wel iets om buiten Plaud op te lossen.
              </>
            ),
          },
          {
            pct: '03',
            text: (
              <>
                <b>Niet: out-of-the-box gekoppeld aan je CRM.</b> Plaud levert een transcript-email, geen CRM-update. Wil je dat een transcript automatisch aan een klant wordt gehangen, een follow-up-email klaarzet, of een taak in je sales-pipeline aanmaakt: dat bouw je eromheen.
              </>
            ),
          },
          {
            pct: '04',
            text: (
              <>
                <b>Niet: zonder leercurve.</b> Recorderen is simpel. Het systeem eromheen optimaliseren (privé-momenten knippen, agenda-koppeling, automatische follow-up-drafts) vereist technische bouwwerk of iemand die het voor je doet.
              </>
            ),
          },
        ]}
      />

      <H2 num="05">De leercurve, eerlijk uitgelegd</H2>

      <p>
        Hier moeten we eerlijk zijn. Plaud uit de doos is goed voor "ik heb een transcript van mijn meeting van gisteren". Maar de echte tijdwinst zit niet in dat ene transcript, die zit in wat erna gebeurt. Wij hebben ervoor gekozen om Plaud te koppelen aan onze eigen sales-stack: transcripts worden automatisch aan klanten gekoppeld op basis van wie er gebeld is en welk agenda-event eraan vastzat, AI knipt privé-staartjes weg (Plaud blijft soms aanstaan na een gesprek), en een follow-up-email-draft staat binnen drie minuten na de meeting in de inbox van de juiste consultant.
      </p>

      <p>
        Dat soort koppeling kan je zelf bouwen. Het vereist toegang tot je telefoon-belgeschiedenis, een agenda-API, een CRM en een mailtool. Het is werk, maar geen rocket science. Voor wie zelf wil prutsen: de communities rond AdsToAI en Build the Agent geven hier een hoop voorzetten.
      </p>

      <p>
        Voor wie liever wil dat het gewoon werkt: dat is precies wat wij voor klanten bouwen. Niet als productlicentie, maar als flow op maat. Een keer goed inrichten en je verliest geen 90 minuten per dag meer aan administratie na gesprekken.
      </p>

      <H2 num="06">Conclusie</H2>

      <p>
        Plaud is geen perfecte tool. Het is wel de tool waarmee we na twee jaar testen zijn gestopt met andere proberen. De rest van de markt is goed in deelproblemen, Plaud is goed in de hele werkdag van een consultant of marketeer die tussen klantgesprekken, video-calls en netwerkmomenten beweegt. Het apparaat is de helft van de oplossing. De andere helft is wat je eromheen bouwt.
      </p>

      <Callout
        big="0"
        label="Aantal andere transcriptietools dat we sinds we Plaud actief gebruiken nog actief inzetten op een werkdag. Voor specifieke deelvragen (zoals lokaal Whisper voor een grote keynote-uitdraai) houden we 'm achter de hand. Voor dagelijks gebruik: één tool wint."
      />

      <p>
        Een laatste opmerking. Wij hebben hier geen partnerschap met Plaud. Geen affiliate-link, geen commissie. Dit is gewoon wat we na een paar honderd uur opname-tijd zelf gebruiken. Als dat over een jaar verandert (een nieuwe speler, een verbeterde concurrent), zal je dat hier teruglezen.
      </p>
    </>
  )
}

/* ────────────────────────────────────────────────────────────
   Editie 018: AI-tools en de organisatielaag
   ──────────────────────────────────────────────────────────── */
function ArticleOrglaagBody() {
  return (
    <>
      <p className="lead-para">
        Weet jij hoeveel AI-tools er op dit moment actief zijn binnen jouw team? Waarschijnlijk meer
        dan je denkt. En waarschijnlijk weet je niet precies wat ze doen, wat ze kosten en welke
        kennis er in verdwijnt. Dat is geen kritiek. Het is de realiteit van hoe AI-adoptie werkt:
        snel, individueel, en bijna altijd sneller dan de organisatie-inrichting eromheen.
      </p>

      <BodyFigure
        tag="CYERA · 2025"
        stat="13%"
        statCap="Van enterprises met sterke zichtbaarheid op hoe AI met data omgaat. Terwijl 83% al actief AI gebruikt. Gebruik is niet hetzelfde als grip."
        edition="EDITIE 018 / 052 · OBSERVATIE"
        source="Bron: Cyera State of AI Data Security Report 2025"
      />

      <p>
        De Wall Street Journal beschreef het eerder dit jaar als agent sprawl. Bedrijven bouwen
        steeds meer losse AI-agents, elk met een eigen functie, eigen data-toegang en eigen
        beheerder. Of eigenlijk: zonder beheerder. Dubbele functies, onzichtbare kosten, vragen over
        security die niemand beantwoordt. Niet omdat AI slecht werkt, maar omdat gebruik harder
        groeit dan grip.
      </p>

      <H2 num="01">Gebruik is niet hetzelfde als grip</H2>

      <p>
        McKinsey bevestigt dat in hun State of AI-rapport van dit jaar. AI-gebruik groeit in
        vrijwel alle sectoren. Maar organisaties die er echt waarde uit halen, onderscheiden zich
        niet door meer tools te gebruiken. Ze onderscheiden zich door governance, senior
        eigenaarschap en herontworpen workflows. Niet de licentie maakt het verschil. De laag
        eromheen maakt het verschil.
      </p>

      <p>
        Harvard Business Review voegde daar eerder dit jaar een interessante observatie aan toe:
        medewerkers grijpen vaak naar eigen AI-tools niet omdat ze dwars zijn, maar omdat de
        officiele oplossingen te traag, te beperkt of te onhandig zijn. De vraag naar slimmere
        manieren van werken is er allang. Organisaties zien die vraag alleen niet goed genoeg.
      </p>

      <PullQuote
        text='"De les is niet dat je minder AI moet gebruiken. De les is dat tools mensen sneller maken, maar bedrijven niet automatisch slimmer."'
        cite="Stevin Journal"
      />

      <H2 num="02">Shadow AI is een symptoom, geen oorzaak</H2>

      <p>
        Chronus beschreef het goed: shadow AI is niet alleen een securityprobleem. Het is een
        signaal dat medewerkers waarde zoeken die de organisatie nog niet goed organiseert. TechRadar
        formuleerde het nog directer: AI faalt niet. Onderliggende systemen falen. Rommelige data,
        slechte processen, organisaties die niet ingericht zijn om er iets mee te doen.
      </p>

      <p>
        Individuele productiviteit is niet hetzelfde als organisatorische intelligentie. En de kloof
        tussen die twee is precies waar waarde verdampt.
      </p>

      <H2 num="03">Marketingteams kennen dit patroon al jaren</H2>

      <p>
        Bij marketingteams en bureaus speelt dit al lang voordat AI op de agenda stond. Paid media
        staat in Google Ads. Owned media staat in GA4, of in het hoofd van iemand die de content
        bijhoudt. Klantnotities leven in Slack-threads. Signals komen boven als iemand er toevallig
        bovenop zit, of als de maandrapportage er al is.
      </p>

      <p>
        Een consultant ziet iets bij klant A. Iemand anders herkent hetzelfde patroon bij klant B.
        Alleen wordt het nooit gedeelde kennis, omdat het nergens samenkomt. De tool is er wel.
        De organisatielaag ontbreekt.
      </p>

      <H2 num="04">De organisatielaag is de eigenlijke winst</H2>

      <p>
        Stevin is gebouwd als antwoord op die kloof. Niet nog een plek met meer data. Niet een
        dashboard met meer grafieken. Maar een Desk waarop een heel team ziet welke klant aandacht
        vraagt en waarom, voordat het in een rapportage staat. Een plek waar signals uit paid en
        owned media samenkomen, waar klantkennis niet verdwijnt in het hoofd of account van een
        individu, en waar het team samen slimmer wordt in plaats van dat iedereen individueel
        sneller wordt.
      </p>

      <p>
        AI maakt mensen sneller. Organisatie-overzicht maakt bedrijven beter. Het verschil zit niet
        in de tool die je koopt. Het zit in de laag die je bouwt.
      </p>

      <EndRule />
      <EndSig>
        Als jij een bureau runt of een marketingteam aanstuurt en je herkent dit, ben ik benieuwd
        hoe dat er bij jou uitziet.{' '}
        <a href="https://stevin.ai/contact" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 600 }}>
          Neem contact op
        </a>{' '}
        of stuur me een bericht op LinkedIn. Geen sales-gesprek, gewoon een goed gesprek over hoe je
        dit soort versnippering aanpakt. · Editie 018 / 052
      </EndSig>
    </>
  )
}

function ArticleStubBody({ article }: { article: { title: string; dek: string; edition: string } }) {
  return (
    <>
      <p className="lead-para">{article.dek}</p>
      <p>
        Dit artikel staat op de redactiekalender. We publiceren het volledige stuk binnenkort. Wil je
        een seintje wanneer het live staat?
      </p>
      <p>
        <Link href="/contact" className="text-[var(--accent)] underline">
          Schrijf je in voor het Journal
        </Link>
        .
      </p>
      <EndRule />
      <EndSig>Editie {article.edition} / 052 · in voorbereiding</EndSig>
    </>
  )
}

/* ────────────────────────────────────────────────────────────
   Editorial atoms
   ──────────────────────────────────────────────────────────── */
function H2({ num, children }: { num: string; children: React.ReactNode }) {
  return (
    <h2>
      <span
        style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '14px',
          fontWeight: 500,
          color: 'var(--accent)',
          display: 'block',
          marginBottom: '8px',
          letterSpacing: '0.04em',
        }}
      >
        {num}
      </span>
      {children}
    </h2>
  )
}

function BodyFigure({
  tag,
  stat,
  statCap,
  edition,
  source,
}: {
  tag: string
  stat: string
  statCap: string
  edition: string
  source: string
}) {
  return (
    <figure
      role="img"
      aria-label={statCap}
      style={{
        margin: '40px 0',
        background: 'linear-gradient(135deg, var(--navy-light) 0%, var(--navy) 100%)',
        borderRadius: '14px',
        borderBottom: '4px solid var(--neon)',
        padding: '36px 36px 28px',
        color: '#fff',
        boxShadow: '0 12px 32px -16px rgba(10,22,40,.25)',
      }}
    >
      <div className="flex justify-between items-start gap-4 mb-5">
        <span
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '10px',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            background: 'rgba(255,255,255,0.94)',
            color: 'var(--navy)',
            padding: '6px 10px',
            borderRadius: '4px',
          }}
        >
          {tag}
        </span>
        <span
          aria-hidden="true"
          className="flex gap-[5px] items-end"
          style={{ height: '22px', opacity: 0.55 }}
        >
          {[22, 8, 8, 8, 18, 8, 8, 22].map((h, i) => (
            <span key={i} style={{ width: '2px', height: `${h}px`, background: '#fff' }} />
          ))}
        </span>
      </div>
      <div
        className="font-display font-extrabold"
        style={{
          fontSize: 'clamp(72px, 10vw, 108px)',
          lineHeight: '0.9',
          letterSpacing: '-0.045em',
          color: 'var(--neon)',
          marginBottom: '14px',
        }}
      >
        {stat}
      </div>
      <div
        className="font-display"
        style={{
          fontWeight: 500,
          fontSize: '17px',
          lineHeight: '1.4',
          letterSpacing: '-0.005em',
          color: 'rgba(255,255,255,0.85)',
          maxWidth: '36ch',
          textWrap: 'balance' as const,
          marginBottom: '24px',
        }}
      >
        {statCap}
      </div>
      <div
        className="flex justify-between items-end gap-3"
        style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '10px',
          letterSpacing: '0.04em',
          color: 'rgba(255,255,255,0.55)',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          paddingTop: '12px',
        }}
      >
        <span>{edition}</span>
        <span style={{ fontStyle: 'italic', textAlign: 'right' }}>{source}</span>
      </div>
    </figure>
  )
}

function Takeaways({
  label,
  title,
  items,
}: {
  label: string
  title: string
  items: { pct: string; text: React.ReactNode }[]
}) {
  return (
    <div
      style={{
        background: 'var(--navy)',
        color: '#fff',
        borderRadius: '14px',
        padding: '32px 36px',
        margin: '48px 0',
      }}
    >
      <p
        style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '11px',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--neon)',
          margin: '0 0 14px',
        }}
      >
        {label}
      </p>
      <h3
        className="font-display"
        style={{
          fontWeight: 700,
          fontSize: '22px',
          letterSpacing: '-0.015em',
          color: '#fff',
          margin: '0 0 24px',
        }}
      >
        {title}
      </h3>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {items.map((item, i) => (
          <li
            key={i}
            className="grid items-baseline"
            style={{
              gridTemplateColumns: '88px 1fr',
              gap: '24px',
              padding: '18px 0',
              borderTop: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <span
              className="font-display font-bold"
              style={{
                fontSize: '28px',
                letterSpacing: '-0.02em',
                color: 'var(--neon)',
                lineHeight: 1,
              }}
            >
              {item.pct}
            </span>
            <span
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '16px',
                lineHeight: '1.55',
                color: 'rgba(255,255,255,0.85)',
              }}
            >
              {item.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function PullQuote({ text, cite }: { text: string; cite: string }) {
  return (
    <div
      style={{
        margin: '48px 0',
        padding: '40px 0 40px 40px',
        borderLeft: '3px solid var(--accent)',
      }}
    >
      <blockquote
        className="font-display"
        style={{
          fontWeight: 600,
          fontStyle: 'italic',
          fontSize: '30px',
          lineHeight: '1.2',
          letterSpacing: '-0.02em',
          color: 'var(--navy)',
          margin: '0 0 16px',
          textWrap: 'balance' as const,
        }}
      >
        {text}
      </blockquote>
      <cite
        style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '13px',
          fontStyle: 'normal',
          color: 'var(--muted)',
          letterSpacing: '0.02em',
        }}
      >
        {cite}
      </cite>
    </div>
  )
}

function Callout({ big, label }: { big: string; label: string }) {
  return (
    <div
      className="grid items-center"
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: '14px',
        padding: '32px',
        margin: '40px 0',
        gridTemplateColumns: '120px 1fr',
        gap: '28px',
      }}
    >
      <div
        className="font-display font-extrabold"
        style={{
          fontSize: '56px',
          lineHeight: 1,
          color: 'var(--accent)',
          letterSpacing: '-0.04em',
        }}
      >
        {big}
      </div>
      <p
        className="font-display"
        style={{
          fontWeight: 600,
          fontSize: '16px',
          lineHeight: '1.45',
          color: 'var(--navy)',
          margin: 0,
        }}
      >
        {label}
      </p>
    </div>
  )
}

function EndRule() {
  return (
    <div
      className="flex gap-1 items-center"
      style={{
        margin: '48px 0 32px',
        color: 'var(--accent)',
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: '11px',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
      }}
    >
      <span style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
      <span style={{ padding: '0 14px', color: 'var(--muted)' }}>•••</span>
      <span style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
    </div>
  )
}

function EndSig({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontFamily: 'Inter, sans-serif',
        fontStyle: 'italic',
        fontSize: '14px',
        color: 'var(--muted)',
        textAlign: 'center',
        margin: '0 0 56px',
      }}
    >
      {children}
    </p>
  )
}
