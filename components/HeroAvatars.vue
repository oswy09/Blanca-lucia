<template>
  <div class="av-root" aria-label="Blanca Derby — English language consultant">

    <!-- Blanca — portrait principal -->
    <div class="av av-blanca">
      <div class="av-frame">
        <img src="/imagens/blanca.png" alt="Blanca Derby – English consultant" />
      </div>
      <div class="av-live" aria-label="Live sessions available">
        <span class="av-live-dot" aria-hidden="true"></span>
        LIVE
      </div>
    </div>

    <!-- Tarjeta izquierda: sesiones 1-to-1 -->
    <div class="av av-left" aria-hidden="true">
      <div class="session-card">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="card-icon">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
        <p class="session-label">1-to-1 · Personal</p>
      </div>
    </div>

    <!-- Tarjeta derecha: sesiones online -->
    <div class="av av-right" aria-hidden="true">
      <div class="session-card">
        <div class="audio-bars">
          <span class="bar bar-1"></span>
          <span class="bar bar-2"></span>
          <span class="bar bar-3"></span>
          <span class="bar bar-4"></span>
          <span class="bar bar-5"></span>
        </div>
        <p class="session-label">50+ consultations</p>
      </div>
    </div>

    <!-- Líneas SVG conectoras -->
    <svg class="av-svg" viewBox="0 0 360 320" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <line x1="148" y1="148" x2="82"  y2="208" stroke="#10B981" stroke-width="1.5" stroke-dasharray="5 4" stroke-linecap="round" opacity="0.55"/>
      <line x1="212" y1="148" x2="278" y2="208" stroke="#10B981" stroke-width="1.5" stroke-dasharray="5 4" stroke-linecap="round" opacity="0.55"/>
      <circle cx="148" cy="148" r="5"   fill="#10B981" stroke="white" stroke-width="2.5"/>
      <circle cx="212" cy="148" r="5"   fill="#10B981" stroke="white" stroke-width="2.5"/>
      <circle cx="82"  cy="208" r="4.5" fill="#10B981" stroke="white" stroke-width="2.5"/>
      <circle cx="278" cy="208" r="4.5" fill="#10B981" stroke="white" stroke-width="2.5"/>
    </svg>

  </div>
</template>

<style scoped>
.av-root {
  position: relative;
  width: 360px;
  height: 320px;
  flex-shrink: 0;
}

.av-svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.av { position: absolute; z-index: 2; }
.av-blanca { top: 12px; left: 108px; z-index: 4; }
.av-left   { top: 210px; left: 10px; }
.av-right  { top: 210px; left: 218px; }

/* ── Retrato de Blanca ───────────────────────────────────── */
.av-frame {
  width: 144px;
  height: 144px;
  border-radius: 50%;
  overflow: hidden;
  background: #d1ece3;
  border: 3.5px solid #fff;
  box-shadow: 0 14px 36px rgba(16,185,129,.26), 0 3px 10px rgba(0,0,0,.10);
}
.av-frame img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  display: block;
}

/* ── LIVE badge ──────────────────────────────────────────── */
.av-live {
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  background: #10B981;
  color: #fff;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: .10em;
  padding: 4px 11px 4px 9px;
  border-radius: 999px;
  display: flex;
  align-items: center;
  gap: 5px;
  white-space: nowrap;
  box-shadow: 0 2px 12px rgba(16,185,129,.50);
  z-index: 5;
}
.av-live-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #fff;
  flex-shrink: 0;
  animation: blink 1.8s ease-in-out infinite;
}
@keyframes blink {
  0%, 100% { opacity: 1; }
  50%       { opacity: .25; }
}

/* ── Ícono en tarjeta izquierda ──────────────────────────── */
.card-icon {
  color: var(--teal);
  flex-shrink: 0;
}

/* ── Tarjeta de sesión (derecha) ─────────────────────────── */
.session-card {
  background: #fff;
  border-radius: 16px;
  padding: 12px 16px;
  width: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  box-shadow: 0 8px 24px rgba(0,0,0,.10), 0 2px 6px rgba(0,0,0,.06);
}
.audio-bars {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 3px;
  height: 22px;
}
.bar {
  width: 3.5px;
  border-radius: 3px;
  background: linear-gradient(to top, #059669, #6EE7B7);
  transform-origin: bottom;
  animation: audioPulse 1.1s ease-in-out infinite;
  flex-shrink: 0;
}
.bar-1 { height: 10px; animation-delay: 0.00s; }
.bar-2 { height: 18px; animation-delay: 0.16s; }
.bar-3 { height: 22px; animation-delay: 0.32s; }
.bar-4 { height: 16px; animation-delay: 0.48s; }
.bar-5 { height: 10px; animation-delay: 0.64s; }
@keyframes audioPulse {
  0%, 100% { transform: scaleY(0.22); opacity: 0.55; }
  50%       { transform: scaleY(1);    opacity: 1; }
}
.session-label {
  font-size: 10.5px;
  font-weight: 600;
  color: var(--n500);
  text-align: center;
  white-space: nowrap;
}

/* ── Responsive ───────────────────────────────────────────── */
@media (max-width: 520px) {
  .av-root { transform: scale(0.74); transform-origin: top center; }
}
</style>
