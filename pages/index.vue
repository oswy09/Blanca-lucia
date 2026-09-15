<script setup>
const { siteName, siteUrl, locale, contactEmail } = useSiteConfig()

// Storyblok bridge: real-time Visual Editor updates
const version = process.env.NODE_ENV === 'production' ? 'published' : 'draft'
const sbHome = useState('sb-home', () => ({}))

const { data: homeData } = await useAsyncData('home-story', () =>
  useStoryblokApi().get('cdn/stories/home', { version })
)

if (homeData.value?.data?.story?.content) {
  sbHome.value = homeData.value.data.story.content
}

onMounted(() => {
  const storyId = homeData.value?.data?.story?.id
  if (storyId) {
    useStoryblokBridge(storyId, (updatedStory) => {
      sbHome.value = updatedStory.content
    })
  }
})

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
