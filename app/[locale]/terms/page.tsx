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
  const lastUpdated = isEn ? '24 August 2026' : '24 augustus 2026'

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
              with its registered seat in <strong>Breda, the Netherlands</strong>, offices at <strong>Claudius Prinsenlaan 12, 4811 DK Breda</strong>, VAT number <strong>NL869893610B01</strong>.
            </>
          ) : (
            <>
              Stevin.AI is de handelsnaam van <strong>Stevin.AI B.V.</strong>, ingeschreven
              bij de Kamer van Koophandel onder nummer <strong>42138941</strong>, statutair
              gevestigd te <strong>Breda</strong>, kantoor aan de <strong>Claudius Prinsenlaan 12, 4811 DK Breda</strong>, btw-nummer <strong>NL869893610B01</strong>.
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
          inclusief de website stevin.ai, het klantportaal (app.stevin.ai), de Stevin
          Hub backend (hub.stevin.ai), het Stevin Desk consultant-dashboard
          (desk.stevin.ai en crm.stevin.ai) en bijbehorende API&apos;s, Slack-integraties
          en bots. De opsomming is een toelichting en geen beperking: de voorwaarden
          gelden voor het platform als geheel, ook voor onderdelen die later worden
          toegevoegd of onder een ander adres bereikbaar zijn. Door het platform te
          gebruiken accepteer je deze voorwaarden.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">3. Wat Stevin doet (en niet doet)</h2>
        <p>
          Stevin levert twee dingen, en het verschil bepaalt wie waarvoor
          verantwoordelijk is.
        </p>
        <p>
          <strong>Het platform</strong> signaleert en adviseert op basis van
          gekoppelde marketingdata. Daar is Stevin <strong>read-only</strong> waar het
          kan: het platform wijzigt uit zichzelf niets in je advertentieaccounts. Waar
          het wel een actie kan voorbereiden, bijvoorbeeld het opstellen van een
          e-mail, gebeurt dat pas na expliciete review door een mens.
        </p>
        <p>
          <strong>Beheer</strong>, als je dat bij ons afneemt, betekent dat wij in
          jouw opdracht wel wijzigingen doorvoeren in je accounts: campagnes,
          budgetten, zoekwoorden, advertenties en de bijbehorende meetinrichting. Dat
          gebeurt binnen wat we vooraf hebben afgesproken. Je blijft eigenaar van de
          accounts en kunt onze toegang op elk moment intrekken.
        </p>
        <p>
          <strong>Advertentiebudget.</strong> Je advertentiebudget betaal je
          rechtstreeks aan het advertentieplatform, niet aan ons, en wij rekenen daar
          geen opslag over. Het budget en een dagmaximum spreken we vooraf af en
          leggen we schriftelijk vast; wijzigen doen we alleen met jouw akkoord.
          Kosten die het platform in rekening brengt blijven voor jouw rekening, ook
          bij klikfraude, een geschorst account of een tariefwijziging van het
          platform, tenzij die kosten het gevolg zijn van opzet of bewuste
          roekeloosheid van ons.
        </p>
        <p>
          <strong>Wat we wel en niet beloven.</strong> We spannen ons in om je
          resultaten te verbeteren, maar we garanderen geen aantal aanvragen, geen
          kosten per aanvraag, geen omzet, geen positie in zoekresultaten en geen
          goedkeuring van advertenties door het platform. Die uitkomsten hangen mede
          af van je markt, je aanbod, je eigen opvolging, en van beslissingen van
          derden zoals Google en Meta waar wij geen zeggenschap over hebben.
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
        <p>
          Het platform is bedoeld voor normaal gebruik binnen de afgesproken omvang.
          Voor onderdelen die op AI draaien geldt een gebruiksruimte die daarbij
          past. Is die voor een periode bereikt, dan zie je dat in het portaal en
          kijken we samen wat er nodig is. Gebruik dat daar structureel van afwijkt
          stemmen we vooraf met je af.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">5. Tarieven en facturatie</h2>
        <p>
          Tarieven en betaalvoorwaarden worden vastgelegd in een aparte
          dienstverleningsovereenkomst per klant. Bij gebrek aan specifieke afspraken
          geldt: facturatie maandelijks vooraf, betalingstermijn 14 dagen. Alle
          genoemde bedragen zijn exclusief btw. Je advertentiebudget staat nooit op
          onze factuur, dat betaal je rechtstreeks aan het advertentieplatform.
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
          website stevin.ai, the client portal (app.stevin.ai), the Stevin Hub
          backend (hub.stevin.ai), the Stevin Desk consultant dashboard
          (desk.stevin.ai and crm.stevin.ai) and related APIs, Slack integrations
          and bots. This list is illustrative and not limiting: the terms apply to
          the platform as a whole, including parts added later or reachable at a
          different address. By using the platform you accept these terms.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">3. What Stevin does (and does not)</h2>
        <p>
          Stevin delivers two things, and the difference determines who is
          responsible for what.
        </p>
        <p>
          <strong>The platform</strong> signals and advises based on connected
          marketing data. There Stevin is <strong>read-only</strong> wherever
          possible: the platform does not change anything in your advertising accounts
          on its own. Where it can prepare an action, such as drafting an email, that
          happens only after explicit human review.
        </p>
        <p>
          <strong>Management</strong>, if you buy that from us, means we do make
          changes in your accounts on your instruction: campaigns, budgets, keywords,
          ads and the related measurement setup. That happens within what we agreed
          beforehand. You remain the owner of the accounts and can withdraw our access
          at any time.
        </p>
        <p>
          <strong>Advertising budget.</strong> You pay your advertising budget
          directly to the advertising platform, not to us, and we do not add a markup.
          We agree the budget and a daily cap beforehand and record it in writing;
          changes happen only with your approval. Costs charged by the platform remain
          for your account, including in cases of click fraud, a suspended account or a
          platform pricing change, unless those costs result from our intent or
          conscious recklessness.
        </p>
        <p>
          <strong>What we do and do not promise.</strong> We make every effort to
          improve your results, but we do not guarantee any number of enquiries, any
          cost per enquiry, any revenue, any position in search results, or approval of
          ads by the platform. Those outcomes also depend on your market, your offer,
          your own follow-up, and on decisions by third parties such as Google and Meta
          over which we have no control.
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
        <p>
          The platform is meant for normal use within the agreed scope. Parts that
          run on AI come with a usage allowance that matches that scope. If it is
          reached for a period, you will see this in the portal and we will look at
          what you need. Use that structurally deviates from this is agreed with you
          in advance.
        </p>
        </section>

      <section>
        <h2 className="text-xl font-semibold">5. Fees and billing</h2>
        <p>
          Fees and payment terms are set out in a separate service agreement per
          client. Absent specific arrangements: monthly invoicing in advance,
          payment term 14 days. All amounts stated are exclusive of VAT. Your
          advertising budget never appears on our invoice; you pay that directly to
          the advertising platform.
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
