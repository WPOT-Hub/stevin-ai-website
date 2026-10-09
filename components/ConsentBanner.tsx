'use client'

import { useState, useEffect } from 'react'
import { getStoredConsent, storeConsent, updateGoogleConsent, hasAnalyticsConsent, type ConsentChoice } from '@/lib/consent'

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only peer"
      />
      <div className="w-10 h-[22px] bg-border rounded-full peer peer-checked:bg-accent transition-colors after:content-[''] after:absolute after:top-[3px] after:left-[3px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-[18px]" />
    </label>
  )
}

// Kijkt in de netwerktijdlijn van de browser of de Google-tag voor deze
// pagina al een page_view verstuurde zonder toestemming voor analytics
// (gcs G1x0, het vierde teken is analytics_storage). Niet gevonden of niet
// leesbaar: niets opnieuw sturen, liever een gemiste dan een dubbele.
function paginaweergaveAlAnoniemVerstuurd(): boolean {
  try {
    return performance.getEntriesByType('resource').some((r) => {
      if (!r.name.includes('/g/collect')) return false
      const u = new URL(r.name)
      const gcs = u.searchParams.get('gcs') ?? ''
      return u.searchParams.get('en') === 'page_view'
        && gcs.length === 4 && gcs[3] === '0'
        && u.searchParams.get('dl') === window.location.href
    })
  } catch {
    return false
  }
}

export default function ConsentBanner() {
  const [visible, setVisible] = useState(false)
  const [showPreferences, setShowPreferences] = useState(false)
  const [analyticsChecked, setAnalyticsChecked] = useState(false)
  const [marketingChecked, setMarketingChecked] = useState(false)

  useEffect(() => {
    const stored = getStoredConsent()
    if (stored) {
      // Consent already given, apply it immediately on page load
      updateGoogleConsent(stored)
    } else {
      // No consent yet, show banner
      setVisible(true)
    }
  }, [])

  function handleChoice(choice: ConsentChoice) {
    if (!choice) return
    storeConsent(choice)
    updateGoogleConsent(choice)
    // W-346 (9 okt 2026): de paginaweergave van deze pagina ging voor de keuze
    // als anoniem signaal weg. Zonder deze regel begint GA4 na het akkoord een
    // sessie zonder paginaweergave (landingspagina "(not set)"): 9 van 45
    // sessies in de week tot 9 okt. Alleen hier, bij de keuze in de banner,
    // niet bij een opgeslagen keuze; die wordt al voor GTM toegepast.
    // Alleen als die eerste paginaweergave aantoonbaar al anoniem weg is
    // (Codex, PR 125): kiest iemand binnen de wachttijd van wait_for_update,
    // dan stuurt de Google-tag hem zelf met toestemming en zou dit dubbel tellen.
    if (hasAnalyticsConsent(choice) && paginaweergaveAlAnoniemVerstuurd()) {
      window.gtag?.('event', 'page_view', {
        page_location: window.location.href,
        page_title: document.title,
        page_referrer: document.referrer,
      })
    }
    setVisible(false)
    setShowPreferences(false)
  }

  function handleSavePreferences() {
    let choice: ConsentChoice = 'necessary'
    if (analyticsChecked && marketingChecked) choice = 'analytics_and_marketing'
    else if (analyticsChecked) choice = 'analytics'
    else if (marketingChecked) choice = 'marketing'
    handleChoice(choice)
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
              We gebruiken cookies om de website te verbeteren, gedrag te begrijpen en leads beter te herleiden. Je kunt zelf kiezen welke cookies je toestaat.
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
            <div className="space-y-3 mb-6">
              {/* Noodzakelijk, altijd aan */}
              <div className="flex items-start justify-between gap-4 p-4 rounded-xl bg-surface">
                <div>
                  <p className="text-sm font-semibold text-primary">Noodzakelijk</p>
                  <p className="text-xs text-muted mt-0.5">Vereist voor de werking van de website.</p>
                </div>
                <span className="text-xs font-medium text-muted bg-white px-2.5 py-1 rounded-full border border-border flex-shrink-0">Altijd aan</span>
              </div>

              {/* Statistieken: analytics_storage */}
              <div className="flex items-start justify-between gap-4 p-4 rounded-xl bg-surface">
                <div>
                  <p className="text-sm font-semibold text-primary">Statistieken</p>
                  <p className="text-xs text-muted mt-0.5">Helpt ons begrijpen hoe bezoekers de site gebruiken (Google Analytics, Microsoft Clarity).</p>
                </div>
                <Toggle checked={analyticsChecked} onChange={setAnalyticsChecked} />
              </div>

              {/* Marketing: ad_storage, ad_user_data, ad_personalization */}
              <div className="flex items-start justify-between gap-4 p-4 rounded-xl bg-surface">
                <div>
                  <p className="text-sm font-semibold text-primary">Marketing</p>
                  <p className="text-xs text-muted mt-0.5">Campagne- en conversiemeting (Google Ads, Meta). Nodig om leadkwaliteit en campagne-effectiviteit te meten.</p>
                </div>
                <Toggle checked={marketingChecked} onChange={setMarketingChecked} />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={handleSavePreferences}
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
