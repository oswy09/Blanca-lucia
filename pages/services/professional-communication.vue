<script setup>
const { siteUrl, whatsappUrl } = useSiteConfig()

const workItems = [
  'Speaking clearly and confidently',
  'Expressing your ideas concisely',
  'Participating effectively in meetings',
  'Presenting your opinions and recommendations',
  'Communicating with clients and colleagues',
  'Adjusting your tone to different professional situations',
  'Avoiding direct translation from Spanish',
  'Finding natural and appropriate ways to express yourself',
  'Building confidence when speaking spontaneously',
  'Understanding how cultural differences can influence communication',
]

const expects = [
  { label: 'What you say', color: 'teal', desc: 'choosing the right words and expressions.' },
  { label: 'How you say it', color: 'coral', desc: 'using appropriate tone and emphasis.' },
  { label: 'How you present yourself', color: 'amber', desc: 'communicating your experience and ideas with confidence.' },
  { label: 'How you respond', color: 'teal', desc: 'handling conversations more naturally and spontaneously.' },
]

useSeoMeta({
  title: 'Professional Communication & Confidence | Fluent Future',
  description: 'Communicate clearly and confidently in English. Individual coaching for professionals who want their English to reflect their expertise.',
  robots: 'index, follow',
  ogType: 'website',
  ogTitle: 'Professional Communication & Confidence | Fluent Future',
  ogDescription: 'Individual coaching to help you communicate clearly and confidently in English professional situations.',
  ogUrl: 'https://fluentfuture.co.uk/services/professional-communication',
  ogSiteName: 'Fluent Future — Blanca Derby',
  ogLocale: 'en_GB',
})

useHead({
  link: [{ rel: 'canonical', href: `${siteUrl}/services/professional-communication` }],
})

useRevealOnScroll()
</script>

<template>
  <main class="pc-page">
    <!-- ── 1. HERO ─────────────────────────────────────────────── -->
    <section class="pc-hero">
      <div class="wrap pc-hero-inner reveal">
        <span class="eyebrow pc-hero-eyebrow">Service</span>
        <h1 class="pc-hero-title">Professional Communication &amp; Confidence</h1>
        <p class="pc-hero-sub">Communicate clearly. Project yourself confidently.</p>
      </div>
    </section>

    <!-- ── 2. BACK LINK ──────────────────────────────────────────── -->
    <div class="wrap pc-back-wrap reveal">
      <NuxtLink to="/services" class="back-link">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
          <path d="m15 18-6-6 6-6"/>
        </svg>
        All services
      </NuxtLink>
    </div>

    <!-- ── 3. INTRO GRID ─────────────────────────────────────────── -->
    <section class="pc-main-content wrap">
      <div class="pc-grid">
        <div class="pc-intro-section reveal">
          <h2 class="pc-section-title">Knowing English is one thing. Using it confidently in professional situations is another.</h2>
          <p class="pc-lead-text">
            You may have the vocabulary and knowledge you need, yet still find yourself translating from Spanish, searching for the right words, speaking less than you would in your own language, or worrying about how you are being perceived.
          </p>
          <div class="pc-highlight-box">
            <div class="pc-highlight-border"></div>
            <p class="pc-highlight-text"><strong>That's where I can help.</strong></p>
          </div>
        </div>

        <div class="pc-sidebar-section reveal">
          <div class="pc-card">
            <h3 class="pc-card-title">Communication is more than words</h3>
            <p class="pc-card-text">
              Professional communication is about much more than grammar.
            </p>
            <p class="pc-card-text">
              It's about clarity, tone, confidence, intention and perception.
            </p>
            <p class="pc-card-text">
              Together, we can work on how you express your ideas so that your English reflects your knowledge, experience and professional ability.
            </p>
            <div class="pc-card-footer">
              <span class="pc-footer-icon" aria-hidden="true">💬</span>
              <p class="pc-footer-text">
                Your words should represent who you are — clearly and naturally.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── 4. WHAT CAN WE WORK ON ────────────────────────────────── -->
    <section class="pc-work wrap reveal">
      <div class="pc-work-grid">
        <div class="pc-work-content">
          <h3 class="pc-subtitle">What can we work on?</h3>
          <p class="pc-work-intro">Depending on your individual needs, we can focus on:</p>
        </div>
        <div class="pc-work-card">
          <ul class="pc-help-list">
            <li v-for="item in workItems" :key="item">
              <div class="pc-bullet-check">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <span>{{ item }}</span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- ── 5. LIVE SESSION WIDGET ─────────────────────────────────── -->
    <section class="pc-session-wrap wrap">
      <div class="pc-session-banner reveal">
        <div class="pc-session-content">
          <span class="eyebrow pc-session-eyebrow">How We Work</span>
          <h3 class="pc-session-title">All sessions are conducted online</h3>
          <p class="pc-session-desc">
            We meet via video call, making it easy to work together wherever you are in the world. Sessions are personal, focused, and structured entirely around your needs.
          </p>
          <NuxtLink to="/contact" class="btn pc-session-btn">Book a session</NuxtLink>
        </div>
        <LiveSessionWidget />
      </div>
    </section>

    <!-- ── 6. BRIDGE THAT GAP ─────────────────────────────────────── -->
    <section class="pc-bridge wrap reveal">
      <h3 class="pc-subtitle">Your English should not hide your expertise</h3>
      <div class="pc-bridge-grid">
        <div>
          <p class="pc-bridge-text">Sometimes the problem isn't a lack of knowledge. It's that your English doesn't allow you to show what you already know.</p>
          <p class="pc-bridge-text">My role is to help you bridge that gap.</p>
          <p class="pc-bridge-text">Through practical, individual work based on situations that are relevant to your professional life, we can identify where communication becomes difficult and develop strategies that work for you.</p>
        </div>
        <div>
          <p class="pc-bridge-text">The goal isn't to make you sound like somebody else.</p>
          <p class="pc-bridge-text pc-bridge-text--em">The goal is to help you sound like yourself — confidently, naturally and effectively in English.</p>
        </div>
      </div>
    </section>

    <!-- ── 7. WHAT YOU CAN EXPECT ─────────────────────────────────── -->
    <section class="pc-expect wrap reveal">
      <div class="pc-expect-header">
        <h3 class="pc-subtitle text-center">What you can expect</h3>
        <p class="pc-expect-intro text-center">You will develop greater confidence in:</p>
      </div>
      <div class="pc-expect-grid">
        <div v-for="exp in expects" :key="exp.label" class="pc-expect-card">
          <div class="pc-expect-tag" :class="`expect-tag--${exp.color}`">{{ exp.label }}</div>
          <p class="pc-expect-desc">{{ exp.desc }}</p>
        </div>
      </div>
    </section>

    <!-- ── 8. CTA ──────────────────────────────────────────────────── -->
    <section class="pc-cta">
      <div class="wrap pc-cta-inner reveal">
        <h2 class="pc-cta-title">Ready to communicate with greater confidence?</h2>
        <p class="pc-cta-desc">Let's talk about the situations you find challenging and see how I can help.</p>
        <div class="pc-cta-actions">
          <NuxtLink to="/contact" class="btn btn-primary">Get in Touch</NuxtLink>
          <a :href="whatsappUrl" class="btn btn-secondary" target="_blank" rel="noopener">Contact on WhatsApp</a>
        </div>
      </div>
    </section>
  </main>
