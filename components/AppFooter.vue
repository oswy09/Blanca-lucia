<script setup>
const sb = useStoryblokGlobal()
const footerTagline = computed(() => sb.value?.footer_tagline || 'Personal English language consultancy for Spanish-speaking professionals. Over 30 years helping people communicate as the professionals they truly are.')
</script>

<template>
  <footer class="footer">
    <div class="footer-inner wrap">
      <div>
        <img src="/logo-blanco.png" alt="Fluent Future" class="footer-logo-img" />
        <p class="footer-tag">{{ footerTagline }}</p>
        <ul class="footer-nav" role="list">
          <li><NuxtLink to="/">Home</NuxtLink></li>
          <li><NuxtLink to="/services">Services</NuxtLink></li>
          <li><NuxtLink to="/about">About</NuxtLink></li>
          <li><NuxtLink to="/contact">Contact</NuxtLink></li>
        </ul>
      </div>
      <div class="footer-right">
        <p class="footer-copy">© 2026 Fluent Future · Blanca Derby<br>fluentfuture.co.uk</p>
        <p class="footer-credit">Designed by <a href="https://oswalstudio.com/" target="_blank" rel="noopener" class="footer-credit-link">Oswal</a></p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: #13484e;
  color: #fff;
  padding: clamp(48px, 7vw, 72px) var(--px);
  border-top: 3px solid var(--amber);
  position: relative;
  overflow: hidden;
}

/* Detalle sutil: puntos decorativos en ámbar */
.footer::before {
  content: '';
  position: absolute;
  top: -60px; right: -60px;
  width: 220px; height: 220px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(240,180,80,.12) 0%, transparent 70%);
  pointer-events: none;
}

.footer-inner {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 40px;
  align-items: end;
  position: relative; z-index: 1;
}
.footer-logo-img {
  height: 64px;
  width: auto;
  display: block;
  margin-bottom: 10px;
}
.footer-tag {
  font-size: 14px;
  color: rgba(255,255,255,.65);
  line-height: 1.6;
  max-width: 380px;
  margin-bottom: 20px;
}
.footer-nav {
  display: flex;
  gap: 20px;
  list-style: none;
  flex-wrap: wrap;
}
.footer-nav a {
  font-size: 13px;
  color: rgba(255,255,255,.6);
  text-decoration: none;
  transition: color .15s;
}
.footer-nav a:hover { color: var(--amber); }
.footer-copy { font-size: 12px; color: rgba(255,255,255,.85); text-align: right; }
.footer-credit { font-size: 11px; color: rgba(255,255,255,.4); text-align: right; margin-top: 8px; }
.footer-credit-link { color: rgba(255,255,255,.4); text-decoration: none; transition: color .15s; }
.footer-credit-link:hover { color: var(--amber); }

/* Línea ámbar sutil bajo el logo */
.footer-logo-img {
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(240,180,80,.25);
  margin-bottom: 16px;
}

@media (max-width: 600px) {
  .footer-inner { grid-template-columns: 1fr; }
  .footer-right { text-align: left; }
}
</style>
