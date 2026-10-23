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
      { key: 'ab_eyebrow', label: 'Badge', type: 'text', placeholder: 'About Me' },
      { key: 'ab_hero_title', label: 'Título principal', type: 'text', placeholder: 'A personal language consultancy by Blanca Derby' },
      { key: 'ab_hero_subtitle', label: 'Subtítulo', type: 'textarea', placeholder: 'Working with Spanish-speaking adults…' },
    ],
  },
  {
    id: 'intro',
    label: 'Introducción',
    fields: [
      { key: 'ab_intro_eyebrow', label: 'Badge sección', type: 'text', placeholder: 'A Personal Approach' },
      { key: 'ab_intro_h2', label: 'Título sección', type: 'text', placeholder: 'A more focused, individual approach' },
      { key: 'ab_intro_lead', label: 'Texto destacado', type: 'textarea', placeholder: 'I support Spanish-speaking professionals…' },
      { key: 'ab_intro_block_1', label: 'Párrafo 1', type: 'textarea', placeholder: 'My approach is shaped by over 30 years…' },
      { key: 'ab_intro_block_2', label: 'Párrafo 2', type: 'textarea', placeholder: 'Rather than following a standard structure…' },
      { key: 'ab_intro_block_3', label: 'Párrafo 3', type: 'textarea', placeholder: 'My services for evaluating their prospective employees…' },
    ],
  },
  {
    id: 'callout',
    label: 'Cita destacada',
    fields: [
      { key: 'ab_callout_text', label: 'Texto', type: 'textarea', placeholder: 'There is no standard programme here…' },
    ],
  },
  {
    id: 'values',
    label: 'Valores (Cómo trabajo)',
    fields: [
      { key: 'ab_values_eyebrow', label: 'Badge sección', type: 'text', placeholder: 'How I work' },
      { key: 'ab_values_h2', label: 'Título sección', type: 'text', placeholder: 'Built on Three Core Values' },
      { key: 'ab_val_1_title', label: 'Valor 1 — Título', type: 'text', placeholder: 'Careful understanding' },
      { key: 'ab_val_1_desc', label: 'Valor 1 — Descripción', type: 'textarea', placeholder: 'Each engagement begins with listening…' },
      { key: 'ab_val_2_title', label: 'Valor 2 — Título', type: 'text', placeholder: 'Focused guidance' },
      { key: 'ab_val_2_desc', label: 'Valor 2 — Descripción', type: 'textarea', placeholder: 'Work is directed towards what matters most…' },
      { key: 'ab_val_3_title', label: 'Valor 3 — Título', type: 'text', placeholder: 'Meaningful progress' },
      { key: 'ab_val_3_desc', label: 'Valor 3 — Descripción', type: 'textarea', placeholder: 'The aim is not speed, but clarity…' },
    ],
  },
  {
    id: 'journey',
    label: 'Trayectoria',
    fields: [
      { key: 'ab_journey_eyebrow', label: 'Badge sección', type: 'text', placeholder: 'My Background' },
      { key: 'ab_journey_h2', label: 'Título sección', type: 'text', placeholder: 'A Lifetime in Languages' },
      { key: 'ab_step_1_title', label: 'Paso 1 — Título', type: 'text', placeholder: 'The Foundation' },
      { key: 'ab_step_1_desc', label: 'Paso 1 — Descripción', type: 'textarea', placeholder: 'I have spent more than three decades…' },
      { key: 'ab_step_2_title', label: 'Paso 2 — Título', type: 'text', placeholder: 'The Insight' },
      { key: 'ab_step_2_desc', label: 'Paso 2 — Descripción', type: 'textarea', placeholder: 'This experience allows me to quickly…' },
      { key: 'ab_step_3_title', label: 'Paso 3 — Título', type: 'text', placeholder: 'The Evolution' },
      { key: 'ab_step_3_desc', label: 'Paso 3 — Descripción', type: 'textarea', placeholder: 'Over time, my work has evolved…' },
    ],
  },
  {
    id: 'diff',
    label: 'Lo que me diferencia',
    fields: [
      { key: 'ab_diff_eyebrow', label: 'Badge sección', type: 'text', placeholder: 'What Makes This Different' },
      { key: 'ab_diff_h2', label: 'Título sección', type: 'text', placeholder: 'Personal. Not a Platform.' },
      { key: 'ab_diff_p1', label: 'Párrafo 1', type: 'textarea', placeholder: 'This is a personal consultancy…' },
      { key: 'ab_diff_p2', label: 'Párrafo 2', type: 'textarea', placeholder: 'I work with a limited number of clients…' },
      { key: 'ab_diff_p3', label: 'Párrafo 3', type: 'textarea', placeholder: 'If you are looking for a calm, focused…' },
      { key: 'ab_diff_note', label: 'Nota al pie', type: 'textarea', placeholder: 'A limited number of clients are accepted…' },
    ],
  },
  {
    id: 'cta',
    label: 'CTA Final',
    fields: [
      { key: 'ab_cta_eyebrow', label: 'Badge', type: 'text', placeholder: 'Ready to Work Together?' },
      { key: 'ab_cta_title', label: 'Título', type: 'text', placeholder: 'If you would like to get in touch' },
      { key: 'ab_cta_sub', label: 'Subtítulo', type: 'textarea', placeholder: 'You are welcome to contact me…' },
    ],
  },
]

