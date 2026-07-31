<script setup>
const { siteUrl, whatsappUrl } = useSiteConfig()

useSeoMeta({
  title: 'Interview preparation in English — Fluent Future',
  description: 'Prepare for job interviews in English with Blanca Derby. Practise, build confidence and project who you truly are.',
})

useHead({
  link: [
    { rel: 'canonical', href: `${siteUrl}/services/interview-preparation` },
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

      <div class="svc-detail-icon" style="background:var(--teal-t1)">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="3"/><path d="M3 9h18M8 2v4M16 2v4"/>
        </svg>
      </div>

      <span class="eyebrow">Service</span>
      <h1 class="section-title">Interview preparation</h1>
      <p class="section-desc">
        We rehearse the most common questions and those specific to your sector.
        We work on how to present yourself, respond under pressure and project
        the confidence you already have in your own language.
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
  background: var(--teal-t1);
  border-radius: var(--rlg);
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.coming-soon p { font-size: 15px; color: var(--text2); }
</style>
