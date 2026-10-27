<script setup>
definePageMeta({ layout: 'admin', middleware: 'admin' })

const previewIframe = ref(null)
const showPreview   = ref(true)
const saving        = ref(false)
const saveStatus    = ref('')
const content       = ref({})
const isInlineEditing = ref(false)

const addingUser  = ref(false)
const newEmail    = ref('')
const newPassword = ref('')
const userStatus  = ref('')
const kvUsers     = ref([])

let previewDebounce = null
function sendPreview() {
  if (isInlineEditing.value) return
  previewIframe.value?.contentWindow?.postMessage(
    { type: 'CMS_PREVIEW', page: 'global', content: JSON.parse(JSON.stringify(content.value)) },
    window.location.origin
  )
}

const INLINE_EDITOR_CODE = `(function(){
  var a=null;
  function hl(el,on){
    el.style.outline=on?'2px solid #2e8a93':'';
    el.style.outlineOffset=on?'3px':'';
    el.style.borderRadius=on?'3px':'';
    el.style.cursor=on?'text':'';
    el.style.background=on?'rgba(46,138,147,0.06)':'';
  }
  document.addEventListener('mouseover',function(e){
    var el=e.target.closest('[data-cms-key]');
    if(el&&el!==a)hl(el,true);
  });
  document.addEventListener('mouseout',function(e){
    var el=e.target.closest('[data-cms-key]');
    if(el&&el!==a)hl(el,false);
  });
  document.addEventListener('click',function(e){
    var el=e.target.closest('[data-cms-key]');
    if(!el){if(a)end(a);return;}
    if(el===a)return;
    e.preventDefault();e.stopPropagation();
    if(a)end(a);
    begin(el);
  },true);
  function begin(el){
    a=el;
    var k=el.getAttribute('data-cms-key');
    hl(el,true);
    el.contentEditable='true';
    el.focus();
    try{var r=document.createRange();r.selectNodeContents(el);var s=window.getSelection();s.removeAllRanges();s.addRange(r);}catch(x){}
    window.parent.postMessage({type:'CMS_INLINE_START',key:k},'*');
    el._i=function(){window.parent.postMessage({type:'CMS_FIELD_CHANGE',key:k,value:el.innerText},'*');};
    el._k=function(e){if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();end(el);}if(e.key==='Escape')end(el);};
    el.addEventListener('input',el._i);
    el.addEventListener('keydown',el._k);
  }
  function end(el){
    if(!el)return;
    el.contentEditable='false';
    el.removeEventListener('input',el._i);
    el.removeEventListener('keydown',el._k);
    hl(el,false);
    window.parent.postMessage({type:'CMS_INLINE_END',key:el.getAttribute('data-cms-key')},'*');
    a=null;
  }
})()`

function injectInlineEditor() {
  const win = previewIframe.value?.contentWindow
  if (!win?.document) return
  try {
    win.document.getElementById('_cms_ie')?.remove()
    const s = win.document.createElement('script')
    s.id = '_cms_ie'
    s.textContent = INLINE_EDITOR_CODE
    win.document.head.appendChild(s)
  } catch(e) {}
}

function onIframeMsg(event) {
  if (event.source !== previewIframe.value?.contentWindow) return
  const d = event.data || {}
  if (d.type === 'CMS_INLINE_START') {
    isInlineEditing.value = true
  } else if (d.type === 'CMS_INLINE_END') {
    isInlineEditing.value = false
    nextTick(sendPreview)
  } else if (d.type === 'CMS_FIELD_CHANGE') {
    if (content.value) content.value[d.key] = d.value
  }
}

function onIframeLoad() {
  sendPreview()
  setTimeout(injectInlineEditor, 200)
}

watch(content, () => {
  clearTimeout(previewDebounce)
  previewDebounce = setTimeout(sendPreview, 250)
}, { deep: true })

