import Logo from '@/components/Logo'
import type { CampaignDomain } from '@/content/campaign-landings/domains'
import type { CampaignAngle } from '@/content/campaign-landings/types'
import { CalInline } from './CalInline'
import { CampaignTracking } from './CampaignTracking'

interface CampaignLandingProps {
  domain: CampaignDomain
  angle: CampaignAngle
}

export function CampaignLanding({ domain, angle }: CampaignLandingProps) {
  return (
    <main className="min-h-screen bg-surface px-5 py-7 sm:px-8 sm:py-10 lg:px-12">
      <CampaignTracking
        domain={domain}
        angle={angle.id}
        eventSlug={angle.eventSlug}
      />

      <div className="mx-auto max-w-[1180px]">
        <div className="mb-10 sm:mb-14">
          <Logo width={154} height={25} />
        </div>

        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.82fr)_minmax(540px,1.18fr)] lg:gap-14">
          <section className="pt-2 lg:sticky lg:top-12 lg:pt-8">
            <h1 className="max-w-[13ch] font-display text-[40px] font-extrabold leading-[1.04] tracking-[-0.035em] text-primary sm:text-[52px] lg:text-[60px]">
              {angle.headline}
            </h1>
            <p className="mt-7 max-w-[580px] text-[18px] leading-[1.65] text-muted sm:text-[20px]">
              {angle.subheadline}
            </p>

            <ul className="mt-9 max-w-[570px] space-y-4">
              {angle.bullets.map((bullet) => (
                <li
                  key={bullet}
                  className="flex gap-3 text-[16px] leading-[1.55] text-primary sm:text-[17px]"
                >
                  <span
                    className="mt-[9px] h-2 w-2 flex-none rounded-full bg-accent"
                    aria-hidden="true"
                  />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl border border-border bg-white p-3 shadow-lg shadow-primary/[0.06] sm:p-5">
            <h2 className="px-3 pb-2 pt-3 text-[22px] font-bold text-primary sm:px-5 sm:text-[26px]">
              {angle.ctaText}
            </h2>
            <CalInline
              domain={domain}
              angle={angle.id}
              eventSlug={angle.eventSlug}
            />
          </section>
        </div>

        <div className="mt-10 text-center lg:text-left">
          <a
            href="https://stevin.ai"
            className="text-xs text-muted underline decoration-border underline-offset-4 transition-colors hover:text-primary"
          >
            stevin.ai
          </a>
        </div>
      </div>
    </main>
  )
}
