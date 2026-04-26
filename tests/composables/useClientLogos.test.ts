import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { defineComponent } from 'vue'

const LogosHarness = defineComponent({
  setup() {
    return useClientLogos()
  },
  template: '<div />',
})

const LogosWithPlaceholdersHarness = defineComponent({
  setup() {
    return useClientLogos({ placeholders: 3 })
  },
  template: '<div />',
})

describe('useClientLogos', () => {
  it('returns a non-empty logo list', async () => {
    const w = await mountSuspended(LogosHarness)
    expect(w.vm.clientLogos.length).toBeGreaterThan(0)
  })

  it('every logo has a name', async () => {
    const w = await mountSuspended(LogosHarness)
    w.vm.clientLogos.forEach((logo: { name: string }) => {
      expect(logo.name).toBeTruthy()
    })
  })

  it('image paths contain baseURL prefix', async () => {
    const w = await mountSuspended(LogosHarness)
    const withImages = w.vm.clientLogos.filter((l: { image?: string }) => l.image)
    expect(withImages.length).toBeGreaterThan(0)
    withImages.forEach((logo: { image?: string }) => {
      expect(logo.image).not.toMatch(/^\/images/)
      expect(logo.image).toContain('images/clients')
    })
  })

  it('placeholders option adds extra entries', async () => {
    const base = await mountSuspended(LogosHarness)
    const withPlaceholders = await mountSuspended(LogosWithPlaceholdersHarness)
    expect(withPlaceholders.vm.clientLogos.length).toBe(base.vm.clientLogos.length + 3)
  })
})
