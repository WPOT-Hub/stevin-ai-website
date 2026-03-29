import Link from 'next/link'

const footerLinks = {
  diensten: [
    { label: 'Paid Media', href: '/diensten#paid-media' },
    { label: 'Landing Pages & CRO', href: '/diensten#landing-pages-cro' },
    { label: 'Marketing Automation', href: '/diensten#marketing-automation' },
    { label: 'CRM & Leadopvolging', href: '/diensten#crm-leadopvolging' },
    { label: 'Tracking & Inzicht', href: '/diensten#tracking-inzicht' },
  ],
  bedrijf: [
    { label: 'Werkwijze', href: '/werkwijze' },
    { label: 'Integraties', href: '/integraties' },
    { label: 'Contact', href: '/contact' },
  ],
  integraties: [
    { label: 'Advertising', href: '/integraties/categorie/advertising' },
    { label: 'Analytics & Tracking', href: '/integraties/categorie/analytics-tracking' },
    { label: 'CRM & Sales', href: '/integraties/categorie/crm-sales' },
    { label: 'Email & Automation', href: '/integraties/categorie/email-automation' },
    { label: 'CMS & Ecommerce', href: '/integraties/categorie/cms-ecommerce' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Link href="/" className="text-xl font-bold tracking-tight">
              Stevin<span className="text-accent-light">.AI</span>
            </Link>
            <p className="mt-4 text-sm text-slate-400 leading-relaxed">
              Marketing met AI waar het versnelt. Onze kennis maakt het verschil. Van klik tot klant.
            </p>
            <p className="mt-4 text-xs text-slate-500">
              Werkzaam vanuit Amsterdam, Eindhoven en Breda.
            </p>
          </div>

          {/* Diensten */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-300 mb-4">
              Diensten
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.diensten.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-slate-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Bedrijf */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-300 mb-4">
              Bedrijf
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.bedrijf.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-slate-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Integraties */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-300 mb-4">
              Integraties
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.integraties.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-slate-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} Stevin.AI — Alle rechten voorbehouden.
          </p>
          <p className="text-xs text-slate-500">
            Amsterdam &middot; Eindhoven &middot; Breda
          </p>
        </div>
      </div>
    </footer>
  )
}
