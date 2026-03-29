interface ResultCardProps {
  icon: string
  text: string
}

export default function ResultCard({ icon, text }: ResultCardProps) {
  return (
    <div className="flex items-start gap-4 p-5 rounded-xl bg-white border border-border">
      <span className="text-xl flex-shrink-0">{icon}</span>
      <p className="text-sm font-medium text-primary leading-relaxed">{text}</p>
    </div>
  )
}
