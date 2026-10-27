const SITE_URL = 'https://fluentfuture.co.uk'
const SITE_NAME = 'Fluent Future'
const WHATSAPP_FALLBACK = '447000000000'
const EMAIL_FALLBACK = 'blanca@fluentfuture.co.uk'

export function useSiteConfig() {
  const sbGlobal = useState<Record<string, string>>('sb-global', () => ({}))
  const whatsappNumber = sbGlobal.value?.whatsapp_number || WHATSAPP_FALLBACK
  const whatsappUrl    = `https://wa.me/${whatsappNumber}`
  const contactEmail   = sbGlobal.value?.contact_email || EMAIL_FALLBACK

  return {
    siteName: SITE_NAME,
    siteUrl: SITE_URL,
    locale: 'en_GB',
    language: 'en-GB',
    whatsappNumber,
    whatsappUrl,
    contactEmail,
  }
}
