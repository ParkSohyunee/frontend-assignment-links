export const tokenKey = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
} as const

export const queryKey = {
  // 카테고리
  getCategories: 'getCategories',

  // 링크
  getLinks: 'getLinks',
  getLinkById: 'getLinkById',
  getSearchedLinks: 'getSearchedLinks',
} as const

export const categoryKey = {
  0: '전체',
  1: '즐겨찾기',
  2: '학습',
  3: '참고자료',
  4: '업무',
} as const

export const defaultCategoryKey = 0
export const createFormDefaultCategory = 1
