import type { Metadata } from 'next'
import Link from 'next/link'
import MeetlatRuler from '@/components/MeetlatRuler'

export const metadata: Metadata = {
  title: 'Stevin voor Marketing — Agencies, Inhouse Teams & Promotoren',
  description: 'Grip op ROAS, minder verspilling en slimmere campagnes. Stevin centraliseert al je marketingdata, analyseert 24/7 en levert concrete actiepunten.',
}

const painPoints = [
  {
    title: 'Rapportage is een achteruitkijkspiegel',
    desc: 'Je team besteedt dagenlang aan het verklaren van wat er gisteren is gebeurd. Terwijl je klant betaalt voor wat er morgen moet gebeuren.',
  },
  {
    title: 'Vijf man op reporting, nul op strategie',
    desc: 'Exporteren, combineren, formatteren, presenteren. Non-billable uren die je marge opeten en je team weghouden van het werk dat verschil maakt.',
  },
  {
    title: 'Dashboards vertellen je niks',
    desc: 'Een grafiek die omlaag gaat is geen inzicht. Je wilt weten waarom het gebeurt, wat je eraan kunt doen en wanneer je creatieve hook zijn kracht verliest.',
  },
]

const features = [
  {
    title: 'Executive Briefings, geen PDF-dumps',
    desc: 'Drie zinnen die je direct naar je klant kunt sturen. Geen 40 pagina\'s met historie, maar wat er nu moet gebeuren en waarom.',
  },
  {
    title: '220+ Integraties',
    desc: 'Native koppelingen met Meta, Google, TikTok, LinkedIn, Shopify, Klaviyo en meer. Geen middleware, geen vertraging.',
  },
  {
    title: 'Creatieve Verzadigingsdetectie',
    desc: 'Stevin detecteert wanneer je creative haar kracht verliest. Je weet exact wanneer het tijd is voor een nieuwe hook — voordat je budget verspilt.',
  },
  {
    title: 'Vooruitkijken, niet terugkijken',
    desc: 'Stevin berekent per kanaal waar je volgende euro het hardst groeit. Niet wat je ROI was, maar waar de marge nu ligt.',
  },
  {
    title: 'Merk-momentum in Kaart',
    desc: 'Share of Search, branded traffic-trends en concurrentiepositie in real-time. Zie verschuivingen voordat ze in marktaandeel zichtbaar worden.',
  },
  {
    title: '24/7 Anomalie Detectie',
    desc: 'Budgetten, tracking en campagnes worden continu gescand. Problemen en kansen worden direct gesignaleerd — niet pas in het weekrapport.',
  },
]

const audiences = [
  {
    title: 'Bureaus',
    desc: 'Van mediabureau tot creatief bureau: beheer meerdere klanten vanuit één systeem. Attribution, automated reporting en creatieve intelligence per klant.',
    link: '/voor-agencies',
    linkText: 'Meer over het Agency Partner programma',
  },
  {
    title: 'Inhouse Teams',
    desc: 'Verbind je volledige marketingstack — van ads en creatie tot CRM. Minder tijd aan data verzamelen, meer tijd aan strategie en optimalisatie.',
    link: null,
    linkText: null,
  },
  {
    title: 'Specialisten',
    desc: 'E-commerce, healthcare, retail of events — Stevin past zich aan jouw sector aan met relevante integraties, compliance en benchmarks.',
    link: null,
    linkText: null,
  },
]

const useCases = [
  'Je hebt mensen op reporting zitten die niet aan strategie toekomen',
  'Je wilt weten wanneer je creative haar kracht verliest',
  'Je klant vraagt om een vooruitblik, niet om een achteruitkijkspiegel',
  'Je beheert meerdere klanten en wilt per klant in 3 zinnen de status',
  'Je wilt budget-verschuivingen onderbouwen met data, niet onderbuikgevoel',
  'Je wilt je positioneren als strategisch partner, niet als rapportage-fabriek',
]

export default function MarketingPage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-primary -mt-[72px]" style={{ padding: 'calc(96px + 72px) 24px 128px' }}>
        <div className="mx-auto max-w-[1200px]">
          <p className="text-[#5DA3FF] text-[13px] font-display font-bold tracking-[0.08em] uppercase mb-8 flex items-center gap-[14px]">
            <span className="inline-block w-7 h-px bg-[#5DA3FF] opacity-60 flex-shrink-0" aria-hidden="true" />
            VOOR MARKETING
          </p>
          <h1
            className="font-display font-extrabold text-white leading-[1.02] tracking-[-0.035em]"
            style={{ fontSize: 'clamp(52px, 7vw, 108px)', maxWidth: '16ch' }}
          >
            Grip op je data.<br />
            <span className="text-[#5DA3FF]">Focus op resultaat.</span>
          </h1>
          <p className="text-white/60 leading-[1.55]" style={{ fontSize: '20px', maxWidth: '560px', marginTop: '32px' }}>
            Of je nu een performance agency runt, een creatief team aanstuurt, media inkoopt of events plant — Stevin centraliseert
            je data, analyseert 24/7 en levert concrete actiepunten.
          </p>
          <div className="flex flex-col sm:flex-row items-start gap-4 mt-10">
            <Link
              href="/contact"
              className="inline-flex px-8 py-3.5 text-sm font-semibold bg-neon text-primary rounded-xl hover:bg-neon-dark transition-colors neon-glow"
            >
              Plan een gesprek
            </Link>
            <Link
              href="/platform"
              className="inline-flex px-8 py-3.5 text-sm font-semibold text-white/70 border border-white/20 rounded-xl hover:bg-white/5 transition-colors"
            >
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
            Stevin vervangt losse tools door één systeem dat meegroeit met je ambities.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-border">
            {features.map((f, i) => (
              <div
                key={f.title}
                className="border-b border-border py-10 lg:px-10 lg:first:pl-0 lg:[&:nth-child(3n)]:pr-0 lg:[&:nth-child(3n+1)]:pl-0"
              >
                <p className="font-mono text-[11px] text-muted mb-4">0{i + 1}</p>
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
            Hetzelfde platform.<br />Andere toepassing.
          </h2>
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

      {/* Use cases */}
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
                Elke euro herleidbaar naar resultaat. Plan een gesprek en we laten zien hoe Stevin jouw marketingdata omzet in onderbouwde groei.
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
