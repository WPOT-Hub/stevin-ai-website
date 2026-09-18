import { NextResponse, type NextRequest } from 'next/server'
import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'
import { getCampaignDomain } from './content/campaign-landings/domains'

const intlMiddleware = createMiddleware(routing)

/**
 * AI-bot user-agent detectie. Gebruikt voor crawl-monitoring zonder
 * de bots te blokkeren (alleen meten: wie indexeert ons voor LLM-training).
 *
 * Officiële UA-strings:
 *   - GPTBot          → OpenAI crawler voor model-training
 *   - ChatGPT-User    → OpenAI on-demand fetcher bij ChatGPT-search
 *   - OAI-SearchBot   → OpenAI search index crawler
 *   - PerplexityBot   → Perplexity crawler voor antwoorden
 *   - Perplexity-User → Perplexity on-demand fetcher
 *   - ClaudeBot       → Anthropic crawler voor model-training
 *   - Claude-Web      → Anthropic on-demand fetcher
 *   - Google-Extended → Google opt-out flag voor Gemini-training
 *   - Bytespider      → ByteDance/TikTok crawler
 *   - Amazonbot       → Amazon (incl. Rufus) crawler
 *   - CCBot           → Common Crawl (gebruikt door veel LLMs voor training)
 */
const AI_BOT_PATTERNS: Array<[RegExp, string]> = [
  [/GPTBot/i, 'GPTBot'],
  [/ChatGPT-User/i, 'ChatGPT-User'],
  [/OAI-SearchBot/i, 'OAI-SearchBot'],
  [/PerplexityBot/i, 'PerplexityBot'],
  [/Perplexity-User/i, 'Perplexity-User'],
  [/ClaudeBot/i, 'ClaudeBot'],
  [/Claude-Web/i, 'Claude-Web'],
  [/anthropic-ai/i, 'Anthropic-AI'],
  [/Google-Extended/i, 'Google-Extended'],
  [/Bytespider/i, 'Bytespider'],
  [/Amazonbot/i, 'Amazonbot'],
  [/CCBot/i, 'CCBot'],
  [/cohere-ai/i, 'Cohere-AI'],
]

function detectAIBot(userAgent: string): string | null {
  for (const [pattern, name] of AI_BOT_PATTERNS) {
    if (pattern.test(userAgent)) return name
  }
  return null
}

// Supabase REST endpoint voor ai_bot_crawls (INSERT-only via RLS,
// veilig met anon-key). Schrijven we direct naar Supabase ipv via
// console.log omdat Vercel's runtime-logs API niet meer publiek is.
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

async function logBotCrawl(bot: string, path: string): Promise<void> {
  if (!SUPABASE_URL || !SUPABASE_ANON) {
    // Fallback: log naar Vercel function logs zodat we 't kwijt zijn
    console.log(
      JSON.stringify({ type: 'ai_bot_crawl', bot, path, ts: new Date().toISOString() }),
    )
    return
  }
  try {
    await fetch(`${SUPABASE_URL}/rest/v1/ai_bot_crawls`, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_ANON,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify({
        bot,
        path,
        crawled_at: new Date().toISOString(),
      }),
    })
  } catch {
    // Niet-blokkerend: log naar Vercel als fallback
    console.log(JSON.stringify({ type: 'ai_bot_crawl_failed', bot, path }))
  }
}

/**
 * Codepoort voor /marketing-check (W-134, 15 sep). Staat alleen aan als
 * MARKETING_CHECK_TOEGANGSCODE is gezet in de omgeving; haal die weg en de
 * check is open. Bedoeld om een nieuwe uitrol eerst zelf te testen voordat
 * bezoekers hem zien.
 *
 * Werkt zonder route handler: ?code=<x> zet een cookie met de hash van de code
 * en stuurt door naar het schone pad; zonder geldige cookie wordt de pagina
 * herschreven naar het codescherm, met de URL onveranderd.
 */
/**
 * Korte links voor gedrukte QR-codes (W-165, 18 sep 2026).
 *
 * Een QR op papier kun je niet meer wijzigen. Daarom wijst hij niet naar de
 * scan zelf maar hierheen: stevin.ai/s/ms. Wat daarachter zit bepalen wij, en
 * dat kan morgen iets anders zijn zonder dat er een kaartje de prullenbak in
 * hoeft. Kortere URL betekent ook een eenvoudiger QR, en die scant makkelijker
 * met een matige telefooncamera.
 *
 * ms = Marketing Scan, ar = AI-Ready Scan, cs = Competitor Scan (bestaat nog
 * niet, wijst voorlopig naar de marketing-scan), x1 = vrij te bestemmen.
 */
