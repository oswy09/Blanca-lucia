export default defineEventHandler(async () => {
  const token = process.env.STORYBLOK_DELIVERY_API_TOKEN
  if (!token) return { error: 'No token' }

  const base = `https://api.storyblok.com/v2/cdn/stories`
  const cv = Date.now()

  async function trySlug(slug: string, version: string) {
    const res = await fetch(`${base}/${slug}?version=${version}&token=${token}&cv=${cv}`)
    const json = await res.json()
    return { status: res.status, hasStory: !!json?.story, slug, version }
  }

  try {
    const results = await Promise.all([
      trySlug('professional-writing-editing', 'published'),
      trySlug('professional-writing-editing', 'draft'),
      trySlug('services/professional-writing-editing', 'published'),
      trySlug('services/professional-writing-editing', 'draft'),
    ])
    return { results }
  } catch (err: any) {
    return { error: err.message }
  }
})
