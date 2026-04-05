export const generateStrip = (canvas, photos, filter, frame) => {
  const ctx = canvas.getContext('2d')
  const stripWidth = 400
  const photoHeight = 300
  const padding = 20
  const stripHeight = photos.length * photoHeight + (photos.length + 1) * padding

  canvas.width = stripWidth
  canvas.height = stripHeight

  // Background
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, stripWidth, stripHeight)

  // Draw photos
  photos.forEach((photoSrc, index) => {
    const img = new Image()
    img.src = photoSrc
    const y = padding + index * (photoHeight + padding)
    
    ctx.drawImage(img, padding, y, stripWidth - 2 * padding, photoHeight)

    // Apply filter
    if (filter === 'grayscale') {
      ctx.filter = 'grayscale(100%)'
    } else if (filter === 'sepia') {
      ctx.filter = 'sepia(100%)'
    }
  })

  // Frame border
  if (frame !== 'minimal') {
    ctx.strokeStyle = '#000000'
    ctx.lineWidth = frame === 'vintage' ? 8 : 4
    ctx.strokeRect(0, 0, stripWidth, stripHeight)
  }

  // Branding
  ctx.fillStyle = '#6366f1'
  ctx.font = 'bold 20px Arial'
  ctx.textAlign = 'center'
  ctx.fillText('📸 Pixora', stripWidth / 2, stripHeight - 10)
}
