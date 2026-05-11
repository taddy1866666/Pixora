import { useApp } from '../context/AppContext'

export default function FilterSelector({ onNext }) {
  const { filter, setFilter } = useApp()

  const filters = [
    { id: 'none', label: 'Original' },
    { id: 'grayscale', label: 'B&W' },
    { id: 'sepia', label: 'Vintage' },
    { id: 'saturate', label: 'Vibrant' },
    { id: 'contrast', label: 'Bold' }
  ]

  return (
    <div className="flex flex-col items-center justify-center min-h-dvh text-pixora-fg p-4 sm:p-6 md:p-10 bg-pixora-bg overflow-x-hidden">

      <div className="animate-fade-in mb-6 xs:mb-8">
        <h2 className="type-h1 mb-2 xs:mb-3 text-center text-white">Choose Your Filter</h2>
        <p className="type-body text-pixora-muted text-center">Set the mood for your photos</p>
      </div>

      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-3 xs:gap-4 mb-8 xs:mb-10 max-w-2xl animate-scale-in w-full">
        {filters.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setFilter(id)}
            className={`panel group px-4 sm:px-6 py-4 sm:py-6 rounded-2xl transition-colors duration-200 relative overflow-hidden ${filter === id
              ? 'bg-white text-black border-white shadow-2xl shadow-black/40'
              : 'bg-white/5 hover:bg-white/10 text-white border-white/10'
              }`}
          >
            <div className="font-semibold text-sm md:text-base">{label}</div>
          </button>
        ))}
      </div>

      <button
        onClick={onNext}
        className="btn-primary btn-pill px-6 xs:px-8 sm:px-10 py-3 sm:py-4 text-sm sm:text-base md:text-lg animate-slide-up"
      >
        Start Capture →
      </button>
    </div>
  )
}
