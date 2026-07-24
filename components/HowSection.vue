<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const { whatsappUrl } = useSiteConfig()

const steps = [
  { n: 1, title: 'Initial Consultation',  desc: 'We begin by understanding where you are, what you need, and the challenges you’ve faced so far.' },
  { n: 2, title: 'Focused Guidance',       desc: 'Targeted, precise work on the areas of communication that matter most in your professional and everyday life.' },
  { n: 3, title: 'Clarity & Expression',   desc: 'Attention to how you express yourself — ensuring clarity, natural flow, and ease in communication.' },
  { n: 4, title: 'Confidence in Practice', desc: 'Support in applying your communication skills with confidence in real-world situations.' },
]

/* ── Refs ─────────────────────────────────────── */
const portalRef   = ref(null)   // fixed overlay: círculo que se expande
const sectionRef  = ref(null)
const pinStageRef = ref(null)   // .how-pin-stage: se oculta durante el portal
const overlayRef  = ref(null)
const copyRef     = ref(null)
const stageRef    = ref(null)
const windowRef   = ref(null)
const bubbleRef      = ref(null)
const heroTitleRef   = ref(null)   // título grande entre portal y call window

let gsapCtx  = null
let mediaCtx = null

onMounted(async () => {
  const { gsap } = await import('gsap')
  const { ScrollTrigger } = await import('gsap/ScrollTrigger')
  gsap.registerPlugin(ScrollTrigger)

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  gsapCtx = gsap.context(() => {
    mediaCtx = gsap.matchMedia()

    /* ═══════════════════════════════════════════════════════════════
       DESKTOP (≥ 981px)
       ─────────────────────────────────────────────────────────────
       Secuencia de scroll en 3 fases:

       FASE 1 — Portal reveal (círculo crece mientras How entra)
         • Trigger: sectionRef mismo, start:'top bottom' → end:'top top'
         • Sin pin: How sube normalmente y el círculo se expande.
         • Cuando How llega al top del viewport el círculo está a 160%.

       FASE 2 — Reveal centrado
         • pinTl arranca (pin How). El portal se desvanece.
         • .how-pin-stage aparece, cuadrícula se intensifica.
         • Título grande aparece centrado.

       FASE 3 — Desplazamiento lateral
         • El stage (call window) se mueve a la derecha.
         • El copy desliza desde la izquierda simultáneamente.
    ═══════════════════════════════════════════════════════════════ */
    mediaCtx.add('(min-width: 981px)', () => {

      // ── Ocultar contenido durante el portal ──
      gsap.set(pinStageRef.value,  { autoAlpha: 0 })
      gsap.set(copyRef.value,      { autoAlpha: 0, x: -70 })
      gsap.set(stageRef.value,     { autoAlpha: 0, xPercent: -50, yPercent: -50, scale: 1 })
      gsap.set(heroTitleRef.value, { autoAlpha: 0, y: 24 })

      // ── Steps ocultos individualmente hasta que el copy es visible ──
      const flowItems = Array.from(copyRef.value.querySelectorAll('.how-flow-item'))
      const ctaBtn    = copyRef.value.querySelector('.how-cta')
      if (!prefersReducedMotion) {
        gsap.set(flowItems, { autoAlpha: 0, y: 26, scale: 0.96 })
        gsap.set(ctaBtn,    { autoAlpha: 0 })
      }

      if (!prefersReducedMotion) {
        /* FASE 1: el portal se expande cuando la sección Services está terminando.
           Trigger en #servicios (referencia directa, sin pin) — el original falló
           con pin: serviciosEl; solo referencia de trigger no tiene ese problema.
           start 'bottom 65%': el borde inferior de Services está al 65% del viewport
           → todavía 65% de la pantalla muestra el fondo blanco de Services sobre el
           que el círculo teal es perfectamente visible. */
        const serviciosEl = document.getElementById('servicios')
        const portalAnim = gsap.fromTo(portalRef.value,
          { clipPath: 'circle(0% at 50% 50%)' },
          { clipPath: 'circle(160% at 50% 50%)', ease: 'power1.in' }
        )
        ScrollTrigger.create({
          trigger: serviciosEl || sectionRef.value,
          start: serviciosEl ? 'bottom 65%' : 'top bottom',
          end:   serviciosEl ? 'bottom top'  : 'top top',
          scrub: 1.5,
          animation: portalAnim,
          invalidateOnRefresh: true,
        })
      } else {
        /* Sin animación: mostrar contenido directamente */
        gsap.set(pinStageRef.value, { autoAlpha: 1 })
      }

      /* ── FASE 2 + 3: pin interno de How ── */
      let stepsStarted = false

      const pinTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.value,
          start: 'top top',
          end: '+=2000',
          scrub: true,
          pin: true,
          onUpdate(self) {
            if (!prefersReducedMotion && self.progress >= 0.75 && !stepsStarted) {
              stepsStarted = true
              gsap.timeline()
                .to(flowItems[0], { autoAlpha: 1, y: 0, scale: 1, duration: 0.5, ease: 'power3.out' })
                .to(flowItems[1], { autoAlpha: 1, y: 0, scale: 1, duration: 0.5, ease: 'power3.out' }, '+=0.45')
                .to(flowItems[2], { autoAlpha: 1, y: 0, scale: 1, duration: 0.5, ease: 'power3.out' }, '+=0.45')
                .to(flowItems[3], { autoAlpha: 1, y: 0, scale: 1, duration: 0.5, ease: 'power3.out' }, '+=0.45')
                .to(ctaBtn,       { autoAlpha: 1, duration: 0.35, ease: 'none' }, '+=0.35')
            }
          }
        },
      })

      pinTl
        /* 0→8%: desvanece portal, container visible, cuadrícula */
        .to(portalRef.value,   { opacity: 0, duration: 0.08, ease: 'none' }, 0)
        .to(pinStageRef.value, { autoAlpha: 1, duration: 0.06, ease: 'none' }, 0)
        .to(overlayRef.value,  { opacity: 1, backgroundPosition: '28px 24px', duration: 0.22, ease: 'none' }, 0)

        /* 8→28%: TÍTULO aparece grande centrado */
        .to(heroTitleRef.value, { autoAlpha: 1, y: 0, duration: 0.20, ease: 'power2.out' }, 0.08)

        /* 44→58%: título desaparece */
        .to(heroTitleRef.value, { autoAlpha: 0, y: -14, duration: 0.14, ease: 'none' }, 0.44)

        /* 58→74%: call window aparece centrada */
        .to(stageRef.value, { autoAlpha: 1, duration: 0.16, ease: 'none' }, 0.58)
        .to(windowRef.value, { scale: 1.06, duration: 0.14, ease: 'none' }, 0.60)

        /* 68→80%: burbuja */
        .to(bubbleRef.value, { autoAlpha: 1, y: 0, duration: 0.12, ease: 'none' }, 0.68)

        /* 72→100%: stage a la derecha, copy desde la izquierda */
        .to(stageRef.value,  { xPercent: -10, yPercent: -50, scale: 0.85, duration: 0.28, ease: 'none' }, 0.72)
        .to(copyRef.value,   { autoAlpha: 1, x: 0, duration: 0.26, ease: 'none' }, 0.74)

      /* Micro-movimiento flotante continuo */
      if (!prefersReducedMotion) {
        gsap.to(windowRef.value, {
          y: '-=7', duration: 2.5, repeat: -1, yoyo: true, ease: 'sine.inOut',
        })
        gsap.to(bubbleRef.value, {
          y: '-=5', duration: 2.1, repeat: -1, yoyo: true, ease: 'sine.inOut',
        })
      }
    })

    /* ═══════════════════════════════════════════════════════════════
       MOBILE (≤ 980px) — sin portal, animación simple de entrada
    ═══════════════════════════════════════════════════════════════ */
    mediaCtx.add('(max-width: 980px)', () => {
      gsap.set(pinStageRef.value,  { autoAlpha: 1 })
      gsap.set(copyRef.value,      { autoAlpha: 1, x: 0 })
      gsap.set(stageRef.value,     { autoAlpha: 1, xPercent: 0, yPercent: 0, scale: 1 })
      gsap.set(heroTitleRef.value, { display: 'flex', autoAlpha: 1, y: 0 })

      // Pasos visibles desde el inicio en mobile
      const flowItems = Array.from(copyRef.value.querySelectorAll('.how-flow-item'))
      const ctaBtn    = copyRef.value.querySelector('.how-cta')
      gsap.set(flowItems, { autoAlpha: 1, y: 0, scale: 1 })
      gsap.set(ctaBtn,    { autoAlpha: 1 })

      gsap.from(windowRef.value, {
        opacity: 0, y: 26, duration: 0.75, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.value, start: 'top 78%', once: true },
      })
    })

  }, sectionRef.value)
})

