import IconButton from '@mui/material/IconButton'

function SunIcon(props) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  )
}

function MoonIcon(props) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4 8.5 8.5 0 1 0 20 14.5Z" />
    </svg>
  )
}

export default function ThemeToggle({ mode, onToggle }) {
  const isDark = mode === 'dark'
  return (
    <IconButton
      onClick={onToggle}
      size="small"
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      sx={{ color: 'var(--color-ink)' }}
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
    </IconButton>
  )
}