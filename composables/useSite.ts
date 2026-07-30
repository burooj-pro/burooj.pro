export const useSiteData = (slug: string) => {
  const config = useRuntimeConfig()

  return useFetch(`${config.public.apiBase}/api/site-full`, {
    query: { slug },
    key: `site-${slug}`
  })
}

export const useStrapiImage = (path: string | undefined | null) => {
  if (!path) return ''
  const config = useRuntimeConfig()
  return path.startsWith('http') ? path : `${config.public.apiBase}${path}`
}

// غيرنا الاسم من useProjects إلى useStrapiProjects عشان نتجنب التعارض
export const useStrapiProjects = (siteData: any) => {
  return computed(() => {
    const sections = siteData.value?.pages?.[0]?.sections ?? []
    return sections.filter((s: any) => s.__component === 'burooj.project')
  })
}