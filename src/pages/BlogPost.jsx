import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Container, Typography, Box, Chip, Button, Paper, Stack, Grid } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

const POSTS = {
  'best-ai-writing-tools-2026': {
    title: 'Best AI Writing Tools 2026 (Tested & Ranked)',
    desc: 'We tested 5 AI writing tools for 30 days. Here are the honest results.',
    content: `After spending 30 days testing the most popular AI writing tools, we've put together our honest rankings.

## The Contenders

We tested Jasper, Writesonic, Copy.ai, Rytr, and Anyword. Each was evaluated on:
- Content quality (factual accuracy, tone, readability)
- Speed (time to generate a full blog post)
- Features (SEO tools, templates, integrations)
- Pricing (value for money)

## Our Rankings

### 🥇 #1: Jasper — Best Overall
Jasper scored highest in content quality and SEO features. Its Brand Voice feature means the AI actually learns your writing style over time. Yes, it's the most expensive at $49/mo, but for professional bloggers, it pays for itself.

### 🥈 #2: Writesonic — Best Value
At $20/mo, Writesonic offers incredible value. Article generation is fast, and the built-in Chatsonic and image generator make it a true all-in-one platform.

### 🥉 #3: Copy.ai — Best for Short-Form
If you focus on social media and marketing copy, Copy.ai is the best choice. Its workflow automation saves hours on repetitive tasks.

### The Bottom Line
For long-form content creators, go with Jasper. For budget-conscious freelancers, Writesonic delivers 90% of the quality at 40% of the price.`,
  },
}

const DEFAULTS = { title: 'AI Tool Comparison', desc: 'Coming soon', content: 'This comparison is being written. Check back soon for our detailed analysis with real test data, pricing breakdowns, and honest recommendations.' }

export default function BlogPost() {
  const { slug } = useParams()
  const post = POSTS[slug] || DEFAULTS

  return (
    <>
      <Helmet>
        <title>{post.title} | AI Tools</title>
        <meta name="description" content={post.desc} />
      </Helmet>
      <Container maxWidth="md" sx={{ pt: 6, pb: 10, position:'relative', zIndex:1 }}>
        <Chip label="Review" size="small" sx={{ mb: 2, bgcolor: 'rgba(52,211,153,0.08)', color: '#6ee7b7', fontWeight: 600 }} />
        <Typography variant="h2" fontWeight={700} mb={1} fontSize={{ xs: '1.6rem', md: '2.2rem' }}>{post.title}</Typography>
        <Typography variant="body1" color="#6b6f7e" mb={5}>{post.desc}</Typography>
        
        <Paper variant="outlined" sx={{ p: 4, borderRadius: 3, bgcolor: 'rgba(255,255,255,0.02)', lineHeight: 1.8 }}>
          {post.content.split('\n\n').map((p, i) => {
            if (p.startsWith('## ')) return <Typography key={i} variant="h5" fontWeight={700} mt={4} mb={2} className="gradient-text">{p.slice(3)}</Typography>
            if (p.startsWith('### ')) return <Typography key={i} variant="h6" fontWeight={700} mt={3} mb={1} color="#e8e6f0">{p.slice(4)}</Typography>
            return <Typography key={i} variant="body1" color="#a0a4b8" mb={2}>{p}</Typography>
          })}
        </Paper>

        <Box textAlign="center" mt={6}>
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button variant="contained" component={Link} to="/tools">Browse All Tools →</Button>
            <Button variant="outlined" component={Link} to="/blog">More Comparisons</Button>
          </Stack>
        </Box>
      </Container>
    </>
  )
}
