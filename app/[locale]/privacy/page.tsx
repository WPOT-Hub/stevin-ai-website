import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const isEn = locale === 'en'
  return {
    title: isEn ? 'Privacy Policy | Stevin.AI' : 'Privacyverklaring | Stevin.AI',
    description: isEn
      ? 'Privacy policy for Stevin.AI: how we collect, store and use personal data.'
      : 'Privacyverklaring van Stevin.AI: hoe wij persoonsgegevens verzamelen, opslaan en gebruiken.',
    alternates: {
      canonical: 'https://stevin.ai/privacy',
      languages: {
        nl: 'https://stevin.ai/nl/privacy',
        en: 'https://stevin.ai/en/privacy',
      },
    },
  }
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const isEn = locale === 'en'
  const lastUpdated = '11 mei 2026'

  return (
    <main className="bg-surface text-primary">
      <div className="mx-auto max-w-3xl px-6 py-16">
      <header className="mb-12">
        <h1 className="text-3xl font-semibold tracking-tight">
          {isEn ? 'Privacy Policy' : 'Privacyverklaring'}
        </h1>
        <p className="mt-2 text-sm text-muted">
          {isEn ? `Last updated: ${lastUpdated}` : `Laatst bijgewerkt: ${lastUpdated}`}
        </p>
      </header>

      {isEn ? <PrivacyEnglish /> : <PrivacyDutch />}

      <footer className="mt-16 border-t border-border pt-8 text-xs text-muted space-y-2">
        <p>
          {isEn ? (
            <>
              Stevin.AI is a trade name of <strong>WPOT B.V.</strong>, registered with the
              Dutch Chamber of Commerce (KvK) under number <strong>87774372</strong>,
              VAT number NL864401954B01. Registered office:{' '}
              <strong>Amstenradestraat 25, 4834 JB Breda, Netherlands</strong>.
            </>
          ) : (
            <>
              Stevin.AI is een handelsnaam van <strong>WPOT B.V.</strong>, ingeschreven bij
              de Kamer van Koophandel onder nummer <strong>87774372</strong>,
              BTW-nummer NL864401954B01. Vestigingsadres:{' '}
              <strong>Amstenradestraat 25, 4834 JB Breda, Nederland</strong>.
            </>
          )}
        </p>
        <p>
          {isEn ? 'Contact: ' : 'Contact: '}
          <a href="mailto:privacy@stevin.ai" className="underline">privacy@stevin.ai</a>
        </p>
      </footer>
      </div>
    </main>
  )
}

function PrivacyDutch() {
  return (
    <article className="prose prose-neutral max-w-none space-y-6 text-sm leading-relaxed">
      <section>
        <h2 className="text-xl font-semibold">Wie zijn wij</h2>
        <p>
          Stevin.AI (&quot;Stevin&quot;) is een AI-platform geleverd door
          WPOT B.V., gevestigd in Nederland. Wij helpen marketingteams en bureaus om
          campagne-issues eerder te signaleren dan de reguliere rapportage doet.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Welke gegevens verzamelen wij</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            <strong>Account-gegevens</strong>: naam, zakelijk e-mailadres, organisatie,
            rol binnen je team.
          </li>
          <li>
            <strong>Campagne- en analytics-data</strong>: alleen via expliciete OAuth-koppelingen
            die jij zelf initieert (zoals Google Ads, Meta, GA4). Wij ontvangen alleen
            leesrechten op campagne-metrics, geen creditcard- of betalingsgegevens.
          </li>
          <li>
            <strong>Gebruiksdata van het platform</strong>: paginabezoeken, gebruikte features,
            tijdstempels, om de dienst te verbeteren en misbruik te detecteren.
          </li>
          <li>
            <strong>Technische data</strong>: IP-adres, browser-type, apparaattype voor
            beveiligings- en debugdoeleinden.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Waarom gebruiken wij deze gegevens</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>Om je toegang te geven tot het platform en de gekoppelde data.</li>
          <li>Om signalen, alerts en aanbevelingen te genereren voor jouw campagnes.</li>
          <li>Om beveiligingsincidenten te detecteren en op te lossen.</li>
          <li>Om de dienst te verbeteren op basis van anonieme gebruikspatronen.</li>
        </ul>
        <p>
          Wij verkopen geen persoonsgegevens. Wij delen jouw campagnedata niet met andere
          klanten van Stevin. Per organisatie geldt strikte tenant-isolatie.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Bewaarduur</h2>
        <p>
          Account-gegevens bewaren wij zolang je een actief account hebt, plus 12 maanden na
          beeindiging voor administratieve en fiscale verplichtingen. Campagne-data wordt
          verwijderd binnen 30 dagen na het ontkoppelen van een platform of het opzeggen van
          de dienst.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Met wie delen wij gegevens</h2>
        <p>
          Wij gebruiken een beperkt aantal sub-verwerkers, allen onder verwerkersovereenkomst:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Supabase (database hosting, EU-region): opslag van platformdata.</li>
          <li>AWS (EU-region): applicatie-infrastructuur.</li>
          <li>Vercel (EU-region): front-end hosting.</li>
          <li>Resend (EU-region): transactionele e-mail.</li>
          <li>Anthropic / OpenAI: alleen voor AI-functies, met gestripte/anonieme prompts
            waar mogelijk; geen persoonsgegevens in trainingsdata.</li>
        </ul>
        <p>
          De OAuth-koppelingen (zoals Google Ads, Meta, Pinterest, LinkedIn) lopen rechtstreeks
          tussen jou en het platform. Wij ontvangen alleen de tokens die jij autoriseert.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Jouw rechten</h2>
        <p>
          Onder de AVG/GDPR heb je het recht op inzage, correctie, verwijdering, beperking,
          overdraagbaarheid en bezwaar tegen verwerking van je gegevens. Stuur een verzoek
          naar <a href="mailto:privacy@stevin.ai" className="underline">privacy@stevin.ai</a>.
          We reageren binnen 30 dagen.
        </p>
        <p>
          Niet tevreden? Je kunt een klacht indienen bij de Autoriteit Persoonsgegevens
          (<a href="https://autoriteitpersoonsgegevens.nl" target="_blank" rel="noopener noreferrer" className="underline">autoriteitpersoonsgegevens.nl</a>).
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Cookies</h2>
        <p>
          Op stevin.ai gebruiken wij alleen functionele cookies (login-sessie, taalkeuze) en
          geanonimiseerde analytics. Wij plaatsen geen marketing- of tracking-cookies van
          derden zonder expliciete toestemming.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Beveiliging</h2>
        <p>
          Alle data wordt versleuteld bij overdracht (TLS 1.2+) en in rust (AES-256). Toegang
          tot productiedata is beperkt tot specifiek geautoriseerde medewerkers, met logging
          en periodieke audits.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Wijzigingen</h2>
        <p>
          Wij kunnen deze privacyverklaring aanpassen. Bij materiele wijzigingen sturen wij
          actieve gebruikers een notificatie minimaal 14 dagen voor de wijziging ingaat.
        </p>
      </section>
    </article>
  )
}

