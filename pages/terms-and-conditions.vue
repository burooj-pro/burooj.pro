<script setup lang="ts">
const { t } = useI18n()
useHead({ title: t('termsAndConditions.title') })
</script>

<template>
  <section class="section-wrapper relative z-10 py-16 md:py-24">
    <div class="mx-auto max-w-4xl space-y-8">
      <h1 class="text-4xl font-serif leading-tight text-ink md:text-5xl lg:text-6xl">
        {{ t('termsAndConditions.title') }}
      </h1>

      <div class="prose prose-slate max-w-none space-y-6 text-slate-600">
        <p class="text-base leading-relaxed">
          {{ t('termsAndConditions.lastUpdated') }}: {{ new Date().toLocaleDateString() }}
        </p>

        <section class="space-y-4">
          <h2 class="text-2xl font-semibold text-ink">{{ t('termsAndConditions.agreementToTerms.title') }}</h2>
          <p class="text-base leading-relaxed">
            {{ t('termsAndConditions.agreementToTerms.content') }}
          </p>
        </section>

        <section class="space-y-4">
          <h2 class="text-2xl font-semibold text-ink">{{ t('termsAndConditions.useLicense.title') }}</h2>
          <p class="text-base leading-relaxed">
            {{ t('termsAndConditions.useLicense.content') }}
          </p>
        </section>

        <section class="space-y-4">
          <h2 class="text-2xl font-semibold text-ink">{{ t('termsAndConditions.disclaimer.title') }}</h2>
          <p class="text-base leading-relaxed">
            {{ t('termsAndConditions.disclaimer.content') }}
          </p>
        </section>

        <section class="space-y-4">
          <h2 class="text-2xl font-semibold text-ink">{{ t('termsAndConditions.limitations.title') }}</h2>
          <p class="text-base leading-relaxed">
            {{ t('termsAndConditions.limitations.content') }}
          </p>
        </section>

        <section class="space-y-4">
          <h2 class="text-2xl font-semibold text-ink">{{ t('termsAndConditions.revisions.title') }}</h2>
          <p class="text-base leading-relaxed">
            {{ t('termsAndConditions.revisions.content') }}
          </p>
        </section>

        <section class="space-y-4">
          <h2 class="text-2xl font-semibold text-ink">{{ t('termsAndConditions.contactInformation.title') }}</h2>
          <p class="text-base leading-relaxed">
            {{ t('termsAndConditions.contactInformation.content') }}
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

