<script setup>
defineProps({ blok: Object })
</script>

<template>
  <div v-editable="blok">
    <WhoIsForTimeline :blok="blok" />
  </div>
</template>
