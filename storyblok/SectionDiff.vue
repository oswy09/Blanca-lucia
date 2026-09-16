<script setup>
defineProps({ blok: Object })
</script>

<template>
  <div v-editable="blok">
    <DiffSection :blok="blok" />
  </div>
</template>
