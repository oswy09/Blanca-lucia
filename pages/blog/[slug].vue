<script setup>
const route = useRoute()
const { siteUrl, whatsappUrl } = useSiteConfig()
const slug = route.params.slug

const { data: post } = await useFetch(`/api/blog/${slug}`, {
  key: `blog-post-${slug}`,
})

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Article not found' })
}

useSeoMeta({
  title: `${post.value.title} — Fluent Future`,
  description: post.value.excerpt,
})

useHead({
  link: [{ rel: 'canonical', href: `${siteUrl}/blog/${slug}` }],
})

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

const related = []

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
      </div>
    </section>

    <!-- ── Article body — centered text ── -->
    <article class="article-body">
      <div class="wrap">
        <div class="article-content">
          <!-- Storyblok rich text (when token is active) -->
          <div v-if="post.sbBody" class="sb-richtext" v-html="renderRichText(post.sbBody)" />
          <!-- Mock body blocks (development fallback) -->
          <template v-else-if="post.body" v-for="(block, i) in post.body" :key="i">
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


/* ── Body — centered single column ──────────── */
.article-body { padding-block: clamp(16px, 3vw, 32px) clamp(56px, 8vw, 96px); }

.article-content {
  max-width: 700px;
  margin-inline: auto;
}

/* Storyblok rich text output */
.sb-richtext :deep(h2) {
  font-family: var(--fd);
  font-size: clamp(20px, 2.2vw, 26px);
  font-weight: 700; color: var(--text);
  line-height: 1.25; text-wrap: balance;
  margin-top: 48px; margin-bottom: 16px;
}
.sb-richtext :deep(p) {
  font-size: clamp(16px, 1.5vw, 17.5px);
  color: var(--text2); line-height: 1.85; margin-bottom: 22px;
}
.sb-richtext :deep(a) { color: var(--teal); text-decoration: underline; }
.sb-richtext :deep(strong) { font-weight: 700; color: var(--text); }
.sb-richtext :deep(em) { font-style: italic; }
.sb-richtext :deep(ul), .sb-richtext :deep(ol) {
  padding-left: 24px; margin-bottom: 22px;
}
.sb-richtext :deep(li) {
  font-size: clamp(16px, 1.5vw, 17.5px);
  color: var(--text2); line-height: 1.75; margin-bottom: 8px;
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
.bc-body { display: flex; flex-direction: column; gap: 8px; padding: 18px; flex: 1; }
.bc-cat { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: .1em; color: var(--teal); }
.bc-title { font-family: var(--fd); font-size: clamp(15px, 1.4vw, 17px); font-weight: 700; color: var(--text); line-height: 1.3; text-wrap: balance; }
.bc-excerpt { font-size: 13.5px; color: var(--text2); line-height: 1.65; flex: 1; }
.bc-meta { display: flex; align-items: center; gap: 6px; font-size: 12px; color: var(--text3); margin-top: 4px; }
</style>
