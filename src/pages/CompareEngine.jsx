import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Container, Typography, Box, Paper, Grid, Chip, Stack, Button, Slider, ToggleButton, ToggleButtonGroup, Table, TableBody, TableRow, TableCell } from '@mui/material'
import { motion, AnimatePresence } from 'framer-motion'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import tools from '../data/tools.json'

const catNames = { 'ai-writing':'AI Writing','ai-image':'AI Image','ai-coding':'AI Coding','ai-seo':'AI SEO','ai-video':'AI Video' }
const cats = ['ai-writing','ai-image','ai-coding','ai-seo','ai-video']

const dimensions = [
  { key:'price', label:'Price', tip:'Lower is better' },
  { key:'rating', label:'Rating', tip:'Higher is better' },
  { key:'features_len', label:'Features', tip:'More features = better' },
  { key:'ease_of_use', label:'Ease of Use', tip:'Simplicity matters' },
  { key:'free_tier_val', label:'Free Tier', tip:'Generous free tier = better' },
]

// Calculate ease of use from cons (fewer cons about difficulty = easier)
function getEaseOfUse(tool) {
  const hardWords = ['steep','confusing','complex','learning curve','clunky']
  const easySignals = tool.cons.filter(c => hardWords.some(w => c.toLowerCase().includes(w)))
  return Math.max(1, 5 - easySignals.length)
}

// Free tier value score
function getFreeTierVal(tool) {
  const ft = tool.free_tier.toLowerCase()
  if (ft.includes('credits/day')) return 5
  if (ft.includes('free plan')) return 4
  if (ft.includes('trial')) return 3
  if (ft.includes('none')) return 1
  return 2
}

function normalize(arr) {
  const min = Math.min(...arr), max = Math.max(...arr)
  if (max === min) return arr.map(() => 50)
  return arr.map(v => ((v - min) / (max - min)) * 100)
}

