interface StepCardProps {
  number: number
  title: string
  description: string
}

export default function StepCard({ number, title, description }: StepCardProps) {
  return (
    <div className="relative">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center text-sm font-bold">
          {number}
        </div>
        <div>
          <h3 className="text-lg font-bold text-primary">{title}</h3>
          <p className="mt-2 text-sm text-muted leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  )
}
