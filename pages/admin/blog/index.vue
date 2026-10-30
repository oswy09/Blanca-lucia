<script setup>
definePageMeta({ layout: 'admin' })

const { data: posts, refresh } = await useFetch('/api/blog', { key: 'admin-blog-list', default: () => [] })

const confirmSlug = ref(null)
const deleting = ref(false)

async function deletePost(slug) {
  if (confirmSlug.value !== slug) { confirmSlug.value = slug; return }
  deleting.value = true
  try {
    await $fetch(`/api/blog/${slug}`, { method: 'DELETE' })
    await refresh()
  } catch { alert('Error al eliminar') }
  finally { deleting.value = false; confirmSlug.value = null }
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('es', { day: 'numeric', month: 'short', year: 'numeric' })
}
</script>

<template>
  <div class="adm-page">
    <div class="bl-header">
      <div>
        <h1 class="adm-page-title">Blog</h1>
        <p class="adm-page-sub">{{ posts.length }} artículos publicados</p>
      </div>
      <NuxtLink to="/admin/blog/new" class="btn-new">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        Nuevo artículo
      </NuxtLink>
    </div>

    <div class="bl-list">
      <p v-if="!posts.length" class="bl-empty">No hay artículos todavía. Crea el primero.</p>

      <div v-for="post in posts" :key="post.slug" class="bl-row">
        <div class="bl-info">
          <div class="bl-badges">
            <span v-if="post.featured" class="badge-feat">Destacado</span>
            <span class="badge-cat">{{ post.category }}</span>
          </div>
          <h3 class="bl-title">{{ post.title }}</h3>
          <p class="bl-excerpt">{{ post.excerpt }}</p>
          <div class="bl-meta">{{ formatDate(post.date) }} · {{ post.readTime }}</div>
        </div>
        <div class="bl-actions">
          <NuxtLink :to="`/admin/blog/${post.slug}`" class="btn-edit">Editar</NuxtLink>
          <button
            class="btn-del"
            :class="{ confirm: confirmSlug === post.slug }"
            :disabled="deleting"
            @click="deletePost(post.slug)"
          >{{ confirmSlug === post.slug ? '¿Eliminar?' : 'Eliminar' }}</button>
          <button v-if="confirmSlug === post.slug" class="btn-cancel" @click="confirmSlug = null">Cancelar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bl-header {
  display: flex; align-items: flex-start; justify-content: space-between;
  gap: 16px; margin-bottom: 28px; flex-wrap: wrap;
}
.btn-new {
  display: inline-flex; align-items: center; gap: 6px;
  background: #2e8a93; color: #fff; border: none;
  border-radius: 10px; padding: 10px 18px;
  font-size: 14px; font-weight: 600; cursor: pointer;
  text-decoration: none; transition: background .2s; white-space: nowrap;
}
.btn-new:hover { background: #13484e; }

.bl-list { display: flex; flex-direction: column; gap: 12px; }
.bl-empty { color: #6b7280; font-size: 14px; padding: 32px; text-align: center; }

.bl-row {
  background: #fff; border: 1.5px solid #e8edf2;
  border-radius: 14px; padding: 18px 20px;
  display: flex; align-items: flex-start; gap: 16px;
  transition: border-color .2s;
}
.bl-row:hover { border-color: #2e8a93; }

.bl-info { flex: 1; min-width: 0; }
.bl-badges { display: flex; gap: 6px; margin-bottom: 6px; flex-wrap: wrap; }
.badge-feat {
  font-size: 11px; font-weight: 700; text-transform: uppercase;
  letter-spacing: .08em; color: #d97706;
  background: #fef3c7; border-radius: 6px; padding: 2px 8px;
}
.badge-cat {
  font-size: 11px; font-weight: 600; text-transform: uppercase;
  letter-spacing: .08em; color: #2e8a93;
  background: rgba(46,138,147,.1); border-radius: 6px; padding: 2px 8px;
}
.bl-title { font-size: 15px; font-weight: 700; color: #1a2035; margin-bottom: 4px; line-height: 1.3; }
.bl-excerpt { font-size: 13px; color: #6b7280; line-height: 1.6; margin-bottom: 6px; }
.bl-meta { font-size: 12px; color: #9ca3af; }

.bl-actions {
  display: flex; gap: 6px; align-items: center; flex-shrink: 0; flex-wrap: wrap;
}
.btn-edit {
  font-size: 13px; font-weight: 600; color: #2e8a93;
  background: rgba(46,138,147,.08); border: 1px solid rgba(46,138,147,.2);
  border-radius: 8px; padding: 6px 14px; cursor: pointer;
  text-decoration: none; transition: background .2s;
}
.btn-edit:hover { background: rgba(46,138,147,.16); }
.btn-del {
  font-size: 13px; font-weight: 600; color: #dc2626;
  background: rgba(220,38,38,.06); border: 1px solid rgba(220,38,38,.2);
  border-radius: 8px; padding: 6px 14px; cursor: pointer; transition: background .2s;
}
.btn-del:hover, .btn-del.confirm { background: rgba(220,38,38,.15); border-color: #dc2626; }
.btn-cancel {
  font-size: 13px; font-weight: 600; color: #6b7280;
  background: #f3f4f6; border: 1px solid #e2e8f0;
  border-radius: 8px; padding: 6px 14px; cursor: pointer;
}
</style>
