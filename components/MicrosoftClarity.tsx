'use client'

/**
 * Microsoft Clarity: heatmaps + session recordings.
 *
 * Clarity is intentionally loaded only after analytics consent. This keeps the
 * Next.js site consistent with the static landing pages and avoids recording
 * behavior before the visitor has allowed statistics cookies.
 *
 * Project ID is not secret. It is visible client-side by design.
 */
import { useEffect } from 'react'
import {
  choiceToConsentState,
  getStoredConsent,
  hasAnalyticsConsent,
  type ConsentUpdatedDetail,
} from '@/lib/consent'

const PROJECT_ID = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID || 'wmggc0voks'

function sendClarityConsent(choice = getStoredConsent()) {
  if (typeof window === 'undefined' || !window.clarity) return

  const state = choiceToConsentState(choice)
  window.clarity('consentv2', {
    ad_Storage: state.ad_storage,
    analytics_Storage: state.analytics_storage,
    ad_storage: state.ad_storage,
    analytics_storage: state.analytics_storage,
  })
}

function loadClarity() {
  if (typeof window === 'undefined' || !PROJECT_ID || window.__stevinClarityLoaded) return

  window.__stevinClarityLoaded = true
  if (!window.clarity) {
    const clarityQueue = ((...args: unknown[]) => {
      clarityQueue.q = clarityQueue.q || []
      clarityQueue.q.push(args)
    }) as ((...args: unknown[]) => void) & { q?: unknown[] }
    window.clarity = clarityQueue
  }

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.clarity.ms/tag/${PROJECT_ID}`
  script.onload = () => sendClarityConsent()
  document.head.appendChild(script)

  sendClarityConsent()
}

export function MicrosoftClarity() {
  useEffect(() => {
    if (!PROJECT_ID) return

    const applyCurrentConsent = (choice = getStoredConsent()) => {
      if (!hasAnalyticsConsent(choice)) return
      loadClarity()
      sendClarityConsent(choice)
    }

    applyCurrentConsent()

    const handleConsentUpdate = (event: Event) => {
      const detail = (event as CustomEvent<ConsentUpdatedDetail>).detail
      applyCurrentConsent(detail?.choice ?? getStoredConsent())
    }

    window.addEventListener('stevin:consent-updated', handleConsentUpdate)
    return () => window.removeEventListener('stevin:consent-updated', handleConsentUpdate)
  }, [])

  return null
}

declare global {
  interface Window {
    __stevinClarityLoaded?: boolean
    clarity?: (...args: unknown[]) => void
  }
}
