import { RequestUserType } from '../types'

import { errorMessage } from '../constants'

export const validateForm = (inputs: RequestUserType) => {
  const { username, password } = inputs

  const error = {
    username: '',
    password: '',
  }

  if (!username) {
    error.username = errorMessage.EMPTY_USERNAME
  }
  if (!password) {
    error.password = errorMessage.ERROR_PASSWORD
  }

  return error
}
