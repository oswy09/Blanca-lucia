export default defineNuxtPlugin(() => {
  window.addEventListener('message', (event) => {
    if (event.origin !== window.location.origin) return
    if (event.data?.type !== 'CMS_PREVIEW') return

    const { page, content } = event.data
    if (page === 'home') {
      useState('sb-home').value = content
    } else if (page === 'about') {
      useState('sb-about').value = content
    } else if (page === 'services-index') {
      useState('sb-services-index').value = content
    } else if (page === 'services-pc') {
      useState('sb-services-pc').value = content
    } else if (page === 'services-ip') {
      useState('sb-services-ip').value = content
    } else if (page === 'services-pwe') {
      useState('sb-services-pwe').value = content
    } else if (page === 'contact') {
      useState('sb-contact').value = content
    } else if (page === 'global') {
      useState('sb-global').value = content
    }
  })
})
