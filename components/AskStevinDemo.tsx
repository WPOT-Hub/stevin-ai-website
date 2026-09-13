'use client'

import { useEffect, useRef, useState } from 'react'
import { Bot, User, Copy, Share2, RefreshCw, FileDown } from 'lucide-react'

// W-078, 13 sep 2026. Koen: "het zou ook wel mooi zijn om een app.stevin.ai
// voorbeeld te hebben, en dan vooral de ask stevin". Dit is de klantportal
// (app.stevin.ai/dashboard/chat, "Stevin Assistant") als gescripte demo, met
// de drie voorbeeldvragen die daar echt staan. De antwoorden staan vast en
// komen uit de echte cijfers van LUMIOS, onze demo-omgeving (campaign_metrics
// via client_campaigns en metrics_keywords, opgehaald 13 sep 2026). Geen
// endpoint, geen AI-call. Dat staat er ook bij: in deze demo kun je alleen
// deze drie vragen stellen, met de bron en de datum eronder.
//
// 22:12, Koen: "de chat is helemaal veranderd". Nagekeken op de live portal
// (Van Gestel, ingelogd): de kop heet Stevin Assistant, elk antwoord begint
// met "Hier is de actuele stand van zaken:", telt in resultaten en kosten per
// resultaat, vergelijkt met de periode ervoor, heeft een staafdiagram
// "Resultaten per maand, zoals het platform ze telt" en een rij knoppen
// (Kopieren, Delen, Opnieuw genereren, Exporteren als PDF). En hij zegt wat
// hij niet doet. Dat is nu ook de vorm van deze demo. De knoppen zijn hier
// beeld, geen functie.
//
// Bereikkanalen (Koen 12:53, "dv360 is vaak branding"): DV360 staat in de
// data op DISPLAY en VIDEO_VIEW, YouTube op VIDEO_VIEW, Pinterest op
// AWARENESS. Die niet op kosten per resultaat afrekenen. Merkzoekvraag
// (Koen 13:01) uit metrics_keywords, is_branded, weken van 25 mei tot 15
// juni: 10.892, 10.687, 10.876, 10.703 per week, vlak, terwijl DV360 in de
// week van 8 juni van 144.038 naar 180.319 vertoningen ging. Merkcijfers
// lopen in de demo tot 23 juni en dat staat erbij, zoals de echte chat
// dataleeftijd meldt. Het waarom staat niet in de data, dus zegt de demo dat.

type Locale = 'nl' | 'en'
type Block = { kind: 'p' | 'h' | 'ul'; text: string | string[] }
type QA = { q: string; a: Block[]; chart?: boolean }

