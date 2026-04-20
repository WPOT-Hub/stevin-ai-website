export type ConsentChoice = 'all' | 'analytics' | 'marketing' | 'analytics_and_marketing' | 'necessary' | null

export interface ConsentState {
  ad_storage: 'granted' | 'denied'
  analytics_storage: 'granted' | 'denied'
  ad_user_data: 'granted' | 'denied'
  ad_personalization: 'granted' | 'denied'
  functionality_storage: 'granted' | 'denied'
  personalization_storage: 'granted' | 'denied'
}

const CONSENT_KEY = 'stevin_consent'

export function getStoredConsent(): ConsentChoice {
  if (typeof window === 'undefined') return null
  const stored = localStorage.getItem(CONSENT_KEY)
  if (
    stored === 'all' ||
    stored === 'analytics' ||
    stored === 'marketing' ||
    stored === 'analytics_and_marketing' ||
    stored === 'necessary'
  ) {
    return stored as ConsentChoice
  }
  return null
}

export function storeConsent(choice: ConsentChoice): void {
  if (typeof window === 'undefined' || !choice) return
  localStorage.setItem(CONSENT_KEY, choice)
}

export function choiceToConsentState(choice: ConsentChoice): ConsentState {
  const analyticsGranted = choice === 'all' || choice === 'analytics' || choice === 'analytics_and_marketing'
  const marketingGranted = choice === 'all' || choice === 'marketing' || choice === 'analytics_and_marketing'

  return {
    analytics_storage:       analyticsGranted ? 'granted' : 'denied',
    ad_storage:              marketingGranted ? 'granted' : 'denied',
    ad_user_data:            marketingGranted ? 'granted' : 'denied',
    ad_personalization:      marketingGranted ? 'granted' : 'denied',
    functionality_storage:   analyticsGranted ? 'granted' : 'denied',
    personalization_storage: analyticsGranted ? 'granted' : 'denied',
  }
}

export function updateGoogleConsent(choice: ConsentChoice): void {
  if (typeof window === 'undefined') return

  const state = choiceToConsentState(choice)

  // Push consent update to dataLayer (gtag is globally defined in GoogleTagManager.tsx)
  window.gtag?.('consent', 'update', state)
}

// Extend Window for gtag
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    dataLayer?: Record<string, unknown>[]
  }
}