export default function CompareEngine() {
  const [category, setCategory] = useState('all')
  const [selected, setSelected] = useState([])
  const [weights, setWeights] = useState({ price:50, rating:50, features_len:30, ease_of_use:30, free_tier_val:20 })

  const filtered = category === 'all' ? tools : tools.filter(t => t.category === category)

  const toggleTool = (slug) => {
    setSelected(prev => prev.includes(slug) ? prev.filter(s => s !== slug) : [...prev, slug].slice(0, 4))
  }

  // Scoring engine
  const scored = useMemo(() => {
    if (selected.length < 2) return []
    const subset = selected.map(s => tools.find(t => t.slug === s)).filter(Boolean)
    const enriched = subset.map(t => ({
      ...t,
      ease_of_use: getEaseOfUse(t),
      features_len: t.features.length,
      free_tier_val: getFreeTierVal(t),
    }))

    // Normalize each dimension (0-100)
    const norms = {}
    dimensions.forEach(d => {
      const vals = enriched.map(t => d.key === 'price' ? -t[d.key] : t[d.key])
      norms[d.key] = normalize(vals)
    })

    // Weighted score
    const totalW = Object.values(weights).reduce((a,b)=>a+b,0)
    const scored = enriched.map((t, i) => {
      let score = 0
      dimensions.forEach(d => {
        score += norms[d.key][i] * (weights[d.key] / totalW)
      })
      return { ...t, score }
    }).sort((a, b) => b.score - a.score)

    return scored
  }, [selected, weights])

  return (
    <>
      <Helmet>
        <title>AI Tool Comparison Engine — Compare & Rank | AI Tools</title>
        <meta name="description" content="Interactive AI tool comparison. Select tools, set your priorities, and get ranked recommendations." />
      </Helmet>
      <Container maxWidth="lg" sx={{ pt:6, pb:10, position:'relative', zIndex:1 }}>
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}>
          <Typography variant="h2" fontWeight={700} mb={1} fontSize={{xs:'1.6rem',md:'2.2rem'}}>Compare & Rank AI Tools</Typography>
          <Typography variant="body1" color="text.secondary" mb={5}>Pick tools, set what matters to you, and see who wins</Typography>
        </motion.div>

        {/* Step 1: Category */}
        <Paper sx={{ p:3, borderRadius:4, mb:3 }}>
          <Typography variant="subtitle1" fontWeight={700} mb={2}>Step 1: Choose Category</Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            <Chip label="All" variant={category==='all'?'filled':'outlined'} onClick={()=>{setCategory('all');setSelected([])}} clickable sx={{fontWeight:600}} />
            {cats.map(c => <Chip key={c} label={catNames[c]} variant={category===c?'filled':'outlined'} onClick={()=>{setCategory(c);setSelected([])}} clickable sx={{fontWeight:600}} />)}
          </Stack>
        </Paper>

        {/* Step 2: Pick Tools */}
        <Paper sx={{ p:3, borderRadius:4, mb:3 }}>
          <Typography variant="subtitle1" fontWeight={700} mb={2}>Step 2: Pick Tools (max 4)</Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {filtered.map(t => (
              <Chip key={t.slug} label={`${t.name} ($${t.price}/mo)`}
                variant={selected.includes(t.slug)?'filled':'outlined'}
                onClick={()=>toggleTool(t.slug)} clickable
                sx={{ fontWeight:selected.includes(t.slug)?700:400 }}
              />
            ))}
          </Stack>
          <Typography variant="caption" color="text.secondary" mt={1} display="block">{selected.length} selected. {selected.length < 2 ? 'Pick at least 2 to compare.' : ''}</Typography>
        </Paper>

        {/* Step 3: Priorities */}
        <Paper sx={{ p:3, borderRadius:4, mb:4 }}>
          <Typography variant="subtitle1" fontWeight={700} mb={2}>Step 3: What Matters Most?</Typography>
          <Grid container spacing={3}>
            {dimensions.map(d => (
              <Grid item xs={12} sm={6} md={2.4} key={d.key}>
                <Typography variant="caption" color="text.secondary">{d.label}</Typography>
                <Slider value={weights[d.key]} onChange={(_,v)=>setWeights({...weights,[d.key]:v})} min={0} max={100} sx={{color:'#34d399'}} />
                <Typography variant="caption" color="#5a5f6e">{d.key==='price' ? 'Save money' : d.key==='rating' ? 'Top rated' : d.key==='features_len' ? 'Feature-rich' : d.key==='ease_of_use' ? 'Easy to use' : 'Free tier'}</Typography>
              </Grid>
            ))}
          </Grid>
        </Paper>

        {/* Results */}
        <AnimatePresence>
          {scored.length > 0 && (
            <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}>
              {/* Winner */}
              <Paper sx={{ p:5, borderRadius:4, mb:4, textAlign:'center', background:'linear-gradient(135deg, rgba(52,211,153,0.08), rgba(5,150,105,0.04))', border:'1px solid rgba(52,211,153,0.15)' }}>
                <Chip label="Best Match" sx={{mb:2,bgcolor:'rgba(52,211,153,0.15)',color:'#6ee7b7',fontWeight:700}} />
                <Typography variant="h3" fontWeight={800} className="gradient-text">{scored[0].name}</Typography>
                <Typography variant="body1" color="#6b6f7e" mt={1}>Score: {scored[0].score.toFixed(0)}/100 based on your priorities</Typography>
                <Stack direction="row" spacing={2} justifyContent="center" mt={3}>
                  <Button variant="contained" component={Link} to={`/go/${scored[0].slug}`} endIcon={<ArrowForwardIcon/>}>Try {scored[0].name}</Button>
                  <Button variant="outlined" component={Link} to={`/tool/${scored[0].slug}`}>Read Review</Button>
                </Stack>
              </Paper>

              {/* Rankings */}
              <Paper sx={{ borderRadius:4, overflow:'hidden', mb:4 }}>
                <Table>
                  <TableHead><TableRow><TableCell sx={{fontWeight:700,color:'#8b8fa8'}}>Rank</TableCell><TableCell>Tool</TableCell><TableCell sx={{fontWeight:700,color:'#8b8fa8'}}>Score</TableCell><TableCell sx={{fontWeight:700,color:'#8b8fa8'}}>Price</TableCell><TableCell sx={{fontWeight:700,color:'#8b8fa8'}}>Rating</TableCell></TableRow></TableHead>
                  <TableBody>
                    {scored.map((t,i) => (
                      <TableRow key={t.slug} hover sx={{'&:nth-of-type(odd)':{bgcolor:'rgba(255,255,255,0.02)'}}}>
                        <TableCell sx={{fontWeight:700,color:i===0?'#6ee7b7':'#8b8fa8'}}>#{i+1}</TableCell>
                        <TableCell>
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Box sx={{width:36,height:36,borderRadius:2,bgcolor:'rgba(52,211,153,0.08)',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:700,color:'#6ee7b7'}}>{t.name[0]}</Box>
                            <Box>
                              <Typography fontWeight={700}>{t.name}</Typography>
                              <Typography variant="caption" color="text.secondary">{catNames[t.category]}</Typography>
                            </Box>
                          </Stack>
                        </TableCell>
                        <TableCell sx={{fontWeight:700,color:i===0?'#6ee7b7':'#e8e6f0'}}>{t.score.toFixed(0)}</TableCell>
                        <TableCell sx={{color:'#6ee7b7',fontWeight:700}}>${t.price}/mo</TableCell>
                        <TableCell sx={{color:'#fbbf24',fontWeight:700}}>★ {t.rating}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Paper>

              {/* Detail compare link */}
              <Box textAlign="center">
                <Button variant="outlined" component={Link} to={`/compare/${scored.map(t=>t.slug).join('-vs-')}`} endIcon={<ArrowForwardIcon/>}>
                  See Detailed Side-by-Side Comparison →
                </Button>
              </Box>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </>
  )
}
