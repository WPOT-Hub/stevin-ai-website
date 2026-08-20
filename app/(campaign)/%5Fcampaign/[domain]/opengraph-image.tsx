import OpenGraphImage from '../../_campaign/[domain]/opengraph-image'

export const alt = 'Stevin.AI campagnescan'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

interface OpenGraphImageProps {
  params: Promise<{ domain: string }>
}

export default async function PublicOpenGraphImage(props: OpenGraphImageProps) {
  return OpenGraphImage(props)
}
