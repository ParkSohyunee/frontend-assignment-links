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

export const deleteLink = async (id: number) => {
  return await axiosInstance.delete(`/links/${id}`)
}

interface SearchLinkType {
  categoryId?: number
  keyword?: string
}

export const searchLink = async ({ categoryId, keyword }: SearchLinkType) => {
  const params = new URLSearchParams()

  if (categoryId) {
    params.append('category', categoryId.toString())
  }
  if (keyword) {
    params.append('keyword', keyword)
  }

  const response = await axiosInstance.get<LinkType[]>(
    `/links/search?${params.toString()}`,
  )
  return response.data
}

interface ShareLinkType {
  username: string
  linkId: number
}

export const shareLink = async ({ username, linkId }: ShareLinkType) => {
  const response = await axiosInstance.post('/links/share', {
    username,
    linkId,
  })
  return response.data
}
