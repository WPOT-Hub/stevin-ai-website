import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const isEn = locale === 'en'
  return {
    title: isEn ? 'Data Processing Agreement | Stevin.AI' : 'Verwerkersovereenkomst | Stevin.AI',
    description: isEn
      ? 'Data Processing Agreement (GDPR Art. 28) between Stevin.AI and its customers.'
      : 'Verwerkersovereenkomst (AVG art. 28) tussen Stevin.AI en haar klanten.',
    alternates: {
      canonical: 'https://stevin.ai/dpa',
      languages: {
        nl: 'https://stevin.ai/nl/dpa',
        en: 'https://stevin.ai/en/dpa',
      },
    },
  }
}

export default async function DPAPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const isEn = locale === 'en'
  const lastUpdated = '1 april 2026'

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <header className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tight">
          {isEn ? 'Data Processing Agreement' : 'Verwerkersovereenkomst'}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {isEn ? `Last updated: ${lastUpdated}` : `Laatst bijgewerkt: ${lastUpdated}`}
        </p>
      </header>

      {isEn ? <DpaEnglish /> : <DpaDutch />}

      <footer className="mt-16 border-t border-border pt-8 text-xs text-muted-foreground space-y-2">
        <p>
          {isEn
            ? <>Stevin.AI is a trade name of <strong>WPOT B.V.</strong>, KvK <strong>87774372</strong>, VAT NL864401954B01, registered office <strong>Amstenradestraat 25, 4834 JB Breda, Netherlands</strong>.</>
            : <>Stevin.AI is een handelsnaam van <strong>WPOT B.V.</strong>, KvK <strong>87774372</strong>, btw NL864401954B01, statutair gevestigd te <strong>Amstenradestraat 25, 4834 JB Breda</strong>.</>
          }
        </p>
        <p>{isEn ? 'Contact: ' : 'Contact: '}<a className="underline" href="mailto:koen@stevin.ai">koen@stevin.ai</a></p>
      </footer>
    </main>
  )
}

