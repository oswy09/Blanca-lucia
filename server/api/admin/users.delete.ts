import { verifyJWT } from '~/server/utils/jwt'

export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'admin_token')
  if (!token) throw createError({ statusCode: 401 })

  const config = useRuntimeConfig(event)
  const cfEnv = (event.context.cloudflare as any)?.env
  const jwtSecret = cfEnv?.JWT_SECRET || config.jwtSecret

  const payload = await verifyJWT(token, jwtSecret)
  if (!payload) throw createError({ statusCode: 401 })

  const kv = cfEnv?.CONTENT_KV
  if (!kv) throw createError({ statusCode: 503, statusMessage: 'Storage unavailable' })

  const { email } = await readBody(event)
  if (!email) throw createError({ statusCode: 400, statusMessage: 'Email required' })

  const users: Array<{ email: string }> =
    (await kv.get('admin:users', { type: 'json' })) || []

  await kv.put('admin:users', JSON.stringify(users.filter(u => u.email !== email)))
  return { ok: true }
})
