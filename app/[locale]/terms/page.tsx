import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const isEn = locale === 'en'
  return {
    title: isEn ? 'Terms of Service | Stevin.AI' : 'Algemene Voorwaarden | Stevin.AI',
    description: isEn
      ? 'Terms of service for Stevin.AI: the conditions under which we provide our AI platform.'
      : 'Algemene voorwaarden van Stevin.AI: onder welke voorwaarden wij ons AI-platform leveren.',
    alternates: {
      canonical: 'https://stevin.ai/terms',
      languages: {
        nl: 'https://stevin.ai/nl/terms',
        en: 'https://stevin.ai/en/terms',
      },
    },
  }
}

export default async function TermsPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const isEn = locale === 'en'
  const lastUpdated = '28 mei 2026'

  return (
    <main className="bg-surface text-primary">
      <div className="mx-auto max-w-3xl px-6 py-16">
      <header className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tight">
          {isEn ? 'Terms of Service' : 'Algemene Voorwaarden'}
        </h1>
        <p className="mt-2 text-sm text-muted">
          {isEn ? `Last updated: ${lastUpdated}` : `Laatst bijgewerkt: ${lastUpdated}`}
        </p>
      </header>

      {isEn ? <TermsEnglish /> : <TermsDutch />}

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
          <a href="mailto:legal@stevin.ai" className="underline">legal@stevin.ai</a>
        </p>
      </footer>
      </div>
    </main>
  )
}

function TermsDutch() {
  return (
    <article className="prose prose-neutral max-w-none space-y-6 text-sm leading-relaxed">
      <section>
        <h2 className="text-xl font-semibold">1. Wie zijn wij</h2>
        <p>
          Stevin.AI (&quot;Stevin&quot;, &quot;wij&quot;, &quot;ons&quot;) is een marketing
          intelligence platform geleverd door Stevin.AI B.V., gevestigd in Breda,
          Nederland (KvK 42138941). Wij helpen marketingteams en bureaus om campagne-issues eerder
          te signaleren dan reguliere rapportage doet, door paid en owned media data
          continu te monitoren en te interpreteren.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">2. Toepasselijkheid</h2>
        <p>
          Deze algemene voorwaarden gelden voor elk gebruik van het Stevin-platform,
          inclusief de website stevin.ai, de Stevin Hub backend (hub.stevin.ai), het
          Stevin Desk consultant-dashboard (desk.stevin.ai) en bijbehorende API&apos;s,
          Slack-integraties en bots. Door het platform te gebruiken accepteer je deze
          voorwaarden.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">3. Wat Stevin doet (en niet doet)</h2>
        <p>
          Stevin signaleert en adviseert op basis van gekoppelde marketingdata. Stevin
          is <strong>read-only</strong> waar het kan: wij voeren standaard geen
          wijzigingen door in jouw ad-accounts. Beslissingen blijven bij jou of je
          consultant. Waar Stevin wel acties kan uitvoeren (bijvoorbeeld een
          compensatie-email opstellen), gebeurt dit pas na expliciete consultant- of
          gebruiker-review.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">4. Account en toegang</h2>
        <p>
          Je bent verantwoordelijk voor het beveiligen van je login-gegevens. Stevin
          ondersteunt SSO via Google en magic-link login. Tokens van gekoppelde
          platforms (Google Ads, Meta, GA4, Search Console, etc.) worden encrypted
          opgeslagen en alleen gebruikt voor data-sync ten behoeve van jouw
          rapportage. Wij delen tokens niet met derden buiten de beschreven
          platform-API&apos;s.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">5. Tarieven en facturatie</h2>
        <p>
          Tarieven en betaalvoorwaarden worden vastgelegd in een aparte
          dienstverleningsovereenkomst per klant. Bij gebrek aan specifieke afspraken
          geldt: facturatie maandelijks vooraf, betalingstermijn 14 dagen, BTW
          inbegrepen waar van toepassing.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">6. Beschikbaarheid en SLA</h2>
        <p>
          Wij streven naar 99,5% beschikbaarheid van het platform op maandbasis,
          gemeten over de Stevin Hub backend. Geplande onderhouds-windows worden
          minimaal 48 uur vooraf aangekondigd. Bij langdurige uitval krijgt de
          consultant een melding via Slack en/of e-mail.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">7. Gegevensverwerking</h2>
        <p>
          Stevin verwerkt persoonsgegevens en marketingdata van jouw klanten
          uitsluitend voor zover noodzakelijk voor het leveren van de dienst.
          Details staan in onze{' '}
          <a href="/privacy" className="underline">privacyverklaring</a>. Voor
          klantopdrachten geldt een verwerkersovereenkomst (DPA) tussen jou en Stevin.AI B.V.,
          beschikbaar op verzoek.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">8. AI-gegenereerde output</h2>
        <p>
          Adviezen, signalen, briefings en rapportages binnen Stevin worden
          (mede)gegenereerd door AI-modellen (Anthropic Claude en in beperkte mate
          OpenAI). Output is geen vervanging voor professioneel marketing-oordeel.
          Eindverantwoordelijkheid voor beslissingen op basis van Stevin-output
          ligt bij jou of je consultant. Stevin doet redelijke inspanningen om
          kwaliteit en relevantie te bewaken (human-in-the-loop bij taken,
          confidence-aanduidingen, evidence-strips).
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">9. Intellectueel eigendom</h2>
        <p>
          Het Stevin-platform, inclusief code, design, AI-prompts en datamodellen,
          is eigendom van Stevin.AI B.V. Je krijgt een niet-exclusieve, niet-overdraagbare
          gebruikslicentie voor de duur van het abonnement. Data die jij in Stevin
          inbrengt (jouw klantdata, campagnes, briefings) blijft van jou.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">10. Aansprakelijkheid</h2>
        <p>
          Onze aansprakelijkheid voor directe schade is beperkt tot het bedrag dat
          je in de 3 maanden voorafgaand aan het schadeveroorzakende feit aan ons
          hebt betaald, met een absoluut maximum van EUR 5.000 per gebeurtenis.
          Indirecte schade (winstderving, gemiste besparingen, reputatieschade) is
          uitgesloten. Deze beperkingen gelden niet bij opzet of bewuste roekeloosheid.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">11. Opzegging</h2>
        <p>
          Je kunt het abonnement maandelijks opzeggen tegen het einde van de
          lopende maand, tenzij anders overeengekomen. Bij beeindiging blijft jouw
          data 30 dagen beschikbaar voor export, daarna wordt deze verwijderd
          conform onze retentie-policy.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">12. Wijzigingen</h2>
        <p>
          Wij kunnen deze voorwaarden aanpassen. Materiele wijzigingen melden wij
          minimaal 30 dagen voor inwerkingtreding via e-mail of in-app notificatie.
          Bij doorgaand gebruik na inwerkingtreding accepteer je de nieuwe versie.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">13. Toepasselijk recht</h2>
        <p>
          Op deze voorwaarden is Nederlands recht van toepassing. Geschillen worden
          voorgelegd aan de bevoegde rechter in het arrondissement Zeeland-West-Brabant
          (rechtbank Breda), tenzij dwingend recht anders bepaalt.
        </p>
      </section>
    </article>
  )
}

