import { getTranslations, setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { Link } from '@/i18n/navigation'
import { nativeConnectors } from '@/data/connectors'
import MeetlatRuler from '@/components/MeetlatRuler'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'platform' })
  return {
    title: `${t('eyebrow')} — Stevin`,
    description: t('sub'),
  }
}

const features = [
  {
    label: '01',
    title: 'Data Engine',
    desc: 'De motor achter alles. 220+ integraties, AI-analyses, social listening en 24/7 monitoring. Alles draait automatisch op de achtergrond.',
  },
  {
    label: '02',
    title: 'Dashboard',
    desc: 'Jouw cockpit. Eén dashboard voor campagneprestaties, CRM-pipeline, AI-adviezen, content en rapportages.',
  },
  {
    label: '03',
    title: '220+ Integraties',
    desc: 'Van ads en analytics tot streaming, social, ticketing en finance. Directe koppelingen met alle grote platformen.',
  },
  {
    label: '04',
    title: 'Lead Generation',
    desc: 'Van anoniem websitebezoek naar gekwalificeerde pipeline — volledig geautomatiseerd, 100% EU-compliant, zonder cookies.',
  },
  {
    label: '05',
    title: '24/7 Monitoring',
    desc: 'Elke nacht worden je campagnes, tracking, connectors en budgetten automatisch gecontroleerd. Problemen worden direct gemeld of gerepareerd.',
  },
  {
    label: '06',
    title: 'Causale Rapporten',
    desc: 'Wekelijkse rapporten, anomalie-alerts en concrete adviezen — onderbouwd met data uit je eigen CRM, niet alleen platform-eigen rapportage.',
  },
]

const extras = [
  { title: 'Social Listening', desc: 'Market intelligence uit meerdere bronnen, uitgewerkt tot bruikbare inzichten en content.' },
  { title: 'Content Curation', desc: 'De belangrijkste trends automatisch gefilterd, alleen relevante inzichten passeren.' },
  { title: 'Brand & Performance', desc: 'Campagneprestaties gekoppeld aan merkdata — van awareness tot conversie in één overzicht.' },
  { title: 'Multi-channel Publishing', desc: 'Content generatie en publicatie over meerdere kanalen vanuit één plek.' },
  { title: 'CRM & Pipeline', desc: 'Contacten, deals, e-mail tracking en opvolging — alles in één systeem.' },
  { title: 'Automation', desc: 'E-mail flows, lead scoring, nurturing en trigger-based messaging volledig geautomatiseerd.' },
  { title: 'Feedback Loops', desc: 'Het platform leert van elke interactie. Rapporten en adviezen passen zich aan op jouw tone of voice.' },
]

const monitoringChecks = [
  'Alle advertentiekanalen',
  'Connector status',
  'Budget & spend controle',
  'Tracking & conversies',
  'CRM pipeline gezondheid',
  'Content & social feeds',
  'E-mail deliverability',
  'Automatisch herstel',
]

const leadGenItems = [
  '100% AVG / GDPR compliant',
  'Bedrijfsherkenning zonder cookies',
  'Intent scoring op gedragssignalen',
  'Automatische CRM-verrijking',
  'Retargeting audiences aanmaken',
]

const reportItems = [
  'Groei-factor per kanaal (welke euro werkt het hardst)',
  'Creatieve verzadigingsdetectie',
  'Real-time anomalie detectie',
  'Budget waste alerts en kansen',
  'Branded search-trends via Share of Search',
]

