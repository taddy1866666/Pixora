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
      <div className="min-h-dvh bg-pixora-bg text-pixora-fg overflow-x-hidden flex flex-col relative">

        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-6 flex flex-col h-full relative z-10">
          <div className="animate-fade-in mb-4 text-center flex-shrink-0">
            <div className="flex items-center justify-center gap-0 mb-6 sm:mb-8">
              {['Layout', 'Capture', 'Edit', 'Preview'].map((item, idx) => (
                <div
                  key={item}
                  className={`px-4 sm:px-6 py-2 text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase border transition-all duration-300 ${idx === 1 ? 'bg-white text-black border-white' : 'bg-black text-white border-white/20'
                    }`}
                >
                  {item}
                </div>
              ))}
            </div>
            <h2 className="type-h2 mb-1 text-white">
              Capture Photos
            </h2>
            <p className="type-body text-pixora-muted font-bold">
              {capturedImages.length} / {extraShots} photos captured
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 flex-1 min-h-0">
            <div className="panel flex-1 p-3 sm:p-4 md:p-5 flex items-center justify-center min-h-[420px]">
              <div className="relative w-full aspect-[3/4] md:aspect-square max-w-sm sm:max-w-md md:max-w-[560px] mx-auto">
                {cameraError ? (
                  <div className="w-full h-full rounded-xl shadow-lg border-3 border-red-300 bg-red-50 flex items-center justify-center p-4">
                    <div className="text-center">
                      <svg className="w-10 h-10 text-red-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      <p className="text-red-700 font-bold mb-1 text-sm">Camera Error</p>
                      <p className="text-red-600 text-sm">{cameraError}</p>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="relative w-full h-full">
                      <Webcam
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        screenshotQuality={1.0}
                        className="rounded-xl shadow-xl shadow-black/30 border border-white/15 w-full h-full object-cover"
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
                          <div className="text-white text-center">
                            <div className="text-9xl font-black mb-2">{countdown}</div>
                            <p className="text-2xl font-bold">Get Ready!</p>
                          </div>
                        </div>
                      )}

                      {/* Timer Toggle - Top Right */}
                      <button
                        onClick={() => setTimerEnabled(!timerEnabled)}
                        className={`absolute top-2 xs:top-3 right-2 xs:right-3 z-10 px-2 xs:px-2.5 py-1 xs:py-1.5 rounded-lg font-bold text-sm active:scale-95 transition-all duration-200 flex items-center gap-1 shadow-lg backdrop-blur-sm min-h-11 cursor-pointer ${timerEnabled
                            ? 'bg-white/10 text-white hover:bg-white/15 border border-white/20'
                            : 'bg-white/5 text-white hover:bg-white/10 border border-white/15'
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
                          <p className="text-sm font-medium">Loading...</p>
                        </div>
                      </div>
                    )}

                    {flash && (
                      <div className="absolute inset-0 bg-white rounded-xl animate-fade-in" />
                    )}
                  </>
                )}
              </div>
            </div>

            <div className="panel lg:w-[22rem] p-3 sm:p-4 flex-shrink-0">
              <div className="space-stack-md">
                <p className="type-title text-white">Camera controls</p>
                <div className="flex gap-2 justify-center flex-wrap">
                  <button
                    onClick={capturePhoto}
                    disabled={capturedImages.length >= extraShots || !cameraReady || countdown}
                    className="btn-primary flex-1"
                  >
                    CAPTURE
                  </button>

                  <button
                    onClick={flipCamera}
                    disabled={!cameraReady}
                    className="btn-ghost"
                  >
                    FLIP
                  </button>

                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={capturedImages.length >= extraShots}
                    className="btn-ghost"
                  >
                    UPLOAD
                  </button>

                  {capturedImages.length > 0 && (
                    <button
                      onClick={() => setShowPhotosModal(true)}
                      className="btn-ghost border-white/40"
                    >
                      VIEW ({capturedImages.length})
                    </button>
                  )}
                </div>
                <p className="type-caption text-pixora-muted text-center">
                  Tip: use timer for more natural poses.
                </p>
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
      </div>

      {showPhotosModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end md:items-center justify-center z-50 p-0 md:p-4 animate-fade-in">
          {/* Modal Container - Full height mobile, centered desktop */}
          <div className="bg-pixora-surface text-pixora-fg rounded-t-3xl md:rounded-3xl w-full md:max-w-2xl md:max-h-[85vh] h-screen md:h-auto flex flex-col animate-scale-in shadow-2xl shadow-black/30 overflow-hidden relative border border-white/10">

            {/* Header - Fixed at top */}
            <div className="flex justify-between items-center px-4 xs:px-6 py-4 border-b border-white/10 bg-pixora-surface flex-shrink-0">
              <h3 className="text-xl xs:text-2xl font-bold text-white">
                Captured Photos
              </h3>
              <button
                onClick={() => setShowPhotosModal(false)}
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-center cursor-pointer"
                aria-label="Close modal"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Photos Grid - Scrollable */}
            <div className="flex-1 overflow-y-auto px-4 xs:px-6 py-6 min-h-0">
              <div className={`grid ${extraShots === 1 ? 'grid-cols-1 justify-items-center' :
                  extraShots === 2 ? 'grid-cols-2 gap-4' :
                    extraShots === 3 ? 'grid-cols-2 xs:grid-cols-3 gap-4' :
                      'grid-cols-2 gap-4'
                }`}>
                {Array.from({ length: extraShots }).map((_, index) => (
                  <div
                    key={index}
                    className="relative aspect-square rounded-xl overflow-hidden border border-white/10 bg-white/5 shadow-md hover:shadow-lg transition-shadow"
                  >
                    {capturedImages[index] ? (
                      <>
                        <img
                          src={capturedImages[index]}
                          alt={`Photo ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <button
                          onClick={() => deleteImage(index)}
                          className="absolute top-2 right-2 w-8 h-8 bg-white text-black rounded-full flex items-center justify-center shadow-md transition-colors cursor-pointer hover:bg-white/90"
                          aria-label={`Delete photo ${index + 1}`}
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </>
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-pixora-muted">
                        <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="font-bold text-lg">{index + 1}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile: Floating Continue Button - Top Right */}
            {capturedImages.length === extraShots && (
              <>
                {/* Mobile Floating Button */}
                <button
                  onClick={handleContinue}
                  className="md:hidden absolute top-4 right-4 btn-primary px-6 z-20 group"
                >
                  CONTINUE
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>

                {/* Desktop: Bottom Buttons */}
                <div className="hidden md:flex border-t border-white/10 bg-pixora-surface px-6 py-4 gap-4 flex-shrink-0">
                  <button
                    onClick={handleRetake}
                    className="btn-ghost flex-1"
                  >
                    RETAKE
                  </button>
                  <button
                    onClick={handleContinue}
                    className="btn-primary flex-1 group"
                  >
                    CONTINUE
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
