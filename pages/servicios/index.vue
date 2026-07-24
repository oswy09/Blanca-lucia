<script setup>
const { siteUrl } = useSiteConfig()

useSeoMeta({
  title: 'Services — Fluent Future',
  description: 'Professional communication, interview preparation and document editing in English for Spanish-speaking professionals.',
})

useHead({
  link: [
    { rel: 'canonical', href: `${siteUrl}/servicios` },
  ],
})

useRevealOnScroll()
</script>

<template>
  <main>
    <section class="svc-page-hero wrap">
      <span class="eyebrow">Services</span>
      <h1 class="section-title">How can I help you?</h1>
      <p class="section-desc">
        Each service is designed for a specific moment in your career or your daily communication.
        No fixed modules, no groups.
      </p>
    </section>
    <ServicesSection />
    <CtaSection />
  </main>
</template>

<style scoped>
.svc-page-hero {
  padding-top: clamp(56px, 8vw, 96px);
  padding-bottom: 0;
}
</style>
