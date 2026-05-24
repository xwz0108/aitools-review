import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Container, Typography, Box, Grid, Chip, Stack, Button, Paper, Rating, IconButton } from '@mui/material'
import { motion } from 'framer-motion'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import tools from '../data/tools.json'

const catNames = { 'ai-chatbot': 'AI Chatbot', 'ai-writing': 'AI Writing', 'ai-image': 'AI Image', 'ai-coding': 'AI Coding', 'ai-seo': 'AI SEO', 'ai-video': 'AI Video' }

export default function ToolDetail() {
  const { slug } = useParams()
  const tool = tools.find(t => t.slug === slug)
  const related = tools.filter(t => t.category === tool?.category && t.id !== tool?.id).slice(0, 3)

  if (!tool) return <Container sx={{ pt: 10, textAlign: 'center' }}><Typography variant="h4">Tool not found</Typography></Container>

  // User rating from localStorage
  const [userRating, setUserRating] = useState(0)
  const [voteCount, setVoteCount] = useState(0)
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('ratings_' + tool.id) || '{"rating":0,"count":0}')
    setUserRating(data.rating)
    setVoteCount(data.count)
  }, [tool.id])

  const handleRate = (val) => {
    const data = JSON.parse(localStorage.getItem('ratings_' + tool.id) || '{"rating":0,"count":0}')
    data.rating = ((data.rating * data.count) + val) / (data.count + 1)
    data.count += 1
    localStorage.setItem('ratings_' + tool.id, JSON.stringify(data))
    setUserRating(data.rating)
    setVoteCount(data.count)
  }

  return (
    <>
      <Helmet>
        <title>{tool.name + ' Review 2026 — Is It Worth $' + tool.price + '/mo? | AI Tools'}</title>
        <meta name="description" content={tool.desc} />
        <script type="application/ld+json">{JSON.stringify({"@context":"https://schema.org","@type":"Product","name":tool.name,"description":tool.desc,"review":{"@type":"Review","reviewRating":{"@type":"Rating","ratingValue":tool.rating}}})}</script>
      </Helmet>
      <Container maxWidth="md" sx={{ pt: 6, pb: 10, position: 'relative', zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          {/* Header */}
          <Stack direction="row" spacing={3} alignItems="center" mb={4}>
            <Box sx={{ width: 80, height: 80, borderRadius: 4, background: 'linear-gradient(135deg, rgba(52,211,153,0.15), rgba(5,150,105,0.05))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', flexShrink: 0 }}>{tool.name[0]}</Box>
            <Box flex={1}>
              <Stack direction="row" alignItems="center" spacing={0.5} mb={2}>
              <Typography component={Link} to="/" variant="caption" color="#6b6f7e" sx={{ '&:hover': { color: '#6ee7b7' } }}>Home</Typography>
              <Typography variant="caption" color="#3a3d4a">/</Typography>
              <Typography component={Link} to={`/tools/${tool.category}`} variant="caption" color="#6b6f7e" sx={{ '&:hover': { color: '#6ee7b7' } }}>{catNames[tool.category]}</Typography>
              <Typography variant="caption" color="#3a3d4a">/</Typography>
              <Typography variant="caption" color="#6ee7b7">{tool.name}</Typography>
            </Stack>
            <Chip label={catNames[tool.category]} size="small" sx={{ mb: 1, bgcolor: 'rgba(52,211,153,0.08)', color: '#6ee7b7', fontWeight: 600 }} />
              <Typography variant="h2" fontSize={{ xs: '1.8rem', md: '2.4rem' }} fontWeight={700}>{tool.name}</Typography>
              <Typography variant="body1" color="#6b6f7e" mt={1}>{tool.desc}</Typography>
            </Box>
          </Stack>

          {/* Price + Rating Card */}
          <Paper variant="outlined" sx={{ p: 4, borderRadius: 4, mb: 5, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2, border: '1px solid rgba(52,211,153,0.15)' }}>
            <Box>
              <Typography variant="h3" fontWeight={800} className="gradient-text">${tool.price}<Typography component="span" variant="body1" color="#6b6f7e">/mo</Typography></Typography>
              <Typography variant="body2" color="text.secondary">{tool.free_tier}</Typography>
            </Box>
            <Stack direction="row" spacing={2} alignItems="center">
              <Box textAlign="center">
                <Typography variant="h4" fontWeight={700} color="#fbbf24">★ {tool.rating}</Typography>
                <Typography variant="caption" color="text.secondary">{tool.reviews}+ reviews</Typography>
              </Box>
            </Stack>
            <Button variant="contained" size="large" component={Link} to={`/go/${tool.slug}`} endIcon={<ArrowForwardIcon />}>
              Visit Website
            </Button>
          </Paper>

          {/* Features Grid */}
          <Typography variant="h4" fontWeight={700} mb={3}>Key Features</Typography>
          <Grid container spacing={1.5} mb={5}>
            {tool.features.map(f => (
              <Grid item xs={6} sm={4} key={f}>
                <Paper variant="outlined" sx={{ p: 1.5, borderRadius: 2, textAlign: 'center', bgcolor: 'rgba(52,211,153,0.04)' }}>
                  <Typography variant="body2" color="#6ee7b7">✓ {f}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>

          {/* Pros & Cons */}
          <Grid container spacing={3} mb={5}>
            <Grid item xs={12} md={6}>
              <Typography variant="h5" fontWeight={700} mb={2} color="#34d399">Pros</Typography>
              {tool.pros.map(p => <Typography key={p} variant="body2" sx={{ mb: 1, color: '#a7f3d0' }}>✓ {p}</Typography>)}
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5" fontWeight={700} mb={2} color="#f87171">Cons</Typography>
              {tool.cons.map(c => <Typography key={c} variant="body2" sx={{ mb: 1, color: '#fca5a5' }}>✗ {c}</Typography>)}
            </Grid>
          </Grid>

          {/* Who's it for */}
          <Paper variant="outlined" sx={{ p: 4, borderRadius: 3, mb: 5, bgcolor: 'rgba(255,255,255,0.02)' }}>
            <Typography variant="h5" fontWeight={700} mb={1}>Who is it for?</Typography>
            <Typography variant="body1" color="#cdd6f4">{tool.best_for}</Typography>
            <Typography variant="body2" color="#6b6f7e" mt={1}>Affiliate commission: {tool.affiliate}</Typography>
          </Paper>

          {/* User Rating */}
          <Paper variant="outlined" sx={{ p:4, borderRadius:3, mb:5, bgcolor:'rgba(255,255,255,0.02)', textAlign:'center' }}>
            <Typography variant="h6" fontWeight={700} mb={2}>Rate This Tool</Typography>
            <Rating value={Math.round(userRating)} onChange={(_, v) => v && handleRate(v)} size="large" sx={{ '& .MuiRating-iconFilled': { color: '#fbbf24' } }} />
            <Typography variant="body2" color="text.secondary" mt={1}>
              {voteCount > 0 ? `Community rating: ${userRating.toFixed(1)}/5 (${voteCount} votes)` : 'Be the first to rate this tool'}
            </Typography>
          </Paper>

          {/* CTA */}
          <Box textAlign="center" mb={5}>
            <Button variant="contained" size="large" component={Link} to={`/go/${tool.slug}`}>Try {tool.name} Now →</Button>
            <Typography variant="caption" color="text.secondary" display="block" mt={1}>When you purchase through our links, we may earn a commission at no extra cost.</Typography>
          </Box>

          {/* Cross-promo to toolfast */}
          <Box sx={{ mt: 5, pt: 5, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <Paper sx={{ p: 4, borderRadius: 4, background: 'linear-gradient(135deg, rgba(167,139,250,0.08), rgba(5,150,105,0.08))', border: '1px solid rgba(167,139,250,0.15)', textAlign: 'center' }}>
              <Typography variant="h5" fontWeight={700} mb={1}>🔧 Compare More AI Tools</Typography>
              <Typography variant="body2" color="#a0a4b8" mb={3}>Use our free AI Tool Comparator and Commission Calculator to make smarter decisions.</Typography>
              <Stack direction="row" spacing={2} justifyContent="center">
                <Chip label="AI Tool Comparator →" component="a" href="https://toolfast.xxddsses.com/tools/ai-tool-comparator" clickable sx={{ fontWeight: 600, bgcolor: 'rgba(167,139,250,0.15)', color: '#c4b5fd' }} />
                <Chip label="Commission Calculator →" component="a" href="https://toolfast.xxddsses.com/tools/commission-calculator" clickable sx={{ fontWeight: 600, bgcolor: 'rgba(52,211,153,0.15)', color: '#6ee7b7' }} />
              </Stack>
            </Paper>
          </Box>
          {related.length > 0 && (
            <Box sx={{ pt: 5, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <Typography variant="h5" fontWeight={700} mb={3}>Alternatives to {tool.name}</Typography>
              <Grid container spacing={2}>
                {related.map(t => (
                  <Grid item xs={12} sm={4} key={t.id}>
                    <Paper component={Link} to={`/tool/${t.slug}`} variant="outlined" sx={{ p: 3, display: 'block', borderRadius: 3, '&:hover': { borderColor: 'rgba(52,211,153,0.3)' } }}>
                      <Typography variant="h6" fontWeight={700}>{t.name}</Typography>
                      <Typography variant="body2" color="text.secondary" fontSize="0.85rem">{t.desc.slice(0, 70)}...</Typography>
                      <Typography variant="body2" color="#6ee7b7" fontWeight={700} mt={1}>${t.price}/mo</Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
        </motion.div>
      </Container>
    </>
  )
}
