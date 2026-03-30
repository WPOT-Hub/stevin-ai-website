import Link from 'next/link'
import Image from 'next/image'
import Section from '@/components/Section'
import FAQAccordion from '@/components/FAQAccordion'
import HeroVideo from '@/components/HeroVideo'
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center">
            {/* Left — Text (man wijst hierheen) */}
            <div>
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

      {/* ===== PROBLEEM ===== */}
      <Section bg="white">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-sm font-semibold text-accent uppercase tracking-widest mb-4">Herkenbaar?</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-primary leading-tight">
            Marketing kost tijd, geld en overzicht.
          </h2>
          <p className="mt-5 text-lg text-muted leading-relaxed max-w-2xl mx-auto">
            Je marketing zit verspreid. Het kost meer dan het oplevert. En je hebt geen idee waar het fout gaat.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            {
              icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6z" />
                </svg>
              ),
              title: 'Verspreid',
              text: 'Ads hier, website daar, e-mail ergens anders. Alles staat los van elkaar.',
            },
            {
              icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                </svg>
              ),
              title: 'Duur',
              text: 'Je investeert, maar weet niet wat het oplevert. Budget verdwijnt zonder resultaat.',
            },
            {
              icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                </svg>
              ),
              title: 'Onduidelijk',
              text: 'Geen overzicht. Je weet niet waar het fout gaat of wat je moet verbeteren.',
            },
          ].map((item) => (
            <div key={item.title} className="p-7 rounded-2xl bg-surface border border-border text-center">
              <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center mx-auto mb-4">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold text-primary mb-2">{item.title}</h3>
              <p className="text-[15px] text-muted leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ===== OPLOSSING ===== */}
      <Section bg="surface">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-sm font-semibold text-accent uppercase tracking-widest mb-4">De oplossing</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-primary leading-tight">
            Stevin brengt alles samen in één aanpak.
          </h2>
          <p className="mt-5 text-lg text-muted leading-relaxed max-w-2xl mx-auto">
            Wij zorgen dat je zichtbaar bent, campagnes draaien, je website converteert, leads worden opgevolgd en je stuurt op resultaat.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 max-w-5xl mx-auto">
          {[
            { icon: '📣', title: 'Advertenties', desc: 'Gericht verkeer via de juiste kanalen' },
            { icon: '🔍', title: 'Vindbaarheid', desc: 'SEO en AI-vindbaarheid verbeteren' },
            { icon: '🖥️', title: 'Website & conversie', desc: 'Bezoekers omzetten in leads' },
            { icon: '⚙️', title: 'Automation', desc: 'Leads automatisch opvolgen' },
            { icon: '📊', title: 'Rapportage & sturing', desc: 'Inzicht in wat werkt en bijsturen' },
          ].map((item) => (
            <div key={item.title} className="p-6 rounded-2xl bg-white border border-border text-center hover:border-accent/20 hover:shadow-md transition-all duration-300">
              <span className="text-2xl block mb-3">{item.icon}</span>
              <h3 className="text-sm font-bold text-primary mb-1">{item.title}</h3>
              <p className="text-xs text-muted leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
        <p className="mt-10 text-center text-base text-muted">
          Van vindbaarheid tot klant en opvolging — als <span className="font-semibold text-primary">één werkend systeem</span>.
        </p>
      </Section>

      {/* ===== HOE HET WERKT ===== */}
      <Section bg="white">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-sm font-semibold text-accent uppercase tracking-widest mb-4">Hoe het werkt</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-primary leading-tight">
            Drie stappen naar resultaat
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
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
              <div className="w-14 h-14 rounded-2xl bg-accent/10 text-accent flex items-center justify-center mx-auto mb-5 text-lg font-bold">
                {item.step}
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">{item.title}</h3>
              <p className="text-[15px] text-muted leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Flow diagram */}
        <div className="mt-16 flex items-center justify-center gap-3 sm:gap-5 flex-wrap">
          {['Data', 'Inzicht', 'Actie', 'Groei'].map((label, i) => (
            <div key={label} className="flex items-center gap-3 sm:gap-5">
              <span className="px-5 py-2.5 text-sm font-semibold text-primary bg-surface rounded-lg border border-border">{label}</span>
              {i < 3 && (
                <svg className="w-5 h-5 text-accent/40 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              )}
            </div>
          ))}
        </div>
      </Section>

      {/* ===== RESULTATEN ===== */}
      <section className="relative bg-[#0A1628] py-20 sm:py-28 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #3D8EFF 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }} />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <p className="text-sm font-semibold text-accent uppercase tracking-widest mb-4">Resultaten</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              Dit bereiken onze klanten.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {[
              { number: '+83%', label: 'Omzetgroei' },
              { number: '2x', label: 'ROAS verdubbeld' },
              { number: '+300%', label: 'Meer leads' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl sm:text-5xl font-bold text-neon mb-2">{stat.number}</div>
                <p className="text-sm text-slate-400 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
          <p className="mt-12 text-center text-sm text-slate-500">
            Gemiddelde resultaten van klanten na 3 maanden samenwerking.
          </p>
        </div>
      </section>

      {/* ===== PRICING ===== */}
      <Section bg="white" id="pricing">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-sm font-semibold text-accent uppercase tracking-widest mb-4">Geen verborgen kosten</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-primary leading-tight">
            Transparante pakketten. Vaste maandprijs.
          </h2>
          <p className="mt-5 text-lg text-muted leading-relaxed max-w-2xl mx-auto">
            Geen verrassingen. Wel resultaat. Kies het pakket dat past bij je fase.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            {
              name: 'Groei',
              price: '850',
              desc: 'Voor zichtbaarheid en eerste leads',
              features: ['Gerichte campagnes', 'SEO basis', 'Maandelijkse optimalisatie', 'Rapportage & dashboard'],
              popular: false,
            },
            {
              name: 'Versnellen',
              price: '1.400',
              desc: 'Voor actieve groei',
              features: ['Alles uit Groei', 'Uitgebreide campagnes', 'Website optimalisatie', 'Basis automation'],
              popular: true,
            },
            {
              name: 'Schalen',
              price: '1.850',
              desc: 'Voor volledige funnel',
              features: ['Alles uit Versnellen', 'Uitgebreide automation', 'Conversie optimalisatie', 'Diepere analyse & sturing'],
              popular: false,
            },
          ].map((pkg) => (
            <div key={pkg.name} className={`relative p-8 rounded-2xl border transition-all ${
              pkg.popular
                ? 'bg-[#0A1628] border-accent/30 shadow-xl shadow-accent/10 scale-[1.02]'
                : 'bg-white border-border hover:border-accent/20 hover:shadow-lg'
            }`}>
              {pkg.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-accent text-white text-xs font-bold">
                  Populairste keuze
                </div>
              )}
              <h3 className={`text-xl font-bold mb-1 ${pkg.popular ? 'text-white' : 'text-primary'}`}>{pkg.name}</h3>
              <p className={`text-sm mb-5 ${pkg.popular ? 'text-slate-400' : 'text-muted'}`}>{pkg.desc}</p>
              <div className="mb-6">
                <span className={`text-4xl font-bold ${pkg.popular ? 'text-white' : 'text-primary'}`}>€{pkg.price}</span>
                <span className={`text-sm ml-1 ${pkg.popular ? 'text-slate-400' : 'text-muted'}`}>p/m</span>
              </div>
              <ul className="space-y-3 mb-8">
                {pkg.features.map((feature) => (
                  <li key={feature} className={`flex items-start gap-2.5 text-sm ${pkg.popular ? 'text-slate-300' : 'text-muted'}`}>
                    <svg className={`w-4 h-4 mt-0.5 flex-shrink-0 ${pkg.popular ? 'text-neon' : 'text-accent'}`} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className={`block w-full text-center py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  pkg.popular
                    ? 'bg-neon text-[#0A1628] hover:bg-neon-dark neon-glow'
                    : 'bg-surface text-primary border border-border hover:border-accent/30 hover:shadow-md'
                }`}
              >
                Plan een gesprek
              </Link>
            </div>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-muted">
          Minimaal 12 maanden. Vaste maandprijs. Geen verborgen kosten.
        </p>
      </Section>

      {/* ===== WAAROM STEVIN ===== */}
      <Section bg="surface">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-sm font-semibold text-accent uppercase tracking-widest mb-4">Waarom Stevin</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-primary leading-tight">
            Eén partner voor al je marketing.
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            { title: 'Senior team', desc: 'Geen junioren op je account. Ervaren marketeers die weten wat werkt.' },
            { title: 'Volledige funnel', desc: 'Van vindbaarheid tot klant. Geen losse onderdelen maar één werkende aanpak.' },
            { title: 'Transparant', desc: 'Je ziet wat er gebeurt, wat het kost en wat het oplevert. Altijd.' },
            { title: 'Vaste prijs', desc: 'Geen verrassingen. Geen marge op je mediabudget. Vaste maandprijs.' },
            { title: 'Focus op ROI', desc: 'Wij sturen op resultaat. Niet op klikken of bereik, maar op klanten.' },
            { title: 'Langetermijnpartner', desc: 'We bouwen structureel op. Minimaal 12 maanden, zodat resultaten echt beklijven.' },
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
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-primary">
            Veelgestelde vragen
          </h2>
        </div>
        <FAQAccordion faqs={homepageFaqs} />
      </Section>

      {/* ===== FINAL CTA ===== */}
      <section className="bg-surface py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl bg-[#0A1628] px-8 py-16 sm:px-16 sm:py-20 text-center overflow-hidden">
            <div className="absolute inset-0 opacity-[0.04]" style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, #3D8EFF 1px, transparent 0)',
              backgroundSize: '24px 24px',
            }} />
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                Klaar om je marketing uit handen te geven?
              </h2>
              <p className="mt-5 text-lg text-slate-300 max-w-xl mx-auto leading-relaxed">
                Plan een gesprek en ontdek waar je groei laat liggen.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
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
