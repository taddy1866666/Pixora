import { useRef, useEffect, useState } from 'react'
import { useApp } from '../context/AppContext'

export default function Preview({ onTip, onRestart }) {
  const canvasRef = useRef(null)
  const { capturedShots, filter, templateColor, selectedFont, fontColor } = useApp()
  const [isDownloading, setIsDownloading] = useState(false)

  const frameColors = [
    { id: 'white', hex: '#FFFFFF' },
    { id: 'soft-pink', hex: '#FBCFE8' },
    { id: 'soft-blue', hex: '#BFDBFE' },
    { id: 'soft-purple', hex: '#E9D5FF' },
    { id: 'soft-green', hex: '#BBF7D0' },
    { id: 'soft-yellow', hex: '#FEF08A' },
    { id: 'soft-orange', hex: '#FED7AA' },
    { id: 'hard-red', hex: '#DC2626' },
    { id: 'hard-blue', hex: '#2563EB' },
    { id: 'hard-purple', hex: '#9333EA' },
    { id: 'hard-green', hex: '#16A34A' },
    { id: 'hard-orange', hex: '#EA580C' },
    { id: 'hard-black', hex: '#111827' }
  ]

  const applyFilter = (ctx, filterType) => {
    if (filterType === 'none') {
      ctx.filter = 'none'
      return
    }
    
    const filters = {
      grayscale: 'grayscale(100%)',
      sepia: 'sepia(80%)',
      pop: 'saturate(180%) contrast(110%)',
      muted: 'saturate(60%) brightness(95%)',
      bright: 'brightness(115%) contrast(105%)',
      dim: 'brightness(80%) contrast(90%)',
      cherry: 'sepia(30%) saturate(140%) hue-rotate(-10deg)',
      glacier: 'saturate(80%) brightness(105%) hue-rotate(180deg)',
      noir: 'grayscale(100%) contrast(130%)',
      fuji: 'saturate(120%) contrast(105%) brightness(102%)',
      '90s': 'saturate(140%) contrast(95%) brightness(105%)',
      clean: 'saturate(90%) brightness(105%) contrast(100%)',
      glowy: 'brightness(110%) saturate(110%) blur(0.3px)',
      ruppert: 'contrast(120%) saturate(110%)',
      flash: 'brightness(120%) contrast(110%)',
      minimal: 'saturate(70%) contrast(95%)'
    }
    
    ctx.filter = filters[filterType] || 'none'
  }

  useEffect(() => {
    const renderStrip = () => {
      if (!canvasRef.current || capturedShots.length === 0) return
      
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      
      const photoCount = capturedShots.length
      const canvasWidth = 800
      const borderWidth = 50
      const photoHeight = 500
      const photoSpacing = 40
      const footerHeight = 200
      const canvasHeight = (photoCount * photoHeight) + (borderWidth * 2) + (photoSpacing * (photoCount - 1)) + footerHeight
      
      canvas.width = canvasWidth
      canvas.height = canvasHeight
      
      const selectedColor = frameColors.find(c => c.id === templateColor)?.hex || '#DC2626'
      
      ctx.fillStyle = selectedColor
      ctx.fillRect(0, 0, canvasWidth, canvasHeight)
      
      ctx.fillStyle = fontColor
      ctx.font = `bold 64px ${selectedFont}`
      ctx.textAlign = 'center'
      ctx.fillText('PIXORA', canvasWidth / 2, canvasHeight - 100)
      
      const loadPromises = capturedShots.map((shot, index) => {
        return new Promise((resolve) => {
          const img = new Image()
          img.src = shot
          img.crossOrigin = 'anonymous'
          
          img.onload = () => {
            const photoX = borderWidth
            const photoY = borderWidth + (index * (photoHeight + photoSpacing))
            const photoW = canvasWidth - (borderWidth * 2)
            const photoH = photoHeight
            
            const imgAspect = img.width / img.height
            const targetAspect = photoW / photoH
            
            let sx = 0, sy = 0, sw = img.width, sh = img.height
            
            if (imgAspect > targetAspect) {
              sw = img.height * targetAspect
              sx = (img.width - sw) / 2
            } else {
              sh = img.width / targetAspect
              sy = (img.height - sh) / 2
            }
            
            ctx.save()
            applyFilter(ctx, filter)
            ctx.imageSmoothingEnabled = true
            ctx.imageSmoothingQuality = 'high'
            ctx.drawImage(img, sx, sy, sw, sh, photoX, photoY, photoW, photoH)
            ctx.restore()
            
            resolve()
          }
          
          img.onerror = () => resolve()
        })
      })
      
      Promise.all(loadPromises).then(() => {
        // Add date below last image, aligned to right
        const lastPhotoIndex = capturedShots.length - 1
        const lastPhotoY = borderWidth + (lastPhotoIndex * (photoHeight + photoSpacing))
        const photoW = canvasWidth - (borderWidth * 2)
        const photoX = borderWidth
        
        const currentDate = new Date().toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric', 
          year: 'numeric' 
        })
        ctx.fillStyle = '#FFFFFF'
        ctx.font = '48px Arial'
        ctx.textAlign = 'right'
        ctx.fillText(currentDate, photoX + photoW, lastPhotoY + photoHeight + 50)
      })
    }
    
    renderStrip()
  }, [capturedShots, filter, templateColor, selectedFont, fontColor])

  const handleDownload = async () => {
    if (!canvasRef.current) return
    
    setIsDownloading(true)
    
    // Wait for canvas to be fully rendered
    await new Promise(resolve => setTimeout(resolve, 300))
    
    try {
      const canvas = canvasRef.current
      const dataUrl = canvas.toDataURL('image/png', 1.0)
      
      const link = document.createElement('a')
      link.download = `pixora-strip-${Date.now()}.png`
      link.href = dataUrl
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      setTimeout(() => {
        setIsDownloading(false)
        onTip()
      }, 300)
    } catch (error) {
      console.error('Download error:', error)
      alert('Download failed. Please try again.')
      setIsDownloading(false)
    }
  }

  const photoCount = capturedShots.length
  const canvasMaxWidth = photoCount <= 2 ? '250px' : '150px'

  return (
    <div className="h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 overflow-hidden flex flex-col items-center justify-center p-2 sm:p-4">
      <canvas
        ref={canvasRef}
        className="shadow-2xl bg-white animate-scale-in mb-2"
        style={{ maxWidth: canvasMaxWidth, width: '100%', height: 'auto' }}
      />

      {/* Social Links */}
      <div className="mb-2 text-center">
        <p className="text-gray-700 font-bold mb-1 text-xs">Follow us</p>
        <div className="flex gap-2 justify-center">
          <a href="https://www.facebook.com/ksosbdiv/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:scale-110 transition-transform">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>
          <a href="https://www.instagram.com/ksosbdiv/" target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:scale-110 transition-transform">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-2 animate-slide-up">
        <button
          onClick={onRestart}
          className="group px-3 sm:px-4 py-2 bg-white border-2 border-gray-400 text-gray-800 rounded-full font-semibold hover:bg-gray-50 transition-all duration-300 hover:scale-105 active:scale-95 text-xs"
        >
          <span className="inline-block group-hover:-translate-x-1 transition-transform">←</span> Retake
        </button>
        <button
          onClick={handleDownload}
          disabled={isDownloading}
          className="group px-4 sm:px-5 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full font-bold hover:scale-105 hover:shadow-2xl hover:shadow-red-500/30 active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl relative overflow-hidden text-xs"
        >
          <span className="relative z-10 flex items-center gap-2">
            {isDownloading ? 'Processing...' : 'Download'}
            {!isDownloading && (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            )}
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-800 opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>
      </div>
    </div>
  )
}
