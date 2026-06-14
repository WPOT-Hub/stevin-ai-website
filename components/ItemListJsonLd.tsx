// Herbruikbare ItemList voor index/hub-pagina's (blog, vergelijken, alternatief).
// Geeft LLMs een enumereerbare lijst van wat onder een hub hangt, zodat ze
// "welke X heeft Stevin" kunnen beantwoorden en de interne entity-graph sterker
// wordt. items.path is relatief vanaf de root (bijv. "/blog/mijn-slug").
interface ItemListJsonLdProps {
  items: { path: string; name: string }[]
  baseUrl?: string
}

export default function ItemListJsonLd({ items, baseUrl = 'https://stevin.ai' }: ItemListJsonLdProps) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${baseUrl}${it.path}`,
      name: it.name,
    })),
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
