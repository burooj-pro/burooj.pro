<script setup lang="ts">
defineOptions({ inheritAttrs: false })

const props = defineProps<{
  src: string
  alt: string
  width?: number
  height?: number
  loading?: 'lazy' | 'eager'
  fetchpriority?: 'high' | 'low' | 'auto'
  sizes?: string
}>()

const srcset = computed(() => {
  // لا نبني srcset تخميني لصور سترابي (روابط كاملة تبدأ بـ http) — لأنها مو موجودة بهالأحجام أصلاً
  if (props.src?.startsWith('http')) return undefined

  if (!props.src?.endsWith('.webp')) return undefined
  const base = props.src.replace(/\.webp$/, '')
  return `${base}-400w.webp 400w, ${base}-800w.webp 800w, ${props.src} 1920w`
})
</script>

<template>
  <img
    v-bind="$attrs"
    :src="src"
    :alt="alt"
    :srcset="srcset"
    :sizes="sizes ?? '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 800px'"
    :width="width"
    :height="height"
    :loading="loading ?? 'lazy'"
    :fetchpriority="fetchpriority"
    decoding="async"
  />
</template>