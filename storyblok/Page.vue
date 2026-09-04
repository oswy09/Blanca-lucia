<script setup>
defineProps({ blok: Object })
</script>

<template>
  <main v-editable="blok">
    <StoryblokComponent
      v-for="blk in blok.body"
      :key="blk._uid"
      :blok="blk"
    />
  </main>
</template>
