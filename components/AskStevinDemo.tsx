'use client'

import { useEffect, useRef, useState } from 'react'
import { Bot, User } from 'lucide-react'

// W-078, 13 sep 2026. Koen: "het zou ook wel mooi zijn om een app.stevin.ai
// voorbeeld te hebben, en dan vooral de ask stevin". Dit is de klantportal
// (app.stevin.ai/dashboard/chat, "Vraag Stevin") als gescripte demo: de drie
// voorbeeldvragen die daar echt staan, met antwoorden op de echte cijfers van
// LUMIOS, onze demo-omgeving (campaign_metrics via client_campaigns, opgehaald
// 13 sep 2026). Geen endpoint, geen AI-call: de antwoorden staan hier vast.
// Daarom kun je in de demo ook alleen deze drie vragen stellen, en dat staat
// erbij. De grens van de echte Vraag Stevin (rapporteert, adviseert niet,
// verandert niets) is de grens van de antwoorden hieronder.

type Locale = 'nl' | 'en'
type QA = { q: string; a: string[] }

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
  qa: QA[]
}> = {
  nl: {
    eyebrow: 'Jouw eigen scherm',
    h2: 'Vraag het gewoon. Op je eigen cijfers.',
    sub: 'Dit is de klantportal. Geen rapport dat je moet lezen, maar een vraag die je stelt. Het antwoord komt uit jouw campagnes, met de meting erbij, en het verandert niets. Klik een vraag.',
    title: 'Vraag Stevin',
    aiNotice: 'Je praat hier met AI, niet met je consultant. Stel je vraag over je campagnes in gewone taal.',
    greeting: 'Hallo Lumios!',
    intro: 'Ik ben de AI-assistent van Stevin. Ik help je de resultaten te begrijpen.',
    demoOnly: 'In deze demo kun je alleen deze drie vragen stellen.',
    reset: 'Opnieuw',
    bron: 'Uit de klantportal op app.stevin.ai. LUMIOS is onze demo-omgeving, geen klantdata. De antwoorden staan vast op de cijfers van 13 september.',
    qa: [
      {
        q: 'Hoe gaat het met mijn campagnes?',
        a: [
          'Er draaien 15 campagnes op zeven kanalen. Augustus, de laatste volledige maand: 4,6 miljoen vertoningen, 89.498 klikken en **1.363 conversies voor €14.924**, dat is €10,95 per conversie. Tegenover juli: spend 4 procent lager, conversies vrijwel gelijk (1.373 naar 1.363).',
          'Een ding wil ik eerst noemen voordat je kanalen vergelijkt: **Pinterest heeft in 90 dagen €1.318 besteed en 0 geregistreerde conversies.** Dat is eerder een meetprobleem dan een prestatie. Laatste dag met gemeten data: gisteren.',
        ],
      },
      {
        q: 'Wat zijn mijn resultaten deze maand?',
        a: [
          'September loopt nog, gemeten tot en met gisteren: 1,98 miljoen vertoningen, 40.289 klikken, **579 conversies voor €6.663** (€11,51 per conversie).',
          'Dezelfde dertien dagen in augustus: 525 conversies voor €5.904. Je zit dus **10 procent hoger in conversies bij 13 procent meer spend.** De kosten per conversie liepen daarmee licht op, van €11,25 naar €11,51.',
        ],
      },
      {
        q: 'Waar gaat het meeste budget naartoe?',
        a: [
          'Laatste 90 dagen, €62.347 in totaal:',
          '- **DV360**: €14.620, 120 conversies (€122 per conversie)\n- **Google Ads**: €13.524, 2.202 conversies (€6)\n- **TikTok**: €12.445, 1.690 conversies (€7)\n- **Meta**: €11.842, 1.324 conversies (€9)\n- **YouTube**: €5.199, 218 conversies (€24)\n- **Snapchat**: €3.399, 235 conversies (€14)\n- **Pinterest**: €1.318, 0 conversies',
          'Het grootste budget zit op DV360, met de hoogste kosten per conversie. Wijkt een kanaal zo sterk af, dan is de meting de eerste verdachte, niet het kanaal. Wat je ermee doet, bespreek je met je consultant. Ik verander niets in je campagnes.',
        ],
      },
    ],
  },
  en: {
    eyebrow: 'Your own screen',
    h2: 'Just ask. On your own numbers.',
    sub: 'This is the client portal. Not a report you have to read, but a question you ask. The answer comes from your campaigns, measurement included, and it changes nothing. Click a question.',
    title: 'Ask Stevin',
    aiNotice: 'You are talking to AI here, not to your consultant. Ask about your campaigns in plain language.',
    greeting: 'Hello Lumios!',
    intro: 'I am the AI assistant of Stevin. I help you understand the results.',
    demoOnly: 'In this demo you can only ask these three questions.',
    reset: 'Start over',
    bron: 'From the client portal at app.stevin.ai. LUMIOS is our demo environment, not client data. The answers are fixed on the numbers of 13 September.',
    qa: [
      {
        q: 'How are my campaigns doing?',
        a: [
          '15 campaigns are running across seven channels. August, the last full month: 4.6 million impressions, 89,498 clicks and **1,363 conversions for €14,924**, that is €10.95 per conversion. Against July: spend 4 percent lower, conversions almost equal (1,373 to 1,363).',
          'One thing first, before you compare channels: **Pinterest spent €1,318 in 90 days with 0 recorded conversions.** That is more likely a measurement problem than a performance. Last day with measured data: yesterday.',
        ],
      },
      {
        q: 'What are my results this month?',
        a: [
          'September is still running, measured through yesterday: 1.98 million impressions, 40,289 clicks, **579 conversions for €6,663** (€11.51 per conversion).',
          'The same thirteen days in August: 525 conversions for €5,904. So you are **10 percent up in conversions on 13 percent more spend.** Cost per conversion edged up with that, from €11.25 to €11.51.',
        ],
      },
      {
        q: 'Where does most of the budget go?',
        a: [
          'Last 90 days, €62,347 in total:',
          '- **DV360**: €14,620, 120 conversions (€122 per conversion)\n- **Google Ads**: €13,524, 2,202 conversions (€6)\n- **TikTok**: €12,445, 1,690 conversions (€7)\n- **Meta**: €11,842, 1,324 conversions (€9)\n- **YouTube**: €5,199, 218 conversions (€24)\n- **Snapchat**: €3,399, 235 conversions (€14)\n- **Pinterest**: €1,318, 0 conversions',
          'The largest budget sits on DV360, with the highest cost per conversion. When a channel deviates this much, measurement is the first suspect, not the channel. What you do with it, you discuss with your consultant. I change nothing in your campaigns.',
        ],
      },
    ],
  },
}

