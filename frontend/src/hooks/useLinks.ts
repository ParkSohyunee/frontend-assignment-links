import { useQuery } from '@tanstack/react-query'

import { LinksType, UseQueryCustomOptions } from '../types'
import { queryKey } from '../constants'
import { getLinks } from '../api/links'

const useGetLinks = (queryOptions?: UseQueryCustomOptions<LinksType>) => {
  return useQuery({
    queryKey: [queryKey.getLinks],
    queryFn: getLinks,
    ...queryOptions,
  })
}

export default useGetLinks
