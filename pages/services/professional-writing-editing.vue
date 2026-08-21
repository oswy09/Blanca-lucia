<script setup>
const { whatsappUrl } = useSiteConfig()

useSeoMeta({
  title: 'Professional Writing & Editing | Fluent Future',
  description: 'Professional editing for emails, documents, and business writing in English. Get clear, polished, natural-sounding text — reviewed by Blanca Derby, with 30+ years of language consultancy experience.',
  robots: 'index, follow',
  ogType: 'website',
  ogTitle: 'Professional Writing & Editing | Fluent Future',
  ogDescription: 'Professional editing for emails, documents, and business writing in English. Clear, polished, natural-sounding text — reviewed by Blanca Derby.',
  ogUrl: 'https://fluentfuture.co.uk/services/professional-writing-editing',
  ogSiteName: 'Fluent Future — Blanca Derby',
  ogImage: 'https://fluentfuture.co.uk/images/og/writing-editing.jpg',
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt: 'Blanca Derby reviewing a professional document in English',
  ogLocale: 'en_GB',
})

useHead({
  link: [{ rel: 'canonical', href: 'https://fluentfuture.co.uk/services/professional-writing-editing' }],
})

useRevealOnScroll()
</script>

<template>
  <main class="pwe-page">
    <!-- ── 1. HERO BANNER ───────────────────────────────────────── -->
    <section class="pwe-hero">
      <div class="wrap pwe-hero-inner reveal">
        <span class="eyebrow pwe-hero-eyebrow">Service</span>
        <h1 class="pwe-hero-title">Professional Writing &amp; Editing</h1>
      </div>
    </section>

    <!-- ── 2. BACK LINK ─────────────────────────────────────────── -->
    <div class="wrap pwe-back-wrap reveal">
      <NuxtLink to="/services" class="back-link">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
          <path d="m15 18-6-6 6-6"/>
        </svg>
        All services
      </NuxtLink>
    </div>

    <!-- ── 3. MAIN SECTION (Intro & Help) ───────────────────────── -->
    <section class="pwe-main-content wrap">
      <div class="pwe-grid">
        <!-- Left: Intro & Highlight -->
        <div class="pwe-intro-section reveal">
          <h2 class="pwe-section-title">Make your English say exactly what you mean.</h2>
          <p class="pwe-lead-text">
            You may know exactly what you want to say, but expressing it naturally and professionally in English can sometimes be difficult.
          </p>
          <p class="pwe-body-text">
            I can help you turn your ideas into clear, polished English while preserving your meaning, your personality and your voice.
          </p>
          
          <div class="pwe-highlight-box">
            <div class="pwe-highlight-border"></div>
            <p class="pwe-highlight-text">
              <strong>This is more than correcting grammar or spelling.</strong> I look at the whole message — the wording, tone, clarity and structure — so that your writing communicates exactly what you intend.
            </p>
          </div>
        </div>

        <!-- Right: More than proofreading callout card -->
        <div class="pwe-sidebar-section reveal">
          <div class="pwe-proof-card">
            <h3 class="pwe-card-title">More than proofreading</h3>
            <p class="pwe-card-text">
              Good communication is not simply about having correct English.
            </p>
            <p class="pwe-card-text">
              The same message can sound confident, uncertain, too direct, too informal or unnecessarily complicated depending on the words you choose.
            </p>
            <p class="pwe-card-text">
              I will help you understand why a particular wording works better, so that over time you become increasingly confident in making those decisions yourself.
            </p>
            <div class="pwe-card-footer">
              <span class="pwe-footer-icon" aria-hidden="true">💡</span>
              <p class="pwe-footer-text">
                Your message remains yours. I simply help you express it at its best.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── 4. WHEN I CAN HELP ───────────────────────────────────── -->
    <section class="pwe-when wrap reveal">
      <div class="pwe-when-header">
        <h3 class="pwe-subtitle">When can I help?</h3>
        <p class="pwe-when-intro">
          This service is particularly useful when you need to write something important and want to feel confident about how it will be received.
        </p>
      </div>

      <div class="pwe-when-grid">
        <div class="pwe-when-card">
          <h4 class="pwe-when-heading">I can help you with:</h4>
          <ul class="pwe-help-list">
            <li>
              <div class="pwe-bullet-check">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <span>Professional and business emails</span>
            </li>
            <li>
              <div class="pwe-bullet-check">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <span>Important correspondence</span>
            </li>
            <li>
              <div class="pwe-bullet-check">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <span>Reports and presentations</span>
            </li>
            <li>
              <div class="pwe-bullet-check">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <span>Professional documents</span>
            </li>
            <li>
              <div class="pwe-bullet-check">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <span>CVs and supporting documents</span>
            </li>
            <li>
              <div class="pwe-bullet-check">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <span>Written communication with clients or colleagues</span>
            </li>
            <li>
              <div class="pwe-bullet-check">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <span>Messages where tone and wording really matter</span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- ── 4b. LIVE SESSION BANNER ──────────────────────────────── -->
    <section class="pwe-session-wrap wrap">
      <div class="pwe-session-banner reveal">
        <div class="pwe-session-content">
          <span class="eyebrow pwe-session-eyebrow">How We Work</span>
          <h3 class="pwe-session-title">All sessions are conducted online</h3>
          <p class="pwe-session-desc">
            We meet via video call, making it easy to work together wherever you are in the world. Sessions are personal, focused, and structured entirely around your needs and situation.
          </p>
          <NuxtLink to="/contact" class="btn pwe-session-btn">Book a session</NuxtLink>
        </div>
        <LiveSessionWidget />
      </div>
    </section>

    <!-- ── 5. WHAT YOU CAN EXPECT ───────────────────────────────── -->
    <section class="pwe-expect wrap reveal">
      <div class="pwe-expect-header">
        <h3 class="pwe-subtitle text-center">What you can expect</h3>
        <p class="pwe-expect-intro text-center">Together, we will make your writing:</p>
      </div>

      <div class="pwe-expect-grid">
        <div class="pwe-expect-card">
          <div class="pwe-expect-tag expect-tag--teal">Clear</div>
          <p class="pwe-expect-desc">so your meaning is immediately understood.</p>
        </div>
        <div class="pwe-expect-card">
          <div class="pwe-expect-tag expect-tag--coral">Natural</div>
          <p class="pwe-expect-desc">so your English sounds fluent rather than translated.</p>
        </div>
        <div class="pwe-expect-card">
          <div class="pwe-expect-tag expect-tag--amber">Professional</div>
          <p class="pwe-expect-desc">so your communication reflects the person you are.</p>
        </div>
        <div class="pwe-expect-card">
          <div class="pwe-expect-tag expect-tag--teal">Appropriate</div>
          <p class="pwe-expect-desc">so the tone suits the situation and the person receiving it.</p>
        </div>
        <div class="pwe-expect-card">
          <div class="pwe-expect-tag expect-tag--coral">Confident</div>
          <p class="pwe-expect-desc">so your written English represents your abilities accurately.</p>
        </div>
      </div>
    </section>

    <!-- ── 6. CTA SECTION ───────────────────────────────────────── -->
    <section class="pwe-cta">
      <div class="wrap pwe-cta-inner reveal">
        <h2 class="pwe-cta-title">Ready to make your written English work for you?</h2>
        <p class="pwe-cta-desc">Let’s talk about what you need and how I can help.</p>
        <div class="pwe-cta-actions">
          <NuxtLink to="/contact" class="btn btn-primary">Get in Touch</NuxtLink>
          <a :href="whatsappUrl" class="btn btn-secondary" target="_blank" rel="noopener">
            Contact on WhatsApp
          </a>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.pwe-page {
  background: var(--bg);
}

