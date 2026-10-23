export default defineNuxtPlugin(async () => {
  try {
    const homeContent = await $fetch<Record<string, string>>('/api/content/home')
    useState('sb-home', () => homeContent)
  } catch {
    useState('sb-home', () => ({} as Record<string, string>))
  }
  useState('sb-global', () => ({} as Record<string, string>))
})
