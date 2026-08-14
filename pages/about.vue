<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const { siteUrl, whatsappUrl } = useSiteConfig()

useSeoMeta({
  title: 'About — Blanca Derby · Fluent Future',
  description: 'Over 30 years helping Spanish-speaking professionals communicate with clarity and confidence in English.',
})

useHead({
  link: [{ rel: 'canonical', href: `${siteUrl}/about` }],
})

const aboutRef = ref(null)
let gsapCtx = null

onMounted(async () => {
  const { gsap } = await import('gsap')
  const { ScrollTrigger } = await import('gsap/ScrollTrigger')
  gsap.registerPlugin(ScrollTrigger)

  gsapCtx = gsap.context(() => {
    // Parallax scroll-drift animation for margin bubbles (Creative touch!)
    gsap.to('.bubble-1', {
      y: -100,
      ease: 'none',
      scrollTrigger: {
        trigger: '.ab-intro',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    })
    gsap.to('.bubble-2', {
      y: 120,
      ease: 'none',
      scrollTrigger: {
        trigger: '.ab-values',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    })
    gsap.to('.bubble-3', {
      y: -120,
      ease: 'none',
      scrollTrigger: {
        trigger: '.ab-split',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    })

    // Trace journey line on scroll
    gsap.to('.journey-line-progress', {
      height: '100%',
      ease: 'none',
      scrollTrigger: {
        trigger: '.journey-timeline',
        start: 'top 70%',
        end: 'bottom 60%',
        scrub: true
      }
    })

    // Staggered active color triggers for nodes
    gsap.utils.toArray('.journey-step').forEach((step) => {
      const node = step.querySelector('.journey-node')
      const dot = step.querySelector('.node-dot')
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: step,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        }
      })
      
      tl.from(step, { opacity: 0, x: -16, duration: 0.5, ease: 'power2.out' })
      tl.to(node, { borderColor: 'var(--teal)', duration: 0.3 }, '-=0.2')
      tl.to(dot, { backgroundColor: 'var(--teal)', duration: 0.3 }, '-=0.3')
    })
  }, aboutRef.value)
})

onUnmounted(() => {
  gsapCtx?.revert()
})
</script>

