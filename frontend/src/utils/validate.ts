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

export const validateLinkForm = (inputs: RequestLinkType) => {
  const { name, url, categoryId } = inputs

  const error = {
    name: '',
    url: '',
    categoryId: '',
  }

  if (!name) {
    error.name = errorMessage.EMPTY_LINK_NAME
  }
  if (!url) {
    error.url = errorMessage.EMPTY_LINK_URL
  }
  if (!categoryId) {
    error.categoryId = errorMessage.EMPTY_LINK_CATEGORY
  }

  return error
}
