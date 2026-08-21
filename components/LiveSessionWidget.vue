<template>
  <div class="lw-root">
    <!-- Header -->
    <div class="lw-header">
      <div class="lw-brand">
        <span class="lw-status-dot"></span>
        <span class="lw-brand-name">Fluent Future</span>
      </div>
      <div class="lw-timer">
        <span class="lw-rec-dot"></span>
        00:42:18
      </div>
      <div class="lw-enc">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
        Encrypted
      </div>
    </div>

    <!-- Body -->
    <div class="lw-body">
      <!-- Video feed -->
      <div class="lw-video-panel">
        <img src="/imagens/live-session.webp" alt="Blanca D." class="lw-video-img" />
        <div class="lw-live-badge">
          <span class="lw-live-dot"></span>LIVE
        </div>
        <div class="lw-speaker-tag">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M12 1a3 3 0 0 1 3 3v5a3 3 0 0 1-6 0V4a3 3 0 0 1 3-3z"/><path d="M19 10a7 7 0 0 1-14 0"/><line x1="12" y1="17" x2="12" y2="21"/><line x1="8" y1="21" x2="16" y2="21"/></svg>
          Blanca D.
          <span class="lw-mic-bars"><i></i><i></i><i></i><i></i></span>
        </div>
      </div>

      <!-- Chat panel -->
      <div class="lw-chat-panel">
        <div class="lw-client-tag">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
          Client
        </div>
        <div class="lw-bubbles">
          <div class="lw-bubble lw-bubble--a">I get it now…</div>
          <div class="lw-bubble lw-bubble--b">That makes sense!</div>
          <div class="lw-bubble lw-bubble--c">Well done!</div>
        </div>
      </div>
    </div>

    <!-- Controls -->
    <div class="lw-controls">
      <button class="lw-btn" aria-label="Microphone">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 1a3 3 0 0 1 3 3v5a3 3 0 0 1-6 0V4a3 3 0 0 1 3-3z"/><path d="M19 10a7 7 0 0 1-14 0"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
      </button>
      <button class="lw-btn" aria-label="Camera">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M23 7l-7 5 7 5V7z"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>
      </button>
      <button class="lw-btn" aria-label="Volume">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
      </button>
      <button class="lw-btn" aria-label="Chat">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
      </button>
      <button class="lw-btn" aria-label="Screen">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
      </button>
      <button class="lw-btn" aria-label="People">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
      </button>
      <button class="lw-btn lw-btn--end" aria-label="End call">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.28-.28.7-.36 1.05-.2 1.1.4 2.3.6 3.55.6.55 0 1 .45 1 1V20c0 .55-.45 1-1 1C10.57 21 3 13.43 3 4c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.6 3.55.14.35.06.77-.2 1.05L6.6 10.8z" transform="rotate(135 12 12)"/></svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
.lw-root {
  background: #1b2030;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 20px 48px rgba(0,0,0,.35), 0 2px 8px rgba(0,0,0,.2);
  width: 100%;
  max-width: 520px;
  margin: 0 auto;
  font-family: var(--fb);
}

/* ── Header ── */
.lw-header {
  background: #252c3f;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  border-bottom: 1px solid rgba(255,255,255,.07);
}

.lw-brand {
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 12px;
  font-weight: 600;
  color: #fff;
}

.lw-status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #22c55e;
  animation: pulse-green 2s ease-in-out infinite;
  flex-shrink: 0;
}

.lw-timer {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: rgba(255,255,255,.75);
  font-variant-numeric: tabular-nums;
}

.lw-rec-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #ef4444;
  animation: pulse-red 1.5s ease-in-out infinite;
  flex-shrink: 0;
}

.lw-enc {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
  color: rgba(255,255,255,.5);
}

/* ── Body ── */
.lw-body {
  display: grid;
  grid-template-columns: 56% 44%;
  height: 200px;
}

/* Video panel */
.lw-video-panel {
  position: relative;
  overflow: hidden;
}

.lw-video-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  display: block;
}

