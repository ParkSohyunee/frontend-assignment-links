import { useQuery } from '@tanstack/react-query'

import { CategoriesType, UseQueryCustomOptions } from '../types'
import { getCategories } from '../api/category'
import { queryKey } from '../constants'

const useGetCategories = (
  queryOptions?: UseQueryCustomOptions<CategoriesType>,
) => {
  return useQuery({
    queryKey: [queryKey.getCategories],
    queryFn: getCategories,
    ...queryOptions,
  })
}

export default useGetCategories
