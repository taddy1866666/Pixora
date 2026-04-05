export function generateStripTemplate(layoutId, color = '#FFFFFF') {
  const templates = {
    'strip-2': generateDuo(),
    'strip-3': generateTriple(),
    'strip-4': generateClassic()
  }
  
  return templates[layoutId] || templates['strip-4']
}

// Classic - 4 photos vertical strip
function generateClassic() {
  return `
    <svg width="400" height="1600" xmlns="http://www.w3.org/2000/svg">
      <!-- White Background -->
      <rect width="400" height="1600" fill="#FFFFFF"/>
      
      <!-- Outer border -->
      <rect x="20" y="20" width="360" height="1560" fill="none" stroke="#9333EA" stroke-width="6" rx="15"/>
      
      <!-- Photo 1 -->
      <rect x="50" y="50" width="300" height="370" fill="#F3F4F6" stroke="#D1D5DB" stroke-width="1" rx="8"/>
      
      <!-- Divider 1 -->
      <line x1="70" y1="440" x2="330" y2="440" stroke="#9333EA" stroke-width="2" stroke-dasharray="8,4"/>
      
      <!-- Photo 2 -->
      <rect x="50" y="460" width="300" height="370" fill="#F3F4F6" stroke="#D1D5DB" stroke-width="1" rx="8"/>
      
      <!-- Divider 2 -->
      <line x1="70" y1="850" x2="330" y2="850" stroke="#9333EA" stroke-width="2" stroke-dasharray="8,4"/>
      
      <!-- Photo 3 -->
      <rect x="50" y="870" width="300" height="370" fill="#F3F4F6" stroke="#D1D5DB" stroke-width="1" rx="8"/>
      
      <!-- Divider 3 -->
      <line x1="70" y1="1260" x2="330" y2="1260" stroke="#9333EA" stroke-width="2" stroke-dasharray="8,4"/>
      
      <!-- Photo 4 -->
      <rect x="50" y="1280" width="300" height="370" fill="#F3F4F6" stroke="#D1D5DB" stroke-width="1" rx="8"/>
    </svg>
  `
}

// Triple - 3 photos vertical strip
function generateTriple() {
  return `
    <svg width="400" height="1200" xmlns="http://www.w3.org/2000/svg">
      <!-- White Background -->
      <rect width="400" height="1200" fill="#FFFFFF"/>
      
      <!-- Outer border -->
      <rect x="20" y="20" width="360" height="1160" fill="none" stroke="#9333EA" stroke-width="6" rx="15"/>
      
      <!-- Photo 1 -->
      <rect x="50" y="50" width="300" height="360" fill="#F3F4F6" stroke="#D1D5DB" stroke-width="1" rx="8"/>
      
      <!-- Divider 1 -->
      <line x1="70" y1="430" x2="330" y2="430" stroke="#9333EA" stroke-width="2" stroke-dasharray="8,4"/>
      
      <!-- Photo 2 -->
      <rect x="50" y="450" width="300" height="360" fill="#F3F4F6" stroke="#D1D5DB" stroke-width="1" rx="8"/>
      
      <!-- Divider 2 -->
      <line x1="70" y1="830" x2="330" y2="830" stroke="#9333EA" stroke-width="2" stroke-dasharray="8,4"/>
      
      <!-- Photo 3 -->
      <rect x="50" y="850" width="300" height="360" fill="#F3F4F6" stroke="#D1D5DB" stroke-width="1" rx="8"/>
    </svg>
  `
}

// Duo - 2 photos vertical strip
function generateDuo() {
  return `
    <svg width="400" height="800" xmlns="http://www.w3.org/2000/svg">
      <!-- White Background -->
      <rect width="400" height="800" fill="#FFFFFF"/>
      
      <!-- Outer border -->
      <rect x="20" y="20" width="360" height="760" fill="none" stroke="#9333EA" stroke-width="6" rx="15"/>
      
      <!-- Photo 1 -->
      <rect x="50" y="50" width="300" height="350" fill="#F3F4F6" stroke="#D1D5DB" stroke-width="1" rx="8"/>
      
      <!-- Divider -->
      <line x1="70" y1="420" x2="330" y2="420" stroke="#9333EA" stroke-width="2" stroke-dasharray="8,4"/>
      
      <!-- Photo 2 -->
      <rect x="50" y="440" width="300" height="350" fill="#F3F4F6" stroke="#D1D5DB" stroke-width="1" rx="8"/>
    </svg>
  `
}

function adjustBrightness(color, percent) {
  const num = parseInt(color.replace('#', ''), 16)
  const amt = Math.round(2.55 * percent)
  const R = (num >> 16) + amt
  const G = (num >> 8 & 0x00FF) + amt
  const B = (num & 0x0000FF) + amt
  return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
    (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
    (B < 255 ? B < 1 ? 0 : B : 255))
    .toString(16).slice(1)
}