function DpaDutch() {
  return (
    <article className="prose prose-sm dark:prose-invert max-w-none">
      <h2>1. Partijen en kader</h2>
      <p>
        Deze verwerkersovereenkomst is gesloten tussen WPOT B.V., handelend onder de naam
        Stevin.AI (de Verwerker), en de Klant die gebruik maakt van het Stevin platform
        (de Verwerkingsverantwoordelijke). Deze overeenkomst maakt onlosmakelijk
        onderdeel uit van de Algemene Voorwaarden en regelt de verwerking van
        persoonsgegevens in de zin van artikel 28 AVG.
      </p>

      <h2>2. Onderwerp van de verwerking</h2>
      <p>
        Stevin verwerkt namens de Klant persoonsgegevens die voortkomen uit gekoppelde
        marketing- en advertentieplatformen (Google Ads, Meta, GA4, Search Console, e.d.),
        CRM-systemen, en e-mail- en gespreksintegraties. De verwerking dient uitsluitend
        het doel: het leveren van het Stevin platform en de daarbij behorende rapportages,
        signalen en adviezen.
      </p>

      <h2>3. Aard en duur</h2>
      <p>
        De verwerking duurt zolang de overeenkomst tussen Klant en Stevin van kracht is.
        Aard: geautomatiseerd ophalen, analyseren, opslaan en presenteren via dashboards
        en notificaties. Categorieën betrokkenen: gebruikers van Klant, eindklanten van
        Klant, prospects en leads in CRM. Categorieën persoonsgegevens: NAW, contact
        (e-mail, telefoon, LinkedIn), functietitel, bedrijfsdata, online gedrag
        (campagne-interacties, paginabezoeken, search queries) en communicatie
        (e-mails, gesprekstranscripten voor zover de Klant deze deelt).
      </p>

      <h2>4. Verplichtingen Verwerker</h2>
      <ul>
        <li>Stevin verwerkt persoonsgegevens uitsluitend op gedocumenteerde instructie van de Klant, behalve indien wetgeving anders bepaalt.</li>
        <li>Personen die toegang hebben tot persoonsgegevens zijn gehouden aan vertrouwelijkheid.</li>
        <li>Stevin treft passende technische en organisatorische maatregelen (zie sectie 7).</li>
        <li>Stevin assisteert de Klant bij het nakomen van rechten van betrokkenen, datalekmeldingen, DPIA en consultatie van de AP.</li>
        <li>Stevin verwijdert of retourneert persoonsgegevens binnen 60 dagen na einde overeenkomst, op verzoek van de Klant.</li>
        <li>Stevin stelt de Klant op verzoek alle informatie ter beschikking die nodig is om aantoonbaar aan artikel 28 AVG te voldoen, en staat audits toe (zie sectie 9).</li>
      </ul>

      <h2>5. Subverwerkers</h2>
      <p>
        De Klant geeft Stevin algemene toestemming om subverwerkers in te schakelen.
        Actuele lijst van substantiële subverwerkers:
      </p>
      <ul>
        <li><strong>Supabase</strong> (database hosting, EU regio)</li>
        <li><strong>AWS</strong> (compute en object storage, EU-Frankfurt)</li>
        <li><strong>Vercel</strong> (frontend hosting, EU regio waar mogelijk)</li>
        <li><strong>Anthropic, OpenAI, Mistral</strong> (AI inference, met data-processing addenda; geen training op klantdata)</li>
        <li><strong>Resend</strong> (transactionele e-mail)</li>
        <li><strong>Slack</strong> (notificatiekanaal)</li>
      </ul>
      <p>
        Wijzigingen in deze lijst worden minimaal 30 dagen vooraf aangekondigd via e-mail.
        De Klant kan binnen die termijn schriftelijk bezwaar maken.
      </p>

      <h2>6. Internationale doorgifte</h2>
      <p>
        Indien een subverwerker persoonsgegevens buiten de EER verwerkt, wordt dit
        afgedekt door Standard Contractual Clauses (EU 2021/914) en aanvullende
        beveiligingsmaatregelen. Stevin streeft naar EU-only hosting waar technisch
        haalbaar.
      </p>

      <h2>7. Beveiliging</h2>
      <ul>
        <li>Versleuteling at-rest (AES-256) en in-transit (TLS 1.2+)</li>
        <li>Row-level security in de database, service-role isolatie</li>
        <li>Tenant-scoped data: agency A ziet nooit data van agency B</li>
        <li>OAuth-tokens encrypted opgeslagen, periodieke rotatie</li>
        <li>Logging van toegang tot tenant-data, audit-trail bewaard 12 maanden</li>
        <li>Periodieke penetratietesten en geautomatiseerde dependency-scanning (Aikido)</li>
        <li>Backup-beleid: dagelijkse incremental, 7-30 dagen retentie</li>
        <li>Toegangsbeheer via 2FA voor alle medewerkers met productietoegang</li>
      </ul>

      <h2>8. Datalekken</h2>
      <p>
        Stevin meldt elk vermoed of vastgesteld datalek binnen 24 uur aan de Klant via
        het opgegeven contactadres, met de informatie nodig voor een eventuele melding
        aan de AP en aan betrokkenen.
      </p>

      <h2>9. Audit</h2>
      <p>
        De Klant mag eens per kalenderjaar een audit (laten) uitvoeren, op eigen kosten,
        met minimaal 30 dagen schriftelijke aankondiging en gebonden aan vertrouwelijkheid.
        Stevin kan in plaats daarvan een actueel onafhankelijk audit-rapport (zoals
        SOC 2 of ISO 27001) overleggen indien beschikbaar.
      </p>

      <h2>10. Aansprakelijkheid</h2>
      <p>
        De aansprakelijkheid van partijen onder deze verwerkersovereenkomst is gelimiteerd
        conform de aansprakelijkheidsregeling in de Algemene Voorwaarden, met dien
        verstande dat de wettelijke aansprakelijkheid jegens betrokkenen onverkort blijft
        gelden zoals voorzien in artikel 82 AVG.
      </p>

      <h2>11. Toepasselijk recht</h2>
      <p>
        Op deze overeenkomst is Nederlands recht van toepassing. Geschillen worden
        voorgelegd aan de bevoegde rechter te Breda.
      </p>
    </article>
  )
}

