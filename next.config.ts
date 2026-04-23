import type { NextConfig } from 'next'

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

export default nextConfig
