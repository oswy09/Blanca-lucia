<template>
  <div class="av-root" aria-label="Blanca Derby — English language consultant">
    <div class="av-frame">
      <img src="/imagens/blanca.png" alt="Blanca Derby – English consultant" />
    </div>
  </div>
</template>

<style scoped>
.av-root {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

/* ── Retrato de Blanca ───────────────────────────────────── */
.av-frame {
  width: 340px;
  height: 340px;
  border-radius: 50%;
  overflow: hidden;
  background: #d1ece3;
  border: 4px solid #fff;
  box-shadow: 0 20px 56px rgba(16,185,129,.22), 0 4px 16px rgba(0,0,0,.10);
}
.av-frame img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  display: block;
}

/* ── Responsive ───────────────────────────────────────────── */
@media (max-width: 520px) {
  .av-frame { width: 220px; height: 220px; }
}
</style>
