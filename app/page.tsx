import Link from 'next/link'
import Image from 'next/image'
import { Database, Cpu, Zap, RefreshCw, Building2, Music } from 'lucide-react'
import Section from '@/components/Section'
import FAQAccordion from '@/components/FAQAccordion'
import StickyMobileCTA from '@/components/StickyMobileCTA'
import { homepageFaqs } from '@/data/faqs'
import { nativeConnectors } from '@/data/connectors'

export default function HomePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Stevin',
    description: 'Stevin is het AI-platform dat agencies, promotoren en artiesten helpt groeien door data om te zetten in actie.',
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
      <section className="relative overflow-hidden bg-primary -mt-[72px] pt-[calc(72px+2.5rem)] sm:pt-[calc(72px+3rem)] lg:pt-[calc(72px+4rem)] pb-12 lg:pb-20">
        {/* Background texture */}
        <div className="absolute inset-0 hero-mesh-gradient opacity-50" />
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
              Stevin is de intelligente datalaag die versnipperde signalen omzet in concrete actie. Voor agencies, inhouse teams, promotoren en artiesten.
            </p>
          </div>

          {/* Router cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-10 max-w-4xl mx-auto">
            {/* Agency card — Blue accent */}
            <Link
              href="/marketing"
              className="group relative rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm p-6 sm:p-8 hover:bg-white/[0.08] hover:border-accent/40 transition-all duration-300"
            >
              <div className="w-11 h-11 rounded-xl bg-accent/15 flex items-center justify-center mb-4 group-hover:bg-accent/25 transition-colors">
                <Building2 className="w-5 h-5 text-accent" />
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-accent transition-colors">Stevin voor Marketing</h2>
              <p className="text-sm text-white/40 leading-relaxed mb-5">
                Krijg grip op ROAS, elimineer verspilling en scan de markt. Of je nu een bureau runt, een inhouse team aanstuurt of events plant — beheer alles vanuit een centraal systeem.
              </p>
              <span className="inline-flex items-center px-5 py-2.5 rounded-lg text-sm font-semibold bg-accent/10 text-accent group-hover:bg-accent/20 transition-colors">
                Ontdek de oplossing
                <svg className="ml-1.5 w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>

            {/* Artist card — Pink accent */}
            <Link
              href="/artiesten"
              className="group relative rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm p-6 sm:p-8 hover:bg-white/[0.08] hover:border-pink/40 transition-all duration-300"
            >
              <div className="w-11 h-11 rounded-xl bg-pink/15 flex items-center justify-center mb-4 group-hover:bg-pink/25 transition-colors">
                <Music className="w-5 h-5 text-pink" />
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-pink transition-colors">Stevin voor Artiesten</h2>
              <p className="text-sm text-white/40 leading-relaxed mb-5">
                Zet online hype om in momentum. Filter de ruis uit duizenden comments en reageer direct op de signalen die ertoe doen.
              </p>
              <span className="inline-flex items-center px-5 py-2.5 rounded-lg text-sm font-semibold bg-pink/10 text-pink group-hover:bg-pink/20 transition-colors">
                Ontdek de oplossing
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
            <p className="mt-3 text-sm text-white/25">Geen verplichtingen</p>
          </div>
        </div>
      </section>

      {/* ===== CONNECTOR BAR ===== */}
      <div className="bg-white border-b border-border">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <p className="text-xs font-semibold text-muted uppercase tracking-widest text-center mb-5">Gekoppeld aan 220+ databronnen in real-time</p>
          <div className="flex items-center justify-center gap-4 sm:gap-8 flex-wrap opacity-50">
            {nativeConnectors.map((c) => (
              <span key={c.slug} className="text-[10px] sm:text-xs font-bold text-slate-400 tracking-wide">{c.name}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ===== HET PROBLEEM ===== */}
      <Section bg="surface">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-primary leading-tight">
            Je mist de data die er echt toe doet.
          </h2>
          <p className="mt-4 text-base text-muted leading-relaxed max-w-2xl mx-auto">
            Je accounts en kanalen genereren duizenden datapunten per minuut. Maar zonder context is al die data slechts ruis.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {[
            {
              title: 'Versnipperde kanalen',
              desc: 'De waarheid ligt verspreid over social media, advertentieplatforms en e-commerce systemen. Koppel je ze niet, dan stuur je blind.',
            },
            {
              title: 'Reactief in plaats van proactief',
              desc: 'Dashboards vertellen je wat er gisteren is gebeurd. Ze waarschuwen je niet voor de kansen of lekken van vandaag.',
            },
            {
              title: 'Tijdverlies aan handwerk',
              desc: 'Uren per week weggooien aan het doorspitten van comments, statistieken en budgetten. Tijd die naar strategie of creatie moet gaan.',
            },
          ].map((item) => (
            <div key={item.title} className="p-6 rounded-2xl bg-white border border-border">
              <h3 className="text-sm font-bold text-primary mb-2">{item.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ===== DE ENGINE — Centraliseer → Analyseer → Activeer ===== */}
      <section className="py-16 sm:py-20 bg-primary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <p className="text-sm font-semibold text-accent uppercase tracking-widest mb-3">Hoe Stevin de ruis filtert</p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight">
              Eén systeem. Complete controle.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              {
                icon: <Database className="w-5 h-5 text-accent" />,
                step: '01',
                title: 'Centraliseer',
                desc: 'Koppel je volledige digitale ecosysteem. Stevin trekt alle ruwe data realtime samen in één overzicht.',
              },
              {
                icon: <Cpu className="w-5 h-5 text-accent" />,
                step: '02',
                title: 'Analyseer',
                desc: 'Onze AI scant 24/7 op afwijkingen. Van een kelderende conversie tot een plotselinge piek in organisch momentum.',
              },
              {
                icon: <Zap className="w-5 h-5 text-neon" />,
                step: '03',
                title: 'Activeer',
                desc: 'Geen passieve grafieken. Stevin levert concrete actiepunten zodat je weet wat je nu moet doen.',
              },
              {
                icon: <RefreshCw className="w-5 h-5 text-neon" />,
                step: '04',
                title: 'Verbeter',
                desc: 'Het platform leert van elke interactie. Rapportages, adviezen en content passen zich aan op jouw tone of voice en die van je klant.',
              },
            ].map((item) => (
              <div key={item.title} className="relative p-6 sm:p-8 rounded-2xl border border-white/10 bg-white/[0.03]">
                <span className="text-xs font-bold text-accent/40 tracking-widest">{item.step}</span>
                <div className="w-10 h-10 rounded-lg bg-white/[0.06] flex items-center justify-center mt-3 mb-4">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-white/45 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== BEWEZEN RESULTAAT ===== */}
      <Section bg="white">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl border border-border bg-surface p-8 sm:p-12">
            <div className="flex flex-col sm:flex-row sm:items-center gap-8">
              <div className="flex-1">
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-primary leading-tight">
                  Ontworpen voor schaal.
                </h2>
                <p className="mt-4 text-base text-muted leading-relaxed">
                  Of je nu tientallen ad-accounts beheert voor klanten, of de cross-channel interacties van miljoenen fans monitort: Stevin schaalt mee. Minder tijd kwijt aan het zoeken naar data, volledige focus op het resultaat.
                </p>
              </div>
              <div className="flex gap-8 sm:gap-10 flex-shrink-0">
                <div className="text-center">
                  <p className="text-3xl sm:text-4xl font-bold text-neon">-35%</p>
                  <p className="text-xs text-muted mt-1 max-w-[100px]">Minder budgetverspilling</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl sm:text-4xl font-bold text-accent">220+</p>
                  <p className="text-xs text-muted mt-1 max-w-[100px]">Native integraties out-of-the-box</p>
                </div>
              </div>
            </div>
          </div>
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

      {/* ===== FINAL CTA — Kies jouw domein ===== */}
      <section className="bg-white py-10 sm:py-14 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl bg-[#0A1628] px-8 py-12 sm:px-16 sm:py-14 text-center overflow-hidden">
            <div className="absolute inset-0 opacity-[0.04]" style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, #3D8EFF 1px, transparent 0)',
              backgroundSize: '24px 24px',
            }} />
            <div className="relative">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white">
                Klaar om te beginnen?
              </h2>
              <p className="mt-3 text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
                Stop de ruis. Pak de controle terug. Kies waar je wilt starten.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/marketing"
                  className="inline-flex items-center px-8 py-4 text-base font-bold text-white bg-accent rounded-xl hover:bg-accent-dark transition-all duration-200 shadow-lg shadow-accent/20"
                >
                  Voor Marketing
                </Link>
                <Link
                  href="/artiesten"
                  className="inline-flex items-center px-8 py-4 text-base font-bold text-white bg-pink rounded-xl hover:bg-pink-dark transition-all duration-200 shadow-lg shadow-pink/20"
                >
                  Voor Artiesten
                </Link>
              </div>
              <p className="mt-5">
                <Link href="/contact" className="text-sm text-slate-400 hover:text-white transition-colors underline underline-offset-4">
                  Of plan direct een gesprek
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky mobile CTA */}
      <StickyMobileCTA />
    </>
  )
}
