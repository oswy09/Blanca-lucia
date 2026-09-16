<script setup>
defineProps({ blok: Object })
</script>

<template>
  <div v-editable="blok">
    <ProofStrip :blok="blok" />
  </div>
</template>
