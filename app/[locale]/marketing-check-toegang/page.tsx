import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { headers } from 'next/headers'

type Props = { params: Promise<{ locale: string }>; searchParams: Promise<{ fout?: string }> }

// Het codescherm voor /marketing-check (W-134). De middleware herschrijft de
// check hierheen zolang MARKETING_CHECK_TOEGANGSCODE gezet is en er geen
// geldige cookie is; de URL blijft /marketing-check. Het formulier stuurt de
// code als ?code= terug naar diezelfde URL, de middleware zet de cookie.
// Geen klantnaam, geen uitleg wat erachter zit: een neutrale poort.
/**
 * Een crawler (LinkedIn, WhatsApp) heeft geen cookie en krijgt deze pagina op
 * de URL van de check. Koen, 15 sep 14:12: "geen OG". Daarom hier dezelfde
 * Open Graph als de pagina erachter; de middleware zegt via x-mc-pad welke.
 */
export async function generateMetadata(): Promise<Metadata> {
  const pad = (await headers()).get('x-mc-pad') ?? '/marketing-scan'
  const ai = pad.includes('ai-ready-scan')
  const titel = ai ? 'Stevin AI-Ready Scan: eerst meten, dan met AI bouwen' : 'Marketing Scan: laat Stevin Agents je marketing scannen'
  const beschrijving = ai
    ? 'Jullie willen met AI werken. Kan jullie meetlaag dat dragen? Vul je bedrijfswebsite in; wij meten van buitenaf welke signalen je site doorgeeft.'
    : 'Vul je bedrijfswebsite in. We lezen je site, kijken in de advertentieregisters en zeggen wat we van buitenaf kunnen zien. Geen naam, geen e-mailadres.'
  return {
    title: titel,
    description: beschrijving,
    robots: 'noindex, nofollow',
    openGraph: {
      type: 'website', locale: 'nl_NL', siteName: 'Stevin.AI', title: titel, description: beschrijving,
      url: `https://stevin.ai${ai ? '/ai-ready-scan' : '/marketing-scan'}`,
      images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: titel }],
    },
    twitter: { card: 'summary_large_image', title: titel, description: beschrijving, images: ['/opengraph-image'] },
  }
}

export default async function MarketingCheckToegangPage({ params, searchParams }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const { fout } = await searchParams
  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--color-primary)] px-5">
      <form method="get" action="/marketing-scan" className="w-full max-w-[360px] text-center">
        <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-[var(--color-accent)]">Afgeschermd met een code</p>
        <h1 className="mt-3 font-display text-[24px] font-extrabold leading-tight text-white">Deze pagina is nog niet open</h1>
        <p className="mt-2 text-[14px] leading-relaxed text-slate-300">Heb je een code gekregen, vul die dan hieronder in.</p>
        <input
          name="code"
          type="password"
          autoComplete="off"
          autoFocus
          placeholder="Code"
          className="mt-6 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3.5 text-center text-[17px] tracking-[0.2em] text-white outline-none placeholder:tracking-normal placeholder:text-slate-500 focus:border-[var(--color-accent)]"
        />
        {fout && <p className="mt-3 text-[13px] text-[var(--color-pink)]">Die code klopt niet.</p>}
        <button
          type="submit"
          className="mt-4 w-full rounded-xl bg-[var(--color-accent)] px-5 py-3.5 text-[16px] font-semibold text-white transition-colors hover:bg-[var(--color-accent-dark)]"
        >
          Verder
        </button>
      </form>
    </main>
  )
}
