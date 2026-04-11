export interface Connector {
  name: string
  slug: string
  category: 'advertising' | 'analytics' | 'ecommerce' | 'email' | 'streaming' | 'social' | 'live' | 'creator' | 'finance'
}

export const nativeConnectors: Connector[] = [
  // Advertising
  { name: 'Meta Ads', slug: 'meta', category: 'advertising' },
  { name: 'Google Ads', slug: 'google-ads', category: 'advertising' },
  { name: 'DV360', slug: 'dv360', category: 'advertising' },
  { name: 'LinkedIn Ads', slug: 'linkedin', category: 'advertising' },
  { name: 'TikTok Ads', slug: 'tiktok', category: 'advertising' },
  { name: 'Snapchat Ads', slug: 'snapchat', category: 'advertising' },
  { name: 'X Ads', slug: 'x', category: 'advertising' },
  { name: 'Pinterest Ads', slug: 'pinterest', category: 'advertising' },
  // Analytics
  { name: 'GA4', slug: 'ga4', category: 'analytics' },
  { name: 'GTM', slug: 'gtm', category: 'analytics' },
  // E-commerce
  { name: 'Shopify', slug: 'shopify', category: 'ecommerce' },
  { name: 'WooCommerce', slug: 'woocommerce', category: 'ecommerce' },
  // Email
  { name: 'Klaviyo', slug: 'klaviyo', category: 'email' },
  { name: 'Mailchimp', slug: 'mailchimp', category: 'email' },
  // Streaming & Audio
  { name: 'Spotify', slug: 'spotify', category: 'streaming' },
  { name: 'SoundCloud', slug: 'soundcloud', category: 'streaming' },
  // Social & Community
  { name: 'Instagram', slug: 'instagram', category: 'social' },
  { name: 'YouTube', slug: 'youtube', category: 'social' },
  { name: 'TikTok', slug: 'tiktok-organic', category: 'social' },
]

export const connectorCategories = {
  advertising: { label: 'Advertising', count: 8 },
  analytics: { label: 'Analytics & Tracking', count: 2 },
  ecommerce: { label: 'E-commerce', count: 2 },
  email: { label: 'E-mail & Automation', count: 2 },
  streaming: { label: 'Streaming & Audio', count: 2 },
  social: { label: 'Social & Community', count: 3 },
}
