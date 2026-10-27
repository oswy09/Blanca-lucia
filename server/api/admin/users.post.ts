import { verifyJWT } from '~/server/utils/jwt'

async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(password)
  const buf = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('')
}

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

  const { email, password } = await readBody(event)
  if (!email || !password) throw createError({ statusCode: 400, statusMessage: 'Email and password required' })

  const passwordHash = await hashPassword(password)
  const users: Array<{ email: string; passwordHash: string }> =
    (await kv.get('admin:users', { type: 'json' })) || []

  const idx = users.findIndex(u => u.email === email)
  if (idx >= 0) {
    users[idx] = { email, passwordHash }
  } else {
    users.push({ email, passwordHash })
  }

  await kv.put('admin:users', JSON.stringify(users))
  return { ok: true }
})
