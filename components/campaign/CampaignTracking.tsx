'use client'

import { useEffect } from 'react'
import { pushDataLayerEvent } from '@/lib/datalayer'
import type { CampaignDomain } from '@/content/campaign-landings/domains'
import type {
  CalEventSlug,
  CampaignAngleId,
} from '@/content/campaign-landings/types'

declare global {
  interface Window {
    stevinCampaignLandingViews?: Set<string>
  }
}

interface CampaignTrackingProps {
  domain: CampaignDomain
  angle: CampaignAngleId
  eventSlug: CalEventSlug
}

/**
 * Meet een keer per paginabezoek campaign_landing_view, met domein en
 * invalshoek. Tot 17 okt 2026 luisterde dit ook naar boekingen in de
 * Cal.com-agenda op de pagina. Die agenda is weg: boeken gaat op
 * stevin.ai/kennismaking met de eigen engine, en het kennismakingsvenster
 * meldt meeting_booked zelf. De utm's op die link (utm_campaign = domein,
 * utm_content = invalshoek) houden de herkomst vast.
 */
export function CampaignTracking({
  domain,
  angle,
  eventSlug,
}: CampaignTrackingProps) {
  useEffect(() => {
    const trackingKey = `${domain}:${angle}:${eventSlug}`
    window.stevinCampaignLandingViews = window.stevinCampaignLandingViews ?? new Set()
    if (window.stevinCampaignLandingViews.has(trackingKey)) return
    window.stevinCampaignLandingViews.add(trackingKey)
    pushDataLayerEvent('campaign_landing_view', {
      campaign_domain: domain,
      campaign_angle: angle,
      event_slug: eventSlug,
    })
  }, [domain, angle, eventSlug])

  return null
}
