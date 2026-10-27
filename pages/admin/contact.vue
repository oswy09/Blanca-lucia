<script setup>
definePageMeta({ layout: 'admin', middleware: 'admin' })

const previewIframe = ref(null)
const showPreview = ref(true)
const saving = ref(false)
const saveStatus = ref('')
const content = ref({})
const isInlineEditing = ref(false)

let previewDebounce = null
function sendPreview() {
  if (isInlineEditing.value) return
  previewIframe.value?.contentWindow?.postMessage(
    { type: 'CMS_PREVIEW', page: 'contact', content: JSON.parse(JSON.stringify(content.value)) },
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
    id: 'hero',
    label: 'Hero',
    icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/></svg>',
    fields: [
      { key: 'hero_eyebrow', label: 'Badge', type: 'text' },
      { key: 'hero_title',   label: 'TÃ­tulo principal', type: 'text' },
    ],
  },
  {
    id: 'book',
    label: 'Agendar',
    icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
    fields: [
      { key: 'book_eyebrow', label: 'Badge', type: 'text' },
      { key: 'book_title',   label: 'TÃ­tulo', type: 'text' },
      { key: 'book_sub',     label: 'DescripciÃ³n', type: 'textarea' },
      { key: 'book_or',      label: 'Texto separador', type: 'text' },
    ],
  },
  {
    id: 'form',
    label: 'Formulario',
    icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg>',
    fields: [
      { key: 'form_title',    label: 'TÃ­tulo', type: 'text' },
      { key: 'form_subtitle', label: 'DescripciÃ³n', type: 'textarea' },
      { key: 'form_reply',    label: 'Mensaje de respuesta', type: 'text' },
    ],
  },
  {
    id: 'pricing_header',
    label: 'Precios â€” Encabezado',
    icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>',
    fields: [
      { key: 'pricing_eyebrow', label: 'Badge', type: 'text' },
      { key: 'pricing_title',   label: 'TÃ­tulo', type: 'text' },
      { key: 'pricing_desc_1',  label: 'PÃ¡rrafo 1', type: 'textarea' },
      { key: 'pricing_desc_2',  label: 'PÃ¡rrafo 2', type: 'textarea' },
    ],
  },
  {
    id: 'disc',
    label: 'Llamada de descubrimiento',
    icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.73a16 16 0 0 0 7.36 7.36l.97-.97a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
    fields: [
      { key: 'disc_title',       label: 'TÃ­tulo', type: 'text' },
      { key: 'disc_duration',    label: 'DuraciÃ³n / Formato', type: 'text' },
      { key: 'disc_text',        label: 'DescripciÃ³n', type: 'textarea' },
      { key: 'disc_check_1',     label: 'Punto 1', type: 'text' },
      { key: 'disc_check_2',     label: 'Punto 2', type: 'text' },
      { key: 'disc_check_3',     label: 'Punto 3', type: 'text' },
      { key: 'disc_action_text', label: 'Texto CTA', type: 'text' },
    ],
  },
  {
    id: 'plan1',
    label: 'Plan 1',
    icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>',
    fields: [
      { key: 'plan_1_name',   label: 'Nombre', type: 'text' },
      { key: 'plan_1_amount', label: 'Precio', type: 'text' },
      { key: 'plan_1_period', label: 'DescripciÃ³n', type: 'text' },
    ],
  },
  {
    id: 'plan2',
    label: 'Plan 2',
    icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>',
    fields: [
      { key: 'plan_2_name',   label: 'Nombre', type: 'text' },
      { key: 'plan_2_amount', label: 'Precio', type: 'text' },
      { key: 'plan_2_period', label: 'DescripciÃ³n', type: 'text' },
    ],
  },
  {
    id: 'plan3',
    label: 'Plan 3',
    icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>',
    fields: [
      { key: 'plan_3_name',   label: 'Nombre', type: 'text' },
      { key: 'plan_3_amount', label: 'Precio', type: 'text' },
      { key: 'plan_3_period', label: 'DescripciÃ³n', type: 'text' },
    ],
  },
  {
    id: 'plan4',
    label: 'Plan 4',
    icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>',
    fields: [
      { key: 'plan_4_name',   label: 'Nombre', type: 'text' },
      { key: 'plan_4_amount', label: 'Precio', type: 'text' },
      { key: 'plan_4_period', label: 'DescripciÃ³n', type: 'text' },
    ],
  },
  {
    id: 'pricing_note',
    label: 'Nota de precios',
    icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',
    fields: [
      { key: 'pricing_note', label: 'Nota al pie', type: 'textarea' },
    ],
  },
]

