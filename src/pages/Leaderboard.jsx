import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Container, Typography, Box, Paper, Grid, Chip, Stack, Button, ToggleButton, ToggleButtonGroup } from '@mui/material'
import { useState } from 'react'
import { motion } from 'framer-motion'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import tools from '../data/tools.json'

const catNames = { 'ai-chatbot':'AI Chatbots','ai-writing':'AI Writing Tools','ai-image':'AI Image Generators','ai-coding':'AI Coding Assistants','ai-seo':'AI SEO Tools','ai-video':'AI Video Creators' }
const allCategories = Object.entries(catNames)

export default function Leaderboard() {
  const { category } = useParams()
  const [sortBy, setSortBy] = useState('rating')
  
  const filtered = category && category !== 'all'
    ? tools.filter(t => t.category === category)
    : tools
  
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating
    if (sortBy === 'value') return (b.rating / b.price) - (a.rating / a.price)
    if (sortBy === 'beginner') return (a.price - b.price)
    return 0
  })

  const title = category ? catNames[category] || 'AI Tools' : 'All AI Tools'

  const medals = ['🥇','🥈','🥉']

  return (
    <>
      <Helmet>
        <title>{'Top ' + title + ' 2026 — Rankings & Reviews | AI Tools'}</title>
        <meta name="description" content={'See the top ranked ' + title.toLowerCase() + '. Compare by rating, value, and beginner-friendliness.'} />
      </Helmet>
      <Container maxWidth="lg" sx={{ pt:6, pb:10, position:'relative', zIndex:1 }}>
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}>
          <Typography variant="h2" fontWeight={700} mb={1} fontSize={{ xs:'1.6rem',md:'2.2rem' }}>Top {title}</Typography>
          <Typography variant="body1" color="#6b6f7e" mb={4}>Ranked by real testing and user reviews</Typography>

          {/* Category Filter */}
          <Stack direction="row" spacing={1} mb={4} flexWrap="wrap" useFlexGap>
            <Chip label="All" component={Link} to="/top/all" variant={!category||category==='all'?'filled':'outlined'} size="small" clickable sx={{ fontWeight:600 }} />
            {allCategories.map(([slug, name]) => (
              <Chip key={slug} label={name} component={Link} to={`/top/${slug}`} variant={category===slug?'filled':'outlined'} size="small" clickable sx={{ fontWeight:600 }} />
            ))}
          </Stack>

          {/* Sort Controls */}
          <ToggleButtonGroup value={sortBy} exclusive onChange={(_,v) => v && setSortBy(v)} size="small" sx={{ mb:4 }}>
            <ToggleButton value="rating" sx={{ px:3 }}>⭐ Best Rated</ToggleButton>
            <ToggleButton value="value" sx={{ px:3 }}>💸 Best Value</ToggleButton>
            <ToggleButton value="beginner" sx={{ px:3 }}>🌱 Beginner Friendly</ToggleButton>
          </ToggleButtonGroup>

          {/* Rankings */}
          <Stack spacing={2}>
            {sorted.map((t, i) => (
              <motion.div key={t.id} initial={{opacity:0,x:-20}} animate={{opacity:1,x:0}} transition={{delay:i*0.05}}>
                <Paper component={Link} to={`/tool/${t.slug}`} sx={{ p:3, display:'flex', alignItems:'center', gap:3, '&:hover':{ borderColor:'rgba(52,211,153,0.3)', transform:'translateX(4px)' } }}>
                  <Box sx={{ width:44, height:44, borderRadius:2, bgcolor:i<3?'rgba(251,191,36,0.1)':'rgba(255,255,255,0.03)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.4rem', flexShrink:0 }}>
                    {i<3 ? medals[i] : <Typography fontWeight={700} color="#5a5f6e">{i+1}</Typography>}
                  </Box>
                  <Box flex={1}>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Box sx={{ width:48, height:48, borderRadius:2, bgcolor:'rgba(52,211,153,0.08)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.2rem', fontWeight:700, color:'#6ee7b7', flexShrink:0 }}>
                        {t.name[0]}
                      </Box>
                      <Box flex={1}>
                        <Typography variant="h6" fontWeight={700}>{t.name}</Typography>
                        <Stack direction="row" spacing={2} alignItems="center">
                          <Chip label={`★ ${t.rating}`} size="small" sx={{ bgcolor:'rgba(251,191,36,0.15)', color:'#fbbf24', fontWeight:700 }} />
                          <Typography variant="body2" color="text.secondary" fontSize="0.85rem">{t.desc.slice(0, 80)}...</Typography>
                        </Stack>
                      </Box>
                      <Box textAlign="right" sx={{ flexShrink:0 }}>
                        <Typography variant="h6" fontWeight={700} color="#6ee7b7">${t.price}/mo</Typography>
                        <Typography variant="caption" color="text.secondary">{t.free_tier}</Typography>
                      </Box>
                    </Stack>
                  </Box>
                </Paper>
              </motion.div>
            ))}
          </Stack>
        </motion.div>
      </Container>
    </>
  )
}
