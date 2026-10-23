export default defineEventHandler(async (event) => {
  const page = getRouterParam(event, 'page')
  const kv = (event.context.cloudflare as any)?.env?.CONTENT_KV

  if (!kv) return {}

  try {
    return (await kv.get(`page:${page}`, { type: 'json' })) || {}
  } catch {
    return {}
  }
})
