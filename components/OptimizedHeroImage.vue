<script setup lang="ts">
/**
 * Hero/CTA shared image with WebP srcset (from npm run optimize-images).
 * Use priority for above-the-fold hero; lazy for below-the-fold CTA.
 */
const props = withDefaults(
  defineProps<{
    /** Above-the-fold hero: fetchpriority high, loading eager */
    priority?: boolean
    /** Below-the-fold: loading lazy, decoding async (default when !priority) */
    lazy?: boolean
    alt?: string
    class?: string
    imgClass?: string
  }>(),
  { priority: false, lazy: true }
)

const { fallbackSrc, srcsetWebP, sizes } = useHeroImage()
</script>

<template>
  <picture :class="['block h-full w-full', props.class]">
    <source
      type="image/webp"
      :srcset="srcsetWebP"
      :sizes="sizes"
    />
    <img
      :src="fallbackSrc"
      :alt="alt ?? ''"
      width="1920"
      height="1080"
      :fetchpriority="priority ? 'high' : undefined"
      :loading="priority ? 'eager' : (lazy ? 'lazy' : undefined)"
      :decoding="lazy ? 'async' : undefined"
      :class="['absolute inset-0 h-full w-full object-cover', imgClass]"
    />
  </picture>
</template>
