import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import {
  LinkType,
  UseMutationCustomOptions,
  UseQueryCustomOptions,
} from '../types'
import { alertMessage, queryKey } from '../constants'
import { createLink, getLinks } from '../api/links'

const useGetLinks = (queryOptions?: UseQueryCustomOptions<LinkType[]>) => {
  return useQuery({
    queryKey: [queryKey.getLinks],
    queryFn: getLinks,
    ...queryOptions,
  })
}

const useCreateLink = (mutationOptions?: UseMutationCustomOptions) => {
  return useMutation({
    mutationFn: createLink,
    ...mutationOptions,
  })
}

const useLinks = () => {
  const queryClient = useQueryClient()

  const getLinksQuery = useGetLinks()
  const createLinkMutation = useCreateLink({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKey.getLinks],
      })
    },
    onError: ({ isAxiosError, status, response }) => {
      if (isAxiosError && status === 401) {
        alert(response?.data.message)
      } else {
        alert(alertMessage.ERROR_ADD_LINKS)
      }
    },
  })

  return {
    getLinksQuery,
    createLinkMutation,
  }
}

export default useLinks
