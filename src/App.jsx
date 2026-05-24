import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material'
import { HelmetProvider } from 'react-helmet-async'
import Layout from './components/Layout'

const Home = lazy(() => import('./pages/Home'))
const Tools = lazy(() => import('./pages/Tools'))
const ToolDetail = lazy(() => import('./pages/ToolDetail'))
const Blog = lazy(() => import('./pages/Blog'))
const BlogPost = lazy(() => import('./pages/BlogPost'))
const About = lazy(() => import('./pages/About'))
const GoRedirect = lazy(() => import('./pages/GoRedirect'))
const Compare = lazy(() => import('./pages/Compare'))
const Leaderboard = lazy(() => import('./pages/Leaderboard'))
const NotFound = lazy(() => import('./pages/NotFound'))

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#34d399' },
    secondary: { main: '#f59e0b' },
    background: { default: '#0a0a14', paper: '#14141f' },
    text: { primary: '#e8e6f0', secondary: '#8b8fa8' },
  },
  typography: {
    fontFamily: '"Space Grotesk", system-ui, sans-serif',
    h1: { fontWeight: 700, letterSpacing: '-0.04em' },
    h2: { fontWeight: 700, letterSpacing: '-0.03em' },
    h3: { fontWeight: 700, letterSpacing: '-0.02em' },
    h4: { fontWeight: 600 },
    body1: { lineHeight: 1.7, color: '#a0a4b8' },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  shape: { borderRadius: 18 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 14, padding: '12px 28px', fontSize: '0.95rem' },
        contained: {
          background: 'linear-gradient(135deg, #059669 0%, #34d399 100%)',
          boxShadow: '0 4px 24px rgba(5,150,105,0.25)',
          '&:hover': { background: 'linear-gradient(135deg, #047857 0%, #10b981 100%)', boxShadow: '0 8px 32px rgba(5,150,105,0.35)' },
        },
        outlined: { borderColor: 'rgba(52,211,153,0.3)', color: '#34d399', '&:hover': { borderColor: '#34d399', background: 'rgba(52,211,153,0.08)' } },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 22,
          background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.06)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        filled: { background: 'rgba(52,211,153,0.12)', color: '#6ee7b7' },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 14, background: 'rgba(255,255,255,0.04)',
            '& fieldset': { borderColor: 'rgba(255,255,255,0.08)' },
            '&:hover fieldset': { borderColor: 'rgba(52,211,153,0.3)' },
            '&.Mui-focused fieldset': { borderColor: '#34d399' },
          },
        },
      },
    },
  },
})

function Skeleton() {
  return (
    <div style={{ display:'flex', justifyContent:'center', alignItems:'center', minHeight:'60vh', background:'#0a0a14' }}>
      <div style={{ width:48, height:48, borderRadius:'50%', border:'3px solid rgba(52,211,153,0.15)', borderTopColor:'#34d399', animation:'spin .8s linear infinite' }} />
      <style>{'@keyframes spin{to{transform:rotate(360deg)}}'}</style>
    </div>
  )
}

export default function App() {
  return (
    <HelmetProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Layout>
            <Suspense fallback={<Skeleton />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/tools" element={<Tools />} />
                <Route path="/tools/:category" element={<Tools />} />
                <Route path="/tool/:slug" element={<ToolDetail />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="/about" element={<About />} />
                <Route path="/go/:slug" element={<GoRedirect />} />
                <Route path="/compare/:slugs" element={<Compare />} />
                <Route path="/top/:category" element={<Leaderboard />} />
                <Route path="/top" element={<Leaderboard />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </Layout>
        </BrowserRouter>
      </ThemeProvider>
    </HelmetProvider>
  )
}
