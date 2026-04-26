import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { defineComponent } from 'vue'

// Wrap in a component because useProjects calls useI18n(), which requires a Vue setup context.
const ProjectsHarness = defineComponent({
  setup() {
    return useProjects()
  },
  template: '<div />',
})

describe('useProjects', () => {
  it('returns a non-empty projects list', async () => {
    const w = await mountSuspended(ProjectsHarness)
    expect(w.vm.projects.length).toBeGreaterThan(0)
  })

  it('finds a project by slug', async () => {
    const w = await mountSuspended(ProjectsHarness)
    const project = w.vm.getProjectBySlug('albahar-villas')
    expect(project).toBeDefined()
    expect(project?.title).toBe('Hay Albahr Villas')
  })

  it('returns undefined for an unknown slug', async () => {
    const w = await mountSuspended(ProjectsHarness)
    expect(w.vm.getProjectBySlug('does-not-exist')).toBeUndefined()
  })

  it('getLocalizedProject applies baseURL to image paths', async () => {
    const w = await mountSuspended(ProjectsHarness)
    const raw = w.vm.getProjectBySlug('albahar-villas')!
    const localized = w.vm.getLocalizedProject(raw)
    expect(localized.image).not.toMatch(/^\/images/)
    expect(localized.image).toContain('images')
  })

  it('projects are returned in display order', async () => {
    const w = await mountSuspended(ProjectsHarness)
    const slugs = w.vm.projects.map((p: { slug: string }) => p.slug)
    expect(slugs[0]).toBe('efficiency-center-khobar')
  })
})
