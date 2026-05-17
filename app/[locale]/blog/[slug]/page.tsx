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
  // Per-post OG image (Next.js conventional route — gegenereerd door
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

  // FAQPage schema — alleen wanneer er FAQs voor deze slug zijn gegenereerd.
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
          {/* Article-specific body — switch on slug + format */}
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
          {article.format === 'editorial' && article.slug === 'ai-cowboys-marketing-2026' && (
            <ArticleAIcowboysBody />
          )}
          {article.format === 'editorial' &&
            article.slug !== '95-procent-ai-pilots-mislukt' &&
            article.slug !== 'autonome-agents-90-dagen' &&
            article.slug !== 'last-click-is-een-gewoonte' &&
            article.slug !== 'mmm-is-een-hypothese' &&
            article.slug !== 'beste-transcriptietool-2026' &&
            article.slug !== 'ai-cowboys-marketing-2026' && (
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
   Article body — MIT NANDA piece
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
   Editie 011 — MMM is een hypothese
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
        source="Bron: Gartner — Marketing Mix Modeling guide (2025)"
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
        label='Minimum aan wekelijkse data dat Google adviseert voor Meridian-modellen op geo-niveau. Voor national-level: 3 jaar. Onder die drempel wordt de schatting onbetrouwbaar — niet omdat het model slecht is, maar omdat er onvoldoende variatie zit om de parameters te identificeren. Bron: developers.google.com/meridian.'
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
                <b>Te veel kanalen, te weinig data.</b> Google adviseert voor Meridian maximaal 20 kanalen. Sommige bureau-MMM&apos;s draaien 50+ kanalen op dezelfde dataset. Dat is statistisch niet identificeerbaar — het model raadt.
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
   Editie 012 — Last-click is geen attributiemodel
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
   Editie 013 — Autonome agents in logistiek
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
   Dispatch body — short news update + Stevin perspective
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
        Google heeft AI Max voor Search-campagnes deze maand uit beta gehaald, een jaar na de eerste aankondiging tijdens Google Marketing Live 2025. Op de Google Ads-blog meldt het bedrijf dat campagnes met de volledige feature-set gemiddeld 7 procent meer conversies of conversie-waarde halen bij een vergelijkbare CPA of ROAS.
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
        Amazon&apos;s advertentie-omzet groeide in het eerste kwartaal van 2026 met 22 procent jaar-op-jaar tot 17,2 miljard dollar, volgens Emerce (5 mei 2026). Dat brengt de business op een geannualiseerde run-rate van ongeveer 70 miljard dollar — circa 10 procent van Amazon&apos;s totale Q1-omzet.
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
    'Voor labels en artiesten betekent dit op korte termijn extra administratie bij elke release. Voor distributeurs een nieuwe controle-laag die ze moeten inbouwen. Wat het feitelijk verandert: AI-tracks blijven mogelijk, maar krijgen een eigen label. Dat is geen ban — het is een meetlat. En meetlatten op platforms zijn altijd het begin van een nieuwe reeks regels.',
  'oscars-ai-acteerprestaties-niet-toegestaan':
    'De Academy trekt een streep waar Hollywood al maanden om vroeg, maar wel een smalle: alleen acteerprestaties zelf. De rest van het filmpakket (effects, sound, montage) blijft open voor AI. Voor productiehuizen: de keuze voor AI-tooling raakt nu een Oscar-strategie. Voor marketeers van streaming-content geldt hetzelfde: weet welke deel van je productie je labelt en welke niet.',
  'us-defense-ai-deals-zonder-anthropic':
    'Voor B2B-marketeers in tech zegt deze ronde één ding heel duidelijk: defensie is een toegangspoort voor enterprise-deals, niet een nichesector. De acht winnaars krijgen een referentie-stempel die de komende vijf jaar blijft betalen. De afwezige partij krijgt een ander stempel — "niet defensie-bereid" — en moet uitleggen wat dat betekent voor banken, verzekeraars en overheidsklanten elders.',
  'certe-mijnadviseur-chatgpt-koppeling':
    'Distributie via ChatGPT is geen experiment meer, het is een kanaal. Certe gebruikt het zoals tien jaar geleden Google Ads werd gebruikt: als bron van zoekvragen die naar een eigen funnel worden geleid. Voor andere financiële dienstverleners de vraag: ben je vindbaar binnen ChatGPT als iemand een vraag stelt over jouw product? Niet door SEO. Door aanwezig te zijn als GPT, dataset of partner.',
  'amazon-ads-22-procent-groei-q1-2026':
    'Voor D2C-merken en e-commerce: Amazon Ads is geen optie meer, het is een derde verplichte stap naast Google en Meta. De groei van 22 procent is geen incident, het is een trend die al twee jaar loopt. Voor agencies: kanaalmix-besluiten op basis van alleen ROAS van de individuele platforms missen de bredere portfolio-vraag. Een MMM- of uplift-test over Google + Meta + Amazon laat structureel andere optima zien dan platform-eigen attributie suggereert.',
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
        — {cite}
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
