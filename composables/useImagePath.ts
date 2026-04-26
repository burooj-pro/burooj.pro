export const useImagePath = () => {
  const config = useRuntimeConfig()
  const rawBase = config.app.baseURL || '/'
  const baseURL = rawBase.endsWith('/') ? rawBase : `${rawBase}/`

  const getImagePath = (path: string): string => {
    if (!path) return path
    if (path.startsWith('http://') || path.startsWith('https://')) return path
    const cleanPath = path.startsWith('/') ? path.slice(1) : path
    return `${baseURL}${cleanPath}`
  }

  return { getImagePath }
}