function DpaEnglish() {
  return (
    <article className="prose prose-sm dark:prose-invert max-w-none">
      <h2>1. Parties and scope</h2>
      <p>
        This Data Processing Agreement is entered into between WPOT B.V., trading as
        Stevin.AI (the Processor), and the Customer using the Stevin platform (the
        Controller). It forms an integral part of the Terms of Service and governs the
        processing of personal data under Article 28 of the GDPR.
      </p>

      <h2>2. Subject matter</h2>
      <p>
        Stevin processes personal data on behalf of the Customer that originates from
        connected marketing and advertising platforms (Google Ads, Meta, GA4, Search
        Console, etc.), CRM systems, and email and call integrations. The sole purpose
        is to deliver the Stevin platform and its reports, signals and advisories.
      </p>

      <h2>3. Nature and duration</h2>
      <p>
        Processing lasts for the duration of the agreement between Customer and Stevin.
        Nature: automated retrieval, analysis, storage and presentation via dashboards
        and notifications. Categories of data subjects: Customer users, end-customers of
        Customer, prospects and CRM leads. Categories of personal data: name and
        address, contact details (email, phone, LinkedIn), job title, company data,
        online behaviour (campaign interactions, page views, search queries) and
        communications (emails, call transcripts insofar as Customer shares these).
      </p>

      <h2>4. Processor obligations</h2>
      <ul>
        <li>Stevin processes personal data only on documented instructions from Customer, unless required by law.</li>
        <li>Personnel with access are bound by confidentiality.</li>
        <li>Stevin implements appropriate technical and organisational measures (section 7).</li>
        <li>Stevin assists Customer with data-subject rights requests, breach notifications, DPIAs and consultations with the supervisory authority.</li>
        <li>Stevin deletes or returns personal data within 60 days after termination, at Customer's choice.</li>
        <li>Stevin provides Customer with the information needed to demonstrate compliance with Article 28, and allows audits (section 9).</li>
      </ul>

      <h2>5. Sub-processors</h2>
      <p>Customer grants Stevin general authorisation to engage sub-processors. Current material sub-processors:</p>
      <ul>
        <li><strong>Supabase</strong> (database hosting, EU region)</li>
        <li><strong>AWS</strong> (compute and object storage, EU-Frankfurt)</li>
        <li><strong>Vercel</strong> (frontend hosting, EU region where possible)</li>
        <li><strong>Anthropic, OpenAI, Mistral</strong> (AI inference, under data-processing addenda; no training on Customer data)</li>
        <li><strong>Resend</strong> (transactional email)</li>
        <li><strong>Slack</strong> (notification channel)</li>
      </ul>
      <p>Changes are announced at least 30 days in advance by email. Customer may object in writing within that period.</p>

      <h2>6. International transfers</h2>
      <p>
        Where a sub-processor processes personal data outside the EEA, Standard
        Contractual Clauses (EU 2021/914) and additional safeguards apply. Stevin
        prefers EU-only hosting where technically feasible.
      </p>

      <h2>7. Security</h2>
      <ul>
        <li>Encryption at rest (AES-256) and in transit (TLS 1.2+)</li>
        <li>Row-level security in the database, service-role isolation</li>
        <li>Tenant-scoped data: agency A never sees agency B data</li>
        <li>OAuth tokens stored encrypted, rotated periodically</li>
        <li>Access logging to tenant data, 12-month audit trail</li>
        <li>Periodic penetration tests and automated dependency scanning (Aikido)</li>
        <li>Backups: daily incremental, 7 to 30 days retention</li>
        <li>2FA mandatory for all staff with production access</li>
      </ul>

      <h2>8. Data breaches</h2>
      <p>
        Stevin notifies Customer of any suspected or confirmed personal data breach
        within 24 hours, with the information required for any onward notification to
        the supervisory authority or data subjects.
      </p>

      <h2>9. Audit</h2>
      <p>
        Customer may conduct (or have conducted) one audit per calendar year, at
        Customer's cost, with at least 30 days written notice and subject to
        confidentiality. Stevin may instead provide a recent independent audit report
        (such as SOC 2 or ISO 27001) where available.
      </p>

      <h2>10. Liability</h2>
      <p>
        Liability under this DPA is limited as set out in the Terms of Service, without
        prejudice to the statutory liability towards data subjects under Article 82 GDPR.
      </p>

      <h2>11. Governing law</h2>
      <p>
        This agreement is governed by Dutch law. Disputes are submitted to the competent
        court in Breda, the Netherlands.
      </p>
    </article>
  )
}
