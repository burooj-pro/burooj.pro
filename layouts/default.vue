<script setup lang="ts">
const { locale, locales } = useI18n()
const localePath = useLocalePath()

// Update HTML dir attribute based on current locale
onMounted(() => {
  const currentLocale = locales.value.find((l: any) => l.code === locale.value)
  if (currentLocale?.dir) {
    document.documentElement.setAttribute('dir', currentLocale.dir)
    document.documentElement.setAttribute('lang', locale.value)
  }
})

watch(locale, (newLocale) => {
  const currentLocale = locales.value.find((l: any) => l.code === newLocale)
  if (currentLocale?.dir) {
    document.documentElement.setAttribute('dir', currentLocale.dir)
    document.documentElement.setAttribute('lang', newLocale)
  }
})
</script>

<template>
  <div class="flex min-h-screen flex-col bg-white">
    <Navigation />

    <main class="flex-1">
      <slot />
    </main>

    <AppFooter />
  </div>
</template>

