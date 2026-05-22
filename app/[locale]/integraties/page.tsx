import { getTranslations, setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { Link } from '@/i18n/navigation'
import IntegrationFilter from '@/components/IntegrationFilter'
import { integrations } from '@/data/integrations'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'integraties' })
  return {
    title: 'Integraties als meetlat onder je marketing',
    description: t('sub'),
  }
}

const stackLayers = [
  {
    num: '01',
    title: 'Campagnes',
    body: 'Spend, impressies, klikken en creatieve varianten uit Google, Meta, LinkedIn en TikTok.',
  },
  {
    num: '02',
    title: 'Tracking',
    body: 'Events, server-side tagging, consent en conversies die betrouwbaar genoeg zijn om op te sturen.',
  },
  {
    num: '03',
    title: 'CRM',
    body: 'Leads, afspraken, deals en opvolging. Hier verdwijnt vaak het verschil tussen claim en werkelijkheid.',
  },
  {
    num: '04',
    title: 'Omzet',
    body: 'Commerce, finance en ticketing laten zien wat er werkelijk binnenkomt, niet wat een platform claimt.',
  },
  {
    num: '05',
    title: 'Werk',
    body: 'Signalen worden taken, briefings, goedkeuringen of rapportage. Geen losse grafiek zonder eigenaar.',
  },
]

const proofRows = [
  {
    source: 'Google Ads + CRM',
    question: 'Welke campagnes leveren echte afspraken en deals op?',
    status: 'meetbaar',
  },
  {
    source: 'Meta + creatives',
    question: 'Welke beelden werken nog, en welke trekken alleen ruis?',
    status: 'signaal',
  },
  {
    source: 'GA4 + consent',
    question: 'Waar breekt de meting voordat rapportage het ziet?',
    status: 'controle',
  },
  {
    source: 'Shopify + finance',
    question: 'Wat is omzet, marge en herhaalaankoop na mediakosten?',
    status: 'bewijs',
  },
]

