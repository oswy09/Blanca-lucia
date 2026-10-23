import { verifyJWT } from '~/server/utils/jwt'

export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'admin_token')
  if (!token) throw createError({ statusCode: 401, statusMessage: 'Not authenticated' })

  const config = useRuntimeConfig(event)
  const jwtSecret = (event.context.cloudflare as any)?.env?.JWT_SECRET || config.jwtSecret

  const payload = await verifyJWT(token, jwtSecret)
  if (!payload) throw createError({ statusCode: 401, statusMessage: 'Invalid or expired session' })

  return { ok: true, email: payload.sub }
})