const sections = [
  {
    id: 'contact',
    label: 'Contacto',
    icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.73a16 16 0 0 0 7.36 7.36l.97-.97a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
    fields: [
      { key: 'whatsapp_number', label: 'Número WhatsApp (sin + ni espacios)', type: 'text' },
      { key: 'contact_email',   label: 'Email de contacto', type: 'text' },
    ],
  },
  {
    id: 'nav',
    label: 'Menú — Nombres',
    icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>',
    fields: [
      { key: 'nav_home',    label: 'Home', type: 'text' },
      { key: 'nav_about',   label: 'About', type: 'text' },
      { key: 'nav_services', label: 'Services', type: 'text' },
      { key: 'nav_blog',    label: 'Blog', type: 'text' },
      { key: 'nav_contact', label: 'Contact me', type: 'text' },
      { key: 'nav_cta_label', label: 'Botón CTA', type: 'text' },
    ],
  },
  {
    id: 'nav_services',
    label: 'Menú — Servicios',
    icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>',
    fields: [
      { key: 'nav_svc_pc',  label: 'Comunicación profesional', type: 'text' },
      { key: 'nav_svc_ip',  label: 'Preparación de entrevista', type: 'text' },
      { key: 'nav_svc_pwe', label: 'Escritura y edición', type: 'text' },
    ],
  },
  {
    id: 'footer',
    label: 'Footer',
    icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/><line x1="3" y1="12" x2="15" y2="12"/></svg>',
    fields: [
      { key: 'footer_tagline',   label: 'Descripción', type: 'textarea' },
      { key: 'footer_copyright', label: 'Copyright (puedes usar salto de línea)', type: 'textarea' },
    ],
  },
]

const defaults = {
  whatsapp_number: '447000000000',
  contact_email:   'blanca@fluentfuture.co.uk',
  nav_home:        'Home',
  nav_about:       'About',
  nav_services:    'Services',
  nav_blog:        'Blog',
  nav_contact:     'Contact me',
  nav_cta_label:   'Get in touch',
  nav_svc_pc:      'Personal Consultancy',
  nav_svc_ip:      'Interview Preparation',
  nav_svc_pwe:     'Professional Writing & Editing',
  footer_tagline:   'Personal English language consultancy for Spanish-speaking professionals. Over 30 years helping people communicate as the professionals they truly are.',
  footer_copyright: '© 2026 Fluent Future · Blanca Derby\nfluentfuture.co.uk',
}

const { data: kvData } = await useAsyncData('admin-settings', () =>
  $fetch('/api/content/global').catch(() => ({}))
)

onMounted(async () => {
  content.value = { ...defaults, ...(kvData.value || {}) }
  window.addEventListener('message', onIframeMsg)
  await loadUsers()
})

onUnmounted(() => {
  window.removeEventListener('message', onIframeMsg)
})

async function loadUsers() {
  try {
    const { users } = await $fetch('/api/admin/users')
    kvUsers.value = users
  } catch {
    kvUsers.value = []
  }
}

async function addUser() {
  if (!newEmail.value || !newPassword.value) return
  addingUser.value = true
  userStatus.value = ''
  try {
    await $fetch('/api/admin/users', {
      method: 'POST',
      body: { email: newEmail.value, password: newPassword.value },
    })
    userStatus.value = 'added'
    newEmail.value = ''
    newPassword.value = ''
    await loadUsers()
    setTimeout(() => { userStatus.value = '' }, 3000)
  } catch {
    userStatus.value = 'error'
  } finally {
    addingUser.value = false
  }
}

async function deleteUser(email) {
  if (!confirm(`¿Eliminar al usuario ${email}?`)) return
  try {
    await $fetch('/api/admin/users', { method: 'DELETE', body: { email } })
    await loadUsers()
  } catch {}
}

