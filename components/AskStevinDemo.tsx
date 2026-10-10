'use client'

import { useEffect, useRef, useState } from 'react'
import { Bot, User, Copy, Share2, RefreshCw, FileDown } from 'lucide-react'

// W-078, 13 sep 2026, en W-524, 10 okt 2026. De klantportal
// (app.stevin.ai/dashboard/chat, "Stevin Assistant") als gescripte demo. Geen
// endpoint, geen AI-call: drie vaste vragen met vaste antwoorden, en dat staat
// er ook bij.
//
// Sinds 10 okt (Koen, keuze 1): hetzelfde verzonnen installatiebedrijf als de
// geheugendemo op de homepage (components/MarketingMemoryDemo.tsx), in plaats
// van het circus van LUMIOS. Telefoontjes en aanvragen in plaats van
// "resultaten", geen vaste datum (die stond een maand na dato nog op "t/m 12
// september"), en de grafiek loopt mee met de echte maand: de waarden komen uit
// een vast seizoensprofiel, zodat de zomerpiek altijd in de zomer valt.
//
// Getallen onderling nagerekend: 30 dagen 95 (64 + 31) voor 2.840 euro is 29,90
// per stuk, ervoor 85 voor 2.703 is 31,80; 90 dagen 5.310 + 2.270 + 840 = 8.420
// euro voor 196 + 61 + 58 = 315. De knoppen onder een antwoord zijn beeld.

type Locale = 'nl' | 'en'
type Block = { kind: 'p' | 'h' | 'ul'; text: string | string[] }
type QA = { q: string; a: Block[]; chart?: boolean }

// Telefoontjes en aanvragen per kalendermaand (jan tot en met dec), verzonnen,
// met de zomerpiek van een installateur die airco's plaatst.
const SEIZOEN = [52, 48, 61, 74, 88, 121, 138, 112, 86, 79, 66, 58]