function PrivacyEnglish() {
  return (
    <article className="prose prose-neutral max-w-none space-y-6 text-sm leading-relaxed">
      <section>
        <h2 className="text-xl font-semibold">Who we are</h2>
        <p>
          Stevin.AI (&quot;Stevin&quot;) is an AI platform operated by
          WPOT B.V., a company registered in the Netherlands. We help marketing teams and
          agencies detect campaign issues earlier than regular reporting does.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">What data we collect</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            <strong>Account data</strong>: name, business email, organization, role within
            your team.
          </li>
          <li>
            <strong>Campaign and analytics data</strong>: only through OAuth integrations that
            you initiate (Google Ads, Meta, GA4, etc.). We receive read-only access to campaign
            metrics, no payment or billing information.
          </li>
          <li>
            <strong>Platform usage data</strong>: page visits, feature usage, timestamps, to
            improve the service and detect abuse.
          </li>
          <li>
            <strong>Technical data</strong>: IP address, browser type, device type for security
            and debugging.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Why we use it</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>To give you access to the platform and connected data.</li>
          <li>To generate signals, alerts and recommendations for your campaigns.</li>
          <li>To detect and resolve security incidents.</li>
          <li>To improve the service based on anonymous usage patterns.</li>
        </ul>
        <p>
          We do not sell personal data. We do not share your campaign data with other Stevin
          customers. Strict tenant isolation applies per organization.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Retention</h2>
        <p>
          We retain account data for as long as you have an active account, plus 12 months
          after termination for administrative and tax obligations. Campaign data is deleted
          within 30 days after a platform is disconnected or the service is cancelled.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Subprocessors</h2>
        <p>We use a limited set of subprocessors, all under a data processing agreement:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Supabase (database hosting, EU region): platform data storage.</li>
          <li>AWS (EU region): application infrastructure.</li>
          <li>Vercel (EU region): front-end hosting.</li>
          <li>Resend (EU region): transactional email.</li>
          <li>Anthropic / OpenAI: for AI features only, with stripped or anonymous prompts
            where possible; no personal data goes into training datasets.</li>
        </ul>
        <p>
          OAuth integrations (such as Google Ads, Meta, Pinterest, LinkedIn) run directly
          between you and the platform. We only receive the tokens you authorize.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Your rights</h2>
        <p>
          Under GDPR you have the right to access, rectify, erase, restrict, port and object
          to processing of your data. Send a request to{' '}
          <a href="mailto:privacy@stevin.ai" className="underline">privacy@stevin.ai</a>.
          We respond within 30 days.
        </p>
        <p>
          Not satisfied? You can lodge a complaint with the Dutch Data Protection Authority
          (<a href="https://autoriteitpersoonsgegevens.nl/en" target="_blank" rel="noopener noreferrer" className="underline">autoriteitpersoonsgegevens.nl</a>).
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Cookies</h2>
        <p>
          On stevin.ai we use only functional cookies (login session, language preference)
          and anonymous analytics. We do not place third-party marketing or tracking cookies
          without explicit consent.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Security</h2>
        <p>
          All data is encrypted in transit (TLS 1.2+) and at rest (AES-256). Access to
          production data is restricted to specifically authorized employees, with logging
          and periodic audits.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Changes</h2>
        <p>
          We may amend this privacy policy. For material changes we notify active users at
          least 14 days before the change takes effect.
        </p>
      </section>
    </article>
  )
}
