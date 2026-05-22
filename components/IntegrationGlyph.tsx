interface IntegrationGlyphProps {
  size?: 'sm' | 'md'
}

export default function IntegrationGlyph({ size = 'md' }: IntegrationGlyphProps) {
  const shell = size === 'sm' ? 'h-8 w-8 rounded-[8px]' : 'h-14 w-14 rounded-[14px]'
  const bars = size === 'sm' ? 'h-4 w-1 rounded-full' : 'h-7 w-1.5 rounded-full'
  const middle = size === 'sm' ? 'h-5' : 'h-9'
  const short = size === 'sm' ? 'h-3' : 'h-5'

  return (
    <span className={`relative inline-flex items-center justify-center gap-1.5 border border-[#D9E0EB] bg-[#F7F8FA] ${shell}`}>
      <span className="absolute left-2 right-2 top-1/2 h-px bg-[#C5CEDB]" />
      <span className={`${bars} relative bg-[#0A1628]`} />
      <span className={`${bars} ${middle} relative bg-[#0A1628]`} />
      <span className={`${bars} ${short} relative bg-[#8A94A3]`} />
    </span>
  )
}
