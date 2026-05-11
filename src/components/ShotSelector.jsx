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
    <div className="flex flex-col items-center min-h-dvh p-4 sm:p-6 bg-pixora-bg text-pixora-fg pt-16 md:pt-10">
      
      <div className="flex items-center justify-center gap-0 mb-6 sm:mb-8 animate-fade-in">
        {['Layout', 'Capture', 'Select', 'Edit', 'Preview'].map((item, idx) => (
          <div
            key={item}
            className={`px-4 sm:px-6 py-2.5 text-[10px] sm:text-xs font-black tracking-[0.3em] uppercase border transition-all duration-300 ${
              idx === 2 ? 'bg-white text-black border-white' : 'bg-black text-white border-white/20'
            }`}
          >
            {item}
          </div>
        ))}
      </div>

      <div className="animate-fade-in mb-8">
        <h2 className="text-2xl md:text-3xl font-black mb-2 text-center text-white uppercase tracking-tighter">Review Selection</h2>
        <p className="text-xs font-bold text-pixora-muted text-center uppercase tracking-[0.3em]">
          {isAnalyzing ? 'AI ANALYZING POSES...' : 'CHOOSE YOUR BEST SHOTS'}
        </p>
      </div>
      
      {isAnalyzing ? (
        <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 gap-3 mb-10 animate-pulse">
          {capturedShots.map((_, idx) => (
            <div key={idx} className="w-24 xs:w-32 sm:w-40 aspect-square bg-white/5 border-2 border-white/10" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 gap-3 mb-10 animate-scale-in">
          {capturedShots.map((shot, idx) => (
            <div
              key={idx}
              onClick={() => toggleShot(shot, idx)}
              className={`relative cursor-pointer border-2 transition-all duration-200 ${
                selectedShots.includes(shot)
                  ? 'border-white ring-4 ring-white/20'
                  : 'border-white/10 opacity-70 hover:opacity-100 hover:border-white/30'
              }`}
            >
              <img src={shot} alt={`Shot ${idx + 1}`} className="w-full aspect-square object-cover" />
              {suggestions.includes(idx) && (
                <div className="absolute bottom-2 right-2 bg-white text-black px-2 py-1 text-[8px] font-black uppercase tracking-widest">
                  AI PICK
                </div>
              )}
              {selectedShots.includes(shot) && (
                <div className="absolute top-2 left-2 bg-white text-black w-8 h-8 flex items-center justify-center font-black text-sm">
                  {selectedShots.indexOf(shot) + 1}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="mb-10 text-center animate-slide-up">
        <p className="text-xs font-black text-white uppercase tracking-widest">
          SELECTED <span className="text-2xl mx-2">{selectedShots.length}</span> / {photoCount}
        </p>
      </div>
      
      <button
        onClick={onNext}
        disabled={selectedShots.length !== photoCount || isAnalyzing}
        className="btn-primary group w-full max-w-xs"
      >
        CONTINUE TO EDIT
        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </button>
    </div>
  )
}
