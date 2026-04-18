import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Werkwijze — Stevin',
  description: 'De vier fases van ruwe platform-data naar herleidbaar resultaat. Geen black boxes, geen magie.',
}

const phases = [
  {
    number: '01',
    title: 'Koppelen',
    body: 'We verbinden je volledige digitale ecosysteem met 220+ native integraties. Ruwe data realtime beschikbaar in één overzicht.',
    claim: 'Geen middleware, geen vertraging.',
  },
  {
    number: '02',
    title: 'Vergelijken',
    body: 'Platform-cijfers naast de werkelijkheid in je CRM. Waar Meta of Google afwijkt, wordt dat meetbaar.',
    claim: 'Niet vermoed, wel bewezen.',
  },
  {
    number: '03',
    title: 'Activeren',
    body: 'Concrete acties in plaats van passieve grafieken. Stevin vertelt per euro waar je morgen moet sturen.',
    claim: 'Adviezen, geen dashboards.',
  },
  {
    number: '04',
    title: 'Verbeteren',
    body: 'Het platform leert van elke interactie. Rapportages, alerts en content passen zich aan op jouw werkwijze.',
    claim: 'Feedback loop als fundament.',
  },
]

export default function WerkwijzePage() {
  return (
    <>
      {/* Hero — navy */}
      <section className="bg-primary pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-20 lg:pb-24 overflow-hidden">
        <div className="mx-auto max-w-[1200px] px-6">

          {/* Eyebrow — zonder em-dash prefix; streepje via CSS */}
          <p className="text-[#5DA3FF] text-xs font-semibold tracking-[0.08em] uppercase mb-7 flex items-center gap-3
            before:content-[''] before:inline-block before:w-7 before:h-px before:bg-[#5DA3FF] before:opacity-60">
            Werkwijze
          </p>

          {/* H1 — driedelig, linebreak-spans met mobile-inline-logic */}
          <h1 className="font-display font-extrabold text-white leading-[1.02] tracking-[-0.035em] mb-6"
              style={{ fontSize: 'clamp(44px, 6.4vw, 96px)', maxWidth: '16ch' }}>
            <span className="linebreak">Eerst koppelen.</span>
            <span className="linebreak">Dan vergelijken.</span>
            <span className="linebreak">Dan sturen.</span>
          </h1>

          <p className="text-white/60 text-[19px] leading-[1.5] max-w-[520px] mb-16">
            De vier fases van ruwe platform-data naar herleidbaar resultaat.
          </p>

          {/* Side-quote — Simon Stevin */}
          <div className="text-white/55 text-[13px] text-right leading-[1.7] max-w-[260px] ml-auto hidden lg:block -mt-32 mb-8">
            <span className="block italic text-[15px] text-white/85 leading-[1.45] mb-2">
              &ldquo;Wonder en is gheen wonder.&rdquo;
            </span>
            Simon Stevin, 1586 — en nog steeds het uitgangspunt.
          </div>

        </div>
      </section>

      {/* Phases — surface */}
      <section className="bg-surface py-20 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="space-y-16 sm:space-y-20">
            {phases.map((phase) => (
              <div key={phase.number} className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start">
                <div className="lg:col-span-2">
                  <p className="font-display font-extrabold text-accent tracking-[-0.04em] leading-none"
                     style={{ fontSize: '72px' }}>
                    {phase.number}
                  </p>
                </div>
                <div className="lg:col-span-10 space-y-4">
                  <h2 className="text-2xl sm:text-3xl font-display font-bold text-primary tracking-tight">
                    {phase.title}
                  </h2>
                  <p className="text-base sm:text-lg text-muted leading-relaxed">
                    {phase.body}
                  </p>
                  {/* Phase claim met border-top + bolletje */}
                  <div className="flex items-center gap-2.5 pt-5 border-t border-border">
                    <span className="w-2 h-2 rounded-full bg-accent flex-shrink-0" aria-hidden="true" />
                    <p className="text-sm sm:text-base font-display font-bold text-accent tracking-[-0.01em]">
                      {phase.claim}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Kicker + CTA — navy */}
      <section className="bg-primary py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight mb-8">
            Het is geen wonder. Het is{' '}
            <span className="text-accent">Stevin</span>.
          </h2>
          <p className="text-base sm:text-lg text-white/60 mb-10 max-w-xl mx-auto">
            Zie wat je betaalt. Zie wat het oplevert.
          </p>
          <Link
            href="/contact"
            className="inline-flex px-8 py-3.5 text-sm font-semibold bg-neon text-primary rounded-xl hover:bg-neon-dark transition-colors neon-glow"
          >
            Plan een gesprek
          </Link>
          <p className="mt-12 text-xs text-white/30 italic">
            &ldquo;Wonder en is gheen wonder.&rdquo; — Simon Stevin, 1586
          </p>
        </div>
      </section>
    </>
  )
}
