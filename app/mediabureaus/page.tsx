import type { Metadata } from 'next'
import Link from 'next/link'
import MeetlatRuler from '@/components/MeetlatRuler'
import { GitBranch, Wallet, FileText, Plug, Activity, LayoutDashboard } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Stevin voor Mediabureaus — Cross-channel Attribution & Budget AI',
  description: 'Betrouwbare cross-channel attribution, slimmere budget-allocatie en rapportages die zichzelf schrijven. Stevin is gebouwd voor mediabureaus die op schaal willen optimaliseren.',
}

const painPoints = [
  {
    title: 'Rapportage is een non-billable kostenpost',
    desc: 'Je hebt mensen op reporting zitten die niet aan strategie toekomen. Exporteren, combineren, formatteren — terwijl je klant betaalt voor resultaat, niet voor grafieken.',
  },
  {
    title: 'Budget-allocatie op gevoel',
    desc: 'Je verdeelt budgetten op basis van historie en onderbuikgevoel. Geen wetenschappelijke onderbouwing voor verschuivingen, geen zicht op verzadigingspunten per kanaal.',
  },
  {
    title: 'Je klant vraagt "wat nu?" en je levert "wat was"',
    desc: 'Dashboards vertellen wat er gisteren is gebeurd. Je klant wil weten wat er morgen moet gebeuren en waar de volgende euro het hardst groeit.',
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
    title: 'Budget Optimalisatie',
    desc: 'Concrete aanbevelingen voor budget-herverdeling op basis van real-time performance, seizoenspatronen en incrementaliteit.',
    icon: <Wallet className="w-5 h-5 text-accent" />,
  },
  {
    title: 'Executive Briefings, geen PDF-dumps',
    desc: 'Drie zinnen per klant die je direct kunt doorsturen. "Share of Search stijgt 12%, media-kosten dalen. Nieuwe visuele stijl werkt. Opschalen."',
    icon: <FileText className="w-5 h-5 text-accent" />,
  },
  {
    title: 'Waste Reduction & Pacing Alerts',
    desc: 'Continu overzicht van spend versus planning. Budget wasters worden automatisch gesignaleerd. Kansen worden geescaleerd voordat ze voorbij zijn.',
    icon: <Activity className="w-5 h-5 text-accent" />,
  },
  {
    title: 'Creatieve Verzadigingsdetectie',
    desc: 'Weet wanneer een creative zijn kracht verliest. Stevin meet de verzadiging per creatieve uiting zodat je op tijd vernieuwt — niet reageert.',
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
    desc: 'Lever executive briefings in plaats van dikke rapporten. Je klant krijgt in 3 zinnen de status — jij komt over als strategisch partner, niet als rapportage-fabriek.',
    link: null,
    linkText: null,
  },
]

const useCases = [
  'Je hebt mensen op reporting zitten die niet aan strategie toekomen',
  'Je wilt budget-verschuivingen onderbouwen met wetenschap, niet gevoel',
  'Je wilt weten wanneer je creative verzadigd raakt — voordat de klant het merkt',
  'Je klant vraagt om een vooruitblik, niet om een achteruitkijkspiegel',
  'Je wilt in 3 zinnen de status per klant, niet in een 40 pagina rapport',
  'Je wilt je positioneren als strategisch partner, niet als uitvoerder',
]

export default function MediabureausPage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-primary -mt-[72px]" style={{ padding: 'calc(96px + 72px) 24px 128px' }}>
        <div className="mx-auto max-w-[1200px]">
          <p className="text-[#5DA3FF] text-[13px] font-display font-bold tracking-[0.08em] uppercase mb-7 flex items-center gap-[14px]">
            <span className="inline-block w-7 h-px bg-[#5DA3FF] opacity-60 flex-shrink-0" aria-hidden="true" />
            VOOR MEDIABUREAUS
          </p>
          <h1
            className="font-display font-extrabold text-white leading-[1.02] tracking-[-0.035em]"
            style={{ fontSize: 'clamp(52px, 7vw, 108px)', maxWidth: '16ch' }}>
            Elke euro telt.<br />
            <span className="text-[#5DA3FF]">Weet waar je resultaat vandaan komt.</span>
          </h1>
          <p className="text-white/60 leading-[1.55]" style={{ fontSize: '20px', maxWidth: '560px', marginTop: '32px' }}>
            Stevin geeft mediabureaus betrouwbare cross-channel attribution, AI-gestuurde budget-optimalisatie en rapportages die zichzelf schrijven. Minder operationeel werk, meer strategische slagkracht.
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
              Stevin vervangt losse dashboards door één systeem dat mediainkoop, analyse en rapportage verbindt.
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
            Voor elke rol in het mediabureau
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
                Scherper bureaus draaien op bewijs. Plan een gesprek en we laten zien hoe Stevin jouw mediabureau sneller en winstgevender maakt.
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
