import type { Metadata } from 'next'
import Link from 'next/link'
import DataRain from '@/components/DataRain'
import { Server, Database, Users, Plug, Bell, FileText } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Stevin voor E-commerce — Server-side Tracking & CLV Attribution',
  description: 'Los iOS-tracking op met server-side tracking, automatiseer je productfeed en begrijp de werkelijke customer lifetime value. Stevin is gebouwd voor webshops en DTC-merken.',
}

const painPoints = [
  {
    title: 'ROAS is onbetrouwbaar door iOS',
    desc: 'iOS-privacy updates hebben je tracking kapotgemaakt. Je ziet niet meer welke campagnes echt converteren en je ROAS-cijfers kloppen niet meer.',
  },
  {
    title: 'Productfeed management is handmatig',
    desc: 'Je beheert feeds handmatig of met fragiele scripts. Prijswijzigingen, voorraadmutaties en nieuwe producten worden te laat of fout doorgezet.',
  },
  {
    title: 'Geen zicht op customer lifetime value',
    desc: 'Je optimaliseert op first-purchase ROAS terwijl je echte winst in herhaalaankopen zit. Zonder CLV-data investeer je in de verkeerde klanten.',
  },
]

const features = [
  {
    title: 'Server-side Tracking',
    desc: 'Bypass iOS-beperkingen met server-side tracking. Betrouwbare conversiedata, onafhankelijk van browser-restricties en ad blockers.',
    icon: <Server className="w-5 h-5 text-accent" />,
  },
  {
    title: '220+ Integraties',
    desc: 'Native koppelingen met Shopify, WooCommerce, Magento, Google Ads, Meta, Klaviyo, Criteo en meer. Geen middleware, geen vertraging.',
    icon: <Plug className="w-5 h-5 text-accent" />,
  },
  {
    title: 'Feed Intelligence',
    desc: 'Automatische feed-optimalisatie op basis van performance-data. Titels, beschrijvingen en biedstrategieen worden continu verbeterd.',
    icon: <Database className="w-5 h-5 text-accent" />,
  },
  {
    title: 'CLV Attribution',
    desc: 'Begrijp welke kanalen en campagnes klanten met de hoogste lifetime value aantrekken. Optimaliseer op lange-termijn waarde, niet op last click.',
    icon: <Users className="w-5 h-5 text-accent" />,
  },
  {
    title: 'Product Performance Alerts',
    desc: 'Automatische alerts bij dalende conversie, voorraadproblemen of prijsverschillen. Grijp in voordat je omzet misloopt.',
    icon: <Bell className="w-5 h-5 text-accent" />,
  },
  {
    title: 'Automated Reporting',
    desc: 'Rapportages die zichzelf schrijven. Van ROAS per productcategorie tot CLV-segmentatie — klaar om te delen met je team.',
    icon: <FileText className="w-5 h-5 text-accent" />,
  },
]

const audiences = [
  {
    title: 'Webshops',
    desc: 'Van Shopify tot Magento — Stevin verbindt je shop-data met je marketingkanalen en levert inzichten die je conversie verhogen.',
    link: null,
    linkText: null,
  },
  {
    title: 'DTC Brands',
    desc: 'Bouw een direct-to-consumer merk op data. Begrijp je klant, optimaliseer je funnel en schaal winstgevend zonder afhankelijk te zijn van marketplaces.',
    link: null,
    linkText: null,
  },
  {
    title: 'E-commerce Teams',
    desc: 'Geef je hele team toegang tot dezelfde waarheid. Van performance marketing tot merchandising — iedereen werkt met dezelfde data.',
    link: null,
    linkText: null,
  },
]

const useCases = [
  'Je ROAS-cijfers kloppen niet meer sinds iOS-privacy updates',
  'Je beheert productfeeds handmatig of met fragiele scripts',
  'Je optimaliseert op first-purchase ROAS in plaats van CLV',
  'Je mist omzet door te late alerts bij tracking- of voorraadproblemen',
  'Je wilt weten welke kanalen je meest waardevolle klanten opleveren',
  'Je schaalt je advertentiebudget maar je marge daalt',
]

export default function EcommercePage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative bg-primary pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 hero-mesh-gradient opacity-50" />
        <DataRain variant="ecommerce" />
        <div className="relative mx-auto max-w-7xl px-6 sm:px-8 text-center">
          <p className="text-[#5DA3FF] text-[13px] font-display font-bold tracking-[0.08em] uppercase mb-7 flex items-center gap-[14px]">
            <span className="inline-block w-7 h-px bg-[#5DA3FF] opacity-60 flex-shrink-0" aria-hidden="true" />
            VOOR E-COMMERCE
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Elke bestelling telt.<br />
            <span className="text-[#5DA3FF]">Weet wat echt werkt.</span>
          </h1>
          <p className="text-lg sm:text-xl text-white/60 max-w-3xl mx-auto leading-relaxed">
            Stevin lost je tracking-problemen op met server-side tracking, optimaliseert je feeds automatisch en laat je zien welke klanten echt waarde opleveren. Van ROAS naar CLV.
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
              Stevin verbindt je webshop, marketingkanalen en klantdata in één systeem dat meegroeit met je omzet.
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
            <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">Voor elk type e-commerce team</h2>
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
                Elke bestelling herleidbaar naar de juiste bron. Plan een gesprek en we laten zien hoe Stevin jouw e-commerce marketing meetbaar maakt.
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
