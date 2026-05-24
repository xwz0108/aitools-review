import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Container, Typography, Box, Chip, Button, Paper, Stack, Grid } from '@mui/material'
import { motion } from 'framer-motion'

const POSTS = {
  'best-ai-writing-tools-2026': {
    title: 'Best AI Writing Tools 2026 (Tested & Ranked)',
    desc: 'After 30 days of testing, here are the best AI writing tools ranked by quality, speed, and value.',
    date: 'June 2026',
    content: [
      { type: 'h2', text: 'How We Tested' },
      { type: 'p', text: 'We spent 30 days testing 5 AI writing tools: Jasper, Writesonic, Copy.ai, Rytr, and Anyword. Each tool was evaluated on content quality, speed, SEO features, and pricing. We generated the same types of content (blog post, social media caption, email, product description) with each tool and scored them blindly.' },
      { type: 'h2', text: 'The Rankings' },
      { type: 'h3', text: '#1 Jasper — Best Overall (4.5/5)' },
      { type: 'p', text: 'Jasper delivered the most consistent, publication-ready content. Its Brand Voice feature actually learns your writing style. For professional bloggers and marketing teams, it is worth every dollar at $49/mo. The built-in SEO mode integrates with Surfer SEO for content optimization.' },
      { type: 'h3', text: '#2 Writesonic — Best Value (4.3/5)' },
      { type: 'p', text: 'At $20/mo, Writesonic offers incredible value. Article generation is fast, and the built-in Chatsonic and AI image generator make it a true all-in-one platform. Quality is 90% of Jasper but at 40% of the price. Best for freelancers and startups.' },
      { type: 'h3', text: '#3 Copy.ai — Best for Short-Form (4.4/5)' },
      { type: 'p', text: 'Copy.ai excels at social media posts, email campaigns, and ad copy. Its 90+ templates and workflow automation save hours. The chat interface feels natural. Less strong for long-form content but unbeatable for marketing teams.' },
      { type: 'h2', text: 'Quick Comparison Table' },
      { type: 'table', headers: ['Tool', 'Price', 'Best For', 'Rating', 'Free Tier'], rows: [
        ['Jasper', '$49/mo', 'Long-form content', '4.5/5', '7-day trial'],
        ['Writesonic', '$20/mo', 'All-in-one value', '4.3/5', 'Free plan'],
        ['Copy.ai', '$49/mo', 'Marketing copy', '4.4/5', 'Free plan'],
        ['Rytr', '$9/mo', 'Budget writing', '4.0/5', '10K chars free'],
        ['Anyword', '$49/mo', 'Data-driven copy', '4.1/5', '7-day trial'],
      ]},
      { type: 'h2', text: 'The Verdict' },
      { type: 'p', text: 'If you write long-form content daily and have the budget, go with Jasper. If you want the best bang for your buck, Writesonic is the clear winner. For social media managers, Copy.ai is the right tool. And if you are just starting out, Rytr at $9/mo gives you surprisingly good results.' },
    ],
  },
  'best-ai-image-generators-2026': {
    title: 'Best AI Image Generators 2026 (Side-by-Side)',
    desc: 'Midjourney vs Leonardo vs DALL-E 3. Which creates the best images? We tested them all.',
    date: 'June 2026',
    content: [
      { type: 'h2', text: 'The Contenders' },
      { type: 'p', text: 'We compared Midjourney, Leonardo AI, DALL-E 3, Adobe Firefly, and Canva AI across 5 categories: photorealism, artistic quality, ease of use, speed, and price. Each tool generated images from the same prompts.' },
      { type: 'h3', text: '#1 Midjourney — Best Image Quality (4.7/5)' },
      { type: 'p', text: 'Midjourney remains the gold standard for AI image quality. Its latest version produces stunningly photorealistic results. The Discord-only interface is clunky, and there is no free tier, but the output quality justifies the $10/mo price for serious creators.' },
      { type: 'h3', text: '#2 Leonardo AI — Best Value (4.4/5)' },
      { type: 'p', text: 'Leonardo offers 150 free credits per day and fine-tuned models for specific use cases like game assets. The canvas editor and Alchemy upscaling are production-ready. At $12/mo, it is the best option for creators on a budget.' },
      { type: 'h3', text: '#3 DALL-E 3 — Best for Simplicity (4.3/5)' },
      { type: 'p', text: "Built into ChatGPT Plus, DALL-E 3 is the easiest to use. Just describe what you want in plain English. Image quality is very good but not quite Midjourney level. Great for casual users who already have ChatGPT."'},
      { type: 'h2', text: 'Quick Comparison' },
      { type: 'table', headers: ['Tool','Price','Quality','Free Tier','Best For'], rows: [
        ['Midjourney','$10/mo','5/5','None','Professionals'],
        ['Leonardo AI','$12/mo','4/5','150 credits/day','Game dev/creators'],
        ['DALL-E 3','$20/mo','4.5/5','Via Bing','Casual users'],
        ['Adobe Firefly','$5/mo','4/5','25 credits/mo','Adobe users'],
        ['Canva AI','$15/mo','3.5/5','Free plan','Designers'],
      ]},
    ],
  },
  'best-ai-coding-assistants-2026': {
    title: 'Best AI Coding Assistants 2026 (Compared)',
    desc: 'Cursor vs Copilot vs Windsurf. We put the top AI coding tools to the test.',
    date: 'June 2026',
    content: [
      { type: 'p', text: 'AI coding assistants have transformed how developers work. We tested the top 4 tools on real-world coding tasks: building a React component, debugging TypeScript errors, writing SQL queries, and refactoring legacy code.' },
      { type: 'h3', text: '#1 Cursor — Best Overall (4.6/5)' },
      { type: 'p', text: 'Cursor is an AI-first fork of VS Code that feels like pair programming with a senior developer. Its tab completion understands entire codebase context, and inline chat lets you edit code without leaving your flow. At $20/mo, it is the clear winner for daily coding.' },
      { type: 'h3', text: '#2 GitHub Copilot — Best Integration (4.5/5)' },
      { type: 'p', text: 'Copilot has the deepest GitHub integration and widest IDE support. Its PR description generation is a huge time-saver. At $10/mo, it is the most affordable professional option. Free for students and open-source contributors.' },
      { type: 'table', headers: ['Tool','Price','Best Feature','Rating'], rows: [
        ['Cursor','$20/mo','Full codebase context','4.6/5'],
        ['Copilot','$10/mo','GitHub integration','4.5/5'],
        ['Windsurf','$15/mo','Multi-file edits','4.3/5'],
        ['Replit AI','$25/mo','Browser IDE','4.1/5'],
      ]},
    ],
  },
  'jasper-vs-writesonic': {
    title: 'Jasper vs Writesonic: Which AI Writer Wins?',
    desc: 'We compared pricing, features, and output quality side by side to help you choose.',
    date: 'Coming Soon',
    content: [{ type: 'p', text: 'This detailed head-to-head comparison is being written. Check back soon for our in-depth analysis with real test data from both platforms.' }],
  },
  'midjourney-vs-leonardo': {
    title: 'Midjourney vs Leonardo AI: Image Showdown',
    desc: 'Which AI image generator produces the best results for designers and creators?',
    date: 'Coming Soon',
    content: [{ type: 'p', text: 'Side-by-side comparison coming soon. We are generating hundreds of images across both platforms with the same prompts.' }],
  },
  'cursor-vs-copilot': {
    title: 'Cursor vs GitHub Copilot: Developer Comparison',
    desc: 'The two biggest AI coding tools go head to head. Which one comes out on top?',
    date: 'Coming Soon',
    content: [{ type: 'p', text: 'Detailed developer comparison coming soon. We are testing both tools on real production codebases.' }],
  },
}

const DEFAULTS = { title: 'Article', desc: 'Coming soon', content: [{ type:'p', text:'This article is being written.' }] }

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
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}>
          <Chip label="Review" size="small" sx={{ mb: 2, bgcolor:'rgba(52,211,153,0.08)', color:'#6ee7b7', fontWeight:600 }} />
          <Typography variant="h2" fontWeight={700} mb={1} fontSize={{ xs:'1.6rem',md:'2.2rem' }}>{post.title}</Typography>
          <Typography variant="body1" color="#6b6f7e" mb={1}>{post.desc}</Typography>
          <Typography variant="caption" color="#5a5f6e" mb={5} display="block">{post.date}</Typography>
        </motion.div>

        <Paper variant="outlined" sx={{ p: { xs:3,md:5 }, borderRadius:3, bgcolor:'rgba(255,255,255,0.02)', lineHeight:1.9 }}>
          {post.content.map((block, i) => {
            if (block.type === 'h2') return <Typography key={i} variant="h4" fontWeight={700} mt={5} mb={2} className="gradient-text" fontSize="1.5rem">{block.text}</Typography>
            if (block.type === 'h3') return <Typography key={i} variant="h6" fontWeight={700} mt={4} mb={1} color="#e8e6f0">{block.text}</Typography>
            if (block.type === 'p') return <Typography key={i} variant="body1" color="#a0a4b8" mb={2}>{block.text}</Typography>
            if (block.type === 'table') return (
              <Box key={i} sx={{ overflow:'auto', mb:3, mt:2 }}>
                <table style={{ width:'100%', borderCollapse:'collapse' }}>
                  <thead><tr>{block.headers.map(h => <th key={h} style={{ padding:'12px 16px', textAlign:'left', borderBottom:'2px solid rgba(255,255,255,0.1)', color:'#6ee7b7', fontSize:'0.9rem', fontWeight:700 }}>{h}</th>)}</tr></thead>
                  <tbody>
                    {block.rows.map((row, ri) => (
                      <tr key={ri}>
                        {row.map((cell, ci) => (
                          <td key={ci} style={{ padding:'10px 16px', borderBottom:'1px solid rgba(255,255,255,0.06)', color: ci===0?'#e8e6f0':'#a0a4b8', fontSize:'0.88rem', fontWeight: ci===0?600:400 }}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Box>
            )
            return null
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
