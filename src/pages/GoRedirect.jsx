import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Container, Typography, Box, CircularProgress } from '@mui/material'
import tools from '../data/tools.json'

export default function GoRedirect() {
  const { slug } = useParams()
  const tool = tools.find(t => t.slug === slug)

  useEffect(() => {
    if (window.gtag) {
      window.gtag('event', 'affiliate_click', { tool: slug, destination: tool?.website || '' })
    }
    if (tool?.website) {
      window.location.href = tool.website
    }
  }, [slug, tool])

  if (!tool) return <Container sx={{ pt: 10, textAlign: 'center' }}><Typography variant="h5">Tool not found</Typography></Container>

  return (
    <Container sx={{ pt: 20, textAlign: 'center', position: 'relative', zIndex: 1 }}>
      <CircularProgress size={40} sx={{ mb: 3, color: '#34d399' }} />
      <Typography variant="h6" color="#e8e6f0">Taking you to {tool.name}...</Typography>
      <Typography variant="body2" color="#6b6f7e" mt={1}>Click tracked. Redirecting now.</Typography>
      <Box mt={3}>
        <a href={tool.website} style={{ color: '#6ee7b7' }}>Click here if not redirected</a>
      </Box>
    </Container>
  )
}
