export default defineNuxtPlugin(async () => {
  const version = 'draft'
  const api = useStoryblokApi()

  const sbGlobal = useState('sb-global', () => ({} as Record<string, string>))
  try {
    const { data } = await api.get('cdn/stories/global', { version })
    sbGlobal.value = data?.story?.content || {}
  } catch {}

  const sbHome = useState('sb-home', () => ({} as Record<string, string>))
  try {
    const { data } = await api.get('cdn/stories/home', { version })
    sbHome.value = data?.story?.content || {}
  } catch {}
})
