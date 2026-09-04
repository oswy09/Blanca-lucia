<script setup>
// TODO: Replace mock data with Storyblok API call
// import { useStoryblokApi } from '@storyblok/nuxt'
// const storyblokApi = useStoryblokApi()
// const { data } = await storyblokApi.get('cdn/stories', {
//   version: 'published', starts_with: 'blog/', sort_by: 'first_published_at:desc',
// })

const { siteUrl } = useSiteConfig()

useSeoMeta({
  title: 'Blog — Fluent Future · Blanca Derby',
  description: 'Insights on English communication, language learning, and professional expression — from Blanca Derby.',
})

useHead({
  link: [{ rel: 'canonical', href: `${siteUrl}/blog` }],
})

// Mock posts — mirrors Storyblok Story shape for easy swap
const posts = [
  {
    slug: 'why-fluency-is-not-just-about-vocabulary',
    title: 'Why fluency is not just about vocabulary',
    excerpt: 'Many learners focus on building vocabulary, yet still feel something is missing when they speak. The gap is almost never about words.',
    category: 'Language & Communication',
    readTime: '4 min read',
    date: '2026-08-18',
    image: '/imagens/personalized advice.JPG',
    featured: true,
  },
  {
    slug: 'how-to-sound-confident-in-english-meetings',
    title: 'How to sound confident in English meetings',
    excerpt: 'Confidence in a meeting is not just about what you say — it is about pacing, phrasing, and knowing when to hold space.',
    category: 'Professional English',
    readTime: '5 min read',
    date: '2026-07-30',
    image: '/imagens/video call learning.JPG',
    featured: false,
  },
  {
    slug: 'the-difference-between-correct-and-natural-english',
    title: 'The difference between correct and natural English',
    excerpt: 'Grammar rules will get you to correct. But natural expression — the kind that earns trust — comes from something deeper.',
    category: 'Language & Communication',
    readTime: '3 min read',
    date: '2026-07-14',
    image: '/imagens/adult learning English.jpg',
    featured: false,
  },
  {
    slug: 'writing-professional-emails-in-english',
    title: 'Writing professional emails in English: what most guides miss',
    excerpt: 'Most advice focuses on grammar and template phrases. What actually makes an email professional is something subtler.',
    category: 'Professional Writing',
    readTime: '6 min read',
    date: '2026-06-22',
    image: '/imagens/woman speechless.JPG',
    featured: false,
  },
  {
    slug: 'preparing-for-english-job-interviews',
    title: 'Preparing for English job interviews as a native Spanish speaker',
    excerpt: 'An interview is not a test of your English level. It is a conversation — and preparation changes everything about how you show up.',
    category: 'Interview Preparation',
    readTime: '7 min read',
    date: '2026-06-05',
    image: '/imagens/live-session.webp',
    featured: false,
  },
]

const featured = posts.find(p => p.featured)
const rest = posts.filter(p => !p.featured)

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

useRevealOnScroll()
</script>

<template>
  <div class="blog-page">

    <!-- ── Hero (matches service pages style) ── -->
    <section class="blog-hero">
      <div class="wrap blog-hero-inner reveal">
        <span class="eyebrow blog-eyebrow">Blog</span>
        <h1 class="blog-hero-title">Insights on language,<br>communication &amp; professional English</h1>
        <p class="blog-hero-sub">Practical perspectives from over 30 years working with Spanish-speaking professionals.</p>
      </div>
    </section>

    <!-- ── Featured post ── -->
    <section v-if="featured" class="blog-featured-section">
      <div class="wrap">
        <NuxtLink :to="`/blog/${featured.slug}`" class="blog-featured-card reveal">
          <div class="bfc-image">
            <img :src="featured.image" :alt="featured.title" />
            <span class="bfc-badge">Featured</span>
          </div>
          <div class="bfc-content">
            <span class="bfc-cat">{{ featured.category }}</span>
            <h2 class="bfc-title">{{ featured.title }}</h2>
            <p class="bfc-excerpt">{{ featured.excerpt }}</p>
            <div class="bfc-meta">
              <span>{{ formatDate(featured.date) }}</span>
              <span class="meta-dot" aria-hidden="true"></span>
              <span>{{ featured.readTime }}</span>
            </div>
            <span class="bfc-read">Read article →</span>
          </div>
        </NuxtLink>
      </div>
    </section>

    <!-- ── Post grid ── -->
    <section class="blog-grid-section">
      <div class="wrap">
        <p class="blog-section-label">All articles</p>
        <ul class="blog-grid" role="list">
          <li v-for="post in rest" :key="post.slug" class="blog-card-wrap">
            <NuxtLink :to="`/blog/${post.slug}`" class="blog-card reveal">
              <div class="bc-image">
                <img :src="post.image" :alt="post.title" loading="lazy" />
              </div>
              <div class="bc-body">
                <span class="bc-cat">{{ post.category }}</span>
                <h3 class="bc-title">{{ post.title }}</h3>
                <p class="bc-excerpt">{{ post.excerpt }}</p>
                <div class="bc-meta">
                  <span>{{ formatDate(post.date) }}</span>
                  <span class="meta-dot" aria-hidden="true"></span>
                  <span>{{ post.readTime }}</span>
                </div>
              </div>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </section>

  </div>
</template>

<style scoped>
.blog-page { background: var(--bg); }