const COPY: Record<Locale, {
  eyebrow: string
  h2: string
  sub: string
  title: string
  aiNotice: string
  greeting: string
  intro: string
  demoOnly: string
  reset: string
  bron: string
  chartTitle: string
  chartNote: string
  actions: string[]
  qa: QA[]
}> = {
  nl: {
    eyebrow: 'Jouw eigen scherm',
    h2: 'Vraag het gewoon. Op je eigen cijfers.',
    sub: 'Dit is de klantportal. Geen rapport dat je moet lezen, maar een vraag die je stelt. Het antwoord komt uit jouw campagnes, met de meting erbij, en het verandert niets. Klik een vraag.',
    title: 'Stevin Assistant',
    aiNotice: 'Een AI-assistent, niet je consultant.',
    greeting: 'Hallo!',
    intro: 'Stel je vraag over je telefoontjes, aanvragen en campagnes in gewone taal.',
    demoOnly: 'In deze demo kun je alleen deze drie vragen stellen.',
    reset: 'Opnieuw',
    bron: 'Voorbeeld van de klantportal op app.stevin.ai, met verzonnen cijfers van een installatiebedrijf. De knoppen onder een antwoord zijn hier beeld, geen functie.',
    chartTitle: 'Telefoontjes en aanvragen per maand',
    chartNote: 'De lopende maand is nog niet compleet.',
    actions: ['Kopieren', 'Delen', 'Opnieuw genereren', 'Exporteren als PDF'],
    qa: [
      {
        q: 'Hoe gaat het met mijn campagnes?',
        a: [
          { kind: 'p', text: 'Hier is de stand van zaken:' },
          { kind: 'h', text: 'Afgelopen 30 dagen' },
          { kind: 'ul', text: ['€2.840 uitgegeven', '64 telefoontjes en 31 aanvragen via de site, samen 95', '€29,90 per telefoontje of aanvraag'] },
          { kind: 'h', text: 'Vergeleken met de 30 dagen ervoor' },
          { kind: 'ul', text: ['Telefoontjes en aanvragen: +12% (van 85 naar 95)', 'Kosten per stuk: -6% (van €31,80 naar €29,90)', 'Uitgegeven: +5% (van €2.703 naar €2.840)'] },
          { kind: 'p', text: 'Dit zijn telefoontjes en aanvragen zoals wij ze meten. Hoeveel er een opdracht werden, zie je in je eigen opvolging.' },
        ],
      },
      {
        q: 'Wanneer krijg ik de meeste telefoontjes?',
        chart: true,
        a: [
          { kind: 'p', text: 'Hier is de stand van zaken:' },
          { kind: 'h', text: 'Per seizoen' },
          { kind: 'ul', text: ['Zomer: de drukste maanden, met juli als piek, rond de 140 per maand', 'Voorjaar en najaar: tussen de 60 en de 90 per maand', 'Winter: rond de 50 per maand'] },
          { kind: 'p', text: 'De piek komt met de warmte. Na een warme dag komen er de dag erna ongeveer twee keer zoveel telefoontjes binnen, vooral voor airco. Wie zijn advertenties pas aanzet als het al warm is, mist de eerste dagen.' },
        ],
      },
      {
        q: 'Waar gaat het meeste budget naartoe?',
        a: [
          { kind: 'p', text: 'Hier is de stand van zaken:' },
          { kind: 'h', text: 'Verdeling laatste 90 dagen, €8.420 in totaal' },
          { kind: 'ul', text: ['Google Ads, zoeken: €5.310, 196 telefoontjes en aanvragen, €27 per stuk', 'Meta: €2.270, 61 telefoontjes en aanvragen, €37 per stuk', 'Google Ads, op je eigen naam: €840, 58 telefoontjes en aanvragen, €14 per stuk'] },
          { kind: 'p', text: 'Het meeste geld gaat naar zoeken, en daar komen ook de meeste telefoontjes en aanvragen vandaan. De campagne op je eigen naam is goedkoop per stuk, maar veel van die mensen zochten jou toch al. Meta levert minder op per euro: de advertenties over warmtepompen kregen veel kliks en weinig aanvragen.' },
          { kind: 'h', text: 'Wat ik niet doe' },
          { kind: 'ul', text: ['Strategie bepalen of budget verschuiven', 'Campagnes aanpassen of pauzeren', 'Voorspellen wat een wijziging oplevert'] },
          { kind: 'p', text: 'Daarvoor kan je specialist een voorstel doen. Zal ik vragen of die naar Meta kijkt?' },
        ],
      },
    ],
  },
  en: {
    eyebrow: 'Your own screen',
    h2: 'Just ask. On your own numbers.',
    sub: 'This is the client portal. Not a report you have to read, but a question you ask. The answer comes from your campaigns, measurement included, and it changes nothing. Click a question.',
    title: 'Stevin Assistant',
    aiNotice: 'An AI assistant, not your consultant.',
    greeting: 'Hello!',
    intro: 'Ask about your calls, enquiries and campaigns in plain language.',
    demoOnly: 'In this demo you can only ask these three questions.',
    reset: 'Reset',
    bron: 'Example of the client portal on app.stevin.ai, with made-up figures from an installation company. The buttons under an answer are illustration here, not function.',
    chartTitle: 'Calls and enquiries per month',
    chartNote: 'The current month is not complete yet.',
    actions: ['Copy', 'Share', 'Regenerate', 'Export as PDF'],
    qa: [
      {
        q: 'How are my campaigns doing?',
        a: [
          { kind: 'p', text: 'Here is where things stand:' },
          { kind: 'h', text: 'Last 30 days' },
          { kind: 'ul', text: ['€2,840 spent', '64 calls and 31 enquiries through the site, 95 in total', '€29.90 per call or enquiry'] },
          { kind: 'h', text: 'Compared with the 30 days before' },
          { kind: 'ul', text: ['Calls and enquiries: +12% (from 85 to 95)', 'Cost each: -6% (from €31.80 to €29.90)', 'Spent: +5% (from €2,703 to €2,840)'] },
          { kind: 'p', text: 'These are calls and enquiries as we measure them. How many became a job, you see in your own follow-up.' },
        ],
      },
      {
        q: 'When do I get the most calls?',
        chart: true,
        a: [
          { kind: 'p', text: 'Here is where things stand:' },
          { kind: 'h', text: 'By season' },
          { kind: 'ul', text: ['Summer: the busiest months, peaking in July at around 140 a month', 'Spring and autumn: between 60 and 90 a month', 'Winter: around 50 a month'] },
          { kind: 'p', text: 'The peak comes with the heat. After a hot day, about twice as many calls come in the next day, mostly for air conditioning. If you only switch your ads on once it is already hot, you miss the first days.' },
        ],
      },
      {
        q: 'Where does most of the budget go?',
        a: [
          { kind: 'p', text: 'Here is where things stand:' },
          { kind: 'h', text: 'Split over the last 90 days, €8,420 in total' },
          { kind: 'ul', text: ['Google Ads, search: €5,310, 196 calls and enquiries, €27 each', 'Meta: €2,270, 61 calls and enquiries, €37 each', 'Google Ads, on your own name: €840, 58 calls and enquiries, €14 each'] },
          { kind: 'p', text: 'Most of the money goes to search, and that is also where most calls and enquiries come from. The campaign on your own name is cheap per enquiry, but many of those people were looking for you anyway. Meta delivers less per euro: the heat pump ads got lots of clicks and few enquiries.' },
          { kind: 'h', text: 'What I do not do' },
          { kind: 'ul', text: ['Set strategy or move budget', 'Change or pause campaigns', 'Predict what a change will deliver'] },
          { kind: 'p', text: 'For that, your specialist can make a proposal. Shall I ask them to look at Meta?' },
        ],
      },
    ],
  },
}

