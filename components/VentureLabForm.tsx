'use client'

import { useRef, useState, useEffect } from 'react'
import { pushConversionEvent } from '@/lib/tracking'

const ROLES = [
  'Founder met AI-idee',
  'Developer / builder',
  'Product owner',
  'Domeinexpert',
  'Bedrijf met een AI-kans',
  'Partner of investeerder',
]

const LOOKING_FOR = [
  'Marktvalidatie',
  'GTM en sales',
  'Productrichting',
  'Team',
  'Eerste klanten',
  'Funding',
]

const inputCls =
  'w-full px-4 py-3 border border-border rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors'

export default function VentureLabForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [selected, setSelected] = useState<string[]>([])
  const toggle = (opt: string) =>
    setSelected((s) => (s.includes(opt) ? s.filter((x) => x !== opt) : [...s, opt]))

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
      // Tracking mag het formulier niet blokkeren
    }

    formRef.current.submit()
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-border bg-white p-8 sm:p-12 text-center">
        <div className="mb-4 text-3xl text-accent">✓</div>
        <h3 className="text-xl font-display font-bold text-primary">Bedankt, je aanmelding staat genoteerd</h3>
        <p className="mt-2 text-muted">
          We bekijken of er een duidelijke match is met Stevin Venture Lab en nemen bij een goede fit
          contact met je op voor een verkennend gesprek.
        </p>
      </div>
    )
  }

  return (
    <form
      ref={formRef}
      action="https://formsubmit.co/koen@stevin.ai"
      method="POST"
      onSubmit={handleSubmit}
      className="rounded-2xl border border-border bg-white p-7 sm:p-10 text-left"
    >
      <input type="hidden" name="_subject" value="Nieuwe aanmelding Stevin Venture Lab" />
      <input type="hidden" name="_next" value="https://stevin.ai/venture-lab?verzonden=1" />
      <input type="hidden" name="_captcha" value="false" />
      <input type="text" name="_honey" style={{ display: 'none' }} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="vl-name" className="block text-sm font-medium text-primary mb-2">
            Naam
          </label>
          <input id="vl-name" name="name" type="text" required className={inputCls} placeholder="Je naam" />
        </div>
        <div>
          <label htmlFor="vl-email" className="block text-sm font-medium text-primary mb-2">
            E-mailadres
          </label>
          <input id="vl-email" name="email" type="email" required className={inputCls} placeholder="je@bedrijf.nl" />
        </div>
        <div>
          <label htmlFor="vl-phone" className="block text-sm font-medium text-primary mb-2">
            Telefoonnummer
          </label>
          <input id="vl-phone" name="phone" type="tel" required className={inputCls} placeholder="+31 6 12345678" />
        </div>
        <div>
          <label htmlFor="vl-link" className="block text-sm font-medium text-primary mb-2">
            LinkedIn of bedrijf <span className="text-muted font-normal">(optioneel)</span>
          </label>
          <input id="vl-link" name="linkedin_of_bedrijf" type="text" className={inputCls} placeholder="Profiel of bedrijfsnaam" />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="vl-role" className="block text-sm font-medium text-primary mb-2">
            Ik meld me aan als
          </label>
          <select id="vl-role" name="rol" required defaultValue="" className={inputCls}>
            <option value="" disabled>
              Kies een rol
            </option>
            {ROLES.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="vl-problem" className="block text-sm font-medium text-primary mb-2">
          Welk probleem zie je?
        </label>
        <textarea
          id="vl-problem"
          name="probleem"
          rows={4}
          required
          className={`${inputCls} resize-none`}
          placeholder="Beschrijf het probleem zo concreet mogelijk. Voor wie is het urgent en hoe wordt het nu opgelost?"
        />
      </div>

      <div className="mt-6">
        <span className="block text-sm font-medium text-primary mb-3">
          Wat zoek je van Stevin Venture Lab? <span className="text-muted font-normal">(meerdere mogelijk)</span>
        </span>
        <div className="flex flex-wrap gap-2.5">
          {LOOKING_FOR.map((opt) => {
            const on = selected.includes(opt)
            return (
              <button
                key={opt}
                type="button"
                onClick={() => toggle(opt)}
                aria-pressed={on}
                className="inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm transition-colors"
                style={
                  on
                    ? { borderColor: '#3D8EFF', color: '#3D8EFF', backgroundColor: 'rgba(61,142,255,0.07)' }
                    : { borderColor: '#E1E7EF', color: '#0A1628', backgroundColor: '#F7F9FC' }
                }
              >
                {on && <span aria-hidden="true">✓</span>}
                {opt}
              </button>
            )
          })}
        </div>
        {selected.map((opt) => (
          <input key={opt} type="hidden" name="zoekt" value={opt} />
        ))}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-8 w-full sm:w-auto px-8 py-3.5 text-[15px] font-display font-bold text-white bg-accent rounded-xl hover:bg-accent-dark transition-colors disabled:opacity-60"
      >
        {loading ? 'Verzenden...' : 'Verstuur je aanmelding'}
      </button>
      <p className="mt-4 text-[13px] text-muted">
        We selecteren de eerste deelnemers op basis van probleem, ambitie, team en commercieel potentieel.
      </p>
    </form>
  )
}
