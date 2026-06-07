'use client'

import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react'
import type { Template } from '@/data/templates'

export default function TemplateSlider({ items, viewLabel }: { items: Template[]; viewLabel: string }) {
  const [active, setActive] = useState(0)
  const [loaded, setLoaded] = useState<Set<number>>(new Set([0]))
  const [paused, setPaused] = useState(false)
  const timer = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    setLoaded((s) => (s.has(active) ? s : new Set(s).add(active)))
  }, [active])

  useEffect(() => {
    if (paused) return
    timer.current = setInterval(() => setActive((a) => (a + 1) % items.length), 6000)
    return () => { if (timer.current) clearInterval(timer.current) }
  }, [paused, items.length])

  const go = (d: number) => setActive((a) => (a + d + items.length) % items.length)
  const cur = items[active]
  const domain = cur.url.replace(/^https?:\/\//, '')

  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      {/* Browser mockup */}
      <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-[0_30px_80px_-30px_rgba(13,22,40,0.35)]">
        {/* chrome bar */}
        <div className="flex items-center gap-3 border-b border-border bg-surface px-4 py-3">
          <div className="flex gap-2">
            <span className="h-3 w-3 rounded-full bg-[#e2ddd3]" />
            <span className="h-3 w-3 rounded-full bg-[#e2ddd3]" />
            <span className="h-3 w-3 rounded-full bg-[#e2ddd3]" />
          </div>
          <div className="mx-auto flex max-w-[60%] items-center gap-2 truncate rounded-md bg-white px-3 py-1 text-[12px] text-muted ring-1 ring-border">
            <span className="h-1.5 w-1.5 rounded-full bg-[#00D4A0]" /> {domain}
          </div>
          <a href={cur.url} target="_blank" rel="noopener" className="text-muted transition-colors hover:text-primary" aria-label={`${cur.name} openen`}>
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
        {/* viewport */}
        <div className="relative h-[420px] bg-white md:h-[600px]">
          {items.map((it, i) => (
            <div key={it.url} className={`absolute inset-0 transition-opacity duration-700 ${i === active ? 'opacity-100' : 'pointer-events-none opacity-0'}`}>
              {loaded.has(i) ? (
                <iframe src={it.url} title={it.name} loading="lazy" className="h-full w-full border-0" />
              ) : null}
            </div>
          ))}
        </div>
      </div>

      {/* caption + controls */}
      <div className="mt-6 flex items-center justify-between gap-4">
        <div>
          <p className="font-display text-[18px] font-bold text-primary leading-tight">{cur.name}</p>
          <p className="text-[14px] text-muted">{cur.type}</p>
        </div>
        <div className="flex items-center gap-3">
          <a href={cur.url} target="_blank" rel="noopener" className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 text-[13px] font-semibold text-primary transition-colors hover:bg-surface">
            {viewLabel} <ExternalLink className="h-3.5 w-3.5" />
          </a>
          <button type="button" onClick={() => go(-1)} aria-label="Vorige" className="grid h-10 w-10 place-items-center rounded-lg border border-border text-primary transition-colors hover:bg-surface">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button type="button" onClick={() => go(1)} aria-label="Volgende" className="grid h-10 w-10 place-items-center rounded-lg border border-border text-primary transition-colors hover:bg-surface">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* dots */}
      <div className="mt-5 flex items-center gap-2">
        {items.map((it, i) => (
          <button key={it.url} type="button" onClick={() => setActive(i)} aria-label={`Ga naar ${it.name}`} className="h-1.5 rounded-full transition-all" style={{ width: i === active ? 28 : 8, backgroundColor: i === active ? '#0D1628' : '#d8d2c6' }} />
        ))}
      </div>
    </div>
  )
}
