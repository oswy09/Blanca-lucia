export default defineNuxtPlugin(async () => {
  const version = process.env.NODE_ENV === 'production' ? 'published' : 'draft'
  const api = useStoryblokApi()

  const sbGlobal = useState('sb-global', () => ({} as Record<string, string>))
  if (!Object.keys(sbGlobal.value).length) {
    try {
      const { data } = await api.get('cdn/stories/global', { version })
      sbGlobal.value = data?.story?.content || {}
    } catch {}
  }

  const sbHome = useState('sb-home', () => ({} as Record<string, string>))
  if (!Object.keys(sbHome.value).length) {
    try {
      const { data } = await api.get('cdn/stories/home', { version })
      sbHome.value = data?.story?.content || {}
    } catch {}
  }
})
