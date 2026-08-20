export type CampaignAngleId =
  | 'markup-data-ownership'
  | 'marketing-in-eigen-beheer'
  | 'marketing-brein'
  | 'ai-brein'

export type CalEventSlug =
  | 'kennismaking'
  | 'marketing-scan'
  | 'sales-scan'
  | 'ai-scan'

export interface CampaignAngle {
  id: CampaignAngleId
  headline: string
  subheadline: string
  bullets: readonly [string, string, ...string[]]
  ctaText: string
  eventSlug: CalEventSlug
}