.lw-live-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background: #ef4444;
  color: #fff;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: .06em;
  padding: 3px 8px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 5px;
}

.lw-live-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #fff;
  animation: pulse-red 1.2s ease-in-out infinite;
  flex-shrink: 0;
}

.lw-speaker-tag {
  position: absolute;
  bottom: 10px;
  left: 10px;
  background: rgba(0,0,0,.55);
  backdrop-filter: blur(4px);
  color: #fff;
  font-size: 11px;
  font-weight: 600;
  padding: 4px 9px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 5px;
}

.lw-mic-bars {
  display: flex;
  align-items: flex-end;
  gap: 2px;
  height: 12px;
  margin-left: 4px;
}

.lw-mic-bars i {
  display: block;
  width: 2.5px;
  border-radius: 2px;
  background: #22c55e;
  transform-origin: bottom;
}
.lw-mic-bars i:nth-child(1) { height: 6px;  animation: mic-bar 0.9s ease-in-out infinite 0s; }
.lw-mic-bars i:nth-child(2) { height: 12px; animation: mic-bar 0.9s ease-in-out infinite 0.15s; }
.lw-mic-bars i:nth-child(3) { height: 8px;  animation: mic-bar 0.9s ease-in-out infinite 0.3s; }
.lw-mic-bars i:nth-child(4) { height: 10px; animation: mic-bar 0.9s ease-in-out infinite 0.1s; }

/* Chat panel */
.lw-chat-panel {
  background: #1b2030;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 12px;
  border-left: 1px solid rgba(255,255,255,.06);
}

.lw-client-tag {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
  color: rgba(255,255,255,.5);
  align-self: flex-end;
}

.lw-bubbles {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-start;
}

.lw-bubble {
  font-size: 12px;
  font-weight: 600;
  padding: 7px 12px;
  border-radius: 12px 12px 12px 3px;
  opacity: 0;
  line-height: 1.3;
  max-width: 90%;
}

.lw-bubble--a {
  background: #fff;
  color: #1b2030;
  animation: bubble-show 9s ease-in-out infinite 0.8s;
}

.lw-bubble--b {
  background: #f0b450;
  color: #1b2030;
  animation: bubble-show 9s ease-in-out infinite 2.8s;
}

.lw-bubble--c {
  background: #2e8a93;
  color: #fff;
  animation: bubble-show 9s ease-in-out infinite 4.8s;
}

/* ── Controls ── */
.lw-controls {
  background: #252c3f;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 10px 12px;
  border-top: 1px solid rgba(255,255,255,.07);
}

.lw-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background: rgba(255,255,255,.1);
  color: rgba(255,255,255,.8);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: default;
  transition: background .15s;
}

.lw-btn:hover { background: rgba(255,255,255,.16); }

.lw-btn--end {
  background: #ef4444;
  color: #fff;
}
.lw-btn--end:hover { background: #dc2626; }

/* ── Keyframes ── */
@keyframes bubble-show {
  0%   { opacity: 0; transform: translateY(6px) scale(0.94); }
  10%  { opacity: 1; transform: translateY(0) scale(1); }
  65%  { opacity: 1; transform: translateY(0) scale(1); }
  75%  { opacity: 0; transform: translateY(-3px) scale(0.97); }
  100% { opacity: 0; }
}

@keyframes pulse-green {
  0%, 100% { box-shadow: 0 0 0 0 rgba(34,197,94,.5); }
  60%       { box-shadow: 0 0 0 4px rgba(34,197,94,0); }
}

@keyframes pulse-red {
  0%, 100% { opacity: 1; }
  50%       { opacity: .35; }
}

@keyframes mic-bar {
  0%, 100% { transform: scaleY(.35); }
  50%       { transform: scaleY(1); }
}

@media (prefers-reduced-motion: reduce) {
  .lw-bubble--a,
  .lw-bubble--b,
  .lw-bubble--c { animation: none; opacity: 1; }
  .lw-status-dot,
  .lw-rec-dot,
  .lw-live-dot  { animation: none; }
  .lw-mic-bars i { animation: none; transform: scaleY(0.7); }
}
</style>
