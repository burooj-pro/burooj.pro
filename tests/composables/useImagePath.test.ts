import { describe, it, expect } from 'vitest'

describe('useImagePath', () => {
  it('prepends baseURL to a root-relative path', () => {
    const { getImagePath } = useImagePath()
    const result = getImagePath('/images/hero.png')
    expect(result).toContain('images/hero.png')
    expect(result).not.toMatch(/^\/images/)
  })

  it('leaves https:// URLs unchanged', () => {
    const { getImagePath } = useImagePath()
    const url = 'https://example.com/photo.jpg'
    expect(getImagePath(url)).toBe(url)
  })

  it('leaves http:// URLs unchanged', () => {
    const { getImagePath } = useImagePath()
    const url = 'http://example.com/photo.jpg'
    expect(getImagePath(url)).toBe(url)
  })

  it('handles paths without leading slash', () => {
    const { getImagePath } = useImagePath()
    const result = getImagePath('images/hero.png')
    expect(result).toContain('images/hero.png')
  })

  it('does not double-slash', () => {
    const { getImagePath } = useImagePath()
    const result = getImagePath('/images/hero.png')
    expect(result).not.toContain('//')
  })
})
