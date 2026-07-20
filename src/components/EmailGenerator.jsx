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
import ThemeToggle from './ThemeToggle.jsx'

const API_URL = 'http://localhost:8080/api/email/generate'

export default function EmailGenerator({ onBack, mode, onToggleMode }) {
  const [emailContent, setEmailContent] = useState('')
  const [tone, setTone] = useState('')
  const [generatedReply, setGeneratedReply] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    setError('')
    setGeneratedReply('')
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emailContent, tone }),
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
    setTone('')
    setGeneratedReply('')
    setError('')
  }

  return (
    <Box className="generator-shell">
      <Box component="nav" className="generator-nav">
        <Container maxWidth="md" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', py: 1.5 }}>
          <Button onClick={onBack} size="small">
            ← Back
          </Button>
          <Typography sx={{ fontFamily: 'var(--font-display)', fontSize: '0.9rem', color: 'var(--color-ink)' }}>
            smart-email-assistant
          </Typography>
          <ThemeToggle mode={mode} onToggle={onToggleMode} />
        </Container>
      </Box>

      <Container maxWidth="md" sx={{ py: { xs: 5, md: 8 } }}>
        <Typography variant="h1" sx={{ fontSize: { xs: '1.5rem', md: '1.9rem' }, mb: 1 }}>
          Generate a reply
        </Typography>
        <Typography sx={{ color: 'var(--color-muted)', mb: 4 }}>
          Paste the email below, pick a tone if you want one, and get a draft you can send.
        </Typography>

        <Box className="generator-card">
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

          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleSubmit}
              disabled={!emailContent || loading}
              fullWidth
            >
              {loading ? <CircularProgress size={22} sx={{ color: '#fff' }} /> : 'Generate reply'}
            </Button>
            {(emailContent || generatedReply) && !loading && (
              <Button variant="text" onClick={handleReset}>
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
              Generated reply
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
              <Button variant="outlined" onClick={handleCopy}>
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