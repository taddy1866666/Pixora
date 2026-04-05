import { useState } from 'react'
import { useApp } from '../context/AppContext'
import LayoutSelector from '../components/LayoutSelector'
import Camera from '../components/Camera'
import ShotSelector from '../components/ShotSelector'
import Editor from '../components/Editor'
import Preview from '../components/Preview'
import TipModal from '../components/TipModal'

export default function Photobooth({ onBack }) {
  const [step, setStep] = useState('layout') // layout, capture, select, edit, preview, tip
  const { resetSession } = useApp()

  const handleBack = () => {
    if (step === 'layout') {
      onBack()
    } else if (step === 'capture') {
      setStep('layout')
    } else if (step === 'edit') {
      setStep('capture')
    } else if (step === 'preview') {
      setStep('edit')
    }
  }

  const handleRestart = () => {
    resetSession()
    setStep('layout')
  }

  return (
    <div className="min-h-screen overflow-hidden">
      <button
        onClick={handleBack}
        className="absolute top-4 left-4 md:top-6 md:left-6 px-4 md:px-6 py-2 md:py-3 bg-white/90 backdrop-blur-sm text-gray-800 rounded-full hover:bg-white hover:scale-105 active:scale-95 transition-all duration-300 z-50 shadow-lg font-semibold flex items-center gap-2 text-sm md:text-base"
      >
        <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back
      </button>

      {step === 'layout' && <LayoutSelector onNext={() => setStep('capture')} />}
      {step === 'capture' && <Camera onNext={() => setStep('edit')} />}
      {step === 'edit' && <Editor onNext={() => setStep('preview')} />}
      {step === 'preview' && <Preview onTip={() => setStep('tip')} onRestart={handleRestart} />}
      {step === 'tip' && <TipModal onClose={handleRestart} />}
    </div>
  )
}
