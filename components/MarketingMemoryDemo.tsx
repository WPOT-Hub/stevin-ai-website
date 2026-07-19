'use client'

/**
 * Marketinggeheugen-demo: typ "zomer" en het brein laat zien wat het weet.
 * Vier stappen (zoeken, seizoen, oude campagne, naar briefing), auto-playend
 * zodra de sectie in beeld is; klikken op een stap springt ernaartoe.
 *
 * Zelfde demo-data als de Desk-demo-omgeving (LUMIOS, gefictionaliseerd):
 * niets hierin is klantdata. Canon: wit frame, navy minimap, een blauw accent;
 * alleen in de brein-graaf mogen nodes typekleuren hebben (uitzondering 9 jul).
 */

import { useCallback, useEffect, useRef, useState } from 'react'

type Locale = 'nl' | 'en'

const COPY: Record<Locale, {
  word: string
  steps: { t: string; d: string }[]
  chips: string[]
  camps: { t: string; m: string; d: string; hl?: boolean }[]
  detail: { t: string; m: string; why: string; whyLabel: string; learned: string; learnedLabel: string; res: string; btn: string }
  toast: string
  briefLabel: string
  brief: string
  briefClose: string
  demoTag: string
}> = {
  nl: {
    word: 'zomer',
    steps: [
      { t: 'Typ waar je mee zit', d: 'Bijvoorbeeld: zomer. Het brein licht op wat het weet.' },
      { t: 'Zelfde moment, andere jaren', d: 'Wat werkte vorig jaar, en wat de concurrent deed.' },
      { t: 'Open een oude campagne', d: 'Waarom hij liep, wat hij kostte, wat hij opleverde.' },
      { t: 'Stuur door naar je briefing', d: 'Een klik, en je volgende campagne begint niet bij nul.' },
    ],
    chips: ['Zomerseizoen 5', 'Koningsdag 44', 'Meivakantie 44', 'Pasen 33', 'Black Friday 6'],
    camps: [
      { t: 'Zomer maintain Q3', m: '2025, google ads en meta', d: 'Doorlopen in de vakantieweken; urgentie alleen op warme doelgroepen.' },
      { t: 'The Wonder Machine', m: '2026, meta', d: 'Acrobatiek, muziek en pure verwondering. Deze zomer onder de big top.', hl: true },
      { t: 'Ontsnap aan de hitte', m: '2026, meta', d: 'Warm buiten, magisch binnen. Stap de gekoelde big top in.' },
      { t: 'NOVA Nights', m: 'concurrent, 2025', d: 'Twee zomeradvertenties van de concurrent gezien in 2025.' },
    ],
    detail: {
      t: 'Ontsnap aan de hitte', m: 'meta, 16 apr t/m 16 mei',
      whyLabel: 'Waarom:', why: 'warm buiten, magisch binnen. Stap de gekoelde big top in.',
      learnedLabel: 'Geleerd:', learned: 'hitte is hier een koopmoment, geen dip. De 30 seconden-versie werkte niet, de korte wel.',
      res: 'Beste zomerweek ooit gemeten', btn: 'Stuur naar briefing',
    },
    toast: 'Toegevoegd aan briefing "Zomer 2027"',
    briefLabel: 'Briefing, concept.',
    brief: 'Bouw voort op "Ontsnap aan de hitte": zelfde inzicht (hitte = koopmoment), nieuwe creatie, korte versies eerst. Concurrent NOVA Nights start rond week 25.',
    briefClose: 'Zo begint je volgende campagne niet bij nul, wie er ook aan werkt.',
    demoTag: 'demo-omgeving',
  },
  en: {
    word: 'summer',
    steps: [
      { t: 'Type what is on your mind', d: 'For example: summer. The brain lights up what it knows.' },
      { t: 'Same moment, other years', d: 'What worked last year, and what the competitor did.' },
      { t: 'Open an old campaign', d: 'Why it ran, what it cost, what it delivered.' },
      { t: 'Send it to your briefing', d: 'One click, and your next campaign does not start from zero.' },
    ],
    chips: ['Summer season 5', 'Kings Day 44', 'May holidays 44', 'Easter 33', 'Black Friday 6'],
    camps: [
      { t: 'Summer maintain Q3', m: '2025, google ads and meta', d: 'Kept running through the holiday weeks; urgency only on warm audiences.' },
      { t: 'The Wonder Machine', m: '2026, meta', d: 'Acrobatics, music and pure wonder. This summer under the big top.', hl: true },
      { t: 'Escape the heat', m: '2026, meta', d: 'Hot outside, magical inside. Step into the cooled big top.' },
      { t: 'NOVA Nights', m: 'competitor, 2025', d: 'Two summer ads from the competitor spotted in 2025.' },
    ],
    detail: {
      t: 'Escape the heat', m: 'meta, apr 16 to may 16',
      whyLabel: 'Why:', why: 'hot outside, magical inside. Step into the cooled big top.',
      learnedLabel: 'Learned:', learned: 'heat is a buying moment here, not a dip. The 30 second cut did not work, the short one did.',
      res: 'Best summer week ever measured', btn: 'Send to briefing',
    },
    toast: 'Added to briefing "Summer 2027"',
    briefLabel: 'Briefing, draft.',
    brief: 'Build on "Escape the heat": same insight (heat = buying moment), new creative, short cuts first. Competitor NOVA Nights starts around week 25.',
    briefClose: 'That is how your next campaign never starts from zero, whoever works on it.',
    demoTag: 'demo environment',
  },
}

