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
    { type: 'CMS_PREVIEW', page: 'home', content: JSON.parse(JSON.stringify(content.value)) },
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
    label: '① Hero',
    fields: [
      { key: 'hero_pill', label: 'Badge', type: 'text' },
      { key: 'hero_tagline', label: 'Tagline', type: 'text' },
      { key: 'hero_subtitle', label: 'Subtítulo', type: 'textarea' },
      { key: 'hero_cta_primary', label: 'Botón WhatsApp', type: 'text' },
      { key: 'hero_cta_secondary', label: 'Botón servicios', type: 'text' },
    ],
  },
  {
    id: 'proof',
    label: '② Frase destacada',
    fields: [
      { key: 'proof_slide_1', label: 'Frase 1', type: 'textarea' },
      { key: 'proof_slide_2', label: 'Frase 2', type: 'textarea' },
      { key: 'proof_label', label: 'Etiqueta clientes', type: 'text' },
      { key: 'proof_client_1', label: 'Cliente 1', type: 'text' },
      { key: 'proof_client_2', label: 'Cliente 2', type: 'text' },
      { key: 'proof_client_3', label: 'Cliente 3', type: 'text' },
      { key: 'proof_client_4', label: 'Cliente 4', type: 'text' },
    ],
  },
  {
    id: 'diff',
    label: '③ Enfoque personal',
    fields: [
      { key: 'diff_eyebrow', label: 'Badge', type: 'text' },
      { key: 'diff_tagline', label: 'Tagline', type: 'text' },
      { key: 'diff_sub', label: 'Subtítulo', type: 'text' },
      { key: 'diff_guidance_label', label: 'Etiqueta lista', type: 'text' },
      { key: 'diff_check_1', label: 'Punto 1', type: 'textarea' },
      { key: 'diff_check_2', label: 'Punto 2', type: 'textarea' },
      { key: 'diff_check_3', label: 'Punto 3', type: 'textarea' },
      { key: 'diff_note', label: 'Nota inferior', type: 'textarea' },
    ],
  },
  {
    id: 'coaching',
    label: '④ Coaching (cita)',
    fields: [
      { key: 'coaching_title', label: 'Título', type: 'textarea' },
      { key: 'coaching_desc', label: 'Descripción', type: 'textarea' },
    ],
  },
  {
    id: 'testi',
    label: '⑤ Testimonios',
    fields: [
      { key: 'testi_eyebrow', label: 'Badge', type: 'text' },
      { key: 'testi_h2', label: 'Título', type: 'text' },
    ],
  },
  {
    id: 'who',
    label: '⑥ ¿Para quién es?',
    fields: [
      { key: 'who_eyebrow', label: 'Badge', type: 'text' },
      { key: 'who_h2', label: 'Título', type: 'textarea' },
      { key: 'who_desc', label: 'Descripción', type: 'textarea' },
      { key: 'who_item_1_title', label: 'Ítem 1 — Título', type: 'text' },
      { key: 'who_item_1_desc', label: 'Ítem 1 — Descripción', type: 'textarea' },
      { key: 'who_item_2_title', label: 'Ítem 2 — Título', type: 'text' },
      { key: 'who_item_2_desc', label: 'Ítem 2 — Descripción', type: 'textarea' },
      { key: 'who_item_3_title', label: 'Ítem 3 — Título', type: 'text' },
      { key: 'who_item_3_desc', label: 'Ítem 3 — Descripción', type: 'textarea' },
      { key: 'who_item_4_title', label: 'Ítem 4 — Título', type: 'text' },
      { key: 'who_item_4_desc', label: 'Ítem 4 — Descripción', type: 'textarea' },
    ],
  },
  {
    id: 'services',
    label: '⑦ Servicios',
    fields: [
      { key: 'svc_eyebrow', label: 'Badge', type: 'text' },
      { key: 'svc_h2', label: 'Título', type: 'text' },
      { key: 'svc_desc', label: 'Descripción', type: 'textarea' },
    ],
  },
  {
    id: 'how',
    label: '⑧ Cómo trabajo',
    fields: [
      { key: 'how_step_1_title', label: 'Paso 1 — Título', type: 'text' },
      { key: 'how_step_1_desc', label: 'Paso 1 — Descripción', type: 'textarea' },
      { key: 'how_step_2_title', label: 'Paso 2 — Título', type: 'text' },
      { key: 'how_step_2_desc', label: 'Paso 2 — Descripción', type: 'textarea' },
      { key: 'how_step_3_title', label: 'Paso 3 — Título', type: 'text' },
      { key: 'how_step_3_desc', label: 'Paso 3 — Descripción', type: 'textarea' },
      { key: 'how_step_4_title', label: 'Paso 4 — Título', type: 'text' },
      { key: 'how_step_4_desc', label: 'Paso 4 — Descripción', type: 'textarea' },
    ],
  },
  {
    id: 'pricing',
    label: '⑨ Precios',
    fields: [
      { key: 'pricing_eyebrow', label: 'Badge', type: 'text' },
      { key: 'pricing_title', label: 'Título', type: 'text' },
      { key: 'pricing_desc_1', label: 'Descripción 1', type: 'textarea' },
      { key: 'pricing_desc_2', label: 'Descripción 2', type: 'textarea' },
      { key: 'plan_1_name', label: 'Plan 1 — Nombre', type: 'text' },
      { key: 'plan_1_amount', label: 'Plan 1 — Precio', type: 'text' },
      { key: 'plan_1_period', label: 'Plan 1 — Período', type: 'text' },
      { key: 'plan_2_name', label: 'Plan 2 — Nombre', type: 'text' },
      { key: 'plan_2_amount', label: 'Plan 2 — Precio', type: 'text' },
      { key: 'plan_2_period', label: 'Plan 2 — Período', type: 'text' },
      { key: 'plan_3_name', label: 'Plan 3 — Nombre', type: 'text' },
      { key: 'plan_3_amount', label: 'Plan 3 — Precio', type: 'text' },
      { key: 'plan_3_period', label: 'Plan 3 — Período', type: 'text' },
      { key: 'plan_4_name', label: 'Plan 4 — Nombre', type: 'text' },
      { key: 'plan_4_amount', label: 'Plan 4 — Precio', type: 'text' },
      { key: 'plan_4_period', label: 'Plan 4 — Período', type: 'text' },
    ],
  },
  {
    id: 'cta',
    label: '⑩ CTA Final',
    fields: [
      { key: 'cta_eyebrow', label: 'Badge', type: 'text' },
      { key: 'cta_heading', label: 'Título', type: 'textarea' },
      { key: 'cta_body', label: 'Cuerpo', type: 'textarea' },
    ],
  },
]