<template>
  <main ref="aboutRef">

    <!-- ── 1. HERO ─────────────────────────────────────────────── -->
    <section class="ab-hero">
      <div class="wrap ab-hero-grid">

        <div class="ab-hero-text">
          <span class="eyebrow ab-eyebrow">About Me</span>
          <h1 class="ab-title">
            A personal language<br>
            consultancy by<br>
            <em class="ab-em">Blanca Derby</em>
          </h1>
          <p class="ab-subtitle">
            Working with adults to develop clear, confident, and natural communication
            through a tailored, one-to-one approach.
          </p>
          <a :href="whatsappUrl" class="btn btn-primary ab-hero-btn" target="_blank" rel="noopener">
            Get in touch
          </a>
        </div>

        <div class="ab-hero-visual" style="position: relative;">
          <div class="ab-hero-photo-wrap">
            <img src="/imagens/blanca.png" alt="Blanca Derby – English language consultant" class="ab-hero-photo" />
            <div class="ab-hero-badge">
              <span class="badge-num">30<sup>+</sup></span>
              <span class="badge-lbl">years of experience</span>
            </div>
          </div>
          <!-- decorative dashed ring -->
          <div class="ab-ring" aria-hidden="true"></div>
        </div>

      </div>
    </section>

    <!-- ── 2. INTRO ─────────────────────────────────────────────── -->
    <section class="ab-intro">
      <div class="wrap ab-intro-grid">

        <!-- Left Column: Main Message -->
        <div class="ab-intro-main reveal">
          <span class="eyebrow">A Personal Approach</span>
          <h2 class="section-title ab-intro-h2">A more focused,<br>individual approach</h2>
          <p class="ab-lead-p">
            I support Spanish-speaking professionals in developing clear, confident communication in English.
          </p>
          <p class="ab-p">
            I work with adults who want to communicate clearly, confidently, and naturally — particularly those who feel that traditional methods have not fully met their needs.
          </p>
        </div>

        <!-- Right Column: Supporting Details -->
        <div class="ab-intro-details">
          <div class="ab-intro-block reveal" style="transition-delay: 80ms">
            <div class="block-indicator" style="background: var(--amber)"></div>
            <p class="block-body">
              My approach is shaped by over 30 years of experience in language teaching, translation, and personalised guidance, now refined into a consultancy model that prioritises the individual.
            </p>
          </div>

          <div class="ab-intro-block reveal" style="transition-delay: 160ms">
            <div class="block-indicator" style="background: var(--amber)"></div>
            <p class="block-body">
              Rather than following a standard structure, each engagement is carefully tailored — allowing us to focus on what will make a meaningful difference to you.
            </p>
          </div>

          <div class="ab-intro-block reveal" style="transition-delay: 240ms">
            <div class="block-indicator" style="background: var(--amber)"></div>
            <p class="block-body">
              My services for evaluating their prospective employees. To this end I provide a detailed assessment for each individual candidate, enabling my clients to make a more informed decision during their hiring process.
            </p>
          </div>
        </div>

      </div>
    </section>

    <!-- ── 3. CORE VALUES ───────────────────────────────────────── -->
    <section class="ab-values">
      <div class="wrap">
        <div class="ab-values-head reveal">
          <span class="eyebrow">How I work</span>
          <h2 class="section-title" style="margin-top:10px">Built on Three Core Values</h2>
        </div>
        <div class="ab-values-grid">

          <article class="ab-card reveal" style="transition-delay:60ms">
            <div class="ab-card-icon">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M17 8h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2v4l-4-4H9a2 2 0 0 1-2-2v-1"/>
                <path d="M15 3H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2v4l4-4h4a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z"/>
              </svg>
            </div>
            <h3 class="ab-card-title">Careful understanding</h3>
            <p class="ab-card-desc">Each engagement begins with listening — understanding your background, needs, and goals.</p>
          </article>

          <article class="ab-card reveal" style="transition-delay:120ms">
            <div class="ab-card-icon">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10"/>
                <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
              </svg>
            </div>
            <h3 class="ab-card-title">Focused guidance</h3>
            <p class="ab-card-desc">Work is directed towards what matters most, avoiding unnecessary complexity.</p>
          </article>

          <article class="ab-card reveal" style="transition-delay:180ms">
            <div class="ab-card-icon">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
                <polyline points="17 6 23 6 23 12"/>
              </svg>
            </div>
            <h3 class="ab-card-title">Meaningful progress</h3>
            <p class="ab-card-desc">The aim is not speed, but clarity, confidence, and lasting improvement.</p>
          </article>

        </div>
      </div>
    </section>

    <!-- ── 4. BACKGROUND + DIFFERENTIATOR ─────────────────────── -->
    <section class="ab-split">
      <div class="wrap ab-split-grid">

        <!-- Left: My Background (Journey Timeline) -->
        <div class="ab-split-left">
          <span class="eyebrow reveal">My Background</span>
          <h2 class="ab-split-h2 reveal" style="transition-delay:60ms">A Lifetime<br>in Language</h2>
          
          <div class="journey-timeline">
            <!-- Central connection lines -->
            <div class="journey-line" aria-hidden="true"></div>
            <div class="journey-line-progress" aria-hidden="true"></div>

            <!-- Step 1 -->
            <div class="journey-step">
              <div class="journey-node">
                <span class="node-dot"></span>
              </div>
              <div class="journey-content">
                <h3 class="journey-step-title">The Foundation</h3>
                <p class="ab-p">I have spent more than three decades working with adults from a wide range of professional backgrounds.</p>
              </div>
            </div>

            <!-- Step 2 -->
            <div class="journey-step">
              <div class="journey-node">
                <span class="node-dot"></span>
              </div>
              <div class="journey-content">
                <h3 class="journey-step-title">The Insight</h3>
                <p class="ab-p">This experience allows me to quickly recognise patterns, identify challenges, and provide clear, practical guidance tailored to each individual.</p>
              </div>
            </div>

            <!-- Step 3 -->
            <div class="journey-step">
              <div class="journey-node">
                <span class="node-dot"></span>
              </div>
              <div class="journey-content">
                <h3 class="journey-step-title">The Evolution</h3>
                <p class="ab-p">Over time, my work has evolved from traditional teaching into a more focused consultancy approach — one that values depth, precision, and personal attention.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: What Makes This Different -->
        <div class="ab-split-right reveal" style="transition-delay:120ms">
          <div class="ab-diff-panel">
            <span class="eyebrow ab-diff-eyebrow">What Makes This Different</span>
            <h2 class="ab-diff-h2">Personal.<br>Not a Platform.</h2>
            <p class="ab-diff-p">This is a personal consultancy — not a platform or standardised service.</p>
            <p class="ab-diff-p">I work with a limited number of clients to ensure each person receives thoughtful, individual attention.</p>
            <p class="ab-diff-p">If you are looking for a calm, focused, and personal approach, I would be pleased to work with you.</p>
            <p class="ab-diff-note">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              A limited number of clients are accepted to ensure a high level of personal attention.
            </p>
            <NuxtLink to="/contact" class="btn ab-diff-btn">Get in Touch</NuxtLink>
          </div>
        </div>

      </div>
    </section>

    <!-- ── 5. CTA ───────────────────────────────────────────────── -->
    <section class="ab-cta">
      <div class="wrap ab-cta-inner reveal">
        <span class="eyebrow ab-cta-eyebrow">Ready to Work Together?</span>
        <h2 class="ab-cta-title">If you would like to get in touch</h2>
        <p class="ab-cta-sub">
          You are welcome to contact me. We can begin with an initial conversation
          to understand your needs and consider the most appropriate way forward.
        </p>
        <NuxtLink to="/contact" class="btn ab-cta-btn">Get in Touch</NuxtLink>
      </div>
    </section>

    <!-- Floating margin bubbles (Creative touch) -->
    <ScrollBubble :text="['Speak with confidence', 'Excellent pronunciation']" position="margin-right" :delay="100" class="about-margin-bubble bubble-1" />
    <ScrollBubble :text="['English & Spanish', 'Bilingual coaching']" position="margin-left" :delay="200" class="about-margin-bubble bubble-2" />
    <ScrollBubble :text="['Speak with confidence', 'Confidence is key']" position="margin-right" :delay="300" class="about-margin-bubble bubble-3" />

  </main>
