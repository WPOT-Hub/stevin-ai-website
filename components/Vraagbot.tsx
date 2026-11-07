'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useLocale } from 'next-intl'
import { MessageCircle, Phone, Send, X } from 'lucide-react'
import { pushDataLayerEvent } from '@/lib/datalayer'
import { TELEFOON } from '@/lib/telefoon'
import { Turnstile, TURNSTILE_SITEKEY } from '@/components/Turnstile'

/**
 * W-752: de vraagbot, een klein bolletje rechtsonder.
 *
 * Alles wat de bot weet en mag, staat in de Hub (src/core/vraagbot/kennis.ts).
 * Hier staat alleen het venster: geen sleutel, geen prompt, geen model.
 *
 * Zichtbaar: met NEXT_PUBLIC_VRAAGBOT=aan voor iedereen. Anders alleen voor
 * wie de site een keer met ?vraagbot=1 opende (onthouden in localStorage),
 * zodat Koen hem live kan testen voordat bezoekers hem zien. ?vraagbot=0
 * zet hem weer weg.
 *
 * Events (REGEL 7, elk te bewijzen in GA4): chat_open, chat_vraag,
 * chat_uitnodiging, chat_naar_mens (formulier of bellen), chat_naar_whatsapp,
 * chat_gegevens (pas na een geslaagde inzending).
 */

const API = (process.env.NEXT_PUBLIC_VRAAGBOT_API ?? 'https://hub.stevin.ai/api/vraagbot').replace(/\/$/, '')
const ZICHTBAAR_VOOR_IEDEREEN = process.env.NEXT_PUBLIC_VRAAGBOT === 'aan'
const SLEUTEL_TEST = 'stevin_vraagbot'
const SLEUTEL_GESPREK = 'stevin_vraagbot_gesprek'
const SLEUTEL_BERICHTEN = 'stevin_vraagbot_berichten'
const SLEUTEL_TIJD = 'stevin_vraagbot_tijd'
const BEWAAR_MS = 24 * 60 * 60 * 1000

type Taal = 'nl' | 'en'
type Bericht = { van: 'bot' | 'bezoeker'; tekst: string; knoppen?: boolean }

const T = {
  nl: {
    open: 'Stel een vraag',
    titel: 'Stel een vraag',
    sluit: 'Sluiten',
    opening: 'Ik ben de AI-assistent van Stevin.AI. Ik beantwoord vragen over wat we doen en wat het kost. Wil je liever iemand spreken, dan kan dat altijd.',
    plaats: 'Typ je vraag',
    stuur: 'Versturen',
    bezig: 'Even denken',
    gegevens: 'Laat je gegevens achter',
    bel: `Bel ${TELEFOON.weergave}`,
    whatsapp: 'WhatsApp',
    naam: 'Naam',
    email: 'Mailadres',
    telefoon: 'Telefoon (mag leeg)',
    bedrijf: 'Bedrijf of website (mag leeg)',
    toestemming: 'Koen mag contact met me opnemen over mijn vraag.',
    verstuur: 'Verstuur',
    privacy: 'We bewaren de chat 90 dagen. Lees de privacyverklaring.',
    fout: `Dat lukte niet. Bel ${TELEFOON.weergave}.`,
    terug: 'Terug naar de chat',
  },
  en: {
    open: 'Ask a question',
    titel: 'Ask a question',
    sluit: 'Close',
    opening: 'I am the AI assistant of Stevin.AI. I answer questions about what we do and what it costs. If you would rather talk to a person, that is always possible.',
    plaats: 'Type your question',
    stuur: 'Send',
    bezig: 'Thinking',
    gegevens: 'Leave your details',
    bel: `Call ${TELEFOON.weergave}`,
    whatsapp: 'WhatsApp',
    naam: 'Name',
    email: 'Email',
    telefoon: 'Phone (optional)',
    bedrijf: 'Company or website (optional)',
    toestemming: 'Koen may contact me about my question.',
    verstuur: 'Send',
    privacy: 'We keep the chat for 90 days. Read the privacy statement.',
    fout: `That did not work. Call ${TELEFOON.weergave}.`,
    terug: 'Back to the chat',
  },
} as const

function leesOpslag(soort: 'local' | 'session', sleutel: string): string {
  try {
    return (soort === 'local' ? window.localStorage : window.sessionStorage).getItem(sleutel) ?? ''
  } catch {
    return ''
  }
}

function schrijfOpslag(soort: 'local' | 'session', sleutel: string, waarde: string | null): void {
  try {
    const o = soort === 'local' ? window.localStorage : window.sessionStorage
    if (waarde === null) o.removeItem(sleutel)
    else o.setItem(sleutel, waarde)
  } catch {
    /* privévenster of geblokkeerde opslag: het venster werkt dan zonder geheugen */
  }
}

