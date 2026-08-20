import type { CampaignAngleId } from './types'

export const CAMPAIGN_DOMAIN_TO_ANGLE = {
  'gripopjedata.com': 'markup-data-ownership',
  'trystevin.com': 'markup-data-ownership',
  'joinstevin.com': 'markup-data-ownership',
  'marketingineigenbeheer.com': 'marketing-in-eigen-beheer',
  'marketingbrein.com': 'marketing-brein',
  'stevinmarketingbrein.com': 'marketing-brein',
  'jouwmarketingbrein.com': 'marketing-brein',
  'uwmarketingbrein.com': 'marketing-brein',
  'jouwaibrein.com': 'ai-brein',
} as const satisfies Record<string, CampaignAngleId>

export type CampaignDomain = keyof typeof CAMPAIGN_DOMAIN_TO_ANGLE

export const CAMPAIGN_DOMAINS = Object.keys(
  CAMPAIGN_DOMAIN_TO_ANGLE,
) as CampaignDomain[]

export function isCampaignDomain(hostname: string): hostname is CampaignDomain {
  return Object.prototype.hasOwnProperty.call(CAMPAIGN_DOMAIN_TO_ANGLE, hostname)
}

export function getCampaignDomain(hostname: string): CampaignDomain | null {
  return isCampaignDomain(hostname) ? hostname : null
}

export function getCampaignAngleId(domain: CampaignDomain): CampaignAngleId {
  return CAMPAIGN_DOMAIN_TO_ANGLE[domain]
}

export function getCampaignCalNamespace(domain: CampaignDomain): string {
  return `campaign-${domain.replaceAll('.', '-')}`
}
