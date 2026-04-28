<script setup lang="ts">
defineProps<{
  error: {
    statusCode: number
    message?: string
  }
}>()

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <div class="flex min-h-screen flex-col items-center justify-center bg-white px-6 text-center">
    <NuxtLink to="/" class="mb-12 font-sans text-2xl font-bold tracking-widest text-ink">
      BUROOJ
    </NuxtLink>

    <p class="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
      404
    </p>

    <h1 class="mb-4 font-serif text-4xl leading-tight text-ink md:text-5xl">
      Page Not Found
    </h1>

    <p class="mb-10 max-w-md text-base leading-relaxed text-slate-500">
      The page you're looking for doesn't exist or has been moved.
    </p>

    <button
      class="rounded-full bg-ink px-8 py-3 text-sm font-medium text-white transition-opacity hover:opacity-80"
      @click="handleError"
    >
      Back to Home
    </button>
  </div>
</template>
