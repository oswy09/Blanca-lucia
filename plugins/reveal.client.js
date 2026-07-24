export default defineNuxtPlugin((nuxtApp) => {
  if (typeof IntersectionObserver === 'undefined') return

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.1, rootMargin: '0px 0px -32px 0px' }
  )

  const observe = () => {
    document.querySelectorAll('.reveal:not(.visible)').forEach((el) => observer.observe(el))
  }

  nuxtApp.hook('app:mounted', () => observe())
  nuxtApp.hook('page:finish', () => setTimeout(observe, 80))
})
