"use client"

import { useEffect, useState } from 'react'

/**
 * Stevin Journal — reading-progress bar bovenaan article pages.
 * Match: Claude Design article.html .progress
 */
export default function ReadingProgress() {
  const [pct, setPct] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement
      const next = h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight)
      setPct(Math.max(0, Math.min(1, next)))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '3px',
        background: 'var(--accent)',
        zIndex: 60,
        width: `${pct * 100}%`,
        transition: 'width 80ms linear',
      }}
    />
  )
}
