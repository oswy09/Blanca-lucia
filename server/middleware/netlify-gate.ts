export default defineEventHandler((event) => {
  const host = getHeader(event, 'host') || ''
  const path = getRequestURL(event).pathname
  if (host.includes('netlify.app') && path !== '/activating') {
    return sendRedirect(event, '/activating', 302)
  }
})
