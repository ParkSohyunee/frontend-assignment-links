import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import useGetCategories from '../hooks/useCategory'
import { useSearchLinks } from '../hooks/useLinks'

import LinkCard from '../components/LinkCard'
import Button from '../components/Button'
import CreateLinkForm from '../components/CreateLinkForm'
import CategoryButton from '../components/CategoryButton'

import { defaultCategoryKey } from '../constants'

export default function LinksPage() {
  const navigate = useNavigate()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [keyword, setKeyword] = useState('')

  const { data: categories } = useGetCategories()

  const [selectedCategoryId, setSelectedCategoryId] =
    useState(defaultCategoryKey)

  const { data: links, error } = useSearchLinks(selectedCategoryId, keyword)

  const handleChangeCategory = (categoryId: number) => {
    setSelectedCategoryId(categoryId)
  }

  if (links) {
    if (error?.isAxiosError && error.response?.status === 401) {
      alert(error.response?.data.message)
      navigate('/', { replace: true })
    }
  }

  return (
    <div className="px-8 py-4">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex gap-2">
          <button
            onClick={() => handleChangeCategory(defaultCategoryKey)}
            className={`cursor-pointer rounded-sm border border-slate-400 px-2 py-1 text-sm ${
              !selectedCategoryId && 'bg-indigo-800 text-white'
            }`}
          >
            전체
          </button>
          {categories?.map(({ id, name }) => (
            <CategoryButton
              key={id}
              categoryId={id}
              selectedCategoryId={selectedCategoryId}
              handleChangeCategory={handleChangeCategory}
            >
              {name}
            </CategoryButton>
          ))}
        </div>
        <Button onClick={() => setIsModalOpen(true)}>링크 추가하기</Button>
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