const KORTE_LINKS: Record<string, string> = {
  ms: '/marketing-scan?p=bob-marketing',
  ar: '/ai-ready-scan?p=bob-ai',
  cs: '/marketing-scan?p=kaart-cs',
  x1: '/marketing-scan?p=kaart-x1',
}

function korteLink(request: NextRequest): NextResponse | null {
  const m = /^\/(?:nl|en\/)?s\/([a-z0-9-]{1,12})\/?$/i.exec(request.nextUrl.pathname)
  if (!m) return null
  const doel = KORTE_LINKS[m[1].toLowerCase()]
  // Onbekende code: naar de scan, niet naar een foutpagina. Een bezoeker met
  // een kaartje in zijn hand hoort nooit voor een dichte deur te staan.
  const url = request.nextUrl.clone()
  const [pad, query] = (doel ?? '/marketing-scan').split('?')
  url.pathname = pad
  url.search = query ? `?${query}` : ''
  return NextResponse.redirect(url)
}

const MC_PAD = /^\/(?:nl|en)?\/?(?:marketing-scan|ai-ready-scan)\/?$/
const MC_COOKIE = 'mc_toegang'

async function sha256Hex(s: string): Promise<string> {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s))
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, '0')).join('')
}

/**
 * De beta-code. Staat hier en niet alleen in de omgeving omdat dit geen
 * beveiligingsgrens is maar een drempel: achter deze poort staat een scan van
 * een openbare website, geen klantdata en geen account. Wie de code heeft mag
 * meekijken en feedback geven, de rest niet (Koen, 17 sep 2026: "geef aan beta
 * fase, vraag de code aan jouw contactpersoon"). De QR-code voor de beurs
 * draagt hem in de link mee, dus een bezoeker hoeft niets te typen.
 *
 * MARKETING_CHECK_TOEGANGSCODE in de omgeving wint hiervan; zet die om de code
 * te wijzigen zonder deploy-diff. Leeghalen kan niet meer: de poort staat aan.
 */
/**
 * De poort staat UIT (Koen, 18 sep 2026, op de beurs).
 *
 * De redenering: de QR-code staat nergens anders dan op papier dat wij zelf
 * uitdelen, en de scanpagina's staan op noindex en niet in de sitemap. Wie de
 * QR heeft, hoort dus binnen te komen. Een code daar bovenop is dubbelop, en
 * hij levert alleen gedoe op: een kaartje van de avond ervoor droeg de oude
 * code en gaf "die code klopt niet", precies op het moment dat iemand wilde
 * scannen.
 *
 * Wat blijft: de scan zegt zelf dat hij in beta is, op het scherm en in de
 * mail. De quota in de Hub blijven de echte rem (300 scans per dag, 60 per
 * QR-code). En er staan links naar /marketing-scan in drie blogartikelen, dus
 * blogbezoekers kunnen nu ook scannen.
 *
 * Weer aanzetten kan met een woord: zet hier een code neer, of zet
 * MARKETING_CHECK_TOEGANGSCODE in de omgeving. Oude gedrukte QR-codes dragen
 * hun eigen code in de link mee; zet die er dan bij in MC_OUDE_CODES, anders
 * staat iemand met een kaartje in zijn hand voor een dichte deur.
 */
const MC_BETA_CODE = ''
const MC_OUDE_CODES: string[] = []


async function marketingCheckPoort(request: NextRequest): Promise<NextResponse | null> {
  const code = process.env.MARKETING_CHECK_TOEGANGSCODE || MC_BETA_CODE
  if (!code) return null
  if (!MC_PAD.test(request.nextUrl.pathname)) return null

  const geldig = [code, ...MC_OUDE_CODES]
  const verwacht = await sha256Hex(`${code}:${MC_COOKIE}`)
  const ingevoerd = request.nextUrl.searchParams.get('code')
  if (ingevoerd !== null) {
    if (geldig.includes(ingevoerd.trim())) {
      const schoon = request.nextUrl.clone()
      schoon.searchParams.delete('code')
      const r = NextResponse.redirect(schoon)
      r.cookies.set(MC_COOKIE, verwacht, { httpOnly: true, sameSite: 'lax', secure: true, path: '/', maxAge: 60 * 60 * 24 * 14 })
      return r
    }
    // Verkeerde code: naar het codescherm met een melding, zonder de code in de URL te laten staan.
    const terug = request.nextUrl.clone()
    terug.searchParams.delete('code')
    terug.searchParams.set('fout', '1')
    return NextResponse.redirect(terug)
  }
  if (request.cookies.get(MC_COOKIE)?.value === verwacht) return null

  // Rechtstreeks naar de route onder /[locale]/, want deze rewrite gaat buiten
  // de next-intl-middleware om en die zou anders de taal niet meer invullen.
  const locale = request.nextUrl.pathname.startsWith('/en') ? 'en' : 'nl'
  const scherm = request.nextUrl.clone()
  scherm.pathname = `/${locale}/marketing-check-toegang`
  // Het codescherm moet weten voor welke pagina het staat (Open Graph voor crawlers).
  const doorgegeven = new Headers(request.headers)
  doorgegeven.set('x-mc-pad', request.nextUrl.pathname)
  const r = NextResponse.rewrite(scherm, { request: { headers: doorgegeven } })
  r.headers.set('X-Robots-Tag', 'noindex, nofollow')
  r.headers.set('cache-control', 'no-store')
  return r
}

