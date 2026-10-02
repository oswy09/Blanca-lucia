<template>
  <div class="gate-page">

    <div class="gate-card">

      <!-- Illustration -->
      <div class="gate-illo" aria-hidden="true">
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- Outer ring animated -->
          <circle cx="100" cy="100" r="88" stroke="#2e8a93" stroke-width="1.5" stroke-dasharray="8 6" opacity="0.35" class="spin-slow"/>
          <!-- Mid ring -->
          <circle cx="100" cy="100" r="68" stroke="#2e8a93" stroke-width="1.5" stroke-dasharray="4 8" opacity="0.2" class="spin-rev"/>
          <!-- Globe body -->
          <circle cx="100" cy="100" r="50" fill="#2e8a93" opacity="0.1" stroke="#2e8a93" stroke-width="2"/>
          <!-- Globe lines horizontal -->
          <ellipse cx="100" cy="100" rx="50" ry="20" stroke="#2e8a93" stroke-width="1.5" opacity="0.4"/>
          <line x1="50" y1="100" x2="150" y2="100" stroke="#2e8a93" stroke-width="1.5" opacity="0.4"/>
          <!-- Globe lines vertical -->
          <line x1="100" y1="50" x2="100" y2="150" stroke="#2e8a93" stroke-width="1.5" opacity="0.4"/>
          <!-- Check pulse dot -->
          <circle cx="100" cy="100" r="14" fill="#2e8a93" opacity="0.15" class="pulse"/>
          <circle cx="100" cy="100" r="8" fill="#2e8a93"/>
          <path d="M96 100 L99 103 L105 97" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <!-- Amber accent dot -->
          <circle cx="150" cy="60" r="6" fill="#f0b450"/>
          <circle cx="52" cy="142" r="4" fill="#f0b450" opacity="0.6"/>
        </svg>
      </div>

      <p class="gate-eyebrow">Domain activation in progress</p>
      <h1 class="gate-title">
        Your site is on its way to<br>
        <span class="gate-domain">fluentfuture.co.uk</span>
      </h1>
      <p class="gate-desc">
        The domain is propagating through the DNS network.<br>
        This usually completes within a few hours.
      </p>

      <div class="gate-progress">
        <div class="gate-progress-bar"></div>
      </div>

      <p class="gate-note">No action needed — check back shortly.</p>

    </div>

    <!-- Brand watermark -->
    <p class="gate-brand">Fluent Future &nbsp;·&nbsp; Personal Language Consultancy</p>
  </div>
</template>

<style scoped>
.gate-page {
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #f7fafa;
  padding: 32px 20px;
  font-family: var(--fb, system-ui, sans-serif);
}

.gate-card {
  background: #ffffff;
  border: 1px solid rgba(46,138,147,0.18);
  border-radius: 28px;
  padding: clamp(40px, 6vw, 64px) clamp(28px, 5vw, 56px);
  max-width: 520px;
  width: 100%;
  text-align: center;
  box-shadow: 0 12px 40px rgba(46,138,147,0.10);
}

/* Illustration */
.gate-illo {
  width: 160px;
  height: 160px;
  margin: 0 auto 32px;
}
.gate-illo svg { width: 100%; height: 100%; overflow: visible; }

.spin-slow  { animation: spinSlow 18s linear infinite; transform-origin: 100px 100px; }
.spin-rev   { animation: spinSlow 12s linear infinite reverse; transform-origin: 100px 100px; }
.pulse      { animation: pulse 2.4s ease-in-out infinite; }

@keyframes spinSlow {
  to { transform: rotate(360deg); }
}
@keyframes pulse {
  0%, 100% { opacity: 0.15; r: 14; }
  50%       { opacity: 0.32; r: 18; }
}

/* Text */
.gate-eyebrow {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: .12em;
  color: #2e8a93;
  margin-bottom: 12px;
}

.gate-title {
  font-family: var(--fd, Georgia, serif);
  font-size: clamp(22px, 3vw, 30px);
  font-weight: 700;
  color: #1a2e30;
  line-height: 1.25;
  margin-bottom: 16px;
}

.gate-domain {
  color: #2e8a93;
  font-style: normal;
}

.gate-desc {
  font-size: 15px;
  color: #5a7275;
  line-height: 1.7;
  margin-bottom: 32px;
}

/* Progress bar */
.gate-progress {
  height: 4px;
  background: rgba(46,138,147,0.12);
  border-radius: 999px;
  overflow: hidden;
  margin-bottom: 20px;
}

.gate-progress-bar {
  height: 100%;
  width: 60%;
  background: linear-gradient(90deg, #2e8a93, #56bfc8);
  border-radius: 999px;
  animation: progressPulse 3s ease-in-out infinite;
}

@keyframes progressPulse {
  0%   { width: 45%; opacity: 0.7; }
  50%  { width: 75%; opacity: 1; }
  100% { width: 45%; opacity: 0.7; }
}

.gate-note {
  font-size: 13px;
  color: #8aa6a8;
}

/* Brand */
.gate-brand {
  margin-top: 32px;
  font-size: 12px;
  color: #aac4c6;
  letter-spacing: .04em;
}
</style>
