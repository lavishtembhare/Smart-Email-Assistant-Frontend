import { useState, useLayoutEffect } from 'react'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import LandingPage from './components/LandingPage.jsx'
import EmailGenerator from './components/EmailGenerator.jsx'
import { getTheme } from './theme.js'
import './App.css'

export default function App() {
  const [view, setView] = useState('landing') // 'landing' | 'app'
  const [mode, setMode] = useState('dark')

  useLayoutEffect(() => {
    document.documentElement.setAttribute('data-theme', mode)
  }, [mode])

  const toggleMode = () => setMode((m) => (m === 'dark' ? 'light' : 'dark'))

  return (
    <ThemeProvider theme={getTheme(mode)}>
      <CssBaseline />
      {view === 'landing' ? (
        <LandingPage mode={mode} onToggleMode={toggleMode} onGetStarted={() => setView('app')} />
      ) : (
        <EmailGenerator mode={mode} onToggleMode={toggleMode} onBack={() => setView('landing')} />
      )}
    </ThemeProvider>
  )
}