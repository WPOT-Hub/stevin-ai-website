import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import ContactForm from '@/components/ContactForm'
import FAQAccordion from '@/components/FAQAccordion'
import PhpCheck from '@/components/PhpCheck'

// W-652 (23 okt 2026): PHP-lekcheck. Indexeerbaar op Koens vraag ("Bouw en
// SEO erop"). SERP van 23 okt voor "php lek check website" en "php lek
// controleren" is gemengd (nieuws, uitleg, tools), zie
// Stevin-Hub/docs/zoekintentie/stevin.ai.md.

type Props = { params: Promise<{ locale: string }> }

const URL = 'https://stevin.ai/php-lek-check'

export const metadata: Metadata = {
  title: 'PHP-lekcheck: staat de update op je website?',
  description:
    'Vul je website in en zie welke PHP-versie je server meldt, of de update van 21 oktober erop staat en wat je nu moet doen. Gratis en zonder account.',
  alternates: { canonical: URL },
  openGraph: {
    title: 'PHP-lekcheck: staat de update op je website?',
    description: 'Zie in een paar seconden welke PHP-versie je server meldt en wat je nu moet doen.',
    url: URL,
    type: 'website',
  },
}

const faqs = [
  {
    question: 'Wat is het PHP-lek van oktober 2026?',
    answer:
      'Op 21 oktober 2026 werden twee kritieke lekken in PHP zelf bekend (CVE-2026-109618 en CVE-2026-109619). Via die lekken kan iemand van buitenaf een webserver overnemen. Omdat een groot deel van alle websites op PHP draait, haalden hosters als Yourhosting en MijnDomein sites uit voorzorg offline.',
  },
  {
    question: 'Welke PHP-versies zijn veilig?',
    answer:
      'De update zit in PHP 8.5.12, 8.4.27, 8.3.36 en 8.2.35. Elke eerdere versie in die reeksen heeft het lek. Voor PHP 8.1 en ouder brengt PHP geen nieuwe release meer uit; daar bestaan alleen losse reparaties.',
  },
  {
    question: 'Helpt het als ik WordPress en mijn plugins bijwerk?',
    answer:
      'Nee. Het lek zit in PHP op de server, niet in WordPress. Een WordPress-update of een beveiligingsplugin lost dit niet op. De PHP-versie op de server moet omhoog, en dat doet meestal je hoster.',
  },
  {
    question: 'Mijn site toont geen PHP-versie. Ben ik dan veilig?',
    answer:
      'Niet per se. Veel servers houden hun versie voor zich, en dat is netjes. Het betekent alleen dat je het van buitenaf niet ziet. Vraag je hoster welke PHP-versie draait en of de update van 21 oktober erop staat.',
  },
  {
    question: 'De update staat erop. Ben ik nu klaar?',
    answer:
      'De update dicht het lek, maar haalt geen inbraak weg die er al was. Wie het lek eerder gebruikte, kan iets hebben achtergelaten. Laat je bouwer nakijken of er sinds 21 oktober bestanden of beheerders zijn bijgekomen.',
  },
  {
    question: 'Wat doet deze check precies?',
    answer:
      'We halen je voorpagina op zoals een gewone bezoeker dat doet, en lezen wat je server zelf meldt over PHP en welk systeem je site gebruikt. We vallen niets aan, veranderen niets en bewaren je adres niet.',
  },
]

const kop = { fontWeight: 800, fontSize: 'clamp(30px, 3.4vw, 48px)', letterSpacing: '-0.03em', lineHeight: '1.08' } as const

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-accent text-[12px] font-display font-bold tracking-[0.12em] uppercase mb-4 flex items-center gap-[14px]">
      <span className="inline-block w-6 h-px bg-accent flex-shrink-0" aria-hidden="true" />
      {children}
    </p>
  )
}

