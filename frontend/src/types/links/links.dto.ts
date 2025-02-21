import { categoryKey } from '../../constants'

interface LinkType {
  id: number
  createdById: number
  name: string
  url: string
  categoryId: keyof typeof categoryKey
}

export type LinksType = LinkType[]
