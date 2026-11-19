import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'

type Props = { params: Promise<{ locale: string }>; searchParams: Promise<{ fout?: string }> }

// W-861: het codescherm voor /ps5-actie. De middleware herschrijft de actiepagina
// hierheen zolang er geen geldige cookie is; de URL blijft /ps5-actie. Bewust
// neutraal: geen woord over wat erachter staat en geen Open Graph-beeld, zodat
// een link in LinkedIn of WhatsApp niets van de actie laat zien.
export async function generateMetadata(): Promise<Metadata> {
  return { title: 'Stevin.AI', robots: 'noindex, nofollow' }
}

export default async function Ps5ActieToegangPage({ params, searchParams }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const { fout } = await searchParams
  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--color-primary)] px-5">
      <form method="get" action="/ps5-actie" className="w-full max-w-[360px] text-center">
        <h1 className="font-display text-[24px] font-extrabold leading-tight text-white">Even op pauze</h1>
        <p className="mt-2 text-[14px] leading-relaxed text-slate-300">Voor deze pagina heb je een code nodig.</p>
        <input
          name="code"
          type="password"
          inputMode="numeric"
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
