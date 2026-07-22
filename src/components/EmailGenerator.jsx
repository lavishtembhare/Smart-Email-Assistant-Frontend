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
import ThemeToggle from './ThemeToggle.jsx'
import logo from '../assets/logo.svg'

const API_GENERATE_URL = 'http://localhost:8080/api/email/generate'
const API_COMPOSE_URL = 'http://localhost:8080/api/email/compose'

export default function EmailGenerator({ onBack, mode: themeMode, onToggleMode }) {
  const [mode, setMode] = useState('reply') // 'reply' | 'compose'

  // reply fields
  const [emailContent, setEmailContent] = useState('')
  // compose fields
  const [recipientEmail, setRecipientEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [additionalContext, setAdditionalContext] = useState('')

  // shared
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
      setError('Could not generate a reply. Check that the server is running and try again.')
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
    <Box className="generator-shell">
      <Box component="nav" className="generator-nav">
        <Container maxWidth="md" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', py: 1.5, gap: 1 }}>
          <Button onClick={onBack} size="small" sx={{ flexShrink: 0 }}>
            ← Back
          </Button>
          <Stack direction="row" alignItems="center" spacing={1.25} sx={{ minWidth: 0 }}>
            <Box component="img" src={logo} alt="" sx={{ width: 24, height: 24, borderRadius: '5px', display: 'block', flexShrink: 0 }} />
            <Typography
              noWrap
              sx={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.9rem',
                color: 'var(--color-ink)',
                display: { xs: 'none', sm: 'block' },
              }}
            >
              smart-email-assistant
            </Typography>
          </Stack>
          <Box sx={{ flexShrink: 0 }}>
            <ThemeToggle mode={themeMode} onToggle={onToggleMode} />
          </Box>
        </Container>
      </Box>

      <Container maxWidth="md" sx={{ py: { xs: 4, sm: 6, md: 8 } }}>
        <Typography variant="h1" sx={{ fontSize: { xs: '1.35rem', sm: '1.65rem', md: '1.9rem' }, mb: 1 }}>
          {mode === 'compose' ? 'Compose an email' : 'Generate a reply'}
        </Typography>
        <Typography sx={{ color: 'var(--color-muted)', mb: 3, fontSize: { xs: '0.9rem', sm: '1rem' } }}>
          {mode === 'compose'
            ? 'Fill in the recipient and subject, and get a draft you can send.'
            : 'Paste the email below, pick a tone if you want one, and get a draft you can send.'}
        </Typography>

        <Tabs value={mode} onChange={handleModeChange} variant="fullWidth" sx={{ mb: 3 }}>
          <Tab value="reply" label="Reply" />
          <Tab value="compose" label="Compose" />
        </Tabs>

        <Box className="generator-card">
          {mode === 'compose' ? (
            <>
              <TextField
                fullWidth
                variant="outlined"
                label="Recipient email"
                value={recipientEmail}
                onChange={(e) => setRecipientEmail(e.target.value)}
                sx={{ mb: 3 }}
              />
              <TextField
                fullWidth
                variant="outlined"
                label="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                sx={{ mb: 3 }}
              />
              <TextField
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                label="Additional context (optional)"
                value={additionalContext}
                onChange={(e) => setAdditionalContext(e.target.value)}
                sx={{ mb: 3 }}
              />
            </>
          ) : (
            <TextField
              fullWidth
              multiline
              rows={7}
              variant="outlined"
              label="Original email content"
              value={emailContent}
              onChange={(e) => setEmailContent(e.target.value)}
              sx={{ mb: 3 }}
            />
          )}

          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel id="tone-label">Tone (optional)</InputLabel>
            <Select
              labelId="tone-label"
              label="Tone (optional)"
              value={tone}
              onChange={(e) => setTone(e.target.value)}
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="formal">Formal</MenuItem>
              <MenuItem value="informal">Informal</MenuItem>
              <MenuItem value="friendly">Friendly</MenuItem>
              <MenuItem value="professional">Professional</MenuItem>
            </Select>
          </FormControl>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleSubmit}
              disabled={!canSubmit || loading}
              fullWidth
            >
              {loading ? (
                <CircularProgress size={22} sx={{ color: '#fff' }} />
              ) : mode === 'compose' ? (
                'Compose email'
              ) : (
                'Generate reply'
              )}
            </Button>
            {(emailContent || recipientEmail || subject || additionalContext || generatedReply) && !loading && (
              <Button variant="text" onClick={handleReset} sx={{ width: { xs: '100%', sm: 'auto' }, flexShrink: 0 }}>
                Clear
              </Button>
            )}
          </Stack>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mt: 3 }}>
            {error}
          </Alert>
        )}

        {generatedReply && (
          <Box sx={{ mt: 5 }}>
            <Typography variant="h4" sx={{ fontSize: '1.05rem', mb: 2 }}>
              {mode === 'compose' ? 'Generated email' : 'Generated reply'}
            </Typography>
            <Box className="generator-card">
              <TextField
                fullWidth
                multiline
                rows={7}
                variant="outlined"
                value={generatedReply}
                slotProps={{ input: { readOnly: true } }}
                sx={{ mb: 2 }}
              />
              <Button variant="outlined" onClick={handleCopy} sx={{ width: { xs: '100%', sm: 'auto' } }}>
                Copy to clipboard
              </Button>
            </Box>
          </Box>
        )}
      </Container>

      <Snackbar
        open={copied}
        autoHideDuration={2000}
        onClose={() => setCopied(false)}
        message="Copied to clipboard"
      />
    </Box>
  )
}