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

  const post = await readBody(event)
  if (!post?.slug) throw createError({ statusCode: 400, statusMessage: 'slug required' })

  const { body, ...meta } = post

  // Save full post
  await kv.put(`blog:post:${post.slug}`, JSON.stringify(post))

  // Update index
  let index: any[] = (await kv.get('blog:index', { type: 'json' })) || []
  const i = index.findIndex((p: any) => p.slug === post.slug)
  if (i >= 0) index[i] = meta
  else index.unshift(meta)
  await kv.put('blog:index', JSON.stringify(index))

  return { ok: true }
})
