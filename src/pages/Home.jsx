export default function Home({ onStart }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-6 md:p-8">
        <div className="text-center space-y-4 sm:space-y-6 md:space-y-8 max-w-4xl mx-auto">
          <div className="space-y-3 sm:space-y-4 md:space-y-6 animate-fade-in">
            <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
              PIXORA
            </h1>
            <div className="h-1.5 w-24 sm:w-28 md:w-32 bg-gradient-to-r from-red-500 via-red-600 to-red-500 mx-auto rounded-full shadow-lg shadow-red-500/50" />
          </div>
          
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 font-medium animate-slide-up" style={{ animationDelay: '0.2s' }}>
            Create stunning photobooth strips in seconds
          </p>
          
          <button
            onClick={onStart}
            className="group mt-6 sm:mt-8 px-6 sm:px-10 md:px-14 py-3 sm:py-4 md:py-5 bg-gradient-to-r from-red-600 to-red-700 text-white text-sm sm:text-base md:text-lg font-bold rounded-full hover:scale-105 hover:shadow-2xl hover:shadow-red-500/30 active:scale-95 transition-all duration-300 relative overflow-hidden animate-scale-in"
            style={{ animationDelay: '0.4s' }}
          >
            <span className="relative z-10 flex items-center gap-2 sm:gap-3">
              Start Creating
              <svg className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-800 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-3 sm:mb-4">
              How It Works
            </h2>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg font-medium">Four simple steps to your perfect photobooth strip</p>
          </div>
          
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {/* Step 1 */}
            <div className="group text-center">
              <div className="mb-4 sm:mb-6 relative">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-red-50 to-red-100 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                  <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z" />
                  </svg>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                  1
                </div>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">Choose Layout</h3>
              <p className="text-gray-600 text-sm font-medium leading-relaxed">Select from 2, 3, or 4 photo layouts for your strip</p>
            </div>

            {/* Step 2 */}
            <div className="group text-center">
              <div className="mb-4 sm:mb-6 relative">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-red-50 to-red-100 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                  <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                  2
                </div>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">Capture Photos</h3>
              <p className="text-gray-600 text-sm font-medium leading-relaxed">Take photos or upload images from your device</p>
            </div>

            {/* Step 3 */}
            <div className="group text-center">
              <div className="mb-4 sm:mb-6 relative">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-red-50 to-red-100 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                  <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                  3
                </div>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">Customize</h3>
              <p className="text-gray-600 text-sm font-medium leading-relaxed">Apply filters and choose frame colors</p>
            </div>

            {/* Step 4 */}
            <div className="group text-center">
              <div className="mb-4 sm:mb-6 relative">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-red-50 to-red-100 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                  <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                  4
                </div>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">Download</h3>
              <p className="text-gray-600 text-sm font-medium leading-relaxed">Save your photobooth strip in HD quality</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="py-6 sm:py-8 px-4 sm:px-6 md:px-8 bg-white border-t border-gray-200">
        <p className="text-center text-gray-500 text-xs sm:text-sm font-medium">Made with love by Pixora Team</p>
      </div>
    </div>
  )
}
