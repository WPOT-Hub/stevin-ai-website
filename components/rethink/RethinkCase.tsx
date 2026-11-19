import { DonkerBlok, Kennismaken, PaginaKop, Punten, h2Stijl, tekst } from './RethinkBlokken'

// Klantcase (W-860). Een case noemt een klant bij naam en gebruikt alleen
// cijfers die in het klantdossier staan (KLANTFEITEN.md in Stevin-company).
// De pagina's staan op noindex en niet in de sitemap tot de klant akkoord is.

export type Case = {
  eyebrow: string
  kop: string
  accent: string
  lede: string
  probleemKop: string
  problemen: { t: string; d: string }[]
  aanpakKop: string
  aanpakZin: string
  aanpak: { t: string; d: string }[]
  uitkomstKop: string
  cijfers: { getal: string; uitleg: string }[]
  bron: string
  knop: string
}

export default function RethinkCase({ c }: { c: Case }) {
  return (
    <main className="bg-white">
      <PaginaKop eyebrow={c.eyebrow} kop={c.kop} accent={c.accent} knop={c.knop} lede={<p className="m-0">{c.lede}</p>} />

      <section className="px-6 pb-24 pt-20 sm:pt-24">
        <div className="mx-auto max-w-[1152px]">
          <h2 className="m-0 max-w-[20ch] font-display font-extrabold text-primary" style={h2Stijl}>
            {c.probleemKop}
          </h2>
          <Punten items={c.problemen} />
        </div>
      </section>

      <DonkerBlok seed={41} label="Wat we deden">
        <h2 className="m-0 max-w-[18ch] font-display font-extrabold text-white" style={h2Stijl}>
          {c.aanpakKop}
        </h2>
        <p className="m-0 mt-6 max-w-[620px] text-[18px] leading-[1.6] text-white/75">{c.aanpakZin}</p>
        <Punten items={c.aanpak} donker />
      </DonkerBlok>

      <section className="px-6" style={{ paddingTop: 104, paddingBottom: 104 }}>
        <div className="mx-auto max-w-[1152px]">
          <h2 className="m-0 max-w-[20ch] font-display font-extrabold text-primary" style={h2Stijl}>
            {c.uitkomstKop}
          </h2>
          <dl className="m-0 mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {c.cijfers.map((x) => (
              <div key={x.uitleg} className="border-t border-border pt-5">
                <dt className="font-display text-[34px] font-extrabold text-primary" style={{ letterSpacing: '-0.02em', lineHeight: '1.1' }}>
                  {x.getal}
                </dt>
                <dd className="m-0 mt-2.5 text-[16px] leading-[1.55] text-[#2A3A54]">{x.uitleg}</dd>
              </div>
            ))}
          </dl>
          <p className={`m-0 mt-10 max-w-[680px] ${tekst}`}>{c.bron}</p>
        </div>
      </section>

      <Kennismaken />
    </main>
  )
}
