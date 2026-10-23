<script setup>
const route = useRoute()
const router = useRouter()

async function logout() {
  await $fetch('/api/admin/logout', { method: 'POST' })
  router.push('/admin')
}

const navLinks = [
  { to: '/admin/home', label: 'Home', icon: 'home' },
  { to: '/admin/about', label: 'About', icon: 'user' },
]
</script>

<template>
  <div class="adm-shell">
    <aside class="adm-sidebar">
      <div class="adm-logo">
        <img src="/logo-blue.png" alt="Fluent Future" />
        <span class="adm-badge">CMS</span>
      </div>

      <nav class="adm-nav">
        <p class="adm-nav-label">PAGES</p>
        <NuxtLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="adm-nav-link"
          :class="{ active: route.path === link.to }"
        >
          <svg v-if="link.icon === 'home'" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
          <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
          </svg>
          {{ link.label }}
        </NuxtLink>
      </nav>

      <button class="adm-logout-btn" @click="logout">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
        </svg>
        Sign out
      </button>
    </aside>

    <main class="adm-main">
      <slot />
    </main>
  </div>
</template>

<style>
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

.adm-shell {
  display: flex;
  height: 100vh;
  background: #f0f2f5;
  font-family: 'Karla', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

.adm-sidebar {
  width: 220px;
  flex-shrink: 0;
  background: #1a2035;
  display: flex;
  flex-direction: column;
  padding: 24px 0;
  gap: 8px;
  position: fixed;
  top: 0; left: 0; bottom: 0;
  z-index: 10;
}

.adm-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 20px 20px;
  border-bottom: 1px solid rgba(255,255,255,.08);
  margin-bottom: 8px;
}
.adm-logo img {
  height: 36px;
  width: auto;
  filter: brightness(0) invert(1);
  opacity: .9;
}
.adm-badge {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: .08em;
  background: #2e8a93;
  color: #fff;
  padding: 3px 7px;
  border-radius: 6px;
  flex-shrink: 0;
}

.adm-nav { flex: 1; padding: 0 12px; display: flex; flex-direction: column; gap: 4px; }
.adm-nav-label {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: .12em;
  color: rgba(255,255,255,.35);
  padding: 0 8px;
  margin-bottom: 8px;
  margin-top: 4px;
}
.adm-nav-link {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 12px;
  border-radius: 8px;
  color: rgba(255,255,255,.6);
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: background .15s, color .15s;
}
.adm-nav-link:hover { background: rgba(255,255,255,.06); color: rgba(255,255,255,.9); }
.adm-nav-link.active { background: #2e8a93; color: #fff; }
.adm-nav-link svg { opacity: .8; flex-shrink: 0; }
.adm-nav-link.active svg { opacity: 1; }

.adm-logout-btn {
  margin: 0 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 9px 12px;
  border: none;
  background: none;
  border-radius: 8px;
  color: rgba(255,255,255,.4);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background .15s, color .15s;
  width: calc(100% - 24px);
  text-align: left;
}
.adm-logout-btn:hover { background: rgba(255,255,255,.06); color: rgba(255,255,255,.7); }

.adm-main {
  margin-left: 220px;
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
</style>
