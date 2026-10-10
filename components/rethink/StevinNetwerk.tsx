'use client'

import { useEffect, useId, useRef, useState } from 'react'
import {
  ADVISOR,
  ADVISOR_POS,
  BREIN,
  BRONNEN,
  DWARS,
  MIDDEN,
  SIGNAAL_POS,
  VIEW_H,
  VIEW_W,
  bronPositie,
  type BronId,
  type Fase,
  type NetwerkNode,
  type NodeId,
} from './netwerk'

/**
 * De nodevisual van de nieuwe homepage (W-535).
 *
 * Wat hij laat zien: informatie uit losse bronnen komt samen in het brein,
 * het brein ziet iets (een signaal), en de Advisor zegt wat de volgende stap
 * is. Van links naar rechts te lezen, ook als er niets beweegt.
 *
 * Wat we bewust anders doen dan swoep.ai (bekeken 10 okt 2026):
 * - Twaalf nodes met een naam in plaats van 105 sfeerstippen.
 * - Geen draaien met slepen. Op een telefoon botst dat met scrollen.
 * - Op mobiel geen verkleind netwerk (daar lopen bij Swoep de labels door
 *   elkaar) maar een verticale route: bronnen als knoppen, dan brein,
 *   signaal en advies onder elkaar.
 * - Elke node is een knop met een zin uitleg, dus met het toetsenbord en een
 *   schermlezer te gebruiken.
 *
 * Beweging is alleen CSS (stroke-dashoffset en opacity), geen bibliotheek.
 * Onder prefers-reduced-motion staat alles stil en blijft het leesbaar.
 */

export type NetwerkThema = 'licht' | 'donker'

interface Props {
  fase?: Fase
  /** Bronnen die bij de huidige vraag horen. Leeg = allemaal gewoon. */
  actieveBronnen?: BronId[]
  /** Tekst in het signaal-label, alleen zichtbaar vanaf fase 'signaal'. */
  signaal?: string
  thema?: NetwerkThema
  className?: string
  /** Kop boven de uitleg onder de visual, voor schermlezers. */
  label?: string
  /** Op mobiel ook brein, signaal en Advisor onder de bronnen tekenen. In de
   *  vraagdemo staat die route al als kaarten in het gesprek, dan uit. */
  mobielRoute?: boolean
  /** Een vraagknop onder de visual die de route in het netwerk zelf afspeelt
   *  (hero). Zonder deze prop bepaalt de ouder de fase. */
  demo?: {
    vraag: string
    bronnen: BronId[]
    signaal: string
    uitleg: string
    verderHref?: string
  }
}

const KLEUR = {
  licht: {
    lijn: 'rgba(10, 22, 40, 0.13)',
    lijnActief: '#2F7FE8',
    node: '#FFFFFF',
    nodeRand: '#C8D2E0',
    nodeActief: '#3D8EFF',
    tekst: '#0A1628',
    tekstStil: 'rgba(10, 22, 40, 0.38)',
    kern: '#0A1628',
    kernTekst: '#FFFFFF',
    kaart: 'bg-white border-border text-primary',
    kaartSub: 'text-muted',
  },
  donker: {
    lijn: 'rgba(255, 255, 255, 0.14)',
    lijnActief: '#5DA3FF',
    node: '#0F1F38',
    nodeRand: 'rgba(255, 255, 255, 0.28)',
    nodeActief: '#5DA3FF',
    tekst: 'rgba(255, 255, 255, 0.88)',
    tekstStil: 'rgba(255, 255, 255, 0.32)',
    kern: '#FFFFFF',
    kernTekst: '#0A1628',
    kaart: 'bg-white/5 border-white/15 text-white',
    kaartSub: 'text-white/60',
  },
} as const

const POS = BRONNEN.map((b, i) => ({ ...b, ...bronPositie(i, BRONNEN.length) }))
const POS_MAP = Object.fromEntries(POS.map((p) => [p.id, p])) as Record<BronId, (typeof POS)[number]>

