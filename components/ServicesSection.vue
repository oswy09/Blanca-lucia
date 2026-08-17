<script setup>
// Storyblok: blok.services (array)
const services = [
  {
    slug: 'professional-communication',
    icon: 'chat',
    theme: 'coral',
    eyebrow: 'Professional Communication',
    title: 'Personal language consultancy, tailored to you',
    metric: '01',
    metricLabel: 'High-stakes clarity',
    cardHint: 'Meetings, presentations, client calls',
    desc: 'Focused support for professionals who want to communicate clearly and confidently in meetings, presentations, and everyday interactions.',
  },
  {
    slug: 'interview-preparation',
    icon: 'calendar',
    theme: 'amber',
    eyebrow: 'Interview & Career Communication',
    title: 'English Interview Preparation',
    metric: '02',
    metricLabel: 'Confident answers',
    cardHint: 'Positioning, pressure handling, voice',
    desc: 'Preparation for interviews and professional conversations, with a focus on expressing your experience clearly and confidently.',
  },
  {
    slug: 'professional-writing-editing',
    icon: 'doc',
    theme: 'teal',
    eyebrow: 'Written Communication',
    title: 'Professional Writing & Editing',
    metric: '03',
    metricLabel: 'Sharper writing',
    cardHint: 'Emails, decks and reports that sound like you',
    desc: 'Careful review and refinement of emails, documents, and professional writing.',
  },
]
</script>

<template>
  <section class="svc-sec" id="services">
    <div class="wrap">
      <div class="svc-header reveal">
        <span class="eyebrow">Services</span>
        <h2 class="section-title">How can I help you?</h2>
        <p class="section-desc">Each engagement is shaped around your individual needs, with a focus on clear, confident, and natural communication.</p>
      </div>

      <div class="svc-grid">
        <article v-for="(s, i) in services" :key="s.slug" class="svc-item reveal" :class="`svc-item--${s.theme}`" :style="{ transitionDelay: `${i * 110}ms`, position: 'relative' }">
          <div class="svc-card">
            <div class="svc-bg-shape" aria-hidden="true"></div>

            <div class="svc-icon">
            <!-- Chat icon -->
            <svg v-if="s.icon === 'chat'" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
            </svg>
            <!-- Calendar icon -->
            <svg v-else-if="s.icon === 'calendar'" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="3"/><path d="M3 9h18M8 2v4M16 2v4"/>
            </svg>
            <!-- Doc icon -->
            <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 19V5a2 2 0 0 1 2-2h11l3 3v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z"/><path d="M9 15h6M9 11h6"/>
            </svg>
            </div>

            <p class="svc-card-hint">{{ s.cardHint }}</p>

            <div class="svc-metric-wrap">
              <p class="svc-metric">{{ s.metric }}</p>
            </div>
          </div>

          <ScrollBubble v-if="s.slug === 'professional-communication'" :text="['Sound like you!', 'Speak naturally']" position="top-right" :delay="200" />
          <ScrollBubble v-if="s.slug === 'interview-preparation'" :text="['Prepare your interviews', 'Confident voice']" position="top-right" :delay="400" />
          <ScrollBubble v-if="s.slug === 'professional-writing-editing'" :text="['Polished writing', 'Clear emails']" position="top-right" :delay="600" />

          <h3 class="svc-outside svc-title">{{ s.title }}</h3>
          <p class="svc-outside svc-outside--bottom">{{ s.desc }}</p>

          <NuxtLink :to="`/services/${s.slug}`" class="svc-link">
            Find out more <span aria-hidden="true">→</span>
          </NuxtLink>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.svc-sec { padding-block: var(--spy); }
.svc-header { margin-bottom: 52px; }

.svc-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 26px;
}

.svc-item {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.svc-card {
  position: relative;
  border-radius: 14px;
  min-height: 240px;
  padding: 18px 16px 14px;
  overflow: hidden;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: box-shadow .2s, transform .2s;
}
.svc-item:hover .svc-card { box-shadow: var(--sh-lg); transform: translateY(-3px); }

.svc-item--coral .svc-card { background: linear-gradient(150deg, var(--coral-t2) 0%, var(--coral)     100%); }
.svc-item--amber .svc-card { background: linear-gradient(150deg, var(--amber-t1) 0%, var(--amber)     100%); color: var(--n800); }
.svc-item--teal  .svc-card { background: linear-gradient(150deg, var(--teal-t2)  0%, var(--teal)      100%); }

/* Amber card: dark text on light yellow background */
.svc-item--amber .svc-icon        { background: rgba(0,0,0,.10); color: var(--n800); }
.svc-item--amber .svc-card-hint   { color: rgba(0,0,0,.62); }
.svc-item--amber .svc-metric-label { color: rgba(0,0,0,.75); }
.svc-item--amber .svc-bg-shape    { background: rgba(255,255,255,.28); }

.svc-bg-shape {
  position: absolute;
  right: -18px;
  top: 52px;
  width: 70%;
  aspect-ratio: 1;
  border-radius: 24px;
  background: rgba(255,255,255,.19);
  transform: rotate(8deg);
  pointer-events: none;
}

.svc-icon {
  width: 56px;
  height: 56px;
  border-radius: 999px;
  background: rgba(255,255,255,.22);
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255,255,255,.95);
  position: relative;
  z-index: 2;
}

.svc-card-hint {
  position: relative;
  z-index: 2;
  margin-top: 10px;
  max-width: 82%;
  font-size: 13px;
  line-height: 1.3;
  color: rgba(255,255,255,.92);
}

.svc-metric-wrap {
  position: relative;
  z-index: 2;
}

.svc-metric {
  font-family: var(--fd);
  font-size: clamp(44px, 4vw, 58px);
  line-height: .9;
  letter-spacing: -.03em;
  font-weight: 700;
}

.svc-metric-label {
  margin-top: 4px;
  font-size: 25px;
  font-weight: 700;
  color: rgba(255,255,255,.96);
  line-height: 1;
}

.svc-outside {
  margin: 0;
}

.svc-outside--top {
  font-size: 13px;
  font-weight: 700;
  letter-spacing: .01em;
  color: var(--text2);
}

.svc-title {
  font-family: var(--fd);
  font-size: 24px;
  line-height: 1.05;
  margin-top: 10px;
}

.svc-outside--bottom {
  color: var(--text2);
  font-size: 14px;
  line-height: 1.6;
  margin-top: 4px;
}

.svc-link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  font-weight: 700;
  color: var(--teal);
  text-decoration: none;
  margin-top: 8px;
}
.svc-link:hover { color: var(--teal-sh); }

@media (max-width: 800px) { .svc-grid { grid-template-columns: 1fr; } }

@media (min-width: 500px) and (max-width: 980px) {
  .svc-grid { grid-template-columns: 1fr 1fr; }
}
</style>
