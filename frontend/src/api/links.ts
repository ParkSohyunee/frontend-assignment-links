import axiosInstance from '../libs/axios/axiosInstance'

import { LinkType, RequestLinkType } from '../types/links'

export const getLinks = async () => {
  const response = await axiosInstance.get<LinkType[]>('/links')

  return response.data
}

export const createLink = async (link: RequestLinkType) => {
  const response = await axiosInstance.post<LinkType>('/links', link)

  return response.data
}
