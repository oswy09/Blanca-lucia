<script setup>
definePageMeta({ layout: false })

const router = useRouter()
const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

onMounted(async () => {
  try {
    await $fetch('/api/admin/verify')
    router.replace('/admin/home')
  } catch {}
})

async function login() {
  error.value = ''
  loading.value = true
  try {
    await $fetch('/api/admin/login', {
      method: 'POST',
      body: { email: email.value, password: password.value },
    })
    router.push('/admin/home')
  } catch {
    error.value = 'Email o contraseña incorrectos'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="login-shell">
    <div class="login-card">
      <div class="login-logo">
        <img src="/logo-blue.png" alt="Fluent Future" />
      </div>
      <h1 class="login-title">Content Manager</h1>
      <p class="login-sub">Inicia sesión para editar el contenido del sitio</p>

      <form class="login-form" @submit.prevent="login">
        <div class="login-field">
          <label>Email</label>
          <input v-model="email" type="email" placeholder="tu@email.com" required autocomplete="email" />
        </div>
        <div class="login-field">
          <label>Contraseña</label>
          <input v-model="password" type="password" placeholder="••••••••" required autocomplete="current-password" />
        </div>
        <p v-if="error" class="login-error">{{ error }}</p>
        <button type="submit" class="login-btn" :disabled="loading">
          <span v-if="loading">Entrando…</span>
          <span v-else>Entrar al CMS</span>
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.login-shell {
  min-height: 100vh;
  background: linear-gradient(135deg, #1a2035 0%, #13484e 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  font-family: 'Karla', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}
.login-card {
  background: #fff;
  border-radius: 20px;
  padding: 40px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 24px 64px rgba(0,0,0,.25);
}
.login-logo {
  display: flex;
  justify-content: center;
  margin-bottom: 24px;
}
.login-logo img { height: 48px; width: auto; }
.login-title {
  font-family: 'Poppins', sans-serif;
  font-size: 22px;
  font-weight: 700;
  color: #1a2035;
  text-align: center;
  margin-bottom: 6px;
}
.login-sub {
  font-size: 14px;
  color: #6b7280;
  text-align: center;
  margin-bottom: 32px;
}
.login-form { display: flex; flex-direction: column; gap: 16px; }
.login-field { display: flex; flex-direction: column; gap: 6px; }
.login-field label { font-size: 13px; font-weight: 600; color: #374151; }
.login-field input {
  border: 1.5px solid #e2e8f0;
  border-radius: 10px;
  padding: 10px 14px;
  font-size: 15px;
  color: #1a1f2e;
  background: #f8fafc;
  transition: border-color .2s;
  outline: none;
  font-family: inherit;
}
.login-field input:focus { border-color: #2e8a93; background: #fff; }
.login-error {
  font-size: 13px;
  color: #dc2626;
  background: #fef2f2;
  border-radius: 8px;
  padding: 8px 12px;
}
.login-btn {
  background: #2e8a93;
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 12px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: background .2s;
  font-family: inherit;
  margin-top: 4px;
}
.login-btn:hover:not(:disabled) { background: #13484e; }
.login-btn:disabled { opacity: .6; cursor: not-allowed; }
</style>
