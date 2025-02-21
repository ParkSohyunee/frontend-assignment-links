import axiosInstance from '../libs/axios/axiosInstance'

import { CategoriesType } from '../types'

export const getCategories = async () => {
  const response = await axiosInstance.get<CategoriesType>('/categories')

  return response.data
}