type Msg = { role: 'user' | 'assistant'; text: string[] }

// Vet en lijstjes zonder markdown-library: de site heeft er geen, en de
// antwoorden staan hier toch vast.
function Rich({ text }: { text: string }) {
  const lines = text.split('\n')
  const isList = lines.every((l) => l.startsWith('- '))
  const render = (s: string) =>
    s.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
      part.startsWith('**') ? <strong key={i} className="font-semibold text-[#1f2933]">{part.slice(2, -2)}</strong> : <span key={i}>{part}</span>,
    )
  if (isList) {
    return (
      <ul className="list-disc ml-4 space-y-1">
        {lines.map((l, i) => <li key={i}>{render(l.slice(2))}</li>)}
      </ul>
    )
  }
  return <p className="m-0">{render(text)}</p>
}

export default function AskStevinDemo({ locale, withHeader = true }: { locale: string; withHeader?: boolean }) {
  const c = COPY[locale === 'en' ? 'en' : 'nl']
  const [messages, setMessages] = useState<Msg[]>([])
  const [typing, setTyping] = useState(false)
  const asked = messages.filter((m) => m.role === 'user').map((m) => m.text[0])
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages, typing])

  const ask = (qa: QA) => {
    if (typing || asked.includes(qa.q)) return
    setMessages((m) => [...m, { role: 'user', text: [qa.q] }])
    setTyping(true)
    setTimeout(() => {
      setMessages((m) => [...m, { role: 'assistant', text: qa.a }])
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
      <div ref={scrollRef} className="h-[380px] overflow-y-auto bg-[#f7f8fa] px-4 py-5 sm:px-6 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center py-10">
            <Bot className="w-10 h-10 text-[#8A94A3] mx-auto mb-3" aria-hidden="true" />
            <p className="m-0 font-display font-semibold text-[#1f2933]">{c.greeting}</p>
            <p className="m-0 mt-1 text-[14px] text-[#6B7280] max-w-sm mx-auto">{c.intro}</p>
          </div>
        ) : (
          messages.map((msg, i) => (
            <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-[#3c8eff]/10 text-[#3c8eff]' : 'bg-white border border-[#d6dde8] text-[#6B7280]'}`}>
                {msg.role === 'user' ? <User className="w-4 h-4" aria-hidden="true" /> : <Bot className="w-4 h-4" aria-hidden="true" />}
              </div>
              <div className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-[14px] leading-[1.55] space-y-2 ${msg.role === 'user' ? 'bg-[#3c8eff] text-white rounded-br-md' : 'bg-white border border-[#d6dde8] text-[#374151] rounded-bl-md'}`}>
                {msg.text.map((t, j) => <Rich key={j} text={t} />)}
              </div>
            </div>
          ))
        )}
        {typing && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white border border-[#d6dde8] text-[#6B7280]"><Bot className="w-4 h-4" aria-hidden="true" /></div>
            <div className="px-4 py-3 rounded-2xl rounded-bl-md bg-white border border-[#d6dde8] flex gap-1 items-center" aria-label="…">
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
