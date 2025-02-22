import { RequestLinkType, RequestUserType } from '../types'

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
    error.password = errorMessage.EMPTY_PASSWORD
  }

  return error
}

export const validateLinkForm = (
  inputs: Omit<RequestLinkType, 'categoryId'>,
) => {
  const { name, url } = inputs

  const error = {
    name: '',
    url: '',
  }

  if (!name) {
    error.name = errorMessage.EMPTY_LINK_NAME
  }
  if (!url) {
    error.url = errorMessage.EMPTY_LINK_URL
  }

  return error
}
