'use client'

import { useState } from 'react'
import type { FAQ } from '@/data/faqs'

interface FAQAccordionProps {
  faqs: FAQ[] | { question: string; answer: string }[]
}

export default function FAQAccordion({ faqs }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="space-y-3 max-w-3xl mx-auto">
      {faqs.map((faq, index) => (
        <div key={index} className="rounded-xl border border-border bg-white overflow-hidden">
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full flex items-center justify-between px-6 py-5 text-left"
          >
            <span className="text-base font-semibold text-primary pr-4">{faq.question}</span>
            <svg
              className={`flex-shrink-0 w-5 h-5 text-muted transition-transform duration-200 ${openIndex === index ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {openIndex === index && (
            <div className="px-6 pb-5">
              <p className="text-sm text-muted leading-relaxed">{faq.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
