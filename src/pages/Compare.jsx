import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Container, Typography, Box, Paper, Grid, Chip, Stack, Button, Table, TableBody, TableRow, TableCell } from '@mui/material'
import { motion } from 'framer-motion'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import tools from '../data/tools.json'

const catNames = { 'ai-chatbot':'AI Chatbot','ai-writing':'AI Writing','ai-image':'AI Image','ai-coding':'AI Coding','ai-seo':'AI SEO','ai-video':'AI Video' }

export default function Compare() {
  const { slugs } = useParams()
  const slugList = slugs?.split('-vs-') || []
  const compared = slugList.map(s => tools.find(t => t.slug === s)).filter(Boolean)
  
  if (compared.length < 2) return (
    <Container sx={{ pt:10, textAlign:'center' }}>
      <Typography variant="h4">Need at least 2 tools to compare</Typography>
      <Button component={Link} to="/tools" sx={{ mt:2 }}>Browse Tools</Button>
    </Container>
  )

  const features = ['price','free_tier','rating','reviews','affiliate','best_for']
  const featureLabels = { price:'Price', free_tier:'Free Tier', rating:'Rating', reviews:'Reviews', affiliate:'Affiliate', best_for:'Best For' }
  const categories = [...new Set(compared.map(t => t.category))]

  return (
    <>
      <Helmet>
        <title>{compared.map(t=>t.name).join(' vs ') + ' — Comparison | AI Tools'}</title>
        <meta name="description" content={`Compare ${compared.map(t=>t.name).join(' vs ')} side by side. Features, pricing, pros, cons, and honest verdict.`} />
      </Helmet>
      <Container maxWidth="lg" sx={{ pt:6, pb:10, position:'relative', zIndex:1 }}>
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}>
          <Typography variant="h2" fontWeight={700} mb={1} fontSize={{ xs:'1.6rem',md:'2rem' }}>
            {compared.map((t,i) => <span key={t.id}>{i>0 && ' vs '}{t.name}</span>)}
          </Typography>
          <Stack direction="row" spacing={1} mb={5}>
            {categories.map(c => <Chip key={c} label={catNames[c]} size="small" sx={{ bgcolor:'rgba(52,211,153,0.08)', color:'#6ee7b7', fontWeight:600 }} />)}
          </Stack>

          {/* Overview Table */}
          <Paper sx={{ p:3, borderRadius:4, mb:5, overflowX:'auto' }}>
            <Table size="small">
              <TableBody>
                {features.map(f => (
                  <TableRow key={f} sx={{ '&:nth-of-type(odd)':{ bgcolor:'rgba(255,255,255,0.02)' }}}>
                    <TableCell sx={{ fontWeight:700, color:'#8b8fa8', borderColor:'rgba(255,255,255,0.06)', minWidth:120 }}>{featureLabels[f]}</TableCell>
                    {compared.map(t => (
                      <TableCell key={t.id} sx={{ fontFamily:'monospace', color:'#e8e6f0', borderColor:'rgba(255,255,255,0.06)', fontWeight: f==='price'?700:400, color: f==='price'?'#6ee7b7':'#e8e6f0' }}>
                        {f === 'price' ? '$'+t.price+'/mo' : String(t[f] || 'N/A')}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>

          {/* Features Checklist */}
          <Typography variant="h4" fontWeight={700} mb={3}>Feature Checklist</Typography>
          <Paper sx={{ borderRadius:4, overflow:'hidden', mb:5 }}>
            <Table size="small">
              <TableBody>
                {compared[0].features.map(f => (
                  <TableRow key={f} sx={{ '&:nth-of-type(odd)':{ bgcolor:'rgba(255,255,255,0.02)' }}}>
                    <TableCell sx={{ fontWeight:600, color:'#8b8fa8', borderColor:'rgba(255,255,255,0.06)', minWidth:160 }}>{f}</TableCell>
                    {compared.map(t => (
                      <TableCell key={t.id} sx={{ textAlign:'center', borderColor:'rgba(255,255,255,0.06)' }}>
                        {t.features.includes(f) ? <span style={{color:'#34d399'}}>✓</span> : <span style={{color:'#3a3d4a'}}>—</span>}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>

          {/* Pros & Cons */}
          <Grid container spacing={4} mb={5}>
            <Grid item xs={12} md={6}>
              <Typography variant="h5" fontWeight={700} mb={2} color="#34d399">Pros</Typography>
              {compared.map(t => (
                <Box key={'pro-'+t.id} mb={3}>
                  <Typography variant="subtitle2" fontWeight={700} color="#6ee7b7" mb={1}>{t.name}</Typography>
                  {t.pros.map(p => <Typography key={p} variant="body2" color="#a7f3d0" mb={0.5}>✓ {p}</Typography>)}
                </Box>
              ))}
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5" fontWeight={700} mb={2} color="#f87171">Cons</Typography>
              {compared.map(t => (
                <Box key={'con-'+t.id} mb={3}>
                  <Typography variant="subtitle2" fontWeight={700} color="#fca5a5" mb={1}>{t.name}</Typography>
                  {t.cons.map(c => <Typography key={c} variant="body2" color="#fca5a5" mb={0.5}>✗ {c}</Typography>)}
                </Box>
              ))}
            </Grid>
          </Grid>

          {/* Winner */}
          <Paper sx={{ p:5, borderRadius:4, textAlign:'center', background:'linear-gradient(135deg, rgba(52,211,153,0.08), rgba(5,150,105,0.04))', border:'1px solid rgba(52,211,153,0.15)', mb:5 }}>
            <Typography variant="h5" fontWeight={700} color="#6ee7b7" mb={2}>Our Pick</Typography>
            <Typography variant="h3" fontWeight={800} className="gradient-text">{compared.reduce((a,b) => a.rating > b.rating ? a : b).name}</Typography>
            <Typography variant="body2" color="#6b6f7e" mt={1}>Highest rated based on {compared.map(t=>t.reviews).reduce((a,b)=>a+b).toLocaleString()}+ reviews</Typography>
            <Stack direction="row" spacing={2} justifyContent="center" mt={3}>
              {compared.map(t => (
                <Button key={t.id} variant={t.rating === Math.max(...compared.map(x=>x.rating)) ? 'contained' : 'outlined'} component={Link} to={`/tool/${t.slug}`} endIcon={<ArrowForwardIcon />}>
                  {t.name} — ${t.price}/mo
                </Button>
              ))}
            </Stack>
          </Paper>

          {/* Related comparisons */}
          <Box sx={{ pt:4, borderTop:'1px solid rgba(255,255,255,0.06)' }}>
            <Typography variant="h5" fontWeight={700} mb={3}>More Comparisons</Typography>
            <Grid container spacing={2}>
              {tools.filter(t => categories.includes(t.category) && !slugList.includes(t.slug)).slice(0,4).map(t => (
                <Grid item xs={6} sm={3} key={t.id}>
                  <Paper component={Link} to={`/tool/${t.slug}`} variant="outlined" sx={{ p:3, display:'block', borderRadius:3, '&:hover':{ borderColor:'rgba(52,211,153,0.3)' }}}>
                    <Typography fontWeight={700}>{t.name}</Typography>
                    <Typography variant="caption" color="#6ee7b7">${t.price}/mo</Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        </motion.div>
      </Container>
    </>
  )
}
