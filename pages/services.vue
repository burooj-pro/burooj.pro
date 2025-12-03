<script setup lang="ts">
const { t } = useI18n()
useHead({ title: t('services.title') })

const tabKeys = ['Construction & Engineering', 'Property Management', 'Drone Cleaning'] as const
const activeTabKey = ref<(typeof tabKeys)[number]>('Construction & Engineering')

const tabs = computed(() => [
  t('services.construction.title'),
  t('services.property.title'),
  t('services.drone.title'),
])
const activeTab = ref<string>(tabs.value[0])

watch(() => t('services.construction.title'), () => {
  activeTab.value = tabs.value[0]
  activeTabKey.value = 'Construction & Engineering'
}, { immediate: true })

const getTabKey = (tab: string) => {
  if (tab.includes('Construction') || tab.includes('البناء')) return 'Construction & Engineering'
  if (tab.includes('Property') || tab.includes('العقارات')) return 'Property Management'
  if (tab.includes('Drone') || tab.includes('الطائرات')) return 'Drone Cleaning'
  return 'Construction & Engineering'
}

const tabContent = computed(() => ({
  'Construction & Engineering': {
    title: t('services.construction.title'),
    description: t('home.services.construction.description'),
    items: [
      t('services.construction.items.architecture'),
      t('services.construction.items.interior'),
      t('services.construction.items.landscape'),
      t('services.construction.items.furniture'),
      t('services.construction.items.hvac'),
      t('services.construction.items.fire'),
      t('services.construction.items.electrical'),
      t('services.construction.items.plumbing'),
      t('services.construction.items.finishing'),
      t('services.construction.items.smart'),
    ],
  },
  'Property Management': {
    title: t('services.property.title'),
    description: t('home.services.property.description'),
    items: [
      t('services.property.items.marketing'),
      t('services.property.items.leasing'),
      t('services.property.items.pricing'),
      t('services.property.items.listing'),
      t('services.property.items.tenant'),
      t('services.property.items.loi'),
      t('services.property.items.legal'),
      t('services.property.items.government'),
      t('services.property.items.contract'),
      t('services.property.items.revenue'),
      t('services.property.items.reporting'),
      t('services.property.items.valuation'),
      t('services.property.items.cost'),
      t('services.property.items.cleaning'),
      t('services.property.items.security'),
      t('services.property.items.efficiency'),
      t('services.property.items.zakat'),
    ],
  },
  'Drone Cleaning': {
    title: t('services.drone.title'),
    description: t('home.services.drone.description'),
    items: [
      t('services.drone.services.facade'),
      t('services.drone.services.solar'),
      t('services.drone.services.bridges'),
      t('services.drone.services.tanks'),
      t('services.drone.services.industrial'),
      t('services.drone.services.signage'),
    ],
  },
}))
</script>

<template>
  <section class="section-wrapper space-y-8">
    <div class="space-y-3">
      <p class="text-xs font-semibold uppercase tracking-[0.35em] text-primary">{{ t('services.page.title') }}</p>
      <h1 class="text-4xl font-semibold text-ink">{{ t('services.page.headline') }}</h1>
      <p class="text-lg text-slate-600">
        {{ t('services.page.description') }}
      </p>
    </div>

    <div class="flex flex-wrap gap-3">
      <button
        v-for="tab in tabs"
        :key="tab"
        class="rounded-full px-6 py-2 text-sm font-semibold transition"
        :class="tab === activeTab ? 'bg-primary text-white' : 'border border-slate-200 text-slate-600 hover:border-primary hover:text-primary'"
        type="button"
        @click="activeTab = tab; activeTabKey = getTabKey(tab)"
      >
        {{ tab }}
      </button>
    </div>

    <div class="rounded-3xl border border-slate-100 bg-surface p-8 shadow-soft">
      <p class="text-sm font-semibold uppercase tracking-[0.35em] text-primary">{{ activeTab }}</p>
      <h2 class="mt-3 text-2xl font-semibold text-ink">{{ tabContent[activeTabKey].title }}</h2>
      <p class="mt-3 text-slate-600">{{ tabContent[activeTabKey].description }}</p>
      <ul class="mt-6 grid gap-3 sm:grid-cols-2">
        <li v-for="item in tabContent[activeTabKey].items" :key="item" class="rounded-2xl border border-slate-100 bg-background px-4 py-3 text-sm text-slate-700">
          {{ item }}
        </li>
      </ul>
      <div v-if="activeTabKey === 'Drone Cleaning'" class="mt-6">
        <a
          href="https://buroojair.com"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark"
        >
          {{ t('services.drone.visitWebsite') }}
        </a>
      </div>
    </div>
  </section>
</template>

