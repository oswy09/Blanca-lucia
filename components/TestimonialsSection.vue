<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

// Storyblok: blok.testimonials (array)
const testimonials = [
  {
    id: 1,
    quote: 'I have dealt with Blanca for many years and she has always been the consummate professional. <strong>Her teaching techniques, patience, encouragement and outright results are second to none.</strong> Blanca successfully brings the best out in her students, where teacher and pupil are totally congruent.',
    name: 'Francis Dowling',
    role: 'Training & Development Controller · Nissan Technical Centre Europe',
    initials: 'FD',
    color: 'teal',
  },
  {
    id: 2,
    quote: 'I would like to say thank you for all your hard work with our clients. <strong>They have all much appreciated and benefited from your teaching,</strong> you have always worked to a very high standard which has reflected in the success rate of your lessons. We will be sure to pass further contracts your way.',
    name: 'Rosemary Plumbbridge',
    role: 'WIB Language Training',
    initials: 'RP',
    color: 'teal',
  },
  {
    id: 3,
    quote: 'Her passion and professionalism were second to none. <strong>I found her well structured program ideal for learning and mastering the language.</strong> Under her guidance I have no doubt that anyone, regardless of ability and level, will be able to speak and write fluently. I cannot recommend her enough.',
    name: 'Gerald Reinders',
    role: 'Information Systems · Nissan Europe',
    initials: 'GR',
    color: 'teal',
  },
  {
    id: 4,
    quote: '<strong>Blanca introduced the basics in a very approachable way.</strong> Learning was mixed with a rich source of listening and spoken word tasks, as well as cultural context. I found the teaching methods both fun and well structured, and individual to all class members.',
    name: 'Colin Watts',
    role: 'Lecta Paper UK Ltd',
    initials: 'CW',
    color: 'amber',
  },
]

const carouselRef = ref(null)
const autoplayId = ref(null)

const carouselItems = computed(() => [...testimonials, ...testimonials])

const stopAutoplay = () => {
  if (autoplayId.value) {
    clearInterval(autoplayId.value)
    autoplayId.value = null
  }
}

const startAutoplay = () => {
  if (!carouselRef.value || autoplayId.value) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  autoplayId.value = setInterval(() => {
    const el = carouselRef.value
    if (!el) return

    const firstCard = el.querySelector('.testi-card')
    if (!firstCard) return

    const step = getStep()
    const halfway = el.scrollWidth / 2

    if (el.scrollLeft >= halfway) {
      el.scrollLeft = 0
    }

    el.scrollBy({ left: step, behavior: 'smooth' })
  }, 4200)
}

const getStep = () => {
  const el = carouselRef.value
  if (!el) return 0
  const firstCard = el.querySelector('.testi-card')
  if (!firstCard) return 0
  const cardWidth = firstCard.getBoundingClientRect().width
  const gap = 20
  return cardWidth + gap
}

const scrollNext = () => {
  const el = carouselRef.value
  if (!el) return
  const step = getStep()
  const halfway = el.scrollWidth / 2

  if (el.scrollLeft >= halfway) {
    el.scrollLeft = 0
  }

  el.scrollBy({ left: step, behavior: 'smooth' })
}

const scrollPrev = () => {
  const el = carouselRef.value
  if (!el) return
  const step = getStep()
  const halfway = el.scrollWidth / 2

  if (el.scrollLeft <= 0) {
    el.scrollLeft = halfway
  }

  el.scrollBy({ left: -step, behavior: 'smooth' })
}

onMounted(() => {
  startAutoplay()
})

onBeforeUnmount(() => {
  stopAutoplay()
})
</script>

