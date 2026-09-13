import { Link } from '@/i18n/navigation'
import { integrations } from '@/data/integrations'

// W-078, 13 sep 2026. De bronnen die we vandaag echt uitlezen, groot in beeld
// op /integraties. Tot vanochtend stonden ze als een van 264 regels in een
// tabel die met Bouw7 begon; een lezer zag eerder een bouw-ERP dan Google Ads.
// Koen: "doe gewoon even de belangrijke in beeld". Dit is die lijst. Elke tegel
// hier MOET status 'live' hebben in data/integrations.ts; de check hieronder
// gooit er anders een bouwfout uit, zodat dit blok nooit meer belooft dan de
// tabel eronder. Volgorde is de volgorde waarin het geld eraan uitgaat.
// Facebook Graph en de Instagram Graph API staan hier als Meta en Instagram,
// want zo heten ze voor de lezer. Klaviyo en Merchant Center hebben geen
// woordmerk als vector in de repo, die tegels dragen alleen de naam.
type Kanaal = { slug: string; naam: string; logo?: string }

const KANALEN: Kanaal[] = [
  { slug: 'google-ads', naam: 'Google Ads', logo: 'google-ads' },
  { slug: 'meta-ads', naam: 'Meta Ads', logo: 'meta' },
  { slug: 'instagram-graph-api', naam: 'Instagram', logo: 'instagram' },
  { slug: 'google-analytics-4', naam: 'GA4', logo: 'google-analytics' },
  { slug: 'google-search-console', naam: 'Search Console', logo: 'google-search-console' },
  { slug: 'google-tag-manager', naam: 'Tag Manager', logo: 'google-tag-manager' },
  { slug: 'linkedin-ads', naam: 'LinkedIn Ads', logo: 'linkedin' },
  { slug: 'tiktok-ads', naam: 'TikTok Ads', logo: 'tiktok' },
  { slug: 'youtube-ads', naam: 'YouTube Ads', logo: 'youtube' },
  { slug: 'pinterest-ads', naam: 'Pinterest Ads', logo: 'pinterest' },
  { slug: 'snapchat-ads', naam: 'Snapchat Ads', logo: 'snapchat' },
  { slug: 'dv360', naam: 'DV360', logo: 'dv360' },
  { slug: 'google-merchant-center', naam: 'Merchant Center' },
  { slug: 'shopify', naam: 'Shopify', logo: 'shopify' },
  { slug: 'woocommerce', naam: 'WooCommerce', logo: 'woocommerce' },
  { slug: 'klaviyo', naam: 'Klaviyo' },
  { slug: 'mailchimp', naam: 'Mailchimp', logo: 'mailchimp' },
  { slug: 'google-sheets', naam: 'Google Sheets', logo: 'google-sheets' },
]

const LIVE = new Set(integrations.filter((i) => i.status === 'live').map((i) => i.slug))
for (const k of KANALEN) {
  if (!LIVE.has(k.slug)) {
    throw new Error(`KanalenStrip: "${k.slug}" staat in beeld maar heeft geen status 'live' in data/integrations.ts`)
  }
}

const COPY = {
  nl: {
    eyebrow: 'Wat we vandaag uitlezen',
    h2: 'De kanalen waar je geld heen gaat.',
    sub: 'Advertenties, meting en webshop. Dit lezen wij elke dag uit, per account, met de wijzigingsgeschiedenis erbij. Staat jouw systeem er niet tussen: als de vraag er is, koppelen we.',
    aria: 'Kanalen die Stevin vandaag uitleest',
  },
  en: {
    eyebrow: 'What we read today',
    h2: 'The channels your money goes to.',
    sub: 'Ads, measurement and your shop. We read these every day, per account, change history included. Your system not listed: if there is demand, we connect it.',
    aria: 'Channels Stevin reads today',
  },
} as const

export default function KanalenStrip({ locale }: { locale: string }) {
  const c = COPY[locale === 'en' ? 'en' : 'nl']

  return (
    <section id="kanalen" className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="mb-5 inline-flex items-center gap-3 text-xs font-extrabold uppercase tracking-[0.12em] text-[#3C8EFF] before:h-px before:w-7 before:bg-current">
            {c.eyebrow}
          </p>
          <h2 className="text-[clamp(2.125rem,4.2vw,3.625rem)] font-extrabold leading-[1.02] tracking-[-0.04em] text-[#0A0A0A]">
            {c.h2}
          </h2>
          <p className="mt-5 max-w-2xl text-[17px] leading-[1.55] text-[#4B5563]">
            {c.sub}
          </p>
        </div>

        <ul
          aria-label={c.aria}
          className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6"
        >
          {KANALEN.map((k) => (
            <li key={k.slug}>
              <Link
                href={`/integraties/${k.slug}`}
                className="group flex h-full min-h-[104px] flex-col items-center justify-center gap-3 rounded-[12px] border border-[#D9E0EB] bg-white px-3 py-5 text-center transition-colors hover:border-[#3C8EFF] hover:bg-[#F7F8FA]"
              >
                {k.logo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={`/logos/tools/${k.logo}.svg`}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    className="h-7 w-7 opacity-80 transition-opacity group-hover:opacity-100"
                  />
                ) : null}
                <span className={`font-extrabold leading-tight text-[#1F2933] ${k.logo ? 'text-[13px]' : 'text-[17px]'}`}>{k.naam}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
