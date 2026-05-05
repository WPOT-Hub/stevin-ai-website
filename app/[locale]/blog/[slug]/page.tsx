import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Link } from '@/i18n/navigation'
import { articles, getArticle, getRelatedArticles, type Article } from '@/data/articles'
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
  return {
    title: `${a.title} | Stevin Journal`,
    description: a.dek,
    openGraph: {
      type: 'article',
      title: a.title,
      description: a.dek,
      publishedTime: a.publishedAt,
      authors: [a.author.name],
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
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.dek,
    datePublished: article.publishedAt,
    author: { '@type': 'Organization', name: 'Stevin' },
    publisher: {
      '@type': 'Organization',
      name: 'Stevin',
      logo: { '@type': 'ImageObject', url: 'https://stevin.ai/icon.svg' },
    },
    mainEntityOfPage: `https://stevin.ai/blog/${article.slug}`,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
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
          {/* Article-specific body — switch on slug + format */}
          {article.format === 'dispatch' && <ArticleDispatchBody article={article} />}
          {article.format === 'editorial' && article.slug === '95-procent-ai-pilots-mislukt' && (
            <ArticleMITBody />
          )}
          {article.format === 'editorial' && article.slug === 'autonome-agents-90-dagen' && (
            <ArticleAgentsBody />
          )}
          {article.format === 'editorial' &&
            article.slug !== '95-procent-ai-pilots-mislukt' &&
            article.slug !== 'autonome-agents-90-dagen' && (
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
  'spotify-ai-muziek-verificatie':
    'Voor labels en artiesten betekent dit op korte termijn extra administratie bij elke release. Voor distributeurs een nieuwe controle-laag die ze moeten inbouwen. Wat het feitelijk verandert: AI-tracks blijven mogelijk, maar krijgen een eigen label. Dat is geen ban — het is een meetlat. En meetlatten op platforms zijn altijd het begin van een nieuwe reeks regels.',
  'oscars-ai-acteerprestaties-niet-toegestaan':
    'De Academy trekt een streep waar Hollywood al maanden om vroeg, maar wel een smalle: alleen acteerprestaties zelf. De rest van het filmpakket (effects, sound, montage) blijft open voor AI. Voor productiehuizen: de keuze voor AI-tooling raakt nu een Oscar-strategie. Voor marketeers van streaming-content geldt hetzelfde: weet welke deel van je productie je labelt en welke niet.',
  'us-defense-ai-deals-zonder-anthropic':
    'Voor B2B-marketeers in tech zegt deze ronde één ding heel duidelijk: defensie is een toegangspoort voor enterprise-deals, niet een nichesector. De acht winnaars krijgen een referentie-stempel die de komende vijf jaar blijft betalen. De afwezige partij krijgt een ander stempel — "niet defensie-bereid" — en moet uitleggen wat dat betekent voor banken, verzekeraars en overheidsklanten elders.',
  'certe-mijnadviseur-chatgpt-koppeling':
    'Distributie via ChatGPT is geen experiment meer, het is een kanaal. Certe gebruikt het zoals tien jaar geleden Google Ads werd gebruikt: als bron van zoekvragen die naar een eigen funnel worden geleid. Voor andere financiële dienstverleners de vraag: ben je vindbaar binnen ChatGPT als iemand een vraag stelt over jouw product? Niet door SEO. Door aanwezig te zijn als GPT, dataset of partner.',
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
