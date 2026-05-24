import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Container, Typography, Box, Grid, Card, CardContent, Chip, Stack, Button } from '@mui/material'
import { motion } from 'framer-motion'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import tools from '../data/tools.json'

const categories = [
  { name: 'AI Writing Tools', slug: 'ai-writing', desc: 'Generate blog posts, social copy, emails, and marketing content', icon: '✍️', gradient: 'linear-gradient(135deg, #8b5cf6, #a78bfa)' },
  { name: 'AI Image Generators', slug: 'ai-image', desc: 'Create stunning artwork, designs, and photorealistic images', icon: '🎨', gradient: 'linear-gradient(135deg, #ec4899, #f472b6)' },
  { name: 'AI Coding Assistants', slug: 'ai-coding', desc: 'Write code faster with AI autocomplete, chat, and refactoring', icon: '💻', gradient: 'linear-gradient(135deg, #06b6d4, #22d3ee)' },
  { name: 'AI SEO Tools', slug: 'ai-seo', desc: 'Optimize content for search engines and track rankings', icon: '📈', gradient: 'linear-gradient(135deg, #f59e0b, #fbbf24)' },
  { name: 'AI Video Creators', slug: 'ai-video', desc: 'Generate and edit videos with AI-powered tools', icon: '🎬', gradient: 'linear-gradient(135deg, #ef4444, #f87171)' },
]

const fadeUp = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.5 } }

export default function Home() {
  const topTools = tools.filter(t => t.rating >= 4.5).slice(0, 4)
  return (
    <>
      <Helmet>
        <title>AI Tools — Honest Reviews & Comparisons (2026)</title>
        <meta name="description" content="Honest reviews and comparisons of the best AI writing, image, coding, SEO, and video tools. Make informed decisions." />
        <link rel="canonical" href="https://aitools.xxddsses.com/" />
        <script type="application/ld+json">{JSON.stringify({"@context":"https://schema.org","@type":"WebSite","name":"AI Tools","url":"https://aitools.xxddsses.com","description":"Honest AI tool reviews and comparisons"})}</script>
      </Helmet>

      {/* Hero */}
      <Box sx={{ textAlign: 'center', pt: { xs: 8, md: 14 }, pb: { xs: 6, md: 8 }, position: 'relative' }}>
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Chip label="Tested & Reviewed" size="small" sx={{ mb: 3, bgcolor: 'rgba(52,211,153,0.08)', color: '#6ee7b7', border: '1px solid rgba(52,211,153,0.2)', fontWeight: 600 }} />
            <Typography variant="h1" sx={{ fontSize: { xs: '2rem', md: '3.5rem' }, mb: 2, lineHeight: 1.15 }}>
              Honest <span className="gradient-text">AI Tool</span> Reviews
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1.1rem', color: '#6b6f7e', mb: 5, maxWidth: 520, mx: 'auto' }}>
              We test and compare AI tools so you don't have to. No sponsored reviews. No BS. Just honest comparisons to help you choose.
            </Typography>
            <Stack direction="row" spacing={2} justifyContent="center">
              <Button variant="contained" component={Link} to="/tools" endIcon={<ArrowForwardIcon />}>Browse All Tools</Button>
              <Button variant="outlined" component={Link} to="/blog">Read Comparisons</Button>
            </Stack>
          </motion.div>
        </Container>
      </Box>

      {/* Category Cards */}
      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1, mb: 8 }}>
        <Typography variant="h3" fontWeight={700} mb={4} textAlign="center">What are you looking for?</Typography>
        <Grid container spacing={3}>
          {categories.map((cat, i) => (
            <Grid item xs={12} sm={6} md={4} lg={2.4} key={cat.slug}>
              <motion.div {...fadeUp} transition={{ delay: i * 0.1 }}>
                <Card component={Link} to={`/tools/${cat.slug}`} sx={{ p: 3, display: 'block', height: '100%', '&:hover': { borderColor: 'rgba(52,211,153,0.3)', transform: 'translateY(-4px)' } }}>
                  <Typography fontSize="2.5rem" mb={1}>{cat.icon}</Typography>
                  <Typography variant="h6" fontWeight={700} mb={0.5}>{cat.name}</Typography>
                  <Typography variant="body2" color="text.secondary" fontSize="0.85rem">{cat.desc}</Typography>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Top Rated Tools */}
      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1, mb: 10 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
          <Typography variant="h3" fontWeight={700}>Top Rated Tools</Typography>
          <Button component={Link} to="/tools" endIcon={<ArrowForwardIcon />} sx={{ color: '#6ee7b7' }}>View All →</Button>
        </Stack>
        <Grid container spacing={3}>
          {topTools.map((tool, i) => {
            const catColors = { 'ai-writing': '#a78bfa', 'ai-image': '#f472b6', 'ai-coding': '#22d3ee', 'ai-seo': '#fbbf24', 'ai-video': '#f87171' }
            return (
              <Grid item xs={12} sm={6} md={3} key={tool.id}>
                <motion.div {...fadeUp} transition={{ delay: i * 0.1 }}>
                  <Card component={Link} to={`/tool/${tool.slug}`} sx={{ p: 3, display: 'block', height: '100%' }}>
                    <Typography variant="h5" fontWeight={700} mb={1}>{tool.name}</Typography>
                    <Typography variant="body2" color="text.secondary" fontSize="0.85rem" mb={2}>{tool.desc.slice(0, 80)}...</Typography>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Chip label={`★ ${tool.rating}`} size="small" sx={{ bgcolor: 'rgba(251,191,36,0.15)', color: '#fbbf24', fontWeight: 700 }} />
                      <Chip label={tool.free_tier} size="small" variant="outlined" sx={{ fontSize: '0.7rem' }} />
                    </Stack>
                  </Card>
                </motion.div>
              </Grid>
            )
          })}
        </Grid>
      </Container>

      {/* Blog CTA */}
      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1, mb: 10, textAlign: 'center' }}>
        <Box className="glass-card" sx={{ p: { xs: 5, md: 7 } }}>
          <Typography variant="h3" fontWeight={700} className="gradient-text" mb={2}>
            Looking for head-to-head comparisons?
          </Typography>
          <Typography variant="body1" color="#6b6f7e" mb={4} maxWidth={480} mx="auto">
            Jasper vs Writesonic. Midjourney vs Leonardo. Cursor vs Copilot. We put them side by side.
          </Typography>
          <Button variant="contained" component={Link} to="/blog" size="large">Read All Comparisons →</Button>
        </Box>
      </Container>
    </>
  )
}
