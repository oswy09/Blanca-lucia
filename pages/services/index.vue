<script setup>
import { onMounted, onUnmounted } from 'vue'

const { siteUrl, whatsappUrl } = useSiteConfig()

useSeoMeta({
  title: 'Services — Fluent Future · Blanca Derby',
  description: 'Professional communication, interview preparation and document editing in English for Spanish-speaking professionals.',
})

useHead({
  link: [{ rel: 'canonical', href: `${siteUrl}/services` }],
})

useRevealOnScroll()

let gsapCtx = null

onMounted(async () => {
  const { gsap } = await import('gsap')
  const { ScrollTrigger } = await import('gsap/ScrollTrigger')
  gsap.registerPlugin(ScrollTrigger)

  gsapCtx = gsap.context(() => {
    const progressLine = document.querySelector('.sv-steps-progress-line')
    const stepNums = document.querySelectorAll('.sv-step-num')
    
    if (progressLine && stepNums.length > 0) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.sv-steps',
          start: 'top 50%',
          end: 'bottom 80%',
          scrub: true
        }
      })

      // Initial active style for step 1
      gsap.set(stepNums[0], { 
        backgroundColor: '#ffffff', 
        color: 'var(--teal-sh)', 
        scale: 1.15, 
        borderColor: '#ffffff',
        boxShadow: '0 0 16px rgba(255,255,255,0.4)'
      })

      // Animate line from step 1 to 2
      tl.to(progressLine, { attr: { x2: 375 }, ease: 'none' })
        .to(stepNums[1], { 
          backgroundColor: '#ffffff', 
          color: 'var(--teal-sh)', 
          scale: 1.15, 
          borderColor: '#ffffff',
          boxShadow: '0 0 16px rgba(255,255,255,0.4)',
          duration: 0.15 
        }, '+=0')
        // Animate line from 2 to 3
        .to(progressLine, { attr: { x2: 625 }, ease: 'none' })
        .to(stepNums[2], { 
          backgroundColor: '#ffffff', 
          color: 'var(--teal-sh)', 
          scale: 1.15, 
          borderColor: '#ffffff',
          boxShadow: '0 0 16px rgba(255,255,255,0.4)',
          duration: 0.15 
        }, '+=0')
        // Animate line from 3 to 4
        .to(progressLine, { attr: { x2: 875 }, ease: 'none' })
        .to(stepNums[3], { 
          backgroundColor: '#ffffff', 
          color: 'var(--teal-sh)', 
          scale: 1.15, 
          borderColor: '#ffffff',
          boxShadow: '0 0 16px rgba(255,255,255,0.4)',
          duration: 0.15 
        }, '+=0')
    }
  })
})

onUnmounted(() => {
  gsapCtx?.revert()
})

const services = [
  {
    eyebrow: 'Professional Communication',
    title: 'Personal language consultancy, tailored to you',
    desc: [
      'Focused support for professionals who want to communicate clearly and confidently in meetings, presentations, and everyday interactions.',
      'We work on clarity, structure, tone, and natural expression — ensuring you can communicate with precision and ease.',
    ],
    features: [
      'Fluency-building through real professional scenarios',
      'Presentation skills and confident delivery in English',
      'Reducing hesitation and improving natural flow',
      'Video call and telephone communication strategies',
    ],
    accent: 'teal',
    dark: true,
    illustration: 'communication',
  },
  {
    eyebrow: 'Interview & Career Communication',
    title: 'English Interview Preparation',
    desc: [
      'Preparation for interviews and professional conversations, with a focus on expressing your experience clearly and confidently.',
      'This includes structuring responses, refining language, and developing confidence in real situations.',
    ],
    features: [
      'Realistic practice with questions specific to your field',
      'Vocabulary tailored to your industry and role',
      'Structuring clear, confident answers',
      'Pronunciation, pacing, and natural delivery',
      'Strategies for managing nerves and thinking in English',
    ],
    accent: 'teal',
    dark: true,
    illustration: 'interview',
  },
  {
    eyebrow: 'Written Communication',
    title: 'English Editing for Emails & Documents',
    desc: [
      'Careful review and refinement of emails, documents, and professional writing.',
      'The focus is on clarity, tone, and accuracy — ensuring your written communication reflects your level of expertise.',
    ],
    features: [
      'Review and refinement of professional emails',
      'Editing reports, proposals, and formal documents',
      'Improving tone, register, and clarity',
      'Guidance on professional written conventions in English',
      'Personalised feedback and recommendations',
    ],
    accent: 'teal',
    dark: true,
    illustration: 'editing',
  },
]

