import { useState, useRef, useEffect } from 'react'
import { getTemplateConfig } from '../utils/templateConfig'

export default function TemplateCalibrator({ layoutId = 'strip-4' }) {
  const canvasRef = useRef(null)
  const [config, setConfig] = useState(getTemplateConfig(layoutId))
  const [selectedPhoto, setSelectedPhoto] = useState(0)
  const [templateImg, setTemplateImg] = useState(null)

  useEffect(() => {
    const img = new Image()
    img.onload = () => {
      setTemplateImg(img)
      drawCanvas()
    }
    img.src = config.templatePath
  }, [config.templatePath])

  useEffect(() => {
    drawCanvas()
  }, [config, selectedPhoto, templateImg])

  const drawCanvas = () => {
    if (!canvasRef.current || !templateImg) return
    
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    
    canvas.width = config.canvasWidth
    canvas.height = config.canvasHeight
    
    // Draw template
    ctx.drawImage(templateImg, 0, 0, canvas.width, canvas.height)
    
    // Draw photo position boxes
    config.photoPositions.forEach((pos, idx) => {
      ctx.strokeStyle = idx === selectedPhoto ? '#ff0000' : '#00ff00'
      ctx.lineWidth = 3
      ctx.strokeRect(pos.x, pos.y, pos.width, pos.height)
      
      // Label
      ctx.fillStyle = idx === selectedPhoto ? '#ff0000' : '#00ff00'
      ctx.font = 'bold 24px Arial'
      ctx.fillText(`Photo ${idx + 1}`, pos.x + 10, pos.y + 30)
    })
  }

  const updatePosition = (field, value) => {
    const newConfig = { ...config }
    newConfig.photoPositions[selectedPhoto][field] = parseInt(value)
    setConfig(newConfig)
  }

  const exportConfig = () => {
    console.log('Copy this to templateConfig.js:')
    console.log(JSON.stringify(config, null, 2))
    alert('Check console for config!')
  }

  const pos = config.photoPositions[selectedPhoto]

  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-4">Template Position Calibrator</h1>
      
      <div className="flex gap-8">
        <div>
          <canvas ref={canvasRef} className="border-4 border-white" />
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block mb-2">Select Photo:</label>
            <select 
              value={selectedPhoto} 
              onChange={(e) => setSelectedPhoto(parseInt(e.target.value))}
              className="px-4 py-2 bg-gray-800 rounded"
            >
              {config.photoPositions.map((_, idx) => (
                <option key={idx} value={idx}>Photo {idx + 1}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2">X Position:</label>
            <input 
              type="number" 
              value={pos.x}
              onChange={(e) => updatePosition('x', e.target.value)}
              className="px-4 py-2 bg-gray-800 rounded w-full"
            />
          </div>

          <div>
            <label className="block mb-2">Y Position:</label>
            <input 
              type="number" 
              value={pos.y}
              onChange={(e) => updatePosition('y', e.target.value)}
              className="px-4 py-2 bg-gray-800 rounded w-full"
            />
          </div>

          <div>
            <label className="block mb-2">Width:</label>
            <input 
              type="number" 
              value={pos.width}
              onChange={(e) => updatePosition('width', e.target.value)}
              className="px-4 py-2 bg-gray-800 rounded w-full"
            />
          </div>

          <div>
            <label className="block mb-2">Height:</label>
            <input 
              type="number" 
              value={pos.height}
              onChange={(e) => updatePosition('height', e.target.value)}
              className="px-4 py-2 bg-gray-800 rounded w-full"
            />
          </div>

          <button
            onClick={exportConfig}
            className="px-6 py-3 bg-green-600 rounded-lg font-bold w-full"
          >
            Export Config
          </button>

          <div className="text-xs opacity-60 mt-4">
            <p>Red box = Selected photo</p>
            <p>Green boxes = Other photos</p>
            <p>Adjust positions to match template</p>
          </div>
        </div>
      </div>
    </div>
  )
}
