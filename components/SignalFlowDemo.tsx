'use client'

import { useEffect, useRef } from 'react'

/**
 * Herbruikbare "signaal tot afgehandeld"-animatie in de Stevin Desk-opmaak.
 * Scenario-gedreven: elk scenario is een aparte mockup (hittegolf, budgetlek,
 * concurrent, vermoeide creative...). Een cursor klikt de knoppen, de keten
 * loopt Signaal -> Voorstel via WhatsApp -> Goedkeuring -> Afgehandeld, en
 * herhaalt. Geheel self-contained (eigen styles), past op een navy of licht vlak.
 */

export interface SignalScenario {
  client: string
  num: string
  title: string
  tags: string[]
  waarom: string
  advies: string
  whatsapp: string
  approvedBy: string
  doneLabel: string
  tiles: { label: string; value: string; tone?: 'accent' | 'pos' | 'plain' }[]
}

export const HITTEGOLF: SignalScenario = {
  client: 'LUMIOS Entertainment',
  num: '01',
  title: '[Scheveningen] KNMI hittegolf wk28, strand wint, tenzij wij contra-acten',
  tags: ['Weer', 'Hittegolf', 'Campagnes'],
  waarom: 'KNMI hittegolf 32-35 graden voor Midden- en Zuid-NL, strand-bezetting Scheveningen verwacht +120%.',
  advies: 'switch creative naar de aircon-vs-beach-set, +6% Meta en 4k TikTok voor een venster van 5 dagen. Verwacht +3.000 tickets.',
  whatsapp: 'Hittegolf van 32-35 graden op komst, het strand wint van het theater. Voorstel: creatives omzetten naar de aircon-set en budget bijsturen voor 5 dagen. Akkoord?',
  approvedBy: 'LUMIOS Entertainment',
  doneLabel: 'Aircon-creatives live, budget bijgestuurd voor 5 dagen',
  tiles: [
    { label: 'Signalen geanalyseerd', value: '24' },
    { label: 'Acties genomen', value: '18', tone: 'accent' },
    { label: 'Afgehandeld', value: '17', tone: 'pos' },
    { label: 'Open taken', value: '1' },
  ],
}

