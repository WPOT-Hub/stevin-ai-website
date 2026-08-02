import { Link } from '@/i18n/navigation'
import HairlineRule from '@/components/HairlineRule'
import FAQAccordion from '@/components/FAQAccordion'
import DeskProof from '@/components/DeskProof'
import type { SeoLandingPageContent } from '@/data/seo-landing-pages'

// Gedeelde template voor de SEO-landingspagina's (docs/SEO_PAGE_STRUCTURES_2026-07-05.md).
// Zelfde visuele taal als /marketing-automation en de statische LP's /ads-data
// en /inhouse: donkere hero, probleem, oplossing in stappen, lijstblok met CTA,
// FAQ altijd in de DOM (citeerbaar voor crawlers en LLMs) plus interne links.
export default function SeoLandingPage({ page }: { page: SeoLandingPageContent }) {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: page.faq.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: { '@type': 'Answer', text: faq.answer },
            })),
          }),
        }}
      />

      {/* Hero */}
      <section className="bg-primary -mt-[72px]" style={{ padding: 'calc(96px + 72px) 24px 128px' }}>
        <div className="mx-auto max-w-[1200px]">
          <p className="text-[#5DA3FF] text-[13px] font-display font-bold tracking-[0.08em] uppercase mb-8 flex items-center gap-[14px]">
            <span className="inline-block w-7 h-px bg-[#5DA3FF] opacity-60 flex-shrink-0" aria-hidden="true" />
            {page.eyebrow}
          </p>
          <h1
            className="font-display font-extrabold text-white leading-[1.02] tracking-[-0.035em]"
            style={{ fontWeight: 700, fontSize: 'clamp(40px, 4.6vw, 64px)', maxWidth: '20ch' }}
          >
            {page.h1}<br />
            <span className="text-[#5DA3FF]">{page.h1Accent}</span>
          </h1>
          <p className="text-white/60 leading-[1.55]" style={{ fontSize: '20px', maxWidth: '640px', marginTop: '32px' }}>
            {page.sub}
          </p>
          <div className="flex flex-col sm:flex-row items-start gap-4 mt-10">
            <Link
              href={page.ctaPrimary.href}
              className="inline-flex px-8 py-3.5 text-sm font-semibold bg-[#5DA3FF] text-primary rounded-xl hover:bg-[#7BB8FF] transition-colors"
            >
              {page.ctaPrimary.label}
            </Link>
            {page.ctaSecondary && (
              <Link
                href={page.ctaSecondary.href}
                className="inline-flex px-8 py-3.5 text-sm font-semibold text-white/70 border border-white/20 rounded-xl hover:bg-white/5 transition-colors"
              >
                {page.ctaSecondary.label}
              </Link>
            )}
          </div>
          <div className="mt-20">
            <HairlineRule color="rgba(255,255,255,.35)" />
          </div>
        </div>
      </section>

      {/* Probleem */}
      <section className="bg-white" style={{ padding: '96px 24px' }}>
        <div className="mx-auto max-w-[1200px]">
          <p className="text-[#5DA3FF] text-[13px] font-display font-bold tracking-[0.08em] uppercase mb-7 flex items-center gap-[14px]">
            <span className="inline-block w-7 h-px bg-[#5DA3FF] opacity-60 flex-shrink-0" aria-hidden="true" />
            {page.pain.eyebrow}
          </p>
          <h2
            className="font-display font-extrabold text-primary leading-[1.08] tracking-[-0.025em] mb-16"
            style={{ fontWeight: 600, fontSize: 'clamp(28px, 2.6vw, 34px)' }}
          >
            {page.pain.h2}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
            {page.pain.items.map((p) => (
              <div key={p.title} className="py-10 md:py-0 md:px-10 first:pl-0 last:pr-0">
                <h3 className="text-[17px] font-display font-bold text-primary mb-4 leading-tight">{p.title}</h3>
                <p className="text-[15px] text-muted leading-[1.6]">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Oplossing / werkwijze */}
      <section className="bg-surface" style={{ padding: '96px 24px' }}>
        <div className="mx-auto max-w-[1200px]">
          <p className="text-[#5DA3FF] text-[13px] font-display font-bold tracking-[0.08em] uppercase mb-7 flex items-center gap-[14px]">
            <span className="inline-block w-7 h-px bg-[#5DA3FF] opacity-60 flex-shrink-0" aria-hidden="true" />
            {page.solution.eyebrow}
          </p>
          <h2
            className="font-display font-extrabold text-primary leading-[1.08] tracking-[-0.025em] mb-6"
            style={{ fontWeight: 600, fontSize: 'clamp(28px, 2.6vw, 34px)' }}
          >
            {page.solution.h2}
          </h2>
          <p className="text-[17px] text-muted mb-16 max-w-[700px] leading-[1.55]">
            {page.solution.sub}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
            {page.solution.steps.map((s, i) => (
              <div key={s.title} className="bg-surface p-8">
                <p className="font-mono text-[11px] text-muted mb-4">0{i + 1}</p>
                <h3 className="text-[17px] font-display font-bold text-primary mb-3 leading-tight">{s.title}</h3>
                <p className="text-[14px] text-muted leading-[1.6]">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Zo ziet dat eruit: een echte opname uit de Desk. Staat bewust hier,
          direct na de werkwijze: eerst uitleggen hoe het werkt, dan laten zien.
          Deze pagina's zijn NL-only (canonical naar NL), vandaar de vaste taal. */}
      <DeskProof locale="nl" />

      {/* Lijstblok + CTA */}
      <section className="bg-primary" style={{ padding: '96px 24px' }}>
        <div className="mx-auto max-w-[1200px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            <div>
              <p className="text-[#5DA3FF] text-[13px] font-display font-bold tracking-[0.08em] uppercase mb-7 flex items-center gap-[14px]">
                <span className="inline-block w-7 h-px bg-[#5DA3FF] opacity-60 flex-shrink-0" aria-hidden="true" />
                {page.list.eyebrow}
              </p>
              <h2
                className="font-display font-extrabold text-white leading-[1.08] tracking-[-0.025em] mb-10"
                style={{ fontWeight: 600, fontSize: 'clamp(28px, 2.6vw, 34px)' }}
              >
                {page.list.h2}
              </h2>
              <ul className="space-y-0 border-t border-white/10">
                {page.list.items.map((item) => (
                  <li key={item} className="flex items-start gap-4 py-5 border-b border-white/10">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5DA3FF] flex-shrink-0 mt-[9px]" />
                    <span className="text-[15px] text-white/70 leading-[1.6]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:pt-[140px]">
              <p className="text-[#00D4A0] text-[13px] font-display font-bold tracking-[0.08em] uppercase mb-6">
                {page.ctaSlot.eyebrow}
              </p>
              <h3
                className="font-display font-extrabold text-white leading-[1.08] tracking-[-0.025em] mb-6"
                style={{ fontSize: 'clamp(24px, 3vw, 40px)' }}
              >
                {page.ctaSlot.h3}
              </h3>
              <p className="text-white/50 mb-8 leading-[1.6] text-[15px]">
                {page.ctaSlot.sub}
              </p>
              <Link
                href="/contact"
                className="inline-flex px-8 py-3.5 text-sm font-semibold bg-[#5DA3FF] text-primary rounded-xl hover:bg-[#7BB8FF] transition-colors"
              >
                {page.ctaSlot.btn}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white" style={{ padding: '96px 24px' }}>
        <div className="mx-auto max-w-[1200px]">
          <h2
            className="font-display font-extrabold text-primary leading-[1.08] tracking-[-0.025em] mb-12 text-center"
            style={{ fontWeight: 600, fontSize: 'clamp(28px, 2.6vw, 34px)' }}
          >
            Veelgestelde vragen
          </h2>
          <FAQAccordion faqs={page.faq} />
        </div>
      </section>

      {/* Interne links */}
      <section className="bg-surface" style={{ padding: '64px 24px' }}>
        <div className="mx-auto max-w-[1200px]">
          <p className="text-[13px] font-display font-bold tracking-[0.08em] uppercase text-muted mb-6">
            Lees verder
          </p>
          <div className="flex flex-wrap gap-3">
            {page.related.map((r) => (
              <Link
                key={r.href}
                href={r.href}
                className="inline-flex px-5 py-2.5 text-sm font-semibold text-primary bg-white border border-border rounded-xl hover:border-accent transition-colors"
              >
                {r.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
