<script setup>
const route = useRoute()
const isOpen = ref(false)

const navLinks = [
  { to: '/servicios', label: 'Services' },
  { to: '/sobre-mi', label: 'About' },
  { to: '/#testimonios', label: 'Testimonials', anchor: true },
  { to: '/precios', label: 'Pricing' },
  { to: '/contacto', label: 'Contact' },
]

const isActive = (link) => {
  if (link.anchor) return false
  return route.path === link.to || route.path.startsWith(link.to + '/')
}

watch(() => route.path, () => { isOpen.value = false })
</script>

<template>
  <nav class="nav" aria-label="Main navigation">
    <div class="wrap nav-inner">
      <NuxtLink to="/" class="nav-logo">
        <img src="/logo-fluent-future.png" alt="Fluent Future" class="nav-logo-img" />
      </NuxtLink>

      <ul class="nav-links" :class="{ open: isOpen }" role="list">
        <li v-for="link in navLinks" :key="link.to">
          <a
            v-if="link.anchor"
            :href="link.to"
            class="nav-link"
            @click="isOpen = false"
          >{{ link.label }}</a>
          <NuxtLink
            v-else
            :to="link.to"
            class="nav-link"
            :class="{ active: isActive(link) }"
            @click="isOpen = false"
          >{{ link.label }}</NuxtLink>
        </li>
      </ul>

      <NuxtLink to="/contacto" class="btn btn-primary nav-cta-desktop">Get in touch</NuxtLink>

      <button
        class="nav-toggle"
        :aria-expanded="isOpen.toString()"
        aria-label="Open menu"
        @click="isOpen = !isOpen"
      >
        <svg v-if="!isOpen" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
        </svg>
        <svg v-else width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
    </div>
  </nav>
</template>

<style scoped>
.nav {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(255,255,255,.94);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border);
}

.nav-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  gap: 24px;
}

.nav-logo {
  display: flex;
  align-items: center;
  text-decoration: none;
  flex-shrink: 0;
}
.nav-logo-img {
  height: 44px;
  width: auto;
  display: block;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 28px;
  list-style: none;
}
.nav-link {
  font-size: 14px;
  color: var(--text2);
  text-decoration: none;
  transition: color .15s;
}
.nav-link:hover,
.nav-link.active { color: var(--teal); }

.nav-toggle {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text);
  padding: 4px;
  line-height: 0;
}

@media (max-width: 800px) {
  .nav-links { display: none; }
  .nav-links.open {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    position: absolute;
    top: 64px;
    left: 0; right: 0;
    background: var(--surface);
    border-bottom: 1px solid var(--border);
    padding: 24px var(--px) 28px;
    gap: 20px;
    box-shadow: var(--sh-md);
  }
  .nav-links.open .nav-link { font-size: 16px; }
  .nav-toggle { display: block; }
  .nav-cta-desktop { display: none; }
}
</style>
