/**
 * Andere ontwerpen van Simon Stevin, als kale constructietekening in dezelfde stijl
 * als de clootcrans (components/blog/PosterWatermark.tsx): uitgerekend, dunne lijn,
 * geen vulling, geen figuren. W-461, 5 okt 2026.
 *
 * Aanleiding: een sectie met deze ontwerpen kwam uit Gemini, met gedetailleerde
 * schetsen en AI-taal. Koen: "niet in onze stijl". De feiten zijn nagekeken:
 *   - De Thiende (1585): na elk cijfer een getal in een cirkeltje voor de plaats.
 *   - De hydrostatische paradox (1586, De Beghinselen des Waterwichts): de druk op
 *     de bodem hangt alleen af van de hoogte van het water.
 *   - De Sterctenbouwing (1594): de regelmatige zeshoek als ideale plattegrond.
 *   - De Havenvinding (1599): breedte en kompasafwijking samen wijzen een plek aan.
 *     Niet de lengtegraad, zoals Gemini schreef.
 *   - De zeilwagen (rond 1600): vier wielen, twee zeilen, Scheveningen naar Petten.
 *
 * Dezelfde figuren zijn in Simons socialbeelden de watermerken per thema
 * (Stevin-Hub tools/simon/simon_social.py, W-185); daar staan ze in Python.
 */

type P = [number, number]
const f = (n: number) => n.toFixed(1)
const STROOK = 1.6

/** De Thiende: vier cirkels die schuin oplopen en per plaats een tiende kleiner worden,
 *  elk met een kleinere cirkel erin. Stevins notatie zonder de cijfers. */
function thiende() {
  const hoek = (-135 * Math.PI) / 180
  const punten: [number, number, number][] = []
  let [x, y, r] = [150, 150, 62]
  for (let i = 0; i < 4; i++) {
    punten.push([x, y, r])
    const nr = r * 0.6
    x += (r + nr + 6) * Math.cos(hoek)
    y += (r + nr + 6) * Math.sin(hoek)
    r = nr
  }
  const [x0, y0] = punten[0]
  const [x1, y1, r1] = punten[3]
  return {
    viewBox: '-18 -18 234 234',
    inhoud: (
      <>
        <path
          d={`M${f(x0)} ${f(y0)} L${f(x1 + (r1 + 14) * Math.cos(hoek))} ${f(y1 + (r1 + 14) * Math.sin(hoek))}`}
          strokeWidth={1.1}
        />
        {punten.map(([px, py, pr], i) => (
          <g key={i}>
            <circle cx={f(px)} cy={f(py)} r={f(pr)} />
            <circle cx={f(px)} cy={f(py)} r={f(pr * 0.5)} strokeWidth={0.9} />
          </g>
        ))}
      </>
    ),
  }
}

/** Vier vaten met een andere vorm, het water overal even hoog, onder elk dezelfde druk. */
function hydrostatischeParadox() {
  const [bodem, peil, top] = [160, 70, 40]
  const [v1, v2, v3, v4] = [4, 60, 116, 172]
  return {
    viewBox: '-6 30 232 166',
    inhoud: (
      <>
        <path d={`M0 ${bodem} L220 ${bodem}`} />
        <path d={`M${v1 + 12} ${bodem} L${v1} ${top} M${v1 + 34} ${bodem} L${v1 + 46} ${top}`} />
        <path
          d={`M${v2 + 4} ${bodem} L${v2 + 4} ${bodem - 34} L${v2 + 19} ${bodem - 34} L${v2 + 19} ${top} M${v2 + 42} ${bodem} L${v2 + 42} ${bodem - 34} L${v2 + 27} ${bodem - 34} L${v2 + 27} ${top}`}
        />
        <path
          d={`M${v3 + 14} ${top} L${v3 + 14} ${peil + 12} C${v3 + 1} ${peil + 42} ${v3 + 1} ${bodem - 26} ${v3 + 14} ${bodem} M${v3 + 32} ${top} L${v3 + 32} ${peil + 12} C${v3 + 45} ${peil + 42} ${v3 + 45} ${bodem - 26} ${v3 + 32} ${bodem}`}
        />
        <path d={`M${v4} ${bodem} L${v4 + 15} ${top} M${v4 + 46} ${bodem} L${v4 + 31} ${top}`} />
        <path d={`M0 ${peil} L220 ${peil}`} strokeDasharray="3 4" strokeWidth={1.1} />
        {[27, 83, 139, 195].map((x) => (
          <path
            key={x}
            d={`M${x} ${bodem + 26} L${x} ${bodem + 6} M${x - 4} ${bodem + 11} L${x} ${bodem + 6} L${x + 4} ${bodem + 11}`}
            strokeWidth={1.2}
          />
        ))}
      </>
    ),
  }
}

