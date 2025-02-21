import axiosInstance from '../libs/axios/axiosInstance'

import { LinksType } from '../types/links'

export const getLinks = async () => {
  const response = await axiosInstance.get<LinksType>('/links')

  return response.data
}
