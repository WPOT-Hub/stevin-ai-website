import type { FAQ } from '@/data/faqs'

interface FAQAccordionProps {
  faqs: FAQ[] | { question: string; answer: string }[]
}

// Native details/summary in plaats van een useState-toggle. Reden: het antwoord
// stond alleen in de DOM zodra je klikte, dus crawlers en LLMs (Perplexity,
// ChatGPT) zagen de antwoord-tekst niet in de statische HTML, terwijl die juist
// het sterkst citeerbaar is. Met details/summary staat het antwoord altijd in
// de HTML (alleen visueel ingeklapt), zonder JavaScript nodig.
export default function FAQAccordion({ faqs }: FAQAccordionProps) {
  return (
    <div className="space-y-3 max-w-3xl mx-auto">
      {faqs.map((faq, index) => (
        <details
          key={index}
          className="group rounded-xl border border-border bg-white overflow-hidden"
        >
          <summary className="w-full flex items-center justify-between px-6 py-5 text-left cursor-pointer list-none [&::-webkit-details-marker]:hidden">
            <span className="text-base font-semibold text-primary pr-4">{faq.question}</span>
            <svg
              className="flex-shrink-0 w-5 h-5 text-muted transition-transform duration-200 group-open:rotate-180"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <div className="px-6 pb-5">
            <p className="text-sm text-muted leading-relaxed">{faq.answer}</p>
          </div>
        </details>
      ))}
    </div>
  )
}
