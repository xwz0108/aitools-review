import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Container, Typography, Box, Grid, Card, CardContent, Chip, Stack, Button, Rating } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { motion } from 'framer-motion'
import tools from '../data/tools.json'

const catNames = { 'ai-writing': 'AI Writing Tools', 'ai-image': 'AI Image Generators', 'ai-coding': 'AI Coding Assistants', 'ai-seo': 'AI SEO Tools', 'ai-video': 'AI Video Creators' }
const catColors = { 'ai-writing': '#a78bfa', 'ai-image': '#f472b6', 'ai-coding': '#22d3ee', 'ai-seo': '#fbbf24', 'ai-video': '#f87171' }

export default function Tools() {
  const { category } = useParams()
  const filtered = category ? tools.filter(t => t.category === category) : tools
  const title = category ? catNames[category] || 'AI Tools' : 'All AI Tools'

  return (
    <>
      <Helmet>
        <title>{title} — Tested & Ranked (2026) | AI Tools</title>
        <meta name="description" content={`Compare the best ${title.toLowerCase()}. Honest reviews, pricing, and head-to-head comparisons.`} />
      </Helmet>
      <Container maxWidth="xl" sx={{ pt: 6, pb: 10, position: 'relative', zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Typography variant="h2" fontWeight={700} mb={1} fontSize={{ xs: '1.8rem', md: '2.4rem' }}>{title}</Typography>
          <Typography variant="body1" color="#6b6f7e" mb={5}>{filtered.length} tools tested and reviewed</Typography>
        </motion.div>

        <Grid container spacing={3}>
          {filtered.map((tool, i) => (
            <Grid item xs={12} md={6} key={tool.id}>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <Card component={Link} to={`/tool/${tool.slug}`} sx={{ p: 4, display: 'block', height: '100%' }}>
                  <Stack direction="row" spacing={3}>
                    <Box sx={{ width: 64, height: 64, borderRadius: 3, background: `linear-gradient(135deg, ${catColors[tool.category]}33, ${catColors[tool.category]}11)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', flexShrink: 0 }}>
                      {tool.name[0]}
                    </Box>
                    <Box flex={1}>
                      <Stack direction="row" justifyContent="space-between" alignItems="start">
                        <Box>
                          <Typography variant="h5" fontWeight={700}>{tool.name}</Typography>
                          <Chip label={catNames[tool.category]} size="small" sx={{ mt: 0.5, bgcolor: `${catColors[tool.category]}15`, color: catColors[tool.category], fontWeight: 600, fontSize: '0.7rem' }} />
                        </Box>
                        <Box textAlign="right">
                          <Typography variant="h5" fontWeight={700} color="#6ee7b7">${tool.price}/mo</Typography>
                          <Typography variant="caption" color="text.secondary">{tool.free_tier}</Typography>
                        </Box>
                      </Stack>
                      <Typography variant="body2" color="text.secondary" mt={1.5} mb={2}>{tool.desc}</Typography>
                      <Stack direction="row" spacing={2}>
                        <Chip label={`★ ${tool.rating} (${tool.reviews})`} size="small" sx={{ bgcolor: 'rgba(251,191,36,0.15)', color: '#fbbf24', fontWeight: 700 }} />
                        <Chip label={`${tool.affiliate}`} size="small" variant="outlined" />
                      </Stack>
                    </Box>
                  </Stack>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  )
}
