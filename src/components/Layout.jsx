import { Link, useLocation } from 'react-router-dom'
import { AppBar, Toolbar, Container, Box, Typography, Chip, Stack } from '@mui/material'
import BoltIcon from '@mui/icons-material/Bolt'

const categories = [
  { name: 'AI Chat', slug: 'ai-chat' },
  { name: 'AI Writing', slug: 'ai-writing' },
  { name: 'AI Image', slug: 'ai-image' },
  { name: 'AI Coding', slug: 'ai-coding' },
  { name: 'AI SEO', slug: 'ai-seo' },
  { name: 'AI Video', slug: 'ai-video' },
]

export default function Layout({ children }) {
  const location = useLocation()
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100dvh', position: 'relative' }}>
      <div className="bg-dots" />
      <AppBar position="sticky" elevation={0} sx={{ bgcolor: 'rgba(10,10,20,0.75)', backdropFilter: 'blur(24px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <Toolbar>
          <Container maxWidth="xl" sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box component={Link} to="/" sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
              <Box sx={{ width: 36, height: 36, borderRadius: 2, background: 'linear-gradient(135deg, #059669, #34d399)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(5,150,105,0.3)' }}>
                <BoltIcon sx={{ fontSize: 20, color: '#fff' }} />
              </Box>
              <Typography variant="h6" fontWeight={700} color="#e8e6f0" fontSize="1.2rem">AI Tools</Typography>
            </Box>
            <Box flex={1} />
            <Stack direction="row" spacing={0.5}>
              {categories.map(cat => (
                <Chip key={cat.slug} label={cat.name} component={Link} to={`/tools/${cat.slug}`} variant="outlined" size="small" clickable
                  sx={{ borderColor: 'rgba(255,255,255,0.06)', color: '#8b8fa8', fontSize: '0.78rem', '&:hover': { bgcolor: 'rgba(52,211,153,0.08)', color: '#6ee7b7', borderColor: 'rgba(52,211,153,0.2)' } }} />
              ))}
            </Stack>
            <Chip label="Blog" component={Link} to="/blog" variant="filled" size="small" clickable sx={{ fontWeight: 600 }} />
          </Container>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ flex: 1, position: 'relative', zIndex: 1 }}>{children}</Box>
      <Box component="footer" sx={{ borderTop: '1px solid rgba(255,255,255,0.06)', py: 4, textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <Typography variant="body2" color="#5a5f6e">AI Tools — Honest Reviews · No BS</Typography>
        <Box sx={{ mt: 1, display: 'flex', justifyContent: 'center', gap: 2 }}>
          {[['About', '/about'], ['Privacy', '/about'], ['Affiliate Disclosure', '/about']].map(([label, to]) => (
            <Link key={label} to={to}><Typography variant="caption" color="#5a5f6e" sx={{ '&:hover': { color: '#6ee7b7' } }}>{label}</Typography></Link>
          ))}
        </Box>
      </Box>
    </Box>
  )
}
