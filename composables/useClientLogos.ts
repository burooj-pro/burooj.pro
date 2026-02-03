export interface ClientLogo {
  name: string
  image?: string
}

export const useClientLogos = (options: { placeholders?: number } = {}) => {
  const config = useRuntimeConfig()
  const baseURL = config.app.baseURL || '/'

  const placeholders = options.placeholders ?? 0

  const logos: ClientLogo[] = [
    { name: 'Aramco', image: `${baseURL}images/clients/aramco-logo.png` },
    { name: 'Barghash', image: `${baseURL}images/clients/Barghash.png` },
    { name: 'GDC', image: `${baseURL}images/clients/GDC-logo.png` },
    { name: 'Gree', image: `${baseURL}images/clients/gree-logo.png` },
    { name: 'OOMCO', image: `${baseURL}images/clients/oomco.png` },
    { name: 'Qiddiya', image: `${baseURL}images/clients/qiddiya-logo.png` },
    { name: 'Qossaibi', image: `${baseURL}images/clients/qossaibi-logo.png` },
    { name: 'Roaya', image: `${baseURL}images/clients/roaya-logo.png` },
    { name: 'Six Flags', image: `${baseURL}images/clients/sixflags-logo.png` },
    { name: 'Tammimi', image: `${baseURL}images/clients/tammimi-logo.png` },
    { name: 'Thabat', image: `${baseURL}images/clients/thabat-logo.png` },
    { name: 'Zamil', image: `${baseURL}images/clients/zamil-logo.png` },
  ]

  for (let i = 0; i < placeholders; i++) {
    logos.push({ name: 'Client placeholder' })
  }

  return { clientLogos: logos }
}

