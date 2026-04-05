import { createContext, useContext, useState } from 'react'

const PhotoContext = createContext()

export const usePhoto = () => useContext(PhotoContext)

export const PhotoProvider = ({ children }) => {
  const [layout, setLayout] = useState(4) // 1-4 photos
  const [filter, setFilter] = useState('none')
  const [capturedPhotos, setCapturedPhotos] = useState([])
  const [selectedPhotos, setSelectedPhotos] = useState([])
  const [frame, setFrame] = useState('classic')
  const [step, setStep] = useState('setup') // setup, capture, select, edit, preview, tip

  const value = {
    layout, setLayout,
    filter, setFilter,
    capturedPhotos, setCapturedPhotos,
    selectedPhotos, setSelectedPhotos,
    frame, setFrame,
    step, setStep
  }

  return <PhotoContext.Provider value={value}>{children}</PhotoContext.Provider>
}
