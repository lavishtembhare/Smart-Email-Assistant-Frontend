import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import ThemeToggle from './ThemeToggle.jsx'

function NibIcon(props) {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 3 4 17l-1 4 4-1L21 6a2.1 2.1 0 0 0-3-3Z" />
      <path d="M13.5 5.5 18 10" />
    </svg>
  )
}

function ThreadIcon(props) {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M7 12v5a3 3 0 0 0 6 0V7a2 2 0 1 1 4 0v9" />
      <circle cx="7" cy="9" r="2" />
    </svg>
  )
}

function SendIcon(props) {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 11.5 20 4l-7 17-3-7-7-2.5Z" />
    </svg>
  )
}

const features = [
  {
    icon: NibIcon,
    title: 'Match any tone',
    body: 'Formal for the client, casual for the team. Pick a tone and the draft follows it.',
  },
  {
    icon: ThreadIcon,
    title: 'Keep the context',
    body: 'Paste the whole thread. The reply responds to what was actually asked, not a generic template.',
  },
  {
    icon: SendIcon,
    title: 'Ready to send',
    body: 'No filler, no clichés. A draft you can send as-is, or tweak in a few seconds.',
  },
]

const steps = [
  { n: '01', title: 'Paste the email', body: "Drop in the message you're replying to, thread and all." },
  { n: '02', title: 'Choose a tone', body: 'Formal, friendly, informal, or professional. Optional.' },
  { n: '03', title: 'Copy the reply', body: 'Read it once, send it, or adjust a line and move on.' },
]

export default function LandingPage({ onGetStarted, mode, onToggleMode }) {
  return (
    <Box>
      <Box component="nav" className="nav-bar">
        <Container maxWidth="lg" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', py: 1.5 }}>
          <Stack direction="row" alignItems="center" spacing={1.25}>
            <Box className="nav-mark">@</Box>
            <Typography sx={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem', color: 'var(--color-ink)' }}>
              smart-email-assistant
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1}>
            <ThemeToggle mode={mode} onToggle={onToggleMode} />
            <Button variant="outlined" color="primary" onClick={onGetStarted} size="small">
              Open app
            </Button>
          </Stack>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ pt: { xs: 6, md: 10 }, pb: { xs: 8, md: 12 } }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: { xs: 6, md: 5 }, alignItems: 'center' }}>
          <Box sx={{ flex: '1 1 50%' }}>
            <Typography className="eyebrow">draft → reply</Typography>
            <Typography variant="h1" sx={{ fontSize: { xs: '2rem', md: '2.7rem' }, lineHeight: 1.15, mb: 3 }}>
              Turn any email into the reply you'd actually send.
            </Typography>
            <Typography sx={{ color: 'var(--color-muted)', fontSize: '1.05rem', maxWidth: 460, mb: 4 }}>
              Paste in what landed in your inbox, pick a tone, and get a clean, ready-to-send draft in seconds.
              No blank cursor, no re-reading it five times.
            </Typography>
            <Button variant="contained" color="secondary" size="large" onClick={onGetStarted}>
              Try it free
            </Button>
          </Box>

          <Box sx={{ flex: '1 1 50%', width: '100%' }}>
            <Box className="redline-card">
              <Box className="redline-card-head">Re: quarterly numbers</Box>
              <Box className="redline-card-body">
                <Typography className="redline-before">
                  hey can u send me the info asap, kinda swamped rn
                </Typography>
                <Typography className="redline-after">
                  Hi Sam — happy to send that over. Could you confirm the deadline you're working with?
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>

      <Box sx={{ background: 'var(--color-paper-alt)', py: { xs: 8, md: 10 } }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 4 }}>
            {features.map(({ icon: Icon, title, body }) => (
              <Box key={title} className="feature-card">
                <Icon className="feature-icon" />
                <Typography variant="h4" sx={{ fontSize: '1.05rem', mt: 2, mb: 1 }}>
                  {title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'var(--color-muted)' }}>
                  {body}
                </Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <Typography className="eyebrow" sx={{ textAlign: 'center' }}>
          the process
        </Typography>
        <Typography variant="h2" sx={{ fontSize: { xs: '1.5rem', md: '1.9rem' }, textAlign: 'center', mb: 6 }}>
          How it works
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 4 }}>
          {steps.map((step) => (
            <Box key={step.n} className="step-card">
              <Typography className="step-number">{step.n}</Typography>
              <Typography variant="h4" sx={{ fontSize: '1.05rem', mb: 1 }}>
                {step.title}
              </Typography>
              <Typography variant="body2" sx={{ color: 'var(--color-muted)' }}>
                {step.body}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>

      <Box className="cta-band">
        <Container maxWidth="md" sx={{ textAlign: 'center', py: { xs: 8, md: 10 } }}>
          <Typography variant="h2" sx={{ fontSize: { xs: '1.5rem', md: '2rem' }, color: '#FFFFFF', mb: 3 }}>
            Stop staring at the cursor.
          </Typography>
          <Button variant="contained" color="secondary" size="large" onClick={onGetStarted}>
            Open the generator
          </Button>
        </Container>
      </Box>

      <Box component="footer" sx={{ py: 4, textAlign: 'center' }}>
        <Typography variant="body2" sx={{ color: 'var(--color-muted)' }}>
          Smart Email Assistant — built to get you out of your inbox faster.
        </Typography>
      </Box>
    </Box>
  )
}