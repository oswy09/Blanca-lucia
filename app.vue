<script setup>
const { data: globalData } = await useAsyncData('global', () =>
  $fetch('/api/content/global').catch(() => ({}))
)
useState('sb-global', () => globalData.value || {})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
