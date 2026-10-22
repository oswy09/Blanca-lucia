<script setup>
const { siteName, siteUrl, locale, contactEmail } = useSiteConfig()

const sbHome = useState('sb-home', () => ({}))

useSeoMeta({
  title: 'Fluent Future — Personal English Language Consultancy for Spanish-Speaking Adults',
  description: 'Personalised Language Consultancy for Native Spanish-Speaking Adults who want to communicate in English with confidence, ease and greater naturalness.',
  ogType: 'website',
  ogSiteName: 'Fluent Future',
  ogTitle: 'Fluent Future — Communicate in English with confidence, ease and greater naturalness',
  ogDescription: 'Personalised Language Consultancy for Native Spanish-Speaking Adults who want to communicate in English with confidence, ease and greater naturalness.',
  ogUrl: siteUrl,
  ogLocale: locale,
  ogImage: `${siteUrl}/imagens/blanca.png`,
  twitterCard: 'summary_large_image',
  twitterTitle: 'Fluent Future — Communicate in English with confidence, ease and greater naturalness',
  twitterDescription: 'Personalised Language Consultancy for Native Spanish-Speaking Adults who want to communicate in English with confidence, ease and greater naturalness.',
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
