import { describe, it, expect } from 'vitest'
import { projects } from '~/data/projects'

describe('projects data', () => {
  it('has at least one project', () => {
    expect(projects.length).toBeGreaterThan(0)
  })

  it('every project has required fields', () => {
    for (const p of projects) {
      expect(p.slug, `${p.slug} missing slug`).toBeTruthy()
      expect(p.title, `${p.slug} missing title`).toBeTruthy()
      expect(p.category, `${p.slug} missing category`).toBeTruthy()
      expect(p.status, `${p.slug} missing status`).toBeTruthy()
      expect(p.description, `${p.slug} missing description`).toBeTruthy()
      expect(p.image, `${p.slug} missing image`).toBeTruthy()
    }
  })

  it('all slugs are unique', () => {
    const slugs = projects.map((p) => p.slug)
    const unique = new Set(slugs)
    expect(unique.size).toBe(slugs.length)
  })

  it('all image paths start with /', () => {
    for (const p of projects) {
      expect(p.image, `${p.slug} image should start with /`).toMatch(/^\//)
      for (const img of p.images ?? []) {
        expect(img, `${p.slug} gallery image should start with /`).toMatch(/^\//)
      }
    }
  })
})