onUnmounted(() => {
  mediaCtx?.revert()
  gsapCtx?.revert()
})
</script>

<template>

  <!--
    PORTAL: div fixed que expande el fondo teal desde el centro.
    Está fuera del section para no verse afectado por z-index locales.
    GSAP lo anima con clip-path circle(0%) → circle(160%).
    Una vez que cubre la pantalla se hace fade-out, revelando How.
  -->
  <div ref="portalRef" class="how-portal" aria-hidden="true"></div>

  <section ref="sectionRef" class="how" id="metodologia">

    <!-- Fondo teal permanente de la sección -->
    <div class="how-bg" aria-hidden="true"></div>

    <!-- Cuadrícula de fondo (se intensifica con el scroll interno) -->
    <div ref="overlayRef" class="how-grid-overlay" aria-hidden="true"></div>

    <div ref="pinStageRef" class="wrap how-pin-stage">

      <!-- ── Título grande: aparece centrado entre el portal y la call window ── -->
      <div ref="heroTitleRef" class="how-hero-title" aria-hidden="true">
        <span class="eyebrow">How I work</span>
        <h2 class="how-hero-h2">Tailored, thoughtful, effective</h2>
        <p class="how-hero-p">Every engagement begins with a conversation — to understand your background, your objectives, and what may have held you back until now.</p>
      </div>

      <!-- ── Copy (izquierda) ───────────────────── -->
      <div ref="copyRef" class="how-copy">
        <span class="eyebrow">How I work</span>
        <p class="section-desc how-desc">
          From there, I shape a personalised approach built around you — not a fixed structure, but a considered path aligned with your needs.
        </p>
        <p class="section-desc how-desc" style="margin-top: 14px;">
          There are no rigid programmes. Only focused, meaningful progress at a pace that suits you.
        </p>

        <ol class="how-flow" role="list">
          <li v-for="s in steps" :key="s.n" class="how-flow-item">
            <div class="how-flow-node">{{ s.n }}</div>
            <div class="how-flow-content">
              <p class="how-flow-title">{{ s.title }}</p>
              <p class="how-flow-desc">{{ s.desc }}</p>
            </div>
          </li>
        </ol>

        <a :href="whatsappUrl" class="btn btn-primary how-cta" target="_blank" rel="noopener">
          Start with a live conversation
        </a>
      </div>

      <!-- ── Video call mockup (derecha) ──────────── -->
      <div ref="stageRef" class="call-stage" aria-label="Live video call preview">
        <article ref="windowRef" class="call-window">

          <!-- Top bar -->
          <header class="call-top">
            <div class="call-brand">
              <span class="brand-dot" aria-hidden="true"></span>
              <span class="brand-name">Fluent Future</span>
            </div>
            <div class="call-timer" aria-label="Session duration">
              <span class="rec-pulse" aria-hidden="true"></span>
              <span>00:42:18</span>
            </div>
            <div class="call-meta">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <rect x="5" y="11" width="14" height="11" rx="2"/>
                <path d="M8 11V7a4 4 0 0 1 8 0v4"/>
              </svg>
              Encrypted
            </div>
          </header>

          <!-- Video screen: dos paneles -->
          <div class="call-screen" role="presentation">

            <!-- Panel izquierdo: imagen live-session (Blanca) -->
            <div class="call-pane call-pane--blanca">
              <img src="/imagens/live-session.webp" alt="Blanca Derby — consultant" />
              <div class="pane-grad" aria-hidden="true"></div>
              <div class="pane-speak" aria-hidden="true">
                <span class="spk spk-1"></span>
                <span class="spk spk-2"></span>
                <span class="spk spk-3"></span>
                <span class="spk spk-4"></span>
                <span class="spk spk-5"></span>
              </div>
              <div class="pane-label">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M12 2c-1.7 0-3 1.3-3 3v5c0 1.7 1.3 3 3 3s3-1.3 3-3V5c0-1.7-1.3-3-3-3z"/>
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                  <line x1="12" y1="19" x2="12" y2="23"/>
                </svg>
                Blanca D.
              </div>
            </div>

            <!-- Panel derecho: cliente + burbuja -->
            <div class="call-pane call-pane--client">
              <img src="/imagens/customer-female.webp" alt="Client" />
              <div class="pane-grad" aria-hidden="true"></div>

              <div ref="bubbleRef" class="speech-bubble" aria-live="polite" aria-label="Client is speaking">
                <span class="phrase phrase-1">Sounds great!</span>
                <span class="phrase phrase-2">Let me clarify.</span>
                <span class="phrase phrase-3">I'll present it.</span>
                <span class="phrase phrase-4">That makes sense!</span>
                <span class="bubble-tail" aria-hidden="true"></span>
              </div>

              <div class="pane-label">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                Client
              </div>
            </div>

            <!-- LIVE pill -->
            <div class="call-live" aria-label="Live session">
              <span class="live-dot" aria-hidden="true"></span>
              LIVE
            </div>

          </div><!-- /call-screen -->

          <!-- Controls bar -->
          <div class="call-bar" aria-hidden="true">

            <button class="ctrl-btn" tabindex="-1" title="Microphone on">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 2c-1.7 0-3 1.3-3 3v5c0 1.7 1.3 3 3 3s3-1.3 3-3V5c0-1.7-1.3-3-3-3z"/>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                <line x1="12" y1="19" x2="12" y2="23"/>
                <line x1="8" y1="23" x2="16" y2="23"/>
              </svg>
            </button>

            <button class="ctrl-btn" tabindex="-1" title="Camera on">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M15 10l4.6-2.3A1 1 0 0 1 21 8.7v6.6a1 1 0 0 1-1.4.9L15 14v-4z"/>
                <rect x="1" y="6" width="14" height="12" rx="2"/>
              </svg>
            </button>

            <button class="ctrl-btn" tabindex="-1" title="Volume">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                <path d="M15.5 8.5a5 5 0 0 1 0 7"/>
                <path d="M19 5a10 10 0 0 1 0 14"/>
              </svg>
            </button>

            <button class="ctrl-btn" tabindex="-1" title="Chat">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
            </button>

            <button class="ctrl-btn" tabindex="-1" title="Share screen">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2"/>
                <line x1="8" y1="21" x2="16" y2="21"/>
                <line x1="12" y1="17" x2="12" y2="21"/>
              </svg>
            </button>

            <button class="ctrl-btn" tabindex="-1" title="Participants">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </button>

            <span class="ctrl-sep" aria-hidden="true"></span>

            <button class="ctrl-btn ctrl-end" tabindex="-1" title="End call">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.28-.28.7-.37 1.06-.24 1.12.45 2.34.7 3.6.7.55 0 1 .45 1 1V20c0 .55-.45 1-1 1C10.18 21 3 13.82 3 5c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.26.26 2.48.7 3.6.12.36.03.78-.24 1.06L6.6 10.8z"/>
                <line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" fill="none"/>
              </svg>
            </button>

          </div><!-- /call-bar -->

        </article>
      </div><!-- /call-stage -->

    </div><!-- /how-pin-stage -->
  </section>
