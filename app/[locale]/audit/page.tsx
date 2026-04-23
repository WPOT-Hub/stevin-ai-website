import type { Metadata } from 'next'
import { Link } from '@/i18n/navigation'
import ContactForm from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Gratis marketing audit — 20 minuten, drie concrete aandachtspunten',
  description: 'Stevin loopt in 20 minuten door je marketingaccounts en geeft je drie concrete aandachtspunten mee. Geen verkooppraatje.',
  robots: 'noindex',
}

const WHAT_YOU_GET = [
  {
    number: '01',
    title: 'We lopen door je situatie',
    body: 'Welke kanalen draaien, wat er gemeten wordt, waar de gaps zitten. Geen voorbereiding nodig van jouw kant.',
  },
  {
    number: '02',
    title: 'Drie concrete aandachtspunten',
    body: 'Geen vaag advies. Drie specifieke dingen die je morgen kunt oppakken — of die Stevin automatisch voor je bewaakt.',
  },
  {
    number: '03',
    title: 'Geen verkooppraatje',
    body: 'Als Stevin niet past bij jouw situatie, zeggen we dat gewoon. De 20 minuten zijn voor jou, niet voor ons.',
  },
]

export default function AuditPage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="bg-primary -mt-[72px]" style={{ padding: 'calc(96px + 72px) 24px 80px' }}>
        <div className="mx-auto max-w-[1200px]">

          {/* Eyebrow */}
          <p className="text-[#5DA3FF] text-[13px] font-display font-bold tracking-[0.08em] uppercase mb-8 flex items-center gap-[14px]">
            <span className="inline-block w-7 h-px bg-[#5DA3FF] opacity-60 flex-shrink-0" aria-hidden="true" />
            GRATIS · 20 MINUTEN · GEEN VERKOOPPRAATJE
          </p>

          <h1
            className="font-display font-extrabold text-white leading-[1.06] tracking-[-0.03em]"
            style={{ fontSize: 'clamp(36px, 5vw, 72px)', maxWidth: '16ch' }}
          >
            Wat gaat er mis in je marketing{' '}
            <span className="text-[#5DA3FF]">zonder dat je het ziet?</span>
          </h1>

          <p
            className="text-white/60 leading-[1.55] mt-8"
            style={{ fontSize: '19px', maxWidth: '500px' }}
          >
            In 20 minuten lopen we samen door je accounts. Daarna krijg je drie concrete aandachtspunten mee — gratis, zonder verplichtingen.
          </p>

          {/* Trust */}
          <p className="text-white/30 text-sm mt-6 font-mono">
            Koen Hoogenboom · 20 jaar online marketing · ex-founder June20 · oprichter Stevin
          </p>
        </div>
      </section>

      {/* ── WHAT YOU GET ── */}
      <section className="bg-surface" style={{ padding: '80px 24px' }}>
        <div className="mx-auto max-w-[1200px]">

          <p className="text-accent text-[12px] font-display font-bold tracking-[0.12em] uppercase mb-10 flex items-center gap-[14px]">
            <span className="inline-block w-6 h-px bg-accent flex-shrink-0" aria-hidden="true" />
            WAT JE KRIJGT
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {WHAT_YOU_GET.map((item) => (
              <div key={item.number} className="bg-white rounded-xl p-8 border border-border">
                <span className="font-mono text-[11px] text-accent font-bold tracking-widest">{item.number}</span>
                <h3 className="font-display font-bold text-primary text-[18px] mt-3 mb-3 leading-snug">
                  {item.title}
                </h3>
                <p className="text-muted text-[15px] leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SIGNALS PREVIEW ── */}
      <section className="bg-white" style={{ padding: '80px 24px' }}>
        <div className="mx-auto max-w-[1200px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            <div>
              <p className="text-accent text-[12px] font-display font-bold tracking-[0.12em] uppercase mb-6 flex items-center gap-[14px]">
                <span className="inline-block w-6 h-px bg-accent flex-shrink-0" aria-hidden="true" />
                WAT STEVIN SIGNALEERT
              </p>
              <h2
                className="font-display font-extrabold text-primary leading-[1.08] tracking-[-0.025em] mb-6"
                style={{ fontSize: 'clamp(28px, 3.5vw, 48px)' }}
              >
                Problemen die je normaal pas ziet als het te laat is.
              </h2>
              <ul className="space-y-4">
                {[
                  'Campagnes die stilletjes slechter presteren',
                  'Tracking die niet klopt of conversies mist',
                  'Budget dat weglekt zonder zichtbaar resultaat',
                  'Zichtbaarheid die daalt in je markt',
                  'Creatief dat vermoeid raakt zonder dat je het doorhebt',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[15px] text-muted">
                    <span className="mt-1 w-4 h-4 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent block" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Signal card example */}
            <div className="bg-[#0A1628] rounded-2xl p-6 space-y-3">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-[#F4216A] animate-pulse" />
                <span className="text-[11px] font-mono text-white/40 uppercase tracking-widest">Live · Stevin Advisor</span>
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
                  title: '[CREATIVE FATIGUE] CTR -48% na 17 dagen',
                  body: 'CA_Linkad_v4 presteert significant onder baseline. CPC gestegen met 34%.',
                },
                {
                  label: 'HIGH',
                  color: '#5DA3FF',
                  title: '[BUDGET WASTE] €173 spend — 0 conversies',
                  body: 'NON-BRAND campagne trekt verkeer zonder intentie. 92% bounce rate.',
                },
              ].map((signal) => (
                <div key={signal.title} className="bg-white/5 rounded-lg p-4 border border-white/8">
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

      {/* ── FORM ── */}
      <section className="bg-surface" style={{ padding: '80px 24px 120px' }}>
        <div className="mx-auto max-w-[1200px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

            <div>
              <p className="text-accent text-[12px] font-display font-bold tracking-[0.12em] uppercase mb-6 flex items-center gap-[14px]">
                <span className="inline-block w-6 h-px bg-accent flex-shrink-0" aria-hidden="true" />
                PLAN JE AUDIT
              </p>
              <h2
                className="font-display font-extrabold text-primary leading-[1.08] tracking-[-0.025em] mb-4"
                style={{ fontSize: 'clamp(28px, 3.5vw, 48px)' }}
              >
                20 minuten.<br />Drie aandachtspunten.<br />
                <span className="text-accent">Geen verkooppraatje.</span>
              </h2>
              <p className="text-muted text-[16px] leading-relaxed mt-4">
                Laat je naam en bedrijf achter. We nemen binnen één werkdag contact op om een moment in te plannen.
              </p>

              <div className="mt-8 pt-8 border-t border-border">
                <p className="text-[13px] text-muted">
                  Liever direct mailen?{' '}
                  <a href="mailto:koen@stevin.ai" className="text-accent hover:underline font-medium">
                    koen@stevin.ai
                  </a>
                </p>
              </div>
            </div>

            <div>
              <ContactForm
                nextUrl="https://stevin.ai/audit?verzonden=1"
                subject="Audit aanvraag via stevin.ai/audit"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