const steps = [
  { num: '1', title: 'Initial Contact', desc: 'A first conversation to understand your needs and goals.' },
  { num: '2', title: 'Initial Consultation', desc: 'A more detailed discussion to explore your current level and challenges.' },
  { num: '3', title: 'Personalised Approach', desc: 'A tailored plan based on your specific requirements.' },
  { num: '4', title: 'Ongoing Sessions', desc: 'Continued work focused on meaningful and lasting progress.' },
]
</script>

<template>
  <main>

    <!-- ── 1. HERO ─────────────────────────────────────────────── -->
    <section class="sv-hero">
      <div class="wrap sv-hero-inner reveal">
        <span class="eyebrow sv-eyebrow">My Services</span>
        <h1 class="sv-title">Tailored Language Consultancy</h1>
        <p class="sv-subtitle">
          Each engagement is shaped around your individual needs, with a focus on clear, confident,
          and natural communication. With over 30 years of experience, I work with adults seeking
          a more focused and individual approach.
        </p>
      </div>
    </section>

    <!-- ── 2. SERVICE SECTIONS ─────────────────────────────────── -->
    <div class="sv-services">
      <section
        v-for="(svc, i) in services"
        :key="i"
        class="sv-svc"
        :class="i % 2 === 0 ? 'sv-svc--even' : 'sv-svc--odd'"
      >

        <!-- ── Dark banner layout (Professional Communication) ── -->
        <template v-if="svc.dark">
          <div class="wrap">

            <!-- Dark teal card with SVG illustration -->
            <div class="sv-dark-banner reveal">
              <div class="sv-dark-content">
                <span class="eyebrow sv-dark-eyebrow">{{ svc.eyebrow }}</span>
                <h2 class="sv-dark-title">{{ svc.title }}</h2>
                <p v-for="(p, pi) in svc.desc" :key="pi" class="sv-dark-desc">{{ p }}</p>
                <a :href="whatsappUrl" class="btn sv-enquire-btn sv-enquire--white" target="_blank" rel="noopener">
                  Enquire About This Service
                </a>
              </div>

              <!-- SVG Illustrations (switch by type) -->
              <div class="sv-dark-illus" aria-hidden="true">

                <!-- Professional Communication: person at laptop + speech bubbles -->
                <svg v-if="svc.illustration === 'communication'" viewBox="0 0 220 200" fill="none" xmlns="http://www.w3.org/2000/svg" class="sv-dark-svg">
                  <circle cx="72" cy="58" r="22" stroke="rgba(255,255,255,.85)" stroke-width="2.5"/>
                  <path d="M40 140 C40 110 104 110 104 140" stroke="rgba(255,255,255,.85)" stroke-width="2.5" stroke-linecap="round"/>
                  <rect x="36" y="140" width="68" height="44" rx="4" stroke="rgba(255,255,255,.85)" stroke-width="2.5"/>
                  <path d="M28 184 L112 184" stroke="rgba(255,255,255,.85)" stroke-width="2.5" stroke-linecap="round"/>
                  <line x1="46" y1="153" x2="80" y2="153" stroke="rgba(255,255,255,.45)" stroke-width="2" stroke-linecap="round"/>
                  <line x1="46" y1="162" x2="94" y2="162" stroke="rgba(255,255,255,.45)" stroke-width="2" stroke-linecap="round"/>
                  <line x1="46" y1="171" x2="72" y2="171" stroke="rgba(255,255,255,.45)" stroke-width="2" stroke-linecap="round"/>
                  <rect x="110" y="30" width="90" height="56" rx="12" fill="rgba(255,255,255,.12)" stroke="rgba(255,255,255,.7)" stroke-width="2"/>
                  <path d="M122 86 L114 100 L136 86" fill="rgba(255,255,255,.12)" stroke="rgba(255,255,255,.7)" stroke-width="2" stroke-linejoin="round"/>
                  <line x1="124" y1="48" x2="188" y2="48" stroke="rgba(255,255,255,.6)" stroke-width="2" stroke-linecap="round"/>
                  <line x1="124" y1="58" x2="176" y2="58" stroke="rgba(255,255,255,.6)" stroke-width="2" stroke-linecap="round"/>
                  <line x1="124" y1="68" x2="184" y2="68" stroke="rgba(255,255,255,.6)" stroke-width="2" stroke-linecap="round"/>
                  <rect x="128" y="108" width="66" height="40" rx="10" fill="rgba(255,255,255,.08)" stroke="rgba(255,255,255,.45)" stroke-width="1.8"/>
                  <path d="M186 148 L194 158 L178 148" fill="rgba(255,255,255,.08)" stroke="rgba(255,255,255,.45)" stroke-width="1.8" stroke-linejoin="round"/>
                  <line x1="140" y1="122" x2="180" y2="122" stroke="rgba(255,255,255,.4)" stroke-width="1.8" stroke-linecap="round"/>
                  <line x1="140" y1="132" x2="170" y2="132" stroke="rgba(255,255,255,.4)" stroke-width="1.8" stroke-linecap="round"/>
                  <circle cx="155" cy="170" r="5" fill="rgba(240,180,80,.8)"/>
                  <circle cx="172" cy="170" r="3.5" fill="rgba(240,180,80,.5)"/>
                  <circle cx="185" cy="170" r="2.5" fill="rgba(240,180,80,.3)"/>
                </svg>

                <!-- Interview Preparation: video screen + checklist -->
                <svg v-else-if="svc.illustration === 'interview'" viewBox="0 0 220 200" fill="none" xmlns="http://www.w3.org/2000/svg" class="sv-dark-svg">
                  <!-- Monitor / video screen -->
                  <rect x="20" y="24" width="120" height="86" rx="8" stroke="rgba(255,255,255,.85)" stroke-width="2.5"/>
                  <!-- Camera dot -->
                  <circle cx="80" cy="30" r="3.5" fill="rgba(255,255,255,.5)"/>
                  <!-- Person face in screen -->
                  <circle cx="80" cy="68" r="18" stroke="rgba(255,255,255,.75)" stroke-width="2"/>
                  <!-- Shoulders -->
                  <path d="M52 114 Q80 104 108 114" stroke="rgba(255,255,255,.65)" stroke-width="2" stroke-linecap="round"/>
                  <!-- Monitor stand -->
                  <line x1="80" y1="110" x2="80" y2="124" stroke="rgba(255,255,255,.85)" stroke-width="2.5" stroke-linecap="round"/>
                  <path d="M60 124 L100 124" stroke="rgba(255,255,255,.85)" stroke-width="2.5" stroke-linecap="round"/>
                  <!-- Speech bubble from screen -->
                  <rect x="112" y="18" width="84" height="52" rx="10" fill="rgba(255,255,255,.1)" stroke="rgba(255,255,255,.6)" stroke-width="2"/>
                  <path d="M124 70 L116 82 L138 70" fill="rgba(255,255,255,.1)" stroke="rgba(255,255,255,.6)" stroke-width="2" stroke-linejoin="round"/>
                  <line x1="124" y1="34" x2="184" y2="34" stroke="rgba(255,255,255,.55)" stroke-width="1.8" stroke-linecap="round"/>
                  <line x1="124" y1="44" x2="178" y2="44" stroke="rgba(255,255,255,.55)" stroke-width="1.8" stroke-linecap="round"/>
                  <line x1="124" y1="54" x2="180" y2="54" stroke="rgba(255,255,255,.55)" stroke-width="1.8" stroke-linecap="round"/>
                  <!-- Checklist clipboard -->
                  <rect x="148" y="96" width="62" height="90" rx="6" stroke="rgba(255,255,255,.7)" stroke-width="2"/>
                  <rect x="162" y="90" width="34" height="14" rx="4" fill="rgba(255,255,255,.12)" stroke="rgba(255,255,255,.6)" stroke-width="1.8"/>
                  <!-- Check items -->
                  <circle cx="161" cy="118" r="5" stroke="rgba(240,180,80,.9)" stroke-width="1.8"/>
                  <polyline points="158,118 160,121 165,115" stroke="rgba(240,180,80,.9)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                  <line x1="172" y1="118" x2="200" y2="118" stroke="rgba(255,255,255,.5)" stroke-width="1.8" stroke-linecap="round"/>
                  <circle cx="161" cy="136" r="5" stroke="rgba(240,180,80,.9)" stroke-width="1.8"/>
                  <polyline points="158,136 160,139 165,133" stroke="rgba(240,180,80,.9)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                  <line x1="172" y1="136" x2="200" y2="136" stroke="rgba(255,255,255,.5)" stroke-width="1.8" stroke-linecap="round"/>
                  <circle cx="161" cy="154" r="5" stroke="rgba(255,255,255,.3)" stroke-width="1.8"/>
                  <line x1="172" y1="154" x2="196" y2="154" stroke="rgba(255,255,255,.3)" stroke-width="1.8" stroke-linecap="round"/>
                  <circle cx="161" cy="172" r="5" stroke="rgba(255,255,255,.3)" stroke-width="1.8"/>
                  <line x1="172" y1="172" x2="200" y2="172" stroke="rgba(255,255,255,.3)" stroke-width="1.8" stroke-linecap="round"/>
                  <!-- Amber dots -->
                  <circle cx="28" cy="170" r="5" fill="rgba(240,180,80,.8)"/>
                  <circle cx="41" cy="170" r="3.5" fill="rgba(240,180,80,.5)"/>
                  <circle cx="51" cy="170" r="2.5" fill="rgba(240,180,80,.3)"/>
                </svg>

                <!-- English Editing: document with pen and markup -->
                <svg v-else-if="svc.illustration === 'editing'" viewBox="0 0 220 200" fill="none" xmlns="http://www.w3.org/2000/svg" class="sv-dark-svg">
                  <!-- Main document -->
                  <rect x="18" y="16" width="114" height="158" rx="6" stroke="rgba(255,255,255,.85)" stroke-width="2.5"/>
                  <!-- Folded corner -->
                  <path d="M100 16 L132 48 L100 48 Z" fill="rgba(255,255,255,.12)" stroke="rgba(255,255,255,.6)" stroke-width="1.5" stroke-linejoin="round"/>
                  <!-- Text lines -->
                  <line x1="34" y1="68" x2="120" y2="68" stroke="rgba(255,255,255,.45)" stroke-width="2" stroke-linecap="round"/>
                  <line x1="34" y1="82" x2="112" y2="82" stroke="rgba(255,255,255,.45)" stroke-width="2" stroke-linecap="round"/>
                  <!-- Strikethrough line (edit) -->
                  <line x1="34" y1="96" x2="110" y2="96" stroke="rgba(255,100,80,.55)" stroke-width="2" stroke-linecap="round"/>
                  <line x1="34" y1="96" x2="110" y2="96" stroke="rgba(255,255,255,.25)" stroke-width="2" stroke-linecap="round" stroke-dasharray="5 4"/>
                  <!-- Corrected line + amber check -->
                  <line x1="34" y1="112" x2="106" y2="112" stroke="rgba(255,255,255,.45)" stroke-width="2" stroke-linecap="round"/>
                  <circle cx="118" cy="112" r="7" fill="rgba(240,180,80,.85)"/>
                  <polyline points="114,112 117,115 123,109" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <!-- More lines -->
                  <line x1="34" y1="128" x2="100" y2="128" stroke="rgba(255,255,255,.35)" stroke-width="2" stroke-linecap="round"/>
                  <line x1="34" y1="142" x2="114" y2="142" stroke="rgba(255,255,255,.35)" stroke-width="2" stroke-linecap="round"/>
                  <line x1="34" y1="156" x2="88" y2="156" stroke="rgba(255,255,255,.25)" stroke-width="2" stroke-linecap="round"/>
                  <!-- Pen / pencil -->
                  <line x1="158" y1="38" x2="202" y2="82" stroke="rgba(255,255,255,.85)" stroke-width="3" stroke-linecap="round"/>
                  <path d="M199,79 L193,95 L209,89 Z" fill="rgba(255,255,255,.7)" stroke="rgba(255,255,255,.7)" stroke-width="1" stroke-linejoin="round"/>
                  <rect x="154" y="31" width="10" height="10" rx="2" fill="rgba(240,180,80,.75)" transform="rotate(-45 159 36)"/>
                  <!-- Edit mark near strikethrough -->
                  <path d="M118 90 C124 86 130 90 126 96" stroke="rgba(240,180,80,.7)" stroke-width="1.8" stroke-linecap="round" fill="none"/>
                  <!-- Amber dots -->
                  <circle cx="152" cy="170" r="5" fill="rgba(240,180,80,.8)"/>
                  <circle cx="165" cy="170" r="3.5" fill="rgba(240,180,80,.5)"/>
                  <circle cx="175" cy="170" r="2.5" fill="rgba(240,180,80,.3)"/>
                </svg>

              </div>
            </div>

            <!-- Features list below the card -->
            <div class="sv-dark-features reveal" style="transition-delay:120ms">
              <ul class="sv-dark-feat-list">
                <li v-for="feat in svc.features" :key="feat" class="sv-dark-feat-item">
                  <div class="sv-feat-icon sv-feat-icon--teal" aria-hidden="true">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                  <span>{{ feat }}</span>
                </li>
              </ul>
            </div>

          </div>
        </template>

        <!-- ── Standard two-column layout ── -->
        <template v-else>
          <div class="wrap sv-svc-grid">

            <div class="sv-svc-text reveal">
              <span class="eyebrow" :class="`sv-ey--${svc.accent}`">{{ svc.eyebrow }}</span>
              <h2 class="sv-svc-title">{{ svc.title }}</h2>
              <p v-for="(p, pi) in svc.desc" :key="pi" class="sv-svc-desc">{{ p }}</p>
              <a :href="whatsappUrl" class="btn sv-enquire-btn" :class="`sv-enquire--${svc.accent}`" target="_blank" rel="noopener">
                Enquire About This Service
              </a>
            </div>

            <div class="sv-svc-features reveal" style="transition-delay:100ms">
              <ul class="sv-feat-list">
                <li v-for="feat in svc.features" :key="feat" class="sv-feat-item">
                  <div class="sv-feat-icon" :class="`sv-feat-icon--${svc.accent}`" aria-hidden="true">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                  <span>{{ feat }}</span>
                </li>
              </ul>
            </div>

          </div>
        </template>

      </section>
    </div>

    <!-- ── 3. STEPS ────────────────────────────────────────────── -->
    <section class="sv-steps">
      <div class="wrap">
        <div class="sv-steps-head reveal">
          <span class="eyebrow sv-steps-eyebrow">How I work with you</span>
          <h2 class="sv-steps-title">Simple Steps to Begin</h2>
        </div>
        <div class="sv-steps-grid-container">
          <!-- Horizontal Animated SVG Connecting Line -->
          <div class="sv-steps-line-wrap" aria-hidden="true">
            <svg class="sv-steps-line-svg" viewBox="0 0 1000 10" preserveAspectRatio="none">
              <line x1="125" y1="5" x2="875" y2="5" stroke="rgba(255,255,255,0.15)" stroke-width="3" stroke-linecap="round" />
              <line class="sv-steps-progress-line" x1="125" y1="5" x2="125" y2="5" stroke="#ffffff" stroke-width="3.5" stroke-linecap="round" />
            </svg>
          </div>

          <div class="sv-steps-grid">
            <div
              v-for="(step, i) in steps"
              :key="i"
              class="sv-step reveal"
              :style="`transition-delay:${i * 80}ms`"
            >
              <div class="sv-step-num-wrap">
                <div class="sv-step-num">{{ step.num }}</div>
              </div>
              <h3 class="sv-step-name">{{ step.title }}</h3>
              <p class="sv-step-desc">{{ step.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── 4. CTA ───────────────────────────────────────────────── -->
    <section class="sv-cta">
      <div class="wrap sv-cta-inner reveal">
        <span class="eyebrow sv-cta-eyebrow">Ready to Begin?</span>
        <h2 class="sv-cta-title">Start with a Conversation</h2>
        <p class="sv-cta-sub">
          You are welcome to contact me. We can begin with an initial conversation
          to understand your needs and consider the most appropriate way forward.
        </p>
        <NuxtLink to="/contact" class="btn sv-cta-btn">Get in Touch</NuxtLink>
      </div>
    </section>

  </main>
</template>

<style scoped>

/* ══════════════════════════════════════════════
   1. HERO
   ══════════════════════════════════════════════ */
.sv-hero {
  background:
    radial-gradient(640px 360px at 15% 0%, rgba(46,138,147,.08), transparent 60%),
    radial-gradient(480px 280px at 85% 100%, rgba(217,96,58,.03), transparent 60%),
    linear-gradient(to bottom, var(--bg) 0%, rgba(254, 250, 245, 0.15) 15%, rgba(254, 250, 245, 0.15) 85%, var(--bg) 100%),
    linear-gradient(to right, var(--bg) 0%, rgba(254, 250, 245, 0.15) 15%, rgba(254, 250, 245, 0.15) 85%, var(--bg) 100%),
    url('/imagens/background_services.png') no-repeat center center;
  background-size: cover;
  padding-top: clamp(72px, 10vw, 120px);
  padding-bottom: clamp(56px, 8vw, 88px);
  text-align: center;
}

.sv-hero-inner { max-width: 720px; margin-inline: auto; }

.sv-eyebrow { margin-bottom: 18px; }

.sv-title {
  font-family: var(--fd);
  font-size: clamp(36px, 5vw, 64px);
  font-weight: 700;
  line-height: 1.08;
  color: var(--text);
  margin-bottom: 22px;
}

.sv-subtitle {
  font-size: clamp(15px, 1.5vw, 17px);
  color: var(--text2);
  line-height: 1.75;
  max-width: 620px;
  margin-inline: auto;
}

.sv-services {
  position: relative;
  overflow: visible;
}

.services-path-wrap {
  position: absolute;
  top: 120px;
  bottom: 120px;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 1;
  pointer-events: none;
}

.services-path-svg {
  width: 100%;
  height: 100%;
  display: block;
  overflow: visible;
}

.services-track {
  opacity: 0.12;
}

.sv-svc {
  padding-block: clamp(28px, 3.5vw, 48px);
  position: relative;
}

.sv-svc--even { background: #fff; }
.sv-svc--odd  { background: #fff; }

/* ── Dark teal banner card (Professional Communication) ── */
.sv-dark-banner {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: clamp(32px, 5vw, 64px);
  align-items: center;
  background: linear-gradient(135deg, rgba(19,72,78,.97) 0%, rgba(46,138,147,.93) 60%, rgba(93,179,188,.88) 100%);
  border-radius: 28px;
  padding: clamp(36px, 5vw, 56px);
  box-shadow: 0 20px 48px rgba(19,72,78,.22);
  position: relative;
  overflow: hidden;
  margin-bottom: 32px;
}

.sv-dark-banner::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px);
  background-size: 24px 24px;
  pointer-events: none;
}

.sv-dark-content { position: relative; z-index: 1; }

.sv-dark-eyebrow { color: var(--amber) !important; }

.sv-dark-title {
  font-family: var(--fd);
  font-size: clamp(22px, 2.8vw, 34px);
  font-weight: 700;
  color: #fff;
  line-height: 1.18;
  margin-top: 6px;
  margin-bottom: 18px;
}

.sv-dark-desc {
  font-size: 15px;
  color: rgba(255,255,255,.82);
  line-height: 1.75;
  margin-bottom: 14px;
}
.sv-dark-desc:last-of-type { margin-bottom: 28px; }

.sv-enquire--white {
  background: #fff;
  color: var(--teal-sh);
  border: none;
  font-weight: 700;
}
.sv-enquire--white:hover {
  background: rgba(255,255,255,.88);
}

/* SVG illustration */
.sv-dark-illus {
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.sv-dark-svg {
  width: 100%;
  max-width: 220px;
  height: auto;
  filter: drop-shadow(0 8px 24px rgba(0,0,0,.18));
}

/* Features below the card — horizontal row */
.sv-dark-features { margin-bottom: 0; }

.sv-dark-feat-list {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 14px 24px;
}

.sv-dark-feat-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  font-size: 14.5px;
  color: var(--text2);
  line-height: 1.55;
}

@media (max-width: 760px) {
  .sv-dark-banner {
    grid-template-columns: 1fr;
    text-align: center;
  }
  .sv-dark-illus { display: none; }
  .sv-dark-feat-list { grid-template-columns: 1fr; }
}

.sv-svc-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(40px, 6vw, 80px);
  align-items: center;
}

.sv-svc-text,
.sv-svc-features {
  position: relative;
  z-index: 2;
}

/* Odd rows: flip order so features appear on the left */
.sv-svc--odd .sv-svc-text     { order: 2; }
.sv-svc--odd .sv-svc-features { order: 1; }

/* Eyebrow accent colours */
.sv-ey--teal  { color: var(--teal-sh); }
.sv-ey--amber { color: var(--amber-sh); }
.sv-ey--coral { color: var(--coral); }

.sv-svc-title {
  font-family: var(--fd);
  font-size: clamp(24px, 2.8vw, 36px);
  font-weight: 700;
  color: var(--text);
  line-height: 1.15;
  margin-top: 8px;
  margin-bottom: 20px;
}

.sv-svc-desc {
  font-size: 15px;
  color: var(--text2);
  line-height: 1.75;
  margin-bottom: 14px;
}
.sv-svc-desc:last-of-type { margin-bottom: 28px; }

/* Enquire button variants */
.sv-enquire-btn {
  font-size: 14px;
  font-weight: 700;
  padding: 12px 28px;
}

.sv-enquire--teal,
.sv-enquire--amber,
.sv-enquire--coral {
  background: var(--coral);
  color: #fff;
  border: none;
}
.sv-enquire--teal:hover,
.sv-enquire--amber:hover,
.sv-enquire--coral:hover { background: var(--coral-sh); }

/* Features list */
.sv-feat-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 16px;
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 28px 28px;
  box-shadow: var(--sh-sm);
}

