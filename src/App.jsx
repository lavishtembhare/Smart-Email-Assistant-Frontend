import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { Container, Typography } from '@mui/material'

function App() {
  const [emailContent, setEmailContent] = useState('');
  const [tone, setTone] = useState('');
  const [generatedReply, setGeneratedReply] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  return (
    <>
      <Container maxWidth="md" sx={{py:4}}>
        <Typography variant="h4" component="h1" gutterBottom>
          Email Reply Generator
          </Typography>
          <Box sx={{mx:3}}>
            <TextField
            fullwidth
            multiline
            rows={6}
            variant='outline'
            label="Original Email Content"
            value={emailContent||''}
            onChange={(e) => setEmailContent(e.target.value)}
            sx={{mb:2}}
          />
          </Box>
      </Container>
    </>
  )
}

export default App
