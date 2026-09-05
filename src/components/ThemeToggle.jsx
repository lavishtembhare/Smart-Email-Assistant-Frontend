import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'

function SunIcon(props) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  )
}

function MoonIcon(props) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  )
}

export default function ThemeToggle({ mode, onToggle }) {
  const isDark = mode === 'dark'
  return (
    <Tooltip title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
      <IconButton
        onClick={onToggle}
        size="small"
        aria-label="Toggle visual theme"
        sx={{
          color: 'text.primary',
          border: '1px solid var(--border-subtle)',
          borderRadius: '10px',
          p: 1,
          backdropFilter: 'blur(8px)',
          background: 'var(--bg-surface)',
          transition: 'all 0.2s ease',
          '&:hover': {
            borderColor: 'var(--border-glow)',
            transform: 'scale(1.05)',
          },
        }}
      >
        {isDark ? <SunIcon /> : <MoonIcon />}
      </IconButton>
    </Tooltip>
  )
}