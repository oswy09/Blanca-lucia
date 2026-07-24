<script setup>
const { siteName, siteUrl, locale, contactEmail } = useSiteConfig()

useSeoMeta({
  title: 'Fluent Future — Personal English language consultancy for Spanish-speaking professionals',
  description: 'Blanca Derby has over 30 years helping Spanish-speaking professionals express themselves with clarity and confidence in English. No courses. No rigid programmes.',
  ogTitle: 'Fluent Future — Communicate in English as the professional you truly are',
  ogDescription: 'Personal English language consultancy for Spanish-speaking professionals with working English.',
  ogUrl: siteUrl,
  ogLocale: locale,
  twitterTitle: 'Fluent Future — Communicate in English as the professional you truly are',
  twitterDescription: 'Personal English language consultancy for Spanish-speaking professionals with working English.',
})

useHead({
  link: [
    { rel: 'canonical', href: siteUrl },
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'ProfessionalService',
        name: siteName,
        url: siteUrl,
        email: contactEmail,
        description: 'Personal English language consultancy for Spanish-speaking professionals.',
        areaServed: 'United Kingdom',
        availableLanguage: ['English', 'Spanish'],
      }),
    },
  ],
})

useRevealOnScroll()
</script>

<template>
  <main>
    <HomeHero />
    <ProofStrip />
    <DiffSection />
    <CoachingSession />
    <TestimonialsSection />
    <WhoIsForTimeline />
    <ServicesSection />
    <HowSection />
    <PricingSection />
    <CtaSection />
  </main>
</template>