export default async function middleware(request: NextRequest) {
  // Eerst de korte links van gedrukte QR-codes: die moeten altijd voorgaan.
  const kort = korteLink(request)
  if (kort) return kort

  const poort = await marketingCheckPoort(request)
  if (poort) return poort

  // AI-bot crawl logging, fire-and-forget zodat middleware niet blokkeert.
  // Edge runtime kapt losse fetches af na response, maar logBotCrawl()
  // wacht intern al op de fetch, .catch() zorgt dat fouten stil blijven.
  const ua = request.headers.get('user-agent') ?? ''
  const aiBot = detectAIBot(ua)
  if (aiBot) {
    logBotCrawl(aiBot, request.nextUrl.pathname).catch(() => {})
  }

  const hostname = (request.headers.get('host') ?? request.nextUrl.hostname)
    .split(':', 1)[0]
    .toLowerCase()
  // Dev-only preview: op localhost is de hostname nooit een campagnedomein, dus
  // dan zie je de gewone site. Met ?__campaign=<domein> kun je in development
  // toch de campagne-LP bekijken. Werkt ALLEEN buiten productie; op de echte
  // hostess-gated productie doet deze query niets.
  const devPreview =
    process.env.NODE_ENV !== 'production'
      ? request.nextUrl.searchParams.get('__campaign')
      : null
  const campaignDomain = getCampaignDomain(hostname) ?? (devPreview ? getCampaignDomain(devPreview.toLowerCase()) : null)

  if (campaignDomain && request.nextUrl.pathname === '/') {
    const destination = request.nextUrl.clone()
    destination.pathname = `/_campaign/${campaignDomain}`

    const response = NextResponse.rewrite(destination)
    response.headers.set('X-Robots-Tag', 'noindex, nofollow')
    response.headers.set(
      'cache-control',
      'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
    )
    return response
  }

  // De OG-afbeelding gebruikt het interne campagnepad. Laat dat pad alleen
  // op een toegestane campagnehost buiten next-intl om door naar Next.js.
  if (campaignDomain && request.nextUrl.pathname.startsWith('/_campaign/')) {
    const response = NextResponse.next()
    response.headers.set('X-Robots-Tag', 'noindex, nofollow')
    return response
  }

  const response = intlMiddleware(request)

  // Edge-caching aanzetten voor de pagina's. De next-intl middleware rewrite
  // elke route naar /[locale]/..., en Vercel zet rewrite-responses standaard op
  // no-store, ook al zijn de pagina's statisch geprerenderd (SSG). De hele site
  // is statische marketing-content (geen auth, geen personalisatie), dus een
  // deploy bust de cache vanzelf. Alleen op GET-rewrites, niet op redirects
  // (een Location-header), zodat taal-redirects niet vast komen te zitten.
  if (request.method === 'GET' && !response.headers.has('location')) {
    response.headers.set(
      'cache-control',
      'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
    )
  }

  return response
}

export const config = {
  // c/ uitgesloten: /c/<slug> is de placement-ingang voor QR en drukwerk, een
  // route handler die meteen doorstuurt. Door next-intl zou daar een
  // taal-redirect voor komen: een extra hop op een telefoon bij een stand.
  // ads-data en inhouse uitgesloten: statische campagne-landingspagina's uit /public,
  // mogen niet door de i18n-middleware (anders 404 voor de rewrite kan grijpen).
  // opengraph-image valt buiten de middleware. Reden: localePrefix staat op
  // 'as-needed', dus /nl/... wordt doorgestuurd naar /..., en Next zet in de
  // og:image-tag juist de URL MET locale (/nl/opengraph-image). Elke app die
  // een preview ophaalt kreeg daardoor eerst een 307. De meeste volgen die,
  // maar niet allemaal, en dan mist je link zijn afbeelding. Zonder middleware
  // serveert de route zichzelf en is er niets meer om te volgen.
  // Alleen het nl-pad uitsluiten: de kale /opengraph-image bestaat juist
  // dankzij de rewrite van deze middleware, en daar wijst de Twitter-kaart naar.
  matcher: ['/((?!api|_next|_vercel|ads-data|inhouse|kies|c/|nl/opengraph-image|.*\\..*).*)'],
}
