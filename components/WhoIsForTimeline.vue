<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const timelineRef = ref(null)

const list = [
  {
    title: 'Professionals seeking clarity in communication',
    desc: 'You need to communicate clearly and confidently at work — in meetings, with clients, or across international environments — yet feel you are not fully expressing your capabilities.',
    image: '/imagens/video call learning.JPG',
    accent: 'var(--teal)'
  },
  {
    title: 'Adults returning with a specific goal',
    desc: 'Your priorities have evolved. You are looking to reconnect with a language or refine your communication with a clear, practical purpose.',
    image: '/imagens/adult learning English.jpg',
    accent: 'var(--amber-sh)'
  },
  {
    title: 'Those who feel "stuck" despite experience',
    desc: 'You have spent years working with the language, yet still feel a gap between understanding and natural expression. This is where focused, individual guidance becomes essential.',
    image: '/imagens/woman speechless.JPG',
    accent: 'var(--coral)',
    bubble: true
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

          <!-- Photo side -->
          <div class="timeline-media-side">
            <div class="timeline-img-outer" :class="{ 'bubble-host': item.bubble, 'bubble-flip': item.bubble && idx % 2 !== 0 }">
              <div class="timeline-img-wrap">
                <img :src="item.image" :alt="item.title" class="timeline-img" loading="lazy" />
              </div>
              <div v-if="item.bubble" class="speech-bubble" aria-label="Cannot find the words">
                <span class="bubble-dots">…</span><span class="bubble-bang">!</span>
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
}

.timeline-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
  display: block;
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
