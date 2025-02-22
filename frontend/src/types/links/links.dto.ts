import { categoryKey } from '../../constants'

export interface LinkType {
  id: number
  createdById: number
  name: string
  url: string
  categoryId: keyof typeof categoryKey
}
