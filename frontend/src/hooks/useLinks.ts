import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

import {
  LinkType,
  UseMutationCustomOptions,
  UseQueryCustomOptions,
} from '../types'
import { alertMessage, queryKey } from '../constants'

import {
  createLink,
  deleteLink,
  getLinkById,
  getLinks,
  updateLink,
} from '../api/links'

// --링크 전체 조회
const useGetLinks = (queryOptions?: UseQueryCustomOptions<LinkType[]>) => {
  return useQuery({
    queryKey: [queryKey.getLinks],
    queryFn: getLinks,
    ...queryOptions,
  })
}

// --링크 상세 조회
const useGetLinkById = (
  id: number,
  queryOptions?: UseQueryCustomOptions<LinkType>,
) => {
  return useQuery({
    queryKey: [queryKey.getLinkById, id],
    queryFn: () => getLinkById(id),
    ...queryOptions,
  })
}

// --링크 생성
const useCreateLink = (mutationOptions?: UseMutationCustomOptions) => {
  return useMutation({
    mutationFn: createLink,
    ...mutationOptions,
  })
}

// --링크 수정
const useUpdateLink = (mutationOptions?: UseMutationCustomOptions) => {
  return useMutation({
    mutationFn: updateLink,
    ...mutationOptions,
  })
}

// --링크 삭제
const useDeleteLink = (mutationOptions?: UseMutationCustomOptions) => {
  return useMutation({
    mutationFn: deleteLink,
    ...mutationOptions,
  })
}

const useLinksMutation = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const createLinkMutation = useCreateLink({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKey.getLinks],
      })
    },
    onError: ({ isAxiosError, status, response }) => {
      if (isAxiosError && status === 401) {
        alert(response?.data.message)
        navigate('/', { replace: true }) // 로그인 페이지로 이동
      } else {
        alert(alertMessage.ERROR_ADD_LINKS)
      }
    },
  })

  const updateLinkMutation = useUpdateLink({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKey.getLinks],
      })
    },
    onError: ({ isAxiosError, status, response }) => {
      if (isAxiosError && status === 401) {
        alert(response?.data.message)
        navigate('/', { replace: true }) // 로그인 페이지로 이동
      } else {
        alert(alertMessage.ERROR_UPDATE_LINKS)
      }
    },
  })

  const deleteLinkMutation = useDeleteLink({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKey.getLinks],
      })
    },
    onError: ({ isAxiosError, status, response }) => {
      if (isAxiosError && status === 401) {
        alert(response?.data.message)
        navigate('/', { replace: true }) // 로그인 페이지로 이동
      } else {
        alert(alertMessage.ERROR_DELETE_LINKS)
      }
    },
  })

  return { createLinkMutation, updateLinkMutation, deleteLinkMutation }
}

export { useLinksMutation, useGetLinks, useGetLinkById }
