import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Diensten — Stevin',
  description: 'Geen pakkettenlijst. Een werkend platform dat spend en resultaat met elkaar laat kloppen — in combinaties die bij jou passen.',
}

const tracks = [
  {
    number: '01',
    featured: false,
    meta: 'Self-serve · jouw stack',
    title: 'Platform-licentie',
    body: 'Je krijgt Stevin draaiend op je eigen stack. 220+ integraties, Director-laag, CRM-koppeling, causale rapporten. Je consultant of wijzelf bedient het.',
  },
  {
    number: '02',
    featured: true,
    meta: 'Samen · wekelijks ritme',
    title: 'Platform + Consultancy',
    body: 'Je krijgt het platform plus ons als partner. Wekelijkse reviews, briefings naar je team of klant, strategische beslissingen samen. Schaalbaar per klantbestand.',
  },
  {
    number: '03',
    featured: false,
    meta: 'White-label · jouw merk',
    title: 'Agency Partner',
    body: 'Je bureau draait Stevin onder eigen merk. Wij leveren de motor, jij levert het gezicht naar de klant. Voor bureaus die transparantie als differentiator willen inzetten.',
  },
]

export default function DienstenPage() {
  return (
    <>
      {/* Hero — navy met 135° gradient */}
      <section
        className="pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-20 lg:pb-24"
        style={{ background: 'linear-gradient(135deg, #0A1628 0%, #1A2744 100%)' }}
      >
        <div className="mx-auto max-w-[1200px] px-6">

          {/* Eyebrow — kaps */}
          <p className="text-white/55 text-xs font-display font-bold tracking-[0.12em] uppercase mb-8 flex items-center gap-3
            before:content-[''] before:inline-block before:w-6 before:h-px before:bg-white/45">
            DIENSTEN
          </p>

          <h1 className="font-display font-extrabold text-white leading-[1.02] tracking-[-0.035em] mb-9"
              style={{ fontSize: 'clamp(48px, 6.5vw, 96px)', maxWidth: '1040px' }}>
            We doen één ding.<br />
            <span className="text-[#5DA3FF]">De meetlat bouwen.</span>
          </h1>

          <p className="text-white/78 text-[20px] leading-[1.55] max-w-[640px]">
            Geen pakkettenlijst. Geen modules met checkboxes. Een werkend
            platform dat spend en resultaat met elkaar laat kloppen — in
            combinaties die bij jou passen.
          </p>
        </div>
      </section>

      {/* Tracks — surface, cards */}
      <section className="bg-surface py-20 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {tracks.map((track) => (
              <article
                key={track.number}
                className={`rounded-[14px] p-10 flex flex-col min-h-[420px] relative
                  transition-[transform,box-shadow] duration-200
                  hover:-translate-y-0.5 hover:shadow-lg
                  ${track.featured
                    ? 'bg-primary text-white border border-primary shadow-md'
                    : 'bg-white text-primary border border-border shadow-sm'
                  }`}
              >
                {/* Head: nummer + meta */}
                <div className="flex items-baseline justify-between mb-14">
                  <span className={`font-display font-bold text-[48px] leading-none tracking-[-0.04em]
                    ${track.featured ? 'text-[#5DA3FF]' : 'text-primary'}`}>
                    {track.number}
                  </span>
                  <span className={`font-display text-[11px] font-semibold tracking-[0.08em] uppercase
                    ${track.featured ? 'text-white/55' : 'text-muted'}`}>
                    {track.meta}
                  </span>
                </div>

                <h2 className={`font-display font-bold text-[30px] leading-[1.1] tracking-[-0.025em] mb-[18px]
                  ${track.featured ? 'text-white' : 'text-primary'}`}>
                  {track.title}
                </h2>

                <p className={`text-base leading-relaxed mb-8
                  ${track.featured ? 'text-white/80' : 'text-muted'}`}>
                  {track.body}
                </p>

                {/* CTA */}
                <div className={`mt-auto pt-5 border-t
                  ${track.featured ? 'border-white/12' : 'border-border'}`}>
                  <Link
                    href="/contact"
                    className={`font-display text-sm font-semibold tracking-[-0.005em] inline-flex items-center gap-2
                      group transition-colors duration-200
                      ${track.featured ? 'text-[#5DA3FF] hover:text-white' : 'text-accent hover:text-accent-dark'}`}
                  >
                    Bespreek deze track{' '}
                    <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                  </Link>
                </div>
              </article>
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
