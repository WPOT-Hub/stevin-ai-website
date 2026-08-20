'use client'

import { useEffect } from 'react'
import { pushConversionEvent } from '@/lib/tracking'
import {
  getCampaignCalNamespace,
  type CampaignDomain,
} from '@/content/campaign-landings/domains'
import type {
  CalEventSlug,
  CampaignAngleId,
} from '@/content/campaign-landings/types'

type CalEvent = {
  detail?: {
    data?: {
      uid?: string
      startTime?: string
      status?: string
    }
  }
}

type CalNamespace = (
  instruction: string,
  options: {
    action: string
    callback: (event: CalEvent) => void
  },
) => void

declare global {
  interface Window {
    Cal?: {
      ns?: Record<string, CalNamespace>
    }
    stevinCampaignCalListeners?: Set<string>
    stevinCampaignLandingViews?: Set<string>
  }
}

interface CampaignTrackingProps {
  domain: CampaignDomain
  angle: CampaignAngleId
  eventSlug: CalEventSlug
}

export function CampaignTracking({
  domain,
  angle,
  eventSlug,
}: CampaignTrackingProps) {
  useEffect(() => {
    const namespace = getCampaignCalNamespace(domain)
    const trackingKey = `${domain}:${angle}:${eventSlug}`
    window.stevinCampaignLandingViews = window.stevinCampaignLandingViews ?? new Set()
    window.stevinCampaignCalListeners = window.stevinCampaignCalListeners ?? new Set()

    if (!window.stevinCampaignLandingViews.has(trackingKey)) {
      window.stevinCampaignLandingViews.add(trackingKey)
      window.dataLayer = window.dataLayer ?? []
      window.dataLayer.push({
        event: 'campaign_landing_view',
        campaign_domain: domain,
        campaign_angle: angle,
        event_slug: eventSlug,
      })
    }

    const trackedBookings = new Set<string>()
    let registered = window.stevinCampaignCalListeners.has(namespace)
    let attempts = 0
    let timer: number | undefined

    const registerBookingListener = () => {
      const calNamespace = window.Cal?.ns?.[namespace]
      if (!calNamespace || registered) return

      registered = true
      window.stevinCampaignCalListeners?.add(namespace)
      calNamespace('on', {
        action: 'bookingSuccessfulV2',
        callback: (calEvent) => {
          const booking = calEvent.detail?.data
          const bookingKey = booking?.uid ?? booking?.startTime ?? 'booking-without-id'
          if (trackedBookings.has(bookingKey)) return
          trackedBookings.add(bookingKey)

          // Handmatig in GTM: maak een Custom Event-trigger voor meeting_booked
          // en koppel die aan de gewenste GA4- en Google Ads-conversietags.
          void pushConversionEvent('meeting_booked', undefined, {
            campaign_domain: domain,
            campaign_angle: angle,
            event_slug: eventSlug,
            cal_booking_uid: booking?.uid,
            cal_booking_status: booking?.status,
          })
        },
      })

      if (timer !== undefined) window.clearInterval(timer)
    }

    registerBookingListener()
    if (!registered) {
      timer = window.setInterval(() => {
        attempts += 1
        registerBookingListener()
        if (attempts >= 240 && timer !== undefined) {
          window.clearInterval(timer)
        }
      }, 250)
    }

    return () => {
      if (timer !== undefined) window.clearInterval(timer)
    }
  }, [angle, domain, eventSlug])

  return null
}
