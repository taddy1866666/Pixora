import { useApp } from '../context/AppContext'

export default function FilterSelector({ onNext }) {
  const { filter, setFilter } = useApp()

  const filters = [
    { id: 'none', label: 'Original', emoji: '✨' },
    { id: 'grayscale', label: 'B&W', emoji: '⚫' },
    { id: 'sepia', label: 'Vintage', emoji: '📜' },
    { id: 'saturate', label: 'Vibrant', emoji: '🌈' },
    { id: 'contrast', label: 'Bold', emoji: '⚡' }
  ]

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white p-3 xs:p-4 sm:p-6 md:p-8 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-rose-500/10 to-transparent rounded-full filter blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full filter blur-3xl animate-pulse animation-delay-2000" />
      
      <div className="animate-fade-in mb-6 xs:mb-8 relative z-10">
        <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-black mb-2 xs:mb-3 text-center bg-gradient-to-r from-rose-300 via-purple-300 to-rose-300 bg-clip-text text-transparent">Choose Your Filter</h2>
        <p className="text-white/70 text-center text-xs xs:text-sm md:text-base">Set the mood for your photos</p>
      </div>
      
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-3 xs:gap-4 mb-8 xs:mb-10 max-w-2xl animate-scale-in w-full relative z-10">
        {filters.map(({ id, label, emoji }) => (
          <button
            key={id}
            onClick={() => setFilter(id)}
            className={`group px-3 xs:px-4 sm:px-6 py-3 xs:py-4 sm:py-6 rounded-2xl transition-all duration-300 backdrop-blur-md relative overflow-hidden ${
              filter === id
                ? 'bg-gradient-to-br from-rose-500 to-purple-600 shadow-2xl shadow-purple-500/50 scale-105 border border-white/20'
                : 'bg-white/10 hover:bg-white/20 hover:scale-105 border border-white/10 hover:border-rose-400/30'
            }`}
          >
            {/* Gradient overlay effect */}
            <div className={`absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500 ${
              filter === id ? 'from-white/10 to-transparent' : 'group-hover:opacity-100 from-white/5 to-transparent'
            }`} />
            
            <div className="text-2xl xs:text-3xl sm:text-4xl mb-1 xs:mb-2 group-hover:scale-110 transition-transform duration-300 relative z-10">{emoji}</div>
            <div className={`font-semibold text-xs xs:text-sm md:text-base relative z-10 transition-all duration-300 ${
              filter === id ? 'text-white' : 'text-white/90 group-hover:text-white'
            }`}>{label}</div>
          </button>
        ))}
      </div>
      
      <button
        onClick={onNext}
        className="px-6 xs:px-8 sm:px-10 py-2.5 xs:py-3 sm:py-4 bg-gradient-to-r from-rose-500 to-purple-600 text-white rounded-full font-bold text-xs xs:text-sm sm:text-base md:text-lg hover:scale-105 active:scale-95 transition-all duration-300 shadow-2xl shadow-purple-500/40 animate-slide-up relative z-10 hover:shadow-rose-500/50"
      >
        Start Capture →
      </button>
    </div>
  )
}
