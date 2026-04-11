import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/voor-artiesten',
        destination: '/artiesten',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
