import Link from 'next/link'
import FAQAccordion from '@/components/FAQAccordion'
import StickyMobileCTA from '@/components/StickyMobileCTA'
import MeetlatRuler from '@/components/MeetlatRuler'
import { homepageFaqs } from '@/data/faqs'
import { nativeConnectors } from '@/data/connectors'

export default function HomePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Stevin',
    description: 'Stevin is de meetlat tussen marketingspend en werkelijk resultaat. Voor ondernemers, merken en bureaus die hun cijfers serieus nemen — zonder black boxes.',
    url: 'https://stevin.ai',
    areaServed: 'NL',
    knowsAbout: ['Online Marketing', 'Marketing Automation', 'SEO', 'Paid Media', 'Analytics', 'Social Media Monitoring', 'Artist Management', 'PR & Communications'],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── HERO ── */}
      <section className="bg-primary -mt-[72px]" style={{ padding: 'calc(96px + 72px) 24px 128px' }}>
        <div className="mx-auto max-w-[1200px]">

          {/* Eyebrow */}
          <p className="text-[#5DA3FF] text-[13px] font-display font-bold tracking-[0.08em] uppercase mb-8 flex items-center gap-[14px]">
            <span className="inline-block w-7 h-px bg-[#5DA3FF] opacity-60 flex-shrink-0" aria-hidden="true" />
            MARKETING INTELLIGENCE · 24/7
          </p>

          {/* H1 */}
          <h1
            className="font-display font-extrabold text-white leading-[1.06] tracking-[-0.03em]"
            style={{ fontSize: 'clamp(36px, 5vw, 76px)', maxWidth: '16ch' }}
          >
            Voor je omzet daalt of budget weglekt,{' '}
            <span className="text-[#5DA3FF]">weet je wat er speelt.</span>
          </h1>

          {/* Sub */}
          <p
            className="text-white/60 leading-[1.55]"
            style={{ fontSize: '20px', maxWidth: '520px', marginTop: '32px' }}
          >
            Stevin monitort 24/7 je paid en owned media en signaleert wat er verandert — zodat je kunt ingrijpen voor het te laat is.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 mt-10">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#5DA3FF] text-[#0A1628] font-display font-bold text-[15px] px-7 py-3.5 rounded-lg hover:bg-[#7BB8FF] transition-colors"
            >
              Plan demo
            </Link>
            <Link
              href="/platform"
              className="inline-flex items-center gap-2 border border-white/20 text-white font-display font-semibold text-[15px] px-7 py-3.5 rounded-lg hover:border-white/40 hover:bg-white/5 transition-colors"
            >
              Bekijk voorbeeld alerts
            </Link>
          </div>

          {/* Quote */}
          <p className="italic text-white/25 text-sm mt-10">
            &ldquo;Wonder en is gheen wonder.&rdquo; — Simon Stevin, 1586
          </p>

          {/* Meetlat */}
          <div className="mt-20">
            <MeetlatRuler color="rgba(255,255,255,.35)" />
          </div>
        </div>
      </section>

      {/* ── PATH SELECTOR ── */}
      <section className="bg-surface" style={{ padding: '96px 24px' }}>
        <div className="mx-auto max-w-[1200px]">

          <div className="flex items-end justify-between flex-wrap gap-6 mb-14">
            <div>
              <p className="text-accent text-[12px] font-display font-bold tracking-[0.12em] uppercase mb-4 flex items-center gap-[14px]">
                <span className="inline-block w-6 h-px bg-accent flex-shrink-0" aria-hidden="true" />
                KIES JE DOMEIN
              </p>
              <h2
                className="font-display font-extrabold text-primary m-0"
                style={{ fontSize: 'clamp(32px, 3.6vw, 52px)', letterSpacing: '-0.03em', lineHeight: '1.08' }}
              >
                Eén platform. Twee werelden.
              </h2>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 font-display font-bold text-[15px] bg-neon text-primary rounded-[10px] hover:bg-neon-dark transition-colors neon-glow flex-shrink-0"
            >
              Plan een gesprek
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Marketing */}
            <Link
              href="/marketing"
              className="group rounded-[14px] border border-border bg-white hover:shadow-lg hover:border-accent/30 transition-all duration-200 flex flex-col"
              style={{ padding: '40px 36px 36px' }}
            >
              <p className="text-accent text-[12px] font-display font-bold tracking-[0.12em] uppercase mb-6 flex items-center gap-[10px]">
                <span className="inline-block w-5 h-px bg-accent flex-shrink-0" aria-hidden="true" />
                VOOR MARKETING
              </p>
              <h3
                className="font-display font-bold text-primary mb-4"
                style={{ fontSize: '28px', lineHeight: '1.1', letterSpacing: '-0.025em' }}
              >
                Bureaus, inhouse teams & specialisten
              </h3>
              <p className="text-muted leading-[1.6] flex-1" style={{ fontSize: '15px' }}>
                Elke euro herleidbaar naar resultaat. Geen dashboards die elkaar tegenspreken, geen black boxes. Spend en resultaat met elkaar laten kloppen.
              </p>
              <div className="mt-8 pt-5 border-t border-border">
                <span className="font-display font-semibold text-accent text-sm inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                  Ontdek de oplossing
                  <span className="inline-block group-hover:translate-x-0.5 transition-transform">→</span>
                </span>
              </div>
            </Link>

            {/* Artiesten */}
            <Link
              href="/artiesten"
              className="group rounded-[14px] border border-border bg-white hover:shadow-lg hover:border-pink/30 transition-all duration-200 flex flex-col"
              style={{ padding: '40px 36px 36px' }}
            >
              <p className="text-pink text-[12px] font-display font-bold tracking-[0.12em] uppercase mb-6 flex items-center gap-[10px]">
                <span className="inline-block w-5 h-px bg-pink flex-shrink-0" aria-hidden="true" />
                VOOR ARTIESTEN
              </p>
              <h3
                className="font-display font-bold text-primary mb-4"
                style={{ fontSize: '28px', lineHeight: '1.1', letterSpacing: '-0.025em' }}
              >
                Artiesten, influencers & promotoren
              </h3>
              <p className="text-muted leading-[1.6] flex-1" style={{ fontSize: '15px' }}>
                Hype is geen toeval. Stevin traceert welke momenten écht momentum bouwen en helpt je daarop te handelen voor de rest het doorheeft.
              </p>
              <div className="mt-8 pt-5 border-t border-border">
                <span className="font-display font-semibold text-pink text-sm inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                  Ontdek de oplossing
                  <span className="inline-block group-hover:translate-x-0.5 transition-transform">→</span>
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ── CONNECTOR BAR ── */}
      <div className="bg-white border-y border-border">
        <div className="mx-auto max-w-[1200px] px-6 py-8">
          <p className="text-[11px] font-display font-bold text-muted uppercase tracking-[0.08em] text-center mb-5">
            Gekoppeld aan 220+ databronnen in real-time
          </p>
          <div className="flex items-center justify-center gap-4 sm:gap-8 flex-wrap opacity-45">
            {nativeConnectors.map((c) => (
              <span key={c.slug} className="text-[10px] sm:text-xs font-bold text-muted tracking-wide">{c.name}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ── HET PROBLEEM ── */}
      <section className="bg-white" style={{ padding: '112px 24px 96px' }}>
        <div className="mx-auto max-w-[1200px]">

          <div className="flex justify-between items-end gap-12 mb-16 flex-col lg:flex-row">
            <div>
              <p className="text-accent text-[12px] font-display font-bold tracking-[0.12em] uppercase mb-4 flex items-center gap-[14px]">
                <span className="inline-block w-6 h-px bg-accent opacity-60 flex-shrink-0" aria-hidden="true" />
                HET PROBLEEM
              </p>
              <h2
                className="font-display font-extrabold text-primary m-0"
                style={{ fontSize: 'clamp(32px, 3.6vw, 52px)', letterSpacing: '-0.03em', lineHeight: '1.08', maxWidth: '18ch' }}
              >
                Je mist de data die er echt toe doet.
              </h2>
            </div>
            <p className="text-muted leading-[1.55] max-w-[280px] lg:text-right" style={{ fontSize: '15px' }}>
              Je accounts genereren duizenden datapunten per minuut. Zonder context is het ruis.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Versnipperde kanalen',
                desc: 'De waarheid ligt verspreid over social media, advertentieplatforms en e-commerce systemen. Koppel je ze niet, dan stuur je blind.',
              },
              {
                title: 'Rapportage is een achteruitkijkspiegel',
                desc: "Dashboards vertellen je wat er gisteren is gebeurd. Je klant betaalt voor wat er morgen moet gebeuren. Niemand wordt blij van een PDF met 40 pagina's.",
              },
              {
                title: "Non-billable uren vreten je marge",
                desc: 'Vijf man op reporting, nul op strategie. Exporteren, combineren, formatteren — tijd die naar creatie, optimalisatie of klantcontact moet gaan.',
              },
            ].map((item) => (
              <article key={item.title} className="pt-6 border-t border-border">
                <h3
                  className="font-display font-bold text-primary mb-3"
                  style={{ fontSize: '18px', letterSpacing: '-0.01em', lineHeight: '1.2' }}
                >
                  {item.title}
                </h3>
                <p className="text-muted leading-[1.6]" style={{ fontSize: '15px' }}>{item.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── DE ENGINE ── */}
      <section className="bg-primary" style={{ padding: '112px 24px' }}>
        <div className="mx-auto max-w-[1200px]">

          <div className="flex justify-between items-end gap-12 mb-14 flex-col lg:flex-row">
            <div>
              <p className="text-[#5DA3FF] text-[12px] font-display font-bold tracking-[0.12em] uppercase mb-4 flex items-center gap-[14px]">
                <span className="inline-block w-6 h-px bg-[#5DA3FF] opacity-60 flex-shrink-0" aria-hidden="true" />
                HOE HET WERKT
              </p>
              <h2
                className="font-display font-extrabold text-white m-0"
                style={{ fontSize: 'clamp(32px, 3.6vw, 52px)', letterSpacing: '-0.03em', lineHeight: '1.08', maxWidth: '16ch' }}
              >
                Als de data klopt, verdwijnt de mist.
              </h2>
            </div>
            <Link
              href="/werkwijze"
              className="font-display font-semibold text-[14px] text-white/55 hover:text-white transition-colors flex-shrink-0"
            >
              Zie de volledige werkwijze →
            </Link>
          </div>

          <MeetlatRuler color="rgba(255,255,255,.3)" />
          <div className="mt-3 grid grid-cols-4 font-mono text-[11px] text-white/35 tracking-[0.04em]">
            <span>01 / KOPPELEN</span>
            <span>02 / VERGELIJKEN</span>
            <span>03 / ACTIVEREN</span>
            <span>04 / VERBETEREN</span>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Koppelen', desc: 'Alle ruwe data uit 220+ bronnen realtime in één overzicht. Geen middleware, geen vertraging.', claim: 'Geen black boxes.' },
              { step: '02', title: 'Vergelijken', desc: "Platform-cijfers naast de werkelijkheid in je CRM. Waar Meta of Google afwijkt, wordt dat meetbaar.", claim: 'Niet vermoed, wel bewezen.' },
              { step: '03', title: 'Activeren', desc: 'Concrete actiepunten per euro. Stevin vertelt waar je morgen moet sturen.', claim: 'Adviezen, geen dashboards.' },
              { step: '04', title: 'Verbeteren', desc: 'Het platform leert van elke interactie. Rapportages en adviezen passen zich aan op jouw werkwijze.', claim: 'Feedback loop als fundament.' },
            ].map((item) => (
              <article key={item.step} className="pt-2">
                <span
                  className="font-display font-extrabold text-accent leading-none"
                  style={{ fontSize: '72px', letterSpacing: '-0.04em' }}
                >
                  {item.step}
                </span>
                <h3
                  className="font-display font-bold text-white mt-4 mb-3"
                  style={{ fontSize: '20px', letterSpacing: '-0.02em' }}
                >
                  {item.title}
                </h3>
                <p className="text-white/55 leading-[1.6] mb-6" style={{ fontSize: '14.5px' }}>
                  {item.desc}
                </p>
                <div className="flex items-center gap-2.5 pt-5 border-t border-white/10">
                  <span className="w-2 h-2 rounded-full bg-accent flex-shrink-0" aria-hidden="true" />
                  <p className="font-display font-bold text-accent" style={{ fontSize: '14px', letterSpacing: '-0.01em' }}>
                    {item.claim}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── VOORDELEN 2×2 ── */}
      <section className="bg-surface" style={{ padding: '96px 24px' }}>
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-12">
            <p className="text-accent text-[12px] font-display font-bold tracking-[0.12em] uppercase mb-4 flex items-center gap-[14px]">
              <span className="inline-block w-6 h-px bg-accent opacity-60 flex-shrink-0" aria-hidden="true" />
              ONTWORPEN VOOR JOUW PRAKTIJK
            </p>
            <h2
              className="font-display font-extrabold text-primary m-0"
              style={{ fontSize: 'clamp(32px, 3.6vw, 52px)', letterSpacing: '-0.03em', lineHeight: '1.08', maxWidth: '18ch' }}
            >
              Klaar voor gebruik. Niet voor een proof of concept.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                num: '01',
                title: 'Live in 2 weken',
                desc: 'Koppelingen geactiveerd, eerste signalen zichtbaar. Geen maandenlang implementatietraject.',
              },
              {
                num: '02',
                title: 'Human-in-the-loop standaard',
                desc: 'AI signaleert, jij beslist. Geen autonome acties zonder jouw goedkeuring.',
              },
              {
                num: '03',
                title: 'Domeinkennis ingebouwd',
                desc: 'Gebouwd door marketers, voor marketers. Stevin begrijpt het verschil tussen een spike en een structureel probleem.',
              },
              {
                num: '04',
                title: 'Leert van je resultaten',
                desc: 'Elke interactie maakt het systeem scherper. Adviezen worden beter naarmate je langer werkt.',
              },
            ].map((item) => (
              <article
                key={item.title}
                className="rounded-[14px] bg-white border border-border flex flex-col items-center text-center gap-3"
                style={{ padding: '40px 32px' }}
              >
                <span
                  className="font-display font-extrabold text-pink leading-none"
                  style={{ fontSize: '48px', letterSpacing: '-0.04em' }}
                >
                  {item.num}
                </span>
                <h3
                  className="font-display font-bold text-primary"
                  style={{ fontSize: '18px', letterSpacing: '-0.02em', lineHeight: '1.2' }}
                >
                  {item.title}
                </h3>
                <p className="text-muted leading-[1.6]" style={{ fontSize: '14.5px' }}>
                  {item.desc}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── VERTROUWEN ── */}
      <section className="bg-primary" style={{ padding: '96px 24px' }}>
        <div className="mx-auto max-w-[1200px]">
          <div className="text-center mb-14">
            <p className="text-[#5DA3FF] text-[12px] font-display font-bold tracking-[0.12em] uppercase mb-4 flex items-center justify-center gap-[14px]">
              <span className="inline-block w-6 h-px bg-[#5DA3FF] opacity-60 flex-shrink-0" aria-hidden="true" />
              BEVEILIGING &amp; COMPLIANCE
            </p>
            <h2
              className="font-display font-extrabold text-white m-0"
              style={{ fontSize: 'clamp(32px, 3.6vw, 52px)', letterSpacing: '-0.03em', lineHeight: '1.08' }}
            >
              Veilig by default.
            </h2>
            <p className="text-white/55 leading-[1.55] mt-5 mx-auto" style={{ fontSize: '17px', maxWidth: '440px' }}>
              Jouw klantdata verlaat nooit de EU. Gebouwd voor de Europese markt, van dag één.
            </p>
          </div>

          {/* Badges */}
          <div className="flex justify-center flex-wrap gap-6 mb-14">

            {/* 1 — COMPLIANT */}
            <svg viewBox="0 0 100 100" width="108" height="108" aria-label="GDPR Compliant">
              <circle cx="50" cy="50" r="47" stroke="rgba(255,255,255,0.22)" strokeWidth="1.5" fill="none"/>
              <path d="M50 22 L66 30 L66 47 C66 57 59 64 50 67 C41 64 34 57 34 47 L34 30 Z"
                    stroke="rgba(255,255,255,0.8)" strokeWidth="1.4" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
              <polyline points="43,46 48,53 59,39"
                        stroke="rgba(255,255,255,0.8)" strokeWidth="1.6" fill="none"
                        strokeLinecap="round" strokeLinejoin="round"/>
              <text x="50" y="84" textAnchor="middle" fontSize="7.5" fontWeight="700"
                    fill="rgba(255,255,255,0.75)" letterSpacing="1.5" fontFamily="system-ui,sans-serif">COMPLIANT</text>
            </svg>

            {/* 2 — EU HOSTED */}
            <svg viewBox="0 0 100 100" width="108" height="108" aria-label="EU Hosted">
              <circle cx="50" cy="50" r="47" stroke="rgba(255,255,255,0.22)" strokeWidth="1.5" fill="none"/>
              {[...Array(12)].map((_, i) => {
                const a = (i * 30 - 90) * Math.PI / 180
                return (
                  <text key={i} x={50 + 27 * Math.cos(a)} y={43 + 27 * Math.sin(a)}
                        textAnchor="middle" dominantBaseline="central"
                        fontSize="5.5" fill="rgba(255,255,255,0.8)" fontFamily="system-ui">★</text>
                )
              })}
              <text x="50" y="43" textAnchor="middle" dominantBaseline="central"
                    fontSize="13" fontWeight="800" fill="rgba(255,255,255,0.8)" fontFamily="system-ui,sans-serif">EU</text>
              <text x="50" y="84" textAnchor="middle" fontSize="7.5" fontWeight="700"
                    fill="rgba(255,255,255,0.75)" letterSpacing="1.5" fontFamily="system-ui,sans-serif">HOSTED</text>
            </svg>

            {/* 3 — AI ACT READY */}
            <svg viewBox="0 0 100 100" width="108" height="108" aria-label="AI Act Ready">
              <circle cx="50" cy="50" r="47" stroke="rgba(255,255,255,0.22)" strokeWidth="1.5" fill="none"/>
              {[...Array(8)].map((_, i) => {
                const a = ((i * 25) - 87.5 - 90) * Math.PI / 180
                return (
                  <text key={i} x={50 + 31 * Math.cos(a)} y={44 + 31 * Math.sin(a)}
                        textAnchor="middle" dominantBaseline="central"
                        fontSize="4.5" fill="rgba(255,255,255,0.8)" fontFamily="system-ui">★</text>
                )
              })}
              <rect x="38" y="31" width="24" height="20" rx="3"
                    stroke="rgba(255,255,255,0.8)" strokeWidth="1.3" fill="none"/>
              <line x1="43" y1="31" x2="43" y2="26" stroke="rgba(255,255,255,0.6)" strokeWidth="1.2" strokeLinecap="round"/>
              <line x1="50" y1="31" x2="50" y2="26" stroke="rgba(255,255,255,0.6)" strokeWidth="1.2" strokeLinecap="round"/>
              <line x1="57" y1="31" x2="57" y2="26" stroke="rgba(255,255,255,0.6)" strokeWidth="1.2" strokeLinecap="round"/>
              <line x1="43" y1="51" x2="43" y2="56" stroke="rgba(255,255,255,0.6)" strokeWidth="1.2" strokeLinecap="round"/>
              <line x1="50" y1="51" x2="50" y2="56" stroke="rgba(255,255,255,0.6)" strokeWidth="1.2" strokeLinecap="round"/>
              <line x1="57" y1="51" x2="57" y2="56" stroke="rgba(255,255,255,0.6)" strokeWidth="1.2" strokeLinecap="round"/>
              <line x1="38" y1="37" x2="33" y2="37" stroke="rgba(255,255,255,0.6)" strokeWidth="1.2" strokeLinecap="round"/>
              <line x1="38" y1="44" x2="33" y2="44" stroke="rgba(255,255,255,0.6)" strokeWidth="1.2" strokeLinecap="round"/>
              <line x1="62" y1="37" x2="67" y2="37" stroke="rgba(255,255,255,0.6)" strokeWidth="1.2" strokeLinecap="round"/>
              <line x1="62" y1="44" x2="67" y2="44" stroke="rgba(255,255,255,0.6)" strokeWidth="1.2" strokeLinecap="round"/>
              <text x="50" y="42" textAnchor="middle" dominantBaseline="central"
                    fontSize="9" fontWeight="800" fill="rgba(255,255,255,0.8)" fontFamily="system-ui,sans-serif">AI</text>
              <text x="50" y="79" textAnchor="middle" fontSize="7" fontWeight="700"
                    fill="rgba(255,255,255,0.75)" letterSpacing="0.8" fontFamily="system-ui,sans-serif">AI ACT READY</text>
            </svg>

            {/* 4 — READ ONLY */}
            <svg viewBox="0 0 100 100" width="108" height="108" aria-label="Read Only">
              <circle cx="50" cy="50" r="47" stroke="rgba(255,255,255,0.22)" strokeWidth="1.5" fill="none"/>
              <path d="M22 42 Q36 27 50 27 Q64 27 78 42 Q64 57 50 57 Q36 57 22 42 Z"
                    stroke="rgba(255,255,255,0.8)" strokeWidth="1.4" fill="none" strokeLinejoin="round"/>
              <circle cx="50" cy="42" r="7.5" stroke="rgba(255,255,255,0.8)" strokeWidth="1.3" fill="none"/>
              <circle cx="50" cy="42" r="3" fill="rgba(255,255,255,0.75)"/>
              <rect x="59" y="49" width="14" height="11" rx="2"
                    stroke="rgba(255,255,255,0.8)" strokeWidth="1.3" fill="none"/>
              <path d="M62 49 L62 45 Q62 41 66 41 Q70 41 70 45 L70 49"
                    stroke="rgba(255,255,255,0.8)" strokeWidth="1.3" fill="none" strokeLinecap="round"/>
              <circle cx="66" cy="55.5" r="1.8" fill="rgba(255,255,255,0.7)"/>
              <text x="50" y="84" textAnchor="middle" fontSize="7.5" fontWeight="700"
                    fill="rgba(255,255,255,0.75)" letterSpacing="1.5" fontFamily="system-ui,sans-serif">READ ONLY</text>
            </svg>

            {/* 5 — API ACCESS */}
            <svg viewBox="0 0 100 100" width="108" height="108" aria-label="API Access">
              <circle cx="50" cy="50" r="47" stroke="rgba(255,255,255,0.22)" strokeWidth="1.5" fill="none"/>
              <path d="M43 26 Q37 26 37 32 L37 39 Q37 44 31 44 Q37 44 37 49 L37 56 Q37 62 43 62"
                    stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" fill="none"
                    strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M57 26 Q63 26 63 32 L63 39 Q63 44 69 44 Q63 44 63 49 L63 56 Q63 62 57 62"
                    stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" fill="none"
                    strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="44" cy="44" r="2.5" fill="rgba(255,255,255,0.78)"/>
              <circle cx="50" cy="44" r="2.5" fill="rgba(255,255,255,0.78)"/>
              <circle cx="56" cy="44" r="2.5" fill="rgba(255,255,255,0.78)"/>
              <text x="50" y="84" textAnchor="middle" fontSize="7.5" fontWeight="700"
                    fill="rgba(255,255,255,0.75)" letterSpacing="1.5" fontFamily="system-ui,sans-serif">API ACCESS</text>
            </svg>

          </div>

          <p
            className="text-center text-white/35 leading-[1.6]"
            style={{ fontSize: '14px', maxWidth: '600px', margin: '0 auto' }}
          >
            EU-gehoste infrastructuur. GDPR-conform en AI Act-ready. Alle data versleuteld opgeslagen en verzonden. Koppelingen zijn altijd read-only — Stevin schrijft nooit terug naar je platformen.
          </p>

          {/* 3 trust pillars */}
          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Per-klant data-isolatie',
                desc: 'Elk klantaccount draait in een eigen beveiligde omgeving. Geen cross-contaminatie, nooit.',
              },
              {
                title: 'Read-only koppelingen',
                desc: 'Stevin leest, nooit schrijft. We hebben geen toegang om iets te wijzigen in je advertentieaccounts.',
              },
              {
                title: 'Geen black boxes',
                desc: 'Je ziet altijd waarom een signaal is gegenereerd en op welke data het gebaseerd is.',
              },
            ].map((pillar) => (
              <article key={pillar.title} className="pt-6 border-t border-white/10">
                <div className="flex items-center gap-2.5 mb-3">
                  <span className="w-2 h-2 rounded-full bg-neon flex-shrink-0" aria-hidden="true" />
                  <h3
                    className="font-display font-bold text-white"
                    style={{ fontSize: '16px', letterSpacing: '-0.01em' }}
                  >
                    {pillar.title}
                  </h3>
                </div>
                <p className="text-white/50 leading-[1.6]" style={{ fontSize: '14.5px' }}>
                  {pillar.desc}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── RESULTAAT ── */}
      <section className="bg-surface" style={{ padding: '96px 24px' }}>
        <div className="mx-auto max-w-[1200px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-accent text-[12px] font-display font-bold tracking-[0.12em] uppercase mb-4 flex items-center gap-[14px]">
                <span className="inline-block w-6 h-px bg-accent opacity-60 flex-shrink-0" aria-hidden="true" />
                BEWEZEN RESULTAAT
              </p>
              <h2
                className="font-display font-extrabold text-primary"
                style={{ fontSize: 'clamp(32px, 3.6vw, 52px)', letterSpacing: '-0.03em', lineHeight: '1.08' }}
              >
                Ontworpen voor schaal.
              </h2>
              <p className="text-muted leading-[1.6] mt-6" style={{ fontSize: '16px' }}>
                Of je nu tientallen ad-accounts beheert voor klanten, of de cross-channel interacties van miljoenen fans monitort: Stevin schaalt mee.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="rounded-[14px] border border-border bg-white p-8">
                <p
                  className="font-display font-extrabold text-neon"
                  style={{ fontSize: 'clamp(40px, 5vw, 64px)', letterSpacing: '-0.04em', lineHeight: '1' }}
                >
                  -35%
                </p>
                <p className="text-muted mt-3 leading-[1.4]" style={{ fontSize: '13px' }}>Minder budgetverspilling</p>
              </div>
              <div className="rounded-[14px] border border-border bg-white p-8">
                <p
                  className="font-display font-extrabold text-accent"
                  style={{ fontSize: 'clamp(40px, 5vw, 64px)', letterSpacing: '-0.04em', lineHeight: '1' }}
                >
                  220+
                </p>
                <p className="text-muted mt-3 leading-[1.4]" style={{ fontSize: '13px' }}>Native integraties out-of-the-box</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-white" style={{ padding: '96px 24px' }}>
        <div className="mx-auto max-w-[1200px]">
          <div className="flex justify-between items-end gap-12 mb-12 flex-col lg:flex-row">
            <div>
              <p className="text-accent text-[12px] font-display font-bold tracking-[0.12em] uppercase mb-4 flex items-center gap-[14px]">
                <span className="inline-block w-6 h-px bg-accent opacity-60 flex-shrink-0" aria-hidden="true" />
                VRAGEN
              </p>
              <h2
                className="font-display font-extrabold text-primary m-0"
                style={{ fontSize: 'clamp(28px, 3vw, 44px)', letterSpacing: '-0.03em', lineHeight: '1.1' }}
              >
                Veelgestelde vragen
              </h2>
            </div>
          </div>
          <FAQAccordion faqs={homepageFaqs} />
        </div>
      </section>

      {/* ── CLOSING ── */}
      <section className="bg-primary" style={{ padding: '112px 24px 128px' }}>
        <div className="mx-auto max-w-[1200px]">
          <p className="text-neon text-[14px] font-display font-bold tracking-[0.14em] uppercase mb-7 flex items-center gap-[14px]">
            <span className="inline-block w-6 h-px bg-neon flex-shrink-0" aria-hidden="true" />
            Het is geen wonder. Het is Stevin.
          </p>
          <div className="flex items-end justify-between gap-12 flex-col lg:flex-row">
            <h2
              className="font-display font-extrabold text-white m-0"
              style={{ fontSize: 'clamp(40px, 5vw, 72px)', lineHeight: '1.02', letterSpacing: '-0.032em', maxWidth: '14ch' }}
            >
              Zie wat je betaalt.<br />
              Zie wat het oplevert.
            </h2>
            <div className="flex flex-col items-start lg:items-end gap-5">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 font-display font-bold text-[15px] bg-neon text-primary rounded-[10px] hover:bg-neon-dark transition-colors neon-glow"
              >
                Plan een gesprek
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                </svg>
              </Link>
              <div className="flex gap-6 flex-wrap">
                <Link href="/marketing" className="font-display font-semibold text-sm text-white/45 hover:text-white transition-colors">Voor Marketing →</Link>
                <Link href="/artiesten" className="font-display font-semibold text-sm text-white/45 hover:text-white transition-colors">Voor Artiesten →</Link>
              </div>
            </div>
          </div>

          <div
            className="mt-20 flex justify-between flex-wrap gap-4 pt-7"
            style={{ borderTop: '1px solid rgba(255,255,255,.1)' }}
          >
            <p className="italic text-[13px]" style={{ color: 'rgba(255,255,255,.35)' }}>
              &ldquo;Wonder en is gheen wonder.&rdquo; — Simon Stevin, 1586
            </p>
            <p
              className="font-display text-[12px] font-medium tracking-[0.06em] uppercase"
              style={{ color: 'rgba(255,255,255,.3)' }}
            >
              stevin.ai
            </p>
          </div>
        </div>
      </section>

      <StickyMobileCTA />
    </>
  )
}
