export default defineNuxtRouteMiddleware(async (to) => {
  if (!to.path.startsWith('/admin') || to.path === '/admin' || to.path === '/admin/') return

  try {
    await $fetch('/api/admin/verify')
  } catch {
    return navigateTo('/admin')
  }
})
