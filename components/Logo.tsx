import Image from 'next/image'
import { cn } from '@/lib/utils'

type LogoVariant = 'primary' | 'dark' | 'light' | 'mono-white' | 'mono-dark'

interface LogoProps {
  variant?: LogoVariant
  className?: string
  width?: number
  height?: number
}

const logoFiles: Record<LogoVariant, string> = {
  primary: '/logos/logo-primary.svg',
  dark: '/logos/logo-dark.svg',
  light: '/logos/logo-light.svg',
  'mono-white': '/logos/logo-mono-white.svg',
  'mono-dark': '/logos/logo-mono-dark.svg',
}

export default function Logo({
  variant = 'primary',
  className,
  width = 160,
  height = 26,
}: LogoProps) {
  return (
    <Image
      src={logoFiles[variant]}
      alt="Stevin.AI"
      width={width}
      height={height}
      className={cn('h-auto', className)}
      priority
    />
  )
}