/* ── Hero Style from contact.vue ── */
.pwe-hero {
  background: linear-gradient(135deg, rgba(19,72,78,.97) 0%, rgba(46,138,147,.93) 60%, rgba(93,179,188,.88) 100%);
  padding-top: clamp(88px, 12vw, 140px);
  padding-bottom: clamp(64px, 10vw, 96px);
  text-align: center;
  position: relative;
  overflow: hidden;
}

.pwe-hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px);
  background-size: 24px 24px;
  pointer-events: none;
}

.pwe-hero-inner { position: relative; z-index: 1; }

.pwe-hero-eyebrow {
  color: rgba(255,255,255,.70);
  margin-bottom: 14px;
}

.pwe-hero-title {
  font-family: var(--fd);
  font-size: clamp(32px, 4.5vw, 56px);
  font-weight: 700;
  color: #fff;
  line-height: 1.12;
}

/* ── Live Session Banner ── */
.pwe-session-wrap {
  padding-block: clamp(24px, 4vw, 44px);
}

.pwe-session-banner {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: clamp(32px, 5vw, 64px);
  align-items: center;
  background: linear-gradient(135deg, rgba(19,72,78,.97) 0%, rgba(46,138,147,.93) 60%, rgba(93,179,188,.88) 100%);
  border-radius: 28px;
  padding: clamp(36px, 5vw, 52px);
  box-shadow: 0 20px 48px rgba(19,72,78,.22);
  position: relative;
  overflow: hidden;
}

