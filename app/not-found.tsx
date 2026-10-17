import Link from 'next/link'

/**
 * De 404 van stevin.ai (W-560). Een los knooppunt zoekt zijn verbinding: twee
 * keer tast een lijn de leegte in, de derde keer haakt hij aan op het netwerk,
 * dezelfde nodes als in de hero. Daarna loopt er af en toe een signaal over de
 * nieuwe lijn.
 *
 * Puur SVG en CSS, geen script en geen library: een 404 moet licht laden. De
 * eindstand is de gewone stand van elk element; de animaties beginnen ergens
 * anders en lopen daar naartoe. Onder prefers-reduced-motion staan alle
 * animaties uit en zie je dus meteen het verbonden netwerk.
 *
 * Deze pagina draagt zijn eigen <html>/<body> (zie app/layout.tsx). Next zet er
 * zelf noindex op; de status blijft 404. De gesnoeide URL's (data/gone-urls.json)
 * komen hier niet: die krijgen een 410 uit middleware.ts.
 */

const ACCENT = '#3D8EFF'
const NAVY = '#0A1628'

// Het netwerk rechts, rond de hub op (420, 130). Vaste punten, zodat elke
// render hetzelfde beeld geeft.
const NODES: Array<[number, number, number]> = [
  [420, 130, 7],
  [488, 72, 4],
  [540, 126, 5],
  [498, 192, 4],
  [584, 64, 3],
  [596, 176, 4],
  [452, 226, 3],
  [372, 58, 3],
  [556, 236, 3],
  [624, 118, 3],
  [358, 196, 3],
]
const LIJNEN: Array<[number, number]> = [
  [0, 1], [0, 2], [0, 3], [1, 2], [1, 4], [2, 5], [3, 5], [3, 6], [0, 7], [5, 8], [2, 9], [0, 10], [4, 9],
]

const LOS: [number, number] = [96, 130]

const css = `
.nf-knop { transition: background-color .15s, border-color .15s, color .15s; }
.nf-knop:hover { background-color: #2f7af0; }
.nf-knop-rand:hover { border-color: rgba(255,255,255,.45); color: #fff; background-color: transparent; }
.nf-knop:focus-visible { outline: 2px solid ${ACCENT}; outline-offset: 3px; }

.nf-tast { opacity: 0; stroke-dasharray: 1; stroke-dashoffset: .35;
  animation: nf-tast 1.3s ease-out both; }
.nf-tast-2 { animation-delay: 1.5s; }
.nf-tast-1 { animation-delay: .3s; }
@keyframes nf-tast {
  0% { stroke-dashoffset: 1; opacity: .9; }
  55% { stroke-dashoffset: .35; opacity: .9; }
  100% { stroke-dashoffset: .35; opacity: 0; }
}

.nf-verbind { stroke-dasharray: 1; stroke-dashoffset: 0;
  animation: nf-verbind .8s 2.8s cubic-bezier(.3,.7,.2,1) both; }
@keyframes nf-verbind { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }

.nf-los { animation: nf-drijf 3.6s ease-in-out both; transform-box: fill-box; transform-origin: center; }
@keyframes nf-drijf {
  0%, 100% { transform: translateY(0); }
  25% { transform: translateY(-6px); }
  60% { transform: translateY(5px); }
}
.nf-los-kern { animation: nf-aan .4s 3.5s ease-out both; }
@keyframes nf-aan { from { fill-opacity: .35; } to { fill-opacity: 1; } }

.nf-ring { opacity: 0; transform-box: fill-box; transform-origin: center;
  animation: nf-ring 1.1s 3.55s ease-out both; }
@keyframes nf-ring {
  0% { opacity: .7; transform: scale(1); }
  100% { opacity: 0; transform: scale(3.2); }
}

.nf-node { animation: nf-licht .9s ease-out both; }
@keyframes nf-licht {
  0%, 100% { fill-opacity: .55; }
  40% { fill-opacity: 1; }
}

.nf-signaal { opacity: 0; animation: nf-signaal 2.8s 4.4s ease-in-out infinite; }
@keyframes nf-signaal {
  0% { transform: translateX(0); opacity: 0; }
  10% { opacity: 1; }
  45% { transform: translateX(${NODES[0][0] - LOS[0]}px); opacity: 1; }
  55%, 100% { transform: translateX(${NODES[0][0] - LOS[0]}px); opacity: 0; }
}

@media (prefers-reduced-motion: reduce) {
  .nf-tast, .nf-verbind, .nf-los, .nf-los-kern, .nf-ring, .nf-node, .nf-signaal { animation: none; }
}
`

