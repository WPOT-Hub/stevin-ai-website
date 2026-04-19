import type { Metadata } from 'next'
import Link from 'next/link'
import MeetlatRuler from '@/components/MeetlatRuler'

export const metadata: Metadata = {
  title: 'Werkwijze — Stevin',
  description: 'De vier fases van ruwe platform-data naar herleidbaar resultaat. Geen black boxes, geen magie.',
}

const phases = [
  {
    number: '01',
    title: 'Koppelen',
    body: <>We verbinden je volledige digitale ecosysteem met <strong className="text-primary font-semibold">220+ native integraties</strong>. Ruwe data realtime beschikbaar in één overzicht.</>,
    claim: 'Geen middleware, geen vertraging.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" className="w-5 h-5">
        <path d="M6.3 20.3a2.4 2.4 0 0 0 3.4 0L12 18l-6-6-2.3 2.3a2.4 2.4 0 0 0 0 3.4Z"/>
        <path d="m2 22 3-3"/><path d="M7.5 13.5 10 11"/><path d="M10.5 16.5 13 14"/>
        <path d="m18 3-4 4h6l-4 4"/>
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Vergelijken',
    body: <><strong className="text-primary font-semibold">Platform-cijfers</strong> naast de werkelijkheid in je CRM. Waar Meta of Google afwijkt, wordt dat meetbaar.</>,
    claim: 'Niet vermoed, wel bewezen.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" className="w-5 h-5">
        <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
        <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
        <path d="M7 21h10"/><path d="M12 3v18"/>
        <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/>
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Activeren',
    body: <>Concrete acties in plaats van passieve grafieken. Stevin vertelt <strong className="text-primary font-semibold">per euro</strong> waar je morgen moet sturen.</>,
    claim: 'Adviezen, geen dashboards.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" className="w-5 h-5">
        <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
      </svg>
    ),
  },
  {
    number: '04',
    title: 'Verbeteren',
    body: <>Het platform leert van <strong className="text-primary font-semibold">elke interactie</strong>. Rapportages, alerts en content passen zich aan op jouw werkwijze.</>,
    claim: 'Feedback loop als fundament.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" className="w-5 h-5">
        <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
        <path d="M21 3v5h-5"/>
        <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
        <path d="M3 21v-5h5"/>
      </svg>
    ),
  },
]

const phaseLabels = ['01 / KOPPELEN', '02 / VERGELIJKEN', '03 / ACTIVEREN', '04 / VERBETEREN']

