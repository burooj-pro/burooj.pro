import { describe, it, expect } from 'vitest'
import { services } from '~/data/services'

const VALID_CATEGORIES = ['Construction & Engineering', 'Property Management'] as const

describe('services data', () => {
  it('has at least one service', () => {
    expect(services.length).toBeGreaterThan(0)
  })

  it('every service has required fields', () => {
    for (const s of services) {
      expect(s.slug, `${s.slug} missing slug`).toBeTruthy()
      expect(s.title, `${s.slug} missing title`).toBeTruthy()
      expect(s.description, `${s.slug} missing description`).toBeTruthy()
      expect(VALID_CATEGORIES, `${s.slug} invalid category`).toContain(s.category)
    }
  })

  it('all slugs are unique', () => {
    const slugs = services.map((s) => s.slug)
    const unique = new Set(slugs)
    expect(unique.size).toBe(slugs.length)
  })

  it('process steps have title and description', () => {
    for (const s of services) {
      for (const step of s.process ?? []) {
        expect(step.title, `${s.slug} process step missing title`).toBeTruthy()
        expect(step.description, `${s.slug} process step missing description`).toBeTruthy()
      }
    }
  })
})