export default async function IntegratiesPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Integraties - Stevin.AI',
    description: 'Overzicht van alle tools en platforms die Stevin.AI koppelt en implementeert.',
    url: 'https://stevin.ai/integraties',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="relative overflow-hidden bg-[#0A1628] py-20 text-white sm:py-24 lg:py-28">
        <div className="pointer-events-none absolute -bottom-40 left-[36%] right-[-10%] h-64 bg-[radial-gradient(ellipse_at_center,rgba(61,142,255,0.18),transparent_64%)]" />
        <div className="relative mx-auto grid max-w-7xl items-end gap-12 px-4 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16 lg:px-8">
          <div>
            <p className="mb-7 inline-flex items-center gap-3 text-xs font-extrabold uppercase tracking-[0.12em] text-white/60 before:h-px before:w-7 before:bg-current">
              Integraties
            </p>
            <h1 className="max-w-4xl text-[clamp(3.25rem,7vw,6rem)] font-extrabold leading-[0.98] tracking-[-0.04em] text-white">
              Eerst koppelen. Dan pas meten.
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-[1.55] text-white/75 sm:text-xl">
              Stevin legt platform-cijfers naast CRM, commerce, finance en opvolging.
              Niet om een toollijst te tonen, maar om te bewijzen welke bron welk resultaat veroorzaakt.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#meetlat" className="inline-flex min-h-12 items-center justify-center rounded-[10px] bg-[#3C8EFF] px-5 text-sm font-extrabold text-white transition-colors hover:bg-[#2B7AEE]">
                Bekijk de meetlat
              </a>
              <a href="#koppelingen" className="inline-flex min-h-12 items-center justify-center rounded-[10px] border border-white/20 px-5 text-sm font-extrabold text-white transition-colors hover:bg-white/5">
                Zoek een koppeling
              </a>
            </div>
            <div className="relative mt-14 h-6 max-w-md text-white/45 before:absolute before:left-0 before:right-0 before:top-0 before:h-0.5 before:bg-current">
              {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((position) => (
                <span
                  key={position}
                  className={`absolute top-0 w-0.5 bg-current ${position === 0 || position === 50 || position === 100 ? 'h-4' : 'h-2'}`}
                  style={{ left: `${position}%` }}
                />
              ))}
            </div>
          </div>

          <div className="rounded-[14px] border border-white/15 bg-white/[0.055] p-6 backdrop-blur">
            <h2 className="mb-5 text-xl font-extrabold leading-[1.15] tracking-[-0.02em] text-white">
              Een werkende meting heeft meer nodig dan advertentiekanalen.
            </h2>
            {[
              ['Google Ads', 'spend', '82%'],
              ['GA4', 'events', '64%'],
              ['HubSpot', 'deals', '48%'],
              ['Exact', 'omzet', '58%'],
            ].map(([name, label, width], index) => (
              <div key={name} className={`grid min-h-11 grid-cols-[108px_1fr_auto] items-center gap-4 text-sm text-white/75 ${index > 0 ? 'border-t border-white/10' : ''}`}>
                <strong className="font-extrabold text-white">{name}</strong>
                <span className="relative h-0.5 bg-white/15">
                  <span className="absolute -inset-y-1 left-0 rounded-full bg-white" style={{ width }} />
                </span>
                <span className="text-xs font-extrabold text-[#5DA3FF]">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="meetlat" className="bg-[#F7F8FA] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-9 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-4 inline-flex items-center gap-3 text-xs font-extrabold uppercase tracking-[0.12em] text-[#3C8EFF] before:h-px before:w-7 before:bg-current">
                Meetlat onder je stack
              </p>
              <h2 className="max-w-3xl text-[clamp(2.125rem,4.2vw,3.625rem)] font-extrabold leading-[1.02] tracking-[-0.04em] text-[#0A0A0A]">
                Vijf lagen. Een werkelijkheid.
              </h2>
            </div>
            <p className="max-w-sm text-base leading-[1.55] text-[#6B7280]">
              Elke koppeling krijgt een plek in de keten. Zo wordt een klik pas interessant wanneer hij bij resultaat uitkomt.
            </p>
          </div>

          <div className="overflow-hidden rounded-[14px] border border-[#D9E0EB] bg-white shadow-[0_18px_50px_rgba(10,22,40,0.08),0_2px_8px_rgba(10,22,40,0.04)] lg:grid lg:grid-cols-5">
            {stackLayers.map((layer, index) => (
              <article key={layer.num} className={`relative p-6 ${index > 0 ? 'border-t border-[#D9E0EB] lg:border-l lg:border-t-0' : ''}`}>
                <div className="mb-14 text-[38px] font-extrabold leading-none tracking-[-0.04em] text-[#0A0A0A]">
                  {layer.num}
                </div>
                <div className="pointer-events-none absolute left-6 right-6 top-[78px] hidden h-0.5 bg-[#0A1628] lg:block" />
                <div className="pointer-events-none absolute left-6 top-[72px] hidden h-3.5 w-0.5 bg-[#0A1628] opacity-80 shadow-[42px_0_0_#0A1628,84px_0_0_#0A1628,126px_0_0_#0A1628] lg:block" />
                <h3 className="mb-3 text-xl font-extrabold leading-[1.08] tracking-[-0.02em] text-[#1F2933]">
                  {layer.title}
                </h3>
                <p className="m-0 text-sm leading-[1.52] text-[#6B7280]">
                  {layer.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="koppelingen" className="bg-[#F7F8FA] pb-16 sm:pb-20 lg:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 rounded-[14px] border border-[#D9E0EB] bg-white px-6 py-5 shadow-[0_10px_28px_rgba(10,22,40,0.05)]">
            <div className="grid gap-5 lg:grid-cols-[280px_1fr] lg:items-start">
              <div>
                <p className="mb-2 text-xs font-extrabold uppercase tracking-[0.12em] text-[#3C8EFF]">
                  Wat Stevin ermee doet
                </p>
                <p className="m-0 text-[15px] leading-[1.55] text-[#6B7280]">
                  Integraties bepalen welke vragen Stevin kan beantwoorden.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {proofRows.map((row) => (
                  <div key={row.source} className="border-l border-[#D9E0EB] pl-4">
                    <p className="m-0 text-sm font-extrabold tracking-[-0.01em] text-[#0A0A0A]">
                      {row.source}
                    </p>
                    <p className="mt-2 text-sm leading-[1.4] text-[#6B7280]">
                      {row.question}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <IntegrationFilter integrations={integrations} />
        </div>
      </section>

      <section className="bg-[#0A1628] py-16 text-white sm:py-20 lg:py-24">
        <div className="mx-auto grid max-w-7xl items-end gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_auto] lg:px-8">
          <div>
            <p className="mb-4 inline-flex items-center gap-3 text-xs font-extrabold uppercase tracking-[0.12em] text-[#3C8EFF] before:h-px before:w-7 before:bg-current">
              Ontbreekt er iets?
            </p>
            <h2 className="max-w-3xl text-[clamp(2.125rem,4.2vw,3.625rem)] font-extrabold leading-[1.02] tracking-[-0.04em] text-white">
              Als het een API heeft, kan het meestal in de meetlat.
            </h2>
            <p className="mt-5 max-w-xl text-[17px] leading-[1.55] text-white/65">
              We beginnen met de bronnen die je beslissingen raken: media, tracking, CRM, commerce en finance.
              De rest komt pas wanneer het iets bewijst.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex min-h-12 items-center justify-center rounded-[10px] bg-[#3C8EFF] px-5 text-sm font-extrabold text-white transition-colors hover:bg-[#2B7AEE]"
          >
            Bespreek je stack
          </Link>
        </div>
      </section>
    </>
  )
}
