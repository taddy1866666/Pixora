import { useState, useEffect } from 'react'
import { useApp } from '../context/AppContext'
import { generateStripTemplate } from '../utils/svgTemplates'

export default function LayoutSelector({ onNext }) {
  const { layout, setLayout } = useApp()
  const [templatePreviews, setTemplatePreviews] = useState({})

  const layouts = [
    {
      id: 'strip-4',
      count: 4,
      label: 'Classic',
      size: '4x6',
      description: '4 Photos'
    },
    {
      id: 'strip-3',
      count: 3,
      label: 'Triple',
      size: '4x6',
      description: '3 Photos'
    },
    {
      id: 'strip-2',
      count: 2,
      label: 'Duo',
      size: '4x6',
      description: '2 Photos'
    }
  ]

  useEffect(() => {
    // Generate SVG template previews
    const previews = {}
    layouts.forEach((layoutItem) => {
      const svg = generateStripTemplate(layoutItem.id)
      const blob = new Blob([svg], { type: 'image/svg+xml' })
      const url = URL.createObjectURL(blob)
      previews[layoutItem.id] = url
    })
    setTemplatePreviews(previews)

    // Cleanup
    return () => {
      Object.values(previews).forEach(url => URL.revokeObjectURL(url))
    }
  }, [])

  return (
    <div className="min-h-dvh pt-16 md:pt-10 bg-pixora-bg text-pixora-fg">
      <div className="space-section max-w-6xl mx-auto">
        <div className="mb-6 sm:mb-8 md:mb-12 animate-fade-in w-full">
          <div className="flex items-center justify-center gap-0 mb-6 sm:mb-8">
            {['Layout', 'Capture', 'Edit', 'Preview'].map((item, idx) => (
              <div
                key={item}
                className={`px-4 sm:px-6 py-2 text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase border transition-all duration-300 ${idx === 0 ? 'bg-white text-black border-white' : 'bg-black text-white border-white/20'
                  }`}
              >
                {item}
              </div>
            ))}
          </div>

          <h2 className="type-h1 mb-2 text-center text-white text-balance uppercase tracking-tight">
            Choose Your Layout
          </h2>
        </div>

        <div className="animate-scale-in mb-8">
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {layouts.map(({ id, count, label, description, size }) => (
              <button
                key={id}
                onClick={() => setLayout(id)}
                className={`group panel relative p-4 sm:p-5 md:p-6 transition-all duration-200 overflow-hidden text-left rounded-none ${layout === id ? 'ring-2 ring-white shadow-xl shadow-black/30 bg-white/10 -translate-y-0.5' : 'hover:bg-white/[0.08]'
                  }`}
              >
                {layout === id && (
                  <div className="absolute top-3 right-3 z-20 w-7 h-7 md:w-8 md:h-8 bg-white text-black flex items-center justify-center shadow-lg shadow-black/40">
                    <svg className="w-4 h-4 md:w-5 md:h-5 text-black" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}

                <div className="relative z-10 mb-4 sm:mb-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] uppercase tracking-wider text-pixora-muted">{size}</span>
                    <span className="text-[11px] uppercase tracking-wider text-pixora-muted">{count} shots</span>
                  </div>
                  <div className={`w-full h-36 sm:h-44 border transition-colors duration-200 ${layout === id ? 'border-white/60 bg-black' : 'border-white/15 bg-black/80'
                    } flex items-center justify-center`}>
                    {templatePreviews[id] ? (
                      <img
                        src={templatePreviews[id]}
                        alt={`${label} strip layout preview`}
                        className="h-full w-auto object-contain"
                      />
                    ) : (
                      <div className="flex flex-col gap-2 h-28 justify-center w-16">
                        {Array.from({ length: count }).map((_, i) => (
                          <div key={i} className="bg-white/40 h-5" />
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="relative z-10">
                  <div className="type-title text-white">{label}</div>
                  <div className="type-body text-pixora-muted font-semibold">{description}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="sticky bottom-0 bg-gradient-to-t from-pixora-bg via-pixora-bg to-transparent pt-2 pb-1 -mx-4 px-4 sm:static sm:bg-none sm:p-0 flex justify-center sm:justify-end">
          <button
            onClick={onNext}
            disabled={!layout}
            className="btn-primary group w-full sm:w-auto px-16"
          >
            <span className="relative z-10 flex items-center gap-3">
              SELECT LAYOUT
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}
