import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./i18n/request.ts')

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/voor-artiesten',
        destination: '/artiesten',
        permanent: true,
      },
      {
        source: '/demo',
        destination: '/contact',
        permanent: false,
      },
      {
        source: '/alerts',
        destination: '/platform',
        permanent: false,
      },
    ]
  },
}

export default withNextIntl(nextConfig)
