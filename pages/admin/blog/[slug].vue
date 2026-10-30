<script setup>
definePageMeta({ layout: 'admin' })

const route = useRoute()
const router = useRouter()
const paramSlug = route.params.slug
const isNew = paramSlug === 'new'

// Form state
const title    = ref('')
const slug     = ref('')
const excerpt  = ref('')
const category = ref('')
const readTime = ref('')
const date     = ref(new Date().toISOString().slice(0, 10))
const image    = ref('')
const featured = ref(false)
const blocks   = ref([{ type: 'p', text: '' }])

const saving  = ref(false)
const saved   = ref(false)
const error   = ref('')
const slugEdited = ref(false)

// Load existing post
if (!isNew) {
  const { data } = await useFetch(`/api/blog/${paramSlug}`, { key: `blog-edit-${paramSlug}` })
  if (data.value) {
    const p = data.value
    title.value    = p.title    || ''
    slug.value     = p.slug     || paramSlug
    excerpt.value  = p.excerpt  || ''
    category.value = p.category || ''
    readTime.value = p.readTime || ''
    date.value     = p.date     || date.value
    image.value    = p.image    || ''
    featured.value = p.featured || false
    blocks.value   = (p.body?.length ? p.body : [{ type: 'p', text: '' }])
    slugEdited.value = true
  }
}

