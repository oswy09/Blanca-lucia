<script setup>
definePageMeta({ layout: 'admin', middleware: 'admin' })

const previewIframe = ref(null)
const showPreview = ref(true)
const saving = ref(false)
const saveStatus = ref('')
const content = ref({})

const sections = [
  {
    id: 'hero',
    label: 'Hero',
    fields: [
      { key: 'hero_pill', label: 'Badge text', type: 'text', placeholder: 'Personal Language Consultancy for Adults' },
      { key: 'hero_tagline', label: 'Tagline (línea pequeña)', type: 'text', placeholder: 'Personal Language Consultancy by Blanca Derby' },
      { key: 'hero_subtitle', label: 'Subtítulo', type: 'textarea', placeholder: 'A consultancy for Native Spanish-speaking adults…' },
      { key: 'hero_cta_primary', label: 'Botón WhatsApp', type: 'text', placeholder: 'Message me on WhatsApp' },
      { key: 'hero_cta_secondary', label: 'Botón servicios', type: 'text', placeholder: 'View services' },
    ],
  },
  {
    id: 'pricing',
    label: 'Precios',
    fields: [
      { key: 'pricing_eyebrow', label: 'Badge sección', type: 'text', placeholder: 'Investment' },
      { key: 'pricing_title', label: 'Título sección', type: 'text', placeholder: 'A simple, transparent approach to fees' },
      { key: 'pricing_desc_1', label: 'Descripción 1', type: 'textarea', placeholder: 'Fees are straightforward…' },
      { key: 'pricing_desc_2', label: 'Descripción 2', type: 'textarea', placeholder: 'A limited number of clients…' },
      { key: 'plan_1_name', label: 'Plan 1 — Nombre', type: 'text', placeholder: '30-minute Focus Session' },
      { key: 'plan_1_amount', label: 'Plan 1 — Precio', type: 'text', placeholder: '£35' },
      { key: 'plan_1_period', label: 'Plan 1 — Descripción precio', type: 'text', placeholder: 'Single 30-minute consultation' },
      { key: 'plan_2_name', label: 'Plan 2 — Nombre', type: 'text', placeholder: '60-minute Individual Session' },
      { key: 'plan_2_amount', label: 'Plan 2 — Precio', type: 'text', placeholder: '£60' },
      { key: 'plan_2_period', label: 'Plan 2 — Descripción precio', type: 'text', placeholder: 'Full 60-minute consultation' },
      { key: 'plan_3_name', label: 'Plan 3 — Nombre', type: 'text', placeholder: '4 × 60-minute Sessions' },
      { key: 'plan_3_amount', label: 'Plan 3 — Precio', type: 'text', placeholder: '£220' },
      { key: 'plan_3_period', label: 'Plan 3 — Descripción precio', type: 'text', placeholder: '4 × 60-minute consultations' },
    ],
  },
]

const defaults = {
  hero_pill: 'Personal Language Consultancy for Adults',
  hero_tagline: 'Personal Language Consultancy by Blanca Derby',
  hero_subtitle: 'A consultancy for Native Spanish-speaking adults seeking to improve how they express themselves in English in real-life and professional contexts.',
  hero_cta_primary: 'Message me on WhatsApp',
  hero_cta_secondary: 'View services',
  pricing_eyebrow: 'Investment',
  pricing_title: 'A simple, transparent approach to fees',
  pricing_desc_1: 'Fees are straightforward and reflect the personal, focused nature of the work. There are no hidden costs, no packages to choose between, and no pressure to commit before we have spoken.',
  pricing_desc_2: 'A limited number of clients are accepted at any one time to ensure the highest level of personal attention.',
  plan_1_name: '30-minute Focus Session',
  plan_1_amount: '£35',
  plan_1_period: 'Single 30-minute consultation',
  plan_2_name: '60-minute Individual Session',
  plan_2_amount: '£60',
  plan_2_period: 'Full 60-minute consultation',
  plan_3_name: '4 × 60-minute Sessions',
  plan_3_amount: '£220',
  plan_3_period: '4 × 60-minute consultations',
}

const openSections = ref(new Set(['hero', 'pricing']))