const openSections = ref(new Set(['hero']))

function toggleSection(id) {
  if (openSections.value.has(id)) openSections.value.delete(id)
  else openSections.value.add(id)
}

onMounted(async () => {
  try {
    const data = await $fetch('/api/content/about')
    content.value = data || {}
  } catch {}
})

async function save() {
  saving.value = true
  saveStatus.value = ''
  try {
    await $fetch('/api/content/about', { method: 'POST', body: content.value })
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
        <h1 class="editor-title">About</h1>
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
      <div class="editor-form">
        <div v-for="section in sections" :key="section.id" class="section-block">
          <button class="section-header" @click="toggleSection(section.id)">
            <span class="section-title">{{ section.label }}</span>
            <svg class="section-chevron" :class="{ open: openSections.has(section.id) }" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </button>
          <div v-show="openSections.has(section.id)" class="section-body">
            <div v-for="field in section.fields" :key="field.key" class="field">
              <label class="field-label">{{ field.label }}</label>
              <textarea v-if="field.type === 'textarea'" v-model="content[field.key]" :placeholder="field.placeholder" class="field-textarea" rows="3" />
              <input v-else v-model="content[field.key]" :placeholder="field.placeholder" class="field-input" type="text" />
            </div>
          </div>
        </div>
      </div>

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
        <iframe ref="previewIframe" src="/about" class="preview-iframe" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.editor { display: flex; flex-direction: column; height: 100vh; overflow: hidden; }
.editor-header { display: flex; align-items: center; justify-content: space-between; padding: 16px 24px; background: #fff; border-bottom: 1px solid #e2e8f0; flex-shrink: 0; gap: 16px; }
.editor-header-left { display: flex; align-items: center; gap: 12px; }
.editor-title { font-family: 'Poppins', sans-serif; font-size: 18px; font-weight: 700; color: #1a1f2e; }
.badge-saved { font-size: 12px; font-weight: 600; color: #059669; background: #ecfdf5; padding: 4px 10px; border-radius: 6px; }
.badge-error { font-size: 12px; font-weight: 600; color: #dc2626; background: #fef2f2; padding: 4px 10px; border-radius: 6px; }
.editor-header-right { display: flex; align-items: center; gap: 10px; }
.btn-toggle-preview { padding: 8px 14px; border-radius: 8px; border: 1.5px solid #e2e8f0; background: #fff; color: #374151; font-size: 13px; font-weight: 600; cursor: pointer; transition: all .15s; font-family: inherit; }
.btn-toggle-preview:hover { border-color: #2e8a93; color: #2e8a93; }
.btn-save { padding: 8px 18px; border-radius: 8px; border: none; background: #2e8a93; color: #fff; font-size: 14px; font-weight: 600; cursor: pointer; transition: background .15s; font-family: inherit; }
.btn-save:hover:not(:disabled) { background: #13484e; }
.btn-save:disabled { opacity: .55; cursor: not-allowed; }
.editor-body { display: flex; flex: 1; overflow: hidden; }
.editor-body.split .editor-form { flex: 0 0 50%; }
.editor-form { flex: 1; overflow-y: auto; padding: 20px; display: flex; flex-direction: column; gap: 12px; }
.section-block { background: #fff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; }
.section-header { display: flex; align-items: center; justify-content: space-between; width: 100%; padding: 14px 18px; background: none; border: none; cursor: pointer; text-align: left; transition: background .15s; }
.section-header:hover { background: #f8fafc; }
.section-title { font-size: 14px; font-weight: 700; color: #1a1f2e; }
.section-chevron { color: #9ca3af; transition: transform .2s; flex-shrink: 0; }
.section-chevron.open { transform: rotate(180deg); }
.section-body { padding: 4px 18px 18px; display: flex; flex-direction: column; gap: 14px; }
.field { display: flex; flex-direction: column; gap: 6px; }
.field-label { font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: .06em; }
.field-input, .field-textarea { border: 1.5px solid #e2e8f0; border-radius: 8px; padding: 9px 12px; font-size: 14px; color: #1a1f2e; background: #f8fafc; font-family: inherit; transition: border-color .15s, background .15s; outline: none; resize: vertical; width: 100%; }
.field-input:focus, .field-textarea:focus { border-color: #2e8a93; background: #fff; }
.field-textarea { min-height: 72px; }
.editor-preview { flex: 0 0 50%; border-left: 1px solid #e2e8f0; display: flex; flex-direction: column; background: #e8ecf1; }
.preview-bar { display: flex; align-items: center; justify-content: space-between; padding: 10px 16px; background: #fff; border-bottom: 1px solid #e2e8f0; flex-shrink: 0; }
.preview-label { font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: .06em; }
.preview-refresh { display: flex; align-items: center; gap: 5px; padding: 5px 10px; border-radius: 6px; border: 1.5px solid #e2e8f0; background: #fff; color: #374151; font-size: 12px; font-weight: 600; cursor: pointer; transition: all .15s; font-family: inherit; }
.preview-refresh:hover { border-color: #2e8a93; color: #2e8a93; }
.preview-iframe { flex: 1; border: none; transform-origin: top left; width: 200%; height: 200%; transform: scale(0.5); margin-bottom: -100%; margin-right: -100%; }
</style>
