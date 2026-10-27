import { signJWT } from '~/server/utils/jwt'

async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(password)
  const buf = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('')
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email, password } = body ?? {}

  const config = useRuntimeConfig(event)
  const cfEnv = (event.context.cloudflare as any)?.env

  const adminEmail    = cfEnv?.ADMIN_EMAIL     || config.adminEmail
  const adminPassword = cfEnv?.ADMIN_PASSWORD  || config.adminPassword
  const adminEmail2   = cfEnv?.ADMIN_EMAIL_2   || config.adminEmail2
  const adminPassword2 = cfEnv?.ADMIN_PASSWORD_2 || config.adminPassword2
  const jwtSecret     = cfEnv?.JWT_SECRET      || config.jwtSecret

  if (!email || !password) throw createError({ statusCode: 401, statusMessage: 'Invalid credentials' })

  let authenticated = false

  if (email === adminEmail && password === adminPassword) authenticated = true
  if (!authenticated && adminEmail2 && email === adminEmail2 && password === adminPassword2) authenticated = true

  if (!authenticated) {
    const kv = cfEnv?.CONTENT_KV
    if (kv) {
      const users: Array<{ email: string; passwordHash: string }> =
        (await kv.get('admin:users', { type: 'json' })) || []
      const passwordHash = await hashPassword(password)
      if (users.some(u => u.email === email && u.passwordHash === passwordHash)) {
        authenticated = true
      }
    }
  }

  if (!authenticated) throw createError({ statusCode: 401, statusMessage: 'Invalid credentials' })

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