</template>

<style scoped>
/* ══════════════════════════════════════════════
   PORTAL — capa fija para la transición
   Reproduce el mismo fondo que la sección How.
   GSAP anima clip-path: circle(0%) → circle(160%).
   ══════════════════════════════════════════════ */
.how-portal {
  position: fixed;
  inset: 0;
  z-index: 200;
  pointer-events: none;
  clip-path: circle(0% at 50% 50%);
  background:
    radial-gradient(540px 280px at 8% 18%,  rgba(46,138,147,.18), transparent 62%),
    radial-gradient(540px 290px at 92% 84%, rgba(217,96,58,.14),  transparent 64%),
    var(--teal-t1);
  /* Cuadrícula interna idéntica a .how-grid-overlay */
  background-image:
    linear-gradient(to right, rgba(255,255,255,.22) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255,255,255,.22) 1px, transparent 1px),
    radial-gradient(540px 280px at 8% 18%,  rgba(46,138,147,.18), transparent 62%),
    radial-gradient(540px 290px at 92% 84%, rgba(217,96,58,.14),  transparent 64%),
    var(--teal-t1);
  background-size: 34px 34px, 34px 34px, auto, auto, auto;
  mask-image: none;
}

/* ══════════════════════════════════════════════
   SECCIÓN HOW
   ══════════════════════════════════════════════ */
