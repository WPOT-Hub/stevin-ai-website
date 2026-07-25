// Sobere scheidingslijn: een haarlijn, verder niets.
// Heette MeetlatRuler en tekende tick marks. Het meetlat-motief is uitgefaseerd
// (merkbeslissing 30 jun 2026, kernwoord "grip"); de naam volgde op 25 jul 2026.
interface RuleProps {
  color?: string
  className?: string
}

export default function HairlineRule({ color = 'currentColor', className = '' }: RuleProps) {
  return (
    <div className={`w-full ${className}`} aria-hidden="true">
      <div style={{ height: '1px', background: color, opacity: 0.4 }} />
    </div>
  )
}
