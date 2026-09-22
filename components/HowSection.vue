<script setup>
const { whatsappUrl } = useSiteConfig()

const props = defineProps({ blok: Object })
const sb = useState('sb-home', () => ({}))
const src = computed(() => props.blok || sb.value)
const steps = computed(() => [
  { n: 1, title: src.value?.how_step_1_title || 'Initial Consultation',  desc: src.value?.how_step_1_desc  || 'We begin by understanding where you are, what you need, and the challenges you have faced so far.' },
  { n: 2, title: src.value?.how_step_2_title || 'Focused Guidance',       desc: src.value?.how_step_2_desc  || 'Targeted, precise work on the areas of communication that matter most in your professional and everyday life.' },
  { n: 3, title: src.value?.how_step_3_title || 'Clarity & Expression',   desc: src.value?.how_step_3_desc  || 'Attention to how you express yourself, ensuring clarity, natural flow, and ease in communication.' },
  { n: 4, title: src.value?.how_step_4_title || 'Confidence in Practice', desc: src.value?.how_step_4_desc  || 'Support in applying your communication skills with confidence in real-world situations.' },
])
</script>

<template>

  <section class="how" id="metodologia">

    <div class="how-bg" aria-hidden="true"></div>
    <div class="how-grid-overlay" aria-hidden="true"></div>

    <!-- Bloque 1: título centrado -->
    <div class="how-title-block">
      <div class="wrap">
        <div class="how-header reveal">
          <span class="eyebrow">How I work</span>
          <h2 class="how-h2">Tailored, thoughtful, effective</h2>
          <p class="how-lead">
            I listen carefully to understand not only what you want to improve, but what is holding you back.
            With years of experience working with adults and professionals, I know that effective communication is about much more than speaking English correctly.
          </p>
        </div>
      </div>
    </div>

    <!-- Bloque 2: pasos centrados -->
    <div class="how-body-block">
      <div class="wrap">
        <div class="how-copy how-copy--centered">
          <p class="section-desc how-desc reveal" style="text-align:center">
            From there, I shape a personalised approach built around you — not a fixed structure, but a considered path aligned with your needs.
          </p>
          <p class="section-desc how-desc reveal" style="text-align:center; margin-top: 14px;">
            There are no rigid programmes. Only focused, meaningful progress at a pace that suits you.
          </p>

          <ol class="how-flow" role="list">
            <li v-for="s in steps" :key="s.n" class="how-flow-item reveal">
              <div class="how-flow-node">{{ s.n }}</div>
              <div class="how-flow-content">
                <p class="how-flow-title">{{ s.title }}</p>
                <p class="how-flow-desc">{{ s.desc }}</p>
              </div>
            </li>
          </ol>

          <div class="how-cta-wrap reveal">
            <a :href="whatsappUrl" class="btn btn-primary" target="_blank" rel="noopener">
              Start with a live conversation
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* ══════════════════════════════════════════════
   SECCIÓN HOW
   ══════════════════════════════════════════════ */
.how {
  position: relative;
  overflow: hidden;
  background: var(--n0);
}

.how-bg {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(540px 280px at 8% 18%,  rgba(46,138,147,.18), transparent 62%),
    radial-gradient(540px 290px at 92% 84%, rgba(217,96,58,.14),  transparent 64%),
    var(--teal-t1);
  pointer-events: none;
  z-index: 0;
}

.how-grid-overlay {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(to right, rgba(255,255,255,.22) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255,255,255,.22) 1px, transparent 1px);
  background-size: 34px 34px;
  opacity: .45;
  mask-image: radial-gradient(circle at 58% 44%, black 24%, transparent 84%);
  pointer-events: none;
  z-index: 1;
}

/* ── Bloque 1: titulo centrado (pantalla completa) ── */
.how-title-block {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-block: clamp(48px, 6vw, 64px);
}
.how-header {
  text-align: center;
}
.how-h2 {
  font-family: var(--fd);
  font-size: clamp(30px, 4vw, 52px);
  font-weight: 700;
  line-height: 1.1;
  color: var(--text);
  margin-top: 10px;
  text-wrap: balance;
}
.how-lead {
  font-size: clamp(15px, 1.4vw, 17.5px);
  color: var(--text2);
  max-width: 680px;
  margin: 16px auto 0;
  line-height: 1.65;
}

/* ── Bloque 2: pasos + call window ── */
.how-body-block {
  position: relative;
  z-index: 2;
  padding-block: clamp(24px, 4vw, 48px) clamp(60px, 8vw, 100px);
}
.how-copy--centered {
  max-width: 680px;
  margin-inline: auto;
}


