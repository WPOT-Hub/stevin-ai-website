'use client'

import type { CSSProperties } from 'react'

/**
 * Stevin Brain constellatie-visual.
 *
 * Sterrenbeeld-metafoor voor het marketing-brein: elke databron is een ster
 * (paid, owned, CRM, mail, markt-context), dunne constellatie-lijnen knopen ze
 * aan elkaar, en alles voedt het brein in het midden. Aan de rechterkant
 * stroomt het resultaat terug: signalen, briefings, acties.
 *
 * Volledig self-contained (eigen styles, geen dependencies), bedoeld voor een
 * navy (#0A1628) vlak. Pure CSS-animaties over rechte lijnen, dus
 * prefers-reduced-motion wordt netjes gerespecteerd.
 */

type Lang = 'nl' | 'en'

const LABELS: Record<Lang, Record<string, string>> = {
  nl: {
    email: 'E-mail',
    googleAds: 'Google Ads',
    meta: 'Meta',
    ga4: 'GA4',
    searchConsole: 'Search Console',
    crm: 'CRM',
    market: 'Markt en weer',
    signals: 'Signalen',
    briefings: 'Briefings',
    actions: 'Acties',
    brain: 'Stevin Brain',
    aria: 'Constellatie van databronnen die samen het Stevin Brain vormen: advertentieplatformen, analytics, mail en CRM stromen naar het brein, dat signalen, briefings en acties teruggeeft.',
  },
  en: {
    email: 'Email',
    googleAds: 'Google Ads',
    meta: 'Meta',
    ga4: 'GA4',
    searchConsole: 'Search Console',
    crm: 'CRM',
    market: 'Market and weather',
    signals: 'Signals',
    briefings: 'Briefings',
    actions: 'Actions',
    brain: 'Stevin Brain',
    aria: 'Constellation of data sources forming the Stevin Brain: ad platforms, analytics, email and CRM flow into the brain, which returns signals, briefings and actions.',
  },
}

const BRAIN = { x: 400, y: 260 }

// Bronnen links/boven/onder, bewust onregelmatig geplaatst (sterrenkaart).
// lx/ly/anchor sturen de label-positie per node.
type Node = { key: string; x: number; y: number; lx: number; ly: number; anchor: 'start' | 'middle' | 'end' }

const INPUTS: Node[] = [
  { key: 'email', x: 300, y: 52, lx: 300, ly: 34, anchor: 'middle' },
  { key: 'googleAds', x: 126, y: 96, lx: 126, ly: 78, anchor: 'middle' },
  { key: 'meta', x: 56, y: 232, lx: 56, ly: 214, anchor: 'middle' },
  { key: 'ga4', x: 94, y: 370, lx: 94, ly: 394, anchor: 'middle' },
  { key: 'searchConsole', x: 212, y: 460, lx: 212, ly: 486, anchor: 'middle' },
  { key: 'crm', x: 368, y: 490, lx: 368, ly: 514, anchor: 'middle' },
  { key: 'market', x: 512, y: 58, lx: 512, ly: 40, anchor: 'middle' },
]

const OUTPUTS: Node[] = [
  { key: 'signals', x: 648, y: 118, lx: 664, ly: 122, anchor: 'start' },
  { key: 'briefings', x: 696, y: 262, lx: 696, ly: 288, anchor: 'middle' },
  { key: 'actions', x: 642, y: 404, lx: 658, ly: 408, anchor: 'start' },
]

// Faint sterrenbeeld-lijnen tussen bronnen onderling (puur decoratief).
const CONSTELLATION_PAIRS: [string, string][] = [
  ['email', 'googleAds'],
  ['googleAds', 'meta'],
  ['meta', 'ga4'],
  ['ga4', 'searchConsole'],
  ['searchConsole', 'crm'],
  ['email', 'market'],
  ['signals', 'briefings'],
  ['briefings', 'actions'],
]

// Achtergrond-sterren, vaste posities zodat SSR en client identiek renderen.
const STARS: [number, number, number][] = [
  [40, 60, 1.4], [180, 24, 1.1], [420, 24, 1.3], [590, 40, 1.1], [724, 70, 1.5],
  [24, 150, 1.2], [216, 170, 1.0], [560, 150, 1.2], [736, 190, 1.1],
  [30, 320, 1.4], [170, 268, 1.1], [300, 330, 1.0], [520, 330, 1.2], [740, 330, 1.4],
  [60, 452, 1.1], [300, 430, 1.2], [470, 460, 1.4], [580, 470, 1.1], [700, 470, 1.3],
  [640, 220, 1.0], [480, 120, 1.0], [240, 380, 1.3], [140, 420, 1.0], [360, 140, 1.1],
]

