// scripts/generate-sitemap.js — 自动从 tools.json + BlogPost 数据生成 sitemap.xml
const fs = require('fs')
const path = require('path')

const BASE = 'https://aitools.xxddsses.com'

// 读取工具数据
const toolsPath = path.join(__dirname, '..', 'src', 'data', 'tools.json')
const tools = JSON.parse(fs.readFileSync(toolsPath, 'utf-8'))

// 读取博客文章 slug（从 BlogPost.jsx 的 POSTS 对象提取）
const blogPath = path.join(__dirname, '..', 'src', 'pages', 'BlogPost.jsx')
const blogContent = fs.readFileSync(blogPath, 'utf-8')
const slugMatches = blogContent.matchAll(/'([a-z0-9-]+)':\s*\{/g)
const blogSlugs = [...slugMatches].map(m => m[1]).filter(s =>
  !['title', 'date', 'category', 'readTime', 'image', 'content', 'excerpt', 'keywords', 'tools'].includes(s)
)

// 分类
const categories = ['ai-writing', 'ai-image', 'ai-coding', 'ai-seo', 'ai-video']

// 生成 sitemap
const urls = []

// 静态页
urls.push({ loc: `${BASE}/`, priority: '1.0', changefreq: 'weekly' })
urls.push({ loc: `${BASE}/tools`, priority: '0.9', changefreq: 'weekly' })
urls.push({ loc: `${BASE}/blog`, priority: '0.9', changefreq: 'weekly' })
urls.push({ loc: `${BASE}/compare`, priority: '0.8', changefreq: 'weekly' })
urls.push({ loc: `${BASE}/top`, priority: '0.8', changefreq: 'weekly' })
urls.push({ loc: `${BASE}/about`, priority: '0.5', changefreq: 'monthly' })

// 分类页
categories.forEach(cat => {
  urls.push({ loc: `${BASE}/tools/${cat}`, priority: '0.8', changefreq: 'weekly' })
  urls.push({ loc: `${BASE}/top/${cat}`, priority: '0.7', changefreq: 'weekly' })
})

// 工具详情页
tools.forEach(t => {
  urls.push({ loc: `${BASE}/tool/${t.slug}`, priority: '0.8', changefreq: 'monthly' })
})

// 博客文章
blogSlugs.forEach(slug => {
  urls.push({ loc: `${BASE}/blog/${slug}`, priority: '0.7', changefreq: 'monthly' })
})

// 生成 XML
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u =>
  `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
).join('\n')}
</urlset>
`

// 输出到 public/ 和 dist/
const outPaths = [
  path.join(__dirname, '..', 'public', 'sitemap.xml'),
  path.join(__dirname, '..', 'dist', 'sitemap.xml'),
]

outPaths.forEach(p => {
  const dir = path.dirname(p)
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(p, xml)
  console.log(`✅ Sitemap generated: ${p} (${urls.length} URLs)`)
})

console.log(`\nBreakdown: ${tools.length} tools + ${blogSlugs.length} blog posts + ${categories.length * 2} category pages + 6 static pages`)
