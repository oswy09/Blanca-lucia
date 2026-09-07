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
  background: var(--n800);
  color: var(--n0);
  padding: clamp(48px, 7vw, 72px) var(--px);
}
.footer-inner {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 40px;
  align-items: end;
}
.footer-logo-img {
  height: 64px;
  width: auto;
  display: block;
  margin-bottom: 10px;
}
.footer-tag {
  font-size: 14px;
  color: var(--n300);
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
  color: var(--n300);
  text-decoration: none;
  transition: color .15s;
}
.footer-nav a:hover { color: var(--teal-t2); }
.footer-copy { font-size: 12px; color: var(--n0); text-align: right; }
.footer-credit { font-size: 11px; color: var(--n300); text-align: right; margin-top: 8px; }
.footer-credit-link { color: var(--n300); text-decoration: none; transition: color .15s; }
.footer-credit-link:hover { color: var(--teal-t2); }
@media (max-width: 600px) {
  .footer-inner { grid-template-columns: 1fr; }
  .footer-right { text-align: left; }
}
</style>
