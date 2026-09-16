<script setup>
defineProps({ blok: Object })
</script>

<template>
  <div v-editable="blok">
    <TestimonialsSection :blok="blok" />
  </div>
</template>