export default function SignalFlowDemo({ scenario = HITTEGOLF }: { scenario?: SignalScenario }) {
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = root.current
    if (!el) return
    const steps = Array.from(el.querySelectorAll<HTMLElement>('.sf-step'))
    const rails = Array.from(el.querySelectorAll<HTMLElement>('.sf-r'))
    const win = el.querySelector<HTMLElement>('.sf-win')!
    const oppBtn = el.querySelector<HTMLElement>('.sf-opp')!
    const jaBtn = el.querySelector<HTMLElement>('.sf-ja')!
    const cursor = el.querySelector<HTMLElement>('.sf-cursor')!
    let timers: ReturnType<typeof setTimeout>[] = []
    let alive = true
    const T = (fn: () => void, ms: number) => { if (alive) timers.push(setTimeout(fn, ms)) }
    const setStep = (n: number) => {
      steps.forEach((s, k) => s.classList.toggle('on', k === n))
      rails.forEach((r, k) => r.classList.toggle('on', k === n))
    }
    const moveTo = (target: HTMLElement, cb: () => void) => {
      const wr = win.getBoundingClientRect(), br = target.getBoundingClientRect()
      cursor.style.opacity = '1'
      cursor.style.transform = `translate(${br.left - wr.left + br.width / 2 - 3}px,${br.top - wr.top + br.height / 2 - 2}px)`
      T(cb, 660)
    }
    const press = (target: HTMLElement, cb: () => void) => {
      cursor.classList.add('click'); target.classList.add('pressed')
      T(() => { cursor.classList.remove('click'); target.classList.remove('pressed'); cb() }, 340)
    }
    const run = () => {
      timers.forEach(clearTimeout); timers = []
      setStep(0); cursor.style.opacity = '0'
      T(() => moveTo(oppBtn, () => press(oppBtn, () => {
        setStep(1); cursor.style.opacity = '0'
        T(() => moveTo(jaBtn, () => press(jaBtn, () => {
          setStep(2); cursor.style.opacity = '0'
          T(() => { setStep(3); T(run, 3000) }, 1900)
        })), 1200)
      })), 1400)
    }
    run()
    return () => { alive = false; timers.forEach(clearTimeout) }
  }, [scenario])

  const toneColor = (tone?: string) => tone === 'accent' ? '#3D8EFF' : tone === 'pos' ? '#1f9d55' : '#0a0a0a'

  return (
    <div className="sf" ref={root}>
      <div className="sf-win">
        <div className="sf-top">
          <svg width="26" height="26" viewBox="0 0 48 48" aria-hidden="true"><g fill="#3D8EFF"><rect x="6" y="7" width="30" height="14" rx="4" /><rect x="12" y="27" width="30" height="14" rx="4" /></g></svg>
          <span><span className="sf-eb">Stevin</span><span className="sf-cl">{scenario.client}</span></span>
          <span className="sf-live"><span className="g" /> Live, 1m geleden</span>
          <span className="sf-av">K</span>
        </div>
        <div className="sf-rail">
          {['Signaal', 'Voorstel', 'Goedkeuring', 'Afgehandeld'].map((r) => <span key={r} className="sf-r">{r}</span>)}
        </div>
        <div className="sf-stage">
          <div className="sf-step">
            <div className="sf-panel">
              <div className="sf-head"><span className="sf-num">{scenario.num}</span><span className="sf-bars"><i className="f" /><i className="f" /><i className="f" /><i className="f" /></span><h3 className="sf-title">{scenario.title}</h3><span className="sf-nu">nu</span></div>
              <div className="sf-tags">{scenario.tags.map((t) => <span key={t}>{t}</span>)}</div>
              <p className="sf-ww"><b>Waarom:</b> {scenario.waarom}</p>
              <p className="sf-ww"><b>Advies:</b> {scenario.advies}</p>
              <div className="sf-acts"><span className="sf-ab sf-opp">Oppakken</span><span className="sf-ab">Meer info</span></div>
            </div>
          </div>
          <div className="sf-step">
            <div className="sf-panel">
              <div className="sf-wahead">WhatsApp naar {scenario.client}</div>
              <div className="sf-wa">{scenario.whatsapp}</div>
              <div className="sf-waact"><span className="sf-sbtn pri sf-ja">Ja, doen</span><span className="sf-sbtn">Later</span></div>
            </div>
          </div>
          <div className="sf-step">
            <div className="sf-panel">
              <div className="sf-chk"><span className="c">&#10003;</span> Goedgekeurd door {scenario.approvedBy}</div>
              <p className="sf-ww" style={{ marginLeft: 0 }}>Eén tik van de klant of het team. Geen maandrapportage afwachten, geen mail heen en weer. Stevin zet het klaar.</p>
            </div>
          </div>
          <div className="sf-step">
            <div className="sf-panel">
              <div className="sf-head"><span className="sf-num">{scenario.num}</span><span className="sf-bars"><i className="f" /><i className="f" /><i className="f" /><i className="f" /></span><h3 className="sf-title">{scenario.title}</h3><span className="sf-nu">nu</span></div>
              <div className="sf-done"><span className="sf-pill">Afgehandeld</span> <span style={{ fontSize: 12, color: '#6b7280' }}>{scenario.doneLabel}</span></div>
              <div className="sf-tiles">{scenario.tiles.map((t) => <div key={t.label} className="sf-tile"><div className="sf-tl">{t.label}</div><div className="sf-tv" style={{ color: toneColor(t.tone) }}>{t.value}</div></div>)}</div>
            </div>
          </div>
        </div>
        <div className="sf-loop">&#8635; continu &middot; 24/7</div>
        <div className="sf-cursor"><svg viewBox="0 0 24 24" width="22" height="22"><path d="M5 3l13.5 6.7-5.7 1.4L9.4 17.5z" fill="#0A1628" stroke="#fff" strokeWidth="1.3" strokeLinejoin="round" /></svg></div>
      </div>
      <style jsx>{`
        .sf{font-family:'Inter',system-ui,sans-serif;max-width:560px;margin:0 auto}
        .sf-win{position:relative;background:#f7f8fa;border:1px solid #d6dde8;border-radius:16px;overflow:hidden;box-shadow:0 30px 70px rgba(0,0,0,.35)}
        .sf-top{display:flex;align-items:center;gap:10px;padding:11px 16px;background:#fff;border-bottom:1px solid #d6dde8}
        .sf-eb{font-size:9px;color:#8190a3;letter-spacing:.08em;text-transform:uppercase;line-height:1.2;display:block;font-weight:700}
        .sf-cl{font-size:12.5px;color:#0A1628;font-weight:600}
        .sf-live{margin-left:auto;display:flex;align-items:center;gap:6px;font-size:11px;color:#6b7280;border:1px solid #d6dde8;border-radius:999px;padding:3px 9px}
        .sf-live .g{width:7px;height:7px;border-radius:50%;background:#1f9d55}
        .sf-av{width:24px;height:24px;border-radius:50%;background:#0A1628;color:#fff;font-size:11px;display:flex;align-items:center;justify-content:center;font-weight:600}
        .sf-rail{display:flex;gap:7px;padding:13px 16px 0}
        .sf-r{font-size:11.5px;color:#6b7280;padding:4px 11px;border-radius:999px;transition:all .3s;font-weight:500}
        .sf-r.on{background:#0A1628;color:#fff}
        .sf-stage{position:relative;min-height:252px;padding:13px 16px 14px}
        .sf-step{position:absolute;left:16px;right:16px;top:13px;opacity:0;transform:translateY(6px);transition:opacity .45s,transform .45s;pointer-events:none}
        .sf-step.on{opacity:1;transform:none}
        .sf-panel{background:#fff;border:1px solid #d6dde8;border-radius:14px;padding:15px 17px}
        .sf-head{display:flex;align-items:flex-start;gap:9px}
        .sf-num{font-size:11px;color:#8190a3;font-weight:600;padding-top:3px}
        .sf-bars{display:flex;gap:2px;align-items:flex-end;padding-top:4px}
        .sf-bars i{width:3px;display:block;background:#d6dde8;border-radius:1px}
        .sf-bars i.f{background:#0A1628}
        .sf-bars i:nth-child(1){height:6px}.sf-bars i:nth-child(2){height:9px}.sf-bars i:nth-child(3){height:12px}.sf-bars i:nth-child(4){height:15px}
        .sf-title{font-size:13.5px;font-weight:600;color:#0A1628;line-height:1.4;margin:0}
        .sf-nu{margin-left:auto;font-size:11px;color:#8190a3;padding-top:2px}
        .sf-tags{display:flex;gap:7px;flex-wrap:wrap;margin:6px 0 0 27px;font-size:11px;color:#8190a3}
        .sf-tags span:not(:first-child)::before{content:"·";margin-right:7px;color:#b9c2d0}
        .sf-ww{margin:8px 0 0 27px;font-size:12px;color:#6b7280;line-height:1.5}
        .sf-ww b{color:#0A1628;font-weight:600}
        .sf-acts{display:flex;gap:14px;align-items:center;margin:12px 0 0 27px}
        .sf-ab{font-size:12px;color:#6b7280}
        .sf-ab.sf-opp{font-weight:600;color:#fff;background:#0A1628;border-radius:999px;padding:6px 16px;transition:transform .2s}
        .sf-ab.sf-opp.pressed{transform:scale(.93);filter:brightness(.88)}
        .sf-wahead{display:flex;align-items:center;gap:6px;font-size:11px;color:#6b7280;margin-bottom:9px}
        .sf-wa{background:#e7f7e1;border:1px solid #cfead9;border-radius:12px 12px 12px 3px;padding:10px 12px;font-size:12.5px;color:#1f3d2a;line-height:1.5;max-width:90%}
        .sf-waact{display:flex;gap:8px;margin-top:11px}
        .sf-sbtn{font-size:12.5px;font-weight:600;padding:6px 15px;border-radius:999px;border:1px solid #d6dde8;background:#fff;color:#0A1628}
        .sf-sbtn.pri{background:#3D8EFF;border-color:#3D8EFF;color:#fff;transition:transform .2s}
        .sf-sbtn.pri.pressed{transform:scale(.93);filter:brightness(.9)}
        .sf-chk{display:flex;align-items:center;gap:10px;font-size:13.5px;color:#0A1628;font-weight:600}
        .sf-chk .c{width:24px;height:24px;border-radius:50%;background:#1f9d55;color:#fff;display:flex;align-items:center;justify-content:center;font-size:14px}
        .sf-done{display:flex;align-items:center;gap:9px;margin:4px 0 0 27px}
        .sf-pill{font-size:11px;font-weight:600;padding:2px 9px;border-radius:999px;background:rgba(31,157,85,.1);color:#1f9d55;border:1px solid rgba(31,157,85,.5)}
        .sf-tiles{display:grid;grid-template-columns:1fr 1fr;gap:9px;margin-top:13px}
        .sf-tile{border:1px solid #d6dde8;border-radius:12px;padding:9px 11px}
        .sf-tl{font-size:9px;letter-spacing:.05em;text-transform:uppercase;color:#8190a3;line-height:1.25;font-weight:600}
        .sf-tv{font-size:19px;font-weight:800;margin-top:3px}
        .sf-loop{display:flex;align-items:center;justify-content:center;gap:6px;padding:2px 0 14px;color:#8190a3;font-size:12px}
        .sf-cursor{position:absolute;left:0;top:0;width:22px;height:22px;z-index:6;pointer-events:none;opacity:0;transition:transform .6s cubic-bezier(.45,.05,.2,1),opacity .25s;filter:drop-shadow(0 2px 5px rgba(0,0,0,.3))}
        .sf-cursor :global(svg){display:block;transition:transform .12s}
        .sf-cursor.click :global(svg){transform:scale(.78)}
        @media(min-width:640px){.sf-tiles{grid-template-columns:repeat(4,1fr)}}
      `}</style>
    </div>
  )
}
