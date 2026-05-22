'use client'

import { useState, useMemo } from 'react'
import { Link } from '@/i18n/navigation'
import { categories } from '@/data/categories'
import type { Integration } from '@/data/integrations'

interface IntegrationFilterProps {
  integrations: Integration[]
}

function categoryName(slug: string) {
  return categories.find((cat) => cat.slug === slug)?.name ?? slug
}

export default function IntegrationFilter({ integrations }: IntegrationFilterProps) {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

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
          <h2 className="text-3xl font-extrabold leading-[1.05] tracking-[-0.035em] text-[#0A0A0A] sm:text-4xl">
            Koppelingen
          </h2>
          <p className="mt-2 max-w-xl text-[15px] leading-[1.55] text-[#6B7280]">
            245+ bronnen, getoond als beheerlaag in plaats van tegelmuur.
          </p>
        </div>
        <input
          type="text"
          placeholder="Zoek een integratie..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-11 w-full max-w-sm rounded-[10px] border border-[#D9E0EB] bg-[#F7F8FA] px-4 text-sm text-[#1F2933] placeholder:text-[#8A94A3] transition-colors focus:border-[#3C8EFF] focus:outline-none focus:ring-2 focus:ring-[#3C8EFF]/20"
        />
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2 border-b border-[#D9E0EB] px-5 py-4 sm:px-7">
        <button
          onClick={() => setActiveCategory(null)}
          className={`rounded-full border px-3 py-2 text-sm font-bold transition-colors ${
            !activeCategory
              ? 'border-[#3C8EFF]/35 bg-[#EAF3FF] text-[#3C8EFF]'
              : 'border-[#D9E0EB] bg-white text-[#6B7280] hover:text-[#1F2933]'
          }`}
        >
          Alles ({integrations.length})
        </button>
        {categories.map((cat) => {
          const count = integrations.filter((i) => i.category === cat.slug).length
          if (count === 0) return null
          return (
            <button
              key={cat.slug}
              onClick={() => setActiveCategory(activeCategory === cat.slug ? null : cat.slug)}
              className={`rounded-full border px-3 py-2 text-sm font-bold transition-colors ${
                activeCategory === cat.slug
                  ? 'border-[#3C8EFF]/35 bg-[#EAF3FF] text-[#3C8EFF]'
                  : 'border-[#D9E0EB] bg-white text-[#6B7280] hover:text-[#1F2933]'
              }`}
            >
              {cat.name} ({count})
            </button>
          )
        })}
      </div>

      {/* Results */}
      {filtered.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[780px] border-collapse text-sm">
            <thead>
              <tr>
                <th className="border-b border-[#D9E0EB] px-5 py-4 text-left text-xs font-extrabold uppercase tracking-[0.1em] text-[#8A94A3] sm:px-7">
                  Platform
                </th>
                <th className="border-b border-[#D9E0EB] px-5 py-4 text-left text-xs font-extrabold uppercase tracking-[0.1em] text-[#8A94A3]">
                  Laag
                </th>
                <th className="border-b border-[#D9E0EB] px-5 py-4 text-left text-xs font-extrabold uppercase tracking-[0.1em] text-[#8A94A3]">
                  Wat Stevin leest
                </th>
                <th className="border-b border-[#D9E0EB] px-5 py-4 text-left text-xs font-extrabold uppercase tracking-[0.1em] text-[#8A94A3] sm:px-7">
                  Status
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
                    {categoryName(integration.category)}
                  </td>
                  <td className="max-w-xl border-b border-[#D9E0EB] px-5 py-5 align-top leading-[1.45] text-[#6B7280]">
                    {integration.shortDescription}
                  </td>
                  <td className="border-b border-[#D9E0EB] px-5 py-5 align-top sm:px-7">
                    <span className="inline-flex items-center gap-2 whitespace-nowrap font-bold text-[#1F2933]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#3C8EFF]" />
                      Koppelbaar
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="px-7 py-12 text-center text-[#6B7280]">Geen integraties gevonden voor deze zoekopdracht.</p>
      )}

      <p className="border-t border-[#D9E0EB] px-7 py-4 text-center text-sm text-[#6B7280]">
        {filtered.length} van {integrations.length} integraties
      </p>
    </div>
  )
}