/** Een regelmatige zeshoek met op elke hoek een bastion; stippellijnen voor de zeshoek
 *  en twee vuurlijnen langs het volgende bastion. */
function vestingbouw() {
  const [n, r, cx, cy] = [6, 70, 110, 110]
  const hoeken: P[] = Array.from({ length: n }, (_, i) => {
    const a = ((90 + (i * 360) / n) * Math.PI) / 180
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)]
  })
  const punt = (p: P, q: P, t: number): P => [p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t]
  const uit = (p: P, d: number): P => {
    const [dx, dy] = [p[0] - cx, p[1] - cy]
    const l = Math.hypot(dx, dy)
    return [p[0] + (dx / l) * d, p[1] + (dy / l) * d]
  }
  const normaal = (p: P, q: P): P => {
    const [dx, dy] = [q[0] - p[0], q[1] - p[1]]
    const l = Math.hypot(dx, dy)
    const [nx, ny] = [dy / l, -dx / l]
    const m = [(p[0] + q[0]) / 2 - cx, (p[1] + q[1]) / 2 - cy]
    return nx * m[0] + ny * m[1] > 0 ? [nx, ny] : [-nx, -ny]
  }
  const omtrek: P[] = []
  const saillanten: P[] = []
  for (let i = 0; i < n; i++) {
    const v = hoeken[i]
    const vorige = hoeken[(i + n - 1) % n]
    const volgende = hoeken[(i + 1) % n]
    const a1 = punt(v, vorige, 0.3)
    const a2 = punt(v, volgende, 0.3)
    const n1 = normaal(v, vorige)
    const n2 = normaal(v, volgende)
    const s = uit(v, 34)
    omtrek.push(a1, [a1[0] + n1[0] * 13, a1[1] + n1[1] * 13], s, [a2[0] + n2[0] * 13, a2[1] + n2[1] * 13], a2)
    saillanten.push(s)
  }
  const pad = (ps: P[]) => 'M' + ps.map((p) => `${f(p[0])} ${f(p[1])}`).join(' L') + ' Z'
  const xs = omtrek.map((p) => p[0])
  const ys = omtrek.map((p) => p[1])
  return {
    viewBox: `${Math.round(Math.min(...xs) - 6)} ${Math.round(Math.min(...ys) - 6)} ${Math.round(Math.max(...xs) - Math.min(...xs) + 12)} ${Math.round(Math.max(...ys) - Math.min(...ys) + 12)}`,
    inhoud: (
      <>
        <path d={pad(omtrek)} />
        <path d={pad(hoeken)} strokeDasharray="3 4" strokeWidth={1} />
        {[0, 3].map((i) => {
          const s = saillanten[i]
          const doel = omtrek[5 * ((i + 1) % n) + 1]
          return (
            <path
              key={i}
              d={`M${f(s[0])} ${f(s[1])} L${f(doel[0])} ${f(doel[1])}`}
              strokeDasharray="2 3"
              strokeWidth={1}
            />
          )
        })}
      </>
    ),
  }
}

