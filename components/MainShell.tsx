'use client'

// Top-padding compenseert de fixed Header (72px) op alle routes.
export default function MainShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex-1 pt-[72px]">
      {children}
    </main>
  )
}