export default function WerkwijzePage() {
  return (
    <>
      {/* ── Hero — navy ── */}
      <section className="bg-primary overflow-hidden -mt-[72px]" style={{ paddingTop: 'calc(96px + 72px)', paddingBottom: '128px' }}>
        <div className="mx-auto max-w-[1200px] px-6">

          {/* 2-col grid: left = eyebrow + H1 + sub | right = side-quote */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-20 items-end">
            <div>
              {/* Eyebrow */}
              <p className="text-[#5DA3FF] text-[13px] font-display font-bold tracking-[0.08em] uppercase mb-7 flex items-center gap-[14px]">
                <span className="inline-block w-7 h-px bg-[#5DA3FF] opacity-60 flex-shrink-0" aria-hidden="true" />
                Werkwijze
              </p>

              {/* H1 — linebreak spans, laatste punt in accent */}
              <h1
                className="font-display font-extrabold text-white leading-[1.02] tracking-[-0.035em] mb-6"
                style={{ fontSize: 'clamp(44px, 6.4vw, 96px)', maxWidth: '16ch' }}
              >
                <span className="linebreak">Eerst koppelen.</span>
                <span className="linebreak">Dan vergelijken.</span>
                <span className="linebreak">Dan sturen<span className="text-accent">.</span></span>
              </h1>

              <p className="text-white/60 leading-[1.5] max-w-[520px]" style={{ fontSize: '19px' }}>
                De vier fases van ruwe platform-data naar herleidbaar resultaat.
              </p>
            </div>

            {/* Side-quote */}
            <aside className="text-white/55 text-[13px] text-right leading-[1.7] pb-[10px] hidden lg:block">
              <span className="block italic text-white/85 leading-[1.45] mb-2" style={{ fontSize: '15px', maxWidth: '260px', marginLeft: 'auto' }}>
                &ldquo;Wonder en is gheen wonder.&rdquo;
              </span>
              Simon Stevin, 1586 — en nog steeds het uitgangspunt.
            </aside>
          </div>

          {/* Meetlat-ruler + labels */}
          <div className="mt-24 text-white/55">
            <MeetlatRuler color="rgba(255,255,255,.55)" />
            <div className="mt-3.5 flex justify-between font-mono text-[11px] text-white/45 tracking-[0.04em]">
              <span>00 — ruwe data</span>
              <span>01</span>
              <span>02</span>
              <span>03</span>
              <span>04 — resultaat</span>
            </div>
          </div>

        </div>
      </section>

      {/* ── Phases — surface ── */}
      <section className="bg-surface" style={{ padding: '128px 24px 96px' }}>
        <div className="mx-auto max-w-[1200px]">

          {/* Section head */}
          <div className="flex justify-between items-end gap-12 mb-[72px] flex-col lg:flex-row">
            <div>
              <p className="text-accent text-[12px] font-display font-bold tracking-[0.08em] uppercase mb-[18px] flex items-center gap-[14px]">
                <span className="inline-block w-7 h-px bg-accent opacity-60 flex-shrink-0" aria-hidden="true" />
                Vier fases
              </p>
              <h2
                className="font-display font-bold text-primary m-0"
                style={{ fontSize: 'clamp(32px, 3.6vw, 52px)', lineHeight: '1.2', maxWidth: '18ch' }}
              >
                Van bron tot effect, stap voor stap herleidbaar.
              </h2>
            </div>
            <p className="text-muted text-[15px] leading-[1.55] max-w-[280px] lg:text-right">
              We slaan niets over. Elke fase doet exact één ding en geeft het aan de volgende door.
            </p>
          </div>

          {/* Ruler + fase-labels */}
          <MeetlatRuler color="#0A1628" />
          <div className="mt-3 grid grid-cols-4 font-mono text-[11px] text-muted tracking-[0.04em]">
            {phaseLabels.map((l) => <span key={l}>{l}</span>)}
          </div>

          {/* 4-col phase grid */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {phases.map((phase) => (
              <article key={phase.number} className="relative pt-2 pr-1">
                {/* Head: number + icon */}
                <div className="flex items-baseline justify-between mb-6">
                  <span
                    className="font-display font-extrabold text-accent leading-none"
                    style={{ fontSize: '72px', letterSpacing: '-0.04em' }}
                  >
                    {phase.number}
                  </span>
                  <div className="w-11 h-11 rounded-[10px] border border-border bg-white flex items-center justify-center text-primary shadow-[0_1px_2px_rgba(10,22,40,.06)]">
                    {phase.icon}
                  </div>
                </div>

                <h3
                  className="font-display font-bold text-primary mb-3.5"
                  style={{ fontSize: '26px', lineHeight: '1.15', letterSpacing: '-0.02em' }}
                >
                  {phase.title}
                </h3>

                <p className="text-[#2A3A54] leading-[1.6] mb-6" style={{ fontSize: '15.5px', maxWidth: '28ch' }}>
                  {phase.body}
                </p>

                {/* Claim met bolletje + border-top */}
                <div className="flex items-center gap-2.5 pt-5 border-t border-border" style={{ maxWidth: '28ch' }}>
                  <span className="w-2 h-2 rounded-full bg-accent flex-shrink-0" aria-hidden="true" />
                  <p className="font-display font-bold text-accent text-[15px] leading-[1.4] tracking-[-0.01em]">
                    {phase.claim}
                  </p>
                </div>
              </article>
            ))}
          </div>

        </div>
      </section>

      {/* ── Closing — navy ── */}
      <section className="bg-primary" style={{ padding: '112px 24px' }}>
        <div className="mx-auto max-w-[1200px] flex items-center justify-between gap-12 flex-col lg:flex-row">
          <h3
            className="font-display font-extrabold text-white m-0"
            style={{ fontSize: 'clamp(34px, 4.2vw, 60px)', lineHeight: '1.02', letterSpacing: '-0.03em', maxWidth: '14ch' }}
          >
            Het is geen wonder.<br />
            Het is <span className="text-accent">Stevin</span>.
          </h3>
          <div className="flex flex-col items-start lg:items-end gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 font-display font-bold text-[15px] bg-neon text-primary rounded-[10px] hover:bg-neon-dark transition-colors neon-glow"
            >
              Plan een gesprek
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
              </svg>
            </Link>
            <p className="text-[14px] italic text-white/55">
              &ldquo;Wonder en is gheen wonder.&rdquo; — Simon Stevin, 1586
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
