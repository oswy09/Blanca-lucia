<script setup>
const route = useRoute()
const isOpen = ref(false)

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  {
    to: '/services',
    label: 'Services',
    children: [
      { to: '/services/professional-communication', label: 'Personal Consultancy', icon: 'chat', color: 'var(--coral)', bgColor: 'var(--coral-t1)' },
      { to: '/services/interview-preparation', label: 'Interview Preparation', icon: 'calendar', color: 'var(--teal)', bgColor: 'var(--teal-t1)' },
      { to: '/services/professional-writing-editing', label: 'Professional Writing & Editing', icon: 'doc', color: 'var(--amber-sh)', bgColor: 'var(--amber-t1)' },
    ]
  },
  { to: '/contact', label: 'Contact me' },
]

const isActive = (link) => {
  if (link.anchor) return false
  if (link.to === '/') return route.path === '/'
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
        <li v-for="link in navLinks" :key="link.to" :class="{ 'has-dropdown': link.children }">
          <template v-if="link.children">
            <div class="nav-link-wrapper">
              <NuxtLink
                :to="link.to"
                class="nav-link"
                :class="{ active: isActive(link) }"
              >
                {{ link.label }}
                <svg class="chevron-icon" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </NuxtLink>
            </div>
            
            <ul class="dropdown-menu" role="list">
              <li v-for="sub in link.children" :key="sub.to">
                <NuxtLink :to="sub.to" class="dropdown-item">
                  <div class="dropdown-icon-wrap" :style="{ backgroundColor: sub.bgColor, color: sub.color }">
                    <svg v-if="sub.icon === 'chat'" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                    </svg>
                    <svg v-else-if="sub.icon === 'calendar'" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="3"/><path d="M3 9h18M8 2v4M16 2v4"/>
                    </svg>
                    <svg v-else-if="sub.icon === 'doc'" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M4 19V5a2 2 0 0 1 2-2h11l3 3v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z"/><path d="M9 15h6M9 11h6"/>
                    </svg>
                  </div>
                  <span class="dropdown-item-title">{{ sub.label }}</span>
                </NuxtLink>
              </li>
            </ul>
          </template>
          <template v-else>
            <NuxtLink
              v-if="!link.anchor"
              :to="link.to"
              class="nav-link"
              :class="{ active: isActive(link) }"
            >{{ link.label }}</NuxtLink>
            <a v-else :href="link.to" class="nav-link">{{ link.label }}</a>
          </template>
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

/* ── Dropdown Menu Styling (Desktop) ── */
.has-dropdown {
  position: relative;
}

.nav-link-wrapper {
  display: flex;
  align-items: center;
}

.chevron-icon {
  margin-left: 5px;
  color: var(--text2);
  transition: transform 0.25s ease, color 0.25s ease;
}

.nav-link:hover .chevron-icon,
.nav-link.active .chevron-icon {
  color: var(--teal);
}

.has-dropdown:hover .chevron-icon {
  transform: rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%) translateY(10px);
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--rlg);
  box-shadow: var(--sh-lg);
  padding: 12px;
  min-width: 290px;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.25s ease, transform 0.25s cubic-bezier(0.165, 0.84, 0.44, 1);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 4px;
  list-style: none;
}

.has-dropdown:hover .dropdown-menu,
.has-dropdown:focus-within .dropdown-menu {
  opacity: 1;
  pointer-events: auto;
  transform: translateX(-50%) translateY(0);
}

/* Hover gap bridging */
.dropdown-menu::before {
  content: '';
  position: absolute;
  top: -16px;
  left: 0;
  right: 0;
  height: 16px;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  text-decoration: none;
  border-radius: var(--r);
  transition: background-color 0.2s ease, transform 0.15s ease;
  text-align: left;
}

.dropdown-item:hover {
  background-color: var(--n0);
  transform: translateX(2px);
}

.dropdown-icon-wrap {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: transform 0.2s ease;
}

.dropdown-item:hover .dropdown-icon-wrap {
  transform: scale(1.06);
}

.dropdown-item-title {
  font-family: var(--fb);
  font-size: 14px;
  font-weight: 600;
  color: var(--text);
  line-height: 1.2;
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

  /* Mobile Dropdown styles */
  .nav-link-wrapper {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  .chevron-icon {
    display: none !important;
  }

  .dropdown-menu {
    position: static;
    transform: none;
    box-shadow: none;
    border: none;
    background: rgba(46, 138, 147, 0.04);
    border-radius: var(--rlg);
    opacity: 1;
    pointer-events: auto;
    width: 100%;
    max-width: 320px;
    padding: 10px;
    margin-inline: auto;
    margin-top: 6px;
    gap: 4px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }

  .dropdown-item {
    justify-content: flex-start;
    width: 100%;
    padding: 8px 12px;
  }

  .dropdown-item:hover {
    background-color: rgba(46, 138, 147, 0.08);
    transform: none;
  }

  .dropdown-icon-wrap {
    width: 30px;
    height: 30px;
  }

  .dropdown-item-title {
    font-family: var(--fb);
    font-size: 15px;
    font-weight: 600;
    color: var(--text);
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