</template>


<style scoped>
.pc-page { background: var(--bg); }

/* ── Hero ── */
.pc-hero {
  background: linear-gradient(135deg, rgba(19,72,78,.97) 0%, rgba(46,138,147,.93) 60%, rgba(93,179,188,.88) 100%);
  padding-top: clamp(88px, 12vw, 140px);
  padding-bottom: clamp(48px, 8vw, 80px);
  text-align: center;
  position: relative;
  overflow: hidden;
}
.pc-hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px);
  background-size: 24px 24px;
  pointer-events: none;
}
.pc-hero-inner { position: relative; z-index: 1; }
.pc-hero-eyebrow { color: rgba(255,255,255,.7); margin-bottom: 14px; }
.pc-hero-title {
  font-family: var(--fd);
  font-size: clamp(28px, 4.5vw, 52px);
  font-weight: 700;
  color: #fff;
  line-height: 1.12;
  margin-bottom: 14px;
}
.pc-hero-sub {
  font-size: clamp(15px, 1.5vw, 17px);
  color: rgba(255,255,255,.75);
  font-style: italic;
}

/* ── Back link ── */
.pc-back-wrap { padding-top: 36px; }
.back-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13.5px;
  color: var(--text2);
  text-decoration: none;
  transition: color .15s;
}
.back-link:hover { color: var(--teal); }

/* ── Main grid ── */
.pc-main-content { padding-block: clamp(40px, 6vw, 72px); }
.pc-grid {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: clamp(36px, 6vw, 72px);
  align-items: start;
}
.pc-section-title {
  font-family: var(--fd);
  font-size: clamp(20px, 2.4vw, 28px);
  font-weight: 700;
  color: var(--text);
  line-height: 1.25;
  margin-bottom: 20px;
}
.pc-lead-text {
  font-size: 15.5px;
  color: var(--text2);
  line-height: 1.78;
  margin-bottom: 20px;
  font-style: italic;
}
.pc-highlight-box {
  display: flex;
  gap: 16px;
  background: var(--teal-t1);
  border-radius: 12px;
  padding: 18px 20px;
}
.pc-highlight-border {
  width: 3px;
  border-radius: 2px;
  background: var(--teal);
  flex-shrink: 0;
}
.pc-highlight-text { font-size: 15px; color: var(--text); line-height: 1.6; }

/* Sidebar card */
.pc-card {
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 28px;
  box-shadow: var(--sh-sm);
}
.pc-card-title {
  font-family: var(--fd);
  font-size: 18px;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 14px;
}
.pc-card-text {
  font-size: 14.5px;
  color: var(--text2);
  line-height: 1.7;
  margin-bottom: 10px;
}
.pc-card-footer {
  display: flex;
  gap: 12px;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid var(--border);
  align-items: flex-start;
}
.pc-footer-icon { font-size: 20px; line-height: 1.4; }
.pc-footer-text { font-size: 13.5px; color: var(--text2); font-style: italic; line-height: 1.6; }

