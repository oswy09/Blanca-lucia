export default defineNuxtPlugin(() => {
  // Storyblok API calls disabled — static fallback content in use.
  // Re-enable when Storyblok plan is active.
  useState('sb-global', () => ({} as Record<string, string>))
  useState('sb-home', () => ({} as Record<string, string>))
})
