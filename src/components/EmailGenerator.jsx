import { useState } from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import Stack from '@mui/material/Stack'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Chip from '@mui/material/Chip'
import ThemeToggle from './ThemeToggle.jsx'
import logo from '../assets/logo.svg'

export const API_GENERATE_URL = import.meta.env.VITE_API_GENERATE_URL
export const API_COMPOSE_URL = import.meta.env.VITE_API_COMPOSE_URL

const TONES = [
  { value: '', label: 'Neutral & Natural' },
  { value: 'professional', label: 'Professional' },
  { value: 'formal', label: 'Executive Formal' },
  { value: 'friendly', label: 'Warm & Friendly' },
  { value: 'informal', label: 'Concise & Casual' },
]

export default function EmailGenerator({ onBack, mode: themeMode, onToggleMode }) {
  const [mode, setMode] = useState('reply')
  const [emailContent, setEmailContent] = useState('')
  const [recipientEmail, setRecipientEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [additionalContext, setAdditionalContext] = useState('')
  const [tone, setTone] = useState('')
  const [generatedReply, setGeneratedReply] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const handleModeChange = (_e, newMode) => {
    if (!newMode) return
    setMode(newMode)
    setGeneratedReply('')
    setError('')
  }

  const handleSubmit = async () => {
    setLoading(true)
    setError('')
    setGeneratedReply('')
    try {
      const isCompose = mode === 'compose'
      const response = await fetch(isCompose ? API_COMPOSE_URL : API_GENERATE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          isCompose
            ? { recipientEmail, subject, tone, additionalContext }
            : { emailContent, tone }
        ),
      })

      if (!response.ok) {
        const message = await response.text()
        throw new Error(message || `Request failed (${response.status})`)
      }

      const reply = await response.text()
      setGeneratedReply(reply)
    } catch (err) {
      setError('Could not generate a reply. Ensure your backend server is active.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(generatedReply)
    setCopied(true)
  }

  const handleReset = () => {
    setEmailContent('')
    setRecipientEmail('')
    setSubject('')
    setAdditionalContext('')
    setTone('')
    setGeneratedReply('')
    setError('')
  }

  const canSubmit = mode === 'compose' ? !!subject : !!emailContent

  return (
    <Box sx={{ minHeight: '100vh', pb: 8 }}>
      {/* App Navbar */}
      <Box component="nav" className="nav-glass">
        <Container maxWidth="md" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', py: 1.5 }}>
          <Button onClick={onBack} size="small" sx={{ color: 'text.secondary' }}>
            ← Back to Home
          </Button>
          <Stack direction="row" alignItems="center" spacing={1.25}>
            <Box component="img" src={logo} alt="" sx={{ width: 28, height: 28, borderRadius: '8px' }} />
            <Typography variant="h6" sx={{ fontSize: '0.95rem', fontWeight: 700 }}>
              Smart Assistant
            </Typography>
          </Stack>
          <ThemeToggle mode={themeMode} onToggle={onToggleMode} />
        </Container>
      </Box>

      <Container maxWidth="md" sx={{ pt: { xs: 4, md: 6 } }}>
        {/* Title & Mode Switcher */}
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant="h1" sx={{ fontSize: { xs: '1.8rem', md: '2.2rem' }, mb: 1 }}>
            {mode === 'compose' ? 'Compose New Email' : 'Reply with Context'}
          </Typography>
          <Typography sx={{ color: 'text.secondary', fontSize: '0.95rem', maxWidth: 480, mx: 'auto' }}>
            {mode === 'compose'
              ? 'Provide the key details and let the assistant craft a ready-to-send draft.'
              : 'Paste what landed in your inbox to get an intelligent, tailored response.'}
          </Typography>
        </Box>

        {/* Segmented Mode Selector */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
          <Tabs
            value={mode}
            onChange={handleModeChange}
            sx={{
              background: 'var(--bg-surface)',
              p: 0.5,
              borderRadius: '12px',
              border: '1px solid var(--border-subtle)',
              '& .MuiTabs-indicator': {
                height: '100%',
                borderRadius: '8px',
                backgroundColor: 'primary.main',
                opacity: 0.15,
              },
            }}
          >
            <Tab value="reply" label="⚡ Reply to Thread" sx={{ textTransform: 'none', fontWeight: 600, minHeight: 42 }} />
            <Tab value="compose" label="✍️ Compose Fresh" sx={{ textTransform: 'none', fontWeight: 600, minHeight: 42 }} />
          </Tabs>
        </Box>

        {/* Input Card Form */}
        <Box className="glass-card" sx={{ p: { xs: 3, md: 4 } }}>
          {mode === 'compose' ? (
            <Stack spacing={2.5}>
              <TextField
                fullWidth
                label="Recipient Email (Optional)"
                placeholder="client@acme.com"
                value={recipientEmail}
                onChange={(e) => setRecipientEmail(e.target.value)}
              />
              <TextField
                fullWidth
                required
                label="Subject Line"
                placeholder="Q3 Roadmap review & sprint alignment"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Context & Key Points to Include"
                placeholder="Mention that design deliverables are delayed by 2 days, but overall milestone remains on track..."
                value={additionalContext}
                onChange={(e) => setAdditionalContext(e.target.value)}
              />
            </Stack>
          ) : (
            <TextField
              fullWidth
              multiline
              rows={7}
              label="Inbound Email Thread"
              placeholder="Paste the message or full email thread here..."
              value={emailContent}
              onChange={(e) => setEmailContent(e.target.value)}
            />
          )}

          {/* Tone Selector & Quick Preset Chips */}
          <Box sx={{ mt: 3, mb: 3 }}>
            <FormControl fullWidth sx={{ mb: 1.5 }}>
              <InputLabel id="tone-label">Tone Calibration</InputLabel>
              <Select
                labelId="tone-label"
                label="Tone Calibration"
                value={tone}
                onChange={(e) => setTone(e.target.value)}
              >
                {TONES.map((t) => (
                  <MenuItem key={t.value} value={t.value}>
                    {t.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {TONES.map((t) => (
                <Chip
                  key={t.value}
                  label={t.label}
                  size="small"
                  clickable
                  variant={tone === t.value ? 'filled' : 'outlined'}
                  color={tone === t.value ? 'primary' : 'default'}
                  onClick={() => setTone(t.value)}
                  sx={{ borderRadius: '6px' }}
                />
              ))}
            </Stack>
          </Box>

          {/* Action Row */}
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 3 }}>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={handleSubmit}
              disabled={!canSubmit || loading}
              fullWidth
              sx={{ py: 1.4 }}
            >
              {loading ? (
                <CircularProgress size={22} sx={{ color: '#fff' }} />
              ) : mode === 'compose' ? (
                'Generate Email Draft'
              ) : (
                'Generate Intelligent Reply'
              )}
            </Button>
            {(emailContent || recipientEmail || subject || additionalContext || generatedReply) && !loading && (
              <Button variant="outlined" onClick={handleReset} sx={{ color: 'text.secondary', borderColor: 'divider' }}>
                Reset
              </Button>
            )}
          </Stack>
        </Box>

        {/* Error Feedback */}
        {error && (
          <Alert severity="error" sx={{ mt: 3, borderRadius: 2 }}>
            {error}
          </Alert>
        )}

        {/* Output Area */}
        {generatedReply && (
          <Box sx={{ mt: 5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
              <Typography variant="h4" sx={{ fontSize: '1.1rem' }}>
                Generated Output
              </Typography>
              <Chip label="Ready to Send" color="success" size="small" sx={{ fontWeight: 600 }} />
            </Box>
            <Box className="glass-card" sx={{ p: { xs: 3, md: 4 } }}>
              <TextField
                fullWidth
                multiline
                rows={8}
                value={generatedReply}
                slotProps={{ input: { readOnly: true } }}
                sx={{
                  mb: 2.5,
                  '& .MuiOutlinedInput-root': {
                    fontFamily: 'var(--font-sans)',
                    fontSize: '1rem',
                    lineHeight: 1.6,
                  },
                }}
              />
              <Stack direction="row" spacing={2}>
                <Button variant="contained" color="secondary" onClick={handleCopy}>
                  {copied ? '✓ Copied to Clipboard' : 'Copy Draft'}
                </Button>
                <Button variant="outlined" onClick={handleSubmit} sx={{ borderColor: 'divider', color: 'text.secondary' }}>
                  Regenerate
                </Button>
              </Stack>
            </Box>
          </Box>
        )}
      </Container>

      <Snackbar
        open={copied}
        autoHideDuration={2500}
        onClose={() => setCopied(false)}
        message="Draft successfully copied to clipboard"
      />
    </Box>
  )
}