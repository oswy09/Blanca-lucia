<script setup>
const { siteUrl, whatsappUrl } = useSiteConfig()

useSeoMeta({
  title: 'Document editing in English — Fluent Future',
  description: 'Blanca reviews and improves your documents, emails and presentations in English so they sound natural and professional.',
})

useHead({
  link: [
    { rel: 'canonical', href: `${siteUrl}/servicios/edicion-textos` },
  ],
})
</script>

<template>
  <main>
    <section class="svc-detail wrap">
      <NuxtLink to="/servicios" class="back-link">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <path d="m15 18-6-6 6-6"/>
        </svg>
        All services
      </NuxtLink>

      <div class="svc-detail-icon" style="background:var(--amber-t1)">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--amber-sh)" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
          <path d="M4 19V5a2 2 0 0 1 2-2h11l3 3v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z"/><path d="M9 15h6M9 11h6"/>
        </svg>
      </div>

      <span class="eyebrow">Service</span>
      <h1 class="section-title">Document editing</h1>
      <p class="section-desc">
        I review and improve your documents, emails and presentations in English so they sound
        natural, clear and professional — in your voice, not a generic template.
      </p>

      <div class="coming-soon">
        <p>Full page coming soon. In the meantime:</p>
        <a :href="whatsappUrl" class="btn btn-primary" target="_blank" rel="noopener">
          Ask me on WhatsApp
        </a>
      </div>
    </section>
  </main>
</template>

<style scoped>
.svc-detail { padding-block: clamp(56px, 8vw, 96px); max-width: 720px; }
.back-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: var(--text2);
  text-decoration: none;
  margin-bottom: 36px;
  transition: color .15s;
}
.back-link:hover { color: var(--teal); }
.svc-detail-icon {
  width: 64px; height: 64px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}
.coming-soon {
  margin-top: 48px;
  padding: 28px;
  background: var(--amber-t1);
  border-radius: var(--rlg);
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.coming-soon p { font-size: 15px; color: var(--text2); }
</style>