export default async function PlatformPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('platform')

  return (
    <main>
      {/* Hero */}
      <section className="bg-primary -mt-[72px]" style={{ padding: 'calc(96px + 72px) 24px 128px' }}>
        <div className="mx-auto max-w-[1200px]">
          <p className="text-[#5DA3FF] text-[13px] font-display font-bold tracking-[0.08em] uppercase mb-8 flex items-center gap-[14px]">
            <span className="inline-block w-7 h-px bg-[#5DA3FF] opacity-60 flex-shrink-0" aria-hidden="true" />
            {t('eyebrow')}
          </p>
          <h1
            className="font-display font-extrabold text-white leading-[1.02] tracking-[-0.035em]"
            style={{ fontSize: 'clamp(52px, 7vw, 108px)', maxWidth: '16ch' }}
          >
            {t('h1')}<br />
            <span className="text-[#5DA3FF]">onder je marketing.</span>
          </h1>
          <p className="text-white/60 leading-[1.55]" style={{ fontSize: '20px', maxWidth: '580px', marginTop: '32px' }}>
            {t('sub')}
          </p>
          <div className="flex flex-col sm:flex-row items-start gap-4 mt-10">
            <Link
              href="/contact"
              className="inline-flex px-8 py-3.5 text-sm font-semibold bg-neon text-primary rounded-xl hover:bg-neon-dark transition-colors neon-glow"
            >
              {t('cta_demo')}
            </Link>
            <Link
              href="#connectors"
              className="inline-flex px-8 py-3.5 text-sm font-semibold text-white/70 border border-white/20 rounded-xl hover:bg-white/5 transition-colors"
            >
              {t('cta_integraties')}
            </Link>
          </div>
          <div className="mt-20">
            <MeetlatRuler color="rgba(255,255,255,.35)" />
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="bg-white" style={{ padding: '96px 24px' }}>
        <div className="mx-auto max-w-[1200px]">
          <p className="text-[#5DA3FF] text-[13px] font-display font-bold tracking-[0.08em] uppercase mb-7 flex items-center gap-[14px]">
            <span className="inline-block w-7 h-px bg-[#5DA3FF] opacity-60 flex-shrink-0" aria-hidden="true" />
            WAT HET KAN
          </p>
          <h2
            className="font-display font-extrabold text-primary leading-[1.08] tracking-[-0.025em] mb-4"
            style={{ fontSize: 'clamp(32px, 4vw, 54px)' }}
          >
            Alles wat je nodig hebt
          </h2>
          <p className="text-[17px] text-muted mb-16 max-w-xl leading-[1.55]">
            Stevin vervangt losse tools door één geïntegreerd systeem. Elk onderdeel versterkt de rest.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-border">
            {features.map((f) => (
              <div
                key={f.title}
                className="border-b border-border py-10 lg:px-10 lg:first:pl-0 lg:[&:nth-child(3n)]:pr-0 lg:[&:nth-child(3n+1)]:pl-0"
              >
                <p className="font-mono text-[11px] text-muted mb-4">{f.label}</p>
                <h3 className="text-[17px] font-display font-bold text-primary mb-3 leading-tight">{f.title}</h3>
                <p className="text-[15px] text-muted leading-[1.6]">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Native Connectors */}
      <section id="connectors" className="bg-surface" style={{ padding: '96px 24px' }}>
        <div className="mx-auto max-w-[1200px]">
          <p className="text-[#5DA3FF] text-[13px] font-display font-bold tracking-[0.08em] uppercase mb-7 flex items-center gap-[14px]">
            <span className="inline-block w-7 h-px bg-[#5DA3FF] opacity-60 flex-shrink-0" aria-hidden="true" />
            INTEGRATIES
          </p>
          <h2
            className="font-display font-extrabold text-primary leading-[1.08] tracking-[-0.025em] mb-4"
            style={{ fontSize: 'clamp(32px, 4vw, 54px)' }}
          >
            220+ Integraties
          </h2>
          <p className="text-[17px] text-muted mb-12 max-w-xl leading-[1.55]">
            Directe, real-time koppelingen met de platformen die ertoe doen. Geen third-party middleware, geen vertraging.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {nativeConnectors.map((c) => (
              <div key={c.slug} className="rounded-xl bg-white border border-border p-4 text-center hover:border-[#5DA3FF]/30 transition-colors">
                <p className="text-sm font-semibold text-primary">{c.name}</p>
                <p className="text-[11px] text-muted mt-1 leading-snug">
                  {c.category === 'advertising' ? 'Advertising' : c.category === 'analytics' ? 'Analytics' : c.category === 'ecommerce' ? 'E-commerce' : 'E-mail'}
                </p>
              </div>
            ))}
          </div>
          <p className="text-sm text-muted mt-8 border-t border-border pt-8">
            Daarnaast ondersteunen we{' '}
            <Link href="/integraties" className="text-[#5DA3FF] hover:underline">100+ andere tools</Link>{' '}
            via koppelingen. Mis je een platform?{' '}
            <Link href="/contact" className="text-[#5DA3FF] hover:underline">Laat het ons weten</Link>{' '}
            — we kunnen met vrijwel alles connecten.
          </p>
        </div>
      </section>

      {/* Lead Generation */}
      <section id="lead-generation" className="bg-white" style={{ padding: '96px 24px' }}>
        <div className="mx-auto max-w-[1200px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            <div>
              <p className="text-[#5DA3FF] text-[13px] font-display font-bold tracking-[0.08em] uppercase mb-7 flex items-center gap-[14px]">
                <span className="inline-block w-7 h-px bg-[#5DA3FF] opacity-60 flex-shrink-0" aria-hidden="true" />
                LEAD GENERATION
              </p>
              <h2
                className="font-display font-extrabold text-primary leading-[1.08] tracking-[-0.025em] mb-6"
                style={{ fontSize: 'clamp(28px, 3.5vw, 48px)' }}
              >
                Van bezoeker naar klant
              </h2>
              <p className="text-[15px] text-muted leading-[1.6] mb-8">
                Stevin herkent bedrijven die je website bezoeken, scoort hun koopintentie
                en triggert automatisch de juiste opvolging — van CRM-contact tot retargeting.
                Volledig EU-compliant, zonder cookies of third-party tracking.
              </p>
              <ul className="space-y-0 border-t border-border">
                {leadGenItems.map((item) => (
                  <li key={item} className="flex items-center gap-4 py-4 border-b border-border">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5DA3FF] flex-shrink-0" />
                    <span className="text-[15px] text-muted">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:pt-[120px] space-y-4">
              {['Bezoeker', 'Bedrijfsherkenning', 'Intent scoring', 'Actie'].map((step, i) => (
                <div key={step} className="flex items-center gap-4 border-t border-border pt-4">
                  <span className="font-mono text-[11px] text-muted w-6">0{i + 1}</span>
                  <span className="text-[15px] font-display font-bold text-primary">{step}</span>
                  {i < 3 && <span className="ml-auto text-muted">↓</span>}
                </div>
              ))}
              <p className="text-[13px] text-muted pt-2">Volledig geautomatiseerde pipeline</p>
            </div>
          </div>
        </div>
      </section>

      {/* 24/7 Monitoring */}
      <section id="monitoring" className="bg-primary" style={{ padding: '96px 24px' }}>
        <div className="mx-auto max-w-[1200px]">
          <p className="text-[#5DA3FF] text-[13px] font-display font-bold tracking-[0.08em] uppercase mb-7 flex items-center gap-[14px]">
            <span className="inline-block w-7 h-px bg-[#5DA3FF] opacity-60 flex-shrink-0" aria-hidden="true" />
            24/7 MONITORING
          </p>
          <h2
            className="font-display font-extrabold text-white leading-[1.08] tracking-[-0.025em] mb-4"
            style={{ fontSize: 'clamp(32px, 4vw, 54px)' }}
          >
            Je campagnes slapen nooit
          </h2>
          <p className="text-[17px] text-white/50 mb-16 max-w-xl leading-[1.55]">
            Elke nacht controleren we automatisch al je systemen. Problemen worden direct gerepareerd of gemeld.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-white/10">
            {monitoringChecks.map((check) => (
              <div key={check} className="border-b border-r border-white/10 py-8 px-6 last:border-r-0 sm:[&:nth-child(2n)]:border-r-0 lg:[&:nth-child(2n)]:border-r lg:[&:nth-child(4n)]:border-r-0">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#00D4A0] mb-4" />
                <p className="text-[15px] text-white/80 font-medium leading-tight">{check}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Reports */}
      <section id="ai-reports" className="bg-white" style={{ padding: '96px 24px' }}>
        <div className="mx-auto max-w-[1200px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            <div>
              <p className="text-[#5DA3FF] text-[13px] font-display font-bold tracking-[0.08em] uppercase mb-7 flex items-center gap-[14px]">
                <span className="inline-block w-7 h-px bg-[#5DA3FF] opacity-60 flex-shrink-0" aria-hidden="true" />
                RAPPORTEN
              </p>
              <h2
                className="font-display font-extrabold text-primary leading-[1.08] tracking-[-0.025em] mb-6"
                style={{ fontSize: 'clamp(28px, 3.5vw, 48px)' }}
              >
                Executive Briefings,<br />geen rapportage-fabrieken
              </h2>
              <p className="text-[15px] text-muted leading-[1.6] mb-8">
                Geen PDF met 40 pagina&apos;s over gisteren. Stevin levert executive briefings van 3 zinnen
                die je direct naar je klant kunt sturen. Vooruitkijken, niet terugkijken.
              </p>
              <ul className="space-y-0 border-t border-border">
                {reportItems.map((item) => (
                  <li key={item} className="flex items-center gap-4 py-4 border-b border-border">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5DA3FF] flex-shrink-0" />
                    <span className="text-[15px] text-muted">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:pt-[120px]">
              <div className="border-t border-border pt-10 space-y-8">
                <div>
                  <p className="font-mono text-[11px] text-muted mb-2">BRIEFING FORMAT</p>
                  <p className="text-[15px] text-muted leading-[1.7] italic">
                    &ldquo;Meta ROAS steeg 22% t.o.v. vorige week. De top creative verliest kracht — nieuw concept vereist voor week 3.
                    Budget Meta → Search aanbevolen: €800/dag.&rdquo;
                  </p>
                </div>
                <div className="border-t border-border pt-8">
                  <p className="text-[13px] text-muted">Causale inzichten, onderbouwd met data uit je eigen CRM.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* More capabilities */}
      <section className="bg-surface" style={{ padding: '96px 24px' }}>
        <div className="mx-auto max-w-[1200px]">
          <p className="text-[#5DA3FF] text-[13px] font-display font-bold tracking-[0.08em] uppercase mb-7 flex items-center gap-[14px]">
            <span className="inline-block w-7 h-px bg-[#5DA3FF] opacity-60 flex-shrink-0" aria-hidden="true" />
            EN NOG MEER
          </p>
          <h2
            className="font-display font-extrabold text-primary leading-[1.08] tracking-[-0.025em] mb-4"
            style={{ fontSize: 'clamp(28px, 3.5vw, 48px)' }}
          >
            Het platform groeit continu
          </h2>
          <p className="text-[17px] text-muted mb-16 max-w-xl leading-[1.55]">Dit is wat er verder in zit.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-border">
            {extras.map((e) => (
              <div key={e.title} className="border-b border-r border-border py-8 px-6 sm:[&:nth-child(2n)]:border-r-0 lg:[&:nth-child(2n)]:border-r lg:[&:nth-child(3n)]:border-r-0">
                <h3 className="text-[15px] font-display font-bold text-primary mb-2">{e.title}</h3>
                <p className="text-[14px] text-muted leading-[1.6]">{e.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary" style={{ padding: '112px 24px 128px' }}>
        <div className="mx-auto max-w-[1200px]">
          <p className="text-[#00D4A0] text-[13px] font-display font-bold tracking-[0.08em] uppercase mb-6">
            Het is geen wonder. Het is Stevin.
          </p>
          <h2
            className="font-display font-extrabold text-white leading-[1.08] tracking-[-0.025em] mb-6"
            style={{ fontSize: 'clamp(32px, 4vw, 54px)', maxWidth: '16ch' }}
          >
            De meetlat onder je marketing — live zien werken.
          </h2>
          <p className="text-white/50 mb-10 leading-[1.6] text-[17px] max-w-lg">
            Plan een demo en zie hoe Stevin je volledige marketingstack in één systeem samenbrengt.
          </p>
          <Link
            href="/contact"
            className="inline-flex px-8 py-3.5 text-sm font-semibold bg-neon text-primary rounded-xl hover:bg-neon-dark transition-colors neon-glow"
          >
            {t('cta_demo')}
          </Link>
        </div>
      </section>
    </main>
  )
}
