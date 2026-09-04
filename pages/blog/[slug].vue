<script setup>
// TODO: Replace mock data with Storyblok API call
// import { useStoryblokApi } from '@storyblok/nuxt'
// const storyblokApi = useStoryblokApi()
// const route = useRoute()
// const { data } = await storyblokApi.get(`cdn/stories/blog/${route.params.slug}`, {
//   version: 'published',
// })
// const post = data.story.content

const route = useRoute()
const { siteUrl, whatsappUrl } = useSiteConfig()

// Mock articles — body array mirrors Storyblok rich-text blocks for easy swap
const articles = {
  'why-fluency-is-not-just-about-vocabulary': {
    title: 'Why fluency is not just about vocabulary',
    excerpt: 'Many learners focus on building vocabulary, yet still feel something is missing when they speak. The gap is almost never about words.',
    category: 'Language & Communication',
    readTime: '4 min read',
    date: '2026-08-18',
    image: '/imagens/personalized advice.JPG',
    body: [
      { type: 'p', text: 'When people describe their frustration with English, the most common assumption is that they need more words. More vocabulary. A richer lexicon. And so they study lists, download apps, and read articles — yet when the moment comes to speak, something still feels missing.' },
      { type: 'p', text: 'In my experience working with Spanish-speaking professionals over more than thirty years, the gap is almost never vocabulary. The words are there. What is missing is something subtler: the rhythm of a language, the way it breathes, the pauses that signal thinking rather than hesitation.' },
      { type: 'h2', text: 'The difference between knowing and using' },
      { type: 'p', text: 'There is a well-documented phenomenon in applied linguistics called the gap between receptive and productive knowledge. You may understand a word perfectly when you read it — you may even know three synonyms — but in real-time conversation, you cannot reach for it quickly enough. The word does not feel like yours yet.' },
      { type: 'p', text: 'This is not a vocabulary problem. It is a fluency problem — and fluency is about processing speed, not storage.' },
      { type: 'h2', text: 'What actually builds fluency' },
      { type: 'p', text: 'Fluency develops through repetition in context — through using language in situations that feel real and slightly pressured. Not drilling phrases from a textbook, but navigating actual conversations where the outcome matters. This is why professionals often progress faster when their practice is embedded in their professional world.' },
      { type: 'p', text: 'When I work with a client, we rarely begin with vocabulary exercises. We begin with listening — to how they speak, what they reach for under pressure, where they slow down. That is where the work begins.' },
      { type: 'h2', text: 'A different starting point' },
      { type: 'p', text: 'If you feel that something is missing when you speak English, consider that it might not be knowledge — it might be trust. Trust in the words you already have. Trust in the pauses. Trust in your own voice.' },
      { type: 'p', text: 'That is a different kind of work, and it is the kind I find most rewarding.' },
    ],
  },
  'how-to-sound-confident-in-english-meetings': {
    title: 'How to sound confident in English meetings',
    excerpt: 'Confidence in a meeting is not just about what you say — it is about pacing, phrasing, and knowing when to hold space.',
    category: 'Professional English',
    readTime: '5 min read',
    date: '2026-07-30',
    image: '/imagens/video call learning.JPG',
    body: [
      { type: 'p', text: 'A meeting in a foreign language is one of the most pressured communication situations a professional can face. The content is demanding, the stakes are real, and the expectation is that you will be articulate — in real time, without preparation.' },
      { type: 'p', text: 'Many of my clients describe a particular experience: they know exactly what they want to say, but by the time they find the words, the conversation has moved on. Or they speak, but sense that they sound less confident than they feel.' },
      { type: 'h2', text: 'Pacing is more powerful than vocabulary' },
      { type: 'p', text: 'The single most effective change most professionals can make is to slow down. Not because their English is poor, but because deliberate pacing reads as authority. Native speakers who are confident pause. They do not rush. A considered pause before a statement signals that what follows is worth hearing.' },
      { type: 'p', text: 'The instinct when speaking a second language is to fill space quickly — to demonstrate fluency by the pace of output. This instinct works against you. A slower pace with clear phrasing almost always reads as more professional than a rapid, anxious delivery.' },
      { type: 'h2', text: 'Transitional phrases that do real work' },
      { type: 'p', text: 'Certain phrases serve a double function in meetings: they signal that you are about to contribute, and they give you a moment to formulate your thought. Phrases like "What I would add to that is—" or "If I could come back to the earlier point—" are not filler. They are professional navigation tools.' },
      { type: 'p', text: 'Learning a small set of these phrases and making them genuinely yours — not recited, but fluent — changes how you participate in meetings.' },
    ],
  },
}

