<script setup>
const route = useRoute()
const isOpen = ref(false)

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/contact', label: 'Contact me' },
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
        Fluent<span>Future</span>
      </NuxtLink>

      <ul class="nav-links" :class="{ open: isOpen }" role="list">
        <li v-for="link in navLinks" :key="link.to">
          <NuxtLink
            v-if="!link.anchor"
            :to="link.to"
            class="nav-link"
            :class="{ active: isActive(link) }"
          >{{ link.label }}</NuxtLink>
          <a v-else :href="link.to" class="nav-link">{{ link.label }}</a>
        </li>
        <li class="nav-mobile-cta">
          <NuxtLink to="/contact" class="btn btn-primary" style="width: 100%; text-align: center;">Get in touch</NuxtLink>
        </li>
      </ul>

      <NuxtLink to="/contact" class="btn btn-primary nav-cta-desktop">Get in touch</NuxtLink>

      <button
        class="nav-toggle"
        :class="{ open: isOpen }"
        :aria-expanded="isOpen.toString()"
        aria-label="Toggle menu"
        @click="isOpen = !isOpen"
      >
        <span class="hamburger-bar"></span>
        <span class="hamburger-bar"></span>
        <span class="hamburger-bar"></span>
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
  font-family: var(--fd);
  font-size: 21px;
  font-weight: 700;
  color: var(--text);
  letter-spacing: -0.02em;
}
.nav-logo span {
  color: var(--teal);
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
  transition: color .25s ease;
  position: relative;
  padding-block: 6px;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: var(--teal);
  transform: scaleX(0);
  transform-origin: bottom right;
  transition: transform 0.25s ease-out;
}

.nav-link:hover::after,
.nav-link.active::after {
  transform: scaleX(1);
  transform-origin: bottom left;
}

.nav-link:hover,
.nav-link.active {
  color: var(--teal);
}

.nav-toggle {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  width: 24px;
  height: 24px;
  position: relative;
  z-index: 101;
}

.hamburger-bar {
  display: block;
  width: 22px;
  height: 2px;
  background-color: var(--text);
  border-radius: 2px;
  position: absolute;
  left: 1px;
  transition: transform 0.3s cubic-bezier(0.165, 0.84, 0.44, 1), 
              opacity 0.3s ease, 
              background-color 0.3s ease;
}

.hamburger-bar:nth-child(1) { top: 6px; }
.hamburger-bar:nth-child(2) { top: 11px; }
.hamburger-bar:nth-child(3) { top: 16px; }

.nav-toggle.open .hamburger-bar:nth-child(1) {
  transform: translateY(5px) rotate(45deg);
  background-color: var(--teal);
}
.nav-toggle.open .hamburger-bar:nth-child(2) {
  opacity: 0;
}
.nav-toggle.open .hamburger-bar:nth-child(3) {
  transform: translateY(-5px) rotate(-45deg);
  background-color: var(--teal);
}

.nav-mobile-cta {
  display: none;
  width: 100%;
  max-width: 280px;
  margin-top: 16px;
  margin-inline: auto;
}

@media (max-width: 800px) {
  .nav-links {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 64px;
    left: 0;
    right: 0;
    bottom: 0;
    height: calc(100vh - 64px);
    background: rgba(255, 255, 255, 0.98);
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);
    padding: 40px var(--px) 80px;
    gap: 32px;
    opacity: 0;
    pointer-events: none;
    transform: translateY(-12px);
    transition: opacity 0.35s ease, transform 0.35s cubic-bezier(0.165, 0.84, 0.44, 1);
    z-index: 99;
  }
  
  .nav-links.open {
    opacity: 1;
    pointer-events: auto;
    transform: translateY(0);
  }
  
  .nav-links li {
    width: 100%;
    text-align: center;
  }

  .nav-links .nav-link {
    font-family: var(--fd);
    font-size: 24px;
    font-weight: 600;
    color: var(--text);
    padding-block: 8px;
    display: inline-block;
  }
  
  .nav-links .nav-link::after {
    height: 3px;
    bottom: -2px;
  }

  .nav-toggle {
    display: block;
  }
  
  .nav-cta-desktop {
    display: none;
  }
  
  .nav-mobile-cta {
    display: block;
  }
}
</style>
