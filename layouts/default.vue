<script setup lang="ts">
import type { LocaleObject } from '@nuxtjs/i18n'

const { locale, locales } = useI18n()
const localePath = useLocalePath()

function applyLocaleDirection(code: string) {
  const currentLocale = (locales.value as LocaleObject[]).find((l) => l.code === code)
  if (currentLocale?.dir) {
    document.documentElement.setAttribute('dir', currentLocale.dir)
    document.documentElement.setAttribute('lang', code)
  }
}

onMounted(() => applyLocaleDirection(locale.value))
watch(locale, applyLocaleDirection)
</script>

<template>
  <div class="flex min-h-screen flex-col bg-white">
    <AppNavigation />

    <main class="flex-1">
      <slot />
    </main>

    <AppFooter />
  </div>
</template>

