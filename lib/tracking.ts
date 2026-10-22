/**
 * Stevin.ai, Client-side tracking utilities
 *
 * SHA-256 hashing happens in the browser before any PII leaves the client.
 * Use these helpers to push user_data to the dataLayer for:
 *   - GA4 Enhanced Conversions
 *   - Google Ads Enhanced Conversions
 *   - Meta CAPI (via sGTM)
 *
 * AVG/GDPR: hashing is done client-side; plaintext PII never reaches GTM or sGTM.
 * Only push user_data when ad_user_data consent is granted.
 */
import { getStoredConsent, hasMarketingConsent } from './consent'
import { pushDataLayerEvent } from './datalayer'

/** SHA-256 hash a string using the Web Crypto API. Returns lowercase hex. */
async function sha256(value: string): Promise<string> {
  const normalized = value.trim().toLowerCase()
  const buffer = await crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(normalized)
  )
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

/**
 * Een telefoonnummer in E.164 (+31612345678), of null als het geen nummer is.
 * Zonder landcode (06..., 076...) nemen we Nederland aan; 0032 en +32 blijven
 * Belgisch. Te kort of te lang: null, liever geen hash dan een verkeerde.
 */
export function telefoonE164(phone: string): string | null {
  const plus = phone.trim().startsWith('+')
  let cijfers = phone.replace(/\D/g, '')
  if (plus) {
    // al met landcode
  } else if (cijfers.startsWith('00')) {
    cijfers = cijfers.slice(2)
  } else if (cijfers.startsWith('0')) {
    cijfers = '31' + cijfers.slice(1)
  }
  if (cijfers.length < 10 || cijfers.length > 15) return null
  return '+' + cijfers
}

