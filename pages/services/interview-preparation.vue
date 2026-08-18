<script setup>
const { whatsappUrl } = useSiteConfig()

useSeoMeta({
  title: 'Interview Confidence & Preparation | Fluent Future',
  description: 'Prepare for job interviews in English with Blanca Derby. Practise mock interviews, structure strong answers, build confidence, and present the best version of yourself.',
  robots: 'index, follow',
  ogType: 'website',
  ogTitle: 'Interview Confidence & Preparation | Fluent Future',
  ogDescription: 'Prepare for job interviews in English with Blanca Derby. Practise mock interviews, structure strong answers, and build confidence.',
  ogUrl: 'https://fluentfuture.co.uk/services/interview-preparation',
  ogSiteName: 'Fluent Future — Blanca Derby',
  ogImage: 'https://fluentfuture.co.uk/images/og/interview-preparation.jpg',
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt: 'Blanca Derby conducting a mock interview in English',
  ogLocale: 'en_GB',
})

useHead({
  link: [{ rel: 'canonical', href: 'https://fluentfuture.co.uk/services/interview-preparation' }],
})

useRevealOnScroll()
</script>

<template>
  <main class="ip-page">
    <!-- ── 1. HERO BANNER ───────────────────────────────────────── -->
    <section class="ip-hero">
      <div class="wrap ip-hero-inner reveal">
        <span class="eyebrow ip-hero-eyebrow">Service</span>
        <h1 class="ip-hero-title">Interview Confidence &amp; Preparation</h1>
      </div>
    </section>

    <!-- ── 2. BACK LINK ─────────────────────────────────────────── -->
    <div class="wrap ip-back-wrap reveal">
      <NuxtLink to="/services" class="back-link">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
          <path d="m15 18-6-6 6-6"/>
        </svg>
        All services
      </NuxtLink>
    </div>

    <!-- ── 3. MAIN SECTION (Intro & Your Experience) ────────────── -->
    <section class="ip-main-content wrap">
      <div class="ip-grid">
        <!-- Left: Intro & Highlight -->
        <div class="ip-intro-section reveal">
          <h2 class="ip-section-title">Be ready to present the best version of yourself in English</h2>
          <p class="ip-lead-text">
            An interview can be challenging in any language. When it takes place in English, the pressure can feel even greater.
          </p>
          <p class="ip-body-text">
            You may have the experience, qualifications and ability for the position, but if you’re concentrating so hard on finding the right English words, it can become difficult to communicate your strengths with confidence.
          </p>
          
          <div class="ip-highlight-box">
            <div class="ip-highlight-border"></div>
            <p class="ip-highlight-text">
              <strong>I can help you prepare.</strong>
            </p>
          </div>
        </div>

        <!-- Right: Your experience deserves to be heard card -->
        <div class="ip-sidebar-section reveal">
          <div class="ip-experience-card">
            <h3 class="ip-card-title">Your experience deserves to be heard</h3>
            <p class="ip-card-text">
              You already have your own experience, knowledge and professional achievements.
            </p>
            <p class="ip-card-text">
              My role is to help you communicate them effectively in English.
            </p>
            <p class="ip-card-text">
              We will focus on your interview, your experience and your goals, so that your preparation is practical and relevant to the position you are applying for.
            </p>
            <div class="ip-card-footer">
              <span class="ip-footer-icon" aria-hidden="true">🎯</span>
              <p class="ip-footer-text">
                The aim is not perfection. The aim is to walk into the interview thinking: 
                <em>“I know what I want to say, and I can say it confidently in English.”</em>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── 4. PREPARATION CHANGES EVERYTHING ───────────────────── -->
    <section class="ip-prep wrap reveal">
      <div class="ip-prep-grid">
        <div class="ip-prep-content">
          <h3 class="ip-subtitle">Preparation changes everything</h3>
          <p class="ip-prep-text">
            The purpose of our preparation isn’t to give you a script to memorise.
          </p>
          <p class="ip-prep-text">
            It’s to help you feel sufficiently prepared and confident to respond naturally when the questions come.
          </p>
          <p class="ip-prep-text">
            Together, we’ll work on the language and communication skills you need for your particular interview and professional situation.
          </p>
        </div>

        <div class="ip-work-card">
          <h4 class="ip-work-heading">What can we work on?</h4>
          <p class="ip-work-sub">Your preparation may include:</p>
          <ul class="ip-help-list">
            <li>
              <div class="ip-bullet-check">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <span>Anticipating likely interview questions</span>
            </li>
            <li>
              <div class="ip-bullet-check">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <span>Structuring strong and concise answers</span>
            </li>
            <li>
              <div class="ip-bullet-check">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <span>Presenting your professional experience clearly</span>
            </li>
            <li>
              <div class="ip-bullet-check">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <span>Describing your achievements and strengths</span>
            </li>
            <li>
              <div class="ip-bullet-check">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <span>Explaining your skills and responsibilities naturally in English</span>
            </li>
            <li>
              <div class="ip-bullet-check">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <span>Handling difficult or unexpected questions</span>
            </li>
            <li>
              <div class="ip-bullet-check">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <span>Improving vocabulary and professional expressions</span>
            </li>
            <li>
              <div class="ip-bullet-check">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <span>Avoiding literal translation from Spanish</span>
            </li>
            <li>
              <div class="ip-bullet-check">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <span>Practising confident responses</span>
            </li>
            <li>
              <div class="ip-bullet-check">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <span>Conducting a realistic mock interview</span>
            </li>
            <li>
              <div class="ip-bullet-check">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <span>Reviewing your performance and identifying areas for improvement</span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- ── 4b. LIVE SESSION BANNER ──────────────────────────────── -->
    <section class="ip-session-wrap wrap">
      <div class="ip-session-banner reveal">
        <div class="ip-session-content">
          <span class="eyebrow ip-session-eyebrow">How We Work</span>
          <h3 class="ip-session-title">All sessions are conducted online</h3>
          <p class="ip-session-desc">
            We meet via video call, making it easy to work together wherever you are in the world. Sessions are personal, focused, and structured entirely around your needs and situation.
          </p>
          <NuxtLink to="/contact" class="btn ip-session-btn">Book a session</NuxtLink>
        </div>
        <div class="ip-session-photo-wrap">
          <div class="ip-session-ring"></div>
          <div class="ip-session-offset"></div>
          <div class="ip-session-img-box">
            <img src="/imagens/live-session.webp" alt="Blanca Derby conducting an online session" class="ip-session-img" />
          </div>
          <div class="ip-session-dots">
            <span></span><span></span><span></span>
          </div>
        </div>
      </div>
    </section>

    <!-- ── 5. WHAT YOU CAN EXPECT ───────────────────────────────── -->
    <section class="ip-expect wrap reveal">
      <div class="ip-expect-header">
        <h3 class="ip-subtitle text-center">What you can expect</h3>
        <p class="ip-expect-intro text-center">By the time you reach your interview, you should feel:</p>
      </div>

      <div class="ip-expect-grid">
        <div class="ip-expect-card">
          <div class="ip-expect-tag expect-tag--teal">Prepared</div>
          <p class="ip-expect-desc">because you’ve practised the situations you’re likely to face.</p>
        </div>
        <div class="ip-expect-card">
          <div class="ip-expect-tag expect-tag--coral">Clear</div>
          <p class="ip-expect-desc">because you know how to explain your experience effectively.</p>
        </div>
        <div class="ip-expect-card">
          <div class="ip-expect-tag expect-tag--amber">Confident</div>
          <p class="ip-expect-desc">because you have practised expressing yourself naturally.</p>
        </div>
        <div class="ip-expect-card">
          <div class="ip-expect-tag expect-tag--teal">Ready</div>
          <p class="ip-expect-desc">because you can concentrate on the interview rather than worrying about your English.</p>
        </div>
      </div>
    </section>

    <!-- ── 6. CTA SECTION ───────────────────────────────────────── -->
    <section class="ip-cta">
      <div class="wrap ip-cta-inner reveal">
        <h2 class="ip-cta-title">Your next opportunity deserves your best communication.</h2>
        <p class="ip-cta-desc">Let’s prepare for it together.</p>
        <div class="ip-cta-actions">
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
.ip-page {
  background: var(--bg);
}

