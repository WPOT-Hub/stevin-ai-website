/**
 * Meta-pixel voor stevin.ai (W-861).
 *
 * Laadt fbevents.js pas na toestemming voor marketing. Zonder toestemming of
 * zonder pixel-ID gebeurt er niets: geen script, geen verzoek naar Meta.
 * Trekt de bezoeker de toestemming in, dan krijgt de pixel `consent revoke`
 * en stuurt hij niets meer.
 *
 * Het pixel-ID is geen geheim (het staat in elke paginabron), maar het hoort
 * bij een Meta-account. Daarom komt het uit NEXT_PUBLIC_META_PIXEL_ID en staat
 * de pixel uit tot die waarde gezet is.
 */
import { getStoredConsent, hasMarketingConsent } from './consent'

type Fbq = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void
  queue: unknown[][]
  loaded?: boolean
  version?: string
  push?: unknown
}

declare global {
  interface Window {
    fbq?: Fbq
    _fbq?: Fbq
  }
}

const ID_VORM = /^\d{10,20}$/
const RUW_ID = (process.env.NEXT_PUBLIC_META_PIXEL_ID ?? '').trim()

/** Leeg als er geen geldig ID is gezet; dan staat de pixel uit. */
export const META_PIXEL_ID = ID_VORM.test(RUW_ID) ? RUW_ID : ''

let geladen = false
let toegestaan = false

function laadScript(): void {
  if (window.fbq) return
  const fbq = function (...args: unknown[]) {
    if (fbq.callMethod) fbq.callMethod(...args)
    else fbq.queue.push(args)
  } as Fbq
  fbq.queue = []
  fbq.loaded = true
  fbq.version = '2.0'
  fbq.push = fbq
  window.fbq = fbq
  window._fbq = fbq
  const script = document.createElement('script')
  script.async = true
  script.src = 'https://connect.facebook.net/en_US/fbevents.js'
  document.head.appendChild(script)
}

/**
 * Past de pixel aan op de huidige cookiekeuze. Geeft terug of de pixel nu
 * events mag sturen.
 */
export function werkMetaPixelBij(): boolean {
  if (typeof window === 'undefined' || !META_PIXEL_ID) return false
  const mag = hasMarketingConsent(getStoredConsent())
  if (mag && !geladen) {
    laadScript()
    window.fbq?.('init', META_PIXEL_ID)
    geladen = true
  } else if (geladen && mag !== toegestaan) {
    window.fbq?.('consent', mag ? 'grant' : 'revoke')
  }
  toegestaan = mag
  return geladen && toegestaan
}

export function metaPaginaweergave(): void {
  if (!werkMetaPixelBij()) return
  window.fbq?.('track', 'PageView')
}

/**
 * Een aanvraag. Het event-ID is hetzelfde als in de dataLayer, zodat een
 * latere server-side melding van dezelfde aanvraag niet dubbel telt.
 */
export function metaLead(eventId: string, formulier?: string): void {
  if (!werkMetaPixelBij()) return
  window.fbq?.('track', 'Lead', formulier ? { content_name: formulier } : {}, { eventID: eventId })
}

/**
 * Een klik op bellen of appen (W-861, 22 nov 2026). De actiepagina stuurt op
 * bellen, en een telefoontje draagt geen vak. Deze klik wel: Meta hangt hem aan
 * de advertentie, en de advertentiesets zijn per vak. Een klik is geen gesprek:
 * het aantal gesprekken komt uit de telefoonlijn zelf.
 */
export function metaContact(methode: 'phone' | 'whatsapp' | 'email', vak?: string, eventId?: string): void {
  if (!werkMetaPixelBij()) return
  window.fbq?.('track', 'Contact', { content_category: methode, ...(vak ? { content_name: vak } : {}) }, eventId ? { eventID: eventId } : undefined)
}

const HUB_BELKLIK = 'https://hub.stevin.ai/api/belklik'

function leesCookie(naam: string): string | undefined {
  const deel = document.cookie.split('; ').find((c) => c.startsWith(`${naam}=`))
  return deel ? decodeURIComponent(deel.slice(naam.length + 1)).slice(0, 340) : undefined
}

/**
 * Meldt een klik op de belknop aan de Hub (W-126, 22 nov 2026). De pagina stuurt
 * op bellen, maar Meta telde alleen het formulier als Lead. De Hub onthoudt deze
 * klik kort en meldt het gesprek dat erop volgt als Lead aan Meta. Een klik
 * zonder gesprek wordt dus niets.
 *
 * Sinds 23 nov 2026 ook zonder toestemming voor marketing (Koen: "altijd,
 * gehasht"). Dan gaat alleen het klik-ID uit de advertentielink mee; de
 * Meta-cookies _fbc en _fbp alleen met toestemming. Verder het pad en het vak.
 * Geen naam, geen nummer. Mislukt het verzoek, dan gaat het bellen gewoon door.
 *
 * Met `soort` (whatsapp of mail) meldt de Hub de klik zelf meteen als Contact
 * aan Meta, met hetzelfde event-ID als de pixel.
 */
export function meldBelklik(vak?: string, fbclid?: string, extra?: { soort: 'whatsapp' | 'mail'; eventId: string }): void {
  if (typeof window === 'undefined') return
  try {
    let toestemming = false
    try {
      toestemming = hasMarketingConsent(getStoredConsent())
    } catch {
      toestemming = false
    }
    const body = {
      toestemming,
      pad: window.location.pathname,
      ...(vak ? { vak } : {}),
      ...(toestemming ? { fbc: leesCookie('_fbc'), fbp: leesCookie('_fbp') } : {}),
      fbclid: fbclid ?? new URLSearchParams(window.location.search).get('fbclid') ?? undefined,
      ...(extra ? { soort: extra.soort, event_id: extra.eventId } : {}),
    }
    void fetch(HUB_BELKLIK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      keepalive: true,
    })
      .then((res) => {
        if (!res.ok) console.warn(`[belklik] de Hub nam de klik niet aan (status ${res.status})`)
      })
      .catch((err) => console.warn('[belklik] klik niet gemeld aan de Hub', err))
  } catch (err) {
    // De meting mag het bellen nooit in de weg zitten. Een gesprek zonder klik staat in de Hub als "niet gemeld".
    console.warn('[belklik] klik niet gemeld aan de Hub', err)
  }
}