async function save() {
  saving.value = true
  saveStatus.value = ''
  try {
    await $fetch('/api/content/global', { method: 'POST', body: content.value })
    saveStatus.value = 'saved'
    setTimeout(() => { saveStatus.value = '' }, 3000)
    if (previewIframe.value) {
      setTimeout(() => previewIframe.value.contentWindow.location.reload(), 300)
    }
  } catch {
    saveStatus.value = 'error'
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <div class="editor">
    <div class="editor-header">
      <div class="editor-header-left">
        <h1 class="editor-title">Ajustes globales</h1>
        <span v-if="saveStatus === 'saved'" class="badge-saved">✓ Guardado</span>
        <span v-if="saveStatus === 'error'" class="badge-error">Error al guardar</span>
      </div>
      <div class="editor-header-right">
        <button class="btn-toggle-preview" @click="showPreview = !showPreview">
          {{ showPreview ? 'Ocultar preview' : 'Ver preview' }}
        </button>
        <button class="btn-save" @click="save" :disabled="saving">
          {{ saving ? 'Guardando…' : 'Guardar cambios' }}
        </button>
      </div>
    </div>

    <div class="editor-body" :class="{ 'split': showPreview }">

      <div v-if="showPreview" class="editor-preview">
        <div class="preview-bar">
          <span class="preview-label">Preview en vivo</span>
          <button class="preview-refresh" @click="previewIframe?.contentWindow?.location?.reload()">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/>
              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
            </svg>
            Actualizar
          </button>
        </div>
        <div class="preview-wrap">
          <iframe ref="previewIframe" src="/" class="preview-iframe" @load="onIframeLoad" />
        </div>
      </div>

      <div class="editor-form">
        <template v-for="section in sections" :key="section.id">
          <div class="sec-divider">
            <span class="sec-icon" v-html="section.icon"></span>
            <span class="sec-divider-label">{{ section.label }}</span>
          </div>
          <div v-for="field in section.fields" :key="field.key" class="field">
            <label class="field-label">{{ field.label }}</label>
            <textarea
              v-if="field.type === 'textarea'"
              v-model="content[field.key]"
              class="field-textarea"
              rows="3"
            />
            <input
              v-else
              v-model="content[field.key]"
              class="field-input"
              type="text"
            />
          </div>
        </template>

        <!-- Users section -->
        <div class="sec-divider sec-divider-users">
          <span class="sec-icon">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
          </span>
          <span class="sec-divider-label">Usuarios del CMS</span>
        </div>

        <p class="users-note">Los usuarios agregados aquí pueden iniciar sesión en el CMS.</p>

        <div class="users-list" v-if="kvUsers.length > 0">
          <div v-for="u in kvUsers" :key="u.email" class="user-row">
            <span class="user-email">{{ u.email }}</span>
            <button class="user-delete-btn" @click="deleteUser(u.email)" title="Eliminar usuario">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                <path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/>
              </svg>
            </button>
          </div>
        </div>
        <p v-else class="users-empty">No hay usuarios adicionales en KV.</p>

        <div class="add-user-form">
          <div class="field">
            <label class="field-label">Email del nuevo usuario</label>
            <input v-model="newEmail" class="field-input" type="email" placeholder="correo@ejemplo.com" />
          </div>
          <div class="field">
            <label class="field-label">Contraseña</label>
            <input v-model="newPassword" class="field-input" type="password" placeholder="••••••••" />
          </div>
          <div class="add-user-actions">
            <button class="btn-add-user" @click="addUser" :disabled="addingUser || !newEmail || !newPassword">
              {{ addingUser ? 'Agregando…' : 'Agregar usuario' }}
            </button>
            <span v-if="userStatus === 'added'" class="badge-saved" style="font-size:12px;">✓ Usuario agregado</span>
            <span v-if="userStatus === 'error'" class="badge-error" style="font-size:12px;">Error al agregar</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.editor { display: flex; flex-direction: column; height: 100vh; overflow: hidden; }

.editor-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 16px 24px; background: #fff; border-bottom: 1px solid #e2e8f0;
  flex-shrink: 0; gap: 16px;
}
.editor-header-left { display: flex; align-items: center; gap: 12px; }
.editor-title { font-family: 'Poppins', sans-serif; font-size: 18px; font-weight: 700; color: #1a1f2e; }
.badge-saved { font-size: 12px; font-weight: 600; color: #059669; background: #ecfdf5; padding: 4px 10px; border-radius: 6px; }
.badge-error { font-size: 12px; font-weight: 600; color: #dc2626; background: #fef2f2; padding: 4px 10px; border-radius: 6px; }
.editor-header-right { display: flex; align-items: center; gap: 10px; }

.btn-toggle-preview {
  padding: 8px 14px; border-radius: 8px; border: 1.5px solid #e2e8f0;
  background: #fff; color: #374151; font-size: 13px; font-weight: 600;
  cursor: pointer; transition: all .15s; font-family: inherit;
}
.btn-toggle-preview:hover { border-color: #2e8a93; color: #2e8a93; }

.btn-save {
  padding: 8px 18px; border-radius: 8px; border: none;
  background: #2e8a93; color: #fff; font-size: 14px; font-weight: 600;
  cursor: pointer; transition: background .15s; font-family: inherit;
}
.btn-save:hover:not(:disabled) { background: #13484e; }
.btn-save:disabled { opacity: .55; cursor: not-allowed; }

.editor-body { display: flex; flex: 1; overflow: hidden; }
.editor-body.split .editor-form { flex: 0 0 420px; border-left: 1px solid #e2e8f0; background: #f8fafc; }

.editor-form {
  flex: 1; overflow-y: auto; min-height: 0;
  padding: 16px 20px 48px; display: flex; flex-direction: column; gap: 0; background: #f8fafc;
}

.sec-divider {
  display: flex; align-items: center; gap: 10px;
  padding: 22px 0 10px; position: sticky; top: 0; z-index: 2; background: #f8fafc;
}
.sec-divider:first-child { padding-top: 6px; }
.sec-divider-label {
  font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: .1em;
  color: #2e8a93; white-space: nowrap; background: #f8fafc; padding-right: 10px;
}
.sec-divider::after { content: ''; flex: 1; height: 1px; background: #e2e8f0; }
.sec-icon { display: flex; align-items: center; color: #2e8a93; flex-shrink: 0; }
.sec-icon svg { display: block; }

.field { display: flex; flex-direction: column; gap: 5px; margin-bottom: 12px; }
.field-label { font-size: 11px; font-weight: 600; color: #9ca3af; text-transform: uppercase; letter-spacing: .06em; }
.field-input, .field-textarea {
  border: 1.5px solid #e2e8f0; border-radius: 8px; padding: 9px 12px;
  font-size: 13.5px; color: #1a1f2e; background: #fff; font-family: inherit;
  transition: border-color .15s, box-shadow .15s; outline: none; resize: vertical;
  width: 100%; box-sizing: border-box;
}
.field-input:focus, .field-textarea:focus { border-color: #2e8a93; box-shadow: 0 0 0 3px rgba(46,138,147,.12); }
.field-textarea { min-height: 70px; line-height: 1.55; }

/* Users section */
.users-note { font-size: 12.5px; color: #6b7280; margin-bottom: 12px; }
.users-empty { font-size: 12.5px; color: #9ca3af; font-style: italic; margin-bottom: 12px; }

.users-list { display: flex; flex-direction: column; gap: 6px; margin-bottom: 16px; }
.user-row {
  display: flex; align-items: center; justify-content: space-between;
  background: #fff; border: 1.5px solid #e2e8f0; border-radius: 8px; padding: 8px 12px;
}
.user-email { font-size: 13.5px; color: #374151; font-weight: 500; }
.user-delete-btn {
  background: none; border: none; cursor: pointer; color: #9ca3af;
  display: flex; align-items: center; padding: 4px; border-radius: 4px; transition: color .15s, background .15s;
}
.user-delete-btn:hover { color: #dc2626; background: #fef2f2; }

.add-user-form { background: #fff; border: 1.5px solid #e2e8f0; border-radius: 12px; padding: 16px; }
.add-user-actions { display: flex; align-items: center; gap: 10px; margin-top: 4px; }
.btn-add-user {
  padding: 8px 16px; border-radius: 8px; border: none;
  background: #1a2035; color: #fff; font-size: 13px; font-weight: 600;
  cursor: pointer; transition: background .15s; font-family: inherit;
}
.btn-add-user:hover:not(:disabled) { background: #2e8a93; }
.btn-add-user:disabled { opacity: .5; cursor: not-allowed; }

/* Preview */
.editor-preview { flex: 1; display: flex; flex-direction: column; background: #e8ecf1; overflow: hidden; }
.preview-bar {
  display: flex; align-items: center; justify-content: space-between;
  padding: 10px 16px; background: #fff; border-bottom: 1px solid #e2e8f0; flex-shrink: 0;
}
.preview-label { font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: .06em; }
.preview-refresh {
  display: flex; align-items: center; gap: 5px;
  background: none; border: none; cursor: pointer;
  font-size: 12px; color: #6b7280; font-weight: 600; font-family: inherit;
  padding: 4px 8px; border-radius: 6px; transition: background .15s, color .15s;
}
.preview-refresh:hover { background: #f1f5f9; color: #374151; }
.preview-wrap { flex: 1; overflow: hidden; }
.preview-iframe { width: 100%; height: 100%; border: none; display: block; }
</style>
