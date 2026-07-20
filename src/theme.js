import { createTheme } from '@mui/material/styles'

export function getTheme(mode = 'light') {
  const isDark = mode === 'dark'

  return createTheme({
    palette: {
      mode,
      primary: { main: isDark ? '#B9C4D6' : '#1B2A4A' },
      secondary: { main: isDark ? '#E2665B' : '#B23A2E' },
      background: {
        default: isDark ? '#14181F' : '#F3F5F7',
        paper: isDark ? '#1E2430' : '#FFFFFF',
      },
      text: {
        primary: isDark ? '#F3F5F7' : '#2B2E33',
        secondary: isDark ? '#8A93A0' : '#6B7280',
      },
      divider: isDark ? 'rgba(255,255,255,0.12)' : '#D8DCE2',
    },
    shape: { borderRadius: 6 },
    typography: {
      fontFamily: '"IBM Plex Sans", -apple-system, sans-serif',
      // Headings reference the CSS var directly so they track the
      // data-theme toggle even though the value is baked into MUI's
      // generated stylesheet at theme-creation time.
      h1: { fontFamily: '"IBM Plex Mono", monospace', fontWeight: 600, color: 'var(--color-ink)' },
      h2: { fontFamily: '"IBM Plex Mono", monospace', fontWeight: 600, color: 'var(--color-ink)' },
      h3: { fontFamily: '"IBM Plex Mono", monospace', fontWeight: 600, color: 'var(--color-ink)' },
      h4: { fontFamily: '"IBM Plex Mono", monospace', fontWeight: 600, color: 'var(--color-ink)' },
      h5: { fontFamily: '"IBM Plex Mono", monospace', fontWeight: 600, color: 'var(--color-ink)' },
      h6: { fontFamily: '"IBM Plex Mono", monospace', fontWeight: 600, color: 'var(--color-ink)' },
      button: { textTransform: 'none', fontWeight: 600 },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: { borderRadius: 6, paddingInline: '1.25rem', paddingBlock: '0.6rem' },
        },
      },
    },
  })
}