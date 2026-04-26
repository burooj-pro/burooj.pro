<script setup lang="ts">
defineProps<{
  location?: string
  year?: string | number
  client?: string
  services?: string[]
}>()

const { t } = useI18n()
</script>

<template>
  <div class="space-y-6">
    <div v-if="location" class="grid grid-cols-1 gap-1 sm:grid-cols-[120px_1fr] sm:gap-4">
      <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">{{ t('projectDetail.location') }}</p>
      <p class="text-sm text-ink break-words">{{ location }}</p>
    </div>
    <div v-if="year" class="grid grid-cols-1 gap-1 sm:grid-cols-[120px_1fr] sm:gap-4">
      <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">{{ t('projectDetail.year') }}</p>
      <p class="text-sm text-ink break-words">{{ year }}</p>
    </div>
    <div v-if="client" class="grid grid-cols-1 gap-1 sm:grid-cols-[120px_1fr] sm:gap-4">
      <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">{{ t('projectDetail.client') }}</p>
      <p class="text-sm text-ink break-words">{{ client }}</p>
    </div>
    <div v-if="services && services.length > 0" class="grid grid-cols-1 gap-1 sm:grid-cols-[120px_1fr] sm:gap-4">
      <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">{{ t('projectDetail.services') }}</p>
      <div class="flex flex-wrap gap-2">
        <span
          v-for="service in services"
          :key="service"
          class="inline-flex items-center rounded-lg bg-primary-light px-3 py-1.5 text-xs font-medium leading-normal text-primary"
        >
          {{ service }}
        </span>
      </div>
    </div>
  </div>
</template>
