// Sitewide entiteit-schema: Organization + WebSite, op ELKE pagina via de
// gedeelde layout. Reden: long-tail pagina's (diensten, vergelijken, etc.)
// verwijzen via { '@id': 'https://stevin.ai/#organization' } naar de
// Organization-node. Stond die alleen op de homepage, dan dangelt die
// referentie zodra een crawler of LLM een losse pagina binnenkomt. Nu draagt
// elke pagina de entiteit zelfstandig, en blijft er 1 coherente entity-graph.
//
// Verrijkte Organization voor Knowledge Graph eligibility + entity-recognition
// door LLMs (ChatGPT, Claude, Perplexity gebruiken dit als primary entity-source).
// sameAs: vul aan zodra meer profielen (X, Crunchbase, KvK) actief zijn.
const organization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://stevin.ai/#organization',
  name: 'Stevin.AI',
  alternateName: 'Stevin',
  legalName: 'Stevin.AI',
  description:
    'Stevin.AI regelt de marketing van Nederlandse en Belgische bedrijven, met de accounts op naam van de klant zelf. Elke wijziging staat in een logboek met de reden erbij, en een deel van het bewijs staat buiten ons om. Voor ondernemers, marketingteams en bureaus, werkzaam vanuit Breda.',
  url: 'https://stevin.ai',
  logo: {
    '@type': 'ImageObject',
    url: 'https://stevin.ai/icon.png',
    contentUrl: 'https://stevin.ai/icon.png',
  },
  image: 'https://stevin.ai/og-image.png',
  foundingLocation: {
    '@type': 'Place',
    address: { '@type': 'PostalAddress', addressCountry: 'NL' },
  },
  areaServed: [
    { '@type': 'Country', name: 'Netherlands' },
    { '@type': 'Country', name: 'Belgium' },
  ],
  knowsAbout: [
    'Marketing Data Ownership',
    'First-party Marketing Data',
    'Marketing Intelligence',
    'Online Marketing',
    'Paid Media',
    'Search Engine Optimization',
    'Generative Engine Optimization',
    'Marketing Automation',
    'CRM Integration',
    'Analytics & Tracking',
    'Conversion Rate Optimization',
    'Marketing for SMBs',
    'Artificial Intelligence',
    'Sales Operations',
    'Lead Management',
  ],
  knowsLanguage: ['nl-NL', 'en'],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: 'info@stevin.ai',
      url: 'https://stevin.ai/contact',
      areaServed: ['NL', 'BE'],
      availableLanguage: ['Dutch', 'English'],
    },
  ],
  sameAs: ['https://www.linkedin.com/company/stevin-ai'],
}

const website = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://stevin.ai/#website',
  name: 'Stevin.AI',
  alternateName: 'Stevin',
  url: 'https://stevin.ai',
  publisher: { '@id': 'https://stevin.ai/#organization' },
  inLanguage: ['nl-NL', 'en'],
}

export default function SiteJsonLd() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  )
}
