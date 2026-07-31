<script setup>
import { onMounted, ref } from 'vue'

const cardRef = ref(null)
const typedText = ref('')
const isFinished = ref(false)
const hasStarted = ref(false)

const fullText = "Many adults have spent years studying a language, yet still feel uncertain when speaking. My role is to help you bridge that gap — through careful listening, deep experience, and an approach that treats you as an individual, not part of a standard programme."

onMounted(() => {
  if (!cardRef.value) return
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting && !hasStarted.value) {
        hasStarted.value = true
        startTypewriter()
        observer.disconnect()
      }
    },
    { threshold: 0.15 }
  )
  observer.observe(cardRef.value)
})

function startTypewriter() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReducedMotion) {
    typedText.value = fullText
    isFinished.value = true
    return
  }

  const duration = 2400 // 2.4 seconds for fluid typing animation
  const startTime = performance.now()

  function tick(now) {
    const elapsed = now - startTime
    const progress = Math.min(elapsed / duration, 1)

    const charCount = Math.floor(progress * fullText.length)
    typedText.value = fullText.slice(0, charCount)

    if (progress < 1) {
      requestAnimationFrame(tick)
    } else {
      isFinished.value = true
    }
  }

  requestAnimationFrame(tick)
}
</script>

<template>
  <section class="coaching-session-sec">
    <div class="wrap">
      <div ref="cardRef" class="coaching-session-banner">
        
        <!-- Left Side: Title & Typewriter Text -->
        <div class="coaching-content">
<h2 class="coaching-title">
            My role is to help you <br><em>bridge that gap.</em>
          </h2>
          <p class="coaching-desc-typewriter">
            {{ typedText }}<span v-if="!isFinished" class="typewriter-cursor">|</span>
          </p>
        </div>

        <!-- Right Side: Student Photo with Organic Frame -->
        <div class="coaching-graphic">
          <div class="student-card-frame">
            <!-- Decorative swirl overlay -->
            <svg class="organic-swirl-svg" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round">
              <path d="M15,80 C25,45 65,30 85,50 C95,60 80,85 55,75 C35,65 25,40 55,20 C70,10 90,30 75,50" />
            </svg>

            <!-- Organic background blob containing the student photo -->
            <div class="organic-bg-blob">
              <img src="/imagens/customer-female.webp" alt="Coaching student" class="student-photo" />
            </div>

            <!-- Thick organic outline border -->
            <div class="student-frame-border"></div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
.coaching-session-sec {
  padding-top: 0;
  padding-bottom: clamp(40px, 6vw, 80px);
  background: #ffffff;
}

.coaching-session-banner {
  max-width: 1040px;
  margin-inline: auto;
  background: linear-gradient(135deg, rgba(30,110,118, 0.97) 0%, rgba(46,138,147, 0.92) 100%);
  border: 1.5px solid rgba(46, 138, 147, 0.25);
  border-radius: 28px;
  padding: clamp(32px, 5vw, 48px);
  box-shadow: 0 20px 40px rgba(30,110,118,0.18);
  display: grid;
  grid-template-columns: 1.25fr 0.75fr;
  gap: clamp(32px, 5vw, 64px);
  align-items: center;
  position: relative;
  overflow: hidden;
}

/* Subtle grid line details to mimic reference */
.coaching-session-banner::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
  background-size: 20px 20px;
  pointer-events: none;
}

.coaching-content {
  position: relative;
  z-index: 2;
}

.coaching-eyebrow {
  display: block;
  font-family: var(--fb);
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--amber-t1);
  margin-bottom: 8px;
}

.coaching-title {
  font-family: var(--fd);
  font-size: clamp(24px, 3.2vw, 36px);
  font-weight: 700;
  color: #fff;
  line-height: 1.2;
  margin-bottom: 20px;
}

.coaching-title em {
  font-style: normal;
  color: var(--amber);
}

.coaching-desc-typewriter {
  font-family: var(--fb);
  font-size: clamp(15px, 1.3vw, 16.5px);
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.8;
  margin: 0;
  min-height: 90px;
}

.typewriter-cursor {
  display: inline-block;
  margin-left: 2px;
  color: var(--amber);
  font-weight: 700;
  animation: blink 0.8s infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

/* Graphic styling */
.coaching-graphic {
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: center;
}

.student-card-frame {
  position: relative;
  width: 100%;
  max-width: 250px;
  aspect-ratio: 0.85;
}

.organic-bg-blob {
  position: absolute;
  inset: 0;
  background: var(--amber);
  border-radius: 46px 26px 56px 36px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(240, 180, 80, 0.22);
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

.student-photo {
  width: 90%;
  height: 90%;
  object-fit: contain;
  display: block;
  z-index: 2;
  transform: scale(1.05);
  transform-origin: bottom center;
}

/* Outline border frame */
.student-frame-border {
  position: absolute;
  inset: -6px;
  border: 5px solid var(--amber);
  border-radius: 52px 32px 62px 42px;
  pointer-events: none;
  z-index: 3;
}

/* Organic swirl overlay */
.organic-swirl-svg {
  position: absolute;
  top: -36px;
  right: 8px;
  width: 80px;
  height: 80px;
  color: var(--amber);
  z-index: 4;
  pointer-events: none;
  transform: rotate(-15deg);
}

/* Responsive adjustments */
@media (max-width: 850px) {
  .coaching-session-banner {
    grid-template-columns: 1fr;
    gap: 40px;
    padding: 32px 24px;
    text-align: center;
  }
  .coaching-desc-typewriter {
    min-height: auto;
  }
}

@media (max-width: 550px) {
  .coaching-session-banner {
    border-radius: 20px;
  }
  .student-card-frame {
    max-width: 200px;
  }
  .organic-swirl-svg {
    width: 60px;
    height: 60px;
    top: -26px;
  }
}
</style>
