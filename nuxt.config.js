// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  // SSR activo — obligatorio para SEO. Nunca cambiar a SPA.
  ssr: true,

  css: ['~/assets/css/main.css'],

  app: {
    head: {
      titleTemplate: '%s',
      htmlAttrs: { lang: 'en-GB' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
        { property: 'og:site_name', content: 'Fluent Future' },
        { property: 'og:type', content: 'website' },
        { property: 'og:locale', content: 'en_GB' },
        { name: 'twitter:card', content: 'summary_large_image' }
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700&family=Karla:ital,wght@0,400;0,500;0,700;1,400&display=swap'
        }
      ]
    }
  },

  // ─── Storyblok ─────────────────────────────────────────────
  // Descomentar cuando Blanca tenga el token de Storyblok.
  // Instalar primero: npm install @storyblok/nuxt
  //
  // modules: ['@storyblok/nuxt'],
  // storyblok: {
  //   accessToken: process.env.STORYBLOK_TOKEN,
  //   apiOptions: { region: 'eu' }
  // },
  // ────────────────────────────────────────────────────────────

  future: {
    compatibilityVersion: 3,
  },

  compatibilityDate: '2024-11-01'
})
