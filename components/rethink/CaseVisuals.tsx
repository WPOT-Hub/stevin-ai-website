import Image from 'next/image'

// Beeldbouwstenen voor de klantcases (W-860). Alleen echte beelden en cijfers
// uit het klantdossier. Geen bedragen in beeld, groei alleen als percentage of telling.

/** Browserkader om een echte schermafbeelding, met bijschrift. */
export function BeeldKader({
  src,
  alt,
  breedte,
  hoogte,
  url,
  bijschrift,
  donker = false,
}: {
  src: string
  alt: string
  breedte: number
  hoogte: number
  url?: string
  bijschrift: string
  donker?: boolean
}) {
  return (
    <figure className="m-0">
      <div className="overflow-hidden rounded-xl border border-border bg-white shadow-[0_8px_30px_rgba(10,22,40,0.08)]">
        <div className="flex items-center gap-2 border-b border-border bg-[#F3F5F9] px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#D6DDE8]" aria-hidden="true" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#D6DDE8]" aria-hidden="true" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#D6DDE8]" aria-hidden="true" />
          {url ? <span className="ml-3 truncate text-[12px] text-[#5B6B85]">{url}</span> : null}
        </div>
        <Image src={src} alt={alt} width={breedte} height={hoogte} className="h-auto w-full" sizes="(min-width: 1152px) 1152px, 100vw" />
      </div>
      <figcaption className={`mt-3 max-w-[720px] text-[14px] leading-[1.5] ${donker ? 'text-white/70' : 'text-[#5B6B85]'}`}>{bijschrift}</figcaption>
    </figure>
  )
}

/** Een rij grote tellers naast elkaar. */
export function Tellers({ items }: { items: { getal: string; label: string }[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {items.map((x) => (
        <div key={x.label} className="rounded-xl border border-border bg-[#F7F8FA] px-6 py-6">
          <div className="font-display text-[44px] font-extrabold leading-none text-primary" style={{ letterSpacing: '-0.03em' }}>
            {x.getal}
          </div>
          <div className="mt-3 text-[15px] leading-[1.45] text-[#2A3A54]">{x.label}</div>
        </div>
      ))}
    </div>
  )
}

/** Twee balken naast elkaar: een stand voor en een stand na, op dezelfde schaal. */
export function VoorNaBalken({
  titel,
  rijen,
  bron,
}: {
  titel: string
  rijen: { label: string; procent: number; waarde: string; accent?: boolean }[]
  bron: string
}) {
  return (
    <figure className="m-0 rounded-xl border border-border bg-white px-6 py-7 sm:px-8">
      <p className="m-0 font-display text-[16px] font-bold text-primary">{titel}</p>
      <div className="mt-6 grid gap-5">
        {rijen.map((r) => (
          <div key={r.label}>
            <div className="flex items-baseline justify-between gap-4 text-[14px] text-[#2A3A54]">
              <span>{r.label}</span>
              <span className="font-display text-[20px] font-extrabold text-primary">{r.waarde}</span>
            </div>
            <div className="mt-2 h-4 w-full rounded-full bg-[#EEF1F6]" role="img" aria-label={`${r.label}: ${r.waarde}`}>
              <div
                className={`h-4 rounded-full ${r.accent ? 'bg-accent' : 'bg-primary'}`}
                style={{ width: `${Math.max(r.procent, 0.8)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      <figcaption className="mt-5 text-[13px] leading-[1.5] text-[#5B6B85]">{bron}</figcaption>
    </figure>
  )
}

/** Een stip per vastgelegde handeling. Een deel is gemarkeerd. */
export function Stippen({ totaal, gemarkeerd, label, legenda }: { totaal: number; gemarkeerd: number; label: string; legenda: [string, string] }) {
  return (
    <figure className="m-0">
      <div className="flex flex-wrap gap-[5px]" role="img" aria-label={label}>
        {Array.from({ length: totaal }, (_, i) => (
          <span key={i} className={`h-[9px] w-[9px] rounded-[2px] ${i < gemarkeerd ? 'bg-accent' : 'bg-white/25'}`} />
        ))}
      </div>
      <figcaption className="mt-5 flex flex-wrap gap-x-8 gap-y-2 text-[14px] text-white/75">
        <span className="flex items-center gap-2"><span className="h-[9px] w-[9px] rounded-[2px] bg-accent" aria-hidden="true" />{legenda[0]}</span>
        <span className="flex items-center gap-2"><span className="h-[9px] w-[9px] rounded-[2px] bg-white/25" aria-hidden="true" />{legenda[1]}</span>
      </figcaption>
    </figure>
  )
}

/** Tijdlijn met datum en gebeurtenis. */
export function Tijdlijn({ stappen }: { stappen: { datum: string; t: string; d: string }[] }) {
  return (
    <ol className="m-0 grid list-none gap-0 p-0 sm:grid-cols-2 lg:grid-cols-4">
      {stappen.map((s, i) => (
        <li key={s.datum + s.t} className="relative border-t-2 border-accent pb-2 pr-6 pt-5">
          <span className="font-display text-[12px] font-bold uppercase tracking-[0.1em] text-accent">{s.datum}</span>
          <h3 className="m-0 mt-2 font-display text-[18px] font-bold text-primary" style={{ lineHeight: '1.25' }}>{s.t}</h3>
          <p className="m-0 mt-2 text-[15px] leading-[1.5] text-[#2A3A54]">{s.d}</p>
          <span className="sr-only">Stap {i + 1}</span>
        </li>
      ))}
    </ol>
  )
}

/** Voorbeeld van de melding die de eigenaar op zijn telefoon krijgt. */
export function TelefoonMelding({ kop, regels, knoppen, bijschrift, donker = false }: { kop: string; regels: string[]; knoppen: string[]; bijschrift: string; donker?: boolean }) {
  return (
    <figure className="m-0 mx-auto max-w-[360px]">
      <div className="rounded-[28px] border-[6px] border-primary bg-[#EAF0F8] p-4 shadow-[0_8px_30px_rgba(10,22,40,0.12)]">
        <div className="rounded-2xl bg-white p-4">
          <p className="m-0 font-display text-[15px] font-bold text-primary">{kop}</p>
          {regels.map((r) => (
            <p key={r} className="m-0 mt-1.5 text-[14px] text-[#2A3A54]">{r}</p>
          ))}
          <div className="mt-4 grid gap-2">
            {knoppen.map((k) => (
              <span key={k} className="rounded-lg bg-[#EEF3FB] px-3 py-2 text-center text-[13px] font-semibold text-accent">{k}</span>
            ))}
          </div>
        </div>
      </div>
      <figcaption className={`mt-3 text-center text-[13px] leading-[1.5] ${donker ? 'text-white/70' : 'text-[#5B6B85]'}`}>{bijschrift}</figcaption>
    </figure>
  )
}
