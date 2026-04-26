import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { defineComponent } from 'vue'

const ServicesHarness = defineComponent({
  setup() {
    return useServices()
  },
  template: '<div />',
})

describe('useServices', () => {
  it('returns a non-empty services list', async () => {
    const w = await mountSuspended(ServicesHarness)
    expect(w.vm.services.length).toBeGreaterThan(0)
  })

  it('finds a service by slug', async () => {
    const w = await mountSuspended(ServicesHarness)
    const service = w.vm.getServiceBySlug('architecture-design')
    expect(service).toBeDefined()
    expect(service?.title).toBe('Architecture Design')
  })

  it('returns undefined for an unknown slug', async () => {
    const w = await mountSuspended(ServicesHarness)
    expect(w.vm.getServiceBySlug('does-not-exist')).toBeUndefined()
  })

  it('getServicesByCategory filters correctly', async () => {
    const w = await mountSuspended(ServicesHarness)
    const construction = w.vm.getServicesByCategory('Construction & Engineering')
    expect(construction.length).toBeGreaterThan(0)
    construction.forEach((s: { category: string }) => {
      expect(s.category).toBe('Construction & Engineering')
    })
  })

  it('getLocalizedService applies baseURL to image paths', async () => {
    const w = await mountSuspended(ServicesHarness)
    const raw = w.vm.getServiceBySlug('architecture-design')!
    const localized = w.vm.getLocalizedService(raw)
    if (localized.image) {
      expect(localized.image).not.toMatch(/^\/images/)
      expect(localized.image).toContain('images')
    }
  })

  it('all services have valid categories', async () => {
    const w = await mountSuspended(ServicesHarness)
    const validCategories = ['Construction & Engineering', 'Property Management']
    w.vm.services.forEach((s: { category: string; slug: string }) => {
      expect(validCategories).toContain(s.category)
    })
  })
})