export default function Vraagbot() {
  const locale = useLocale()
  const taal: Taal = locale === 'en' ? 'en' : 'nl'
  const t = T[taal]
  const [zichtbaar, setZichtbaar] = useState(ZICHTBAAR_VOOR_IEDEREEN)
  const [open, setOpen] = useState(false)
  const [berichten, setBerichten] = useState<Bericht[]>([{ van: 'bot', tekst: T[taal].opening }])
  const [invoer, setInvoer] = useState('')
  const [bezig, setBezig] = useState(false)
  const [gesloten, setGesloten] = useState(false)
  const [whatsapp, setWhatsapp] = useState<string>(TELEFOON.whatsapp)
  const [formulier, setFormulier] = useState(false)
  const gesprekId = useRef('')
  const lijst = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ZICHTBAAR_VOOR_IEDEREEN) return
    const p = new URLSearchParams(window.location.search).get('vraagbot')
    if (p === '1') schrijfOpslag('local', SLEUTEL_TEST, '1')
    if (p === '0') schrijfOpslag('local', SLEUTEL_TEST, null)
    setZichtbaar(leesOpslag('local', SLEUTEL_TEST) === '1')
  }, [])

  // Wegklikken, verder klikken op de site of herladen: het gesprek blijft staan
  // tot een dag na de laatste vraag (Koen, 7 nov 2026).
  const hersteld = useRef(false)
  useEffect(() => {
    // Na een dag begint een nieuw gesprek; tot dan blijft het staan, ook na
    // het sluiten van het tabblad (Koen, 7 nov 2026).
    const tijd = Number(leesOpslag('local', SLEUTEL_TIJD) || 0)
    if (!tijd || Date.now() - tijd > BEWAAR_MS) {
      schrijfOpslag('local', SLEUTEL_GESPREK, null)
      schrijfOpslag('local', SLEUTEL_BERICHTEN, null)
    }
    gesprekId.current = leesOpslag('local', SLEUTEL_GESPREK)
    try {
      const opgeslagen = JSON.parse(leesOpslag('local', SLEUTEL_BERICHTEN) || 'null')
      if (Array.isArray(opgeslagen) && opgeslagen.length > 0 && gesprekId.current) setBerichten(opgeslagen.slice(-40))
    } catch {
      // kapotte opslag: begin gewoon opnieuw
    }
    hersteld.current = true
  }, [])

  useEffect(() => {
    if (!hersteld.current) return
    schrijfOpslag('local', SLEUTEL_BERICHTEN, gesprekId.current ? JSON.stringify(berichten.slice(-40)) : null)
    if (gesprekId.current) schrijfOpslag('local', SLEUTEL_TIJD, String(Date.now()))
  }, [berichten])

  useEffect(() => {
    lijst.current?.scrollTo({ top: lijst.current.scrollHeight })
  }, [berichten, bezig, formulier])

  const openen = () => {
    setOpen(true)
    pushDataLayerEvent('chat_open', { chat_pagina: window.location.pathname })
  }

  const naarMens = (soort: 'formulier' | 'bellen') => {
    pushDataLayerEvent('chat_naar_mens', { chat_soort: soort })
    if (soort === 'formulier') setFormulier(true)
  }

  const stuur = async () => {
    const vraag = invoer.trim()
    if (!vraag || bezig || gesloten) return
    setInvoer('')
    setBerichten((b) => [...b, { van: 'bezoeker', tekst: vraag }])
    setBezig(true)
    pushDataLayerEvent('chat_vraag', { chat_nummer: berichten.filter((b) => b.van === 'bezoeker').length + 1 })
    try {
      const res = await fetch(`${API}/vraag`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'omit',
        body: JSON.stringify({ gesprekId: gesprekId.current || undefined, vraag: vraag.slice(0, 500), taal, pagina: window.location.pathname }),
      })
      const j: Record<string, unknown> = await res.json().catch(() => ({}))
      const tekst = typeof j.antwoord === 'string' ? j.antwoord : typeof j.melding === 'string' ? j.melding : t.fout
      if (typeof j.gesprekId === 'string') {
        gesprekId.current = j.gesprekId
        schrijfOpslag('local', SLEUTEL_GESPREK, j.gesprekId)
      }
      if (typeof j.whatsapp === 'string' && j.whatsapp.startsWith('https://wa.me/')) setWhatsapp(j.whatsapp)
      const knoppen = j.uitnodiging === true || !res.ok
      if (j.uitnodiging === true) pushDataLayerEvent('chat_uitnodiging')
      if (j.gesloten === true) {
        setGesloten(true)
        schrijfOpslag('local', SLEUTEL_GESPREK, null)
      }
      setBerichten((b) => [...b, { van: 'bot', tekst, knoppen }])
    } catch {
      setBerichten((b) => [...b, { van: 'bot', tekst: t.fout, knoppen: true }])
    } finally {
      setBezig(false)
    }
  }

  if (!zichtbaar) return null

  return (
    <>
      {!open && (
        <button
          type="button"
          onClick={openen}
          aria-label={t.open}
          className="fixed bottom-24 right-4 z-50 flex items-center gap-2 rounded-full border border-[#d6dde8] bg-white px-4 py-3 text-[14px] font-medium text-[#1f2933] shadow-[0_8px_24px_rgba(15,23,42,0.18)] transition hover:border-[#3c8eff] lg:bottom-6 lg:right-6"
        >
          <MessageCircle className="h-4 w-4 text-[#3c8eff]" aria-hidden />
          {t.open}
        </button>
      )}
      {open && (
        <div
          role="dialog"
          aria-label={t.titel}
          className="fixed inset-x-3 bottom-3 z-[55] flex max-h-[80vh] flex-col overflow-hidden rounded-[14px] border border-[#d6dde8] bg-white text-[#1f2933] shadow-[0_12px_40px_rgba(15,23,42,0.25)] sm:inset-x-auto sm:right-6 sm:bottom-6 sm:w-[360px]"
        >
          <div className="flex items-center justify-between border-b border-[#d6dde8] px-4 py-3">
            <span className="text-[14px] font-semibold">{t.titel}</span>
            <button type="button" onClick={() => setOpen(false)} aria-label={t.sluit} className="rounded-full p-1 text-slate-500 hover:text-[#1f2933]">
              <X className="h-4 w-4" aria-hidden />
            </button>
          </div>

          <div ref={lijst} className="flex-1 space-y-3 overflow-y-auto bg-[#f7f8fa] px-4 py-4 text-[14px] leading-relaxed" aria-live="polite">
            {berichten.map((b, i) => (
              <div key={i} className={b.van === 'bezoeker' ? 'flex justify-end' : ''}>
                <div className={b.van === 'bezoeker' ? 'max-w-[85%] rounded-[12px] bg-[#3c8eff] px-3 py-2 text-white' : 'max-w-[90%] rounded-[12px] border border-[#d6dde8] bg-white px-3 py-2'}>
                  {b.tekst}
                </div>
                {b.knoppen && !formulier && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    <button type="button" onClick={() => naarMens('formulier')} className="rounded-full border border-[#d6dde8] bg-white px-3 py-1.5 text-[13px] hover:border-[#3c8eff]">
                      {t.gegevens}
                    </button>
                    <a href={TELEFOON.tel} onClick={() => naarMens('bellen')} className="inline-flex items-center gap-1 rounded-full border border-[#d6dde8] bg-white px-3 py-1.5 text-[13px] hover:border-[#3c8eff]">
                      <Phone className="h-3.5 w-3.5" aria-hidden />
                      {t.bel}
                    </a>
                    <a href={whatsapp} target="_blank" rel="noopener noreferrer" onClick={() => pushDataLayerEvent('chat_naar_whatsapp')} className="rounded-full border border-[#d6dde8] bg-white px-3 py-1.5 text-[13px] hover:border-[#3c8eff]">
                      {t.whatsapp}
                    </a>
                  </div>
                )}
              </div>
            ))}
            {bezig && <div className="text-[13px] text-slate-500">{t.bezig}...</div>}
            {formulier && (
              <Gegevens
                taal={taal}
                gesprekId={gesprekId.current}
                terug={() => setFormulier(false)}
                gelukt={(melding) => {
                  setFormulier(false)
                  if (melding) setBerichten((b) => [...b, { van: 'bot', tekst: melding }])
                }}
              />
            )}
          </div>

          {!formulier && !gesloten && (
            <form
              onSubmit={(e) => {
                e.preventDefault()
                void stuur()
              }}
              className="flex items-center gap-2 border-t border-[#d6dde8] bg-white px-3 py-3"
            >
              <input
                value={invoer}
                onChange={(e) => setInvoer(e.target.value)}
                maxLength={500}
                placeholder={t.plaats}
                aria-label={t.plaats}
                className="min-w-0 flex-1 rounded-full border-2 border-[#9aa8bb] bg-white px-3 py-2 text-[16px] text-[#1f2933] placeholder:text-[#5b6675] sm:text-[14px] outline-none focus:border-[#3c8eff]"
              />
              <button type="submit" disabled={bezig || !invoer.trim()} aria-label={t.stuur} className="rounded-full bg-[#3c8eff] p-2.5 text-white disabled:bg-[#9cc3ff]">
                <Send className="h-4 w-4" aria-hidden />
              </button>
            </form>
          )}
          <p className="px-4 pb-2 pt-1 text-[11px] text-slate-500">
            <a href={taal === 'en' ? '/en/privacy' : '/privacy'} className="underline">{t.privacy}</a>
          </p>
        </div>
      )}
    </>
  )
}

