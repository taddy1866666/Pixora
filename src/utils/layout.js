import { getTemplateConfig } from './templateConfig'
import { generateStripTemplate } from './svgTemplates'
import { applyColorVariant } from './templateGenerator'

export async function generateStrip(canvas, images, filter, frame, layoutId, colorVariant = 'original') {
  const ctx = canvas.getContext('2d')
  const config = getTemplateConfig(layoutId)
  
  // Set canvas size from template config
  canvas.width = config.canvasWidth
  canvas.height = config.canvasHeight

  // Get color for template
  const templateColor = getTemplateColor(colorVariant)
  
  // Generate SVG template
  const svgTemplate = generateStripTemplate(layoutId, templateColor)
  
  // Load SVG as image
  const templateImg = await loadSVGImage(svgTemplate)
  
  // Draw template background
  ctx.drawImage(templateImg, 0, 0, canvas.width, canvas.height)

  // Load all captured images
  const loadedImages = await Promise.all(
    images.map(imgSrc => loadImage(imgSrc))
  )

  // Draw each photo in designated positions
  loadedImages.forEach((img, idx) => {
    if (idx >= config.photoPositions.length) return
    
    const pos = config.photoPositions[idx]
    
    // Apply filter
    ctx.filter = getFilterCSS(filter)
    
    // Draw image with proper aspect ratio
    drawImageCover(ctx, img, pos.x, pos.y, pos.width, pos.height)
    
    ctx.filter = 'none'
  })
}

function getTemplateColor(variantId) {
  const colors = {
    'original': '#8B4513',
    'blue': '#2563eb',
    'pink': '#ec4899',
    'green': '#10b981',
    'purple': '#8b5cf6',
    'orange': '#f97316',
    'red': '#ef4444',
    'teal': '#14b8a6',
    'gold': '#f59e0b',
    'lavender': '#a78bfa'
  }
  return colors[variantId] || colors['original']
}

// Helper: Load SVG as image
function loadSVGImage(svgString) {
  return new Promise((resolve, reject) => {
    const blob = new Blob([svgString], { type: 'image/svg+xml' })
    const url = URL.createObjectURL(blob)
    const img = new Image()
    img.onload = () => {
      URL.revokeObjectURL(url)
      resolve(img)
    }
    img.onerror = reject
    img.src = url
  })
}

// Helper: Load image as Promise
function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

// Helper: Draw image covering area (like CSS object-fit: cover)
function drawImageCover(ctx, img, x, y, width, height) {
  const imgRatio = img.width / img.height
  const areaRatio = width / height
  
  let drawWidth, drawHeight, offsetX, offsetY
  
  if (imgRatio > areaRatio) {
    // Image is wider
    drawHeight = height
    drawWidth = img.width * (height / img.height)
    offsetX = (width - drawWidth) / 2
    offsetY = 0
  } else {
    // Image is taller
    drawWidth = width
    drawHeight = img.height * (width / img.width)
    offsetX = 0
    offsetY = (height - drawHeight) / 2
  }
  
  ctx.save()
  ctx.beginPath()
  ctx.rect(x, y, width, height)
  ctx.clip()
  ctx.drawImage(img, x + offsetX, y + offsetY, drawWidth, drawHeight)
  ctx.restore()
}

function getFilterCSS(filter) {
  switch (filter) {
    case 'grayscale': return 'grayscale(100%)'
    case 'sepia': return 'sepia(80%)'
    case 'saturate': return 'saturate(200%)'
    case 'contrast': return 'contrast(150%)'
    default: return 'none'
  }
}
