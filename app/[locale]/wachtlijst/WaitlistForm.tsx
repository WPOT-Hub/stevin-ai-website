'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'

const HUB_ENDPOINT = 'https://hub.stevin.ai/api/wachtlijst'
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function WaitlistForm() {
  const t = useTranslations('wachtlijst')
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState<string>('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (status === 'loading') return

    const form = e.currentTarget
    const data = new FormData(form)
    const email = String(data.get('email') || '').trim()

    if (!email || !EMAIL_RE.test(email)) {
      setStatus('error')
      setErrorMsg(t('error_email'))
      return
    }

    setStatus('loading')
    setErrorMsg('')

    const payload = {
      email,
      name: String(data.get('name') || '').trim() || null,
      company: String(data.get('company') || '').trim() || null,
      role: String(data.get('role') || '').trim() || null,
      monthly_media_budget: String(data.get('monthly_media_budget') || '').trim() || null,
      primary_use_case: String(data.get('primary_use_case') || '').trim() || null,
      source: 'stevin.ai/wachtlijst',
    }

    try {
      const res = await fetch(HUB_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const json = await res.json().catch(() => ({}))
      if (!res.ok || !json?.ok) {
        setStatus('error')
        setErrorMsg(json?.error || t('error_generic'))
        return
      }
      setStatus('success')
      form.reset()
    } catch {
      setStatus('error')
      setErrorMsg(t('error_generic'))
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-white rounded-xl p-8 border border-border">
        <h3 className="font-display font-bold text-primary text-[22px] mb-3">
          {t('success_title')}
        </h3>
        <p className="text-muted text-[15px] leading-relaxed">
          {t('success_body')}
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl p-8 border border-border space-y-5">
      <div>
        <label className="block text-[13px] font-medium text-primary mb-2" htmlFor="wl-email">
          {t('label_email')} *
        </label>
        <input
          id="wl-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="w-full rounded-lg border border-border px-4 py-2.5 text-[15px] focus:outline-none focus:border-accent"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-[13px] font-medium text-primary mb-2" htmlFor="wl-name">
            {t('label_name')}
          </label>
          <input
            id="wl-name"
            name="name"
            type="text"
            autoComplete="name"
            className="w-full rounded-lg border border-border px-4 py-2.5 text-[15px] focus:outline-none focus:border-accent"
          />
        </div>
        <div>
          <label className="block text-[13px] font-medium text-primary mb-2" htmlFor="wl-company">
            {t('label_company')}
          </label>
          <input
            id="wl-company"
            name="company"
            type="text"
            autoComplete="organization"
            className="w-full rounded-lg border border-border px-4 py-2.5 text-[15px] focus:outline-none focus:border-accent"
          />
        </div>
      </div>

      <div>
        <label className="block text-[13px] font-medium text-primary mb-2" htmlFor="wl-role">
          {t('label_role')}
        </label>
        <select
          id="wl-role"
          name="role"
          defaultValue=""
          className="w-full rounded-lg border border-border px-4 py-2.5 text-[15px] bg-white focus:outline-none focus:border-accent"
        >
          <option value="" disabled>{t('role_option_default')}</option>
          <option value="marketing-bureau">{t('role_agency')}</option>
          <option value="in-house marketeer">{t('role_inhouse')}</option>
          <option value="ondernemer">{t('role_founder')}</option>
          <option value="anders">{t('role_other')}</option>
        </select>
      </div>

      <div>
        <label className="block text-[13px] font-medium text-primary mb-2" htmlFor="wl-budget">
          {t('label_budget')}
        </label>
        <select
          id="wl-budget"
          name="monthly_media_budget"
          defaultValue=""
          className="w-full rounded-lg border border-border px-4 py-2.5 text-[15px] bg-white focus:outline-none focus:border-accent"
        >
          <option value="" disabled>{t('budget_option_default')}</option>
          <option value="<5k">{t('budget_lt5k')}</option>
          <option value="5-25k">{t('budget_5_25k')}</option>
          <option value="25-100k">{t('budget_25_100k')}</option>
          <option value=">100k">{t('budget_gt100k')}</option>
        </select>
      </div>

      <div>
        <label className="block text-[13px] font-medium text-primary mb-2" htmlFor="wl-usecase">
          {t('label_usecase')}
        </label>
        <textarea
          id="wl-usecase"
          name="primary_use_case"
          rows={3}
          className="w-full rounded-lg border border-border px-4 py-2.5 text-[15px] focus:outline-none focus:border-accent resize-y"
        />
      </div>

      {status === 'error' && errorMsg ? (
        <p className="text-[13px] text-[#F4216A]">{errorMsg}</p>
      ) : null}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full bg-accent text-white font-display font-bold text-[15px] py-3.5 rounded-lg hover:opacity-90 transition disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? t('submitting') : t('submit')}
      </button>
    </form>
  )
}