/* ── Hero Style from contact.vue ── */
.ip-hero {
  background: linear-gradient(135deg, rgba(19,72,78,.97) 0%, rgba(46,138,147,.93) 60%, rgba(93,179,188,.88) 100%);
  padding-top: clamp(88px, 12vw, 140px);
  padding-bottom: clamp(64px, 10vw, 96px);
  text-align: center;
  position: relative;
  overflow: hidden;
}

.ip-hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px);
  background-size: 24px 24px;
  pointer-events: none;
}

.ip-hero-inner { position: relative; z-index: 1; }

.ip-hero-eyebrow {
  color: rgba(255,255,255,.70);
  margin-bottom: 14px;
}

.ip-hero-title {
  font-family: var(--fd);
  font-size: clamp(32px, 4.5vw, 56px);
  font-weight: 700;
  color: #fff;
  line-height: 1.12;
}

/* ── Live Session Banner ── */
.ip-session-wrap {
  padding-block: clamp(24px, 4vw, 44px);
}

.ip-session-banner {
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

.ip-session-banner::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px);
  background-size: 24px 24px;
  pointer-events: none;
}

.ip-session-content { position: relative; z-index: 1; }

.ip-session-eyebrow { color: var(--amber) !important; }

.ip-session-title {
  font-family: var(--fd);
  font-size: clamp(22px, 2.8vw, 32px);
  font-weight: 700;
  color: #fff;
  line-height: 1.2;
  margin-top: 6px;
  margin-bottom: 16px;
}

