import { useRef, useEffect, useState } from 'react'
import { useApp } from '../context/AppContext'
import { FRAME_COLORS } from '../constants/frameColors'

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
      const borderWidth = 0
      const photoHeight = 500
      const photoSpacing = 40
      const footerHeight = 200
      const canvasHeight = (photoCount * photoHeight) + (borderWidth * 2) + (photoSpacing * (photoCount - 1)) + footerHeight

      canvas.width = canvasWidth
      canvas.height = canvasHeight

      const selectedColor = FRAME_COLORS.find(c => c.id === templateColor)?.hex || '#000000'

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
    <div className="min-h-dvh bg-pixora-bg text-pixora-fg flex flex-col md:flex-row">

      {/* Preview Section - Centered */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-8 w-full">
        <div className="flex flex-col items-center w-full max-w-sm md:max-w-md lg:max-w-lg mx-auto">
          <div className="flex items-center justify-center gap-0 mb-6 sm:mb-8">
            {['Layout', 'Capture', 'Edit', 'Preview'].map((item, idx) => (
              <div
                key={item}
                className={`px-4 sm:px-6 py-2 text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase border transition-all duration-300 ${idx === 2 ? 'bg-white text-black border-white' : 'bg-black text-white border-white/20'
                  }`}
              >
                {item}
              </div>
            ))}
          </div>
          <h2 className="text-base md:text-lg font-black mb-3 text-center text-white">Preview</h2>

          <div className="relative w-full mx-auto" style={{ maxWidth: previewMaxWidth }}>
            <canvas
              ref={canvasRef}
              className="bg-white w-full h-auto shadow-xl shadow-black/30"
            />

            {capturedShots.map((_, index) => {
              const canvasWidth = 800
              const borderWidth = 0
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
                  className="absolute cursor-move hover:bg-black/10 transition-colors"
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
      <div className="w-full md:w-96 lg:w-[26rem] panel-muted border-t md:border-t-0 md:border-l flex flex-col overflow-hidden md:max-h-dvh rounded-none">
        <div className="text-center px-3 md:px-5 pt-4 pb-3 border-b border-white/10 flex-shrink-0">
          <h2 className="text-base md:text-lg font-black text-white">Customize</h2>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-white/10 px-2 md:px-5 flex-shrink-0">
          <button
            onClick={() => setActiveTab('frames')}
            className={`flex-1 py-3 px-2 text-sm font-bold transition-colors duration-200 flex flex-col items-center gap-1 ${activeTab === 'frames'
              ? 'text-white border-b-2 border-white'
              : 'text-pixora-muted hover:text-white'
              }`}
          >
            <svg className="w-4 h-4 xs:w-5 xs:h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M5 3a2 2 0 00-2 2v6h2V5h6V3H5zm9 0v2h6v6h2V5a2 2 0 00-2-2h-6zm6 13h-2v6h-6v2h8a2 2 0 002-2v-6zM7 13H5v6a2 2 0 002 2h6v-2H7v-6z" />
            </svg>
            <span>FRAMES</span>
          </button>
          <button
            onClick={() => setActiveTab('filters')}
            className={`flex-1 py-3 px-2 text-sm font-bold transition-colors duration-200 flex flex-col items-center gap-1 ${activeTab === 'filters'
              ? 'text-white border-b-2 border-white'
              : 'text-pixora-muted hover:text-white'
              }`}
          >
            <svg className="w-4 h-4 xs:w-5 xs:h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M4 6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 2a2 2 0 100 4 2 2 0 000-4z" />
            </svg>
            <span>FILTERS</span>
          </button>
          <button
            onClick={() => setActiveTab('fonts')}
            className={`flex-1 py-3 px-2 text-sm font-bold transition-colors duration-200 flex flex-col items-center gap-1 ${activeTab === 'fonts'
              ? 'text-white border-b-2 border-white'
              : 'text-pixora-muted hover:text-white'
              }`}
          >
            <svg className="w-4 h-4 xs:w-5 xs:h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M15.5 1h-8C6.12 1 5 2.12 5 3.5v17C5 21.88 6.12 23 7.5 23h8c1.38 0 2.5-1.12 2.5-2.5v-17C18 2.12 16.88 1 15.5 1zm-4 21c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4.5-4H7V4h9v14z" />
            </svg>
            <span>FONTS</span>
          </button>
        </div>

        {/* Content Area - Scrollable */}
        <div className="flex-1 overflow-y-auto p-3 md:p-5 min-h-0">
          {/* FRAMES Tab */}
          {activeTab === 'frames' && (
            <div className="animate-fade-in">
              <div className="mb-2 xs:mb-3">
                <p className="text-sm font-semibold text-pixora-muted mb-2">Frame color</p>
                <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                  {FRAME_COLORS.map(({ id, label, hex, checkClass }) => (
                    <button
                      key={id}
                      onClick={() => setTemplateColor(id)}
                      className={`group relative transition-all duration-200 overflow-hidden h-11 rounded-none ${templateColor === id
                        ? 'ring-2 ring-white shadow-lg shadow-black/30'
                        : 'ring-1 ring-white/15 hover:ring-white/30'
                        }`}
                      title={label}
                      aria-label={`Set frame color to ${label}`}
                    >
                      <div className="h-full w-full" style={{ backgroundColor: hex }} />
                      {templateColor === id && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <svg className={`w-4 h-4 drop-shadow-lg ${checkClass}`} fill="currentColor" viewBox="0 0 20 20">
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
                    className={`px-3 py-2.5 rounded-lg transition-colors duration-200 text-sm font-bold min-h-11 ${filter === id
                      ? 'btn-primary'
                      : 'btn-ghost'
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
                <p className="text-sm font-semibold text-pixora-muted mb-2">Font family</p>
                <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-2 xs:gap-2.5 md:gap-1.5">
                  {fonts.map(({ id, label }) => (
                    <button
                      key={id}
                      onClick={() => setSelectedFont(id)}
                      className={`px-3 py-2.5 rounded-lg transition-colors duration-200 text-sm font-bold min-h-11 ${selectedFont === id
                        ? 'btn-primary'
                        : 'btn-ghost'
                        }`}
                      style={{ fontFamily: id }}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold text-pixora-muted mb-2">Font color</p>
                <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 xs:gap-2.5 md:gap-2">
                  {fontColors.map(({ id, label, hex }) => (
                    <button
                      key={id}
                      onClick={() => setFontColor(hex)}
                      className={`px-3 py-2.5 rounded-lg transition-colors duration-200 text-sm font-bold flex items-center justify-center gap-2 min-h-11 ${fontColor === hex
                        ? 'btn-primary'
                        : 'btn-ghost'
                        }`}
                    >
                      <div className="w-4 h-4 rounded border border-white/30" style={{ backgroundColor: hex }} />
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Continue Button */}
        <div className="px-3 md:px-5 pb-4 border-t border-white/10 bg-pixora-surface mt-auto">
          <button
            onClick={onNext}
            className="btn-primary btn-pill group w-full mt-3 px-4 md:px-6 py-3 font-bold text-base flex items-center justify-center gap-2 min-h-11"
          >
            <span className="flex items-center gap-2 whitespace-nowrap">
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
