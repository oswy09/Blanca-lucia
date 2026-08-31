# Fluent Future — Ficha de Proyecto

**Cliente:** Blanca Derby  
**Dominio:** fluentfuture.co.uk  
**Email:** blanca@fluentfuture.co.uk  
**WhatsApp:** 447000000000 ← PLACEHOLDER, reemplazar con número real  
**Estado:** En desarrollo — Agosto 2026

---

## Stack

| Capa | Tecnología |
|---|---|
| Framework | Nuxt 3 (Vue 3, SSR activo — no cambiar a SPA) |
| CSS | Vanilla CSS con custom properties (sin UI framework) |
| Animaciones | GSAP 3.15 + CSS @keyframes |
| Fuentes | Google Fonts: Poppins (headings) + Karla (body) |
| Gestor de paquetes | npm |

---

## Herramientas Externas

| Herramienta | Para qué | Estado |
|---|---|---|
| **Netlify** | Hosting + auto-deploy | ✓ Activo |
| **GitHub** oswy09/Blanca-lucia | Repositorio del código | ✓ Activo |
| **WhatsApp** wa.me | CTA principal en todas las páginas | ✓ Activo (número pendiente) |
| **Storyblok** | CMS para que Blanca edite el contenido sola | ⚠ Preparado, no conectado |
| **Web3Forms** | Backend del formulario de contacto | ✗ No implementado |
| **Google Analytics 4** | Métricas de visitas | ✗ No conectado |
| **Google Search Console** | Indexación en Google | ✗ No conectado |

---

## Cómo se actualiza el sitio

### Cambio de código o diseño
```
1. Editar el .vue correspondiente en pages/ o components/
2. git add -A
3. git commit -m "descripción del cambio"
4. git push origin main
→ Netlify despliega automáticamente en ~1-2 minutos
→ fluentfuture.co.uk queda actualizado
```

### Cambiar URL, WhatsApp o email
→ Editar `composables/useSiteConfig.ts` (un solo archivo, afecta todo el sitio)

### Cambiar colores o tipografía
→ Editar `assets/css/main.css` — los design tokens están al inicio del archivo

### Agregar una nueva página
→ Crear `pages/nombre-de-pagina.vue` → Nuxt crea la ruta /nombre-de-pagina automáticamente

### Correr en local
```
npm install
npm run dev    → http://localhost:3000
```

---

## Repositorio & Hosting

- **Repo:** github.com/oswy09/Blanca-lucia
- **Rama:** `main` (única — todo push va directo a producción)
- **Hosting:** Netlify → app.netlify.com → buscar "Blanca-lucia"
- **DNS:** fluentfuture.co.uk apunta a Netlify
- **Rollback:** Netlify guarda historial de deploys — se puede revertir desde el panel

---

## Archivos clave

| Archivo | Qué hace |
|---|---|
| `composables/useSiteConfig.ts` | URL, WhatsApp, email — configuración global del sitio |
| `assets/css/main.css` | Design tokens y estilos base |
| `nuxt.config.js` | Configuración de Nuxt: SSR, meta tags, fuentes |
| `layouts/default.vue` | Layout base: Nav + slot + Footer + botón WhatsApp |
| `pages/` | Todas las páginas (cada archivo = una ruta) |
| `components/` | Componentes reutilizables |
| `.env` / `.env.example` | Variables de entorno (tokens API) — nunca committear .env |

---

## Pendientes antes de lanzar

- [ ] **CRÍTICO** — El formulario de contacto NO envía datos. Integrar Web3Forms o Netlify Forms en `pages/contact.vue`
- [ ] **CRÍTICO** — Reemplazar número WhatsApp placeholder (`447000000000`) en `composables/useSiteConfig.ts`
- [ ] Confirmar precios con Blanca: £25 / 30 min · £60 / 60 min
- [ ] Conectar Storyblok si Blanca necesita editar el contenido sola (`STORYBLOK_TOKEN` en Netlify)
- [ ] Configurar Google Analytics 4 + Search Console
- [ ] Crear rama `develop` para probar cambios antes de publicar en producción
