import { createTheme } from '@mui/material/styles'

export function getTheme(mode = 'dark') {
  const isDark = mode === 'dark'

  return createTheme({
    palette: {
      mode,
      primary: {
        main: isDark ? '#6366F1' : '#4F46E5',
        light: '#818CF8',
        dark: '#3730A3',
        contrastText: '#FFFFFF',
      },
      secondary: {
        main: isDark ? '#06B6D4' : '#0891B2',
        light: '#38BDF8',
        contrastText: '#FFFFFF',
      },
      background: {
        default: isDark ? '#07090E' : '#F8FAFC',
        paper: isDark ? '#0F1420' : '#FFFFFF',
      },
      text: {
        primary: isDark ? '#F8FAFC' : '#0F172A',
        secondary: isDark ? '#94A3B8' : '#64748B',
      },
      divider: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(15, 23, 42, 0.08)',
    },
    shape: {
      borderRadius: 12,
    },
    typography: {
      fontFamily: '"Plus Jakarta Sans", "Inter", -apple-system, sans-serif',
      h1: {
        fontWeight: 800,
        letterSpacing: '-0.03em',
      },
      h2: {
        fontWeight: 700,
        letterSpacing: '-0.02em',
      },
      h3: {
        fontWeight: 700,
        letterSpacing: '-0.015em',
      },
      h4: {
        fontWeight: 600,
        letterSpacing: '-0.01em',
      },
      button: {
        textTransform: 'none',
        fontWeight: 600,
        letterSpacing: '0.01em',
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 10,
            paddingInline: '1.4rem',
            paddingBlock: '0.65rem',
            transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            boxShadow: 'none',
            '&:hover': {
              transform: 'translateY(-1px)',
            },
          },
          containedSecondary: {
            background: 'linear-gradient(135deg, #6366F1 0%, #4F46E5 50%, #06B6D4 100%)',
            boxShadow: isDark
              ? '0 6px 20px rgba(99, 102, 241, 0.35)'
              : '0 6px 20px rgba(79, 70, 229, 0.25)',
            '&:hover': {
              background: 'linear-gradient(135deg, #4F46E5 0%, #4338CA 50%, #0891B2 100%)',
              boxShadow: isDark
                ? '0 8px 25px rgba(99, 102, 241, 0.5)'
                : '0 8px 25px rgba(79, 70, 229, 0.35)',
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: 10,
            backgroundColor: isDark ? 'rgba(15, 20, 32, 0.6)' : 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(8px)',
            '& fieldset': {
              borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(15, 23, 42, 0.12)',
            },
            '&:hover fieldset': {
              borderColor: isDark ? '#6366F1' : '#4F46E5',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#6366F1',
              boxShadow: '0 0 0 3px rgba(99, 102, 241, 0.18)',
            },
          },
        },
      },
    },
  })
}