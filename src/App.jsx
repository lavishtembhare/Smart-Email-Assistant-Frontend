import { useState, useLayoutEffect } from 'react'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import LandingPage from './components/LandingPage.jsx'
import EmailGenerator from './components/EmailGenerator.jsx'
import { getTheme } from './theme.js'
import './App.css'

function App() {
  const [view, setView] = useState('landing') // 'landing' | 'app'
  const [mode, setMode] = useState('dark') // 'light' | 'dark'

  // useLayoutEffect (not useEffect) so the data-theme attribute is set
  // before the browser paints, avoiding a flash of the other mode.
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

export default App