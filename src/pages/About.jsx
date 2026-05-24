import { Helmet } from 'react-helmet-async'
import { Container, Typography, Box, Paper } from '@mui/material'
import { motion } from 'framer-motion'

export default function About() {
  return (
    <>
      <Helmet>
        <title>About — Transparency & Methodology | AI Tools</title>
        <meta name="description" content="How we test AI tools. Our methodology, affiliate disclosure, and commitment to honest reviews." />
      </Helmet>
      <Container maxWidth="md" sx={{ pt: 6, pb: 10, position:'relative', zIndex:1 }}>
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}>
          <Typography variant="h2" fontWeight={700} mb={1} fontSize={{ xs:'1.8rem',md:'2.2rem' }}>About AI Tools</Typography>
          <Typography variant="body1" color="#6b6f7e" mb={5}>How we test, what we stand for, and full transparency.</Typography>
        </motion.div>

        {[
          { title:'Our Methodology', body:'Every tool on this site is manually tested for at least 7 days. We evaluate real-world performance — not marketing claims. Our ratings are based on: content quality, speed, features, pricing, and user experience.' },
          { title:'Affiliate Disclosure', body:'Some links on this site are affiliate links. When you purchase through them, we may earn a commission at no extra cost to you. This never affects our ratings — we recommend what we genuinely believe is best.' },
          { title:'Privacy Policy', body:'We do not collect any personal data. We use Google Analytics to understand traffic patterns, but no individual user data is tracked or stored. No cookies beyond Analytics are used.' },
          { title:'Why Trust Us', body:'We buy and test every tool with our own money before publishing reviews. No sponsored posts. No paid rankings. If a tool is bad, we say so. Our reputation is worth more than any affiliate commission.' },
        ].map((section, i) => (
          <Paper key={i} variant="outlined" sx={{ p: 4, borderRadius: 3, mb: 3, bgcolor: 'rgba(255,255,255,0.02)' }}>
            <Typography variant="h5" fontWeight={700} mb={1}>{section.title}</Typography>
            <Typography variant="body1" color="#a0a4b8" lineHeight={1.8}>{section.body}</Typography>
          </Paper>
        ))}
      </Container>
    </>
  )
}
