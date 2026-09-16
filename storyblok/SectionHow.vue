<script setup>
defineProps({ blok: Object })
</script>

<template>
  <div v-editable="blok">
    <HowSection :blok="blok" />
  </div>
</template>