function toggleSection(id) {
  if (openSections.value.has(id)) openSections.value.delete(id)
  else openSections.value.add(id)
}

onMounted(async () => {
  try {
    const data = await $fetch('/api/content/home')
    content.value = { ...defaults, ...data }
  } catch {
    content.value = { ...defaults }
  }
})

async function save() {
  saving.value = true
  saveStatus.value = ''
  try {
    await $fetch('/api/content/home', { method: 'POST', body: content.value })
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
    <!-- Header -->
    <div class="editor-header">
      <div class="editor-header-left">
        <h1 class="editor-title">Home</h1>
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

    <!-- Body -->
    <div class="editor-body" :class="{ 'split': showPreview }">

      <!-- Form -->
      <div class="editor-form">
        <div
          v-for="section in sections"
          :key="section.id"
          class="section-block"
        >
          <button class="section-header" @click="toggleSection(section.id)">
            <span class="section-title">{{ section.label }}</span>
            <svg class="section-chevron" :class="{ open: openSections.has(section.id) }" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </button>

          <div v-show="openSections.has(section.id)" class="section-body">
            <div
              v-for="field in section.fields"
              :key="field.key"
              class="field"
            >
              <label class="field-label">{{ field.label }}</label>
              <textarea
                v-if="field.type === 'textarea'"
                v-model="content[field.key]"
                :placeholder="field.placeholder"
                class="field-textarea"
                rows="3"
              />
              <input
                v-else
                v-model="content[field.key]"
                :placeholder="field.placeholder"
                class="field-input"
                type="text"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Preview -->
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
          <iframe ref="previewIframe" src="/" class="preview-iframe" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.editor { display: flex; flex-direction: column; height: 100vh; overflow: hidden; }

.editor-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  background: #fff;
  border-bottom: 1px solid #e2e8f0;
  flex-shrink: 0;
  gap: 16px;
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

.editor-body {
  display: flex;
  flex: 1;
  overflow: hidden;
}
.editor-body.split .editor-form { flex: 0 0 50%; }

.editor-form {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.section-block {
  background: #fff;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  overflow: hidden;
}
.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 14px 18px;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  transition: background .15s;
}
.section-header:hover { background: #f8fafc; }
.section-title { font-size: 14px; font-weight: 700; color: #1a1f2e; }
.section-chevron { color: #9ca3af; transition: transform .2s; flex-shrink: 0; }
.section-chevron.open { transform: rotate(180deg); }

.section-body { padding: 4px 18px 18px; display: flex; flex-direction: column; gap: 14px; }

.field { display: flex; flex-direction: column; gap: 6px; }
.field-label { font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: .06em; }
.field-input,
.field-textarea {
  border: 1.5px solid #e2e8f0;
  border-radius: 8px;
  padding: 9px 12px;
  font-size: 14px;
  color: #1a1f2e;
  background: #f8fafc;
  font-family: inherit;
  transition: border-color .15s, background .15s;
  outline: none;
  resize: vertical;
  width: 100%;
}
.field-input:focus,
.field-textarea:focus { border-color: #2e8a93; background: #fff; }
.field-textarea { min-height: 72px; }

.editor-preview {
  flex: 0 0 50%;
  border-left: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  background: #e8ecf1;
  overflow: hidden;
}
.preview-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  background: #fff;
  border-bottom: 1px solid #e2e8f0;
  flex-shrink: 0;
}
.preview-label { font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: .06em; }
.preview-refresh {
  display: flex; align-items: center; gap: 5px;
  padding: 5px 10px; border-radius: 6px; border: 1.5px solid #e2e8f0;
  background: #fff; color: #374151; font-size: 12px; font-weight: 600;
  cursor: pointer; transition: all .15s; font-family: inherit;
}
.preview-refresh:hover { border-color: #2e8a93; color: #2e8a93; }
.preview-wrap {
  flex: 1;
  position: relative;
  overflow: hidden;
}
.preview-iframe {
  position: absolute;
  top: 0; left: 0;
  width: 200%;
  height: 200%;
  transform: scale(0.5);
  transform-origin: 0 0;
  border: none;
}
</style>
