import axiosInstance from '../libs/axios/axiosInstance'

import { LinkType, RequestLinkType } from '../types/links'

export const getLinks = async () => {
  const response = await axiosInstance.get<LinkType[]>('/links')

  return response.data
}

export const getLinkById = async (id: number) => {
  const response = await axiosInstance.get<LinkType>(`/links/${id}`)

  return response.data
}

export const createLink = async (link: RequestLinkType) => {
  const response = await axiosInstance.post<LinkType>('/links', link)

  return response.data
}

interface UpdateLinkType {
  link: RequestLinkType
  id: number
}

export const updateLink = async ({ link, id }: UpdateLinkType) => {
  const response = await axiosInstance.patch<LinkType>(`/links/${id}`, link)

  return response.data
}