/** Generate a unique event ID for deduplication across browser pixel + CAPI. */
export function generateEventId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`
}

export interface UserData {
  email?: string
  phone?: string
  firstName?: string
  lastName?: string
}

// W-647: Google herkent voorgehashte waarden alleen aan het voorvoegsel
// sha256_ (developers.google.com/tag-platform/tag-manager/server-side/ads-user-data).
// Onder email_address en phone_number verwacht Google platte tekst, dus een
// hash daar telt niet. Telefoon hasht Google in E.164 met plus (+31612345678),
// Meta zonder plus (31612345678): een hash kan niet beide, dus er gaan er twee.
export interface HashedUserData {
  sha256_email_address?: string
  sha256_phone_number?: string
  /** Meta-variant van het nummer (landcode zonder plus), voor CAPI via sGTM. */
  meta_ph?: string
  address?: {
    sha256_first_name?: string
    sha256_last_name?: string
  }
}

/** Hash user data for dataLayer push. Pass only fields you have. */
export async function hashUserData(data: UserData): Promise<HashedUserData> {
  const result: HashedUserData = {}

  if (data.email) {
    result.sha256_email_address = await sha256(data.email)
  }
  const e164 = data.phone ? telefoonE164(data.phone) : null
  if (e164) {
    result.sha256_phone_number = await sha256(e164)
    result.meta_ph = await sha256(e164.slice(1))
  }
  if (data.firstName || data.lastName) {
    result.address = {}
    if (data.firstName) result.address.sha256_first_name = await sha256(data.firstName)
    if (data.lastName) result.address.sha256_last_name = await sha256(data.lastName)
  }

  return result
}

type InteractionKind =
  | 'cta_click'
  | 'demo_intent'
  | 'form_start'
  | 'form_submit'
  | 'contact_click'
  | 'outbound_click'
  | 'internal_click'
  | 'scroll_depth'

const CONTEXT_KEY = 'stevin_lead_context'
const MAX_CLICKS = 12

function readContext(): Record<string, unknown> {
  if (typeof window === 'undefined') return {}
  try {
    return JSON.parse(sessionStorage.getItem(CONTEXT_KEY) || '{}')
  } catch {
    return {}
  }
}

function writeContext(ctx: Record<string, unknown>): void {
  if (typeof window === 'undefined') return
  try {
    sessionStorage.setItem(CONTEXT_KEY, JSON.stringify(ctx).slice(0, 12000))
  } catch {
    /* sessionStorage can be blocked in private mode */
  }
}

function cleanText(value: unknown, max = 180): string | null {
  if (typeof value !== 'string') return null
  const trimmed = value.replace(/\s+/g, ' ').trim()
  return trimmed ? trimmed.slice(0, max) : null
}

export function deriveEntryChannel(): string {
  if (typeof window === 'undefined') return 'unknown'
  try {
    const utm = new URLSearchParams(window.location.search).get('utm_source')
    if (utm) return utm.toLowerCase().slice(0, 40)
    const ref = document.referrer
    if (!ref) return 'direct'
    const host = new URL(ref).hostname.replace(/^www\./, '')
    if (host === window.location.hostname) return 'internal'
    if (/google\.|bing\.|duckduckgo|ecosia|yahoo/.test(host)) return 'organic'
    if (/linkedin|t\.co|twitter|x\.com|facebook|instagram|reddit/.test(host)) return 'social'
    return 'referral'
  } catch {
    return 'direct'
  }
}

export function getPageType(pathname: string): string {
  const p = pathname.replace(/^\/en/, '') || '/'
  if (p === '/') return 'home'
  if (p.startsWith('/integraties/')) return 'integration'
  if (p.startsWith('/blog/')) return 'blog'
  if (p.startsWith('/producten')) return 'product'
  if (p.startsWith('/woordenboek/') || p.startsWith('/vergelijken/') || p.startsWith('/alternatief/')) return 'longtail'
  return 'page'
}

function currentUtmParams(): Record<string, string> {
  if (typeof window === 'undefined') return {}
  const params = new URLSearchParams(window.location.search)
  const out: Record<string, string> = {}
  for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'gclid', 'gbraid', 'wbraid', 'fbclid', 'li_fat_id']) {
    const value = params.get(key)
    if (value) out[key] = value.slice(0, 300)
  }
  return out
}

export function updateLeadContextPage(pathname: string): void {
  if (typeof window === 'undefined') return
  const ctx = readContext()
  if (!ctx.session_started_at) {
    ctx.session_started_at = new Date().toISOString()
    ctx.landing_page = window.location.href.slice(0, 500)
    ctx.referrer = document.referrer.slice(0, 500) || null
    ctx.entry_channel = deriveEntryChannel()
    ctx.utm_params = currentUtmParams()
  }
  ctx.current_path = pathname
  ctx.page_path = pathname
  ctx.locale = pathname.startsWith('/en') ? 'en' : 'nl'
  ctx.page_type = getPageType(pathname)
  writeContext(ctx)
}

export function rememberInteraction(kind: InteractionKind, payload: Record<string, unknown> = {}): void {
  if (typeof window === 'undefined') return
  const ctx = readContext()
  const summary = (ctx.interaction_summary && typeof ctx.interaction_summary === 'object'
    ? ctx.interaction_summary
    : {}) as Record<string, number>
  summary[kind] = (summary[kind] || 0) + 1
  ctx.interaction_summary = summary
  ctx.last_interaction_at = new Date().toISOString()

  if (kind === 'scroll_depth' && typeof payload.scroll_depth_threshold === 'number') {
    ctx.max_scroll_depth = Math.max(Number(ctx.max_scroll_depth || 0), payload.scroll_depth_threshold)
  }

  if (kind !== 'scroll_depth') {
    const clicks = Array.isArray(ctx.last_clicks) ? ctx.last_clicks : []
    clicks.push({
      kind,
      at: new Date().toISOString(),
      page_path: cleanText(String(payload.page_path || window.location.pathname), 240),
      href: cleanText(payload.href, 500),
      label: cleanText(payload.label),
      placement: cleanText(payload.placement, 80),
    })
    ctx.last_clicks = clicks.slice(-MAX_CLICKS)
  }

  writeContext(ctx)
}

export function getLeadContext(extra: Record<string, unknown> = {}): Record<string, unknown> {
  if (typeof window === 'undefined') return extra
  const ctx = readContext()
  return {
    ...ctx,
    page_path: window.location.pathname,
    current_url: window.location.href.slice(0, 500),
    ...extra,
  }
}

/**
 * Push a conversion event to the dataLayer with hashed user_data.
 * GTM picks this up and forwards it to GA4, Google Ads, and Meta CAPI via sGTM.
 *
 * @example
 * // On contact form submit:
 * await pushConversionEvent('generate_lead', {
 *   email: form.email,
 *   phone: form.phone,
 *   firstName: form.name,
 * })
 */
export async function pushConversionEvent(
  eventName: string,
  userData?: UserData,
  extraParams?: Record<string, unknown>
): Promise<string | null> {
  if (typeof window === 'undefined') return null

  const eventId = generateEventId()
  const hashedUser = userData && hasMarketingConsent(getStoredConsent())
    ? await hashUserData(userData)
    : undefined

  // Via de helper, zodat event_id, user_data en de extra parameters niet
  // meegaan met latere events (W-346).
  pushDataLayerEvent(eventName, {
    event_id: eventId,
    ...(hashedUser ? { user_data: hashedUser } : {}),
    ...extraParams,
  })
  return eventId
}
