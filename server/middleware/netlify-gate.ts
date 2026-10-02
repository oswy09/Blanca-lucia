export default defineEventHandler((event) => {
  const host = getHeader(event, 'host') || ''
  const path = getRequestURL(event).pathname
  const isGated = host.includes('netlify.app') || host.includes('fluentfuture.co.uk')
  if (isGated && path !== '/activating') {
    return sendRedirect(event, '/activating', 302)
  }
})
