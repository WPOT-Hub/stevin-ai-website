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
