/**
 * Kleine stelletjes nodes als watermerk in de achtergrond van een blok (W-535).
 *
 * Koen, 11 okt 01:35: drie keer het grote 3D-brein onder elkaar is te veel;
 * "moeten we niet gewoon de nodes stelletjes als watermerken door de pagina
 * laten gaan?". Het 3D-brein staat alleen nog in de hero; hier lopen de nodes
 * stil en licht door de pagina, zodat het merk overal terugkomt zonder dat het
 * de tekst wegdrukt.
 *
 * Servercomponent, puur SVG, vaste willekeur per seed (zelfde beeld bij elke
 * render). Langzaam zweven via CSS; onder reduced motion staat het stil.
 */

function rng(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

interface Stelletje {
  punten: { x: number; y: number; r: number }[]
  lijnen: [number, number][]
}

function maakStelletjes(seed: number, aantal: number): Stelletje[] {
  const r = rng(seed)
  const uit: Stelletje[] = []
  for (let c = 0; c < aantal; c++) {
    // Stelletjes aan de randen, weg van het midden waar de tekst staat.
    const links = c % 2 === 0
    const cx = links ? 40 + r() * 260 : 900 + r() * 260
    const cy = 60 + r() * 480
    const n = 5 + Math.floor(r() * 4)
    const punten = Array.from({ length: n }, () => ({
      x: cx + (r() - 0.5) * 220,
      y: cy + (r() - 0.5) * 160,
      r: 2 + r() * 3.5,
    }))
    const lijnen: [number, number][] = []
    for (let i = 1; i < n; i++) lijnen.push([i, Math.floor(r() * i)])
    if (n > 5) lijnen.push([n - 1, 1])
    uit.push({ punten, lijnen })
  }
  return uit
}

export default function NodeWatermerk({
  seed,
  thema = 'licht',
  aantal = 2,
}: {
  seed: number
  thema?: 'licht' | 'donker'
  aantal?: number
}) {
  const stelletjes = maakStelletjes(seed, aantal)
  const kleur = thema === 'donker' ? '#9CC6FF' : '#3D8EFF'
  const lijnOp = thema === 'donker' ? 0.14 : 0.13
  const stipOp = thema === 'donker' ? 0.22 : 0.18
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1200 600"
      preserveAspectRatio="xMidYMid slice"
      className="pointer-events-none absolute inset-0 h-full w-full"
    >
      {stelletjes.map((s, si) => (
        <g key={si} className="nw-zweef" style={{ animationDelay: `${-si * 7}s` }}>
          {s.lijnen.map(([a, b], li) => (
            <line
              key={li}
              x1={s.punten[a].x}
              y1={s.punten[a].y}
              x2={s.punten[b].x}
              y2={s.punten[b].y}
              stroke={kleur}
              strokeOpacity={lijnOp}
              strokeWidth={1}
            />
          ))}
          {s.punten.map((p, pi) => (
            <circle key={pi} cx={p.x} cy={p.y} r={p.r} fill={kleur} fillOpacity={stipOp} />
          ))}
        </g>
      ))}
    </svg>
  )
}