const slug = route.params.slug
const post = articles[slug]

if (!post) {
  throw createError({ statusCode: 404, statusMessage: 'Article not found' })
}

useSeoMeta({
  title: `${post.title} — Fluent Future`,
  description: post.excerpt,
})

useHead({
  link: [{ rel: 'canonical', href: `${siteUrl}/blog/${slug}` }],
})

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

const relatedSlugs = Object.keys(articles).filter(s => s !== slug).slice(0, 2)
const related = relatedSlugs.map(s => ({ slug: s, ...articles[s] }))

useRevealOnScroll()
</script>

<template>
  <div class="article-page">

    <!-- ── Hero — matches service pages style ── -->
    <section class="article-hero">
      <div class="wrap article-hero-inner reveal">
        <NuxtLink to="/blog" class="article-back">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
          Blog
        </NuxtLink>
        <div class="article-meta-row">
          <span class="article-cat">{{ post.category }}</span>
          <span class="meta-dot" aria-hidden="true"></span>
          <span>{{ formatDate(post.date) }}</span>
          <span class="meta-dot" aria-hidden="true"></span>
          <span>{{ post.readTime }}</span>
        </div>
        <h1 class="article-title">{{ post.title }}</h1>
        <p class="article-excerpt">{{ post.excerpt }}</p>
        <div class="article-author">
          <img src="/imagens/blanca.png" alt="Blanca Derby" class="author-avatar" />
          <div>
            <p class="author-name">Blanca Derby</p>
            <p class="author-role">Language Consultant · Fluent Future</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Hero image ── -->
    <div class="article-cover">
      <div class="wrap">
        <div class="article-cover-wrap">
          <img :src="post.image" :alt="post.title" />
        </div>
      </div>
    </div>

    <!-- ── Article body — centered text ── -->
    <article class="article-body">
      <div class="wrap">
        <div class="article-content">
          <template v-for="(block, i) in post.body" :key="i">
            <h2 v-if="block.type === 'h2'" class="content-h2">{{ block.text }}</h2>
            <p v-else-if="block.type === 'p'" class="content-p">{{ block.text }}</p>
          </template>

          <!-- End CTA -->
          <div class="article-end-cta">
            <p class="cta-label">Ready to work on your English communication?</p>
            <p class="cta-sub">Start with a conversation — no commitment, no rigid programmes.</p>
            <a :href="whatsappUrl" class="btn btn-primary" target="_blank" rel="noopener">
              Message Blanca on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </article>

    <!-- ── Related articles ── -->
    <section v-if="related.length" class="related-section">
      <div class="wrap">
        <h2 class="related-heading">More articles</h2>
        <ul class="related-grid" role="list">
          <li v-for="r in related" :key="r.slug">
            <NuxtLink :to="`/blog/${r.slug}`" class="blog-card">
              <div class="bc-image">
                <img :src="r.image" :alt="r.title" loading="lazy" />
              </div>
              <div class="bc-body">
                <span class="bc-cat">{{ r.category }}</span>
                <h3 class="bc-title">{{ r.title }}</h3>
                <p class="bc-excerpt">{{ r.excerpt }}</p>
                <div class="bc-meta">
                  <span>{{ formatDate(r.date) }}</span>
                  <span class="meta-dot" aria-hidden="true"></span>
                  <span>{{ r.readTime }}</span>
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
.article-page { background: var(--bg); }

/* ── Hero — same pattern as pc-hero ─────────── */
.article-hero {
  background: linear-gradient(135deg, rgba(19,72,78,.97) 0%, rgba(46,138,147,.93) 60%, rgba(93,179,188,.88) 100%);
  padding-top: clamp(80px, 12vw, 130px);
  padding-bottom: clamp(48px, 8vw, 80px);
  text-align: center;
  position: relative;
  overflow: hidden;
}
.article-hero::before {
  content: '';
  position: absolute; inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px);
  background-size: 24px 24px;
  pointer-events: none;
}
.article-hero-inner {
  position: relative; z-index: 1;
  max-width: 760px;
  display: flex; flex-direction: column; align-items: center; gap: 14px;
}