.sv-svc--odd .sv-feat-list { background: var(--surface); }

.sv-feat-item {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  font-size: 14.5px;
  color: var(--text2);
  line-height: 1.55;
}

.sv-feat-icon {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 1px;
}

.sv-feat-icon--teal  { background: var(--teal-t1);  color: var(--teal); }
.sv-feat-icon--amber { background: var(--amber-t1); color: var(--amber-sh); }
.sv-feat-icon--coral { background: var(--coral-t1); color: var(--coral); }

/* ══════════════════════════════════════════════
   3. STEPS
   ══════════════════════════════════════════════ */
.sv-steps {
  background: linear-gradient(135deg, rgba(19,72,78,.97) 0%, rgba(46,138,147,.93) 60%, rgba(93,179,188,.9) 100%);
  padding-block: clamp(64px, 9vw, 104px);
  position: relative;
  overflow: hidden;
}

.sv-steps::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,.035) 1px, transparent 1px);
  background-size: 24px 24px;
  pointer-events: none;
}

.sv-steps-head {
  text-align: center;
  margin-bottom: 56px;
  position: relative;
  z-index: 1;
}

.sv-steps-eyebrow { color: rgba(255,255,255,.65); margin-bottom: 12px; }

.sv-steps-title {
  font-family: var(--fd);
  font-size: clamp(28px, 3.5vw, 44px);
  font-weight: 700;
  color: #fff;
}

