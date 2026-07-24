<script setup>
const { siteUrl, contactEmail, whatsappUrl } = useSiteConfig()

useSeoMeta({
  title: 'Contact — Fluent Future',
  description: 'Message Blanca Derby on WhatsApp or by email. No lengthy forms or immediate commitments.',
})

useHead({
  link: [
    { rel: 'canonical', href: `${siteUrl}/contacto` },
  ],
})
</script>

<template>
  <main>
    <CtaSection />

    <section class="contact-extra wrap">
      <h2 class="section-title">Other ways to get in touch</h2>
      <p class="section-desc">I respond within 24–48 hours on working days.</p>
      <div class="contact-info">
        <a :href="`mailto:${contactEmail}`" class="contact-item">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
            <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 7 10-7"/>
          </svg>
          {{ contactEmail }}
        </a>
        <a :href="whatsappUrl" class="contact-item" target="_blank" rel="noopener">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            <path d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.37 5.07L2 22l5.08-1.34A9.93 9.93 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.66 0-3.21-.46-4.54-1.26l-.32-.2-3.02.79.82-2.95-.21-.34A7.96 7.96 0 0 1 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8z"/>
          </svg>
          WhatsApp
        </a>
      </div>
    </section>
  </main>
</template>

<style scoped>
.contact-extra {
  padding-block: clamp(56px, 8vw, 96px);
}
.contact-info {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 32px;
}
.contact-item {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  font-size: 16px;
  color: var(--teal);
  text-decoration: none;
  font-weight: 500;
}
.contact-item:hover { color: var(--teal-sh); }
</style>
