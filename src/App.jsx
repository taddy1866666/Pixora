import { useState } from 'react'
import { AppProvider } from './context/AppContext'
import Home from './pages/Home'
import Photobooth from './pages/Photobooth'

function App() {
  const [currentPage, setCurrentPage] = useState('home')

  return (
    <AppProvider>
      {currentPage === 'home' && <Home onStart={() => setCurrentPage('photobooth')} />}
      {currentPage === 'photobooth' && <Photobooth onBack={() => setCurrentPage('home')} />}
    </AppProvider>
  )
}

export default App
