# 📸 Pixora - AI Photobooth

## 🚀 Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

### 3. Open Browser
Navigate to `http://localhost:5173`

## 📦 What's Included

- ⚛️ React 18
- 🎨 Tailwind CSS
- 📸 react-webcam
- 🧠 face-api.js (ready for AI integration)
- ⚡ Vite (fast build tool)

## 🎯 Features

✅ Layout selection (1-4 photos)
✅ Filter preview
✅ Extra shot capture
✅ AI-suggested best shots
✅ Photo selection & arrangement
✅ Custom editing (filters, frames)
✅ Final preview
✅ Tip screen (GCash/Maya)
✅ Download photobooth strip

## 🛠️ Tech Stack

- **Frontend**: React + Vite
- **Styling**: Tailwind CSS
- **Camera**: WebRTC / react-webcam
- **Image Processing**: Canvas API
- **AI**: face-api.js (mock for now)
- **State**: React Context

## 📁 Project Structure

```
pixora/
├── src/
│   ├── components/
│   │   ├── Camera.jsx
│   │   ├── LayoutSelector.jsx
│   │   ├── FilterSelector.jsx
│   │   ├── ShotSelector.jsx
│   │   ├── Editor.jsx
│   │   ├── Preview.jsx
│   │   └── TipModal.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   └── Photobooth.jsx
│   ├── context/
│   │   └── AppContext.jsx
│   ├── utils/
│   │   ├── ai.js
│   │   └── layout.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## 🎨 Customization

### Add Real QR Codes
Edit `src/components/TipModal.jsx` and replace placeholder divs with actual QR code images.

### Enable Real AI Detection
Uncomment face-api.js code in `src/utils/ai.js` and download models from face-api.js repository.

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
```bash
npm i -g vercel
vercel
```

## 📝 Notes

- Camera permission required
- Works best on HTTPS (required for camera access in production)
- Mobile responsive design
