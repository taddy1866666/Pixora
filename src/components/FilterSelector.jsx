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
    <div className="flex flex-col items-center justify-center min-h-screen text-white p-8">
      <div className="animate-fade-in mb-8">
        <h2 className="text-5xl font-bold mb-3 text-center">Choose Your Filter</h2>
        <p className="text-white/80 text-center">Set the mood for your photos</p>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mb-10 max-w-2xl animate-scale-in">
        {filters.map(({ id, label, emoji }) => (
          <button
            key={id}
            onClick={() => setFilter(id)}
            className={`group px-6 py-6 rounded-xl transition-all duration-300 ${
              filter === id
                ? 'bg-white text-pixora-primary scale-105 shadow-2xl'
                : 'bg-white/20 hover:bg-white/30 hover:scale-105'
            }`}
          >
            <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">{emoji}</div>
            <div className="font-semibold">{label}</div>
          </button>
        ))}
      </div>
      
      <button
        onClick={onNext}
        className="px-10 py-4 bg-white text-pixora-primary rounded-full font-bold text-lg hover:scale-105 active:scale-95 transition-all duration-300 shadow-2xl animate-slide-up"
      >
        Start Capture →
      </button>
    </div>
  )
}
