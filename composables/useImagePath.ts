export const useImagePath = () => {
  const config = useRuntimeConfig()
  const baseURL = config.app.baseURL || '/'
  
  const getImagePath = (path: string): string => {
    // Remove leading slash if present
    const cleanPath = path.startsWith('/') ? path.slice(1) : path
    // Combine baseURL with path
    return `${baseURL}${cleanPath}`
  }
  
  return {
    getImagePath,
  }
}