function Gegevens({ taal, gesprekId, terug, gelukt }: { taal: Taal; gesprekId: string; terug: () => void; gelukt: (melding: string) => void }) {
  const t = T[taal]
  const [naam, setNaam] = useState('')
  const [email, setEmail] = useState('')
  const [telefoon, setTelefoon] = useState('')
  const [bedrijf, setBedrijf] = useState('')
  const [honey, setHoney] = useState('')
  const [akkoord, setAkkoord] = useState(false)
  const [token, setToken] = useState('')
  const [bezig, setBezig] = useState(false)
  const [melding, setMelding] = useState('')
  const widgetId = useRef('')
  const widgetActief = useRef(false)
  const zetToken = useCallback((v: string) => setToken(v), [])
  const mislukt = useCallback(() => setToken(''), [])

  const verstuur = async () => {
    if (bezig) return
    setBezig(true)
    setMelding('')
    try {
      const res = await fetch(`${API}/gegevens`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'omit',
        body: JSON.stringify({ gesprekId: gesprekId || undefined, naam, email, telefoon, bedrijf, toestemming: akkoord, turnstile: token, _honey: honey, taal }),
      })
      const j: Record<string, unknown> = await res.json().catch(() => ({}))
      if (res.ok && j.ok === true) {
        pushDataLayerEvent('chat_gegevens')
        // Terug naar de chat, zodat de bezoeker verder kan vragen (bijvoorbeeld
        // de gegevens van een referentie, die de Hub pas na dit formulier geeft).
        gelukt(typeof j.melding === 'string' ? j.melding : '')
      } else {
        setMelding(typeof j.melding === 'string' ? j.melding : t.fout)
      }
    } catch {
      setMelding(t.fout)
    } finally {
      setBezig(false)
      // Een token is eenmalig: weg ermee voordat het widget een nieuwe maakt.
      setToken('')
      if (widgetId.current && window.turnstile) {
        try {
          window.turnstile.reset(widgetId.current)
        } catch {
          /* widget al weg: bij een volgende poging tekent hij opnieuw */
        }
      }
    }
  }

  const veld = 'w-full rounded-[12px] border border-[#d6dde8] bg-white px-3 py-2 text-[16px] sm:text-[14px] outline-none focus:border-[#3c8eff]'
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        void verstuur()
      }}
      className="space-y-2 rounded-[12px] border border-[#d6dde8] bg-white p-3"
    >
      <input className={veld} value={naam} onChange={(e) => setNaam(e.target.value)} placeholder={t.naam} aria-label={t.naam} autoComplete="name" maxLength={120} required />
      <input className={veld} value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t.email} aria-label={t.email} autoComplete="email" type="email" maxLength={200} />
      <input className={veld} value={telefoon} onChange={(e) => setTelefoon(e.target.value)} placeholder={t.telefoon} aria-label={t.telefoon} autoComplete="tel" type="tel" maxLength={40} />
      <input className={veld} value={bedrijf} onChange={(e) => setBedrijf(e.target.value)} placeholder={t.bedrijf} aria-label={t.bedrijf} autoComplete="organization" maxLength={160} />
      <input className="hidden" tabIndex={-1} autoComplete="off" value={honey} onChange={(e) => setHoney(e.target.value)} aria-hidden />
      <label className="flex items-start gap-2 text-[12px] text-slate-600">
        <input type="checkbox" checked={akkoord} onChange={(e) => setAkkoord(e.target.checked)} className="mt-0.5" />
        {t.toestemming}
      </label>
      {TURNSTILE_SITEKEY && <Turnstile onToken={zetToken} onMislukt={mislukt} widgetRef={widgetId} actiefRef={widgetActief} />}
      {melding && <p className="text-[12px] text-[#d23f57]">{melding}</p>}
      <div className="flex items-center justify-between">
        <button type="button" onClick={terug} className="text-[12px] text-slate-500 underline">{t.terug}</button>
        <button type="submit" disabled={bezig || !naam.trim() || (!email.trim() && !telefoon.trim()) || !akkoord} className="rounded-full bg-[#3c8eff] px-4 py-2 text-[13px] font-medium text-white disabled:opacity-40">
          {t.verstuur}
        </button>
      </div>
    </form>
  )
}