export default function StevinNetwerk({
  fase = 'rust',
  actieveBronnen = [],
  signaal,
  thema = 'licht',
  className = '',
  label = 'Hoe Stevin je informatie samenbrengt',
  mobielRoute = true,
  demo,
}: Props) {
  const k = KLEUR[thema]
  const [gekozen, setGekozen] = useState<NodeId | null>(null)
  const uitlegId = useId()

  // Eigen afspeelstand voor de hero-knop.
  const [demoFase, setDemoFase] = useState<Fase | null>(null)
  const timers = useRef<number[]>([])
  useEffect(() => () => timers.current.forEach((t) => window.clearTimeout(t)), [])
  const speelAf = () => {
    if (!demo) return
    if (demoFase !== null && demoFase !== 'advies') return
    timers.current.forEach((t) => window.clearTimeout(t))
    timers.current = []
    setGekozen(null)
    const w = window as unknown as { dataLayer?: Record<string, unknown>[] }
    w.dataLayer = w.dataLayer ?? []
    w.dataLayer.push({ event: 'demo_vraag', demo_vraag: 'hero_resultaten_week', page_path: window.location.pathname })
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDemoFase('advies')
      return
    }
    ;(['bronnen', 'brein', 'signaal', 'advies'] as Fase[]).forEach((f, i) => {
      timers.current.push(window.setTimeout(() => setDemoFase(f), i * 750))
    })
  }
  if (demo && demoFase) {
    fase = demoFase
    actieveBronnen = demo.bronnen
    signaal = demo.signaal
  }

  const bezig = fase !== 'rust'
  const isActief = (id: BronId) => bezig && actieveBronnen.includes(id)
  const isStil = (id: BronId) => bezig && !actieveBronnen.includes(id)
  const breinAan = fase === 'brein' || fase === 'signaal' || fase === 'advies'
  // Halo's en pulsen alleen zolang de route loopt. Na het advies staat alles
  // stil, zodat je kunt lezen zonder dat er iets blijft bewegen.
  const loopt = fase === 'bronnen' || fase === 'brein' || fase === 'signaal'
  const signaalAan = fase === 'signaal' || fase === 'advies'
  const advisorAan = fase === 'advies'

  const alleNodes: NetwerkNode[] = [...BRONNEN, BREIN, ADVISOR]
  const gekozenNode = alleNodes.find((n) => n.id === gekozen) ?? null

  const kies = (id: NodeId) => setGekozen((huidig) => (huidig === id ? null : id))

  return (
    <figure className={`sn-netwerk m-0 ${className}`} aria-label={label}>
      {/* ── Desktop en tablet: de C rond het brein ── */}
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        className="hidden h-auto w-full md:block"
        role="group"
        aria-describedby={uitlegId}
      >
        {/* Dwarsverbanden */}
        {DWARS.map(([a, b]) => {
          const pa = POS_MAP[a]
          const pb = POS_MAP[b]
          const aan = isActief(a) && isActief(b)
          return (
            <line
              key={`${a}-${b}`}
              x1={pa.x}
              y1={pa.y}
              x2={pb.x}
              y2={pb.y}
              stroke={aan ? k.lijnActief : k.lijn}
              strokeWidth={aan ? 1.4 : 1}
              strokeOpacity={isStil(a) || isStil(b) ? 0.35 : aan ? 0.55 : 1}
              className="sn-overgang"
            />
          )
        })}

        {/* Bron naar brein */}
        {POS.map((p, i) => {
          const aan = isActief(p.id)
          return (
            <g key={`lijn-${p.id}`}>
              <line
                x1={p.x}
                y1={p.y}
                x2={MIDDEN.x}
                y2={MIDDEN.y}
                stroke={aan ? k.lijnActief : k.lijn}
                strokeWidth={aan ? 1.6 : 1}
                strokeOpacity={isStil(p.id) ? 0.35 : 1}
                className="sn-overgang"
              />
              {/* Stroompje: in rust af en toe, bij een vraag over de actieve lijnen */}
              {((aan && loopt) || !bezig) && (
                <line
                  x1={p.x}
                  y1={p.y}
                  x2={MIDDEN.x}
                  y2={MIDDEN.y}
                  stroke={k.lijnActief}
                  strokeWidth={2}
                  strokeLinecap="round"
                  pathLength={100}
                  className={aan ? 'sn-stroom sn-stroom-snel' : 'sn-stroom'}
                  style={{ animationDelay: `${aan ? i * 0.12 : i * 1.7}s` }}
                />
              )}
            </g>
          )
        })}

        {/* Brein naar Advisor, via het signaal */}
        <line
          x1={MIDDEN.x}
          y1={MIDDEN.y}
          x2={ADVISOR_POS.x}
          y2={ADVISOR_POS.y}
          stroke={signaalAan ? k.lijnActief : k.lijn}
          strokeWidth={signaalAan ? 1.8 : 1.2}
          className="sn-overgang"
        />
        {signaalAan && loopt && (
          <line
            x1={MIDDEN.x}
            y1={MIDDEN.y}
            x2={ADVISOR_POS.x}
            y2={ADVISOR_POS.y}
            stroke={k.lijnActief}
            strokeWidth={2.4}
            strokeLinecap="round"
            pathLength={100}
            className="sn-stroom sn-stroom-snel"
          />
        )}

        {/* Bronnen */}
        {POS.map((p) => {
          const aan = isActief(p.id)
          const stil = isStil(p.id)
          const links = p.cos < -0.35
          const boven = !links && p.sin > 0
          const tx = links ? p.x - 16 : p.x
          const ty = links ? p.y + 4.5 : boven ? p.y - 15 : p.y + 25
          return (
            <g
              key={p.id}
              role="button"
              tabIndex={0}
              aria-label={`${p.label}: ${p.uitleg}`}
              aria-pressed={gekozen === p.id}
              onClick={() => kies(p.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  kies(p.id)
                }
              }}
              className="sn-node cursor-pointer outline-none"
            >
              <circle cx={p.x} cy={p.y} r={18} fill="transparent" />
              {aan && <circle cx={p.x} cy={p.y} r={15} fill={k.nodeActief} className={loopt ? 'sn-halo' : 'sn-halo-stil'} />}
              <circle
                cx={p.x}
                cy={p.y}
                r={gekozen === p.id ? 9 : 7.5}
                fill={aan ? k.nodeActief : k.node}
                stroke={aan ? k.nodeActief : k.nodeRand}
                strokeWidth={1.5}
                opacity={stil ? 0.45 : 1}
                className="sn-overgang sn-stip"
              />
              <text
                x={tx}
                y={ty}
                textAnchor={links ? 'end' : 'middle'}
                fontSize={14}
                fontWeight={aan ? 650 : 500}
                fill={stil ? k.tekstStil : k.tekst}
                className="sn-overgang select-none font-sans"
              >
                {p.label}
              </text>
            </g>
          )
        })}

        {/* Signaal */}
        <g className="sn-overgang" opacity={signaalAan ? 1 : 0} aria-hidden={!signaalAan}>
          <circle cx={SIGNAAL_POS.x} cy={SIGNAAL_POS.y} r={9} fill={k.nodeActief} className={signaalAan && loopt ? 'sn-puls' : ''} />
          <circle cx={SIGNAAL_POS.x} cy={SIGNAAL_POS.y} r={5} fill={k.node} />
          <text
            x={SIGNAAL_POS.x}
            y={SIGNAAL_POS.y - 20}
            textAnchor="middle"
            fontSize={12.5}
            fontWeight={650}
            fill={k.lijnActief}
            className="select-none font-sans uppercase"
            letterSpacing="0.08em"
          >
            Signaal
          </text>
          {signaal && (
            <text
              x={SIGNAAL_POS.x}
              y={SIGNAAL_POS.y + 32}
              textAnchor="middle"
              fontSize={12.5}
              fill={k.tekst}
              className="select-none font-sans"
            >
              {signaal}
            </text>
          )}
        </g>

        {/* Brein */}
        <KernNode
          x={MIDDEN.x}
          y={MIDDEN.y}
          r={30}
          node={BREIN}
          aan={breinAan}
          loopt={loopt}
          kleur={k}
          gekozen={gekozen === 'brein'}
          onKies={() => kies('brein')}
          tekstOnder
        />

        {/* Advisor */}
        <KernNode
          x={ADVISOR_POS.x}
          y={ADVISOR_POS.y}
          r={24}
          node={ADVISOR}
          aan={advisorAan}
          loopt={loopt}
          kleur={k}
          gekozen={gekozen === 'advisor'}
          onKies={() => kies('advisor')}
          tekstOnder
        />
      </svg>

      {/* ── Mobiel: een route van boven naar beneden ── */}
      <div className="md:hidden">
        <ul className="m-0 flex list-none flex-wrap gap-1.5 p-0">
          {BRONNEN.map((b) => {
            const aan = isActief(b.id)
            const stil = isStil(b.id)
            return (
              <li key={b.id}>
                <button
                  type="button"
                  onClick={() => kies(b.id)}
                  aria-pressed={gekozen === b.id}
                  className={[
                    'sn-overgang flex items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-left text-[13.5px] font-medium',
                    aan
                      ? 'border-[#1D63D8] bg-[#1D63D8] text-white'
                      : thema === 'donker'
                        ? 'border-white/20 text-white/85'
                        : 'border-border bg-white text-primary',
                    stil ? 'opacity-70' : '',
                  ].join(' ')}
                >
                  <span
                    aria-hidden="true"
                    className={`inline-block h-2 w-2 shrink-0 rounded-full ${aan ? 'bg-white' : 'bg-accent/60'}`}
                  />
                  {b.label}
                </button>
              </li>
            )
          })}
          {[BREIN, ADVISOR].map((n) => (
            <li key={n.id}>
              <button
                type="button"
                onClick={() => kies(n.id)}
                aria-pressed={gekozen === n.id}
                className={`sn-overgang flex items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-[13.5px] font-semibold ${
                  thema === 'donker' ? 'border-white/40 bg-white text-primary' : 'border-primary bg-primary text-white'
                }`}
              >
                {n.label}
              </button>
            </li>
          ))}
        </ul>
        {mobielRoute && (
        <svg viewBox="0 0 320 190" className="mx-auto mt-2 block h-auto w-full max-w-[340px]" aria-hidden="true">
          {[30, 95, 160, 225, 290].map((x, i) => (
            <line
              key={x}
              x1={x}
              y1={0}
              x2={160}
              y2={44}
              stroke={bezig ? k.lijnActief : k.lijn}
              strokeOpacity={bezig ? 0.7 : 1}
              strokeWidth={1.2}
              className="sn-overgang"
              style={{ transitionDelay: `${i * 60}ms` }}
            />
          ))}
          <line x1={160} y1={70} x2={160} y2={152} stroke={signaalAan ? k.lijnActief : k.lijn} strokeWidth={1.6} />
          <circle cx={160} cy={56} r={22} fill={k.kern} className={breinAan ? 'sn-puls-zacht' : ''} />
          <g transform="translate(160 56) scale(0.6) translate(-24 -24)" fill={k.kernTekst}>
            <rect x={6} y={7} width={30} height={14} rx={4} />
            <rect x={12} y={27} width={30} height={14} rx={4} />
          </g>
          <text x={190} y={60} fontSize={13} fontWeight={700} fill={k.tekst}>
            Stevin-brein
          </text>
          <g className="sn-overgang" opacity={signaalAan ? 1 : 0.3}>
            <circle cx={160} cy={110} r={6} fill={k.nodeActief} className={signaalAan ? 'sn-puls' : ''} />
            <text x={176} y={114} fontSize={12.5} fontWeight={650} fill={k.lijnActief}>
              {signaalAan && signaal ? signaal : 'Signaal'}
            </text>
          </g>
          <circle
            cx={160}
            cy={166}
            r={16}
            fill={advisorAan ? k.nodeActief : k.node}
            stroke={advisorAan ? k.nodeActief : k.nodeRand}
            strokeWidth={1.5}
            className="sn-overgang"
          />
          <text x={186} y={170} fontSize={13} fontWeight={700} fill={k.tekst}>
            Advisor
          </text>
        </svg>
        )}
      </div>

      {/* Uitleg bij de gekozen node; ook de toegankelijke beschrijving */}
      <figcaption
        id={uitlegId}
        aria-live="polite"
        className={`mt-3 min-h-[52px] rounded-xl border px-4 py-3 text-[14.5px] leading-snug ${k.kaart}`}
      >
        {gekozenNode ? (
          <>
            <strong className="font-semibold">{gekozenNode.label}.</strong>{' '}
            <span className={k.kaartSub}>{gekozenNode.uitleg}</span>
          </>
        ) : demo ? (
          <span className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <button
              type="button"
              onClick={speelAf}
              aria-disabled={demoFase !== null && demoFase !== 'advies'}
              className="rounded-full border border-[#1D63D8] bg-[#1D63D8]/10 px-3.5 py-1.5 text-[14px] font-semibold text-[#1D63D8] transition-colors hover:bg-[#1D63D8] hover:text-white"
            >
              {demo.vraag}
            </button>
            {demoFase === 'advies' ? (
              <span className={k.kaartSub}>
                {demo.uitleg}{' '}
                {demo.verderHref && (
                  <a href={demo.verderHref} className="font-semibold text-[#1D63D8] underline-offset-2 hover:underline">
                    Probeer het zelf
                  </a>
                )}
              </span>
            ) : (
              <span className={k.kaartSub}>Stel de vraag, of tik op een onderdeel.</span>
            )}
          </span>
        ) : (
          <span className={k.kaartSub}>Tik op een onderdeel om te zien wat Stevin ermee doet.</span>
        )}
      </figcaption>
    </figure>
  )
}

