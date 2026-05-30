import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const isEn = locale === 'en'
  return {
    title: isEn ? 'Non-Disclosure Agreement | Stevin.AI' : 'Geheimhoudingsovereenkomst | Stevin.AI',
    description: isEn
      ? 'Mutual NDA between Stevin.AI and its customers covering campaign data, business information and platform internals.'
      : 'Wederzijdse geheimhoudingsovereenkomst tussen Stevin.AI en haar klanten, voor campagnedata, bedrijfsgegevens en platforminternals.',
    alternates: {
      canonical: 'https://stevin.ai/nda',
      languages: {
        nl: 'https://stevin.ai/nl/nda',
        en: 'https://stevin.ai/en/nda',
      },
    },
  }
}

export default async function NDAPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const isEn = locale === 'en'
  const lastUpdated = '1 april 2026'

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <header className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tight">
          {isEn ? 'Non-Disclosure Agreement' : 'Geheimhoudingsovereenkomst (NDA)'}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {isEn ? `Last updated: ${lastUpdated}` : `Laatst bijgewerkt: ${lastUpdated}`}
        </p>
      </header>

      {isEn ? <NdaEnglish /> : <NdaDutch />}

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

function NdaDutch() {
  return (
    <article className="prose prose-sm dark:prose-invert max-w-none">
      <h2>1. Partijen</h2>
      <p>
        WPOT B.V., handelend onder de naam Stevin.AI (Stevin), en de Klant die de Stevin
        diensten gebruikt of overweegt te gebruiken. Beide partijen worden hierna
        aangeduid als de Partijen en ieder afzonderlijk als een Partij.
      </p>

      <h2>2. Vertrouwelijke Informatie</h2>
      <p>
        Onder Vertrouwelijke Informatie wordt verstaan: alle informatie die de ene
        Partij aan de andere verstrekt of beschikbaar maakt, in welke vorm dan ook,
        die redelijkerwijs als vertrouwelijk te beschouwen is. Hieronder vallen in elk
        geval:
      </p>
      <ul>
        <li>Campagne- en advertentiedata, prestatiecijfers, conversiedata en budgetten</li>
        <li>Klant- en prospectgegevens, CRM-data, contactlijsten</li>
        <li>Strategieen, briefings, plannen en interne rapportages</li>
        <li>Broncode, modellen, prompts, technische architectuur en algoritmes van het Stevin platform</li>
        <li>Tarieven, marges, commerciele condities</li>
        <li>Bedrijfsinformatie van klanten van de Klant (eindklanten)</li>
      </ul>
      <p>
        Niet vertrouwelijk is informatie die aantoonbaar reeds openbaar was, door de
        ontvangende Partij rechtmatig van een derde is verkregen zonder
        geheimhoudingsplicht, of onafhankelijk is ontwikkeld zonder gebruik van
        Vertrouwelijke Informatie.
      </p>

      <h2>3. Verplichtingen</h2>
      <ul>
        <li>De ontvangende Partij behandelt Vertrouwelijke Informatie strikt vertrouwelijk en deelt deze alleen met medewerkers en ingeschakelde derden voor wie kennisname noodzakelijk is voor de uitvoering van de overeenkomst.</li>
        <li>Die personen zijn op vergelijkbare wijze tot geheimhouding verplicht.</li>
        <li>Vertrouwelijke Informatie wordt uitsluitend gebruikt voor het doel waarvoor deze is verstrekt.</li>
        <li>De ontvangende Partij neemt minimaal dezelfde beveiligingsmaatregelen als voor haar eigen Vertrouwelijke Informatie van vergelijkbare gevoeligheid, en in elk geval redelijke maatregelen.</li>
      </ul>

      <h2>4. Geen reverse-engineering</h2>
      <p>
        De Klant zal het Stevin platform, de daarin gebruikte AI-modellen en de daarbij
        behorende prompts niet decompileren, reverse-engineeren of trachten te
        reproduceren, en geen output van het platform gebruiken om concurrerende
        diensten te trainen of te bouwen.
      </p>

      <h2>5. Duur</h2>
      <p>
        Deze geheimhoudingsplicht geldt gedurende de looptijd van de
        contractuele relatie tussen Partijen en blijft van kracht tot vijf (5) jaar na
        beeindiging daarvan. Voor persoonsgegevens en handelsgeheimen geldt de
        geheimhoudingsplicht voor onbepaalde tijd.
      </p>

      <h2>6. Teruggave of vernietiging</h2>
      <p>
        Op eerste verzoek, en in elk geval na beeindiging van de overeenkomst,
        retourneert of vernietigt elke Partij de van de andere Partij ontvangen
        Vertrouwelijke Informatie en bevestigt dit schriftelijk. Stevin mag
        backup-kopieen behouden zolang dat technisch noodzakelijk is, mits deze
        backups onderworpen blijven aan deze NDA en aan een retentieperiode van
        maximaal 90 dagen.
      </p>

      <h2>7. Verplichte openbaarmaking</h2>
      <p>
        Indien de ontvangende Partij wettelijk verplicht is Vertrouwelijke Informatie
        te delen (rechterlijk bevel, toezichthouder, opsporingsbevel), stelt zij de
        andere Partij hiervan onverwijld op de hoogte zodat passende juridische
        stappen mogelijk zijn, voor zover dit wettelijk is toegestaan.
      </p>

      <h2>8. Aansprakelijkheid</h2>
      <p>
        Bij toerekenbare tekortkoming in de geheimhoudingsverplichting is de
        tekortschietende Partij aansprakelijk voor de daaruit voortvloeiende schade,
        met inachtneming van de aansprakelijkheidsregeling in de Algemene Voorwaarden.
        De rechter kan op verzoek van een Partij een passende dwangsom opleggen.
      </p>

      <h2>9. Toepasselijk recht</h2>
      <p>
        Op deze overeenkomst is Nederlands recht van toepassing. Geschillen worden
        voorgelegd aan de bevoegde rechter te Breda.
      </p>
    </article>
  )
}

