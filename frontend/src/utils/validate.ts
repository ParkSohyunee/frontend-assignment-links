import { RequestUserType } from '../types'

export const validateForm = (inputs: RequestUserType) => {
  const { username, password } = inputs

  const error = {
    username: '',
    password: '',
  }

  if (!username) {
    error.username = '아이디를 입력해주세요.'
  }
  if (!password) {
    error.password = '비밀번호를 입력해주세요.'
  }

  return error
}
