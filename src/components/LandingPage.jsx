import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import ThemeToggle from './ThemeToggle.jsx'
import HeroScene from './HeroScene.jsx'
import logo from '../assets/logo.svg'

function SparkIcon(props) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z" />
    </svg>
  )
}

function LayersIcon(props) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.9a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
      <path d="m22 12.5-8.58 3.9a2 2 0 0 1-1.66 0L2 12.5" />
      <path d="m22 17.5-8.58 3.9a2 2 0 0 1-1.66 0L2 17.5" />
    </svg>
  )
}

function SendFastIcon(props) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M22 2 11 13" />
      <path d="m22 2-7 20-4-9-9-4Z" />
    </svg>
  )
}

function ExtensionIcon(props) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M9 4h4a1 1 0 0 1 1 1v2.2a1.8 1.8 0 1 0 0 3.6V13a1 1 0 0 1-1 1h-2.2a1.8 1.8 0 1 1-3.6 0H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h2.2a1.8 1.8 0 1 0 3.6 0V5a1 1 0 0 1 1-1Z" />
    </svg>
  )
}

const features = [
  {
    icon: SparkIcon,
    title: 'Adaptive Voice & Tone',
    body: 'Seamlessly shift between executive formal, peer friendly, concise bulleted, or consultative tones with zero boilerplate.',
  },
  {
    icon: LayersIcon,
    title: 'Deep Thread Context',
    body: 'Paste messy, multi-turn email conversations. The engine extracts the true underlying request and addresses each point accurately.',
  },
  {
    icon: SendFastIcon,
    title: 'Instant Ready-to-Send Drafts',
    body: 'No robotic greetings, no awkward pleasantries. Polished, high-impact emails ready for one-click review and dispatch.',
  },
]

const steps = [
  { n: '01', title: 'Feed the Context', body: 'Paste the incoming email thread or outline your recipient and objectives.' },
  { n: '02', title: 'Calibrate Tone', body: 'Select professional, friendly, formal, or let the assistant infer the nuance.' },
  { n: '03', title: 'Copy & Send', body: 'Instant draft delivery with clean layout, natural phrasing, and zero fluff.' },
]