.sv-steps-grid-container {
  position: relative;
}

.sv-steps-line-wrap {
  position: absolute;
  top: 28px;
  left: 0;
  right: 0;
  width: 100%;
  height: 6px;
  transform: translateY(-50%);
  pointer-events: none;
  z-index: 1;
}

.sv-steps-line-svg {
  width: 100%;
  height: 100%;
  display: block;
}

.sv-steps-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 28px;
  position: relative;
  z-index: 2;
}

.sv-step {
  text-align: center;
  position: relative;
}

.sv-step-num-wrap {
  display: inline-flex;
  margin-bottom: 18px;
  position: relative;
  z-index: 3;
}

.sv-step-num {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: rgba(255,255,255,.15);
  border: 2.5px solid rgba(255,255,255,.35);
  color: #fff;
  font-family: var(--fd);
  font-size: 20px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(4px);
  transition: background-color 0.4s, color 0.4s, transform 0.4s, border-color 0.4s, box-shadow 0.4s;
}

.sv-step-name {
  font-family: var(--fd);
  font-size: 15px;
  font-weight: 700;
  color: #fff;
  margin-bottom: 8px;
}

.sv-step-desc {
  font-size: 13.5px;
  color: rgba(255,255,255,.72);
  line-height: 1.65;
}

/* ══════════════════════════════════════════════
   4. CTA
   ══════════════════════════════════════════════ */
