'use client'

import { useRef, useState, useEffect } from 'react'
import { pushConversionEvent } from '@/lib/tracking'

export default function ContactForm({ nextUrl, subject }: { nextUrl?: string; subject?: string } = {}) {
  const formRef = useRef<HTMLFormElement>(null)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('verzonden') === '1') {
      setSubmitted(true)
    }
  }, [])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!formRef.current || loading) return
    setLoading(true)

    const data = new FormData(formRef.current)
    const email = (data.get('email') as string) ?? ''
    const phone = (data.get('phone') as string) ?? ''
    const name = (data.get('name') as string) ?? ''
    const [firstName, ...rest] = name.trim().split(' ')
    const lastName = rest.join(' ')

    // Push gehashte user_data naar dataLayer voor form submit
    // SHA-256 hashing gebeurt client-side, geen plaintext PII verlaat de browser
    try {
      await pushConversionEvent('generate_lead', {
        email,
        ...(phone ? { phone } : {}),
        ...(firstName ? { firstName } : {}),
        ...(lastName ? { lastName } : {}),
      })
    } catch {
      // Tracking fout mag formulier niet blokkeren
    }

    // Native form submit na tracking push
    formRef.current.submit()
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
      action="https://formsubmit.co/koen@stevin.ai"
      method="POST"
      onSubmit={handleSubmit}
      className="rounded-2xl border border-border bg-white p-8 sm:p-12"
    >
      <input type="hidden" name="_subject" value={subject ?? 'Nieuwe aanvraag via stevin.ai'} />
      <input type="hidden" name="_next" value={nextUrl ?? 'https://stevin.ai/contact?verzonden=1'} />
      <input type="hidden" name="_captcha" value="false" />
      <input type="text" name="_honey" style={{ display: 'none' }} />
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
    </form>
  )
}
