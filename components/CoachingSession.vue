<script setup>
import { computed, onMounted, ref } from 'vue'

const cardRef = ref(null)
const typedText = ref('')
const isFinished = ref(false)
const hasStarted = ref(false)

const props = defineProps({ blok: Object })
const sb = useState('sb-home', () => ({}))
const src = computed(() => props.blok || sb.value)
const coachingTitle = computed(() => src.value?.coaching_title || 'My role is to help you bridge that gap.')
const fullText = computed(() => src.value?.coaching_desc || 'Many adults have spent years studying Spanish, yet still feel uncertain when speaking. My role is to help you bridge that gap through careful listening, deep experience, and an approach that treats you as an individual, not part of a standard programme.')

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
    typedText.value = fullText.value
    isFinished.value = true
    return
  }

  const duration = 2400 // 2.4 seconds for fluid typing animation
  const startTime = performance.now()

  function tick(now) {
    const elapsed = now - startTime
    const progress = Math.min(elapsed / duration, 1)

    const charCount = Math.floor(progress * fullText.value.length)
    typedText.value = fullText.value.slice(0, charCount)

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
        
        <!-- Title & Typewriter Text -->
        <div class="coaching-content">
          <h2 class="coaching-title">
            My role is to help you <br><em>bridge that gap.</em>
          </h2>
          <p class="coaching-desc-typewriter">
            {{ typedText }}<span v-if="!isFinished" class="typewriter-cursor">|</span>
          </p>
          <div class="coaching-bubble-wrap">
            <ScrollBubble :text="['Active listening', 'One-to-one focus']" position="inline" :delay="600" />
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
  max-width: 760px;
  margin-inline: auto;
  background: linear-gradient(135deg, rgba(30,110,118, 0.97) 0%, rgba(46,138,147, 0.92) 100%);
  border: 1.5px solid rgba(46, 138, 147, 0.25);
  border-radius: 28px;
  padding: clamp(40px, 6vw, 64px) clamp(32px, 5vw, 56px);
  box-shadow: 0 20px 40px rgba(30,110,118,0.18);
  text-align: center;
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
  color: var(--amber);
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

.coaching-bubble-wrap {
  display: flex;
  justify-content: center;
  margin-top: 24px;
}

@media (max-width: 550px) {
  .coaching-session-banner {
    border-radius: 20px;
    padding: 32px 20px;
  }
  .coaching-desc-typewriter {
    min-height: auto;
  }
}
</style>
