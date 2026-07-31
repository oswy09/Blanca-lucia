<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const timelineRef = ref(null)

const list = [
  {
    title: 'Professionals seeking clarity in communication',
    desc: 'You need to communicate clearly and confidently at work — in meetings, with clients, or across international environments — yet feel you are not fully expressing your capabilities.',
    iconBg: '#d1ece3',
    accent: 'var(--teal)'
  },
  {
    title: 'Adults returning with a specific goal',
    desc: 'Your priorities have evolved. You are looking to reconnect with a language or refine your communication with a clear, practical purpose.',
    iconBg: '#fef3c7',
    accent: 'var(--amber-sh)'
  },
  {
    title: 'Those who feel "stuck" despite experience',
    desc: 'You have spent years working with the language, yet still feel a gap between understanding and natural expression. This is where focused, individual guidance becomes essential.',
    iconBg: '#fde8e1',
    accent: 'var(--coral)'
  },
  {
    title: 'Individuals who value a personal approach',
    desc: 'You prefer thoughtful, one-to-one consultancy — where your needs are understood, and your progress is shaped with care and attention.',
    image: '/imagens/personalized advice.JPG',
    accent: 'var(--teal-sh)'
  }
]

let gsapCtx = null

onMounted(async () => {
  const { gsap } = await import('gsap')
  const { ScrollTrigger } = await import('gsap/ScrollTrigger')
  gsap.registerPlugin(ScrollTrigger)

  gsapCtx = gsap.context(() => {
    gsap.to('.timeline-line-progress', {
      height: '100%',
      ease: 'none',
      scrollTrigger: {
        trigger: '.timeline-grid',
        start: 'top 30%',
        end: 'bottom 70%',
        scrub: true
      }
    })

    gsap.utils.toArray('.timeline-item').forEach((item) => {
      const media = item.querySelector('.timeline-media-side')
      const card = item.querySelector('.timeline-card')
      const node = item.querySelector('.timeline-node')

      const itemTl = gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: 'top 82%',
          toggleActions: 'play none none none',
          once: true
        }
      })

      itemTl.from(media, { opacity: 0, scale: 0.93, y: 12, duration: 0.65, ease: 'power3.out' })
      itemTl.from(
        card.querySelectorAll('.timeline-card-title, .timeline-card-desc'),
        { opacity: 0, y: 14, stagger: 0.12, duration: 0.55, ease: 'power2.out' },
        '-=0.4'
      )
      itemTl.to(node, { backgroundColor: 'var(--teal)', scale: 1.3, duration: 0.35 }, '-=0.5')
    })
  }, timelineRef.value)

  window.addEventListener('load', () => ScrollTrigger.refresh())
  setTimeout(() => ScrollTrigger.refresh(), 500)
})

onUnmounted(() => { gsapCtx?.revert() })
</script>