/* ── Copy (izquierda) ────────────────────────── */
.how-copy { width: 100%; position: relative; z-index: 4; }
.how-desc { margin-inline: 0; margin-bottom: 12px; }

.how-flow {
  list-style: none;
  position: relative;
  margin-top: 28px;
  padding-left: 0;
  display: flex;
  flex-direction: column;
}
.how-flow::before {
  content: '';
  position: absolute;
  left: 19px;
  top: 20px;
  bottom: 0;
  width: 2px;
  background: rgba(255,255,255,.55);
  z-index: 0;
}
.how-flow-item {
  display: grid;
  grid-template-columns: 40px 1fr;
  gap: 14px;
  align-items: flex-start;
  padding-bottom: 18px;
  position: relative;
  z-index: 1;
}
.how-flow-item:last-child { padding-bottom: 0; }
.how-flow-node {
  width: 40px; height: 40px;
  border-radius: 50%;
  background: var(--teal);
  color: #fff;
  font-family: var(--fd);
  font-size: 14px; font-weight: 700;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
  position: relative;
  z-index: 2;
  box-shadow: 0 2px 10px rgba(0,0,0,.22);
}
.how-flow-content {
  background: rgba(255,255,255,.82);
  border-radius: 12px;
  padding: 11px 15px;
  box-shadow: 0 4px 12px rgba(0,0,0,.08);
}
.how-flow-title { font-family: var(--fd); font-size: 15px; font-weight: 600; margin-bottom: 4px; color: var(--text); }
.how-flow-desc  { font-size: 13.5px; color: var(--text2); line-height: 1.55; }
.how-cta-wrap { margin-top: 24px; display: flex; justify-content: center; }

/* ── Call stage ──────────────────────────────── */
.call-stage {
  position: relative;
  width: 100%;
  z-index: 5;
}

/* ── Call window ─────────────────────────────── */
.call-window {
  border-radius: 22px;
  overflow: hidden;
  box-shadow:
    0 0 0 1px rgba(46,138,147,.22),
    0 32px 64px rgba(30,110,118,.24),
    0 8px 18px rgba(0,0,0,.10);
  display: flex;
  flex-direction: column;
  background: #0f1923;
}

/* Top bar */
.call-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  background: #141f2b;
  border-bottom: 1px solid rgba(255,255,255,.06);
  flex-shrink: 0;
}
.call-brand { display: flex; align-items: center; gap: 7px; }
.brand-dot {
  width: 8px; height: 8px;
  border-radius: 50%;
  background: #10B981;
  box-shadow: 0 0 0 3px rgba(16,185,129,.22);
  flex-shrink: 0;
}
.brand-name { font-size: 12px; font-weight: 600; color: rgba(255,255,255,.82); letter-spacing: .02em; }
.call-timer { display: flex; align-items: center; gap: 6px; font-family: var(--fd); font-size: 12px; font-weight: 600; color: rgba(255,255,255,.7); letter-spacing: .06em; }
.rec-pulse { width: 7px; height: 7px; border-radius: 50%; background: #ef4444; animation: recBlink 1.6s ease-in-out infinite; flex-shrink: 0; }
@keyframes recBlink { 0%, 100% { opacity: 1; } 50% { opacity: .25; } }
.call-meta { display: flex; align-items: center; gap: 5px; font-size: 11px; color: rgba(255,255,255,.42); }

/* Video grid */
.call-screen { display: grid; grid-template-columns: 1fr 1fr; gap: 2px; position: relative; background: #000; flex: 1; }
.call-pane { position: relative; overflow: hidden; aspect-ratio: 4/3; }
.call-pane img { width: 100%; height: 100%; object-fit: cover; object-position: center top; display: block; }
.pane-grad { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,.72) 0%, rgba(0,0,0,0) 44%); pointer-events: none; }
.pane-camera-off {
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at center, #1e293b 0%, #0f172a 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  position: relative;
}
.avatar-circle {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: var(--teal-t2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--fd);
  font-size: 24px;
  font-weight: 700;
  box-shadow: 0 8px 24px rgba(0,0,0,0.3);
}
.camera-off-status {
  display: flex;
  align-items: center;
  gap: 6px;
  color: rgba(255, 255, 255, 0.35);
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}
.pane-label { position: absolute; bottom: 10px; left: 10px; display: flex; align-items: center; gap: 5px; color: rgba(255,255,255,.9); font-size: 11.5px; font-weight: 600; letter-spacing: .01em; }

