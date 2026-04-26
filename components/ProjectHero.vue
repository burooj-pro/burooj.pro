<script setup lang="ts">
defineProps<{
  src: string
  alt: string
}>()
</script>

<template>
  <section
    data-hero
    class="relative isolate flex min-h-screen w-full items-end justify-center overflow-hidden bg-slate-200"
  >
    <img
      :src="src"
      :alt="alt"
      width="1920"
      height="1080"
      fetchpriority="high"
      decoding="async"
      class="absolute inset-0 h-full w-full object-cover"
    />
    <div class="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/20" />
  </section>
</template>