function slugify(text) {
  return text.toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

watch(title, (val) => {
  if (!slugEdited.value) slug.value = slugify(val)
})

// Block editor
function addBlock(type) {
  blocks.value.push({ type, text: '' })
}
function removeBlock(i) {
  if (blocks.value.length === 1) return
  blocks.value.splice(i, 1)
}
function moveUp(i) {
  if (i === 0) return
  const tmp = blocks.value[i - 1]
  blocks.value[i - 1] = blocks.value[i]
  blocks.value[i] = tmp
}
function moveDown(i) {
  if (i === blocks.value.length - 1) return
  const tmp = blocks.value[i + 1]
  blocks.value[i + 1] = blocks.value[i]
  blocks.value[i] = tmp
}

async function save() {
  error.value = ''
  if (!title.value.trim()) { error.value = 'El título es obligatorio'; return }
  if (!slug.value.trim())  { error.value = 'El slug es obligatorio'; return }
  saving.value = true
  try {
    await $fetch('/api/blog', {
      method: 'POST',
      body: {
        slug:     slug.value,
        title:    title.value,
        excerpt:  excerpt.value,
        category: category.value,
        readTime: readTime.value,
        date:     date.value,
        image:    image.value,
        featured: featured.value,
        body:     blocks.value.filter(b => b.text.trim()),
      },
    })
    saved.value = true
    setTimeout(() => { saved.value = false }, 2500)
    if (isNew) router.replace(`/admin/blog/${slug.value}`)
  } catch {
    error.value = 'Error al guardar. Intenta de nuevo.'
  } finally {
    saving.value = false
  }
}

const CATEGORIES = [
  'Language & Communication',
  'Professional English',
  'Professional Writing',
  'Interview Preparation',
]
</script>

<template>
  <div class="adm-page">
    <!-- Header -->
    <div class="be-header">
      <NuxtLink to="/admin/blog" class="be-back">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
        Blog
      </NuxtLink>
      <h1 class="adm-page-title">{{ isNew ? 'Nuevo artículo' : 'Editar artículo' }}</h1>
    </div>

    <div class="be-layout">
      <!-- Main column -->
      <div class="be-main">

        <!-- Title -->
        <div class="be-field">
          <label class="be-label">Título</label>
          <input v-model="title" type="text" class="be-input be-input--lg" placeholder="Título del artículo" />
        </div>

        <!-- Excerpt -->
        <div class="be-field">
          <label class="be-label">Resumen / Excerpt</label>
          <textarea v-model="excerpt" class="be-textarea" rows="2" placeholder="Breve descripción que aparece en la lista del blog…" />
        </div>

        <!-- Body -->
        <div class="be-field">
          <label class="be-label">Contenido</label>

          <div class="blocks-list">
            <div v-for="(block, i) in blocks" :key="i" class="block-item">
              <div class="block-type-row">
                <select v-model="block.type" class="block-type-sel">
                  <option value="p">Párrafo</option>
                  <option value="h2">Título H2</option>
                </select>
                <div class="block-move-btns">
                  <button :disabled="i === 0" @click="moveUp(i)" class="bm-btn" title="Subir">↑</button>
                  <button :disabled="i === blocks.length - 1" @click="moveDown(i)" class="bm-btn" title="Bajar">↓</button>
                  <button @click="removeBlock(i)" class="bm-btn bm-del" title="Eliminar bloque">✕</button>
                </div>
              </div>
              <textarea
                v-model="block.text"
                class="be-textarea block-text"
                :rows="block.type === 'h2' ? 1 : 4"
                :placeholder="block.type === 'h2' ? 'Subtítulo…' : 'Escribe el párrafo aquí…'"
              />
            </div>
          </div>

          <div class="block-add-row">
            <button class="btn-add-block" @click="addBlock('p')">+ Párrafo</button>
            <button class="btn-add-block btn-add-h2" @click="addBlock('h2')">+ Título H2</button>
          </div>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="be-sidebar">

        <!-- Save -->
        <div class="be-save-box">
          <p v-if="error" class="be-error">{{ error }}</p>
          <button class="btn-save" :disabled="saving" @click="save">
            <span v-if="saving">Guardando…</span>
            <span v-else-if="saved">✓ Guardado</span>
            <span v-else>Guardar artículo</span>
          </button>
          <a :href="`/blog/${slug}`" target="_blank" class="btn-preview" v-if="!isNew">Ver en el blog →</a>
        </div>

        <!-- Meta -->
        <div class="be-meta-box">
          <div class="be-field">
            <label class="be-label">Slug (URL)</label>
            <input
              v-model="slug"
              type="text"
              class="be-input be-input--mono"
              placeholder="mi-articulo"
              @input="slugEdited = true"
            />
            <p class="be-hint">/blog/{{ slug || '…' }}</p>
          </div>

          <div class="be-field">
            <label class="be-label">Categoría</label>
            <select v-model="category" class="be-input">
              <option value="">Sin categoría</option>
              <option v-for="c in CATEGORIES" :key="c" :value="c">{{ c }}</option>
            </select>
          </div>

          <div class="be-field">
            <label class="be-label">Tiempo de lectura</label>
            <input v-model="readTime" type="text" class="be-input" placeholder="5 min read" />
          </div>

          <div class="be-field">
            <label class="be-label">Fecha de publicación</label>
            <input v-model="date" type="date" class="be-input" />
          </div>

          <div class="be-field">
            <label class="be-label">Imagen (URL)</label>
            <input v-model="image" type="text" class="be-input" placeholder="/imagens/mi-foto.jpg" />
            <div v-if="image" class="be-img-preview">
              <img :src="image" alt="Preview" @error="$event.target.style.display='none'" />
            </div>
          </div>

          <div class="be-field be-field--row">
            <label class="be-label-inline">
              <input type="checkbox" v-model="featured" />
              Artículo destacado
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.be-header {
  display: flex; flex-direction: column; gap: 4px; margin-bottom: 24px;
}
.be-back {
  display: inline-flex; align-items: center; gap: 4px;
  font-size: 13px; font-weight: 600; color: #6b7280;
  text-decoration: none; transition: color .2s;
}
.be-back:hover { color: #2e8a93; }

.be-layout {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 24px;
  align-items: start;
}

/* Fields */
.be-field { display: flex; flex-direction: column; gap: 6px; margin-bottom: 20px; }
.be-field--row { flex-direction: row; align-items: center; }
.be-label { font-size: 13px; font-weight: 600; color: #374151; }
.be-label-inline { font-size: 13px; font-weight: 600; color: #374151; display: flex; align-items: center; gap: 8px; cursor: pointer; }
.be-hint { font-size: 12px; color: #9ca3af; font-family: monospace; }
.be-input {
  border: 1.5px solid #e2e8f0; border-radius: 10px;
  padding: 9px 13px; font-size: 14px; color: #1a1f2e;
  background: #f8fafc; transition: border-color .2s; outline: none;
  font-family: inherit; width: 100%; box-sizing: border-box;
}
.be-input:focus { border-color: #2e8a93; background: #fff; }
.be-input--lg { font-size: 18px; font-weight: 700; padding: 12px 14px; }
.be-input--mono { font-family: monospace; }
.be-textarea {
  border: 1.5px solid #e2e8f0; border-radius: 10px;
  padding: 10px 13px; font-size: 14px; color: #1a1f2e; line-height: 1.6;
  background: #f8fafc; resize: vertical; outline: none; font-family: inherit;
  width: 100%; box-sizing: border-box; transition: border-color .2s;
}
.be-textarea:focus { border-color: #2e8a93; background: #fff; }

.be-img-preview { margin-top: 6px; border-radius: 8px; overflow: hidden; max-height: 120px; }
.be-img-preview img { width: 100%; height: 120px; object-fit: cover; display: block; }

/* Block editor */
.blocks-list { display: flex; flex-direction: column; gap: 12px; margin-bottom: 12px; }
.block-item {
  background: #f8fafc; border: 1.5px solid #e2e8f0;
  border-radius: 12px; padding: 12px; display: flex; flex-direction: column; gap: 8px;
}
.block-type-row { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
.block-type-sel {
  border: 1px solid #e2e8f0; border-radius: 8px; padding: 4px 10px;
  font-size: 12px; font-weight: 600; color: #374151; background: #fff;
  cursor: pointer; outline: none;
}
.block-move-btns { display: flex; gap: 4px; }
.bm-btn {
  width: 28px; height: 28px; border-radius: 6px;
  border: 1px solid #e2e8f0; background: #fff;
  font-size: 12px; cursor: pointer; display: flex; align-items: center; justify-content: center;
  color: #6b7280; transition: background .15s, color .15s;
}
.bm-btn:hover:not(:disabled) { background: #f3f4f6; color: #1a2035; }
.bm-btn:disabled { opacity: .35; cursor: not-allowed; }
.bm-del:hover:not(:disabled) { background: #fef2f2; color: #dc2626; border-color: #fca5a5; }
.block-text { background: #fff; }

.block-add-row { display: flex; gap: 8px; }
.btn-add-block {
  font-size: 13px; font-weight: 600; color: #2e8a93;
  background: rgba(46,138,147,.08); border: 1.5px dashed rgba(46,138,147,.4);
  border-radius: 9px; padding: 7px 16px; cursor: pointer; transition: background .2s;
}
.btn-add-block:hover { background: rgba(46,138,147,.14); }
.btn-add-h2 { color: #7c3aed; background: rgba(124,58,237,.06); border-color: rgba(124,58,237,.3); }
.btn-add-h2:hover { background: rgba(124,58,237,.12); }

/* Sidebar */
.be-save-box {
  background: #fff; border: 1.5px solid #e8edf2;
  border-radius: 14px; padding: 18px; margin-bottom: 16px;
  display: flex; flex-direction: column; gap: 10px;
}
.btn-save {
  background: #2e8a93; color: #fff; border: none;
  border-radius: 10px; padding: 11px; font-size: 14px; font-weight: 700;
  cursor: pointer; transition: background .2s; width: 100%; font-family: inherit;
}
.btn-save:hover:not(:disabled) { background: #13484e; }
.btn-save:disabled { opacity: .7; cursor: not-allowed; }
.btn-preview {
  font-size: 13px; font-weight: 600; color: #2e8a93;
  text-align: center; text-decoration: none; display: block;
}
.btn-preview:hover { text-decoration: underline; }
.be-error {
  font-size: 13px; color: #dc2626;
  background: #fef2f2; border-radius: 8px; padding: 8px 12px;
}

.be-meta-box {
  background: #fff; border: 1.5px solid #e8edf2;
  border-radius: 14px; padding: 18px;
}

/* Responsive */
@media (max-width: 900px) {
  .be-layout { grid-template-columns: 1fr; }
  .be-sidebar { order: -1; }
}
</style>
