import type { Metadata } from 'next'
import Link from 'next/link'
import AgencyScanForm from './AgencyScanForm'

export const metadata: Metadata = {
  title: 'Agency Scan — Stevin.AI',
  description: 'Een onafhankelijke check op je marketingbureau. Geen verkooppraatje. Wiskunde.',
  robots: 'noindex, nofollow',
}

const BLIND_SPOTS = [
  {
    icon: '🕵️',
    label: 'Verborgen Marges (Markup)',
    body: 'Weet jij exact welk deel van je factuur naar Google/Meta gaat, en welk deel in de zakken van het bureau verdwijnt als "media-opslag"? Vaak is de verhouding zoek.',
  },
  {
    icon: '🤖',
    label: 'Bot Traffic & Nep-Conversies',
    body: 'Het algoritme is geoptimaliseerd voor goedkope klikken, niet voor echte klanten. Je betaalt de hoofdprijs voor bouncers en spam-leads, terwijl het bureau pronkt met "veel verkeer".',
  },
  {
    icon: '📉',
    label: 'Slechte Handeling & Kannibalisatie',
    body: 'Pronkt je bureau met goedkope leads? Grote kans dat ze adverteren op je eigen merknaam — mensen die je toch al zochten — om de falende acquisitie-campagnes te maskeren.',
  },
]

const HOW_IT_WORKS = [
  {
    number: '01',
    title: 'Inpluggen',
    body: 'We loggen (read-only) in op je Meta, Google Ads of GA4. Geen toegang die je niet zelf verleent.',
  },
  {
    number: '02',
    title: 'Scannen',
    body: 'Onze algoritmes leggen direct de vinger op de zere plek: waar zit de waste, klopt de tracking, is er sprake van verborgen markup?',
  },
  {
    number: '03',
    title: 'De Confrontatie',
    body: 'Je krijgt een snoeihard, feitelijk rapport. Dit is jouw munitie voor het volgende overleg met je bureau.',
  },
]