.ip-session-desc {
  font-size: 15px;
  color: rgba(255,255,255,.82);
  line-height: 1.75;
  margin-bottom: 28px;
}

.ip-session-btn {
  background: #fff;
  color: var(--teal-sh);
  border: none;
  font-weight: 700;
}
.ip-session-btn:hover { background: rgba(255,255,255,.88); }

.ip-session-photo-wrap {
  position: relative;
  max-width: 240px;
  margin: 0 auto;
  z-index: 1;
}

.ip-session-ring {
  position: absolute;
  inset: -14px;
  border: 2px dashed rgba(240,180,80,.45);
  border-radius: 26px;
  pointer-events: none;
}

.ip-session-offset {
  position: absolute;
  inset: 0;
  border: 3px solid var(--amber);
  border-radius: 20px;
  transform: translate(8px, 8px);
  pointer-events: none;
}

.ip-session-img-box {
  position: relative;
  z-index: 1;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 16px 40px rgba(0,0,0,.30);
  aspect-ratio: 5/6;
}

.ip-session-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  display: block;
}

.ip-session-dots {
  position: absolute;
  top: -18px;
  right: -16px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  z-index: 4;
}

.ip-session-dots span {
  display: block;
  border-radius: 50%;
  background: var(--amber);
}
.ip-session-dots span:first-child  { width: 8px; height: 8px; opacity: 1; }
.ip-session-dots span:nth-child(2) { width: 6px; height: 6px; opacity: .65; margin-left: 1px; }
.ip-session-dots span:last-child   { width: 5px; height: 5px; opacity: .35; margin-left: 2px; }

@media (max-width: 700px) {
  .ip-session-banner { grid-template-columns: 1fr; }
  .ip-session-photo-wrap { display: none; }
}

/* ── Back Link ── */
.ip-back-wrap {
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
.ip-main-content {
  padding-top: 40px;
  padding-bottom: 40px;
}

.ip-grid {
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  gap: clamp(32px, 5vw, 64px);
  align-items: start;
}

.ip-section-title {
  font-family: var(--fd);
  font-size: clamp(24px, 3vw, 36px);
  font-weight: 700;
  color: var(--text);
  line-height: 1.2;
  margin-bottom: 20px;
}

.ip-lead-text {
  font-size: 17px;
  font-weight: 500;
  color: var(--text);
  line-height: 1.7;
  margin-bottom: 16px;
}

.ip-body-text {
  font-size: 16px;
  color: var(--text2);
  line-height: 1.75;
  margin-bottom: 24px;
}

/* Highlight Box */
.ip-highlight-box {
  position: relative;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--rlg);
  padding: 24px;
  margin-top: 32px;
  box-shadow: var(--sh-sm);
  overflow: hidden;
}