export default function LandingPage({ onGetStarted, mode, onToggleMode }) {
  return (
    <Box sx={{ position: 'relative', overflowX: 'hidden' }}>
      {/* Top Navbar */}
      <Box component="nav" className="nav-glass">
        <Container maxWidth="lg" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', py: 1.75 }}>
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <Box component="img" src={logo} alt="Smart Email Assistant" sx={{ width: 34, height: 34, display: 'block' }} />
            <Typography variant="h6" sx={{ fontWeight: 800, fontSize: '1.05rem', letterSpacing: '-0.02em' }}>
              Smart Email Assistant
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <ThemeToggle mode={mode} onToggle={onToggleMode} />
            <Button
              component="a"
              href="#extension"
              variant="text"
              startIcon={<ExtensionIcon />}
              sx={{ display: { xs: 'none', sm: 'inline-flex' }, color: 'text.secondary' }}
            >
              Extension
            </Button>
            <Button variant="contained" color="secondary" onClick={onGetStarted}>
              Launch App
            </Button>
          </Stack>
        </Container>
      </Box>

      {/* Hero Section with Interactive 3D Three.js Scene */}
      <Box sx={{ position: 'relative', pt: { xs: 8, sm: 10, md: 14 }, pb: { xs: 8, sm: 10, md: 14 } }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1.1fr 0.9fr' }, gap: 6, alignItems: 'center' }}>
            <Box sx={{ zIndex: 1 }}>
              <Box className="hero-pill">
                <span>✨</span> Next-Gen AI Email Intelligence
              </Box>
              <Typography variant="h1" sx={{ fontSize: { xs: '2.4rem', sm: '3.2rem', md: '3.8rem' }, lineHeight: 1.1, mb: 2.5 }}>
                Master your inbox <br />
                <span className="gradient-headline">in your exact voice.</span>
              </Typography>
              <Typography sx={{ color: 'text.secondary', fontSize: { xs: '1.05rem', md: '1.15rem' }, lineHeight: 1.6, maxWidth: 520, mb: 4 }}>
                Transform complex threads into clear, persuasive, context-aware responses in seconds. Built for developers, leaders, and high-velocity teams.
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Button variant="contained" color="secondary" size="large" onClick={onGetStarted}>
                  Start Generating Free →
                </Button>
                <Button
                  component="a"
                  href="#extension"
                  variant="outlined"
                  size="large"
                  startIcon={<ExtensionIcon />}
                  sx={{ borderColor: 'divider', color: 'text.primary' }}
                >
                  Get Chrome Extension
                </Button>
              </Stack>
            </Box>

            {/* Interactive Three.js or Dynamic Transformation Preview Card */}
            <Box sx={{ position: 'relative', minHeight: 420 }}>
              <Box className="hero-scene-container">
                <HeroScene mode={mode} />
              </Box>
              <Box className="comparison-card" sx={{ position: 'relative', zIndex: 2, mt: { xs: 0, md: 2 } }}>
                <Box className="comparison-header">
                  <Typography sx={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'text.secondary' }}>
                    <span className="status-dot" /> LIVE INFERENCE DEMO
                  </Typography>
                  <Typography sx={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'primary.main' }}>
                    Model: Gemini Flash
                  </Typography>
                </Box>
                <Box className="sample-incoming">
                  <strong>Thread Context:</strong> "Hey, can you review the sprint deployment notes and let me know if we can ship by 3 PM?"
                </Box>
                <Box className="sample-outgoing">
                  "Hi Sarah — I’ve reviewed the staging logs. The API migration is green and test coverage passed. We’re on schedule to deploy at 3:00 PM EST. I’ll monitor the release channels directly."
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Feature Grid */}
      <Box sx={{ py: { xs: 8, md: 12 }, borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 7 }}>
            <Typography variant="h2" sx={{ fontSize: { xs: '1.8rem', md: '2.3rem' }, mb: 1.5 }}>
              Engineered for absolute clarity
            </Typography>
            <Typography sx={{ color: 'text.secondary', maxWidth: 500, mx: 'auto' }}>
              Eliminate writer's block with contextual awareness that feels written by your sharpest self.
            </Typography>
          </Box>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 3.5 }}>
            {features.map(({ icon: Icon, title, body }) => (
              <Box key={title} className="glass-card" sx={{ p: 3.5 }}>
                <Box sx={{ color: 'primary.main', mb: 2 }}>
                  <Icon />
                </Box>
                <Typography variant="h4" sx={{ fontSize: '1.2rem', mb: 1.25 }}>
                  {title}
                </Typography>
                <Typography sx={{ color: 'text.secondary', fontSize: '0.92rem', lineHeight: 1.6 }}>
                  {body}
                </Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Process Steps */}
      <Container maxWidth="lg" sx={{ py: { xs: 9, md: 14 } }}>
        <Typography variant="h2" sx={{ fontSize: { xs: '1.7rem', md: '2.2rem' }, textAlign: 'center', mb: 6 }}>
          Three clicks to zero inbox
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 4 }}>
          {steps.map((step) => (
            <Box key={step.n} className="glass-card" sx={{ p: 3.5 }}>
              <Box className="step-index-badge">{step.n}</Box>
              <Typography variant="h4" sx={{ fontSize: '1.15rem', mb: 1 }}>
                {step.title}
              </Typography>
              <Typography sx={{ color: 'text.secondary', fontSize: '0.92rem', lineHeight: 1.6 }}>
                {step.body}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>

      {/* Chrome Extension Section */}
      <Box id="extension" sx={{ py: { xs: 8, md: 12 }, background: 'rgba(99, 102, 241, 0.03)' }}>
        <Container maxWidth="lg">
          <Box className="glass-card" sx={{ p: { xs: 4, sm: 6, md: 8 } }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1.2fr 0.8fr' }, gap: 5, alignItems: 'center' }}>
              <Box>
                <Typography className="hero-pill">Gmail Native Integration</Typography>
                <Typography variant="h2" sx={{ fontSize: { xs: '1.8rem', md: '2.3rem' }, mb: 2 }}>
                  Compose inside Gmail without tab hopping.
                </Typography>
                <Typography sx={{ color: 'text.secondary', lineHeight: 1.7, mb: 4 }}>
                  Install the Chrome extension to inject an AI action pill straight into the Gmail editor. Draft replies in-situ using keyboard shortcuts.
                </Typography>
                <Button
                  component="a"
                  href="/smart-email-assistant-extension.zip"
                  download
                  variant="contained"
                  color="secondary"
                  size="large"
                  startIcon={<ExtensionIcon />}
                >
                  Download Extension (.zip)
                </Button>
              </Box>
              <Box sx={{ p: 3, borderRadius: 3, border: '1px solid var(--border-subtle)', background: 'var(--bg-surface-elevated)' }}>
                <Typography sx={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'primary.main', mb: 2 }}>
                  // Quick Install Guide
                </Typography>
                <Typography sx={{ fontSize: '0.9rem', color: 'text.secondary', mb: 1.5 }}>
                  <strong>1.</strong> Extract the downloaded <code>.zip</code> folder.
                </Typography>
                <Typography sx={{ fontSize: '0.9rem', color: 'text.secondary', mb: 1.5 }}>
                  <strong>2.</strong> Navigate to <code>chrome://extensions</code> & toggle <strong>Developer mode</strong>.
                </Typography>
                <Typography sx={{ fontSize: '0.9rem', color: 'text.secondary' }}>
                  <strong>3.</strong> Click <strong>Load unpacked</strong> and select the unzipped directory.
                </Typography>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Bottom CTA Glow Banner */}
      <Container maxWidth="md" sx={{ py: { xs: 8, md: 12 } }}>
        <Box className="cta-glow-container">
          <Typography variant="h2" sx={{ fontSize: { xs: '1.8rem', sm: '2.4rem' }, mb: 2 }}>
            Never let an email stall your momentum.
          </Typography>
          <Typography sx={{ color: 'text.secondary', mb: 4, maxWidth: 460, mx: 'auto' }}>
            Transform inbound communication into decisive, well-articulated answers in seconds.
          </Typography>
          <Button variant="contained" color="secondary" size="large" onClick={onGetStarted}>
            Launch Email Generator Now
          </Button>
        </Box>
      </Container>

      {/* Footer */}
      <Box component="footer" sx={{ py: 4, textAlign: 'center', borderTop: '1px solid var(--border-subtle)' }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Smart Email Assistant © 2026. Built with speed, precision, and modern intelligence.
        </Typography>
      </Box>
    </Box>
  )
}