const defaults = {
  hero_eyebrow: 'Get in Touch',
  hero_title:   "Let's start a conversation",
  book_eyebrow: 'Free Consultation',
  book_title:   'Book a time that works for you',
  book_sub:     'Choose a slot directly in my calendar â€” no back and forth, no commitment.',
  book_or:      'â€” or send a message below â€”',
  form_title:    "I'd love to hear from you",
  form_subtitle: 'If you feel this approach is right for you, I would be pleased to hear from you. Before we begin, I offer a brief initial consultation to understand your needs and answer any questions you may have.',
  form_reply:    'I aim to respond within 24â€“48 hours.',
  pricing_eyebrow: 'Investment',
  pricing_title:   'A simple, transparent approach to fees',
  pricing_desc_1:  'Fees are straightforward and reflect the personal, focused nature of the work. There are no hidden costs, no packages to choose between, and no pressure to commit before we have spoken.',
  pricing_desc_2:  'A limited number of clients are accepted at any one time to ensure the highest level of personal attention.',
  disc_title:       'Free Discovery Call',
  disc_duration:    'Duration: 20â€“30 minutes Â· Conducted online via video call',
  disc_text:        'Every engagement begins with a brief, informal conversation. It is an opportunity to talk about your background, what you want to achieve, and to make sure we are a good fit before deciding to work together.',
  disc_check_1:     'Discuss your background and objectives',
  disc_check_2:     'Identify what may have held you back until now',
  disc_check_3:     'Answer any questions about the sessions',
  disc_action_text: 'Ready to get started?',
  plan_1_name:   '30-minute Focus Session',
  plan_1_amount: 'Â£35',
  plan_1_period: 'Single 30-minute consultation',
  plan_2_name:   '60-minute Individual Session',
  plan_2_amount: 'Â£60',
  plan_2_period: 'Full 60-minute consultation',
  plan_3_name:   '4 Ã— 60-minute Sessions',
  plan_3_amount: 'Â£220',
  plan_3_period: 'Block of 4 consultations (Save Â£20)',
  plan_4_name:   '8 Ã— 60-minute Sessions',
  plan_4_amount: 'Â£400',
  plan_4_period: 'Block of 8 consultations (Save Â£80)',
  pricing_note:  'All sessions are conducted online. Fees are reviewed periodically and confirmed before any commitment is made.',
}

const { data: kvData } = await useAsyncData('admin-contact', () =>
  $fetch('/api/content/contact').catch(() => ({}))
)

onMounted(() => {
  content.value = { ...defaults, ...(kvData.value || {}) }
  window.addEventListener('message', onIframeMsg)
})

onUnmounted(() => {
  window.removeEventListener('message', onIframeMsg)
})

async function save() {
  saving.value = true
  saveStatus.value = ''
  try {
    await $fetch('/api/content/contact', { method: 'POST', body: content.value })
    saveStatus.value = 'saved'
    setTimeout(() => { saveStatus.value = '' }, 3000)
    if (previewIframe.value) {
      setTimeout(() => previewIframe.value.contentWindow.location.reload(), 300)
    }
  } catch (e) {
    if ((e?.statusCode || e?.response?.status) === 401) { navigateTo('/admin'); return }
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
        <h1 class="editor-title">Contact</h1>
        <span v-if="saveStatus === 'saved'" class="badge-saved">âœ“ Guardado</span>
        <span v-if="saveStatus === 'error'" class="badge-error">Error al guardar</span>
      </div>
      <div class="editor-header-right">
        <button class="btn-toggle-preview" @click="showPreview = !showPreview">
          {{ showPreview ? 'Ocultar preview' : 'Ver preview' }}
        </button>
        <button class="btn-save" @click="save" :disabled="saving">
          {{ saving ? 'Guardandoâ€¦' : 'Guardar cambios' }}
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
          <iframe ref="previewIframe" src="/contact" class="preview-iframe" @load="onIframeLoad" />
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

.editor-body { display: flex; flex: 1; overflow: hidden; }
.editor-body.split .editor-form {
  flex: 0 0 420px;
  border-left: 1px solid #e2e8f0;
  background: #f8fafc;
}

.editor-form {
  flex: 1;
  overflow-y: auto;
  min-height: 0;
  padding: 16px 20px 32px;
  display: flex;
  flex-direction: column;
  gap: 0;
  background: #f8fafc;
}

.sec-divider {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 22px 0 10px;
  position: sticky;
  top: 0;
  z-index: 2;
  background: #f8fafc;
}
.sec-divider:first-child { padding-top: 6px; }
.sec-divider-label {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: .1em;
  color: #2e8a93;
  white-space: nowrap;
  background: #f8fafc;
  padding-right: 10px;
}
.sec-divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: #e2e8f0;
}
.sec-icon { display: flex; align-items: center; color: #2e8a93; flex-shrink: 0; }
.sec-icon svg { display: block; }

.field {
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-bottom: 12px;
}
.field-label {
  font-size: 11px;
  font-weight: 600;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: .06em;
}
.field-input,
.field-textarea {
  border: 1.5px solid #e2e8f0;
  border-radius: 8px;
  padding: 9px 12px;
  font-size: 13.5px;
  color: #1a1f2e;
  background: #fff;
  font-family: inherit;
  transition: border-color .15s, box-shadow .15s;
  outline: none;
  resize: vertical;
  width: 100%;
  box-sizing: border-box;
}
.field-input:focus,
.field-textarea:focus {
  border-color: #2e8a93;
  box-shadow: 0 0 0 3px rgba(46,138,147,.12);
}
.field-textarea { min-height: 70px; line-height: 1.55; }

.editor-preview {
  flex: 1;
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
  background: none; border: none; cursor: pointer;
  font-size: 12px; color: #6b7280; font-weight: 600; font-family: inherit;
  padding: 4px 8px; border-radius: 6px; transition: background .15s, color .15s;
}
.preview-refresh:hover { background: #f1f5f9; color: #374151; }
.preview-wrap { flex: 1; overflow: hidden; }
.preview-iframe { width: 100%; height: 100%; border: none; display: block; }
</style>

