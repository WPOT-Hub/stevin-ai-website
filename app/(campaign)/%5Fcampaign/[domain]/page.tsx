import CampaignPage, {
  generateMetadata as buildCampaignMetadata,
  generateStaticParams as buildCampaignStaticParams,
} from '../../_campaign/[domain]/page'

interface CampaignPageProps {
  params: Promise<{ domain: string }>
}

export function generateStaticParams() {
  return buildCampaignStaticParams()
}

export async function generateMetadata(props: CampaignPageProps) {
  return buildCampaignMetadata(props)
}

export default async function PublicCampaignPage(props: CampaignPageProps) {
  return CampaignPage(props)
}