<template>
  <section class="timeline-sec" ref="timelineRef" id="para-quien">
    <div class="wrap">

      <div class="timeline-header reveal">
        <span class="eyebrow">Who This Is For</span>
        <h2 class="section-title">Designed for adults who want <br class="dt-only">more than standard approaches</h2>
        <p class="section-desc">
          This personal consultancy is suited to individuals who feel that traditional methods have not fully addressed their needs.
        </p>
      </div>

      <div class="timeline-grid">
        <div class="timeline-line" aria-hidden="true"></div>
        <div class="timeline-line-progress" aria-hidden="true"></div>

        <div
          v-for="(item, idx) in list"
          :key="idx"
          class="timeline-item"
          :class="idx % 2 === 0 ? 'item-even' : 'item-odd'"
        >

          <!-- Photo / illustration side -->
          <div class="timeline-media-side">
            <div class="timeline-img-outer">
              <div class="timeline-img-wrap" :style="item.iconBg ? { background: item.iconBg } : {}">

                <!-- Real photo -->
                <img v-if="item.image" :src="item.image" :alt="item.title" class="timeline-img" loading="lazy" />

                <!-- SVG illustration for Professionals seeking clarity -->
                <svg v-else-if="idx === 0" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" class="timeline-icon-svg" aria-hidden="true">
                  <rect x="14" y="22" width="52" height="32" rx="8" fill="#059669" opacity="0.15"/>
                  <rect x="14" y="22" width="52" height="32" rx="8" stroke="#059669" stroke-width="2.2"/>
                  <path d="M30 60 L40 70 L50 60" stroke="#059669" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
                  <circle cx="40" cy="38" r="7" fill="#059669" opacity="0.18"/>
                  <path d="M34 38 L38 42 L47 33" stroke="#059669" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
                  <circle cx="24" cy="30" r="2.5" fill="#059669" opacity="0.45"/>
                  <circle cx="24" cy="38" r="2.5" fill="#059669" opacity="0.35"/>
                  <circle cx="24" cy="46" r="2.5" fill="#059669" opacity="0.25"/>
                </svg>

                <!-- SVG illustration for Adults returning with a specific goal -->
                <svg v-else-if="idx === 1" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" class="timeline-icon-svg" aria-hidden="true">
                  <circle cx="40" cy="40" r="26" stroke="#D97706" stroke-width="2.2" opacity="0.35"/>
                  <circle cx="40" cy="40" r="18" stroke="#D97706" stroke-width="2.2" opacity="0.55"/>
                  <circle cx="40" cy="40" r="10" fill="#D97706" opacity="0.2" stroke="#D97706" stroke-width="2.2"/>
                  <circle cx="40" cy="40" r="3.5" fill="#D97706"/>
                  <line x1="40" y1="14" x2="40" y2="20" stroke="#D97706" stroke-width="2.2" stroke-linecap="round"/>
                  <line x1="40" y1="60" x2="40" y2="66" stroke="#D97706" stroke-width="2.2" stroke-linecap="round"/>
                  <line x1="14" y1="40" x2="20" y2="40" stroke="#D97706" stroke-width="2.2" stroke-linecap="round"/>
                  <line x1="60" y1="40" x2="66" y2="40" stroke="#D97706" stroke-width="2.2" stroke-linecap="round"/>
                </svg>

                <!-- SVG illustration for Those who feel stuck -->
                <svg v-else-if="idx === 2" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" class="timeline-icon-svg" aria-hidden="true">
                  <rect x="12" y="16" width="44" height="32" rx="9" fill="#F97316" opacity="0.14"/>
                  <rect x="12" y="16" width="44" height="32" rx="9" stroke="#F97316" stroke-width="2.2"/>
                  <path d="M22 54 L28 48 L12 48" stroke="#F97316" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
                  <circle cx="26" cy="32" r="3" fill="#F97316" opacity="0.5"/>
                  <circle cx="34" cy="32" r="3" fill="#F97316" opacity="0.7"/>
                  <circle cx="42" cy="32" r="3" fill="#F97316"/>
                  <!-- Second small bubble top-right -->
                  <rect x="46" y="28" width="22" height="16" rx="6" fill="white" stroke="#F97316" stroke-width="1.8" opacity="0.9"/>
                  <path d="M56 44 L52 48" stroke="#F97316" stroke-width="1.8" stroke-linecap="round" fill="none"/>
                  <path d="M52 38 L60 38" stroke="#F97316" stroke-width="1.8" stroke-linecap="round" opacity="0.5"/>
                  <path d="M52 34 L62 34" stroke="#F97316" stroke-width="1.8" stroke-linecap="round" opacity="0.35"/>
                </svg>

              </div>
            </div>
          </div>

          <!-- Centre node -->
          <div class="timeline-node-container">
            <div class="timeline-node" aria-hidden="true"></div>
          </div>

          <!-- Text card -->
          <div class="timeline-text-side">
            <div class="timeline-card">
              <h3 class="timeline-card-title">{{ item.title }}</h3>
              <p class="timeline-card-desc">{{ item.desc }}</p>
            </div>
          </div>

        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
.timeline-sec {
  padding-block: var(--spy);
  background: var(--bg);
  position: relative;
  overflow: hidden;
}

