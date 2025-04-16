import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.css'
import './styles/mobile-optimizations.css'
import App from './App.jsx'
import { LanguageProvider } from './context/LanguageContext'
import { initPerformanceTracking } from './utils/performanceUtils'

// Initialize performance tracking
initPerformanceTracking()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </React.StrictMode>,
)
