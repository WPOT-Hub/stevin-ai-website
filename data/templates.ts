// Demo-templates uit de Stevin website-factory (stevin-sites). Live op *.stevin.ai.
// adiklus staat er bewust NIET in: dat is een echte prospect, geen template.

export type Template = {
  name: string
  type: string
  url: string
  tier?: 'flagship' | 'webshop'
  featured?: boolean
}

export const TEMPLATES: Template[] = [
  { name: 'Brooklyn', type: 'Creatief marketingbureau', url: 'https://brooklyn.stevin.ai', tier: 'flagship', featured: true },
  { name: 'Carmijn', type: 'Evenementenlocatie', url: 'https://carmijn.stevin.ai', tier: 'flagship', featured: true },
  { name: 'Norvik', type: 'Webshop, meubels', url: 'https://norvik.stevin.ai', tier: 'webshop', featured: true },
  { name: 'Verheijen', type: 'Installatiebedrijf', url: 'https://verheijen.stevin.ai', tier: 'flagship', featured: true },
  { name: 'Studio Adem', type: 'Wellness en yoga', url: 'https://studioadem.stevin.ai', featured: true },
  { name: 'Patisserie Saar', type: 'Patisserie', url: 'https://saar.stevin.ai', featured: true },
  { name: 'Koers', type: 'Coaching', url: 'https://koerscoaching.stevin.ai', featured: true },
  { name: 'Barbier Wolff', type: 'Barbier', url: 'https://barbierwolff.stevin.ai' },
  { name: 'De Groene Hand', type: 'Hovenier', url: 'https://degroenehand.stevin.ai' },
  { name: 'MV Voegwerken', type: 'Voegbedrijf', url: 'https://mv.stevin.ai' },
  { name: 'Tervoort', type: 'Grondwerk en bestrating', url: 'https://tervoort.stevin.ai' },
  { name: 'DKM', type: 'Rioolspecialist', url: 'https://dkm.stevin.ai' },
  { name: 'Schaerlaeckens', type: 'Autobedrijf', url: 'https://schaerlaeckens.stevin.ai' },
  { name: 'Schildersbedrijf Alex', type: 'Schilder', url: 'https://schildersbedrijfalex.stevin.ai' },
  { name: 'Daan Klus', type: 'Klus- en montagebedrijf', url: 'https://daanklus.stevin.ai' },
  { name: 'Koen Kouwenberg', type: 'Elektricien', url: 'https://kouwenberg.stevin.ai' },
  { name: 'Verhulst Elektro', type: 'Elektricien', url: 'https://verhulstelektro.stevin.ai' },
  { name: 'Tegelwerken Hoogstraten', type: 'Tegelzetter', url: 'https://tegelwerkenhoogstraten.stevin.ai' },
  { name: 'Aqua Breda', type: 'Loodgieter', url: 'https://aquabreda.stevin.ai' },
]

export const FEATURED = TEMPLATES.filter((t) => t.featured)
