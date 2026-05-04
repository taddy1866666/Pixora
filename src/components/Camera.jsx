import { useRef, useState } from 'react'
import Webcam from 'react-webcam'
import { useApp } from '../context/AppContext'

export default function Camera({ onNext }) {
  const webcamRef = useRef(null)
  const fileInputRef = useRef(null)
  const { photoCount, setCapturedShots } = useApp()
  const [flash, setFlash] = useState(false)
  const [capturedImages, setCapturedImages] = useState([])
  const [facingMode, setFacingMode] = useState('user')
  const [cameraError, setCameraError] = useState(null)
  const [cameraReady, setCameraReady] = useState(false)
  const [showPhotosModal, setShowPhotosModal] = useState(false)
  const [countdown, setCountdown] = useState(null)
  const [timerEnabled, setTimerEnabled] = useState(true)

  const extraShots = photoCount
  
  const capturePhoto = () => {
    if (capturedImages.length >= extraShots || !webcamRef.current || countdown) return
    
    if (!timerEnabled) {
      // Capture immediately without countdown
      try {
        const imageSrc = webcamRef.current.getScreenshot()
        if (!imageSrc) {
          alert('Failed to capture photo. Please try again.')
          return
        }
        
        const newImages = [...capturedImages, imageSrc]
        setCapturedImages(newImages)
        
        setFlash(true)
        setTimeout(() => setFlash(false), 100)
      } catch (error) {
        console.error('Capture error:', error)
        alert('Failed to capture photo. Please try again.')
      }
      return
    }
    
    // Start countdown
    setCountdown(3)
    
    const countdownInterval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(countdownInterval)
          // Take photo after countdown
          setTimeout(() => {
            try {
              const imageSrc = webcamRef.current.getScreenshot()
              if (!imageSrc) {
                alert('Failed to capture photo. Please try again.')
                setCountdown(null)
                return
              }
              
              const newImages = [...capturedImages, imageSrc]
              setCapturedImages(newImages)
              
              setFlash(true)
              setTimeout(() => {
                setFlash(false)
                setCountdown(null)
              }, 100)
            } catch (error) {
              console.error('Capture error:', error)
              alert('Failed to capture photo. Please try again.')
              setCountdown(null)
            }
          }, 100)
          return null
        }
        return prev - 1
      })
    }, 1000)
  }

  const handleUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return
    
    const reader = new FileReader()
    reader.onload = (event) => {
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        
        canvas.width = img.width
        canvas.height = img.height
        
        ctx.imageSmoothingEnabled = true
        ctx.imageSmoothingQuality = 'high'
        
        ctx.drawImage(img, 0, 0)
        
        const highQualityImage = canvas.toDataURL('image/jpeg', 1.0)
        
        const newImages = [...capturedImages, highQualityImage]
        setCapturedImages(newImages)
      }
      img.src = event.target.result
    }
    reader.readAsDataURL(file)
  }

  const handleRetake = () => {
    setCapturedImages([])
    setShowPhotosModal(false)
  }

  const handleContinue = () => {
    setCapturedShots(capturedImages)
    setShowPhotosModal(false)
    onNext()
  }

  const flipCamera = () => {
    setCameraReady(false)
    setFacingMode(prev => prev === 'user' ? 'environment' : 'user')
  }

  const deleteImage = (index) => {
    setCapturedImages(capturedImages.filter((_, i) => i !== index))
  }

  const handleUserMedia = () => {
    setCameraReady(true)
    setCameraError(null)
  }

  const handleUserMediaError = (error) => {
    console.error('Camera error:', error)
    setCameraError('Camera access denied or not available. Please allow camera access or use upload button.')
    setCameraReady(false)
  }

  return (
    <>
    <div className="h-screen bg-gradient-to-br from-indigo-50 via-white to-rose-50 overflow-hidden flex flex-col relative">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-indigo-200/10 to-transparent rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-rose-200/10 to-transparent rounded-full filter blur-3xl pointer-events-none" />
      
      <div className="w-full max-w-[700px] mx-auto px-4 py-3 flex flex-col h-full relative z-10">
        <div className="animate-fade-in mb-2 xs:mb-3 text-center flex-shrink-0">
          <h2 className="text-lg xs:text-xl md:text-2xl font-black mb-0.5 xs:mb-1 bg-gradient-to-r from-indigo-900 to-rose-900 bg-clip-text text-transparent">
            Capture Photos
          </h2>
          <p className="text-gray-600 text-xs xs:text-sm font-bold">
            {capturedImages.length} / {extraShots} photos captured
          </p>
        </div>

        <div className="flex flex-col flex-1 items-center justify-center min-h-0">
          <div className="relative w-full aspect-[3/4] sm:aspect-[3/4] md:aspect-square max-w-sm sm:max-w-md md:max-w-[500px] mx-auto">
              {cameraError ? (
                <div className="w-full h-full rounded-xl shadow-lg border-3 border-red-300 bg-red-50 flex items-center justify-center p-4">
                  <div className="text-center">
                    <svg className="w-10 h-10 text-red-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <p className="text-red-700 font-bold mb-1 text-xs">Camera Error</p>
                    <p className="text-red-600 text-xs">{cameraError}</p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="relative w-full h-full">
                    <Webcam
                      ref={webcamRef}
                      screenshotFormat="image/jpeg"
                      screenshotQuality={1.0}
                      className="rounded-xl shadow-2xl shadow-rose-500/20 border-2 border-rose-100 w-full h-full object-cover"
                      videoConstraints={{ 
                        facingMode: facingMode,
                        width: { ideal: 1920 },
                        height: { ideal: 1920 }
                      }}
                      onUserMedia={handleUserMedia}
                      onUserMediaError={handleUserMediaError}
                      mirrored={facingMode === 'user'}
                    />
                    
                    <div className="absolute inset-0 pointer-events-none rounded-xl">
                      <svg className="w-full h-full" viewBox="0 0 500 500">
                        <line x1="166.67" y1="0" x2="166.67" y2="500" stroke="white" strokeWidth="1" opacity="0.3" />
                        <line x1="333.33" y1="0" x2="333.33" y2="500" stroke="white" strokeWidth="1" opacity="0.3" />
                        <line x1="0" y1="166.67" x2="500" y2="166.67" stroke="white" strokeWidth="1" opacity="0.3" />
                        <line x1="0" y1="333.33" x2="500" y2="333.33" stroke="white" strokeWidth="1" opacity="0.3" />
                      </svg>
                    </div>

                    {/* Countdown Overlay */}
                    {countdown && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 rounded-xl flex items-center justify-center z-20">
                        <div className="text-white text-center animate-bounce">
                          <div className="text-9xl font-black mb-2">{countdown}</div>
                          <p className="text-2xl font-bold">Get Ready!</p>
                        </div>
                      </div>
                    )}

                    {/* Timer Toggle - Top Right */}
                    <button
                      onClick={() => setTimerEnabled(!timerEnabled)}
                      className={`absolute top-2 xs:top-3 right-2 xs:right-3 z-10 px-2 xs:px-2.5 py-1 xs:py-1.5 rounded-lg font-bold text-xs active:scale-95 transition-all flex items-center gap-1 shadow-lg backdrop-blur-sm ${
                        timerEnabled 
                          ? 'bg-red-600/30 text-white hover:bg-red-600/50 border border-white/30' 
                          : 'bg-white/30 text-white hover:bg-white/50 border border-white/50'
                      }`}
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {timerEnabled ? '3s' : 'OFF'}
                    </button>
                  </div>
                  
                  {!cameraReady && (
                    <div className="absolute inset-0 bg-gray-900 rounded-xl flex items-center justify-center">
                      <div className="text-white text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
                        <p className="text-xs font-medium">Loading...</p>
                      </div>
                    </div>
                  )}
                  
                  {flash && (
                    <div className="absolute inset-0 bg-white rounded-xl animate-fade-in" />
                  )}
                </>
              )}
          </div>

          <div className="w-full mt-1 xs:mt-2 max-w-[500px] mx-auto flex-shrink-0">
            <div className="flex gap-1 xs:gap-1.5 justify-center flex-wrap">
              <button
                onClick={capturePhoto}
                disabled={capturedImages.length >= extraShots || !cameraReady || countdown}
                className="px-3 xs:px-4 md:px-6 py-1.5 xs:py-2 md:py-2.5 bg-gradient-to-r from-rose-500 to-rose-600 text-white rounded-lg xs:rounded-xl font-bold text-xs xs:text-sm md:text-base hover:from-rose-600 hover:to-rose-700 hover:scale-105 hover:shadow-lg hover:shadow-rose-500/30 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 xs:gap-1.5 shadow-md"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                </svg>
                Capture
              </button>
              
              <button
                onClick={flipCamera}
                disabled={!cameraReady}
                className="px-2 xs:px-3 md:px-5 py-1.5 xs:py-2 md:py-2.5 bg-white border-2 border-gray-300 text-gray-800 rounded-lg xs:rounded-xl font-semibold text-xs xs:text-sm md:text-base hover:bg-gradient-to-br hover:from-rose-50 hover:to-indigo-50 hover:border-rose-300 hover:scale-105 hover:shadow-md hover:shadow-rose-200/30 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 xs:gap-1.5 shadow-sm"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Flip
              </button>
              
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={capturedImages.length >= extraShots}
                className="px-2 xs:px-3 md:px-5 py-1.5 xs:py-2 md:py-2.5 bg-white border-2 border-gray-300 text-gray-800 rounded-lg xs:rounded-xl font-semibold text-xs xs:text-sm md:text-base hover:bg-gradient-to-br hover:from-rose-50 hover:to-indigo-50 hover:border-rose-300 hover:scale-105 hover:shadow-md hover:shadow-rose-200/30 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 xs:gap-1.5 shadow-sm"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                Upload
              </button>
              
              {capturedImages.length > 0 && (
                <button
                  onClick={() => setShowPhotosModal(true)}
                  className="px-2 xs:px-3 md:px-5 py-1.5 xs:py-2 md:py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-lg xs:rounded-xl font-bold text-xs xs:text-sm md:text-base hover:from-indigo-600 hover:to-indigo-700 hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/30 active:scale-95 transition-all flex items-center gap-1 xs:gap-1.5 shadow-md"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  View ({capturedImages.length})
                </button>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleUpload}
              className="hidden"
            />
          </div>
        </div>
      </div>
    </div>

    {showPhotosModal && (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-3 xs:p-4 animate-fade-in">
        <div className="bg-gradient-to-br from-white to-indigo-50/30 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-auto p-3 xs:p-4 md:p-6 animate-scale-in shadow-2xl shadow-black/30 border border-white/50">
          <div className="flex justify-between items-center mb-3 xs:mb-4 border-b border-indigo-100 pb-3">
            <h3 className="text-xl xs:text-2xl md:text-3xl font-black bg-gradient-to-r from-indigo-900 to-rose-900 bg-clip-text text-transparent">Captured Photos</h3>
            <button
              onClick={() => setShowPhotosModal(false)}
              className="w-8 xs:w-10 h-8 xs:h-10 bg-gradient-to-br from-rose-100 to-indigo-100 hover:from-rose-200 hover:to-indigo-200 rounded-full flex items-center justify-center transition-all flex-shrink-0 shadow-md hover:shadow-lg"
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className={`grid ${extraShots === 1 ? 'grid-cols-1 max-w-xs xs:max-w-md mx-auto' : extraShots === 2 ? 'grid-cols-2 gap-2 xs:gap-3 md:gap-4' : extraShots === 3 ? 'grid-cols-2 xs:grid-cols-3 gap-2 xs:gap-3 md:gap-4' : 'grid-cols-2 gap-2 xs:gap-3 md:gap-4'} mb-4 xs:mb-6`}>
          {Array.from({ length: extraShots }).map((_, index) => (
            <div
              key={index}
              className="relative aspect-square rounded-lg xs:rounded-xl overflow-hidden border-2 xs:border-3 border-gray-300 bg-gray-100 flex items-center justify-center shadow-lg animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {capturedImages[index] ? (
                <>
                  <img
                    src={capturedImages[index]}
                    alt={`Captured ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => deleteImage(index)}
                    className="absolute top-1 xs:top-2 right-1 xs:right-2 w-7 xs:w-9 h-7 xs:h-9 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors flex items-center justify-center shadow-xl z-10 flex-shrink-0"
                  >
                    <svg className="w-3.5 xs:w-5 h-3.5 xs:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </>
              ) : (
                <div className="text-gray-400 text-center">
                  <svg className="w-10 xs:w-14 md:w-16 h-10 xs:h-14 md:h-16 mx-auto mb-1 xs:mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-base xs:text-lg md:text-xl font-bold">{index + 1}</p>
                </div>
              )}
            </div>
          ))}
          </div>

          {capturedImages.length === extraShots && (
            <div className="flex flex-col xs:flex-row gap-2 xs:gap-3 justify-center border-t border-indigo-100 pt-4">
              <button
                onClick={handleRetake}
                className="px-4 xs:px-6 py-2 xs:py-3 bg-white border-2 border-gray-300 text-gray-800 rounded-lg xs:rounded-xl font-bold text-xs xs:text-sm md:text-base hover:bg-gradient-to-br hover:from-indigo-50 hover:to-rose-50 hover:border-rose-300 hover:scale-105 hover:shadow-lg active:scale-95 transition-all flex items-center justify-center gap-1.5 xs:gap-2 shadow-sm"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Retake All
              </button>
              <button
                onClick={handleContinue}
                className="px-6 xs:px-8 py-2 xs:py-3 bg-gradient-to-r from-rose-500 to-rose-600 text-white rounded-lg xs:rounded-xl font-bold text-xs xs:text-sm md:text-base md:text-lg hover:from-rose-600 hover:to-rose-700 hover:scale-105 hover:shadow-lg hover:shadow-rose-500/30 active:scale-95 transition-all flex items-center justify-center gap-1.5 xs:gap-2 shadow-lg flex-1 xs:flex-none"
              >
                Continue
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    )}
    </>
  )
}
