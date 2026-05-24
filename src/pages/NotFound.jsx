import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Container, Typography, Box, Button } from '@mui/material'

export default function NotFound() {
  return (
    <>
      <Helmet><title>404 — Page Not Found | AI Tools</title></Helmet>
      <Container maxWidth="sm" sx={{ textAlign: 'center', pt: { xs: 10, md: 16 }, pb: 10, position: 'relative', zIndex: 1 }}>
        <Typography variant="h1" fontSize={{ xs: '4rem', md: '6rem' }} fontWeight={800} className="gradient-text">404</Typography>
        <Typography variant="h5" mb={4} color="#6b6f7e">This page doesn't exist.</Typography>
        <Button variant="contained" component={Link} to="/" size="large">Go Home</Button>
      </Container>
    </>
  )
}
