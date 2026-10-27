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
    { type: 'CMS_PREVIEW', page: 'about', content: JSON.parse(JSON.stringify(content.value)) },
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
      { key: 'ab_eyebrow', label: 'Badge', type: 'text' },
      { key: 'ab_hero_title', label: 'Título principal', type: 'text' },
      { key: 'ab_hero_subtitle', label: 'Subtítulo', type: 'textarea' },
    ],
  },
  {
    id: 'intro',
    label: 'Introducción',
    icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="21" y1="6" x2="3" y2="6"/><line x1="15" y1="12" x2="3" y2="12"/><line x1="17" y1="18" x2="3" y2="18"/></svg>',
    fields: [
      { key: 'ab_intro_eyebrow', label: 'Badge sección', type: 'text' },
      { key: 'ab_intro_h2', label: 'Título sección', type: 'text' },
      { key: 'ab_intro_lead', label: 'Texto destacado', type: 'textarea' },
      { key: 'ab_intro_block_1', label: 'Bloque 1', type: 'textarea' },
      { key: 'ab_intro_block_2', label: 'Bloque 2', type: 'textarea' },
      { key: 'ab_intro_block_3', label: 'Bloque 3', type: 'textarea' },
    ],
  },
  {
    id: 'callout',
    label: 'Cita destacada',
    icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
    fields: [
      { key: 'ab_callout_text', label: 'Texto', type: 'textarea' },
    ],
  },
  {
    id: 'values',
    label: 'Valores',
    icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>',
    fields: [
      { key: 'ab_values_eyebrow', label: 'Badge', type: 'text' },
      { key: 'ab_values_h2', label: 'Título', type: 'text' },
      { key: 'ab_val_1_title', label: 'Valor 1 — Título', type: 'text' },
      { key: 'ab_val_1_desc', label: 'Valor 1 — Descripción', type: 'textarea' },
      { key: 'ab_val_2_title', label: 'Valor 2 — Título', type: 'text' },
      { key: 'ab_val_2_desc', label: 'Valor 2 — Descripción', type: 'textarea' },
      { key: 'ab_val_3_title', label: 'Valor 3 — Título', type: 'text' },
      { key: 'ab_val_3_desc', label: 'Valor 3 — Descripción', type: 'textarea' },
    ],
  },
  {
    id: 'journey',
    label: 'Trayectoria',
    icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>',
    fields: [
      { key: 'ab_journey_eyebrow', label: 'Badge', type: 'text' },
      { key: 'ab_journey_h2', label: 'Título', type: 'text' },
      { key: 'ab_step_1_title', label: 'Paso 1 — Título', type: 'text' },
      { key: 'ab_step_1_desc', label: 'Paso 1 — Descripción', type: 'textarea' },
      { key: 'ab_step_2_title', label: 'Paso 2 — Título', type: 'text' },
      { key: 'ab_step_2_desc', label: 'Paso 2 — Descripción', type: 'textarea' },
      { key: 'ab_step_3_title', label: 'Paso 3 — Título', type: 'text' },
      { key: 'ab_step_3_desc', label: 'Paso 3 — Descripción', type: 'textarea' },
    ],
  },
  {
    id: 'diff',
    label: 'Lo que me diferencia',
    icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="21" y1="6" x2="3" y2="6"/><line x1="15" y1="12" x2="3" y2="12"/><line x1="17" y1="18" x2="3" y2="18"/></svg>',
    fields: [
      { key: 'ab_diff_eyebrow', label: 'Badge', type: 'text' },
      { key: 'ab_diff_h2', label: 'Título', type: 'text' },
      { key: 'ab_diff_p1', label: 'Párrafo 1', type: 'textarea' },
      { key: 'ab_diff_p2', label: 'Párrafo 2', type: 'textarea' },
      { key: 'ab_diff_p3', label: 'Párrafo 3', type: 'textarea' },
      { key: 'ab_diff_note', label: 'Nota al pie', type: 'textarea' },
    ],
  },
  {
    id: 'cta',
    label: 'CTA Final',
    icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 16 16 12 12 8"/><line x1="8" y1="12" x2="16" y2="12"/></svg>',
    fields: [
      { key: 'ab_cta_eyebrow', label: 'Badge', type: 'text' },
      { key: 'ab_cta_title', label: 'Título', type: 'text' },
      { key: 'ab_cta_sub', label: 'Subtítulo', type: 'textarea' },
    ],
  },
]