const NODES: { x: number; y: number; c?: string; hl?: boolean }[] = [
  { x: 12, y: 30 }, { x: 22, y: 60, c: '#e0a94a' }, { x: 30, y: 22 },
  { x: 38, y: 48, c: '#3fd0c9', hl: true }, { x: 52, y: 36, c: '#5fd39a', hl: true },
  { x: 60, y: 64, c: '#e0a94a' }, { x: 68, y: 26, hl: true },
  { x: 76, y: 52, c: '#5fd39a' }, { x: 84, y: 38, c: '#3fd0c9' }, { x: 46, y: 70 },
]

export default function MarketingMemoryDemo({ locale }: { locale: string }) {
  const c = COPY[locale === 'en' ? 'en' : 'nl']
  const [stage, setStage] = useState(0)
  const [typed, setTyped] = useState('')
  const rootRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const typeRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const stageRef = useRef(0)

  const typeWord = useCallback(() => {
    if (typeRef.current) clearInterval(typeRef.current)
    setTyped('')
    let i = 0
    typeRef.current = setInterval(() => {
      i += 1
      setTyped(c.word.slice(0, i))
      if (i >= c.word.length && typeRef.current) clearInterval(typeRef.current)
    }, 200)
  }, [c.word])

  const show = useCallback((s: number) => {
    stageRef.current = s
    setStage(s)
    if (s === 0) typeWord()
  }, [typeWord])

  const startAuto = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => show((stageRef.current + 1) % 4), 4200)
  }, [show])

  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    typeWord()
    if (reduced) return
    const io = new IntersectionObserver((es) => {
      if (es[0].isIntersecting) {
        startAuto()
      } else if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }, { threshold: 0.25 })
    io.observe(el)
    return () => {
      io.disconnect()
      if (timerRef.current) clearInterval(timerRef.current)
      if (typeRef.current) clearInterval(typeRef.current)
    }
  }, [startAuto, typeWord])

  const pick = (s: number) => {
    show(s)
    startAuto()
  }

  return (
    <div ref={rootRef} className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-11 items-center">
      {/* Stappen */}
      <div className="pl-6 max-w-[430px]">
        {c.steps.map((s, i) => (
          <button
            key={s.t}
            type="button"
            onClick={() => pick(i)}
            className="relative block w-full text-left rounded-[22px] px-6 py-3.5 my-3 transition-colors"
            style={{ background: stage === i ? 'var(--color-primary)' : 'var(--color-surface)' }}
            aria-current={stage === i}
          >
            <span
              className="absolute -left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full font-display font-extrabold text-[15px] grid place-items-center"
              style={{ background: '#E9F1FF', color: 'var(--color-primary)', boxShadow: '0 6px 18px rgba(10,22,40,.10)' }}
              aria-hidden="true"
            >
              {i + 1}
            </span>
            <span className="block font-display font-bold text-[16px]" style={{ color: stage === i ? '#fff' : 'var(--color-primary)' }}>
              {s.t}
            </span>
            <span className="block text-[13.5px] mt-0.5" style={{ color: stage === i ? 'rgba(255,255,255,.6)' : 'var(--color-muted)' }}>
              {s.d}
            </span>
          </button>
        ))}
      </div>

      {/* Frame */}
      <div className="bg-white rounded-[22px] overflow-hidden border border-border" style={{ boxShadow: '0 26px 70px rgba(10,22,40,.12)' }}>
        <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
          {[0, 1, 2].map((i) => (
            <i key={i} className="w-[9px] h-[9px] rounded-full inline-block" style={{ background: 'var(--color-border)' }} />
          ))}
          <span className="ml-2 font-mono text-[11px] text-muted">desk.stevin.ai/brain</span>
          <span className="ml-auto text-[10.5px] font-bold uppercase tracking-[0.08em] text-muted rounded-full px-2.5 py-1" style={{ background: 'var(--color-surface)' }}>
            {c.demoTag}
          </span>
        </div>

        <div className="p-6" style={{ minHeight: '330px' }}>
          {stage === 0 && (
            <div>
              <div className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-[15px] mb-4 border-2" style={{ borderColor: 'var(--color-accent)' }}>
                <span>{typed}</span>
                <span className="inline-block w-0.5 h-[18px] align-middle animate-pulse" style={{ background: 'var(--color-primary)' }} />
              </div>
              <div className="relative rounded-[14px] overflow-hidden" style={{ height: '220px', background: 'radial-gradient(ellipse at 60% 40%, #0d1f35, #0A1628)' }}>
                {NODES.map((n, i) => (
                  <span
                    key={i}
                    className="absolute w-2 h-2 rounded-full"
                    style={{
                      left: `${n.x}%`, top: `${n.y}%`,
                      background: n.c ?? '#5DA3FF',
                      opacity: n.hl ? 1 : 0.4,
                      boxShadow: n.hl ? '0 0 0 6px rgba(93,163,255,.25), 0 0 18px rgba(93,163,255,.8)' : undefined,
                    }}
                  />
                ))}
                <span className="absolute font-mono text-[10.5px] rounded-md px-2 py-0.5" style={{ left: '40%', top: '52%', color: '#dfeeff', background: 'rgba(8,16,30,.75)' }}>
                  {c.camps[2].t}
                </span>
                <span className="absolute font-mono text-[10.5px] rounded-md px-2 py-0.5" style={{ left: '58%', top: '18%', color: '#dfeeff', background: 'rgba(8,16,30,.75)' }}>
                  {c.camps[0].t}
                </span>
              </div>
            </div>
          )}

          {stage === 1 && (
            <div>
              <div className="flex gap-2 flex-wrap mb-3.5">
                {c.chips.map((chip, i) => (
                  <span
                    key={chip}
                    className="text-[12.5px] font-semibold rounded-full px-3 py-1.5 border"
                    style={i === 0
                      ? { background: 'var(--color-primary)', color: '#fff', borderColor: 'var(--color-primary)' }
                      : { borderColor: 'var(--color-border)', color: 'var(--color-muted)' }}
                  >
                    {chip}
                  </span>
                ))}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {c.camps.map((camp) => (
                  <div
                    key={camp.t}
                    className="rounded-[14px] border px-4 py-3.5"
                    style={camp.hl
                      ? { borderColor: 'var(--color-accent)', boxShadow: '0 8px 24px rgba(61,142,255,.15)' }
                      : { borderColor: 'var(--color-border)' }}
                  >
                    <p className="font-display font-bold text-[14.5px] m-0" style={{ color: 'var(--color-primary)' }}>{camp.t}</p>
                    <p className="font-mono text-[10.5px] text-muted m-0" style={{ margin: '3px 0 6px' }}>{camp.m}</p>
                    <p className="text-[13px] leading-[1.5] text-muted m-0">{camp.d}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {stage === 2 && (
            <div>
              <p className="font-display font-extrabold text-[18px] m-0" style={{ color: 'var(--color-primary)' }}>{c.detail.t}</p>
              <p className="font-mono text-[11px] text-muted" style={{ margin: '4px 0 12px' }}>{c.detail.m}</p>
              <p className="text-[14px] text-muted my-2">
                <strong style={{ color: 'var(--color-primary)' }}>{c.detail.whyLabel}</strong> {c.detail.why}
              </p>
              <p className="text-[14px] text-muted my-2">
                <strong style={{ color: 'var(--color-primary)' }}>{c.detail.learnedLabel}</strong> {c.detail.learned}
              </p>
              <p className="inline-block rounded-[10px] px-3.5 py-2 font-display font-bold text-[14px] mt-2.5 mb-0" style={{ background: 'rgba(93,163,255,0.14)', color: 'var(--color-primary)' }}>
                {c.detail.res}
              </p>
              <div className="mt-4">
                <span className="inline-flex items-center bg-accent text-white font-display font-bold text-[13.5px] px-4 py-2 rounded-full">
                  {c.detail.btn}
                </span>
              </div>
            </div>
          )}

          {stage === 3 && (
            <div>
              <p className="inline-flex items-center gap-2.5 rounded-xl px-4 py-3 text-[14.5px] font-semibold text-white m-0" style={{ background: 'var(--color-primary)' }}>
                <span className="w-[22px] h-[22px] rounded-full grid place-items-center text-[12px]" style={{ background: 'var(--color-accent)' }}>✓</span>
                {c.toast}
              </p>
              <p className="mt-3.5 rounded-[14px] px-4 py-3.5 text-[13.5px] text-muted border border-dashed border-border m-0">
                <strong style={{ color: 'var(--color-primary)' }}>{c.briefLabel}</strong> {c.brief}
              </p>
              <p className="mt-3.5 rounded-[14px] px-4 py-3.5 text-[13.5px] text-muted border border-border m-0" style={{ background: 'var(--color-surface)' }}>
                {c.briefClose}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
