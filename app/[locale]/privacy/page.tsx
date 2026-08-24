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
  const lastUpdated = isEn ? '4 July 2026' : '4 juli 2026'

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
              Stevin.AI is the trade name of <strong>Stevin.AI B.V.</strong>, registered
              with the Dutch Chamber of Commerce (KvK) under number <strong>42138941</strong>,
              with its registered seat in <strong>Breda, the Netherlands</strong>, VAT number <strong>NL869893610B01</strong>.
            </>
          ) : (
            <>
              Stevin.AI is de handelsnaam van <strong>Stevin.AI B.V.</strong>, ingeschreven
              bij de Kamer van Koophandel onder nummer <strong>42138941</strong>, statutair
              gevestigd te <strong>Breda</strong>, btw-nummer <strong>NL869893610B01</strong>.
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
          Stevin.AI B.V., gevestigd in Breda. Wij helpen marketingteams en bureaus om
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
          <li>
            <strong>Website- en leadcontext</strong>: wanneer je een contact- of
            demoformulier invult, bewaren wij de formuliergegevens samen met beperkte
            context zoals landingspagina, referrer, UTM-parameters, campagneklikken en
            de laatst bezochte pagina&apos;s. Dit gebruiken wij om aanvragen goed op te
            volgen en te begrijpen welke content en campagnes kwalitatieve leads opleveren.
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
          <li>Om website-aanvragen te kwalificeren en de juiste opvolging te geven.</li>
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
          Op stevin.ai gebruiken wij noodzakelijke cookies voor basisfuncties zoals
          sessie, taalkeuze en beveiliging. Zonder toestemming laden wij geen Microsoft
          Clarity en geven wij Google en advertentieplatformen geen toestemming voor
          analytics- of advertentiecookies.
        </p>
        <p>
          Kies je voor statistieken, dan gebruiken wij Google Analytics en Microsoft
          Clarity om paginabezoeken, interacties, scrollgedrag, klikken, heatmaps en
          sessie-opnames te analyseren. Kies je voor marketing, dan gebruiken wij Google
          Ads en Meta voor campagne- en conversiemeting. Waar relevant sturen wij
          formuliergegevens alleen gehasht door voor enhanced conversion meting.
        </p>
        <p>
          Je kunt via de cookie-instellingen kiezen tussen noodzakelijk, statistieken,
          marketing of alles accepteren. Wij verkopen geen persoonsgegevens.
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
          Stevin.AI B.V., a company registered in Breda, the Netherlands. We help marketing teams and
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
          <li>
            <strong>Website and lead context</strong>: when you submit a contact or demo
            form, we store the form details with limited context such as landing page,
            referrer, UTM parameters, campaign clicks and recently visited pages. We use
            this to follow up properly and understand which content and campaigns create
            qualified leads.
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
          <li>To qualify website requests and follow up with the right context.</li>
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
          On stevin.ai we use necessary cookies for basic functions such as session,
          language preference and security. Without consent, we do not load Microsoft
          Clarity and we do not grant Google or advertising platforms permission to use
          analytics or advertising cookies.
        </p>
        <p>
          If you choose statistics, we use Google Analytics and Microsoft Clarity to
          analyze page views, interactions, scroll behavior, clicks, heatmaps and session
          recordings. If you choose marketing, we use Google Ads and Meta for campaign
          and conversion measurement. Where relevant, form data is only sent in hashed
          form for enhanced conversion measurement.
        </p>
        <p>
          You can choose between necessary, statistics, marketing or accept all through
          the cookie settings. We do not sell personal data.
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
