import { getTranslations, setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { Link } from '@/i18n/navigation'
import MeetlatRuler from '@/components/MeetlatRuler'
import { Server, Database, Users, Plug, Bell, FileText } from 'lucide-react'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'e_commerce' })
  return {
    title: `Stevin ${t('eyebrow')} — ${t('h1')}`,
    description: t('sub'),
  }
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

export default async function EcommercePage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('e_commerce')

  return (
    <main>
      {/* Hero */}
      <section className="bg-primary -mt-[72px]" style={{ padding: 'calc(96px + 72px) 24px 128px' }}>
        <div className="mx-auto max-w-[1200px]">
          <p className="text-[#5DA3FF] text-[13px] font-display font-bold tracking-[0.08em] uppercase mb-7 flex items-center gap-[14px]">
            <span className="inline-block w-7 h-px bg-[#5DA3FF] opacity-60 flex-shrink-0" aria-hidden="true" />
            {t('eyebrow')}
          </p>
          <h1
            className="font-display font-extrabold text-white leading-[1.02] tracking-[-0.035em]"
            style={{ fontSize: 'clamp(52px, 7vw, 108px)', maxWidth: '16ch' }}>
            {t('h1')}
          </h1>
          <p className="text-white/60 leading-[1.55]" style={{ fontSize: '20px', maxWidth: '560px', marginTop: '32px' }}>
            {t('sub')}
          </p>
          <div className="flex flex-col sm:flex-row items-start gap-4 mt-10">
            <Link href="/contact" className="inline-flex px-8 py-3.5 text-sm font-semibold bg-neon text-primary rounded-xl hover:bg-neon-dark transition-colors neon-glow">
              Plan een gesprek
            </Link>
            <Link href="/platform" className="inline-flex px-8 py-3.5 text-sm font-semibold text-white/70 border border-white/20 rounded-xl hover:bg-white/5 transition-colors">
              Bekijk het platform
            </Link>
          </div>
          <div className="mt-20">
            <MeetlatRuler color="rgba(255,255,255,.35)" />
          </div>
        </div>
      </section>

      {/* Pain points */}
      <section className="bg-white" style={{ padding: '96px 24px' }}>
        <div className="mx-auto max-w-[1200px]">
          <p className="text-[#5DA3FF] text-[13px] font-display font-bold tracking-[0.08em] uppercase mb-7 flex items-center gap-[14px]">
            <span className="inline-block w-7 h-px bg-[#5DA3FF] opacity-60 flex-shrink-0" aria-hidden="true" />
            DE REALITEIT
          </p>
          <h2
            className="font-display font-extrabold text-primary leading-[1.08] tracking-[-0.025em] mb-16"
            style={{ fontSize: 'clamp(32px, 4vw, 54px)' }}
          >
            Herkenbaar?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
            {painPoints.map((p) => (
              <div key={p.title} className="py-10 md:py-0 md:px-10 first:pl-0 last:pr-0">
                <h3 className="text-[17px] font-display font-bold text-primary mb-4 leading-tight">{p.title}</h3>
                <p className="text-[15px] text-muted leading-[1.6]">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-surface" style={{ padding: '96px 24px' }}>
        <div className="mx-auto max-w-[1200px]">
          <p className="text-[#5DA3FF] text-[13px] font-display font-bold tracking-[0.08em] uppercase mb-7 flex items-center gap-[14px]">
            <span className="inline-block w-7 h-px bg-[#5DA3FF] opacity-60 flex-shrink-0" aria-hidden="true" />
            HET PLATFORM
          </p>
          <h2
            className="font-display font-extrabold text-primary leading-[1.08] tracking-[-0.025em] mb-4"
            style={{ fontSize: 'clamp(32px, 4vw, 54px)' }}
          >
            Alles wat je nodig hebt
          </h2>
          <p className="text-[17px] text-muted mb-16 max-w-xl leading-[1.55]">
              Stevin verbindt je webshop, marketingkanalen en klantdata in één systeem dat meegroeit met je omzet.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-border">
            {features.map((f, i) => (
              <div key={f.title} className="border-b border-border py-10 lg:px-10 lg:first:pl-0 lg:[&:nth-child(3n)]:pr-0 lg:[&:nth-child(3n+1)]:pl-0">
                <p className="font-mono text-[11px] text-muted mb-4">{String(i + 1).padStart(2, '0')}</p>
                <h3 className="text-[17px] font-display font-bold text-primary mb-3 leading-tight">{f.title}</h3>
                <p className="text-[15px] text-muted leading-[1.6]">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Audience segments */}
      <section className="bg-white" style={{ padding: '96px 24px' }}>
        <div className="mx-auto max-w-[1200px]">
          <p className="text-[#5DA3FF] text-[13px] font-display font-bold tracking-[0.08em] uppercase mb-7 flex items-center gap-[14px]">
            <span className="inline-block w-7 h-px bg-[#5DA3FF] opacity-60 flex-shrink-0" aria-hidden="true" />
            VOOR ELK TYPE TEAM
          </p>
          <h2
            className="font-display font-extrabold text-primary leading-[1.08] tracking-[-0.025em] mb-4"
            style={{ fontSize: 'clamp(32px, 4vw, 54px)' }}
          >
            Voor elk type e-commerce team
          </h2>
          <p className="text-[17px] text-muted mb-0 max-w-xl leading-[1.55]">Het platform is hetzelfde. De toepassing verschilt.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border mt-16">
            {audiences.map((a) => (
              <div key={a.title} className="py-10 md:py-0 md:px-10 first:pl-0 last:pr-0">
                <h3 className="text-[17px] font-display font-bold text-primary mb-4">{a.title}</h3>
                <p className="text-[15px] text-muted leading-[1.6] mb-4">{a.desc}</p>
                {a.link && (
                  <Link href={a.link} className="text-sm font-semibold text-[#5DA3FF] hover:underline">
                    {a.linkText} &rarr;
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use cases + CTA */}
      <section className="bg-primary" style={{ padding: '96px 24px' }}>
        <div className="mx-auto max-w-[1200px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            <div>
              <p className="text-[#5DA3FF] text-[13px] font-display font-bold tracking-[0.08em] uppercase mb-7 flex items-center gap-[14px]">
                <span className="inline-block w-7 h-px bg-[#5DA3FF] opacity-60 flex-shrink-0" aria-hidden="true" />
                VOOR JOU ALS
              </p>
              <h2
                className="font-display font-extrabold text-white leading-[1.08] tracking-[-0.025em] mb-10"
                style={{ fontSize: 'clamp(28px, 3.5vw, 48px)' }}
              >
                Stevin is voor jou als
              </h2>
              <ul className="space-y-0 border-t border-white/10">
                {useCases.map((uc) => (
                  <li key={uc} className="flex items-start gap-4 py-5 border-b border-white/10">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5DA3FF] flex-shrink-0 mt-[9px]" />
                    <span className="text-[15px] text-white/70 leading-[1.6]">{uc}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:pt-[140px]">
              <p className="text-[#00D4A0] text-[13px] font-display font-bold tracking-[0.08em] uppercase mb-6">
                Het is geen wonder. Het is Stevin.
              </p>
              <h3
                className="font-display font-extrabold text-white leading-[1.08] tracking-[-0.025em] mb-6"
                style={{ fontSize: 'clamp(24px, 3vw, 40px)' }}
              >
                Zie wat je betaalt.<br />Zie wat het oplevert.
              </h3>
              <p className="text-white/50 mb-8 leading-[1.6] text-[15px]">
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
