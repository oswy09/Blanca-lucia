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
    { type: 'CMS_PREVIEW', page: 'services-pwe', content: JSON.parse(JSON.stringify(content.value)) },
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
      { key: 'hero_title',   label: 'Título principal', type: 'text' },
    ],
  },
  {
    id: 'intro',
    label: 'Introducción',
    icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="21" y1="6" x2="3" y2="6"/><line x1="15" y1="12" x2="3" y2="12"/><line x1="17" y1="18" x2="3" y2="18"/></svg>',
    fields: [
      { key: 'intro_title',     label: 'Título', type: 'text' },
      { key: 'intro_lead',      label: 'Texto lead', type: 'textarea' },
      { key: 'intro_body',      label: 'Texto cuerpo', type: 'textarea' },
      { key: 'intro_highlight', label: 'Texto destacado', type: 'textarea' },
    ],
  },
  {
    id: 'card',
    label: 'Tarjeta lateral',
    icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>',
    fields: [
      { key: 'card_title',  label: 'Título tarjeta', type: 'text' },
      { key: 'card_text_1', label: 'Párrafo 1', type: 'textarea' },
      { key: 'card_text_2', label: 'Párrafo 2', type: 'textarea' },
      { key: 'card_text_3', label: 'Párrafo 3', type: 'textarea' },
      { key: 'card_footer', label: 'Nota al pie', type: 'textarea' },
    ],
  },
  {
    id: 'when',
    label: 'Cuándo puedo ayudar',
    icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>',
    fields: [
      { key: 'when_subtitle', label: 'Subtítulo', type: 'text' },
      { key: 'when_intro',    label: 'Introducción', type: 'textarea' },
      { key: 'when_heading',  label: 'Encabezado lista', type: 'text' },
      { key: 'when_1', label: 'Ítem 1', type: 'text' },
      { key: 'when_2', label: 'Ítem 2', type: 'text' },
      { key: 'when_3', label: 'Ítem 3', type: 'text' },
      { key: 'when_4', label: 'Ítem 4', type: 'text' },
      { key: 'when_5', label: 'Ítem 5', type: 'text' },
      { key: 'when_6', label: 'Ítem 6', type: 'text' },
      { key: 'when_7', label: 'Ítem 7', type: 'text' },
    ],
  },
  {
    id: 'session',
    label: 'Sesiones online',
    icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>',
    fields: [
      { key: 'session_eyebrow', label: 'Badge', type: 'text' },
      { key: 'session_title',   label: 'Título', type: 'text' },
      { key: 'session_desc',    label: 'Descripción', type: 'textarea' },
    ],
  },
  {
    id: 'expect',
    label: 'Qué puedes esperar',
    icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
    fields: [
      { key: 'expect_subtitle', label: 'Subtítulo', type: 'text' },
      { key: 'expect_intro',    label: 'Introducción', type: 'textarea' },
      { key: 'expect_1_label', label: 'Tarjeta 1 — Etiqueta', type: 'text' },
      { key: 'expect_1_desc',  label: 'Tarjeta 1 — Descripción', type: 'textarea' },
      { key: 'expect_2_label', label: 'Tarjeta 2 — Etiqueta', type: 'text' },
      { key: 'expect_2_desc',  label: 'Tarjeta 2 — Descripción', type: 'textarea' },
      { key: 'expect_3_label', label: 'Tarjeta 3 — Etiqueta', type: 'text' },
      { key: 'expect_3_desc',  label: 'Tarjeta 3 — Descripción', type: 'textarea' },
      { key: 'expect_4_label', label: 'Tarjeta 4 — Etiqueta', type: 'text' },
      { key: 'expect_4_desc',  label: 'Tarjeta 4 — Descripción', type: 'textarea' },
      { key: 'expect_5_label', label: 'Tarjeta 5 — Etiqueta', type: 'text' },
      { key: 'expect_5_desc',  label: 'Tarjeta 5 — Descripción', type: 'textarea' },
    ],
  },
  {
    id: 'cta',
    label: 'CTA Final',
    icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 16 16 12 12 8"/><line x1="8" y1="12" x2="16" y2="12"/></svg>',
    fields: [
      { key: 'cta_title', label: 'Título', type: 'text' },
      { key: 'cta_desc',  label: 'Descripción', type: 'textarea' },
    ],
  },
]