.pwe-session-banner::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px);
  background-size: 24px 24px;
  pointer-events: none;
}

.pwe-session-content { position: relative; z-index: 1; }

.pwe-session-eyebrow { color: var(--amber) !important; }

.pwe-session-title {
  font-family: var(--fd);
  font-size: clamp(22px, 2.8vw, 32px);
  font-weight: 700;
  color: #fff;
  line-height: 1.2;
  margin-top: 6px;
  margin-bottom: 16px;
}

.pwe-session-desc {
  font-size: 15px;
  color: rgba(255,255,255,.82);
  line-height: 1.75;
  margin-bottom: 28px;
}

.pwe-session-btn {
  background: #fff;
  color: var(--teal-sh);
  border: none;
  font-weight: 700;
}
.pwe-session-btn:hover { background: rgba(255,255,255,.88); }

.pwe-session-photo-wrap {
  position: relative;
  max-width: 240px;
  margin: 0 auto;
  z-index: 1;
}

.pwe-session-ring {
  position: absolute;
  inset: -14px;
  border: 2px dashed rgba(240,180,80,.45);
  border-radius: 26px;
  pointer-events: none;
}

.pwe-session-offset {
  position: absolute;
  inset: 0;
  border: 3px solid var(--amber);
  border-radius: 20px;
  transform: translate(8px, 8px);
  pointer-events: none;
}

.pwe-session-img-box {
  position: relative;
  z-index: 1;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 16px 40px rgba(0,0,0,.30);
  aspect-ratio: 5/6;
}

.pwe-session-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  display: block;
}

.pwe-session-dots {
  position: absolute;
  top: -18px;
  right: -16px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  z-index: 4;
}

.pwe-session-dots span {
  display: block;
  border-radius: 50%;
  background: var(--amber);
}
.pwe-session-dots span:first-child  { width: 8px; height: 8px; opacity: 1; }
.pwe-session-dots span:nth-child(2) { width: 6px; height: 6px; opacity: .65; margin-left: 1px; }
.pwe-session-dots span:last-child   { width: 5px; height: 5px; opacity: .35; margin-left: 2px; }

@media (max-width: 700px) {
  .pwe-session-banner { grid-template-columns: 1fr; }
  .pwe-session-photo-wrap { display: none; }
}

/* ── Back Link ── */
.pwe-back-wrap {
  padding-top: 36px;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: var(--text2);
  text-decoration: none;
  transition: color .15s;
}

.back-link:hover { color: var(--teal); }

/* ── Main Content Grid ── */
.pwe-main-content {
  padding-top: 40px;
  padding-bottom: 60px;
}

.pwe-grid {
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  gap: clamp(32px, 5vw, 64px);
  align-items: start;
}

.pwe-section-title {
  font-family: var(--fd);
  font-size: clamp(24px, 3vw, 36px);
  font-weight: 700;
  color: var(--text);
  line-height: 1.2;
  margin-bottom: 20px;
}

.pwe-lead-text {
  font-size: 17px;
  font-weight: 500;
  color: var(--text);
  line-height: 1.7;
  margin-bottom: 16px;
}

.pwe-body-text {
  font-size: 16px;
  color: var(--text2);
  line-height: 1.75;
  margin-bottom: 24px;
}

/* Highlight Box */
.pwe-highlight-box {
  position: relative;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--rlg);
  padding: 24px;
  margin-top: 32px;
  box-shadow: var(--sh-sm);
  overflow: hidden;
}

