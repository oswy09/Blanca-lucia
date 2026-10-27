export default defineNuxtPlugin(async () => {
  const event = useRequestEvent()
  const kv = (event?.context?.cloudflare as any)?.env?.CONTENT_KV

  const readKv = async (page: string): Promise<Record<string, string>> => {
    if (kv) {
      try { return (await kv.get(`page:${page}`, { type: 'json' })) || {} } catch {}
    }
    // Local dev: internal $fetch works because Node.js server has no KV restriction
    try { return await $fetch<Record<string, string>>(`/api/content/${page}`) } catch {}
    return {}
  }

  const pages = ['home', 'about', 'services-index', 'services-pc', 'services-ip', 'services-pwe', 'contact', 'global']
  const results = await Promise.all(pages.map(p => readKv(p)))

  pages.forEach((p, i) => {
    useState(`sb-${p}`, () => ({} as Record<string, string>)).value = results[i]
  })
})
