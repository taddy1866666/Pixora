# 📸 Pixora - Template Upload Guide

## 📁 Folder Structure Created:
```
public/
└── images/
    └── templates/
        ├── strip-1.png
        ├── strip-3.png
        ├── strip-4.png
        ├── horizontal-4.png
        ├── square-4.png
        └── strip-6.png
```

## 🎨 Template Specifications:

### 1. **strip-1.png** (Single Photo)
- Canvas: 400 x 600 px
- Photo Area: 300 x 400 px at position (50, 50)

### 2. **strip-3.png** (3 Vertical Strip)
- Canvas: 400 x 1200 px
- Photo Areas (300 x 350 px each):
  - Photo 1: (50, 50)
  - Photo 2: (50, 425)
  - Photo 3: (50, 800)

### 3. **strip-4.png** (4 Vertical Strip)
- Canvas: 400 x 1600 px
- Photo Areas (300 x 350 px each):
  - Photo 1: (50, 50)
  - Photo 2: (50, 425)
  - Photo 3: (50, 800)
  - Photo 4: (50, 1175)

### 4. **horizontal-4.png** (4 Horizontal)
- Canvas: 1600 x 400 px
- Photo Areas (350 x 300 px each):
  - Photo 1: (50, 50)
  - Photo 2: (425, 50)
  - Photo 3: (800, 50)
  - Photo 4: (1175, 50)

### 5. **square-4.png** (2x2 Grid)
- Canvas: 800 x 800 px
- Photo Areas (350 x 350 px each):
  - Photo 1: (50, 50) - Top Left
  - Photo 2: (425, 50) - Top Right
  - Photo 3: (50, 425) - Bottom Left
  - Photo 4: (425, 425) - Bottom Right

### 6. **strip-6.png** (6 Vertical Strip)
- Canvas: 400 x 2000 px
- Photo Areas (300 x 280 px each):
  - Photo 1: (50, 50)
  - Photo 2: (50, 355)
  - Photo 3: (50, 660)
  - Photo 4: (50, 965)
  - Photo 5: (50, 1270)
  - Photo 6: (50, 1575)

## 🎯 Design Tips:

1. **Leave Photo Areas Transparent or Light**
   - Photos will be placed in designated positions
   - Use transparent PNG for best results

2. **Add Decorative Elements**
   - Borders, frames, patterns
   - Branding/logos
   - Text overlays

3. **High Resolution**
   - Use 300 DPI for print quality
   - Scale up dimensions if needed

4. **Safe Zones**
   - Keep important elements away from edges
   - Consider 0.25" margin for printing

## 🔧 How to Customize Positions:

Edit `src/utils/templateConfig.js` to adjust photo positions:

```javascript
'strip-4': {
  templatePath: '/images/templates/strip-4.png',
  canvasWidth: 400,
  canvasHeight: 1600,
  photoPositions: [
    { x: 50, y: 50, width: 300, height: 350 },
    // Add more positions...
  ]
}
```

## ✅ Upload Your Templates:

1. Place PNG files in `public/images/templates/`
2. Name them exactly as specified above
3. Restart dev server: `npm run dev`
4. Templates will automatically load!

## 🎨 Fallback:

If no template is found, the system uses:
- Solid color background
- Simple borders
- Clean minimal design
