'use client'

import { useState, useEffect } from 'react'
import { Link } from '@/i18n/navigation'

// W-078, 13 sep 2026: deze balk stond hard in het Nederlands, ook op /en. Drie
// Nederlandse zinnen op de Engelse pagina, precies op het scherm waar die knop
// het meeste doet. De vertalingen bestonden al elders, ze werden hier alleen
// niet gebruikt.
const COPY = {
  nl: {
    micro: 'Eerst de diagnose, dan een voorstel',
    titel: 'Zwart op wit waar je staat',
    knop: 'Start de diagnose',
  },
  en: {
    micro: 'First the diagnosis, then a proposal',
    titel: 'Where you actually stand, in black and white',
    knop: 'Start the diagnosis',
  },
} as const

export default function StickyMobileCTA({ locale }: { locale?: string }) {
  const c = COPY[locale === 'en' ? 'en' : 'nl']
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
          {c.micro}<br />
          <span className="font-semibold text-primary">{c.titel}</span>
        </p>
        <Link
          href="/contact"
          className="flex-shrink-0 inline-flex items-center px-5 py-2.5 text-sm font-bold text-[#0A1628] bg-[#5DA3FF] rounded-lg hover:bg-[#7BB8FF] transition-all"
        >
          {c.knop}
        </Link>
      </div>
    </div>
  )
}
