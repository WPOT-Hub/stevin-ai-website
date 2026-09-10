/**
 * Watermerk voor de Journal-posters: de clootcrans van Simon Stevin.
 *
 * Aanleiding (10 sep 2026, W-092): de posterkaarten waren een kaal donker vlak
 * met alleen een tag en een regel tekst.
 *
 * De figuur is Stevins eigen bewijs bij "Wonder en is gheen wonder", de zin die
 * onder elk editorial staat. Een gesloten ketting van even zware bollen over een
 * hellend vlak blijft hangen, want anders zou hij eeuwig door blijven draaien.
 *
 * Nagetekend naar de originele houtsnede uit De Beghinselen der Weeghconst
 * (1586), niet naar de moderne schoolboekschets. Het verschil zit in de telling
 * en in de kant:
 *
 *   - 14 bollen in totaal
 *   - 4 op de lange, flauwe helling, en die ligt LINKS
 *   - 2 op de korte, steile helling rechts
 *   - 8 in de krans die er onderdoor hangt
 *   - de lange helling is exact twee keer de korte en draagt dus twee keer zo
 *     veel bollen; daar rust het hele bewijs op
 *
 * Alles volgt uit een hart-op-hart-afstand van 40 eenheden en een hoogte van 70:
 * de hellingen worden dan 160 en 80 lang. De krans is een cirkelboog waarvan de
 * lengte precies de acht resterende bollen opneemt (198,3 graden, straal 92,5),
 * zodat de bollen over de hele ketting even ver uit elkaar liggen. Verander een
 * van die getallen en de telling klopt niet meer.
 *
 * De bollen hebben straal 13 bij een afstand van 40, zodat er koord tussen zichtbaar
 * blijft zoals in de houtsnede. Groter en ze lopen door de driehoek heen.
 */

type Punt = { x: number; y: number }

const AFSTAND = 40
const HOOGTE = 70
const BASIS_Y = 210
const LOOP_LANG = Math.sqrt((4 * AFSTAND) ** 2 - HOOGTE ** 2)
const LOOP_KORT = Math.sqrt((2 * AFSTAND) ** 2 - HOOGTE ** 2)

const BL: Punt = { x: 0, y: BASIS_Y }
const APEX: Punt = { x: LOOP_LANG, y: BASIS_Y - HOOGTE }
const BR: Punt = { x: LOOP_LANG + LOOP_KORT, y: BASIS_Y }

// Cirkelboog voor de krans: de koorde is de basis, de booglengte is precies wat
// er van de ketting overblijft. De halve hoek volgt uit sin(x)/x = koorde/boog.
const KOORDE = BR.x - BL.x
const BOOGLENGTE = 14 * AFSTAND - 6 * AFSTAND
const HALVE_HOEK = (() => {
  let lo = 0.001
  let hi = Math.PI
  for (let i = 0; i < 80; i++) {
    const m = (lo + hi) / 2
    if (Math.sin(m) / m > KOORDE / BOOGLENGTE) lo = m
    else hi = m
  }
  return (lo + hi) / 2
})()
const STRAAL = BOOGLENGTE / (2 * HALVE_HOEK)
const MIDDEN: Punt = { x: KOORDE / 2, y: BASIS_Y - STRAAL * Math.cos(HALVE_HOEK) }

function ketting(): Punt[] {
  const pad: Punt[] = []
  const recht = (a: Punt, b: Punt, n: number) => {
    for (let i = 0; i <= n; i++) {
      const t = i / n
      pad.push({ x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t })
    }
  }
  recht(BL, APEX, 200)
  recht(APEX, BR, 120)
  const vanaf = Math.atan2(BR.y - MIDDEN.y, BR.x - MIDDEN.x)
  let tot = Math.atan2(BL.y - MIDDEN.y, BL.x - MIDDEN.x)
  if (tot < vanaf) tot += 2 * Math.PI
  for (let i = 1; i <= 400; i++) {
    const a = vanaf + ((tot - vanaf) * i) / 400
    pad.push({ x: MIDDEN.x + STRAAL * Math.cos(a), y: MIDDEN.y + STRAAL * Math.sin(a) })
  }
  return pad
}

