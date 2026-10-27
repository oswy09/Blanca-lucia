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
  if (!kv) return { users: [] }

  const users: Array<{ email: string }> =
    (await kv.get('admin:users', { type: 'json' })) || []

  return { users: users.map(u => ({ email: u.email })) }
})
