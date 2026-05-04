import { useState, useEffect } from 'react'
import { useApp } from '../context/AppContext'
import { analyzeFaces } from '../utils/ai'

export default function ShotSelector({ onNext }) {
  const { photoCount, capturedShots, selectedShots, setSelectedShots } = useApp()
  const [suggestions, setSuggestions] = useState([])
  const [isAnalyzing, setIsAnalyzing] = useState(true)

  useEffect(() => {
    const analyze = async () => {
      setIsAnalyzing(true)
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate AI processing
      
      const scores = await analyzeFaces(capturedShots)
      const sorted = capturedShots
        .map((shot, idx) => ({ shot, score: scores[idx], idx }))
        .sort((a, b) => b.score - a.score)
      
      setSuggestions(sorted.slice(0, photoCount).map(s => s.idx))
      setSelectedShots(sorted.slice(0, photoCount).map(s => s.shot))
      setIsAnalyzing(false)
    }
    analyze()
  }, [])

  const toggleShot = (shot, idx) => {
    if (selectedShots.includes(shot)) {
      setSelectedShots(selectedShots.filter(s => s !== shot))
    } else if (selectedShots.length < photoCount) {
      setSelectedShots([...selectedShots, shot])
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-2 xs:p-3 sm:p-4 bg-gradient-to-br from-indigo-50 via-white to-rose-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-indigo-200/20 to-transparent rounded-full filter blur-3xl" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-gradient-to-br from-rose-200/20 to-transparent rounded-full filter blur-3xl" />
      
      <div className="animate-fade-in mb-4 xs:mb-6 relative z-10">
        <h2 className="text-2xl xs:text-3xl sm:text-4xl font-bold mb-2 text-center bg-gradient-to-r from-indigo-900 to-rose-900 bg-clip-text text-transparent">Select Your Best Shots</h2>
        <p className="text-gray-600 text-center text-xs xs:text-sm md:text-base font-medium">
          {isAnalyzing ? '🧠 AI is analyzing...' : '✨ AI suggested the best ones'}
        </p>
      </div>
      
      {isAnalyzing ? (
        <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 gap-2 xs:gap-3 sm:gap-4 mb-8 animate-pulse">
          {capturedShots.map((_, idx) => (
            <div key={idx} className="w-24 xs:w-32 sm:w-40 h-24 xs:h-32 sm:h-40 bg-gradient-to-br from-indigo-300 to-rose-300 rounded-xl shadow-lg animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 gap-2 xs:gap-3 sm:gap-4 mb-8 animate-scale-in relative z-10">
          {capturedShots.map((shot, idx) => (
            <div
              key={idx}
              onClick={() => toggleShot(shot, idx)}
              className={`relative cursor-pointer rounded-2xl overflow-hidden transition-all duration-300 transform shadow-lg hover:shadow-2xl hover:shadow-rose-500/30 ${
                selectedShots.includes(shot)
                  ? 'ring-4 ring-rose-500 scale-105 shadow-2xl shadow-rose-500/40'
                  : 'opacity-70 hover:opacity-100 hover:scale-105 hover:ring-2 hover:ring-rose-300/50'
              }`}
            >
              <img src={shot} alt={`Shot ${idx + 1}`} className="w-full aspect-square object-cover" />
              {suggestions.includes(idx) && (
                <div className="absolute top-2 right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-3 py-1 rounded-full text-xs font-bold shadow-lg shadow-yellow-400/50 animate-bounce">
                  ⭐ AI Pick
                </div>
              )}
              {selectedShots.includes(shot) && (
                <div className="absolute top-2 left-2 bg-gradient-to-br from-rose-500 to-rose-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shadow-lg shadow-rose-500/50 border-2 border-white">
                  {selectedShots.indexOf(shot) + 1}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="mb-4 xs:mb-6 text-center animate-slide-up relative z-10">
        <p className="text-base xs:text-lg sm:text-xl font-semibold text-gray-800">
          Selected: <span className="text-lg xs:text-xl sm:text-2xl bg-gradient-to-r from-rose-600 to-indigo-600 bg-clip-text text-transparent font-black">{selectedShots.length}</span> / {photoCount}
        </p>
      </div>
      
      <button
        onClick={onNext}
        disabled={selectedShots.length !== photoCount || isAnalyzing}
        className="group w-full max-w-xs xs:max-w-sm px-6 xs:px-10 sm:px-16 py-2.5 xs:py-3 sm:py-5 bg-gradient-to-r from-rose-500 via-rose-600 to-rose-700 text-white rounded-full font-bold text-xs xs:text-sm sm:text-base md:text-xl hover:scale-105 hover:shadow-2xl hover:shadow-rose-500/50 active:scale-95 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed shadow-2xl animate-slide-up flex items-center justify-center gap-2 xs:gap-3 relative overflow-hidden"
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-rose-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <span className="relative z-10 flex items-center gap-2 xs:gap-3">
          Continue
          <svg className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </span>
      </button>
    </div>
  )
}
