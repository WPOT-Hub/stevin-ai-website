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
      <section className="bg-primary pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-20 lg:pb-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <p className="text-accent text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase mb-6">
            — Werkwijze
          </p>
          <h1 className="font-display font-bold text-white leading-[1.05] tracking-tight" style={{ fontSize: 'clamp(2.75rem, 6vw, 6rem)' }}>
            <span className="block">Eerst koppelen.</span>
            <span className="block">Dan vergelijken.</span>
            <span className="block">Dan sturen.</span>
          </h1>
          <p className="mt-8 text-base sm:text-lg lg:text-xl text-white/60 leading-relaxed max-w-2xl">
            De vier fases van ruwe platform-data naar herleidbaar resultaat.
          </p>
        </div>
      </section>

      {/* Phases — white */}
      <section className="bg-white py-20 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-16 sm:space-y-20">
            {phases.map((phase) => (
              <div key={phase.number} className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start">
                <div className="lg:col-span-2">
                  <p className="text-5xl sm:text-6xl font-display font-bold text-accent tracking-tight">
                    {phase.number}
                  </p>
                </div>
                <div className="lg:col-span-10 space-y-4">
                  <h2 className="text-2xl sm:text-3xl font-display font-bold text-primary">
                    {phase.title}
                  </h2>
                  <p className="text-base sm:text-lg text-muted leading-relaxed">
                    {phase.body}
                  </p>
                  <p className="text-sm sm:text-base font-semibold text-primary tracking-tight">
                    {phase.claim}
                  </p>
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
            Het is geen wonder. Het is Stevin.
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
