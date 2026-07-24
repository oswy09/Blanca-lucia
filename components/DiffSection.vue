<script setup>
</script>

<template>
  <section class="diff" id="sobre-mi">
    <div class="wrap diff-grid">

      <!-- Left column -->
      <div class="diff-left">
        <span class="eyebrow reveal">A Personal Approach</span>
        <p class="diff-tagline reveal" style="transition-delay:80ms">A different approach to language learning</p>
        <h2 class="diff-statement reveal" style="transition-delay:160ms">
          Not a course.<br>
          Not a programme.
        </h2>
        <p class="diff-sub reveal" style="transition-delay:240ms">A personal consultancy designed around you.</p>
      </div>

      <!-- Right column -->
      <div class="diff-right">
        <article class="diff-panel reveal" style="transition-delay:80ms">
          <p class="diff-guidance-label">My guidance helps you:</p>
          <ul class="check-list diff-checklist">
            <li>Communicate with clarity and confidence in professional and everyday settings</li>
            <li>Refine your communication style with precision</li>
            <li>Resolve long-standing challenges through focused guidance</li>
          </ul>
          <NuxtLink to="/servicios" class="btn diff-cta">Explore services</NuxtLink>
        </article>

        <p class="diff-note reveal" style="transition-delay:200ms">
          Every consultation is shaped around your individual needs.
          There are no rigid structures here.
        </p>
      </div>

    </div>
  </section>
</template>

<style scoped>
.diff {
  background:
    radial-gradient(520px 260px at 0% 0%, rgba(217,96,58,.09), transparent 60%),
    radial-gradient(520px 260px at 100% 100%, rgba(46,138,147,.10), transparent 60%),
    var(--surface);
}

.diff-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(40px, 6vw, 88px);
  align-items: start;
  padding-top: var(--spy);
  padding-bottom: clamp(30px, 5vw, 50px);
}

/* Left column */
.diff-tagline {
  font-size: 18px;
  font-weight: 600;
  color: var(--text2);
  margin-top: 6px;
  margin-bottom: 16px;
  line-height: 1.4;
}

.diff-lead {
  font-size: 17px;
  font-weight: 700;
  color: var(--teal-sh);
  margin-top: 12px;
  margin-bottom: 20px;
}

.diff-statement {
  font-family: var(--fd);
  font-size: clamp(28px, 3.4vw, 44px);
  font-weight: 700;
  line-height: 1.1;
  color: var(--text);
  margin-top: 12px;
  margin-bottom: 28px;
}
.diff-sub {
  font-family: var(--fd);
  font-size: clamp(17px, 1.8vw, 23px);
  font-weight: 500;
  color: var(--teal-sh);
  font-style: italic;
  margin-top: 10px;
  line-height: 1.35;
}

@media (max-width: 800px) {
  .diff-grid {
    grid-template-columns: 1fr;
  }
}

/* Right column */
.diff-guidance-label {
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: .09em;
  color: rgba(255,255,255,.72);
  margin-bottom: 18px;
}

.diff-panel {
  position: relative;
  background: linear-gradient(155deg, rgba(19,72,78,.96) 0%, rgba(46,138,147,.93) 62%, rgba(93,179,188,.9) 100%);
  border-radius: 24px;
  padding: clamp(24px, 3.2vw, 34px);
  color: #fff;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(30,110,118,.28);
}

.diff-panel::after {
  content: '';
  position: absolute;
  width: 220px;
  aspect-ratio: 1;
  right: -90px;
  top: -90px;
  border-radius: 999px;
  background: rgba(255,255,255,.15);
  pointer-events: none;
}

.diff-checklist { position: relative; z-index: 1; }
.diff-checklist :deep(li) { color: rgba(255,255,255,.96); }
.diff-checklist :deep(li::before) {
  background:
    rgba(255,255,255,.16)
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2.8' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 6 9 17l-5-5'/%3E%3C/svg%3E")
    center / 15px no-repeat;
  box-shadow: 0 1px 8px rgba(255,255,255,.2);
}

.diff-cta {
  margin-top: 28px;
  background: #fff;
  color: var(--teal-sh);
  border: none;
  position: relative;
  z-index: 1;
}
.diff-cta:hover { color: var(--teal); }

.diff-note {
  margin-top: 18px;
  font-size: 15px;
  color: var(--text2);
  line-height: 1.7;
  padding-left: 16px;
  border-left: 3px solid var(--teal-t2);
  font-style: italic;
}
</style>
