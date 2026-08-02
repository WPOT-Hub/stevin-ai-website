'use client'

import { useRef, useState, useEffect } from 'react'
import { pushConversionEvent } from '@/lib/tracking'

const L = {
  nl: {
    name: 'Naam',
    namePh: 'Je naam',
    email: 'E-mailadres',
    phone: 'Telefoonnummer',
    link: 'LinkedIn of bedrijf',
    linkPh: 'Profiel of bedrijfsnaam',
    optional: '(optioneel)',
    role: 'Waar meld je je voor aan?',
    rolePh: 'Kies een rol',
    roles: [
      'Founder met AI-idee',
      'Developer / builder',
      'Product owner',
      'Domeinexpert',
      'Bedrijf met een AI-kans',
      'Partner of investeerder',
    ],
    problem: 'Welk probleem zie je?',
    problemPh: 'Beschrijf het probleem zo concreet mogelijk.',
    audience: 'Voor wie is dit probleem urgent?',
    audiencePh: 'Welke doelgroep heeft hier echt last van?',
    current: 'Wat gebeurt er nu zonder oplossing?',
    currentPh: 'Hoe lossen mensen of bedrijven dit vandaag op?',
    whyAi: 'Waarom past AI hierbij?',
    whyAiPh: 'Wat kan AI hier beter, sneller of goedkoper maken?',
    tested: 'Heb je al iets getest?',
    testedPh: 'Denk aan gesprekken, prototype, klanten, pilots of eigen ervaring.',
    seeking: 'Wat zoek je van Stevin Venture Lab?',
    seekingHint: '(meerdere mogelijk)',
    options: ['Marktvalidatie', 'GTM en sales', 'Productrichting', 'Team', 'Eerste klanten', 'Funding'],
    extra: 'Wil je nog iets toevoegen?',
    extraPh: 'Optioneel',
    submit: 'Verstuur je aanvraag',
    submitting: 'Verzenden...',
    note: 'We bekijken of er een match is op basis van probleem, ambitie, team en commercieel potentieel.',
    thanksH: 'Bedankt, je aanvraag staat genoteerd',
    thanksP:
      'We bekijken of er een duidelijke match is met Stevin Venture Lab en nemen bij een goede fit contact met je op voor een verkennend gesprek.',
  },
  en: {
    name: 'Name',
    namePh: 'Your name',
    email: 'Email address',
    phone: 'Phone number',
    link: 'LinkedIn or company',
    linkPh: 'Profile or company name',
    optional: '(optional)',
    role: 'What are you applying as?',
    rolePh: 'Choose a role',
    roles: [
      'Founder with an AI idea',
      'Developer / builder',
      'Product owner',
      'Domain expert',
      'Company with an AI opportunity',
      'Partner or investor',
    ],
    problem: 'What problem do you see?',
    problemPh: 'Describe the problem as concretely as possible.',
    audience: 'For whom is this problem urgent?',
    audiencePh: 'Which audience really suffers from this?',
    current: 'What happens today without a solution?',
    currentPh: 'How do people or companies solve this now?',
    whyAi: 'Why does AI fit here?',
    whyAiPh: 'What can AI make better, faster or cheaper here?',
    tested: 'Have you tested anything yet?',
    testedPh: 'Think of conversations, a prototype, customers, pilots or your own experience.',
    seeking: 'What are you looking for from Stevin Venture Lab?',
    seekingHint: '(select multiple)',
    options: ['Market validation', 'GTM and sales', 'Product direction', 'Team', 'First customers', 'Funding'],
    extra: 'Anything you want to add?',
    extraPh: 'Optional',
    submit: 'Send your application',
    submitting: 'Sending...',
    note: 'We assess fit based on problem, ambition, team and commercial potential.',
    thanksH: 'Thanks, your application is noted',
    thanksP:
      'We will assess whether there is a clear match with Stevin Venture Lab and, if there is a good fit, get in touch for an exploratory call.',
  },
} as const

const inputCls =
  'w-full px-4 py-3 border border-border rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors'