.how {
  position: relative;
  overflow: hidden;
  padding-block: clamp(70px, 10vw, 120px);
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

.how-pin-stage {
  position: relative;
  z-index: 2;
  min-height: min(820px, 88vh);
}

/* ── Título hero (centrado, entre portal y call window) ─── */
.how-hero-title {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  z-index: 10;
  pointer-events: none;
  padding-inline: clamp(24px, 5vw, 80px);
}
.how-hero-h2 {
  font-family: var(--fd);
  font-size: clamp(34px, 4.8vw, 64px);
  font-weight: 700;
  line-height: 1.1;
  color: var(--text);
  text-wrap: balance;
  margin-top: 12px;
}
.how-hero-p {
  font-family: var(--fb);
  font-size: clamp(16px, 1.6vw, 20px);
  color: var(--text2);
  max-width: 680px;
  margin-top: 20px;
  line-height: 1.6;
}
@media (max-width: 980px) {
  .how-hero-title {
    position: relative;
    inset: auto;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    text-align: left;
    padding-inline: 0;
    margin-bottom: 32px;
    pointer-events: auto;
  }
  .how-hero-h2 {
    font-size: clamp(26px, 4.5vw, 36px);
    margin-top: 8px;
    line-height: 1.15;
  }
  .how-hero-p {
    font-size: 16px;
    margin-top: 12px;
  }
}

/* ── Copy (izquierda) ────────────────────────── */
.how-copy { width: min(420px, 37%); position: relative; z-index: 4; }
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
.how-cta { margin-top: 24px; }

/* ── Call stage ──────────────────────────────── */
.call-stage {
  position: absolute;
  left: 50%;
  top: 50%;
  /* Sin transform CSS: GSAP gestiona xPercent:-50 yPercent:-50 para centrar */
  width: min(800px, 88vw);
  z-index: 3;
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

/* Speech bubble: burbuja única con ciclo CSS */
.speech-bubble {
  position: absolute;
  top: 14px; left: 50%;
  transform: translateX(-50%) translateY(8px);
  background: #fff;
  border-radius: 12px;
  padding: 9px 16px;
  min-width: 148px; height: 36px;
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 10px 24px rgba(0,0,0,.22), 0 2px 6px rgba(0,0,0,.12);
  z-index: 8;
  opacity: 0;
}
.bubble-tail { position: absolute; bottom: -7px; left: 50%; transform: translateX(-50%) rotate(45deg); width: 12px; height: 12px; background: #fff; box-shadow: 3px 3px 6px rgba(0,0,0,.08); }

.phrase { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; white-space: nowrap; opacity: 0; animation: phraseShow 20s ease-in-out infinite; }
.phrase-1 { color: #2E8A93; animation-delay: 0s;  }
.phrase-2 { color: var(--amber-sh); animation-delay: 5s;  }
.phrase-3 { color: #059669; animation-delay: 10s; }
.phrase-4 { color: #1E6E76; animation-delay: 15s; }
@keyframes phraseShow {
  0%  { opacity: 0; transform: translateY(5px);  }
  4%  { opacity: 1; transform: translateY(0); }
  21% { opacity: 1; transform: translateY(0); }
  25% { opacity: 0; transform: translateY(-5px); }
  100%{ opacity: 0; transform: translateY(-5px); }
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
  .how-pin-stage { min-height: auto; display: grid; gap: 26px; }
  .how-copy  { width: 100%; order: 2; }
  .call-stage { position: relative; left: 0; top: 0; width: 100%; order: 1; }
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