function nodeByKey(key: string): Node {
  return [...INPUTS, ...OUTPUTS].find((n) => n.key === key)!
}

export default function BrainConstellation({ lang = 'nl' }: { lang?: Lang }) {
  const t = LABELS[lang]

  return (
    <div className="bc">
      <svg viewBox="0 0 760 520" role="img" aria-label={t.aria} className="bc-svg">
        <defs>
          <radialGradient id="bcGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#3D8EFF" stopOpacity="0.32" />
            <stop offset="55%" stopColor="#3D8EFF" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#3D8EFF" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Achtergrond-sterren */}
        {STARS.map(([x, y, r], i) => (
          <circle
            key={`s${i}`}
            className="bc-star"
            cx={x}
            cy={y}
            r={r}
            fill="#FFFFFF"
            style={{ animationDelay: `${(i % 7) * 0.55}s` }}
          />
        ))}

        {/* Sterrenbeeld-lijnen tussen nodes onderling */}
        {CONSTELLATION_PAIRS.map(([a, b]) => {
          const na = nodeByKey(a)
          const nb = nodeByKey(b)
          return (
            <line
              key={`${a}-${b}`}
              x1={na.x}
              y1={na.y}
              x2={nb.x}
              y2={nb.y}
              stroke="#FFFFFF"
              strokeOpacity="0.07"
              strokeWidth="1"
            />
          )
        })}

        {/* Lijnen bron naar brein */}
        {INPUTS.map((n) => (
          <line
            key={`li-${n.key}`}
            x1={n.x}
            y1={n.y}
            x2={BRAIN.x}
            y2={BRAIN.y}
            stroke="#FFFFFF"
            strokeOpacity="0.13"
            strokeWidth="1"
          />
        ))}

        {/* Lijnen brein naar output */}
        {OUTPUTS.map((n) => (
          <line
            key={`lo-${n.key}`}
            x1={BRAIN.x}
            y1={BRAIN.y}
            x2={n.x}
            y2={n.y}
            stroke="#5DA3FF"
            strokeOpacity="0.28"
            strokeWidth="1.2"
          />
        ))}

        {/* Pulsen: data die van bron naar brein reist */}
        {INPUTS.map((n, i) => (
          <circle
            key={`pi-${n.key}`}
            className="bc-pulse"
            cx={n.x}
            cy={n.y}
            r="2.4"
            fill="#5DA3FF"
            style={
              {
                '--dx': `${BRAIN.x - n.x}px`,
                '--dy': `${BRAIN.y - n.y}px`,
                animationDelay: `${i * 0.62}s`,
              } as CSSProperties
            }
          />
        ))}

        {/* Pulsen: resultaat dat van brein naar output reist */}
        {OUTPUTS.map((n, i) => (
          <circle
            key={`po-${n.key}`}
            className="bc-pulse bc-pulse-out"
            cx={BRAIN.x}
            cy={BRAIN.y}
            r="2.6"
            fill="#5DA3FF"
            style={
              {
                '--dx': `${n.x - BRAIN.x}px`,
                '--dy': `${n.y - BRAIN.y}px`,
                animationDelay: `${2.2 + i * 0.9}s`,
              } as CSSProperties
            }
          />
        ))}

        {/* Bron-nodes (witte sterren) */}
        {INPUTS.map((n) => (
          <g key={`n-${n.key}`}>
            <circle cx={n.x} cy={n.y} r="10" fill="#0A1628" />
            <circle cx={n.x} cy={n.y} r="9" fill="none" stroke="#FFFFFF" strokeOpacity="0.18" />
            <circle cx={n.x} cy={n.y} r="3.6" fill="#E9F1FF" />
            <text className="bc-lbl" x={n.lx} y={n.ly} textAnchor={n.anchor} fill="#FFFFFF" fillOpacity="0.55">
              {t[n.key].toUpperCase()}
            </text>
          </g>
        ))}

        {/* Output-nodes (accent) */}
        {OUTPUTS.map((n) => (
          <g key={`n-${n.key}`}>
            <circle cx={n.x} cy={n.y} r="11" fill="#0A1628" />
            <circle cx={n.x} cy={n.y} r="10" fill="none" stroke="#5DA3FF" strokeOpacity="0.35" />
            <circle cx={n.x} cy={n.y} r="4.2" fill="#5DA3FF" />
            <text className="bc-lbl bc-lbl-out" x={n.lx} y={n.ly} textAnchor={n.anchor} fill="#9CC5FF" fillOpacity="0.95">
              {t[n.key].toUpperCase()}
            </text>
          </g>
        ))}

        {/* Het brein */}
        <g>
          <circle cx={BRAIN.x} cy={BRAIN.y} r="86" fill="url(#bcGlow)" />
          <circle className="bc-ring" cx={BRAIN.x} cy={BRAIN.y} r="36" fill="none" stroke="#5DA3FF" strokeOpacity="0.45" strokeWidth="1" />
          <circle className="bc-ring bc-ring-2" cx={BRAIN.x} cy={BRAIN.y} r="36" fill="none" stroke="#5DA3FF" strokeOpacity="0.45" strokeWidth="1" />
          <circle cx={BRAIN.x} cy={BRAIN.y} r="36" fill="#0E1E38" stroke="#5DA3FF" strokeOpacity="0.55" strokeWidth="1.2" />
          {/* Stevin merk-teken (zelfde mark als elders op de site) */}
          <g transform={`translate(${BRAIN.x - 13}, ${BRAIN.y - 13}) scale(0.54)`} aria-hidden="true">
            <g fill="#3D8EFF">
              <rect x="6" y="7" width="30" height="14" rx="4" />
              <rect x="12" y="27" width="30" height="14" rx="4" />
            </g>
          </g>
          <text className="bc-lbl bc-lbl-brain" x={BRAIN.x} y={BRAIN.y + 62} textAnchor="middle" fill="#FFFFFF" fillOpacity="0.85">
            {t.brain.toUpperCase()}
          </text>
        </g>
      </svg>

      <style jsx>{`
        .bc {
          width: 100%;
          max-width: 640px;
          margin: 0 auto;
        }
        .bc-svg {
          display: block;
          width: 100%;
          height: auto;
        }
        .bc-lbl {
          font-family: ui-monospace, 'JetBrains Mono', 'SF Mono', Menlo, monospace;
          font-size: 11.5px;
          font-weight: 600;
          letter-spacing: 0.09em;
        }
        .bc-lbl-brain {
          font-size: 12.5px;
          letter-spacing: 0.14em;
        }
        .bc-star {
          opacity: 0.22;
          animation: bcTwinkle 3.4s ease-in-out infinite alternate;
        }
        .bc-pulse {
          opacity: 0;
          animation: bcTravel 4.4s cubic-bezier(0.45, 0.1, 0.4, 0.9) infinite;
        }
        .bc-pulse-out {
          animation-duration: 3.8s;
        }
        .bc-ring {
          transform-box: fill-box;
          transform-origin: center;
          animation: bcRing 3.6s ease-out infinite;
        }
        .bc-ring-2 {
          animation-delay: 1.8s;
        }
        @keyframes bcTwinkle {
          from {
            opacity: 0.1;
          }
          to {
            opacity: 0.55;
          }
        }
        @keyframes bcTravel {
          0% {
            transform: translate(0, 0);
            opacity: 0;
          }
          10% {
            opacity: 0.9;
          }
          62% {
            opacity: 0.9;
          }
          74% {
            transform: translate(var(--dx), var(--dy));
            opacity: 0;
          }
          100% {
            transform: translate(var(--dx), var(--dy));
            opacity: 0;
          }
        }
        @keyframes bcRing {
          0% {
            transform: scale(1);
            opacity: 0.5;
          }
          80% {
            transform: scale(2.05);
            opacity: 0;
          }
          100% {
            transform: scale(2.05);
            opacity: 0;
          }
        }
        /* Labels iets groter op klein scherm, anders onleesbaar na viewBox-scaling */
        @media (max-width: 640px) {
          .bc-lbl {
            font-size: 16px;
          }
          .bc-lbl-brain {
            font-size: 17px;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .bc-star {
            animation: none;
            opacity: 0.35;
          }
          .bc-pulse {
            animation: none;
            opacity: 0;
          }
          .bc-ring {
            animation: none;
            opacity: 0.25;
          }
        }
      `}</style>
    </div>
  )
}