.pwe-highlight-border {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background: var(--teal);
}

.pwe-highlight-text {
  margin: 0;
  font-size: 15px;
  color: var(--text);
  line-height: 1.65;
}

/* More than proofreading Card */
.pwe-proof-card {
  background: var(--amber-t1);
  border: 1.5px solid var(--amber);
  border-radius: 24px;
  padding: clamp(24px, 4vw, 36px);
  box-shadow: var(--sh-md);
}

.pwe-card-title {
  font-family: var(--fd);
  font-size: 21px;
  font-weight: 700;
  color: var(--amber-sh);
  margin-bottom: 16px;
}

.pwe-card-text {
  font-size: 14.5px;
  color: var(--n800);
  line-height: 1.65;
  margin-bottom: 14px;
}

.pwe-card-text:last-of-type {
  margin-bottom: 24px;
}

.pwe-card-footer {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding-top: 18px;
  border-top: 1px solid rgba(201,143,46,0.18);
}

.pwe-footer-icon {
  font-size: 18px;
  line-height: 1;
}

.pwe-footer-text {
  margin: 0;
  font-size: 13.5px;
  font-weight: 600;
  color: var(--n800);
  line-height: 1.5;
}

/* ── When Can I Help ── */
.pwe-when {
  padding-block: 60px;
}

.pwe-subtitle {
  font-family: var(--fd);
  font-size: 26px;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 12px;
}

.pwe-when-intro {
  font-size: 16px;
  color: var(--text2);
  line-height: 1.7;
  max-width: 720px;
}

.pwe-when-grid {
  margin-top: 32px;
}

.pwe-when-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 24px;
  padding: 32px;
  box-shadow: var(--sh-sm);
}

.pwe-when-heading {
  font-family: var(--fd);
  font-size: 18px;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 24px;
}

.pwe-help-list {
  list-style: none;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px 32px;
}

.pwe-help-list li {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  font-size: 15px;
  color: var(--text);
  line-height: 1.5;
}

.pwe-bullet-check {
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

/* ── What You Can Expect ── */
.pwe-expect {
  padding-block: 60px 80px;
}

.text-center { text-align: center; }

.pwe-expect-intro {
  font-size: 16px;
  color: var(--text2);
  margin-bottom: 40px;
}

.pwe-expect-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
}

.pwe-expect-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--rlg);
  padding: 24px 20px;
  text-align: center;
  box-shadow: var(--sh-sm);
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.pwe-expect-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--sh-md);
}

.pwe-expect-tag {
  display: inline-block;
  font-family: var(--fd);
  font-size: 14.5px;
  font-weight: 700;
  padding: 6px 14px;
  border-radius: 20px;
  margin-bottom: 14px;
  line-height: 1;
}

.expect-tag--teal { background: var(--teal-t1); color: var(--teal-sh); }
.expect-tag--coral { background: var(--coral-t1); color: var(--coral-sh); }
.expect-tag--amber { background: var(--amber-t1); color: var(--amber-sh); }

.pwe-expect-desc {
  font-size: 13.5px;
  color: var(--text2);
  line-height: 1.5;
  margin: 0;
}

/* ── CTA Section ── */
.pwe-cta {
  padding-block: clamp(64px, 8vw, 96px);
  background: var(--surface);
  border-top: 1px solid var(--border);
  text-align: center;
}

.pwe-cta-inner {
  max-width: 680px;
  margin-inline: auto;
}

.pwe-cta-title {
  font-family: var(--fd);
  font-size: clamp(24px, 3.5vw, 38px);
  font-weight: 700;
  color: var(--text);
  margin-bottom: 14px;
  line-height: 1.2;
}

.pwe-cta-desc {
  font-size: 16px;
  color: var(--text2);
  margin-bottom: 32px;
}

.pwe-cta-actions {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
}

/* ── Responsive ── */
@media (max-width: 992px) {
  .pwe-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  
  .pwe-expect-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .pwe-help-list {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .pwe-expect-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .pwe-cta-actions {
    flex-direction: column;
    gap: 12px;
  }
  
  .pwe-cta-actions .btn {
    width: 100%;
    max-width: 280px;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .pwe-expect-grid {
    grid-template-columns: 1fr;
  }
}
</style>
