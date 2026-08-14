<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  text: {
    type: [String, Array],
    required: true
  },
  position: {
    type: String,
    default: 'top-right' // 'top-right', 'top-left', 'bottom-right', 'bottom-left'
  },
  delay: {
    type: Number,
    default: 0
  }
})

const bubbleRef = ref(null)
const isVisible = ref(false)
const displayedText = ref('')
let observer = null

const getPhrases = () => {
  if (Array.isArray(props.text)) {
    return props.text
  }
  if (typeof props.text === 'string') {
    if (props.text.startsWith('[') && props.text.endsWith(']')) {
      try {
        return JSON.parse(props.text)
      } catch (e) {
        // Fall back
      }
    }
    if (props.text.includes(',')) {
      return props.text.split(',').map(s => s.trim())
    }
    return [props.text]
  }
  return []
}

const phrases = getPhrases()
let phraseIndex = 0
let typewriterTimeout = null
let cycleTimeout = null
let active = false

const typePhrase = (phrase, charIndex, callback) => {
  if (!active) return
  if (charIndex <= phrase.length) {
    displayedText.value = phrase.slice(0, charIndex)
    typewriterTimeout = setTimeout(() => {
      typePhrase(phrase, charIndex + 1, callback)
    }, 70)
  } else {
    callback()
  }
}

const erasePhrase = (phrase, charIndex, callback) => {
  if (!active) return
  if (charIndex >= 0) {
    displayedText.value = phrase.slice(0, charIndex)
    typewriterTimeout = setTimeout(() => {
      erasePhrase(phrase, charIndex - 1, callback)
    }, 35)
  } else {
    callback()
  }
}

const startLoop = () => {
  if (!active || phrases.length === 0) return
  const currentPhrase = phrases[phraseIndex]
  displayedText.value = ''

  typePhrase(currentPhrase, 0, () => {
    cycleTimeout = setTimeout(() => {
      erasePhrase(currentPhrase, currentPhrase.length, () => {
        phraseIndex = (phraseIndex + 1) % phrases.length
        cycleTimeout = setTimeout(startLoop, 250)
      })
    }, 2200)
  })
}

const stopLoop = () => {
  active = false
  clearTimeout(typewriterTimeout)
  clearTimeout(cycleTimeout)
}

onMounted(() => {
  const host = bubbleRef.value?.parentElement
  if (!host) return

  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          if (!entry.isIntersecting) return
          isVisible.value = true
          if (!active) {
            active = true
            phraseIndex = 0
            startLoop()
          }
        }, props.delay)
      } else {
        isVisible.value = false
        stopLoop()
      }
    })
  }, {
    threshold: 0.05,
    rootMargin: '0px 0px -5% 0px'
  })

  observer.observe(host)
})

onUnmounted(() => {
  stopLoop()
  if (observer) {
    observer.disconnect()
  }
})
</script>

<template>
  <div
    ref="bubbleRef"
    class="scroll-bubble"
    :class="[position, { 'is-visible': isVisible }]"
    aria-hidden="true"
  >
    <div class="bubble-inner">
      <span class="bubble-text">{{ displayedText }}</span>
      <span class="bubble-cursor" :class="{ typing: active }">|</span>
      <span class="bubble-tail"></span>
    </div>
  </div>
</template>

<style scoped>
.scroll-bubble {
  position: absolute;
  z-index: 99;
  opacity: 0;
  transform: translateY(15px) scale(0.92);
  transition: opacity 0.55s cubic-bezier(0.165, 0.84, 0.44, 1),
              transform 0.55s cubic-bezier(0.165, 0.84, 0.44, 1);
  pointer-events: none;
}

/* Visibility State */
.scroll-bubble.is-visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}

/* inner container which wiggles / floats continuously */
.bubble-inner {
  position: relative;
  background: var(--surface);
  border: 1.5px solid var(--border);
  border-radius: 12px;
  padding: 8px 14px;
  box-shadow: var(--sh-md);
  display: flex;
  align-items: center;
  gap: 1px;
  will-change: transform;
}

/* Infinite drifting floating animation active when visible */
.scroll-bubble.is-visible .bubble-inner {
  animation: floatBubble 6s ease-in-out infinite;
}

@keyframes floatBubble {
  0% {
    transform: translateY(0px) rotate(0deg);
  }
  25% {
    transform: translateY(-3px) rotate(0.5deg);
  }
  50% {
    transform: translateY(-6px) rotate(-0.5deg);
  }
  75% {
    transform: translateY(-3px) rotate(0.2deg);
  }
  100% {
    transform: translateY(0px) rotate(0deg);
  }
}

.bubble-text {
  font-family: var(--fd);
  font-size: 13px;
  font-weight: 700;
  color: var(--teal);
  white-space: nowrap;
}

.bubble-cursor {
  font-size: 13px;
  font-weight: 700;
  color: var(--teal);
  animation: cursorBlink 0.8s infinite;
  display: inline-block;
  vertical-align: middle;
}

@keyframes cursorBlink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

/* Speech bubble tail */
.bubble-tail {
  position: absolute;
  width: 8px;
  height: 8px;
  background: var(--surface);
  border-right: 1.5px solid var(--border);
  border-bottom: 1.5px solid var(--border);
  transform: rotate(45deg);
}

/* Position offset mappings (relative to relative-positioned parent) */
.top-right {
  top: -12px;
  right: -30px;
}
.top-right .bubble-tail {
  bottom: -5px;
  left: 20px;
  border-right: 1.5px solid var(--border);
  border-bottom: 1.5px solid var(--border);
  border-left: none;
  border-top: none;
}

.top-left {
  top: -12px;
  left: -30px;
}
.top-left .bubble-tail {
  bottom: -5px;
  right: 20px;
  border-right: 1.5px solid var(--border);
  border-bottom: 1.5px solid var(--border);
  border-left: none;
  border-top: none;
}

.bottom-right {
  bottom: -12px;
  right: -30px;
}
.bottom-right .bubble-tail {
  top: -5px;
  left: 20px;
  border-left: 1.5px solid var(--border);
  border-top: 1.5px solid var(--border);
  border-right: none;
  border-bottom: none;
}

.bottom-left {
  bottom: -12px;
  left: -30px;
}
.bottom-left .bubble-tail {
  top: -5px;
  right: 20px;
  border-left: 1.5px solid var(--border);
  border-top: 1.5px solid var(--border);
  border-right: none;
  border-bottom: none;
}

.margin-left {
  left: 3vw;
  top: 50%;
  transform: translateY(-50%);
}
.margin-left .bubble-tail {
  display: none;
}

.margin-right {
  right: 3vw;
  top: 50%;
  transform: translateY(-50%);
}
.margin-right .bubble-tail {
  display: none;
}

/* Responsive adjustments for mobile screens */
@media (max-width: 800px) {
  .top-right {
    right: 12px;
    top: -18px;
  }
  .top-left {
    left: 12px;
    top: -18px;
  }
  .bottom-right {
    right: 12px;
    bottom: -18px;
  }
  .bottom-left {
    left: 12px;
    bottom: -18px;
  }
  .bubble-tail {
    display: none !important;
  }
}
</style>