<template>
  <section class="testi-sec" id="testimonios">
    <div class="wrap">
      <div class="testi-head reveal">
        <div>
          <span class="eyebrow">Why Choose Fluent Future</span>
          <h2 class="section-title">Real stories of professional growth</h2>
        </div>

        <div class="testi-controls" aria-label="Testimonials controls">
          <button
            type="button"
            class="testi-arrow"
            aria-label="Previous testimonials"
            @click="scrollPrev"
          >
            <span aria-hidden="true">←</span>
          </button>
          <button
            type="button"
            class="testi-arrow"
            aria-label="Next testimonials"
            @click="scrollNext"
          >
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>

      <div
        ref="carouselRef"
        class="testi-carousel"
        role="region"
        aria-label="Testimonials carousel"
        @mouseenter="stopAutoplay"
        @mouseleave="startAutoplay"
        @focusin="stopAutoplay"
        @focusout="startAutoplay"
      >
        <article v-for="(t, idx) in carouselItems" :key="`${t.id}-${idx}`" class="testi-card">
          <div class="testi-source">
            <svg class="testi-google" viewBox="0 0 24 24" aria-hidden="true">
              <path fill="#EA4335" d="M12 10.2v3.9h5.4c-.2 1.2-.9 2.3-1.9 3v2.5h3.1c1.8-1.7 2.8-4.2 2.8-7.1 0-.7-.1-1.5-.2-2.2H12z"/>
              <path fill="#34A853" d="M12 21c2.6 0 4.8-.9 6.4-2.4l-3.1-2.5c-.9.6-2 .9-3.3.9-2.5 0-4.7-1.7-5.5-4.1H3.3v2.6C4.9 18.8 8.2 21 12 21z"/>
              <path fill="#4A90E2" d="M6.5 12.9c-.2-.6-.3-1.2-.3-1.9s.1-1.3.3-1.9V6.5H3.3C2.5 8 2 9.4 2 11s.5 3 1.3 4.5l3.2-2.6z"/>
              <path fill="#FBBC05" d="M12 5c1.4 0 2.7.5 3.6 1.4l2.7-2.7C16.8 2.2 14.6 1 12 1 8.2 1 4.9 3.2 3.3 6.5l3.2 2.6C7.3 6.7 9.5 5 12 5z"/>
            </svg>
            Google review
          </div>

          <p class="testi-deco" aria-hidden="true">“</p>

          <!-- eslint-disable-next-line vue/no-v-html -->
          <p class="testi-quote" v-html="t.quote"></p>

          <div class="testi-author">
            <div class="testi-av" :class="'testi-av--' + t.color" aria-hidden="true">{{ t.initials }}</div>
            <div>
              <p class="testi-name">{{ t.name }}</p>
              <p class="testi-role">{{ t.role }}</p>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.testi-sec {
  padding-block: var(--spy);
  background: var(--surface);
}

.testi-head {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 16px;
}

.testi-controls {
  display: inline-flex;
  gap: 10px;
}

.testi-arrow {
  width: 42px;
  height: 42px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: #fff;
  color: var(--text2);
  font-size: 18px;
  cursor: pointer;
  transition: transform .15s, color .15s, border-color .15s, box-shadow .15s;
}

.testi-arrow:hover {
  color: var(--teal);
  border-color: var(--teal-t2);
  box-shadow: var(--sh-sm);
}

.testi-arrow:active { transform: scale(.96); }

.testi-carousel {
  --gap: 20px;
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: calc((100% - (2 * var(--gap))) / 3);
  gap: var(--gap);
  margin-top: 48px;
  overflow-x: auto;
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
  padding-bottom: 8px;
  scrollbar-width: none;
}

.testi-carousel::-webkit-scrollbar { display: none; }

.testi-card {
  scroll-snap-align: start;
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-height: 286px;
  box-shadow: var(--sh-sm);
  transition: box-shadow .2s, transform .2s;
}

.testi-card:hover {
  box-shadow: var(--sh-md);
  transform: translateY(-2px);
}

.testi-source {
  font-size: 11px;
  font-weight: 700;
  color: var(--text3);
  letter-spacing: .02em;
  display: inline-flex;
  align-items: center;
  gap: 7px;
}

.testi-google {
  width: 15px;
  height: 15px;
  flex-shrink: 0;
}

.testi-deco {
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 46px;
  font-weight: 700;
  color: var(--text);
  line-height: .7;
  margin-top: 2px;
}

.testi-quote {
  font-size: 15px;
  color: var(--text);
  line-height: 1.6;
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.testi-author {
  display: flex;
  align-items: center;
  gap: 12px;
  padding-top: 2px;
}

.testi-av {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  font-family: var(--fd);
  font-size: 12px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.testi-av--teal  { background: var(--teal-t1);  color: var(--teal); }
.testi-av--amber { background: var(--amber-t1); color: var(--amber-sh); }
.testi-name { font-size: 14px; font-weight: 700; color: var(--text); }
.testi-role { font-size: 12px; color: var(--text3); margin-top: 1px; }

@media (max-width: 980px) {
  .testi-head {
    align-items: center;
  }

  .testi-carousel {
    grid-auto-columns: calc((100% - var(--gap)) / 2);
  }
}

@media (max-width: 640px) {
  .testi-head {
    align-items: start;
    flex-direction: column;
  }

  .testi-carousel {
    grid-auto-columns: 100%;
  }
}
</style>
