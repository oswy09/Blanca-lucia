<script setup>
const { siteUrl, whatsappUrl } = useSiteConfig()

useSeoMeta({
  title: 'Professional communication in English — Fluent Future',
  description: 'Improve your fluency and confidence speaking English in meetings, presentations and international working environments.',
})

useHead({
  link: [
    { rel: 'canonical', href: `${siteUrl}/services/professional-communication` },
  ],
})
</script>

<template>
  <main>
    <section class="svc-detail wrap">
      <NuxtLink to="/services" class="back-link">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <path d="m15 18-6-6 6-6"/>
        </svg>
        All services
      </NuxtLink>

      <div class="svc-detail-icon" style="background:var(--coral-t1)">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--coral)" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
        </svg>
      </div>

      <span class="eyebrow">Service</span>
      <h1 class="section-title">Professional communication</h1>
      <p class="section-desc">
        So you can express yourself with fluency and authority in meetings, presentations and
        international working environments. We work on your specific vocabulary, fluency and
        confidence when speaking.
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
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}
.coming-soon {
  margin-top: 48px;
  padding: 28px;
  background: var(--coral-t1);
  border-radius: var(--rlg);
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.coming-soon p { font-size: 15px; color: var(--text2); }
</style>