</template>

<style scoped>

/* ══════════════════════════════════════════════
   1. HERO
   ══════════════════════════════════════════════ */
.ab-hero {
  background:
    radial-gradient(700px 420px at 0% 0%, rgba(46,138,147,.22), transparent 65%),
    radial-gradient(500px 320px at 100% 100%, rgba(217,96,58,.09), transparent 60%),
    var(--bg);
  padding-top: clamp(72px, 10vw, 120px);
  padding-bottom: clamp(56px, 8vw, 96px);
}

.ab-hero-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(48px, 6vw, 96px);
  align-items: center;
}

.ab-eyebrow { color: var(--teal-sh); margin-bottom: 20px; }

.ab-title {
  font-family: var(--fd);
  font-size: clamp(34px, 4.8vw, 62px);
  font-weight: 700;
  line-height: 1.09;
  color: var(--text);
  margin-bottom: 22px;
}

.ab-em { color: var(--teal); font-style: normal; }

.ab-subtitle {
  font-size: clamp(15px, 1.5vw, 17px);
  color: var(--text2);
  line-height: 1.75;
  max-width: 460px;
  margin-bottom: 36px;
}

.ab-hero-btn { align-self: flex-start; }

/* Photo column */
.ab-hero-visual {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.ab-hero-photo-wrap {
  position: relative;
  width: 340px;
  height: 380px;
  flex-shrink: 0;
}

.ab-hero-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  border-radius: 24px 24px 80px 24px;
  display: block;
  box-shadow: 0 24px 64px rgba(46,138,147,.22), 0 4px 16px rgba(0,0,0,.10);
}

.ab-hero-badge {
  position: absolute;
  bottom: -16px;
  left: -20px;
  background: #fff;
  border-radius: 16px;
  padding: 14px 20px;
  box-shadow: var(--sh-md);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  border: 1px solid var(--border);
}

.badge-num {
  font-family: var(--fd);
  font-size: 28px;
  font-weight: 700;
  color: var(--teal);
  line-height: 1;
}

.badge-num sup { font-size: 14px; }

.badge-lbl {
  font-size: 11px;
  font-weight: 600;
  color: var(--text2);
  letter-spacing: .02em;
  white-space: nowrap;
}

.ab-ring {
  position: absolute;
  width: 380px;
  height: 420px;
  border-radius: 28px 28px 90px 28px;
  border: 2px dashed var(--teal-t2);
  top: 12px;
  left: calc(50% - 190px + 14px);
  pointer-events: none;
  z-index: -1;
}

/* ══════════════════════════════════════════════
   2. INTRO
   ══════════════════════════════════════════════ */
