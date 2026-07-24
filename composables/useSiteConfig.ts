const SITE_URL = 'https://fluentfuture.co.uk'
const SITE_NAME = 'Fluent Future'
const WHATSAPP_NUMBER = '447000000000'
const CONTACT_EMAIL = 'blanca@fluentfuture.co.uk'

export function useSiteConfig() {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}`

  return {
    siteName: SITE_NAME,
    siteUrl: SITE_URL,
    locale: 'en_GB',
    language: 'en-GB',
    whatsappNumber: WHATSAPP_NUMBER,
    whatsappUrl,
    contactEmail: CONTACT_EMAIL,
  }
}