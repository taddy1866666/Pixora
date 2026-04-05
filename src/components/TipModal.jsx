export default function TipModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 md:p-8 z-50 animate-fade-in">
      <div className="bg-white rounded-2xl p-6 md:p-8 max-w-md w-full text-center animate-scale-in shadow-2xl">
        <div className="mb-4">
          <svg className="w-12 h-12 md:w-16 md:h-16 mx-auto text-red-600 animate-bounce" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
          </svg>
        </div>
        <h2 className="text-2xl md:text-3xl font-black text-red-600 mb-3 md:mb-4">
          Enjoyed Pixora?
        </h2>
        <p className="text-gray-600 mb-4 md:mb-6 font-medium text-sm md:text-base">
          Support us with a tip! Scan the QR codes below:
        </p>
        
        <div className="flex justify-center gap-4 md:gap-6 mb-4 md:mb-6">
          <div className="transform hover:scale-105 transition-transform">
            <div className="w-40 h-40 md:w-48 md:h-48 bg-white rounded-lg mb-2 flex items-center justify-center shadow-md overflow-hidden border-2 border-gray-200 relative">
              <img 
                src="/images/templates/6237636224835325420.jpg" 
                alt="Maya QR" 
                className="w-full h-full object-contain absolute inset-0" 
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.nextElementSibling.style.display = 'block'
                }}
              />
              <div className="hidden flex-col items-center justify-center">
                <svg className="w-16 h-16 md:w-20 md:h-20 text-green-600 mb-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                  <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                </svg>
                <p className="text-xs text-gray-500">QR Code</p>
              </div>
            </div>
            <p className="font-bold text-gray-700 text-sm md:text-base">Maya</p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={onClose}
            className="px-5 md:px-6 py-2.5 md:py-3 bg-gray-200 text-gray-700 rounded-full font-bold hover:bg-gray-300 transition-all duration-300 hover:scale-105 active:scale-95 w-full text-sm md:text-base"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