.ab-intro {
  padding-block: var(--spy);
  background: var(--surface);
}

.ab-intro-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(48px, 6vw, 88px);
  align-items: center;
}

.ab-intro-h2 {
  margin-top: 10px;
  margin-bottom: 28px;
}

.ab-p {
  font-size: 15.5px;
  color: var(--text2);
  line-height: 1.75;
  margin-bottom: 16px;
}
.ab-p:last-child { margin-bottom: 0; }
.ab-p strong { color: var(--text); font-weight: 700; }

/* Typography & Intro Layout */
.ab-intro {
  padding-block: var(--spy);
  background: var(--surface);
}

.ab-intro-grid {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: clamp(40px, 6vw, 80px);
  align-items: start;
}

.ab-lead-p {
  font-family: var(--fb);
  font-size: clamp(18px, 2vw, 22px);
  font-weight: 500;
  line-height: 1.5;
  color: var(--teal-sh);
  margin-top: 18px;
  margin-bottom: 24px;
}

.ab-p {
  font-size: 15.5px;
  color: var(--text2);
  line-height: 1.75;
}

/* Right Column Blocks */
.ab-intro-details {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.ab-intro-block {
  position: relative;
  background: var(--n0);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 22px 24px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden;
}

.ab-intro-block:hover {
  transform: translateY(-2px);
  box-shadow: var(--sh-md);
}

.block-indicator {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 4px;
}

.block-body {
  font-size: 14.5px;
  color: var(--text2);
  line-height: 1.65;
}

/* ══════════════════════════════════════════════
   3. CORE VALUES
   ══════════════════════════════════════════════ */
.ab-values {
  padding-block: var(--spy);
  background: var(--bg);
}

.ab-values-head {
  text-align: center;
  margin-bottom: 56px;
}

.ab-values-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
}

.ab-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 32px 28px;
  text-align: center;
  box-shadow: var(--sh-sm);
  transition: transform .25s, box-shadow .25s;
}

.ab-card:hover { transform: translateY(-4px); box-shadow: var(--sh-md); }

.ab-card-icon {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: var(--teal-t1);
  color: var(--teal);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
}

.ab-card-icon--amber { background: var(--amber-t1); color: var(--amber-sh); }
.ab-card-icon--coral { background: var(--coral-t1); color: var(--coral); }

.ab-card-title {
  font-family: var(--fd);
  font-size: 17px;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 10px;
}

.ab-card-desc {
  font-size: 14.5px;
  color: var(--text2);
  line-height: 1.65;
}

/* ══════════════════════════════════════════════
   4. BACKGROUND (JOURNEY ROADMAP)
   ══════════════════════════════════════════════ */
.ab-split {
  padding-block: var(--spy);
  background: var(--surface);
}

.ab-split-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(40px, 5vw, 72px);
  align-items: start;
}

.ab-split-left { padding-top: 8px; }

/* Journey Timeline */
.journey-timeline {
  position: relative;
  margin-top: 36px;
  padding-left: 28px;
  display: flex;
  flex-direction: column;
  gap: 36px;
}

.journey-line {
  position: absolute;
  top: 8px;
  bottom: 8px;
  left: 6px;
  width: 2px;
  background: var(--border);
  z-index: 1;
}

.journey-line-progress {
  position: absolute;
  top: 8px;
  left: 6px;
  width: 2px;
  height: 0%;
  background: var(--teal);
  z-index: 2;
}

.journey-step {
  position: relative;
  display: flex;
  gap: 16px;
  z-index: 3;
}

.journey-node {
  position: absolute;
  left: -28px;
  top: 4px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--surface);
  border: 2px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 4;
}

.node-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--border);
  transition: background-color 0.3s;
}

.journey-step-title {
  font-family: var(--fd);
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--teal-sh);
  margin-bottom: 6px;
}

.journey-content .ab-p {
  margin: 0;
  font-size: 14.5px;
  line-height: 1.6;
  color: var(--text2);
}

.ab-split-h2 {
  font-family: var(--fd);
  font-size: clamp(28px, 3.2vw, 40px);
  font-weight: 700;
  color: var(--text);
  line-height: 1.12;
  margin-top: 10px;
  margin-bottom: 28px;
}

