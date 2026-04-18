import type { Metadata } from 'next'
import Link from 'next/link'
import DataRain from '@/components/DataRain'
import { Search, GitBranch, Database, Plug, Eye, Radar } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Stevin voor Retail & FMCG — Share of Search & Omnichannel Intelligence',
  description: 'Monitor je share of search, verbind online en offline data en meet de impact van campagnes op winkelbezoek. Stevin is gebouwd voor retail en FMCG marketing teams.',
}

const painPoints = [
  {
    title: 'Online en offline data zijn gescheiden',
    desc: 'Je online campagnedata en je offline verkoopdata leven in compleet verschillende systemen. Niemand heeft het totaalplaatje van de klantreis.',
  },
  {
    title: 'Geen zicht op share of search',
    desc: 'Je concurrent groeit in zoekvolume en je ziet het pas als het te laat is. Zonder share of search monitoring reageer je altijd achter de feiten aan.',
  },
  {
    title: 'Campagne-impact op winkelbezoek onmeetbaar',
    desc: 'Je investeert in online campagnes die offline verkoop moeten stimuleren, maar je kunt de impact niet meten. Budget-onderbouwing wordt gokken.',
  },
]

const features = [
  {
    title: 'Share of Search Monitoring',
    desc: 'Monitor continu je share of search versus concurrenten. Zie trends voordat ze in marktaandeel zichtbaar worden en anticipeer op verschuivingen.',
    icon: <Search className="w-5 h-5 text-accent" />,
  },
  {
    title: '220+ Integraties',
    desc: 'Native koppelingen met Google, Meta, retailmedia platforms, POS-systemen, Shopify en meer. Geen middleware, geen vertraging.',
    icon: <Plug className="w-5 h-5 text-accent" />,
  },
  {
    title: 'Cross-channel Attribution',
    desc: 'Verbind online campagnes met offline verkoop. Begrijp de werkelijke bijdrage van elk kanaal aan je totale omzet — online en in de winkel.',
    icon: <GitBranch className="w-5 h-5 text-accent" />,
  },
  {
    title: 'Feed Management',
    desc: 'Beheer en optimaliseer je productfeeds automatisch over alle retailmedia kanalen heen. Van Google Shopping tot retailer-specifieke feeds.',
    icon: <Database className="w-5 h-5 text-accent" />,
  },
  {
    title: 'Shelf Attention Analysis',
    desc: 'Analyseer hoe je producten presteren in digitale schappen. Van zoekpositie tot click-through rate per retailer en categorie.',
    icon: <Eye className="w-5 h-5 text-accent" />,
  },
  {
    title: 'Competitor Intelligence',
    desc: 'Volg de marketingactiviteiten van je concurrenten. Van ad spend-schattingen tot promotiekalenders en prijspositionering.',
    icon: <Radar className="w-5 h-5 text-accent" />,
  },
]

const audiences = [
  {
    title: 'Retail Chains',
    desc: 'Verbind je online marketing met je winkeldata. Meet welke campagnes klanten naar je filialen brengen en optimaliseer per regio.',
    link: null,
    linkText: null,
  },
  {
    title: 'FMCG Brands',
    desc: 'Monitor je share of search, volg concurrenten en meet de impact van je campagnes op sell-out — over alle retailers heen.',
    link: null,
    linkText: null,
  },
  {
    title: 'Supermarkten',
    desc: 'Van folder tot social ad — begrijp welke promoties werken, welke producten groeien in zoekvolume en waar je concurrent aan marktaandeel wint.',
    link: null,
    linkText: null,
  },
]

const useCases = [
  'Je online en offline data leven in gescheiden systemen',
  'Je hebt geen zicht op je share of search versus concurrenten',
  'Je kunt de impact van online campagnes op winkelbezoek niet meten',
  'Je beheert productfeeds handmatig over meerdere retailers',
  'Je wilt weten wat je concurrent doet voordat je het in marktaandeel ziet',
  'Je besteedt te veel tijd aan het combineren van data uit verschillende bronnen',
]

export default function RetailPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative bg-primary pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 hero-mesh-gradient opacity-50" />
        <DataRain variant="retail" />
        <div className="relative mx-auto max-w-7xl px-6 sm:px-8 text-center">
          <p className="text-[#5DA3FF] text-[13px] font-display font-bold tracking-[0.08em] uppercase mb-7 flex items-center gap-[14px]">
            <span className="inline-block w-7 h-px bg-[#5DA3FF] opacity-60 flex-shrink-0" aria-hidden="true" />
            VOOR RETAIL EN FMCG
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Van schap tot scherm.<br />
            <span className="text-[#5DA3FF]">Alles verbonden.</span>
          </h1>
          <p className="text-lg sm:text-xl text-white/60 max-w-3xl mx-auto leading-relaxed">
            Stevin verbindt je online en offline data, monitort je share of search en meet de impact van campagnes op winkelbezoek. Eén platform voor omnichannel retail marketing.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <Link href="/contact" className="inline-flex px-8 py-3.5 text-sm font-semibold bg-neon text-primary rounded-xl hover:bg-neon-dark transition-colors neon-glow">
              Plan een gesprek
            </Link>
            <Link href="/platform" className="inline-flex px-8 py-3.5 text-sm font-semibold text-white/80 border border-white/20 rounded-xl hover:bg-white/5 transition-colors">
              Bekijk het platform
            </Link>
          </div>
        </div>
      </section>

      {/* Pain points */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">Herkenbaar?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {painPoints.map((p) => (
              <div key={p.title} className="p-6 rounded-2xl bg-surface border border-border">
                <h3 className="text-sm font-bold text-primary mb-2">{p.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-surface">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-accent uppercase tracking-widest mb-3">Het platform</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">Alles wat je nodig hebt</h2>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              Stevin verbindt je volledige retail marketingstack — van online campagnes tot offline verkoop.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="rounded-2xl border border-border bg-white p-8 hover:shadow-lg hover:border-accent/20 transition-all">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  {f.icon}
                </div>
                <h3 className="text-lg font-bold text-primary mb-2">{f.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Audience segments */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">Voor elk type retail organisatie</h2>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              Het platform is hetzelfde. De toepassing verschilt.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {audiences.map((a) => (
              <div key={a.title} className="p-8 rounded-2xl border border-border bg-surface">
                <h3 className="text-lg font-bold text-primary mb-3">{a.title}</h3>
                <p className="text-sm text-muted leading-relaxed mb-4">{a.desc}</p>
                {a.link && (
                  <Link href={a.link} className="text-sm font-semibold text-accent hover:underline">
                    {a.linkText} &rarr;
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use cases + CTA */}
      <section className="py-20 bg-primary">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Stevin is voor jou als</h2>
              <ul className="space-y-4">
                {useCases.map((uc) => (
                  <li key={uc} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-neon flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-white/70">{uc}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-display font-extrabold text-white mb-4">Het is geen wonder. Het is <span className="text-[#5DA3FF]">Stevin</span>.</h3>
              <p className="text-white/50 mb-8 leading-relaxed">
                Van online scherm tot fysiek schap — één meetlat. Plan een gesprek en we laten zien hoe Stevin jouw retail marketing verbindt.
              </p>
              <Link
                href="/contact"
                className="inline-flex px-8 py-3.5 text-sm font-semibold bg-neon text-primary rounded-xl hover:bg-neon-dark transition-colors neon-glow"
              >
                Plan een gesprek
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
