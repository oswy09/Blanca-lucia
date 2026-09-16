<script setup>
defineProps({ blok: Object })
</script>

<template>
  <div v-editable="blok">
    <CoachingSession :blok="blok" />
  </div>
</template>
