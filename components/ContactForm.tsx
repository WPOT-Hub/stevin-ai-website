'use client'

import { useRef, useState, useEffect } from 'react'
import { generateEventId, getLeadContext, pushConversionEvent, rememberInteraction } from '@/lib/tracking'

// Alle stevin.ai-formulieren lopen via het eigen Hub-endpoint zodat elke lead op
// een plek binnenkomt: Slack + Supabase + mail naar Koen + bevestiging aan de
// aanvrager. Vervangt de eerdere FormSubmit-koppeling (die alleen mailde en
// niets opsloeg).
const HUB_ENDPOINT = 'https://hub.stevin.ai/api/demo-request'

export default function ContactForm({ subject }: { nextUrl?: string; subject?: string } = {}) {
  const formRef = useRef<HTMLFormElement>(null)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const formStarted = useRef(false)

  useEffect(() => {
    // Backwards-compat: oude FormSubmit-redirect kwam terug met ?verzonden=1.
    const params = new URLSearchParams(window.location.search)
    if (params.get('verzonden') === '1') {
      setSubmitted(true)
      try {
        window.clarity?.('set', 'form_submit', 'contact')
      } catch {
        /* clarity optioneel */
      }
    }
  }, [])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!formRef.current || loading) return
    setLoading(true)
    setError(false)

    const data = new FormData(formRef.current)
    const email = (data.get('email') as string) ?? ''
    const phone = (data.get('phone') as string) ?? ''
    const name = (data.get('name') as string) ?? ''
    const company = (data.get('company') as string) ?? ''
    const message = (data.get('message') as string) ?? ''
    const honey = (data.get('_honey') as string) ?? ''
    // Bron = het meegegeven subject-label (bv. "Agency Scan aanvraag"), of
    // anders de pagina waar het formulier staat (locale-prefix eraf), zodat je
    // in Slack/mail ziet waar de lead vandaan komt.
    const path = window.location.pathname.replace(/^\/(nl|en)(?=\/|$)/, '')
    const source = subject?.trim() || path.replace(/^\//, '') || 'contact'
    const eventId = generateEventId()
    const context = getLeadContext({
      event_id: eventId,
      form_id: 'contact',
      form_source: source,
    })

    try {
      const res = await fetch(HUB_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, company, phone, message, source, _honey: honey, context }),
      })
      if (!res.ok) throw new Error('http ' + res.status)
    } catch {
      setLoading(false)
      setError(true)
      return
    }

    // Tracking pas na een geslaagde inzending, zodat generate_lead echt telt.
    const [firstName, ...rest] = name.trim().split(' ')
    const lastName = rest.join(' ')
    try {
      await pushConversionEvent('generate_lead', {
        email,
        ...(phone ? { phone } : {}),
        ...(firstName ? { firstName } : {}),
        ...(lastName ? { lastName } : {}),
      }, {
        event_id: eventId,
        form: 'contact',
        source,
      })
      rememberInteraction('form_submit', { label: source, page_path: window.location.pathname, placement: 'contact_form' })
    } catch {
      /* tracking mag de flow niet blokkeren */
    }
    try {
      window.clarity?.('set', 'form_submit', 'contact')
    } catch {
      /* clarity optioneel */
    }

    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-border bg-white p-8 sm:p-12 text-center">
        <div className="text-4xl mb-4">✓</div>
        <h3 className="text-xl font-bold text-primary">Bedankt voor je bericht</h3>
        <p className="mt-2 text-muted">We nemen zo snel mogelijk contact met je op.</p>
      </div>
    )
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      onFocusCapture={() => {
        if (formStarted.current) return
        formStarted.current = true
        rememberInteraction('form_start', {
          label: subject || 'contact',
          page_path: window.location.pathname,
          placement: 'contact_form',
        })
        window.dataLayer = window.dataLayer || []
        window.dataLayer.push({
          event: 'form_start',
          form: 'contact',
          page_path: window.location.pathname,
        })
      }}
      className="rounded-2xl border border-border bg-white p-8 sm:p-12"
    >
      {/* Honeypot: verborgen veld dat een mens nooit invult (bot-filter op de Hub). */}
      <input type="text" name="_honey" tabIndex={-1} autoComplete="off" style={{ display: 'none' }} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-primary mb-2">
            Naam
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors"
            placeholder="Je naam"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-primary mb-2">
            E-mailadres
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors"
            placeholder="je@bedrijf.nl"
          />
        </div>
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-primary mb-2">
            Bedrijf
          </label>
          <input
            id="company"
            name="company"
            type="text"
            className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors"
            placeholder="Je bedrijfsnaam"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-primary mb-2">
            Telefoonnummer
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors"
            placeholder="+31 6 12345678"
          />
        </div>
      </div>
      <div className="mt-6">
        <label htmlFor="message" className="block text-sm font-medium text-primary mb-2">
          Waar kunnen we je mee helpen?
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors resize-none"
          placeholder="Vertel kort wat je wilt bereiken..."
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="mt-6 w-full sm:w-auto px-8 py-3.5 text-base font-semibold text-white bg-accent rounded-xl hover:bg-accent-dark transition-colors disabled:opacity-60"
      >
        {loading ? 'Verzenden...' : 'Verstuur bericht'}
      </button>
      {error && (
        <p className="mt-4 text-sm text-red-600">
          Er ging iets mis bij het verzenden. Mail ons gerust direct op{' '}
          <a href="mailto:koen@stevin.ai" className="underline">koen@stevin.ai</a>.
        </p>
      )}
    </form>
  )
}
