import type { Metadata } from 'next'
import Link from 'next/link'
import ContactForm from '@/components/ContactForm'

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
    <>
      {/* ── HERO ── */}
      <section className="bg-primary -mt-[72px]" style={{ padding: 'calc(96px + 72px) 24px 80px' }}>
        <div className="mx-auto max-w-[1200px]">

          <p className="text-[#5DA3FF] text-[13px] font-display font-bold tracking-[0.08em] uppercase mb-8 flex items-center gap-[14px]">
            <span className="inline-block w-7 h-px bg-[#5DA3FF] opacity-60 flex-shrink-0" aria-hidden="true" />
            ONAFHANKELIJKE AGENCY SCAN · VERTROUWELIJK · 20 MINUTEN
          </p>

          <h1
            className="font-display font-extrabold text-white leading-[1.06] tracking-[-0.03em]"
            style={{ fontSize: 'clamp(36px, 5vw, 72px)', maxWidth: '18ch' }}
          >
            Heb je stiekem een onderbuikgevoel over je{' '}
            <span className="text-[#5DA3FF]">marketingbureau?</span>
          </h1>

          <p
            className="text-white/60 leading-[1.55] mt-8"
            style={{ fontSize: '19px', maxWidth: '520px' }}
          >
            Je bent niet de enige. De meeste maandelijkse rapportages zijn ontworpen om het bureau er goed uit te laten zien, niet om jou de keiharde waarheid te vertellen.
          </p>

          <div className="mt-10">
            <a
              href="#scan"
              className="inline-flex items-center gap-2 bg-[#5DA3FF] text-[#0A1628] font-display font-bold text-[15px] px-7 py-3.5 rounded-lg hover:bg-[#7BB8FF] transition-colors"
            >
              Start de Onafhankelijke Agency Scan
            </a>
          </div>
        </div>
      </section>

      {/* ── SECTIE 1: DE PIJN ── */}
      <section className="bg-surface" style={{ padding: '80px 24px' }}>
        <div className="mx-auto max-w-[1200px]">

          <p className="text-accent text-[12px] font-display font-bold tracking-[0.12em] uppercase mb-10 flex items-center gap-[14px]">
            <span className="inline-block w-6 h-px bg-accent flex-shrink-0" aria-hidden="true" />
            DE REALITEIT
          </p>

          <h2
            className="font-display font-extrabold text-primary leading-[1.08] tracking-[-0.025em] mb-6"
            style={{ fontSize: 'clamp(28px, 3.5vw, 48px)', maxWidth: '20ch' }}
          >
            Waar betaal je eigenlijk echt voor?
          </h2>

          <p className="text-muted leading-[1.6] mb-4" style={{ fontSize: '17px', maxWidth: '640px' }}>
            Als je marketingbureau rapporteert dat &ldquo;de CPA daalt en de conversies stijgen&rdquo;, klinkt dat fantastisch. Maar als die cijfers niet overeenkomen met de realiteit in je eigen database of bankrekening, gaat er iets mis.
          </p>

          <p className="text-muted leading-[1.6] mb-12" style={{ fontSize: '17px', maxWidth: '640px' }}>
            Wij zien dagelijks hoe budgetten weglekken achter de schermen van &lsquo;succesvolle&rsquo; campagnes. De drie grootste blinde vlekken:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BLIND_SPOTS.map((spot) => (
              <div key={spot.label} className="bg-white rounded-xl p-8 border border-border">
                <span className="text-2xl block mb-4">{spot.icon}</span>
                <h3 className="font-display font-bold text-primary text-[17px] mb-3 leading-snug">
                  {spot.label}
                </h3>
                <p className="text-muted text-[15px] leading-relaxed">{spot.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTIE 2: DE OPLOSSING ── */}
      <section className="bg-white" style={{ padding: '80px 24px' }}>
        <div className="mx-auto max-w-[1200px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            <div>
              <p className="text-accent text-[12px] font-display font-bold tracking-[0.12em] uppercase mb-6 flex items-center gap-[14px]">
                <span className="inline-block w-6 h-px bg-accent flex-shrink-0" aria-hidden="true" />
                HOE HET WERKT
              </p>

              <h2
                className="font-display font-extrabold text-primary leading-[1.08] tracking-[-0.025em] mb-6"
                style={{ fontSize: 'clamp(28px, 3.5vw, 48px)' }}
              >
                Stop met gissen.{' '}
                <span className="text-accent">Start de Stevin Agency Scan.</span>
              </h2>

              <p className="text-muted leading-[1.6] mb-10" style={{ fontSize: '17px' }}>
                Stevin is geen nieuw marketingbureau dat je campagnes wil overnemen. Wij zijn de onafhankelijke radar. Wij koppelen direct met je advertentie-accounts en halen de ruwe data door onze FactEngine. Geen vanity metrics, maar wiskunde.
              </p>

              <div className="space-y-4">
                {HOW_IT_WORKS.map((step) => (
                  <div key={step.number} className="flex gap-6 items-start">
                    <span className="font-mono text-[11px] text-accent font-bold tracking-widest mt-1 flex-shrink-0">
                      {step.number}
                    </span>
                    <div>
                      <h3 className="font-display font-bold text-primary text-[16px] mb-1 leading-snug">
                        {step.title}
                      </h3>
                      <p className="text-muted text-[15px] leading-relaxed">{step.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Signal card */}
            <div className="bg-[#0A1628] rounded-2xl p-6 space-y-3">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-[#F4216A] animate-pulse" />
                <span className="text-[11px] font-mono text-white/40 uppercase tracking-widest">Live · Stevin FactEngine</span>
              </div>
              {[
                {
                  label: 'CRITICAL',
                  color: '#F4216A',
                  title: '[FAKE CONVERSION] Meta optimaliseert op soft events',
                  body: 'Pixel: 229 conversies · GA4: 32. De €660 spend traint het algoritme op bouncers, niet op klanten.',
                },
                {
                  label: 'HIGH',
                  color: '#F5A623',
                  title: '[BUDGET WASTE] Brand-term kannibalisatie gedetecteerd',
                  body: '€2.140 spend op merknaam-campagne. 78% van dit verkeer zou organisch binnenkomen.',
                },
                {
                  label: 'HIGH',
                  color: '#5DA3FF',
                  title: '[MARKUP] Media-spend vs. facturatie mismatch',
                  body: 'Werkelijke Google-spend: €3.200. Gefactureerd: €4.100. Verschil: €900 (28%).',
                },
              ].map((signal) => (
                <div key={signal.title} className="bg-white/5 rounded-lg p-4 border border-white/[0.08]">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span
                      className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded"
                      style={{ color: signal.color, backgroundColor: `${signal.color}20` }}
                    >
                      {signal.label}
                    </span>
                  </div>
                  <p className="text-white text-[13px] font-semibold leading-snug mb-1">{signal.title}</p>
                  <p className="text-white/45 text-[12px] leading-relaxed">{signal.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTIE 3: CTA + FORM ── */}
      <section id="scan" className="bg-surface" style={{ padding: '80px 24px 120px' }}>
        <div className="mx-auto max-w-[1200px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

            <div>
              <p className="text-accent text-[12px] font-display font-bold tracking-[0.12em] uppercase mb-6 flex items-center gap-[14px]">
                <span className="inline-block w-6 h-px bg-accent flex-shrink-0" aria-hidden="true" />
                DURF JIJ HET AAN?
              </p>

              <h2
                className="font-display font-extrabold text-primary leading-[1.08] tracking-[-0.025em] mb-6"
                style={{ fontSize: 'clamp(28px, 3.5vw, 48px)' }}
              >
                Durf jij je agency te challengen?
              </h2>

              <p className="text-muted text-[17px] leading-[1.6] mb-4">
                Als je bureau echt zo goed presteert als ze zeggen in hun rapportages, dan zal onze scan dat alleen maar bevestigen. Maar als je onderbuikgevoel klopt, bespaar je vandaag nog duizenden euro&rsquo;s aan verspild budget.
              </p>

              <p className="text-muted text-[17px] leading-[1.6] mb-8">
                Laat je niet langer sturen door mooie powerpoints. Stuur op data.
              </p>

              <div className="pt-8 border-t border-border">
                <p className="text-[13px] text-muted">
                  Liever direct mailen?{' '}
                  <a href="mailto:koen@stevin.ai" className="text-accent hover:underline font-medium">
                    koen@stevin.ai
                  </a>
                </p>
                <p className="text-[12px] text-muted/60 mt-3 italic">
                  100% vertrouwelijk. Jouw bureau krijgt hier geen melding van.
                </p>
              </div>
            </div>

            <div>
              <ContactForm
                nextUrl="https://stevin.ai/agency-scan?verzonden=1"
                subject="Agency Scan aanvraag via stevin.ai/agency-scan"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
