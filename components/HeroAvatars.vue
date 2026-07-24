<template>
  <div class="av-root" aria-label="Blanca Derby and her clients">

    <!-- ── TOP: Blanca — larger circle + LIVE badge ──────── -->
    <div class="av av-blanca">
      <div class="av-frame av-frame--lg">
        <img src="/imagens/blanca.png" alt="Blanca Derby – English consultant" />
      </div>
      <div class="av-live" aria-label="Live sessions available">
        <span class="av-live-dot" aria-hidden="true"></span>
        LIVE
      </div>
    </div>

    <!-- ── BOTTOM-LEFT: female client — words bubble ──────── -->
    <div class="av av-female">
      <div class="av-bubble av-bubble--words" aria-hidden="true">
        <div class="word-track">
          <span class="word word-1">Sounds great!</span>
          <span class="word word-2">I'll present it.</span>
          <span class="word word-3">Let me clarify.</span>
        </div>
      </div>
      <div class="av-frame av-frame--sm">
        <img src="/imagens/customer-female.webp" alt="" aria-hidden="true" />
      </div>
      <div class="av-dot" aria-hidden="true"></div>
    </div>

    <!-- ── BOTTOM-RIGHT: male client — audio wave bubble ──── -->
    <div class="av av-male">
      <div class="av-bubble av-bubble--audio" aria-hidden="true">
        <span class="bar bar-1"></span>
        <span class="bar bar-2"></span>
        <span class="bar bar-3"></span>
        <span class="bar bar-4"></span>
        <span class="bar bar-5"></span>
      </div>
      <div class="av-frame av-frame--sm">
        <img src="/imagens/customer-male.webp" alt="" aria-hidden="true" />
      </div>
      <div class="av-dot" aria-hidden="true"></div>
    </div>

    <!-- ── SVG: V-shape lines + connector dots ──────────── -->
    <!--
      Container: 360 × 320
      Blanca:   left=108 top=12  → ø144 → center=(180, 84)
      Female:   left=22  top=188 → ø96  → center=(70,  236)
      Male:     left=239 top=188 → ø96  → center=(287, 236)
    -->
    <svg class="av-svg" viewBox="0 0 360 320" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <line x1="138" y1="142" x2="98"  y2="197" stroke="#10B981" stroke-width="1.5" stroke-dasharray="5 4" stroke-linecap="round" opacity="0.55"/>
      <line x1="221" y1="143" x2="259" y2="197" stroke="#10B981" stroke-width="1.5" stroke-dasharray="5 4" stroke-linecap="round" opacity="0.55"/>
      <circle cx="138" cy="142" r="5"   fill="#10B981" stroke="white" stroke-width="2.5"/>
      <circle cx="221" cy="143" r="5"   fill="#10B981" stroke="white" stroke-width="2.5"/>
      <circle cx="98"  cy="197" r="4.5" fill="#10B981" stroke="white" stroke-width="2.5"/>
      <circle cx="259" cy="197" r="4.5" fill="#10B981" stroke="white" stroke-width="2.5"/>
    </svg>

  </div>
</template>

<style scoped>
/* ── Root ─────────────────────────────────────────────────── */
.av-root {
  position: relative;
  width: 360px;
  height: 320px;
  flex-shrink: 0;
}

/* ── SVG below avatars ───────────────────────────────────── */
.av-svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

/* ── Avatar wrappers ─────────────────────────────────────── */
.av          { position: absolute; z-index: 2; }
.av-blanca   { top: 12px;  left: 108px; z-index: 4; }
.av-female   { top: 188px; left: 22px;  }
.av-male     { top: 188px; left: 239px; }

/* ── Circular frames ─────────────────────────────────────── */
.av-frame {
  border-radius: 50%;
  overflow: hidden;
  background: #d1ece3;
}
.av-frame--lg {
  width: 144px;
  height: 144px;
  border: 3.5px solid #fff;
  box-shadow: 0 14px 36px rgba(16,185,129,.26), 0 3px 10px rgba(0,0,0,.10);
}
.av-frame--sm {
  width: 96px;
  height: 96px;
  border: 3px solid #fff;
  box-shadow: 0 8px 22px rgba(16,185,129,.18), 0 2px 6px rgba(0,0,0,.09);
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

/* ── Green status dot (clients) ──────────────────────────── */
.av-dot {
  position: absolute;
  width: 14px;
  height: 14px;
  background: #10B981;
  border: 2.5px solid #fff;
  border-radius: 50%;
  bottom: 5px;
  right: 5px;
  z-index: 5;
  box-shadow: 0 1px 6px rgba(16,185,129,.50);
}

/* ── Speech bubble base ──────────────────────────────────── */
.av-bubble {
  position: absolute;
  background: #fff;
  border-radius: 14px;
  width: 104px;
  left: -4px;
  top: -55px;
  z-index: 6;
  filter: drop-shadow(0 4px 12px rgba(0,0,0,.11));
}
.av-bubble::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  border: 8px solid transparent;
  border-bottom-width: 0;
  border-top-color: #fff;
}

/* ── Words bubble ─────────────────────────────────────────── */
.av-bubble--words {
  padding: 8px 8px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.word-track {
  position: relative;
  width: 100%;
  height: 18px;
}
.word {
  position: absolute;
  inset: 0;
  text-align: center;
  font-size: 11px;
  font-weight: 700;
  color: #0f4a30;
  opacity: 0;
  white-space: nowrap;
  animation: wordFade 6s ease-in-out infinite;
}
.word-1 { animation-delay: 0s; }
.word-2 { animation-delay: 2s; }
.word-3 { animation-delay: 4s; }
@keyframes wordFade {
  0%       { opacity: 0; transform: translateY(5px); }
  8%, 25%  { opacity: 1; transform: translateY(0); }
  33%      { opacity: 0; transform: translateY(-5px); }
  100%     { opacity: 0; transform: translateY(-5px); }
}

/* ── Audio wave bubble ────────────────────────────────────── */
.av-bubble--audio {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 3px;
  padding: 8px 10px 9px;
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

/* ── Responsive ───────────────────────────────────────────── */
@media (max-width: 520px) {
  .av-root { transform: scale(0.74); transform-origin: top center; }
}
</style>
