<template>
  <footer class="footer">
    <div class="footer-inner wrap">
      <div>
        <p class="footer-logo">Fluent <span>Future</span></p>
        <p class="footer-tag">
          Personal English language consultancy for Spanish-speaking professionals.
          Over 30 years helping people communicate as the professionals they truly are.
        </p>
        <ul class="footer-nav" role="list">
          <li><NuxtLink to="/">Home</NuxtLink></li>
          <li><NuxtLink to="/services">Services</NuxtLink></li>
          <li><NuxtLink to="/about">About</NuxtLink></li>
          <li><NuxtLink to="/contact">Contact</NuxtLink></li>
        </ul>
      </div>
      <div class="footer-right">
        <p class="footer-copy">© 2026 Fluent Future · Blanca Derby<br>fluentfuture.co.uk</p>
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
.footer-logo {
  font-family: var(--fd);
  font-size: 19px;
  font-weight: 700;
  margin-bottom: 10px;
}
.footer-logo span { color: var(--teal-t2); }
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
@media (max-width: 600px) {
  .footer-inner { grid-template-columns: 1fr; }
  .footer-right { text-align: left; }
}
</style>