export default function AgencyScanPage() {
  return (
    <div className="bg-[#0A1628] min-h-screen">

      {/* ── HERO ── */}
      <section
        className="-mt-[72px]"
        style={{
          background: 'linear-gradient(180deg, #060E1C 0%, #0A1628 100%)',
          padding: 'calc(96px + 72px) 24px 80px',
        }}
      >
        <div className="mx-auto max-w-[840px]">

          {/* Eyebrow */}
          <p className="text-[#5DA3FF] text-[12px] font-display font-bold tracking-[0.1em] uppercase mb-8 flex items-center gap-[14px]">
            <span className="inline-block w-7 h-px bg-[#5DA3FF] opacity-50 flex-shrink-0" aria-hidden="true" />
            ONAFHANKELIJKE AGENCY SCAN · VERTROUWELIJK · 20 MINUTEN
          </p>

          {/* Headline */}
          <h1
            className="font-display font-extrabold text-white leading-[1.06] tracking-[-0.03em]"
            style={{ fontSize: 'clamp(36px, 5.5vw, 72px)' }}
          >
            Heb je stiekem een{' '}
            <span style={{ color: '#5DA3FF' }}>onderbuikgevoel</span>{' '}
            over je marketingbureau?
          </h1>

          {/* Sub */}
          <p
            className="text-white/55 leading-[1.6] mt-8"
            style={{ fontSize: '20px', maxWidth: '600px' }}
          >
            Je bent niet de enige. De meeste maandelijkse rapportages zijn ontworpen om het bureau er goed uit te laten zien, niet om jou de keiharde waarheid te vertellen. Tijd voor een onafhankelijke check.
          </p>

          {/* CTA */}
          <div className="mt-10">
            <a
              href="#scan"
              className="inline-flex items-center gap-2 font-display font-bold text-[15px] px-8 py-4 rounded-lg transition-colors"
              style={{ background: '#5DA3FF', color: '#0A1628' }}
            >
              Start de Onafhankelijke Agency Scan
            </a>
          </div>

          {/* Subtle divider */}
          <div className="mt-20 border-t border-white/[0.06]" />
        </div>
      </section>

      {/* ── SECTIE 1: DE PIJN ── */}
      <section style={{ padding: '80px 24px' }}>
        <div className="mx-auto max-w-[840px]">

          <p className="text-[#5DA3FF] text-[12px] font-display font-bold tracking-[0.1em] uppercase mb-8 flex items-center gap-[14px]">
            <span className="inline-block w-6 h-px bg-[#5DA3FF] opacity-50 flex-shrink-0" aria-hidden="true" />
            DE REALITEIT
          </p>

          <h2
            className="font-display font-extrabold text-white leading-[1.08] tracking-[-0.025em] mb-8"
            style={{ fontSize: 'clamp(28px, 4vw, 52px)' }}
          >
            Waar betaal je eigenlijk echt voor?
          </h2>

          <p className="text-white/55 leading-[1.65] mb-12" style={{ fontSize: '18px', maxWidth: '680px' }}>
            Als je marketingbureau rapporteert dat &ldquo;de CPA daalt en de conversies stijgen&rdquo;, klinkt dat fantastisch. Maar als die cijfers niet overeenkomen met de realiteit in je eigen database of bankrekening, gaat er iets mis.
          </p>

          <p className="text-white/40 text-[13px] font-mono uppercase tracking-widest mb-8">
            De drie grootste blinde vlekken
          </p>

          <div className="space-y-4">
            {BLIND_SPOTS.map((spot) => (
              <div
                key={spot.label}
                className="rounded-xl p-7 border"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  borderColor: 'rgba(255,255,255,0.07)',
                }}
              >
                <div className="flex items-start gap-5">
                  <span className="text-2xl flex-shrink-0 mt-0.5">{spot.icon}</span>
                  <div>
                    <h3 className="font-display font-bold text-white text-[17px] mb-2 leading-snug">
                      {spot.label}
                    </h3>
                    <p className="text-white/50 text-[15px] leading-relaxed">
                      {spot.body}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTIE 2: DE OPLOSSING ── */}
      <section
        style={{
          padding: '80px 24px',
          background: 'linear-gradient(180deg, rgba(61,142,255,0.04) 0%, transparent 100%)',
          borderTop: '1px solid rgba(255,255,255,0.05)',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        <div className="mx-auto max-w-[840px]">

          <p className="text-[#5DA3FF] text-[12px] font-display font-bold tracking-[0.1em] uppercase mb-8 flex items-center gap-[14px]">
            <span className="inline-block w-6 h-px bg-[#5DA3FF] opacity-50 flex-shrink-0" aria-hidden="true" />
            HOE HET WERKT
          </p>

          <h2
            className="font-display font-extrabold text-white leading-[1.08] tracking-[-0.025em] mb-6"
            style={{ fontSize: 'clamp(28px, 4vw, 52px)' }}
          >
            Stop met gissen.{' '}
            <br />
            <span style={{ color: '#5DA3FF' }}>Start de Stevin Agency Scan.</span>
          </h2>

          <p className="text-white/55 leading-[1.65] mb-12" style={{ fontSize: '18px', maxWidth: '640px' }}>
            Stevin is geen nieuw marketingbureau dat je campagnes wil overnemen. Wij zijn de onafhankelijke radar. Wij koppelen direct met je advertentie-accounts en halen de ruwe data door onze FactEngine. Geen vanity metrics, maar wiskunde.
          </p>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {HOW_IT_WORKS.map((step) => (
              <div
                key={step.number}
                className="rounded-xl p-6"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(61,142,255,0.15)',
                }}
              >
                <span
                  className="font-mono text-[11px] font-bold tracking-[0.12em]"
                  style={{ color: '#5DA3FF' }}
                >
                  {step.number}
                </span>
                <h3 className="font-display font-bold text-white text-[17px] mt-3 mb-3 leading-snug">
                  {step.title}
                </h3>
                <p className="text-white/45 text-[14px] leading-relaxed">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTIE 3: CTA ── */}
      <section id="scan" style={{ padding: '80px 24px 40px' }}>
        <div className="mx-auto max-w-[840px]">

          <p className="text-[#5DA3FF] text-[12px] font-display font-bold tracking-[0.1em] uppercase mb-8 flex items-center gap-[14px]">
            <span className="inline-block w-6 h-px bg-[#5DA3FF] opacity-50 flex-shrink-0" aria-hidden="true" />
            DURF JIJ HET AAN?
          </p>

          <h2
            className="font-display font-extrabold text-white leading-[1.08] tracking-[-0.025em] mb-6"
            style={{ fontSize: 'clamp(28px, 4vw, 52px)', maxWidth: '14ch' }}
          >
            Durf jij je agency te challengen?
          </h2>

          <p className="text-white/55 leading-[1.65] mb-4" style={{ fontSize: '18px', maxWidth: '620px' }}>
            Als je bureau echt zo goed presteert als ze zeggen in hun rapportages, dan zal onze scan dat alleen maar bevestigen. Maar als je onderbuikgevoel klopt, bespaar je vandaag nog duizenden euro&rsquo;s aan verspild budget.
          </p>

          <p className="text-white/40 leading-[1.65] mb-14" style={{ fontSize: '17px', maxWidth: '580px' }}>
            Laat je niet langer sturen door mooie powerpoints. Stuur op data.
          </p>

          {/* Form */}
          <AgencyScanForm />
        </div>
      </section>

      {/* ── FOOTER NOTE ── */}
      <section style={{ padding: '40px 24px 80px' }}>
        <div className="mx-auto max-w-[840px]">
          <div className="border-t border-white/[0.06] pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-white/20 text-[13px] font-mono">
              Koen Hoogenboom · 20 jaar online marketing · oprichter Stevin
            </p>
            <Link
              href="/"
              className="text-white/20 text-[13px] hover:text-white/40 transition-colors"
            >
              stevin.ai
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