const defaults = {
  hero_eyebrow: 'Service',
  hero_title:   'Professional Writing & Editing',
  intro_title:     'Make your English say exactly what you mean.',
  intro_lead:      'You may know exactly what you want to say, but expressing it naturally and professionally in English can sometimes be difficult.',
  intro_body:      'I can help you turn your ideas into clear, polished English while preserving your meaning, your personality and your voice.',
  intro_highlight: 'This is more than correcting grammar or spelling. I look at the whole message — the wording, tone, clarity and structure — so that your writing communicates exactly what you intend.',
  card_title:  'More than proofreading',
  card_text_1: 'Good communication is not simply about having correct English.',
  card_text_2: 'The same message can sound confident, uncertain, too direct, too informal or unnecessarily complicated depending on the words you choose.',
  card_text_3: 'I will help you understand why a particular wording works better, so that over time you become increasingly confident in making those decisions yourself.',
  card_footer: 'Your message remains yours. I simply help you express it at its best.',
  when_subtitle: 'When can I help?',
  when_intro:    'This service is particularly useful when you need to write something important and want to feel confident about how it will be received.',
  when_heading:  'I can help you with:',
  when_1: 'Professional and business emails',
  when_2: 'Important correspondence',
  when_3: 'Reports and presentations',
  when_4: 'Professional documents',
  when_5: 'CVs and supporting documents',
  when_6: 'Written communication with clients or colleagues',
  when_7: 'Messages where tone and wording really matter',
  session_eyebrow: 'How We Work',
  session_title:   'All sessions are conducted online',
  session_desc:    'We meet via video call, making it easy to work together wherever you are in the world. Sessions are personal, focused, and structured entirely around your needs and situation.',
  expect_subtitle: 'What you can expect',
  expect_intro:    'Together, we will make your writing:',
  expect_1_label: 'Clear',
  expect_1_desc:  'so your meaning is immediately understood.',
  expect_2_label: 'Natural',
  expect_2_desc:  'so your English sounds fluent rather than translated.',
  expect_3_label: 'Professional',
  expect_3_desc:  'so your communication reflects the person you are.',
  expect_4_label: 'Appropriate',
  expect_4_desc:  'so the tone suits the situation and the person receiving it.',
  expect_5_label: 'Confident',
  expect_5_desc:  'so your written English represents your abilities accurately.',
  cta_title: 'Ready to make your written English work for you?',
  cta_desc:  "Let's talk about what you need and how I can help.",
}

onMounted(async () => {
  window.addEventListener('message', onIframeMsg)
  try {
    const data = await $fetch('/api/content/services-pwe')
    content.value = { ...defaults, ...data }
  } catch {
    content.value = { ...defaults }
  }
})

onUnmounted(() => {
  window.removeEventListener('message', onIframeMsg)
})

async function save() {
  saving.value = true
  saveStatus.value = ''
  try {
    await $fetch('/api/content/services-pwe', { method: 'POST', body: content.value })
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
        <h1 class="editor-title">Writing & Editing</h1>
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
          <iframe ref="previewIframe" src="/services/professional-writing-editing" class="preview-iframe" @load="onIframeLoad" />
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
  padding: 5px 10px; border-radius: 6px; border: 1.5px solid #e2e8f0;
  background: #fff; color: #374151; font-size: 12px; font-weight: 600;
  cursor: pointer; transition: all .15s; font-family: inherit;
}
.preview-refresh:hover { border-color: #2e8a93; color: #2e8a93; }
.preview-wrap { flex: 1; position: relative; overflow: hidden; }
.preview-iframe {
  position: absolute;
  top: 0; left: 0;
  width: 117.65%;
  height: 117.65%;
  transform: scale(0.85);
  transform-origin: 0 0;
  border: none;
}
</style>
