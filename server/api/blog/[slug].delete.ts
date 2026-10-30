import { verifyJWT } from '~/server/utils/jwt'

export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'admin_token')
  if (!token) throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })

  const config = useRuntimeConfig(event)
  const cfEnv = (event.context.cloudflare as any)?.env
  const jwtSecret = cfEnv?.JWT_SECRET || config.jwtSecret

  const payload = await verifyJWT(token, jwtSecret)
  if (!payload) throw createError({ statusCode: 401, statusMessage: 'Invalid or expired session' })

  const kv = cfEnv?.CONTENT_KV
  if (!kv) throw createError({ statusCode: 503, statusMessage: 'Storage unavailable' })

  const slug = getRouterParam(event, 'slug')
  await kv.delete(`blog:post:${slug}`)

  let index: any[] = (await kv.get('blog:index', { type: 'json' })) || []
  await kv.put('blog:index', JSON.stringify(index.filter((p: any) => p.slug !== slug)))

  return { ok: true }
})
