'use client'

import { useState, useMemo } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { categories, categoryName } from '@/data/categories'
import { getVendorShortDescriptionEn } from '@/data/vendor-content-en'
import type { Integration } from '@/data/integrations'

interface IntegrationFilterProps {
  integrations: Integration[]
  locale: string
}

export default function IntegrationFilter({ integrations, locale }: IntegrationFilterProps) {
  const t = useTranslations('integraties')
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const labelForCategory = (slug: string) => {
    const category = categories.find((cat) => cat.slug === slug)
    return category ? categoryName(category, locale) : slug
  }

  // Op /en toonde deze kolom de Nederlandse regel uit data/integrations.ts.
  // Dat was het grootste deel van de tekst op de pagina, dus taalcoherentie
  // begint hier en niet bij de koppen.
  const readsLabel = (integration: Integration) =>
    locale === 'en'
      ? getVendorShortDescriptionEn(integration.slug, integration.shortDescription)
      : integration.shortDescription

  const filtered = useMemo(() => {
    return integrations.filter((i) => {
      const matchesSearch = search === '' || i.name.toLowerCase().includes(search.toLowerCase())
      const matchesCategory = !activeCategory || i.category === activeCategory
      return matchesSearch && matchesCategory
    })
  }, [integrations, search, activeCategory])

  return (
    <div className="overflow-hidden rounded-[14px] border border-[#D9E0EB] bg-white shadow-[0_18px_50px_rgba(10,22,40,0.08),0_2px_8px_rgba(10,22,40,0.04)]">
      {/* Search */}
      <div className="flex flex-col gap-5 border-b border-[#D9E0EB] px-5 py-5 sm:flex-row sm:items-end sm:justify-between sm:px-7 sm:py-6">
        <div>
          <h2 className="h-section leading-[1.05] tracking-[-0.035em] text-[#0A0A0A]">
            {t('filter_h2')}
          </h2>
          <p className="mt-2 max-w-xl text-[15px] leading-[1.55] text-[#6B7280]">
            {t('filter_sub')}
          </p>
        </div>
        <input
          type="text"
          placeholder={t('search_placeholder')}
          aria-label={t('search_placeholder')}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-11 w-full max-w-sm rounded-[10px] border border-[#D9E0EB] bg-[#F7F8FA] px-4 text-sm text-[#1F2933] placeholder:text-[#8A94A3] transition-colors focus:border-[#3C8EFF] focus:outline-none focus:ring-2 focus:ring-[#3C8EFF]/20"
        />
      </div>

      {/* Filter */}
      <div className="flex flex-col gap-3 border-b border-[#D9E0EB] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-7">
        <label className="flex flex-col gap-2 text-sm font-bold text-[#1F2933] sm:flex-row sm:items-center">
          {t('filter_layer_label')}
          <select
            value={activeCategory ?? ''}
            onChange={(event) => setActiveCategory(event.target.value || null)}
            className="h-10 min-w-64 rounded-[10px] border border-[#D9E0EB] bg-white px-3 text-sm font-bold text-[#1F2933] transition-colors focus:border-[#3C8EFF] focus:outline-none focus:ring-2 focus:ring-[#3C8EFF]/20"
          >
            <option value="">{t('filter_all_layers', { count: integrations.length })}</option>
            {categories.map((cat) => {
              const count = integrations.filter((i) => i.category === cat.slug).length
              if (count === 0) return null
              return (
                <option key={cat.slug} value={cat.slug}>
                  {categoryName(cat, locale)} ({count})
                </option>
              )
            })}
          </select>
        </label>
        <p className="text-sm font-bold text-[#8A94A3]">
          {t('filter_count', { count: filtered.length, total: integrations.length })}
        </p>
      </div>

      {/* Results */}
      {filtered.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[780px] border-collapse text-sm">
            <thead>
              <tr>
                <th className="border-b border-[#D9E0EB] px-5 py-4 text-left text-xs font-extrabold uppercase tracking-[0.1em] text-[#8A94A3] sm:px-7">
                  {t('filter_col_platform')}
                </th>
                <th className="border-b border-[#D9E0EB] px-5 py-4 text-left text-xs font-extrabold uppercase tracking-[0.1em] text-[#8A94A3]">
                  {t('filter_col_layer')}
                </th>
                <th className="border-b border-[#D9E0EB] px-5 py-4 text-left text-xs font-extrabold uppercase tracking-[0.1em] text-[#8A94A3]">
                  {t('filter_col_reads')}
                </th>
                <th className="border-b border-[#D9E0EB] px-5 py-4 text-left text-xs font-extrabold uppercase tracking-[0.1em] text-[#8A94A3] sm:px-7">
                  {t('filter_col_status')}
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((integration) => (
                <tr key={integration.slug} className="group">
                  <td className="border-b border-[#D9E0EB] px-5 py-5 align-top sm:px-7">
                    <Link
                      href={`/integraties/${integration.slug}`}
                      className="font-extrabold tracking-[-0.01em] text-[#0A0A0A] transition-colors group-hover:text-[#3C8EFF]"
                    >
                      {integration.name}
                    </Link>
                  </td>
                  <td className="border-b border-[#D9E0EB] px-5 py-5 align-top font-bold text-[#1F2933]">
                    {labelForCategory(integration.category)}
                  </td>
                  <td className="max-w-xl border-b border-[#D9E0EB] px-5 py-5 align-top leading-[1.45] text-[#6B7280]">
                    {readsLabel(integration)}
                  </td>
                  <td className="border-b border-[#D9E0EB] px-5 py-5 align-top sm:px-7">
                    <span className="inline-flex items-center gap-2 whitespace-nowrap font-bold text-[#1F2933]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#3C8EFF]" />
                      {t('filter_status')}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="px-7 py-12 text-center text-[#6B7280]">{t('filter_empty')}</p>
      )}

      <p className="border-t border-[#D9E0EB] px-7 py-4 text-center text-sm text-[#6B7280]">
        {t('filter_footer')}
      </p>
    </div>
  )
}