const MAANDEN: Record<Locale, string[]> = {
  nl: ['mrt 26', 'apr 26', 'mei 26', 'jun 26', 'jul 26', 'aug 26', 'sep 26'],
  en: ['Mar 26', 'Apr 26', 'May 26', 'Jun 26', 'Jul 26', 'Aug 26', 'Sep 26'],
}
// Resultaten per maand, LUMIOS, campaign_metrics t/m 13 sep 2026.
const RESULTATEN = [961, 1420, 1589, 1591, 1373, 1363, 579]

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
    aiNotice: 'Je praat hier met AI, niet met je consultant. Stel je vraag over je campagnes in gewone taal.',
    greeting: 'Hallo Lumios!',
    intro: 'Ik ben de AI-assistent van Stevin. Ik help je de resultaten te begrijpen.',
    demoOnly: 'In deze demo kun je alleen deze drie vragen stellen.',
    reset: 'Opnieuw',
    bron: 'Uit de klantportal op app.stevin.ai. LUMIOS is onze demo-omgeving, geen klantdata. De antwoorden staan vast op de cijfers van 13 september; de knoppen onder een antwoord zijn hier beeld, geen functie.',
    chartTitle: 'Resultaten per maand, zoals het platform ze telt',
    chartNote: 'September loopt nog, gemeten t/m 12 september.',
    actions: ['Kopieren', 'Delen', 'Opnieuw genereren', 'Exporteren als PDF'],
    qa: [
      {
        q: 'Hoe gaat het met mijn campagnes?',
        chart: true,
        a: [
          { kind: 'p', text: 'Hier is de actuele stand van zaken:' },
          { kind: 'h', text: 'Afgelopen 30 dagen (t/m 12 september)' },
          { kind: 'ul', text: ['€15.269 uitgegeven', '1.375 resultaten behaald', '€11,10 kosten per resultaat', '4,6 miljoen keer getoond, 88.350 clicks (1,9% klikpercentage)'] },
          { kind: 'h', text: 'Vergelijking met vorige 30 dagen' },
          { kind: 'ul', text: ['Resultaten: +3% (van 1.336 naar 1.375)', 'Kosten per resultaat: +1% (van €10,94 naar €11,10)', 'Spend: +4% (van €14.622 naar €15.269)'] },
          { kind: 'h', text: 'Afgelopen 7 dagen' },
          { kind: 'ul', text: ['€3.051 uitgegeven', '273 resultaten behaald', '€11,18 kosten per resultaat'] },
          { kind: 'p', text: 'De laatste week ligt een kwart lager dan de week ervoor, in spend en in resultaten, dus de kosten per resultaat bleven gelijk. Drie van de zeven kanalen zijn er om gezien te worden, niet om te verkopen: DV360, YouTube en Pinterest. Die beoordeel je niet op resultaten, maar op hoeveel vaker mensen daarna je merk opzoeken.' },
        ],
      },
      {
        q: 'Wat zijn mijn resultaten deze maand?',
        chart: true,
        a: [
          { kind: 'p', text: 'Hier is de actuele stand van zaken:' },
          { kind: 'h', text: 'September 2026 (t/m 12 september)' },
          { kind: 'ul', text: ['579 resultaten behaald', '€6.663 uitgegeven', '€11,51 kosten per resultaat'] },
          { kind: 'h', text: 'Vergelijking met dezelfde dagen in augustus' },
          { kind: 'ul', text: ['Resultaten: +10% (van 525 naar 579)', 'Spend: +13% (van €5.904 naar €6.663)', 'Kosten per resultaat: +2% (van €11,25 naar €11,51)'] },
          { kind: 'h', text: 'Per maand' },
          { kind: 'ul', text: ['Juli 2026: 1.373 resultaten, €11,33 per resultaat', 'Augustus 2026: 1.363 resultaten, €10,95 per resultaat', 'September 2026: 579 resultaten, €11,51 per resultaat (loopt nog)'] },
          { kind: 'p', text: 'September loopt nog tot eind deze maand. Dit zijn resultaten zoals Meta en Google ze tellen, geen telling van verkochte tickets.' },
        ],
      },
      {
        q: 'Waar gaat het meeste budget naartoe?',
        a: [
          { kind: 'p', text: 'Hier is de actuele stand van zaken:' },
          { kind: 'h', text: 'Kanaalverdeling laatste 90 dagen, €62.347 in totaal' },
          { kind: 'ul', text: ['DV360: €14.620, bereik (display en video), 2,3 miljoen keer getoond', 'Google Ads: €13.524, 2.202 resultaten, €6,14 per resultaat', 'TikTok: €12.445, 1.690 resultaten, €7,36 per resultaat', 'Meta: €11.842, 1.324 resultaten, €8,94 per resultaat', 'YouTube: €5.199, bereik (video), 2,1 miljoen keer getoond', 'Snapchat: €3.399, 235 resultaten, €14,46 per resultaat', 'Pinterest: €1.318, bereik (awareness), 506 duizend keer getoond'] },
          { kind: 'p', text: 'Het meeste geld gaat naar DV360. Dat is een bereikkanaal: je koopt vertoningen, geen klikken. Of dat werkt zie je aan je merkzoekvraag: hoe vaak mensen "Lumos" intypen. Die stond op zo\'n 10.800 vertoningen per week op je eigen naam en bleef vlak, ook in de week dat DV360 van 144 duizend naar 180 duizend vertoningen ging. Waar dat aan ligt kan ik niet uit de cijfers halen. Het kan zijn dat die vertoningen niet landen in Den Haag en Brussel, waar je publiek zoekt. Let op: de merkzoekcijfers zijn voor het laatst gemeten op 23 juni.' },
          { kind: 'p', text: 'De verkoop komt uit Google Ads, TikTok en Meta, voor 6 tot 9 euro per resultaat.' },
          { kind: 'h', text: 'Wat ik niet doe' },
          { kind: 'ul', text: ['Strategie bepalen of budget verschuiven', 'Campagnes aanpassen of pauzeren', 'Voorspellen wat een wijziging oplevert'] },
          { kind: 'p', text: 'Voor die zaken kan je specialist een voorstel doen. Zal ik vragen of hij naar het bereik kijkt?' },
        ],
      },
    ],
  },
  en: {
    eyebrow: 'Your own screen',
    h2: 'Just ask. On your own numbers.',
    sub: 'This is the client portal. Not a report you have to read, but a question you ask. The answer comes from your campaigns, measurement included, and it changes nothing. Click a question.',
    title: 'Stevin Assistant',
    aiNotice: 'You are talking to AI here, not to your consultant. Ask about your campaigns in plain language.',
    greeting: 'Hello Lumios!',
    intro: 'I am the AI assistant of Stevin. I help you understand the results.',
    demoOnly: 'In this demo you can only ask these three questions.',
    reset: 'Start over',
    bron: 'From the client portal at app.stevin.ai. LUMIOS is our demo environment, not client data. The answers are fixed on the numbers of 13 September; the buttons under an answer are for show here, not function.',
    chartTitle: 'Results per month, as the platform counts them',
    chartNote: 'September is still running, measured through 12 September.',
    actions: ['Copy', 'Share', 'Regenerate', 'Export as PDF'],
    qa: [
      {
        q: 'How are my campaigns doing?',
        chart: true,
        a: [
          { kind: 'p', text: 'Here is the current state of play:' },
          { kind: 'h', text: 'Last 30 days (through 12 September)' },
          { kind: 'ul', text: ['€15,269 spent', '1,375 results achieved', '€11.10 cost per result', '4.6 million impressions, 88,350 clicks (1.9% click-through)'] },
          { kind: 'h', text: 'Compared with the previous 30 days' },
          { kind: 'ul', text: ['Results: +3% (from 1,336 to 1,375)', 'Cost per result: +1% (from €10.94 to €11.10)', 'Spend: +4% (from €14,622 to €15,269)'] },
          { kind: 'h', text: 'Last 7 days' },
          { kind: 'ul', text: ['€3,051 spent', '273 results achieved', '€11.18 cost per result'] },
          { kind: 'p', text: 'The last week is a quarter below the week before, in spend and in results, so cost per result stayed level. Three of the seven channels are there to be seen, not to sell: DV360, YouTube and Pinterest. You do not judge those on results, but on how much more often people look up your brand afterwards.' },
        ],
      },
      {
        q: 'What are my results this month?',
        chart: true,
        a: [
          { kind: 'p', text: 'Here is the current state of play:' },
          { kind: 'h', text: 'September 2026 (through 12 September)' },
          { kind: 'ul', text: ['579 results achieved', '€6,663 spent', '€11.51 cost per result'] },
          { kind: 'h', text: 'Compared with the same days in August' },
          { kind: 'ul', text: ['Results: +10% (from 525 to 579)', 'Spend: +13% (from €5,904 to €6,663)', 'Cost per result: +2% (from €11.25 to €11.51)'] },
          { kind: 'h', text: 'Per month' },
          { kind: 'ul', text: ['July 2026: 1,373 results, €11.33 per result', 'August 2026: 1,363 results, €10.95 per result', 'September 2026: 579 results, €11.51 per result (still running)'] },
          { kind: 'p', text: 'September runs until the end of the month. These are results as Meta and Google count them, not a count of tickets sold.' },
        ],
      },
      {
        q: 'Where does most of the budget go?',
        a: [
          { kind: 'p', text: 'Here is the current state of play:' },
          { kind: 'h', text: 'Channel split, last 90 days, €62,347 in total' },
          { kind: 'ul', text: ['DV360: €14,620, reach (display and video), 2.3 million impressions', 'Google Ads: €13,524, 2,202 results, €6.14 per result', 'TikTok: €12,445, 1,690 results, €7.36 per result', 'Meta: €11,842, 1,324 results, €8.94 per result', 'YouTube: €5,199, reach (video), 2.1 million impressions', 'Snapchat: €3,399, 235 results, €14.46 per result', 'Pinterest: €1,318, reach (awareness), 506 thousand impressions'] },
          { kind: 'p', text: 'Most of the money goes to DV360. That is a reach channel: you buy impressions, not clicks. Whether it works you see in your brand search: how often people type in "Lumos". That stood at about 10,800 impressions a week on your own name and stayed flat, also in the week DV360 went from 144 thousand to 180 thousand impressions. Why, I cannot tell from the numbers. It may be that those impressions do not land in The Hague and Brussels, where your audience searches. Note: the brand search figures were last measured on 23 June.' },
          { kind: 'p', text: 'Sales come from Google Ads, TikTok and Meta, at €6 to €9 per result.' },
          { kind: 'h', text: 'What I do not do' },
          { kind: 'ul', text: ['Set strategy or move budget', 'Change or pause campaigns', 'Predict what a change will deliver'] },
          { kind: 'p', text: 'For those, your specialist can make a proposal. Shall I ask them to look at the reach channels?' },
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
  const max = Math.max(...RESULTATEN)
  const w = 520, h = 150, pad = 8, gap = 10
  const bw = (w - pad * 2 - gap * (RESULTATEN.length - 1)) / RESULTATEN.length
  return (
    <div className="mt-4 rounded-[10px] border border-[#d6dde8] bg-white px-4 pt-3 pb-2">
      <p className="m-0 text-[12px] font-semibold text-[#1f2933]">{title}</p>
      <p className="m-0 mb-1 text-[11px] text-[#8A94A3]">{note}</p>
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto" role="img" aria-label={title}>
        {RESULTATEN.map((v, i) => {
          const x = pad + i * (bw + gap)
          const bh = Math.max(4, (v / max) * (h - 44))
          const y = h - 24 - bh
          const laatste = i === RESULTATEN.length - 1
          return (
            <g key={i}>
              <rect x={x} y={y} width={bw} height={bh} rx="3" fill={laatste ? '#9cc4ff' : '#3c8eff'} />
              <text x={x + bw / 2} y={y - 6} textAnchor="middle" fontSize="11" fill="#1f2933" fontWeight="600">{v.toLocaleString(locale === 'en' ? 'en-GB' : 'nl-NL')}</text>
              <text x={x + bw / 2} y={h - 8} textAnchor="middle" fontSize="11" fill="#6B7280">{MAANDEN[locale][i]}</text>
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