/* Audio bars */
.pane-speak { position: absolute; bottom: 10px; right: 10px; display: flex; align-items: flex-end; gap: 2.5px; height: 16px; }
.spk { width: 3px; border-radius: 2px; background: #10B981; transform-origin: bottom; animation: speakPulse 1s ease-in-out infinite; }
.spk-1 { height: 6px;  animation-delay: 0s;    }
.spk-2 { height: 12px; animation-delay: 0.14s; }
.spk-3 { height: 16px; animation-delay: 0.28s; }
.spk-4 { height: 10px; animation-delay: 0.42s; }
.spk-5 { height: 6px;  animation-delay: 0.56s; }
@keyframes speakPulse { 0%, 100% { transform: scaleY(0.22); opacity: .55; } 50% { transform: scaleY(1); opacity: 1; } }

/* LIVE pill */
.call-live { position: absolute; top: 12px; left: 50%; transform: translateX(-50%); background: #ef4444; color: #fff; font-size: 10px; font-weight: 700; letter-spacing: .10em; padding: 5px 11px; border-radius: 999px; display: flex; align-items: center; gap: 6px; box-shadow: 0 4px 14px rgba(239,68,68,.45); z-index: 6; }
.live-dot { width: 6px; height: 6px; border-radius: 50%; background: #fff; flex-shrink: 0; animation: recBlink 1.6s ease-in-out infinite; }

/* Speech bubbles container on student screen */
.chat-bubbles-container {
  position: absolute;
  top: 14px;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  z-index: 8;
  opacity: 0;
  transform: translateY(8px);
}

.chat-bubble {
  background: #fff;
  border-radius: 12px;
  padding: 8px 14px;
  box-shadow: 0 8px 20px rgba(0,0,0,.20), 0 2px 5px rgba(0,0,0,.10);
  font-size: 12px;
  font-weight: 700;
  white-space: nowrap;
  opacity: 0;
  transform: translateY(10px);
  position: relative;
  width: fit-content;
}

/* Chat bubble tails pointing down to student */
.chat-bubble-tail {
  position: absolute;
  bottom: -5px;
  left: 50%;
  transform: translateX(-50%) rotate(45deg);
  width: 10px;
  height: 10px;
  background: #fff;
  z-index: -1;
  box-shadow: 2px 2px 4px rgba(0,0,0,.05);
}

/* Color and Animation definitions */
.chat-bubble--1 {
  color: #1E6E76;
  animation: bubbleFadeIn 18s ease-in-out infinite;
  animation-delay: 0.5s;
}
.chat-bubble--2 {
  color: var(--amber-sh);
  animation: bubbleFadeIn 18s ease-in-out infinite;
  animation-delay: 3.5s;
}
.chat-bubble--3 {
  color: #059669;
  animation: bubbleFadeIn 18s ease-in-out infinite;
  animation-delay: 6.5s;
}

@keyframes bubbleFadeIn {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  3% {
    opacity: 1;
    transform: translateY(0);
  }
  85% {
    opacity: 1;
    transform: translateY(0);
  }
  90%, 100% {
    opacity: 0;
    transform: translateY(-6px);
  }
}

/* Controls bar */
.call-bar { display: flex; align-items: center; justify-content: center; gap: 6px; padding: 10px 20px; background: #141f2b; border-top: 1px solid rgba(255,255,255,.06); flex-shrink: 0; }
.ctrl-btn { width: 36px; height: 36px; border-radius: 50%; border: none; cursor: default; display: flex; align-items: center; justify-content: center; background: rgba(255,255,255,.10); color: rgba(255,255,255,.80); transition: background .15s; flex-shrink: 0; }
.ctrl-btn:hover { background: rgba(255,255,255,.17); }
.ctrl-end { background: #ef4444; color: #fff; }
.ctrl-end:hover { background: #dc2626; }
.ctrl-sep { width: 1px; height: 22px; background: rgba(255,255,255,.12); margin-inline: 4px; flex-shrink: 0; }

/* ── Responsive ──────────────────────────────── */
@media (max-width: 980px) {
  .how-title-block { min-height: auto; padding-block: clamp(56px, 10vw, 80px); }
  .how-header { text-align: left; }
  .how-lead { margin-inline: 0; }
  .how-body-grid { grid-template-columns: 1fr; gap: 24px; }
  .how-copy  { order: 2; }
  .call-stage { order: 1; }
}
@media (max-width: 640px) {
  .how-grid-overlay { background-size: 26px 26px; }
  .call-bar { gap: 4px; padding: 8px 12px; }
  .ctrl-btn { width: 30px; height: 30px; }
  .ctrl-btn svg { width: 13px; height: 13px; }
  .speech-bubble { min-width: 120px; }
}
@media (prefers-reduced-motion: reduce) {
  .spk, .rec-pulse, .live-dot { animation: none; }
  .phrase { animation-duration: .01ms !important; }
}
</style>
