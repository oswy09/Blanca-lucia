import { signJWT } from '~/server/utils/jwt'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email, password } = body ?? {}

  const config = useRuntimeConfig(event)
  const cfEnv = (event.context.cloudflare as any)?.env

  const adminEmail = cfEnv?.ADMIN_EMAIL || config.adminEmail
  const adminPassword = cfEnv?.ADMIN_PASSWORD || config.adminPassword
  const jwtSecret = cfEnv?.JWT_SECRET || config.jwtSecret

  if (!email || !password || email !== adminEmail || password !== adminPassword) {
    throw createError({ statusCode: 401, statusMessage: 'Invalid credentials' })
  }

  const token = await signJWT(
    { sub: email, exp: Math.floor(Date.now() / 1000) + 86400 * 7 },
    jwtSecret
  )

  setCookie(event, 'admin_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 86400 * 7,
    path: '/',
  })

  return { ok: true }
})
