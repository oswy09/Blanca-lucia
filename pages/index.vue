<script setup>
const { siteName, siteUrl, locale, contactEmail } = useSiteConfig()

const route = useRoute()
const isEditor = !!route.query._storyblok
const version = isEditor || process.env.NODE_ENV !== 'production' ? 'draft' : 'published'
const sbHome = useState('sb-home', () => ({}))
const story = ref(null)

const { data: homeData } = await useAsyncData('home-story', () =>
  useStoryblokApi().get('cdn/stories/home', { version })
)

if (homeData.value?.data?.story) {
  story.value = homeData.value.data.story
  sbHome.value = homeData.value.data.story.content || {}
}

onMounted(() => {
  if (story.value?.id) {
    useStoryblokBridge(story.value.id, (updatedStory) => {
      story.value = updatedStory
      sbHome.value = updatedStory.content || {}
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
    <template v-if="story?.content?.sections?.length">
      <StoryblokComponent
        v-for="blok in story.content.sections"
        :key="blok._uid"
        :blok="blok"
      />
    </template>
    <template v-else>
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
    </template>
  </main>
</template>
