import type { Metadata } from 'next'
import Link from 'next/link'
import { GitBranch, Wallet, FileText, Plug, Activity, LayoutDashboard } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Stevin voor Mediabureaus — Cross-channel Attribution & Budget AI',
  description: 'Betrouwbare cross-channel attribution, slimmere budget-allocatie en rapportages die zichzelf schrijven. Stevin is gebouwd voor mediabureaus die op schaal willen optimaliseren.',
}

const painPoints = [
  {
    title: 'Attribution is onbetrouwbaar',
    desc: 'Elk kanaal claimt dezelfde conversie. Zonder betrouwbare cross-channel attribution is het onmogelijk om te bepalen welk kanaal echt bijdraagt aan resultaat.',
  },
  {
    title: 'Budget-allocatie op gevoel',
    desc: 'Je verdeelt budgetten op basis van historie en onderbuikgevoel in plaats van real-time performance. Geld gaat naar kanalen die onderperformen terwijl kansen onbenut blijven.',
  },
  {
    title: 'Rapportages kosten dagen',
    desc: 'Je team besteedt dagenlang aan het exporteren, combineren en formatteren van data uit tien verschillende platformen. Tijd die naar optimalisatie moet gaan.',
  },
]

const features = [
  {
    title: 'Cross-channel Attribution',
    desc: 'Eén waarheid over alle kanalen heen. Begrijp de werkelijke bijdrage van elk touchpoint — van first click tot conversie.',
    icon: <GitBranch className="w-5 h-5 text-accent" />,
  },
  {
    title: '220+ Integraties',
    desc: 'Native koppelingen met Meta, Google, TikTok, LinkedIn, DV360, The Trade Desk en meer. Geen middleware, geen vertraging.',
    icon: <Plug className="w-5 h-5 text-accent" />,
  },
  {
    title: 'Budget Optimalisatie AI',
    desc: 'AI-gestuurde aanbevelingen voor budget-herverdeling op basis van real-time performance, seizoenspatronen en incrementaliteit.',
    icon: <Wallet className="w-5 h-5 text-accent" />,
  },
  {
    title: 'Automated Reporting',
    desc: 'Rapportages die zichzelf schrijven. Per klant, per kanaal, per periode — klaar om te presenteren aan je opdrachtgever.',
    icon: <FileText className="w-5 h-5 text-accent" />,
  },
  {
    title: 'Real-time Budget Monitoring',
    desc: 'Continu overzicht van spend versus planning. Automatische alerts bij overschrijdingen, onderbesting of afwijkende pacing.',
    icon: <Activity className="w-5 h-5 text-accent" />,
  },
  {
    title: 'Client Dashboards',
    desc: 'Geef je klanten hun eigen dashboard met real-time inzicht. White-label, op maat ingericht per opdrachtgever.',
    icon: <LayoutDashboard className="w-5 h-5 text-accent" />,
  },
]

const audiences = [
  {
    title: 'Media Planning',
    desc: 'Plan campagnes op basis van data, niet op basis van vorig jaar. Stevin levert de inzichten die je nodig hebt voor onderbouwde mediakeuzes.',
    link: null,
    linkText: null,
  },
  {
    title: 'Media Buying',
    desc: 'Optimaliseer budgetten in real-time over alle kanalen heen. Minder waste, meer resultaat per euro mediabesteding.',
    link: null,
    linkText: null,
  },
  {
    title: 'Client Services',
    desc: 'Lever rapportages die zichzelf schrijven en geef klanten real-time dashboards. Minder operationeel werk, meer strategisch advies.',
    link: null,
    linkText: null,
  },
]

const useCases = [
  'Je besteedt meer dan een dag per week aan rapportages per klant',
  'Je vertrouwt attribution-data uit individuele platformen niet',
  'Je verdeelt budgetten op basis van gevoel in plaats van performance',
  'Je wilt klanten real-time inzicht geven zonder extra werk',
  'Je beheert tien of meer ad-accounts tegelijk',
  'Je wilt sneller schakelen bij budget-overschrijdingen of kansen',
]

export default function MediabureausPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative bg-primary pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 hero-mesh-gradient opacity-50" />
        <div className="relative mx-auto max-w-7xl px-6 sm:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-semibold mb-6">
            Voor mediabureaus
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Elke euro telt.<br />
            <span className="text-neon">Weet waar je resultaat vandaan komt.</span>
          </h1>
          <p className="text-lg sm:text-xl text-white/60 max-w-3xl mx-auto leading-relaxed">
            Stevin geeft mediabureaus betrouwbare cross-channel attribution, AI-gestuurde budget-optimalisatie en rapportages die zichzelf schrijven. Minder operationeel werk, meer strategische slagkracht.
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
              Stevin vervangt losse dashboards door één systeem dat mediainkoop, analyse en rapportage verbindt.
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
            <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">Voor elke rol in het mediabureau</h2>
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
              <h3 className="text-2xl font-bold text-white mb-4">Klaar om te beginnen?</h3>
              <p className="text-white/50 mb-8 leading-relaxed">
                Plan een gesprek en we laten zien hoe Stevin jouw mediabureau helpt om sneller, scherper en winstgevender te werken. Geen verplichtingen.
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