.article-back {
  display: inline-flex; align-items: center; gap: 5px;
  font-size: 13px; font-weight: 600;
  color: rgba(255,255,255,.65);
  text-decoration: none;
  transition: color .2s;
  align-self: flex-start;
}
.article-back:hover { color: #fff; }

.article-meta-row {
  display: flex; align-items: center; flex-wrap: wrap; justify-content: center;
  gap: 8px; font-size: 13px; color: rgba(255,255,255,.6);
}
.article-cat {
  font-size: 12px; font-weight: 700;
  text-transform: uppercase; letter-spacing: .1em;
  color: var(--amber);
}
.meta-dot {
  width: 3px; height: 3px; border-radius: 50%;
  background: rgba(255,255,255,.4); display: inline-block;
}

.article-title {
  font-family: var(--fd);
  font-size: clamp(24px, 4vw, 44px);
  font-weight: 700; color: #fff;
  line-height: 1.12; text-wrap: balance;
}
.article-excerpt {
  font-size: clamp(15px, 1.5vw, 17px);
  color: rgba(255,255,255,.75);
  line-height: 1.7; font-style: italic;
  max-width: 620px;
}

.article-author {
  display: flex; align-items: center; gap: 10px;
  margin-top: 4px;
  background: rgba(255,255,255,.08);
  border: 1px solid rgba(255,255,255,.15);
  border-radius: 999px;
  padding: 6px 16px 6px 6px;
}
.author-avatar {
  width: 34px; height: 34px;
  border-radius: 50%;
  object-fit: cover; object-position: top center;
  border: 2px solid rgba(255,255,255,.3);
  flex-shrink: 0;
}
.author-name {
  font-size: 13px; font-weight: 700; color: #fff;
}
.author-role { font-size: 11px; color: rgba(255,255,255,.6); }

/* ── Cover image ────────────────────────────── */
.article-cover { padding-block: clamp(32px, 5vw, 48px) clamp(16px, 3vw, 24px); }
.article-cover-wrap {
  max-width: 800px;
  margin-inline: auto;
  border-radius: 20px; overflow: hidden;
  aspect-ratio: 16/7;
  box-shadow: var(--sh-md);
}
.article-cover-wrap img {
  width: 100%; height: 100%;
  object-fit: cover; object-position: center;
}

/* ── Body — centered single column ──────────── */
.article-body { padding-block: clamp(16px, 3vw, 32px) clamp(56px, 8vw, 96px); }

.article-content {
  max-width: 700px;
  margin-inline: auto;
}

.content-h2 {
  font-family: var(--fd);
  font-size: clamp(20px, 2.2vw, 26px);
  font-weight: 700; color: var(--text);
  line-height: 1.25; text-wrap: balance;
  margin-top: 48px; margin-bottom: 16px;
}
.content-p {
  font-size: clamp(16px, 1.5vw, 17.5px);
  color: var(--text2);
  line-height: 1.85; margin-bottom: 22px;
}

.article-end-cta {
  margin-top: 60px;
  padding: clamp(28px, 5vw, 40px);
  background: linear-gradient(135deg, var(--teal-t1) 0%, rgba(46,138,147,.08) 100%);
  border: 1px solid rgba(46,138,147,.2);
  border-radius: 20px;
  text-align: center;
  display: flex; flex-direction: column; align-items: center; gap: 10px;
}
.cta-label {
  font-family: var(--fd);
  font-size: clamp(18px, 2vw, 22px);
  font-weight: 700; color: var(--text);
}
.cta-sub {
  font-size: 15px; color: var(--text2); line-height: 1.6;
}
.article-end-cta .btn { margin-top: 6px; }

/* ── Related ─────────────────────────────────── */
.related-section {
  padding-block: clamp(40px, 6vw, 64px);
  border-top: 1px solid var(--border);
  background: var(--surface);
}
.related-heading {
  font-family: var(--fd);
  font-size: clamp(18px, 2vw, 22px);
  font-weight: 700; color: var(--text); margin-bottom: 24px;
}
.related-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr));
  gap: clamp(16px, 2.5vw, 24px);
  list-style: none;
}
.blog-card {
  display: flex; flex-direction: column;
  background: var(--bg); border: 1px solid var(--border);
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
.bc-body { display: flex; flex-direction: column; gap: 8px; padding: 18px; flex: 1; }
.bc-cat { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: .1em; color: var(--teal); }
.bc-title { font-family: var(--fd); font-size: clamp(15px, 1.4vw, 17px); font-weight: 700; color: var(--text); line-height: 1.3; text-wrap: balance; }
.bc-excerpt { font-size: 13.5px; color: var(--text2); line-height: 1.65; flex: 1; }
.bc-meta { display: flex; align-items: center; gap: 6px; font-size: 12px; color: var(--text3); margin-top: 4px; }
</style>
