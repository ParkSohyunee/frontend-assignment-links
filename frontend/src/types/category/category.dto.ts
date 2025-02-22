import { categoryKey } from '../../constants'

interface CategoryType {
  id: number
  name: (typeof categoryKey)[keyof typeof categoryKey]
}

export type CategoriesType = CategoryType[]
export type CategoryIdType = keyof typeof categoryKey
