export default defineEventHandler(async () => {
  const token = process.env.STORYBLOK_DELIVERY_API_TOKEN
  if (!token) return { error: 'No token' }

  const cv = Date.now()

  try {
    const [resDraft, resPub] = await Promise.all([
      fetch(`https://api.storyblok.com/v2/cdn/stories?version=draft&token=${token}&cv=${cv}&per_page=100`),
      fetch(`https://api.storyblok.com/v2/cdn/stories?version=published&token=${token}&cv=${cv}&per_page=100`),
    ])
    const draft = await resDraft.json()
    const pub   = await resPub.json()

    return {
      allDraftSlugs:     (draft.stories  || []).map((s: any) => s.full_slug),
      allPublishedSlugs: (pub.stories    || []).map((s: any) => s.full_slug),
    }
  } catch (err: any) {
    return { error: err.message }
  }
})
