'use client'

/**
 * Marketinggeheugen-demo: typ "zomer" en het brein laat zien wat het weet.
 * Vier stappen (zoeken, seizoen, oude campagne, naar briefing), auto-playend
 * zodra de sectie in beeld is; klikken op een stap springt ernaartoe.
 *
 * Verzonnen demo-data, niets hierin is klantdata. Sinds W-524 (9 okt 2026)
 * een installatiebedrijf; de Desk-demo-omgeving (LUMIOS) is nog het circus. Canon: wit frame, navy minimap, een blauw accent;
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
  // W-524, 9 okt 2026: de site gebruikt hier een verzonnen installatiebedrijf
  // in plaats van het circus uit de Desk-demo (LUMIOS). Koen: het circus past
  // niet bij de servicebedrijven die we zoeken. Zelfde inzicht (hitte is een
  // koopmoment, de korte advertentie werkte), geen jargon. De Desk-demo gaat
  // later mee; tot die tijd lopen site en Desk hier uiteen.
  nl: {
    word: 'zomer',
    steps: [
      { t: 'Typ waar je mee zit', d: 'Bijvoorbeeld: zomer. Je ziet meteen wat er over die periode bekend is.' },
      { t: 'Zelfde moment, andere jaren', d: 'Wat werkte vorig jaar, en wat de concurrent deed.' },
      { t: 'Open een oude campagne', d: 'Waarom hij liep, wat hij kostte, wat hij opleverde.' },
      { t: 'Neem het mee naar volgend jaar', d: 'Een klik, en je volgende campagne begint niet bij nul.' },
    ],
    chips: ['Zomer 2026', 'Zomer 2025', 'Hittegolf juli 2026', 'Voorjaar 2026', 'Winter 2025'],
    camps: [
      { t: 'Airco zomer 2026', m: '2026, Google Ads', d: 'Liep de hele zomer door. Na elke warme dag kwamen er de dag erna twee keer zoveel aanvragen.' },
      { t: 'Hittegolf juli', m: '2026, Google Ads en Meta', d: 'Korte advertentie: "Te warm binnen? Morgen een airco." Binnen een dag vol ingepland.', hl: true },
      { t: 'Warmtepomp voorjaar', m: '2026, Meta', d: 'Liep in april. Veel kliks, weinig aanvragen. Mensen wachtten op de nieuwe subsidie van de gemeente, die pas in september kwam.' },
      { t: 'Installateur uit de regio', m: 'concurrent, 2026', d: 'Twee zomeradvertenties van de concurrent gezien, vanaf half juni.' },
    ],
    detail: {
      t: 'Hittegolf juli', m: 'Google Ads en Meta, 8 t/m 26 juli 2026',
      whyLabel: 'Waarom:', why: 'als het warm wordt, wil iedereen tegelijk een airco.',
      learnedLabel: 'Geleerd:', learned: 'hitte is hier een koopmoment, geen dip. De korte advertentie werkte, de lange niet. En zet hem klaar voordat het warm wordt.',
      res: 'Drukste week van het jaar', btn: 'Neem mee naar zomer 2027',
    },
    toast: 'Toegevoegd aan het plan voor zomer 2027',
    briefLabel: 'Plan, concept.',
    brief: 'Begin met "Hittegolf juli": zelfde inzicht (hitte is een koopmoment), korte advertentie, klaar voor de eerste warme week. De concurrent begint rond half juni. Warmtepomp pas als de subsidie van de gemeente open is, die komt bovenop de landelijke.',
    briefClose: 'Zo begint je volgende campagne niet bij nul, wie er ook aan werkt.',
    demoTag: 'demo-omgeving',
  },
  en: {
    word: 'summer',
    steps: [
      { t: 'Type what is on your mind', d: 'For example: summer. You see right away what is known about that period.' },
      { t: 'Same moment, other years', d: 'What worked last year, and what the competitor did.' },
      { t: 'Open an old campaign', d: 'Why it ran, what it cost, what it delivered.' },
      { t: 'Take it to next year', d: 'One click, and your next campaign does not start from zero.' },
    ],
    chips: ['Summer 2026', 'Summer 2025', 'Heatwave July 2026', 'Spring 2026', 'Winter 2025'],
    camps: [
      { t: 'Air conditioning summer 2026', m: '2026, Google Ads', d: 'Ran all summer. After every hot day, twice as many enquiries came in the next day.' },
      { t: 'Heatwave July', m: '2026, Google Ads and Meta', d: 'Short ad: "Too hot inside? Air conditioning tomorrow." Fully booked within a day.', hl: true },
      { t: 'Heat pump spring', m: '2026, Meta', d: 'Ran in April. Lots of clicks, few enquiries. People were waiting for the new subsidy from the municipality, which only came in September.' },
      { t: 'Local installer', m: 'competitor, 2026', d: 'Two summer ads from the competitor spotted, from mid June.' },
    ],
    detail: {
      t: 'Heatwave July', m: 'Google Ads and Meta, 8 to 26 July 2026',
      whyLabel: 'Why:', why: 'when it gets hot, everyone wants air conditioning at the same time.',
      learnedLabel: 'Learned:', learned: 'heat is a buying moment here, not a dip. The short ad worked, the long one did not. And have it ready before it gets hot.',
      res: 'Busiest week of the year', btn: 'Take to summer 2027',
    },
    toast: 'Added to the plan for summer 2027',
    briefLabel: 'Plan, draft.',
    brief: 'Start from "Heatwave July": same insight (heat is a buying moment), short ad, ready for the first hot week. The competitor starts around mid June. Heat pumps only once the municipal subsidy is open, on top of the national one.',
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
      {/* Op mobiel weg (W-524): het venster speelt vanzelf af, en de stappen
          kostten een heel scherm scrollen. */}
      <div className="hidden lg:block pl-6 max-w-[430px]">
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