function NdaEnglish() {
  return (
    <article className="prose prose-sm dark:prose-invert max-w-none">
      <h2>1. Parties</h2>
      <p>
        WPOT B.V., trading as Stevin.AI (Stevin), and the Customer using or considering
        the Stevin services. Together referred to as the Parties.
      </p>

      <h2>2. Confidential Information</h2>
      <p>
        Confidential Information means any information disclosed by one Party to the
        other, in any form, that should reasonably be considered confidential, including:
      </p>
      <ul>
        <li>Campaign and advertising data, performance numbers, conversion data and budgets</li>
        <li>Customer and prospect data, CRM records, contact lists</li>
        <li>Strategies, briefings, plans and internal reports</li>
        <li>Source code, models, prompts, technical architecture and algorithms of the Stevin platform</li>
        <li>Pricing, margins, commercial terms</li>
        <li>End-customer business information of Customer</li>
      </ul>
      <p>
        Information is not Confidential when it is demonstrably already public, lawfully
        obtained from a third party without confidentiality obligation, or independently
        developed without use of Confidential Information.
      </p>

      <h2>3. Obligations</h2>
      <ul>
        <li>The receiving Party treats Confidential Information strictly confidential and shares it only with employees and engaged third parties on a need-to-know basis.</li>
        <li>Those individuals are bound by equivalent confidentiality obligations.</li>
        <li>Confidential Information is used solely for the purpose for which it was disclosed.</li>
        <li>The receiving Party applies at least the same protective measures as for its own confidential information of comparable sensitivity, and in any case reasonable measures.</li>
      </ul>

      <h2>4. No reverse engineering</h2>
      <p>
        Customer shall not decompile, reverse-engineer or attempt to reproduce the
        Stevin platform, its AI models or associated prompts, and shall not use platform
        output to train or build competing services.
      </p>

      <h2>5. Duration</h2>
      <p>
        Confidentiality obligations apply for the duration of the contractual
        relationship and survive for five (5) years after termination. For personal data
        and trade secrets, the obligation applies indefinitely.
      </p>

      <h2>6. Return or destruction</h2>
      <p>
        Upon request, and in any case after termination, each Party returns or destroys
        the Confidential Information received and confirms in writing. Stevin may retain
        backup copies as technically necessary, subject to this NDA and a maximum
        retention of 90 days.
      </p>

      <h2>7. Mandatory disclosure</h2>
      <p>
        If the receiving Party is legally required to disclose Confidential Information,
        it shall notify the other Party promptly to allow appropriate legal action, to
        the extent legally permitted.
      </p>

      <h2>8. Liability</h2>
      <p>
        For attributable breach of confidentiality, the breaching Party is liable for
        the resulting damages, subject to the liability regime in the Terms of Service.
        A court may impose an appropriate penalty payment at a Party's request.
      </p>

      <h2>9. Governing law</h2>
      <p>
        Governed by Dutch law. Disputes submitted to the competent court in Breda, the
        Netherlands.
      </p>
    </article>
  )
}