function TermsEnglish() {
  return (
    <article className="prose prose-neutral max-w-none space-y-6 text-sm leading-relaxed">
      <section>
        <h2 className="text-xl font-semibold">1. Who we are</h2>
        <p>
          Stevin.AI (&quot;Stevin&quot;, &quot;we&quot;, &quot;us&quot;) is a marketing
          intelligence platform operated by Stevin.AI B.V., registered in Breda, the
          Netherlands (KvK 42138941). We help marketing teams and agencies catch
          campaign issues earlier than regular reporting does, by continuously
          monitoring and interpreting paid and owned media data.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">2. Applicability</h2>
        <p>
          These terms apply to any use of the Stevin platform, including the
          website stevin.ai, the Stevin Hub backend (hub.stevin.ai), the Stevin
          Desk consultant dashboard (desk.stevin.ai) and related APIs, Slack
          integrations and bots. By using the platform you accept these terms.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">3. What Stevin does (and does not)</h2>
        <p>
          Stevin signals and advises based on connected marketing data. Stevin is
          <strong> read-only</strong> wherever possible: we do not modify your ad
          accounts by default. Decisions stay with you or your consultant. Where
          Stevin can perform actions (such as drafting a compensation email), it
          happens only after explicit consultant or user review.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">4. Account and access</h2>
        <p>
          You are responsible for securing your login credentials. Stevin supports
          SSO via Google and magic-link login. Tokens from connected platforms
          (Google Ads, Meta, GA4, Search Console, etc.) are stored encrypted and
          used only for data sync supporting your reporting. We do not share
          tokens with third parties outside the described platform APIs.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">5. Fees and billing</h2>
        <p>
          Fees and payment terms are set out in a separate service agreement per
          client. Absent specific arrangements: monthly invoicing in advance,
          payment term 14 days, VAT included where applicable.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">6. Availability and SLA</h2>
        <p>
          We aim for 99.5% platform availability on a monthly basis, measured
          across the Stevin Hub backend. Planned maintenance windows are
          announced at least 48 hours in advance. For extended outages the
          consultant receives a notification via Slack and/or email.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">7. Data processing</h2>
        <p>
          Stevin processes personal data and marketing data from your clients
          only to the extent necessary to deliver the service. Details are in
          our <a href="/privacy" className="underline">privacy policy</a>. For
          client engagements a Data Processing Agreement (DPA) applies between
          you and Stevin.AI B.V., available on request.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">8. AI-generated output</h2>
        <p>
          Advice, signals, briefings and reports within Stevin are (co-)generated
          by AI models (Anthropic Claude and, to a limited extent, OpenAI). Output
          does not replace professional marketing judgement. Final responsibility
          for decisions made based on Stevin output rests with you or your
          consultant. Stevin makes reasonable efforts to safeguard quality and
          relevance (human-in-the-loop for tasks, confidence indicators,
          evidence strips).
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">9. Intellectual property</h2>
        <p>
          The Stevin platform, including code, design, AI prompts and data
          models, is owned by Stevin.AI B.V. You receive a non-exclusive,
          non-transferable usage licence for the duration of the subscription.
          Data you bring into Stevin (your client data, campaigns, briefings)
          remains yours.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">10. Liability</h2>
        <p>
          Our liability for direct damages is capped at the amount you paid us
          in the 3 months preceding the event causing the damage, with an
          absolute maximum of EUR 5,000 per event. Indirect damages (lost
          profits, missed savings, reputational damage) are excluded. These
          limitations do not apply in case of intent or gross negligence.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">11. Termination</h2>
        <p>
          You may terminate the subscription monthly, effective at the end of
          the running month, unless otherwise agreed. Upon termination your
          data remains available for export for 30 days, after which it is
          deleted according to our retention policy.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">12. Changes</h2>
        <p>
          We may amend these terms. We will announce material changes at least
          30 days before they take effect, by email or in-app notification.
          Continued use after the effective date constitutes acceptance of the
          new version.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">13. Governing law</h2>
        <p>
          These terms are governed by Dutch law. Disputes will be submitted to
          the competent court in the Zeeland-West-Brabant district (court of
          Breda), unless mandatory law dictates otherwise.
        </p>
      </section>
    </article>
  )
}
