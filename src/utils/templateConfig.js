// Template configurations for each layout
// Using generated SVG templates - NO PADDING

export const templateConfigs = {
  'strip-2': {
    canvasWidth: 400,
    canvasHeight: 800,
    photoPositions: [
      { x: 50, y: 50, width: 300, height: 350 },
      { x: 50, y: 440, width: 300, height: 350 }
    ]
  },
  
  'strip-3': {
    canvasWidth: 400,
    canvasHeight: 1200,
    photoPositions: [
      { x: 50, y: 50, width: 300, height: 360 },
      { x: 50, y: 450, width: 300, height: 360 },
      { x: 50, y: 850, width: 300, height: 360 }
    ]
  },
  
  'strip-4': {
    canvasWidth: 400,
    canvasHeight: 1600,
    photoPositions: [
      { x: 50, y: 50, width: 300, height: 370 },
      { x: 50, y: 460, width: 300, height: 370 },
      { x: 50, y: 870, width: 300, height: 370 },
      { x: 50, y: 1280, width: 300, height: 370 }
    ]
  }
}

// Helper function to get template config
export function getTemplateConfig(layoutId) {
  return templateConfigs[layoutId] || templateConfigs['strip-4']
}
