export default defineNuxtPlugin(async () => {
  const cached = useState('sb-global', () => ({} as Record<string, string>))
  if (Object.keys(cached.value).length) return
  try {
    const api = useStoryblokApi()
    const { data } = await api.get('cdn/stories/global', {
      version: process.env.NODE_ENV === 'production' ? 'published' : 'draft',
    })
    cached.value = data?.story?.content || {}
  } catch {}
})
