'use client'

import { useState, useEffect } from 'react'
import { getStoredConsent, storeConsent, updateGoogleConsent, type ConsentChoice } from '@/lib/consent'

export default function ConsentBanner() {
  const [visible, setVisible] = useState(false)
  const [showPreferences, setShowPreferences] = useState(false)
  const [analyticsChecked, setAnalyticsChecked] = useState(false)

  useEffect(() => {
    const stored = getStoredConsent()
    if (stored) {
      // Consent already given — apply it
      updateGoogleConsent(stored)
    } else {
      // No consent yet — show banner
      setVisible(true)
    }
  }, [])

  function handleChoice(choice: ConsentChoice) {
    if (!choice) return
    storeConsent(choice)
    updateGoogleConsent(choice)
    setVisible(false)
    setShowPreferences(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] p-4 sm:p-6">
      <div className="mx-auto max-w-2xl rounded-2xl bg-white border border-border shadow-2xl shadow-black/10 overflow-hidden">
        {!showPreferences ? (
          /* Main banner */
          <div className="p-6 sm:p-8">
            <h3 className="text-base font-bold text-primary mb-2">
              Cookies en privacy
            </h3>
            <p className="text-sm text-muted leading-relaxed mb-6">
              We gebruiken cookies om de website te verbeteren en resultaten te meten. Je kunt zelf kiezen welke cookies je toestaat.
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={() => handleChoice('all')}
                className="px-6 py-2.5 text-sm font-semibold text-white bg-accent rounded-lg hover:bg-accent-dark transition-colors"
              >
                Accepteer alles
              </button>
              <button
                onClick={() => handleChoice('necessary')}
                className="px-6 py-2.5 text-sm font-semibold text-primary bg-surface-alt rounded-lg border border-border hover:bg-surface transition-colors"
              >
                Alleen noodzakelijk
              </button>
              <button
                onClick={() => setShowPreferences(true)}
                className="px-6 py-2.5 text-sm font-medium text-muted hover:text-primary transition-colors"
              >
                Instellingen
              </button>
            </div>
          </div>
        ) : (
          /* Preferences panel */
          <div className="p-6 sm:p-8">
            <h3 className="text-base font-bold text-primary mb-4">
              Cookie-instellingen
            </h3>
            <div className="space-y-4 mb-6">
              <div className="flex items-start justify-between gap-4 p-4 rounded-xl bg-surface">
                <div>
                  <p className="text-sm font-semibold text-primary">Noodzakelijk</p>
                  <p className="text-xs text-muted mt-0.5">Vereist voor de werking van de website.</p>
                </div>
                <span className="text-xs font-medium text-muted bg-white px-2.5 py-1 rounded-full border border-border">Altijd aan</span>
              </div>
              <div className="flex items-start justify-between gap-4 p-4 rounded-xl bg-surface">
                <div>
                  <p className="text-sm font-semibold text-primary">Statistieken</p>
                  <p className="text-xs text-muted mt-0.5">Helpt ons begrijpen hoe bezoekers de site gebruiken.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                  <input
                    type="checkbox"
                    checked={analyticsChecked}
                    onChange={(e) => setAnalyticsChecked(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-10 h-[22px] bg-border rounded-full peer peer-checked:bg-accent transition-colors after:content-[''] after:absolute after:top-[3px] after:left-[3px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-[18px]" />
                </label>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={() => handleChoice(analyticsChecked ? 'analytics' : 'necessary')}
                className="px-6 py-2.5 text-sm font-semibold text-white bg-accent rounded-lg hover:bg-accent-dark transition-colors"
              >
                Voorkeuren opslaan
              </button>
              <button
                onClick={() => handleChoice('all')}
                className="px-6 py-2.5 text-sm font-semibold text-primary bg-surface-alt rounded-lg border border-border hover:bg-surface transition-colors"
              >
                Accepteer alles
              </button>
              <button
                onClick={() => setShowPreferences(false)}
                className="px-6 py-2.5 text-sm font-medium text-muted hover:text-primary transition-colors"
              >
                Terug
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

/**
 * Small button for footer to re-open consent preferences.
 * Import and place in the footer.
 */
export function ConsentSettingsButton() {
  function reopenBanner() {
    localStorage.removeItem('stevin_consent')
    window.location.reload()
  }

  return (
    <button
      onClick={reopenBanner}
      className="text-sm text-slate-400 hover:text-white transition-colors duration-200"
    >
      Cookie-instellingen
    </button>
  )
}
