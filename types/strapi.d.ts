declare namespace Strapi {
  interface File {
    id: number
    name: string | null
    alternativeText: string | null
    caption: string | null
    width: number
    height: number
    hash: string | null
    ext: string
    mime: string
    size: number
    url: string
    previewUrl: string | null
    provider: string
    provider_metadata: string | null
    folderPath: string
    createdAt: string | Date
    updatedAt: string | Date | null
    formats: {
      [key: string]: Omit<
        'createdAt' | 'updatedAt' | 'caption' | 'alternativeText' | 'provider' | 'provider_metadata' | 'folderPath',
        File
      >
    }
  }

  interface Rest<T> {
    data?: T
    meta?: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}
