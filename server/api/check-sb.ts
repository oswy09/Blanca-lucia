export default defineEventHandler(async () => {
  const config = useRuntimeConfig()
  const token = process.env.STORYBLOK_DELIVERY_API_TOKEN
  if (!token) return { error: 'No token', token: null }

  try {
    const url = `https://api.storyblok.com/v2/cdn/stories/professional-writing-editing?version=published&token=${token}&cv=${Date.now()}`
    const res = await fetch(url)
    const json = await res.json()
    return {
      status: res.status,
      hasStory: !!json?.story,
      contentKeys: Object.keys(json?.story?.content || {}),
      intro_title: json?.story?.content?.intro_title,
      hero_eyebrow: json?.story?.content?.hero_eyebrow,
    }
  } catch (err: any) {
    return { error: err.message }
  }
})
