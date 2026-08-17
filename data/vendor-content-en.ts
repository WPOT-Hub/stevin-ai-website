/**
 * Engelse vertaling van de vendor-pagina-content (basisvelden + enrichment),
 * per slug. Gebruikt door app/[locale]/integraties/[slug]/page.tsx wanneer
 * locale === 'en', zodat de /en vendor-pagina volledig Engels rendert in plaats
 * van de Nederlandse data te tonen.
 *
 * De canonical van die pagina's blijft naar de NL-URL wijzen (zie page.tsx),
 * dus dit is taalcoherentie voor /en-bezoekers, geen aparte EN-indexatie.
 *
 * Source: gegenereerd vertaald uit data/integrations.ts + vendor-enrichments.json.
 */

import enData from './vendor-content-en.json'

export interface VendorContentEn {
  shortDescription: string
  description: string
  useCase: string
  howWeUseIt: string
  problemsSolved: string[]
  stevinAngle: string
  stackImpact: string
  pitfalls: string[]
  faqs?: { question: string; answer: string }[]
}

const content = enData as Record<string, VendorContentEn>

export function getVendorContentEn(slug: string): VendorContentEn | null {
  return content[slug] ?? null
}

/**
 * Losse Engelse regel per vendor voor de overzichtstabel op /en/integraties.
 *
 * vendor-content-en.json dekt exact de indexeerbare vendors (204 van de 264).
 * De 60 vendors uit de noindex-categorieen (finance-erp, workflow-operations,
 * ats-recruitment, media-monitoring-pr, dam-creative-ops, mlr-compliance)
 * hebben daar geen entry, maar staan wel gewoon in de tabel op de
 * overzichtspagina. Zonder deze aanvulling bleef die kolom daar Nederlands.
 *
 * Bewust alleen shortDescription en bewust een apart object: de detailpagina's
 * van deze vendors zijn noindex en NL-only, dus die hebben geen halve
 * VendorContentEn nodig. Een gedeeltelijke entry in de JSON zou daar velden
 * leeg laten renderen.
 */
const shortDescriptionEnSupplement: Record<string, string> = {
  // finance-erp
  'microsoft-dynamics': 'Microsoft ERP and CRM for business processes.',
  'dynamics-365': 'Microsoft ERP and CRM with extensive business intelligence.',
  visma: 'Accounting, ERP and HR software for businesses.',
  moneybird: 'Online accounting and invoicing for small firms and freelancers.',
  'exact-online': 'Accounting, invoicing and financial reporting.',
  afas: 'Dutch ERP, HR and finance platform, recruitment included.',
  twinfield: 'Cloud accounting and financial consolidation.',
  xero: 'International cloud accounting and financial reporting.',
  snelstart: 'Simple accounting for freelancers and small businesses.',
  unit4: 'ERP for professional services organisations.',

  // workflow-operations
  notion: 'All-in-one workspace for notes, docs and projects.',
  trello: 'Visual project management with boards and cards.',
  asana: 'Project management for teams and workflows.',
  'monday-com': 'Work management platform with extensive automation.',
  clickup: 'All-in-one productivity platform.',
  jira: 'Project management for technical teams.',
  'microsoft-planner': 'Task management inside Microsoft 365.',
  'microsoft-teams': 'Microsoft communication and collaboration platform.',
  basecamp: 'Project management and team communication in one tool.',
  miro: 'Online whiteboard for visual collaboration.',
  smartsheet: 'Enterprise work management with a spreadsheet interface.',
  wrike: 'Project management with strong reporting and resource management.',

  // ats-recruitment
  recruitee: 'Straightforward ATS for managing vacancies and candidates.',
  teamtailor: 'ATS with strong employer branding and career site features.',
  carerix: 'ATS and CRM for secondment and staffing agencies.',
  'bullhorn-ats': 'The Bullhorn ATS, for tracking candidates through the hiring process.',
  greenhouse: 'Enterprise ATS built around structured, fair hiring.',
  lever: 'ATS and CRM in one platform for modern talent management.',
  otys: 'Dutch ATS for recruitment and staffing agencies.',
  workable: 'All-in-one recruitment platform for smaller companies.',
  homerun: 'Dutch ATS built around employer branding and design.',
  smartrecruiters: 'Enterprise talent acquisition platform for large organisations.',
  jobylon: 'Scandinavian ATS with a strong focus on employer branding.',
  'personio-recruiting': 'Recruitment module inside the Personio HR platform.',
  connexys: 'ATS built on the Salesforce platform.',
  'workday-recruiting': 'Enterprise recruitment module inside Workday HCM.',
  'oracle-taleo': 'Enterprise ATS inside the Oracle HCM Cloud ecosystem.',
  'cegid-talentsoft-recruiting': 'European talent management and ATS platform.',
  'visma-easycruit': 'Scandinavian ATS for simple, efficient hiring.',
  join: 'Free ATS for smaller companies, with multiposting.',
  ashby: 'Modern ATS with recruitment analytics built in.',

  // media-monitoring-pr
  brandwatch: 'Deep social intelligence, sentiment analysis and consumer research.',
  brand24: 'Real-time social listening and online reputation monitoring.',
  meltwater: 'Global media monitoring across print, broadcast, online and social.',
  talkwalker: 'Social listening with image recognition and predictive analytics.',
  mention: 'Lightweight real-time media monitoring and alerting.',
  auxipress: 'Belgian media monitoring across print, TV, radio and online.',
  opoint: 'European news monitoring API with broad source coverage.',

  // dam-creative-ops
  bynder: 'Digital asset management for brand files, templates and creative workflows.',
  celtra: 'Creative automation for ad production and dynamic creatives at scale.',
  storyteq: 'Video and banner automation for personalised ads at scale.',
  figma: 'Collaborative design platform for teams working on creatives together.',
  'smartly-io': 'Creative automation and DCO for social advertising at scale.',
  runway: 'AI video generation and editing for fast video ad production.',
  pencil: 'AI generated ad creatives from brand assets and performance data.',

  // mlr-compliance
  'veeva-vault': 'Compliance and approval workflows for pharma and healthcare marketing.',
  'zinc-ahead': 'Content compliance and MLR workflow management for healthcare.',
  khoros: 'Social media compliance and content governance for regulated industries.',
}

/**
 * Engelse regel voor de overzichtstabel, met de Nederlandse als laatste terugval
 * zodat een nieuwe vendor nooit een lege cel oplevert.
 */
export function getVendorShortDescriptionEn(slug: string, fallback: string): string {
  return content[slug]?.shortDescription ?? shortDescriptionEnSupplement[slug] ?? fallback
}
