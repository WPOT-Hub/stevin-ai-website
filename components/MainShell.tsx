'use client'

import { usePathname } from 'next/navigation'

// Top-padding in root-layout compenseert de fixed Header.
// Editorial-routes (Simon Stevin) rendern zonder Header en hebben die padding niet nodig.
export default function MainShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isEditorial = pathname === '/simon-stevin'

  return (
    <main className={`flex-1 ${isEditorial ? '' : 'pt-[72px]'}`}>
      {children}
    </main>
  )
}
