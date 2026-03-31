import Link from 'next/link'
import Image from 'next/image'
import Section from '@/components/Section'
import FAQAccordion from '@/components/FAQAccordion'
import HeroVideo from '@/components/HeroVideo'
import PricingTabs from '@/components/PricingTabs'
import StepsTimeline from '@/components/StepsTimeline'
import StickyMobileCTA from '@/components/StickyMobileCTA'
import { homepageFaqs } from '@/data/faqs'

export default function HomePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Stevin',
    description: 'Stevin helpt MKB-bedrijven groeien door hun volledige marketing over te nemen en te sturen op resultaat.',
    url: 'https://stevin.ai',
    areaServed: 'NL',
    knowsAbout: ['Online Marketing', 'Marketing Automation', 'SEO', 'Paid Media', 'Analytics'],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden hero-mesh-gradient -mt-[72px] pt-[calc(72px+2.5rem)] sm:pt-[calc(72px+3rem)] lg:pt-[calc(72px+4rem)] pb-10 sm:pb-14 lg:pb-16">
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }} />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 lg:gap-6 items-center">
            {/* Left — Text */}
            <div className="max-w-lg">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.1] mb-5">
                <Image src="/logos/icon-white.svg" alt="" width={16} height={16} />
                <span className="text-sm font-medium text-white/60">Marketing. Inzicht. Resultaat.</span>
              </div>

              <h1 className="text-[2rem] sm:text-4xl lg:text-5xl xl:text-[3.5rem] font-bold tracking-tight text-white leading-[1.1]">
                Jij focust op je business.
              </h1>
              <p className="mt-2 text-[1.35rem] sm:text-2xl lg:text-[1.75rem] font-light tracking-tight text-white/55 leading-[1.2]">
                Wij regelen je marketing en sturen op resultaat.
              </p>

              <p className="mt-5 text-[15px] sm:text-base text-white/35 max-w-md leading-relaxed">
                Google Ads, je website, social media en automatische opvolging. Wij zorgen dat alles samenwerkt.
              </p>

              <p className="mt-3 text-sm font-medium text-neon/70 lg:bg-transparent lg:backdrop-blur-none lg:px-0 lg:py-0 lg:rounded-none bg-[#0A1628]/70 backdrop-blur-sm inline-block px-3 py-1.5 rounded-lg">
                Vaste maandprijs. Geen verrassingen.
              </p>

              {/* CTA area with mobile video blob */}
              <div className="relative mt-7">
                {/* Mobile video */}
                <div className="lg:hidden absolute right-4 -top-20 w-[240px] h-[240px] sm:right-0 sm:w-[260px] sm:h-[260px] opacity-40 z-0 pointer-events-none">
                  <HeroVideo />
                </div>

                <div className="relative z-10 flex flex-col sm:flex-row items-start gap-3">
                  <Link
                    href="/contact"
                    className="neon-glow group inline-flex items-center px-7 py-3.5 text-[15px] font-bold text-[#0A1628] bg-neon rounded-xl hover:bg-neon-dark transition-all duration-300"
                  >
                    Plan een gesprek
                    <svg className="ml-2 w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                  <Link
                    href="/werkwijze"
                    className="inline-flex items-center px-7 py-3.5 text-[15px] font-semibold text-white/80 bg-white/[0.06] rounded-xl border border-white/[0.1] hover:bg-white/[0.1] transition-all duration-200"
                  >
                    Bekijk hoe het werkt
                  </Link>
                </div>

                <p className="relative z-10 mt-3 text-xs text-white/40 bg-[#0A1628]/70 backdrop-blur-sm inline-block px-3 py-1.5 rounded-lg lg:bg-transparent lg:backdrop-blur-none lg:px-0 lg:py-0 lg:rounded-none lg:text-white/20">
                  Binnen 30 min inzicht in waar je groei laat liggen. Geen verplichtingen.
                </p>
              </div>
            </div>

            {/* Right — Video */}
            <div className="hidden lg:flex justify-end">
              <HeroVideo />
            </div>
          </div>
        </div>
      </section>

      {/* ===== SOCIAL PROOF — Logo bar ===== */}
      <div className="bg-white border-b border-border">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <p className="text-xs font-semibold text-muted uppercase tracking-widest text-center mb-5">Wij werken onder andere met</p>
          <div className="flex items-center justify-center gap-8 sm:gap-12 flex-wrap opacity-40 grayscale">
            {['Google Ads', 'Meta', 'HubSpot', 'Shopify', 'Mailchimp'].map((name) => (
              <span key={name} className="text-sm font-bold text-slate-400 tracking-wide">{name}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ===== KPI BLOK ===== */}
      <Section bg="white">
        <div className="grid grid-cols-3 gap-3 sm:gap-5 max-w-4xl mx-auto">
          {[
            {
              icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                </svg>
              ),
              title: 'Meer klanten',
              desc: 'Alles werkt samen, dus je haalt meer uit je budget',
            },
            {
              icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ),
              title: 'Lagere kosten per aanvraag',
              desc: 'Betere targeting, minder verspilling',
            },
            {
              icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
              ),
              title: 'Snellere opvolging',
              desc: 'Geen aanvraag wordt gemist',
            },
          ].map((item) => (
            <div key={item.title} className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 rounded-xl bg-surface border border-border">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-accent/10 text-accent flex items-center justify-center flex-shrink-0">
                {item.icon}
              </div>
              <div className="min-w-0">
                <h3 className="text-xs sm:text-sm font-bold text-primary leading-tight">{item.title}</h3>
                <p className="text-[11px] sm:text-xs text-muted mt-0.5 leading-snug">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ===== PROBLEEM ===== */}
      <Section bg="surface">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <p className="text-sm font-semibold text-accent uppercase tracking-widest mb-3">Herkenbaar?</p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-primary leading-tight">
            Marketing kost tijd, geld en overzicht.
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
          {[
            { title: 'Campagnes werken los van elkaar', icon: '🔀' },
            { title: 'Aanvragen worden niet opgevolgd', icon: '⏳' },
            { title: 'Budget verdwijnt zonder resultaat', icon: '💸' },
            { title: 'Geen inzicht in wat werkt', icon: '🔍' },
          ].map((item) => (
            <div key={item.title} className="p-4 sm:p-5 rounded-xl bg-white border border-border text-center">
              <span className="text-lg sm:text-xl block mb-2">{item.icon}</span>
              <p className="text-xs sm:text-sm font-semibold text-primary leading-snug">{item.title}</p>
            </div>
          ))}
        </div>

        {/* Inline CTA after problem */}
        <div className="mt-8 text-center">
          <Link
            href="/contact"
            className="inline-flex items-center text-sm font-semibold text-accent hover:text-accent-dark transition-colors"
          >
            Herkenbaar? Plan een vrijblijvend gesprek
            <svg className="ml-1.5 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </Section>

      {/* ===== HOE HET WERKT — Animated Timeline ===== */}
      <Section bg="white">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <p className="text-sm font-semibold text-accent uppercase tracking-widest mb-3">Zo werken we samen</p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-primary leading-tight">
            Drie stappen naar resultaat
          </h2>
        </div>
        <StepsTimeline />
      </Section>

      {/* ===== PRICING ===== */}
      <Section bg="surface" id="pricing">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <p className="text-sm font-semibold text-accent uppercase tracking-widest mb-3">Transparante prijzen</p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-primary leading-tight">
            Wat kost het?
          </h2>
          <p className="mt-4 text-base text-muted leading-relaxed max-w-2xl mx-auto">
            Kies de dienst die past bij je situatie. Combineer voor meer resultaat.
          </p>
        </div>

        <PricingTabs />
      </Section>

      {/* ===== WAAROM STEVIN ===== */}
      <Section bg="white">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <p className="text-sm font-semibold text-accent uppercase tracking-widest mb-3">Waarom Stevin</p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-primary leading-tight">
            Eén partner voor al je marketing.
          </h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {[
            { title: 'Ervaren team', desc: 'Geen junioren op je account. Specialisten die weten wat werkt.' },
            { title: 'Van bezoeker tot klant', desc: 'Alles hangt samen. Geen losse onderdelen maar één werkende aanpak.' },
            { title: 'Volledig transparant', desc: 'Je ziet wat er gebeurt, wat het kost en wat het oplevert.' },
            { title: 'Vaste maandprijs', desc: 'Geen verrassingen. Geen toeslag op je advertentiebudget.' },
          ].map((item) => (
            <div key={item.title} className="p-5 rounded-2xl bg-surface border border-border">
              <h3 className="text-sm font-bold text-primary mb-1.5">{item.title}</h3>
              <p className="text-xs text-muted leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ===== FAQ ===== */}
      <Section bg="surface">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-primary">
            Veelgestelde vragen
          </h2>
        </div>
        <FAQAccordion faqs={homepageFaqs} />
      </Section>

      {/* ===== FINAL CTA ===== */}
      <section className="bg-white py-10 sm:py-14 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl bg-[#0A1628] px-8 py-12 sm:px-16 sm:py-14 text-center overflow-hidden">
            <div className="absolute inset-0 opacity-[0.04]" style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, #3D8EFF 1px, transparent 0)',
              backgroundSize: '24px 24px',
            }} />
            <div className="relative">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white">
                Klaar om je marketing uit handen te geven?
              </h2>
              <p className="mt-3 text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
                Plan een gesprek en ontdek waar je groei laat liggen.
              </p>
              <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="neon-glow group inline-flex items-center px-8 py-4 text-base font-bold text-[#0A1628] bg-neon rounded-xl hover:bg-neon-dark transition-all duration-300"
                >
                  Plan een gesprek
                  <svg className="ml-2 w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link
                  href="#pricing"
                  className="inline-flex items-center px-8 py-4 text-base font-semibold text-white/80 bg-white/[0.06] rounded-xl border border-white/[0.1] hover:bg-white/[0.1] transition-all duration-200"
                >
                  Bekijk pakketten
                </Link>
              </div>
              <p className="mt-3 text-sm text-slate-500">Geen verplichtingen</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky mobile CTA */}
      <StickyMobileCTA />
    </>
  )
}