export default function NotFound() {
  return (
    <html lang="nl">
      <head>
        <title>Pagina niet gevonden · Stevin.AI</title>
        <style dangerouslySetInnerHTML={{ __html: css }} />
      </head>
      <body
        style={{
          margin: 0,
          fontFamily: "'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif",
          backgroundColor: NAVY,
          backgroundImage: 'radial-gradient(ellipse 70% 55% at 65% 40%, rgba(61,142,255,0.14), transparent 70%)',
          color: '#ffffff',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <main style={{ width: '100%', maxWidth: '680px', padding: '48px 16px', textAlign: 'center', boxSizing: 'border-box' }}>
          <svg
            viewBox="0 0 680 260"
            role="img"
            aria-label="Een los knooppunt dat zijn verbinding met het netwerk zoekt en vindt"
            style={{ width: '100%', height: 'auto', display: 'block', margin: '0 auto 32px', overflow: 'visible' }}
          >
            {LIJNEN.map(([a, b], i) => (
              <line
                key={i}
                x1={NODES[a][0]}
                y1={NODES[a][1]}
                x2={NODES[b][0]}
                y2={NODES[b][1]}
                stroke={ACCENT}
                strokeOpacity={0.28}
                strokeWidth={1}
              />
            ))}

            {/* Twee keer tasten in de leegte, dan de verbinding. */}
            <line className="nf-tast nf-tast-1" pathLength={1} x1={LOS[0]} y1={LOS[1]} x2={250} y2={34} stroke={ACCENT} strokeWidth={1.5} strokeLinecap="round" />
            <line className="nf-tast nf-tast-2" pathLength={1} x1={LOS[0]} y1={LOS[1]} x2={262} y2={232} stroke={ACCENT} strokeWidth={1.5} strokeLinecap="round" />
            <line className="nf-verbind" pathLength={1} x1={LOS[0]} y1={LOS[1]} x2={NODES[0][0]} y2={NODES[0][1]} stroke={ACCENT} strokeOpacity={0.8} strokeWidth={1.5} strokeLinecap="round" />

            {NODES.map(([x, y, r], i) => (
              <circle
                key={i}
                className="nf-node"
                style={{ animationDelay: `${3.6 + Math.hypot(x - NODES[0][0], y - NODES[0][1]) / 260}s` }}
                cx={x}
                cy={y}
                r={r}
                fill={ACCENT}
                fillOpacity={0.55}
              />
            ))}
            <circle className="nf-ring" cx={NODES[0][0]} cy={NODES[0][1]} r={NODES[0][2]} fill="none" stroke={ACCENT} strokeWidth={1.5} />

            <circle className="nf-signaal" cx={LOS[0]} cy={LOS[1]} r={3} fill="#ffffff" />

            <g className="nf-los">
              <circle cx={LOS[0]} cy={LOS[1]} r={16} fill={ACCENT} fillOpacity={0.12} />
              <circle className="nf-los-kern" cx={LOS[0]} cy={LOS[1]} r={7} fill={ACCENT} fillOpacity={1} />
            </g>
          </svg>

          <p
            style={{
              fontSize: '13px',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: ACCENT,
              margin: '0 0 16px',
            }}
          >
            404
          </p>
          <h1
            style={{
              fontSize: 'clamp(32px, 6vw, 52px)',
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: '-0.03em',
              margin: '0 0 16px',
            }}
          >
            Hier loopt het spoor dood.
          </h1>
          <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.62)', lineHeight: 1.6, margin: '0 auto 36px', maxWidth: '440px' }}>
            Deze pagina bestaat niet meer, of de link klopt niet. Kies hieronder waar je heen wilt.
          </p>
          <nav aria-label="Verder naar" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px' }}>
            <Link
              href="/"
              className="nf-knop"
              style={{
                padding: '12px 24px',
                backgroundColor: ACCENT,
                color: '#ffffff',
                fontSize: '14px',
                fontWeight: 600,
                borderRadius: '12px',
                textDecoration: 'none',
              }}
            >
              Naar de homepage
            </Link>
            <Link
              href="/platform"
              className="nf-knop nf-knop-rand"
              style={{
                padding: '12px 24px',
                border: '1px solid rgba(255,255,255,0.22)',
                color: 'rgba(255,255,255,0.82)',
                fontSize: '14px',
                fontWeight: 600,
                borderRadius: '12px',
                textDecoration: 'none',
              }}
            >
              Zo werkt Stevin
            </Link>
            <Link
              href="/kennismaking"
              className="nf-knop nf-knop-rand"
              style={{
                padding: '12px 24px',
                border: '1px solid rgba(255,255,255,0.22)',
                color: 'rgba(255,255,255,0.82)',
                fontSize: '14px',
                fontWeight: 600,
                borderRadius: '12px',
                textDecoration: 'none',
              }}
            >
              Plan een kennismaking
            </Link>
          </nav>
        </main>
      </body>
    </html>
  )
}
