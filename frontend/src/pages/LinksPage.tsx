import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import useGetCategories from '../hooks/useCategory'
import { useGetLinks } from '../hooks/useLinks'

import LinkCard from '../components/LinkCard'
import Button from '../components/Button'
import CreateLinkForm from '../components/CreateLinkForm'
import CategoryButton from '../components/CategoryButton'

import { CategoryIdType } from '../types'

export default function LinksPage() {
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { data: categories } = useGetCategories()
  const { data: links, error: linksError } = useGetLinks()

  const [selectedCategoryId, setSelectedCategoryId] = useState<
    CategoryIdType | 'all'
  >('all')

  const handleChangeCategory = (categoryId: CategoryIdType | 'all') => {
    setSelectedCategoryId(categoryId)
  }

  if (linksError) {
    if (linksError?.isAxiosError && linksError.response?.status === 401) {
      alert(linksError.response?.data.message)
      navigate('/', { replace: true })
    }
  }

  return (
    <div className="px-8 py-4">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex gap-2">
          <button
            onClick={() => handleChangeCategory('all')}
            className={`cursor-pointer rounded-sm border border-slate-400 px-2 py-1 text-sm ${
              selectedCategoryId === 'all' && 'bg-indigo-800 text-white'
            }`}
          >
            전체
          </button>
          {categories?.map(({ id, name }) => (
            <CategoryButton
              key={id}
              categoryId={id as CategoryIdType}
              selectedCategoryId={selectedCategoryId}
              handleChangeCategory={handleChangeCategory}
            >
              {name}
            </CategoryButton>
          ))}
        </div>
        <Button type="button" onClick={() => setIsModalOpen(true)}>
          링크 추가하기
        </Button>
      </div>

      <div>
        {isModalOpen && (
          <CreateLinkForm onClose={() => setIsModalOpen(false)} />
        )}

        <ul className="grid grid-cols-3 gap-4">
          {links?.map((link) => <LinkCard key={link.id} link={link} />)}
        </ul>
      </div>
    </div>
  )
}
