<template>
  <section class="proof" ref="sectionRef" role="region" aria-label="Experience and corporate clients">
    <div class="wrap">

      <!-- Card flotando sobre el hero -->
      <div class="proof-card" ref="cardRef">
        <!-- Comilla apertura — tipografía serif real -->
        <span class="proof-deco proof-deco--open" ref="decoOpenRef" aria-hidden="true">&ldquo;</span>
        <!-- Comilla cierre -->
        <span class="proof-deco proof-deco--close" ref="decoCloseRef" aria-hidden="true">&rdquo;</span>

        <div class="proof-slides-container" ref="quoteRef">
          <transition name="slide-fade" mode="out-in">
            <blockquote :key="currentSlide" class="proof-quote">
              {{ slides[currentSlide] }}
            </blockquote>
          </transition>
        </div>

        <!-- Indicadores de avance (dots) -->
        <div class="proof-dots" role="tablist" aria-label="Quote slides">
          <button
            v-for="(slide, index) in slides"
            :key="index"
            type="button"
            class="proof-dot"
            :class="{ active: currentSlide === index }"
            @click="setSlide(index)"
            :aria-selected="currentSlide === index"
            :aria-label="`Slide ${index + 1}`"
          ></button>
        </div>
      </div>

      <!-- Marcas debajo -->
      <div class="proof-clients" ref="clientsRef">
        <span class="proof-label">Trusted by professionals at</span>
        <ul class="proof-logos" role="list">
          <li v-for="client in clients" :key="client" class="proof-item">{{ client }}</li>
        </ul>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const clients = [
  'Nissan Technical Centre Europe',
  'WIB Language Training',
  'Lecta Paper UK Ltd',
  'Nissan Europe Information Systems',
]

const slides = [
  "With over 30 years of experience in language teaching, translation, and personalised guidance, I now offer a focused, consultancy-based approach tailored to each individual.",
  "My work is centred on understanding your needs and guiding you towards meaningful, lasting progress — without rigid programmes or unnecessary complexity."
]

const currentSlide = ref(0)
let slideInterval = null

function setSlide(index) {
  currentSlide.value = index
  resetAutoplay()
}

function startAutoplay() {
  slideInterval = setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % slides.length
  }, 5000)
}

function resetAutoplay() {
  if (slideInterval) {
    clearInterval(slideInterval)
  }
  startAutoplay()
}

const sectionRef   = ref(null)
const cardRef      = ref(null)
const quoteRef     = ref(null)
const clientsRef   = ref(null)
const decoOpenRef  = ref(null)
const decoCloseRef = ref(null)

let gsapCtx = null

onMounted(async () => {
  startAutoplay()

  const { gsap } = await import('gsap')
  const { ScrollTrigger } = await import('gsap/ScrollTrigger')
  gsap.registerPlugin(ScrollTrigger)
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  gsapCtx = gsap.context(() => {
    // ── Card + comillas + quote ──────────────────
    const cardTl = gsap.timeline({
      scrollTrigger: { trigger: cardRef.value, start: 'top 90%', once: true },
    })
    cardTl
      .from(cardRef.value, {
        opacity: 0, y: 44, scale: 0.97,
        duration: 0.85, ease: 'power3.out',
      })
      .from(decoOpenRef.value, {
        opacity: 0, x: -30, y: 20, scale: 0.45, rotate: -12,
        duration: 0.78, ease: 'back.out(2.1)',
      }, '-=0.4')
      .from(decoCloseRef.value, {
        opacity: 0, x: 28, y: -18, scale: 0.45, rotate: 12,
        duration: 0.78, ease: 'back.out(2.1)',
      }, '<0.08')
      .from(quoteRef.value, {
        opacity: 0, y: 16,
        duration: 0.6, ease: 'power2.out',
      }, '-=0.3')

    // Micro-motion continua para que las comillas se perciban más vivas.
    if (!prefersReducedMotion) {
      gsap.to(decoOpenRef.value, {
        y: '+=6',
        x: '+=2',
        rotate: -8,
        duration: 2.4,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      })
      gsap.to(decoCloseRef.value, {
        y: '-=6',
        x: '-=2',
        rotate: 9,
        duration: 2.8,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      })
    }

    // ── Marcas: trigger propio cuando entran en vista ──
    const clientsTl = gsap.timeline({
      scrollTrigger: { trigger: clientsRef.value, start: 'top 88%', once: true },
    })
    clientsTl
      .from(clientsRef.value.querySelector('.proof-label'), {
        opacity: 0, y: 10,
        duration: 0.45, ease: 'power2.out',
      })
      .from(clientsRef.value.querySelectorAll('.proof-item'), {
        opacity: 0, y: 18, filter: 'blur(5px)',
        stagger: 0.12, duration: 0.55, ease: 'power2.out',
      }, '-=0.1')
  }, sectionRef.value)
})

