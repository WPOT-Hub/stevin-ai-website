import Link from 'next/link'
import Image from 'next/image'
import Section from '@/components/Section'
import FAQAccordion from '@/components/FAQAccordion'
import HeroVideo from '@/components/HeroVideo'
import PricingTabs from '@/components/PricingTabs'
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
            {/* Left — Text (man wijst hierheen) */}
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
                Van advertenties en vindbaarheid tot website en automation. Alles werkt samen, zodat je ziet wat klanten oplevert.
              </p>

              <p className="mt-3 text-sm font-medium text-neon/70 lg:bg-transparent lg:backdrop-blur-none lg:px-0 lg:py-0 lg:rounded-none bg-[#0A1628]/70 backdrop-blur-sm inline-block px-3 py-1.5 rounded-lg">
                Vaste maandprijs. Geen verrassingen.
              </p>

              {/* CTA area with mobile video blob */}
              <div className="relative mt-7">
                {/* Mobile video — rechts naast CTA's, overlapt licht */}
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

            {/* Right — Video (man wijst naar links = naar CTA) */}
            <div className="hidden lg:flex justify-end">
              <HeroVideo />
            </div>
          </div>
        </div>
      </section>

      {/* ===== KPI BLOK ===== */}
      <Section bg="white">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
          {[
            {
              icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                </svg>
              ),
              title: 'Meer conversies',
              desc: 'Door betere aansluiting tussen kanalen',
            },
            {
              icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ),
              title: 'Lagere kosten per lead',
              desc: 'Door betere targeting en minder verspilling',
            },
            {
              icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
              ),
              title: 'Snellere opvolging',
              desc: 'Automation zorgt dat geen lead wordt gemist',
            },
          ].map((item) => (
            <div key={item.title} className="flex items-start gap-4 p-5 rounded-xl bg-surface border border-border">
              <div className="w-10 h-10 rounded-lg bg-accent/10 text-accent flex items-center justify-center flex-shrink-0">
                {item.icon}
              </div>
              <div>
                <h3 className="text-sm font-bold text-primary">{item.title}</h3>
                <p className="text-xs text-muted mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ===== PROBLEEM ===== */}
      <Section bg="surface">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <p className="text-sm font-semibold text-accent uppercase tracking-widest mb-3">Herkenbaar?</p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-primary leading-tight">
            Marketing kost tijd, geld en overzicht.
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {[
            { title: 'Campagnes werken los', icon: '🔀' },
            { title: 'Leads worden niet opgevolgd', icon: '⏳' },
            { title: 'Budget verdwijnt', icon: '💸' },
            { title: 'Geen inzicht in resultaat', icon: '🔍' },
          ].map((item) => (
            <div key={item.title} className="p-5 rounded-xl bg-white border border-border text-center">
              <span className="text-xl block mb-2">{item.icon}</span>
              <p className="text-sm font-semibold text-primary leading-snug">{item.title}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ===== OPLOSSING FLOW ===== */}
      <Section bg="white">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <p className="text-sm font-semibold text-accent uppercase tracking-widest mb-3">De aanpak</p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-primary leading-tight">
            Eén systeem. Vier stappen.
          </h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {[
            { step: '01', title: 'Aantrekken', icon: (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59" /></svg>
            )},
            { step: '02', title: 'Vastleggen', icon: (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" /></svg>
            )},
            { step: '03', title: 'Opvolgen', icon: (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>
            )},
            { step: '04', title: 'Verbeteren', icon: (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg>
            )},
          ].map((item) => (
            <div key={item.step} className="p-5 rounded-xl bg-surface border border-border text-center group hover:border-accent/20 transition-all">
              <div className="w-11 h-11 rounded-xl bg-accent/10 text-accent flex items-center justify-center mx-auto mb-3">
                {item.icon}
              </div>
              <span className="text-[10px] font-bold text-accent uppercase tracking-wider">{item.step}</span>
              <h3 className="text-sm font-bold text-primary mt-1">{item.title}</h3>
            </div>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-muted">
          Dit zijn geen losse diensten. Dit is <span className="font-semibold text-primary">één werkend systeem</span>.
        </p>
      </Section>

      {/* ===== HOE HET WERKT ===== */}
      <Section bg="white">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <p className="text-sm font-semibold text-accent uppercase tracking-widest mb-3">Hoe het werkt</p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-primary leading-tight">
            Drie stappen naar resultaat
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            {
              step: '01',
              title: 'Inrichten',
              desc: 'We brengen je situatie in kaart, richten alles in en zorgen dat je marketing klaarstaat om te presteren.',
            },
            {
              step: '02',
              title: 'Analyseren',
              desc: 'Data stroomt binnen. We zien wat werkt, wat niet, en waar de kansen liggen.',
            },
            {
              step: '03',
              title: 'Bijsturen',
              desc: 'We optimaliseren continu. Betere resultaten, lagere kosten, meer klanten.',
            },
          ].map((item) => (
            <div key={item.step} className="relative text-center">
              <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center mx-auto mb-4 text-base font-bold">
                {item.step}
              </div>
              <h3 className="text-lg font-bold text-primary mb-2">{item.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Flow diagram */}
        <div className="mt-10 flex items-center justify-center gap-3 sm:gap-4 flex-wrap">
          {['Data', 'Inzicht', 'Actie', 'Groei'].map((label, i) => (
            <div key={label} className="flex items-center gap-3 sm:gap-4">
              <span className="px-4 py-2 text-sm font-semibold text-primary bg-surface rounded-lg border border-border">{label}</span>
              {i < 3 && (
                <svg className="w-4 h-4 text-accent/40 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              )}
            </div>
          ))}
        </div>
      </Section>

      {/* ===== RESULTATEN ===== */}
      <section className="relative bg-[#0A1628] py-14 sm:py-18 lg:py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #3D8EFF 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }} />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <p className="text-sm font-semibold text-accent uppercase tracking-widest mb-3">Resultaten</p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight">
              Dit bereiken onze klanten.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              { number: 'Lagere CPL', label: 'Betere targeting verlaagt je kosten per lead' },
              { number: 'Snellere opvolging', label: 'Automation zorgt dat geen lead wordt gemist' },
              { number: 'Meer conversie', label: 'Betere aansluiting tussen kanalen en opvolging' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-lg sm:text-xl font-bold text-neon mb-1.5">{stat.number}</div>
                <p className="text-sm text-slate-400 leading-relaxed">{stat.label}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-xs text-slate-500">
            Dit zien we vaak in de eerste 90 dagen.
          </p>
        </div>
      </section>

      {/* ===== PRICING ===== */}
      <Section bg="white" id="pricing">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <p className="text-sm font-semibold text-accent uppercase tracking-widest mb-3">Transparante prijzen</p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-primary leading-tight">
            Vaste maandprijs. Geen verrassingen.
          </h2>
          <p className="mt-4 text-base text-muted leading-relaxed max-w-2xl mx-auto">
            Kies de dienst die past bij je situatie. Combineer voor maximaal resultaat.
          </p>
        </div>

        <PricingTabs />
      </Section>

      {/* ===== WAAROM STEVIN ===== */}
      <Section bg="surface">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <p className="text-sm font-semibold text-accent uppercase tracking-widest mb-3">Waarom Stevin</p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-primary leading-tight">
            Eén partner voor al je marketing.
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl mx-auto">
          {[
            { title: 'Senior team', desc: 'Geen junioren op je account. Ervaren marketeers die weten wat werkt.' },
            { title: 'Volledige funnel', desc: 'Van vindbaarheid tot klant. Geen losse onderdelen maar één werkende aanpak.' },
            { title: 'Transparant', desc: 'Je ziet wat er gebeurt, wat het kost en wat het oplevert. Altijd.' },
            { title: 'Vaste prijs', desc: 'Geen verrassingen. Geen marge op je mediabudget. Vaste maandprijs.' },
            { title: 'Focus op ROI', desc: 'Wij sturen op resultaat. Niet op klikken of bereik, maar op klanten.' },
            { title: 'Langetermijnpartner', desc: 'We investeren in een langere samenwerking. Zo bouwen we structureel op en worden resultaten steeds beter.' },
          ].map((item) => (
            <div key={item.title} className="p-6 rounded-2xl bg-white border border-border">
              <h3 className="text-base font-bold text-primary mb-2">{item.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ===== FAQ ===== */}
      <Section bg="white">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-primary">
            Veelgestelde vragen
          </h2>
        </div>
        <FAQAccordion faqs={homepageFaqs} />
      </Section>

      {/* ===== FINAL CTA ===== */}
      <section className="bg-surface py-14 sm:py-18 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl bg-[#0A1628] px-8 py-14 sm:px-16 sm:py-16 text-center overflow-hidden">
            <div className="absolute inset-0 opacity-[0.04]" style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, #3D8EFF 1px, transparent 0)',
              backgroundSize: '24px 24px',
            }} />
            <div className="relative">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white">
                Klaar om je marketing uit handen te geven?
              </h2>
              <p className="mt-4 text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
                Plan een gesprek en ontdek waar je groei laat liggen.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
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
              <p className="mt-4 text-sm text-slate-500">Geen verplichtingen</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
