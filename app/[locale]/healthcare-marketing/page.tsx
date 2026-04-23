import type { Metadata } from 'next'
import { Link } from '@/i18n/navigation'
import MeetlatRuler from '@/components/MeetlatRuler'
import { ShieldCheck, GitMerge, Server, Plug, FileText, Target } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Stevin voor Healthcare & Farma — Compliant Marketing Intelligence',
  description: 'Pre-compliance scanning, MLR workflow integratie en compliant server-side tracking. Stevin is gebouwd voor healthcare en farma marketing teams die snel willen schakelen zonder compliance-risicos.',
}

const painPoints = [
  {
    title: 'MLR goedkeuring duurt weken',
    desc: 'Elke creatieve uiting moet door Medical, Legal en Regulatory review. Het proces is traag, handmatig en vertraagt je go-to-market snelheid enorm.',
  },
  {
    title: 'Compliance risicos bij elke campagne',
    desc: 'Een verkeerd geplaatste claim, een niet-goedgekeurde visual of een tracking pixel die te veel data verzamelt. De risicos zijn groot en de foutmarge klein.',
  },
  {
    title: 'Geen data-gedreven creatieve briefings',
    desc: 'Creatieve beslissingen worden genomen op basis van ervaring en regelgeving, niet op basis van wat bewezen werkt. Performance-data bereikt het creatieve team niet.',
  },
]

const features = [
  {
    title: 'Pre-compliance Scanning',
    desc: 'Scan creatieve uitingen automatisch op potentiele compliance-issues voordat ze naar MLR gaan. Minder reviewrondes, snellere goedkeuring.',
    icon: <ShieldCheck className="w-5 h-5 text-accent" />,
  },
  {
    title: '220+ Integraties',
    desc: 'Native koppelingen met Google, Meta, LinkedIn, Veeva, Salesforce Health Cloud en meer. Geen middleware, geen vertraging.',
    icon: <Plug className="w-5 h-5 text-accent" />,
  },
  {
    title: 'MLR Workflow Integratie',
    desc: 'Integreer je MLR-reviewproces in je campagneworkflow. Automatische routing, statustracking en audit trails voor volledige traceerbaarheid.',
    icon: <GitMerge className="w-5 h-5 text-accent" />,
  },
  {
    title: 'Compliant Tracking (Server-side)',
    desc: 'Server-side tracking dat voldoet aan healthcare privacy-vereisten. Betrouwbare data zonder patient-privacy in gevaar te brengen.',
    icon: <Server className="w-5 h-5 text-accent" />,
  },
  {
    title: 'Automated Compliance Reports',
    desc: 'Genereer automatisch compliance-rapportages voor audits en interne reviews. Volledige transparantie over je marketingactiviteiten.',
    icon: <FileText className="w-5 h-5 text-accent" />,
  },
  {
    title: 'HCP Targeting Intelligence',
    desc: 'Bereik de juiste healthcare professionals met data-gedreven targeting. Compliant, effectief en meetbaar over alle kanalen.',
    icon: <Target className="w-5 h-5 text-accent" />,
  },
]

const audiences = [
  {
    title: 'Farma Marketing',
    desc: 'Versnel je MLR-proces, waarborg compliance en meet de impact van je campagnes op HCP-engagement en patient awareness.',
    link: null,
    linkText: null,
  },
  {
    title: 'Healthcare Agencies',
    desc: 'Beheer meerdere farma-klanten vanuit één compliant platform. Gestandaardiseerde workflows, per-klant rapportages en audit-ready documentatie.',
    link: null,
    linkText: null,
  },
  {
    title: 'Medical Device Companies',
    desc: 'Market je medical devices effectief binnen de grenzen van regelgeving. Van pre-compliance checks tot compliant performance tracking.',
    link: null,
    linkText: null,
  },
]

const useCases = [
  'Je MLR-reviewproces duurt weken in plaats van dagen',
  'Je wilt campagnes lanceren zonder compliance-risicos',
  'Je hebt geen zicht op welke boodschappen het beste werken bij HCPs',
  'Je tracking voldoet niet aan healthcare privacy-vereisten',
  'Je besteedt te veel tijd aan handmatige compliance-rapportages',
  'Je wilt sneller schakelen zonder concessies te doen aan regelgeving',
]

export default function HealthcareMarketingPage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-primary -mt-[72px]" style={{ padding: 'calc(96px + 72px) 24px 128px' }}>
        <div className="mx-auto max-w-[1200px]">
          <p className="text-[#5DA3FF] text-[13px] font-display font-bold tracking-[0.08em] uppercase mb-7 flex items-center gap-[14px]">
            <span className="inline-block w-7 h-px bg-[#5DA3FF] opacity-60 flex-shrink-0" aria-hidden="true" />
            VOOR HEALTHCARE EN FARMA
          </p>
          <h1
            className="font-display font-extrabold text-white leading-[1.02] tracking-[-0.035em]"
            style={{ fontSize: 'clamp(52px, 7vw, 108px)', maxWidth: '16ch' }}>
            Compliant marketing.<br />
            <span className="text-[#5DA3FF]">Zonder snelheid in te leveren.</span>
          </h1>
          <p className="text-white/60 leading-[1.55]" style={{ fontSize: '20px', maxWidth: '560px', marginTop: '32px' }}>
            Stevin helpt healthcare en farma teams om sneller te schakelen zonder compliance-risicos. Van pre-compliance scanning tot MLR workflow integratie — alles in één platform.
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
              Stevin combineert marketing intelligence met compliance-tools die specifiek zijn ontworpen voor healthcare en farma.
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
            Voor elk type healthcare team
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
                Compliant én meetbaar — zonder snelheid in te leveren. Plan een gesprek en we laten zien hoe Stevin jouw healthcare marketing versnelt.
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
