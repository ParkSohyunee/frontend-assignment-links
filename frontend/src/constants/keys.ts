export const tokenKey = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
} as const

export const queryKey = {
  // 카테고리
  getCategories: 'getCategories',

  // 링크
  getLinks: 'getLinks',
} as const

export const categoryKey = {
  0: '즐겨찾기',
  1: '학습',
  2: '참고자료',
  3: '업무',
} as const
