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

  const page = getRouterParam(event, 'page')
  const body = await readBody(event)
  await kv.put(`page:${page}`, JSON.stringify(body))

  return { ok: true }
})
