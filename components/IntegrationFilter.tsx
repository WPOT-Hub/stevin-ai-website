'use client'

import { useState, useMemo } from 'react'
import { categories } from '@/data/categories'
import type { Integration } from '@/data/integrations'
import IntegrationGrid from './IntegrationGrid'

interface IntegrationFilterProps {
  integrations: Integration[]
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
    <div>
      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Zoek een integratie..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md px-4 py-3 border border-border rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors"
        />
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setActiveCategory(null)}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
            !activeCategory
              ? 'bg-accent text-white'
              : 'bg-surface-alt text-muted hover:text-primary border border-border'
          }`}
        >
          Alles
        </button>
        {categories.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => setActiveCategory(activeCategory === cat.slug ? null : cat.slug)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              activeCategory === cat.slug
                ? 'bg-accent text-white'
                : 'bg-surface-alt text-muted hover:text-primary border border-border'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Results */}
      {filtered.length > 0 ? (
        <IntegrationGrid integrations={filtered} showCategory={!activeCategory} />
      ) : (
        <p className="text-center text-muted py-12">Geen integraties gevonden voor deze zoekopdracht.</p>
      )}

      <p className="text-center text-sm text-muted mt-6">
        {filtered.length} van {integrations.length} integraties
      </p>
    </div>
  )
}
