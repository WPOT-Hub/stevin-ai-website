import { type NextRequest } from 'next/server'
import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

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
        Authorization: `Bearer ${SUPABASE_ANON}`,
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

export default async function middleware(request: NextRequest) {
  // AI-bot crawl logging, fire-and-forget zodat middleware niet blokkeert.
  // Edge runtime kapt losse fetches af na response, maar logBotCrawl()
  // wacht intern al op de fetch, .catch() zorgt dat fouten stil blijven.
  const ua = request.headers.get('user-agent') ?? ''
  const aiBot = detectAIBot(ua)
  if (aiBot) {
    logBotCrawl(aiBot, request.nextUrl.pathname).catch(() => {})
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
  // ads-data en inhouse uitgesloten: statische campagne-landingspagina's uit /public,
  // mogen niet door de i18n-middleware (anders 404 voor de rewrite kan grijpen).
  matcher: ['/((?!api|_next|_vercel|ads-data|inhouse|.*\\..*).*)'],
}
