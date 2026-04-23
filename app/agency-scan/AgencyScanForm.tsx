'use client'

import { useRef, useState, useEffect } from 'react'
import { pushConversionEvent } from '@/lib/tracking'

export default function AgencyScanForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('verzonden') === '1') setSubmitted(true)
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

    try {
      await pushConversionEvent('generate_lead', {
        email,
        ...(phone ? { phone } : {}),
        ...(firstName ? { firstName } : {}),
        ...(lastName ? { lastName } : {}),
      })
    } catch {
      // Tracking mag formulier niet blokkeren
    }

    formRef.current.submit()
  }

  if (submitted) {
    return (
      <div
        className="rounded-2xl p-10 text-center"
        style={{ background: 'rgba(0,212,160,0.06)', border: '1px solid rgba(0,212,160,0.2)' }}
      >
        <div className="text-3xl mb-4" style={{ color: '#00D4A0' }}>✓</div>
        <h3 className="font-display font-bold text-white text-[20px]">Bericht ontvangen</h3>
        <p className="mt-2 text-white/45 text-[15px]">We nemen binnen één werkdag contact op.</p>
      </div>
    )
  }

  const inputClass = [
    'w-full px-4 py-3 rounded-xl text-[14px] text-white placeholder-white/25',
    'focus:outline-none transition-colors',
  ].join(' ')

  const inputStyle = {
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
  }

  const labelClass = 'block text-[13px] font-medium text-white/50 mb-2'

  return (
    <form
      ref={formRef}
      action="https://formsubmit.co/koen@stevin.ai"
      method="POST"
      onSubmit={handleSubmit}
      className="rounded-2xl p-8 md:p-10"
      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
    >
      <input type="hidden" name="_subject" value="Agency Scan aanvraag via stevin.ai/agency-scan" />
      <input type="hidden" name="_next" value="https://stevin.ai/agency-scan?verzonden=1" />
      <input type="hidden" name="_captcha" value="false" />
      <input type="text" name="_honey" style={{ display: 'none' }} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="as-name" className={labelClass}>Naam</label>
          <input
            id="as-name"
            name="name"
            type="text"
            required
            className={inputClass}
            style={inputStyle}
            placeholder="Je naam"
          />
        </div>
        <div>
          <label htmlFor="as-email" className={labelClass}>E-mailadres</label>
          <input
            id="as-email"
            name="email"
            type="email"
            required
            className={inputClass}
            style={inputStyle}
            placeholder="je@bedrijf.nl"
          />
        </div>
        <div>
          <label htmlFor="as-company" className={labelClass}>Bedrijf</label>
          <input
            id="as-company"
            name="company"
            type="text"
            className={inputClass}
            style={inputStyle}
            placeholder="Bedrijfsnaam"
          />
        </div>
        <div>
          <label htmlFor="as-phone" className={labelClass}>Telefoonnummer</label>
          <input
            id="as-phone"
            name="phone"
            type="tel"
            className={inputClass}
            style={inputStyle}
            placeholder="+31 6 12345678"
          />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="as-message" className={labelClass}>
          Welk bureau, welk budget, wat is je twijfel?
        </label>
        <textarea
          id="as-message"
          name="message"
          rows={4}
          className={`${inputClass} resize-none`}
          style={inputStyle}
          placeholder="Vertel kort wat er speelt..."
        />
      </div>

      <div className="mt-7 flex flex-col sm:flex-row items-center gap-5">
        <button
          type="submit"
          disabled={loading}
          className="w-full sm:w-auto px-8 py-4 font-display font-bold text-[15px] rounded-xl transition-colors disabled:opacity-50"
          style={{ background: '#5DA3FF', color: '#0A1628' }}
        >
          {loading ? 'Versturen...' : "Let's Talk — Plan je 20-minuten scan in"}
        </button>

        <p className="text-white/25 text-[12px] text-center sm:text-left leading-relaxed">
          100% vertrouwelijk.<br />Jouw bureau krijgt hier geen melding van.
        </p>
      </div>
    </form>
  )
}