/* ── Hero — matches pc-hero pattern ─────────── */
.blog-hero {
  background: linear-gradient(135deg, rgba(19,72,78,.97) 0%, rgba(46,138,147,.93) 60%, rgba(93,179,188,.88) 100%);
  padding-top: clamp(88px, 12vw, 140px);
  padding-bottom: clamp(48px, 8vw, 80px);
  text-align: center;
  position: relative;
  overflow: hidden;
}
.blog-hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px);
  background-size: 24px 24px;
  pointer-events: none;
}
.blog-hero-inner { position: relative; z-index: 1; }
.blog-eyebrow { color: rgba(255,255,255,.7); margin-bottom: 14px; }
.blog-hero-title {
  font-family: var(--fd);
  font-size: clamp(28px, 4.5vw, 52px);
  font-weight: 700;
  color: #fff;
  line-height: 1.12;
  margin-bottom: 14px;
  text-wrap: balance;
}
.blog-hero-sub {
  font-size: clamp(15px, 1.5vw, 17px);
  color: rgba(255,255,255,.75);
  font-style: italic;
  max-width: 560px;
  margin-inline: auto;
}

/* ── Featured ───────────────────────────────── */
.blog-featured-section { padding-block: clamp(48px, 7vw, 72px) clamp(24px, 3vw, 32px); }

.blog-featured-card {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(24px, 4vw, 48px);
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 24px;
  overflow: hidden;
  text-decoration: none;
  transition: box-shadow .25s ease, transform .25s ease;
  box-shadow: var(--sh-sm);
}
.blog-featured-card:hover { box-shadow: var(--sh-lg); transform: translateY(-3px); }

.bfc-image {
  position: relative;
  overflow: hidden;
  aspect-ratio: 4/3;
}
.bfc-image img {
  width: 100%; height: 100%;
  object-fit: cover; object-position: center;
  transition: transform .5s ease;
}
.blog-featured-card:hover .bfc-image img { transform: scale(1.04); }

.bfc-badge {
  position: absolute; top: 16px; left: 16px;
  background: var(--teal); color: #fff;
  font-size: 11px; font-weight: 700;
  text-transform: uppercase; letter-spacing: .08em;
  padding: 4px 10px; border-radius: 999px;
}

.bfc-content {
  display: flex; flex-direction: column; justify-content: center;
  padding: clamp(24px, 4vw, 40px) clamp(24px, 4vw, 40px) clamp(24px, 4vw, 40px) 0;
  gap: 10px;
}

.bfc-cat {
  font-size: 12px; font-weight: 600;
  text-transform: uppercase; letter-spacing: .1em; color: var(--teal);
}
.bfc-title {
  font-family: var(--fd);
  font-size: clamp(20px, 2.2vw, 28px);
  font-weight: 700; color: var(--text);
  line-height: 1.25; text-wrap: balance;
}
.bfc-excerpt { font-size: 15px; color: var(--text2); line-height: 1.7; }
.bfc-meta {
  display: flex; align-items: center; gap: 8px;
  font-size: 13px; color: var(--text3);
}
.meta-dot {
  width: 3px; height: 3px; border-radius: 50%;
  background: var(--text3); display: inline-block;
}
.bfc-read { font-size: 14px; font-weight: 600; color: var(--teal); margin-top: 4px; }

/* ── Grid ───────────────────────────────────── */
.blog-grid-section { padding-block: clamp(24px, 3vw, 32px) clamp(64px, 8vw, 100px); }

.blog-section-label {
  font-size: 13px; font-weight: 600;
  text-transform: uppercase; letter-spacing: .12em;
  color: var(--text3); margin-bottom: 28px;
}

.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr));
  gap: clamp(20px, 3vw, 28px);
  list-style: none;
}

.blog-card {
  display: flex; flex-direction: column;
  background: var(--surface); border: 1px solid var(--border);
  border-radius: 20px; overflow: hidden; text-decoration: none;
  transition: box-shadow .25s ease, transform .25s ease;
  height: 100%; box-shadow: var(--sh-sm);
}
.blog-card:hover { box-shadow: var(--sh-md); transform: translateY(-2px); }

.bc-image { overflow: hidden; aspect-ratio: 16/9; }
.bc-image img {
  width: 100%; height: 100%;
  object-fit: cover; object-position: center;
  transition: transform .45s ease;
}
.blog-card:hover .bc-image img { transform: scale(1.05); }

.bc-body {
  display: flex; flex-direction: column;
  gap: 8px; padding: 20px; flex: 1;
}
.bc-cat {
  font-size: 11px; font-weight: 700;
  text-transform: uppercase; letter-spacing: .1em; color: var(--teal);
}
.bc-title {
  font-family: var(--fd);
  font-size: clamp(16px, 1.6vw, 19px);
  font-weight: 700; color: var(--text);
  line-height: 1.3; text-wrap: balance;
}
.bc-excerpt { font-size: 14px; color: var(--text2); line-height: 1.68; flex: 1; }
.bc-meta {
  display: flex; align-items: center; gap: 6px;
  font-size: 12px; color: var(--text3); margin-top: 4px;
}

/* ── Responsive ─────────────────────────────── */
@media (max-width: 800px) {
  .blog-featured-card { grid-template-columns: 1fr; }
  .bfc-image { aspect-ratio: 16/9; }
  .bfc-content { padding: 20px 20px 28px; gap: 8px; }
}
</style>
