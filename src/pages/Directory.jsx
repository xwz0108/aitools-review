import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Container, Typography, Box, Grid, Paper, Chip, Stack, TextField, InputAdornment, Select, MenuItem, Slider } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { motion } from 'framer-motion'
import tools from '../data/tools.json'

const catNames = { 'ai-chatbot':'AI Chatbots','ai-writing':'AI Writing','ai-image':'AI Image','ai-coding':'AI Coding','ai-seo':'AI SEO','ai-video':'AI Video' }
const catColors = { 'ai-chatbot':'#818cf8','ai-writing':'#a78bfa','ai-image':'#f472b6','ai-coding':'#22d3ee','ai-seo':'#fbbf24','ai-video':'#f87171' }

export default function Directory() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [maxPrice, setMaxPrice] = useState(200)
  const [sortBy, setSortBy] = useState('rating')

  const filtered = tools.filter(t => {
    if (search && !t.name.toLowerCase().includes(search.toLowerCase()) && !t.desc.toLowerCase().includes(search.toLowerCase())) return false
    if (category !== 'all' && t.category !== category) return false
    if (t.price > maxPrice) return false
    return true
  }).sort((a,b) => {
    if (sortBy === 'rating') return b.rating - a.rating
    if (sortBy === 'price-asc') return a.price - b.price
    if (sortBy === 'price-desc') return b.price - a.price
    return 0
  })

  return (
    <>
      <Helmet>
        <title>AI Tools Directory — Search & Filter 20+ Tools | AI Tools</title>
        <meta name="description" content="Search and filter AI tools by category, price, and rating. Find the perfect AI tool for your needs." />
      </Helmet>
      <Container maxWidth="xl" sx={{ pt:6, pb:10, position:'relative', zIndex:1 }}>
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}>
          <Typography variant="h2" fontWeight={700} mb={1} fontSize={{ xs:'1.6rem',md:'2.2rem' }}>AI Tools Directory</Typography>
          <Typography variant="body1" color="#6b6f7e" mb={4}>Search and filter {tools.length} AI tools</Typography>
        </motion.div>

        {/* Filters */}
        <Paper sx={{ p:3, borderRadius:4, mb:4 }}>
          <Stack direction={{ xs:'column', md:'row' }} spacing={2} alignItems={{ md:'center' }}>
            <TextField placeholder="Search tools..." value={search} onChange={e=>setSearch(e.target.value)} size="small"
              sx={{ flex:2 }} InputProps={{ startAdornment:<InputAdornment position="start"><SearchIcon sx={{color:'#5a5f6e'}}/></InputAdornment> }} />
            <Select value={category} onChange={e=>setCategory(e.target.value)} size="small" sx={{ flex:1, minWidth:140 }}>
              <MenuItem value="all">All Categories</MenuItem>
              {Object.entries(catNames).map(([k,v])=><MenuItem key={k} value={k}>{v}</MenuItem>)}
            </Select>
            <Select value={sortBy} onChange={e=>setSortBy(e.target.value)} size="small" sx={{ flex:1, minWidth:140 }}>
              <MenuItem value="rating">⭐ Best Rated</MenuItem>
              <MenuItem value="price-asc">💰 Cheapest</MenuItem>
              <MenuItem value="price-desc">💎 Most Expensive</MenuItem>
            </Select>
            <Box sx={{ flex:1, minWidth:120 }}>
              <Typography variant="caption" color="text.secondary">Max Price: ${maxPrice}/mo</Typography>
              <Slider value={maxPrice} onChange={(_,v)=>setMaxPrice(v)} min={5} max={200} step={5} sx={{ color:'#34d399' }} />
            </Box>
          </Stack>
        </Paper>

        <Typography variant="body2" color="#6b6f7e" mb={3}>{filtered.length} tools found</Typography>

        <Grid container spacing={2}>
          {filtered.map((t,i) => (
            <Grid item xs={12} md={6} key={t.id}>
              <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:i*0.03}}>
                <Paper component={Link} to={`/tool/${t.slug}`} variant="outlined" sx={{ p:3, display:'flex', alignItems:'center', gap:3, '&:hover':{ borderColor:'rgba(52,211,153,0.3)' } }}>
                  <Box sx={{ width:52, height:52, borderRadius:3, bgcolor:`${catColors[t.category]}18`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.4rem', fontWeight:700, color:catColors[t.category], flexShrink:0 }}>
                    {t.name[0]}
                  </Box>
                  <Box flex={1}>
                    <Stack direction="row" justifyContent="space-between" alignItems="start">
                      <Box>
                        <Typography fontWeight={700}>{t.name}</Typography>
                        <Chip label={catNames[t.category]} size="small" sx={{ mt:0.5, bgcolor:`${catColors[t.category]}15`, color:catColors[t.category], fontWeight:600, fontSize:'0.65rem' }} />
                      </Box>
                      <Box textAlign="right">
                        <Typography fontWeight={700} color="#6ee7b7">${t.price}/mo</Typography>
                        <Typography variant="caption" color="text.secondary">{t.free_tier}</Typography>
                      </Box>
                    </Stack>
                    <Stack direction="row" spacing={1} mt={1}>
                      <Chip label={`★ ${t.rating}`} size="small" sx={{ bgcolor:'rgba(251,191,36,0.15)', color:'#fbbf24', fontWeight:700, fontSize:'0.7rem' }} />
                      <Chip label={t.affiliate} size="small" variant="outlined" sx={{ fontSize:'0.7rem' }} />
                    </Stack>
                  </Box>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  )
}
