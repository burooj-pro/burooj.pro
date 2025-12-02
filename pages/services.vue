<script setup lang="ts">
useHead({ title: 'Services' })

const tabs = ['Construction & Engineering', 'Property Management', 'Drone Cleaning'] as const
const activeTab = ref<(typeof tabs)[number]>('Construction & Engineering')

const tabContent: Record<(typeof tabs)[number], { title: string; description: string; items: string[] }> = {
  'Construction & Engineering': {
    title: 'Construction & Engineering Services',
    description:
      'Architecture, interiors, MEP, and smart systems that keep developments future-ready. Every solution is documented with detailed drawings and 3D visuals for clients and partners.',
    items: [
      'Architecture Design',
      'Interior Design',
      'Landscape Design',
      'Furniture Design',
      'HVAC Installation',
      'Fire Systems',
      'Electrical Works',
      'Plumbing Services',
      'Finishing & Fit-Out',
      'Smart Systems',
    ],
  },
  'Property Management': {
    title: 'Property Management Services',
    description:
      '360° operations that combine leasing, compliance, finance, and tenant services. We deliver transparent reporting and reliable execution at every stage.',
    items: [
      'Real Estate Marketing',
      'Real Estate Leasing',
      'Pricing Optimization',
      'Real Estate Listing',
      'Tenant Request Management',
      'LOI Documentation',
      'Legal Affairs',
      'Government Requirements',
      'Contract Documentation',
      'Revenue Collection',
      'Automated Reporting',
      'Real Estate Valuation',
      'Operational Cost Reduction',
      'Cleaning & Maintenance',
      'Security Monitoring & Logs',
      'Improving Operational Efficiency',
      'Zakat & Tax Services',
    ],
  },
  'Drone Cleaning': {
    title: 'Drone Cleaning — Burooj Air',
    description:
      'The region’s first drone cleaning program, covering facades, solar farms, industrial infrastructure, and other high-access assets with zero scaffolding required.',
    items: ['Façade Cleaning', 'Solar Panel Cleaning', 'Bridges & Highways', 'Large Water Tanks', 'Industrial Structures', 'High Signage & Billboards'],
  },
}
</script>

<template>
  <section class="section-wrapper space-y-8">
    <div class="space-y-3">
      <p class="text-xs font-semibold uppercase tracking-[0.35em] text-primary">Services</p>
      <h1 class="text-4xl font-semibold text-ink">Integrated services from design to operations</h1>
      <p class="text-lg text-slate-600">
        Burooj unifies construction, property management, and drone cleaning through a single team, ensuring consistent standards and faster delivery.
      </p>
    </div>

    <div class="flex flex-wrap gap-3">
      <button
        v-for="tab in tabs"
        :key="tab"
        class="rounded-full px-6 py-2 text-sm font-semibold transition"
        :class="tab === activeTab ? 'bg-primary text-white' : 'border border-slate-200 text-slate-600 hover:border-primary hover:text-primary'"
        type="button"
        @click="activeTab = tab"
      >
        {{ tab }}
      </button>
    </div>

    <div class="rounded-3xl border border-slate-100 bg-surface p-8 shadow-soft">
      <p class="text-sm font-semibold uppercase tracking-[0.35em] text-primary">{{ activeTab }}</p>
      <h2 class="mt-3 text-2xl font-semibold text-ink">{{ tabContent[activeTab].title }}</h2>
      <p class="mt-3 text-slate-600">{{ tabContent[activeTab].description }}</p>
      <ul class="mt-6 grid gap-3 sm:grid-cols-2">
        <li v-for="item in tabContent[activeTab].items" :key="item" class="rounded-2xl border border-slate-100 bg-background px-4 py-3 text-sm text-slate-700">
          {{ item }}
        </li>
      </ul>
      <div v-if="activeTab === 'Drone Cleaning'" class="mt-6">
        <a
          href="https://buroojair.com"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark"
        >
          Visit BuroojAir.com
        </a>
      </div>
    </div>
  </section>
</template>

