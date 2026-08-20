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
    headline: 'Je marketing zelf draaien, zonder vanaf nul te beginnen.',
    subheadline:
      'De opzet kost de meeste tijd: accounts, tracking en rapportage goed neerzetten. Wij zetten dat neer op jouw naam, daarna draai je het zelf of laat je AI-agents het meeste werk doen.',
    bullets: [
      'De basis staat op jouw naam: accounts, tracking en rapportage.',
      'Daarna draai je het zelf, of je laat AI-agents het zware werk doen.',
      'Nooit meer een bureau nodig om te weten hoe je ervoor staat.',
    ],
    ctaText: 'Boek een kennismaking',
    eventSlug: 'kennismaking',
  },
  'marketing-brein': {
    id: 'marketing-brein',
    headline: 'Je cijfers staan verspreid, en niemand houdt het geheel bij.',
    subheadline:
      'Campagnes, kosten en resultaten leven in losse dashboards bij losse partijen. Een marketingbrein brengt ze samen in een laag die van jou blijft, zodat je in een oogopslag ziet wat werkt.',
    bullets: [
      'Je campagnes, cijfers en historie in een laag die van jou is.',
      'Zie wat werkt en wat geld kost, zonder in tien dashboards te zoeken.',
      'Advies dat meebeweegt met je eigen cijfers, niet met een standaardverhaal.',
    ],
    ctaText: 'Boek een sales-scan',
    eventSlug: 'sales-scan',
  },
  'ai-brein': {
    id: 'ai-brein',
    headline: 'AI in je marketing, zonder je data aan een blackbox te geven.',
    subheadline:
      'De meeste AI-tools draaien op een algemeen model en zien je data als voer. Dit werkt andersom: EU-gehoste AI bovenop jouw eigen cijfers, waarbij de data en de controle bij jou blijven.',
    bullets: [
      'EU-gehoste AI die op jouw eigen cijfers werkt, niet op een algemeen model.',
      'Van analyse naar concrete acties, elke week, op je eigen data.',
      'Je houdt de data en de controle, de AI doet het werk.',
    ],
    ctaText: 'Boek een AI-scan',
    eventSlug: 'ai-scan',
  },
} as const satisfies Record<CampaignAngleId, CampaignAngle>

export function getCampaignAngle(angleId: CampaignAngleId): CampaignAngle {
  return CAMPAIGN_ANGLES[angleId]
}
