'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function StickyMobileCTA() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past the hero (~600px)
      setVisible(window.scrollY > 600)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 lg:hidden transition-transform duration-300 ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="bg-white/95 backdrop-blur-md border-t border-border px-4 py-3 flex items-center justify-between gap-3">
        <p className="text-xs text-muted leading-tight">
          Vrijblijvend gesprek<br />
          <span className="font-semibold text-primary">Binnen 30 min inzicht</span>
        </p>
        <Link
          href="/contact"
          className="flex-shrink-0 inline-flex items-center px-5 py-2.5 text-sm font-bold text-[#0A1628] bg-neon rounded-lg hover:bg-neon-dark transition-all"
        >
          Plan een gesprek
        </Link>
      </div>
    </div>
  )
}
