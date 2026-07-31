<script setup>
const { siteUrl } = useSiteConfig()

useSeoMeta({
  title: 'Pricing — Fluent Future',
  description: 'Simple and transparent rates for personal English language consultancy. £25 / 30 min · £60 / 60 min.',
})

useHead({
  link: [
    { rel: 'canonical', href: `${siteUrl}/pricing` },
  ],
})

useRevealOnScroll()
</script>

<template>
  <main>
    <PricingSection />
    <CtaSection />
  </main>
</template>
