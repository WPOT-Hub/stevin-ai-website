import type { CampaignAngle, CampaignAngleId } from './types'

export const CAMPAIGN_ANGLES = {
  'markup-data-ownership': {
    id: 'markup-data-ownership',
    headline: 'Wie betaalt jouw advertenties, en wie bezit de data?',
    subheadline:
      'Je factuur laat niet altijd zien welk bedrag echt naar Google of Meta gaat. En als accounts en data bij je bureau staan, betaal je ook met controle.',
    bullets: [
      'Zie welk deel van je factuur mediabudget is en welk deel opslag.',
      'Controleer of advertentieaccounts, tracking en historische data echt van jou zijn.',
      'Krijg drie concrete aandachtspunten uit je eigen situatie.',
    ],
    ctaText: 'Boek een scan van 15 minuten',
    eventSlug: 'marketing-scan',
  },
  'marketing-in-eigen-beheer': {
    id: 'marketing-in-eigen-beheer',
    headline: 'TODO: Marketing in eigen beheer',
    subheadline: 'TODO: Copy voor deze campagnehoek wordt nog uitgewerkt.',
    bullets: [
      'TODO: Eerste voordeel van marketing in eigen beheer.',
      'TODO: Tweede voordeel van marketing in eigen beheer.',
    ],
    ctaText: 'Boek een kennismaking',
    eventSlug: 'kennismaking',
  },
  'marketing-brein': {
    id: 'marketing-brein',
    headline: 'TODO: Jouw marketingbrein',
    subheadline: 'TODO: Copy voor deze campagnehoek wordt nog uitgewerkt.',
    bullets: [
      'TODO: Eerste voordeel van een marketingbrein.',
      'TODO: Tweede voordeel van een marketingbrein.',
    ],
    ctaText: 'Boek een sales-scan',
    eventSlug: 'sales-scan',
  },
  'ai-brein': {
    id: 'ai-brein',
    headline: 'TODO: Jouw AI-brein',
    subheadline: 'TODO: Copy voor deze campagnehoek wordt nog uitgewerkt.',
    bullets: [
      'TODO: Eerste voordeel van een AI-brein.',
      'TODO: Tweede voordeel van een AI-brein.',
    ],
    ctaText: 'Boek een AI-scan',
    eventSlug: 'ai-scan',
  },
} as const satisfies Record<CampaignAngleId, CampaignAngle>

export function getCampaignAngle(angleId: CampaignAngleId): CampaignAngle {
  return CAMPAIGN_ANGLES[angleId]
}
