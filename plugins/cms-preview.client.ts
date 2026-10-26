// Listens for postMessage from the admin panel and updates reactive state
// so the iframe preview reflects changes in real-time (no API/KV calls)
export default defineNuxtPlugin(() => {
  window.addEventListener('message', (event) => {
    if (event.origin !== window.location.origin) return
    if (event.data?.type !== 'CMS_PREVIEW') return

    const { page, content } = event.data
    if (page === 'home') {
      useState('sb-home').value = content
    } else if (page === 'about') {
      useState('sb-about').value = content
    }
  })
})