/* ── Header ─────────────────────────────────── */
.timeline-header {
  margin-bottom: 72px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.timeline-header .section-title { color: var(--text); margin-top: 10px; max-width: 800px; }
.timeline-header .section-desc  { max-width: 600px; margin-top: 12px; color: var(--text2); }

/* ── Grid container ──────────────────────────── */
.timeline-grid {
  position: relative;
  max-width: 960px;
  margin-inline: auto;
  padding-block: 20px;
}

/* ── Vertical line ───────────────────────────── */
.timeline-line,
.timeline-line-progress {
  position: absolute;
  left: 50%;
  top: 0;
  width: 2px;
  transform: translateX(-50%);
}
.timeline-line          { bottom: 0; background: var(--border); z-index: 1; }
.timeline-line-progress { height: 0%; background: var(--teal);  z-index: 2; transform-origin: top center; }

/* ── Row ─────────────────────────────────────── */
.timeline-item {
  display: grid;
  grid-template-columns: 1fr 80px 1fr;
  align-items: center;
  position: relative;
  margin-bottom: 88px;
  z-index: 3;
}
.timeline-item:last-child { margin-bottom: 0; }

.timeline-media-side,
.timeline-node-container,
.timeline-text-side { grid-row: 1; }

.timeline-item.item-even .timeline-media-side { grid-column: 1; justify-content: flex-end;  padding-right: 24px; align-self: center; }
.timeline-item.item-even .timeline-text-side  { grid-column: 3; padding-left: 24px;          align-self: center; }
.timeline-item.item-odd  .timeline-media-side { grid-column: 3; justify-content: flex-start; padding-left: 24px;  align-self: center; }
.timeline-item.item-odd  .timeline-text-side  { grid-column: 1; padding-right: 24px;         align-self: center; }
.timeline-media-side { display: flex; align-items: center; }

/* ── Photo card ──────────────────────────────── */
.timeline-img-outer {
  position: relative;
  display: inline-block;
}

.timeline-img-wrap {
  width: 130px;
  height: 130px;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid #ffffff;
  box-shadow: var(--sh-md);
  background: var(--n50);
  flex-shrink: 0;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.timeline-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
  display: block;
}

.timeline-icon-svg {
  width: 72px;
  height: 72px;
  flex-shrink: 0;
  margin: auto;
  display: block;
  position: absolute;
  inset: 0;
  margin: auto;
}

/* ── Speech bubble ───────────────────────────── */
.speech-bubble {
  position: absolute;
  top: 18px;
  right: -56px;
  background: #fff;
  border: 1.5px solid var(--border);
  border-radius: 18px 18px 18px 4px;
  padding: 10px 16px 10px 14px;
  box-shadow: var(--sh-md);
  display: flex;
  align-items: baseline;
  gap: 1px;
  z-index: 10;
  white-space: nowrap;
}

/* When image is on the RIGHT column → flip bubble to the left */
.bubble-flip .speech-bubble {
  right: auto;
  left: -56px;
  border-radius: 18px 18px 4px 18px;
}

.bubble-dots {
  font-family: var(--fd);
  font-size: 26px;
  font-weight: 700;
  color: var(--coral);
  letter-spacing: .12em;
  line-height: 1;
}
.bubble-bang {
  font-family: var(--fd);
  font-size: 22px;
  font-weight: 700;
  color: var(--text2);
  line-height: 1;
}

/* ── Node ────────────────────────────────────── */
.timeline-node-container {
  grid-column: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 4;
}
.timeline-node {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--border);
  transition: background-color .3s ease, transform .3s ease;
}

/* ── Text card ───────────────────────────────── */
.timeline-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 26px 28px;
  box-shadow: var(--sh-sm);
  transition: transform .3s ease, box-shadow .3s ease;
}
.timeline-card:hover { transform: translateY(-2px); box-shadow: var(--sh-md); }

.timeline-card-title {
  font-family: var(--fd);
  font-size: 17px;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 10px;
  line-height: 1.3;
}
.timeline-card-desc {
  font-size: 14.5px;
  color: var(--text2);
  line-height: 1.68;
}

.dt-only { display: block; }

/* ── Mobile ──────────────────────────────────── */
@media (max-width: 768px) {
  .timeline-line,
  .timeline-line-progress { left: 20px; transform: none; }

  .timeline-item {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-left: 48px;
    margin-bottom: 56px;
  }

  .timeline-media-side {
    width: 100%;
    display: block !important;
    padding: 0 !important;
    margin-bottom: 16px;
  }

  .timeline-img-wrap { width: 130px; height: 130px; border-radius: 50%; }

  .timeline-text-side { width: 100%; padding: 0 !important; }

  .timeline-node-container {
    position: absolute;
    left: 13px;
    top: 43px;
  }

  .speech-bubble,
  .bubble-flip .speech-bubble {
    top: 10px;
    right: auto;
    left: 124px;
    border-radius: 18px 18px 18px 4px;
  }

  .dt-only { display: none; }
}
</style>
