export function useRevealOnScroll(selector = '.reveal', threshold = 0.04) {
  onMounted(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          io.unobserve(entry.target)
        }
      })
    }, { threshold })

    const observeElements = () => {
      document.querySelectorAll(selector).forEach((el) => io.observe(el))
    }

    observeElements()

    const intervals = [100, 300, 600, 1000, 2000]
    const timerIds = intervals.map((delay) => setTimeout(observeElements, delay))

    onBeforeUnmount(() => {
      io.disconnect()
      timerIds.forEach((id) => clearTimeout(id))
    })
  })
}