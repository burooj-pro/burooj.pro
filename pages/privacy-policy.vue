<script setup lang="ts">
const { t } = useI18n()
useHead({ title: t('privacyPolicy.title') })

const informationItems = computed(() => {
  const items = t('privacyPolicy.informationWeCollect.items')
  return Array.isArray(items) ? items : []
})

const howWeUseItems = computed(() => {
  const items = t('privacyPolicy.howWeUse.items')
  return Array.isArray(items) ? items : []
})
</script>

<template>
  <section class="section-wrapper relative z-10 py-16 md:py-24">
    <div class="mx-auto max-w-4xl space-y-8">
      <h1 class="text-4xl font-serif leading-tight text-ink md:text-5xl lg:text-6xl">
        {{ t('privacyPolicy.title') }}
      </h1>

      <div class="prose prose-slate max-w-none space-y-6 text-slate-600">
        <p class="text-base leading-relaxed">
          {{ t('privacyPolicy.lastUpdated') }}: {{ new Date().toLocaleDateString() }}
        </p>

        <section class="space-y-4">
          <h2 class="text-2xl font-semibold text-ink">{{ t('privacyPolicy.introduction.title') }}</h2>
          <p class="text-base leading-relaxed">
            {{ t('privacyPolicy.introduction.content') }}
          </p>
        </section>

        <section class="space-y-4">
          <h2 class="text-2xl font-semibold text-ink">{{ t('privacyPolicy.informationWeCollect.title') }}</h2>
          <p class="text-base leading-relaxed">
            {{ t('privacyPolicy.informationWeCollect.content') }}
          </p>
          <ul class="list-disc space-y-2 pl-6">
            <li v-for="(item, index) in informationItems" :key="index">
              {{ item }}
            </li>
          </ul>
        </section>

        <section class="space-y-4">
          <h2 class="text-2xl font-semibold text-ink">{{ t('privacyPolicy.howWeUse.title') }}</h2>
          <p class="text-base leading-relaxed">
            {{ t('privacyPolicy.howWeUse.content') }}
          </p>
          <ul class="list-disc space-y-2 pl-6">
            <li v-for="(item, index) in howWeUseItems" :key="index">
              {{ item }}
            </li>
          </ul>
        </section>

        <section class="space-y-4">
          <h2 class="text-2xl font-semibold text-ink">{{ t('privacyPolicy.dataSecurity.title') }}</h2>
          <p class="text-base leading-relaxed">
            {{ t('privacyPolicy.dataSecurity.content') }}
          </p>
        </section>

        <section class="space-y-4">
          <h2 class="text-2xl font-semibold text-ink">{{ t('privacyPolicy.contactUs.title') }}</h2>
          <p class="text-base leading-relaxed">
            {{ t('privacyPolicy.contactUs.content') }}
          </p>
          <p class="text-base leading-relaxed">
            Email: contact@burooj.pro<br>
            Phone: +966 54 836 6111
          </p>
        </section>
      </div>
    </div>
  </section>
</template>

