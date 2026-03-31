'use client'

import { useEffect, useRef, useState } from 'react'

const steps = [
  {
    step: '01',
    title: 'Inrichten',
    desc: 'We zetten alles klaar.',
  },
  {
    step: '02',
    title: 'Analyseren',
    desc: 'We meten wat werkt.',
  },
  {
    step: '03',
    title: 'Bijsturen',
    desc: 'We verbeteren continu.',
  },
]

export default function StepsTimeline() {
  const [activeStep, setActiveStep] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute('data-step'))
            setActiveStep((prev) => Math.max(prev, idx))
          }
        })
      },
      { threshold: 0.6 }
    )

    const items = containerRef.current?.querySelectorAll('[data-step]')
    items?.forEach((item) => observer.observe(item))
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={containerRef}>
      {/* Desktop — horizontal */}
      <div className="hidden md:block max-w-3xl mx-auto">
        {/* Progress line */}
        <div className="relative flex items-center justify-between mb-8">
          {/* Background line */}
          <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-border -translate-y-1/2" />
          {/* Active line */}
          <div
            className="absolute left-0 top-1/2 h-0.5 bg-accent -translate-y-1/2 transition-all duration-700 ease-out"
            style={{ width: `${activeStep * 50}%` }}
          />
          {/* Dots */}
          {steps.map((item, i) => (
            <div
              key={item.step}
              data-step={i}
              className="relative z-10 flex flex-col items-center"
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500 ${
                  i <= activeStep
                    ? 'bg-accent text-white shadow-md shadow-accent/30'
                    : 'bg-white text-muted border-2 border-border'
                }`}
              >
                {i < activeStep ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                ) : (
                  item.step
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Labels */}
        <div className="flex justify-between">
          {steps.map((item, i) => (
            <div
              key={item.step}
              data-step={i}
              className={`text-center max-w-[200px] transition-all duration-500 ${
                i <= activeStep ? 'opacity-100 translate-y-0' : 'opacity-40 translate-y-2'
              }`}
            >
              <h3 className="text-lg font-bold text-primary mb-1">{item.title}</h3>
              <p className="text-sm text-muted">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile — vertical timeline */}
      <div className="md:hidden max-w-sm mx-auto">
        <div className="relative pl-12">
          {/* Vertical line */}
          <div className="absolute left-[18px] top-0 bottom-0 w-0.5 bg-border" />
          {/* Active line */}
          <div
            className="absolute left-[18px] top-0 w-0.5 bg-accent transition-all duration-700 ease-out"
            style={{ height: `${Math.min(activeStep * 50 + 10, 100)}%` }}
          />

          {steps.map((item, i) => (
            <div
              key={item.step}
              data-step={i}
              className={`relative pb-8 last:pb-0 transition-all duration-500 ${
                i <= activeStep ? 'opacity-100' : 'opacity-40'
              }`}
            >
              {/* Dot */}
              <div
                className={`absolute -left-12 top-0 w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-500 ${
                  i <= activeStep
                    ? 'bg-accent text-white shadow-md shadow-accent/30'
                    : 'bg-white text-muted border-2 border-border'
                }`}
              >
                {i < activeStep ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                ) : (
                  item.step
                )}
              </div>

              <h3 className="text-base font-bold text-primary">{item.title}</h3>
              <p className="text-sm text-muted mt-0.5">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
