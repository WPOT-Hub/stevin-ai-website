import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Diensten — Stevin',
  description: 'Geen pakkettenlijst. Een werkend platform dat spend en resultaat met elkaar laat kloppen — in combinaties die bij jou passen.',
}

const tracks = [
  {
    number: '01',
    title: 'Platform-licentie',
    body: 'Je krijgt Stevin draaiend op je eigen stack. 220+ integraties, Director-laag, CRM-koppeling, causale rapporten. Je consultant of wijzelf bedient het.',
  },
  {
    number: '02',
    title: 'Platform + Consultancy',
    body: 'Je krijgt het platform plus ons als partner. Wekelijkse reviews, briefings naar je team of klant, strategische beslissingen samen. Schaalbaar per klantbestand.',
  },
  {
    number: '03',
    title: 'Agency Partner',
    body: 'Je bureau draait Stevin onder eigen merk. Wij leveren de motor, jij levert het gezicht naar de klant. Voor bureaus die transparantie als differentiator willen inzetten.',
  },
]

export default function DienstenPage() {
  return (
    <>
      {/* Hero — navy */}
      <section className="bg-primary pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-20 lg:pb-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <p className="text-accent text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase mb-6">
            — Diensten
          </p>
          <h1 className="font-display font-bold text-white leading-[1.05] tracking-tight" style={{ fontSize: 'clamp(2.5rem, 5.5vw, 5rem)' }}>
            We doen één ding.<br />
            <span className="text-neon">De meetlat bouwen.</span>
          </h1>
          <p className="mt-8 text-base sm:text-lg lg:text-xl text-white/60 leading-relaxed max-w-2xl">
            Geen pakkettenlijst. Geen modules met checkboxes. Een werkend platform dat spend en resultaat met elkaar laat kloppen — in combinaties die bij jou passen.
          </p>
        </div>
      </section>

      {/* Tracks — white */}
      <section className="bg-white py-20 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            {tracks.map((track) => (
              <div key={track.number} className="space-y-5">
                <p className="text-5xl font-display font-bold text-accent tracking-tight">
                  {track.number}
                </p>
                <h2 className="text-xl sm:text-2xl font-display font-bold text-primary tracking-tight">
                  {track.title}
                </h2>
                <p className="text-base text-muted leading-relaxed">
                  {track.body}
                </p>
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
            Bespreek welke track bij jou past.
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
