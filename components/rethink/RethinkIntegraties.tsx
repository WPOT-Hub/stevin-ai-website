import { DonkerBlok, Kennismaken, PaginaKop, h2Stijl, tekst } from './RethinkBlokken'

// De nieuwe /integraties (W-535), in de stijl van de homepage. Koen, 12 okt:
// "deze zou toch een andere look and feel krijgen?" en "het blijft ook een
// beetje verkoop he". De oude pagina beloofde over achttien kanalen "dit lezen
// wij elke dag uit", terwijl er bij echte klanten elke dag alleen Google Ads,
// GA4, Search Console en YouTube draaien (sync_state, 12 okt). Meta werkt ook,
// maar de enige koppeling staat sinds 27 sep op pauze bij de klant. Daarom
// twee blokken: wat elke dag in het brein staat, en wat we beheren en koppelen
// als je het gebruikt. Weg: de tabel van 262 bronnen, de vijf lagen en de
// balkjeskaart met "spend" en "events".

type Kanaal = { naam: string; logo?: string }

const ELKE_DAG: Kanaal[] = [
  { naam: 'Google Ads', logo: '/logos/merken/google-ads.svg' },
  { naam: 'Meta', logo: '/logos/merken/meta.svg' },
  { naam: 'Google Analytics', logo: '/logos/merken/google-analytics.svg' },
  { naam: 'Search Console', logo: '/logos/merken/google-search-console.svg' },
  { naam: 'YouTube', logo: '/logos/merken/youtube.svg' },
]

// Wat we beheren of koppelen zodra je het gebruikt. bol en Amazon Ads hebben
// een API voor externe partijen (bol: intermediary authorization op de
// Retailer API; Amazon: aanmelden als Tool Provider of Agency). Nog niet
// gebouwd in de Hub, dus hier "koppelen we", niet "elke dag".
const KOPPELEN: Kanaal[] = [
  { naam: 'ChatGPT Ads', logo: '/logos/merken/chatgpt.svg' },
  { naam: 'Microsoft Ads', logo: '/logos/merken/microsoft.svg' },
  { naam: 'bol', logo: '/logos/merken/bol.svg' },
  { naam: 'Amazon Ads', logo: '/logos/merken/amazon.svg' },
  { naam: 'LinkedIn', logo: '/logos/merken/linkedin.svg' },
  { naam: 'TikTok', logo: '/logos/merken/tiktok.svg' },
  { naam: 'Pinterest', logo: '/logos/tools/pinterest.svg' },
  { naam: 'Tag Manager', logo: '/logos/tools/google-tag-manager.svg' },
  { naam: 'Shopify', logo: '/logos/merken/shopify.svg' },
  { naam: 'WooCommerce' },
  { naam: 'HubSpot', logo: '/logos/merken/hubspot.svg' },
  { naam: 'Pipedrive' },
  { naam: 'Klaviyo' },
  { naam: 'Mailchimp', logo: '/logos/tools/mailchimp.svg' },
  { naam: 'Exact Online', logo: '/logos/merken/exact-online.svg' },
  { naam: 'Moneybird', logo: '/logos/merken/moneybird.svg' },
]

function Tegel({ k, donker = false }: { k: Kanaal; donker?: boolean }) {
  return (
    <li
      className={`flex items-center gap-3 rounded-xl border px-4 py-3.5 ${
        donker ? 'border-white/12 bg-white/[0.04]' : 'border-border bg-white'
      }`}
    >
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white">
        {k.logo ? (
          <img src={k.logo} alt="" width={22} height={22} className="h-[22px] w-[22px] object-contain" loading="lazy" />
        ) : (
          <span className="font-display text-[15px] font-extrabold text-primary" aria-hidden="true">
            {k.naam.charAt(0)}
          </span>
        )}
      </span>
      <span className={`font-display text-[15px] font-bold ${donker ? 'text-white' : 'text-primary'}`}>{k.naam}</span>
    </li>
  )
}

export default function RethinkIntegraties() {
  return (
    <main className="bg-white">
      <PaginaKop
        brein="bol"
        eyebrow="Integraties"
        kop="Alles wat je gebruikt,"
        accent="in één brein."
        lede={<p className="m-0">Je advertenties, je website, je CRM en je verkoop. Zo zie je welke bron echt klanten oplevert.</p>}
      />

      <section className="px-6 pb-[104px] pt-20 sm:pt-24">
        <div className="mx-auto max-w-[1152px]">
          <h2 className="m-0 max-w-[18ch] font-display font-extrabold text-primary" style={h2Stijl}>
            Dit staat elke dag in het brein.
          </h2>
          <p className={`m-0 mt-5 max-w-[620px] ${tekst}`}>Per account, met de wijzigingen erbij.</p>
          <ul className="m-0 mt-10 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2 lg:grid-cols-3">
            {ELKE_DAG.map((k) => (
              <Tegel key={k.naam} k={k} />
            ))}
          </ul>
        </div>
      </section>

      <DonkerBlok seed={53} label="Beheren en koppelen">
        <h2 className="m-0 max-w-[20ch] font-display font-extrabold text-white" style={h2Stijl}>
          Gebruik je een van deze? Dan koppelen we hem.
        </h2>
        <p className="m-0 mt-5 max-w-[620px] text-[18px] leading-[1.6] text-white/75">
          Of we nemen het beheer over. Advertenties, je webshop, je CRM en je boekhouding.
        </p>
        <ul className="m-0 mt-10 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2 lg:grid-cols-4">
          {KOPPELEN.map((k) => (
            <Tegel key={k.naam} k={k} donker />
          ))}
        </ul>
      </DonkerBlok>

      <Kennismaken kop="Iets anders?" zin="Heeft het een API of een export, dan koppelen we het." />
    </main>
  )
}