type Msg = { role: 'user'; text: string } | { role: 'assistant'; blocks: Block[]; chart?: boolean }

function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-2">
      {blocks.map((b, i) => {
        if (b.kind === 'h') return <p key={i} className="m-0 font-semibold text-[#1f2933]">{b.text as string}</p>
        if (b.kind === 'ul') return (
          <ul key={i} className="list-disc ml-4 space-y-1 m-0">
            {(b.text as string[]).map((t, j) => <li key={j}>{t}</li>)}
          </ul>
        )
        return <p key={i} className="m-0">{b.text as string}</p>
      })}
    </div>
  )
}

function Chart({ locale, title, note }: { locale: Locale; title: string; note: string }) {
  // Laatste zeven maanden tot en met de lopende maand. Pas na een klik in beeld,
  // dus alleen in de browser: geen verschil tussen server en browser.
  const nu = new Date()
  const fmt = new Intl.DateTimeFormat(locale === 'en' ? 'en-GB' : 'nl-NL', { month: 'short' })
  const maanden = Array.from({ length: 7 }, (_, k) => new Date(nu.getFullYear(), nu.getMonth() - 6 + k, 1))
  const dagenInMaand = new Date(nu.getFullYear(), nu.getMonth() + 1, 0).getDate()
  const waarden = maanden.map((d, k) => {
    const v = SEIZOEN[d.getMonth()]
    return k === 6 ? Math.max(1, Math.round((v * nu.getDate()) / dagenInMaand)) : v
  })
  const labels = maanden.map((d) => fmt.format(d).replace('.', ''))
  const max = Math.max(...waarden)
  const w = 520, h = 150, pad = 8, gap = 10
  const bw = (w - pad * 2 - gap * (waarden.length - 1)) / waarden.length
  return (
    <div className="mt-4 rounded-[10px] border border-[#d6dde8] bg-white px-4 pt-3 pb-2">
      <p className="m-0 text-[12px] font-semibold text-[#1f2933]">{title}</p>
      <p className="m-0 mb-1 text-[11px] text-[#8A94A3]">{note}</p>
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto" role="img" aria-label={title}>
        {waarden.map((v, i) => {
          const x = pad + i * (bw + gap)
          const bh = Math.max(4, (v / max) * (h - 44))
          const y = h - 24 - bh
          const laatste = i === waarden.length - 1
          return (
            <g key={i}>
              <rect x={x} y={y} width={bw} height={bh} rx="3" fill={laatste ? '#9cc4ff' : '#3c8eff'} />
              <text x={x + bw / 2} y={y - 6} textAnchor="middle" fontSize="11" fill="#1f2933" fontWeight="600">{v.toLocaleString(locale === 'en' ? 'en-GB' : 'nl-NL')}</text>
              <text x={x + bw / 2} y={h - 8} textAnchor="middle" fontSize="11" fill="#6B7280">{labels[i]}</text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}

export default function AskStevinDemo({ locale, withHeader = true }: { locale: string; withHeader?: boolean }) {
  const loc: Locale = locale === 'en' ? 'en' : 'nl'
  const c = COPY[loc]
  const [messages, setMessages] = useState<Msg[]>([])
  const [typing, setTyping] = useState(false)
  const asked = messages.filter((m): m is Extract<Msg, { role: 'user' }> => m.role === 'user').map((m) => m.text)
  const scrollRef = useRef<HTMLDivElement>(null)
  const ACTION_ICONS = [Copy, Share2, RefreshCw, FileDown]

  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages, typing])

  const ask = (qa: QA) => {
    if (typing || asked.includes(qa.q)) return
    setMessages((m) => [...m, { role: 'user', text: qa.q }])
    setTyping(true)
    setTimeout(() => {
      setMessages((m) => [...m, { role: 'assistant', blocks: qa.a, chart: qa.chart }])
      setTyping(false)
    }, 700)
  }

  const remaining = c.qa.filter((qa) => !asked.includes(qa.q))

  const panel = (
    <div className="rounded-[14px] border border-[#d6dde8] bg-white shadow-[0_18px_50px_rgba(10,22,40,0.08),0_2px_8px_rgba(10,22,40,0.04)] overflow-hidden">
      {/* Topbalk zoals in de portal */}
      <div className="flex items-center justify-between gap-4 border-b border-[#d6dde8] px-5 py-4 sm:px-6">
        <div>
          <p className="m-0 font-display font-bold text-[#1f2933] text-[17px]">{c.title}</p>
          <p className="m-0 mt-0.5 text-[12.5px] text-[#6B7280]">{c.aiNotice}</p>
        </div>
        <span className="hidden sm:inline-flex items-center gap-2 rounded-full border border-[#d6dde8] px-3 py-1 text-[11px] font-display font-bold uppercase tracking-[0.08em] text-[#6B7280]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#1f9d55]" />
          app.stevin.ai
        </span>
      </div>

      {/* Berichten */}
      <div ref={scrollRef} className="h-[440px] overflow-y-auto bg-[#f7f8fa] px-4 py-5 sm:px-6 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center py-12">
            <Bot className="w-10 h-10 text-[#8A94A3] mx-auto mb-3" aria-hidden="true" />
            <p className="m-0 font-display font-semibold text-[#1f2933]">{c.greeting}</p>
            <p className="m-0 mt-1 text-[14px] text-[#6B7280] max-w-sm mx-auto">{c.intro}</p>
          </div>
        ) : (
          messages.map((msg, i) => (
            <div key={i}>
              <div className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-[#3c8eff]/10 text-[#3c8eff]' : 'bg-white border border-[#d6dde8] text-[#6B7280]'}`}>
                  {msg.role === 'user' ? <User className="w-4 h-4" aria-hidden="true" /> : <Bot className="w-4 h-4" aria-hidden="true" />}
                </div>
                <div className={`max-w-[88%] px-4 py-3 rounded-2xl text-[14px] leading-[1.55] ${msg.role === 'user' ? 'bg-[#3c8eff] text-white rounded-br-md' : 'bg-white border border-[#d6dde8] text-[#374151] rounded-bl-md'}`}>
                  {msg.role === 'user' ? msg.text : (
                    <>
                      <Blocks blocks={msg.blocks} />
                      {msg.chart && <Chart locale={loc} title={c.chartTitle} note={c.chartNote} />}
                    </>
                  )}
                </div>
              </div>
              {msg.role === 'assistant' && (
                <div className="ml-11 mt-2 flex flex-wrap gap-4" aria-hidden="true">
                  {c.actions.map((label, k) => {
                    const Icon = ACTION_ICONS[k]
                    return (
                      <span key={label} className="inline-flex items-center gap-1.5 text-[12px] text-[#6B7280]">
                        <Icon className="w-3.5 h-3.5" />
                        {label}
                      </span>
                    )
                  })}
                </div>
              )}
            </div>
          ))
        )}
        {typing && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white border border-[#d6dde8] text-[#6B7280]"><Bot className="w-4 h-4" aria-hidden="true" /></div>
            <div className="px-4 py-3 rounded-2xl rounded-bl-md bg-white border border-[#d6dde8] flex gap-1 items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8A94A3] animate-pulse" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#8A94A3] animate-pulse [animation-delay:150ms]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#8A94A3] animate-pulse [animation-delay:300ms]" />
            </div>
          </div>
        )}
      </div>

      {/* Vragen en invoer */}
      <div className="border-t border-[#d6dde8] px-4 py-4 sm:px-6">
        <div className="flex flex-wrap gap-2 mb-3">
          {remaining.map((qa) => (
            <button
              key={qa.q}
              type="button"
              onClick={() => ask(qa)}
              disabled={typing}
              className="text-[13px] font-display font-semibold bg-white border border-[#d6dde8] px-3.5 py-1.5 rounded-full text-[#1f2933] hover:border-[#3c8eff] hover:text-[#3c8eff] transition-colors disabled:opacity-50"
            >
              {qa.q}
            </button>
          ))}
          {remaining.length === 0 && (
            <button type="button" onClick={() => setMessages([])} className="text-[13px] font-display font-semibold text-[#3c8eff] px-1">
              {c.reset}
            </button>
          )}
        </div>
        <div className="flex items-center gap-2 rounded-[10px] border border-[#d6dde8] bg-[#f7f8fa] px-4 py-3 text-[13.5px] text-[#8A94A3]">
          {c.demoOnly}
        </div>
      </div>
    </div>
  )

  if (!withHeader) return panel

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="max-w-3xl mb-10">
          <p className="mb-4 inline-flex items-center gap-3 text-xs font-extrabold uppercase tracking-[0.12em] text-[#3C8EFF] before:h-px before:w-7 before:bg-current">
            {c.eyebrow}
          </p>
          <h2 className="font-display font-extrabold text-[#0A0A0A] m-0" style={{ fontSize: 'clamp(30px, 3.4vw, 48px)', letterSpacing: '-0.03em', lineHeight: '1.08' }}>
            {c.h2}
          </h2>
          <p className="mt-5 text-[17px] leading-[1.6] text-[#4B5563] m-0">{c.sub}</p>
        </div>
        {panel}
        <p className="mt-4 text-[12.5px] text-[#6B7280] m-0">{c.bron}</p>
      </div>
    </section>
  )
}
