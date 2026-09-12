import { getTranslations, setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { FileText, CalendarClock, Unlock, Check } from 'lucide-react'
import { localizedMetadata } from '@/lib/seo'
import Section from '@/components/Section'
import ContactForm from '@/components/ContactForm'

// Herschreven 13 sep 2026 (W-078). Was "Plan een gesprek" met een lijst over
// agents, systemen koppelen en sparren over AI. Dat sprak de rest van de site
// tegen (op /platform en /controle staat juist dat het systeem niets overneemt)
// en het beloofde een afspraak terwijl elke knop op de site een diagnose belooft.
// Aanleiding: in 7 van de 12 uitgelezen verkoopgesprekken vraagt de klant
// letterlijk om het op de mail, omdat degene die beslist niet aan tafel zit
// (Bova 26 aug 00:01:54, Boersma 10 jul 00:27:32, Schepers 9 sep 55:34,
// LEECO 3 sep 00:02:12, Panman 18 aug 00:38:54, Euro-Serre 10 sep 00:07:43).
// Daarom eindigt deze pagina in een document, niet in een agenda.

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'contact' })
  return localizedMetadata({
    path: '/contact',
    locale,
    title: locale === 'en' ? 'Request the diagnosis · Stevin' : 'Vraag de diagnose aan · Stevin',
    description: t('desc'),
  })
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('contact')

  const feiten = [
    { icon: FileText, label: t('f1_label'), value: t('f1_value') },
    { icon: CalendarClock, label: t('f2_label'), value: t('f2_value') },
    { icon: Unlock, label: t('f3_label'), value: t('f3_value') },
  ]

  const checks = [t('check1'), t('check2'), t('check3'), t('check4'), t('check5'), t('check6')]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Stevin.AI',
    url: 'https://stevin.ai',
    areaServed: { '@type': 'Country', name: 'Netherlands' },
    contactPoint: { '@type': 'ContactPoint', contactType: 'sales', availableLanguage: 'Dutch' },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-16">
          {/* Links: wat je krijgt */}
          <div>
            <h1 className="h-hero text-primary">{t('title')}</h1>
            <p className="mt-6 text-lg text-muted leading-relaxed max-w-[54ch]">{t('desc')}</p>

            {/* De drie dingen die een koper als eerste wil weten: wat krijg ik,
                wanneer, en waar zit ik aan vast. */}
            <div className="mt-10 space-y-6">
              {feiten.map((f) => {
                const Icoon = f.icon
                return (
                  <div key={f.label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-surface-alt flex items-center justify-center flex-shrink-0">
                      <Icoon size={19} strokeWidth={1.75} className="text-accent" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-primary">{f.label}</h3>
                      <p className="text-sm text-muted mt-1 leading-relaxed max-w-[46ch]">{f.value}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="mt-10 p-6 rounded-xl bg-surface border border-border">
              <h3 className="text-base font-bold text-primary mb-4">{t('checks_heading')}</h3>
              <ul className="space-y-3">
                {checks.map((c) => (
                  <li key={c} className="flex items-start gap-3 text-sm text-muted leading-relaxed">
                    <Check size={16} strokeWidth={2.25} className="text-accent flex-shrink-0 mt-[3px]" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Rechts: het formulier */}
          <div>
            <div className="lg:sticky lg:top-28">
              <h2 className="text-xl font-bold text-primary font-display">{t('form_heading')}</h2>
              <p className="mt-2 mb-6 text-sm text-muted leading-relaxed max-w-[42ch]">{t('form_note')}</p>
              <ContactForm
                subject="Diagnose-aanvraag"
                websiteField
                submitLabel={locale === 'en' ? 'Request the diagnosis' : 'Vraag de diagnose aan'}
                messageLabel={locale === 'en' ? 'Anything we should know?' : 'Iets dat we moeten weten?'}
                messagePlaceholder={
                  locale === 'en'
                    ? 'Optional. For example: who runs your ads today.'
                    : 'Bijvoorbeeld: wie doet nu je advertenties, of waar loop je tegenaan.'
                }
                doneTitle={locale === 'en' ? 'Request received' : 'Aanvraag binnen'}
                doneBody={
                  locale === 'en'
                    ? 'We start on your own numbers and send the report within two weeks. You will hear from us sooner if we need anything.'
                    : 'We beginnen op je eigen cijfers en sturen het rapport binnen twee weken. Hebben we iets nodig, dan hoor je het eerder.'
                }
              />
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}
