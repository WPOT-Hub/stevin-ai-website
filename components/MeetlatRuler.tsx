// Sobere scheidingslijn. De oude meetlat met tick marks is uitgefaseerd
// (merkbeslissing 30 jun 2026: kernwoord "grip", geen meetlat-motief meer).
// Naam blijft voorlopig MeetlatRuler zodat bestaande imports niet breken;
// hernoemen volgt in een latere opschoonronde.
interface RuleProps {
  color?: string
  className?: string
}

export default function MeetlatRuler({ color = 'currentColor', className = '' }: RuleProps) {
  return (
    <div className={`w-full ${className}`} aria-hidden="true">
      <div style={{ height: '1px', background: color, opacity: 0.4 }} />
    </div>
  )
}
