/**
 * Stevin.ai — Client-side tracking utilities
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

/** Normalize a phone number to digits-only (E.164 without leading +). */
function normalizePhone(phone: string): string {
  return phone.replace(/\D/g, '')
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

export interface HashedUserData {
  email_address?: string
  phone_number?: string
  address?: {
    first_name?: string
    last_name?: string
  }
}

/** Hash user data for dataLayer push. Pass only fields you have. */
export async function hashUserData(data: UserData): Promise<HashedUserData> {
  const result: HashedUserData = {}

  if (data.email) {
    result.email_address = await sha256(data.email)
  }
  if (data.phone) {
    result.phone_number = await sha256(normalizePhone(data.phone))
  }
  if (data.firstName || data.lastName) {
    result.address = {}
    if (data.firstName) result.address.first_name = await sha256(data.firstName)
    if (data.lastName) result.address.last_name = await sha256(data.lastName)
  }

  return result
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
): Promise<void> {
  if (typeof window === 'undefined') return

  const eventId = generateEventId()
  const hashedUser = userData ? await hashUserData(userData) : undefined

  window.dataLayer = window.dataLayer ?? []
  window.dataLayer.push({
    event: eventName,
    event_id: eventId,
    ...(hashedUser ? { user_data: hashedUser } : {}),
    ...extraParams,
  })
}
