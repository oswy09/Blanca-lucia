<script setup>
const { siteUrl } = useSiteConfig()

useSeoMeta({
  title: 'About — Blanca Derby · Fluent Future',
  description: 'Over 30 years helping Spanish-speaking professionals communicate with clarity and confidence in English.',
})

useHead({
  link: [
    { rel: 'canonical', href: `${siteUrl}/sobre-mi` },
  ],
})
</script>

<template>
  <main>
    <section class="page-hero wrap">
      <span class="eyebrow">About</span>
      <h1 class="section-title">Hello, I'm Blanca Derby</h1>
      <p class="section-desc">
        I have spent over 30 years helping Spanish-speaking professionals express themselves
        with clarity and confidence in English. This page is coming soon.
      </p>
      <NuxtLink to="/contacto" class="btn btn-primary" style="margin-top:32px;">Get in touch</NuxtLink>
    </section>
  </main>
</template>

<style scoped>
.page-hero {
  padding-block: clamp(72px, 10vw, 120px);
}
</style>
