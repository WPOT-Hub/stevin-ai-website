import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import ContactForm from '@/components/ContactForm'
import PhpCheck from '@/components/PhpCheck'
import NodeWatermerk from '@/components/rethink/NodeWatermerk'
import { Punten, Vragen, h2Stijl, tekst, type Vraag } from '@/components/rethink/RethinkBlokken'

// W-663 (26 okt 2026, D-110): het aanbod onderaan is de Black Friday-actie
// (tot en met 30 november, vijf plekken); voorwaarden op /black-friday. Na
// 30 november gaat de actie hier en op /black-friday weg (CRM-taak 1 dec).
// W-652 (23 okt 2026): PHP-lekcheck. Indexeerbaar op Koens vraag ("Bouw en
// SEO erop"). SERP van 23 okt voor "php lek check website" en "php lek
// controleren" is gemengd (nieuws, uitleg, tools), zie
// Stevin-Hub/docs/zoekintentie/stevin.ai.md.
//
// W-670 (26 okt 2026): in de opmaak van de nieuwe pagina's (label zonder
// streepje, bouwstenen uit RethinkBlokken, Koen: "dat streepje hebben we er
// niet meer voor"), het derde lek van 23 oktober erbij (CVE-2026-115560,
// php.net/archive/2026.php#2026-10-23-1) en een link naar het Journal-bericht.

type Props = { params: Promise<{ locale: string }> }

const URL = 'https://stevin.ai/php-lek-check'
const BERICHT = '/blog/derde-php-lek-controleer-je-website'

export const metadata: Metadata = {
  title: 'PHP-lekcheck: staat de update op je website?',
  description:
    'Check online welke PHP-versie je server meldt, of de update van 21 oktober erop staat en wat je nu moet doen. Gratis en zonder account.',
  alternates: { canonical: URL },
  openGraph: {
    title: 'PHP-lekcheck: staat de update op je website?',
    description: 'Zie in een paar seconden welke PHP-versie je server meldt en wat je nu moet doen.',
    url: URL,
    type: 'website',
  },
}

const VRAGEN: Vraag[] = [
  {
    v: 'Wat is het PHP-lek van oktober 2026?',
    a: 'Op 21 oktober 2026 werden twee kritieke lekken in PHP zelf bekend (CVE-2026-109618 en CVE-2026-109619). Via die lekken kan iemand van buitenaf een webserver overnemen. Omdat een groot deel van alle websites op PHP draait, haalden hosters als Yourhosting en MijnDomein sites uit voorzorg offline.',
  },
  {
    v: 'Welke PHP-versies zijn veilig?',
    a: 'De update tegen de lekken van 21 oktober zit in PHP 8.5.12, 8.4.27, 8.3.36 en 8.2.35. Elke eerdere versie in die reeksen heeft die lekken. Voor PHP 8.1 en ouder brengt PHP geen nieuwe release meer uit; daar bestaan alleen losse reparaties. Let op: het lek van 23 oktober zit ook in deze bijgewerkte versies.',
  },
  {
    v: 'Is er na 21 oktober nog een lek gevonden?',
    a: 'Ja. Op 23 oktober meldde PHP een derde lek, CVE-2026-115560. Het werkt alleen bij een ongebruikelijke combinatie van instellingen en code, en zit ook in de bijgewerkte versies. Een update komt met de volgende gewone release. Tot dan raadt PHP aan om session.upload_progress.enabled op 0 te zetten, in php.ini of de serverconfiguratie.',
  },
  {
    v: 'Helpt het als ik WordPress en mijn plugins bijwerk?',
    a: 'Nee. Het lek zit in PHP op de server, niet in WordPress. Een WordPress-update of een beveiligingsplugin lost dit niet op. De PHP-versie op de server moet omhoog, en dat doet meestal je hoster.',
  },
  {
    v: 'Mijn site toont geen PHP-versie. Ben ik dan veilig?',
    a: 'Niet per se. Veel servers houden hun versie voor zich, en dat is netjes. Het betekent alleen dat je het van buitenaf niet ziet. Vraag je hoster welke PHP-versie draait en of de update van 21 oktober erop staat.',
  },
  {
    v: 'De update staat erop. Ben ik nu klaar?',
    a: 'Nog niet helemaal. Zet ook session.upload_progress.enabled op 0 tot de volgende release, vanwege het lek van 23 oktober. En een update dicht het lek, maar haalt geen inbraak weg die er al was. Laat je bouwer nakijken of er sinds 21 oktober bestanden of beheerders zijn bijgekomen.',
  },
  // W-672: vragen van Koen (ombouwen, overstappen) en uit de aanvullingen van
  // Google op "php updaten" (26 okt 2026: php updaten wordpress, php updaten
  // antagonist, php update strato).
  {
    v: 'Kan ik mijn huidige site laten ombouwen?',
    a: 'Meestal wel. We kijken eerst wat je site doet. Een gewone bedrijfssite bouwen we opnieuw op zonder PHP, met je huidige teksten en beelden. Heb je een webshop, een inlog of een boekingssysteem, dan zeggen we vooraf eerlijk wat er zonder PHP wel en niet kan. Tot en met 30 november is dat onze Black Friday-actie: teken je voor een jaar met Stevin.AI, dan bouwen we je nieuwe site gratis, met een jaar hosting erbij. Vijf plekken; de voorwaarden staan op stevin.ai/black-friday.',
  },
  {
    v: 'Hoe stap ik over van PHP?',
    a: 'Dat kan op twee manieren. Je blijft op PHP en zorgt dat je hoster elke update installeert; met WordPress houd je dan ook zelf je thema en plugins bij. Of je laat je site ombouwen naar een site die geen PHP nodig heeft, zonder database en zonder plugins die je moet bijwerken. Die tweede weg bouwen wij.',
  },
  {
    v: 'Hoe update ik PHP op mijn website?',
    a: 'Bij gedeelde hosting kies je de PHP-versie vaak zelf in het beheerpaneel van je hoster. Maak eerst een back-up, kies dan de nieuwste versie die je hoster aanbiedt en kijk of je site het nog doet, want oude thema\'s en plugins werken soms niet met een nieuwe PHP-versie. Of de update van 21 oktober in die versie zit, weet alleen je hoster: vraag het na en draai daarna de check opnieuw.',
  },
  {
    v: 'Wat doet deze check precies?',
    a: 'We halen je voorpagina op zoals een gewone bezoeker dat doet, en lezen wat je server zelf meldt over PHP en welk systeem je site gebruikt. We vallen niets aan, veranderen niets en bewaren je adres niet. Instellingen zoals session.upload_progress.enabled zie je van buitenaf niet.',
  },
]

