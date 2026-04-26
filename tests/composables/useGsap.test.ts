import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { defineComponent } from 'vue'

const GsapHarness = defineComponent({
  setup() {
    return useGsap()
  },
  template: '<div />',
})

describe('useGsap', () => {
  it('returns all expected animation functions', async () => {
    const w = await mountSuspended(GsapHarness)
    expect(typeof w.vm.fadeInUp).toBe('function')
    expect(typeof w.vm.fadeInFromSide).toBe('function')
    expect(typeof w.vm.scaleIn).toBe('function')
    expect(typeof w.vm.staggerFadeIn).toBe('function')
    expect(typeof w.vm.animateCounter).toBe('function')
    expect(typeof w.vm.expandImageOnScroll).toBe('function')
    expect(typeof w.vm.fixedHero).toBe('function')
  })

  it('does not throw when called with a null ref', async () => {
    const w = await mountSuspended(GsapHarness)
    const nullRef = ref<HTMLElement | null>(null)
    expect(() => w.vm.fadeInUp(nullRef)).not.toThrow()
    expect(() => w.vm.fadeInFromSide(nullRef, 'left')).not.toThrow()
    expect(() => w.vm.scaleIn(nullRef)).not.toThrow()
  })
})