/* ── What we work on ── */
.pc-work { padding-block: clamp(32px, 5vw, 56px); }
.pc-subtitle {
  font-family: var(--fd);
  font-size: clamp(20px, 2.4vw, 28px);
  font-weight: 700;
  color: var(--text);
  margin-bottom: 10px;
}
.pc-work-grid {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: clamp(28px, 5vw, 56px);
  align-items: start;
}
.pc-work-intro { font-size: 14.5px; color: var(--text2); line-height: 1.65; }
.pc-work-card {
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 18px;
  padding: 24px 28px;
  box-shadow: var(--sh-sm);
}
.pc-help-list {
  list-style: none;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px 24px;
}
.pc-help-list li {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 14px;
  color: var(--text2);
  line-height: 1.5;
}
.pc-bullet-check {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--teal-t1);
  color: var(--teal);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 1px;
}

/* ── Live session banner ── */
.pc-session-wrap { padding-block: clamp(24px, 4vw, 44px); }
.pc-session-banner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(28px, 4vw, 52px);
  align-items: center;
  background: linear-gradient(135deg, rgba(19,72,78,.97) 0%, rgba(46,138,147,.93) 60%, rgba(93,179,188,.88) 100%);
  border-radius: 28px;
  padding: clamp(32px, 5vw, 52px);
  box-shadow: 0 20px 48px rgba(19,72,78,.22);
  position: relative;
  overflow: hidden;
}
.pc-session-banner::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px);
  background-size: 24px 24px;
  pointer-events: none;
}
.pc-session-content { position: relative; z-index: 1; }
.pc-session-eyebrow { color: var(--amber) !important; }
.pc-session-title {
  font-family: var(--fd);
  font-size: clamp(20px, 2.4vw, 28px);
  font-weight: 700;
  color: #fff;
  line-height: 1.2;
  margin-top: 6px;
  margin-bottom: 14px;
}
.pc-session-desc {
  font-size: 15px;
  color: rgba(255,255,255,.82);
  line-height: 1.72;
  margin-bottom: 24px;
}
.pc-session-btn { background: #fff; color: var(--teal-sh); border: none; font-weight: 700; }
.pc-session-btn:hover { background: rgba(255,255,255,.88); }

/* ── Bridge ── */
.pc-bridge { padding-block: clamp(36px, 5vw, 60px); }
.pc-bridge-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(28px, 5vw, 56px);
  margin-top: 24px;
}
.pc-bridge-text {
  font-size: 15px;
  color: var(--text2);
  line-height: 1.78;
  margin-bottom: 14px;
}
.pc-bridge-text--em {
  color: var(--teal-sh);
  font-style: italic;
  font-weight: 600;
}

/* ── Expect ── */
.pc-expect { padding-block: clamp(32px, 5vw, 56px); }
.pc-expect-header { margin-bottom: 32px; }
.pc-expect-intro { font-size: 15px; color: var(--text2); line-height: 1.65; margin-top: 8px; }
.pc-expect-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}
.pc-expect-card {
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 22px 20px;
  box-shadow: var(--sh-sm);
}
.pc-expect-tag {
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: .06em;
  padding: 4px 12px;
  border-radius: 99px;
  display: inline-block;
  margin-bottom: 12px;
}
.expect-tag--teal  { background: var(--teal-t1);  color: var(--teal-sh); }
.expect-tag--coral { background: var(--coral-t1); color: var(--coral); }
.expect-tag--amber { background: var(--amber-t1); color: var(--amber-sh); }
.pc-expect-desc { font-size: 14px; color: var(--text2); line-height: 1.6; }

/* ── CTA ── */
.pc-cta {
  background: linear-gradient(135deg, rgba(19,72,78,.97) 0%, rgba(46,138,147,.93) 60%, rgba(93,179,188,.88) 100%);
  padding-block: clamp(56px, 8vw, 88px);
  text-align: center;
  position: relative;
  overflow: hidden;
  margin-top: clamp(32px, 5vw, 56px);
}
.pc-cta::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px);
  background-size: 24px 24px;
  pointer-events: none;
}
.pc-cta-inner { position: relative; z-index: 1; }
.pc-cta-title {
  font-family: var(--fd);
  font-size: clamp(24px, 3vw, 38px);
  font-weight: 700;
  color: #fff;
  margin-bottom: 14px;
  line-height: 1.18;
}
.pc-cta-desc { font-size: 16px; color: rgba(255,255,255,.8); margin-bottom: 32px; }
.pc-cta-actions { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }

.text-center { text-align: center; }

/* ── Responsive ── */
@media (max-width: 860px) {
  .pc-grid, .pc-bridge-grid { grid-template-columns: 1fr; }
  .pc-work-grid { grid-template-columns: 1fr; }
  .pc-help-list { grid-template-columns: 1fr; }
  .pc-session-banner { grid-template-columns: 1fr; }
}
</style>
