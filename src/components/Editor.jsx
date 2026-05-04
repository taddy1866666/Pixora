import { useRef, useEffect, useState } from 'react'
import { useApp } from '../context/AppContext'

export default function Editor({ onNext }) {
  const canvasRef = useRef(null)
  const { capturedShots, setCapturedShots, filter, setFilter, templateColor, setTemplateColor, selectedFont, setSelectedFont, fontColor, setFontColor } = useApp()
  const [draggedIndex, setDraggedIndex] = useState(null)
  const [activeTab, setActiveTab] = useState('frames')

  const photoCount = capturedShots.length
  const previewMaxWidth = photoCount <= 2 ? '250px' : '150px'

  const handleDragStart = (index) => {
    setDraggedIndex(index)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleDrop = (dropIndex) => {
    if (draggedIndex === null || draggedIndex === dropIndex) return
    
    const newShots = [...capturedShots]
    const draggedItem = newShots[draggedIndex]
    newShots.splice(draggedIndex, 1)
    newShots.splice(dropIndex, 0, draggedItem)
    
    setCapturedShots(newShots)
    setDraggedIndex(null)
  }

  const filters = [
    { id: 'none', label: 'None' },
    { id: 'grayscale', label: 'B&W' },
    { id: 'sepia', label: 'Sepia' },
    { id: 'pop', label: 'Pop' },
    { id: 'muted', label: 'Muted' },
    { id: 'bright', label: 'Bright' },
    { id: 'dim', label: 'Dim' },
    { id: 'cherry', label: 'Cherry' },
    { id: 'glacier', label: 'Glacier' },
    { id: 'noir', label: 'Noir' },
    { id: 'fuji', label: 'Fuji' },
    { id: '90s', label: '90s' },
    { id: 'clean', label: 'Clean' },
    { id: 'glowy', label: 'Glowy' },
    { id: 'ruppert', label: 'Ruppert' },
    { id: 'flash', label: 'Flash' },
    { id: 'minimal', label: 'Minimal' }
  ]
  
  const fonts = [
    { id: 'Arial', label: 'Arial' },
    { id: 'Helvetica', label: 'Helvetica' },
    { id: 'Times New Roman', label: 'Times' },
    { id: 'Georgia', label: 'Georgia' },
    { id: 'Courier New', label: 'Courier' },
    { id: 'Verdana', label: 'Verdana' },
    { id: 'Impact', label: 'Impact' },
    { id: 'Comic Sans MS', label: 'Comic' },
    { id: 'Trebuchet MS', label: 'Trebuchet' }
  ]
  
  const fontColors = [
    { id: 'white', label: 'White', hex: '#FFFFFF' },
    { id: 'black', label: 'Black', hex: '#000000' }
  ]
  
  const frameColors = [
    { id: 'white', label: 'White', color: 'bg-white', hex: '#FFFFFF' },
    { id: 'soft-pink', label: 'Soft Pink', color: 'bg-pink-200', hex: '#FBCFE8' },
    { id: 'soft-blue', label: 'Soft Blue', color: 'bg-blue-200', hex: '#BFDBFE' },
    { id: 'soft-purple', label: 'Soft Purple', color: 'bg-purple-200', hex: '#E9D5FF' },
    { id: 'soft-green', label: 'Soft Green', color: 'bg-green-200', hex: '#BBF7D0' },
    { id: 'soft-yellow', label: 'Soft Yellow', color: 'bg-yellow-200', hex: '#FEF08A' },
    { id: 'soft-orange', label: 'Soft Orange', color: 'bg-orange-200', hex: '#FED7AA' },
    { id: 'hard-red', label: 'Hard Red', color: 'bg-red-600', hex: '#DC2626' },
    { id: 'hard-blue', label: 'Hard Blue', color: 'bg-blue-600', hex: '#2563EB' },
    { id: 'hard-purple', label: 'Hard Purple', color: 'bg-purple-600', hex: '#9333EA' },
    { id: 'hard-green', label: 'Hard Green', color: 'bg-green-600', hex: '#16A34A' },
    { id: 'hard-orange', label: 'Hard Orange', color: 'bg-orange-600', hex: '#EA580C' },
    { id: 'hard-black', label: 'Hard Black', color: 'bg-gray-900', hex: '#111827' }
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
        ctx.fillStyle = fontColor
        ctx.font = `48px ${selectedFont}`
        ctx.textAlign = 'right'
        ctx.fillText(currentDate, photoX + photoW, lastPhotoY + photoHeight + 50)
      })
    }
    
    renderStrip()
  }, [capturedShots, filter, templateColor, selectedFont, fontColor])

  return (
    <div className="h-screen bg-gradient-to-br from-indigo-50 via-white to-rose-50 overflow-hidden flex flex-col md:flex-row relative">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-indigo-200/10 to-transparent rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-rose-200/10 to-transparent rounded-full filter blur-3xl pointer-events-none" />
      
      {/* Preview Section - Centered */}
      <div className="flex-1 flex items-center justify-center p-1 xs:p-2 sm:p-3 md:p-4 w-full md:w-auto relative z-10" style={{ marginRight: window.innerWidth >= 768 ? '-160px' : '0' }}>
        <div className="flex flex-col items-center w-full max-w-xs xs:max-w-sm md:max-w-none mx-auto">
          <h2 className="text-base xs:text-lg md:text-xl font-black mb-1 xs:mb-2 text-center bg-gradient-to-r from-indigo-900 to-rose-900 bg-clip-text text-transparent">Preview</h2>
          
          <div className="relative w-full mx-auto" style={{ maxWidth: previewMaxWidth }}>
            <canvas
              ref={canvasRef}
              className="shadow-2xl shadow-rose-500/20 bg-white w-full h-auto rounded-xl border border-rose-100"
            />
          
          {capturedShots.map((_, index) => {
            const canvasWidth = 800
            const borderWidth = 50
            const photoHeight = 500
            const photoSpacing = 40
            const footerHeight = 200
            const canvasHeight = (photoCount * photoHeight) + (borderWidth * 2) + (photoSpacing * (photoCount - 1)) + footerHeight
            
            const photoY = borderWidth + (index * (photoHeight + photoSpacing))
            const photoX = borderWidth
            const photoW = canvasWidth - (borderWidth * 2)
            
            const topPercent = (photoY / canvasHeight) * 100
            const heightPercent = (photoHeight / canvasHeight) * 100
            const leftPercent = (photoX / canvasWidth) * 100
            const widthPercent = (photoW / canvasWidth) * 100
            
            return (
              <div
                key={index}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={handleDragOver}
                onDrop={() => handleDrop(index)}
                className="absolute cursor-move hover:bg-red-500 hover:bg-opacity-10 transition-all"
                style={{
                  top: `${topPercent}%`,
                  height: `${heightPercent}%`,
                  left: `${leftPercent}%`,
                  width: `${widthPercent}%`
                }}
                title={`Photo ${index + 1}`}
              />
            )
          })}
          </div>
        </div>
      </div>

      {/* Sidebar - Right Side */}
      <div className="w-full md:w-80 bg-gradient-to-b from-white to-indigo-50/30 shadow-2xl shadow-rose-500/10 flex flex-col overflow-y-auto max-h-[55vh] sm:max-h-[50vh] md:max-h-full md:overflow-hidden border-l border-rose-100/50 relative z-10">
        <div className="text-center px-2 xs:px-3 md:px-5 pt-2 xs:pt-3 md:pt-5 pb-0 md:pb-2 border-b border-rose-100">
          <h2 className="text-base xs:text-lg md:text-xl font-black bg-gradient-to-r from-indigo-900 to-rose-900 bg-clip-text text-transparent">Customize</h2>
        </div>
        
        {/* Tab Navigation */}
        <div className="flex border-b border-rose-100 px-2 xs:px-3 md:px-5 mt-2 md:mt-3 bg-gradient-to-r from-transparent via-rose-50/20 to-transparent">
          <button
            onClick={() => setActiveTab('frames')}
            className={`flex-1 py-2 xs:py-2.5 md:py-3 px-1 xs:px-2 text-xs xs:text-sm font-bold transition-all duration-300 flex flex-col items-center gap-0.5 xs:gap-1 ${
              activeTab === 'frames'
                ? 'text-rose-700 border-b-2 xs:border-b-3 border-rose-500 shadow-lg shadow-rose-200/20'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <svg className="w-4 h-4 xs:w-5 xs:h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M5 3a2 2 0 00-2 2v6h2V5h6V3H5zm9 0v2h6v6h2V5a2 2 0 00-2-2h-6zm6 13h-2v6h-6v2h8a2 2 0 002-2v-6zM7 13H5v6a2 2 0 002 2h6v-2H7v-6z" />
            </svg>
            <span>FRAMES</span>
          </button>
          <button
            onClick={() => setActiveTab('filters')}
            className={`flex-1 py-2 xs:py-2.5 md:py-3 px-1 xs:px-2 text-xs xs:text-sm font-bold transition-all duration-300 flex flex-col items-center gap-0.5 xs:gap-1 ${
              activeTab === 'filters'
                ? 'text-rose-700 border-b-2 xs:border-b-3 border-rose-500 shadow-lg shadow-rose-200/20'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <svg className="w-4 h-4 xs:w-5 xs:h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M4 6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 2a2 2 0 100 4 2 2 0 000-4z" />
            </svg>
            <span>FILTERS</span>
          </button>
          <button
            onClick={() => setActiveTab('fonts')}
            className={`flex-1 py-2 xs:py-2.5 md:py-3 px-1 xs:px-2 text-xs xs:text-sm font-bold transition-all duration-300 flex flex-col items-center gap-0.5 xs:gap-1 ${
              activeTab === 'fonts'
                ? 'text-rose-700 border-b-2 xs:border-b-3 border-rose-500 shadow-lg shadow-rose-200/20'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <svg className="w-4 h-4 xs:w-5 xs:h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M15.5 1h-8C6.12 1 5 2.12 5 3.5v17C5 21.88 6.12 23 7.5 23h8c1.38 0 2.5-1.12 2.5-2.5v-17C18 2.12 16.88 1 15.5 1zm-4 21c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4.5-4H7V4h9v14z" />
            </svg>
            <span>FONTS</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-2 xs:p-3 md:p-5">
          {/* FRAMES Tab */}
          {activeTab === 'frames' && (
            <div className="animate-fade-in">
              <div className="mb-2 xs:mb-3">
                <p className="text-xs xs:text-xs md:text-sm font-semibold text-gray-600 mb-1.5 xs:mb-2">Frame Color</p>
                <div className="grid grid-cols-3 xs:grid-cols-4 md:grid-cols-4 gap-1 xs:gap-1.5 md:gap-2">
                  {frameColors.map(({ id, label, color }) => (
                    <button
                      key={id}
                      onClick={() => setTemplateColor(id)}
                      className={`group relative rounded-lg transition-all duration-300 overflow-hidden h-7 xs:h-8 md:h-10 ${
                        templateColor === id 
                          ? 'ring-3 ring-gray-800 scale-105 shadow-lg' 
                          : 'hover:scale-105 ring-2 ring-gray-200'
                      }`}
                      title={label}
                    >
                      <div className={`${color} h-full w-full`} />
                      {templateColor === id && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <svg className="w-3.5 xs:w-4 h-3.5 xs:h-4 text-white drop-shadow-lg" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* FILTERS Tab */}
          {activeTab === 'filters' && (
            <div className="animate-fade-in">
              <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-2 xs:gap-2.5 md:gap-1.5">
                {filters.map(({ id, label }) => (
                  <button
                    key={id}
                    onClick={() => setFilter(id)}
                    className={`px-2 xs:px-2.5 py-1.5 xs:py-2 rounded-lg transition-all duration-300 text-xs xs:text-sm font-bold ${
                      filter === id 
                        ? 'bg-red-600 text-white scale-105 shadow-lg' 
                        : 'bg-white hover:bg-gray-50 hover:scale-105 border-2 border-gray-300'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* FONTS Tab */}
          {activeTab === 'fonts' && (
            <div className="animate-fade-in">
              <div className="mb-2 xs:mb-3 md:mb-4">
                <p className="text-xs xs:text-sm md:text-sm font-semibold text-gray-600 mb-1.5 xs:mb-2">Font Family</p>
                <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-2 xs:gap-2.5 md:gap-1.5">
                  {fonts.map(({ id, label }) => (
                    <button
                      key={id}
                      onClick={() => setSelectedFont(id)}
                      className={`px-2 xs:px-2.5 py-1.5 xs:py-2 rounded-lg transition-all duration-300 text-xs xs:text-sm font-bold ${
                        selectedFont === id 
                          ? 'bg-red-600 text-white scale-105 shadow-lg' 
                          : 'bg-white hover:bg-gray-50 hover:scale-105 border-2 border-gray-300'
                      }`}
                      style={{ fontFamily: id }}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs xs:text-sm md:text-sm font-semibold text-gray-600 mb-1.5 xs:mb-2">Font Color</p>
                <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 xs:gap-2.5 md:gap-2">
                  {fontColors.map(({ id, label, hex }) => (
                    <button
                      key={id}
                      onClick={() => setFontColor(hex)}
                      className={`px-2.5 xs:px-3 py-1.5 xs:py-2 rounded-lg transition-all duration-300 text-xs xs:text-sm font-bold flex items-center justify-center gap-1.5 xs:gap-2 ${
                        fontColor === hex 
                          ? 'bg-red-600 text-white scale-105 shadow-lg' 
                          : 'bg-white hover:bg-gray-50 hover:scale-105 border-2 border-gray-300'
                      }`}
                    >
                      <div className="w-3 xs:w-4 h-3 xs:h-4 rounded border-2 border-gray-400" style={{ backgroundColor: hex }} />
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Continue Button */}
        <div className="px-2 xs:px-3 md:px-5 pb-2 xs:pb-3 md:pb-5 border-t border-rose-100 bg-gradient-to-r from-rose-50/30 to-indigo-50/30 mt-auto">
          <button
            onClick={onNext}
            className="group w-full mt-2 px-3 xs:px-4 md:px-6 py-2 xs:py-2.5 md:py-3 bg-gradient-to-r from-rose-500 via-rose-600 to-rose-700 text-white rounded-full font-bold text-xs xs:text-sm md:text-base hover:scale-105 hover:shadow-xl hover:shadow-rose-500/50 active:scale-95 transition-all duration-300 shadow-lg flex items-center justify-center gap-1 xs:gap-1.5 md:gap-2 relative overflow-hidden min-h-10 xs:min-h-11"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-rose-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <span className="relative z-10 flex items-center gap-1 xs:gap-1.5 md:gap-2 whitespace-nowrap">
              Continue
              <svg className="w-4 xs:w-4 md:w-5 h-4 xs:h-4 md:h-5 flex-shrink-0 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}
