export const alertMessage = {
  // login, signup
  EMPTY_FORM_AUTH: '아이디와 비밀번호를 입력해주세요.',
  ERROR_SIGNUP: '회원가입을 다시 시도해주세요.',
  ERROR_LOGIN: '로그인을 다시 시도해주세요.',

  // links
  EMPTY_FORM_LINKS: '링크 이름과 url을 입력해주세요.',
  ERROR_ADD_LINKS: '링크 추가를 다시 시도해주세요.',
} as const

export const errorMessage = {
  // user form
  EMPTY_USERNAME: '아이디를 입력해주세요.',
  EMPTY_PASSWORD: '비밀번호를 입력해주세요.',

  // link form
  EMPTY_LINK_NAME: '링크 이름을 입력해주세요.',
  EMPTY_LINK_URL: '링크 url을 입력해주세요.',
  EMPTY_LINK_CATEGORY: '카테고리를 선택해주세요.',
} as const