const STAPPEN = [
  {
    t: 'Vraag je hoster om de update',
    d: 'Vraag welke PHP-versie je site draait en of de update van 21 oktober erop staat. Bij gedeelde hosting kan alleen de hoster dit doen.',
  },
  {
    t: 'Laat een instelling uitzetten',
    d: 'Tegen het lek van 23 oktober is nog geen update. Laat session.upload_progress.enabled op 0 zetten in php.ini of de serverconfiguratie, tot de volgende release er is.',
  },
  {
    t: 'Laat nakijken of er iemand binnen was',
    d: 'Een update dicht het lek, maar haalt geen eerdere inbraak weg. Laat je bouwer kijken naar nieuwe bestanden en nieuwe beheerders sinds 21 oktober.',
  },
  {
    t: 'Kijk verder dan deze week',
    d: 'PHP 8.2 krijgt na 31 december 2026 geen beveiligingsupdates meer. Draai je daarop, plan dan nu al de overstap.',
  },
]

const label = 'm-0 mb-5 font-display text-[12px] font-bold uppercase tracking-[0.12em] text-accent'

export default async function PhpLekCheckPage({ params }: Props) {
  const { locale } = await params
  if (locale !== 'nl') notFound()
  setRequestLocale(locale)

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
    <main className="-mt-[72px] bg-white">
      {/* Statische objecten uit dit bestand, geen invoer van bezoekers. */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdTool) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }} />

      {/* Kop met de check, donker zoals de hero's van de nieuwe pagina's. */}
      <section className="relative overflow-hidden bg-primary px-6 pb-24 pt-[184px] text-white sm:pt-[200px]">
        <NodeWatermerk seed={61} thema="donker" />
        <div className="relative mx-auto max-w-[1152px]">
          <p className={label}>PHP-lekcheck</p>
          <h1
            className="m-0 max-w-[20ch] text-balance font-display font-extrabold text-white"
            style={{ ...h2Stijl, fontSize: 'clamp(34px, 4.4vw, 60px)' }}
          >
            Staat de update tegen het <span className="text-accent">PHP-lek</span> al op je website?
          </h1>
          <p className="m-0 mt-6 max-w-[640px] text-[18px] leading-[1.55] text-white/75">
            In oktober werden drie lekken in PHP bekend, en hosters haalden sites offline. Vul je website in en zie in een paar seconden
            welke PHP-versie je server meldt.
          </p>
          <div className="mt-10 max-w-[900px] rounded-[14px] bg-surface p-6 md:p-8">
            <PhpCheck />
          </div>
          <p className="m-0 mt-6 text-sm text-white/60">Gratis, zonder account. We bewaren je adres niet.</p>
        </div>
      </section>

      {/* Wat er aan de hand is */}
      <section className="px-6" style={{ paddingTop: 104, paddingBottom: 104 }}>
        <div className="mx-auto max-w-[1152px]">
          <h2 className="m-0 max-w-[20ch] font-display font-extrabold text-primary" style={h2Stijl}>
            Het lek zit in PHP zelf, niet in je website.
          </h2>
          <div className={`mt-8 max-w-[680px] flex flex-col gap-5 ${tekst}`}>
            <p className="m-0">
              PHP is de taal waarop een groot deel van alle websites draait, waaronder elke WordPress-site. Op 21 oktober 2026 bracht PHP
              een noodupdate uit voor twee lekken waarmee iemand van buitenaf een webserver kan overnemen. De update zit in PHP 8.5.12,
              8.4.27, 8.3.36 en 8.2.35. Voor PHP 8.1 en ouder komt er geen nieuwe release meer.
            </p>
            <p className="m-0">
              Op 23 oktober meldde PHP nog een lek. Dat zit ook in de bijgewerkte versies, maar werkt alleen bij een ongebruikelijke
              combinatie van instellingen en code. Een update komt met de volgende gewone release; tot dan raadt PHP aan om
              session.upload_progress.enabled op 0 te zetten.{' '}
              <Link href={BERICHT} className="font-semibold text-primary underline decoration-accent underline-offset-4">
                Lees wat dat voor je betekent
              </Link>
              .
            </p>
            <p className="m-0 text-[16px] text-muted">
              Bronnen:{' '}
              <a className="underline" href="https://www.php.net/archive/2026.php" target="_blank" rel="noopener noreferrer">
                beveiligingsmeldingen van PHP
              </a>
              ,{' '}
              <a
                className="underline"
                href="https://www.ncsc.nl/en/alerts/update-php-vulnerabilities-remain-a-reason-for-immediate-patching"
                target="_blank"
                rel="noopener noreferrer"
              >
                waarschuwing van het NCSC
              </a>{' '}
              en het{' '}
              <a
                className="underline"
                href="https://www.rd.nl/a/nog-niet-alle-websites-weer-in-de-lucht-na-php-lek"
                target="_blank"
                rel="noopener noreferrer"
              >
                Reformatorisch Dagblad
              </a>{' '}
              over hosters die sites offline haalden.
            </p>
          </div>
        </div>
      </section>

      {/* Wat je nu doet */}
      <section className="bg-surface px-6" style={{ paddingTop: 104, paddingBottom: 104 }}>
        <div className="mx-auto max-w-[1152px]">
          <h2 className="m-0 max-w-[20ch] font-display font-extrabold text-primary" style={h2Stijl}>
            Vier dingen, in deze volgorde.
          </h2>
          <Punten items={STAPPEN} />
        </div>
      </section>

      {/* Aanbod */}
      <section id="aanbod" className="scroll-mt-24 px-6" style={{ paddingTop: 104, paddingBottom: 104 }}>
        <div className="mx-auto max-w-[900px]">
          <p className={label}>Black Friday 2026, tot en met 30 november</p>
          <h2 className="m-0 max-w-[20ch] font-display font-extrabold text-primary" style={h2Stijl}>
            Een nieuwe website zonder PHP, gratis.
          </h2>
          <div className={`mt-8 flex flex-col gap-5 ${tekst}`}>
            <p className="m-0">
              Wij bouwen websites die geen PHP nodig hebben: snel, bijgewerkt en met meting erin, zodat je per advertentie ziet wat die
              oplevert, van klik tot klant.
            </p>
            <p className="m-0">
              Dit is onze Black Friday-actie: teken tot en met 30 november voor een jaar met Stevin.AI, dan bouwen we je nieuwe
              website gratis, met een jaar hosting erbij. Vijf plekken, op volgorde van tekenen. Laat je gegevens achter, dan
              bellen we je.
            </p>
          </div>
          <div className="mt-10">
            {/* W-671: een keuze in plaats van een open vraag, zodat Koen een aanvraag
                kan kwalificeren ("zo kan ik niet kwalificeren met een opmerking"). */}
            <ContactForm
              subject="PHP-lekcheck: gratis website zonder PHP"
              keuzeLabel="Waar ben je naar op zoek?"
              bedrijfEnTelefoonVerplicht
              keuzes={[
                'Ik wil graag meer info over de actie',
                'Ik wil mijn huidige site laten ombouwen',
                'Ik wil een nieuwe site',
                'Ik wil meer klanten uit mijn advertenties',
                'Ik wil weten of mijn huidige site veilig is',
                'Iets anders',
              ]}
              messageLabel="Toelichting (mag leeg blijven)"
              messagePlaceholder="Bijvoorbeeld het adres van je huidige site, of wat je zoekt."
            />
          </div>
          <p className="m-0 mt-6 text-sm text-muted">
            Aan de actie zitten voorwaarden. Die staan op{' '}
            <Link href="/black-friday" className="underline" data-cta="php_lek_check_black_friday_voorwaarden">
              de Black Friday-pagina
            </Link>
            , en we lopen ze samen door. Je domein blijft van jou.
          </p>
        </div>
      </section>

      <div className="bg-surface">
        <Vragen kop="Wat je moet weten over het PHP-lek" vragen={VRAGEN} />
      </div>
    </main>
  )
}
