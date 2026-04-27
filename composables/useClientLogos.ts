export interface ClientLogo {
  name: string
  image?: string
}

export const useClientLogos = (options: { placeholders?: number } = {}) => {
  const config = useRuntimeConfig()
  const baseURL = config.app.baseURL || '/'
  const { t } = useI18n()

  const placeholders = options.placeholders ?? 0

  const logos: ClientLogo[] = [
    { name: 'Aramco', image: `${baseURL}images/clients/aramco-logo.webp` },
    { name: 'Barghash', image: `${baseURL}images/clients/Barghash.webp` },
    { name: 'GDC', image: `${baseURL}images/clients/GDC-logo.webp` },
    { name: 'Gree', image: `${baseURL}images/clients/gree-logo.webp` },
    { name: 'OOMCO', image: `${baseURL}images/clients/oomco.webp` },
    { name: 'Qiddiya', image: `${baseURL}images/clients/qiddiya-logo.webp` },
    { name: 'Qossaibi', image: `${baseURL}images/clients/qossaibi-logo.webp` },
    { name: 'Roaya', image: `${baseURL}images/clients/roaya-logo.webp` },
    { name: 'Six Flags', image: `${baseURL}images/clients/sixflags-logo.webp` },
    { name: 'Tammimi', image: `${baseURL}images/clients/tammimi-logo.webp` },
    { name: 'Thabat', image: `${baseURL}images/clients/thabat-logo.webp` },
    { name: 'Zamil', image: `${baseURL}images/clients/zamil-logo.webp` },
  ]

  for (let i = 0; i < placeholders; i++) {
    logos.push({ name: t('clients.placeholder') })
  }

  return { clientLogos: logos }
}