/** Een kompascirkel, het geografische noorden als stippellijn, de naald 14 graden ernaast. */
function havenvinding() {
  const [cx, cy, r] = [110, 110, 84]
  const a = (14 * Math.PI) / 180
  const tip: P = [cx + (r - 14) * Math.sin(a), cy - (r - 14) * Math.cos(a)]
  const staart: P = [cx - (r - 30) * Math.sin(a), cy + (r - 30) * Math.cos(a)]
  const links: P = [cx - 7 * Math.cos(a), cy - 7 * Math.sin(a)]
  const rechts: P = [cx + 7 * Math.cos(a), cy + 7 * Math.sin(a)]
  const rb = 44
  return {
    viewBox: '20 6 180 196',
    inhoud: (
      <>
        <circle cx={cx} cy={cy} r={r} />
        <circle cx={cx} cy={cy} r={2.6} />
        {Array.from({ length: 36 }, (_, i) => {
          const g = i * 10
          const h = (g * Math.PI) / 180
          const lang = g % 90 === 0 ? 10 : 5
          return (
            <path
              key={g}
              d={`M${f(cx + r * Math.sin(h))} ${f(cy - r * Math.cos(h))} L${f(cx + (r - lang) * Math.sin(h))} ${f(cy - (r - lang) * Math.cos(h))}`}
              strokeWidth={g % 90 === 0 ? 1.6 : 1}
            />
          )
        })}
        <path d={`M${cx} ${cy} L${cx} ${cy - r - 14}`} strokeDasharray="3 4" strokeWidth={1.1} />
        <path
          d={`M${f(tip[0])} ${f(tip[1])} L${f(links[0])} ${f(links[1])} L${f(staart[0])} ${f(staart[1])} L${f(rechts[0])} ${f(rechts[1])} Z`}
        />
        <path
          d={`M${cx} ${cy - rb} A${rb} ${rb} 0 0 1 ${f(cx + rb * Math.sin(a))} ${f(cy - rb * Math.cos(a))}`}
          strokeWidth={1.1}
        />
      </>
    ),
  }
}

/** Vier wielen (twee in zijaanzicht), een lage bak, twee masten met elk een zeil, wind van links. */
function zeilwagen() {
  return {
    viewBox: '-6 24 232 180',
    inhoud: (
      <>
        <path d="M20 150 L200 150 L190 168 L30 168 Z" />
        {[55, 165].map((x) => (
          <g key={x}>
            <circle cx={x} cy={180} r={16} />
            <circle cx={x} cy={180} r={2.4} />
            {Array.from({ length: 8 }, (_, i) => {
              const h = (i * 45 * Math.PI) / 180
              return (
                <path
                  key={i}
                  d={`M${f(x + 2.4 * Math.cos(h))} ${f(180 + 2.4 * Math.sin(h))} L${f(x + 16 * Math.cos(h))} ${f(180 + 16 * Math.sin(h))}`}
                  strokeWidth={0.9}
                />
              )
            })}
          </g>
        ))}
        {[
          [80, 34],
          [150, 62],
        ].map(([x, top]) => (
          <g key={x}>
            <path d={`M${x} 150 L${x} ${top}`} />
            <path d={`M${x} ${top + 4} Q${x + 46} ${(top + 140) / 2} ${x + 30} 140 L${x} 140`} />
          </g>
        ))}
        {[70, 92, 114].map((y) => (
          <path key={y} d={`M0 ${y} L18 ${y}`} strokeWidth={1.1} />
        ))}
        <path d="M0 196 L220 196" strokeWidth={1.1} />
      </>
    ),
  }
}

export const ONTWERPEN = {
  thiende,
  hydrostatischeParadox,
  vestingbouw,
  havenvinding,
  zeilwagen,
} as const

export type Ontwerp = keyof typeof ONTWERPEN

export function StevinOntwerp({
  naam,
  label,
  kleur = 'var(--navy)',
}: {
  naam: Ontwerp
  label: string
  kleur?: string
}) {
  const { viewBox, inhoud } = ONTWERPEN[naam]()
  return (
    <svg
      viewBox={viewBox}
      role="img"
      aria-label={label}
      preserveAspectRatio="xMinYMid meet"
      style={{ width: '100%', height: 'auto', maxHeight: '190px', display: 'block' }}
    >
      <g fill="none" stroke={kleur} strokeWidth={STROOK} strokeLinejoin="round" strokeLinecap="round">
        {inhoud}
      </g>
    </svg>
  )
}
