<script setup lang="ts">
const { t } = useI18n()
useHead({ title: t('termsAndConditions.title') })

const useLicenseItems = computed(() => {
  const items = t('termsAndConditions.useLicense.items')
  return Array.isArray(items) ? items : []
})

const userAccountsItems = computed(() => {
  const items = t('termsAndConditions.userAccounts.items')
  return Array.isArray(items) ? items : []
})

const limitationsItems = computed(() => {
  const items = t('termsAndConditions.limitations.items')
  return Array.isArray(items) ? items : []
})
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
          <ul class="list-disc space-y-2 pl-6">
            <li v-for="(item, index) in useLicenseItems" :key="index">
              {{ item }}
            </li>
          </ul>
        </section>

        <section class="space-y-4">
          <h2 class="text-2xl font-semibold text-ink">{{ t('termsAndConditions.services.title') }}</h2>
          <p class="text-base leading-relaxed">
            {{ t('termsAndConditions.services.content') }}
          </p>
        </section>

        <section class="space-y-4">
          <h2 class="text-2xl font-semibold text-ink">{{ t('termsAndConditions.userAccounts.title') }}</h2>
          <p class="text-base leading-relaxed">
            {{ t('termsAndConditions.userAccounts.content') }}
          </p>
          <ul class="list-disc space-y-2 pl-6">
            <li v-for="(item, index) in userAccountsItems" :key="index">
              {{ item }}
            </li>
          </ul>
        </section>

        <section class="space-y-4">
          <h2 class="text-2xl font-semibold text-ink">{{ t('termsAndConditions.intellectualProperty.title') }}</h2>
          <p class="text-base leading-relaxed">
            {{ t('termsAndConditions.intellectualProperty.content') }}
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
          <ul class="list-disc space-y-2 pl-6">
            <li v-for="(item, index) in limitationsItems" :key="index">
              {{ item }}
            </li>
          </ul>
        </section>

        <section class="space-y-4">
          <h2 class="text-2xl font-semibold text-ink">{{ t('termsAndConditions.indemnification.title') }}</h2>
          <p class="text-base leading-relaxed">
            {{ t('termsAndConditions.indemnification.content') }}
          </p>
        </section>

        <section class="space-y-4">
          <h2 class="text-2xl font-semibold text-ink">{{ t('termsAndConditions.governingLaw.title') }}</h2>
          <p class="text-base leading-relaxed">
            {{ t('termsAndConditions.governingLaw.content') }}
          </p>
        </section>

        <section class="space-y-4">
          <h2 class="text-2xl font-semibold text-ink">{{ t('termsAndConditions.severability.title') }}</h2>
          <p class="text-base leading-relaxed">
            {{ t('termsAndConditions.severability.content') }}
          </p>
        </section>

        <section class="space-y-4">
          <h2 class="text-2xl font-semibold text-ink">{{ t('termsAndConditions.revisions.title') }}</h2>
          <p class="text-base leading-relaxed">
            {{ t('termsAndConditions.revisions.content') }}
          </p>
        </section>

        <section class="space-y-4">
          <h2 class="text-2xl font-semibold text-ink">{{ t('termsAndConditions.termination.title') }}</h2>
          <p class="text-base leading-relaxed">
            {{ t('termsAndConditions.termination.content') }}
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