export default function VentureLabApplyForm({ locale }: { locale: string }) {
  const t = locale === 'en' ? L.en : L.nl
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
      // tracking mag niet blokkeren
    }
    formRef.current.submit()
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-border bg-white p-8 sm:p-12 text-center">
        <div className="mb-4 text-3xl text-accent">✓</div>
        <h3 className="h-sub font-display text-primary">{t.thanksH}</h3>
        <p className="mt-2 text-muted">{t.thanksP}</p>
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
      <input type="hidden" name="_subject" value="Nieuwe aanvraag Stevin Venture Lab" />
      <input type="hidden" name="_next" value="https://stevin.ai/venture-lab/apply?verzonden=1" />
      <input type="hidden" name="_captcha" value="false" />
      <input type="text" name="_honey" style={{ display: 'none' }} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="a-name" className="block text-sm font-medium text-primary mb-2">{t.name}</label>
          <input id="a-name" name="name" type="text" required className={inputCls} placeholder={t.namePh} />
        </div>
        <div>
          <label htmlFor="a-email" className="block text-sm font-medium text-primary mb-2">{t.email}</label>
          <input id="a-email" name="email" type="email" required className={inputCls} placeholder="je@bedrijf.nl" />
        </div>
        <div>
          <label htmlFor="a-phone" className="block text-sm font-medium text-primary mb-2">{t.phone}</label>
          <input id="a-phone" name="phone" type="tel" required className={inputCls} placeholder="+31 6 12345678" />
        </div>
        <div>
          <label htmlFor="a-link" className="block text-sm font-medium text-primary mb-2">
            {t.link} <span className="text-muted font-normal">{t.optional}</span>
          </label>
          <input id="a-link" name="linkedin_of_bedrijf" type="text" className={inputCls} placeholder={t.linkPh} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="a-role" className="block text-sm font-medium text-primary mb-2">{t.role}</label>
          <select id="a-role" name="rol" required defaultValue="" className={inputCls}>
            <option value="" disabled>{t.rolePh}</option>
            {t.roles.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-5 space-y-5">
        <div>
          <label htmlFor="a-problem" className="block text-sm font-medium text-primary mb-2">{t.problem}</label>
          <textarea id="a-problem" name="probleem" rows={3} required className={`${inputCls} resize-none`} placeholder={t.problemPh} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="a-aud" className="block text-sm font-medium text-primary mb-2">{t.audience}</label>
            <textarea id="a-aud" name="doelgroep" rows={2} className={`${inputCls} resize-none`} placeholder={t.audiencePh} />
          </div>
          <div>
            <label htmlFor="a-cur" className="block text-sm font-medium text-primary mb-2">{t.current}</label>
            <textarea id="a-cur" name="huidige_oplossing" rows={2} className={`${inputCls} resize-none`} placeholder={t.currentPh} />
          </div>
        </div>
        <div>
          <label htmlFor="a-why" className="block text-sm font-medium text-primary mb-2">{t.whyAi}</label>
          <textarea id="a-why" name="waarom_ai" rows={2} className={`${inputCls} resize-none`} placeholder={t.whyAiPh} />
        </div>
        <div>
          <label htmlFor="a-test" className="block text-sm font-medium text-primary mb-2">{t.tested}</label>
          <textarea id="a-test" name="al_getest" rows={2} className={`${inputCls} resize-none`} placeholder={t.testedPh} />
        </div>
      </div>

      <div className="mt-6">
        <span className="block text-sm font-medium text-primary mb-3">
          {t.seeking} <span className="text-muted font-normal">{t.seekingHint}</span>
        </span>
        <div className="flex flex-wrap gap-2.5">
          {t.options.map((opt) => {
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

      <div className="mt-5">
        <label htmlFor="a-extra" className="block text-sm font-medium text-primary mb-2">
          {t.extra} <span className="text-muted font-normal">{t.optional}</span>
        </label>
        <textarea id="a-extra" name="toevoeging" rows={2} className={`${inputCls} resize-none`} placeholder={t.extraPh} />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-8 w-full sm:w-auto px-8 py-3.5 text-[15px] font-display font-bold text-white bg-accent rounded-xl hover:bg-accent-dark transition-colors disabled:opacity-60"
      >
        {loading ? t.submitting : t.submit}
      </button>
      <p className="mt-4 text-[13px] text-muted">{t.note}</p>
    </form>
  )
}
