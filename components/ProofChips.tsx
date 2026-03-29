const chips = [
  'Google Ads',
  'Meta Ads',
  'LinkedIn Ads',
  'CRM Koppelingen',
  'Tracking',
  'Automation',
  'Leadopvolging',
  'Shopify',
  'HubSpot',
  'Reporting',
]

export default function ProofChips() {
  return (
    <div className="flex flex-wrap justify-center gap-2.5 mt-8">
      {chips.map((chip) => (
        <span
          key={chip}
          className="inline-flex items-center px-4 py-2 text-sm font-medium bg-surface-alt text-muted rounded-full border border-border"
        >
          {chip}
        </span>
      ))}
    </div>
  )
}