const defaults = {
  hero_pill: 'Personal Language Consultancy for Adults',
  hero_tagline: 'Personal Language Consultancy by Blanca Derby',
  hero_subtitle: 'A consultancy for Native Spanish-speaking adults seeking to improve how they express themselves in English in real-life and professional contexts.',
  hero_cta_primary: 'Message me on WhatsApp',
  hero_cta_secondary: 'View services',
  diff_eyebrow: 'A Personal Approach',
  diff_tagline: 'A different approach to language learning',
  diff_sub: 'A personal consultancy designed around you.',
  diff_guidance_label: 'My guidance helps you:',
  diff_check_1: 'Communicate with clarity and confidence in professional and everyday settings',
  diff_check_2: 'Refine your communication style with precision',
  diff_check_3: 'Resolve long-standing challenges through focused guidance',
  diff_note: 'Every consultation is shaped around your individual needs. There are no rigid structures here.',
  coaching_title: 'My role is to help you bridge that gap.',
  coaching_desc: 'Many adults have spent years studying Spanish, yet still feel uncertain when speaking. My role is to help you bridge that gap through careful listening, deep experience, and an approach that treats you as an individual, not part of a standard programme.',
  svc_eyebrow: 'Services',
  svc_h2: 'How can I help you?',
  svc_desc: 'Each engagement is shaped around your individual needs, with a focus on clear, confident, and natural communication.',
  how_step_1_title: 'Initial Consultation',
  how_step_1_desc: 'We begin by understanding where you are, what you need, and the challenges you have faced so far.',
  how_step_2_title: 'Focused Guidance',
  how_step_2_desc: 'Targeted, precise work on the areas of communication that matter most in your professional and everyday life.',
  how_step_3_title: 'Clarity & Expression',
  how_step_3_desc: 'Attention to how you express yourself, ensuring clarity, natural flow, and ease in communication.',
  how_step_4_title: 'Confidence in Practice',
  how_step_4_desc: 'Support in applying your communication skills with confidence in real-world situations.',
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
  plan_4_name: '8 × 60-minute Sessions',
  plan_4_amount: '£400',
  plan_4_period: '8 × 60-minute consultations',
  cta_eyebrow: 'Start with a Conversation',
  cta_heading: 'If you would like to explore how I can support you',
  cta_body: 'You are welcome to get in touch. We can begin with an initial conversation to understand your needs and consider the most appropriate way forward.',
  proof_slide_1: 'With over 30 years of experience in language teaching, translation, and personalised guidance, I now offer a focused, consultancy-based approach tailored to each individual.',
  proof_slide_2: 'My work is centred on understanding your needs and guiding you towards meaningful, lasting progress, without rigid programmes or unnecessary complexity.',
  proof_label: 'Trusted by professionals at',
  proof_client_1: 'Nissan Technical Centre Europe',
  proof_client_2: 'WIB Language Training',
  proof_client_3: 'Lecta Paper UK Ltd',
  proof_client_4: 'Nissan Europe Information Systems',
  testi_eyebrow: 'Why Choose Fluent Future',
  testi_h2: 'Real stories of professional growth',
  who_eyebrow: 'Who This Is For',
  who_h2: 'Designed for adults who want more than standard approaches',
  who_desc: 'This personal consultancy is suited to individuals who feel that traditional methods have not fully addressed their needs.',
  who_item_1_title: 'Professionals seeking clarity in communication',
  who_item_1_desc: 'You need to communicate clearly and confidently at work, in meetings, with clients, or across international environments, yet feel you are not fully expressing your capabilities.',
  who_item_2_title: 'Spanish speakers wanting a specific goal',
  who_item_2_desc: 'Your priorities have evolved. You are looking to reconnect with a language or refine your communication with a clear, practical purpose.',
  who_item_3_title: 'Those who feel stuck despite experience',
  who_item_3_desc: 'You have spent years working with the language, yet still feel a gap between understanding and natural expression. This is where focused, individual guidance becomes essential.',
  who_item_4_title: 'Individuals who value a personal approach',
  who_item_4_desc: 'You prefer thoughtful, one-to-one consultancy where your needs are understood, and your progress is shaped with care and attention.',
}

const openSections = ref(new Set(['hero']))

function toggleSection(id) {
  if (openSections.value.has(id)) openSections.value.delete(id)
  else openSections.value.add(id)
}

onMounted(async () => {
  window.addEventListener('message', onIframeMsg)
  try {
    const data = await $fetch('/api/content/home')
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

      <!-- Preview (left, fills all space) -->
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

      <!-- Form (right panel, fixed width) -->
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
.editor-body.split .editor-form {
  flex: 0 0 420px;
  border-left: 1px solid #e2e8f0;
  background: #f8fafc;
}

.editor-form {
  flex: 1;
  overflow-y: auto;
  min-height: 0;
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
.preview-wrap {
  flex: 1;
  position: relative;
  overflow: hidden;
}
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
