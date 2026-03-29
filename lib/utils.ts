import { integrations, type Integration } from '@/data/integrations'
import { categories, type Category } from '@/data/categories'

export function getIntegrationBySlug(slug: string): Integration | undefined {
  return integrations.find((i) => i.slug === slug)
}

export function getIntegrationsByCategory(categorySlug: string): Integration[] {
  return integrations.filter((i) => i.category === categorySlug)
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug)
}

export function getRelatedIntegrations(slugs: string[]): Integration[] {
  return slugs
    .map((slug) => integrations.find((i) => i.slug === slug))
    .filter((i): i is Integration => i !== undefined)
}

export function cn(...classes: (string | undefined | false)[]): string {
  return classes.filter(Boolean).join(' ')
}
