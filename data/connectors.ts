export interface Connector {
  name: string
  slug: string
  category: 'advertising' | 'analytics' | 'ecommerce' | 'email'
  description: string
}

export const nativeConnectors: Connector[] = [
  { name: 'Meta Ads', slug: 'meta', category: 'advertising', description: 'Facebook & Instagram campagnes, audiences en conversies' },
  { name: 'Google Ads', slug: 'google-ads', category: 'advertising', description: 'Search, Shopping, Display en YouTube campagnes' },
  { name: 'DV360', slug: 'dv360', category: 'advertising', description: 'Programmatic Display & Video via Google Marketing Platform' },
  { name: 'LinkedIn Ads', slug: 'linkedin', category: 'advertising', description: 'B2B advertenties, lead gen forms en account targeting' },
  { name: 'TikTok Ads', slug: 'tiktok', category: 'advertising', description: 'Short-form video advertising en Smart+ campagnes' },
  { name: 'Snapchat Ads', slug: 'snapchat', category: 'advertising', description: 'Story ads, AR lenses en audience targeting' },
  { name: 'X Ads', slug: 'x', category: 'advertising', description: 'Promoted posts, trends en follower campagnes' },
  { name: 'Pinterest Ads', slug: 'pinterest', category: 'advertising', description: 'Shopping pins, idea pins en interest targeting' },
  { name: 'GA4', slug: 'ga4', category: 'analytics', description: 'Event-based analytics, conversietracking en audiences' },
  { name: 'GTM', slug: 'gtm', category: 'analytics', description: 'Tag management, server-side tagging en consent mode' },
  { name: 'Shopify', slug: 'shopify', category: 'ecommerce', description: 'Productfeed, orders, omzet en klantdata synchronisatie' },
  { name: 'WooCommerce', slug: 'woocommerce', category: 'ecommerce', description: 'WordPress e-commerce data, orders en conversies' },
  { name: 'Klaviyo', slug: 'klaviyo', category: 'email', description: 'E-mail flows, segmentatie, open rates en revenue tracking' },
  { name: 'Mailchimp', slug: 'mailchimp', category: 'email', description: 'Campaigns, audiences, automation en engagement data' },
]

export const connectorCategories = {
  advertising: { label: 'Advertising', count: 8 },
  analytics: { label: 'Analytics & Tracking', count: 2 },
  ecommerce: { label: 'E-commerce', count: 2 },
  email: { label: 'E-mail & Automation', count: 2 },
}
