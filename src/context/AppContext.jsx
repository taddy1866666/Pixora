 import { createContext, useContext, useState } from 'react'

const AppContext = createContext()

export const useApp = () => useContext(AppContext)

export const AppProvider = ({ children }) => {
  const [layout, setLayout] = useState('') // No default selection
  const [filter, setFilter] = useState('none')
  const [capturedShots, setCapturedShots] = useState([])
  const [selectedShots, setSelectedShots] = useState([])
  const [frame, setFrame] = useState('classic')
  const [templateColor, setTemplateColor] = useState('white') // Template color variant
  const [selectedFont, setSelectedFont] = useState('Arial')
  const [fontColor, setFontColor] = useState('#000000')

  // Get photo count from layout ID
  const getPhotoCount = (layoutId) => {
    const layoutMap = {
      'strip-2': 2,
      'strip-3': 3,
      'strip-4': 4
    }
    return layoutMap[layoutId] || 4
  }

  const resetSession = () => {
    setLayout('')
    setFilter('none')
    setCapturedShots([])
    setSelectedShots([])
    setFrame('classic')
    setTemplateColor('white')
    setSelectedFont('Arial')
    setFontColor('#000000')
  }

  return (
    <AppContext.Provider value={{
      layout, 
      setLayout,
      photoCount: getPhotoCount(layout),
      filter, 
      setFilter,
      capturedShots, 
      setCapturedShots,
      selectedShots, 
      setSelectedShots,
      frame, 
      setFrame,
      templateColor,
      setTemplateColor,
      selectedFont,
      setSelectedFont,
      fontColor,
      setFontColor,
      resetSession
    }}>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100">
        {children}
      </div>
    </AppContext.Provider>
  )
}