.sv-cta {
  padding-block: clamp(72px, 10vw, 112px);
  background: var(--bg);
  text-align: center;
}

.sv-cta-inner { max-width: 620px; margin-inline: auto; }

.sv-cta-eyebrow { margin-bottom: 14px; }

.sv-cta-title {
  font-family: var(--fd);
  font-size: clamp(28px, 3.5vw, 44px);
  font-weight: 700;
  color: var(--text);
  margin-bottom: 18px;
}

.sv-cta-sub {
  font-size: 16px;
  color: var(--text2);
  line-height: 1.75;
  margin-bottom: 36px;
}

.sv-cta-btn {
  background: var(--teal);
  color: #fff;
  border: none;
  font-weight: 700;
  font-size: 15px;
  padding: 14px 40px;
}
.sv-cta-btn:hover { background: var(--teal-sh); }

/* ══════════════════════════════════════════════
   RESPONSIVE
   ══════════════════════════════════════════════ */
@media (max-width: 860px) {
  .sv-svc-grid {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .sv-svc--odd .sv-svc-text,
  .sv-svc--odd .sv-svc-features { order: unset; }

  .sv-steps-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .sv-steps-line-wrap { display: none; }
}

@media (max-width: 520px) {
  .sv-steps-grid { grid-template-columns: 1fr; }
}
</style>
