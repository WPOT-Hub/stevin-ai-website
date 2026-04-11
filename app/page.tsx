import Link from 'next/link'
import Image from 'next/image'
import { Shuffle, Clock, DollarSign, Search, Brain, Radio, Moon, Plug, BarChart3, Zap, Building2, Music } from 'lucide-react'
import Section from '@/components/Section'
import FAQAccordion from '@/components/FAQAccordion'
import HeroVideo from '@/components/HeroVideo'
import StepsTimeline from '@/components/StepsTimeline'
import StickyMobileCTA from '@/components/StickyMobileCTA'
import { homepageFaqs } from '@/data/faqs'
import { nativeConnectors } from '@/data/connectors'

export default function HomePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Stevin',
    description: 'Stevin is het AI-platform dat agencies, artiesten en ondernemers helpt groeien door data om te zetten in actie.',
    url: 'https://stevin.ai',
    areaServed: 'NL',
    knowsAbout: ['Online Marketing', 'Marketing Automation', 'SEO', 'Paid Media', 'Analytics', 'Social Media Monitoring', 'Artist Management', 'PR & Communications'],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ===== HERO — Router ===== */}
      <section className="relative overflow-hidden hero-mesh-gradient -mt-[72px] pt-[calc(72px+2.5rem)] sm:pt-[calc(72px+3rem)] lg:pt-[calc(72px+4rem)] pb-12 lg:pb-20">
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }} />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Centered headline */}
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.1] mb-6">
              <Image src="/logos/icon-white.svg" alt="" width={16} height={16} />
              <span className="text-sm font-medium text-white/60">Data. Inzicht. Actie.</span>
            </div>

            <h1 className="text-[1.75rem] sm:text-4xl lg:text-[3.25rem] xl:text-[3.75rem] font-bold tracking-tight text-white leading-[1.1]">
              Heers over je data.<br />
              <span className="text-neon">Stop de ruis.</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg lg:text-xl text-white/45 max-w-2xl mx-auto leading-relaxed">
              170+ integraties, AI-gedreven rapportages en real-time monitoring. Eén platform dat al je kanalen verbindt en omzet in actie.
            </p>
          </div>

          {/* Router cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-10 max-w-4xl mx-auto">
            {/* Agency card */}
            <Link
              href="/voor-agencies"
              className="group relative rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:p-8 hover:bg-white/[0.08] hover:border-accent/30 transition-all duration-300"
            >
              <div className="w-11 h-11 rounded-xl bg-accent/15 flex items-center justify-center mb-4">
                <Building2 className="w-5 h-5 text-accent" />
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-neon transition-colors">Voor Agencies</h2>
              <p className="text-sm text-white/40 leading-relaxed mb-4">
                White-label dashboard, multi-client beheer en volume korting. Schaal je bureau zonder extra FTE.
              </p>
              <span className="inline-flex items-center text-sm font-semibold text-accent group-hover:text-neon transition-colors">
                Bekijk agency oplossing
                <svg className="ml-1.5 w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>

            {/* Artist / Influencer card */}
            <Link
              href="/voor-artiesten"
              className="group relative rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:p-8 hover:bg-white/[0.08] hover:border-accent/30 transition-all duration-300"
            >
              <div className="w-11 h-11 rounded-xl bg-accent/15 flex items-center justify-center mb-4">
                <Music className="w-5 h-5 text-accent" />
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-neon transition-colors">Voor Artiesten & Influencers</h2>
              <p className="text-sm text-white/40 leading-relaxed mb-4">
                Cross-channel monitoring, sentiment analyse en fan-bridge detectie. Van ruis naar signaal.
              </p>
              <span className="inline-flex items-center text-sm font-semibold text-accent group-hover:text-neon transition-colors">
                Bekijk artist oplossing
                <svg className="ml-1.5 w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          </div>

          {/* Universal CTA */}
          <div className="text-center mt-8">
            <Link
              href="/contact"
              className="neon-glow group inline-flex items-center px-8 py-4 text-base font-bold text-[#0A1628] bg-neon rounded-xl hover:bg-neon-dark transition-all duration-300"
            >
              Plan een gesprek
              <svg className="ml-2 w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <p className="mt-3 text-sm text-white/25">Geen verplichtingen. Binnen 30 min inzicht.</p>
          </div>
        </div>
      </section>

      {/* ===== SOCIAL PROOF — Connector bar ===== */}
      <div className="bg-white border-b border-border">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <p className="text-xs font-semibold text-muted uppercase tracking-widest text-center mb-5">170+ integraties — real-time gekoppeld</p>
          <div className="flex items-center justify-center gap-4 sm:gap-8 flex-wrap opacity-50">
            {nativeConnectors.map((c) => (
              <span key={c.slug} className="text-[10px] sm:text-xs font-bold text-slate-400 tracking-wide">{c.name}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ===== KPI BLOK ===== */}
      <Section bg="white">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-5 max-w-4xl mx-auto">
          {[
            {
              icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                </svg>
              ),
              title: 'Betere resultaten',
              desc: 'Alle data werkt samen, zodat je sneller groeit',
            },
            {
              icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ),
              title: 'Minder verspilling',
              desc: 'Weet precies waar je budget naartoe gaat',
            },
            {
              icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
              ),
              title: 'Direct inzicht',
              desc: 'Real-time data in plaats van achteraf rapportages',
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
            Data overal, inzicht nergens.
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
          {[
            { title: 'Kanalen werken los van elkaar', icon: <Shuffle className="w-5 h-5 text-accent" /> },
            { title: 'Signalen verdwijnen in de ruis', icon: <Clock className="w-5 h-5 text-accent" /> },
            { title: 'Budget verdwijnt zonder resultaat', icon: <DollarSign className="w-5 h-5 text-accent" /> },
            { title: 'Geen overzicht over alle data', icon: <Search className="w-5 h-5 text-accent" /> },
          ].map((item) => (
            <div key={item.title} className="p-4 sm:p-5 rounded-xl bg-white border border-border text-center">
              <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center mx-auto mb-2">
                {item.icon}
              </div>
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

      {/* ===== HET PLATFORM ===== */}
      <Section bg="white">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <p className="text-sm font-semibold text-accent uppercase tracking-widest mb-3">Het platform</p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-primary leading-tight">
            Alles verbonden in één systeem
          </h2>
          <p className="mt-4 text-base text-muted leading-relaxed max-w-2xl mx-auto">
            Stevin Hub verbindt je campagnes, CRM, tracking en opvolging. Stevin Desk geeft je overzicht.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {[
            { icon: <Brain className="w-5 h-5 text-accent" />, title: 'AI-gedreven analyses', desc: 'Wekelijkse rapporten, anomalie-alerts en optimalisatie-adviezen — volledig automatisch.' },
            { icon: <Radio className="w-5 h-5 text-accent" />, title: 'Lead generation', desc: 'Van anoniem websitebezoek naar gekwalificeerde pipeline. EU-compliant, zonder cookies.' },
            { icon: <Moon className="w-5 h-5 text-accent" />, title: '24/7 monitoring', desc: 'Elke nacht worden je campagnes, tracking en budgetten automatisch gecontroleerd.' },
            { icon: <Plug className="w-5 h-5 text-accent" />, title: '170+ integraties', desc: 'Van ads en analytics tot streaming, social en ticketing. Directe koppelingen, geen middleware.' },
            { icon: <BarChart3 className="w-5 h-5 text-accent" />, title: 'Eén dashboard', desc: 'Campagneprestaties, CRM-pipeline, content en rapportages op één plek.' },
            { icon: <Zap className="w-5 h-5 text-accent" />, title: 'Marketing automation', desc: 'E-mail flows, lead scoring en opvolging volledig geautomatiseerd.' },
          ].map((item) => (
            <div key={item.title} className="p-6 rounded-2xl bg-surface border border-border hover:shadow-md hover:border-accent/20 transition-all">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-3">
                {item.icon}
              </div>
              <h3 className="text-sm font-bold text-primary mb-1.5">{item.title}</h3>
              <p className="text-xs text-muted leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link
            href="/platform"
            className="inline-flex items-center text-sm font-semibold text-accent hover:text-accent-dark transition-colors"
          >
            Ontdek het volledige platform
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

      {/* ===== WAAROM STEVIN ===== */}
      <Section bg="white">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <p className="text-sm font-semibold text-accent uppercase tracking-widest mb-3">Waarom Stevin</p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-primary leading-tight">
            Eén platform. Alle kanalen. Totaal overzicht.
          </h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {[
            { title: 'Eigen platform', desc: 'Geen losse tools aan elkaar geknoopt. Eén geIntegreerd systeem gebouwd voor resultaat.' },
            { title: 'AI-gedreven', desc: 'Automatische rapporten, anomalie-detectie en optimalisatie. 24/7 actief.' },
            { title: 'Volledig transparant', desc: 'Eigen dashboard met real-time inzicht. Je ziet precies wat er gebeurt.' },
            { title: 'Vaste maandprijs', desc: 'Geen verrassingen. Geen marge op je advertentiebudget.' },
          ].map((item) => (
            <div key={item.title} className="p-5 rounded-2xl bg-surface border border-border">
              <h3 className="text-sm font-bold text-primary mb-1.5">{item.title}</h3>
              <p className="text-xs text-muted leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ===== CASE STUDY TEASER ===== */}
      <Section bg="white">
        <div className="max-w-4xl mx-auto">
          <Link href="/case-studies/e-commerce" className="group block rounded-2xl border border-border bg-surface p-8 sm:p-10 hover:shadow-lg hover:border-accent/20 transition-all">
            <div className="flex flex-col sm:flex-row sm:items-center gap-6">
              <div className="flex-1">
                <span className="inline-flex px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold mb-3">
                  Case Study
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-primary group-hover:text-accent transition-colors">
                  Van losse campagnes naar een geIntegreerd marketing systeem
                </h3>
                <p className="text-sm text-muted mt-2">
                  Hoe een snelgroeiend e-commerce bedrijf 42% meer leads genereerde en 8 uur per week bespaarde.
                </p>
              </div>
              <div className="flex gap-6 sm:gap-8 flex-shrink-0">
                <div className="text-center">
                  <p className="text-2xl sm:text-3xl font-bold text-accent">+42%</p>
                  <p className="text-[11px] text-muted">meer leads</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl sm:text-3xl font-bold text-accent">-35%</p>
                  <p className="text-[11px] text-muted">lagere CPA</p>
                </div>
              </div>
            </div>
          </Link>
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
                Klaar om de ruis te stoppen?
              </h2>
              <p className="mt-3 text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
                Plan een gesprek en ontdek hoe Stevin jouw data omzet in actie.
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
                  href="/platform"
                  className="inline-flex items-center px-8 py-4 text-base font-semibold text-white/80 bg-white/[0.06] rounded-xl border border-white/[0.1] hover:bg-white/[0.1] transition-all duration-200"
                >
                  Bekijk het platform
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
