// Generate template variants with different colors

export async function generateTemplateVariants(baseTemplatePath) {
  const baseImg = await loadImage(baseTemplatePath)
  
  const colorVariants = [
    { id: 'original', name: 'Original', filter: 'none' },
    { id: 'blue', name: 'Ocean Blue', hue: 200, saturation: 1.2 },
    { id: 'pink', name: 'Pink Blush', hue: 330, saturation: 1.3 },
    { id: 'green', name: 'Forest Green', hue: 120, saturation: 1.1 },
    { id: 'purple', name: 'Royal Purple', hue: 280, saturation: 1.2 },
    { id: 'orange', name: 'Sunset Orange', hue: 30, saturation: 1.4 },
    { id: 'red', name: 'Cherry Red', hue: 0, saturation: 1.3 },
    { id: 'teal', name: 'Teal Dream', hue: 180, saturation: 1.2 },
    { id: 'gold', name: 'Golden Hour', hue: 45, saturation: 1.5 },
    { id: 'lavender', name: 'Lavender', hue: 270, saturation: 1.1 }
  ]
  
  return colorVariants
}

export function applyColorVariant(ctx, canvas, baseImg, variant) {
  // Draw base template
  ctx.drawImage(baseImg, 0, 0, canvas.width, canvas.height)
  
  if (variant.id === 'original') return
  
  // Apply color transformation
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
  const data = imageData.data
  
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]
    
    // Convert to HSL
    const hsl = rgbToHsl(r, g, b)
    
    // Adjust hue and saturation
    if (variant.hue !== undefined) {
      hsl[0] = variant.hue / 360
    }
    if (variant.saturation !== undefined) {
      hsl[1] = Math.min(1, hsl[1] * variant.saturation)
    }
    
    // Convert back to RGB
    const rgb = hslToRgb(hsl[0], hsl[1], hsl[2])
    data[i] = rgb[0]
    data[i + 1] = rgb[1]
    data[i + 2] = rgb[2]
  }
  
  ctx.putImageData(imageData, 0, 0)
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

function rgbToHsl(r, g, b) {
  r /= 255
  g /= 255
  b /= 255
  
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h, s, l = (max + min) / 2
  
  if (max === min) {
    h = s = 0
  } else {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break
      case g: h = ((b - r) / d + 2) / 6; break
      case b: h = ((r - g) / d + 4) / 6; break
    }
  }
  
  return [h, s, l]
}

function hslToRgb(h, s, l) {
  let r, g, b
  
  if (s === 0) {
    r = g = b = l
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1
      if (t > 1) t -= 1
      if (t < 1/6) return p + (q - p) * 6 * t
      if (t < 1/2) return q
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6
      return p
    }
    
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q
    
    r = hue2rgb(p, q, h + 1/3)
    g = hue2rgb(p, q, h)
    b = hue2rgb(p, q, h - 1/3)
  }
  
  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)]
}
