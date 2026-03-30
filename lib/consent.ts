export type ConsentChoice = 'all' | 'analytics' | 'necessary' | null

export interface ConsentState {
  ad_storage: 'granted' | 'denied'
  analytics_storage: 'granted' | 'denied'
  ad_user_data: 'granted' | 'denied'
  ad_personalization: 'granted' | 'denied'
}

const CONSENT_KEY = 'stevin_consent'

export function getStoredConsent(): ConsentChoice {
  if (typeof window === 'undefined') return null
  const stored = localStorage.getItem(CONSENT_KEY)
  if (stored === 'all' || stored === 'analytics' || stored === 'necessary') {
    return stored
  }
  return null
}

export function storeConsent(choice: ConsentChoice): void {
  if (typeof window === 'undefined' || !choice) return
  localStorage.setItem(CONSENT_KEY, choice)
}

export function choiceToConsentState(choice: ConsentChoice): ConsentState {
  switch (choice) {
    case 'all':
      return {
        ad_storage: 'granted',
        analytics_storage: 'granted',
        ad_user_data: 'granted',
        ad_personalization: 'granted',
      }
    case 'analytics':
      return {
        ad_storage: 'denied',
        analytics_storage: 'granted',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
      }
    case 'necessary':
    default:
      return {
        ad_storage: 'denied',
        analytics_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
      }
  }
}

export function updateGoogleConsent(choice: ConsentChoice): void {
  if (typeof window === 'undefined') return

  const state = choiceToConsentState(choice)

  // Push consent update to dataLayer
  window.gtag?.('consent', 'update', state)
}

// Extend Window for gtag
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    dataLayer?: Record<string, unknown>[]
  }
}
