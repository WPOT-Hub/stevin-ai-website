import type { Metadata } from 'next'
import { Link } from '@/i18n/navigation'
import MeetlatRuler from '@/components/MeetlatRuler'

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
      {/* ── Hero ── */}
      <section className="bg-primary -mt-[72px] overflow-hidden" style={{ padding: 'calc(96px + 72px) 24px 128px' }}>
        <div className="mx-auto max-w-[1200px]">
          {/* Eyebrow */}
          <p className="text-[#5DA3FF] text-[13px] font-display font-bold tracking-[0.08em] uppercase mb-8 flex items-center gap-[14px]">
            <span className="inline-block w-7 h-px bg-[#5DA3FF] opacity-60 flex-shrink-0" aria-hidden="true" />
            DIENSTEN
          </p>

          <h1
            className="font-display font-extrabold text-white leading-[1.02] tracking-[-0.035em]"
            style={{ fontSize: 'clamp(52px, 7vw, 108px)', maxWidth: '14ch' }}
          >
            We doen één ding.<br />
            <span className="text-[#5DA3FF]">De meetlat bouwen.</span>
          </h1>

          <p className="text-white/60 leading-[1.55] max-w-[560px] mt-8" style={{ fontSize: '20px' }}>
            Geen pakkettenlijst. Geen modules met checkboxes. Een werkend
            platform dat spend en resultaat met elkaar laat kloppen — in
            combinaties die bij jou passen.
          </p>

          <div className="mt-16">
            <MeetlatRuler color="rgba(255,255,255,.35)" />
          </div>
        </div>
      </section>

      {/* ── Tracks — surface ── */}
      <section className="bg-surface" style={{ padding: '112px 24px 128px' }}>
        <div className="mx-auto max-w-[1200px]">

          {/* Section head */}
          <div className="flex items-baseline justify-between flex-wrap gap-5 mb-14">
            <div>
              <p className="text-accent text-[12px] font-display font-bold tracking-[0.12em] uppercase mb-4 flex items-center gap-[14px]">
                <span className="inline-block w-6 h-px bg-accent flex-shrink-0" aria-hidden="true" />
                DRIE TRACKS
              </p>
              <h2
                className="font-display font-extrabold text-primary m-0"
                style={{ fontSize: 'clamp(32px, 3.6vw, 52px)', letterSpacing: '-0.03em', lineHeight: '1.08', maxWidth: '720px' }}
              >
                Eén platform. Drie manieren waarop het naast je komt staan.
              </h2>
            </div>
            <p className="text-muted text-[15px] leading-[1.6] max-w-[300px]">
              Kies wat past. Combineer, schuif, switch — de meetlat blijft dezelfde.
            </p>
          </div>

          {/* Track cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {tracks.map((track) => (
              <article
                key={track.number}
                className={`rounded-[14px] flex flex-col transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5
                  ${track.featured
                    ? 'bg-primary text-white border border-primary shadow-md hover:shadow-lg'
                    : 'bg-white text-primary border border-border shadow-sm hover:shadow-lg'
                  }`}
                style={{ padding: '40px 32px 36px', minHeight: '420px' }}
              >
                {/* Head */}
                <div className="flex items-baseline justify-between mb-14">
                  <span
                    className="font-display font-bold leading-none"
                    style={{ fontSize: '48px', letterSpacing: '-0.04em', color: track.featured ? '#5DA3FF' : '#0A1628' }}
                  >
                    {track.number}
                  </span>
                  <span
                    className="font-display text-[11px] font-semibold tracking-[0.08em] uppercase"
                    style={{ color: track.featured ? 'rgba(255,255,255,.55)' : '#5A6B82' }}
                  >
                    {track.meta}
                  </span>
                </div>

                <h3
                  className="font-display font-bold mb-[18px]"
                  style={{
                    fontSize: '30px', lineHeight: '1.1', letterSpacing: '-0.025em',
                    color: track.featured ? '#fff' : '#0A1628',
                  }}
                >
                  {track.title}
                </h3>

                <p
                  className="text-base leading-relaxed mb-8"
                  style={{ color: track.featured ? 'rgba(255,255,255,.8)' : '#5A6B82' }}
                >
                  {track.body}
                </p>

                {/* CTA */}
                <div
                  className="mt-auto pt-5 border-t"
                  style={{ borderColor: track.featured ? 'rgba(255,255,255,.12)' : '#E1E7EF' }}
                >
                  <Link
                    href="/contact"
                    className="font-display text-sm font-semibold tracking-[-0.005em] inline-flex items-center gap-2 group transition-colors duration-200"
                    style={{ color: track.featured ? '#5DA3FF' : '#3D8EFF' }}
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

      {/* ── Closing — navy ── */}
      <section className="bg-primary" style={{ padding: '128px 24px 144px' }}>
        <div className="mx-auto max-w-[1200px]">

          {/* Eyebrow — Golden Hook als kicker */}
          <p className="text-neon text-[14px] font-display font-bold tracking-[0.14em] uppercase mb-7 flex items-center gap-[14px]">
            <span className="inline-block w-6 h-px bg-neon flex-shrink-0" aria-hidden="true" />
            Het is geen wonder. Het is Stevin.
          </p>

          <h2
            className="font-display font-extrabold text-white mb-11"
            style={{ fontSize: 'clamp(40px, 5vw, 72px)', letterSpacing: '-0.032em', lineHeight: '1.05', maxWidth: '880px' }}
          >
            Niet zeker welke track? Dat lossen we in één gesprek op.
          </h2>

          <div className="flex gap-3 flex-wrap items-center">
            <Link
              href="/contact"
              className="inline-flex font-display font-bold text-base bg-neon text-primary rounded-[10px] hover:bg-neon-dark transition-colors"
              style={{ padding: '16px 26px', letterSpacing: '-0.005em' }}
            >
              Bespreek welke track bij jou past
            </Link>
            <Link
              href="/platform"
              className="inline-flex font-display font-semibold text-base text-white border rounded-[10px] hover:bg-white/5 transition-colors"
              style={{ padding: '16px 22px', letterSpacing: '-0.005em', borderColor: 'rgba(255,255,255,.25)' }}
            >
              Bekijk de meetlat
            </Link>
          </div>

          {/* Foot */}
          <div
            className="mt-24 flex justify-between flex-wrap gap-4 pt-7"
            style={{ borderTop: '1px solid rgba(255,255,255,.12)' }}
          >
            <p className="italic text-[13px]" style={{ color: 'rgba(255,255,255,.5)' }}>
              &ldquo;Wonder en is gheen wonder.&rdquo; — Simon Stevin, 1586
            </p>
            <p
              className="font-display text-[12px] font-medium tracking-[0.06em] uppercase"
              style={{ color: 'rgba(255,255,255,.4)' }}
            >
              stevin.ai / diensten
            </p>
          </div>

        </div>
      </section>
    </>
  )
}
