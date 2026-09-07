<script setup>
defineProps({ blok: Object })
</script>

<template>
  <article v-editable="blok" class="sb-post">
    <h1 class="sb-title">{{ blok.title }}</h1>
    <p v-if="blok.excerpt" class="sb-excerpt">{{ blok.excerpt }}</p>
    <img
      v-if="blok.image?.filename"
      :src="blok.image.filename"
      :alt="blok.image.alt || blok.title"
      class="sb-cover"
    />
    <div v-if="blok.body" class="sb-body" v-html="renderRichText(blok.body)" />
  </article>
</template>

<style scoped>
.sb-post { max-width: 700px; margin-inline: auto; padding-block: 40px; }
.sb-title { font-family: var(--fd); font-size: clamp(24px, 4vw, 44px); font-weight: 700; color: var(--text); line-height: 1.12; text-wrap: balance; margin-bottom: 16px; }
.sb-excerpt { font-size: 17px; color: var(--text2); line-height: 1.7; font-style: italic; margin-bottom: 32px; }
.sb-cover { width: 100%; border-radius: 16px; aspect-ratio: 16/7; object-fit: cover; margin-bottom: 40px; }
.sb-body :deep(h2) { font-family: var(--fd); font-size: clamp(20px, 2.2vw, 26px); font-weight: 700; color: var(--text); margin-top: 48px; margin-bottom: 16px; }
.sb-body :deep(p) { font-size: clamp(16px, 1.5vw, 17.5px); color: var(--text2); line-height: 1.85; margin-bottom: 22px; }
</style>
