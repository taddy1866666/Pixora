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
    <div className="flex flex-col items-center justify-center min-h-screen p-3 xs:p-4 sm:p-6 md:p-8 pt-16 xs:pt-20 md:pt-8 bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100">
      <div className="mb-4 xs:mb-6 md:mb-8 animate-fade-in w-full px-2">
        <h2 className="text-xl xs:text-2xl md:text-3xl lg:text-4xl font-black mb-1 xs:mb-2 text-center bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
          Choose your layout
        </h2>
        <p className="text-gray-600 text-center text-xs xs:text-sm md:text-base font-medium">Select the perfect format for your memories</p>
      </div>
      
      <div className="flex flex-col xs:flex-col sm:flex-row gap-3 xs:gap-4 md:gap-6 mb-6 md:mb-8 animate-scale-in w-full max-w-4xl px-2 xs:px-4">
        {layouts.map(({ id, count, label, description }) => (
          <button
            key={id}
            onClick={() => setLayout(id)}
            className={`group relative p-3 xs:p-4 sm:p-6 md:p-6 rounded-2xl xs:rounded-3xl transition-all duration-500 bg-white backdrop-blur-sm flex-1 ${
              layout === id
                ? 'border-3 xs:border-4 border-red-600 shadow-2xl shadow-red-500/20 scale-105'
                : 'border-3 xs:border-4 border-gray-200 hover:border-red-300 hover:scale-105 hover:shadow-xl shadow-lg'
            }`}
          >
            {/* Selection indicator */}
            {layout === id && (
              <div className="absolute -top-2 xs:-top-3 -right-2 xs:-right-3 w-6 xs:w-8 md:w-10 md:h-10 h-6 xs:h-8 bg-red-600 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                <svg className="w-4 xs:w-5 md:w-6 md:h-6 h-4 xs:h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
            
            {/* Icon Preview */}
            <div className="flex justify-center mb-3 xs:mb-4 md:mb-6">
              <div className={`border-3 xs:border-4 rounded-xl xs:rounded-2xl p-2 xs:p-3 md:p-4 transition-all duration-500 w-14 xs:w-16 sm:w-20 h-20 xs:h-24 sm:h-28 ${
                layout === id ? 'border-red-600 bg-red-50' : 'border-gray-300 bg-gray-50 group-hover:border-red-300 group-hover:bg-red-50'
              }`}>
                <div className="flex flex-col gap-1.5 md:gap-2 h-full justify-center">
                  {Array.from({ length: count }).map((_, i) => (
                    <div 
                      key={i} 
                      className={`rounded transition-all duration-500 ${
                        layout === id ? 'bg-red-600' : 'bg-gray-300 group-hover:bg-red-400'
                      }`}
                      style={{ 
                        height: `${100 / count - 8}%`,
                        animationDelay: `${i * 100}ms`
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            <div className={`text-center transition-colors duration-300 ${
              layout === id ? 'text-gray-900' : 'text-gray-700'
            }`}>
              <div className="text-lg xs:text-xl md:text-2xl font-black mb-0.5 xs:mb-1">{label}</div>
              <div className="text-xs xs:text-sm text-gray-500 font-semibold">{description}</div>
            </div>
          </button>
        ))}
      </div>
      
      <button
        onClick={onNext}
        disabled={!layout}
        className="group px-8 xs:px-12 sm:px-16 md:px-16 py-3 xs:py-4 md:py-5 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full font-bold text-base xs:text-lg md:text-xl hover:scale-105 hover:shadow-2xl hover:shadow-red-500/30 active:scale-95 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:shadow-none flex items-center gap-2 xs:gap-3 md:gap-4 relative overflow-hidden"
      >
        <span className="relative z-10 flex items-center gap-1.5 xs:gap-2 md:gap-3">
          Next
          <svg className="w-5 h-5 xs:w-6 xs:h-6 md:w-7 md:h-7 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-800 opacity-0 group-hover:opacity-100 transition-opacity" />
      </button>
    </div>
  )
}
