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
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100">
      <div className="animate-fade-in mb-6">
        <h2 className="text-4xl font-bold mb-2 text-center bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Select Your Best Shots</h2>
        <p className="text-gray-600 text-center text-base">
          {isAnalyzing ? '🧠 AI is analyzing...' : '✨ AI suggested the best ones'}
        </p>
      </div>
      
      {isAnalyzing ? (
        <div className="grid grid-cols-3 gap-4 mb-8 animate-pulse">
          {capturedShots.map((_, idx) => (
            <div key={idx} className="w-40 h-40 bg-gray-300 rounded-lg" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4 mb-8 animate-scale-in">
          {capturedShots.map((shot, idx) => (
            <div
              key={idx}
              onClick={() => toggleShot(shot, idx)}
              className={`relative cursor-pointer rounded-xl overflow-hidden transition-all duration-300 ${
                selectedShots.includes(shot)
                  ? 'ring-4 ring-red-600 scale-105 shadow-2xl'
                  : 'opacity-60 hover:opacity-100 hover:scale-105'
              }`}
            >
              <img src={shot} alt={`Shot ${idx + 1}`} className="w-full aspect-square object-cover" />
              {suggestions.includes(idx) && (
                <div className="absolute top-2 right-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-bounce">
                  ⭐ AI Pick
                </div>
              )}
              {selectedShots.includes(shot) && (
                <div className="absolute top-2 left-2 bg-red-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                  {selectedShots.indexOf(shot) + 1}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="mb-6 text-center animate-slide-up">
        <p className="text-lg font-semibold text-gray-800">
          Selected: <span className="text-xl">{selectedShots.length}</span> / {photoCount}
        </p>
      </div>
      
      <button
        onClick={onNext}
        disabled={selectedShots.length !== photoCount || isAnalyzing}
        className="group px-16 py-5 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full font-bold text-xl hover:scale-105 hover:shadow-2xl hover:shadow-red-500/30 active:scale-95 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed shadow-2xl animate-slide-up flex items-center gap-3"
      >
        <span className="relative z-10 flex items-center gap-3">
          Continue
          <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-800 opacity-0 group-hover:opacity-100 transition-opacity" />
      </button>
    </div>
  )
}
