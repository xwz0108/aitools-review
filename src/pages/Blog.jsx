import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Container, Typography, Box, Grid, Chip, Paper } from '@mui/material'
import { motion } from 'framer-motion'

const posts = [
  { slug:'best-ai-writing-tools-2026', title:'Best AI Writing Tools 2026 (Tested & Ranked)', desc:'We tested 5 AI writing tools head-to-head. See which one came out on top.', cat:'AI Writing', date:'June 2026' },
  { slug:'best-ai-image-generators-2026', title:'Best AI Image Generators 2026 (Side-by-Side)', desc:'Midjourney vs Leonardo vs DALL-E 3. Which creates the best images?', cat:'AI Image', date:'June 2026' },
  { slug:'best-ai-coding-assistants-2026', title:'Best AI Coding Assistants 2026 (Compared)', desc:'Cursor vs Copilot vs Windsurf. Which IDE assistant is right for you?', cat:'AI Coding', date:'June 2026' },
  { slug:'best-ai-seo-tools-2026', title:'Best AI SEO Tools 2026 (Hands-On Test)', desc:'Surfer SEO vs Frase vs NeuronWriter. Which actually improves rankings?', cat:'AI SEO', date:'June 2026' },
  { slug:'best-ai-video-generators-2026', title:'Best AI Video Generators 2026 (Tested)', desc:'Runway vs Pika vs Synthesia. Which AI video tool fits your workflow?', cat:'AI Video', date:'June 2026' },
  { slug:'jasper-vs-writesonic', title:'Jasper vs Writesonic: Which AI Writer Wins?', desc:'We compared pricing, features, and output quality side by side.', cat:'AI Writing', date:'June 2026' },
  { slug:'midjourney-vs-leonardo', title:'Midjourney vs Leonardo AI: Image Showdown', desc:'Which AI image generator produces the best results for designers?', cat:'AI Image', date:'June 2026' },
  { slug:'cursor-vs-copilot', title:'Cursor vs GitHub Copilot: Developer Comparison', desc:'The two biggest AI coding tools go head to head. Which one wins?', cat:'AI Coding', date:'June 2026' },
  { slug:'surferseo-vs-frase', title:'Surfer SEO vs Frase: Content Optimization Battle', desc:'We tested both AI SEO tools on real blog posts. Side-by-side results.', cat:'AI SEO', date:'June 2026' },
  { slug:'runway-vs-pika-synthesia', title:'Runway vs Pika vs Synthesia: AI Video Showdown', desc:'Three AI video tools for three different use cases. How to choose.', cat:'AI Video', date:'June 2026' },
  { slug:'rytr-review', title:'Rytr Review: Is the $9 AI Writer Any Good?', desc:'We tested the most affordable AI writing tool. Honest review.', cat:'AI Writing', date:'June 2026' },
  { slug:'midjourney-vs-dalle3-vs-firefly', title:'Midjourney vs DALL-E 3 vs Firefly', desc:'Three AI image generators tested with identical prompts.', cat:'AI Image', date:'June 2026' },
  { slug:'windsurf-vs-cursor-vs-copilot', title:'Windsurf vs Cursor vs Copilot: AI IDE Battle', desc:'Three AI coding tools tested on real development tasks.', cat:'AI Coding', date:'June 2026' },
  { slug:'best-free-ai-tools-2026', title:'Best Free AI Tools That Actually Work in 2026', desc:'You do not need money for great AI tools. Here are the best free ones.', cat:'All', date:'June 2026' },
  { slug:'how-to-use-ai-for-affiliate-marketing', title:'How to Use AI Tools for Affiliate Marketing', desc:'Step-by-step guide to AI-powered affiliate content creation.', cat:'All', date:'June 2026' },
  { slug:'claude-vs-chatgpt-vs-gemini', title:'Claude vs ChatGPT vs Gemini: AI Assistant Battle', desc:'Three AI chatbots compared on reasoning, coding, and creativity.', cat:'AI Chatbot', date:'June 2026' },
  { slug:'best-ai-stack-for-bloggers', title:'The Best AI Tool Stack for Bloggers 2026', desc:'Complete AI toolkit for content creators. Writing, SEO, images.', cat:'All', date:'June 2026' },
  { slug:'leonardo-ai-review', title:'Leonardo AI Review: Best Midjourney Alternative?', desc:'In-depth review. Pros, cons, free tier analysis, and real examples.', cat:'AI Image', date:'June 2026' },
  { slug:'is-ai-writing-worth-it', title:'Is AI Writing Software Worth It in 2026?', desc:'After 3 months of daily use. Honest take on whether it is worth paying for.', cat:'AI Writing', date:'June 2026' },
  { slug:'ai-image-generation-guide', title:'AI Image Generation: Complete Beginner Guide', desc:'Everything about AI image generation. Tools, prompts, and best practices.', cat:'AI Image', date:'June 2026' },
]

export default function Blog() {
  return (
    <>
      <Helmet>
        <title>AI Tool Comparisons — Head-to-Head Reviews | AI Tools</title>
        <meta name="description" content="In-depth AI tool comparisons. Jasper vs Writesonic, Midjourney vs Leonardo, and more. Make informed decisions." />
      </Helmet>
      <Container maxWidth="xl" sx={{ pt: 6, pb: 10, position:'relative', zIndex:1 }}>
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}>
          <Typography variant="h2" fontWeight={700} mb={1} fontSize={{ xs:'1.8rem',md:'2.4rem' }}>Comparisons & Reviews</Typography>
          <Typography variant="body1" color="#6b6f7e" mb={5}>Head-to-head comparisons and deep dives into AI tools</Typography>
        </motion.div>
        <Grid container spacing={3}>
          {posts.map((post,i) => (
            <Grid item xs={12} sm={6} md={4} key={post.slug}>
              <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:i*0.05}}>
                <Paper component={Link} to={`/blog/${post.slug}`} sx={{ p:4, display:'block', height:'100%','&:hover':{borderColor:'rgba(52,211,153,0.3)',transform:'translateY(-2px)'} }}>
                  <Chip label={post.cat} size="small" sx={{mb:2,bgcolor:'rgba(52,211,153,0.08)',color:'#6ee7b7',fontWeight:600}} />
                  <Typography variant="h5" fontWeight={700} mb={1}>{post.title}</Typography>
                  <Typography variant="body2" color="text.secondary" mb={2}>{post.desc}</Typography>
                  <Typography variant="caption" color="#5a5f6e">{post.date}</Typography>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  )
}