.ip-highlight-border {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background: var(--teal);
}

.ip-highlight-text {
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  color: var(--teal-sh);
  line-height: 1.6;
}

/* Your Experience Card */
.ip-experience-card {
  background: var(--teal-t1);
  border: 1.5px solid var(--teal);
  border-radius: 24px;
  padding: clamp(24px, 4vw, 36px);
  box-shadow: var(--sh-md);
}

.ip-card-title {
  font-family: var(--fd);
  font-size: 21px;
  font-weight: 700;
  color: var(--teal-sh);
  margin-bottom: 16px;
}

.ip-card-text {
  font-size: 14.5px;
  color: var(--text);
  line-height: 1.65;
  margin-bottom: 14px;
}

.ip-card-text:last-of-type {
  margin-bottom: 24px;
}

.ip-card-footer {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding-top: 18px;
  border-top: 1px solid rgba(46,138,147,0.18);
}

.ip-footer-icon {
  font-size: 18px;
  line-height: 1;
}

.ip-footer-text {
  margin: 0;
  font-size: 13.5px;
  font-weight: 600;
  color: var(--text);
  line-height: 1.55;
}

/* ── Preparation Changes Everything ── */
.ip-prep {
  padding-block: 40px 60px;
}

.ip-prep-grid {
  display: grid;
  grid-template-columns: 1fr 1.3fr;
  gap: clamp(32px, 5vw, 64px);
  align-items: start;
}

.ip-subtitle {
  font-family: var(--fd);
  font-size: 26px;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 18px;
}

.ip-prep-text {
  font-size: 15.5px;
  color: var(--text2);
  line-height: 1.7;
  margin-bottom: 16px;
}

.ip-work-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 24px;
  padding: 32px;
  box-shadow: var(--sh-sm);
}

.ip-work-heading {
  font-family: var(--fd);
  font-size: 18px;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 8px;
}

.ip-work-sub {
  font-size: 14.5px;
  color: var(--text2);
  margin-bottom: 24px;
}

.ip-help-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.ip-help-list li {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  font-size: 15px;
  color: var(--text);
  line-height: 1.5;
}

.ip-bullet-check {
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
.ip-expect {
  padding-block: 60px 80px;
}

.text-center { text-align: center; }

.ip-expect-intro {
  font-size: 16px;
  color: var(--text2);
  margin-bottom: 40px;
}

.ip-expect-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.ip-expect-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--rlg);
  padding: 28px 20px;
  text-align: center;
  box-shadow: var(--sh-sm);
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.ip-expect-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--sh-md);
}

.ip-expect-tag {
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

.ip-expect-desc {
  font-size: 13.5px;
  color: var(--text2);
  line-height: 1.5;
  margin: 0;
}

/* ── CTA Section ── */
.ip-cta {
  padding-block: clamp(64px, 8vw, 96px);
  background: var(--surface);
  border-top: 1px solid var(--border);
  text-align: center;
}

.ip-cta-inner {
  max-width: 680px;
  margin-inline: auto;
}

.ip-cta-title {
  font-family: var(--fd);
  font-size: clamp(24px, 3.5vw, 38px);
  font-weight: 700;
  color: var(--text);
  margin-bottom: 14px;
  line-height: 1.2;
}

.ip-cta-desc {
  font-size: 16px;
  color: var(--text2);
  margin-bottom: 32px;
}

.ip-cta-actions {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
}

/* ── Responsive ── */
@media (max-width: 992px) {
  .ip-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  
  .ip-prep-grid {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .ip-expect-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .ip-expect-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .ip-cta-actions {
    flex-direction: column;
    gap: 12px;
  }
  
  .ip-cta-actions .btn {
    width: 100%;
    max-width: 280px;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .ip-expect-grid {
    grid-template-columns: 1fr;
  }
}
</style>