/** Bollen op gelijke boogafstand over de hele gesloten ketting.
 *
 *  Begint op nul, niet op een halve afstand. De ketting is precies 14 keer de
 *  bolafstand lang en de drie hoekpunten liggen op 0, 160 en 240, allemaal een
 *  veelvoud van 40. Daardoor valt er een bol op de top en op beide hoeken, zoals
 *  in de houtsnede, en sluit de krans rond. Begin je op een halve afstand, dan
 *  liggen de bollen naast de hoeken en loopt de ketting scheef. */
function bollen(pad: Punt[]): Punt[] {
  const uit: Punt[] = []
  let over = 0
  for (let i = 1; i < pad.length; i++) {
    const dx = pad[i].x - pad[i - 1].x
    const dy = pad[i].y - pad[i - 1].y
    const lengte = Math.hypot(dx, dy)
    if (lengte === 0) continue
    let rest = lengte
    let afgelegd = 0
    while (over <= rest) {
      afgelegd += over
      rest -= over
      const t = afgelegd / lengte
      uit.push({ x: pad[i - 1].x + dx * t, y: pad[i - 1].y + dy * t })
      over = AFSTAND
    }
    over -= rest
  }
  // De laatste stap komt weer op het beginpunt uit; die bol staat er al.
  return uit.slice(0, 14)
}

const STRAAL_BOL = 13
const PAD = ketting()
const BOLLEN = bollen(PAD)

/** De viewBox wordt uitgerekend uit de werkelijke uiterste punten van de ketting
 *  en de bollen, niet met de hand gezet. Anders kapt de figuur af zodra er iets
 *  aan de meetkunde verandert. */
const KADER = (() => {
  const marge = 6
  let minX = Infinity
  let minY = Infinity
  let maxX = -Infinity
  let maxY = -Infinity
  const raak = (x: number, y: number) => {
    if (x < minX) minX = x
    if (y < minY) minY = y
    if (x > maxX) maxX = x
    if (y > maxY) maxY = y
  }
  for (const p of PAD) raak(p.x, p.y)
  for (const b of BOLLEN) {
    raak(b.x - STRAAL_BOL, b.y - STRAAL_BOL)
    raak(b.x + STRAAL_BOL, b.y + STRAAL_BOL)
  }
  return {
    x: minX - marge,
    y: minY - marge,
    breedte: maxX - minX + 2 * marge,
    hoogte: maxY - minY + 2 * marge,
  }
})()
const KETTING_PAD =
  `M${BL.x.toFixed(1)} ${BL.y} L${APEX.x.toFixed(1)} ${APEX.y} L${BR.x.toFixed(1)} ${BR.y} ` +
  `A${STRAAL.toFixed(1)} ${STRAAL.toFixed(1)} 0 1 1 ${BL.x.toFixed(1)} ${BL.y}`
const DRIEHOEK =
  `M${APEX.x.toFixed(1)} ${APEX.y} L${BL.x.toFixed(1)} ${BL.y} L${BR.x.toFixed(1)} ${BR.y} Z`

/** De figuur zelf, los van de poster. Dezelfde geometrie op elke plek waar we
 *  hem tonen, zodat de telling maar op een plaats wordt bijgehouden. */
export function Clootcrans({
  kleur = 'var(--navy)',
  strook = 1.6,
}: {
  kleur?: string
  strook?: number
}) {
  return (
    <g fill="none" stroke={kleur} strokeWidth={strook} strokeLinejoin="round">
      <path d={DRIEHOEK} />
      <path d={KETTING_PAD} strokeWidth={strook * 0.7} />
      {BOLLEN.map((b, i) => (
        <circle key={i} cx={b.x.toFixed(2)} cy={b.y.toFixed(2)} r={STRAAL_BOL} />
      ))}
    </g>
  )
}

export const CLOOTCRANS_VIEWBOX = `${KADER.x.toFixed(1)} ${KADER.y.toFixed(1)} ${KADER.breedte.toFixed(1)} ${KADER.hoogte.toFixed(1)}`

export function PosterWatermark({ style }: { style: 'solid' | 'gradient' | 'surface' }) {
  return (
    <svg
      aria-hidden="true"
      viewBox={CLOOTCRANS_VIEWBOX}
      preserveAspectRatio="xMaxYMax meet"
      style={{
        position: 'absolute',
        right: '-5%',
        bottom: '-11%',
        height: '102%',
        width: 'auto',
        opacity: style === 'surface' ? 0.055 : 0.07,
        pointerEvents: 'none',
      }}
    >
      <Clootcrans kleur={style === 'surface' ? 'var(--navy)' : '#fff'} />
    </svg>
  )
}