const defaults = {
  ab_eyebrow: 'About Me',
  ab_hero_title: 'A personal language consultancy by Blanca Derby',
  ab_hero_subtitle: 'Working with Spanish-speaking adults to develop clear, confident, and natural communication through a tailored, one-to-one approach.',
  ab_intro_eyebrow: 'A Personal Approach',
  ab_intro_h2: 'A more focused, individual approach',
  ab_intro_lead: 'I support Spanish-speaking professionals in developing clear, confident communication in English.',
  ab_intro_block_1: 'My approach is shaped by over 30 years of experience in language teaching, translation, and personalised guidance, now refined into a consultancy model that prioritises the individual.',
  ab_intro_block_2: 'Rather than following a standard structure, each engagement is carefully tailored — allowing us to focus on what will make a meaningful difference to you.',
  ab_intro_block_3: 'My services for evaluating their prospective employees. To this end I provide a detailed assessment for each individual candidate, enabling my clients to make a more informed decision during their hiring process.',
  ab_callout_text: 'There is no standard programme here. We focus on what you need, how you communicate and what will make the greatest difference to you.',
  ab_values_eyebrow: 'How I work',
  ab_values_h2: 'Built on Three Core Values',
  ab_val_1_title: 'Careful understanding',
  ab_val_1_desc: 'Each engagement begins with listening — understanding your background, needs, and goals.',
  ab_val_2_title: 'Focused guidance',
  ab_val_2_desc: 'Work is directed towards what matters most, avoiding unnecessary complexity.',
  ab_val_3_title: 'Meaningful progress',
  ab_val_3_desc: 'The aim is not speed, but clarity, confidence, and lasting improvement.',
  ab_journey_eyebrow: 'My Background',
  ab_journey_h2: 'A Lifetime in Languages',
  ab_step_1_title: 'The Foundation',
  ab_step_1_desc: 'I have spent more than three decades working with adults from a wide range of professional backgrounds.',
  ab_step_2_title: 'The Insight',
  ab_step_2_desc: 'This experience allows me to quickly recognise patterns, identify challenges, and provide clear, practical guidance tailored to each individual.',
  ab_step_3_title: 'The Evolution',
  ab_step_3_desc: 'Over time, my work has evolved from traditional teaching into a more focused consultancy approach — one that values depth, precision, and personal attention.',
  ab_diff_eyebrow: 'What Makes This Different',
  ab_diff_h2: 'Personal. Not a Platform.',
  ab_diff_p1: 'This is a personal consultancy — not a platform or standardised service.',
  ab_diff_p2: 'I work with a limited number of clients to ensure each person receives thoughtful, individual attention.',
  ab_diff_p3: 'If you are looking for a calm, focused, and personal approach, I would be pleased to work with you.',
  ab_diff_note: 'A limited number of clients are accepted to ensure a high level of personal attention.',
  ab_cta_eyebrow: 'Ready to Work Together?',
  ab_cta_title: 'If you would like to get in touch',
  ab_cta_sub: 'You are welcome to contact me. We can begin with an initial conversation to understand your needs and consider the most appropriate way forward.',
}

onMounted(async () => {
  window.addEventListener('message', onIframeMsg)
  try {
    const data = await $fetch('/api/content/about')
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
          <iframe ref="previewIframe" src="/about" class="preview-iframe" @load="onIframeLoad" />
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
