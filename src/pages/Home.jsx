export default function Home({ onStart }) {
  return (
    <div className="min-h-dvh bg-pixora-bg text-pixora-fg">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center min-h-dvh space-section">
        <div className="text-center space-stack-lg max-w-4xl mx-auto">
          <div className="space-stack-md animate-fade-in">
            <h1 className="type-display text-white">
              PIXORA
            </h1>
            <div className="h-1 w-20 sm:w-24 md:w-28 mx-auto rounded-full bg-white/80" />
          </div>

          <p className="type-title text-pixora-muted font-medium animate-slide-up" style={{ animationDelay: '0.2s' }}>
            Create stunning photobooth strips in seconds
          </p>

          <button
            onClick={onStart}
            className="btn-primary group mt-10 px-14 animate-scale-in"
            style={{ animationDelay: '0.4s' }}
          >
            <span className="relative z-10 flex items-center gap-3">
              START EXPERIENCE
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </button>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="space-section bg-pixora-bg border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="type-h1 text-white mb-3 sm:mb-4">
              How It Works
            </h2>
            <p className="type-body text-pixora-muted font-medium">Four simple steps to your perfect photobooth strip</p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {/* Step 1 */}
            <div className="group text-center">
              <div className="mb-4 sm:mb-6 relative">
                <div className="w-20 h-20 mx-auto bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center group-hover:bg-white/10 transition-colors duration-200">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z" />
                  </svg>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-white text-black rounded-full flex items-center justify-center font-bold text-sm">
                  1
                </div>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white mb-3">Choose Layout</h3>
              <p className="text-pixora-muted text-sm font-medium leading-relaxed">Select from 2, 3, or 4 photo layouts for your strip</p>
            </div>

            {/* Step 2 */}
            <div className="group text-center">
              <div className="mb-4 sm:mb-6 relative">
                <div className="w-20 h-20 mx-auto bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center group-hover:bg-white/10 transition-colors duration-200">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-white text-black rounded-full flex items-center justify-center font-bold text-sm">
                  2
                </div>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white mb-3">Capture Photos</h3>
              <p className="text-pixora-muted text-sm font-medium leading-relaxed">Take photos or upload images from your device</p>
            </div>

            {/* Step 3 */}
            <div className="group text-center">
              <div className="mb-4 sm:mb-6 relative">
                <div className="w-20 h-20 mx-auto bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center group-hover:bg-white/10 transition-colors duration-200">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-white text-black rounded-full flex items-center justify-center font-bold text-sm">
                  3
                </div>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white mb-3">Customize</h3>
              <p className="text-pixora-muted text-sm font-medium leading-relaxed">Apply filters and choose frame colors</p>
            </div>

            {/* Step 4 */}
            <div className="group text-center">
              <div className="mb-4 sm:mb-6 relative">
                <div className="w-20 h-20 mx-auto bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center group-hover:bg-white/10 transition-colors duration-200">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-white text-black rounded-full flex items-center justify-center font-bold text-sm">
                  4
                </div>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white mb-3">Download</h3>
              <p className="text-pixora-muted text-sm font-medium leading-relaxed">Save your photobooth strip in HD quality</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="py-6 sm:py-8 px-4 sm:px-6 md:px-8 bg-pixora-bg border-t border-white/10">
      </div>
    </div>
  )
}
