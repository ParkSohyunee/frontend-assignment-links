type CategoryNameType = '즐겨찾기' | '학습' | '참고자료' | '업무'

interface CategoryType {
  id: number
  name: CategoryNameType
}

export type CategoriesType = CategoryType[]