export default async function PhpLekCheckPage({ params }: Props) {
  const { locale } = await params
  if (locale !== 'nl') notFound()
  setRequestLocale(locale)

  const jsonLdFaq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }
  const jsonLdTool = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'PHP-lekcheck',
    url: URL,
    applicationCategory: 'SecurityApplication',
    operatingSystem: 'Web',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
    publisher: { '@type': 'Organization', name: 'Stevin.AI', url: 'https://stevin.ai' },
  }
  const jsonLdBreadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://stevin.ai' },
      { '@type': 'ListItem', position: 2, name: 'PHP-lekcheck', item: URL },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdTool) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }} />

      {/* HERO MET CHECK */}
      <section className="bg-primary -mt-[72px]" style={{ padding: 'calc(96px + 72px) 24px 80px' }}>
        <div className="mx-auto max-w-[900px]">
          <p className="text-[#3D8EFF] text-[13px] font-display font-bold tracking-[0.08em] uppercase mb-8 flex items-center gap-[14px]">
            <span className="inline-block w-7 h-px bg-[#3D8EFF] opacity-60 flex-shrink-0" aria-hidden="true" />
            PHP-LEKCHECK
          </p>
          <h1
            className="font-display font-extrabold text-white leading-[1.06] tracking-[-0.03em]"
            style={{ fontWeight: 700, fontSize: 'clamp(38px, 4.4vw, 60px)', maxWidth: '20ch' }}
          >
            Staat de update tegen het <span className="text-[#3D8EFF]">PHP-lek</span> al op je website?
          </h1>
          <p className="text-white/70 leading-[1.55] mt-8 mb-10" style={{ fontSize: '20px', maxWidth: '640px' }}>
            Op 21 oktober werden twee kritieke lekken in PHP bekend, en hosters haalden sites offline. Vul je website in en
            zie in een paar seconden welke PHP-versie je server meldt.
          </p>
          <div className="rounded-[14px] bg-surface p-6 md:p-8">
            <PhpCheck />
          </div>
          <p className="text-white/60 text-sm mt-6">Gratis, zonder account. We bewaren je adres niet.</p>
        </div>
      </section>

      {/* WAT ER AAN DE HAND IS */}
      <section className="bg-white" style={{ padding: '96px 24px' }}>
        <div className="mx-auto max-w-[900px]">
          <Label>WAT ER AAN DE HAND IS</Label>
          <h2 className="font-display font-extrabold text-primary mb-8" style={kop}>
            Het lek zit in PHP zelf, niet in je website.
          </h2>
          <div className="space-y-4 text-muted text-lg leading-relaxed">
            <p>
              PHP is de taal waarop een groot deel van alle websites draait, waaronder elke WordPress-site. Op 21 oktober
              2026 bracht PHP een noodupdate uit voor twee lekken waarmee iemand van buitenaf een webserver kan overnemen.
            </p>
            <p>
              De update zit in PHP 8.5.12, 8.4.27, 8.3.36 en 8.2.35. Draait je server op een eerdere versie in die reeksen,
              dan heeft hij het lek. Voor PHP 8.1 en ouder komt er geen nieuwe release meer.
            </p>
            <p>
              Bronnen: de{' '}
              <a className="underline" href="https://www.php.net/archive/2026.php#2026-10-21-5" target="_blank" rel="noopener">
                beveiligingsadvisory van php.net
              </a>
              , het{' '}
              <a className="underline" href="https://github.com/NCSC-NL/php2shell" target="_blank" rel="noopener">
                overzicht van het NCSC
              </a>{' '}
              en het{' '}
              <a className="underline" href="https://www.rd.nl/a/nog-niet-alle-websites-weer-in-de-lucht-na-php-lek" target="_blank" rel="noopener">
                Reformatorisch Dagblad
              </a>{' '}
              over hosters die sites offline haalden.
            </p>
          </div>
        </div>
      </section>

      {/* WAT JE NU DOET */}
      <section className="bg-surface" style={{ padding: '96px 24px' }}>
        <div className="mx-auto max-w-[1200px]">
          <Label>WAT JE NU DOET</Label>
          <h2 className="font-display font-extrabold text-primary mb-12" style={kop}>
            Vier dingen, in deze volgorde.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: '1. Vraag je hoster om de update',
                desc: 'Vraag welke PHP-versie je site draait en of de update van 21 oktober erop staat. Bij gedeelde hosting kan alleen de hoster dit doen.',
              },
              {
                title: '2. Reken niet op een WordPress-update',
                desc: 'Het lek zit in PHP op de server. WordPress, je thema of een beveiligingsplugin bijwerken lost dit niet op.',
              },
              {
                title: '3. Laat nakijken of er iemand binnen was',
                desc: 'Een update dicht het lek, maar haalt geen eerdere inbraak weg. Laat je bouwer kijken naar nieuwe bestanden en nieuwe beheerders sinds 21 oktober.',
              },
              {
                title: '4. Kijk verder dan deze week',
                desc: 'PHP 8.2 krijgt na 31 december 2026 geen beveiligingsupdates meer. Draai je daarop, plan dan nu al de overstap.',
              },
            ].map((b) => (
              <div key={b.title} className="rounded-[14px] border border-border bg-white p-7">
                <h3 className="h-sub font-display text-primary mb-3">{b.title}</h3>
                <p className="text-muted leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AANBOD */}
      <section id="aanbod" className="bg-white" style={{ padding: '96px 24px' }}>
        <div className="mx-auto max-w-[900px]">
          <Label>LIEVER GEEN ZORGEN MEER OVER PHP</Label>
          <h2 className="font-display font-extrabold text-primary mb-6" style={kop}>
            Een nieuwe website zonder PHP, gratis.
          </h2>
          <p className="text-muted leading-relaxed mb-4 text-lg">
            Wij bouwen websites die geen PHP nodig hebben: snel, bijgewerkt en met meting erin, zodat je per advertentie
            ziet wat die oplevert, van klik tot klant.
          </p>
          <p className="text-muted leading-relaxed mb-8 text-lg">
            Ga je een jaar met Stevin.AI in zee, dan bouwen we je nieuwe website gratis, met een jaar hosting erbij. Laat je
            gegevens achter, dan bellen we je.
          </p>
          <div className="rounded-[14px] border border-border bg-surface p-8">
            <ContactForm subject="PHP-lekcheck: gratis website zonder PHP" />
          </div>
          <p className="text-sm text-muted/80 mt-6">
            Aan de actie zitten voorwaarden; die lopen we samen door. Je domein blijft van jou.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-surface" style={{ padding: '96px 24px' }}>
        <div className="mx-auto max-w-[900px]">
          <Label>VEELGESTELDE VRAGEN</Label>
          <h2 className="font-display font-extrabold text-primary mb-10" style={kop}>
            Wat je moet weten over het PHP-lek.
          </h2>
          <FAQAccordion faqs={faqs} />
        </div>
      </section>
    </>
  )
}