function KernNode({
  x,
  y,
  r,
  node,
  aan,
  loopt,
  kleur,
  gekozen,
  onKies,
  tekstOnder,
}: {
  x: number
  y: number
  r: number
  node: NetwerkNode
  aan: boolean
  loopt: boolean
  kleur: (typeof KLEUR)[NetwerkThema]
  gekozen: boolean
  onKies: () => void
  tekstOnder?: boolean
}) {
  const isBrein = node.id === 'brein'
  return (
    <g
      role="button"
      tabIndex={0}
      aria-label={`${node.label}: ${node.uitleg}`}
      aria-pressed={gekozen}
      onClick={onKies}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onKies()
        }
      }}
      className="sn-node cursor-pointer outline-none"
    >
      {aan && <circle cx={x} cy={y} r={r + 14} fill={kleur.nodeActief} className={loopt ? 'sn-halo' : 'sn-halo-stil'} />}
      <circle
        cx={x}
        cy={y}
        r={r}
        fill={isBrein ? kleur.kern : aan ? kleur.nodeActief : kleur.node}
        stroke={isBrein ? (aan ? kleur.nodeActief : 'transparent') : aan ? kleur.nodeActief : kleur.nodeRand}
        strokeWidth={isBrein ? 3 : 1.5}
        className="sn-overgang sn-stip"
      />
      {isBrein && (
        // Het Stevin-icoon uit public/logos/logo-icon.svg (48x48).
        <g transform={`translate(${x} ${y}) scale(0.82) translate(-24 -24)`} fill={kleur.kernTekst}>
          <rect x={6} y={7} width={30} height={14} rx={4} />
          <rect x={12} y={27} width={30} height={14} rx={4} />
        </g>
      )}
      {tekstOnder && (
        <text
          x={x}
          y={y + r + 22}
          textAnchor="middle"
          fontSize={14}
          fontWeight={700}
          fill={kleur.tekst}
          className="select-none font-sans"
        >
          {node.label}
        </text>
      )}
    </g>
  )
}