/* Right panel (teal dark card — mirrors diff-panel from home) */
.ab-diff-panel {
  background: linear-gradient(155deg, rgba(19,72,78,.97) 0%, rgba(46,138,147,.93) 62%, rgba(93,179,188,.9) 100%);
  border-radius: 24px;
  padding: clamp(28px, 3.5vw, 40px);
  color: #fff;
  position: relative;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(30,110,118,.25);
}

.ab-diff-panel::after {
  content: '';
  position: absolute;
  width: 200px;
  aspect-ratio: 1;
  right: -80px;
  top: -80px;
  border-radius: 999px;
  background: rgba(255,255,255,.12);
  pointer-events: none;
}

.ab-diff-eyebrow { color: rgba(255,255,255,.65); margin-bottom: 12px; }

.ab-diff-h2 {
  font-family: var(--fd);
  font-size: clamp(26px, 2.8vw, 36px);
  font-weight: 700;
  color: #fff;
  line-height: 1.12;
  margin-bottom: 24px;
}

.ab-diff-p {
  font-size: 14.5px;
  color: rgba(255,255,255,.88);
  line-height: 1.72;
  margin-bottom: 14px;
}

.ab-diff-note {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 13px;
  color: rgba(255,255,255,.70);
  font-style: italic;
  line-height: 1.6;
  margin-top: 20px;
  margin-bottom: 28px;
  padding: 12px 16px;
  background: rgba(255,255,255,.10);
  border-radius: 10px;
}

.ab-diff-note svg { flex-shrink: 0; margin-top: 2px; }

.ab-diff-btn {
  background: #fff;
  color: var(--teal-sh);
  border: none;
  font-weight: 700;
}
.ab-diff-btn:hover { color: var(--teal); }

/* ══════════════════════════════════════════════
   5. CTA
   ══════════════════════════════════════════════ */
.ab-cta {
  background: linear-gradient(135deg, rgba(19,72,78,.97) 0%, rgba(46,138,147,.93) 100%);
  padding-block: clamp(72px, 10vw, 112px);
  text-align: center;
  position: relative;
  overflow: hidden;
}

.ab-cta::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,.03) 1px, transparent 1px);
  background-size: 24px 24px;
  pointer-events: none;
}

.ab-cta-inner { position: relative; z-index: 1; }

.ab-cta-eyebrow {
  color: rgba(255,255,255,.65);
  margin-bottom: 16px;
}

.ab-cta-title {
  font-family: var(--fd);
  font-size: clamp(26px, 3.5vw, 44px);
  font-weight: 700;
  color: #fff;
  line-height: 1.15;
  margin-bottom: 20px;
}

.ab-cta-sub {
  font-size: 16px;
  color: rgba(255,255,255,.80);
  line-height: 1.75;
  max-width: 540px;
  margin: 0 auto 36px;
}

.ab-cta-btn {
  background: #fff;
  color: var(--teal-sh);
  border: none;
  font-weight: 700;
  font-size: 15px;
  padding: 14px 36px;
}
.ab-cta-btn:hover { color: var(--teal); box-shadow: 0 8px 24px rgba(0,0,0,.15); }

/* ══════════════════════════════════════════════
   RESPONSIVE
   ══════════════════════════════════════════════ */
@media (max-width: 860px) {
  .ab-hero-grid,
  .ab-intro-grid,
  .ab-split-grid {
    grid-template-columns: 1fr;
  }

  .ab-hero-visual { order: -1; }

  .ab-hero-photo-wrap { width: 280px; height: 320px; }
  .ab-ring { display: none; }



  .ab-values-grid {
    grid-template-columns: 1fr;
    max-width: 420px;
    margin-inline: auto;
  }


}

@media (max-width: 520px) {
  .ab-hero-photo-wrap { width: 240px; height: 280px; }
}

/* Marginal floating scroll bubbles (Creative touch) */
main {
  position: relative;
}
.about-margin-bubble {
  position: absolute !important;
  z-index: 10;
}
.bubble-1 {
  top: 600px;
  right: 5vw;
}
.bubble-2 {
  top: 1300px;
  left: 5vw;
}
.bubble-3 {
  top: 2000px;
  right: 5vw;
}

@media (max-width: 1200px) {
  .about-margin-bubble {
    position: relative !important;
    display: inline-flex !important;
    margin: 28px auto !important;
    left: auto !important;
    right: auto !important;
    top: auto !important;
    bottom: auto !important;
    transform: none !important;
    justify-content: center;
    width: fit-content;
  }
  
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  main > section {
    width: 100%;
  }
}
</style>