onUnmounted(() => {
  if (slideInterval) {
    clearInterval(slideInterval)
  }
  gsapCtx?.revert()
})
</script>

<style scoped>
/* ── Sección: misma base que el hero (cream) ─── */
.proof {
  padding-top: 0;
  padding-bottom: 56px;
  background: var(--bg);
  position: relative;
  z-index: 5;
}

/* ── Card flotando a -110px ───────────────────── */
.proof-card {
  position: relative;
  margin-top: -110px;
  width: 100%;
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: clamp(36px, 5vw, 56px) clamp(56px, 9vw, 110px);
  box-shadow:
    0 12px 48px rgba(51,46,42,.13),
    0 3px 10px  rgba(51,46,42,.07);
  overflow: visible;
  margin-bottom: 40px;
}

/* ── Comillas tipográficas serif ──────────────── */
.proof-deco {
  position: absolute;
  font-family: 'Times New Roman', Georgia, serif;
  font-size: clamp(128px, 14vw, 186px);
  line-height: 1;
  color: color-mix(in srgb, var(--teal) 95%, white 5%);
  opacity: 0.5;
  pointer-events: none;
  user-select: none;
  font-weight: 900;
  font-style: normal;
  text-shadow: 0 14px 28px rgba(46,138,147,.22);
  filter: saturate(1.05);
  z-index: 0;
}
.proof-deco::before {
  content: '';
  position: absolute;
  inset: 30% 15%;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(46,138,147,.16) 0%, rgba(46,138,147,0) 72%);
  z-index: -1;
}
.proof-deco--open  { top: -24px; left: 12px; transform: rotate(-4deg); }
.proof-deco--close { bottom: -56px; right: 10px; transform: rotate(5deg); }

/* ── Texto del quote ──────────────────────────── */
.proof-slides-container {
  position: relative;
  z-index: 1;
  max-width: 680px;
  margin: 0 auto;
}

.proof-quote {
  font-size: clamp(15.5px, 1.6vw, 18px);
  line-height: 1.82;
  color: var(--text2);
  font-style: italic;
  text-align: center;
}

/* ── Dots ─────────────────────────────────────── */
.proof-dots {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 24px;
}

.proof-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: none;
  background-color: var(--n100);
  cursor: pointer;
  padding: 0;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.proof-dot:hover {
  background-color: var(--teal-t2);
}

.proof-dot.active {
  background-color: var(--teal);
  transform: scale(1.2);
}

/* Transitions */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.4s ease;
}

.slide-fade-enter-from {
  opacity: 0;
  transform: translateY(8px);
}

.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

/* ── Marcas ───────────────────────────────────── */
.proof-clients {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
}
.proof-label {
  font-size: 10.5px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: .14em;
  color: var(--text3);
}
.proof-logos {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
  list-style: none;
}
.proof-item {
  font-size: 13.5px;
  font-weight: 600;
  color: var(--n800);
  padding: 4px 20px;
  border-right: 1px solid var(--border);
  white-space: nowrap;
  transition: color .2s;
}
.proof-item:last-child { border-right: none; }
.proof-item:hover { color: var(--teal); }

@media (max-width: 640px) {
  .proof-card { margin-top: -70px; padding-inline: 28px; }
  .proof-deco { opacity: 0.42; }
  .proof-deco--open  { top: -18px; left: 6px; }
  .proof-deco--close { bottom: -48px; right: 6px; }
  .proof-logos { flex-direction: column; gap: 8px; }
  .proof-item  { border-right: none; padding: 3px 0; }
}
</style>
