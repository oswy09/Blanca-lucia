export default defineNuxtRouteMiddleware(async (to) => {
  if (!to.path.startsWith('/admin') || to.path === '/admin' || to.path === '/admin/') return

  // Forward cookies in SSR so direct URL access works with a valid session
  const headers = import.meta.server ? useRequestHeaders(['cookie']) : {}
  try {
    await $fetch('/api/admin/verify', { headers })
  } catch {
    return navigateTo('/admin')
  }
})
